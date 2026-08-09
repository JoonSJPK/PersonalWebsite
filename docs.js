'use strict';

/* ──────────────────────────────────────────────
   UR5e WRITEUP PAGES
   Math rendering, figure lightbox, TOC tracking.
   Generated markup comes from tools/build_ur5e_docs.py
────────────────────────────────────────────── */

/* ── KaTeX ── */
function renderMath() {
    if (typeof katex === 'undefined') return;

    document.querySelectorAll('[data-tex]').forEach(el => {
        const tex = el.textContent;
        try {
            katex.render(tex, el, {
                displayMode: el.hasAttribute('data-display'),
                throwOnError: false,
                strict: false,
                trust: true
            });
        } catch (e) {
            // Leave the raw TeX visible rather than blanking the equation.
            el.classList.add('tex-raw');
        }
    });
}

/* ── Figure lightbox — reuses openLightbox() from script.js ── */
function initFigureLightbox() {
    const imgs = Array.from(document.querySelectorAll('.doc-body figure img'));
    if (!imgs.length || typeof openLightbox !== 'function') return;

    const sources = imgs.map(img => img.getAttribute('src'));
    imgs.forEach((img, i) => {
        img.setAttribute('role', 'button');
        img.setAttribute('tabindex', '0');
        img.addEventListener('click', () => openLightbox(sources, i));
        img.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(sources, i);
            }
        });
    });
}

/* ── Highlight the TOC entry for the section in view ── */
function initTocTracking() {
    const links = Array.from(document.querySelectorAll('.doc-toc a'));
    if (!links.length) return;

    const targets = links
        .map(a => document.getElementById(decodeURIComponent(a.hash.slice(1))))
        .filter(Boolean);
    if (!targets.length) return;

    const visible = new Set();

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) visible.add(entry.target);
            else visible.delete(entry.target);
        });

        // Pick the topmost heading currently on screen.
        let best = null;
        visible.forEach(t => {
            if (!best || t.offsetTop < best.offsetTop) best = t;
        });
        if (!best) return;

        links.forEach(a => a.classList.toggle(
            'active', decodeURIComponent(a.hash.slice(1)) === best.id));
    }, { rootMargin: '-60px 0px -70% 0px' });

    targets.forEach(t => observer.observe(t));
}

/* ── Reading progress bar ── */
function initProgressBar() {
    const bar = document.getElementById('docProgress');
    if (!bar) return;

    function update() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        bar.style.transform = `scaleX(${pct})`;
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}

document.addEventListener('DOMContentLoaded', () => {
    initFigureLightbox();
    initTocTracking();
    initProgressBar();
});

// KaTeX is loaded with `defer`, so it is ready by the time `load` fires even if
// DOMContentLoaded beat it.
window.addEventListener('load', renderMath);
