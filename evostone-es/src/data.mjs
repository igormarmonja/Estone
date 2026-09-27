/* ─────────────────────────────────────────────────────────────
   Спільні дані для всіх мов: бренд, контакти, ціни «від», фото.
   Тексти — у src/content/<мова>.mjs.
   Після правок: node build.mjs
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
  geo: { lat: 38.3847, lng: -0.7711 },   // TODO: точні координати цеху
  uaSite: 'https://estone.com.ua',
};

/* Мови. Порядок = порядок у перемикачі.
   Щоб додати мову (uk, pl, ca, …): створити src/content/<code>.mjs і дописати рядок. */
export const LANGS = [
  { code: 'es', path: '/',    label: 'ES', hreflang: 'es-ES' },
  { code: 'en', path: '/en/', label: 'EN', hreflang: 'en' },
  { code: 'ru', path: '/ru/', label: 'RU', hreflang: 'ru' },
];

/* Ціни «від», у євро. ⚠ ОРІЄНТОВНІ — перевірити перед запуском.
   null = показується «під запит». */
export const PRICES = {
  kitchen:  { from: 290, unit: 'm2' },
  bath:     { from: 390, unit: 'pc' },
  cladding: { from: 120, unit: 'm2' },
  stairs:   { from: 180, unit: 'step' },
  furniture:{ from: 650, unit: 'pc' },
  sculpture:null,
  cutting:  { from: 25,  unit: 'ml' },
  waterjet: null,
};

/* Продукти лендингу. Фото: поклади файл з цим іменем у assets/img/ — заглушка зникне. */
export const PRODUCTS = [
  { id: 'kitchen',   img: 'p-kitchen.jpg',   gallery: ['p-kitchen-2.jpg', 'p-kitchen-3.jpg'] },
  { id: 'bath',      img: 'ka-07.jpg',       gallery: ['le-01.jpg', 'mo-03.jpg'] },
  { id: 'cladding',  img: 'p-cladding.jpg',  gallery: ['p-cladding-2.jpg', 'p-cladding-3.jpg'] },
  { id: 'stairs',    img: 'p-stairs.jpg',    gallery: ['p-stairs-2.jpg', 'p-stairs-3.jpg'] },
  { id: 'furniture', img: 'p-furniture.jpg', gallery: ['p-furniture-2.jpg', 'p-furniture-3.jpg'] },
  { id: 'sculpture', img: 'p-sculpture.jpg', gallery: ['p-sculpture-2.jpg', 'p-sculpture-3.jpg'] },
  { id: 'cutting',   img: 'p-cutting.jpg',   gallery: ['p-cutting-2.jpg', 'p-cutting-3.jpg'] },
  { id: 'waterjet',  img: 'p-waterjet.jpg',  gallery: ['p-waterjet-2.jpg', 'p-waterjet-3.jpg'] },
];

/* Матеріали (ключі для підписів — у content/<мова>.mjs → materialNames) */
export const MATERIALS = [
  { id: 'quartz',    img: 'm-quartz.jpg',    tone: 'quartz' },
  { id: 'porcelain', img: 'm-porcelain.jpg', tone: 'porcelain' },
  { id: 'natural',   img: 'm-natural.jpg',   tone: 'natural' },
  { id: 'solid',     img: 'm-solid.jpg',     tone: 'solid' },
];

/* Серії раковин — фото вже є з українського сайту */
export const SERIES = [
  { id: 'leonardo', cover: 'le-02.jpg' },
  { id: 'monet',    cover: 'mo-01.jpg' },
  { id: 'kazimir',  cover: 'ka-06.jpg' },
  { id: 'salvador', cover: 'sa-04.jpg' },
];

export const SINKS = [
  { code: 'LE-01', series: 'leonardo', mat: ['solid', 'metal', 'quartz'] },
  { code: 'LE-02', series: 'leonardo', mat: ['natural'] },
  { code: 'LE-03', series: 'leonardo', mat: ['solid', 'porcelain', 'quartz'] },
  { code: 'LE-04', series: 'leonardo', mat: ['natural', 'quartz', 'glass'] },
  { code: 'LE-05', series: 'leonardo', mat: ['glass', 'natural', 'quartz'] },
  { code: 'LE-06', series: 'leonardo', mat: ['natural'] },
  { code: 'MO-01', series: 'monet',    mat: ['solid'] },
  { code: 'MO-02', series: 'monet',    mat: ['solid'] },
  { code: 'MO-03', series: 'monet',    mat: ['solid'] },
  { code: 'MO-04', series: 'monet',    mat: ['solid', 'porcelain'] },
  { code: 'MO-05', series: 'monet',    mat: ['solid', 'quartz', 'porcelain'] },
  { code: 'KA-01', series: 'kazimir',  mat: ['solid', 'quartz', 'porcelain'] },
  { code: 'KA-02', series: 'kazimir',  mat: ['solid', 'quartz', 'porcelain'] },
  { code: 'KA-03', series: 'kazimir',  mat: ['solid', 'quartz'] },
  { code: 'KA-04', series: 'kazimir',  mat: ['solid', 'quartz', 'porcelain'] },
  { code: 'KA-05', series: 'kazimir',  mat: ['solid', 'quartz', 'porcelain'] },
  { code: 'KA-06', series: 'kazimir',  mat: ['natural'] },
  { code: 'KA-07', series: 'kazimir',  mat: ['porcelain'] },
  { code: 'KA-08', series: 'kazimir',  mat: ['solid', 'porcelain'] },
  { code: 'SA-01', series: 'salvador', mat: ['solid'] },
  { code: 'SA-02', series: 'salvador', mat: ['solid'] },
  { code: 'SA-03', series: 'salvador', mat: ['solid', 'porcelain'] },
  { code: 'SA-04', series: 'salvador', mat: ['solid'] },
];

/* Кроки процесу й об'єкти — тільки фото; підписи в content */
export const PROCESS_IMG = ['s-measure.jpg', 's-design.jpg', 's-workshop.jpg', 's-install.jpg'];
export const PROJECT_IMG = ['w-01.jpg', 'w-02.jpg', 'w-03.jpg', 'w-04.jpg', 'w-05.jpg', 'w-06.jpg'];
