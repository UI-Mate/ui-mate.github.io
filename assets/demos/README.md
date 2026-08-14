# Demo media

The demo reel on the page reads its entries from `window.UIMATE_DEMOS` in `i18n.js`.
Each ready entry expects:

| File | Purpose |
|---|---|
| `<id>.mp4` | Screen recording (H.264 MP4) |
| `<id>.jpg` | Poster frame shown before playback |

Current ids:

- `general-1` — General CUA · 2048 (ready) → `Demos/General/2048/`
- `general-2` — General CUA · Books (ready) → `Demos/General/books/`
- `democua-gamedev` — DemoCUA · GameDev → `Demos/DemoCUA/gamedev/`
- `democua-visa` — DemoCUA · Visa → `Demos/DemoCUA/visa/`

Posters live here; mp4s stay under `Demos/` so the repo does not duplicate large files.

DemoCUA entries set `kind: "democua"` plus:

| File | Purpose |
|---|---|
| `run.mp4` | Agent execution (main stage + step-viewer frames at 1 fps) |
| `no_demo.mp4` | Same task run without the demonstration, for the side-by-side tab |
| `demo.mp4` | Human demonstration slideshow (1 s / frame) |
| `steps.json` | Subtask plan + per-step thinking / action |
| `democua-<id>.jpg` | Poster for the agent-run player |

`noDemoSeek` is a second offset into `no_demo.mp4`, where second N holds step N+1. `runSeek` is the
same for `run.mp4`, so it equals the target step's `i`, while `viewerStep` is that step's index in
the `steps.json` array. Those two differ whenever steps were merged — read them off `steps.json`
rather than assuming they match.

Rebuild from local `UI_Mate/democua/` sources (visa / greenhouse):

```bash
python3 scripts/build_democua_assets.py
```

Rebuild GameDev DemoCUA from `Demos/DemoCUA/gamedev/demo_run`:

```bash
python3 scripts/build_gamedev_assets.py
```

No-demo full run (`no_demo.mp4`) is encoded from `no_demo_run/` by the same script, and the human
demo (`demo.mp4`) from `demo_video/replicated/screenshots/before/`. The subtask plan comes from
`demo_video/derived/subtasks.json`; step boundaries follow the agent's own `subtask_complete` calls.
Pass `--steps-only` to relabel `steps.json` without re-encoding the videos.

Re-encode just a no-demo run — reads `Demos/DemoCUA/<case>/no_demo_run/`, so it needs no
`UI_Mate/` sources and leaves `run.mp4` / `steps.json` untouched:

```bash
python3 scripts/build_democua_assets.py --no-demo visa
```

The `no_demo_run/` captures themselves stay out of git; keep them locally to rebuild.

To add a general demo: drop the files here, append an entry in `UIMATE_DEMOS` with `ready: true`.
For DemoCUA, also set `demoSrc`, `stepsSrc`, and rebuild assets.

## Preparing a recording

Keep clips short and at native speed. A reasonable transcode:

```bash
ffmpeg -i raw.mov -vf "scale=1600:-2" -c:v libx264 -crf 24 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an general-1.mp4

ffmpeg -i general-1.mp4 -ss 00:00:01 -frames:v 1 -q:v 3 general-1.jpg
```

Check each clip for visible credentials, customer data, or internal hostnames before committing.
