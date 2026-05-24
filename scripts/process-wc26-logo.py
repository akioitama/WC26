"""Remove white background from official WC26 logo. Run: python scripts/process-wc26-logo.py"""
from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_INPUT = ROOT / "assets" / "wc26-logo-source.jpg"
DEFAULT_OUTPUT = ROOT / "public" / "brand" / "wc26-logo.png"


def lum(r: int, g: int, b: int) -> float:
    return 0.299 * r + 0.587 * g + 0.114 * b


def is_bg_white(r: int, g: int, b: int, a: int, threshold: int = 246) -> bool:
    return a > 0 and r >= threshold and g >= threshold and b >= threshold


def flood_background(pixels, w: int, h: int) -> None:
    seen = bytearray(w * h)
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(h):
        q.append((0, y))
        q.append((w - 1, y))

    while q:
        x, y = q.popleft()
        i = y * w + x
        if seen[i]:
            continue
        seen[i] = 1
        r, g, b, a = pixels[x, y]
        if not is_bg_white(r, g, b, a):
            continue
        pixels[x, y] = (255, 255, 255, 0)
        if x > 0:
            q.append((x - 1, y))
        if x + 1 < w:
            q.append((x + 1, y))
        if y > 0:
            q.append((x, y - 1))
        if y + 1 < h:
            q.append((x, y + 1))


def clear_interior_holes(pixels, w: int, h: int) -> None:
    visited = bytearray(w * h)

    for y in range(h):
        for x in range(w):
            start = y * w + x
            if visited[start]:
                continue
            r, g, b, a = pixels[x, y]
            if a == 0 or lum(r, g, b) < 235:
                visited[start] = 1
                continue

            comp: list[tuple[int, int]] = []
            q: deque[tuple[int, int]] = deque([(x, y)])
            visited[start] = 1
            touches_edge = False

            while q:
                cx, cy = q.popleft()
                comp.append((cx, cy))
                if cx == 0 or cy == 0 or cx == w - 1 or cy == h - 1:
                    touches_edge = True
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if nx < 0 or ny < 0 or nx >= w or ny >= h:
                        continue
                    ni = ny * w + nx
                    if visited[ni]:
                        continue
                    nr, ng, nb, na = pixels[nx, ny]
                    if na == 0 or lum(nr, ng, nb) < 235:
                        visited[ni] = 1
                        continue
                    visited[ni] = 1
                    q.append((nx, ny))

            if not touches_edge and len(comp) > 120:
                for cx, cy in comp:
                    pixels[cx, cy] = (255, 255, 255, 0)


def trim_transparent(img: Image.Image) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    x0, y0, x1, y1 = bbox
    pad = 4
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(img.width, x1 + pad)
    y1 = min(img.height, y1 + pad)
    return img.crop((x0, y0, x1, y1))


def remove_outer_fringe(pixels, w: int, h: int) -> None:
    """Strip JPEG white halos touching transparent pixels."""
    to_clear: list[tuple[int, int]] = []
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a == 0 or lum(r, g, b) < 238:
                continue
            for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                if nx < 0 or ny < 0 or nx >= w or ny >= h:
                    to_clear.append((x, y))
                    break
                if pixels[nx, ny][3] == 0:
                    to_clear.append((x, y))
                    break
    for x, y in to_clear:
        pixels[x, y] = (255, 255, 255, 0)


def process(input_path: Path, output_path: Path) -> None:
    img = Image.open(input_path).convert("RGBA")
    pixels = img.load()
    w, h = img.size
    assert pixels is not None

    flood_background(pixels, w, h)
    clear_interior_holes(pixels, w, h)
    remove_outer_fringe(pixels, w, h)
    trimmed = trim_transparent(img)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    trimmed.save(output_path, format="PNG", optimize=True)
    print(f"Wrote {output_path} ({trimmed.width}x{trimmed.height})")


if __name__ == "__main__":
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_INPUT
    dst = Path(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_OUTPUT
    if not src.exists():
        raise SystemExit(f"Input not found: {src}")
    process(src, dst)
