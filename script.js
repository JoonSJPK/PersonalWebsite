'use strict';

/* ──────────────────────────────────────────────
   PROJECT DATA
────────────────────────────────────────────── */
const projectDetails = {
    project_analog_nn: {
        title: 'Analog Neural Network',
        description: 'A mixed-signal attitude controller for CubeSats. A continuous-time recurrent neural network built in analog hardware computes the nonlinear inverse dynamics on the feedforward path, closed by a digital ADRC loop cheap enough to run on the microcontroller a CubeSat already carries — buying model-based pointing precision inside a CubeSat power budget.',
        technologies: ['KiCad', 'Analog Design', 'CTRNN', 'ADRC', 'RP2040', 'Mixed-Signal'],
        features: [
            '> Continuous-time recurrent net: 3 inputs, 4 hidden states, 1 torque output',
            '> 4×3 input and 4×4 recurrent crossbars of digital potentiometers',
            '> 64 weights loaded through eight daisy-chained 74HC595 shift registers',
            '> Signed weight pairs referenced to a mid-supply VREF rail',
            '> Digital ADRC + extended state observer closes the loop',
            '> Five-controller comparison against tuned digital PID and idealized ADRC'
        ],
        images: [
            'websiteImages/analog_nn/board_iso.png',
            'websiteImages/analog_nn/board_top.png',
            'websiteImages/analog_nn/schematic_full.png',
            'websiteImages/analog_nn/crossbar_input.png',
            'websiteImages/analog_nn/shift_registers.png',
            'websiteImages/analog_nn/torque_stage.png'
        ],
        docs: [
            { tag: 'DRAFT', title: 'Full writeup — coming soon', href: 'analog-nn-writeup.html' }
        ]
    },
    project_ur5e: {
        title: 'UR5e Control Project',
        description: 'Simulated control of a Universal Robots UR5e arm in MuJoCo — a custom torque-controlled PID joint controller tuned by an ITAE sweep, joint-space trajectory tracking with command feedforward, and Jacobian-based inverse kinematics that drives the end-effector to a full target pose and grasps a bottle.',
        technologies: ['MuJoCo', 'Python', 'NumPy', 'Control Theory', 'Robotics', 'Fusion360'],
        features: [
            '> Custom PID applied as direct joint torques (no built-in position actuator)',
            '> ITAE gain sweep with a torque-overage penalty (λ = 1e-8)',
            '> Physically-derived joint damping from a published UR5e electro-mechanical model',
            '> Generalized trapezoidal velocity profile + command feedforward (99.6% alignment)',
            '> DH forward kinematics validated against MuJoCo to under 2 mm',
            '> Damped least-squares IK on the full 6×6 Jacobian (position + orientation)',
            '> Franka Panda gripper integration and a three-phase bottle grasp'
        ],
        images: [
            'websiteImages/ur5e/task3_images/gripper_bottle.gif',
            'websiteImages/ur5e/task3_images/task3_gripper.png',
            'websiteImages/ur5e/task1_images/test_bottle_scene.png',
            'websiteImages/ur5e/task3_images/ee_path.png',
            'websiteImages/ur5e/task1.1_images/lambda_sweep.png',
            'websiteImages/ur5e/task2.2_images/feedforward.png',
            'websiteImages/ur5e/task1_images/test_bottle.png'
        ],
        docs: [
            { tag: 'TASK 01', title: 'Joint Control',       href: 'ur5e-task1.html' },
            { tag: 'TASK 02', title: 'Trajectory Tracking', href: 'ur5e-task2.html' },
            { tag: 'TASK 03', title: 'Jacobian',            href: 'ur5e-task3.html' }
        ]
    },
    project_digi_trpt: {
        title: 'Digital Trumpet',
        description: 'A USB-MIDI digital trumpet built from scratch — a custom RP2040 main board, a 3-key hotswap MX valve board, and a capacitive breath sensor, with firmware that derives pitch from bell elevation via an IMU and plays straight into GarageBand as a class-compliant MIDI device.',
        technologies: ['KiCad', 'RP2040', 'CircuitPython', 'Web MIDI', 'MPR121', 'PCB Design'],
        features: [
            '> Custom RP2040 main board (USB-C, LSM6DS3TR-C IMU, MPR121 touch)',
            '> 3-key hotswap valve board — Cherry MX 5-pin, Kailh sockets, no matrix',
            '> Capacitive breath pad shrunk 59% in area over the 3-pad revision',
            '> Roll-independent pitch from bell elevation, not a naive two-axis atan2',
            '> Fingering settle timing that kills phantom intermediate notes',
            '> Browser test bench + live calibration over MIDI CC, saved to RP2040 NVM',
            '> Class-compliant USB MIDI — plays into GarageBand with no computer'
        ],
        images: [
            'websiteImages/digi_trpt/IMG_4645.jpeg',
            'websiteImages/digi_trpt/main_board.png',
            'websiteImages/digi_trpt/main_board_top.png',
            'websiteImages/digi_trpt/switch_board.png',
            'websiteImages/digi_trpt/cap_touch_board.png',
            'websiteImages/digi_trpt/valve_bench.png'
        ],
        videos: [
            { id: 'sAYiC3EUOB8', title: 'Digital Trumpet — playing into GarageBand', short: true }
        ]
    },
    project_glove: {
        title: 'Glove Mouse',
        description: 'ATMega32U4 with custom conductive inputs and IMU — a position-tracking glove device (Valorant compatible). Computer Vision via OpenCV enables hand gesture tracking for simulated clicks and volume control at 30 fps.',
        technologies: ['ATMega32U4', 'OpenCV', 'IMU', 'Computer Vision', 'Python'],
        features: ['> ATMega32U4 microcontroller', '> Custom conductive finger inputs', '> IMU position tracking', '> OpenCV hand gesture recognition at 30 fps', '> Valorant compatible'],
        images: [
            'websiteImages/glove_mouse/glove_mouse1.png',
            'websiteImages/glove_mouse/glove_mouse2.png',
            'websiteImages/glove_mouse/glove_mouse3.png'
        ],
        videos: [
            { id: 'CwnOLpYsyiE', title: 'Computer Vision \u00D7 Glove Mouse', short: true },
            { id: 'FmShcpANS84', title: 'Conductive Finger Tips \u00D7 Glove Mouse', short: true }
        ]
    },
    project1: {
        title: 'Political AI Camera',
        description: 'Raspberry Pi-based hardware featuring a 12.1 MP sensor and Picamera2 library. Calls the OpenAI API with the gpt-image-1 model, prompted to output different political perspectives on a captured image.',
        technologies: ['Raspberry Pi', 'Python', 'Picamera2', 'OpenAI API'],
        features: ['> 12.1 MP sensor integration', '> Picamera2 library pipeline', '> gpt-image-1 multi-perspective prompting', '> Real-time image capture and analysis'],
        images: [
            'websiteImages/camera/7AA4DC16-AB79-402F-891A-7157628E1E73.JPG',
            'websiteImages/camera/C4264E49-FFAB-461A-BA41-4950F25FFE78.JPG',
            'websiteImages/camera/E5AF912B-569A-4671-9605-450CA66A1237.JPG',
            'websiteImages/camera/FE12ADE4-52DB-478B-9EDA-B543305B533B.JPG',
            'websiteImages/camera/IMG_1294.png',
            'websiteImages/camera/IMG_1295.png',
            'websiteImages/camera/IMG_1297.png',
            'websiteImages/camera/IMG_1301.png',
            'websiteImages/camera/IMG_1306.png',
            'websiteImages/camera/IMG_1314.png',
            'websiteImages/camera/IMG_1315.png',
            'websiteImages/camera/IMG_1316.png',
            'websiteImages/camera/IMG_1319.png'
        ]
    },
    project2: {
        title: 'Custom Computer Case',
        description: 'Handcrafted case with a modular chassis, fully custom cable routing, and engineered airflow channels — built to exact performance and aesthetic specifications.',
        technologies: ['CAD Design', '3D Printing', 'Electronics', 'Thermal Management'],
        features: ['> Custom modular chassis design', '> Precision cable management', '> Engineered airflow channels', '> Unique aesthetic design'],
        images: [
            'websiteImages/ComputerCase/1000028452.JPG',
            'websiteImages/ComputerCase/1000028461.JPG',
            'websiteImages/ComputerCase/1000028470.JPG',
            'websiteImages/ComputerCase/1000028475.JPG',
            'websiteImages/ComputerCase/1000028485.JPG'
        ]
    },
    project3: {
        title: 'Steel Electric Bike',
        description: 'Custom-cut and assembled steel chassis with a 1000W motor and 50V accumulator — every tube cut, welded, and fitted by hand from raw stock.',
        technologies: ['Steel Fabrication', 'Motor Control', 'Electronics', 'Mechanical Design'],
        features: ['> Custom-cut steel chassis', '> 1000W motor + 50V accumulator', '> Custom rear axle hub', '> Custom cut, screwed, and fitted by hand'],
        images: [
            'websiteImages/eBike/IMG_2883.png',
            'websiteImages/eBike/IMG_2891.png',
            'websiteImages/eBike/IMG_2904.png',
            'websiteImages/eBike/IMG_2911.png',
            'websiteImages/eBike/IMG_2917.png',
            'websiteImages/eBike/IMG_2922.png',
            'websiteImages/eBike/IMG_2983 2.png',
            'websiteImages/eBike/IMG_3185.png',
            'websiteImages/eBike/IMG_3227.png'
        ],
        videos: [
            { id: 'v5UjKmCHbAc', title: 'DIY E-Bike V1' }
        ]
    },
    project5: {
        title: 'Pull-Up Social App',
        description: 'iOS social platform built around what people will do — automatic group chats, Apple Wallet integration, and friction-free hangout coordination.',
        technologies: ['Swift', 'JavaScript', 'Firebase', 'Mobile Development'],
        features: ['> Social activity feed', '> Apple Wallet plugin', '> Automatic group chats', '> Event organization system'],
        images: [
            'websiteImages/PullUPApp/IMG_3357.PNG',
            'websiteImages/PullUPApp/IMG_3359.PNG',
            'websiteImages/PullUPApp/IMG_3360.PNG',
            'websiteImages/PullUPApp/IMG_3361.PNG',
            'websiteImages/PullUPApp/IMG_3362.PNG',
            'websiteImages/PullUPApp/IMG_3363.PNG'
        ]
    },
    project6: {
        title: 'TEG Mouse',
        description: 'Patent Pending. Hand thermal energy powers this mouse via TEG modules and a transformer that steps a 20mV output up to 3.3V — no battery required.',
        technologies: ['Thermoelectric Design', 'Power Management', 'Transformer', 'Electronics'],
        features: ['> Patent Pending design', '> TEG modules harvest hand heat', '> Transformer: 20mV → 3.3V', '> Fully battery-free operation'],
        images: [
            'websiteImages/TEGMouse/1000029237.JPG',
            'websiteImages/TEGMouse/1000029238.JPG',
            'websiteImages/TEGMouse/1000029340.JPG',
            'websiteImages/TEGMouse/1000029343.JPG',
            'websiteImages/TEGMouse/1000029353.JPG',
            'websiteImages/TEGMouse/1000030169.JPG'
        ]
    },
    project_audio: {
        title: 'Audio Signal Decoding Circuit',
        description: 'Designed and built a 6th-order MFB bandpass filter to extract encoded audio secrets. Conducted automated frequency response sweeps and safely eliminated multi-volt DC offsets.',
        technologies: ['Analog Design', '6th-Order MFB Filter', 'Signal Processing', 'Lab Instrumentation'],
        features: ['> 6th-order MFB bandpass filter', '> Automated frequency response sweeps', '> Multi-volt DC offset elimination', '> Encoded audio signal extraction'],
        images: [
            'websiteImages/audio_decoding/IMG_4330.png'
        ]
    },
    project_watch: {
        title: 'Sensory Overload Wearable',
        description: 'Developing a custom PCB for a lap wearable accommodating individuals with sensory processing disorder — hardware that adapts to its wearer.',
        technologies: ['Custom PCB', 'Wearable Electronics', 'Embedded Systems', 'KiCad'],
        features: ['> Custom PCB design', '> Lap wearable form factor', '> Sensory processing disorder focus', '> In active development'],
        images: [
            'websiteImages/sensory_overload/sensory_overload_1.png',
            'websiteImages/sensory_overload/sensory_overload_2.png'
        ]
    },
    project_oddity: {
        title: 'Oddity 1 — Chrome Extension',
        description: 'On-screen GDocs annotation system previously impossible without a Google Whitelist. Uses chenglou/pretext, the GDocs API, and HEX color tracking to solve <canvas> rendering. Includes a "Cursor for Writing" system built on a clean-room Claude Code rewrite.',
        technologies: ['Chrome Extension', 'GDocs API', 'JavaScript', 'HEX Color Tracking'],
        features: ['> GDocs canvas annotation without whitelist', '> chenglou/pretext JS library integration', '> HEX color tracking system', '> Clean-room "Cursor for Writing" system'],
        images: [
            'websiteImages/oddity1/oddity1_1.png',
            'websiteImages/oddity1/oddity1_2.png'
        ]
    }
};

