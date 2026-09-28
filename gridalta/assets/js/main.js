/* Gridalta — взаємодії та анімація (шаблон scroll-landing).
   GSAP + ScrollTrigger — сценарії скролу, Lenis — плавний скрол.
   Якщо бібліотеки не завантажились, сторінка лишається робочою без анімацій. */
(function () {
  const CFG = window.GRIDALTA_CONFIG || {};
  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  const hasGsap = !!(gsap && ST);
  if (hasGsap) gsap.registerPlugin(ST);

  /* ── Аналітика ─────────────────────────────────────────── */
  window.dataLayer = window.dataLayer || [];
  function track(event, params) {
    window.dataLayer.push(Object.assign({ event }, params || {}));
    if (typeof window.gtag === 'function') window.gtag('event', event, params || {});
    if (typeof window.fbq === 'function' && event === 'lead_submit') window.fbq('track', 'Lead');
  }
  if (CFG.ga4Id) {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + CFG.ga4Id;
    document.head.appendChild(s);
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', CFG.ga4Id);
    if (CFG.googleAdsId) gtag('config', CFG.googleAdsId);
  }
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-track]');
    if (el) track(el.dataset.track + '_click', { lang: root.lang });
  });

  /* ── Заглушки фото ─────────────────────────────────────── */
  /* Покладіть файл з указаним іменем у assets/img/ — заглушка зникне сама. */
  function placeholder(img) {
    const box = document.createElement('div');
    box.className = 'photo-ph';
    if (img.dataset.tone) box.dataset.tone = img.dataset.tone;
    box.setAttribute('role', 'img');
    box.setAttribute('aria-label', img.alt || '');
    box.innerHTML =
      '<svg viewBox="0 0 100 100" aria-hidden="true"><g transform="translate(50 0) skewY(-25) translate(-50 0)"><path d="M50 14H6v64h44V44H26v10h12v12H18V26h32z"/></g><g transform="translate(50 0) skewY(25) translate(-50 0)"><path d="M54 14h40v5H54zM54 24h40v5H54zM54 34h40v5H54zM54 44h40v5H54zM54 54h40v5H54zM54 64h40v5H54z"/></g></svg>' +
      '<span class="photo-ph-label"></span><code class="photo-ph-file"></code>';
    box.querySelector('.photo-ph-label').textContent = img.dataset.ph;
    box.querySelector('.photo-ph-file').textContent = 'assets/img/' + (img.getAttribute('src') || '').split('/').pop();
    img.replaceWith(box);
  }
  $$('img[data-ph], img[data-fallback]').forEach((img) => {
    const fail = () => {
      const fb = img.dataset.fallback;
      if (fb && img.getAttribute('src') !== fb) { img.src = fb; return; }
      if (img.dataset.ph) placeholder(img);
    };
    img.addEventListener('error', fail, { once: !img.dataset.fallback });
    if (img.complete && img.naturalWidth === 0) fail();
  });

  /* ── Плавний скрол ─────────────────────────────────────── */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.085, wheelMultiplier: 1, anchors: false, autoRaf: !hasGsap });
    if (hasGsap) {
      lenis.on('scroll', ST.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }
  function scrollToEl(el) {
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    const go = () => scrollToEl(target);
    if (a.closest('.drawer')) closeDrawer(go);
    else if (root.classList.contains('menu-open')) { toggleMenu(false); go(); }
    else go();
  });

  /* ── Шапка: ховається при скролі вниз ──────────────────── */
  const header = $('#siteHeader');
  let lastY = 0;
  function onScroll(y) {
    if (!root.classList.contains('menu-open')) header.classList.toggle('is-hidden', y > 240 && y > lastY);
    lastY = y;
  }
  if (lenis) lenis.on('scroll', (l) => onScroll(l.scroll));
  else addEventListener('scroll', () => onScroll(scrollY), { passive: true });

  /* Активний пункт меню */
  const navLinks = $$('.main-nav a');
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  navLinks.forEach((a) => { const s = document.getElementById(a.getAttribute('href').slice(1)); if (s) navIO.observe(s); });

  /* ── Мобільне меню ─────────────────────────────────────── */
  const burger = $('#burger');
  const menu = $('#menu');
  function toggleMenu(open) {
    root.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    header.classList.remove('is-hidden');
    if (lenis) open ? lenis.stop() : lenis.start();
  }
  burger.addEventListener('click', () => toggleMenu(!root.classList.contains('menu-open')));

  /* ── Drawer ────────────────────────────────────────────── */
  const drawer = $('#drawer');
  const panel = $('.drawer-panel', drawer);
  let lastFocus = null;
  function openDrawer(id) {
    const item = document.getElementById(id);
    if (!item) return;
    $$('.drawer-item', drawer).forEach((el) => { el.hidden = el !== item; });
    const h = $('h3', item);
    h.id = 'drawerTitle';
    $$('.drawer-item h3', drawer).forEach((x) => { if (x !== h) x.removeAttribute('id'); });
    panel.scrollTop = 0;
    lastFocus = document.activeElement;
    drawer.setAttribute('aria-hidden', 'false');
    drawer.offsetHeight; // перезапуск переходу
    drawer.classList.add('is-open');
    if (lenis) lenis.stop();
    setTimeout(() => panel.focus({ preventScroll: true }), 50);
    track('drawer_open', { item: id });
  }
  function closeDrawer(after) {
    if (!drawer.classList.contains('is-open')) { if (after) after(); return; }
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (lenis) lenis.start();
    if (lastFocus && !after) lastFocus.focus({ preventScroll: true });
    if (after) setTimeout(after, 380);
  }
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-drawer]');
    if (opener) { openDrawer(opener.dataset.drawer); return; }
    const closer = e.target.closest('[data-close]');
    if (closer && !closer.matches('a[href^="#"]')) closeDrawer();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (drawer.classList.contains('is-open')) closeDrawer();
    else if (root.classList.contains('menu-open')) toggleMenu(false);
  });
  /* Фокус не виходить за межі відкритої панелі */
  drawer.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = $$('a[href], button:not([disabled])', panel).filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });

  /* Кнопки «Presupuesto para esto» відмічають продукт у формі */
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-chip]');
    if (!el) return;
    const box = $(`.chips input[value="${el.dataset.chip}"]`);
    if (box) box.checked = true;
  });

  /* ── Кроки процесу ─────────────────────────────────────── */
  const steps = $$('[data-step]');
  const stepIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const i = en.target.dataset.step;
      steps.forEach((s) => s.classList.toggle('is-active', s === en.target));
      $$('[data-step-img]').forEach((f) => f.classList.toggle('is-active', f.dataset.stepImg === i));
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach((s) => stepIO.observe(s));

  /* ── FAQ: плавне відкриття ─────────────────────────────── */
  $$('.qa').forEach((d) => {
    const sum = $('summary', d);
    const body = $('.qa-body', d);
    sum.addEventListener('click', (e) => {
      if (reduce || !body.animate) return;
      e.preventDefault();
      if (d.open) {
        const a = body.animate([{ height: body.offsetHeight + 'px' }, { height: '0px' }], { duration: 450, easing: 'cubic-bezier(.16,.84,.44,1)' });
        a.onfinish = () => { d.open = false; refresh(); };
      } else {
        d.open = true;
        const h = body.offsetHeight;
        const a = body.animate([{ height: '0px' }, { height: h + 'px' }], { duration: 550, easing: 'cubic-bezier(.16,.84,.44,1)' });
        a.onfinish = refresh;
      }
    });
  });
  function refresh() { if (hasGsap) ST.refresh(); if (lenis) lenis.resize(); }

  /* ── Форма ─────────────────────────────────────────────── */
  const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
  let utm = {};
  try { utm = JSON.parse(sessionStorage.getItem('gr_utm') || '{}'); } catch (_) {}
  const q = new URLSearchParams(location.search);
  UTM.forEach((k) => { if (q.get(k)) utm[k] = q.get(k); });
  try { sessionStorage.setItem('gr_utm', JSON.stringify(utm)); } catch (_) {}

  const form = $('#leadForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.elements.name;
      const phone = form.elements.phone;
      const consent = form.elements.consent;
      let ok = true;
      [[name, name.value.trim().length > 1], [phone, phone.value.replace(/\D/g, '').length >= 7]].forEach(([el, valid]) => {
        el.closest('.field').classList.toggle('is-invalid', !valid);
        if (!valid) ok = false;
      });
      consent.closest('.consent').classList.toggle('is-invalid', !consent.checked);
      if (!consent.checked) ok = false;
      if (!ok) { (form.querySelector('.is-invalid input') || consent).focus(); return; }

      const btn = form.querySelector('[type=submit]');
      const label = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = btn.dataset.sending;
      $('.form-error', form).hidden = true;

      const data = Object.assign({
        name: name.value.trim(),
        phone: phone.value.trim(),
        products: $$('input[name=product]:checked', form).map((i) => i.value),
        city: form.elements.city.value.trim(),
        comment: form.elements.comment.value.trim(),
        calc: form.elements.calc.value,
        lang: form.elements.lang.value,
        page: location.href,
        ts: new Date().toISOString(),
      }, utm);

      try {
        if (CFG.formEndpoint) {
          const r = await fetch(CFG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
          if (!r.ok) throw new Error(r.status);
        }
        track('lead_submit', { products: data.products.join(','), lang: data.lang });
        $('.form-ok', form).hidden = false;
      } catch (err) {
        $('.form-error', form).hidden = false;
        btn.disabled = false;
        btn.innerHTML = label;
      }
    });
    $$('input', form).forEach((i) => i.addEventListener('input', () => {
      const f = i.closest('.field, .consent');
      if (f) f.classList.remove('is-invalid');
    }));
  }

  /* ── До і після: повзунок порівняння ───────────────────── */
  $$('[data-ba]').forEach((box) => {
    const range = $('.ba-range', box);
    const set = (v) => { box.style.setProperty('--pos', v + '%'); range.value = v; };
    range.addEventListener('input', () => set(range.value));
    /* Підказка: при першій появі повзунок сам «ходить» туди-назад */
    if (hasGsap && !reduce) {
      const o = { v: 50 };
      ST.create({
        trigger: box, start: 'top 65%', once: true,
        onEnter: () => gsap.timeline({ onUpdate: () => set(o.v) })
          .to(o, { v: 22, duration: 0.9, ease: 'power2.inOut' })
          .to(o, { v: 50, duration: 1.1, ease: 'power3.inOut' }),
      });
    }
  });

  /* ── Калькулятор ───────────────────────────────────────── */
  /* Тарифи й підписи приходять із src/data.mjs через <script id="calcData"> */
  const calcEl = $('#calc');
  const calcDataEl = $('#calcData');
  let calcSummary = '';
  if (calcEl && calcDataEl) {
    const C = JSON.parse(calcDataEl.textContent);
    const fmt = new Intl.NumberFormat(C.locale, { maximumFractionDigits: 0, useGrouping: true });
    const eur = (n) => fmt.format(Math.round(n / 500) * 500) + ' €';
    const areaIn = $('#calcArea');
    const areaOut = $('#calcAreaOut');
    const minEl = $('[data-calc-min]');
    const maxEl = $('[data-calc-max]');
    const wkEl = $('[data-calc-weeks]');
    const waEl = $('[data-calc-wa]');
    let lastType = calcEl.elements.type.value;

    function calc() {
      const type = calcEl.elements.type.value;
      const q = calcEl.elements.quality.value;
      /* Для «лише кухня/ванна» площа зазвичай мала, для квартири — навпаки */
      if (type !== lastType) {
        if (type === 'bathKitchen' && +areaIn.value > 40) areaIn.value = 20;
        else if (lastType === 'bathKitchen' && +areaIn.value < 40) areaIn.value = C.area.value;
        lastType = type;
      }
      const area = +areaIn.value;
      const addons = $$('input[name=addon]:checked', calcEl).map((i) => i.value);
      const [rMin, rMax] = C.rates[type][q];
      let lo = area * rMin;
      let hi = area * rMax;
      addons.forEach((k) => {
        const a = C.addons[k];
        let add = [0, 0];
        if (a.fixed) add = a.fixed.slice();
        if (a.perM2) add = [area * a.perM2[0], area * a.perM2[1]];
        if (a.min) add = [Math.max(add[0], a.min[0]), Math.max(add[1], a.min[1])];
        if (k === 'kitchen') add = add.map((x) => x * C.qualityFactorForKitchen[q]);
        lo += add[0];
        hi += add[1];
      });
      const W = C.weeks;
      let w1 = Math.round(W.base + area / W.perWeek) + (q === 'luxury' ? W.luxuryExtra : 0);
      if (type === 'bathKitchen') w1 = Math.min(w1, W.bathKitchenMax);
      const w2 = w1 + W.spread;

      areaOut.textContent = area + (area >= C.area.max ? '+' : '') + ' m²';
      areaIn.style.setProperty('--fill', ((area - C.area.min) / (C.area.max - C.area.min)) * 100 + '%');
      minEl.textContent = eur(lo);
      maxEl.textContent = eur(hi);
      wkEl.textContent = `${w1}–${w2} ${C.labels.weeks}`;

      const extras = addons.length ? ' + ' + addons.map((k) => C.labels.addons[k]).join(', ') : '';
      calcSummary = `${C.labels.types[type]} · ${area} m² · ${C.labels.qualities[q]}${extras} → ${eur(lo)} – ${eur(hi)}, ${w1}–${w2} ${C.labels.weeks}`;
      waEl.href = C.whatsapp + '?text=' + encodeURIComponent(C.labels.waMsg + '\n' + calcSummary);
    }
    calcEl.addEventListener('input', calc);
    calcEl.addEventListener('change', calc);
    calc();

    /* «Замовити виїзд» переносить розрахунок у приховане поле форми */
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-chip="calc"]') && form) form.elements.calc.value = calcSummary;
    });
  }

  /* ── Курсор і магнітні кнопки (тільки миша) ────────────── */
  if (finePointer && hasGsap && !reduce) {
    const cur = $('#cursor');
    const label = $('.cursor-label', cur);
    const xTo = gsap.quickTo(cur, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(cur, 'y', { duration: 0.45, ease: 'power3' });
    addEventListener('pointermove', (e) => { cur.classList.add('is-on'); xTo(e.clientX); yTo(e.clientY); }, { passive: true });
    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('[data-cursor]');
      cur.classList.toggle('is-label', !!t && !drawer.classList.contains('is-open'));
      if (t) label.textContent = t.dataset.cursor;
      cur.classList.toggle('is-hidden', !!e.target.closest('input, textarea, .drawer-panel'));
    });
    document.addEventListener('pointerleave', () => cur.classList.add('is-hidden'));
    document.addEventListener('pointerenter', () => cur.classList.remove('is-hidden'));

    $$('[data-magnetic]').forEach((el) => {
      const mx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, .4)' });
      const my = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, .4)' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * 0.25);
        my((e.clientY - r.top - r.height / 2) * 0.35);
      });
      el.addEventListener('pointerleave', () => { mx(0); my(0); });
    });
  }

  /* ── Без GSAP далі нічого не анімуємо ───────────────────── */
  if (!hasGsap) {
    $$('[data-reveal]').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });
    $$('.manifesto-text .w').forEach((w) => { w.style.opacity = 1; });
    $('#preloader') && $('#preloader').remove();
    return;
  }

  /* ── Зміна теми (кольору фону) між розділами ───────────── */
  const THEMES = {
    paper: { '--bg': '#F5F2EC', '--fg': '#1F1E1C', '--mute': 'rgba(31,30,28,0.66)', '--line': 'rgba(31,30,28,0.14)', '--accent': '#7F5F35' },
    sand:  { '--bg': '#E6DFD3', '--fg': '#1F1E1C', '--mute': 'rgba(31,30,28,0.7)', '--line': 'rgba(31,30,28,0.16)', '--accent': '#7F5F35' },
    dark:  { '--bg': '#1F1E1C', '--fg': '#F5F2EC', '--mute': 'rgba(245,242,236,0.7)', '--line': 'rgba(245,242,236,0.18)', '--accent': '#CDB083' },
    brand: { '--bg': '#7F5F35', '--fg': '#F5F2EC', '--mute': 'rgba(245,242,236,0.85)', '--line': 'rgba(245,242,236,0.26)', '--accent': '#F0DDB8' },
  };
  const themeMeta = $('meta[name="theme-color"]');
  let currentTheme = null;
  function setTheme(name, instant) {
    if (name === currentTheme || !THEMES[name]) return;
    currentTheme = name;
    gsap.to(root, Object.assign({ duration: instant || reduce ? 0 : 0.9, ease: 'power2.inOut', overwrite: true }, THEMES[name]));
    if (themeMeta) themeMeta.content = THEMES[name]['--bg'];
  }
  setTheme('dark', true);

  /* ── Прелоадер та вхід у hero ──────────────────────────── */
  const heroLines = $$('.hero-title .ln > span');
  const heroFade = $$('[data-hero-fade]');
  const heroImg = $('.hero-media img');
  gsap.set(heroLines, { yPercent: 110 });
  gsap.set(heroFade, { autoAlpha: 0, y: 24 });

  function heroIn() {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.fromTo(heroImg, { scale: 1.18 }, { scale: 1, duration: 2.2 }, 0)
      .to(heroLines, { yPercent: 0, duration: 1.4, stagger: 0.1 }, 0.1)
      .to(heroFade, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.1 }, 0.5);
  }

  const pre = $('#preloader');
  const skipPre = reduce || root.classList.contains('seen') || !pre;
  if (skipPre) {
    if (pre) pre.remove();
    heroIn();
  } else {
    if (lenis) lenis.stop();
    const count = $('#preloaderCount');
    const c = { v: 0 };
    const tl = gsap.timeline();
    tl.from('.preloader-inner > *', { autoAlpha: 0, y: 16, stagger: 0.1, duration: 0.8, ease: 'power3.out' })
      .to(c, { v: 100, duration: 1.3, ease: 'power2.inOut', onUpdate: () => { count.textContent = String(Math.round(c.v)).padStart(2, '0'); } }, 0)
      .to(pre, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '+=0.15')
      .add(heroIn, '-=0.55')
      .add(() => { pre.remove(); if (lenis) lenis.start(); try { sessionStorage.setItem('gr_seen', '1'); } catch (_) {} });
  }

  /* Паралакс hero */
  gsap.to('.hero-media', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* ── Заголовки: рядки з маски ──────────────────────────── */
  $$('[data-lines]').forEach((h) => {
    if (h.classList.contains('hero-title')) return;
    gsap.from($$('.ln > span', h), {
      yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.09,
      scrollTrigger: { trigger: h, start: 'top 88%' },
    });
  });

  /* Інші блоки: плавна поява */
  ST.batch('[data-reveal]', {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 }),
  });

  /* ── Маніфест: слова проявляються ──────────────────────── */
  gsap.to('.manifesto-text .w', {
    opacity: 1, stagger: 0.05, ease: 'none',
    scrollTrigger: { trigger: '.manifesto-text', start: 'top 78%', end: 'bottom 50%', scrub: 0.6 },
  });

  /* Лічильники */
  $$('[data-count]').forEach((el) => {
    const end = +el.dataset.count;
    const o = { v: 0 };
    el.textContent = '0';
    gsap.to(o, {
      v: end, duration: 1.8, ease: 'power3.out',
      onUpdate: () => { el.textContent = Math.round(o.v); },
      scrollTrigger: { trigger: el, start: 'top 90%' },
    });
  });

  /* ── Продукти: горизонтальний скрол ────────────────────── */
  const htrack = $('[data-htrack]');
  const bar = $('[data-progress]');
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
    root.classList.add('hscroll');
    const dist = () => Math.max(0, htrack.scrollWidth - htrack.clientWidth);
    const tw = gsap.to(htrack, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: '[data-hscroll]', start: 'top top', end: () => '+=' + dist(),
        pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
      },
    });
    gsap.from($$('.panel', htrack).slice(0, 4), {
      x: 120, autoAlpha: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08,
      scrollTrigger: { trigger: htrack, start: 'top 85%' },
    });
    return () => { root.classList.remove('hscroll'); tw.kill(); gsap.set(htrack, { clearProps: 'x' }); };
  });
  mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)', () => {
    const upd = () => gsap.set(bar, { scaleX: htrack.scrollLeft / Math.max(1, htrack.scrollWidth - htrack.clientWidth) });
    htrack.addEventListener('scroll', upd, { passive: true });
    return () => htrack.removeEventListener('scroll', upd);
  });

  /* ── Фото проєктів: розкриття через clip-path ──────────── */
  $$('.work [data-clip], .founder-photo[data-clip]').forEach((el) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%' } });
    tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' })
      .fromTo(el.firstElementChild || el, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0.1);
  });

  /* ── Бігучий рядок, швидкість залежить від скролу ──────── */
  const mq = $('[data-marquee]');
  if (mq && !reduce) {
    const loop = gsap.to(mq, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
    let dir = 1;
    const boost = (v) => {
      if (Math.abs(v) < 0.5) return;
      dir = v > 0 ? 1 : -1;
      gsap.to(loop, { timeScale: dir * Math.min(1 + Math.abs(v) / 6, 6), duration: 0.2, overwrite: true });
      gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.2, ease: 'power2.out' });
    };
    if (lenis) lenis.on('scroll', (l) => boost(l.velocity));
    ST.create({ trigger: '.marquee', start: 'top bottom', end: 'bottom top', onToggle: (s) => (s.isActive ? loop.play() : loop.pause()) });
  }

  /* Велике слово у футері виїжджає */
  gsap.from('.footer-word', { yPercent: 40, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });

  /* Тема за розділом, що зараз посередині екрана.
     Створюємо після pin-секцій, щоб позиції враховували їхню висоту. */
  $$('[data-bg]').forEach((sec) => {
    ST.create({
      trigger: sec, start: 'top 50%', end: 'bottom 50%',
      onToggle: (self) => { if (self.isActive) setTheme(sec.dataset.bg); },
    });
  });


  addEventListener('load', () => ST.refresh());
})();
