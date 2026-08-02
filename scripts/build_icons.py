#!/usr/bin/env python3
"""Build the favicon set from the desktop app's cursor mark.

Geometry is copied verbatim from GUI-Agent-App/scripts/render_app_icon.py, which
authors the artwork on a 170x170 tile: a Tencent-blue cursor with a navy facet,
behind it a 16%-opacity navy ghost of the same shape suggesting motion.

That script sizes the mark for macOS, which insets app icons inside their tile,
leaving it small and off-centre for a favicon. Here it is scaled to fill the
plate and centred on its own ink instead.

The ghost is rotated, so it reaches above and left of the drawing origin. Centring
therefore has to work from the rendered ink bounds of ghost and cursor together --
using the cursor's bounds, or the path coordinates, puts the mark off-centre.

Usage: python3 scripts/build_icons.py
"""
import ctypes.util
import glob
import io
import os
import sys

# cairosvg -> cairocffi loads libcairo via ctypes.util.find_library("cairo").
# Homebrew installs it where dyld does not look by default, and SIP strips DYLD_*
# from the system python, so resolve the full path ourselves.
_orig_find_library = ctypes.util.find_library


def _find_library(name: str):
    found = _orig_find_library(name)
    if found:
        return found
    for prefix in ("/opt/homebrew/lib", "/usr/local/lib"):
        hits = sorted(glob.glob(os.path.join(prefix, f"lib{name}*.dylib")))
        if hits:
            return hits[0]
    return None


ctypes.util.find_library = _find_library

import cairosvg  # noqa: E402
from PIL import Image  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(os.path.dirname(HERE), "assets")

TILE = 170.0          # source artwork's coordinate system
PLATE_RADIUS = 38.0   # corner radius on that tile, from the app icon
FILL = 0.84           # fraction of the tile the mark's ink spans

BG = "#FFFFFF"
BORDER = "#D3D1C7"
BLUE = "#2B5CE0"
NAVY = "#101E56"

CURSOR = "M0 0 L0 20.5 L5.6 15.6 L9.2 23 L13.2 21.1 L9.6 13.9 L16 13.2 Z"
FACET = "M0 0 L0 20.5 L5.6 15.6 Z"

# Ghost and cursor, in the artwork's own units. The app icon wraps this in a
# translate() to place it; position is recomputed below so it is left out here.
GLYPH = f"""  <g opacity="0.16" transform="rotate(-32) scale(3.3,2.9)">
    <path d="{CURSOR}" fill="{NAVY}" stroke="{NAVY}" stroke-width="3"
          stroke-linejoin="round" stroke-linecap="round"/>
  </g>
  <g transform="scale(3.1)">
    <path d="{CURSOR}" fill="{BLUE}" stroke="{BLUE}" stroke-width="3"
          stroke-linejoin="round" stroke-linecap="round"/>
    <path d="{FACET}" fill="{NAVY}" stroke="{NAVY}" stroke-width="2.6"
          stroke-linejoin="round"/>
  </g>"""


def ink_bounds():
    """Bounds of everything the glyph paints, in artwork units.

    Measured from a render rather than the path data: strokes widen the shape and
    the ghost's rotation moves it, and both have to be inside the result.
    """
    pad, span, px_per_unit = 100.0, 400.0, 4
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="{-pad} {-pad} {span} {span}">{GLYPH}</svg>'
    )
    png = cairosvg.svg2png(
        bytestring=svg.encode("utf-8"),
        output_width=int(span * px_per_unit),
        output_height=int(span * px_per_unit),
    )
    alpha = Image.open(io.BytesIO(png)).convert("RGBA").getchannel("A")
    # The ghost lands near alpha 41 of 255; a low cutoff keeps all of it while
    # dropping stray antialiasing.
    box = alpha.point(lambda a: 255 if a > 3 else 0).getbbox()
    if box is None:
        raise SystemExit("glyph rendered empty")
    x0, y0, x1, y1 = (v / px_per_unit - pad for v in box)
    return x0, y0, x1, y1


def placement():
    """Scale and offset that fill the plate with the mark and centre it."""
    x0, y0, x1, y1 = ink_bounds()
    w, h = x1 - x0, y1 - y0
    k = FILL * TILE / max(w, h)
    tx = TILE / 2 - k * (x0 + x1) / 2
    ty = TILE / 2 - k * (y0 + y1) / 2

    margin = (1 - FILL) / 2 * TILE
    if min(w, h) * k > TILE or margin < 4:
        raise SystemExit(f"FILL={FILL} leaves no margin; the ghost would touch the plate edge")
    print(f"  ink {w:.1f}x{h:.1f} units -> scale {k:.4f}, offset ({tx:.2f},{ty:.2f})")
    print(f"  mark spans {max(w, h) * k:.1f}/{TILE:.0f} of the tile, margin {margin:.1f}")
    return k, tx, ty


def svg_document(k, tx, ty, *, rounded):
    """The icon as SVG. Rounded for browsers, square for iOS, which masks its own."""
    plate = (
        f'<rect x="0" y="0" width="{TILE:.0f}" height="{TILE:.0f}" rx="{PLATE_RADIUS:.0f}" '
        f'fill="{BG}" stroke="{BORDER}" stroke-width="1"/>'
        if rounded
        else f'<rect x="0" y="0" width="{TILE:.0f}" height="{TILE:.0f}" fill="{BG}"/>'
    )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {TILE:.0f} {TILE:.0f}">\n'
        f"  {plate}\n"
        f'  <g id="glyph" transform="translate({tx:.3f},{ty:.3f}) scale({k:.4f})">\n'
        f"{GLYPH}\n"
        f"  </g>\n"
        f"</svg>\n"
    )


def main():
    k, tx, ty = placement()

    rounded = svg_document(k, tx, ty, rounded=True)
    svg_path = os.path.join(ASSETS, "favicon.svg")
    with open(svg_path, "w") as fh:
        fh.write(rounded)
    print(f"  wrote {os.path.relpath(svg_path)}")

    for size in (16, 32, 192):
        out = os.path.join(ASSETS, f"favicon-{size}.png")
        cairosvg.svg2png(
            bytestring=rounded.encode("utf-8"),
            write_to=out,
            output_width=size,
            output_height=size,
        )
        print(f"  wrote {os.path.relpath(out)} ({size}px)")

    out = os.path.join(ASSETS, "apple-touch-icon.png")
    cairosvg.svg2png(
        bytestring=svg_document(k, tx, ty, rounded=False).encode("utf-8"),
        write_to=out,
        output_width=180,
        output_height=180,
    )
    print(f"  wrote {os.path.relpath(out)} (180px, square for iOS masking)")


if __name__ == "__main__":
    sys.exit(main())
