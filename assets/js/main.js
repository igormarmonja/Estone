/* Gridalta — interacciones */
(function () {
  'use strict';
  var doc = document;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Cabecera: sombra al hacer scroll */
  var header = doc.querySelector('[data-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Menú móvil */
  var burger = doc.querySelector('[data-burger]');
  var drawer = doc.querySelector('[data-drawer]');
  if (burger && drawer) {
    var set = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      drawer.classList.toggle('is-open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      doc.body.classList.toggle('is-locked', open);
    };
    burger.addEventListener('click', function () { set(burger.getAttribute('aria-expanded') !== 'true'); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { set(false); burger.focus(); }
    });
  }

  /* Aparición suave */
  var items = doc.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* FAQ: solo una respuesta abierta a la vez */
  Array.prototype.forEach.call(doc.querySelectorAll('.faq'), function (faq) {
    faq.addEventListener('toggle', function (e) {
      if (!e.target.open) return;
      Array.prototype.forEach.call(faq.querySelectorAll('details[open]'), function (d) {
        if (d !== e.target) d.open = false;
      });
    }, true);
  });

  /* Año del pie */
  Array.prototype.forEach.call(doc.querySelectorAll('[data-year]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
