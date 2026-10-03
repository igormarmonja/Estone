/* HTML-шаблон лендингу. Один шаблон на всі мови: тексти приходять із content/<мова>.mjs. */
import { SITE, LANGS, PRICES, PRODUCTS, MATERIALS, SERIES, SINKS, PROCESS_IMG, PROJECT_IMG } from './data.mjs';
import { pages as LANDINGS } from './landings/es.mjs';

/* Посадкові сторінки (поки тільки ES), прив'язані до продуктів головної */
const PRODUCT_LANDINGS = {
  kitchen: ['encimeras-de-cocina-a-medida', 'encimeras-de-cuarzo', 'encimeras-porcelanicas', 'encimeras-de-granito', 'encimeras-de-marmol', 'islas-de-cocina', 'fregaderos-de-piedra'],
  bath: ['lavabos-a-medida', 'lavabos-de-piedra', 'platos-de-ducha-a-medida'],
  cladding: ['porcelanico-gran-formato', 'fachadas-ventiladas'],
  stairs: ['escaleras-de-marmol'],
  furniture: ['mesas-de-marmol', 'mesas-de-porcelanico'],
  sculpture: ['esculturas-de-marmol', 'chimeneas-de-marmol'],
  cutting: ['corte-de-piedra-a-medida'],
  waterjet: ['corte-por-chorro-de-agua'],
};
const landingName = (slug) => { const l = LANDINGS.find((x) => x.slug === slug); return l ? l.h1.join(' ') : slug; };

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');

/* Заголовок, розбитий на рядки для анімації «з маски» */
const lines = (arr) => arr.map((l) => `<span class="ln"><span>${esc(l)}</span></span>`).join('');

/* Фото із заглушкою: якщо файлу ще немає — main.js покаже плашку з іменем файлу */
function img(base, file, alt, t, { cls = '', eager = false, tone = '' } = {}) {
  return `<img src="${base}assets/img/${file}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-ph="${esc(t.ph)}"${tone ? ` data-tone="${tone}"` : ''}>`;
}

const ARROW = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const WA = '<svg class="ico ico-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.2-.2-.2-.5-.3Z"/></svg>';
const LOGO = '<svg class="logo-mark" viewBox="0 0 295 300" aria-hidden="true"><path d="M0 0h295v45H120v45H0z"/><path d="M0 135h295v45H120v45H0z"/><path d="M0 255h295v45H0z"/></svg>';

