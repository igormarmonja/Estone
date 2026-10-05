/* Лист для дизайнерів та архітекторів (українською) під eSputnik.
   Дизайн — як у лендингу scroll-landing: кольори розділів, мітки «01 —— НАЗВА»,
   двоколірні заголовки, кнопки-пігулки. Шрифт — український Fixel (MacPaw).
   Жодного position:absolute: фото — звичайні <img>, текст — окремим рядком під ними.
   Тексти, ціни й посилання — в об'єктах T і LINK нижче. Після правок: node email/build.mjs */
import { C } from './data.mjs';
import { F, useFonts, THEME, esc, pad2, spacer, label, h, lead, makeBtn, more, section, grid, logo, giant, doc } from './parts.mjs';

/* Картинки й шрифти беремо з публічного репозиторію GitHub, прив'язані до коміту ASSETS_REF:
   адреса не зміниться, навіть якщо файли в гілці перепишуть.
   Нові фото: покласти в email/img/ з тим самим іменем, закомітити, запушити
   й підставити сюди новий хеш коміту. */
const ASSETS_REF = 'a24fbb3279890ec2a0093e9a56356d9fd1b37e6d';
const ASSETS = process.env.ASSETS_BASE || `https://raw.githubusercontent.com/igormarmonja/Estone/${ASSETS_REF}/email/`;
const IMG_BASE = process.env.IMG_BASE || `${ASSETS}img/`;
const FONT_BASE = `${ASSETS}fonts/`;

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
  slot1:     u('/vanna-kimnata/umyvalnyky/', 'slot_1'),
  slot2:     u('/vanna-kimnata/umyvalnyky/', 'slot_2'),
  slot3:     u('/vanna-kimnata/umyvalnyky/', 'slot_3'),
  slot4:     u('/vanna-kimnata/umyvalnyky/', 'slot_4'),
  marble:    u('/prorahunok/', 'marble_order'),
  special:   u('/kukhnia/stilnytsi/keramohranit/', 'special_sand'),
  tops:      u('/kukhnia/stilnytsi/', 'portfolio_tops'),
  sinks:     u('/vanna-kimnata/umyvalnyky/', 'portfolio_sinks'),
  furniture: u('/vanna-kimnata/', 'portfolio_furniture'),
  pdf:       'https://estone.com.ua/files/estone-bath-2026.pdf',
  phone:     'tel:+380688647107',
  email:     'mailto:office@estone.com.ua',
  instagram: 'https://instagram.com/stonekiev',
  estone:    u('/', 'signature'),
  keralini:  'https://keralini.com.ua',
};

