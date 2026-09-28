/* Лист для дизайнерів та архітекторів (українською) під eSputnik.
   Дизайн — як у лендингу scroll-landing: ті самі кольори розділів, мітки «01 —— НАЗВА»,
   двоколірні заголовки, кнопки-пігулки. Жодного position:absolute: фото — звичайні <img>,
   текст — окремим рядком під ними.
   Тексти, ціни й посилання — в об'єктах T і LINK нижче. Після правок: node email/build.mjs */
import { C } from './data.mjs';
import { F, THEME, esc, pad2, spacer, label, h, lead, makeBtn, more, section, grid, logo, giant, doc } from './parts.mjs';

/* Картинки беремо прямо з публічного репозиторію GitHub, прив'язані до коміту 03c2c64fd47235676576a588475506912dfa42d3[:7]:
   адреса не зміниться, навіть якщо файли в гілці перепишуть.
   Нові фото: закомітити в email/img/, запушити й підставити сюди новий хеш коміту.
   Інший варіант — бібліотека зображень eSputnik або https://estone.com.ua/email/img/ після деплою сайту. */
const IMG_BASE = process.env.IMG_BASE || 'https://raw.githubusercontent.com/igormarmonja/Estone/03c2c64fd47235676576a588475506912dfa42d3/email/img/';

/* Службові посилання eSputnik: сервіс сам підставляє в них персональні адреси */
const ESPUTNIK = {
  unsubscribe: 'https://esputnik.com/unsubscribe',
  webview: 'https://esputnik.com/viewInBrowser',
};

const SITE = 'https://estone.com.ua';
const UTM = 'utm_source=esputnik&utm_medium=email&utm_campaign=designers-eu-2026';
const u = (path, content) => `${SITE}${path}?${UTM}&utm_content=${content}`;

const LINK = {
  catalog:   u('/vanna-kimnata/umyvalnyky/', 'hero_catalog'),
  alaiorW:   u('/vanna-kimnata/umyvalnyky/', 'alaior_white'),
  alaiorB:   u('/vanna-kimnata/umyvalnyky/', 'alaior_beige'),
  marble:    u('/prorahunok/', 'marble_order'),
  sale:      u('/materialy/', 'sale_viola'),
  tops:      u('/kukhnia/stilnytsi/', 'portfolio_tops'),
  sinks:     u('/vanna-kimnata/umyvalnyky/', 'portfolio_sinks'),
  furniture: u('/vanna-kimnata/', 'portfolio_furniture'),
  gift:      'mailto:info@estone.com.ua?subject=' + encodeURIComponent('Каталог 50 моделей раковин'), // TODO: пошта для заявок
  phone:     'tel:+380688647107',
  instagram: 'https://instagram.com/stonekiev',
  site:      'https://keralini.com.ua',
};

