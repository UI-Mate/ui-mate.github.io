#!/usr/bin/env python3
"""Turn the exported Celestia audit report into a hostable standalone page.

The generator emits one self-contained HTML file with every screenshot inlined as
a base64 data URI, which lands around 63 MB and has to finish downloading before
the reader sees anything. This rewrites it into `celestia-audit/`, with the PNGs
as separate files the browser fetches on demand.

The page's own render script needs no changes: its `img()` helper already sets
loading="lazy", and the lightbox reads `e.target.src`, so both work unchanged
once the data URIs become relative paths.

Usage:
    python3 scripts/build_celestia_audit.py "/path/to/EXPORT.html"
"""

import hashlib
import json
import re
import shutil
import sys
from base64 import b64decode
from pathlib import Path

DEST = Path(__file__).resolve().parent.parent / "celestia-audit"
SHOTS_DIRNAME = "shots"
DATA_URI = re.compile(r"^data:image/(png|jpeg|webp);base64,(.+)$", re.S)
AUDIT_DATA = re.compile(
    r'(<script id="auditData" type="application/json">)(.*?)(</script>)', re.S
)
OFFLINE_META = re.compile(r'<meta name="offline-assets"[^>]*>')
EXT = {"png": "png", "jpeg": "jpg", "webp": "webp"}

# The report is meant to be shared by link, not found through a search engine.
# Drop this line if you want it indexed.
ROBOTS_META = '<meta name="robots" content="noindex,nofollow">'


def extract_shots(node, shots_dir, seen):
    """Replace every inline image with a relative path, writing it out once.

    Identical screenshots recur across rollouts, so files are keyed by content
    hash and written a single time; `seen` maps hash to filename.
    """
    if isinstance(node, dict):
        return {k: extract_shots(v, shots_dir, seen) for k, v in node.items()}
    if isinstance(node, list):
        return [extract_shots(v, shots_dir, seen) for v in node]
    if not isinstance(node, str):
        return node

    match = DATA_URI.match(node)
    if not match:
        return node

    raw = b64decode(match.group(2), validate=False)
    digest = hashlib.sha256(raw).hexdigest()[:16]
    if digest not in seen:
        name = f"{digest}.{EXT[match.group(1)]}"
        (shots_dir / name).write_bytes(raw)
        seen[digest] = name
    return f"{SHOTS_DIRNAME}/{seen[digest]}"


def main():
    if len(sys.argv) != 2:
        sys.exit(f"usage: {Path(sys.argv[0]).name} <exported-report.html>")

    source = Path(sys.argv[1])
    if not source.is_file():
        sys.exit(f"no such file: {source}")

    html = source.read_text(encoding="utf-8")
    match = AUDIT_DATA.search(html)
    if not match:
        sys.exit("no <script id=\"auditData\"> block found — is this the right export?")

    open_tag, payload, close_tag = match.groups()
    data = json.loads(payload)

    shots_dir = DEST / SHOTS_DIRNAME
    if shots_dir.exists():
        shutil.rmtree(shots_dir)
    shots_dir.mkdir(parents=True, exist_ok=True)

    seen = {}
    rewritten = extract_shots(data, shots_dir, seen)

    # separators= keeps the payload compact; ensure_ascii=False keeps the
    # Chinese copy readable in the served file.
    slim = json.dumps(rewritten, ensure_ascii=False, separators=(",", ":"))
    if "</script>" in slim:
        sys.exit("payload contains </script> and would break the page")

    out = html[: match.start()] + open_tag + slim + close_tag + html[match.end() :]

    # The export advertises its inlined images; that claim is no longer true.
    replacement = f'{ROBOTS_META}<meta name="audit-assets" content="{len(seen)}-external-images">'
    out, swapped = OFFLINE_META.subn(replacement, out, count=1)
    if not swapped:
        out = out.replace("<head>", "<head>" + ROBOTS_META, 1)

    (DEST / "index.html").write_text(out, encoding="utf-8")

    shot_bytes = sum(p.stat().st_size for p in shots_dir.iterdir())
    mb = 1024 * 1024
    print(f"source            {source.stat().st_size / mb:8.1f} MB")
    print(f"index.html        {len(out.encode()) / mb:8.1f} MB   <- initial load")
    print(f"{SHOTS_DIRNAME}/  {shot_bytes / mb:8.1f} MB   {len(seen)} files, fetched on demand")


if __name__ == "__main__":
    main()