export function render(t, lang) {
  const L = LANGS.find((l) => l.code === lang);
  const base = L.path === '/' ? '' : '../';
  const url = SITE.domain + L.path;
  const year = new Date().getFullYear();
  const mat = (k) => t.materialNames[k];

  /* ── <head> ─────────────────────────────────────────── */
  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l.hreflang}" href="${SITE.domain}${l.path}">`).join('\n') +
    `\n<link rel="alternate" hreflang="x-default" href="${SITE.domain}/">`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HomeAndConstructionBusiness',
        '@id': SITE.domain + '/#business',
        name: SITE.brand,
        url,
        description: t.meta.description,
        telephone: SITE.phone,
        email: SITE.email,
        image: SITE.domain + '/assets/img/cover.jpg',
        address: { '@type': 'PostalAddress', streetAddress: "L'Estació de Novelda", addressLocality: 'Novelda', addressRegion: 'Alicante', postalCode: '03660', addressCountry: 'ES' },
        geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
        areaServed: ['Alicante', 'Costa Blanca', 'Murcia', 'Valencia'],
        openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' }],
        sameAs: [SITE.uaSite],
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a(PRICES) } })),
      },
    ],
  };

  const head = `<!DOCTYPE html>
<html lang="${t.meta.htmlLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(t.meta.title)}</title>
<meta name="description" content="${esc(t.meta.description)}">
<link rel="canonical" href="${url}">
${alternates}
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#F5EDE3">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(t.meta.title)}">
<meta property="og:description" content="${esc(t.meta.description)}">
<meta property="og:image" content="${SITE.domain}/assets/img/cover.jpg">
<meta property="og:locale" content="${t.meta.ogLocale}">
<link rel="preload" href="${base}assets/fonts/jost-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}assets/css/style.css">
<script>(function(d){d.classList.add('js');try{if(sessionStorage.getItem('es_seen'))d.classList.add('seen')}catch(e){}})(document.documentElement);</script>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>`;

  /* ── Шапка ──────────────────────────────────────────── */
  const navItems = [
    ['productos', t.nav.products], ['coleccion', t.nav.collection], ['materiales', t.nav.materials],
    ['proyectos', t.nav.projects], ['profesionales', t.nav.pros], ['contacto', t.nav.contact],
  ];
  const langSwitch = LANGS.map((l) =>
    `<a href="${(base + l.path.slice(1)) || './'}" hreflang="${l.hreflang}" lang="${l.code}"${l.code === lang ? ' aria-current="true"' : ''}>${l.label}</a>`
  ).join('');

  const header = `
<a class="skip" href="#main">${esc(t.a11y.skip)}</a>

<div class="preloader" id="preloader" aria-hidden="true">
  <div class="preloader-inner">
    ${LOGO}
    <span class="preloader-word">${SITE.brand}</span>
    <span class="preloader-sub">${esc(t.preloader)}</span>
  </div>
  <span class="preloader-count" id="preloaderCount">00</span>
</div>

<div class="cursor" id="cursor" aria-hidden="true"><span class="cursor-label"></span></div>

<header class="site-header" id="siteHeader">
  <a href="#main" class="logo" aria-label="${SITE.brand}">${LOGO}<span class="logo-word">${SITE.brand}</span></a>
  <nav class="main-nav" aria-label="Main">
    ${navItems.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join('\n    ')}
  </nav>
  <div class="header-right">
    <nav class="lang" aria-label="${esc(t.a11y.lang)}">${langSwitch}</nav>
    <a href="#contacto" class="btn btn-dark btn-sm" data-magnetic>${esc(t.nav.cta)}</a>
    <button class="burger" id="burger" aria-label="${esc(t.a11y.menu)}" aria-expanded="false" aria-controls="menu"><span></span><span></span></button>
  </div>
</header>

<div class="menu" id="menu" aria-hidden="true">
  <nav>
    ${navItems.map(([id, label], i) => `<a href="#${id}"><small>${pad(i + 1)}</small>${esc(label)}</a>`).join('\n    ')}
  </nav>
  <div class="menu-foot">
    <nav class="lang" aria-label="${esc(t.a11y.lang)}">${langSwitch}</nav>
    <a href="${SITE.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp">${WA} WhatsApp</a>
    <a href="tel:${SITE.phone}" data-track="phone">${SITE.phoneDisplay}</a>
  </div>
</div>`;

  /* ── 01 Hero ────────────────────────────────────────── */
  const hero = `
<section class="hero" id="inicio" data-bg="dark">
  <div class="hero-media" data-hero-media>
    <img src="${base}assets/img/hero.jpg" data-fallback="${base}assets/img/cover.jpg" alt="${esc(t.hero.imgAlt)}" fetchpriority="high" decoding="async">
  </div>
  <div class="hero-scrim"></div>
  <div class="wrap hero-inner">
    <p class="label" data-hero-fade>${esc(t.hero.label)}</p>
    <h1 class="hero-title" data-lines>${lines(t.hero.h1)}<span class="hero-tail ln"><span>${esc(t.hero.h1Tail)}</span></span></h1>
    <div class="hero-bottom" data-hero-fade>
      <p class="hero-sub">${esc(t.hero.sub)}</p>
      <div class="hero-actions">
        <a href="#contacto" class="btn btn-light" data-magnetic data-track="hero_cta">${esc(t.hero.cta)} ${ARROW}</a>
        <a href="${SITE.whatsapp}" class="btn btn-outline-light" target="_blank" rel="noopener" data-track="whatsapp">${WA} ${esc(t.hero.whatsapp)}</a>
      </div>
    </div>
  </div>
  <ul class="hero-trust" data-hero-fade>${t.hero.trust.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
  <span class="hero-scroll" aria-hidden="true">${esc(t.hero.scroll)}<i></i></span>
</section>`;

  /* ── 02 Manifiesto ──────────────────────────────────── */
  const words = t.manifesto.text.split(' ').map((w) => `<span class="w">${esc(w)}</span>`).join(' ');
  const manifesto = `
<section class="manifesto sec" id="estudio" data-bg="paper">
  <div class="wrap">
    <p class="label"><span class="num">01</span>${esc(t.manifesto.label)}</p>
    <p class="manifesto-text" data-words>${words}</p>
    <ul class="stats">
      ${t.manifesto.stats.map((s) => `<li><strong data-count="${s.n}">${s.n}</strong><span>${esc(s.label)}</span></li>`).join('\n      ')}
    </ul>
  </div>
</section>`;

  /* ── 03 Productos ───────────────────────────────────── */
  const panels = PRODUCTS.map((p, i) => {
    const it = t.products.items[p.id];
    return `
      <article class="panel" data-cursor="${esc(t.products.more)}">
        <button class="panel-hit" type="button" data-drawer="p-${p.id}" aria-label="${esc(it.title)} — ${esc(t.products.more)}"></button>
        <div class="panel-media">${img(base, p.img, it.title, t)}</div>
        <div class="panel-body">
          <span class="panel-num">${pad(i + 1)} / ${pad(PRODUCTS.length)}</span>
          <h3>${esc(it.title)}</h3>
          <p>${esc(it.line)}</p>
          <ul class="tags">${it.tags.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
          <div class="panel-foot">
            <span class="price">${esc(t.price(PRICES[p.id]))}</span>
            <span class="more">${esc(t.products.more)} ${ARROW}</span>
          </div>
        </div>
      </article>`;
  }).join('');

  const products = `
<section class="products sec" id="productos" data-bg="sand">
  <div class="products-pin" data-hscroll>
    <div class="wrap products-head">
      <p class="label"><span class="num">02</span>${esc(t.products.label)}</p>
      <h2 data-lines>${lines(t.products.h2)}</h2>
      <p class="lead">${esc(t.products.intro)}</p>
    </div>
    <div class="track" data-htrack>
      ${panels}
      <article class="panel panel-end">
        <h3>${esc(t.products.end.title)}</h3>
        <p>${esc(t.products.end.text)}</p>
        <a href="#contacto" class="btn btn-dark" data-magnetic data-chip="other">${esc(t.products.end.cta)} ${ARROW}</a>
      </article>
    </div>
    <div class="wrap products-foot">
      <div class="progress" aria-hidden="true"><i data-progress></i></div>
      <p class="note">${esc(t.priceNote)}</p>
    </div>
  </div>
</section>`;

  /* ── 04 Colección ───────────────────────────────────── */
  const seriesCount = (id) => SINKS.filter((s) => s.series === id).length;
  const collection = `
<section class="collection sec" id="coleccion" data-bg="paper">
  <div class="wrap">
    <div class="sec-head">
      <p class="label"><span class="num">03</span>${esc(t.collection.label)}</p>
      <h2 data-lines>${lines(t.collection.h2)}</h2>
      <p class="lead">${esc(t.collection.intro)}</p>
    </div>
    <div class="collection-grid">
      <ol class="series-list" role="tablist">
        ${SERIES.map((s, i) => `
        <li>
          <button class="series-tab${i === 0 ? ' is-active' : ''}" type="button" role="tab" aria-selected="${i === 0}" data-series="${s.id}">
            <span class="series-name">${s.id}</span>
            <sup>${seriesCount(s.id)} ${esc(t.collection.models)}</sup>
          </button>
        </li>`).join('')}
      </ol>
      <div class="series-stage">
        <div class="series-media" data-cursor="${esc(t.collection.view)}">
          ${SERIES.map((s, i) => `<figure class="series-img${i === 0 ? ' is-active' : ''}" data-series-img="${s.id}">${img(base, s.cover, s.id, t)}</figure>`).join('\n          ')}
          <button class="series-hit" type="button" data-drawer="s-${SERIES[0].id}" aria-label="${esc(t.collection.view)}"></button>
        </div>
        ${SERIES.map((s, i) => `
        <div class="series-info${i === 0 ? ' is-active' : ''}" data-series-info="${s.id}" role="tabpanel">
          <p>${esc(t.collection.series[s.id])}</p>
          <button class="link-btn" type="button" data-drawer="s-${s.id}">${esc(t.collection.view)} ${ARROW}</button>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>`;

  /* ── 05 Materiales ──────────────────────────────────── */
  const marq = t.materials.marquee.map((m) => `<span>${esc(m)}</span><i>✦</i>`).join('');
  const materials = `
