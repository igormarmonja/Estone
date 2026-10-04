/* Посадкові сторінки: той самий характер руху, що на головній, без прелоадера, галереї й drawer.
   Головна сторінка цей файл не використовує (у неї main.js). */
(function () {
  const CFG = window.ESTONE_CONFIG || {};

  /* ── Відправка заявки ─────────────────────────────────────
     1) Web3Forms (лист на пошту) — якщо в config.js є web3formsKey;
     2) власний вебхук (CRM, Google Apps Script…) — якщо є formEndpoint;
     3) якщо нічого не налаштовано — відкриваємо WhatsApp з готовим текстом, щоб заявка не загубилась. */
  window.sendLead = async function (data) {
    const flat = Object.assign({}, data, { products: (data.products || []).join(', ') });
    let sent = false;
    if (CFG.web3formsKey) {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.assign({
          access_key: CFG.web3formsKey,
          subject: 'Nueva solicitud evostone.es · ' + (flat.products || 'general'),
          from_name: 'evostone.es',
        }, flat)),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.success === false) throw new Error(j.message || r.status);
      sent = true;
    }
    if (CFG.formEndpoint) {
      const r = await fetch(CFG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error(r.status);
      sent = true;
    }
    if (!sent && CFG.whatsappFallback) {
      const text = ['Solicitud desde evostone.es', flat.name, flat.phone, flat.products, flat.comment].filter(Boolean).join('\n');
      window.open(CFG.whatsappFallback + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    }
  };
  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  const hasGsap = !!(gsap && ST);
  if (hasGsap) gsap.registerPlugin(ST);
  const landing = ($('input[name=landing]') || {}).value || '';

  /* ── Аналітика ─────────────────────────────────────────── */
  window.dataLayer = window.dataLayer || [];
  function track(event, params) {
    const p = Object.assign({ landing }, params || {});
    window.dataLayer.push(Object.assign({ event }, p));
    if (typeof window.gtag === 'function') window.gtag('event', event, p);
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
    if (el) track(el.dataset.track + '_click');
  });

  /* ── Заглушки фото ─────────────────────────────────────── */
  function placeholder(img) {
    const box = document.createElement('div');
    box.className = 'photo-ph';
    box.setAttribute('role', 'img');
    box.setAttribute('aria-label', img.alt || '');
    box.innerHTML =
      '<svg viewBox="0 0 295 300" aria-hidden="true"><path d="M0 0h295v45H120v45H0z"/><path d="M0 135h295v45H120v45H0z"/><path d="M0 255h295v45H0z"/></svg>' +
      '<span class="photo-ph-label"></span><code class="photo-ph-file"></code>';
    box.querySelector('.photo-ph-label').textContent = img.dataset.ph;
    box.querySelector('.photo-ph-file').textContent = 'assets/img/' + (img.getAttribute('src') || '').split('/').pop();
    img.replaceWith(box);
  }
  $$('img[data-ph]').forEach((img) => {
    img.addEventListener('error', () => placeholder(img), { once: true });
    if (img.complete && img.naturalWidth === 0) placeholder(img);
  });

  /* ── Плавний скрол ─────────────────────────────────────── */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.085, anchors: false, autoRaf: !hasGsap });
    window.__lenis = lenis;
    if (hasGsap) {
      lenis.on('scroll', ST.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    if (root.classList.contains('menu-open')) toggleMenu(false);
    if (lenis) lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  });

  /* ── Шапка й меню ──────────────────────────────────────── */
  const header = $('#siteHeader');
  let lastY = 0;
  function onScroll(y) {
    if (!root.classList.contains('menu-open')) header.classList.toggle('is-hidden', y > 240 && y > lastY);
    lastY = y;
  }
  if (lenis) lenis.on('scroll', (l) => onScroll(l.scroll));
  else addEventListener('scroll', () => onScroll(scrollY), { passive: true });

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
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('menu-open')) toggleMenu(false); });

  /* ── FAQ ───────────────────────────────────────────────── */
  function refresh() { if (hasGsap) ST.refresh(); if (lenis) lenis.resize(); }
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
        const a = body.animate([{ height: '0px' }, { height: body.offsetHeight + 'px' }], { duration: 550, easing: 'cubic-bezier(.16,.84,.44,1)' });
        a.onfinish = refresh;
      }
    });
  });

  /* Форми й попап заявки — assets/js/lead.js */
  window.__ui = { track, lenis, toggleMenu };

  /* ── Курсор і магнітні кнопки ──────────────────────────── */
  if (finePointer && hasGsap && !reduce) {
    const cur = $('#cursor');
    const label = $('.cursor-label', cur);
    const xTo = gsap.quickTo(cur, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(cur, 'y', { duration: 0.45, ease: 'power3' });
    addEventListener('pointermove', (e) => { cur.classList.add('is-on'); xTo(e.clientX); yTo(e.clientY); }, { passive: true });
    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('[data-cursor]');
      cur.classList.toggle('is-label', !!t);
      if (t) label.textContent = t.dataset.cursor;
      cur.classList.toggle('is-hidden', !!e.target.closest('input, textarea'));
    });
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

  if (!hasGsap) {
    $$('[data-reveal]').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });
    return;
  }

  /* ── Тема фону за розділом ─────────────────────────────── */
  const THEMES = {
    paper: { '--bg': '#F5EDE3', '--fg': '#594133', '--mute': 'rgba(89,65,51,0.64)', '--line': 'rgba(89,65,51,0.16)', '--accent': '#8A4F2A' },
    sand:  { '--bg': '#E3D5C5', '--fg': '#594133', '--mute': 'rgba(89,65,51,0.68)', '--line': 'rgba(89,65,51,0.18)', '--accent': '#8A4F2A' },
    dark:  { '--bg': '#594133', '--fg': '#F5EDE3', '--mute': 'rgba(245,237,227,0.7)', '--line': 'rgba(245,237,227,0.2)', '--accent': '#D9C3B0' },
    brand: { '--bg': '#8A4F2A', '--fg': '#F5EDE3', '--mute': 'rgba(245,237,227,0.78)', '--line': 'rgba(245,237,227,0.26)', '--accent': '#E3D5C5' },
  };
  const themeMeta = $('meta[name="theme-color"]');
  let current = null;
  function setTheme(name, instant) {
    if (name === current || !THEMES[name]) return;
    current = name;
    gsap.to(root, Object.assign({ duration: instant || reduce ? 0 : 0.9, ease: 'power2.inOut', overwrite: true }, THEMES[name]));
    if (themeMeta) themeMeta.content = THEMES[name]['--bg'];
  }
  setTheme('paper', true);
  $$('[data-bg]').forEach((sec) => {
    ST.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%', onToggle: (self) => { if (self.isActive) setTheme(sec.dataset.bg); } });
  });

  /* ── Вхід першого екрана ───────────────────────────────── */
  const heroLines = $$('.lp-hero h1 .ln > span');
  const heroRest = $$('.crumbs, .lp-hero .lead, .lp-price, .lp-actions, .gal-filters');
  const heroMedia = $('.lp-hero-media');
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from(heroLines, { yPercent: 110, duration: 1.3, stagger: 0.1 }, 0.1)
    .from(heroRest, { autoAlpha: 0, y: 20, duration: 1.1, stagger: 0.08 }, 0.35);
  if (heroMedia) {
    tl.fromTo(heroMedia, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' }, 0)
      .fromTo(heroMedia.firstElementChild || heroMedia, { scale: 1.25 }, { scale: 1, duration: 2 }, 0.2);
  }

  /* Заголовки розділів — рядки з маски */
  $$('[data-lines]').forEach((h) => {
    if (h.closest('.lp-hero')) return;
    gsap.from($$('.ln > span', h), { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.09, scrollTrigger: { trigger: h, start: 'top 88%' } });
  });

  ST.batch('[data-reveal]', {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 }),
  });

  /* Галерея: розкриття через clip-path */
  $$('.lp-gal [data-clip]').forEach((el, i) => {
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%' } })
      .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', delay: i * 0.08 })
      .fromTo(el.firstElementChild, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0.1);
  });

  gsap.from('.footer-word', { yPercent: 40, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });

  addEventListener('load', () => ST.refresh());
})();
