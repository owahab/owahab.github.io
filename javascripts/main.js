/* ali.so — theme toggle, mobile nav, scroll-spy, reveal, counters, back-to-top. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme ---------- */

  var toggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (!toggle) return;
    var icon = toggle.querySelector('i');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // head.html already set data-theme pre-paint; sync the button to it.
  applyTheme(root.getAttribute('data-theme') || 'light');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
    });
  }

  /* ---------- Mobile nav ---------- */

  var hamburger = document.getElementById('hamburger');
  var menu = document.getElementById('nav-menu');

  function closeMenu() {
    if (!hamburger || !menu) return;
    menu.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && menu) {
    hamburger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Navbar shadow + back-to-top ---------- */

  var navbar = document.getElementById('navbar');
  var backToTop = document.getElementById('back-to-top');

  function onScroll() {
    var y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 8);
    if (backToTop) backToTop.classList.toggle('is-visible', y > 500);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Scroll reveal ---------- */

  var revealTargets = document.querySelectorAll(
    '.section-header, .about-text, .feature-item, .timeline-item, ' +
    '.skill-card, .post-card, .contact-card, .resume-block'
  );

  if (!('IntersectionObserver' in window) || reduceMotion) {
    // No observer (or the user opted out): show everything, skip the animation.
    Array.prototype.forEach.call(revealTargets, function (el) {
      el.classList.add('reveal', 'is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(revealTargets, function (el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  /* ---------- Stat counters ---------- */

  var counters = document.querySelectorAll('.stat-number[data-count]');

  function renderCount(el, value) {
    var decimals = parseInt(el.dataset.decimals, 10) || 0;
    var shown = decimals ? value.toFixed(decimals) : String(Math.round(value));
    el.textContent = (el.dataset.prefix || '') + shown + (el.dataset.suffix || '');
  }

  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;

    if (reduceMotion) {
      renderCount(el, target);
      return;
    }

    var duration = 1400;
    var start = null;

    function step(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      renderCount(el, target * eased);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(counters, countUp);
    } else {
      var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          countUp(entry.target);
          counterObserver.unobserve(entry.target);
        });
      }, { threshold: 0.5 });

      Array.prototype.forEach.call(counters, function (el) {
        counterObserver.observe(el);
      });
    }
  }

  /* ---------- Scroll spy (homepage only) ---------- */

  var sections = document.querySelectorAll('main > section[id]');
  var navLinks = document.querySelectorAll('.nav-link[href*="#"]');

  if (sections.length > 1 && navLinks.length && 'IntersectionObserver' in window) {
    var linkFor = {};
    Array.prototype.forEach.call(navLinks, function (link) {
      var hash = link.getAttribute('href').split('#')[1];
      if (hash) linkFor[hash] = link;
    });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Array.prototype.forEach.call(navLinks, function (l) { l.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Array.prototype.forEach.call(sections, function (section) { spy.observe(section); });
  }
})();
