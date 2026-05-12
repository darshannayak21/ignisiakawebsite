/* ─── MUX HLS BACKGROUND VIDEO ────────────────────────────
   Stream served via Mux — no YouTube watermark, no controls.
──────────────────────────────────────────────────────────── */
var HLS_SRC = 'https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8';

// Fallback: hide loader after 8 s in case the stream stalls
var _heroLoaderFallback = setTimeout(function () {
  var el = document.getElementById('hero-loader');
  if (el) el.classList.add('loaded');
}, 8000);

(function initHeroVideo() {
  var video = document.getElementById('hero-video');
  if (!video) return;

  function onCanPlay() {
    clearTimeout(_heroLoaderFallback);
    var loader = document.getElementById('hero-loader');
    if (loader) loader.classList.add('loaded');
  }

  video.addEventListener('playing', onCanPlay, { once: true });

  if (typeof Hls !== 'undefined' && Hls.isSupported()) {
    // Non-Safari: use HLS.js
    var hls = new Hls({ autoStartLoad: true, startLevel: -1 });
    hls.loadSource(HLS_SRC);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play().catch(function () {});
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari: native HLS support
    video.src = HLS_SRC;
    video.play().catch(function () {});
  }
}());

/* ─── COUNTDOWN TIMER ───────────────────────────────────────
   Set your event date here (YYYY, MM-1, DD, HH, MM, SS)
   Month is 0-indexed: April = 3
──────────────────────────────────────────────────────────── */
const EVENT_DATE = new Date(2026, 3, 3, 9, 0, 0); // April 3, 2026 09:00

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const now = new Date();
  const diff = EVENT_DATE - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-min').textContent = '00';
    document.getElementById('cd-sec').textContent = '00';
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  document.getElementById('cd-days').textContent = pad(days);
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-min').textContent = pad(mins);
  document.getElementById('cd-sec').textContent = pad(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* ─── PARTICLE CANVAS ───────────────────────────────────── */
/* removed — canvas disabled */


/* ─── INTERSECTION OBSERVER — fade-ins ──────────────────── */
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));





/* ─── NAVBAR shadow on scroll ───────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = 'none';
});

/* ─── HAMBURGER MENU ─────────────────────────────────────── */
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  mobileMenu.classList.add('open');
  navOverlay.classList.add('active');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  navOverlay.classList.remove('active');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});
const mobClose = document.getElementById('mobClose');
if (mobClose) mobClose.addEventListener('click', closeMenu);
navOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.mob-link, .mobile-cta').forEach(el => {
  el.addEventListener('click', closeMenu);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });


/* ─── GALLERY CAROUSEL ────────────────────────────────────────────── */
(function initGalleryCarousel() {
  const mainImg = document.getElementById('glryMainImg');
  const prevBtn = document.getElementById('glryPrev');
  const nextBtn = document.getElementById('glryNext');
  const thumbsEl = document.getElementById('glryThumbs');
  const counterEl = document.getElementById('glryCounter');
  const progressEl = document.getElementById('glryProgressBar');
  const stageEl = document.getElementById('glryStage');

  if (!mainImg || !thumbsEl) return;

  const thumbs = Array.from(thumbsEl.querySelectorAll('.glry-thumb'));
  const total = thumbs.length;
  let current = 0;
  let autoTimer = null;
  let progTimer = null;
  const INTERVAL = 5400; // ms between auto-advance

  /* ── Get full src list from thumbnails ── */
  const srcs = thumbs.map(t => t.querySelector('img').src);

  /* ── Go to a specific slide ── */
  function goTo(idx, fromAuto) {
    if (idx < 0) idx = total - 1;
    if (idx >= total) idx = 0;

    const prev = current;
    current = idx;

    /* Cross-fade main image */
    mainImg.classList.add('glry-fade-out');
    setTimeout(() => {
      mainImg.src = srcs[current];
      mainImg.classList.remove('glry-fade-out');
    }, 220);

    /* Update thumbnail active state */
    thumbs[prev].classList.remove('active');
    thumbs[current].classList.add('active');

    /* Scroll active thumb into view */
    thumbs[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    /* Counter */
    if (counterEl) counterEl.textContent = (current + 1) + ' / ' + total;

    /* Progress bar */
    startProgress();
  }

  /* ── Progress bar animation ── */
  function startProgress() {
    if (!progressEl) return;
    clearTimeout(progTimer);
    progressEl.style.transition = 'none';
    progressEl.style.width = '0%';
    /* Force reflow */
    void progressEl.offsetWidth;
    progressEl.style.transition = 'width ' + INTERVAL + 'ms linear';
    progressEl.style.width = '100%';
  }

  /* ── Auto-advance ── */
  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1, true), INTERVAL);
  }

  function stopAuto() {
    clearInterval(autoTimer);
    if (progressEl) {
      progressEl.style.transition = 'none';
      progressEl.style.width = '0%';
    }
  }

  /* ── Arrow buttons ── */
  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  /* ── Thumbnail clicks ── */
  thumbs.forEach((t, i) => {
    t.addEventListener('click', () => { goTo(i); resetAuto(); });
  });

  /* ── Keyboard navigation ── */
  document.addEventListener('keydown', e => {
    const sec = document.getElementById('gallery');
    if (!sec) return;
    const r = sec.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return; // section not visible
    if (e.key === 'ArrowLeft') { goTo(current - 1); resetAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
  });

  /* ── Pause on hover ── */
  if (stageEl) {
    stageEl.addEventListener('mouseenter', stopAuto);
    stageEl.addEventListener('mouseleave', () => { startAuto(); startProgress(); });
  }

  /* ── Reset auto-play (called after manual nav) ── */
  function resetAuto() {
    stopAuto();
    startAuto();
    startProgress();
  }

  /* ── Touch / swipe support on the stage ── */
  let touchStartX = 0;
  if (stageEl) {
    stageEl.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    stageEl.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) { goTo(dx < 0 ? current + 1 : current - 1); resetAuto(); }
    }, { passive: true });
  }

  /* ── Init ── */
  goTo(0);
  startAuto();
})();



/* ─── REGISTRATION MODAL ───────────────────────────────────────────────── */
(function initRegisterModal() {
  const registerTriggers = document.querySelectorAll('.register-trigger');
  const registerModal = document.getElementById('registerModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');

  if (!registerTriggers.length || !registerModal || !modalOverlay || !modalClose) return;

  function openModal() {
    registerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function closeModal() {
    registerModal.classList.remove('active');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  // Open modal on any register trigger click
  registerTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof closeMenu === 'function') closeMenu();
      openModal();
    });
  });

  // Close modal on overlay click
  modalOverlay.addEventListener('click', closeModal);

  // Close modal on close button click
  modalClose.addEventListener('click', closeModal);

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && registerModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Close modal when clicking on a registration option (after navigation)
  const registerOptions = document.querySelectorAll('.register-option');
  registerOptions.forEach((option) => {
    option.addEventListener('click', closeModal);
  });
})();
