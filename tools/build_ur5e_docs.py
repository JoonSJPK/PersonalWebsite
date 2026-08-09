#!/usr/bin/env python3
"""Convert the UR5e control project writeups into static pages for the site.

Source markdown lives outside this repo (the UR5e project itself); the images it
references are mirrored under websiteImages/ur5e/. Run from the repo root:

    python3 tools/build_ur5e_docs.py

Math is emitted as <span data-tex>/<div data-tex> nodes and rendered at load
time by KaTeX, so no LaTeX toolchain is needed here.
"""

import html
import os
import re

SRC_DIR = '/Users/joon/Projects/Wim/ur5e-control-project/docs'
OUT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DOCS = [
    {
        'src': 'task1_joint_control.md',
        'out': 'ur5e-task1.html',
        'num': '01',
        'title': 'Joint Control',
        'blurb': 'Custom torque-controlled PID for the UR5e in MuJoCo, tuned with an ITAE sweep.',
    },
    {
        'src': 'task2_trajectory_tracking.md',
        'out': 'ur5e-task2.html',
        'num': '02',
        'title': 'Trajectory Tracking',
        'blurb': 'Generalized trapezoidal velocity profiles tracked with PID plus command feedforward.',
    },
    {
        'src': 'task3_jacobian.md',
        'out': 'ur5e-task3.html',
        'num': '03',
        'title': 'Jacobian',
        'blurb': 'Forward kinematics, the Jacobian, and damped least-squares IK driving a bottle grasp.',
    },
]

# The source markdown points at a couple of files whose names drifted; the
# mirrored copies under websiteImages/ur5e/ use the names on the left.
IMAGE_RENAMES = {
    'task3_images/task3_demo.gif': 'task3_images/task3_demo.gif',
}

# Referenced in the markdown but absent from the source project — dropped.
MISSING_IMAGES = {
    'task1.1_images/torque_penalty_1e-9_error.png',
}

IMAGE_BASE = 'websiteImages/ur5e/'


# ── inline ────────────────────────────────────────────────────────────────

def protect(text, store, pattern, kind, group=1):
    """Pull matches out of the text and leave an opaque token behind."""
    def sub(m):
        store.append((kind, m.group(group)))
        return '\x00%d\x00' % (len(store) - 1)
    return re.sub(pattern, sub, text, flags=re.S)


def inline(text):
    store = []

    # Math and code first: their contents must never be touched by the
    # emphasis/link passes below.
    text = protect(text, store, r'\$\$(.+?)\$\$', 'mathblock')
    text = protect(text, store, r'\$([^$\n]+?)\$', 'math')
    text = protect(text, store, r'`([^`]+?)`', 'code')

    text = html.escape(text, quote=False)

    # Images before links — the syntax only differs by the leading '!'.
    text = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)',
                  lambda m: image_tag(m.group(2), m.group(1)), text)
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)',
                  r'<a href="\2" target="_blank" rel="noopener noreferrer">\1</a>', text)

    # Bare URLs that markdown left unlinked.
    text = re.sub(r'(?<![">=\w])(https?://[^\s<]+[^\s<.,)])',
                  r'<a href="\1" target="_blank" rel="noopener noreferrer">\1</a>', text)

    text = re.sub(r'\*\*([^*]+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'(?<!\*)\*([^*\n]+?)\*(?!\*)', r'<em>\1</em>', text)

    def restore(m):
        kind, raw = store[int(m.group(1))]
        if kind == 'code':
            return '<code>%s</code>' % html.escape(raw, quote=False)
        if kind == 'math':
            return '<span data-tex>%s</span>' % html.escape(raw, quote=False)
        return '<div data-tex data-display>%s</div>' % html.escape(raw, quote=False)

    return re.sub(r'\x00(\d+)\x00', restore, text)


def image_tag(src, alt):
    src = IMAGE_RENAMES.get(src, src)
    if src in MISSING_IMAGES:
        return ''
    return ('<img src="%s%s" alt="%s" loading="lazy">'
            % (IMAGE_BASE, src, html.escape(alt, quote=True)))


def slug(text):
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'[^a-zA-Z0-9]+', '-', text).strip('-').lower()
    return text or 'section'


