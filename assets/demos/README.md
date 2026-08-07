# Demo media

The demo reel on the page reads its entries from `window.UIMATE_DEMOS` in `i18n.js`.
Each ready entry expects:

| File | Purpose |
|---|---|
| `<id>.mp4` | Screen recording (H.264 MP4) |
| `<id>.jpg` | Poster frame shown before playback |

Current ids:

- `general-1` — General CUA · 2048 (ready) → `Demos/Genral/demo1.mp4`
- `general-2` — General CUA · Finder / Desktop (ready) → `Demos/Genral/demo2.mp4`

Posters live here; mp4s stay under `Demos/` so the repo does not duplicate large files.
DemoCUA clips will land under `Demos/DemoCUA/` and get wired the same way.

To add a demo: drop the files here, append an entry in `UIMATE_DEMOS` with `ready: true`.

## Preparing a recording

Keep clips short and at native speed. A reasonable transcode:

```bash
ffmpeg -i raw.mov -vf "scale=1600:-2" -c:v libx264 -crf 24 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an general-1.mp4

ffmpeg -i general-1.mp4 -ss 00:00:01 -frames:v 1 -q:v 3 general-1.jpg
```

Check each clip for visible credentials, customer data, or internal hostnames before committing.
