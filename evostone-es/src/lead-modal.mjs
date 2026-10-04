/* Попап «Заявка» — спільний для головної, посадкових і галереї.
   Відкривається кнопками з атрибутом data-lead (значення = продукт, який відмітити у формі).
   Логіка — assets/js/lead.js, стилі — блок «Попап заявки» в assets/css/style.css.
   Тексти беремо з наявних перекладів (content/<мова>.mjs → contact.form), нових рядків не треба. */
import { SITE } from './data.mjs';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ARROW = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const WA = '<svg class="ico ico-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg>';

/* t — тексти головної цієї мови; title — рядки заголовка; intro — підзаголовок;
   chips — [{v, l}] для вибору продукту (головна, галерея) або product/landing — прихований продукт (посадкова) */
export function renderLeadModal({ t, lang, title, intro, chips = null, product = '', landing = '' }) {
  const f = t.contact.form;
  return `
<div class="lead-modal" id="leadModal" aria-hidden="true">
  <div class="lead-modal-overlay" data-lead-close></div>
  <div class="lead-modal-panel" role="dialog" aria-modal="true" aria-labelledby="leadModalTitle" tabindex="-1" data-lenis-prevent>
    <button class="lead-modal-close" type="button" data-lead-close aria-label="${esc(t.a11y.close)}"><span></span><span></span></button>
    <h2 class="lead-modal-title" id="leadModalTitle">${title.map(esc).join('<br>')}</h2>
    <form class="form" id="leadModalForm" data-lead-form novalidate>
      <p class="lead">${esc(intro)}</p>
      <div class="field-row">
        <label class="field"><span>${esc(f.name)}</span><input name="name" autocomplete="name" required></label>
        <label class="field"><span>${esc(f.phone)}</span><input name="phone" type="tel" autocomplete="tel" inputmode="tel" required></label>
      </div>
      ${chips ? `<fieldset class="chips">
        <legend>${esc(f.what)}</legend>
        ${chips.map((c) => `<label class="chip"><input type="checkbox" name="product" value="${c.v}"><span>${esc(c.l)}</span></label>`).join('\n        ')}
      </fieldset>` : `<input type="hidden" name="product" value="${esc(product)}">${landing ? `\n      <input type="hidden" name="landing" value="${esc(landing)}">` : ''}`}
      <label class="field"><span>${esc(f.measures)}</span><textarea name="comment" rows="2" placeholder="${esc(f.measuresPh)}"></textarea></label>
      <label class="consent"><input type="checkbox" name="consent" required><span>${esc(f.consent)}</span></label>
      <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <input type="hidden" name="lang" value="${lang}">
      <input type="hidden" name="source" value="popup">
      <div class="form-actions">
        <button class="btn btn-light" type="submit" data-sending="${esc(f.sending)}">${esc(f.submit)} ${ARROW}</button>
        <a class="link-btn link-light" href="${SITE.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp">${WA} WhatsApp</a>
      </div>
      <p class="form-error" role="alert" hidden>${esc(f.error)}</p>
      <div class="form-ok" hidden>
        <h3>${esc(f.okTitle)}</h3>
        <p>${esc(f.okText)}</p>
      </div>
    </form>
  </div>
</div>`;
}
