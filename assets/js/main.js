(function () {
  const CFG = window.ESTONE_CONFIG || {};

  /* ── Аналітика ──────────────────────────────────────────── */
  window.dataLayer = window.dataLayer || [];
  function track(event, params) {
    const payload = Object.assign({ event }, params || {});
    window.dataLayer.push(payload);
    if (typeof window.gtag === 'function') window.gtag('event', event, params || {});
    if (typeof window.fbq === 'function') {
      const std = { lead_submit: 'Lead', phone_click: 'Contact', messenger_click: 'Contact' };
      if (std[event]) window.fbq('track', std[event]);
    }
  }

  function loadAnalytics() {
    if (CFG.ga4Id) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + CFG.ga4Id;
      document.head.appendChild(s);
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      gtag('js', new Date());
      gtag('config', CFG.ga4Id);
      if (CFG.googleAdsId) gtag('config', CFG.googleAdsId);
    }
    if (CFG.metaPixelId) {
      /* eslint-disable */
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
      (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
      fbq('init', CFG.metaPixelId);
      fbq('track', 'PageView');
    }
  }
  loadAnalytics();

  /* ── Контакти з конфігу ─────────────────────────────────── */
  function fillContacts() {
    document.querySelectorAll('[data-phone-link]').forEach(el => { if (CFG.phone) el.href = 'tel:' + CFG.phone; });
    document.querySelectorAll('[data-phone-display]').forEach(el => el.textContent = CFG.phoneDisplay || '');
    document.querySelectorAll('[data-phone-es-link]').forEach(el => { if (CFG.phoneEs) el.href = 'tel:' + CFG.phoneEs; });
    document.querySelectorAll('[data-phone-es-display]').forEach(el => el.textContent = CFG.phoneEsDisplay || '');
    document.querySelectorAll('[data-email-link]').forEach(el => {
      if (!CFG.email) { el.remove(); return; }
      el.href = 'mailto:' + CFG.email;
      if (!el.textContent.trim()) el.textContent = CFG.email;
    });

    const box = document.getElementById('messengers');
    if (!box) return;
    const list = [
      { key: 'telegram', label: 'Telegram' },
      { key: 'viber',    label: 'Viber' },
      { key: 'whatsapp', label: 'WhatsApp' },
    ].filter(m => CFG[m.key]);
    box.innerHTML = list.map(m =>
      `<a class="messenger" href="${CFG[m.key]}" target="_blank" rel="noopener" data-messenger="${m.key}">${m.label}</a>`
    ).join('');
  }
  fillContacts();

  document.addEventListener('click', (e) => {
    const phone = e.target.closest('[data-phone-link], [data-phone-es-link]');
    if (phone) track('phone_click', { placement: phone.dataset.cta || 'other' });
    const msg = e.target.closest('[data-messenger]');
    if (msg) track('messenger_click', { channel: msg.dataset.messenger });
    const cta = e.target.closest('[data-cta]');
    if (cta && !phone) track('cta_click', { placement: cta.dataset.cta });
  });

  /* ── Заглушки для фото, яких ще немає ───────────────────── */
  /* Покладіть файл із вказаним іменем у assets/img/ — заглушка зникне сама. */
  function makePlaceholder(img) {
    const src = img.getAttribute('src') || '';
    const file = src.split('/').pop();
    const label = img.dataset.ph || 'Фото';
    const box = document.createElement('div');
    box.className = 'photo-ph';
    box.innerHTML = `
      <svg viewBox="0 0 100 70" aria-hidden="true"><rect x="30" y="0" width="70" height="15"/><rect x="0" y="27.5" width="72" height="15"/><rect x="30" y="55" width="70" height="15"/></svg>
      <span class="photo-ph-label">${label}</span>
      <code class="photo-ph-file">assets/img/${file}</code>`;
    const parent = img.parentElement;
    if (!parent) return;
    parent.classList.add('has-ph');
    parent.replaceChild(box, img);
  }

  document.querySelectorAll('img[data-ph]').forEach(img => {
    img.addEventListener('error', () => makePlaceholder(img), { once: true });
    if (img.complete && img.naturalWidth === 0) makePlaceholder(img);
  });

  /* ── Вибір продукту у формах ────────────────────────────── */
  const PRODUCT_OPTIONS = [
    'Кухонна стільниця',
    'Мийка з каменю',
    'Умивальник / ванна кімната',
    'Підвіконня',
    'Сходи',
    'Камінний портал або стіл',
    'Комерційний об’єкт',
    'Інше / ще не визначився',
  ];
  document.querySelectorAll('[data-product-select]').forEach(sel => {
    PRODUCT_OPTIONS.forEach(v => {
      const o = document.createElement('option');
      o.value = v; o.textContent = v;
      sel.appendChild(o);
    });
  });

  /* Кнопка «Прорахувати X» у секції продукту підставляє напрям у форму */
  const CTA_TO_PRODUCT = {
    kukhnia: 'Кухонна стільниця',
    vanna: 'Умивальник / ванна кімната',
    pidvikonnia: 'Підвіконня',
    skhody: 'Сходи',
    interier: 'Камінний портал або стіл',
    komertsiia: 'Комерційний об’єкт',
  };
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-cta]');
    if (!el) return;
    const product = CTA_TO_PRODUCT[el.dataset.cta];
    if (!product) return;
    document.querySelectorAll('[data-product-select]').forEach(sel => { sel.value = product; });
  });

  /* ── UTM та джерело ─────────────────────────────────────── */
  const UTM_KEYS = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'];
  function captureUtm() {
    const q = new URLSearchParams(location.search);
    let stored = {};
    try { stored = JSON.parse(sessionStorage.getItem('estone_utm') || '{}'); } catch (_) {}
    let changed = false;
    UTM_KEYS.forEach(k => { if (q.get(k)) { stored[k] = q.get(k); changed = true; } });
    if (changed) { try { sessionStorage.setItem('estone_utm', JSON.stringify(stored)); } catch (_) {} }
    return stored;
  }
  const utm = captureUtm();

  /* ── Header + sticky CTA ────────────────────────────────── */
  const header = document.getElementById('siteHeader');
  const sticky = document.getElementById('stickyCta');
  const heroImg = document.querySelector('#heroBg img');

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    if (sticky) sticky.classList.toggle('is-visible', y > window.innerHeight * 0.6);
    if (heroImg && y < window.innerHeight) heroImg.style.transform = `scale(1.12) translateY(${y * 0.05}px)`;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Мобільне меню ──────────────────────────────────────── */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('mainNav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
  }));

  /* ── Поява блоків ───────────────────────────────────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const sibs = Array.from(el.parentElement.children).filter(c => c.hasAttribute('data-reveal'));
      el.style.animationDelay = `${(sibs.indexOf(el) % 4) * 80}ms`;
      el.classList.add('is-visible');
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  const observe = (el) => io.observe(el);
  document.querySelectorAll('[data-reveal]').forEach(observe);

  /* ── Каталог ────────────────────────────────────────────── */
  const grid = document.getElementById('productGrid');
  const products = window.PRODUCTS || [];

  if (grid && products.length) {
    grid.innerHTML = products.map((p, i) => `
      <button class="product-card" type="button" data-series="${p.series}" data-index="${i}" data-reveal>
        <span class="product-card-code">${p.code}</span>
        <img src="assets/img/${p.img}" alt="Умивальник ${p.code} з каменю" loading="lazy">
        <span class="product-card-overlay"><span>${p.desc}</span></span>
      </button>
    `).join('');
    grid.querySelectorAll('[data-reveal]').forEach(observe);

    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        const f = tab.dataset.filter;
        grid.querySelectorAll('.product-card').forEach(card => {
          card.classList.toggle('is-hidden', f !== 'all' && card.dataset.series !== f);
        });
        track('catalog_filter', { series: f });
      });
    });

    /* Lightbox */
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    const lbCode = document.getElementById('lightboxCode');
    const lbDesc = document.getElementById('lightboxDesc');
    const lbMat = document.getElementById('lightboxMaterial');
    let lastModel = '';

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;
      const p = products[Number(card.dataset.index)];
      lastModel = p.code;
      lbImg.src = 'assets/img/' + p.img;
      lbImg.alt = 'Умивальник ' + p.code;
      lbCode.textContent = p.code;
      lbDesc.textContent = p.desc;
      lbMat.textContent = p.material;
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      track('model_view', { model: p.code, series: p.series });
    });

    const closeLb = () => { lb.classList.remove('is-open'); document.body.style.overflow = ''; };
    document.getElementById('lightboxClose').addEventListener('click', closeLb);
    document.getElementById('lightboxCta').addEventListener('click', () => {
      const field = document.querySelector('.lead-form-main [name="comment"]');
      if (field && lastModel) field.value = `Цікавить модель ${lastModel}`;
      closeLb();
    });
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
  }

  /* ── Форми ──────────────────────────────────────────────── */
  const thanks = document.getElementById('thanks');
  const thanksClose = document.getElementById('thanksClose');
  if (thanksClose) {
    thanksClose.addEventListener('click', () => {
      thanks.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  function showThanks() {
    thanks.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (CFG.googleAdsId && CFG.googleAdsLabel && typeof window.gtag === 'function') {
      gtag('event', 'conversion', { send_to: `${CFG.googleAdsId}/${CFG.googleAdsLabel}` });
    }
  }

  document.querySelectorAll('.lead-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const data = Object.fromEntries(new FormData(form).entries());

      if (!data.name || !data.phone || data.phone.replace(/\D/g, '').length < 9) {
        form.classList.add('has-error');
        setTimeout(() => form.classList.remove('has-error'), 1600);
        return;
      }

      const payload = Object.assign({}, data, utm, {
        form: form.dataset.form || 'unknown',
        page: location.pathname + location.search,
        ts: new Date().toISOString(),
      });

      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Надсилаємо…';

      if (CFG.formEndpoint) {
        try {
          await fetch(CFG.formEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        } catch (err) {
          console.warn('ESTONE: не вдалось надіслати заявку', err);
        }
      } else {
        console.info('ESTONE: formEndpoint не заданий у config.js. Заявка:', payload);
      }

      track('lead_submit', { form: payload.form, source: utm.utm_source || 'direct' });
      form.reset();
      btn.disabled = false;
      btn.textContent = original;
      showThanks();
    });
  });

  /* ── Рік у підвалі ──────────────────────────────────────── */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
