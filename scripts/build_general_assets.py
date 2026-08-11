#!/usr/bin/env python3
"""Build General CUA site assets: JPEG step frames + steps.json (+ optional run.mp4)."""

from __future__ import annotations

import json
import shutil
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "Demos" / "General"
FFMPEG = shutil.which("ffmpeg") or "/opt/homebrew/bin/ffmpeg"
WIDTH = 1280
CRF = 28
JPEG_Q = 4  # ffmpeg -q:v (2–5 is high quality)

SESSIONS = [
    {
        "id": "2048",
        "demo_id": "general-1",
        "session": Path(
            "/Users/yingchenyu/.gui-agent-app/artifacts/local-sessions/"
            "session-1786008066922-v2dif4-20260806-172127"
        ),
        "title": "Play 2048 from the screen alone",
        "poster": ROOT / "assets" / "demos" / "general-1.jpg",
    },
    {
        "id": "books",
        "demo_id": "general-2",
        "session": Path(
            "/Users/yingchenyu/.gui-agent-app/artifacts/local-sessions/"
            "session-1786009487444-qccn8r-20260806-174925"
        ),
        "title": "Fill authors from Safari into Excel",
        "poster": ROOT / "assets" / "demos" / "general-2.jpg",
    },
]


def load_traj(path: Path) -> list[dict]:
    return [json.loads(line) for line in path.read_text().splitlines() if line.strip()]


def format_action(action: dict | None) -> str:
    if not action:
        return ""
    kind = str(action.get("kind") or "")
    if kind == "desktop.click":
        btn = action.get("button") or "left"
        base = f"pyautogui.click({action.get('x')}, {action.get('y')})"
        return base if btn == "left" else f"{base}  # {btn}"
    if kind == "desktop.double_click":
        return f"pyautogui.doubleClick({action.get('x')}, {action.get('y')})"
    if kind == "desktop.move":
        return f"pyautogui.moveTo({action.get('x')}, {action.get('y')})"
    if kind == "desktop.drag":
        return (
            f"pyautogui.dragTo({action.get('x')}, {action.get('y')})"
            if action.get("x") is not None
            else "pyautogui.drag(...)"
        )
    if kind == "desktop.write":
        return f"pyautogui.write({action.get('text')!r})"
    if kind == "desktop.press":
        keys = action.get("keys") or []
        if len(keys) == 1:
            return f"pyautogui.press({keys[0]!r})"
        if keys:
            return "pyautogui.hotkey(" + ", ".join(repr(k) for k in keys) + ")"
        return "pyautogui.press(...)"
    if kind == "desktop.hotkey":
        keys = action.get("keys") or []
        return "pyautogui.hotkey(" + ", ".join(repr(k) for k in keys) + ")"
    if kind == "desktop.scroll":
        dx = action.get("dx")
        dy = action.get("dy")
        if dy is not None:
            return f"pyautogui.scroll({dy})"
        if dx is not None:
            return f"pyautogui.hscroll({dx})"
        return f"pyautogui.scroll({action.get('pixels') or action.get('amount') or 0})"
    if kind == "finish":
        status = action.get("status") or "success"
        return f"DONE ({status})"
    return json.dumps(action, ensure_ascii=False)


def format_step_action(row: dict) -> str:
    executions = row.get("executions") or []
    lines = []
    for ex in executions:
        line = format_action(ex.get("action") if isinstance(ex, dict) else None)
        if line:
            lines.append(line)
    if lines:
        return "\n".join(lines)
    return (row.get("action_text") or "").strip()


def merge_steps(steps: list[dict]) -> list[dict]:
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
            last["action"] = f"{action}  ×{j - i}"
            last["merged"] = j - i
            last["i"] = steps[j - 1]["i"]
            last["shot"] = steps[j - 1].get("shot") or last.get("shot")
            out.append(last)
            i = j
            continue
        out.append(steps[i])
        i += 1
    return out


# Mac captures are stored as 16:9 but the desktop is 16:10 — they look
# horizontally stretched. Correct to 16:10, then pad onto a wider canvas.
MAC_CONTENT_ASPECT = 16 / 10
MAC_CANVAS_ASPECT = 16 / 9
PAD_COLOR = "0x0d1220"


