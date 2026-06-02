/* ============================================================
   LUMINARY GALLERY — script.js
   ============================================================ */

// ─── Data ────────────────────────────────────────────────────
const IMAGES = [
  { src: 'images/mountains.png', title: 'Mountain Peaks',   meta: 'Landscape · Aerial Photography',  category: 'landscape' },
  { src: 'images/ocean.png',     title: 'Coral Kingdom',    meta: 'Nature · Underwater',              category: 'nature'    },
  { src: 'images/city.png',      title: 'Neon Metropolis',  meta: 'Urban · Night Photography',        category: 'urban'     },
  { src: 'images/forest.png',    title: 'Enchanted Grove',  meta: 'Nature · Fantasy',                 category: 'nature'    },
  { src: 'images/desert.png',    title: 'Golden Dunes',     meta: 'Landscape · Sahara',               category: 'landscape' },
  { src: 'images/aurora.png',    title: 'Aurora Dreams',    meta: 'Cosmic · Arctic Lights',           category: 'cosmic'    },
  { src: 'images/waterfall.png', title: 'Hidden Falls',     meta: 'Nature · Tropical',                category: 'nature'    },
  { src: 'images/wildflowers.png',title:'Bloom Season',     meta: 'Nature · Macro',                   category: 'nature'    },
  { src: 'images/volcano.png',   title: 'Fire & Earth',     meta: 'Landscape · Volcanic',             category: 'landscape' },
];

// ─── State ───────────────────────────────────────────────────
let currentIndex    = 0;
let activeFilter    = 'all';
let activeCssFilter = 'none';
let visibleIndices  = IMAGES.map((_, i) => i); // indices currently shown

// ─── DOM Refs ─────────────────────────────────────────────────
const header      = document.getElementById('site-header');
const filterBtns  = document.querySelectorAll('.filter-btn');
const imgFiltBtns = document.querySelectorAll('.img-filter-btn');
const cards       = document.querySelectorAll('.gallery-card');
const emptyState  = document.getElementById('gallery-empty');

const lightbox    = document.getElementById('lightbox');
const lbBackdrop  = document.getElementById('lightbox-backdrop');
const lbClose     = document.getElementById('lightbox-close');
const lbImg       = document.getElementById('lightbox-img');
const lbTitle     = document.getElementById('lightbox-title');
const lbMeta      = document.getElementById('lightbox-meta');
const lbPrev      = document.getElementById('lightbox-prev');
const lbNext      = document.getElementById('lightbox-next');
const lbCounter   = document.getElementById('lightbox-counter');
const lbThumbs    = document.getElementById('lightbox-thumbs');

// ─── Header Scroll Shadow ────────────────────────────────────
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── Category Filter ─────────────────────────────────────────
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    activeFilter = btn.dataset.filter;
    applyFilters();
  });
});

function applyFilters() {
  visibleIndices = [];
  let delay = 0;

  cards.forEach((card, i) => {
    const match = activeFilter === 'all' || card.dataset.category === activeFilter;
    if (match) {
      card.classList.remove('hidden');
      card.style.animationDelay = `${delay * 60}ms`;
      card.classList.remove('filtering');
      void card.offsetWidth; // reflow
      card.classList.add('filtering');
      visibleIndices.push(i);
      delay++;
    } else {
      card.classList.add('hidden');
    }
  });

  emptyState.classList.toggle('hidden', visibleIndices.length > 0);
}

// ─── CSS Image Filters ───────────────────────────────────────
imgFiltBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    imgFiltBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCssFilter = btn.dataset.cssFilter;
    applyImageFilter(activeCssFilter);
  });
});

function applyImageFilter(filterStr) {
  document.querySelectorAll('.card-img').forEach(img => {
    img.style.filter = filterStr === 'none' ? '' : filterStr;
  });
  if (!lightbox.hidden) {
    lbImg.style.filter = filterStr === 'none' ? '' : filterStr;
  }
}

// ─── Open Lightbox ───────────────────────────────────────────
cards.forEach(card => {
  card.addEventListener('click', () => openLightbox(parseInt(card.dataset.index)));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(parseInt(card.dataset.index));
    }
  });
});

function openLightbox(rawIndex) {
  // Map raw index to position within visible set
  const pos = visibleIndices.indexOf(rawIndex);
  currentIndex = pos === -1 ? 0 : pos;

  lightbox.removeAttribute('hidden');
  lightbox.classList.add('opening');
  lightbox.addEventListener('animationend', () => lightbox.classList.remove('opening'), { once: true });

  document.body.style.overflow = 'hidden';
  buildThumbs();
  renderLightbox();
  lbClose.focus();
}

function closeLightbox() {
  lightbox.classList.add('closing');
  lightbox.addEventListener('animationend', () => {
    lightbox.classList.remove('closing');
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }, { once: true });
}

function renderLightbox() {
  const imgData = IMAGES[visibleIndices[currentIndex]];
  lbImg.classList.add('swapping');
  setTimeout(() => {
    lbImg.src = imgData.src;
    lbImg.alt = imgData.title;
    lbImg.style.filter = activeCssFilter === 'none' ? '' : activeCssFilter;
    lbTitle.textContent = imgData.title;
    lbMeta.textContent  = imgData.meta;
    lbCounter.textContent = `${currentIndex + 1} / ${visibleIndices.length}`;
    lbImg.classList.remove('swapping');
    highlightThumb();
  }, 150);
}

function buildThumbs() {
  lbThumbs.innerHTML = '';
  visibleIndices.forEach((rawIdx, pos) => {
    const d = IMAGES[rawIdx];
    const thumb = document.createElement('div');
    thumb.className = 'lightbox-thumb' + (pos === currentIndex ? ' active' : '');
    thumb.setAttribute('role', 'button');
    thumb.setAttribute('aria-label', `View ${d.title}`);
    thumb.setAttribute('tabindex', '0');
    thumb.innerHTML = `<img src="${d.src}" alt="${d.title}" loading="lazy" />`;
    thumb.addEventListener('click', () => { currentIndex = pos; renderLightbox(); });
    thumb.addEventListener('keydown', e => { if (e.key === 'Enter') { currentIndex = pos; renderLightbox(); } });
    lbThumbs.appendChild(thumb);
  });
}

function highlightThumb() {
  const thumbs = lbThumbs.querySelectorAll('.lightbox-thumb');
  thumbs.forEach((t, i) => t.classList.toggle('active', i === currentIndex));
  thumbs[currentIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

// ─── Navigation ───────────────────────────────────────────────
lbPrev.addEventListener('click', prevImage);
lbNext.addEventListener('click', nextImage);

function prevImage() {
  currentIndex = (currentIndex - 1 + visibleIndices.length) % visibleIndices.length;
  renderLightbox();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % visibleIndices.length;
  renderLightbox();
}

// ─── Close Triggers ───────────────────────────────────────────
lbClose.addEventListener('click', closeLightbox);
lbBackdrop.addEventListener('click', closeLightbox);

// ─── Keyboard Navigation ──────────────────────────────────────
document.addEventListener('keydown', e => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   prevImage();
  if (e.key === 'ArrowRight')  nextImage();
});

// ─── Touch / Swipe support ───────────────────────────────────
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) { dx < 0 ? nextImage() : prevImage(); }
}, { passive: true });

// ─── Init ─────────────────────────────────────────────────────
applyFilters();
