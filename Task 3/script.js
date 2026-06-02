// ── Cursor Glow ──
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  // Active link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
  // Trigger bar fills
  triggerBars();
  // Back to top
  backToTop.style.opacity = window.scrollY > 400 ? '1' : '0';
  backToTop.style.pointerEvents = window.scrollY > 400 ? 'all' : 'none';
});

// ── Hamburger ──
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));

// ── Typewriter ──
const words = ['Beautiful UIs.', 'Fast APIs.', 'Full Stack Apps.', 'Open Source Tools.', 'Creative Experiences.'];
let wi = 0, ci = 0, deleting = false;
const el = document.getElementById('typewriter');

function type() {
  const word = words[wi];
  el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  let delay = deleting ? 60 : 100;
  if (!deleting && ci > word.length) { delay = 1800; deleting = true; }
  else if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; delay = 400; }
  setTimeout(type, delay);
}
type();

// ── Particle Canvas ──
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function Particle() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.r = Math.random() * 1.8 + 0.3;
  this.vx = (Math.random() - 0.5) * 0.4;
  this.vy = (Math.random() - 0.5) * 0.4;
  this.alpha = Math.random() * 0.5 + 0.1;
}

for (let i = 0; i < 90; i++) particles.push(new Particle());

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(108,99,255,${p.alpha})`;
    ctx.fill();
  });
  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(108,99,255,${0.12 * (1 - dist/120)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── Reveal on Scroll ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 100);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(r => observer.observe(r));
// Trigger any already-visible reveals on load
window.addEventListener('load', () => {
  reveals.forEach(r => {
    const rect = r.getBoundingClientRect();
    if (rect.top < window.innerHeight) r.classList.add('visible');
  });
});

// ── Stat counter ──
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = +el.dataset.target;
    let count = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count;
      if (count >= target) clearInterval(timer);
    }, 35);
  });
}
const statsSection = document.getElementById('about');
const statsObserver = new IntersectionObserver(e => {
  if (e[0].isIntersecting) { animateCounters(); statsObserver.disconnect(); }
}, { threshold: 0.3 });
statsObserver.observe(statsSection);

// ── Skill Bars ──
let barsAnimated = false;
function triggerBars() {
  if (barsAnimated) return;
  const skillsSection = document.getElementById('skills');
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8) {
    barsAnimated = true;
    document.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  }
}

// ── Project Filters ──
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(c => {
      const match = f === 'all' || c.dataset.category === f;
      c.style.opacity = '0';
      c.style.transform = 'scale(0.95)';
      setTimeout(() => {
        c.classList.toggle('hidden', !match);
        if (match) {
          requestAnimationFrame(() => {
            c.style.opacity = '1';
            c.style.transform = 'scale(1)';
            c.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          });
        }
      }, 150);
    });
  });
});

// ── Contact Form ──
const form    = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');
const btnText = document.getElementById('btn-text');
const btnLoad = document.getElementById('btn-loading');
const success = document.getElementById('form-success');

form.addEventListener('submit', e => {
  e.preventDefault();
  btnText.hidden = true;
  btnLoad.hidden = false;
  sendBtn.disabled = true;
  setTimeout(() => {
    btnText.hidden = false;
    btnLoad.hidden = true;
    sendBtn.disabled = false;
    success.hidden = false;
    form.reset();
    setTimeout(() => success.hidden = true, 5000);
  }, 1800);
});

// ── Back to Top ──
const backToTop = document.getElementById('back-to-top');
backToTop.style.opacity = '0';
backToTop.style.transition = 'opacity 0.3s, transform 0.3s';


