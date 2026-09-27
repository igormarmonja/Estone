/* Шаблон листа-розсилки у стилі лендингу scroll-landing (evostone-es/).
   Один шаблон на всі мови. Верстка під поштові клієнти: таблиці, інлайн-стилі,
   ширина 600px, на телефоні колонки стають в стовпчик (<style> у <head>).
   Послідовність фону розділів повторює лендинг: dark → paper → sand → paper → dark → sand → brand → paper → dark. */
import { SITE, LANGS, CAMPAIGN, IMG_BASE, MERGE, C, SERIES, PRICES } from './data.mjs';
import { F, THEME, esc, pad2, spacer, label, h, makeBtn, section, grid, doc, more, logo, giant } from './parts.mjs';

const img = (f) => IMG_BASE + f;

export function render(t, lang) {
  const L = LANGS.find((l) => l.code === lang);
  const utm = (content) => `utm_source=newsletter&utm_medium=email&utm_campaign=${CAMPAIGN.id}&utm_content=${content}`;
  const page = (hash = '', content = 'link', path = L.path) => `${SITE.domain}${path}?${utm(content)}${hash}`;
  const wa = SITE.whatsapp;

  const btn = makeBtn(IMG_BASE);

  /* ── 01 Hero ───────────────────────────────────── */
  const TD = THEME.dark;
  const hero = `
  <tr><td bgcolor="${C.dark}" background="${img('hero.jpg')}" valign="top" style="background:${C.dark} url('${img('hero.jpg')}') center / cover no-repeat;">
    <!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:680px;"><v:fill type="frame" src="${img('hero.jpg')}" color="${C.dark}"/><v:textbox inset="0,0,0,0"><![endif]-->
    <div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td class="px" style="padding:28px 40px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td valign="middle">
            <a href="${esc(page('', 'logo'))}" target="_blank" style="text-decoration:none;color:${C.paper};">
              <img src="${img('logo-light.png')}" width="22" height="22" alt="" style="display:inline-block;vertical-align:middle;border:0;">
              <span style="display:inline-block;vertical-align:middle;margin-left:10px;font-family:${F.display};font-size:17px;line-height:22px;font-weight:500;letter-spacing:.22em;color:${C.paper};">${SITE.brand}</span>
            </a>
          </td>
          <td valign="middle" align="right" style="font-family:${F.mono};font-size:11px;line-height:16px;letter-spacing:.12em;text-transform:uppercase;color:${C.muteD};">
            ${esc(t.top.issue)}&nbsp;${CAMPAIGN.issue}<span class="hide-m"> &nbsp;·&nbsp; ${esc(CAMPAIGN.date[lang])}</span>
          </td>
        </tr></table>
      </td></tr>
      <tr><td class="px hero-body" style="padding:240px 40px 44px;">
        ${label('', t.hero.label, TD)}
        ${h(t.hero.h1, TD, { size: 64, cls: 'h1', tag: 'h1' })}
        <p style="margin:18px 0 0;font-family:${F.mono};font-size:13px;line-height:20px;letter-spacing:.04em;color:${C.sand2};">— ${esc(t.hero.tail)}</p>
        <p style="margin:22px 0 32px;max-width:440px;font-family:${F.text};font-size:16px;line-height:25px;color:${C.muteD};">${esc(t.hero.sub)}</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td class="col stack-gap" style="padding:0 10px 0 0;">${btn(t.hero.cta, page('#contacto', 'hero_cta'), 'light')}</td>
          <td class="col" style="padding:0;">${btn(t.hero.whatsapp, wa, 'outline-light', { icon: 'wa' })}</td>
        </tr></table>
      </td></tr>
      <tr><td class="px" style="padding:0 40px 28px;">
        <p style="margin:0;padding-top:18px;border-top:1px solid ${C.lineD};font-family:${F.mono};font-size:11px;line-height:18px;letter-spacing:.12em;text-transform:uppercase;color:${C.muteD};">
          ${t.hero.trust.map(esc).join(' &nbsp;·&nbsp; ')}
        </p>
      </td></tr>
    </table>
    </div>
    <!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
  </td></tr>`;

  /* ── 02 Маніфест + лічильники ─────────────────── */
  const TP = THEME.paper;
  const manifesto = section('paper', `
    ${label('01', t.manifesto.label, TP)}
    <p style="margin:0 0 16px;font-family:${F.text};font-size:16px;line-height:24px;color:${TP.mute};">${esc(t.manifesto.hello(MERGE.firstName))}</p>
    <p class="lead-xl" style="margin:0;font-family:${F.display};font-size:28px;line-height:36px;font-weight:400;letter-spacing:-.01em;color:${TP.fg};">${esc(t.manifesto.text)}</p>
    ${spacer(48)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      ${t.manifesto.stats.map((s, i) => `
      <td class="col stat" width="33%" valign="top" style="padding:20px ${i < 2 ? '16px' : '0'} 0 0;border-top:1px solid ${TP.line};">
        <p style="margin:0;font-family:${F.display};font-size:56px;line-height:56px;font-weight:300;color:${C.brand};">${s.n}</p>
        <p style="margin:10px 0 0;font-family:${F.text};font-size:13px;line-height:19px;color:${TP.mute};">${esc(s.label)}</p>
      </td>`).join('')}
    </tr></table>`);

  /* ── 03 Колекція (2×2) ─────────────────────────── */
  const TS = THEME.sand;
  const card = (s) => `
        <a href="${esc(page('#coleccion', `series_${s.id}`))}" target="_blank" style="text-decoration:none;color:${TS.fg};">
          <img src="${img(s.img)}" width="252" height="315" alt="${esc(s.id[0].toUpperCase() + s.id.slice(1))}" class="fluid" style="display:block;width:100%;max-width:252px;height:auto;border:0;border-radius:16px;">
        </a>
        <p style="margin:16px 0 6px;font-family:${F.mono};font-size:11px;line-height:16px;letter-spacing:.12em;text-transform:uppercase;color:${C.brand};">${s.code} &nbsp;·&nbsp; ${s.models} ${esc(t.collection.models)}</p>
        <p style="margin:0 0 8px;font-family:${F.display};font-size:26px;line-height:28px;text-transform:uppercase;letter-spacing:-.01em;color:${TS.fg};">${esc(s.id[0].toUpperCase() + s.id.slice(1))}</p>
        <p style="margin:0 0 14px;font-family:${F.text};font-size:14px;line-height:21px;color:${TS.mute};">${esc(t.collection.series[s.id])}</p>
        ${more(t.collection.view, page('#coleccion', `series_${s.id}`), TS.fg)}`;
  const collection = section('sand', `
    ${label('02', t.collection.label, TS)}
    ${h(t.collection.h2, TS)}
    <p style="margin:24px 0 40px;max-width:440px;font-family:${F.text};font-size:16px;line-height:25px;color:${TS.mute};">${esc(t.collection.intro)}</p>
    ${grid(SERIES, card)}`);

  /* ── 04 Продукти: рядки з ціною «від» ──────────── */
  const productRows = Object.entries(t.products.items).map(([id, title], i) => `
      <tr><td style="border-top:1px solid ${TP.line};padding:20px 0;">
        <a href="${esc(page('#productos', `product_${id}`))}" target="_blank" style="text-decoration:none;color:${TP.fg};display:block;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td width="44" valign="top" style="font-family:${F.mono};font-size:12px;line-height:26px;color:${C.brand};">${pad2(i + 1)}</td>
            <td valign="top">
              <p style="margin:0;font-family:${F.display};font-size:22px;line-height:26px;text-transform:uppercase;letter-spacing:-.01em;color:${TP.fg};">${esc(title)}</p>
              <p style="margin:6px 0 0;font-family:${F.mono};font-size:12px;line-height:16px;letter-spacing:.04em;color:${TP.mute};">${esc(t.products.price(PRICES[id]))}</p>
            </td>
            <td width="30" align="right" valign="top" style="font-family:${F.display};font-size:22px;line-height:26px;color:${C.brand};">&#8594;</td>
          </tr></table>
        </a>
      </td></tr>`).join('');
  const products = section('paper', `
    ${label('03', t.products.label, TP)}
    ${h(t.products.h2, TP)}
    ${spacer(36)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${productRows}
      <tr><td style="border-top:1px solid ${TP.line};font-size:1px;line-height:1px;">&nbsp;</td></tr>
    </table>
    <p style="margin:14px 0 32px;font-family:${F.mono};font-size:11px;line-height:17px;letter-spacing:.04em;color:${TP.mute};">${esc(t.products.note)}</p>
    ${btn(t.products.all, page('#productos', 'products_all'), 'dark')}`);

  /* ── 05 Матеріали (темний блок + «marquee» контурним шрифтом) ── */
  const TDk = THEME.dark;
  const matCard = (m, i) => `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
          <td style="border:1px solid ${TDk.line};border-radius:16px;padding:22px 20px 24px;">
            <p style="margin:0 0 28px;font-family:${F.mono};font-size:11px;line-height:16px;letter-spacing:.12em;color:${TDk.accent};">${pad2(i + 1)}</p>
            <p style="margin:0 0 8px;font-family:${F.display};font-size:22px;line-height:24px;text-transform:uppercase;color:${TDk.fg};">${esc(m.t)}</p>
            <p style="margin:0;font-family:${F.text};font-size:14px;line-height:21px;color:${TDk.mute};">${esc(m.d)}</p>
          </td>
        </tr></table>`;
  const materials = section('dark', `
    ${label('04', t.materials.label, TDk)}
    <p aria-hidden="true" class="marquee" style="margin:0 0 36px;font-family:${F.display};font-size:46px;line-height:50px;font-weight:400;text-transform:uppercase;letter-spacing:-.01em;color:#6E5445;-webkit-text-stroke:1px ${C.sand2};">
      ${t.materials.marquee.map(esc).join(' <span style="-webkit-text-stroke:0;color:' + C.brand + ';">&#10033;</span> ')}
    </p>
    ${h(t.materials.h2, TDk)}
    ${spacer(40)}
    ${grid(t.materials.items, matCard, { rowGap: 16 })}
    ${spacer(36)}
    ${btn(t.materials.cta, wa, 'outline-light', { icon: 'wa' })}`, { pt: 64 });

  /* ── 06 Процес ─────────────────────────────────── */
  const TSa = THEME.sand;
  const process = section('sand', `
    ${label('05', t.process.label, TSa)}
    ${h(t.process.h2, TSa)}
    ${spacer(36)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${t.process.steps.map((s, i) => `
      <tr><td style="border-top:1px solid ${TSa.line};padding:22px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="76" valign="top" style="font-family:${F.display};font-size:40px;line-height:40px;font-weight:300;color:${C.brand};">${pad2(i + 1)}</td>
          <td valign="top">
            <p style="margin:2px 0 6px;font-family:${F.display};font-size:20px;line-height:24px;text-transform:uppercase;color:${TSa.fg};">${esc(s.t)}</p>
            <p style="margin:0;font-family:${F.text};font-size:14px;line-height:21px;color:${TSa.mute};">${esc(s.d)}</p>
          </td>
        </tr></table>
      </td></tr>`).join('')}
    </table>`);

  /* ── 07 Акцентний блок у фірмовому кольорі ─────── */
  const TB = THEME.brand;
  const visit = section('brand', `
    ${label('06', t.visit.label, TB)}
    ${h(t.visit.h2, TB, { size: 56 })}
    <p style="margin:24px 0 32px;max-width:420px;font-family:${F.text};font-size:16px;line-height:25px;color:${TB.mute};">${esc(t.visit.text)}</p>
    ${btn(t.visit.cta, wa, 'light', { icon: 'wa' })}`);

  /* ── 08 Контакт ────────────────────────────────── */
  const cRow = (k, v, href) => `
      <tr><td style="border-top:1px solid ${TP.line};padding:16px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td class="col" width="140" valign="top" style="font-family:${F.mono};font-size:11px;line-height:22px;letter-spacing:.12em;text-transform:uppercase;color:${TP.mute};">${esc(k)}</td>
          <td class="col" valign="top" style="font-family:${F.display};font-size:19px;line-height:24px;color:${TP.fg};">${href ? `<a href="${esc(href)}" target="_blank" style="color:${TP.fg};text-decoration:none;">${v}</a>` : v}</td>
        </tr></table>
      </td></tr>`;
  const contact = section('paper', `
    ${label('07', t.contact.label, TP)}
    ${h(t.contact.h2, TP, { size: 60, cls: 'h1' })}
    <p style="margin:24px 0 32px;max-width:440px;font-family:${F.text};font-size:16px;line-height:25px;color:${TP.mute};">${esc(t.contact.intro)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${cRow(t.contact.whatsapp, SITE.phoneDisplay, wa)}
      ${cRow(t.contact.call, SITE.phoneDisplay, `tel:${SITE.phone}`)}
      ${cRow(t.contact.email, esc(SITE.email), `mailto:${SITE.email}`)}
      ${cRow(t.contact.address, `${esc(SITE.address)}<br><span style="font-family:${F.mono};font-size:12px;letter-spacing:.04em;color:${TP.mute};">${esc(t.contact.hours)}</span>`, SITE.mapUrl)}
      <tr><td style="border-top:1px solid ${TP.line};font-size:1px;line-height:1px;">&nbsp;</td></tr>
    </table>
    ${spacer(36)}
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td class="col stack-gap" style="padding:0 10px 0 0;">${btn(t.contact.cta, page('#contacto', 'contact_cta'), 'brand')}</td>
      <td class="col" style="padding:0;">${btn('WhatsApp', wa, 'outline-dark', { icon: 'wa' })}</td>
    </tr></table>`, { pb: 80 });

  /* ── Футер з гігантським словом бренду ─────────── */
  const langLinks = LANGS.map((l) => l.code === lang
    ? `<span style="color:${C.paper};">${l.label}</span>`
    : `<a href="${esc(`${SITE.domain}${l.path}?${utm('footer_lang')}`)}" target="_blank" style="color:${C.muteD};text-decoration:none;">${l.label}</a>`).join(' &nbsp;/&nbsp; ');
  const footer = `
  <tr><td class="px" bgcolor="${C.dark}" style="background:${C.dark};padding:56px 40px 36px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td class="col" valign="top" style="padding-bottom:20px;">
        <img src="${img('logo-light.png')}" width="22" height="22" alt="" style="display:inline-block;vertical-align:middle;border:0;">
        <span style="display:inline-block;vertical-align:middle;margin-left:10px;font-family:${F.display};font-size:17px;line-height:22px;font-weight:500;letter-spacing:.22em;color:${C.paper};">${SITE.brand}</span>
        <p style="margin:14px 0 0;max-width:260px;font-family:${F.text};font-size:14px;line-height:21px;color:${C.muteD};">${esc(t.footer.tagline)}</p>
      </td>
      <td class="col" valign="top" align="right" style="font-family:${F.mono};font-size:11px;line-height:24px;letter-spacing:.12em;text-transform:uppercase;padding-bottom:20px;">
        <a href="${esc(page('', 'footer'))}" target="_blank" style="color:${C.paper};text-decoration:none;">${esc(t.footer.web)}</a> &nbsp;·&nbsp;
        <a href="${wa}" target="_blank" style="color:${C.paper};text-decoration:none;">WhatsApp</a><br>
        ${langLinks}
      </td>
    </tr></table>
    ${giant(SITE.brand)}
    <p style="margin:0;padding-top:20px;border-top:1px solid ${C.lineD};font-family:${F.text};font-size:12px;line-height:19px;color:${C.muteD};">
      ${esc(t.footer.why)}<br>
      <a href="${MERGE.unsubscribe}" target="_blank" style="color:${C.paper};text-decoration:underline;">${esc(t.footer.unsubscribe)}</a>
      &nbsp;·&nbsp; ${esc(SITE.address)} &nbsp;·&nbsp; © ${new Date().getFullYear()} ${SITE.brand}
    </p>
  </td></tr>`;

  return doc({
    lang: t.htmlLang,
    title: t.subject,
    preheader: t.preheader,
    top: `<p style="margin:0;padding:14px 16px;font-family:${F.mono};font-size:11px;line-height:16px;letter-spacing:.08em;color:${C.muteD};">
        <a href="${MERGE.webview}" target="_blank" style="color:${C.muteD};text-decoration:underline;">${esc(t.top.webview)}</a>
      </p>`,
    body: [hero, manifesto, collection, products, materials, process, visit, contact, footer].join('\n'),
  });
}
