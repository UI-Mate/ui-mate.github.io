#!/usr/bin/env python3
"""Build DemoCUA GameDev (godot-06) site assets from Demos/DemoCUA/gamedev/demo_run."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from build_democua_assets import (  # noqa: E402
    FFMPEG,
    WIDTH,
    build_no_demo,
    extract_poster,
    merge_steps,
    normalize_action,
    subtask_title,
    write_frames_video,
)

SRC = ROOT / "Demos" / "DemoCUA" / "gamedev" / "demo_run"
OUT = ROOT / "Demos" / "DemoCUA" / "gamedev"
POSTER = ROOT / "assets" / "demos" / "democua-gamedev.jpg"
JPEG_Q = 4

DEMO_SUBTASKS = OUT / "demo_video" / "derived" / "subtasks.json"
SUBTASK_DONE_RE = re.compile(
    r"subtask_complete.*?current_subtask_idx\s*>?\s*(\d+)", re.S | re.I
)


def gamedev_subtasks() -> list[dict]:
    """Plan handed to the agent: the subtasks segmented from the human demo."""
    data = json.loads(DEMO_SUBTASKS.read_text())
    return [
        {
            "id": i + 1,
            "title": st.get("intent_summary") or f"Subtask {i + 1}",
            "criterion": st.get("subtask_complete_flag") or st.get("sub_instruction") or "",
        }
        for i, st in enumerate(data["subtasks"])
    ]


def assign_reported_subtasks(
    steps: list[dict], traj: list[dict], subtasks: list[dict]
) -> list[dict]:
    """Split steps on the agent's own subtask_complete calls (0-based idx)."""
    ids = [s["id"] for s in subtasks]
    pos = 0
    for step, row in zip(steps, traj):
        step["subtask_id"] = ids[min(pos, len(ids) - 1)]
        done = SUBTASK_DONE_RE.search(row.get("raw_response") or "")
        if done:
            pos = max(pos, int(done.group(1)) + 1)
    return steps


def load_traj(path: Path) -> list[dict]:
    return [json.loads(line) for line in path.read_text().splitlines() if line.strip()]


def clean_thinking(text: str) -> str:
    t = (text or "").strip()
    t = re.sub(r"</?think>", "", t, flags=re.I).strip()
    return t


def export_jpeg(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        FFMPEG,
        "-y",
        "-i",
        str(src),
        "-vf",
        f"scale={WIDTH}:-2:flags=lanczos",
        "-q:v",
        str(JPEG_Q),
        str(dst),
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)


def drop_empty_subtasks(steps: list[dict], subtasks: list[dict]) -> tuple[list[dict], list[dict]]:
    used = {s.get("subtask_id") for s in steps if s.get("subtask_id") is not None}
    kept = [s for s in subtasks if s["id"] in used]
    if len(kept) == len(subtasks):
        return steps, subtasks
    id_map = {old["id"]: i + 1 for i, old in enumerate(kept)}
    for i, sub in enumerate(kept, start=1):
        sub["id"] = i
    for step in steps:
        sid = step.get("subtask_id")
        if sid is None:
            continue
        step["subtask_id"] = id_map[sid]
        step["subtask"] = subtask_title(kept, step["subtask_id"], step.get("subtask") or "")
        step["subtask_index"] = step["subtask_id"]
        step["subtask_total"] = len(kept)
    return steps, kept


def main() -> None:
    steps_only = "--steps-only" in sys.argv
    if not Path(FFMPEG).exists():
        raise SystemExit("ffmpeg not found")
    if not SRC.exists():
        raise SystemExit(f"missing {SRC}")

    traj = load_traj(SRC / "traj.jsonl")
    instr = (SRC / "task_instruction.txt").read_text().strip()
    frames_dir = OUT / "frames"
    if not steps_only and frames_dir.exists():
        shutil.rmtree(frames_dir)
    frames_dir.mkdir(parents=True, exist_ok=True)

    frames: list[Path] = []
    steps: list[dict] = []
    for idx, row in enumerate(traj):
        shot = SRC / row["screenshot_file"]
        if not shot.exists():
            raise FileNotFoundError(shot)
        jpg_name = f"{idx + 1:04d}.jpg"
        jpg_path = frames_dir / jpg_name
        if not steps_only:
            export_jpeg(shot, jpg_path)
        frames.append(jpg_path)
        steps.append(
            {
                "i": idx,
                "step_num": row.get("step_num", idx + 1),
                "subtask_id": None,
                "subtask": "",
                "thinking": clean_thinking(row.get("thought") or row.get("response") or ""),
                "action": normalize_action(row.get("action")),
                "shot": f"Demos/DemoCUA/gamedev/frames/{jpg_name}",
            }
        )

    subtasks = gamedev_subtasks()
    steps = assign_reported_subtasks(steps, traj, subtasks)
    steps = merge_steps(steps)
    for step in steps:
        step["subtask"] = subtask_title(subtasks, step.get("subtask_id"), step.get("subtask") or "")
        if step.get("subtask_id") in {s["id"] for s in subtasks}:
            ids = [s["id"] for s in subtasks]
            step["subtask_index"] = ids.index(step["subtask_id"]) + 1
            step["subtask_total"] = len(ids)
        # Keep shot on the last frame of a merge.
        if "shot" not in step:
            pass

    steps, subtasks = drop_empty_subtasks(steps, subtasks)

    run_mp4 = OUT / "run.mp4"
    if not steps_only:
        # Video uses the (possibly merged) last frames only would skip intermediates;
        # encode the full exported frame list for a continuous 1 fps reel.
        write_frames_video(frames, run_mp4)
        extract_poster(run_mp4, POSTER)

    # Remap step.i onto the full-frame timeline (already 0..n-1 from traj).
    # After merge, i already points at the last original index — correct for seeking.

    payload = {
        "id": "gamedev",
        "title": "Add timer-based bullet firing in Godot w/ demo",
        "instruction": instr,
        "run_video": "Demos/DemoCUA/gamedev/run.mp4",
        "demo_video": "Demos/DemoCUA/gamedev/demo.mp4",
        "poster": "assets/demos/democua-gamedev.jpg",
        "subtasks": subtasks,
        "steps": steps,
    }
    (OUT / "steps.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
    print(f"wrote {len(steps)} steps / {len(subtasks)} subtasks / {len(frames)} frames → {OUT}")

    if steps_only:
        return

    if (OUT / "no_demo_run" / "traj.jsonl").exists():
        build_no_demo("gamedev")

    demo_frames_dir = OUT / "demo_video" / "replicated" / "screenshots" / "before"
    if demo_frames_dir.exists():
        demo_frames = sorted(demo_frames_dir.glob("step_*.png"))
        if demo_frames:
            write_frames_video(demo_frames, OUT / "demo.mp4")
            print(f"wrote demo.mp4 ({len(demo_frames)} frames)")


if __name__ == "__main__":
    main()
