/* Шаблон листа-розсилки у стилі лендингу scroll-landing (evostone-es/).
   Один шаблон на всі мови. Верстка під поштові клієнти: таблиці, інлайн-стилі,
   ширина 600px, на телефоні колонки стають в стовпчик (<style> у <head>).
   Послідовність фону розділів повторює лендинг: dark → paper → sand → paper → dark → sand → brand → paper → dark. */
import { SITE, LANGS, CAMPAIGN, IMG_BASE, MERGE, C, SERIES, PRICES } from './data.mjs';

const F = {
  display: "'Jost','Futura','Century Gothic','Trebuchet MS',Arial,sans-serif",
  text: "'Manrope','Helvetica Neue',Helvetica,Arial,sans-serif",
  mono: "'IBM Plex Mono','SFMono-Regular',Menlo,Consolas,monospace",
};

/* Кольори розділу за значенням data-bg з лендингу */
const THEME = {
  paper: { bg: C.paper, fg: C.fg, mute: C.mute, line: C.line, accent: C.brand },
  sand:  { bg: C.sand, fg: C.fg, mute: C.mute, line: C.lineSand, accent: C.brand },
  dark:  { bg: C.dark, fg: C.fgD, mute: C.muteD, line: C.lineD, accent: C.sand2 },
  brand: { bg: C.brand, fg: C.fgD, mute: C.muteB, line: C.lineB, accent: C.sand2 },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (f) => IMG_BASE + f;
const pad2 = (n) => String(n).padStart(2, '0');

export function render(t, lang) {
  const L = LANGS.find((l) => l.code === lang);
  const utm = (content) => `utm_source=newsletter&utm_medium=email&utm_campaign=${CAMPAIGN.id}&utm_content=${content}`;
  const page = (hash = '', content = 'link', path = L.path) => `${SITE.domain}${path}?${utm(content)}${hash}`;
  const wa = SITE.whatsapp;

  /* ── Дрібні блоки ─────────────────────────────── */
  const label = (num, text, th) => `
    <p style="margin:0 0 24px;font-family:${F.mono};font-size:12px;line-height:16px;letter-spacing:.12em;text-transform:uppercase;color:${th.mute};">
      ${num ? `<span style="color:${th.accent};">${num}</span>&nbsp;&nbsp;<span style="color:${th.accent};opacity:.6;letter-spacing:-1px;">&#8212;&#8212;</span>&nbsp;&nbsp;` : ''}${esc(text)}
    </p>`;

  /* Рядок 2 заголовка — акцентний колір і тонке накреслення, як .ln:nth-child(2) на лендингу */
  const h = (lines, th, { size = 48, cls = 'h2', tag = 'h2' } = {}) => `
    <${tag} class="${cls}" style="margin:0;font-family:${F.display};font-size:${size}px;line-height:.95;letter-spacing:-.02em;text-transform:uppercase;font-weight:400;color:${th.fg};">
      ${lines.map((l, i) => `<span style="display:block;${i ? `color:${th.accent};font-weight:300;` : ''}">${esc(l)}</span>`).join('')}
    </${tag}>`;

  /* Кнопка-пігулка. variant: light | dark | brand | outline-light | outline-dark */
  const btn = (text, href, variant, { icon = 'arrow', content = 'button' } = {}) => {
    const v = {
      light: { bg: C.paper, fg: C.dark, bd: C.paper },
      dark: { bg: C.dark, fg: C.paper, bd: C.dark },
      brand: { bg: C.brand, fg: C.paper, bd: C.brand },
      'outline-light': { bg: 'transparent', fg: C.paper, bd: '#BFAE9F' },
      'outline-dark': { bg: 'transparent', fg: C.dark, bd: C.dark },
    }[variant];
    const tail = icon === 'arrow' ? '&nbsp;&nbsp;&#8594;' : '';
    const head = icon === 'wa' ? `<img src="${img(variant.includes('dark') ? 'wa-dark.png' : 'wa-light.png')}" width="16" height="16" alt="" style="display:inline-block;vertical-align:-3px;border:0;margin-right:10px;">` : '';
    const href2 = href.startsWith(SITE.domain) ? href.replace(/utm_content=[^&#]*/, `utm_content=${content}`) : href;
    return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table;border-collapse:separate;"><tr>
      <td align="center" bgcolor="${v.bg === 'transparent' ? '' : v.bg}" style="border-radius:999px;background:${v.bg};border:1px solid ${v.bd};mso-padding-alt:16px 26px;">
        <a class="btn-a" href="${esc(href2)}" target="_blank" style="display:inline-block;padding:16px 26px;border-radius:999px;font-family:${F.display};font-size:13px;line-height:14px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${v.fg};text-decoration:none;white-space:nowrap;">${head}${esc(text)}${tail}</a>
      </td></tr></table>`;
  };

  const section = (bgName, inner, { pt = 72, pb = 72, extra = '' } = {}) => {
    const th = THEME[bgName];
    return `
  <tr><td class="px" bgcolor="${th.bg}" style="background:${th.bg};padding:${pt}px 40px ${pb}px;${extra}">
${inner}
  </td></tr>`;
  };

  const spacer = (h) => `<div style="height:${h}px;line-height:${h}px;font-size:1px;">&nbsp;</div>`;

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
          <td class="col stack-gap" style="padding:0 10px 0 0;">${btn(t.hero.cta, page('#contacto', 'hero'), 'light', { content: 'hero_cta' })}</td>
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
        <a href="${esc(page('#coleccion', `series_${s.id}`))}" target="_blank" style="font-family:${F.display};font-size:12px;line-height:14px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${TS.fg};text-decoration:none;border-bottom:1px solid ${TS.fg};padding-bottom:3px;">${esc(t.collection.view)} &#8594;</a>`;
  const rows2 = (arr, fn, gap = 16) => {
    let out = '';
    for (let i = 0; i < arr.length; i += 2) {
      out += `<tr>
        <td class="col" width="50%" valign="top" style="padding:0 ${gap / 2}px ${i + 2 < arr.length ? 40 : 0}px 0;">${fn(arr[i], i)}</td>
        <td class="col" width="50%" valign="top" style="padding:0 0 ${i + 2 < arr.length ? 40 : 0}px ${gap / 2}px;">${arr[i + 1] ? fn(arr[i + 1], i + 1) : ''}</td>
      </tr>`;
    }
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${out}</table>`;
  };
  const collection = section('sand', `
    ${label('02', t.collection.label, TS)}
    ${h(t.collection.h2, TS)}
    <p style="margin:24px 0 40px;max-width:440px;font-family:${F.text};font-size:16px;line-height:25px;color:${TS.mute};">${esc(t.collection.intro)}</p>
    ${rows2(SERIES, card)}`);

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
    ${btn(t.products.all, page('#productos', 'products'), 'dark', { content: 'products_all' })}`);

  /* ── 05 Матеріали (темний блок + «marquee» контурним шрифтом) ── */
  const TDk = THEME.dark;
  const matCard = (m, i) => `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
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
    ${rows2(t.materials.items, matCard, 16).replace(/40px 0;/g, '16px 0;').replace(/0 0 40px/g, '0 0 16px')}
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
      <td class="col stack-gap" style="padding:0 10px 0 0;">${btn(t.contact.cta, page('#contacto', 'contact'), 'brand', { content: 'contact_cta' })}</td>
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
    <p class="giant" aria-hidden="true" style="margin:28px 0 28px;font-family:${F.display};font-size:132px;line-height:100px;font-weight:500;letter-spacing:-.02em;color:#6A5040;white-space:nowrap;">${SITE.brand}</p>
    <p style="margin:0;padding-top:20px;border-top:1px solid ${C.lineD};font-family:${F.text};font-size:12px;line-height:19px;color:${C.muteD};">
      ${esc(t.footer.why)}<br>
      <a href="${MERGE.unsubscribe}" target="_blank" style="color:${C.paper};text-decoration:underline;">${esc(t.footer.unsubscribe)}</a>
      &nbsp;·&nbsp; ${esc(SITE.address)} &nbsp;·&nbsp; © ${new Date().getFullYear()} ${SITE.brand}
    </p>
  </td></tr>`;

  return `<!DOCTYPE html>
<html lang="${t.htmlLang}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no,address=no,email=no,date=no">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${esc(t.subject)}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<style>h1,h2,p,td,a,span{font-family:Arial,sans-serif !important;}</style><![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Jost:wght@300;400;500&family=Manrope:wght@400;500&display=swap" rel="stylesheet">
<!--<![endif]-->
<style>
  body{margin:0;padding:0;width:100%!important;background:${C.dark};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
  table{border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;}
  img{-ms-interpolation-mode:bicubic;}
  a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;}
  u + #body a{color:inherit;text-decoration:none;}
  @media (max-width:620px){
    .wrap{width:100%!important;}
    .px{padding-left:24px!important;padding-right:24px!important;}
    .col{display:block!important;width:100%!important;padding-left:0!important;padding-right:0!important;}
    .stack-gap{padding-bottom:12px!important;}
    .stat{padding-bottom:20px!important;}
    .fluid{max-width:100%!important;}
    .h1{font-size:44px!important;}
    .h2{font-size:36px!important;}
    .lead-xl{font-size:22px!important;line-height:30px!important;}
    .marquee{font-size:32px!important;line-height:38px!important;}
    .giant{font-size:76px!important;line-height:64px!important;}
    .hero-body{padding-top:170px!important;}
    .hide-m{display:none!important;}
    .btn-a{white-space:normal!important;}
  }
</style>
</head>
<body id="body" style="margin:0;padding:0;background:${C.dark};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${C.dark};opacity:0;">${esc(t.preheader)}${'&#847;&zwnj;&nbsp;'.repeat(60)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.dark}" style="background:${C.dark};">
    <tr><td align="center" style="padding:0;">
      <p style="margin:0;padding:14px 16px;font-family:${F.mono};font-size:11px;line-height:16px;letter-spacing:.08em;color:${C.muteD};">
        <a href="${MERGE.webview}" target="_blank" style="color:${C.muteD};text-decoration:underline;">${esc(t.top.webview)}</a>
      </p>
      <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
${hero}
${manifesto}
${collection}
${products}
${materials}
${process}
${visit}
${contact}
${footer}
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
      ${spacer(24)}
    </td></tr>
  </table>
</body>
</html>
`;
}
