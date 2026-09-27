/* Спільні «цеглинки» листів у стилі лендингу scroll-landing.
   Використовують обидва шаблони: template.mjs (розсилка evostone.es) і esputnik-partners.mjs.
   Усе інлайн-стилями й таблицями, бо поштові клієнти не знають CSS-змінних. */
import { C } from './data.mjs';

export const F = {
  display: "'Jost','Futura','Century Gothic','Trebuchet MS',Arial,sans-serif",
  text: "'Manrope','Helvetica Neue',Helvetica,Arial,sans-serif",
  mono: "'IBM Plex Mono','SFMono-Regular',Menlo,Consolas,monospace",
};

/* Кольори розділу за значенням data-bg з лендингу */
export const THEME = {
  paper: { bg: C.paper, fg: C.fg, mute: C.mute, line: C.line, accent: C.brand },
  sand:  { bg: C.sand, fg: C.fg, mute: C.mute, line: C.lineSand, accent: C.brand },
  dark:  { bg: C.dark, fg: C.fgD, mute: C.muteD, line: C.lineD, accent: C.sand2 },
  brand: { bg: C.brand, fg: C.fgD, mute: C.muteB, line: C.lineB, accent: C.sand2 },
};

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const pad2 = (n) => String(n).padStart(2, '0');
export const spacer = (h) => `<div style="height:${h}px;line-height:${h}px;font-size:1px;">&nbsp;</div>`;

/* Мітка розділу: «01 —— НАЗВА», як .label на лендингу. num = '' → лише текст */
export const label = (num, text, th) => `
    <p style="margin:0 0 24px;font-family:${F.mono};font-size:12px;line-height:16px;letter-spacing:.12em;text-transform:uppercase;color:${th.mute};">
      ${num ? `<span style="color:${th.accent};">${num}</span>&nbsp;&nbsp;<span style="color:${th.accent};opacity:.6;letter-spacing:-1px;">&#8212;&#8212;</span>&nbsp;&nbsp;` : ''}${esc(text)}
    </p>`;

/* Заголовок з рядків. Рядок 2 — акцентний колір і тонке накреслення, як .ln:nth-child(2) */
export const h = (lines, th, { size = 48, cls = 'h2', tag = 'h2' } = {}) => `
    <${tag} class="${cls}" style="margin:0;font-family:${F.display};font-size:${size}px;line-height:.95;letter-spacing:-.02em;text-transform:uppercase;font-weight:400;color:${th.fg};">
      ${lines.map((l, i) => `<span style="display:block;${i ? `color:${th.accent};font-weight:300;` : ''}">${esc(l)}</span>`).join('')}
    </${tag}>`;

export const lead = (text, th, { m = '24px 0 32px', max = 440 } = {}) =>
  `<p style="margin:${m};max-width:${max}px;font-family:${F.text};font-size:16px;line-height:25px;color:${th.mute};">${text}</p>`;

/* Кнопка-пігулка. variant: light | dark | brand | outline-light | outline-dark.
   icon: 'arrow' | 'wa' | '' ; для 'wa' потрібні wa-light.png / wa-dark.png в imgBase */
export const makeBtn = (imgBase) => (text, href, variant, { icon = 'arrow' } = {}) => {
  const v = {
    light: { bg: C.paper, fg: C.dark, bd: C.paper },
    dark: { bg: C.dark, fg: C.paper, bd: C.dark },
    brand: { bg: C.brand, fg: C.paper, bd: C.brand },
    'outline-light': { bg: 'transparent', fg: C.paper, bd: '#BFAE9F' },
    'outline-dark': { bg: 'transparent', fg: C.dark, bd: C.dark },
  }[variant];
  const tail = icon === 'arrow' ? '&nbsp;&nbsp;&#8594;' : '';
  const head = icon === 'wa' ? `<img src="${imgBase}${variant.includes('dark') ? 'wa-dark.png' : 'wa-light.png'}" width="16" height="16" alt="" style="display:inline-block;vertical-align:-3px;border:0;margin-right:10px;">` : '';
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table;border-collapse:separate;"><tr>
      <td align="center" bgcolor="${v.bg === 'transparent' ? '' : v.bg}" style="border-radius:999px;background:${v.bg};border:1px solid ${v.bd};mso-padding-alt:16px 26px;">
        <a class="btn-a" href="${esc(href)}" target="_blank" style="display:inline-block;padding:16px 26px;border-radius:999px;font-family:${F.display};font-size:13px;line-height:14px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${v.fg};text-decoration:none;white-space:nowrap;">${head}${esc(text)}${tail}</a>
      </td></tr></table>`;
};

