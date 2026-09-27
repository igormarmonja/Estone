/* Збирає лист-розсилку: node email/build.mjs
   → email/dist/<мова>.html (розсилка evostone.es)
   → email/dist/esputnik-dyzainery-uk.html (лист для дизайнерів під eSputnik)
   Для локального перегляду з картинками з email/img/:
   IMG_BASE=../img/ node email/build.mjs */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGS } from './src/data.mjs';
import { render } from './src/template.mjs';
import { renderPartners, PARTNERS_SUBJECT } from './src/esputnik-partners.mjs';

const root = dirname(fileURLToPath(import.meta.url));
mkdirSync(join(root, 'dist'), { recursive: true });

for (const l of LANGS) {
  const { default: t } = await import(`./src/content/${l.code}.mjs`);
  const html = render(t, l.code);
  writeFileSync(join(root, 'dist', `${l.code}.html`), html);
  const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
  console.log(`✓ dist/${l.code}.html  ${kb} KB  «${t.subject}»`);
  if (kb > 100) console.warn('  ⚠ понад 100 KB: Gmail обріже лист');
}

const partners = renderPartners();
writeFileSync(join(root, 'dist', 'esputnik-dyzainery-uk.html'), partners);
const pkb = (Buffer.byteLength(partners) / 1024).toFixed(1);
console.log(`✓ dist/esputnik-dyzainery-uk.html  ${pkb} KB  «${PARTNERS_SUBJECT}»`);
if (pkb > 100) console.warn('  ⚠ понад 100 KB: Gmail обріже лист');
