#!/usr/bin/env python3
"""Build DemoCUA site assets: 1 fps videos + steps.json from local UI_Mate/democua."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "UI_Mate" / "democua"
OUT = ROOT / "Demos" / "DemoCUA"
FFMPEG = shutil.which("ffmpeg") or "/opt/homebrew/bin/ffmpeg"
WIDTH = 1280
CRF = 28

GREENHOUSE_SUBTASKS = [
    {
        "id": 1,
        "title": "Open Greenhouse candidates",
        "criterion": "Greenhouse Recruiting shows the Candidates list with the five candidates visible.",
    },
    {
        "id": 2,
        "title": "Inspect calendar availability",
        "criterion": "Calendar layers and busy blocks are reviewed so weekday 2–5 pm slots can be chosen safely.",
    },
    {
        "id": 3,
        "title": "Move candidates to Onsite",
        "criterion": "All five candidates are at the Onsite Interview stage in Greenhouse.",
    },
    {
        "id": 4,
        "title": "Create onsite calendar events",
        "criterion": "Each candidate has a 1-hour Work calendar event titled Onsite – {Name} without double-booking.",
    },
    {
        "id": 5,
        "title": "Email invitations and Slack posts",
        "criterion": "Onsite Invitation emails are sent and #recruiting has a scheduling confirmation for each candidate.",
    },
    {
        "id": 6,
        "title": "Discover panel busy conflicts",
        "criterion": "Calendar JSON/grid review surfaces panel busy blocks that require rescheduling.",
    },
    {
        "id": 7,
        "title": "Reschedule conflicting events",
        "criterion": "Tess Wong and Uma Patel are moved to corrected Tuesday afternoon slots.",
    },
    {
        "id": 8,
        "title": "Correct emails and Slack",
        "criterion": "Incorrect invitations are replaced and Slack posts match the final times.",
    },
    {
        "id": 9,
        "title": "Cross-tool verification",
        "criterion": "Greenhouse, Calendar, Gmail, and Slack all show a consistent final schedule.",
    },
]


def load_traj(path: Path) -> list[dict]:
    return [json.loads(line) for line in path.read_text().splitlines() if line.strip()]


PRESS_RE = re.compile(r"""^pyautogui\.press\(\s*(['\"])(.*?)\1\s*\)$""", re.I)


def press_char(action: str) -> str | None:
    """Return a single typed character for press(...), else None."""
    m = PRESS_RE.match((action or "").strip())
    if not m:
        return None
    raw = m.group(2)
    if raw in {"space", " "}:
        return " "
    if len(raw) != 1:
        return None  # enter / backspace / etc. stay atomic
    return raw


def compact_action(action: str) -> str:
    """Merge multi-line press runs into write(), and identical lines into ×N."""
    lines = [ln.strip() for ln in (action or "").replace("\r\n", "\n").split("\n") if ln.strip()]
    if not lines:
        return ""
    out: list[str] = []
    i = 0
    while i < len(lines):
        ch = press_char(lines[i])
        if ch is not None:
            chars = [ch]
            j = i + 1
            while j < len(lines):
                nxt = press_char(lines[j])
                if nxt is None:
                    break
                chars.append(nxt)
                j += 1
            if j - i >= 2:
                out.append(f"pyautogui.write({''.join(chars)!r})")
                i = j
                continue

        j = i + 1
        while j < len(lines) and lines[j] == lines[i]:
            j += 1
        if j - i >= 2:
            out.append(f"{lines[i]}  ×{j - i}")
            i = j
            continue

        out.append(lines[i])
        i += 1
    return "\n".join(out)


def normalize_action(action) -> str:
    if action is None:
        return ""
    if isinstance(action, str):
        s = action.strip()
        if s.startswith("{") and s.endswith("}"):
            try:
                obj = json.loads(s)
                return normalize_action(obj)
            except json.JSONDecodeError:
                return compact_action(s)
        return compact_action(s)
    if isinstance(action, dict):
        if action.get("command"):
            return compact_action(str(action["command"]).strip())
        if action.get("action_type") == "DONE" or action.get("input", {}).get("action") == "DONE":
            return "DONE"
        if "input" in action and isinstance(action["input"], dict):
            inp = action["input"]
            name = inp.get("action") or action.get("name") or "action"
            coord = inp.get("coordinate")
            text = inp.get("text")
            parts = [str(name)]
            if coord is not None:
                parts.append(f"coord={coord}")
            if text:
                parts.append(f"text={text!r}")
            return " ".join(parts)
        return json.dumps(action, ensure_ascii=False)
    return compact_action(str(action))


def merge_steps(steps: list[dict]) -> list[dict]:
    """Collapse consecutive identical actions across steps into ×N."""
    out: list[dict] = []
    i = 0
    n = len(steps)
    while i < n:
        action = steps[i].get("action") or ""
        j = i + 1
        while j < n and action and (steps[j].get("action") or "") == action:
            j += 1
        if j - i >= 2:
            last = dict(steps[j - 1])
            thinking = ""
            for k in range(i, j):
                t = steps[k].get("thinking") or ""
                if len(t) > len(thinking):
                    thinking = t
            last["thinking"] = thinking
            last["subtask_id"] = steps[i].get("subtask_id") or last.get("subtask_id")
            last["subtask"] = steps[i].get("subtask") or last.get("subtask")
            last["action"] = f"{action}  ×{j - i}"
            last["merged"] = j - i
            last["i"] = steps[j - 1]["i"]
            out.append(last)
            i = j
            continue

        out.append(steps[i])
        i += 1
    return out


def subtask_title(subtasks: list[dict], sid: int | None, fallback: str = "") -> str:
    if sid is None:
        return fallback
    for item in subtasks:
        if item.get("id") == sid:
            return item.get("title") or fallback
    return fallback or f"Subtask {sid}"


STRONG_SUBTASK_PATTERNS = [
    re.compile(
        r"(?:i(?:'m| am)|currently)\s+on\s+subtask\s+(\d+)(?:\s*/\s*\d+)?(?:\s*[:\-–—]\s*([^\n<]{0,120}))?",
        re.I,
    ),
    re.compile(
        r"subtask\s+(\d+)\s+is\s+now\s+active(?:\s*[:\-–—]\s*([^\n<]{0,120}))?",
        re.I,
    ),
    re.compile(
        r"now\s+(?:i(?:'m| am)\s+)?on\s+subtask\s+(\d+)(?:\s*/\s*\d+)?(?:\s*[:\-–—]\s*([^\n<]{0,120}))?",
        re.I,
    ),
    re.compile(r"subtask\s+(\d+)\s*/\s*\d+\b", re.I),
    re.compile(r"(?:^|\n)\s*Subtask\s+(\d+)\s*[:：]\s*([^\n<]{8,160})", re.M),
    re.compile(
        r"working on\s+subtask\s+(\d+)(?:\s+to\s+([^\n<.]{8,120}))?",
        re.I,
    ),
]


def extract_strong_subtask(text: str) -> tuple[int | None, str, bool]:
    """Return (id, label, finished_signal). Only strong cues — no bare 'subtask N'."""
    if not text:
        return None, "", False
    finished = bool(
        re.search(
            r"current subtask is finished|"
            r"this subtask is (?:done|complete|finished)|"
            r"subtask\s+\d+\s+is complete\.?(?:\s+Now|\s+next|\s+I)",
            text,
            re.I,
        )
    )
    for pat in STRONG_SUBTASK_PATTERNS:
        m = pat.search(text)
        if not m:
            continue
        sid = int(m.group(1))
        label = ""
        if m.lastindex and m.lastindex >= 2 and m.group(2):
            label = m.group(2).strip().strip('"').strip()
        return sid, label, finished
    return None, "", finished


def match_label_to_plan(label: str, subtasks: list[dict]) -> int | None:
    if not label:
        return None
    label_l = label.lower()
    best_id = None
    best = 0
    for item in subtasks:
        title = (item.get("title") or "").lower()
        words = [w for w in re.split(r"\W+", title) if len(w) >= 4]
        if not words:
            continue
        score = sum(1 for w in words if w in label_l)
        need = 2 if len(words) >= 2 else 1
        if score >= need and score > best:
            best = score
            best_id = item["id"]
    if best_id is None:
        for item in subtasks:
            title = (item.get("title") or "").lower()
            if len(title) >= 12 and title in label_l:
                return item["id"]
    return best_id


def map_agent_subtask_num(num: int, subtasks: list[dict]) -> int | None:
    """Map an agent-reported subtask number onto our stable plan ids."""
    ids = [s["id"] for s in subtasks]
    if num in ids:
        return num
    if 1 <= num <= len(ids):
        return ids[num - 1]
    return None


def assign_subtasks(steps: list[dict], subtasks: list[dict]) -> list[dict]:
    """
    Attach a stable plan subtask to every step:
    - start at first plan item (no blanks)
    - advance only on strong cues
    - never thrash backwards from noisy mentions
    """
    if not subtasks:
        return steps
    ids = [s["id"] for s in subtasks]
    idx = 0
    for step in steps:
        text = step.get("thinking") or ""
        sid, label, finished = extract_strong_subtask(text)

        mapped = match_label_to_plan(label, subtasks) if label else None
        if mapped is None and sid is not None:
            mapped = map_agent_subtask_num(sid, subtasks)

        if mapped is not None:
            new_idx = ids.index(mapped)
            if new_idx >= idx:
                idx = new_idx
        elif finished and idx + 1 < len(ids):
            idx += 1

        current = ids[idx]
        step["subtask_id"] = current
        step["subtask"] = subtask_title(subtasks, current, label)
        step["subtask_index"] = idx + 1
        step["subtask_total"] = len(ids)

    return steps


VISA_SKIP_SUBTASK_TITLES = {"Deploy and start local web app"}


def visa_subtasks(*, include_skipped: bool = False) -> list[dict]:
    cap_path = SRC / "visa" / "demo" / "trajectory_captioned.json"
    cap = json.loads(cap_path.read_text())
    out = []
    for st in cap["subtasks"]:
        title = st.get("intent_summary") or f"Subtask {st['subtask_id']}"
        if not include_skipped and title in VISA_SKIP_SUBTASK_TITLES:
            continue
        out.append(
            {
                "id": len(out) + 1,
                "title": title,
                "criterion": st.get("subtask_complete_flag") or st.get("sub_instruction") or "",
            }
        )
    return out


def drop_skipped_visa_steps(
    steps: list[dict], frames: list[Path], full_subtasks: list[dict]
) -> tuple[list[dict], list[Path], list[dict]]:
    """Remove bootstrap deploy span, then renumber the remaining plan."""
    skip_ids = {s["id"] for s in full_subtasks if s["title"] in VISA_SKIP_SUBTASK_TITLES}
    if not skip_ids:
        return steps, frames, [s for s in full_subtasks if s["title"] not in VISA_SKIP_SUBTASK_TITLES]

    dropped_is: set[int] = set()
    kept_steps: list[dict] = []
    for st in steps:
        if st.get("subtask_id") in skip_ids:
            merged = int(st.get("merged") or 1)
            i = int(st["i"])
            dropped_is.update(range(i - merged + 1, i + 1))
            continue
        kept_steps.append(st)

    kept_subs = [s for s in full_subtasks if s["id"] not in skip_ids]
    id_map = {old["id"]: new_id for new_id, old in enumerate(kept_subs, start=1)}
    for new_id, sub in enumerate(kept_subs, start=1):
        sub["id"] = new_id

    kept_frames = [fr for i, fr in enumerate(frames) if i not in dropped_is]
    old_to_new = {}
    new_i = 0
    for i in range(len(frames)):
        if i in dropped_is:
            continue
        old_to_new[i] = new_i
        new_i += 1

    for st in kept_steps:
        st["i"] = old_to_new[int(st["i"])]
        sid = id_map[st["subtask_id"]]
        st["subtask_id"] = sid
        st["subtask"] = subtask_title(kept_subs, sid, st.get("subtask") or "")
        st["subtask_index"] = sid
        st["subtask_total"] = len(kept_subs)

    return kept_steps, kept_frames, kept_subs


def write_frames_video(frames: list[Path], out_mp4: Path) -> None:
    if not frames:
        raise SystemExit(f"no frames for {out_mp4}")
    out_mp4.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="democua_frames_") as tmp:
        tmp_path = Path(tmp)
        list_file = tmp_path / "list.txt"
        lines = []
        for src in frames:
            # Re-encode path escaping for ffmpeg concat demuxer
            esc = src.resolve().as_posix().replace("'", "'\\''")
            lines.append(f"file '{esc}'")
            lines.append("duration 1")
        # last frame needs to be listed again for concat demuxer
        esc = frames[-1].resolve().as_posix().replace("'", "'\\''")
        lines.append(f"file '{esc}'")
        list_file.write_text("\n".join(lines) + "\n")
        cmd = [
            FFMPEG,
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(list_file),
            "-vf",
            f"scale={WIDTH}:-2:flags=lanczos,fps=1,format=yuv420p",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            str(CRF),
            "-g",
            "1",
            "-keyint_min",
            "1",
            "-sc_threshold",
            "0",
            "-movflags",
            "+faststart",
            "-an",
            str(out_mp4),
        ]
        print(" ", " ".join(cmd[:6]), "...", out_mp4.name)
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)


def extract_poster(video: Path, poster: Path) -> None:
    poster.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        FFMPEG,
        "-y",
        "-ss",
        "0",
        "-i",
        str(video),
        "-frames:v",
        "1",
        "-q:v",
        "4",
        str(poster),
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)