<section class="materials sec" id="materiales" data-bg="dark">
  <div class="marquee" aria-hidden="true"><div class="marquee-track" data-marquee>${marq}${marq}</div></div>
  <div class="wrap">
    <div class="sec-head sec-head-split">
      <div>
        <p class="label"><span class="num">04</span>${esc(t.materials.label)}</p>
        <h2 data-lines>${lines(t.materials.h2)}</h2>
      </div>
      <p class="lead">${esc(t.materials.intro)}</p>
    </div>
    <ul class="mat-grid">
      ${MATERIALS.map((m) => {
        const it = t.materials.items[m.id];
        return `<li class="mat" data-reveal>
        <div class="mat-swatch">${img(base, m.img, mat(m.id), t, { tone: m.tone })}</div>
        <h3>${esc(mat(m.id))}</h3>
        <p>${esc(it.line)}</p>
        <ul>${it.props.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      </li>`;
      }).join('\n      ')}
    </ul>
    <a class="link-btn link-light" href="${SITE.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp">${WA} ${esc(t.materials.cta)}</a>
  </div>
</section>`;

  /* ── 06 Proceso ─────────────────────────────────────── */
  const process = `
<section class="process sec" id="proceso" data-bg="paper">
  <div class="wrap process-grid">
    <div class="process-sticky">
      <p class="label"><span class="num">05</span>${esc(t.process.label)}</p>
      <h2 data-lines>${lines(t.process.h2)}</h2>
      <div class="process-media">
        ${PROCESS_IMG.map((f, i) => `<figure class="process-img${i === 0 ? ' is-active' : ''}" data-step-img="${i}">${img(base, f, t.process.steps[i].t, t)}</figure>`).join('\n        ')}
      </div>
    </div>
    <ol class="steps">
      ${t.process.steps.map((s, i) => `<li class="step" data-step="${i}">
        <span class="step-num">${pad(i + 1)}</span>
        <h3>${esc(s.t)}</h3>
        <p>${esc(s.d)}</p>
      </li>`).join('\n      ')}
      <li class="step-note">${esc(t.process.note)}</li>
    </ol>
  </div>
