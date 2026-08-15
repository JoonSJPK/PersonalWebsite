#!/usr/bin/env python3
"""Build web-sized derivatives for every source image in the site.

The photos in websiteImages/ are untouched phone exports — full-resolution
PNGs, several of them over 10 MB. The pages display them at a few hundred
pixels wide, so the browser was decoding ~12 megapixels (≈48 MB of bitmap)
to paint a 600 px box. That decode, not the download, is what made opening
a project stutter.

This writes two WebP derivatives next to each source:

    IMG_1295.png  ->  IMG_1295.800.webp    cards and gallery thumbnails
                      IMG_1295.1600.webp   expanded stage, lightbox, figures

and turns animated GIFs into a looping MP4 plus a still poster frame:

    task3_demo.gif -> task3_demo.mp4
                      task3_demo.poster.webp

Sources are left alone — they stay the masters, so this can be re-run at
different sizes later. The site resolves derivative paths at runtime and
falls back to the original if one is missing, so a partial run is safe.

Usage:  python3 tools/optimize_images.py [--force]
"""

import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
TREES = ['websiteImages', 'images']
STILL_EXT = {'.png', '.jpg', '.jpeg'}

# (long edge in px, WebP quality)
SIZES = [(800, 80), (1600, 82)]

FORCE = '--force' in sys.argv


def is_derivative(path: Path) -> bool:
    """Our own output, from a previous run — never treat it as a source."""
    return path.suffix.lower() == '.webp' or path.stem.endswith('.poster')


def fresh(out: Path, src: Path) -> bool:
    return not FORCE and out.exists() and out.stat().st_mtime >= src.stat().st_mtime


def build_still(src: Path) -> tuple[int, int]:
    saved_from = saved_to = 0
    im = None
    for edge, quality in SIZES:
        out = src.with_suffix(f'.{edge}.webp')
        if fresh(out, src):
            continue
        if im is None:
            # exif_transpose first: phone photos carry a rotation flag that
            # Pillow does not apply on its own, unlike every browser.
            im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
        copy = im.copy()
        copy.thumbnail((edge, edge), Image.LANCZOS)
        copy.save(out, 'WEBP', quality=quality, method=4)
        saved_from += src.stat().st_size
        saved_to += out.stat().st_size
        print(f'  {out.relative_to(ROOT)}  '
              f'{src.stat().st_size / 1048576:.1f} MB -> {out.stat().st_size / 1024:.0f} KB')
    return saved_from, saved_to


def build_motion(src: Path) -> tuple[int, int]:
    """GIF -> H.264 MP4 (played muted+looping) plus a poster still."""
    mp4 = src.with_suffix('.mp4')
    poster = src.with_suffix('.poster.webp')
    saved_from = saved_to = 0

    if not fresh(mp4, src):
        subprocess.run([
            'ffmpeg', '-y', '-loglevel', 'error', '-i', str(src),
            # H.264 needs even dimensions and yuv420p for broad playback.
            '-vf', 'scale=min(1280\\,iw):-2:flags=lanczos',
            '-c:v', 'libx264', '-crf', '26', '-preset', 'slow',
            '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart',
            str(mp4),
        ], check=True)
        saved_from += src.stat().st_size
        saved_to += mp4.stat().st_size
        print(f'  {mp4.relative_to(ROOT)}  '
              f'{src.stat().st_size / 1048576:.1f} MB -> {mp4.stat().st_size / 1024:.0f} KB')

    if not fresh(poster, src):
        frame = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
        frame.thumbnail((800, 800), Image.LANCZOS)
        frame.save(poster, 'WEBP', quality=80, method=4)

    return saved_from, saved_to


def main() -> None:
    total_from = total_to = 0
    for tree in TREES:
        base = ROOT / tree
        if not base.is_dir():
            continue
        print(f'{tree}/')
        for src in sorted(base.rglob('*')):
            if not src.is_file() or is_derivative(src):
                continue
            ext = src.suffix.lower()
            try:
                if ext in STILL_EXT:
                    a, b = build_still(src)
                elif ext == '.gif':
                    a, b = build_motion(src)
                else:
                    continue
            except Exception as exc:                      # noqa: BLE001
                print(f'  !! {src.relative_to(ROOT)}: {exc}')
                continue
            total_from += a
            total_to += b

    if total_from:
        print(f'\nrewrote {total_from / 1048576:.0f} MB of sources as '
              f'{total_to / 1048576:.1f} MB of derivatives')
    else:
        print('\nnothing to do — derivatives are up to date')


if __name__ == '__main__':
    main()