def build_run_bundle(case: str, subtasks: list[dict], title: str, instr: str) -> dict:
    run_dir = SRC / case / "real_run"
    traj = load_traj(run_dir / "traj.jsonl")
    frames = []
    steps = []
    for idx, row in enumerate(traj):
        shot = run_dir / row["screenshot_file"]
        if not shot.exists():
            raise FileNotFoundError(shot)
        frames.append(shot)
        thinking = (row.get("thought") or row.get("response") or "").strip()
        steps.append(
            {
                "i": idx,
                "step_num": row.get("step_num", idx + 1),
                "subtask_id": None,
                "subtask": "",
                "thinking": thinking,
                "action": normalize_action(row.get("action")),
            }
        )

    # Visa: label with the full plan (incl. deploy), then drop the bootstrap span.
    label_subs = visa_subtasks(include_skipped=True) if case == "visa" else subtasks
    steps = assign_subtasks(steps, label_subs)
    steps = merge_steps(steps)
    for step in steps:
        step["subtask"] = subtask_title(label_subs, step.get("subtask_id"), step.get("subtask") or "")
        if label_subs and step.get("subtask_id") in {s["id"] for s in label_subs}:
            ids = [s["id"] for s in label_subs]
            step["subtask_index"] = ids.index(step["subtask_id"]) + 1
            step["subtask_total"] = len(ids)

    if case == "visa":
        steps, frames, subtasks = drop_skipped_visa_steps(steps, frames, label_subs)
    else:
        for step in steps:
            step["subtask"] = subtask_title(subtasks, step.get("subtask_id"), step.get("subtask") or "")
            if subtasks and step.get("subtask_id") in {s["id"] for s in subtasks}:
                ids = [s["id"] for s in subtasks]
                step["subtask_index"] = ids.index(step["subtask_id"]) + 1
                step["subtask_total"] = len(ids)

    out_dir = OUT / case
    run_mp4 = out_dir / "run.mp4"
    write_frames_video(frames, run_mp4)
    poster = ROOT / "assets" / "demos" / f"democua-{case}.jpg"
    extract_poster(run_mp4, poster)

    payload = {
        "id": case,
        "title": title,
        "instruction": instr,
        "run_video": f"Demos/DemoCUA/{case}/run.mp4",
        "demo_video": f"Demos/DemoCUA/{case}/demo.mp4",
        "poster": f"assets/demos/democua-{case}.jpg",
        "subtasks": subtasks,
        "steps": steps,
    }
    (out_dir / "steps.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
    print(f"  wrote {len(steps)} steps → {out_dir / 'steps.json'}")
    return payload


def greenhouse_demo_frames() -> list[Path]:
    demo_dir = SRC / "greenhouse" / "demo"
    traj = load_traj(demo_dir / "traj.jsonl")
    frames = []
    for row in traj:
        shot = demo_dir / row["screenshot_file"]
        if shot.exists():
            frames.append(shot)
    return frames


def visa_demo_frames() -> list[Path]:
    before = SRC / "visa" / "demo" / "screenshots" / "before"
    frames = sorted(before.glob("step_*.png"))
    return frames


def main() -> None:
    if not Path(FFMPEG).exists():
        raise SystemExit("ffmpeg not found")
    if not SRC.exists():
        raise SystemExit(f"missing source dir {SRC}")

    gh_instr = (SRC / "greenhouse" / "task_instruction.txt").read_text().strip()
    visa_instr = (SRC / "visa" / "task_instruction.txt").read_text().strip()
    visa_subs = visa_subtasks()

    print("building greenhouse run…")
    build_run_bundle(
        "greenhouse",
        GREENHOUSE_SUBTASKS,
        "Schedule onsites across Greenhouse, Calendar, Gmail, and Slack",
        gh_instr,
    )
    print("building greenhouse demo video…")
    write_frames_video(greenhouse_demo_frames(), OUT / "greenhouse" / "demo.mp4")

    print("building visa run…")
    build_run_bundle(
        "visa",
        visa_subs,
        "Complete a DS-2019 J-1 visa application from desktop documents",
        visa_instr,
    )
    print("building visa demo video…")
    write_frames_video(visa_demo_frames(), OUT / "visa" / "demo.mp4")

    print("done.")


if __name__ == "__main__":
    main()
