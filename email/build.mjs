/* Збирає лист-розсилку: node email/build.mjs
   → email/dist/<мова>.html (готовий HTML для сервісу розсилки)
   Для локального перегляду з картинками з email/img/:
   IMG_BASE=../img/ node email/build.mjs */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGS } from './src/data.mjs';
import { render } from './src/template.mjs';

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
