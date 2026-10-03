/* Збирає статичні сторінки: node build.mjs
   Головна: index.html (ES), en/, ru/, uk/
   Посадкові й галерея: ES у корені (/<slug>/, /galeria/), RU і UK у /ru/…, /uk/…
   + sitemap.xml (з hreflang і картинками галереї), robots.txt */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, LANGS, LANDING_LANGS } from './src/data.mjs';
import { render } from './src/template.mjs';
import { renderLanding } from './src/landing-template.mjs';
import { renderGallery } from './src/gallery-template.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const write = (rel, html) => { const out = join(root, rel); mkdirSync(dirname(out), { recursive: true }); writeFileSync(out, html); };

/* Посадкові/галерея кожної мови */
const LP = {};
for (const L of LANDING_LANGS) {
  const m = await import(`./src/landings/${L.code}.mjs`);
  const gp = join(root, `src/gallery/${L.code}.json`);
  LP[L.code] = { pages: m.pages, common: m.common, gallery: existsSync(gp) ? JSON.parse(readFileSync(gp, 'utf8')) : [] };
}

/* Головні */
for (const l of LANGS) {
  const { default: t } = await import(`./src/content/${l.code}.mjs`);
  write(join(l.path, 'index.html'), render(t, l.code, LP[l.code] || null));
  console.log('✓', l.path);
}

for (const L of LANDING_LANGS) {
  const { default: t } = await import(`./src/content/${L.code}.mjs`);
  const { pages, common, gallery } = LP[L.code];
  for (const p of pages) write(`${L.prefix}${p.slug}/index.html`, renderLanding(p, pages, common, t, L, LANDING_LANGS));
  if (gallery.length) write(`${L.prefix}galeria/index.html`, renderGallery(gallery, pages, t, common, L, LANDING_LANGS));
  console.log(`✓ ${L.code}: ${pages.length} посадкових, галерея ${gallery.length} фото`);
}

/* sitemap */
const today = new Date().toISOString().slice(0, 10);
const url = (loc, alts, extra = '') => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
${alts}${extra}
  </url>`;
const mainAlts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${SITE.domain}${l.path}"/>`).join('\n');
const lpAlts = (path) => LANDING_LANGS.map((L) => `    <xhtml:link rel="alternate" hreflang="${L.hreflang}" href="${SITE.domain}/${L.prefix}${path}"/>`).join('\n');
const urls = [
  ...LANGS.map((l) => url(SITE.domain + l.path, mainAlts)),
  ...LANDING_LANGS.flatMap((L) => LP[L.code].pages.map((p) => url(`${SITE.domain}/${L.prefix}${p.slug}/`, lpAlts(p.slug + '/')))),
  ...LANDING_LANGS.filter((L) => LP[L.code].gallery.length).map((L) => url(`${SITE.domain}/${L.prefix}galeria/`, lpAlts('galeria/'),
    '\n' + LP[L.code].gallery.map((g) => `    <image:image><image:loc>${SITE.domain}/assets/img/galeria/${g.file}</image:loc><image:title>${g.title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</image:title></image:image>`).join('\n'))),
];
writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`);
writeFileSync(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.domain}/sitemap.xml\n`);
console.log('✓ sitemap.xml (' + urls.length + ' URL), robots.txt');