def export_jpeg(src: Path, dst: Path, *, mac_correct: bool = True) -> None:
    """Export a viewer frame. Mac frames are unstretched to 16:10 + side pads."""
    dst.parent.mkdir(parents=True, exist_ok=True)
    if mac_correct:
        # Height-limited export; content width = h * 16/10; canvas = h * 16/9.
        content_h = min(720, WIDTH)  # keep prior scale budget
        # Prefer max canvas width WIDTH with 16:9 canvas.
        canvas_w = WIDTH
        canvas_h = int(round(canvas_w / MAC_CANVAS_ASPECT))
        if canvas_h % 2:
            canvas_h -= 1
        content_w = int(round(canvas_h * MAC_CONTENT_ASPECT))
        if content_w % 2:
            content_w -= 1
        vf = (
            f"scale={content_w}:{canvas_h}:flags=lanczos,"
            f"pad={canvas_w}:{canvas_h}:(ow-iw)/2:(oh-ih)/2:color={PAD_COLOR}"
        )
    else:
        vf = f"scale=min({WIDTH}\\,iw):-2:flags=lanczos"
    cmd = [
        FFMPEG,
        "-y",
        "-i",
        str(src),
        "-vf",
        vf,
        "-q:v",
        str(JPEG_Q),
        str(dst),
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)


def write_frames_video(frames: list[Path], out_mp4: Path) -> None:
    if not frames:
        return
    out_mp4.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="general_frames_") as tmp:
        tmp_path = Path(tmp)
        list_file = tmp_path / "list.txt"
        lines = []
        for src in frames:
            esc = src.resolve().as_posix().replace("'", "'\\''")
            lines.append(f"file '{esc}'")
            lines.append("duration 1")
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
            "fps=1,format=yuv420p",
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


def build_case(case: dict) -> None:
    session: Path = case["session"]
    if not session.exists():
        raise SystemExit(f"missing session {session}")
    traj = load_traj(session / "traj.jsonl")
    instr = (session / "task_instruction.txt").read_text().strip()
    shots_dir = session / "screenshots"

    out_dir = OUT / case["id"]
    frames_dir = out_dir / "frames"
    if frames_dir.exists():
        shutil.rmtree(frames_dir)
    frames_dir.mkdir(parents=True, exist_ok=True)

    exported_frames: list[Path] = []
    steps: list[dict] = []
    for idx, row in enumerate(traj):
        name = row.get("obs_screenshot_file") or f"step-{row.get('step_num', idx + 1)}.png"
        # 2048 step 2 address-bar history is private — reuse step 1 frame.
        if case["id"] == "2048" and int(row.get("step_num") or idx + 1) == 2:
            name = "step-1.png"
        shot = shots_dir / name
        if not shot.exists():
            raise FileNotFoundError(shot)
        jpg_name = f"{idx:04d}.jpg"
        jpg_path = frames_dir / jpg_name
        export_jpeg(shot, jpg_path, mac_correct=True)
        exported_frames.append(jpg_path)
        rel = f"Demos/General/{case['id']}/frames/{jpg_name}"
        steps.append(
            {
                "i": idx,
                "step_num": row.get("step_num", idx + 1),
                "thinking": (row.get("thought") or "").strip(),
                "action": format_step_action(row),
                "shot": rel,
            }
        )

    steps = merge_steps(steps)

    run_mp4 = out_dir / "run.mp4"
    write_frames_video(exported_frames, run_mp4)
    # Poster from first exported frame
    shutil.copyfile(frames_dir / "0000.jpg", case["poster"])

    payload = {
        "id": case["demo_id"],
        "title": case["title"],
        "instruction": instr,
        "run_video": f"Demos/General/{case['id']}/run.mp4",
        "poster": f"assets/demos/{case['poster'].name}",
        "subtasks": [],
        "steps": steps,
    }
    (out_dir / "steps.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
    print(f"  wrote {len(steps)} steps / {len(exported_frames)} frames → {out_dir}")


def main() -> None:
    if not Path(FFMPEG).exists():
        raise SystemExit("ffmpeg not found")
    for case in SESSIONS:
        print(f"building {case['id']}…")
        build_case(case)
    print("done.")


if __name__ == "__main__":
    main()