const T = {
  subject: 'Камінь для проєктів у Європі — дешевше, ніж в Україні',
  preheader: 'Ми запустили виробництво в Іспанії: та сама якість, економія клієнта від $500 до $1 000 на замовленні.',

  header: { tagline: 'Premium Stone Craft', flags: '🇺🇦&nbsp;&nbsp;🇪🇸' },

  hero: {
    label: 'Для дизайнерів та архітекторів',
    h1: ['Керамограніт і камінь', 'для проєктів у Європі'],
    tail: '— дешевше, ніж в Україні',
    sub: 'Ми запустили виробництво в Іспанії. Тепер ваші клієнти отримують ту саму якість за меншою ціною — за рахунок дешевшого матеріалу та логістики.',
  },

  price: {
    label: 'Ціна',
    ua: { flag: '🇺🇦', where: 'Ринкова ціна · Україна', sum: '~$4 000', what: 'стільниця + острів' },
    es: { flag: '🇪🇸', where: 'Через нас · Іспанія', sum: '~$3 000–3 500', what: 'та сама висока якість' },
    save: ['Реальна економія клієнта', 'від $500 до $1 000'],
    saveTail: 'на одному замовленні',
  },

  letter: {
    label: 'Лист',
    hello: 'Привіт!',
    p: [
      'Давно не писали — але є конкретна причина звернутися саме зараз.',
      'Ми розвивали виробництво в Україні та паралельно запустили роботу в Іспанії.',
      'Якщо є проєкти з каменем — порахуємо. Відповідаємо швидко.',
    ],
  },

  collection: {
    label: 'Нова колекція · 2026',
    h2: ['Знижки на найпопулярніші', 'декори 2026'],
    cta: 'Переглянути каталог',
    imgAlt: 'Раковина з каменю EStone у ванній кімнаті',
  },

  slot: {
    label: 'Щілинні раковини',
    h2: ['Авторські розробки', 'EStone'],
    lead: 'Щілинні раковини без забивання сифону. Кухонні мийки та раковини без стиків на дні.',
    more: 'Детальніше',
    // ⚠ Перевірити ціни й відсотки знижок перед відправкою
    items: [
      { img: 'p-alaior-white.jpg', link: 'alaiorW', kicker: 'Щілинна · без швів', title: 'Alaior White Marble', text: 'Більше ніяких швів на дні раковини.', price: 'від $480', old: '$620', off: '−23%' },
      { img: 'p-alaior-beige.jpg', link: 'alaiorB', kicker: 'Щілинна · не забивається', title: 'Alaior Beige Stone', text: 'Тепла бежева текстура. Дренаж прихований, мінімалістичний вигляд.', price: 'від $590', old: '$650', off: '−24%' },
    ],
  },

  marble: {
    label: 'Ванна · Нове обладнання',
    h2: ['Вироби з блоку', 'мармуру'],
    text: 'Без швів, без склейок. Цільні раковини, тумби, ванни, елементи декору. Таких виробництв в Україні — одиниці.',
    price: 'від $2 600', old: '$4 800', off: '−25%',
    cta: 'Замовити',
    imgAlt: 'Раковина, вирізана з цільного блоку мармуру',
  },

  sale: {
    label: 'Розпродаж',
    word: 'Super Sale',
    name: 'Calacatta Viola',
    off: '−30%',
    cta: 'Переглянути',
    imgAlt: 'Мармур з фіолетовими прожилками',
  },

  portfolio: {
    label: 'Портфоліо',
    h2: ['Весь', 'асортимент'],
    tail: 'Стільниці · Мийки · Меблі',
    items: [
      { img: 'p-tops.jpg', link: 'tops', t: 'Стільниці' },
      { img: 'p-sinks.jpg', link: 'sinks', t: 'Мийки' },
      { img: 'p-furniture.jpg', link: 'furniture', t: 'Меблі' },
    ],
  },

  news: {
    label: 'Новинки',
    h2: ['Що нового', 'в наших виробах'],
    items: [
      { t: 'Ванни з цільних мармурових блоків', d: 'Нове обладнання — моноліт без швів і склейок. Таких виробництв в Україні одиниці.' },
      { t: 'Щілинна раковина без забивання сифону', d: 'Власна розробка EStone — п’ять років на ринку. Хто поставив, той знає.' },
      { t: 'Мийки з керамограніту з цільним дном', d: 'Без сегментів, без швів. Виглядає як моноліт — вода сходить ідеально.' },
    ],
  },

  gift: {
    label: 'Подарунок для вас',
    h2: ['Каталог 50 моделей', 'раковин для ванної'],
    text: 'Зручний інструмент, щоб показати клієнту варіанти прямо на зустрічі. Напишіть нам — надішлемо одразу разом з фото нових робіт.',
    cta: 'Отримати каталог',
  },

  sign: {
    label: 'Підпис',
    text: 'Якщо є проєкти або питання — напишіть. Порахуємо швидко і конкретно.',
    name: 'Ігор',
    role: 'Засновник · EStone & Stone Evolution',
    rows: [
      { k: 'Телефон', v: '+38 068 864 71 07', link: 'phone' },
      { k: 'Instagram', v: '@stonekiev', link: 'instagram' },
      { k: 'Сайт', v: 'keralini.com.ua', link: 'site' },
    ],
  },

  footer: {
    brand: 'EStone',
    where: 'Ukraine · Spain',
    why: 'Ви отримали цей лист, бо раніше зверталися до нас.',
    unsubscribe: 'Відписатися від розсилки',
    webview: 'Переглянути в браузері',
  },
};