</section>`;

  /* ── 07 Proyectos ───────────────────────────────────── */
  const projects = `
<section class="projects sec" id="proyectos" data-bg="sand">
  <div class="wrap">
    <div class="sec-head sec-head-split">
      <div>
        <p class="label"><span class="num">06</span>${esc(t.projects.label)}</p>
        <h2 data-lines>${lines(t.projects.h2)}</h2>
      </div>
      <p class="lead">${esc(t.projects.intro)}</p>
    </div>
    <div class="bento">
      ${PROJECT_IMG.map((f, i) => `<figure class="work work-${i + 1}" data-cursor="${esc(t.projects.view)}">
        <div class="work-media" data-clip>${img(base, f, t.projects.items[i], t)}</div>
        <figcaption>${esc(t.projects.items[i])}</figcaption>
      </figure>`).join('\n      ')}
    </div>
    ${lang === 'es' ? `<a class="btn btn-dark gal-cta" href="${base}galeria/" data-magnetic>Ver galería completa ${ARROW}</a>` : ''}
  </div>
</section>`;

  /* ── 08 Profesionales ───────────────────────────────── */
  const pros = `
<section class="pros sec" id="profesionales" data-bg="brand">
  <div class="wrap">
    <div class="sec-head sec-head-split">
      <div>
        <p class="label"><span class="num">07</span>${esc(t.pros.label)}</p>
        <h2 data-lines>${lines(t.pros.h2)}</h2>
      </div>
      <p class="lead">${esc(t.pros.intro)}</p>
    </div>
    <ul class="rows">
      ${t.pros.rows.map((r, i) => `<li data-reveal><span class="row-num">${pad(i + 1)}</span><h3>${esc(r.t)}</h3><p>${esc(r.d)}</p>${ARROW}</li>`).join('\n      ')}
    </ul>
    <a href="#contacto" class="btn btn-light" data-magnetic data-chip="pro">${esc(t.pros.cta)} ${ARROW}</a>
  </div>
