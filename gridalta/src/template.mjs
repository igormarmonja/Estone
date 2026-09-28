/* HTML-шаблон лендингу Gridalta. Один шаблон на всі мови: тексти приходять із content/<мова>.mjs. */
import { SITE, LANGS, SERVICES, BEFORE_AFTER, PROCESS_IMG, PROJECT_IMG, FOUNDER_IMG, CALC } from './data.mjs';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');

/* Заголовок, розбитий на рядки для анімації «з маски» */
const lines = (arr) => arr.map((l) => `<span class="ln"><span>${esc(l)}</span></span>`).join('');

/* Фото із заглушкою: якщо файлу ще немає — main.js покаже плашку з іменем файлу */
function img(base, file, alt, t, { cls = '', eager = false } = {}) {
  return `<img src="${base}assets/img/${file}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-ph="${esc(t.ph)}">`;
}

const ARROW = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const CHECK = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const CROSS = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg>';
const WA = '<svg class="ico ico-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.2-.2-.2-.5-.3Z"/></svg>';

/* Знак Gridalta: грань із літерою G, грань зі смугами й віконце — як на логотипі */
export const LOGO = `<svg class="logo-mark" viewBox="0 0 100 100" aria-hidden="true">
<g transform="translate(50 0) skewY(-25) translate(-50 0)"><path d="M50 14H6v64h44V44H26v10h12v12H18V26h32z"/><path d="M34 84h6v6h-6zM42 84h6v6h-6zM34 92h6v6h-6zM42 92h6v6h-6z"/></g>
<g transform="translate(50 0) skewY(25) translate(-50 0)"><path d="M54 14h40v5H54zM54 24h40v5H54zM54 34h40v5H54zM54 44h40v5H54zM54 54h40v5H54zM54 64h40v5H54zM54 74h40v4H54z"/></g>
</svg>`;

export function render(t, lang) {
  const L = LANGS.find((l) => l.code === lang);
  const base = L.path === '/' ? '' : '../';
  const url = SITE.domain + L.path;
  const year = new Date().getFullYear();

  /* ── <head> ─────────────────────────────────────────── */
  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l.hreflang}" href="${SITE.domain}${l.path}">`).join('\n') +
    `\n<link rel="alternate" hreflang="x-default" href="${SITE.domain}/">`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HomeAndConstructionBusiness',
        '@id': SITE.domain + '/#business',
        name: 'Gridalta Reformas Integrales',
        url,
        description: t.meta.description,
        telephone: SITE.phone,
        email: SITE.email,
        image: SITE.domain + '/assets/img/hero.jpg',
        founder: { '@type': 'Person', name: 'Serhiy Kuzmyk' },
        address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: SITE.city, addressRegion: 'Valencia', postalCode: SITE.postalCode, addressCountry: 'ES' },
        geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
        areaServed: ['Valencia', 'Gandía', 'Cullera', 'Oliva', 'Dénia', 'Jávea', 'Calpe', 'Altea', 'Benidorm', 'Costa Blanca'],
        openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' }],
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
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
<meta name="theme-color" content="#1F1E1C">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(t.meta.title)}">
<meta property="og:description" content="${esc(t.meta.description)}">
<meta property="og:image" content="${SITE.domain}/assets/img/hero.jpg">
<meta property="og:locale" content="${t.meta.ogLocale}">
<link rel="preload" href="${base}assets/fonts/jost-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}assets/css/style.css">
<script>(function(d){d.classList.add('js');try{if(sessionStorage.getItem('gr_seen'))d.classList.add('seen')}catch(e){}})(document.documentElement);</script>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>`;

  /* ── Шапка ──────────────────────────────────────────── */
  const navItems = [
    ['servicios', t.nav.services], ['antes-despues', t.nav.beforeAfter], ['calculadora', t.nav.calculator],
    ['proyectos', t.nav.projects], ['por-que', t.nav.why], ['contacto', t.nav.contact],
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
  <a href="#main" class="logo" aria-label="Gridalta">${LOGO}<span class="logo-word">${SITE.brand}</span></a>
  <nav class="main-nav" aria-label="Main">
    ${navItems.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join('\n    ')}
  </nav>
  <div class="header-right">
    <nav class="lang" aria-label="${esc(t.a11y.lang)}">${langSwitch}</nav>
    <a href="#calculadora" class="btn btn-dark btn-sm" data-magnetic>${esc(t.nav.cta)}</a>
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

  /* ── Hero ───────────────────────────────────────────── */
  const hero = `
