/* Збирає всі сторінки сайту Gridalta в корінь репозиторію.
   Запуск: node src/build.js                                         */
const fs = require('fs');
const path = require('path');
const { wa, PHONE_TEL, PHONE_HUMAN, EMAIL, INSTAGRAM } = require('./wa.js');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://www.gridalta.es/';

/* ------------------------------------------------------------ іконки */
const I = {
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2zm5.8 14.03c-.24.68-1.42 1.3-1.95 1.34-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.93-4.66-4.11-.13-.18-1.11-1.48-1.11-2.83s.71-2 .96-2.28c.25-.27.55-.34.73-.34l.52.01c.17.01.39-.06.61.47.24.56.79 1.93.86 2.07.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.27.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.27.14.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.23.61-.14.25.09 1.59.75 1.86.89.27.14.45.2.52.32.07.11.07.66-.17 1.34z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke-width="2"/><path d="m8 12 3 3 5-6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  budget: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  team: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/></svg>',
  bath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><path d="M6 12V5a2 2 0 0 1 3.5-1.3M7 20l-1 2M17 20l1 2"/></svg>',
  kitchen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 10h18M8 6h.01M12 6h.01M7 14h4"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>',
  store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9 4.5 3h15L21 9M3 9h18M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M9 21v-6h6v6"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const waBtn = (key, label, cls = '') =>
  `<a class="btn btn--wa ${cls}" href="${wa(key)}" target="_blank" rel="noopener">${I.wa}<span>${label}</span></a>`;
const callBtn = (cls = '') =>
  `<a class="btn btn--line ${cls}" href="tel:${PHONE_TEL}">${I.phone}<span>${PHONE_HUMAN}</span></a>`;

/* ------------------------------------------------------------ навігація */
const NAV = [
  ['reforma-bano-valencia.html', 'Baños'],
  ['reforma-cocina-valencia.html', 'Cocinas'],
  ['reforma-integral-valencia.html', 'Reforma integral'],
  ['reforma-locales-valencia.html', 'Locales'],
  ['index.html#precios', 'Precios'],
  ['index.html#obras', 'Obras'],
];

function head({ title, desc, canon, jsonld = '' }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#1f2631">
<link rel="canonical" href="${SITE}${canon}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Gridalta">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${SITE}${canon}">
<meta property="og:image" content="${SITE}assets/img/hero.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/img/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="assets/img/marca.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/styles.css">${jsonld}
</head>
<body>
<a class="skip" href="#main">Saltar al contenido</a>`;
}

function header(active) {
  const links = NAV.map(([href, label]) =>
    `<a href="${href}"${active === href ? ' aria-current="page"' : ''}>${label}</a>`).join('\n        ');
  const dlinks = NAV.map(([href, label]) =>
    `<a class="drawer__link" href="${href}">${label}${I.arrow}</a>`).join('\n  ');
  return `
<div class="topbar">
  <div class="wrap">
    <div class="topbar__group">
      <span>Reformas en Valencia y alrededores</span>
    </div>
    <div class="topbar__group">
      <a href="tel:${PHONE_TEL}">${I.phone}${PHONE_HUMAN}</a>
      <a href="mailto:${EMAIL}">${I.mail}${EMAIL}</a>
      <a href="https://www.instagram.com/${INSTAGRAM}/" target="_blank" rel="noopener">${I.ig}@${INSTAGRAM}</a>
    </div>
  </div>
</div>

<header class="header" data-header>
  <div class="wrap">
    <a class="logo" href="index.html" aria-label="Gridalta, inicio">
      <img src="assets/img/marca.png" alt="" width="46" height="46">
      <span class="logo__text"><span class="logo__name">GRIDALTA</span><span class="logo__tag">reformas integrales</span></span>
    </a>
    <nav class="nav" aria-label="Principal">
        ${links}
    </nav>
    <div class="header__cta">
      <a class="btn btn--line btn--sm" href="tel:${PHONE_TEL}">${I.phone}<span>Llamar</span></a>
      ${waBtn('general', 'WhatsApp', 'btn--sm')}
      <button class="burger" type="button" data-burger aria-expanded="false" aria-controls="drawer" aria-label="Menú"><span></span></button>
    </div>
  </div>
</header>

<div class="drawer" id="drawer" data-drawer aria-hidden="true">
  ${dlinks}
  <div class="drawer__foot">
    ${waBtn('general', 'Escribir por WhatsApp', 'btn--block')}
    <a class="btn btn--line btn--block" href="tel:${PHONE_TEL}">${I.phone}<span>${PHONE_HUMAN}</span></a>
  </div>
</div>
`;
}

function footer() {
  return `
<footer class="footer">
  <div class="wrap">
    <div class="footer__grid">
      <div>
        <a class="logo" href="index.html" aria-label="Gridalta, inicio">
          <img src="assets/img/marca.png" alt="" width="46" height="46">
          <span class="logo__text"><span class="logo__name">GRIDALTA</span><span class="logo__tag">reformas integrales</span></span>
        </a>
        <p>Reformas en Valencia sin estrés y sin retrasos. Plazos garantizados, presupuesto fijo y garantía oficial en todos los trabajos.</p>
      </div>
      <div>
        <h4>Reformas</h4>
        <ul>
          <li><a href="reforma-bano-valencia.html">Reforma de baño</a></li>
          <li><a href="reforma-cocina-valencia.html">Reforma de cocina</a></li>
          <li><a href="reforma-integral-valencia.html">Reforma integral</a></li>
          <li><a href="reforma-locales-valencia.html">Locales y negocios</a></li>
        </ul>
      </div>
      <div>
        <h4>Gridalta</h4>
        <ul>
          <li><a href="index.html#precios">Precios</a></li>
          <li><a href="index.html#obras">Nuestras obras</a></li>
          <li><a href="index.html#agencias">Para agencias</a></li>
          <li><a href="index.html#preguntas">Preguntas frecuentes</a></li>
        </ul>
      </div>
      <div>
        <h4>Contacto</h4>
        <ul>
          <li><a class="contact-line" href="${wa('general')}" target="_blank" rel="noopener">${I.wa}WhatsApp ${PHONE_HUMAN}</a></li>
          <li><a class="contact-line" href="tel:${PHONE_TEL}">${I.phone}${PHONE_HUMAN}</a></li>
          <li><a class="contact-line" href="mailto:${EMAIL}">${I.mail}${EMAIL}</a></li>
          <li><a class="contact-line" href="https://www.instagram.com/${INSTAGRAM}/" target="_blank" rel="noopener">${I.ig}@${INSTAGRAM}</a></li>
          <li><span class="contact-line">${I.pin}Valencia y provincia</span></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© <span data-year>2026</span> Gridalta Grupo S.L.</span>
      <nav aria-label="Legal"><a href="aviso-legal.html">Aviso legal</a><a href="privacidad.html">Privacidad y cookies</a></nav>
    </div>
  </div>
</footer>

<a class="wa-float" href="${wa('general')}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">${I.wa}</a>

<nav class="mbar" aria-label="Contacto rápido">
  <a class="mbar__wa" href="${wa('general')}" target="_blank" rel="noopener">${I.wa}<span>Escribir por WhatsApp</span></a>
  <a class="mbar__call" href="tel:${PHONE_TEL}" aria-label="Llamar">${I.phone}</a>
</nav>

<script src="assets/js/main.js" defer></script>
</body>
</html>
`;
}

/* ------------------------------------------------------------ блоки */
const sectionHead = (eyebrow, title, lead, mod = '') => `
      <div class="head ${mod} reveal">
        <div><span class="eyebrow">${eyebrow}</span><h2 class="h2">${title}</h2></div>
        ${lead ? `<p class="lead">${lead}</p>` : ''}
      </div>`;

const WHY = [
  [I.clock, 'Plazos garantizados', 'Terminamos en el plazo acordado, sin retrasos. Si son cuatro semanas, son cuatro semanas, no seis.'],
  [I.budget, 'Presupuesto fijo', 'Transparencia total: sin pagos ocultos ni cargos extra a mitad de obra. Lo que firmas es lo que pagas.'],
  [I.shield, 'Garantía oficial', 'Sobre todos los trabajos realizados y sobre los materiales que utilizamos.'],
  [I.camera, 'Fotos y vídeos cada semana', 'Ves cómo avanza tu obra aunque no estés en Valencia, con un chat directo con el equipo.'],
  [I.team, 'Equipo y producción propios', 'Montadores con experiencia y fabricación propia de muebles: la misma cuadrilla de principio a fin.'],
  [I.award, 'Distribuidores oficiales', 'De fabricantes líderes: accedemos a los mejores sistemas de instalación oculta del mercado.'],
];
const whyBlock = () => `
  <section class="section section--alt" id="por-que">
    <div class="wrap">
      ${sectionHead('Por qué Gridalta', 'Reformas <em>sin estrés</em> y sin retrasos', 'Tres compromisos por contrato y un equipo que trabaja junto desde hace años. Por eso el 95 % de nuestros clientes nos recomienda.', 'head--split')}
      <div class="why">
        ${WHY.map(([ic, t, d]) => `
        <div class="why__item reveal"><div class="ic-box">${ic}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
      </div>
    </div>
  </section>`;

const STEPS = [
  ['Nos escribes por WhatsApp', 'Cuéntanos qué quieres reformar y mándanos unas fotos. Te damos una primera estimación.'],
  ['Visita y medición gratis', 'Vamos a verlo, medimos y te asesoramos sobre materiales y soluciones.'],
  ['Presupuesto fijo y plazo', 'Recibes el presupuesto cerrado con la fecha de entrega. Sin sorpresas después.'],
  ['Obra y entrega a tiempo', 'Fotos y vídeos cada semana, entrega en el plazo acordado y garantía oficial.'],
];
const stepsBlock = () => `
  <section class="section" id="proceso">
    <div class="wrap">
      ${sectionHead('Cómo trabajamos', 'De tu mensaje a la entrega, en <em>4 pasos</em>', '', 'head--center')}
      <div class="steps">
        ${STEPS.map(([t, d]) => `
        <div class="step reveal"><h3>${t}</h3><p>${d}</p></div>`).join('')}
      </div>
    </div>
  </section>`;

const PACKS = [
  ['Obra nueva', 'Precio fijo/m²', 'Precio fijo por metro cuadrado con trabajo y materiales incluidos. Arranque rápido, cálculo transparente y sin gastos imprevistos.', 'obra_nueva'],
  ['Venta', '21 días', 'Plazo garantizado de 21 días. Proceso optimizado para preparar tu piso para la venta cuanto antes.', 'venta'],
  ['Alquiler', '5–14 días', 'Home staging y reforma cosmética. Inversión mínima para que tu inmueble sea lo más atractivo posible.', 'alquiler'],
];
const packsBlock = () => `
  <section class="section" id="paquetes">
    <div class="wrap">
      ${sectionHead('Para propietarios e inversores', 'Paquetes con <em>precio y plazo claros</em>', 'Soluciones cerradas para obra nueva, venta y alquiler. Sabes desde el primer día qué pagas y cuándo está listo.', 'head--split')}
      <div class="packs">
        ${PACKS.map(([t, time, d]) => `
        <div class="pack reveal">
          <div class="pack__top"><h3>Paquete «${t}»</h3><span class="pack__time">${time}</span></div>
          <p>${d}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`;

const faqBlock = (items, id = 'preguntas') => `
  <section class="section section--alt" id="${id}">
    <div class="wrap">
      ${sectionHead('Preguntas frecuentes', 'Lo que suelen <em>preguntarnos</em>', '', 'head--center')}
      <div class="faq">
        ${items.map(([q, a]) => `
        <details class="reveal"><summary>${q}</summary><div class="faq__a"><p>${a}</p></div></details>`).join('')}
      </div>
    </div>
  </section>`;

const ctaBlock = (key = 'general', title = 'Cuéntanos tu reforma por WhatsApp', text = 'Mándanos fotos del espacio y te respondemos con una primera estimación. Sin compromiso.') => `
  <section class="section">
    <div class="wrap">
      <div class="cta reveal">
        <div><h2>${title}</h2><p>${text}</p></div>
        <div class="cta__actions">
          ${waBtn(key, 'Escribir por WhatsApp', 'btn--lg')}
          <a class="btn btn--line btn--lg" href="tel:${PHONE_TEL}">${I.phone}<span>${PHONE_HUMAN}</span></a>
        </div>
      </div>
    </div>
  </section>`;

const gallery = (items) => `
      <div class="gallery">
        ${items.map(([src, cap, tall]) => `
        <figure class="reveal${tall ? ' tall' : ''}"><img src="${src}" alt="${esc(cap)} — obra de Gridalta en Valencia" loading="lazy">${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`).join('')}
      </div>`;

const agentBlock = () => `
      <div class="agent reveal" id="agencias">
        <div>
          <h3>¿Eres agente inmobiliario?</h3>
          <p>Un socio fiable de reformas para ti y tus clientes. Puedes recomendarnos sin arriesgar tu reputación: tu cliente recibe una reforma de calidad y a tiempo.</p>
        </div>
        <ul>
          <li>Comisión por cada cliente que nos presentes</li>
          <li>Visita de medición gratuita, ya en la fase de visitas</li>
          <li>Informes con fotos durante toda la obra</li>
        </ul>
        ${waBtn('agencia', 'Colaborar')}
      </div>`;

/* ------------------------------------------------------------ головна */
const SERVICES = [
  { cls: 'svc--feature', img: 'assets/img/reforma.jpg', tag: 'Lo más pedido', hot: true, title: 'Reforma de baño',
    text: 'Baño completo llave en mano: plato de ducha o bañera, gres porcelánico de gran formato, sanitarios suspendidos y sistemas de instalación oculta de fabricantes líderes.',
    chips: ['Gres de gran formato', 'Instalación oculta', 'Muebles a medida'], href: 'reforma-bano-valencia.html', key: 'bano' },
  { img: 'assets/img/obra/cocina-1.jpg', title: 'Reforma de cocina',
    text: 'Muebles a medida de fabricación propia, encimera e instalaciones. Del diseño al montaje, con nuestro equipo.',
    chips: ['Producción propia'], href: 'reforma-cocina-valencia.html', key: 'cocina' },
  { img: 'assets/img/obra/integral-1.jpg', title: 'Reforma integral',
    text: 'Del derribo al último detalle: demolición, electricidad, fontanería, suelos, paredes y acabados.',
    chips: ['Llave en mano'], href: 'reforma-integral-valencia.html', key: 'integral' },
  { img: 'assets/img/obra/oficina.jpg', tag: 'Negocios', title: 'Locales y negocios',
    text: 'Tiendas, bares, peluquerías y oficinas. Plazo y presupuesto fijados antes de empezar.',
    chips: ['Plazo por contrato'], href: 'reforma-locales-valencia.html', key: 'local' },
  { img: 'assets/img/obra/integral-2.jpg', title: 'Reforma cosmética',
    text: 'Pintura, pulido de suelos, iluminación nueva y pequeños arreglos. Ideal antes de vender o alquilar.',
    chips: ['7–14 días'], href: null, key: 'cosmetica' },
];

function svcCard(s) {
  return `
        <article class="svc ${s.cls || ''} reveal">
          <div class="svc__img"><img src="${s.img}" alt="${esc(s.title)} en Valencia — Gridalta" loading="lazy">${s.tag ? `<span class="svc__tag${s.hot ? ' svc__tag--hot' : ''}">${s.tag}</span>` : ''}</div>
          <div class="svc__body">
            <h3>${s.title}</h3>
            <p>${s.text}</p>
            <div class="chips">${s.chips.map((c) => `<span class="chip">${c}</span>`).join('')}</div>
            ${s.href ? `<div class="svc__foot"><a class="link-more" href="${s.href}">Ver más ${I.arrow}</a></div>` : ''}
          </div>
        </article>`;
}

const PRICES = [
  ['Baño completo', '3.500 – 6.500 €', 'Baño estándar con materiales de gama media.', 'bano', true],
  ['Cocina ~15 m²', '15.000 – 20.000 €', 'Muebles a medida, encimera e instalaciones. + IVA', 'cocina'],
  ['Reforma integral', '900 – 1.250 €<small>/m²</small>', 'Piso completo llave en mano, según calidades.', 'integral'],
  ['Local comercial', '500 – 900 €<small>/m²</small>', 'Reforma integral de local u oficina.', 'local'],
];

const HOME_FAQ = [
  ['¿El presupuesto tiene coste?', 'No. Escríbenos por WhatsApp con unas fotos y te damos una primera estimación. Después hacemos la visita de medición, también gratuita, y recibes el presupuesto fijo.'],
  ['¿El precio puede cambiar durante la obra?', 'No. Trabajamos con presupuesto fijo: total transparencia, sin pagos ocultos ni cargos adicionales. Lo que firmas es lo que pagas.'],
  ['¿Cumplís los plazos?', 'Sí, y lo garantizamos. La fecha de entrega va en el presupuesto y la cumplimos: si acordamos cuatro semanas, son cuatro semanas.'],
  ['¿Qué garantía tienen los trabajos?', 'Garantía oficial sobre todos los trabajos realizados y sobre los materiales utilizados.'],
  ['¿Puedo seguir la obra si no estoy en Valencia?', 'Sí. Cada semana te enviamos fotos y vídeos del avance y tienes un chat directo con el equipo para preguntar lo que necesites.'],
  ['¿Trabajáis con locales, oficinas y agencias?', 'Sí. Reformamos tiendas, bares, peluquerías y oficinas, y tenemos un programa de colaboración para agentes inmobiliarios.'],
];

function homeBody() {
  return `
<main id="main">

  <section class="hero">
    <div class="wrap">
      <div>
        <span class="hero__badge"><i></i>Respondemos por WhatsApp</span>
        <h1>Reformas en Valencia <em>sin estrés</em> y sin retrasos</h1>
        <p class="hero__lead">Baños, cocinas, reformas integrales y locales comerciales. Plazos garantizados, presupuesto fijo sin pagos ocultos y garantía oficial en todos los trabajos.</p>
        <div class="hero__actions">
          ${waBtn('presupuesto', 'Pedir presupuesto por WhatsApp', 'btn--lg')}
          ${callBtn('btn--lg')}
        </div>
        <div class="hero__proof">
          <div class="proof"><b>3+</b><span>años en el mercado</span></div>
          <div class="proof"><b>100+</b><span>proyectos terminados</span></div>
          <div class="proof"><b>95 %</b><span>de clientes nos recomiendan</span></div>
        </div>
      </div>
      <div class="hero__media">
        <div class="hero__img"><img src="assets/img/hero.jpg" alt="Pared a medio pintar durante una reforma en Valencia" width="1800" height="1012" fetchpriority="high" style="object-position:34% 50%"></div>
        <div class="float-card float-card--a"><span class="ic">${I.clock}</span><span><b>Plazo garantizado</b>por contrato, sin retrasos</span></div>
        <div class="float-card float-card--b"><span class="ic">${I.budget}</span><span><b>Presupuesto fijo</b>sin pagos ocultos</span></div>
      </div>
    </div>

    <div class="wrap wrap--quiz">
      <div class="quiz reveal">
        <p class="quiz__title">¿Qué quieres reformar?<small>Elige una opción y escríbenos directamente por WhatsApp.</small></p>
        <div class="quiz__opts">
          <a class="quiz__opt" href="${wa('bano')}" target="_blank" rel="noopener">${I.bath}Baño</a>
          <a class="quiz__opt" href="${wa('cocina')}" target="_blank" rel="noopener">${I.kitchen}Cocina</a>
          <a class="quiz__opt" href="${wa('integral')}" target="_blank" rel="noopener">${I.home}Piso completo</a>
          <a class="quiz__opt" href="${wa('local')}" target="_blank" rel="noopener">${I.store}Local o negocio</a>
          <a class="quiz__opt" href="${wa('otro')}" target="_blank" rel="noopener">${I.chat}Otra cosa</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--alt" id="servicios">
    <div class="wrap">
      ${sectionHead('Servicios', 'Lo que más nos piden <em>en Valencia</em>', 'Del baño a la reforma integral o el local de tu negocio. Pide precio de cualquier servicio por WhatsApp: te respondemos con una primera estimación.', 'head--split')}
      <div class="services">
        ${SERVICES.map(svcCard).join('')}
        <article class="svc svc--wide reveal">
          <div class="svc__img"><img src="assets/img/obra/paneles-1.jpg" alt="Paneles de pared de bambú instalados por Gridalta" loading="lazy"><span class="svc__tag">Distribuidores oficiales</span></div>
          <div class="svc__body">
            <h3>Paredes sin enlucir ni pintar: paneles de bambú</h3>
            <p>Una solución que simplifica la reforma: los paneles se montan directamente sobre la pared base, sin enlucido, masilla ni pintura. Acabado premium sin polvo de obra.</p>
            <div class="kpis">
              <div><b>1–2 días</b><span>de montaje</span></div>
              <div><b>−30 %</b><span>en materiales y mano de obra</span></div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  ${whyBlock()}

  <section class="section" id="precios">
    <div class="wrap">
      ${sectionHead('Precios', '¿Cuánto cuesta una reforma <em>en Valencia</em>?', 'Rangos orientativos para que te hagas una idea. Tu precio exacto y fijo te lo damos gratis por WhatsApp, a partir de unas fotos.', 'head--split')}
      <div class="prices">
        ${PRICES.map(([t, v, d, k, hl]) => `
        <div class="price${hl ? ' price--hl' : ''} reveal">
          <h3>${t}</h3><div class="price__val">${v}</div><p>${d}</p>
        </div>`).join('')}
      </div>
      <p class="note">${I.info}<span>Rangos habituales del mercado en Valencia (2026). El presupuesto final depende de metros, estado del inmueble y materiales, y queda fijado antes de empezar.</span></p>
      <div class="gallery-cta">${waBtn('precio', 'Mi precio exacto por WhatsApp', 'btn--lg')}</div>
    </div>
  </section>

  <section class="section section--dark" id="negocios">
    <div class="wrap">
      <div class="biz">
        <div class="biz__img reveal"><img src="assets/img/obra/oficina.jpg" alt="Oficina reformada por Gridalta" loading="lazy"></div>
        <div class="reveal">
          <span class="eyebrow">Para negocios</span>
          <h2 class="h2">Reformas de locales, oficinas <em>y negocios</em></h2>
          <p class="lead" style="margin-top:14px">Cada día de obra es un día sin facturar. Por eso fijamos el plazo por contrato y el presupuesto no cambia a mitad de camino.</p>
          <ul class="checks">
            <li>${I.check}<div><b>Tiendas, bares, peluquerías y oficinas</b><span>Reforma integral o parcial del local.</span></div></li>
            <li>${I.check}<div><b>Plazo y presupuesto fijos</b><span>Sabes cuándo abres y cuánto pagas antes de empezar.</span></div></li>
            <li>${I.check}<div><b>Mobiliario a medida</b><span>Mostradores y muebles de fabricación propia.</span></div></li>
          </ul>
          <div class="hero__actions">
            ${waBtn('local', 'Presupuesto para mi local', 'btn--lg')}
            <a class="btn btn--line btn--lg" href="reforma-locales-valencia.html"><span>Ver más</span>${I.arrow}</a>
          </div>
        </div>
      </div>
      ${agentBlock()}
    </div>
  </section>

  ${packsBlock()}

  <section class="section section--alt" id="obras">
    <div class="wrap">
      ${sectionHead('Nuestras obras', 'Trabajos <em>reales</em> de nuestro equipo', 'Producción propia de muebles, montadores con experiencia y los mejores sistemas de instalación oculta.', 'head--split')}
      ${gallery([
        ['assets/img/obra/cocina-2.jpg', 'Cocina', true],
        ['assets/img/obra/cocina-1.jpg', 'Cocina a medida'],
        ['assets/img/reforma.jpg', 'Baño'],
        ['assets/img/obra/paneles-2.jpg', 'Paneles de bambú'],
        ['assets/img/obra/cocina-3.jpg', 'Isla de cocina'],
        ['assets/img/obra/bano-2.jpg', 'Baño', true],
        ['assets/img/obra/equipo-1.jpg', 'Nuestro equipo en obra'],
        ['assets/img/obra/cocina-4.jpg', 'Encimera'],
        ['assets/img/obra/armario.jpg', 'Armario a medida'],
        ['assets/img/taller.jpg', 'Revestimiento de mármol'],
      ])}
      <div class="gallery-cta">
        <a class="btn btn--line" href="https://www.instagram.com/${INSTAGRAM}/" target="_blank" rel="noopener">${I.ig}<span>Más obras en Instagram</span></a>
      </div>
    </div>
  </section>

  ${stepsBlock()}
  ${faqBlock(HOME_FAQ)}
  ${ctaBlock()}

</main>`;
}

/* ------------------------------------------------------------ сторінки послуг */
const OTHERS = [
  ['reforma-bano-valencia.html', 'Reforma de baño'],
  ['reforma-cocina-valencia.html', 'Reforma de cocina'],
  ['reforma-integral-valencia.html', 'Reforma integral'],
  ['reforma-locales-valencia.html', 'Locales y negocios'],
];

const PAGES = [
  {
    out: 'reforma-bano-valencia.html', key: 'bano', img: 'assets/img/reforma.jpg',
    title: 'Reforma de baño en Valencia · Presupuesto fijo | Gridalta',
    desc: 'Reforma de baño en Valencia: plato de ducha, gres de gran formato e instalación oculta. Plazo garantizado y presupuesto fijo. Pide precio por WhatsApp.',
    crumb: 'Reforma de baño', eyebrow: 'Lo más pedido en Valencia',
    h1: 'Reforma de baño <em>en Valencia</em>',
    lead: 'Tu baño nuevo, llave en mano: desmontaje, fontanería, gres porcelánico de gran formato y sanitarios con sistemas de instalación oculta. Plazo cerrado por contrato y un presupuesto que no cambia.',
    bullets: ['Plazo garantizado por contrato', 'Presupuesto fijo, sin pagos ocultos', 'Garantía oficial en trabajos y materiales'],
    includes: [
      ['Desmontaje y preparación', 'Retirada del baño antiguo, escombro y nivelación.'],
      ['Fontanería nueva', 'Tomas, desagües y montaje de sanitarios.'],
      ['Gres porcelánico de gran formato', 'Menos juntas y un acabado limpio en paredes y suelo.'],
      ['Instalación oculta', 'Cisternas empotradas y sistemas de fabricantes líderes.'],
      ['Plato de ducha o bañera', 'A medida del espacio, con mampara.'],
      ['Electricidad e iluminación', 'Puntos de luz, espejo con LED y enchufes.'],
      ['Muebles de baño a medida', 'De fabricación propia, ajustados al hueco.'],
      ['Limpieza y entrega', 'Te entregamos el baño listo para usar.'],
    ],
    price: ['Baño completo en Valencia', '3.500 – 6.500 €', 'Rango orientativo del mercado en Valencia (2026) para un baño completo estándar. Tu precio exacto depende de metros y materiales y queda fijado antes de empezar.'],
    gallery: [['assets/img/reforma.jpg', 'Baño', true], ['assets/img/obra/bano-2.jpg', 'Espejo con LED'], ['assets/img/local.jpg', 'Bañera exenta'], ['assets/img/obra/bano-1.jpg', 'Bañera con frente'], ['assets/img/bano.jpg', 'Aseo en porcelánico'], ['assets/img/obra/bano-3.jpg', 'Gran formato']],
    faq: [
      ['¿Cuánto cuesta reformar un baño en Valencia?', 'Un baño completo estándar suele moverse entre 3.500 y 6.500 €, según tamaño y materiales. Mándanos fotos por WhatsApp y te damos una primera estimación; tras la visita de medición recibes el presupuesto fijo.'],
      ['¿Cuánto dura la obra?', 'Depende del tamaño y de los materiales. El plazo exacto va en el presupuesto y lo garantizamos por contrato.'],
      ['¿Podéis cambiar la bañera por un plato de ducha?', 'Sí, es de lo más pedido. Retiramos la bañera, adaptamos los desagües e instalamos un plato de ducha a medida con mampara.'],
      ['¿Qué garantía tiene la reforma?', 'Garantía oficial sobre todos los trabajos realizados y los materiales utilizados.'],
    ],
  },
  {
    out: 'reforma-cocina-valencia.html', key: 'cocina', img: 'assets/img/obra/cocina-1.jpg',
    title: 'Reforma de cocina en Valencia · Muebles a medida | Gridalta',
    desc: 'Reforma de cocina en Valencia con muebles a medida de fabricación propia, encimera e instalaciones. Plazo garantizado y presupuesto fijo. Pide precio por WhatsApp.',
    crumb: 'Reforma de cocina', eyebrow: 'Muebles de fabricación propia',
    h1: 'Reforma de cocina <em>en Valencia</em>',
    lead: 'Antes de tocar nada entendemos cómo usas tu cocina cada día. Después la diseñamos, fabricamos los muebles a medida en nuestra propia producción y la monta nuestro equipo.',
    bullets: ['Producción propia de muebles', 'Del diseño al montaje, sin intermediarios', 'Presupuesto fijo y plazo garantizado'],
    includes: [
      ['Diseño y medición', 'Distribución pensada para cómo cocinas tú.'],
      ['Muebles a medida', 'Fabricación propia, sin módulos estándar.'],
      ['Encimera y frente', 'Porcelánico, compacto o piedra, a elegir.'],
      ['Fontanería y electricidad', 'Tomas nuevas para fregadero y electrodomésticos.'],
      ['Montaje de electrodomésticos', 'Integrados en el mobiliario.'],
      ['Iluminación', 'Luz bajo mueble y puntos de trabajo.'],
      ['Suelos y paredes', 'Revestimientos a juego con la cocina.'],
      ['Limpieza y entrega', 'Cocina lista para usar.'],
    ],
    price: ['Cocina de unos 15 m² en Valencia', '15.000 – 20.000 €', 'Rango orientativo del mercado en Valencia (2026), más IVA. Tu precio exacto depende del mobiliario y los materiales y queda fijado antes de empezar.'],
    gallery: [['assets/img/obra/cocina-2.jpg', 'Cocina', true], ['assets/img/obra/cocina-1.jpg', 'Cocina a medida'], ['assets/img/obra/cocina-3.jpg', 'Isla'], ['assets/img/obra/cocina-4.jpg', 'Encimera'], ['assets/img/obra/cocina-5.jpg', 'Frente de piedra'], ['assets/img/obra/cocina-6.jpg', 'Cocina en madera']],
    faq: [
      ['¿Cuánto cuesta reformar una cocina en Valencia?', 'Una cocina de unos 15 m² suele moverse entre 15.000 y 20.000 € más IVA, según mobiliario y materiales. Mándanos fotos y medidas por WhatsApp para una primera estimación.'],
      ['¿Fabricáis vosotros los muebles?', 'Sí. Tenemos producción propia y equipos de montaje con experiencia, lo que nos permite hacer proyectos complejos y garantizar la durabilidad y el acabado de cada mueble.'],
      ['¿Podéis hacer solo los muebles, sin obra?', 'Sí, también hacemos mobiliario a medida sin reforma completa. Cuéntanos qué necesitas por WhatsApp.'],
      ['¿Cumplís el plazo?', 'Sí. El plazo va en el presupuesto y lo garantizamos por contrato.'],
    ],
  },
  {
    out: 'reforma-integral-valencia.html', key: 'integral', img: 'assets/img/obra/integral-1.jpg', packs: true,
    title: 'Reforma integral llave en mano en Valencia | Gridalta',
    desc: 'Reforma integral de pisos en Valencia llave en mano: demolición, instalaciones, suelos y acabados. Presupuesto fijo y plazo garantizado. Precio por WhatsApp.',
    crumb: 'Reforma integral', eyebrow: 'Llave en mano',
    h1: 'Reforma integral <em>llave en mano</em> en Valencia',
    lead: 'Un ciclo completo, del derribo al último detalle: demolición y redistribución, instalaciones, suelos, paredes y acabados. La solución para pisos antiguos y obra nueva que necesitan un rediseño completo.',
    bullets: ['Un solo equipo de principio a fin', 'Fotos y vídeos de la obra cada semana', 'Presupuesto fijo y plazo garantizado'],
    includes: [
      ['Demolición y redistribución', 'Retirada total de revestimientos antiguos y cambios de distribución.'],
      ['Electricidad', 'Instalación nueva completa.'],
      ['Fontanería y saneamiento', 'Tuberías, desagües y tomas nuevas.'],
      ['Recrecido de suelos', 'Solera nivelada lista para el acabado.'],
      ['Enlucido de paredes', 'Paredes lisas y rectas.'],
      ['Suelos y revestimientos', 'Porcelánico, madera o paneles.'],
      ['Ventanas y puertas', 'Montaje de carpintería nueva.'],
      ['Pintura y acabados', 'Acabado final y decoración.'],
    ],
    price: ['Reforma integral en Valencia', '900 – 1.250 €/m²', 'Rango orientativo del mercado en Valencia (2026) según calidades. Tu precio exacto, fijo, lo recibes tras la visita de medición.'],
    gallery: [['assets/img/obra/integral-1.jpg', 'Salón y cocina', true], ['assets/img/obra/integral-2.jpg', 'Iluminación'], ['assets/img/obra/equipo-1.jpg', 'Nuestro equipo'], ['assets/img/obra/equipo-2.jpg', 'En obra'], ['assets/img/obra/armario.jpg', 'Armario a medida'], ['assets/img/obra/paneles-2.jpg', 'Paneles']],
    faq: [
      ['¿Cuánto cuesta una reforma integral en Valencia?', 'Una reforma integral suele moverse entre 900 y 1.250 €/m² según las calidades. Para un piso concreto te damos el presupuesto fijo tras la visita de medición, que es gratuita.'],
      ['¿Os encargáis de todo?', 'Sí: demolición, instalaciones, suelos, paredes, carpintería y acabados. Un único equipo y un único interlocutor durante toda la obra.'],
      ['¿Puedo seguir la obra a distancia?', 'Sí. Cada semana te mandamos fotos y vídeos del avance y tienes un chat directo con el equipo.'],
      ['¿El precio puede cambiar durante la obra?', 'No. Trabajamos con presupuesto fijo, sin pagos ocultos ni cargos adicionales.'],
    ],
  },
  {
    out: 'reforma-locales-valencia.html', key: 'local', img: 'assets/img/obra/oficina.jpg', agent: true,
    title: 'Reforma de locales y negocios en Valencia | Gridalta',
    desc: 'Reforma de locales comerciales, oficinas, bares y peluquerías en Valencia. Plazo por contrato y presupuesto fijo. Pide precio para tu negocio por WhatsApp.',
    crumb: 'Locales y negocios', eyebrow: 'Para negocios',
    h1: 'Reforma de locales <em>y negocios</em> en Valencia',
    lead: 'Tiendas, bares, cafeterías, peluquerías y oficinas. Cada día de obra es un día sin facturar: por eso fijamos el plazo por contrato y el presupuesto no cambia a mitad de camino.',
    bullets: ['Plazo fijado por contrato', 'Presupuesto fijo antes de empezar', 'Mobiliario a medida de fabricación propia'],
    includes: [
      ['Proyecto y presupuesto fijo', 'Sabes cuánto pagas antes de empezar.'],
      ['Plazo por contrato', 'Sabes qué día abres.'],
      ['Demolición y redistribución', 'Adaptamos el espacio a tu actividad.'],
      ['Electricidad y fontanería', 'Instalaciones nuevas para tu negocio.'],
      ['Suelos y revestimientos', 'Materiales resistentes al uso intensivo.'],
      ['Mostradores y mobiliario', 'A medida, de fabricación propia.'],
      ['Paneles de pared', 'Bambú: montaje en 1–2 días sin pintar.'],
      ['Entrega lista para abrir', 'Limpio y a punto el día acordado.'],
    ],
    price: ['Reforma integral de local en Valencia', '500 – 900 €/m²', 'Rango orientativo del mercado en Valencia (2026). Actualizaciones parciales desde unos 3.000 €. Tu precio exacto queda fijado antes de empezar.'],
    gallery: [['assets/img/obra/oficina.jpg', 'Oficina', true], ['assets/img/obra/paneles-1.jpg', 'Paneles de bambú'], ['assets/img/obra/armario.jpg', 'Mobiliario a medida'], ['assets/img/obra/integral-2.jpg', 'Iluminación'], ['assets/img/obra/paneles-2.jpg', 'Revestimiento'], ['assets/img/obra/cocina-4.jpg', 'Barra y encimera']],
    faq: [
      ['¿Cuánto cuesta reformar un local en Valencia?', 'Una reforma integral de local suele moverse entre 500 y 900 €/m²; las actualizaciones parciales parten de unos 3.000 €. Mándanos fotos y metros por WhatsApp para una primera estimación.'],
      ['¿Cuánto tiempo tendré el local cerrado?', 'El plazo exacto va en el presupuesto y lo garantizamos por contrato, para que puedas planificar la apertura.'],
      ['¿Hacéis el mobiliario del local?', 'Sí. Mostradores, estanterías y muebles a medida en nuestra propia producción.'],
      ['¿Colaboráis con agencias inmobiliarias?', 'Sí. Tenemos un programa para agentes: comisión por cliente, visita de medición gratuita e informes con fotos durante la obra.'],
    ],
  },
];

function servicePage(p) {
  const incl = p.includes.map(([t, d]) => `
        <li class="reveal">${I.check}<div><b>${t}</b><span>${d}</span></div></li>`).join('');
  const others = OTHERS.filter(([h]) => h !== p.out).map(([h, l]) =>
    `<a class="other" href="${h}">${l}${I.arrow}</a>`).join('');
  return `
<main id="main">

  <section class="hero">
    <div class="wrap">
      <div>
        <nav class="crumbs" aria-label="Migas de pan"><a href="index.html">Inicio</a><span aria-hidden="true">/</span><span>${p.crumb}</span></nav>
        <span class="hero__badge"><i></i>${p.eyebrow}</span>
        <h1>${p.h1}</h1>
        <p class="hero__lead">${p.lead}</p>
        <div class="hero__actions">
          ${waBtn(p.key, 'Pedir precio por WhatsApp', 'btn--lg')}
          ${callBtn('btn--lg')}
        </div>
        <ul class="checks" style="margin-bottom:0">
          ${p.bullets.map((b) => `<li>${I.check}<div><b>${b}</b></div></li>`).join('\n          ')}
        </ul>
      </div>
      <div class="hero__media">
        <div class="hero__img"><img src="${p.img}" alt="${esc(p.crumb)} en Valencia — Gridalta" fetchpriority="high"></div>
        <div class="float-card float-card--a"><span class="ic">${I.shield}</span><span><b>Garantía oficial</b>en trabajos y materiales</span></div>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="wrap">
      ${sectionHead('Qué incluye', 'Todo lo que hacemos <em>por ti</em>', 'Un solo equipo se encarga de todo. Tú solo eliges acabados.', 'head--split')}
      <ul class="incl">${incl}
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="price-box reveal">
        <div>
          <span class="eyebrow">Precio orientativo</span>
          <h2 class="h2" style="font-size:clamp(22px,2.6vw,28px)">${p.price[0]}</h2>
          <div class="price__val" style="margin-top:10px">${p.price[1]}</div>
          <p class="note" style="margin-top:12px">${I.info}<span>${p.price[2]}</span></p>
        </div>
        ${waBtn(p.key, 'Mi precio exacto', 'btn--lg')}
      </div>
    </div>
  </section>

  ${p.packs ? packsBlock() : ''}

  <section class="section section--alt">
    <div class="wrap">
      ${sectionHead('Obras', 'Trabajos <em>reales</em> de nuestro equipo', '', '')}
      ${gallery(p.gallery)}
    </div>
  </section>

  ${p.agent ? `<section class="section section--dark"><div class="wrap">${agentBlock()}</div></section>` : whyBlock()}
  ${stepsBlock()}
  ${faqBlock(p.faq)}

  <section class="section" style="padding-bottom:0">
    <div class="wrap">
      ${sectionHead('Otros servicios', 'También <em>reformamos</em>', '', '')}
      <div class="others">${others}</div>
    </div>
  </section>

  ${ctaBlock(p.key)}

</main>`;
}

/* ------------------------------------------------------------ юридичні */
const LEGAL_NOTE = `<div class="prose-note"><b>Pendiente de completar:</b> CIF, domicilio social y datos del Registro Mercantil. Revisar con un asesor antes de publicar.</div>`;

const aviso = () => `
<main id="main"><section class="section"><div class="wrap prose">
  <h1>Aviso legal</h1>
  ${LEGAL_NOTE}
  <h2>Datos identificativos</h2>
  <p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa:</p>
  <table><tbody>
    <tr><th>Titular</th><td>Gridalta Grupo, S.L.</td></tr>
    <tr><th>CIF</th><td>[pendiente]</td></tr>
    <tr><th>Domicilio</th><td>[pendiente], Valencia (España)</td></tr>
    <tr><th>Correo</th><td><a href="mailto:${EMAIL}">${EMAIL}</a></td></tr>
    <tr><th>Teléfono</th><td>${PHONE_HUMAN}</td></tr>
  </tbody></table>
  <h2>Objeto</h2>
  <p>Este sitio web da a conocer los servicios de reforma de Gridalta Grupo, S.L. y facilita el contacto con clientes.</p>
  <h2>Condiciones de uso</h2>
  <p>El acceso al sitio implica la aceptación de estas condiciones. El usuario se compromete a hacer un uso adecuado de los contenidos.</p>
  <h2>Propiedad intelectual</h2>
  <p>Los textos, fotografías, marcas y logotipos de este sitio pertenecen a Gridalta Grupo, S.L. o a terceros que han autorizado su uso. Queda prohibida su reproducción sin autorización.</p>
  <h2>Responsabilidad</h2>
  <p>Los precios mostrados son orientativos. El único documento vinculante es el presupuesto aceptado por escrito.</p>
  <h2>Legislación aplicable</h2>
  <p>Estas condiciones se rigen por la legislación española.</p>
</div></section></main>`;

const privacidad = () => `
<main id="main"><section class="section"><div class="wrap prose">
  <h1>Privacidad y cookies</h1>
  ${LEGAL_NOTE}
  <h2>Responsable</h2>
  <p>Gridalta Grupo, S.L. · <a href="mailto:${EMAIL}">${EMAIL}</a> · ${PHONE_HUMAN}.</p>
  <h2>Qué datos tratamos</h2>
  <p>Los que nos facilitas al escribirnos por WhatsApp, teléfono o correo (nombre, teléfono, descripción y fotos de la reforma), con la única finalidad de responder a tu consulta, preparar el presupuesto y, si nos contratas, gestionar la obra.</p>
  <h2>Base jurídica</h2>
  <p>Tu consentimiento al contactarnos (art. 6.1.a RGPD) y la ejecución de medidas precontractuales o del contrato (art. 6.1.b RGPD).</p>
  <h2>Conservación</h2>
  <p>Las consultas no contratadas se conservan un máximo de doce meses; los datos de clientes, durante los plazos legales aplicables.</p>
  <h2>WhatsApp</h2>
  <p>Si nos escribes por WhatsApp, el servicio lo presta WhatsApp Ireland Ltd., sujeto a su propia política de privacidad.</p>
  <h2>Tus derechos</h2>
  <p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a <a href="mailto:${EMAIL}">${EMAIL}</a>, y reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">aepd.es</a>).</p>
  <h2 id="cookies">Cookies</h2>
  <p>Este sitio no utiliza cookies de analítica ni de publicidad. Solo carga las fuentes tipográficas de Google Fonts.</p>
</div></section></main>`;

/* ------------------------------------------------------------ JSON-LD */
const jsonld = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "name": "Gridalta",
  "legalName": "Gridalta Grupo S.L.",
  "description": "Reformas en Valencia: baños, cocinas, reformas integrales y locales comerciales. Plazos garantizados, presupuesto fijo y garantía oficial.",
  "url": "${SITE}",
  "logo": "${SITE}assets/img/marca.png",
  "image": "${SITE}assets/img/hero.jpg",
  "telephone": "${PHONE_TEL}",
  "email": "${EMAIL}",
  "sameAs": ["https://www.instagram.com/${INSTAGRAM}/"],
  "address": { "@type": "PostalAddress", "addressLocality": "Valencia", "addressRegion": "Comunidad Valenciana", "addressCountry": "ES" },
  "areaServed": { "@type": "City", "name": "Valencia" }
}
</script>`;

/* ------------------------------------------------------------ збірка */
function write(out, html) {
  fs.writeFileSync(path.join(ROOT, out), html);
  console.log('→', out);
}

write('index.html',
  head({ title: 'Reformas en Valencia sin estrés y sin retrasos | Gridalta',
         desc: 'Reformas en Valencia: baños, cocinas, reformas integrales y locales. Plazos garantizados, presupuesto fijo y garantía oficial. Presupuesto por WhatsApp.',
         canon: '', jsonld }) + header('') + homeBody() + footer());

for (const p of PAGES) {
  write(p.out, head({ title: p.title, desc: p.desc, canon: p.out }) + header(p.out) + servicePage(p) + footer());
}

write('aviso-legal.html', head({ title: 'Aviso legal | Gridalta', desc: 'Datos identificativos y condiciones de uso del sitio web de Gridalta Grupo S.L.', canon: 'aviso-legal.html' }) + header('') + aviso() + footer());
write('privacidad.html', head({ title: 'Privacidad y cookies | Gridalta', desc: 'Cómo trata Gridalta Grupo S.L. los datos personales de quienes nos contactan.', canon: 'privacidad.html' }) + header('') + privacidad() + footer());

// Карта сайту
const today = new Date().toISOString().slice(0, 10);
const urls = ['', ...PAGES.map((p) => p.out), 'aviso-legal.html', 'privacidad.html'];
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  `\n</urlset>\n`);
console.log('→ sitemap.xml');