/* Посилання-підкреслення «Детальніше →» */
export const more = (text, href, color) =>
  `<a href="${esc(href)}" target="_blank" style="font-family:${F.display};font-size:12px;line-height:14px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${color};text-decoration:none;border-bottom:1px solid ${color};padding-bottom:3px;">${esc(text)} &#8594;</a>`;

/* Розділ листа: рядок таблиці з фоном теми */
export const section = (bgName, inner, { pt = 72, pb = 72, extra = '' } = {}) => {
  const th = THEME[bgName];
  return `
  <tr><td class="px" bgcolor="${th.bg}" style="background:${th.bg};padding:${pt}px 40px ${pb}px;${extra}">
${inner}
  </td></tr>`;
};

/* Сітка у 2 (або n) колонки; на телефоні — у стовпчик (stack: false — лишається рядком) */
export const grid = (arr, fn, { cols = 2, gap = 16, rowGap = 40, stack = true } = {}) => {
  let out = '';
  const w = Math.floor(100 / cols);
  for (let i = 0; i < arr.length; i += cols) {
    const last = i + cols >= arr.length;
    out += '<tr>';
    for (let k = 0; k < cols; k++) {
      const item = arr[i + k];
      // відступи так, щоб усі колонки мали однакову внутрішню ширину
      const pl = Math.round((gap * k) / cols);
      const pr = Math.round((gap * (cols - 1 - k)) / cols);
      out += `
        <td${stack ? ' class="col"' : ''} width="${w}%" valign="top" style="padding:0 ${pr}px ${last ? 0 : rowGap}px ${pl}px;">${item !== undefined ? fn(item, i + k) : ''}</td>`;
    }
    out += '</tr>';
  }
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${out}</table>`;
};

/* Лого: PNG-знак + слово бренду текстом */
export const logo = (imgBase, word, color = C.paper) => `
        <img src="${imgBase}logo-light.png" width="22" height="22" alt="" style="display:inline-block;vertical-align:middle;border:0;">
        <span style="display:inline-block;vertical-align:middle;margin-left:10px;font-family:${F.display};font-size:17px;line-height:22px;font-weight:500;letter-spacing:.22em;color:${color};">${esc(word)}</span>`;

/* Гігантське слово бренду у футері */
export const giant = (word) =>
  `<p class="giant" aria-hidden="true" style="margin:28px 0 28px;font-family:${F.display};font-size:132px;line-height:100px;font-weight:500;letter-spacing:-.02em;color:#6A5040;white-space:nowrap;">${esc(word)}</p>`;

/* Каркас документа: head зі стилями для телефона, прихований прехедер, контейнер 600px */
export const doc = ({ lang, title, preheader, top = '', body }) => `<!DOCTYPE html>
<html lang="${lang}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no,address=no,email=no,date=no">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${esc(title)}</title>
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
    .col-gap{padding-bottom:16px!important;}
    .stack-gap{padding-bottom:12px!important;}
    .stat{padding-bottom:20px!important;}
    .fluid{width:100%!important;max-width:100%!important;height:auto!important;}
    .h1{font-size:40px!important;}
    .h2{font-size:34px!important;}
    .lead-xl{font-size:22px!important;line-height:30px!important;}
    .marquee{font-size:32px!important;line-height:38px!important;}
    .giant{font-size:76px!important;line-height:64px!important;}
    .hero-body{padding-top:170px!important;}
    .hide-m{display:none!important;}
    .btn-a{white-space:normal!important;}
    .cap{font-size:14px!important;}
    .sale-word{font-size:48px!important;line-height:48px!important;}
    .arrow-m{padding:12px 0!important;text-align:left!important;}
  }
</style>
</head>
<body id="body" style="margin:0;padding:0;background:${C.dark};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${C.dark};opacity:0;">${esc(preheader)}${'&#847;&zwnj;&nbsp;'.repeat(60)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.dark}" style="background:${C.dark};">
    <tr><td align="center" style="padding:0;">
      ${top}
      <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
${body}
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
      ${spacer(24)}
    </td></tr>
  </table>
</body>
</html>
`;