# ── block ─────────────────────────────────────────────────────────────────

def convert(md):
    lines = md.split('\n')
    out = []
    toc = []
    i = 0
    n = len(lines)

    while i < n:
        line = lines[i]
        stripped = line.strip()

        if not stripped:
            i += 1
            continue

        # Horizontal rule
        if re.fullmatch(r'-{3,}', stripped):
            out.append('<hr>')
            i += 1
            continue

        # Fenced code / fenced math
        m = re.match(r'^\s*```(\w*)\s*$', line)
        if m:
            lang = m.group(1)
            i += 1
            body = []
            while i < n and not re.match(r'^\s*```\s*$', lines[i]):
                body.append(lines[i])
                i += 1
            i += 1
            text = '\n'.join(body).strip('\n')
            if lang == 'math':
                out.append('<div data-tex data-display>%s</div>' % html.escape(text, quote=False))
            else:
                cls = ' class="lang-%s"' % lang if lang else ''
                out.append('<pre><code%s>%s</code></pre>' % (cls, html.escape(text, quote=False)))
            continue

        # Display math delimited by $$ on its own line
        if stripped.startswith('$$') and not stripped.endswith('$$') or stripped == '$$':
            body = [stripped[2:]]
            i += 1
            while i < n and '$$' not in lines[i]:
                body.append(lines[i])
                i += 1
            if i < n:
                body.append(lines[i].split('$$')[0])
                i += 1
            out.append('<div data-tex data-display>%s</div>'
                       % html.escape('\n'.join(body).strip('\n'), quote=False))
            continue

        # Heading
        m = re.match(r'^(#{1,6})\s+(.*)$', stripped)
        if m:
            level = len(m.group(1))
            body = inline(m.group(2))
            anchor = slug(body)
            if level <= 3:
                toc.append((level, anchor, re.sub(r'<[^>]+>', '', body)))
            out.append('<h%d id="%s">%s</h%d>' % (level, anchor, body, level))
            i += 1
            continue

        # Table
        if stripped.startswith('|') and i + 1 < n and re.match(r'^\s*\|[\s:|-]+\|\s*$', lines[i + 1]):
            header = [c.strip() for c in stripped.strip('|').split('|')]
            i += 2
            rows = []
            while i < n and lines[i].strip().startswith('|'):
                rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')])
                i += 1
            thead = ''.join('<th>%s</th>' % inline(c) for c in header)
            tbody = ''.join(
                '<tr>%s</tr>' % ''.join('<td>%s</td>' % inline(c) for c in r) for r in rows)
            out.append('<div class="table-wrap"><table><thead><tr>%s</tr></thead>'
                       '<tbody>%s</tbody></table></div>' % (thead, tbody))
            continue

        # Blockquote
        if stripped.startswith('>'):
            body = []
            while i < n and lines[i].strip().startswith('>'):
                body.append(lines[i].strip()[1:].strip())
                i += 1
            out.append('<blockquote>%s</blockquote>' % inline(' '.join(body)))
            continue

        # Ordered list
        if re.match(r'^\s*\d+\.\s+', line):
            items = []
            while i < n and re.match(r'^\s*\d+\.\s+', lines[i]):
                items.append(re.sub(r'^\s*\d+\.\s+', '', lines[i]))
                i += 1
            out.append('<ol>%s</ol>' % ''.join('<li>%s</li>' % inline(t) for t in items))
            continue

        # List
        if re.match(r'^\s*[-*]\s+', line):
            items = []
            while i < n and re.match(r'^\s*[-*]\s+', lines[i]):
                items.append(re.sub(r'^\s*[-*]\s+', '', lines[i]))
                i += 1
            out.append('<ul>%s</ul>' % ''.join('<li>%s</li>' % inline(t) for t in items))
            continue

        # Indented code block. The source uses 2-space indents for XML/Python
        # snippets, which standard markdown would render as prose.
        if re.match(r'^\s{2,}\S', line):
            body = []
            while i < n and (re.match(r'^\s{2,}\S', lines[i]) or not lines[i].strip()):
                if not lines[i].strip() and not (
                        i + 1 < n and re.match(r'^\s{2,}\S', lines[i + 1])):
                    break
                body.append(lines[i])
                i += 1
            text = '\n'.join(body).strip('\n')
            indent = min((len(l) - len(l.lstrip()) for l in body if l.strip()), default=0)
            text = '\n'.join(l[indent:] for l in text.split('\n'))
            out.append('<pre><code>%s</code></pre>' % html.escape(text, quote=False))
            continue

        # Paragraph — a standalone image becomes a figure so the following
        # italic line reads as its caption.
        para = []
        while i < n and lines[i].strip() and not re.match(
                r'^\s*(```|#{1,6}\s|[-*]\s|\d+\.\s|>|\|)', lines[i]) and not re.fullmatch(
                r'-{3,}', lines[i].strip()) and not re.match(r'^\s{2,}\S', lines[i]):
            para.append(lines[i].strip())
            i += 1
        if not para:
            i += 1
            continue
        text = '\n'.join(para)

        if re.fullmatch(r'!\[[^\]]*\]\([^)]+\)(\s*!\[[^\]]*\]\([^)]+\))*', text.strip()):
            imgs = inline(text).strip()
            if not imgs:
                continue
            count = imgs.count('<img')
            cls = 'figure' + (' figure-grid' if count > 1 else '')
            out.append('<figure class="%s">%s</figure>' % (cls, imgs))
            continue

        rendered = inline(text)
        # Display math on its own line shouldn't be wrapped in a <p>.
        if rendered.startswith('<div data-tex') and rendered.endswith('</div>'):
            out.append(rendered)
            continue

        # A run of bare reference URLs reads as a list, not a paragraph.
        if all(re.fullmatch(r'https?://\S+', l.strip()) for l in para):
            out.append('<ul class="doc-refs">%s</ul>'
                       % ''.join('<li>%s</li>' % inline(l) for l in para))
            continue

        out.append('<p>%s</p>' % rendered.replace('\n', ' '))

    return '\n'.join(out), toc