/* ──────────────────────────────────────────────
   TOUCH / SCROLL-LOCK HELPERS
────────────────────────────────────────────── */

/* True on phones and tablets — anything with no real hover and a coarse
   pointer. Used to skip the custom cursor and to enable swipe gestures. */
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

/* Locking the body requires `position: fixed` on iOS, which resets the scroll
   position — so stash it and put it back on unlock. Reference-counted, because
   the lightbox opens on top of the project modal. */
let scrollLockDepth = 0;
let scrollLockY = 0;

function lockScroll() {
    if (scrollLockDepth++ > 0) return;
    scrollLockY = window.scrollY;
    document.body.style.top = `-${scrollLockY}px`;
    document.body.classList.add('scroll-locked');
}

function unlockScroll() {
    if (scrollLockDepth === 0 || --scrollLockDepth > 0) return;
    document.body.classList.remove('scroll-locked');
    document.body.style.top = '';
    window.scrollTo(0, scrollLockY);
}

/* Horizontal swipe detection for the lightbox. Ignores gestures that are
   mostly vertical (a scroll attempt) or too short to be deliberate. */
function onSwipe(el, { onLeft, onRight }) {
    let x0 = null, y0 = null;

    el.addEventListener('touchstart', e => {
        if (e.touches.length !== 1) { x0 = null; return; }
        x0 = e.touches[0].clientX;
        y0 = e.touches[0].clientY;
    }, { passive: true });

    el.addEventListener('touchend', e => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        const dy = e.changedTouches[0].clientY - y0;
        x0 = null;
        if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        (dx < 0 ? onLeft : onRight)();
    }, { passive: true });
}

