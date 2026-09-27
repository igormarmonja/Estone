/* ─────────────────────────────────────────────────────────────
   Спільні дані листа для всіх мов: бренд, контакти, кольори, мерж-теги.
   Тексти — у src/content/<мова>.mjs.
   Після правок: node email/build.mjs
   ───────────────────────────────────────────────────────────── */

export const SITE = {
  domain: 'https://evostone.es',
  brand: 'ESTONE',
  phone: '+34652692097',
  phoneDisplay: '+34 652 69 20 97',
  whatsapp: 'https://wa.me/34652692097',
  email: 'info@estone.com.ua',          // TODO: поштова скринька на evostone.es
  address: "L'Estació de Novelda, 03660 Novelda, Alicante",
  mapUrl: 'https://maps.google.com/?q=L%27Estaci%C3%B3+de+Novelda,+Alicante',
};

/* Мови листа. path — сторінка лендингу, куди ведуть посилання. */
export const LANGS = [
  { code: 'es', path: '/',    label: 'ES' },
  { code: 'en', path: '/en/', label: 'EN' },
  { code: 'ru', path: '/ru/', label: 'RU' },
];

/* Розсилка: номер випуску й мітка для UTM. Міняємо перед кожною розсилкою. */
export const CAMPAIGN = {
  id: '2026-10-taller',
  issue: '01',
  date: { es: 'Octubre 2026', en: 'October 2026', ru: 'Октябрь 2026' },
};

/* Звідки поштовий клієнт бере картинки. Лист не може посилатися на відносні
   шляхи: папку email/img/ треба викласти на сайт (або в ESP) і вказати тут URL.
   Для локального перегляду: IMG_BASE=../img/ node email/build.mjs */
export const IMG_BASE = process.env.IMG_BASE || 'https://evostone.es/email/img/';

/* Мерж-теги сервісу розсилки. Зараз синтаксис Brevo / SendPulse-подібний.
   Mailchimp: firstName '*|FNAME|*', unsubscribe '*|UNSUB|*', webview '*|ARCHIVE|*'. */
export const MERGE = {
  firstName: '{{ contact.FIRSTNAME }}',
  unsubscribe: '{{ unsubscribe }}',
  webview: '{{ mirror }}',
};

/* Палітра = токени лендингу (assets/css/style.css). Пошта не розуміє
   CSS-змінних і rgba поверх фону, тому «приглушені» кольори тут уже змішані з фоном. */
export const C = {
  brand: '#8A4F2A',
  sand: '#E3D5C5',
  sand2: '#D9C3B0',
  dark: '#594133',
  paper: '#F5EDE3',
  card: '#FFFBF5',
  // тема paper / sand
  fg: '#594133',
  mute: '#917F72',
  line: '#DCD2C7',
  lineSand: '#CDBBA9',
  // тема dark / brand
  fgD: '#F5EDE3',
  muteD: '#C6B9AE',
  lineD: '#786356',
  muteB: '#E4CDBB',
  lineB: '#A06E4F',
};

/* Серії раковин для блоку «Колекція» (фото — email/img/, робить make-images.mjs) */
export const SERIES = [
  { id: 'leonardo', img: 's-leonardo.jpg', models: 6, code: 'LE' },
  { id: 'monet',    img: 's-monet.jpg',    models: 5, code: 'MO' },
  { id: 'kazimir',  img: 's-kazimir.jpg',  models: 8, code: 'KA' },
  { id: 'salvador', img: 's-salvador.jpg', models: 4, code: 'SA' },
];

/* Ціни «від», у євро — ті самі, що на лендингу. ⚠ ОРІЄНТОВНІ. */
export const PRICES = {
  kitchen:  { from: 290, unit: 'm2' },
  bath:     { from: 390, unit: 'pc' },
  cladding: { from: 120, unit: 'm2' },
  stairs:   { from: 180, unit: 'step' },
};
