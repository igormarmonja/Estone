/* Сторінка /galeria/ (ES). Фото й підписи — src/gallery/es.json (генерує tools/build_gallery.py).
   Шапка, меню, футер і поведінка — як на посадкових (landing.css + landing.js) + gallery.js. */
import { SITE, PRODUCTS } from './data.mjs';
import { renderLeadModal } from './lead-modal.mjs';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');
const lines = (arr) => arr.map((l) => `<span class="ln"><span>${esc(l)}</span></span>`).join('');
const ARROW = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const WA = '<svg class="ico ico-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg>';
const LOGO = '<svg class="logo-mark" viewBox="0 0 295 300" aria-hidden="true"><path d="M0 0h295v45H120v45H0z"/><path d="M0 135h295v45H120v45H0z"/><path d="M0 255h295v45H0z"/></svg>';

export const GALLERY_CATS = {
  cocinas: 'Cocinas', banos: 'Baños', escaleras: 'Escaleras', revestimientos: 'Revestimientos y chimeneas',
  mobiliario: 'Mobiliario', esculturas: 'Esculturas', alfeizares: 'Alféizares', taller: 'En el taller',
};

/* c — common посадкових цієї мови (тексти в c.gallery), L — мова, alts — усі мовні версії */
export function renderGallery(items, landings, t, c = null, L = { code: 'es', prefix: '', hreflang: 'es-ES', og: 'es_ES' }, alts = []) {
  const G = c.gallery;
  const base = L.prefix ? '../../' : '../';
  const home = base + L.prefix;
  const url = `${SITE.domain}/${L.prefix}galeria/`;
  const year = new Date().getFullYear();
  const title = G.title;
  const description = G.description.replace('{n}', items.length);
  const cats = Object.keys(G.cats).filter((c) => items.some((i) => i.cat === c));

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ImageGallery', name: c.galleryFull + ' · ' + SITE.brand, url, description,
        image: items.map((i) => ({ '@type': 'ImageObject', contentUrl: `${SITE.domain}/assets/img/galeria/${i.file}`, name: i.title, width: i.w, height: i.h })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: c.home, item: SITE.domain + '/' + L.prefix },
          { '@type': 'ListItem', position: 2, name: c.galleryNav, item: url },
        ],
      },
    ],
  };

  const nav = [['productos', t.nav.products], ['coleccion', t.nav.collection], ['materiales', t.nav.materials], ['profesionales', t.nav.pros], ['contacto', t.nav.contact]];

  return `<!DOCTYPE html>
<html lang="${L.code}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${(alts.length ? alts : [L]).map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${SITE.domain}/${a.prefix}galeria/">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${SITE.domain}/galeria/">
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#F5EDE3">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${SITE.domain}/assets/img/galeria/${items[0].file}">
<meta property="og:locale" content="${L.og}">
<link rel="preload" href="${base}assets/fonts/jost-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}assets/css/style.css">
<link rel="stylesheet" href="${base}assets/css/landing.css">
<link rel="stylesheet" href="${base}assets/css/gallery.css">
<script>document.documentElement.classList.add('js','lp');</script>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
<a class="skip" href="#main">${esc(t.a11y.skip)}</a>
<div class="cursor" id="cursor" aria-hidden="true"><span class="cursor-label"></span></div>

<header class="site-header" id="siteHeader">
  <a href="${home}" class="logo" aria-label="${SITE.brand} — ${SITE.legalName}">${LOGO}<span class="logo-word">${SITE.brand}</span></a>
  <nav class="main-nav" aria-label="Main">
    ${nav.map(([id, l]) => `<a href="${home}#${id}">${esc(l)}</a>`).join('\n    ')}
  </nav>
  <div class="header-right">
    <a href="${home}#contacto" class="btn btn-dark btn-sm" data-magnetic data-lead>${esc(t.nav.cta)}</a>
    <button class="burger" id="burger" aria-label="${esc(t.a11y.menu)}" aria-expanded="false" aria-controls="menu"><span></span><span></span></button>
  </div>
</header>

<div class="menu" id="menu" aria-hidden="true">
  <nav>
    ${nav.map(([id, l], i) => `<a href="${home}#${id}"><small>${pad(i + 1)}</small>${esc(l)}</a>`).join('\n    ')}
  </nav>
  <div class="menu-foot">
    <a href="${SITE.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp">${WA} WhatsApp</a>
    <a href="tel:${SITE.phone}" data-track="phone">${SITE.phoneDisplay}</a>
  </div>
</div>

<main id="main">
<section class="lp-hero gal-hero" data-bg="paper">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="${home}">${esc(c.home)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(c.galleryNav)}</span></nav>
    <h1 data-lines>${lines(G.h1)}</h1>
    <p class="lead">${esc(G.lead)}</p>
    <div class="gal-filters" role="toolbar" aria-label="${esc(G.filter)}">
      <button type="button" class="chip-f is-active" data-filter="all">${esc(G.all)} <sup>${items.length}</sup></button>
      ${cats.map((c) => `<button type="button" class="chip-f" data-filter="${c}">${esc(G.cats[c])} <sup>${items.filter((i) => i.cat === c).length}</sup></button>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="gal sec" data-bg="paper">
  <div class="wrap">
    <ul class="gal-grid">
      ${items.map((i, k) => `<li class="gal-item" data-cat="${i.cat}">
        <figure>
          <button type="button" class="gal-open" data-index="${k}" data-cursor="${esc(G.view)}" aria-label="${esc(i.title)}">
            <img src="${base}assets/img/galeria/t/${i.file}" data-full="${base}assets/img/galeria/${i.file}" alt="${esc(i.title)}" width="${i.w}" height="${i.h}" loading="${k < 6 ? 'eager' : 'lazy'}" decoding="async">
          </button>
          <figcaption>${esc(i.title)}</figcaption>
        </figure>
      </li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="sec lp-related" data-bg="brand">
  <div class="wrap">
    <p class="label">${esc(G.ctaLabel)}</p>
    <h2 data-lines>${lines(G.ctaH2)}</h2>
    <ul class="lp-rel">
      ${['encimeras-de-cocina-a-medida', 'lavabos-a-medida', 'escaleras-de-marmol', 'chimeneas-de-marmol'].map((s) => landings.find((x) => x.slug === s)).filter(Boolean).map((r) => `<li><a href="${home}${r.slug}/"><span class="lp-rel-name">${esc(r.h1.join(' '))}</span><span class="lp-rel-sub">${esc(r.sub)}</span>${ARROW}</a></li>`).join('\n      ')}
    </ul>
    <a class="btn btn-light" href="${home}#contacto" data-magnetic data-lead>${esc(c.cta)} ${ARROW}</a>
  </div>
</section>
</main>

<div class="lightbox" id="lightbox" hidden role="dialog" aria-modal="true" aria-label="${esc(G.photo)}">
  <button type="button" class="lb-close" data-lb="close" aria-label="${esc(G.close)}"><span></span><span></span></button>
  <button type="button" class="lb-nav lb-prev" data-lb="prev" aria-label="${esc(G.prev)}">${ARROW}</button>
  <figure class="lb-stage"><img alt=""><figcaption><span class="lb-title"></span><span class="lb-count"></span></figcaption></figure>
  <button type="button" class="lb-nav lb-next" data-lb="next" aria-label="${esc(G.next)}">${ARROW}</button>
</div>

<footer class="footer" data-bg="dark">
  <div class="wrap">
    <div class="footer-top">
      <p>${esc(t.footer.tagline)}</p>
      <nav class="lp-foot-links">${landings.map((x) => `<a href="${home}${x.slug}/">${esc(x.h1.join(' '))}</a>`).join('')}</nav>
    </div>
    <p class="footer-word" aria-hidden="true">${SITE.brand}</p>
    <div class="footer-bottom">
      <span>© ${year} ${SITE.legalName} (${SITE.brand}). ${esc(t.footer.rights)}</span>
      <nav>${t.footer.legal.map((x) => `<a href="#" aria-disabled="true">${esc(x)}</a>`).join('')}</nav>
      <a href="${home}">evostone.es</a>
    </div>
  </div>
</footer>
${renderLeadModal({ t, lang: L.code, title: c.contact.h2, intro: c.contact.intro, chips: [...PRODUCTS.map((p) => ({ v: p.id, l: t.products.items[p.id].title })), { v: 'pro', l: t.pros.chip }, { v: 'other', l: t.contact.other }] })}

<script src="${base}assets/js/config.js"></script>
<script src="${base}assets/vendor/gsap.min.js" defer></script>
<script src="${base}assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="${base}assets/vendor/lenis.min.js" defer></script>
<script src="${base}assets/js/landing.js" defer></script>
<script src="${base}assets/js/gallery.js" defer></script>
<script src="${base}assets/js/lead.js" defer></script>
</body>
</html>
`;
}
