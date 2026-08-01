gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  /* video frame entrance */
  gsap.fromTo('.hero-video-wrap',
    { opacity: 0, y: 40, scale: 0.97 },
    { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
  );

  /* stagger overlay elements */
  gsap.fromTo('.hero-overlay-eyebrow',
    { opacity: 0, y: -12 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 }
  );
  gsap.fromTo('.hero-video-center',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.75 }
  );
  gsap.fromTo('.hero-overlay-bottom',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 1 }
  );
} else {
  gsap.set('.hero-video-wrap, .hero-overlay-eyebrow, .hero-video-center, .hero-overlay-bottom', { opacity: 1, y: 0, scale: 1 });
}

/* ── loader dismiss ── */
(function () {
  var loader = document.getElementById('loader');
  var fill = document.getElementById('loaderFill');
  var counterEl = document.getElementById('loaderCounter');
  var DURATION = 2400;   /* ms for counter to run 0 → 100 */
  var rafStart = Date.now();
  var pageReady = false;
  var counterDone = false;

  /* tick counter 0 → 100, sync fill bar */
  function tick() {
    var elapsed = Date.now() - rafStart;
    /* ease-out curve: fast start, decelerates toward 100 */
    var t = Math.min(elapsed / DURATION, 1);
    var eased = 1 - Math.pow(1 - t, 2.4); /* ease-out power */
    var pct = Math.round(eased * 100);
    if (counterEl) counterEl.innerHTML = '<span>' + pct + '</span>%';
    if (fill) fill.style.width = pct + '%';
    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      counterDone = true;
      tryDismiss();
    }
  }
  
  if (!prefersReducedMotion) {
    requestAnimationFrame(tick);
  } else {
    if (counterEl) counterEl.innerHTML = '<span>100</span>%';
    if (fill) fill.style.width = '100%';
    counterDone = true;
  }

  function tryDismiss() {
    if (!pageReady || !counterDone) return;
    /* small pause so user sees 100 */
    setTimeout(function () {
      if (vid && vid.paused) {
        vid.muted = true;
        vid.play().catch(function () {});
      }
      loader.classList.add('loader-done');
      setTimeout(function () {
        if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
      }, 750);
    }, 160);
  }

  function markReady() { pageReady = true; tryDismiss(); }

  /* primary: video ready */
  var vid = document.querySelector('#hero video');
  if (vid) vid.addEventListener('canplay', markReady, { once: true });

  /* secondary: all assets */
  window.addEventListener('load', markReady, { once: true });

  /* hard fallback */
  setTimeout(markReady, 7000);
}());

/* pills below video on scroll */
if (!prefersReducedMotion) {
  gsap.fromTo('.hero-below',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '.hero-below', start: 'top 90%' }
    }
  );
} else {
  gsap.set('.hero-below', { opacity: 1, y: 0 });
}

/* animated counter for prizes */
if (document.getElementById('animatedPrizeCounter')) {
  if (!prefersReducedMotion) {
    gsap.to('#animatedPrizeCounter', {
      innerText: 100000,
      duration: 2.5,
      ease: 'power3.out',
      snap: { innerText: 1 },
      onUpdate: function () {
        let val = Math.round(this.targets()[0].innerText);
        this.targets()[0].innerText = val.toLocaleString('en-IN');
      },
      scrollTrigger: {
        trigger: '#prizes',
        start: 'top 80%'
      }
    });
  } else {
    document.getElementById('animatedPrizeCounter').innerText = "1,00,000";
  }
}