</section>`;

  /* ── 09 FAQ ─────────────────────────────────────────── */
  const faq = `
<section class="faq sec" id="faq" data-bg="paper">
  <div class="wrap faq-grid">
    <div class="faq-head">
      <p class="label"><span class="num">08</span>${esc(t.faq.label)}</p>
      <h2 data-lines>${lines(t.faq.h2)}</h2>
    </div>
    <div class="faq-list">
      ${t.faq.items.map((f) => `<details class="qa">
        <summary>${esc(f.q)}<i aria-hidden="true"></i></summary>
        <div class="qa-body"><p>${esc(f.a(PRICES))}</p></div>
      </details>`).join('\n      ')}
    </div>
  </div>
</section>`;

  /* ── 10 Contacto ────────────────────────────────────── */
  const chips = [...PRODUCTS.map((p) => ({ v: p.id, l: t.products.items[p.id].title })), { v: 'pro', l: t.pros.chip }, { v: 'other', l: t.contact.other }];
  const f = t.contact.form;
  const contact = `
<section class="contact sec" id="contacto" data-bg="dark">
  <div class="wrap">
    <p class="label"><span class="num">09</span>${esc(t.contact.label)}</p>
    <h2 class="contact-title" data-lines>${lines(t.contact.h2)}</h2>
    <div class="contact-grid">
      <form class="form" id="leadForm" novalidate>
        <p class="lead">${esc(t.contact.intro)}</p>
        <div class="field-row">
          <label class="field"><span>${esc(f.name)}</span><input name="name" autocomplete="name" required></label>
          <label class="field"><span>${esc(f.phone)}</span><input name="phone" type="tel" autocomplete="tel" inputmode="tel" required></label>
        </div>
        <fieldset class="chips">
          <legend>${esc(f.what)}</legend>
          ${chips.map((c) => `<label class="chip"><input type="checkbox" name="product" value="${c.v}"><span>${esc(c.l)}</span></label>`).join('\n          ')}
        </fieldset>
        <label class="field"><span>${esc(f.measures)}</span><textarea name="comment" rows="3" placeholder="${esc(f.measuresPh)}"></textarea></label>
        <label class="consent"><input type="checkbox" name="consent" required><span>${esc(f.consent)}</span></label>
        <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <input type="hidden" name="lang" value="${lang}">
        <div class="form-actions">
          <button class="btn btn-light" type="submit" data-magnetic data-sending="${esc(f.sending)}">${esc(f.submit)} ${ARROW}</button>
          <a class="link-btn link-light" href="${SITE.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp">${WA} ${esc(f.photoHint)}</a>
        </div>
        <p class="form-error" role="alert" hidden>${esc(f.error)}</p>
        <div class="form-ok" hidden>
          <h3>${esc(f.okTitle)}</h3>
          <p>${esc(f.okText)}</p>
        </div>
      </form>
      <ul class="contact-list">
        <li><small>${esc(t.contact.whatsapp)}</small><a href="${SITE.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp">${SITE.phoneDisplay}</a></li>
        <li><small>${esc(t.contact.call)}</small><a href="tel:${SITE.phone}" data-track="phone">${SITE.phoneDisplay}</a></li>
        <li><small>${esc(t.contact.email)}</small><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li><small>${esc(t.contact.address)}</small><span>${esc(SITE.address)}</span><span class="muted">${esc(t.contact.hours)} · ${esc(t.contact.visit)}</span><a class="link-btn link-light" href="${SITE.mapUrl}" target="_blank" rel="noopener">${esc(t.contact.map)} ${ARROW}</a></li>
      </ul>
    </div>
  </div>
</section>`;

  /* ── Footer ─────────────────────────────────────────── */
  const footer = `
