/* ══════════════════════════════════════════════════
   CASTRO Data Consulting v2 — script.js
   ══════════════════════════════════════════════════ */
'use strict';

// ── Custom cursor ────────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// ── Header scroll ────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile menu ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});
nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Smooth scroll ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 20;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// ── Hero Canvas — Particle data network ─────────────
const heroCanvas = document.getElementById('heroCanvas');
if (heroCanvas) {
  const ctx = heroCanvas.getContext('2d');
  let W, H, particles = [];

  function resizeHero() {
    W = heroCanvas.width = heroCanvas.offsetWidth;
    H = heroCanvas.height = heroCanvas.offsetHeight;
  }
  resizeHero();
  window.addEventListener('resize', resizeHero);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateHero() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animateHero);
  }
  animateHero();
}

// ── Reveal on scroll ─────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObs.observe(el));

// ── Hero stat counters ───────────────────────────────
const heroStats = document.querySelectorAll('.hero__stat-num');
let heroStatsDone = false;

function animateHeroStats() {
  if (heroStatsDone) return;
  heroStatsDone = true;
  heroStats.forEach(el => {
    const target = +el.dataset.target;
    let current = 0;
    const step = target / 40;
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(interval);
    }, 40);
  });
}

const heroSection = document.querySelector('.hero');
const heroObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) animateHeroStats();
}, { threshold: 0.3 });
if (heroSection) heroObs.observe(heroSection);

// ── Impacto metric bars & counters ───────────────────
const metrics = document.querySelectorAll('.impacto__metric');
const metricObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.impacto__metric-fill');
      const counter = entry.target.querySelector('.counter');
      if (fill) {
        const w = fill.dataset.width;
        setTimeout(() => { fill.style.width = w + '%'; }, 200);
      }
      if (counter) {
        const target = +counter.dataset.target;
        let current = 0;
        const step = target / 60;
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          counter.textContent = Math.floor(current);
          if (current >= target) clearInterval(interval);
        }, 20);
      }
      metricObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
metrics.forEach(m => metricObs.observe(m));

// ── Contact canvas — subtle waves ────────────────────
const contactoCanvas = document.getElementById('contactoCanvas');
if (contactoCanvas) {
  const cctx = contactoCanvas.getContext('2d');
  let cW, cH;
  function resizeContacto() {
    cW = contactoCanvas.width = contactoCanvas.offsetWidth;
    cH = contactoCanvas.height = contactoCanvas.offsetHeight;
  }
  resizeContacto();
  window.addEventListener('resize', resizeContacto);

  let t = 0;
  function drawWaves() {
    cctx.clearRect(0, 0, cW, cH);
    for (let wave = 0; wave < 3; wave++) {
      cctx.beginPath();
      cctx.moveTo(0, cH * 0.5);
      for (let x = 0; x <= cW; x += 4) {
        const y = cH * 0.5 + Math.sin(x * 0.006 + t + wave * 1.2) * 40 + Math.sin(x * 0.012 + t * 0.7) * 20;
        cctx.lineTo(x, y);
      }
      const alpha = 0.05 - wave * 0.012;
      cctx.strokeStyle = `rgba(201,168,76,${alpha})`;
      cctx.lineWidth = 1.5;
      cctx.stroke();
    }
    t += 0.008;
    requestAnimationFrame(drawWaves);
  }
  drawWaves();
}

// ── Form submit ──────────────────────────────────────
const form = document.getElementById('contactoForm');
const formSuccess = document.getElementById('formSuccess');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn--submit span');
    if (btn) btn.textContent = 'Enviando...';
    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.classList.add('active');
    }, 1200);
  });
}

// ── Active nav link ──────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObs.observe(s));

// ── Add active nav style ─────────────────────────────
const style = document.createElement('style');
style.textContent = `
  .nav__link.active { color: var(--gold) !important; }
`;
document.head.appendChild(style);
