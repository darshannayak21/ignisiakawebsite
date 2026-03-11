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


/* ─── GALLERY MOBILE CAROUSEL ────────────────────────────── */
(function initGalleryCarousel() {
  const MOBILE_BP = 600;

  const grid = document.getElementById('galleryGrid');
  const prev = document.getElementById('galleryPrev');
  const next = document.getElementById('galleryNext');
  const dotsWrap = document.getElementById('galleryDots');

  if (!grid || !prev || !next || !dotsWrap) return;

  const items = Array.from(grid.querySelectorAll('.gallery-item'));
  const total = items.length;
  let current = 0;
  let dots = [];

  /* ── build dots ── */
  function buildDots() {
    dotsWrap.innerHTML = '';
    dots = items.map((_, i) => {
      const d = document.createElement('button');
      d.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Go to image ' + (i + 1));
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
      return d;
    });
  }

  /* ── scroll to slide index ── */
  function goTo(idx) {
    if (idx < 0 || idx >= total) return;
    current = idx;
    const item = items[idx];
    // scroll the track so the target item's left edge aligns with the grid's left edge
    grid.scrollTo({ left: item.offsetLeft - grid.offsetLeft, behavior: 'smooth' });
    updateUI();
  }

  /* ── refresh arrow states + active dot ── */
  function updateUI() {
    prev.classList.toggle('disabled', current === 0);
    next.classList.toggle('disabled', current === total - 1);
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  /* ── arrow buttons ── */
  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));

  /* ── keep current in sync when user finger-swipes ── */
  let scrollTimer;
  grid.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      // find which item is most visible
      const gridLeft = grid.getBoundingClientRect().left;
      let closest = 0;
      let minDist = Infinity;
      items.forEach((item, i) => {
        const dist = Math.abs(item.getBoundingClientRect().left - gridLeft);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      if (closest !== current) { current = closest; updateUI(); }
    }, 80);
  });

  /* ── init / respond to resize ── */
  function setup() {
    if (window.innerWidth <= MOBILE_BP) {
      buildDots();
      updateUI();
    } else {
      dotsWrap.innerHTML = '';
      dots = [];
      // reset scroll position so desktop grid is unaffected
      grid.scrollLeft = 0;
    }
  }

  setup();
  window.addEventListener('resize', setup);
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