<section class="hero" id="inicio" data-bg="dark">
  <div class="hero-media" data-hero-media>
    <img src="${base}assets/img/hero.jpg" alt="${esc(t.hero.imgAlt)}" fetchpriority="high" decoding="async">
  </div>
  <div class="hero-scrim"></div>
  <div class="wrap hero-inner">
    <p class="label" data-hero-fade>${esc(t.hero.label)}</p>
    <h1 class="hero-title" data-lines>${lines(t.hero.h1)}<span class="hero-tail ln"><span>${esc(t.hero.h1Tail)}</span></span></h1>
    <div class="hero-bottom" data-hero-fade>
      <p class="hero-sub">${esc(t.hero.sub)}</p>
      <div class="hero-actions">
        <a href="#calculadora" class="btn btn-light" data-magnetic data-track="hero_cta">${esc(t.hero.cta)} ${ARROW}</a>
        <a href="${SITE.whatsapp}" class="btn btn-outline-light" target="_blank" rel="noopener" data-track="whatsapp">${WA} ${esc(t.hero.whatsapp)}</a>
      </div>
    </div>
  </div>
  <ul class="hero-trust" data-hero-fade>${t.hero.trust.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
  <span class="hero-scroll" aria-hidden="true">${esc(t.hero.scroll)}<i></i></span>
</section>`;

  /* ── 01 Маніфест: цитата засновника + цифри ─────────── */
  const words = t.manifesto.text.split(' ').map((w) => `<span class="w">${esc(w)}</span>`).join(' ');
  const manifesto = `
<section class="manifesto sec" id="estudio" data-bg="paper">
  <div class="wrap">
    <p class="label"><span class="num">01</span>${esc(t.manifesto.label)}</p>
    <blockquote class="manifesto-text" data-words>${words}</blockquote>
    <p class="manifesto-author">— ${esc(t.manifesto.author)}</p>
    <ul class="stats">
      ${t.manifesto.stats.map((s) => `<li><strong><span data-count="${s.n}">${s.n}</span>${esc(s.suffix)}</strong><span>${esc(s.label)}</span></li>`).join('\n      ')}
    </ul>
  </div>
</section>`;

  /* ── 02 Послуги (горизонтальна галерея) ─────────────── */
  const panels = SERVICES.map((p, i) => {
    const it = t.services.items[p.id];
    return `
      <article class="panel" data-cursor="${esc(t.services.more)}">
        <button class="panel-hit" type="button" data-drawer="s-${p.id}" aria-label="${esc(it.title)} — ${esc(t.services.more)}"></button>
        <div class="panel-media">${img(base, p.img, it.title, t)}</div>
        <div class="panel-body">
          <span class="panel-num">${pad(i + 1)} / ${pad(SERVICES.length)}</span>
          <h3>${esc(it.title)}</h3>
          <p>${esc(it.line)}</p>
          <ul class="tags">${it.tags.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
          <div class="panel-foot">
            <span class="more">${esc(t.services.more)} ${ARROW}</span>
          </div>
        </div>
      </article>`;
  }).join('');

  const services = `
<section class="products sec" id="servicios" data-bg="sand">
  <div class="products-pin" data-hscroll>
    <div class="wrap products-head">
      <p class="label"><span class="num">02</span>${esc(t.services.label)}</p>
      <h2 data-lines>${lines(t.services.h2)}</h2>
      <p class="lead">${esc(t.services.intro)}</p>
    </div>
    <div class="track" data-htrack>
      ${panels}
      <article class="panel panel-end">
        <h3>${esc(t.services.end.title)}</h3>
        <p>${esc(t.services.end.text)}</p>
        <a href="#contacto" class="btn btn-dark" data-magnetic data-chip="other">${esc(t.services.end.cta)} ${ARROW}</a>
      </article>
    </div>
    <div class="wrap products-foot">
      <div class="progress" aria-hidden="true"><i data-progress></i></div>
    </div>
  </div>
</section>`;

  /* ── 03 До і після ──────────────────────────────────── */
  const ba = t.beforeAfter;
  const beforeAfter = `
<section class="ba-sec sec" id="antes-despues" data-bg="paper">
  <div class="wrap">
    <div class="sec-head sec-head-split">
      <div>
        <p class="label"><span class="num">03</span>${esc(ba.label)}</p>
        <h2 data-lines>${lines(ba.h2)}</h2>
      </div>
      <p class="lead">${esc(ba.intro)}</p>
    </div>
    <div class="ba-grid">
      <div class="ba" data-ba style="--pos:50%">
        <div class="ba-after">${img(base, BEFORE_AFTER.after, `${ba.after}: ${ba.title}`, t)}</div>
        <div class="ba-before">${img(base, BEFORE_AFTER.before, `${ba.before}: ${ba.title}`, t)}</div>
        <span class="ba-tag ba-tag-before">${esc(ba.before)}</span>
        <span class="ba-tag ba-tag-after">${esc(ba.after)}</span>
        <div class="ba-line" aria-hidden="true"><span class="ba-knob"><svg viewBox="0 0 24 24"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/></svg></span></div>
        <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="${esc(ba.handle)}">
      </div>
      <div class="ba-info" data-reveal>
        <h3>${esc(ba.title)}</h3>
        <p>${esc(ba.text)}</p>
        <ul>${ba.facts.map((f) => `<li>${CHECK}<span>${esc(f)}</span></li>`).join('')}</ul>
      </div>
    </div>
  </div>
</section>`;

  /* ── 04 Калькулятор ─────────────────────────────────── */
  const c = t.calculator;
  const calcData = {
    ...CALC,
    labels: { types: c.types, qualities: Object.fromEntries(Object.entries(c.qualities).map(([k, v]) => [k, v.t])), addons: c.addons, weeks: c.weeks, waMsg: c.waMsg, area: c.areaLabel, result: c.result, time: c.time },
    whatsapp: SITE.whatsapp,
    locale: { es: 'es-ES', en: 'en-GB', uk: 'uk-UA' }[lang],
  };
  const stepHead = (i) => `<p class="calc-step"><span>${pad(i + 1)}</span>${esc(c.steps[i])}</p>`;
  const calculator = `
<section class="calc-sec sec" id="calculadora" data-bg="dark">
  <div class="wrap">
    <div class="sec-head sec-head-split">
      <div>
        <p class="label"><span class="num">04</span>${esc(c.label)}</p>
        <h2 data-lines>${lines(c.h2)}</h2>
      </div>
      <p class="lead">${esc(c.intro)}</p>
    </div>
    <form class="calc" id="calc" onsubmit="return false">
      <div class="calc-steps">
        <fieldset class="calc-group">
          <legend>${stepHead(0)}</legend>
          <div class="opt-grid opt-4">
            ${Object.entries(c.types).map(([k, v]) => `<label class="opt"><input type="radio" name="type" value="${k}"${k === CALC.defaults.type ? ' checked' : ''}><span>${esc(v)}</span></label>`).join('\n            ')}
          </div>
        </fieldset>
        <fieldset class="calc-group">
          <legend>${stepHead(1)}</legend>
          <div class="area">
            <label for="calcArea">${esc(c.areaLabel)}</label>
            <output id="calcAreaOut" for="calcArea">${CALC.area.value} m²</output>
            <input id="calcArea" name="area" type="range" min="${CALC.area.min}" max="${CALC.area.max}" step="${CALC.area.step}" value="${CALC.area.value}">
            <div class="area-scale" aria-hidden="true"><span>${CALC.area.min}</span><span>100</span><span>200</span><span>${CALC.area.max}+</span></div>
          </div>
        </fieldset>
        <fieldset class="calc-group">
          <legend>${stepHead(2)}</legend>
          <div class="opt-grid opt-3">
            ${Object.entries(c.qualities).map(([k, v]) => `<label class="opt opt-card"><input type="radio" name="quality" value="${k}"${k === CALC.defaults.quality ? ' checked' : ''}><span><strong>${esc(v.t)}</strong><small>${esc(v.d)}</small></span></label>`).join('\n            ')}
          </div>
        </fieldset>
        <fieldset class="calc-group">
          <legend>${stepHead(3)}</legend>
          <div class="opt-grid opt-2">
            ${Object.entries(c.addons).map(([k, v]) => `<label class="opt opt-check"><input type="checkbox" name="addon" value="${k}"><span>${esc(v)}</span></label>`).join('\n            ')}
          </div>
        </fieldset>
      </div>
      <aside class="calc-result" aria-live="polite">
        <p class="calc-result-label">${esc(c.result)}</p>
        <p class="calc-price"><span data-calc-min>42.000 €</span><i>–</i><span data-calc-max>48.500 €</span></p>
        <p class="calc-time"><small>${esc(c.time)}</small><strong data-calc-weeks>6–8 ${esc(c.weeks)}</strong></p>
        <p class="note">${esc(c.note)}</p>
        <div class="calc-actions">
          <a class="btn btn-light" href="${SITE.whatsapp}" target="_blank" rel="noopener" data-calc-wa data-track="calc_whatsapp">${WA} ${esc(c.whatsapp)}</a>
          <a class="link-btn link-light" href="#contacto" data-chip="calc">${esc(c.visit)} ${ARROW}</a>
        </div>
      </aside>
    </form>
    <script type="application/json" id="calcData">${JSON.stringify(calcData).replace(/</g, '\\u003c')}</script>
  </div>
</section>`;

  /* ── 05 Чому Gridalta: порівняння ───────────────────── */
  const w = t.why;
  const marq = w.marquee.map((m) => `<span>${esc(m)}</span><i>✦</i>`).join('');
  const why = `
<section class="why sec" id="por-que" data-bg="paper">
  <div class="marquee" aria-hidden="true"><div class="marquee-track" data-marquee>${marq}${marq}</div></div>
  <div class="wrap">
    <div class="sec-head sec-head-split">
      <div>
        <p class="label"><span class="num">05</span>${esc(w.label)}</p>
        <h2 data-lines>${lines(w.h2)}</h2>
      </div>
      <p class="lead">${esc(w.intro)}</p>
    </div>
    <div class="compare" role="table">
      <div class="compare-row compare-head" role="row"><span role="columnheader"></span><span role="columnheader">${esc(w.market)}</span><span role="columnheader">${esc(w.us)}</span></div>
      ${w.rows.map((r, i) => `<div class="compare-row" role="row" data-reveal>
        <h3 role="rowheader"><small>${pad(i + 1)}</small>${esc(r.k)}</h3>
        <p class="bad" role="cell">${CROSS}<span><em>${esc(w.market)}</em>${esc(r.bad)}</span></p>
        <p class="good" role="cell">${CHECK}<span><em>${esc(w.us)}</em>${esc(r.good)}</span></p>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>`;

  /* ── 06 Проєкти ─────────────────────────────────────── */
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
  </div>
</section>`;

  /* ── 07 Процес ──────────────────────────────────────── */
  const process = `
<section class="process sec" id="proceso" data-bg="paper">
  <div class="wrap process-grid">
    <div class="process-sticky">
      <p class="label"><span class="num">07</span>${esc(t.process.label)}</p>
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

  /* ── 08 Засновник ───────────────────────────────────── */
  const fo = t.founder;
  const founder = `
<section class="founder sec" id="fundador" data-bg="brand">
  <div class="wrap">
    <div class="sec-head">
      <p class="label"><span class="num">08</span>${esc(fo.label)}</p>
      <h2 data-lines>${lines(fo.h2)}</h2>
    </div>
    <div class="founder-grid">
      <figure class="founder-photo" data-clip>${img(base, FOUNDER_IMG, fo.photoAlt, t)}</figure>
      <div class="founder-text">
        <p class="founder-quote" data-reveal>${esc(fo.quote)}</p>
        ${fo.paras.map((p) => `<p data-reveal>${esc(p)}</p>`).join('\n        ')}
        <p class="founder-sign" data-reveal><strong>${esc(fo.name)}</strong><span>${esc(fo.role)}</span></p>
        <div class="founder-actions" data-reveal>
          <a href="${SITE.whatsapp}" class="btn btn-light" target="_blank" rel="noopener" data-magnetic data-track="whatsapp">${WA} ${esc(fo.cta)}</a>
          <a href="tel:${SITE.phone}" class="link-btn" data-track="phone">${SITE.phoneDisplay}</a>
        </div>
      </div>
    </div>
  </div>
</section>`;

  /* ── 09 Відгуки ─────────────────────────────────────── */
  const reviews = `
<section class="reviews sec" id="opiniones" data-bg="paper">
  <div class="wrap">
    <div class="sec-head">
      <p class="label"><span class="num">09</span>${esc(t.reviews.label)}</p>
      <h2 data-lines>${lines(t.reviews.h2)}</h2>
    </div>
    <ul class="review-list">
      ${t.reviews.items.map((r) => `<li class="review" data-reveal>
        <span class="stars" aria-label="5/5">★★★★★</span>
        <blockquote>«${esc(r.text)}»</blockquote>
        <p><strong>${esc(r.name)}</strong><span>${esc(r.meta)}</span></p>
      </li>`).join('\n      ')}
    </ul>
  </div>
</section>`;

  /* ── 10 FAQ ─────────────────────────────────────────── */
  const faq = `
<section class="faq sec" id="faq" data-bg="sand">
  <div class="wrap faq-grid">
    <div class="faq-head">
      <p class="label"><span class="num">10</span>${esc(t.faq.label)}</p>
      <h2 data-lines>${lines(t.faq.h2)}</h2>
    </div>
    <div class="faq-list">
      ${t.faq.items.map((f) => `<details class="qa">
        <summary>${esc(f.q)}<i aria-hidden="true"></i></summary>
        <div class="qa-body"><p>${esc(f.a)}</p></div>
      </details>`).join('\n      ')}
    </div>
  </div>
</section>`;

  /* ── 11 Контакт ─────────────────────────────────────── */
  const chips = [...SERVICES.map((p) => ({ v: p.id, l: t.services.items[p.id].title })), { v: 'other', l: t.contact.other }];
  const f = t.contact.form;
  const contact = `
<section class="contact sec" id="contacto" data-bg="dark">
  <div class="wrap">
    <p class="label"><span class="num">11</span>${esc(t.contact.label)}</p>
    <h2 class="contact-title" data-lines>${lines(t.contact.h2)}</h2>
    <div class="contact-grid">
      <form class="form" id="leadForm" novalidate>
        <p class="lead">${esc(t.contact.intro)}</p>
        <div class="field-row">
          <label class="field"><span>${esc(f.name)}</span><input name="name" autocomplete="name" required></label>
          <label class="field"><span>${esc(f.phone)}</span><input name="phone" type="tel" autocomplete="tel" inputmode="tel" required></label>
        </div>
        <label class="field"><span>${esc(f.city)}</span><input name="city" autocomplete="address-level2"></label>
        <fieldset class="chips">
          <legend>${esc(f.what)}</legend>
          ${chips.map((ch) => `<label class="chip"><input type="checkbox" name="product" value="${ch.v}"><span>${esc(ch.l)}</span></label>`).join('\n          ')}
        </fieldset>
        <label class="field"><span>${esc(f.comment)}</span><textarea name="comment" rows="3" placeholder="${esc(f.commentPh)}"></textarea></label>
        <label class="consent"><input type="checkbox" name="consent" required><span>${esc(f.consent)}</span></label>
        <input type="hidden" name="lang" value="${lang}">
        <input type="hidden" name="calc" value="">
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
        <li><small>${esc(t.contact.call)}</small><a href="tel:${SITE.phone}" data-track="phone">${SITE.phoneDisplay}</a><a href="tel:${SITE.phone2}" data-track="phone">${SITE.phone2Display}</a></li>
        <li><small>${esc(t.contact.email)}</small><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li><small>${esc(t.contact.address)}</small><span>${esc(SITE.address)}</span><span class="muted">${esc(t.contact.hours)}</span><a class="link-btn link-light" href="${SITE.mapUrl}" target="_blank" rel="noopener">${esc(t.contact.map)} ${ARROW}</a></li>
        <li class="coverage"><span class="muted">${esc(t.contact.coverage)}</span></li>
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
    <p class="footer-word" aria-hidden="true">${SITE.brand}</p>
    <div class="footer-bottom">
      <span>© ${year} Gridalta Reformas Integrales. ${esc(t.footer.rights)}</span>
      <!-- TODO: юридичні сторінки (Aviso legal / Privacidad / Cookies) — дані компанії надішле клієнт -->
      <nav>${t.footer.legal.map((x) => `<a href="#" aria-disabled="true">${esc(x)}</a>`).join('')}</nav>
    </div>
  </div>
</footer>`;

  /* ── Drawer: деталі послуг (у HTML, щоб індексувалось) ── */
  const drawers = SERVICES.map((p) => {
    const it = t.services.items[p.id];
    return `
    <article class="drawer-item" id="s-${p.id}" hidden>
      <p class="label">${esc(t.services.label)}</p>
      <h3>${esc(it.title)}</h3>
      <div class="drawer-gallery">
        ${[p.img, ...p.gallery].map((g, i) => `<figure${i === 0 ? ' class="wide"' : ''}>${img(base, g, it.title, t)}</figure>`).join('')}
      </div>
      <p class="drawer-text">${esc(it.text)}</p>
      <ul class="drawer-list">${it.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      <ul class="tags">${it.tags.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <div class="drawer-foot">
        <a href="#calculadora" class="link-btn">${esc(t.nav.calculator)} ${ARROW}</a>
        <a href="#contacto" class="btn btn-dark" data-chip="${p.id}" data-close>${esc(t.services.quote)} ${ARROW}</a>
      </div>
    </article>`;
  }).join('');

  const drawer = `
<div class="drawer" id="drawer" aria-hidden="true">
  <div class="drawer-overlay" data-close></div>
  <aside class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawerTitle" tabindex="-1" data-lenis-prevent>
    <button class="drawer-close" type="button" data-close aria-label="${esc(t.drawer.close)}"><span></span><span></span></button>
    ${drawers}
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
${services}
${beforeAfter}
${calculator}
${why}
${projects}
${process}
${founder}
${reviews}
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
