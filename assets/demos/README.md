# Demo media

The demo reel on the page reads its entries from `window.UIMATE_DEMOS` in `i18n.js`.
Each entry expects two files here:

| File | Purpose |
|---|---|
| `<id>.mp4` | The screen recording (H.264 MP4 plays everywhere) |
| `<id>.jpg` | Poster frame shown before playback |

Expected ids, in the order they appear as tabs:

- `internal-tool` — enterprise tool the agent has never seen
- `long-repeat` — long repetitive procedure
- `general-gui` — no demonstration attached
- `recording` — how a demonstration is recorded and processed

Each entry starts with `ready: false`, which makes the tab show a placeholder and skips the
request entirely. After adding the files, flip that entry to `ready: true`.

To add, remove, or rename a demo, edit the `UIMATE_DEMOS` array in `i18n.js` — both the
English and Chinese copy live in the same entry.

## Preparing a recording

Keep clips short and at native speed. A reasonable transcode:

```bash
ffmpeg -i raw.mov -vf "scale=1600:-2" -c:v libx264 -crf 24 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an internal-tool.mp4

ffmpeg -i internal-tool.mp4 -ss 00:00:01 -frames:v 1 -q:v 3 internal-tool.jpg
```

Dropping `-an` removes the audio track, which also strips anything captured by the
microphone. Check each clip for visible credentials, customer data, or internal
hostnames before committing it.
