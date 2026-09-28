/* ─────────────────────────────────────────────────────────────
   Спільні дані для всіх мов: бренд, контакти, фото, тарифи калькулятора.
   Тексти — у src/content/<мова>.mjs.
   Після правок: node build.mjs
   ───────────────────────────────────────────────────────────── */

export const SITE = {
  domain: 'https://gridalta.es',
  brand: 'GRIDALTA',
  brandSub: 'reformas integrales',
  phone: '+34666242857',
  phoneDisplay: '+34 666 242 857',
  phone2: '+34652692097',
  phone2Display: '+34 652 692 097',
  whatsapp: 'https://wa.me/34666242857',
  email: 'info@gridalta.es',
  address: 'Calle Formentera 22, 46713 Bellreguard, Valencia',
  street: 'Calle Formentera 22',
  city: 'Bellreguard',
  postalCode: '46713',
  mapUrl: 'https://maps.google.com/?q=Calle+Formentera+22,+46713+Bellreguard,+Valencia',
  geo: { lat: 38.9458, lng: -0.1633 },
};

/* Мови. Порядок = порядок у перемикачі. */
export const LANGS = [
  { code: 'es', path: '/',    label: 'ES', hreflang: 'es-ES' },
  { code: 'en', path: '/en/', label: 'EN', hreflang: 'en' },
  { code: 'uk', path: '/ua/', label: 'UA', hreflang: 'uk' },
];

/* Послуги (горизонтальна галерея + drawer). Фото — у assets/img/. */
export const SERVICES = [
  { id: 'vivienda', img: 's-vivienda.jpg', gallery: ['s-vivienda-2.jpg', 's-vivienda-3.jpg'] },
  { id: 'cocina',   img: 's-cocina.jpg',   gallery: ['s-cocina-2.jpg', 's-cocina-3.jpg'] },
  { id: 'bano',     img: 's-bano.jpg',     gallery: ['s-bano-2.jpg', 's-bano-3.jpg'] },
  { id: 'villa',    img: 's-villa.jpg',    gallery: ['s-villa-2.jpg', 's-villa-3.jpg'] },
  { id: 'local',    img: 's-local.jpg',    gallery: ['s-local-2.jpg', 's-local-3.jpg'] },
  { id: 'alquiler', img: 's-alquiler.jpg', gallery: ['s-alquiler-2.jpg', 's-alquiler-3.jpg'] },
];

export const BEFORE_AFTER = { before: 'ba-before.jpg', after: 'ba-after.jpg' };
export const PROCESS_IMG = ['p-1.jpg', 'p-2.jpg', 'p-3.jpg', 'p-4.jpg', 'p-5.jpg'];
export const PROJECT_IMG = ['w-01.jpg', 'w-02.jpg', 'w-03.jpg', 'w-04.jpg', 'w-05.jpg', 'w-06.jpg'];
export const FOUNDER_IMG = 'founder.jpg';

/* ─── Калькулятор ───────────────────────────────────────────
   ⚠ ОРІЄНТОВНІ тарифи, €/м² без IVA — підтвердити з Сергієм.
   Налаштовано так, щоб значення за замовчуванням (квартира, 90 м²,
   «Alta gama») давало 42.000–48.500 €, як на попередньому сайті. */
export const CALC = {
  area: { min: 20, max: 300, step: 5, value: 90 },
  defaults: { type: 'apartment', quality: 'premium' },
  rates: {
    apartment:   { standard: [330, 390],  premium: [467, 539],   luxury: [760, 900] },
    house:       { standard: [380, 450],  premium: [540, 620],   luxury: [880, 1040] },
    commercial:  { standard: [290, 350],  premium: [420, 490],   luxury: [680, 800] },
    bathKitchen: { standard: [620, 740],  premium: [860, 1000],  luxury: [1250, 1480] },
  },
  /* Додаткові послуги: fixed = разова сума, perM2 = за м², min = мінімум */
  addons: {
    kitchen:   { fixed: [8000, 14000] },
    furniture: { perM2: [55, 85] },
    licenses:  { fixed: [900, 1800] },
    hvac:      { perM2: [55, 75], min: [4500, 6000] },
  },
  qualityFactorForKitchen: { standard: 1, premium: 1.4, luxury: 2 },
  /* Строк, тижні: base + area / perWeek; якість додає тижні */
  weeks: { base: 2, perWeek: 22, spread: 2, luxuryExtra: 2, bathKitchenMax: 4 },
};