<footer class="footer" data-bg="dark">
  <div class="wrap">
    <div class="footer-top">
      <p>${esc(t.footer.tagline)}</p>
      <nav>${navItems.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join('')}</nav>
      <nav class="lang" aria-label="${esc(t.a11y.lang)}">${langSwitch}</nav>
    </div>
    ${lang === 'es' ? `<nav class="footer-services" aria-label="Servicios">
      <p class="label">Servicios</p>
      <ul><li><a href="${base}galeria/">Galería de trabajos</a></li>${LANDINGS.map((l) => `<li><a href="${base}${l.slug}/">${esc(l.h1.join(' '))}</a></li>`).join('')}</ul>
    </nav>` : ''}
    <p class="footer-word" aria-hidden="true">${SITE.brand}</p>
    <div class="footer-bottom">
      <span>© ${year} ${SITE.brand}. ${esc(t.footer.rights)}</span>
      <!-- TODO: юридичні сторінки (Aviso legal / Privacidad / Cookies) — дані компанії надішле клієнт -->
      <nav>${t.footer.legal.map((x) => `<a href="#" aria-disabled="true">${esc(x)}</a>`).join('')}</nav>
      <a href="${SITE.uaSite}" target="_blank" rel="noopener">${esc(t.footer.ua)} ↗</a>
    </div>
  </div>
</footer>`;

  /* ── Drawer: деталі продуктів і моделі серій (у HTML, щоб індексувалось) ── */
  const productDrawers = PRODUCTS.map((p) => {
    const it = t.products.items[p.id];
    return `
    <article class="drawer-item" id="p-${p.id}" hidden>
      <p class="label">${esc(t.products.label)}</p>
      <h3>${esc(it.title)}</h3>
      <div class="drawer-gallery">
        ${[p.img, ...p.gallery].map((g, i) => `<figure${i === 0 ? ' class="wide"' : ''}>${img(base, g, it.title, t)}</figure>`).join('')}
      </div>
      <p class="drawer-text">${esc(it.text)}</p>
      <ul class="drawer-list">${it.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      <ul class="tags">${it.tags.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      ${lang === 'es' && PRODUCT_LANDINGS[p.id] ? `<div class="drawer-links">
        <p class="label">Más información</p>
        <ul>${PRODUCT_LANDINGS[p.id].map((s) => `<li><a href="${base}${s}/">${esc(landingName(s))} ${ARROW}</a></li>`).join('')}</ul>
      </div>` : ''}
      <div class="drawer-foot">
        <span class="price">${esc(t.price(PRICES[p.id]))}</span>
        <a href="#contacto" class="btn btn-dark" data-chip="${p.id}" data-close>${esc(t.products.quote)} ${ARROW}</a>
      </div>
    </article>`;
  }).join('');

  const seriesDrawers = SERIES.map((s) => `
    <article class="drawer-item" id="s-${s.id}" hidden>
      <p class="label">${esc(t.collection.label)}</p>
      <h3 class="series-title">${s.id}</h3>
      <p class="drawer-text">${esc(t.collection.series[s.id])}</p>
      <ul class="models">
        ${SINKS.filter((k) => k.series === s.id).map((k) => `<li>
          <figure>${img(base, k.code.toLowerCase() + '.jpg', `${s.id} ${k.code}`, t)}</figure>
          <strong>${k.code}</strong>
          <p>${esc(t.collection.sinks[k.code])}</p>
          <small>${k.mat.map(mat).join(' · ')}</small>
        </li>`).join('')}
      </ul>
      <div class="drawer-foot">
        <span class="price">${esc(t.price(PRICES.bath))}</span>
        <a href="#contacto" class="btn btn-dark" data-chip="bath" data-close>${esc(t.drawer.quote)} ${ARROW}</a>
      </div>
    </article>`).join('');

  const drawer = `
<div class="drawer" id="drawer" aria-hidden="true">
  <div class="drawer-overlay" data-close></div>
  <aside class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawerTitle" tabindex="-1" data-lenis-prevent>
    <button class="drawer-close" type="button" data-close aria-label="${esc(t.drawer.close)}"><span></span><span></span></button>
    ${productDrawers}
    ${seriesDrawers}
  </aside>
</div>`;

  const scripts = `
<script src="${base}assets/js/config.js"></script>
<script src="${base}assets/vendor/gsap.min.js" defer></script>
<script src="${base}assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="${base}assets/vendor/lenis.min.js" defer></script>
<script src="${base}assets/js/main.js" defer></script>`;

  return `${head}
<body>
${header}
<main id="main">
${hero}
${manifesto}
${products}
${collection}
${materials}
${process}
${projects}
${pros}
${faq}
${contact}
</main>
${footer}
${drawer}
${scripts}
</body>
</html>
`;
}