const T = {
  subject: 'Камінь для проєктів у Європі — дешевше, ніж в Україні',
  preheader: 'Ми оновили парк обладнання й запустили виробництво в Іспанії. Нові можливості, нова якість, приємніші ціни.',

  header: { tagline: 'Premium Stone Craft', flags: '🇺🇦&nbsp;&nbsp;🇪🇸' },

  hero: {
    label: 'Для дизайнерів та архітекторів',
    h1: ['Керамограніт і камінь', 'для проєктів у Європі'],
    tail: '— дешевше, ніж в Україні',
    sub: 'Ми запустили виробництво в Іспанії. Тепер ваші клієнти отримують ту саму якість за меншою ціною — за рахунок дешевшого матеріалу та логістики.',
  },

  why: {
    label: 'Чому пишемо саме зараз',
    hello: 'Привіт!',
    intro: 'Давно не писали — але є конкретна причина. Ми оновили парк обладнання та відкрили виробництво в Іспанії.',
    img: 'p-why.jpg', // ⚠ фото додати пізніше
    imgAlt: 'Нове обладнання EStone',
    points: [
      { t: 'Нові можливості', d: 'Вироби з цільного блоку, великі формати й складні форми, які раніше не брали в роботу.' },
      { t: 'Нова якість', d: 'Точніша обробка й цільні поверхні — без швів і склейок.' },
      { t: 'Приємніші ціни', d: 'Для проєктів у Європі — дешевший матеріал і коротша логістика з Іспанії.' },
    ],
    outro: 'Якщо є проєкти з каменем — порахуємо. Відповідаємо швидко.',
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
    // ⚠ Фото p-slot-1…4 — заглушки. Назви 3–4 і всі ціни перевірити перед відправкою
    items: [
      { img: 'p-slot-1.jpg', link: 'slot1', kicker: 'Щілинна · без швів', title: 'Alaior White Marble', text: 'Більше ніяких швів на дні раковини.', price: 'від $480', old: '$620', off: '−23%' },
      { img: 'p-slot-2.jpg', link: 'slot2', kicker: 'Щілинна · не забивається', title: 'Alaior Beige Stone', text: 'Тепла бежева текстура. Дренаж прихований, мінімалістичний вигляд.', price: 'від $590', old: '$650', off: '−24%' },
      { img: 'p-slot-3.jpg', link: 'slot3', kicker: 'Щілинна раковина', title: 'Назва моделі 3', text: 'Короткий опис моделі в одне речення.', price: 'від $—' },
      { img: 'p-slot-4.jpg', link: 'slot4', kicker: 'Кухонна мийка', title: 'Назва моделі 4', text: 'Короткий опис моделі в одне речення.', price: 'від $—' },
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

  special: {
    label: 'Спеціальні пропозиції',
    h2: ['Теплі пісочні декори', 'керамограніту'],
    off: '−20%',
    offText: 'знижка на всі теплі пісочні декори',
    cta: 'Переглянути декори',
    imgAlt: 'Керамограніт теплого пісочного відтінку',
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

  gift: {
    label: 'Подарунок для вас',
    h2: ['Каталог 50 моделей', 'раковин для ванної'],
    text: 'Зручний інструмент, щоб показати клієнту варіанти прямо на зустрічі. Завантажуйте PDF, а за фото нових робіт — пишіть нам.',
    cta: 'Завантажити каталог',
    note: 'PDF · estone-bath-2026',
  },

  sign: {
    label: 'Підпис',
    text: 'Якщо є проєкти або питання — напишіть. Порахуємо швидко і конкретно.',
    name: 'Ігор',
    role: 'Засновник · EStone & Stone Evolution',
    rows: [
      { k: 'Телефон', v: '+38 068 864 71 07', link: 'phone' },
      { k: 'Email', v: 'office@estone.com.ua', link: 'email' },
      { k: 'Instagram', v: '@stonekiev', link: 'instagram' },
      { k: 'Сайти', links: [['estone.com.ua', 'estone'], ['keralini.com.ua', 'keralini']] },
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
  useFonts('fixel', FONT_BASE);
  const img = (f) => IMG_BASE + f;
  const btn = makeBtn(IMG_BASE);
  const TD = THEME.dark, TP = THEME.paper, TS = THEME.sand, TB = THEME.brand;

  /* Ціна: нова крупно; якщо є знижка — стара закреслена і плашка з відсотком */
  const priceTag = (p, th, size = 26) => `
        <p style="margin:0;font-family:${F.display};font-size:${size}px;line-height:${size + 4}px;color:${th.fg};">
          ${esc(p.price)}${p.old ? `
          <span style="font-family:${F.mono};font-size:13px;line-height:16px;color:${th.mute};text-decoration:line-through;">&nbsp;${esc(p.old)}</span>
          <span style="display:inline-block;vertical-align:4px;margin-left:6px;padding:4px 9px;border-radius:999px;background:${C.brand};font-family:${F.mono};font-size:11px;line-height:12px;letter-spacing:.04em;color:${C.paper};">${esc(p.off)}</span>` : ''}
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
    ${h(T.hero.h1, TD, { size: 40, cls: 'h1', tag: 'h1' })}
    <p style="margin:20px 0 0;font-family:${F.mono};font-size:14px;line-height:20px;letter-spacing:.04em;color:${C.sand2};">${esc(T.hero.tail)}</p>
    ${lead(esc(T.hero.sub), TD, { m: '24px 0 0', max: 460 })}
  </td></tr>`;

  /* ── ЧОМУ ЗАРАЗ (paper): привітання, фото, 3 причини ── */
  const why = section('paper', `
    ${label('01', T.why.label, TP)}
    <p style="margin:0 0 20px;font-family:${F.display};font-size:40px;line-height:44px;text-transform:uppercase;letter-spacing:-.02em;color:${TP.fg};">${esc(T.why.hello)}</p>
    <p class="lead-xl" style="margin:0 0 32px;font-family:${F.display};font-size:24px;line-height:32px;color:${TP.fg};">${esc(T.why.intro)}</p>
    <img src="${img(T.why.img)}" width="520" height="300" alt="${esc(T.why.imgAlt)}" class="fluid" style="display:block;width:100%;max-width:520px;height:auto;border:0;border-radius:20px;">
    ${spacer(28)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      ${T.why.points.map((p, i) => `
      <td class="col stat" width="33%" valign="top" style="padding:20px ${i < 2 ? '16px' : '0'} 0 0;border-top:1px solid ${TP.line};">
        <p style="margin:0 0 10px;font-family:${F.mono};font-size:11px;line-height:16px;letter-spacing:.12em;color:${C.brand};">${pad2(i + 1)}</p>
        <p style="margin:0 0 8px;font-family:${F.display};font-size:19px;line-height:23px;text-transform:uppercase;color:${TP.fg};">${esc(p.t)}</p>
        <p style="margin:0;font-family:${F.text};font-size:14px;line-height:21px;color:${TP.mute};">${esc(p.d)}</p>
      </td>`).join('')}
    </tr></table>
    <p style="margin:36px 0 0;font-family:${F.text};font-size:16px;line-height:25px;color:${TP.fg};">${esc(T.why.outro)}</p>`, { pb: 64 });

  /* ── ФОТО КОЛЕКЦІЇ: фото на всю ширину, текст — під ним (dark) ── */
  const collection = `
  <tr><td bgcolor="${C.dark}" style="background:${C.dark};padding:0;line-height:0;font-size:0;">
    <a href="${esc(LINK.catalog)}" target="_blank"><img src="${img('p-hero.jpg')}" width="600" height="420" alt="${esc(T.collection.imgAlt)}" class="fluid" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></a>
  </td></tr>
${section('dark', `
    ${label('02', T.collection.label, TD)}
    ${h(T.collection.h2, TD, { size: 40 })}
    ${spacer(32)}
    ${btn(T.collection.cta, LINK.catalog, 'light')}`, { pt: 44, pb: 64 })}`;

  /* ── АВТОРСЬКІ РОЗРОБКИ (paper): 4 картки 2×2 ── */
  const product = (p) => `
        <a href="${esc(LINK[p.link])}" target="_blank" style="text-decoration:none;">
          <img src="${img(p.img)}" width="252" height="290" alt="${esc(p.title)}" class="fluid" style="display:block;width:100%;max-width:252px;height:auto;border:0;border-radius:16px;">
        </a>
        <p style="margin:16px 0 6px;font-family:${F.mono};font-size:11px;line-height:16px;letter-spacing:.1em;text-transform:uppercase;color:${C.brand};">${esc(p.kicker)}</p>
        <p style="margin:0 0 8px;font-family:${F.display};font-size:21px;line-height:25px;text-transform:uppercase;letter-spacing:-.01em;color:${TP.fg};">${esc(p.title)}</p>
        <p style="margin:0 0 14px;font-family:${F.text};font-size:14px;line-height:21px;color:${TP.mute};">${esc(p.text)}</p>
        ${priceTag(p, TP, 22)}
        ${spacer(16)}
        ${more(T.slot.more, LINK[p.link], TP.fg)}`;
  const slot = section('paper', `
    ${label('03', T.slot.label, TP)}
    ${h(T.slot.h2, TP, { size: 40 })}
    ${lead(esc(T.slot.lead), TP, { m: '24px 0 40px' })}
    ${grid(T.slot.items, product)}`);

  /* ── ВИРОБИ З БЛОКУ МАРМУРУ (sand) ────────────── */
  const marble = section('sand', `
    ${label('04', T.marble.label, TS)}
    ${h(T.marble.h2, TS, { size: 40 })}
    ${spacer(32)}
    <img src="${img('p-marble.jpg')}" width="520" height="360" alt="${esc(T.marble.imgAlt)}" class="fluid" style="display:block;width:100%;max-width:520px;height:auto;border:0;border-radius:20px;">
    ${lead(esc(T.marble.text), TS, { m: '28px 0 22px', max: 460 })}
    ${priceTag(T.marble, TS, 28)}
    ${spacer(28)}
    ${btn(T.marble.cta, LINK.marble, 'dark')}`);

  /* ── СПЕЦІАЛЬНІ ПРОПОЗИЦІЇ (dark) ─────────────── */
  const special = `
  <tr><td bgcolor="${C.dark}" style="background:${C.dark};padding:0;line-height:0;font-size:0;">
    <a href="${esc(LINK.special)}" target="_blank"><img src="${img('p-sand.jpg')}" width="600" height="340" alt="${esc(T.special.imgAlt)}" class="fluid" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></a>
  </td></tr>
${section('dark', `
    ${label('05', T.special.label, TD)}
    ${h(T.special.h2, TD, { size: 40 })}
    ${spacer(24)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td valign="middle" width="1" style="padding-right:20px;font-family:${F.display};font-size:88px;line-height:84px;font-weight:300;letter-spacing:-.03em;color:${C.sand2};white-space:nowrap;" class="sale-word">${esc(T.special.off)}</td>
      <td valign="middle" style="font-family:${F.mono};font-size:12px;line-height:18px;letter-spacing:.12em;text-transform:uppercase;color:${TD.mute};">${esc(T.special.offText)}</td>
    </tr></table>
    ${spacer(28)}
    ${btn(T.special.cta, LINK.special, 'light')}`, { pt: 44, pb: 64 })}`;

  /* ── ПОРТФОЛІО (paper): 3 фото ─────────────────── */
  const pf = (p) => `
        <a href="${esc(LINK[p.link])}" target="_blank" style="text-decoration:none;color:${TP.fg};">
          <img src="${img(p.img)}" width="163" height="210" alt="${esc(p.t)}" class="fluid" style="display:block;width:100%;max-width:163px;height:auto;border:0;border-radius:14px;">
          <p class="cap" style="margin:14px 0 0;font-family:${F.display};font-size:16px;line-height:22px;text-transform:uppercase;color:${TP.fg};">${esc(p.t)} <span style="color:${C.brand};">&#8594;</span></p>
        </a>`;
  const portfolio = section('paper', `
    ${label('06', T.portfolio.label, TP)}
    ${h(T.portfolio.h2, TP, { size: 40 })}
    <p style="margin:18px 0 36px;font-family:${F.mono};font-size:13px;line-height:18px;letter-spacing:.08em;text-transform:uppercase;color:${TP.mute};">${esc(T.portfolio.tail)}</p>
    ${grid(T.portfolio.items, pf, { cols: 3, gap: 16, rowGap: 0, stack: false })}`);

  /* ── ПОДАРУНОК: каталог PDF (brand) ────────────── */
  const thumb = (f) => `<img src="${img(f)}" width="163" height="163" alt="" class="fluid" style="display:block;width:100%;max-width:163px;height:auto;border:0;border-radius:14px;">`;
  const gift = section('brand', `
    ${label('07', T.gift.label, TB)}
    ${h(T.gift.h2, TB, { size: 40 })}
    ${spacer(32)}
    ${grid(['p-cat-1.jpg', 'p-cat-2.jpg', 'p-cat-3.jpg'], thumb, { cols: 3, gap: 16, rowGap: 0, stack: false })}
    ${lead(esc(T.gift.text), TB, { m: '28px 0 32px', max: 460 })}
    ${btn(T.gift.cta, LINK.pdf, 'light')}
    <p style="margin:14px 0 0;font-family:${F.mono};font-size:11px;line-height:16px;letter-spacing:.12em;text-transform:uppercase;color:${TB.mute};">${esc(T.gift.note)}</p>`);

  /* ── ПІДПИС (paper) ───────────────────────────── */
  const a = (text, key) => `<a href="${esc(LINK[key])}" target="_blank" style="color:${TP.fg};text-decoration:none;">${esc(text)}</a>`;
  const sign = section('paper', `
    ${label('08', T.sign.label, TP)}
    <p class="lead-xl" style="margin:0 0 36px;font-family:${F.display};font-size:24px;line-height:32px;color:${TP.fg};">${esc(T.sign.text)}</p>
    <p style="margin:0;font-family:${F.display};font-size:52px;line-height:54px;font-weight:300;text-transform:uppercase;letter-spacing:-.02em;color:${C.brand};">${esc(T.sign.name)}</p>
    <p style="margin:10px 0 28px;font-family:${F.mono};font-size:12px;line-height:18px;letter-spacing:.1em;text-transform:uppercase;color:${TP.mute};">${esc(T.sign.role)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${T.sign.rows.map((r) => `
      <tr><td style="border-top:1px solid ${TP.line};padding:14px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="120" valign="top" style="font-family:${F.mono};font-size:11px;line-height:22px;letter-spacing:.12em;text-transform:uppercase;color:${TP.mute};">${esc(r.k)}</td>
          <td valign="top" style="font-family:${F.display};font-size:18px;line-height:22px;color:${TP.fg};">${r.links ? r.links.map(([t, k]) => a(t, k)).join(`<span style="color:${TP.mute};"> &nbsp;·&nbsp; </span>`) : a(r.v, r.link)}</td>
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
    body: [hero, why, collection, slot, marble, special, portfolio, gift, sign, footer].join('\n'),
  });
}

export const PARTNERS_SUBJECT = T.subject;
