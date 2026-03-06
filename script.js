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
