#!/usr/bin/env python3
"""Convert the analog neural network writeup into a static page for the site.

The markdown lives at the repo root as analog_NN.md and its figures are
mirrored under websiteImages/analog_nn/docs_images/. Run from the repo root:

    python3 tools/build_analog_nn_doc.py

The markdown -> HTML conversion is shared with the UR5e writeups; only the
page shell and image base differ.
"""

import html
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import build_ur5e_docs as md2html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'analog_NN.md')
OUT = os.path.join(ROOT, 'analog-nn-writeup.html')

TITLE = 'Analog Neural Network'
BLURB = ('A mixed-signal attitude controller compatible with satellite applications &mdash; a '
         'continuous-time recurrent network computed by resistors and op-amps on the '
         'feedforward path, closed by a digital ADRC loop.')

# The source references its figures as images/<name>.png; the site keeps them
# alongside the other project imagery.
md2html.IMAGE_BASE = 'websiteImages/analog_nn/docs_images/'
md2html.IMAGE_RENAMES = {}
md2html.MISSING_IMAGES = set()


PAGE = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#F8F7F5">
    <title>Analog Neural Network &mdash; Writeup &mdash; Saejoon Park</title>
    <meta name="description" content="A mixed-signal attitude controller compatible with satellite applications: an analog continuous-time recurrent neural network on the feedforward path, closed by a digital ADRC loop.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="docs.css">
</head>
<body class="doc-page">
    <div id="cursor-follower" aria-hidden="true"></div>

    <header class="header doc-header">
        <nav class="nav">
            <div class="nav-brand">
                <a href="index.html#projects" class="brand-link mono">SP_</a>
            </div>
            <ul class="nav-links">
                <li><a href="index.html#projects" class="nav-link mono">[&larr; PROJECTS]</a></li>
            </ul>
        </nav>
        <div class="doc-progress" id="docProgress" aria-hidden="true"></div>
    </header>

    <main class="doc-main">
        <div class="doc-container">
            <div class="doc-titleblock">
                <span class="doc-eyebrow mono">ANALOG NEURAL NETWORK &mdash; WRITEUP</span>
                <span class="doc-affil mono">WIM ROBOTICS &middot; SUMMER RESEARCH COLLABORATOR</span>
                <h1 class="doc-title mono">{title}</h1>
                <p class="doc-blurb newsreader">{blurb}</p>
            </div>

            <div class="doc-layout">
                <aside class="doc-toc" aria-label="Table of contents">
                    <span class="doc-toc-label mono">// CONTENTS</span>
                    <ul>
{toc}
                    </ul>
                </aside>

                <article class="doc-body">
{body}
                </article>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="container footer-inner">
            <span class="mono footer-text">Saejoon Park &copy; 2025</span>
            <span class="mono footer-sep">&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;</span>
            <span class="mono footer-text">ECE @ Cornell University</span>
        </div>
    </footer>

    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js" integrity="sha384-XjKyOOlGwcjNTAIQHIpgOno0Hl1YQqzUOEleOLALmuqehneUG+vnGctmUb0ZY0l8" crossorigin="anonymous"></script>
    <script src="script.js"></script>
    <script defer src="docs.js"></script>
</body>
</html>
'''


def preprocess(md):
    """The source is prose-only (no fenced or indented code), but some lines
    carry stray leading spaces that the converter would read as code blocks."""
    lines = [line.rstrip() if line.strip() else ''
             for line in (l.lstrip() for l in md.split('\n'))]

    # Every $$ in the source sits alone on its line. The converter only picks up
    # a display-math block when it starts a fresh block, so a fence butted
    # straight against the prose above (or the figure below) would otherwise
    # swallow it into a paragraph or into the math body.
    out = []
    in_math = False
    for line in lines:
        if line == '$$':
            if not in_math and out and out[-1]:
                out.append('')
            out.append(line)
            if in_math:
                out.append('')
            in_math = not in_math
            continue
        out.append(line)

    # Figure paths are rebased onto IMAGE_BASE, so drop the source's own folder.
    return '\n'.join(out).replace('](images/', '](')


def build():
    with open(SRC, encoding='utf-8') as f:
        md = preprocess(f.read())

    body, toc = md2html.convert(md)

    toc_html = '\n'.join(
        '                        <li class="toc-l%d"><a href="#%s" class="mono">%s</a></li>'
        % (level, anchor, html.escape(text, quote=False))
        for level, anchor, text in toc)

    page = PAGE.format(title=TITLE, blurb=BLURB, body=body, toc=toc_html)

    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(page)
    print('wrote %s (%d bytes, %d toc entries, %d figures)'
          % (os.path.basename(OUT), len(page), len(toc), body.count('<img')))

    missing = sorted({src for src in re.findall(r'<img src="([^"]+)"', body)
                      if not os.path.exists(os.path.join(ROOT, src))})
    for src in missing:
        print('  missing image: %s' % src)


if __name__ == '__main__':
    build()
