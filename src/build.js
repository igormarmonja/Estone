const fs = require('fs');
const P = __dirname + '/parts/';

const head   = fs.readFileSync(P + 'head.html', 'utf8');
const header = fs.readFileSync(P + 'header.html', 'utf8');
const footer = fs.readFileSync(P + 'footer.html', 'utf8');

const pages = [
  { out: 'index.html',       body: 'body-index.html',      canon: '',                active: null,
    title: 'Gridalta | Reformas integrales en Valencia y su provincia',
    desc: 'Empresa de reformas en Valencia: reformas integrales, cocinas, baños, mantenimiento y fachadas. Equipo propio, presupuesto cerrado y 3 años de garantía.',
    hero: true, heroLight: true },
  { out: 'servicios.html',   body: 'body-servicios.html',  canon: 'servicios.html',  active: 'A_SERV',
    title: 'Servicios de reforma y mantenimiento | Gridalta',
    desc: 'Reformas integrales, cocinas a medida, baños, mantenimiento y urgencias, fachadas e instalaciones en Valencia y su provincia.' },
  { out: 'proyectos.html',   body: 'body-proyectos.html',  canon: 'proyectos.html',  active: 'A_PROY',
    title: 'Proyectos de reforma entregados | Gridalta',
    desc: 'Viviendas, cocinas, baños, fachadas y locales reformados por Gridalta en Valencia, Godella, Paterna, Gandía y Torrent.' },
  { out: 'empresa.html',     body: 'body-empresa.html',    canon: 'empresa.html',    active: 'A_EMP',
    title: 'La empresa: equipo propio y taller de piedra | Gridalta',
    desc: 'Gridalta nació en 2014 como taller de encimeras. Hoy somos 24 profesionales en plantilla que reforman viviendas en Valencia y su provincia.' },
  { out: 'contacto.html',    body: 'body-contacto.html',   canon: 'contacto.html',   active: 'A_CON',
    title: 'Contacto y presupuesto gratuito | Gridalta',
    desc: 'Pide presupuesto sin compromiso para tu reforma en Valencia y su provincia. Visita en 48 horas y presupuesto cerrado.' },
  { out: 'aviso-legal.html', body: 'body-aviso.html',      canon: 'aviso-legal.html', active: null,
    title: 'Aviso legal | Gridalta',
    desc: 'Datos identificativos y condiciones de uso del sitio web de Gridalta Grupo, S.L.' },
  { out: 'privacidad.html',  body: 'body-privacidad.html', canon: 'privacidad.html', active: null,
    title: 'Política de privacidad y cookies | Gridalta',
    desc: 'Cómo trata Gridalta Grupo, S.L. los datos personales recogidos a través de este sitio web, conforme al RGPD y la LOPDGDD.' },
];

// Datos estructurados: solo en la portada
const jsonld = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "name": "Gridalta Grupo",
  "description": "Empresa de reformas integrales, cocinas, baños y mantenimiento en Valencia y su provincia.",
  "url": "https://www.gridalta.es/",
  "logo": "https://www.gridalta.es/assets/img/marca.png",
  "image": "https://www.gridalta.es/assets/img/hero.jpg",
  "telephone": "+34600000000",
  "email": "hola@gridalta.es",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Avda. del Puerto 142",
    "addressLocality": "Valencia",
    "postalCode": "46022",
    "addressRegion": "Valencia",
    "addressCountry": "ES"
  },
  "areaServed": [
    "Valencia", "Torrent", "Paterna", "Godella", "Burjassot", "Mislata",
    "Alboraya", "Sagunto", "Gandía", "Alzira", "Sueca", "Xàtiva"
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "128"
  }
}
</script>`;

pages.forEach(function (page) {
  let html = head
    .replace(/{{TITLE}}/g, page.title)
    .replace(/{{DESC}}/g, page.desc)
    .replace(/{{CANON}}/g, page.canon);

  if (page.out === 'index.html') {
    // Функція-замінник, а не рядок: інакше JS тлумачить $$ у JSON-LD
    // як екранований $ і псує значення (наприклад, priceRange).
    html = html.replace('</head>', () => jsonld + '\n</head>');
  }

  // Todas las páginas abren con hero o banner oscuro: texto claro hasta que la
  // cabecera se fija sobre fondo papel (is-stuck).
  let nav = header.replace('{{HEROCLASS}}',
    page.heroLight ? 'masthead--over-light' : 'masthead--over-hero');
  ['A_SERV', 'A_PROY', 'A_EMP', 'A_CON'].forEach(function (token) {
    nav = nav.replace('{{' + token + '}}', page.active === token ? ' aria-current="page"' : '');
  });

  const body = fs.readFileSync(P + page.body, 'utf8');
  fs.writeFileSync(__dirname + '/../' + page.out, html + nav + '\n' + body + '\n' + footer);
  console.log('→', page.out);
});
