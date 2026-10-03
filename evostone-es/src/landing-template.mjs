/* Шаблон посадкової сторінки під пошуковий запит.
   Окремий від головної (src/template.mjs): свої стилі (landing.css) і скрипт (landing.js). */
import { SITE, PRICES } from './data.mjs';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');
const lines = (arr) => arr.map((l) => `<span class="ln"><span>${esc(l)}</span></span>`).join('');

const ARROW = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const WA = '<svg class="ico ico-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.2-.2-.2-.5-.3Z"/></svg>';
const LOGO = '<svg class="logo-mark" viewBox="0 0 295 300" aria-hidden="true"><path d="M0 0h295v45H120v45H0z"/><path d="M0 135h295v45H120v45H0z"/><path d="M0 255h295v45H0z"/></svg>';

/* t — тексти головної (content/es.mjs): назви розділів меню, форма, футер, price() */
export function renderLanding(p, all, c, t) {
  const base = '../';
  const url = `${SITE.domain}/${p.slug}/`;
  const year = new Date().getFullYear();
  const hero = p.img || `lp-${p.slug}.jpg`;
  const gallery = p.gallery || [1, 2, 3].map((i) => `lp-${p.slug}-${i}.jpg`);
  const price = PRICES[p.price] ?? null;
  const name = p.h1.join(' ');
  const img = (file, alt, cls = '', eager = false) =>
    `<img src="${base}assets/img/${file}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-ph="${esc(t.ph)}">`;
  const bySlug = (s) => all.find((x) => x.slug === s);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name,
        serviceType: name,
        description: p.description,
        url,
        areaServed: ['Alicante', 'Costa Blanca', 'Murcia', 'Valencia'],
        provider: { '@type': 'HomeAndConstructionBusiness', '@id': SITE.domain + '/#business', name: SITE.brand, telephone: SITE.phone, address: { '@type': 'PostalAddress', streetAddress: "L'Estació de Novelda", addressLocality: 'Novelda', addressRegion: 'Alicante', postalCode: '03660', addressCountry: 'ES' } },
        ...(price ? { offers: { '@type': 'Offer', priceCurrency: 'EUR', price: price.from, description: t.price(price) } } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: c.home, item: SITE.domain + '/' },
          { '@type': 'ListItem', position: 2, name, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  const nav = [
    ['productos', t.nav.products], ['coleccion', t.nav.collection], ['materiales', t.nav.materials],
    ['proyectos', t.nav.projects], ['profesionales', t.nav.pros],
  ];

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="es-ES" href="${url}">
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#F5EDE3">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:image" content="${SITE.domain}/assets/img/${hero}">
<meta property="og:locale" content="es_ES">
<link rel="preload" href="${base}assets/fonts/jost-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}assets/css/style.css">
<link rel="stylesheet" href="${base}assets/css/landing.css">
<script>document.documentElement.classList.add('js','lp');</script>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
<a class="skip" href="#main">${esc(t.a11y.skip)}</a>
<div class="cursor" id="cursor" aria-hidden="true"><span class="cursor-label"></span></div>

<header class="site-header" id="siteHeader">
  <a href="${base}" class="logo" aria-label="${SITE.brand}">${LOGO}<span class="logo-word">${SITE.brand}</span></a>
  <nav class="main-nav" aria-label="Main">
    ${nav.map(([id, l]) => `<a href="${base}#${id}">${esc(l)}</a>`).join('\n    ')}
    <a href="${base}galeria/">Galería</a>
    <a href="#contacto">${esc(t.nav.contact)}</a>
  </nav>
  <div class="header-right">
    <a href="#contacto" class="btn btn-dark btn-sm" data-magnetic>${esc(t.nav.cta)}</a>
    <button class="burger" id="burger" aria-label="${esc(t.a11y.menu)}" aria-expanded="false" aria-controls="menu"><span></span><span></span></button>
  </div>
</header>

<div class="menu" id="menu" aria-hidden="true">
  <nav>
    ${nav.map(([id, l], i) => `<a href="${base}#${id}"><small>${pad(i + 1)}</small>${esc(l)}</a>`).join('\n    ')}
    <a href="${base}galeria/"><small>${pad(nav.length + 1)}</small>Galería</a>
    <a href="#contacto"><small>${pad(nav.length + 2)}</small>${esc(t.nav.contact)}</a>
  </nav>
  <div class="menu-foot">
    <a href="${SITE.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp">${WA} WhatsApp</a>
    <a href="tel:${SITE.phone}" data-track="phone">${SITE.phoneDisplay}</a>
  </div>
</div>

<main id="main">

<section class="lp-hero" data-bg="paper">
  <div class="wrap lp-hero-grid">
    <div class="lp-hero-text">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${base}">${esc(c.home)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(name)}</span></nav>
      <h1 data-lines>${lines(p.h1)}</h1>
      <p class="lead">${esc(p.sub)}</p>
      <p class="lp-price">${esc(t.price(price))}</p>
      <div class="lp-actions">
        <a href="#contacto" class="btn btn-dark" data-magnetic data-track="lp_cta">${esc(c.cta)} ${ARROW}</a>
        <a href="${SITE.whatsapp}" class="btn btn-ghost" target="_blank" rel="noopener" data-track="whatsapp">${WA} ${esc(c.whatsapp)}</a>
      </div>
    </div>
    <figure class="lp-hero-media" data-clip>${img(hero, name, '', true)}</figure>
  </div>
</section>

<section class="sec lp-intro" data-bg="paper">
  <div class="wrap">
    <p class="lp-intro-text" data-reveal>${esc(p.intro)}</p>
    <p class="label lp-intro-label">${esc(c.label.why)}</p>
    <ul class="lp-benefits">
      ${p.benefits.map((b, i) => `<li data-reveal><span class="lp-num">${pad(i + 1)}</span><h3>${esc(b.t)}</h3><p>${esc(b.d)}</p></li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="sec lp-specs" data-bg="sand">
  <div class="wrap lp-split">
    <div>
      <p class="label">${esc(c.label.specs)}</p>
      <h2 data-lines>${lines(c.specsH2)}</h2>
      <p class="note lp-note">${esc(t.priceNote)}</p>
    </div>
    <dl class="lp-table">
      ${p.specs.map(([k, v]) => `<div data-reveal><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('\n      ')}
    </dl>
  </div>
</section>

<section class="sec lp-gallery" data-bg="dark">
  <div class="wrap">
    <p class="label">${esc(c.label.gallery)}</p>
    <h2 data-lines>${lines(c.galleryH2)}</h2>
    <div class="lp-gal">
      ${gallery.map((g, i) => `<figure class="lp-gal-item lp-gal-${i + 1}" data-clip>${img(g, `${name} — ${i + 1}`)}</figure>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec lp-process" data-bg="paper">
  <div class="wrap">
    <p class="label">${esc(c.label.process)}</p>
    <h2 data-lines>${lines(c.processH2)}</h2>
    <ol class="lp-steps">
      ${c.steps.map((s, i) => `<li data-reveal><span class="lp-num">${pad(i + 1)}</span><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="faq sec" id="faq" data-bg="paper">
  <div class="wrap faq-grid">
    <div class="faq-head">
      <p class="label">${esc(c.label.faq)}</p>
      <h2 data-lines>${lines(c.faqH2)}</h2>
    </div>
    <div class="faq-list">
      ${p.faq.map((f) => `<details class="qa">
        <summary>${esc(f.q)}<i aria-hidden="true"></i></summary>
        <div class="qa-body"><p>${esc(f.a)}</p></div>
      </details>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec lp-related" data-bg="brand">
  <div class="wrap">
    <p class="label">${esc(c.label.related)}</p>
    <h2 data-lines>${lines(c.relatedH2)}</h2>
    <ul class="lp-rel">
      ${p.related.map(bySlug).filter(Boolean).map((r) => `<li data-reveal><a href="${base}${r.slug}/"><span class="lp-rel-name">${esc(r.h1.join(' '))}</span><span class="lp-rel-sub">${esc(r.sub)}</span>${ARROW}</a></li>`).join('\n      ')}
    </ul>
    <a class="link-btn" href="${base}#productos">${esc(c.back)} ${ARROW}</a>
  </div>
</section>

<section class="contact sec" id="contacto" data-bg="dark">
  <div class="wrap">
    <p class="label">${esc(c.contact.label)}</p>
    <h2 class="contact-title" data-lines>${lines(c.contact.h2)}</h2>
    <div class="contact-grid">
      <form class="form" id="leadForm" novalidate>
        <p class="lead">${esc(c.contact.intro)}</p>
        <div class="field-row">
          <label class="field"><span>${esc(t.contact.form.name)}</span><input id="f-name" name="name" autocomplete="name" required></label>
          <label class="field"><span>${esc(t.contact.form.phone)}</span><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required></label>
        </div>
        <label class="field"><span>${esc(t.contact.form.measures)}</span><textarea id="f-comment" name="comment" rows="3" placeholder="${esc(t.contact.form.measuresPh)}"></textarea></label>
        <label class="consent"><input id="f-consent" type="checkbox" name="consent" required><span>${esc(t.contact.form.consent)}</span></label>
        <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <input type="hidden" name="lang" value="es">
        <input type="hidden" name="product" value="${esc(p.chip)}">
        <input type="hidden" name="landing" value="${esc(p.slug)}">
        <div class="form-actions">
          <button class="btn btn-light" type="submit" data-magnetic data-sending="${esc(t.contact.form.sending)}">${esc(t.contact.form.submit)} ${ARROW}</button>
          <a class="link-btn link-light" href="${SITE.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp">${WA} ${esc(t.contact.form.photoHint)}</a>
        </div>
        <p class="form-error" role="alert" hidden>${esc(t.contact.form.error)}</p>
        <div class="form-ok" hidden>
          <h3>${esc(t.contact.form.okTitle)}</h3>
          <p>${esc(t.contact.form.okText)}</p>
        </div>
      </form>
      <ul class="contact-list">
        <li><small>${esc(t.contact.whatsapp)}</small><a href="${SITE.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp">${SITE.phoneDisplay}</a></li>
        <li><small>${esc(t.contact.call)}</small><a href="tel:${SITE.phone}" data-track="phone">${SITE.phoneDisplay}</a></li>
        <li><small>${esc(t.contact.address)}</small><span>${esc(SITE.address)}</span><span class="muted">${esc(c.area)}</span></li>
      </ul>
    </div>
  </div>
</section>

</main>

<footer class="footer" data-bg="dark">
  <div class="wrap">
    <div class="footer-top">
      <p>${esc(t.footer.tagline)}</p>
      <nav class="lp-foot-links"><a href="${base}galeria/">Galería de trabajos</a>${all.map((x) => `<a href="${base}${x.slug}/"${x.slug === p.slug ? ' aria-current="page"' : ''}>${esc(x.h1.join(' '))}</a>`).join('')}</nav>
    </div>
    <p class="footer-word" aria-hidden="true">${SITE.brand}</p>
    <div class="footer-bottom">
      <span>© ${year} ${SITE.brand}. ${esc(t.footer.rights)}</span>
      <!-- TODO: юридичні сторінки (Aviso legal / Privacidad / Cookies) -->
      <nav>${t.footer.legal.map((x) => `<a href="#" aria-disabled="true">${esc(x)}</a>`).join('')}</nav>
      <a href="${base}">evostone.es</a>
    </div>
  </div>
</footer>

<script src="${base}assets/js/config.js"></script>
<script src="${base}assets/vendor/gsap.min.js" defer></script>
<script src="${base}assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="${base}assets/vendor/lenis.min.js" defer></script>
<script src="${base}assets/js/landing.js" defer></script>
</body>
</html>
`;
}