export function renderPartners() {
  const img = (f) => IMG_BASE + f;
  const btn = makeBtn(IMG_BASE);
  const TD = THEME.dark, TP = THEME.paper, TS = THEME.sand, TB = THEME.brand;

  /* Ціна зі знижкою: нова крупно, стара закреслена, плашка з відсотком */
  const priceTag = (p, th, size = 26) => `
        <p style="margin:0;font-family:${F.display};font-size:${size}px;line-height:${size + 4}px;color:${th.fg};">
          ${esc(p.price)}
          <span style="font-family:${F.mono};font-size:13px;line-height:16px;color:${th.mute};text-decoration:line-through;">&nbsp;${esc(p.old)}</span>
          <span style="display:inline-block;vertical-align:4px;margin-left:6px;padding:4px 9px;border-radius:999px;background:${C.brand};font-family:${F.mono};font-size:11px;line-height:12px;letter-spacing:.04em;color:${C.paper};">${esc(p.off)}</span>
        </p>`;

  /* ── HEADER + HERO (dark) ─────────────────────── */
  const hero = `
  <tr><td class="px" bgcolor="${C.dark}" style="background:${C.dark};padding:28px 40px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td valign="middle">
        <a href="${esc(u('/', 'logo'))}" target="_blank" style="text-decoration:none;">${logo(IMG_BASE, 'ESTONE')}</a>
      </td>
      <td valign="middle" align="right" style="font-family:${F.mono};font-size:11px;line-height:16px;letter-spacing:.12em;text-transform:uppercase;color:${C.muteD};">
        <span class="hide-m">${esc(T.header.tagline)} &nbsp;·&nbsp; </span>${T.header.flags}
      </td>
    </tr></table>
  </td></tr>
  <tr><td class="px" bgcolor="${C.dark}" style="background:${C.dark};padding:96px 40px 64px;">
    ${label('', T.hero.label, TD)}
    ${h(T.hero.h1, TD, { size: 44, cls: 'h1', tag: 'h1' })}
    <p style="margin:20px 0 0;font-family:${F.mono};font-size:14px;line-height:20px;letter-spacing:.04em;color:${C.sand2};">${esc(T.hero.tail)}</p>
    ${lead(esc(T.hero.sub), TD, { m: '24px 0 0', max: 460 })}
  </td></tr>`;

  /* ── PRICE (sand): Україна → Іспанія ──────────── */
  const pCard = (p, accent) => `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
          <td bgcolor="${accent ? C.dark : C.card}" style="border-radius:20px;background:${accent ? C.dark : C.card};padding:24px 22px 26px;${accent ? '' : `border:1px solid ${TS.line};`}">
            <p style="margin:0 0 20px;font-size:22px;line-height:24px;">${p.flag}</p>
            <p style="margin:0 0 10px;font-family:${F.mono};font-size:11px;line-height:16px;letter-spacing:.12em;text-transform:uppercase;color:${accent ? C.sand2 : C.mute};">${esc(p.where)}</p>
            <p style="margin:0 0 6px;font-family:${F.display};font-size:30px;line-height:36px;white-space:nowrap;font-weight:${accent ? 400 : 300};letter-spacing:-.01em;color:${accent ? C.paper : C.fg};${accent ? '' : 'text-decoration:line-through;text-decoration-thickness:1px;'}">${esc(p.sum)}</p>
            <p style="margin:0;font-family:${F.text};font-size:14px;line-height:20px;color:${accent ? C.muteD : C.mute};">${esc(p.what)}</p>
          </td>
        </tr></table>`;
  const price = section('sand', `
    ${label('01', T.price.label, TS)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td class="col col-gap" width="46%" valign="middle">${pCard(T.price.ua, false)}</td>
      <td class="col arrow-m" width="8%" align="center" valign="middle" style="font-family:${F.display};font-size:28px;line-height:28px;color:${C.brand};">&#8594;</td>
      <td class="col" width="46%" valign="middle">${pCard(T.price.es, true)}</td>
    </tr></table>
    ${spacer(40)}
    <p style="margin:0;padding-top:24px;border-top:1px solid ${TS.line};font-family:${F.display};font-size:30px;line-height:32px;text-transform:uppercase;letter-spacing:-.01em;color:${TS.fg};" class="h2">
      ${esc(T.price.save[0])}<br><span style="color:${C.brand};">${esc(T.price.save[1])}</span>
    </p>
    <p style="margin:10px 0 0;font-family:${F.mono};font-size:13px;line-height:18px;letter-spacing:.04em;color:${TS.mute};">${esc(T.price.saveTail)}</p>`, { pt: 64, pb: 64 });

  /* ── LETTER (paper) ───────────────────────────── */
  const letter = section('paper', `
    ${label('02', T.letter.label, TP)}
    <p style="margin:0 0 20px;font-family:${F.display};font-size:40px;line-height:44px;text-transform:uppercase;letter-spacing:-.02em;color:${TP.fg};">${esc(T.letter.hello)}</p>
    ${T.letter.p.map((p, i) => `<p class="${i === 0 ? 'lead-xl' : ''}" style="margin:0 0 16px;font-family:${i === 0 ? F.display : F.text};font-size:${i === 0 ? 24 : 16}px;line-height:${i === 0 ? 32 : 26}px;color:${i === 0 ? TP.fg : TP.mute};">${esc(p)}</p>`).join('\n    ')}`, { pb: 56 });

  /* ── HERO PHOTO: фото на всю ширину, текст — під ним (dark) ── */
  const collection = `
  <tr><td bgcolor="${C.dark}" style="background:${C.dark};padding:0;line-height:0;font-size:0;">
    <a href="${esc(LINK.catalog)}" target="_blank"><img src="${img('p-hero.jpg')}" width="600" height="420" alt="${esc(T.collection.imgAlt)}" class="fluid" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></a>
  </td></tr>
${section('dark', `
    ${label('03', T.collection.label, TD)}
    ${h(T.collection.h2, TD, { size: 44 })}
    ${spacer(32)}
    ${btn(T.collection.cta, LINK.catalog, 'light')}`, { pt: 44, pb: 64 })}`;

  /* ── SLOT SINKS (paper): 2 картки товарів ─────── */
  const product = (p) => `
        <a href="${esc(LINK[p.link])}" target="_blank" style="text-decoration:none;">
          <img src="${img(p.img)}" width="252" height="290" alt="${esc(p.title)}" class="fluid" style="display:block;width:100%;max-width:252px;height:auto;border:0;border-radius:16px;">
        </a>
        <p style="margin:16px 0 6px;font-family:${F.mono};font-size:11px;line-height:16px;letter-spacing:.1em;text-transform:uppercase;color:${C.brand};">${esc(p.kicker)}</p>
        <p style="margin:0 0 8px;font-family:${F.display};font-size:24px;line-height:26px;text-transform:uppercase;letter-spacing:-.01em;color:${TP.fg};">${esc(p.title)}</p>
        <p style="margin:0 0 14px;font-family:${F.text};font-size:14px;line-height:21px;color:${TP.mute};">${esc(p.text)}</p>
        ${priceTag(p, TP, 24)}
        ${spacer(16)}
        ${more(T.slot.more, LINK[p.link], TP.fg)}`;
  const slot = section('paper', `
    ${label('04', T.slot.label, TP)}
    ${h(T.slot.h2, TP)}
    ${lead(esc(T.slot.lead), TP, { m: '24px 0 40px' })}
    ${grid(T.slot.items, product)}`);

  /* ── MARBLE (sand) ────────────────────────────── */
  const marble = section('sand', `
    ${label('05', T.marble.label, TS)}
    ${h(T.marble.h2, TS)}
    ${spacer(32)}
    <img src="${img('p-marble.jpg')}" width="520" height="360" alt="${esc(T.marble.imgAlt)}" class="fluid" style="display:block;width:100%;max-width:520px;height:auto;border:0;border-radius:20px;">
    ${lead(esc(T.marble.text), TS, { m: '28px 0 22px', max: 460 })}
    ${priceTag(T.marble, TS, 30)}
    ${spacer(28)}
    ${btn(T.marble.cta, LINK.marble, 'dark')}`);

  /* ── DARK BANNER: Super Sale (dark) ──────────── */
  const sale = `
  <tr><td bgcolor="${C.dark}" style="background:${C.dark};padding:0;line-height:0;font-size:0;">
    <a href="${esc(LINK.sale)}" target="_blank"><img src="${img('p-viola.jpg')}" width="600" height="340" alt="${esc(T.sale.imgAlt)}" class="fluid" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></a>
  </td></tr>
${section('dark', `
    ${label('06', T.sale.label, TD)}
    <p class="sale-word" style="margin:0 0 18px;font-family:${F.display};font-size:64px;line-height:62px;text-transform:uppercase;letter-spacing:-.02em;color:#6E5445;-webkit-text-stroke:1px ${C.sand2};">${esc(T.sale.word)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td class="col" valign="bottom" style="padding-bottom:20px;">
        <p style="margin:0;font-family:${F.display};font-size:34px;line-height:36px;text-transform:uppercase;color:${C.paper};">${esc(T.sale.name)}</p>
      </td>
      <td class="col arrow-m" valign="bottom" align="right" style="padding-bottom:20px;font-family:${F.display};font-size:72px;line-height:64px;font-weight:300;color:${C.sand2};white-space:nowrap;">${esc(T.sale.off)}</td>
    </tr></table>
    ${spacer(8)}
    ${btn(T.sale.cta, LINK.sale, 'light')}`, { pt: 44, pb: 64 })}`;

  /* ── PORTFOLIO (paper): 3 фото ─────────────────── */
  const pf = (p) => `
        <a href="${esc(LINK[p.link])}" target="_blank" style="text-decoration:none;color:${TP.fg};">
          <img src="${img(p.img)}" width="163" height="210" alt="${esc(p.t)}" class="fluid" style="display:block;width:100%;max-width:163px;height:auto;border:0;border-radius:14px;">
          <p class="cap" style="margin:14px 0 0;font-family:${F.display};font-size:17px;line-height:22px;text-transform:uppercase;color:${TP.fg};">${esc(p.t)} <span style="color:${C.brand};">&#8594;</span></p>
        </a>`;
  const portfolio = section('paper', `
    ${label('07', T.portfolio.label, TP)}
    ${h(T.portfolio.h2, TP)}
    <p style="margin:18px 0 36px;font-family:${F.mono};font-size:13px;line-height:18px;letter-spacing:.08em;text-transform:uppercase;color:${TP.mute};">${esc(T.portfolio.tail)}</p>
    ${grid(T.portfolio.items, pf, { cols: 3, gap: 16, rowGap: 0, stack: false })}`);

  /* ── NEWS (brand): 3 пункти з великими номерами ── */
  const news = section('brand', `
    ${label('08', T.news.label, TB)}
    ${h(T.news.h2, TB)}
    ${spacer(36)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${T.news.items.map((n, i) => `
      <tr><td style="border-top:1px solid ${TB.line};padding:24px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="76" valign="top" style="font-family:${F.display};font-size:44px;line-height:42px;font-weight:300;color:${C.sand2};">${pad2(i + 1)}</td>
          <td valign="top">
            <p style="margin:2px 0 8px;font-family:${F.display};font-size:21px;line-height:25px;text-transform:uppercase;color:${TB.fg};">${esc(n.t)}</p>
            <p style="margin:0;font-family:${F.text};font-size:14px;line-height:21px;color:${TB.mute};">${esc(n.d)}</p>
          </td>
        </tr></table>
      </td></tr>`).join('')}
      <tr><td style="border-top:1px solid ${TB.line};font-size:1px;line-height:1px;">&nbsp;</td></tr>
    </table>`);

  /* ── GIFT (sand) ──────────────────────────────── */
  const thumb = (f) => `<img src="${img(f)}" width="163" height="163" alt="" class="fluid" style="display:block;width:100%;max-width:163px;height:auto;border:0;border-radius:14px;">`;
  const gift = section('sand', `
    ${label('09', T.gift.label, TS)}
    ${h(T.gift.h2, TS)}
    ${spacer(32)}
    ${grid(['p-cat-1.jpg', 'p-cat-2.jpg', 'p-cat-3.jpg'], thumb, { cols: 3, gap: 16, rowGap: 0, stack: false })}
    ${lead(esc(T.gift.text), TS, { m: '28px 0 32px', max: 460 })}
    ${btn(T.gift.cta, LINK.gift, 'brand')}`);

  /* ── SIGNATURE (paper) ────────────────────────── */
  const sign = section('paper', `
    ${label('10', T.sign.label, TP)}
    <p class="lead-xl" style="margin:0 0 36px;font-family:${F.display};font-size:26px;line-height:34px;color:${TP.fg};">${esc(T.sign.text)}</p>
    <p style="margin:0;font-family:${F.display};font-size:56px;line-height:56px;font-weight:300;text-transform:uppercase;letter-spacing:-.02em;color:${C.brand};">${esc(T.sign.name)}</p>
    <p style="margin:10px 0 28px;font-family:${F.mono};font-size:12px;line-height:18px;letter-spacing:.1em;text-transform:uppercase;color:${TP.mute};">${esc(T.sign.role)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${T.sign.rows.map((r) => `
      <tr><td style="border-top:1px solid ${TP.line};padding:14px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="130" valign="top" style="font-family:${F.mono};font-size:11px;line-height:22px;letter-spacing:.12em;text-transform:uppercase;color:${TP.mute};">${esc(r.k)}</td>
          <td valign="top" style="font-family:${F.display};font-size:19px;line-height:22px;"><a href="${esc(LINK[r.link])}" target="_blank" style="color:${TP.fg};text-decoration:none;">${esc(r.v)}</a></td>
          <td width="24" align="right" valign="top" style="font-family:${F.display};font-size:18px;line-height:22px;color:${C.brand};">&#8594;</td>
        </tr></table>
      </td></tr>`).join('')}
      <tr><td style="border-top:1px solid ${TP.line};font-size:1px;line-height:1px;">&nbsp;</td></tr>
    </table>`, { pb: 80 });

  /* ── FOOTER (dark) ────────────────────────────── */
  const footer = `
  <tr><td class="px" bgcolor="${C.dark}" style="background:${C.dark};padding:56px 40px 36px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td valign="middle">${logo(IMG_BASE, 'ESTONE')}</td>
      <td valign="middle" align="right" style="font-family:${F.mono};font-size:11px;line-height:16px;letter-spacing:.12em;text-transform:uppercase;color:${C.muteD};">${esc(T.footer.where)}</td>
    </tr></table>
    ${giant('ESTONE')}
    <p style="margin:0;padding-top:20px;border-top:1px solid ${C.lineD};font-family:${F.text};font-size:12px;line-height:20px;color:${C.muteD};">
      ${esc(T.footer.why)}<br>
      <a href="${ESPUTNIK.unsubscribe}" target="_blank" style="color:${C.paper};text-decoration:underline;">${esc(T.footer.unsubscribe)}</a>
      &nbsp;·&nbsp;
      <a href="${ESPUTNIK.webview}" target="_blank" style="color:${C.paper};text-decoration:underline;">${esc(T.footer.webview)}</a>
      <br>© ${new Date().getFullYear()} ${esc(T.footer.brand)} · ${esc(T.footer.where)}
    </p>
  </td></tr>`;

  return doc({
    lang: 'uk',
    title: T.subject,
    preheader: T.preheader,
    top: `<p style="margin:0;padding:14px 16px;font-family:${F.mono};font-size:11px;line-height:16px;letter-spacing:.08em;color:${C.muteD};"><a href="${ESPUTNIK.webview}" target="_blank" style="color:${C.muteD};text-decoration:underline;">${esc(T.footer.webview)}</a></p>`,
    body: [hero, price, letter, collection, slot, marble, sale, portfolio, news, gift, sign, footer].join('\n'),
  });
}

export const PARTNERS_SUBJECT = T.subject;
