/* ============================================================
   AAROHI ENTERPRISES — Shared JavaScript
   Scroll reveals, count-up stats, scroll progress, marquee,
   mobile menu close-on-outside-click.
   ============================================================ */

(function () {
  'use strict';

  /* — Scroll Reveal — */
  function initReveals() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) {
      var delay = el.getAttribute('data-reveal') || '0';
      el.style.transition =
        'opacity .7s ease ' + delay + 'ms, transform .8s cubic-bezier(.22,1,.36,1) ' + delay + 'ms';
      io.observe(el);
    });
  }

  /* — Count-Up Stats — */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        var el = e.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var t0 = performance.now();
        var dur = 1600;
        function tick(t) {
          var p = Math.min(1, (t - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* — Scroll Progress Bar — */
  function initScrollProgress() {
    var bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* — Industries Marquee (duplicate children for seamless loop) — */
  function initMarquee() {
    var track = document.querySelector('.marquee-track');
    if (!track) return;
    var items = track.innerHTML;
    track.innerHTML = items + items;
  }

  /* — Mobile Menu: close on outside click — */
  function initBurger() {
    var burger = document.querySelector('.burger details');
    if (!burger) return;
    document.addEventListener('click', function (e) {
      if (burger.open && !burger.contains(e.target)) {
        burger.removeAttribute('open');
      }
    });
  }

  /* — Init all — */
  document.addEventListener('DOMContentLoaded', function () {
    initReveals();
    initCounters();
    initScrollProgress();
    initMarquee();
    initBurger();
  });
})();
