/* Evostone (Stone Evolution) España — заявки: попап і форми.
   Підключається після main.js / landing.js (беремо з них window.sendLead і window.__ui).
   · Кнопки з data-lead відкривають попап #leadModal; значення data-lead (або data-chip) — продукт,
     який одразу відмічається у формі. Без JS кнопки лишаються звичайними посиланнями на #contacto.
   · Усі форми з data-lead-form (форма внизу сторінки й форма в попапі) відправляються однаково. */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const UI = () => window.__ui || {};
  const track = (ev, p) => { if (UI().track) UI().track(ev, p); };

  /* ── UTM ───────────────────────────────────────────────── */
  const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
  let utm = {};
  try { utm = JSON.parse(sessionStorage.getItem('es_utm') || '{}'); } catch (_) {}
  const q = new URLSearchParams(location.search);
  UTM.forEach((k) => { if (q.get(k)) utm[k] = q.get(k); });
  try { sessionStorage.setItem('es_utm', JSON.stringify(utm)); } catch (_) {}

  /* ── Форми ─────────────────────────────────────────────── */
  function bindForm(form) {
    const f = form.elements;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let ok = true;
      [[f.name, f.name.value.trim().length > 1], [f.phone, f.phone.value.replace(/\D/g, '').length >= 7]].forEach(([el, valid]) => {
        el.closest('.field').classList.toggle('is-invalid', !valid);
        if (!valid) ok = false;
      });
      f.consent.closest('.consent').classList.toggle('is-invalid', !f.consent.checked);
      if (!f.consent.checked) ok = false;
      if (!ok) { (form.querySelector('.is-invalid input') || f.consent).focus(); return; }

      const btn = form.querySelector('[type=submit]');
      if (!btn.dataset.label) btn.dataset.label = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = btn.dataset.sending;
      $('.form-error', form).hidden = true;

      const data = Object.assign({
        name: f.name.value.trim(),
        phone: f.phone.value.trim(),
        products: $$('input[name=product]', form).filter((i) => i.type === 'hidden' || i.checked).map((i) => i.value).filter(Boolean),
        comment: f.comment.value.trim(),
        lang: f.lang.value,
        page: location.href,
        ts: new Date().toISOString(),
      }, f.landing ? { landing: f.landing.value } : {}, f.source ? { source: f.source.value } : {}, utm);

      const done = () => { $('.form-ok', form).hidden = false; form.dataset.sent = '1'; };
      try {
        if (f.botcheck && f.botcheck.checked) { done(); return; }
        await window.sendLead(data);
        track('lead_submit', { products: data.products.join(','), lang: data.lang, source: data.source || 'page' });
        done();
      } catch (err) {
        $('.form-error', form).hidden = false;
        btn.disabled = false;
        btn.innerHTML = btn.dataset.label;
      }
    });
    $$('input', form).forEach((i) => i.addEventListener('input', () => {
      const w = i.closest('.field, .consent');
      if (w) w.classList.remove('is-invalid');
    }));
  }
  function resetForm(form) {
    if (!form.dataset.sent) return;
    form.reset();
    delete form.dataset.sent;
    $('.form-ok', form).hidden = true;
    const btn = form.querySelector('[type=submit]');
    btn.disabled = false;
    if (btn.dataset.label) btn.innerHTML = btn.dataset.label;
  }
  $$('form[data-lead-form]').forEach(bindForm);

  /* Відмітити продукт у формі (чекбокс-чип) */
  function pick(form, v) {
    if (!form || !v) return;
    const box = $(`.chips input[value="${v}"]`, form);
    if (box) box.checked = true;
  }

  /* ── Попап ─────────────────────────────────────────────── */
  const modal = $('#leadModal');
  if (!modal) return;
  const panel = $('.lead-modal-panel', modal);
  const mform = $('form', modal);
  const root = document.documentElement;
  let lastFocus = null;

  function open(opener) {
    resetForm(mform);
    $$('.chips input', mform).forEach((i) => { i.checked = false; });
    pick(mform, opener.dataset.lead || opener.dataset.chip);
    lastFocus = opener;
    modal.setAttribute('aria-hidden', 'false');
    modal.offsetHeight; // перезапуск переходу
    modal.classList.add('is-open');
    root.classList.add('lead-open');
    if (UI().lenis) UI().lenis.stop();
    panel.scrollTop = 0;
    setTimeout(() => (mform.elements.name || panel).focus({ preventScroll: true }), 80);
    track('lead_popup_open', { products: opener.dataset.lead || opener.dataset.chip || '' });
  }
  function close() {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    root.classList.remove('lead-open');
    if (UI().lenis && !root.classList.contains('menu-open')) UI().lenis.start();
    if (lastFocus && document.contains(lastFocus) && lastFocus.offsetParent !== null) lastFocus.focus({ preventScroll: true });
  }

  /* Перехоплюємо клік раніше за плавний скрол до #contacto (фаза захоплення) */
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-lead]');
    if (!opener || e.button || e.metaKey || e.ctrlKey || e.shiftKey) return;
    /* Стилі попапу не завантажились (старий кеш, збій мережі) — кнопка працює як звичайне посилання на форму */
    if (getComputedStyle(modal).position !== 'fixed') return;
    e.preventDefault();
    e.stopPropagation();
    const ui = UI();
    if (opener.closest('.drawer') && ui.closeDrawer) { ui.closeDrawer(() => open(opener)); return; }
    if (root.classList.contains('menu-open') && ui.toggleMenu) ui.toggleMenu(false);
    open(opener);
  }, true);

  modal.addEventListener('click', (e) => { if (e.target.closest('[data-lead-close]')) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) { e.stopImmediatePropagation(); close(); }
  }, true);
  /* Фокус не виходить за межі попапу */
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = $$('a[href], button:not([disabled]), input:not([type=hidden]):not(.hp), textarea', panel).filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });

  /* Посилання з #solicitud в адресі одразу відкриває попап (для реклами й соцмереж) */
  if (location.hash === '#solicitud') setTimeout(() => open(document.body), 600);
})();