# ── page ──────────────────────────────────────────────────────────────────

PAGE = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UR5e &mdash; Task {num}: {title} &mdash; Saejoon Park</title>
    <meta name="description" content="{blurb}">
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
{tabs}
            </ul>
        </nav>
        <div class="doc-progress" id="docProgress" aria-hidden="true"></div>
    </header>

    <main class="doc-main">
        <div class="doc-container">
            <div class="doc-titleblock">
                <span class="doc-eyebrow mono">UR5E CONTROL PROJECT &mdash; TASK {num}</span>
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

            <nav class="doc-footnav" aria-label="Other writeups">
{footnav}
            </nav>
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


def build():
    for doc in DOCS:
        with open(os.path.join(SRC_DIR, doc['src']), encoding='utf-8') as f:
            md = f.read()

        body, toc = convert(md)

        toc_html = '\n'.join(
            '                        <li class="toc-l%d"><a href="#%s" class="mono">%s</a></li>'
            % (level, anchor, html.escape(text, quote=False))
            for level, anchor, text in toc)

        tabs = '\n'.join(
            '                <li><a href="%s" class="nav-link mono%s">[TASK %s]</a></li>'
            % (d['out'], ' active' if d is doc else '', d['num'])
            for d in DOCS)

        others = [d for d in DOCS if d is not doc]
        footnav = '\n'.join(
            '                <a href="%s" class="doc-footlink">'
            '<span class="mono doc-footlink-num">TASK %s</span>'
            '<span class="mono doc-footlink-title">%s &rarr;</span></a>'
            % (d['out'], d['num'], d['title'])
            for d in others)

        page = PAGE.format(num=doc['num'], title=doc['title'], blurb=doc['blurb'],
                           body=body, toc=toc_html, tabs=tabs, footnav=footnav)

        path = os.path.join(OUT_DIR, doc['out'])
        with open(path, 'w', encoding='utf-8') as f:
            f.write(page)
        print('wrote %s (%d bytes, %d toc entries)' % (doc['out'], len(page), len(toc)))


if __name__ == '__main__':
    build()
