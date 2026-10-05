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

    /* Viber і WhatsApp будуються з номера, якщо не задані вручну */
    const digits = (CFG.phone || '').replace(/\D/g, '');
    const auto = {
      telegram: CFG.telegram,
      viber:    CFG.viber    || (digits ? 'viber://chat?number=%2B' + digits : ''),
      whatsapp: CFG.whatsapp || (digits ? 'https://wa.me/' + digits : ''),
    };
    const list = [
      { key: 'telegram', label: 'Telegram' },
      { key: 'viber',    label: 'Viber' },
      { key: 'whatsapp', label: 'WhatsApp' },
    ].filter(m => auto[m.key] && auto[m.key] !== 'off');

    /* У WhatsApp і Telegram можна передати готовий текст повідомлення */
    window.ESTONE_messengerHtml = (text) => list.map(m => {
      let href = auto[m.key];
      if (text) {
        if (m.key === 'whatsapp') href += '?text=' + encodeURIComponent(text);
        else if (m.key === 'telegram' && /t\.me\//.test(href)) href += '?text=' + encodeURIComponent(text);
      }
      return `<a class="messenger messenger-${m.key}" href="${href}" target="_blank" rel="noopener" data-messenger="${m.key}">${m.label}</a>`;
    }).join('');

    /* месенджерів на сторінці може бути кілька блоків */
    document.querySelectorAll('.messengers').forEach(box => {
      box.innerHTML = window.ESTONE_messengerHtml(box.dataset.text || '');
    });

    /* Соцмережі */
    const socials = [
      { key: 'instagram', label: 'Instagram' },
      { key: 'facebook',  label: 'Facebook' },
    ].filter(x => CFG[x.key]);
    document.querySelectorAll('[data-socials]').forEach(box => {
      const block = box.closest('[data-socials-block]') || box;
      if (!socials.length) { block.hidden = true; return; }
      box.innerHTML = socials.map(x =>
        `<a class="social social-${x.key}" href="${CFG[x.key]}" target="_blank" rel="noopener" data-social="${x.key}">${x.label}</a>`
      ).join('');
      block.hidden = false;
    });
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

  document.querySelectorAll('img[data-ph],img[data-fallback]').forEach(img => {
    const onFail = () => {
      const fallback = img.dataset.fallback;
      if (fallback && img.getAttribute('src') !== fallback) {
        img.src = fallback;          /* є запасне фото — ставимо його */
        return;
      }
      if (img.dataset.ph) makePlaceholder(img);
    };
    img.addEventListener('error', onFail);
    if (img.complete && img.naturalWidth === 0) onFail();
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
  function fillProductSelects(root) {
    (root || document).querySelectorAll('[data-product-select]').forEach(sel => {
      if (sel.dataset.filled) return;
      PRODUCT_OPTIONS.forEach(v => {
        const o = document.createElement('option');
        o.value = v; o.textContent = v;
        sel.appendChild(o);
      });
      sel.dataset.filled = '1';
    });
  }
  fillProductSelects();

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
  if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
  }));
  }

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
  /* на внутрішніх сторінках шлях до фото інший — задається в IMG_BASE */
  const imgBase = window.IMG_BASE || 'assets/img/';

  /* Лайтбокс моделі: спільний для каталогу і каруселі */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCode = document.getElementById('lightboxCode');
  const lbDesc = document.getElementById('lightboxDesc');
  const lbMat = document.getElementById('lightboxMaterial');
  let lastModel = '';

  const closeLb = () => {
    if (lb) lb.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  function openModel(p) {
    if (!lb) return;
    if (!p) return;
    lastModel = p.code;
    lbImg.src = imgBase + p.img;
    lbImg.alt = 'Умивальник ' + p.code;
    lbCode.textContent = p.code;
    lbDesc.textContent = p.desc;
    lbMat.textContent = p.material;
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    track('model_view', { model: p.code, series: p.series });
  }

  /* лайтбокса немає на внутрішніх сторінках — тому все за умовою */
  if (lb) {
    document.getElementById('lightboxClose').addEventListener('click', closeLb);
    document.getElementById('lightboxCta').addEventListener('click', (e) => {
      e.preventDefault();
      const code = lastModel;
      closeLb();
      openPopup({
        title: code ? `Порахувати модель ${code}` : 'Порахувати модель',
        sub: 'Залиште телефон — передзвонимо і скажемо ціну саме цієї моделі під ваш розмір.',
        form: 'popup-model',
        model: code,
        compact: true,
      });
    });
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
  }

  if (grid && products.length) {
    grid.innerHTML = products.map((p, i) => `
      <button class="product-card" type="button" data-series="${p.series}" data-index="${i}" data-reveal>
        <span class="product-card-code">${p.code}</span>
        <img src="${imgBase}${p.img}" alt="Умивальник ${p.code} з каменю" loading="lazy">
        <span class="product-card-overlay"><span>${p.desc}</span></span>
      </button>
    `).join('');
    grid.querySelectorAll('[data-reveal]').forEach(observe);

    /* На головній показуємо не всі моделі одразу */
    const limit = parseInt(grid.dataset.limit || '0', 10);
    let expanded = !limit;
    const cards = () => grid.querySelectorAll('.product-card');
    const moreBtn = grid.parentElement.querySelector('[data-catalog-more]');
    const moreBox = moreBtn ? moreBtn.closest('.catalog-more') || moreBtn : null;

    function applyLimit() {
      if (expanded) {
        cards().forEach(c => c.classList.remove('is-over-limit'));
        if (moreBox) moreBox.hidden = true;
        return;
      }
      let shown = 0;
      cards().forEach(c => {
        const hiddenByFilter = c.classList.contains('is-hidden');
        if (hiddenByFilter) { c.classList.remove('is-over-limit'); return; }
        shown += 1;
        c.classList.toggle('is-over-limit', shown > limit);
      });
      if (moreBox) moreBox.hidden = shown <= limit;
    }

    if (moreBtn) {
      moreBtn.addEventListener('click', () => {
        expanded = true;
        applyLimit();
        track('catalog_expand', { total: products.length });
      });
    }
    applyLimit();

    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        const f = tab.dataset.filter;
        grid.querySelectorAll('.product-card').forEach(card => {
          card.classList.toggle('is-hidden', f !== 'all' && card.dataset.series !== f);
        });
        applyLimit();
        track('catalog_filter', { series: f });
      });
    });

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (card) openModel(products[Number(card.dataset.index)]);
    });
  }

  /* ── Карусель робіт і галерея ───────────────────────────── */
  const worksViewport = document.getElementById('worksTrack');
  const works = window.WORKS || [];
  let gallery = null;
  let galleryIndex = 0;

  if (worksViewport && works.length) {
    const line = worksViewport.querySelector('.works-line');
    const slide = (w, i) => `
      <button class="works-item" type="button" data-gallery="${i}" aria-label="${w.title}">
        <img src="${imgBase}${w.img}" alt="${w.title} — робота ESTONE" loading="lazy">
        <span class="works-caption">
          <span class="works-title">${w.title}</span>
          <span class="works-meta">${w.meta}</span>
        </span>
      </button>`;
    /* двічі — щоб стрічка зациклювалась без стрибка */
    line.innerHTML = works.map(slide).join('') + works.map(slide).join('');

    /* крок прокрутки — одна картка, а не півекрана */
    const step = () => {
      const card = line.querySelector('.works-item');
      return card ? card.offsetWidth + 12 : 300;
    };
    document.querySelectorAll('[data-works]').forEach(btn => {
      btn.addEventListener('click', () => {
        const dir = btn.dataset.works === 'next' ? 1 : -1;
        worksViewport.scrollBy({ left: dir * step(), behavior: 'smooth' });
      });
    });

    /* безкінечна прокрутка: на межі перескакуємо на копію */
    worksViewport.addEventListener('scroll', () => {
      const half = line.scrollWidth / 2;
      if (worksViewport.scrollLeft >= half) worksViewport.scrollLeft -= half;
      else if (worksViewport.scrollLeft <= 0) worksViewport.scrollLeft += half;
    }, { passive: true });

    /* тягнути мишею, як на телефоні */
    let dragging = false, startX = 0, startLeft = 0, moved = 0;
    worksViewport.addEventListener('pointerdown', e => {
      if (e.pointerType === 'touch') return;
      dragging = true; moved = 0;
      startX = e.clientX; startLeft = worksViewport.scrollLeft;
      worksViewport.classList.add('is-dragging');
    });
    window.addEventListener('pointermove', e => {
      if (!dragging) return;
      const d = e.clientX - startX;
      moved = Math.max(moved, Math.abs(d));
      worksViewport.scrollLeft = startLeft - d;
    });
    window.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      worksViewport.classList.remove('is-dragging');
    });

    line.addEventListener('click', e => {
      const item = e.target.closest('[data-gallery]');
      if (!item || moved > 6) return;         /* не відкриваємо після перетягування */
      openGallery(Number(item.dataset.gallery) % works.length);
    });
  }

  /* ── Галерея на весь екран ──────────────────────────────── */
  function buildGallery() {
    if (gallery) return gallery;
    gallery = document.createElement('div');
    gallery.className = 'gallery';
    gallery.setAttribute('role', 'dialog');
    gallery.setAttribute('aria-modal', 'true');
    gallery.innerHTML = `
      <button class="gallery-close" type="button" aria-label="Закрити">&times;</button>
      <button class="gallery-nav gallery-prev" type="button" aria-label="Попереднє">←</button>
      <button class="gallery-nav gallery-next" type="button" aria-label="Наступне">→</button>
      <figure class="gallery-stage">
        <img alt="">
        <figcaption>
          <span class="gallery-title"></span>
          <span class="gallery-meta"></span>
        </figcaption>
      </figure>
      <div class="gallery-counter"></div>
      <div class="gallery-thumbs"></div>`;
    document.body.appendChild(gallery);

    gallery.querySelector('.gallery-close').addEventListener('click', closeGallery);
    gallery.querySelector('.gallery-prev').addEventListener('click', () => stepGallery(-1));
    gallery.querySelector('.gallery-next').addEventListener('click', () => stepGallery(1));
    gallery.addEventListener('click', e => {
      if (e.target === gallery || e.target.classList.contains('gallery-stage')) closeGallery();
    });
    gallery.querySelector('.gallery-thumbs').addEventListener('click', e => {
      const t = e.target.closest('[data-thumb]');
      if (t) showGallery(Number(t.dataset.thumb));
    });
    window.addEventListener('keydown', e => {
      if (!gallery.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') stepGallery(1);
      if (e.key === 'ArrowLeft') stepGallery(-1);
    });

    /* свайп на телефоні */
    let x0 = null;
    gallery.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    gallery.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) stepGallery(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });

    gallery.querySelector('.gallery-thumbs').innerHTML = works.map((w, i) =>
      `<button class="gallery-thumb" type="button" data-thumb="${i}" aria-label="${w.title}">
         <img src="${imgBase}${w.img}" alt="" loading="lazy">
       </button>`).join('');
    return gallery;
  }

  function showGallery(i) {
    const el = buildGallery();
    galleryIndex = (i + works.length) % works.length;
    const w = works[galleryIndex];
    const img = el.querySelector('.gallery-stage img');
    img.src = imgBase + w.img;
    img.alt = w.title + ' — робота ESTONE';
    el.querySelector('.gallery-title').textContent = w.title;
    el.querySelector('.gallery-meta').textContent = w.meta || '';
    el.querySelector('.gallery-counter').textContent = (galleryIndex + 1) + ' / ' + works.length;
    el.querySelectorAll('[data-thumb]').forEach(t => {
      t.classList.toggle('is-active', Number(t.dataset.thumb) === galleryIndex);
    });
    const active = el.querySelector('[data-thumb].is-active');
    if (active) active.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }

  function openGallery(i) {
    const el = buildGallery();
    showGallery(i);
    el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    track('gallery_open', { index: i });
  }
  function stepGallery(d) { showGallery(galleryIndex + d); }
  function closeGallery() {
    if (!gallery) return;
    gallery.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* ── Попап із формою ────────────────────────────────────── */
  /* Кнопки «порахувати» більше не кидають користувача в кінець сторінки:
     відкривається вікно з формою і заголовком під конкретну кнопку. */
  let popup = null;

  function buildPopup() {
    if (popup) return popup;
    popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = 'leadPopup';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-modal', 'true');
    popup.innerHTML = `
      <div class="popup-card" role="document">
        <button class="popup-close" type="button" aria-label="Закрити">&times;</button>
        <p class="label" data-popup-eyebrow>Прорахунок за 1 годину</p>
        <h2 class="popup-title" data-popup-title>Порахувати вартість</h2>
        <p class="popup-sub" data-popup-sub>Напишіть розміри — назвемо ціну з доставкою і монтажем протягом години в робочий час.</p>
        <form class="lead-form" data-form="popup" novalidate>
          <input type="text" name="name" placeholder="Ім'я" autocomplete="name" required>
          <input type="tel" name="phone" placeholder="Телефон" autocomplete="tel" required>
          <select name="product" data-product-select>
            <option value="">Що вас цікавить</option>
          </select>
          <input type="text" name="size" placeholder="Розміри або погонні метри">
          <textarea name="comment" rows="2" placeholder="Коментар: матеріал, терміни"></textarea>
          <input type="hidden" name="model" value="">
          <button type="submit" class="btn btn-primary btn-full">Надіслати</button>
          <p class="form-note">Натискаючи кнопку, ви погоджуєтесь на обробку даних.</p>
        </form>
        <div class="popup-contacts">
          <p class="popup-or">Або напишіть одразу в месенджер</p>
          <div class="messengers" data-popup-messengers></div>
          <a href="#" class="popup-phone" data-phone-link data-cta="popup-phone"><span data-phone-display></span></a>
        </div>
      </div>`;
    document.body.appendChild(popup);

    popup.querySelector('.popup-close').addEventListener('click', closePopup);
    popup.addEventListener('click', (e) => { if (e.target === popup) closePopup(); });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popup.classList.contains('is-open')) closePopup();
    });
    return popup;
  }

  function openPopup(opts) {
    const el = buildPopup();
    el.querySelector('[data-popup-title]').textContent = opts.title || 'Порахувати вартість';
    el.querySelector('[data-popup-sub]').textContent = opts.sub ||
      'Напишіть розміри — назвемо ціну з доставкою і монтажем протягом години в робочий час.';
    const form = el.querySelector('form');
    form.dataset.form = opts.form || 'popup';
    form.querySelector('[name="model"]').value = opts.model || '';

    /* Коротка форма: тільки ім'я і телефон. Решту питати нема про що —
       модель уже обрана, і зайві поля тільки відлякують. */
    const compact = !!opts.compact;
    el.classList.toggle('popup-compact', compact);
    ['product', 'size', 'comment'].forEach(n => {
      const f = form.querySelector(`[name="${n}"]`);
      if (f) f.hidden = compact;
    });

    /* якщо відкрили з розділу — одразу підставляємо напрям */
    const sel = form.querySelector('[data-product-select]');
    if (sel && opts.product) {
      const match = [...sel.options].find(o => o.value === opts.product || o.textContent === opts.product);
      if (match) sel.value = match.value;
    }

    /* месенджери з готовим текстом під конкретний запит */
    const box = el.querySelector('[data-popup-messengers]');
    if (box && window.ESTONE_messengerHtml) {
      const text = opts.model
        ? `Добрий день! Цікавить модель ${opts.model} з сайту estone.com.ua`
        : 'Добрий день! Хочу прорахувати виріб з каменю';
      box.innerHTML = window.ESTONE_messengerHtml(text);
    }
    el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => form.querySelector('[name="name"]').focus(), 120);
    track('popup_open', { form: form.dataset.form });
  }

  function closePopup() {
    if (!popup) return;
    popup.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  window.ESTONE_closePopup = closePopup;

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

  buildPopup();
  fillProductSelects(popup);   /* у попапі свій список напрямів */
  fillContacts();              /* і свій телефон з месенджерами */

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

      let sent = true;
      if (CFG.formEndpoint) {
        sent = false;
        try {
          const res = await fetch(CFG.formEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          sent = res.ok;
          if (!res.ok) console.warn('ESTONE: сервер відповів', res.status);
        } catch (err) {
          console.warn('ESTONE: не вдалось надіслати заявку', err);
        }
      } else {
        console.info('ESTONE: formEndpoint не заданий у config.js. Заявка:', payload);
      }

      btn.disabled = false;
      btn.textContent = original;

      /* Заявка не пройшла — не вдаємо, що все добре: даємо телефон */
      if (!sent) {
        const note = form.querySelector('.form-note');
        if (note) {
          if (!note.dataset.original) note.dataset.original = note.innerHTML;
          const tel = CFG.phone ? `<a href="tel:${CFG.phone}">${CFG.phoneDisplay || CFG.phone}</a>` : '';
          note.innerHTML = `Не вдалося надіслати заявку. Зателефонуйте нам${tel ? ': ' + tel : ''} — ми на зв'язку.`;
          note.classList.add('form-note-error');
        }
        form.classList.add('has-error');
        setTimeout(() => form.classList.remove('has-error'), 1600);
        track('lead_error', { form: payload.form });
        return;
      }

      const note = form.querySelector('.form-note');
      if (note && note.dataset.original) {
        note.innerHTML = note.dataset.original;
        note.classList.remove('form-note-error');
      }

      track('lead_submit', { form: payload.form, source: utm.utm_source || 'direct' });
      form.reset();
      if (form.closest('.popup')) closePopup();
      showThanks();
    });
  });


  /* ── Список файлів для завантаження ─────────────────────── */
  const dlBox = document.getElementById('downloadList');
  if (dlBox && window.DOWNLOADS) {
    const base = dlBox.dataset.base || '';
    const groups = {};
    window.DOWNLOADS.forEach(d => { (groups[d.group || 'Файли'] ||= []).push(d); });

    dlBox.innerHTML = Object.entries(groups).map(([name, items]) => `
      <h3 class="sub-h" data-reveal>${name}</h3>
      <div class="downloads">
        ${items.map(d => `
          <article class="dl-card" data-reveal data-file="${base}${d.file}">
            <div class="dl-main">
              <span class="dl-ext">${(d.meta || d.file.split('.').pop()).toUpperCase()}</span>
              <h4>${d.title}</h4>
              <p>${d.desc || ''}</p>
            </div>
            <div class="dl-action">
              <a class="btn btn-primary dl-link" href="${base}${d.file}" download data-cta="download">Завантажити</a>
              <span class="dl-soon" hidden>Скоро</span>
              <span class="dl-size"></span>
            </div>
          </article>`).join('')}
      </div>`).join('');

    dlBox.querySelectorAll('[data-reveal]').forEach(observe);

    /* Перевіряємо, чи файл уже лежить на сервері: якщо ні —
       показуємо «Скоро» замість битого посилання */
    dlBox.querySelectorAll('.dl-card').forEach(async card => {
      const link = card.querySelector('.dl-link');
      const soon = card.querySelector('.dl-soon');
      const size = card.querySelector('.dl-size');
      try {
        const r = await fetch(card.dataset.file, { method: 'HEAD' });
        const type = r.headers.get('content-type') || '';
        /* деякі хостинги віддають 200 і сторінку помилки — це теж «немає файлу» */
        if (!r.ok || /text\/html/i.test(type)) throw new Error('немає');
        const len = Number(r.headers.get('content-length') || 0);
        if (len) size.textContent = (len / 1048576).toFixed(1).replace('.', ',') + ' МБ';
      } catch (_) {
        link.hidden = true; soon.hidden = false; card.classList.add('is-soon');
      }
    });
  }

  /* ── Рік у підвалі ──────────────────────────────────────── */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Кнопки на #lead відкривають попап замість стрибка вниз.
     Винятки: сама секція з формою, кнопка з лайтбокса і меню. */
  document.querySelectorAll('a[href$="#lead"]').forEach(link => {
    if (link.closest('.lead') || link.id === 'lightboxCta' || link.closest('.main-nav')) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.closest('section');
      const label = link.textContent.trim();
      openPopup({
        title: link.dataset.popupTitle || (label.length >= 14 ? label : 'Порахувати вартість'),
        form: 'popup-' + (link.dataset.cta || section?.id || 'other'),
        product: link.dataset.popupProduct || '',
      });
    });
  });

})();