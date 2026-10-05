/* Готує картинки листа в email/img/ з фото сайту (assets/img/) і логотипа.
   Запуск один раз після зміни фото: node email/make-images.mjs
   Потрібен Playwright (глобальний) з Chromium. */
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(join(execSync('npm root -g').toString().trim(), 'playwright'));
const root = dirname(fileURLToPath(import.meta.url));
const site = join(root, '..', 'assets', 'img');
const out = (f) => join(root, 'img', f);
const dataUrl = (f) => `data:image/jpeg;base64,${readFileSync(join(site, f)).toString('base64')}`;

const LOGO = '<path d="M0 0h295v45H120v45H0z"/><path d="M0 135h295v45H120v45H0z"/><path d="M0 255h295v45H0z"/>';
const WA = 'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.2-.2-.2-.5-.3Z';

const JOBS = [
  // Hero: фото + затемнення знизу (як scrim на лендингу), щоб текст читався навіть там, де CSS-фон не працює
  { file: 'hero.jpg', w: 600, h: 680, html: `<div style="position:absolute;inset:0;background:url(${dataUrl('cover.jpg')}) center 40%/cover"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(40,28,21,.55) 0%,rgba(40,28,21,.15) 22%,rgba(40,28,21,.35) 45%,rgba(56,40,31,.92) 72%,#594133 100%)"></div>` },
  ...[['s-leonardo.jpg', 'le-02.jpg'], ['s-monet.jpg', 'mo-01.jpg'], ['s-kazimir.jpg', 'ka-06.jpg'], ['s-salvador.jpg', 'sa-04.jpg']]
    .map(([file, src]) => ({ file, w: 252, h: 315, html: `<div style="position:absolute;inset:0;background:url(${dataUrl(src)}) center/cover"></div>` })),
  // Лист для дизайнерів (eSputnik): esputnik-partners.mjs
  ...[
    ['p-hero.jpg', 'cover.jpg', 600, 420, 'center 55%'],
    ['p-alaior-white.jpg', 'ka-03.jpg', 252, 290, 'center'],
    ['p-alaior-beige.jpg', 'ka-01.jpg', 252, 290, 'center 70%'],
    ['p-marble.jpg', 'le-06.jpg', 520, 360, 'center 65%'],
    ['p-viola.jpg', 'le-02.jpg', 600, 340, 'center 72%'],
    ['p-sand.jpg', 'drain-black.jpg', 600, 340, 'center 30%'],
    ['p-tops.jpg', 'sa-03.jpg', 163, 210, 'center'],
    ['p-sinks.jpg', 'ka-05.jpg', 163, 210, 'center'],
    ['p-furniture.jpg', 'ka-08.jpg', 163, 210, 'center'],
    ['p-cat-1.jpg', 'sa-01.jpg', 163, 163, 'center 60%'],
    ['p-cat-2.jpg', 'mo-02.jpg', 163, 163, 'center 60%'],
    ['p-cat-3.jpg', 'le-04.jpg', 163, 163, 'center 70%'],
  ].map(([file, src, w, h, pos]) => ({ file, w, h, html: `<div style="position:absolute;inset:0;background:url(${dataUrl(src)}) ${pos}/cover"></div>` })),
  // Заглушки під фото, яких ще немає: щоб замінити, покласти фото з цим іменем у email/img/
  ...[['p-why.jpg', 520, 300], ['p-slot-1.jpg', 252, 290], ['p-slot-2.jpg', 252, 290], ['p-slot-3.jpg', 252, 290], ['p-slot-4.jpg', 252, 290]]
    .map(([file, w, h]) => ({ file, w, h, html: `<div style="position:absolute;inset:0;background:#D9C3B0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;font-family:'Fixel Display',sans-serif;color:#8A4F2A;line-height:1">
      <div style="position:absolute;inset:10px;border:1px dashed rgba(138,79,42,.45);border-radius:6px"></div>
      <div style="font-size:22px;letter-spacing:.2em">ФОТО</div>
      <div style="font-family:'Fixel Text',sans-serif;font-size:12px;letter-spacing:.06em;color:#7a5e4d">${file}</div></div>` })),
  { file: 'logo-light.png', w: 22, h: 22, png: true, html: `<svg viewBox="0 0 295 300" width="22" height="22" fill="#F5EDE3">${LOGO}</svg>` },
  { file: 'wa-light.png', w: 16, h: 16, png: true, html: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#F5EDE3"><path d="${WA}"/></svg>` },
  { file: 'wa-dark.png', w: 16, h: 16, png: true, html: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#594133"><path d="${WA}"/></svg>` },
];

const browser = await chromium.launch();
for (const j of JOBS) {
  const page = await browser.newPage({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: 2 });
  await page.setContent(`<body style="margin:0;background:transparent"><div style="position:relative;width:${j.w}px;height:${j.h}px;line-height:0">${j.html}</div></body>`);
  await page.screenshot(j.png
    ? { path: out(j.file), omitBackground: true }
    : { path: out(j.file), type: 'jpeg', quality: 78 });
  await page.close();
  console.log('✓ img/' + j.file);
}
await browser.close();