/* ──────────────────────────────────────────────
   CUSTOM CURSOR
────────────────────────────────────────────── */
function initCursor() {
    const dot = document.getElementById('cursor-follower');
    if (!dot || isTouch) return;

    document.addEventListener('mousemove', e => {
        dot.style.left = e.clientX + 'px';
        dot.style.top  = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .project-entry, .resume-btn, .linkedin-link, .nav-link').forEach(el => {
        el.addEventListener('mouseenter', () => dot.classList.add('hovering'));
        el.addEventListener('mouseleave', () => dot.classList.remove('hovering'));
    });
}

/* ──────────────────────────────────────────────
   ASCII CANVAS — sparse floating chars
────────────────────────────────────────────── */
function initAsciiCanvas() {
    const canvas = document.getElementById('asciiCanvas');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext('2d');
    const CHARS = '│─┼╌·∙○◦+×╎╴';
    const FONT_SIZE = 13;
    let animId, lastTs = 0;
    let particles = [];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        buildParticles();
    }

    function buildParticles() {
        const count = Math.floor((canvas.width * canvas.height) / 28000);
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(makeParticle(true));
        }
    }

    function makeParticle(randomY) {
        return {
            x:   Math.random() * (canvas.width  || window.innerWidth),
            y:   randomY
                    ? Math.random() * (canvas.height || window.innerHeight)
                    : (canvas.height || window.innerHeight) + 10,
            vx:  (Math.random() - 0.5) * 0.1,
            vy:  -(Math.random() * 0.15 + 0.04),
            char: CHARS[Math.floor(Math.random() * CHARS.length)],
            alpha: Math.random() * 0.55 + 0.12
        };
    }

    function draw(ts) {
        if (!document.hidden) {
            const dt = Math.min(ts - lastTs, 50);
            lastTs = ts;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${FONT_SIZE}px "IBM Plex Mono", monospace`;
            ctx.fillStyle = '#1A1815';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                ctx.globalAlpha = p.alpha;
                ctx.fillText(p.char, p.x, p.y);

                p.x += p.vx * (dt / 16);
                p.y += p.vy * (dt / 16);

                if (p.y < -20) {
                    particles[i] = makeParticle(false);
                }
            }
            ctx.globalAlpha = 1;
        }
        animId = requestAnimationFrame(draw);
    }

    // On mobile/tablet the address bar collapsing fires `resize` mid-scroll;
    // rebuilding every particle then would stutter, so only react to real
    // width changes (rotation, desktop window resize).
    let lastW = 0;
    window.addEventListener('resize', () => {
        if (window.innerWidth === lastW) return;
        lastW = window.innerWidth;
        resize();
    });
    lastW = window.innerWidth;
    resize();
    animId = requestAnimationFrame(draw);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animId);
        } else {
            lastTs = performance.now();
            animId = requestAnimationFrame(draw);
        }
    });
}

/* ──────────────────────────────────────────────
   HERO TYPEWRITER
────────────────────────────────────────────── */
function initHeroTypewriter() {
    const el = document.getElementById('heroSubtitle');
    if (!el) return;

    const text = '> ECE @ CORNELL UNIVERSITY · CONCENTRATION IN ROBOTICS · CLASS OF 2028';
    let i = 0;

    function type() {
        if (i <= text.length) {
            el.textContent = text.slice(0, i++);
            setTimeout(type, 40 + Math.random() * 35);
        }
    }

    setTimeout(type, 600);
}

/* ──────────────────────────────────────────────
   ASCII PORTRAIT — runtime photo-to-ASCII
────────────────────────────────────────────── */
function initAsciiPortrait() {
    const container = document.getElementById('asciiPortrait');
    const content   = document.getElementById('aboutContent');
    if (!container || !content) return;

    const img = new Image();

    img.onload = () => {
        try {
            const W     = 54;
            const ramp  = '@#%S?*+;:,. ';
            const ratio = img.naturalHeight / img.naturalWidth;
            const H     = Math.floor(W * ratio * 0.47);

            const offscreen = document.createElement('canvas');
            offscreen.width  = W;
            offscreen.height = H;
            const ctx = offscreen.getContext('2d');
            ctx.drawImage(img, 0, 0, W, H);

            const data = ctx.getImageData(0, 0, W, H).data;
            let result = '';
            for (let y = 0; y < H; y++) {
                for (let x = 0; x < W; x++) {
                    const idx = (y * W + x) * 4;
                    const brightness = (data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114) / 255;
                    result += ramp[Math.floor(brightness * (ramp.length - 1))];
                }
                result += '\n';
            }
            container.textContent = result;
        } catch (e) {
            hidePortrait(container, content);
        }
    };

    img.onerror = () => hidePortrait(container, content);

    img.src = 'Resume/SaejoonPark.png';
}

function hidePortrait(container, content) {
    container.style.display = 'none';
    content.classList.add('portrait-hidden');
}

/* ──────────────────────────────────────────────
   SKILL BARS — block character fill
────────────────────────────────────────────── */
function initSkillBars() {
    document.querySelectorAll('.skill-bar[data-pct]').forEach(el => {
        const pct    = parseInt(el.dataset.pct, 10);
        const total  = 18;
        const filled = Math.round(pct / 100 * total);
        const empty  = total - filled;
        el.textContent = '[' + '█'.repeat(filled) + '░'.repeat(empty) + ']';
    });
}

/* ──────────────────────────────────────────────
   SCROLL REVEAL
────────────────────────────────────────────── */
function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const siblings = Array.from(
                entry.target.parentElement
                    ? entry.target.parentElement.querySelectorAll('.reveal')
                    : []
            );
            const idx   = siblings.indexOf(entry.target);
            const delay = Math.min(idx * 75, 280);
            entry.target.style.transitionDelay = delay + 'ms';
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────────────
   NAV ACTIVE STATE
────────────────────────────────────────────── */
function initNavHighlight() {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const links    = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(l => l.classList.remove('active'));
            const match = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (match) match.classList.add('active');
        });
    }, { threshold: 0.35 });

    sections.forEach(s => observer.observe(s));
}

/* ──────────────────────────────────────────────
   MOBILE NAV
────────────────────────────────────────────── */
function initMobileNav() {
    const burger = document.getElementById('hamburger');
    const menu   = document.getElementById('navLinks');
    if (!burger || !menu) return;

    function setOpen(open) {
        menu.classList.toggle('active', open);
        burger.classList.toggle('active', open);
        burger.setAttribute('aria-expanded', String(open));
    }

    burger.addEventListener('click', e => {
        e.stopPropagation();
        setOpen(!menu.classList.contains('active'));
    });

    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => setOpen(false));
    });

    // Tapping anywhere else, or hitting Escape, dismisses the drawer.
    document.addEventListener('click', e => {
        if (menu.classList.contains('active') && !menu.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') setOpen(false);
    });

    // Rotating to landscape can cross the breakpoint that hides the burger,
    // which would otherwise strand the drawer open over the desktop nav.
    window.matchMedia('(min-width: 769px)').addEventListener('change', e => {
        if (e.matches) setOpen(false);
    });
}

/* ──────────────────────────────────────────────
   SMOOTH SCROLL
────────────────────────────────────────────── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const headerH = document.getElementById('header')?.offsetHeight ?? 52;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - headerH,
                behavior: 'smooth'
            });
        });
    });
}

/* ──────────────────────────────────────────────
   KEYBOARD NAV for project entries
────────────────────────────────────────────── */
function initKeyboardNav() {
    document.querySelectorAll('.project-entry[tabindex], .video-frame-wrap[tabindex]').forEach(el => {
        el.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                el.click();
            }
        });
    });
}

/* ──────────────────────────────────────────────
   PROJECT MODAL
────────────────────────────────────────────── */
function openProject(projectId) {
    const project = projectDetails[projectId];
    if (!project) return;

    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', project.title);

    const galleryHTML = project.images.length
        ? `<div class="terminal-gallery">${project.images.map((src, i) =>
            `<img src="${src}" alt="${project.title} — image ${i + 1}" loading="${i < 3 ? 'eager' : 'lazy'}">`
          ).join('')}</div>`
        : '';

    const videosHTML = project.videos?.length
        ? `<div class="terminal-section">
                    <span class="terminal-key">// VIDEO${project.videos.length > 1 ? 'S' : ''}</span>
                    <div class="modal-videos">${project.videos.map((v, i) =>
                        `<div class="modal-video${v.short ? ' modal-video-short' : ''}">
                            <div class="video-label mono">${String(i + 1).padStart(2, '0')}. ${v.title.toUpperCase()}</div>
                            <div class="video-frame-wrap" data-vid="${v.id}" onclick="loadVideo(this)" role="button" tabindex="0" aria-label="Play: ${v.title}">
                                <div class="video-facade">
                                    <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${v.title} thumbnail" loading="lazy">
                                    <div class="video-play-btn">
                                        <div class="video-play-icon">&#x25B6;</div>
                                        <span class="video-play-label">PLAY</span>
                                    </div>
                                </div>
                            </div>
                        </div>`).join('')}</div>
                </div>`
        : '';

    const techHTML = project.technologies.map(t =>
        `<span class="tag mono">[${t.toUpperCase()}]</span>`
    ).join('');

    const featuresHTML = project.features.map(f =>
        `<li>${f}</li>`
    ).join('');

    const docsHTML = project.docs?.length
        ? `<div class="terminal-section">
                    <span class="terminal-key">// WRITEUPS</span>
                    <div class="doc-links">${project.docs.map(d =>
                        `<a class="doc-link" href="${d.href}">
                            <span class="doc-link-num">${d.tag}</span>
                            <span class="doc-link-title">${d.title}</span>
                            <span class="doc-link-arrow">&rarr;</span>
                        </a>`).join('')}</div>
                </div>`
        : '';

    modal.innerHTML = `
        <div class="modal-terminal">
            <div class="terminal-titlebar">
                <span class="terminal-title mono">&gt; ${project.title.toUpperCase()}</span>
                <button class="terminal-close mono" aria-label="Close modal">[X]</button>
            </div>
            <div class="terminal-body">
                ${galleryHTML}
                ${videosHTML}
                <div class="terminal-section">
                    <span class="terminal-key">// DESCRIPTION</span>
                    <p class="terminal-value">${project.description}</p>
                </div>
                ${docsHTML}
                <div class="terminal-section">
                    <span class="terminal-key">// TECHNOLOGIES</span>
                    <div class="tech-tags">${techHTML}</div>
                </div>
                <div class="terminal-section">
                    <span class="terminal-key">// FEATURES</span>
                    <ul class="feature-list">${featuresHTML}</ul>
                </div>
            </div>
        </div>`;

    document.body.appendChild(modal);
    lockScroll();

    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('open')));

    // Wire gallery image clicks → lightbox
    if (project.images.length) {
        modal.querySelectorAll('.terminal-gallery img').forEach((img, idx) => {
            img.addEventListener('click', () => openLightbox(project.images, idx));
        });
    }

    // The modal is built after initKeyboardNav ran, so wire its videos here
    modal.querySelectorAll('.video-frame-wrap[tabindex]').forEach(el => {
        el.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                el.click();
            }
        });
    });

    let closed = false;
    function close() {
        if (closed) return;
        closed = true;
        modal.classList.remove('open');
        unlockScroll();
        setTimeout(() => modal.remove(), 320);
        document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
        if (e.key === 'Escape') close();
    }

    modal.querySelector('.terminal-close').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', onKey);
}

/* ──────────────────────────────────────────────
   LIGHTBOX
────────────────────────────────────────────── */
function openLightbox(images, startIndex) {
    let current = startIndex;

    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image viewer');

    lb.innerHTML = `
        <div class="lb-inner">
            <img class="lb-img" src="${images[current]}" alt="Image ${current + 1} of ${images.length}">
        </div>
        <button class="lb-btn lb-prev mono" aria-label="Previous image">[&lt;]</button>
        <button class="lb-btn lb-next mono" aria-label="Next image">[&gt;]</button>
        <div class="lb-bar">
            <span class="lb-counter mono"></span>
            <button class="lb-close mono" aria-label="Close viewer">[X]</button>
        </div>`;

    document.body.appendChild(lb);
    document.body.classList.add('lightbox-open');
    lockScroll();
    requestAnimationFrame(() => requestAnimationFrame(() => lb.classList.add('open')));

    const img     = lb.querySelector('.lb-img');
    const counter = lb.querySelector('.lb-counter');
    const prevBtn = lb.querySelector('.lb-prev');
    const nextBtn = lb.querySelector('.lb-next');

    // Wire lightbox interactive elements to cursor hover state
    const dot = document.getElementById('cursor-follower');
    lb.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('mouseenter', () => dot?.classList.add('hovering'));
        btn.addEventListener('mouseleave', () => dot?.classList.remove('hovering'));
    });

    function update() {
        img.classList.add('lb-img--fade');
        setTimeout(() => {
            img.src = images[current];
            img.alt = `Image ${current + 1} of ${images.length}`;
            img.classList.remove('lb-img--fade');
        }, 120);
        counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
        prevBtn.style.opacity = current === 0 ? '0.25' : '1';
        nextBtn.style.opacity = current === images.length - 1 ? '0.25' : '1';
    }

    update();

    function prev() { if (current > 0) { current--; update(); } }
    function next() { if (current < images.length - 1) { current++; update(); } }

    let closed = false;
    function close() {
        if (closed) return;
        closed = true;
        lb.classList.remove('open');
        document.body.classList.remove('lightbox-open');
        dot?.classList.remove('hovering');
        unlockScroll();
        setTimeout(() => lb.remove(), 220);
        document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
        if (e.key === 'ArrowLeft')  prev();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'Escape')     close();
    }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    lb.querySelector('.lb-close').addEventListener('click', close);
    // Click backdrop (not the image inner) to close
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', onKey);

    // Swipe left/right through the gallery on touch.
    if (isTouch) onSwipe(lb, { onLeft: next, onRight: prev });
}

/* ──────────────────────────────────────────────
   VIDEO FACADE — click to load iframe
────────────────────────────────────────────── */
function loadVideo(wrap) {
    const vid = wrap.dataset.vid;
    if (!vid) return;
    wrap.innerHTML = `<iframe
        src="https://www.youtube.com/embed/${vid}?autoplay=1"
        title="YouTube video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
    wrap.onclick = null;
    wrap.removeAttribute('role');
    wrap.removeAttribute('tabindex');
    wrap.style.cursor = 'default';
}

/* ──────────────────────────────────────────────
   RESUME DOWNLOAD
────────────────────────────────────────────── */
function downloadResume() {
    const a = document.createElement('a');
    a.href     = 'Resume/Park_Saejoon_Resume.pdf';
    a.download = 'Park_Saejoon_Resume.pdf';
    a.target   = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

/* ──────────────────────────────────────────────
   INIT
────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initAsciiCanvas();
    initHeroTypewriter();
    initAsciiPortrait();
    initSkillBars();
    initScrollReveal();
    initNavHighlight();
    initMobileNav();
    initSmoothScroll();
    initKeyboardNav();
});
