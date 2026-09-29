/* Збирає статичні сторінки: node build.mjs
   index.html (ES), en/index.html, ru/index.html,
   посадкові <slug>/index.html (src/landings/es.mjs), sitemap.xml */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, LANGS } from './src/data.mjs';
import { render } from './src/template.mjs';
import { renderLanding } from './src/landing-template.mjs';
import { pages as landings, common as landingCommon } from './src/landings/es.mjs';

const root = dirname(fileURLToPath(import.meta.url));

for (const l of LANGS) {
  const { default: t } = await import(`./src/content/${l.code}.mjs`);
  const out = join(root, l.path, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(t, l.code));
  console.log('✓', l.path);
}

/* Посадкові сторінки (ES) — тексти меню/форми/футера беремо з головної */
const { default: es } = await import('./src/content/es.mjs');
for (const p of landings) {
  const out = join(root, p.slug, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, renderLanding(p, landings, landingCommon, es));
}
console.log('✓', landings.length, 'посадкових сторінок');

const today = new Date().toISOString().slice(0, 10);
const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${SITE.domain}${l.path}"/>`).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map((l) => `  <url>
    <loc>${SITE.domain}${l.path}</loc>
    <lastmod>${today}</lastmod>
${alts}
  </url>`).join('\n')}
${landings.map((p) => `  <url>
    <loc>${SITE.domain}/${p.slug}/</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n')}
</urlset>
`;
writeFileSync(join(root, 'sitemap.xml'), sitemap);
writeFileSync(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.domain}/sitemap.xml\n`);
console.log('✓ sitemap.xml, robots.txt');
