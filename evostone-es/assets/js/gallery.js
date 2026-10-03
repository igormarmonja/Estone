/* Галерея: фільтр за категорією і лайтбокс (клавіатура, свайп). Працює разом із landing.js. */
(function () {
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const items = $$('.gal-item');
  const chips = $$('.chip-f');
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  const lbTitle = lb.querySelector('.lb-title');
  const lbCount = lb.querySelector('.lb-count');
  let visible = items, cur = 0, lastFocus = null;

  function refresh() {
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    if (window.__lenis) window.__lenis.resize();
  }

  chips.forEach((c) => c.addEventListener('click', () => {
    const f = c.dataset.filter;
    chips.forEach((x) => x.classList.toggle('is-active', x === c));
    items.forEach((it) => {
      const show = f === 'all' || it.dataset.cat === f;
      it.hidden = !show;
      it.classList.remove('is-in');
      if (show) { void it.offsetWidth; it.classList.add('is-in'); }
    });
    visible = items.filter((it) => !it.hidden);
    refresh();
  }));

  function show(i) {
    cur = (i + visible.length) % visible.length;
    const img = visible[cur].querySelector('img');
    lbImg.src = img.dataset.full;
    lbImg.alt = img.alt;
    lbTitle.textContent = img.alt;
    lbCount.textContent = (cur + 1) + ' / ' + visible.length;
    const next = visible[(cur + 1) % visible.length].querySelector('img');
    new Image().src = next.dataset.full;   // підвантажити наступне
  }
  function open(item) {
    lastFocus = document.activeElement;
    lb.hidden = false;
    show(visible.indexOf(item));
    if (window.__lenis) window.__lenis.stop();
    document.documentElement.classList.add('lb-open');
    lb.querySelector('.lb-close').focus();
  }
  function close() {
    lb.hidden = true;
    lbImg.removeAttribute('src');
    if (window.__lenis) window.__lenis.start();
    document.documentElement.classList.remove('lb-open');
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('.gal-open');
    if (b) { open(b.closest('.gal-item')); return; }
    const a = e.target.closest('[data-lb]');
    if (a) { ({ close, prev: () => show(cur - 1), next: () => show(cur + 1) })[a.dataset.lb](); return; }
    if (e.target === lb) close();
  });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
  let x0 = null;
  lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
    x0 = null;
  });
})();
