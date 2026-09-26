/**
 * Бот розвитку: 90-денний челендж
 * Telegram + Google Таблиця + Gemini (голос, розбір тексту, коуч)
 */

// ===================== НАЛАШТУВАННЯ =====================
const BOT_TOKEN      = 'ВСТАВ_ТОКЕН_НОВОГО_БОТА';
const WEBAPP_URL     = 'ВСТАВ_URL_ПІСЛЯ_РОЗГОРТАННЯ';   // закінчується на /exec
const OWNER_ID       = 0;                                // твій Telegram ID (бот підкаже на /start)
const GEMINI_API_KEY = 'ВСТАВ_КЛЮЧ_GEMINI';
const GEMINI_MODEL   = 'gemini-3.1-flash-lite';
// Якщо основна модель недоступна — бот сам пробує ці (…-latest Google оновлює сам)
const GEMINI_FALLBACKS = ['gemini-flash-lite-latest', 'gemini-flash-latest', 'gemini-2.5-flash'];
const DASH_KEY       = 'ВСТАВ_ПАРОЛЬ_ДАШБОРДА';          // будь-який набір літер і цифр
const TZ             = 'Europe/Madrid';
const CURRENCY       = '€';

// ----- Челендж -----
const CHALLENGE_START = '2026-09-25';
const CHALLENGE_DAYS  = 90;

// Цілі на 90 днів (заповнимо після інтерв'ю). Їх бачить коуч.
const GOALS_90 = `
💼 Estone: оборот 50 000 € (мінімум 20 000 €), Україна 25 000 € + Іспанія 25 000 €. Маржа 15–20%.
   Близько 30 угод. Фокус: раковини з щілинним зливом і кухонні стільниці. Оборот рахуємо в день передоплати.
   Віха: до 24.10 консультація з гестором щодо autónomo.
🇪🇸 Іспанська: 450 нових слів (5 на день), 60 хв активного навчання щодня + подкасти фоном.
   Слабкі місця: минулі часи, неправильні дієслова, llevar/traer/tomar/coger/poner/quitar.
   Фінал 23.12: телефонна розмова іспанською + повторний тест рівня.
🇬🇧 Англійська: 15 хв щодня (105 хв на тиждень) — підтримувати й розвивати. Подкасти, серіали, розмова.
💪 Спорт: 3 тренування на тиждень (36+ за челендж). Вага з ~80,5 до 77,5 кг.
   10 підтягувань за підхід. Видимий прес і сильна спина.
📖 Читання українською та англійською, 🎹 музика (Suno) 15 хв щодня, 🚭 кинути курити, 😴 налагодити сон.
📝 Щодня план зранку і підсумок увечері.
🔥 Навіщо: впевненість у собі і доказ, що можна працювати віддалено на Україну та відкрити autónomo.
`;

// ----- Числові цілі челенджу -----
const TURNOVER_GOAL = 50000;
const TURNOVER_MIN  = 20000;
// План обороту по календарних місяцях: target — ціль, min — мінімум
const TURNOVER_PLAN = {
  '2026-09': { target: 0,     min: 0 },
  '2026-10': { target: 12000, min: 5000 },
  '2026-11': { target: 17000, min: 7000 },
  '2026-12': { target: 21000, min: 8000 },
};
const WORDS_GOAL   = 450;
const WEIGHT_GOAL  = 77.5;
const PULLUP_GOAL  = 10;
const WORDS_PER_DAY = 5;

// ----- Розклад (години за Мадридом) -----
const MORNING_HOUR = 7;    // ранковий план
const NUDGE_HOUR   = 15;   // нагадування, якщо за день нічого не записано
const EVENING_HOUR = 21;   // вечірня перевірка
const REVIEW_HOUR  = 19;   // недільний огляд
const LATE_HOUR    = 23;   // пізнє нагадування, якщо немає підсумку дня

// ----- Цілі на тиждень і місяць -----
const DEV_TARGETS = {
  'Дотик': 130, 'Відповідь': 26, 'Дзвінок': 20, 'Розмова': 13, 'Прорахунок': 8,
  'Іспанська': 420,   // активних хвилин (60 на день)
  'Англійська': 105,  // активних хвилин (15 на день)
  'Слова': 35,        // 5 на день
  'Спорт': 3,         // тренувань
  'Читання': 105,     // хвилин (15 на день)
  'Музика': 105,      // хвилин (15 на день)
};

// ----- Швидкий запис через # -----
const DEV_ALIASES = {
  'Дотик':      ['дотик', 'дотики', 'повідомлення', 'viber', 'вайбер', 'linkedin', 'email'],
  'Відповідь':  ['відповідь', 'відповіді', 'reply'],
  'Дзвінок':    ['дзвінок', 'дзвінки', 'call'],
  'Розмова':    ['розмова', 'розмови', 'зустріч', 'зустрічі'],
  'Прорахунок': ['прорахунок', 'прорахунки', 'кп', 'quote'],
  'Угода':      ['угода', 'угоди', 'продаж', 'deal'],
  'Іспанська':  ['іспанська', 'іспан', 'es', 'español', 'espanol'],
  'Англійська': ['англійська', 'англ', 'en', 'english', 'інгліш'],
  'Спорт':      ['спорт', 'тренування', 'sport', 'gym'],
  'Слова':      ['слова', 'words'],
  'Вага':       ['вага', 'вес', 'weight'],
  'Підтягування': ['підтягування', 'підтяг', 'турнік', 'pullups'],
  'Читання':    ['читання', 'читав', 'книга', 'reading'],
  'Музика':     ['музика', 'suno', 'суно', 'music'],
  'Сон':        ['сон', 'спав', 'sleep'],
  'Сигарети':   ['сигарети', 'сигарета', 'цигарки', 'курив', 'smoke'],
  'Без сигарет': ['некурив', 'безсигарет'],
  'Підсумок':   ['підсумок'],
  'Instagram':  ['інста', 'інстаграм', 'insta', 'instagram'],
  'Сайт':       ['сайт', 'site', 'web'],
};
const SNAPSHOTS = ['Вага', 'Підтягування', 'Instagram', 'Сайт'];

// ----- Звички (система «Атомних звичок») -----
const HABITS_START = '2026-09-27';   // з цього дня бот рахує звички і пропуски
const IDENTITY = 'Я людина, яка тримає слово, дане собі.';
// mini — версія на 2 хвилини для поганого дня; hint — що робити, якщо звичку не відмітити кнопкою
const HABITS = [
  { k: 'План',        icon: '📝', mini: 'одна головна справа і час', hint: 'Задай план: /plan' },
  { k: 'Продажі',     icon: '💼', mini: 'одне повідомлення клієнту', hint: 'Напиши або надиктуй, що зробив: «написав 5 дизайнерам»' },
  { k: 'Іспанська',   icon: '🇪🇸', mini: '5 хвилин або слова дня' },
  { k: 'Англійська',  icon: '🇬🇧', mini: '5 хвилин подкасту' },
  { k: 'Читання',     icon: '📖', mini: 'одна сторінка' },
  { k: 'Музика',      icon: '🎹', mini: '2 хвилини в Suno' },
  { k: 'Без сигарет', icon: '🚭', mini: 'відкласти наступну сигарету на 30 хв' },
  { k: 'Підсумок',    icon: '🌙', mini: 'три речення', hint: 'Напиши підсумок: #підсумок … або надиктуй після вечірньої перевірки' },
];
const QUICK_HABITS = { 'Іспанська': 15, 'Англійська': 15, 'Читання': 15, 'Музика': 15, 'Без сигарет': 1 };  // кнопка = запис
const SALES_DAY_MIN = 10;    // мінімум продажних дій на день; поки менше — нові ідеї чекають
const SLEEP_GOAL    = 7;     // годин
const QUOTE_CONV    = 0.175; // конверсія прорахунків у продажі (15–20%)

// ----- Тон: жорсткий, як просив Ігор -----
const TAUNTS = [
  'Ну добре, можеш цього не робити. Як хочеш. Це ж ти хотів росту і змін, а не я.',
  'Ну добре, роби що хочеш. Ти ж краще знаєш 🙂',
  'Ну да, да, ти ж сильний. Потім усе наздоженеш, як завжди)))) Ага, ага.',
  'Знову «завтра»? Цих «завтра» вже набралося на 40 років.',
  'Обіцянка собі — теж обіцянка. Чи тобі можна не тримати слово?',
  'Нічого страшного. Просто ще один день, як усі попередні роки.',
  'Цікаво, скільки ще разів ти пообіцяєш собі і не зробиш?',
];
const DOUBLE_MISS = [
  'Два дні поспіль без: {h}. Саме так і минули роки до 40 — «потім», «з понеділка», «наздожену». І де результат?',
  'Другий пропуск поспіль: {h}. Один пропуск — випадковість. Два — твоя стара звичка здаватися.',
  'Знову нуль: {h}. Той Ігор, що все відкладав, радий — він знову виграє.',
];
// ========================================================

const METRICS      = Object.keys(DEV_ALIASES);
const FIN_KEYS     = ['Дотик', 'Відповідь', 'Дзвінок', 'Розмова', 'Прорахунок'];
const FUNNEL       = ['Дотик', 'Відповідь', 'Розмова', 'Прорахунок', 'Угода'];
const SHEET_LOG    = 'Записи';
const SHEET_PLAN   = 'Плани';
const SHEET_REVIEW = 'Огляди';
const SHEET_WORDS  = 'Слова';
const SHEET_JOURNAL = 'Щоденник';
const SHEET_IDEAS  = 'Ідеї';
const WORD_TOPICS = [
  'камінь, кухні й ванні кімнати (для продажів Estone): матеріали, вироби, монтаж',
  'розмова з клієнтом: ціна, терміни, замір, доставка, передоплата',
  'дієслова, що плутаються: llevar, traer, tomar, coger, poner, meter, quitar, sacar, dejar — з прикладами',
  'неправильні дієслова в минулому часі (pretérito indefinido) у фразах',
  'робота в цеху, ЧПУ, інструменти, безпека',
  'побут: школа дитини, лікар, документи, банк',
  'телефонна розмова: корисні фрази',
];
const WORD_INTERVALS = [1, 3, 7, 14];   // повторення через 1, 3, 7, 14 днів
const ICONS = { 'Дотик': '📨', 'Відповідь': '💬', 'Дзвінок': '📞', 'Розмова': '🤝', 'Прорахунок': '📐',
  'Угода': '🎉', 'Іспанська': '🇪🇸', 'Англійська': '🇬🇧', 'Слова': '📚', 'Спорт': '💪', 'Вага': '⚖️', 'Підтягування': '🏋️',
  'Instagram': '📸', 'Сайт': '🌐',
  'Читання': '📖', 'Музика': '🎹', 'Сон': '😴', 'Сигарети': '🚬', 'Без сигарет': '🚭', 'Підсумок': '🌙' };

// ======================= ВХІД ВІД TELEGRAM =======================

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(25000);
    const update = JSON.parse(e.postData.contents);
    const cache = CacheService.getScriptCache();
    const key = 'u_' + update.update_id;
    if (!cache.get(key)) {
      cache.put(key, '1', 21600);
      if (update.callback_query) handleCallback_(update.callback_query);
      else if (update.message) handleMessage_(update.message);
    }
  } catch (err) {
    console.error(err);
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
  return HtmlService.createHtmlOutput('ok');
}

function doGet(e) {
  const key = e && e.parameter ? e.parameter.key : '';
  if (!dashOn_() || key !== DASH_KEY) return HtmlService.createHtmlOutput('Бот працює ✅');
  const t = HtmlService.createTemplateFromFile('Dev');
  t.keyJson = JSON.stringify(key).replace(/</g, '\u003c');
  t.dataJson = JSON.stringify(devData_()).replace(/</g, '\u003c');
  return t.evaluate().setTitle('90 днів')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover');
}

/** Кнопка «Оновити» на дашборді. */
function getDevData(key, weekStart) {
  if (!dashOn_() || key !== DASH_KEY) throw new Error('Немає доступу');
  return devData_(weekStart);
}

function handleMessage_(msg) {
  const chatId = msg.chat.id;
  if (String(msg.from.id) !== String(OWNER_ID)) {
    send_(chatId, '⛔ Це особистий бот. Твій Telegram ID: ' + msg.from.id +
      '\nВпиши його в OWNER_ID у скрипті та створи нову версію розгортання.');
    return;
  }
  if (msg.voice || msg.audio) { handleVoice_(chatId, msg.voice || msg.audio); return; }
  if (!msg.text) return;
  const text = msg.text.trim();
  if (MENU[text]) { clearMode_(); MENU[text](chatId); return; }
  if (text.startsWith('/')) { command_(chatId, text); return; }
  if (text.startsWith('#')) { handleTag_(chatId, text); return; }
  process_(chatId, text, null);
}

function handleVoice_(chatId, v) {
  if (!geminiOn_()) { send_(chatId, 'Для голосових потрібен ключ Gemini (GEMINI_API_KEY).'); return; }
  const f = tg_('getFile', { file_id: v.file_id });
  if (!f.ok) { send_(chatId, 'Не вдалося отримати голосове 😕'); return; }
  tg_('sendChatAction', { chat_id: chatId, action: 'typing' });
  const blob = UrlFetchApp.fetch('https://api.telegram.org/file/bot' + BOT_TOKEN + '/' + f.result.file_path).getBlob();
  process_(chatId, null, { mime: (v.mime_type || 'audio/ogg').split(';')[0], data: Utilities.base64Encode(blob.getBytes()) });
}

/** Вільний текст або голос: план, огляд або записи — залежно від режиму. */
function process_(chatId, text, audio) {
  const mode = mode_();

  if (mode === 'idea' || mode.indexOf('ask:') === 0 || mode.indexOf('lang:') === 0) {
    let t = text;
    if (audio) { const r = ai_(TRANSCRIBE_PROMPT, null, audio); t = r && r.transcript; }
    if (!t) { send_(chatId, 'Не вдалося розібрати 😕 Спробуй ще раз текстом.\n' + geminiErr_()); return; }
    clearMode_();
    if (mode === 'idea') send_(chatId, saveIdea_(t));
    else if (mode.indexOf('lang:') === 0) langHelp_(chatId, mode.slice(5), t);
    else handleTag_(chatId, '#' + DEV_ALIASES[METRICS[Number(mode.slice(4))]][0] + ' ' + t);
    return;
  }

  if (mode === 'plan') {
    let items = [];
    if (audio) {
      const r = ai_(PLAN_PROMPT, null, audio);
      items = r && r.plan ? r.plan : [];
    } else {
      items = splitPlan_(text);
    }
    items = items.map(x => String(x).trim()).filter(Boolean).slice(0, 3);
    if (!items.length) { send_(chatId, 'Не зрозумів план 🤔 Напиши 1–3 справи, кожну з нового рядка. /skip — без плану'); return; }
    savePlan_(today_(), items);
    clearMode_();
    send_(chatId, '📝 План на сьогодні:\n' + items.map((x, i) => (i + 1) + '. ' + x).join('\n') +
      '\n\nВвечері відмітимо, що зроблено. Вперед! 💪');
    return;
  }

  if (mode === 'review') {
    let answer = text;
    if (audio) { const r = ai_(TRANSCRIBE_PROMPT, null, audio); answer = r && r.transcript; }
    if (!answer) { send_(chatId, 'Не вдалося розібрати відповідь 😕 Спробуй ще раз.'); return; }
    clearMode_();
    tg_('sendChatAction', { chat_id: chatId, action: 'typing' });
    const coach = coach_(answer);
    sheet_(SHEET_REVIEW).appendRow([new Date(), answer, coach || '']);
    send_(chatId, '📋 Огляд збережено.' + (coach ? '\n\n🧠 ' + coach : ''));
    return;
  }

  if (mode === 'evening') {
    let answer = text, r = null;
    if (geminiOn_()) {
      tg_('sendChatAction', { chat_id: chatId, action: 'typing' });
      r = ai_(PARSE_PROMPT, text, audio);
      if (audio) answer = r && r.transcript;
    }
    if (!answer) { send_(chatId, 'Не вдалося розібрати 😕 Спробуй ще раз.'); return; }
    const date = modeDate_() || today_();
    clearMode_();
    const entries = r ? (r.entries || []).map(cleanEntry_).filter(Boolean) : [];
    entries.forEach(e => { if (!e.days_ago) e.days_ago = daysAgo_(date); saveEntry_(e, audio ? 'голос' : 'текст'); });
    saveJournal_(answer, date);
    send_(chatId, '🌙 Підсумок записано.' + (entries.length ? '\n\n' + confirm_(entries) : '') + '\n\n' + habitVerdict_(date));
    return;
  }

  if (!geminiOn_()) { send_(chatId, 'Без Gemini я розумію тільки швидкі записи: #дотик 20. Довідка: /help'); return; }
  tg_('sendChatAction', { chat_id: chatId, action: 'typing' });
  const r = ai_(PARSE_PROMPT, text, audio);
  if (!r) { send_(chatId, 'Не вдалося розібрати 😕 Спробуй ще раз або запиши через ➕ Записати.\n' + geminiErr_()); return; }
  const entries = (r.entries || []).map(cleanEntry_).filter(Boolean);
  const idea = r.idea ? String(r.idea).trim() : '';
  const heard = audio && r.transcript ? '🎙 «' + String(r.transcript).slice(0, 300) + '»\n\n' : '';
  if (!entries.length && !idea) {
    send_(chatId, heard + 'Не знайшов, що записати 🤔\nПриклад: «написав 15 дизайнерам, 20 хвилин іспанської, був у залі»');
    return;
  }
  entries.forEach(e => saveEntry_(e, audio ? 'голос' : 'текст'));
  send_(chatId, heard + (entries.length ? confirm_(entries) : '') + (idea ? (entries.length ? '\n\n' : '') + saveIdea_(idea) : ''));
}

// ======================= ШВИДКИЙ ЗАПИС # =======================

function handleTag_(chatId, text) {
  const t = text.replace(/[’ʼ]/g, "'").replace(/€/g, ' ').trim();
  const m = t.match(/^#\s*([^\s\d]+)\s*(.*)$/);
  if (!m) { send_(chatId, HELP); return; }
  const tag = m[1].toLowerCase();
  if (tag === 'слово' || tag === 'word') { addOwnWord_(chatId, m[2]); return; }
  if (tag === 'ідея' || tag === 'idea') {
    if (!m[2].trim()) { send_(chatId, 'Напиши ідею: #ідея відео з монтажу раковини'); return; }
    send_(chatId, saveIdea_(m[2].trim())); return;
  }
  if (tag === 'підсумок') {
    if (!m[2].trim()) { send_(chatId, 'Напиши підсумок: #підсумок зробив…, злився на…, завтра першим…'); return; }
    saveJournal_(m[2].trim(), today_());
    send_(chatId, '🌙 Підсумок записано.\n\n' + habitVerdict_(today_())); return;
  }
  const metric = METRICS.find(k => DEV_ALIASES[k].some(a => tag === a || (a.length >= 4 && tag.indexOf(a) === 0)));
  if (!metric) { send_(chatId, 'Не знаю такого показника 🤔 Довідка: /help'); return; }
  const rest = m[2];
  const numRe = /\d+(?:[.,]\d+)?/g;
  const nums = (rest.match(numRe) || []).map(x => Number(x.replace(',', '.')));
  const mm = rest.match(/марж\S*\s*(\d+(?:[.,]\d+)?)/i);
  const note = rest.replace(/марж\S*\s*\d+(?:[.,]\d+)?/i, '').replace(numRe, '')
    .replace(/\b(eur|euro|євро|евро|хв|хвилин\S*)\b/gi, '').replace(/\s+/g, ' ').trim();
  const e = { metric: metric, qty: 1, value: null, margin: mm ? Number(mm[1].replace(',', '.')) : null, note: note, days_ago: 0 };
  switch (metric) {
    case 'Прорахунок': e.value = nums[0] || null; break;
    case 'Угода': e.value = nums[0] || null; if (e.margin === null && nums.length > 1) e.margin = nums[1]; break;
    case 'Іспанська':
    case 'Англійська':
      if (!nums.length) { send_(chatId, 'Напиши хвилини: #' + tag + ' 20'); return; }
      e.qty = nums[0]; break;
    case 'Читання': case 'Музика': e.qty = nums[0] || 15; break;
    case 'Сон':
      if (!nums.length) { send_(chatId, 'Напиши години: #сон 7.5'); return; }
      e.value = nums[0]; break;
    case 'Спорт': e.value = nums[0] || null; break;
    case 'Вага': case 'Підтягування': case 'Instagram': case 'Сайт':
      if (!nums.length) { send_(chatId, 'Напиши число: #' + tag + ' 80.5'); return; }
      e.value = nums[0]; break;
    default: e.qty = nums.length ? nums[0] : 1;
  }
  if (!(e.qty > 0)) { send_(chatId, 'Кількість має бути більшою за нуль.'); return; }
  saveEntry_(e, '#');
  send_(chatId, confirm_([e]));
}

// ======================= КОМАНДИ =======================

const HELP =
  '🎯 Челендж 90 днів\n\n' +
  '🎙 Найпростіше — надиктуй голосом або напиши, що зробив:\n' +
  '«написав 15 дизайнерам, двоє відповіли, 20 хвилин іспанської, 15 англійської, був у залі»\n' +
  'Можна і про вчора: «вчора зробив прорахунок на 2400»\n\n' +
  '⌨️ Або кнопки внизу:\n' +
  '➕ Записати — вибрати, що зробив, і натиснути кількість\n' +
  '✅ Звички — відмітити звички дня\n📝 План · 🌙 Підсумок — ранок і вечір\n' +
  '🗣 Клієнту — переклад для WhatsApp іспанською чи англійською\n' +
  '💡 Ідея — записати ідею на потім, щоб не відволікатися\n' +
  '🔧 Перевірка — чи працює Gemini (коуч, слова, голосові)\n\n' +
  '📊 Дашборд відкривається кнопкою 📱 Дашборд. Щось записав помилково — ➕ Записати → ↩️ Скасувати.\n' +
  '(Старі швидкі записи через # теж працюють: #дотик 20, #сон 7 …)';

function command_(chatId, text) {
  const cmd = text.split(/\s+/)[0].split('@')[0].toLowerCase();
  switch (cmd) {
    case '/start':
    case '/help':
    case '/menu':
      send_(chatId, HELP, { reply_markup: MAIN_KB }); break;

    case '/today':
      send_(chatId, todayText_()); break;

    case '/habits': {
      const t = today_(), done = habitDay_(daySums_(devRows_()), t, planDates_());
      send_(chatId, '🧱 Звички · ' + done.filter(Boolean).length + '/' + HABITS.length + ' — натисни, що зроблено:',
        { reply_markup: { inline_keyboard: habitsKeyboard_(t, done) } });
      break;
    }

    case '/es':
    case '/en':
      langHelp_(chatId, cmd.slice(1), text.replace(/^\S+\s*/, '')); break;

    case '/week':
      send_(chatId, devReport_()); break;

    case '/plan':
      setMode_('plan', 8);
      send_(chatId, '📝 Які 3 головні справи на сьогодні? Напиши (кожну з нового рядка) або надиктуй 🎙');
      break;

    case '/coach': {
      if (!geminiOn_()) { send_(chatId, 'Потрібен ключ Gemini.'); return; }
      tg_('sendChatAction', { chat_id: chatId, action: 'typing' });
      const c = coach_();
      send_(chatId, c ? '🧠 ' + c : 'Коуч зараз недоступний 😕\n' + geminiErr_());
      break;
    }

    case '/goals':
      send_(chatId, '🎯 Цілі на 90 днів\n' + GOALS_90.trim() + '\n\n' + dayLine_()); break;

    case '/dash':
      if (!dashOn_()) { send_(chatId, 'Спочатку впиши DASH_KEY у скрипті.'); return; }
      send_(chatId, '📊 ' + dashUrl_() + '\n\nВідкрий у Chrome → ⋮ → «Додати на головний екран»');
      break;

    case '/undo': {
      const sh = sheet_(SHEET_LOG);
      const n = sh.getLastRow();
      if (n < 2) { send_(chatId, 'Немає що видаляти.'); return; }
      const r = sh.getRange(n, 1, 1, 4).getValues()[0];
      sh.deleteRow(n);
      send_(chatId, '🗑 Видалено: ' + r[1] + ' ' + (r[3] || r[2]));
      break;
    }

    case '/words': {
      let w = botWordsToday_();
      if (!w.length) { tg_('sendChatAction', { chat_id: chatId, action: 'typing' }); w = newDailyWords_(); }
      if (w.length) send_(chatId, wordsText_(w), { parse_mode: 'HTML' });
      else send_(chatId, 'Не вдалося підібрати слова 😕\n' + geminiErr_());
      break;
    }

    case '/skip':
      clearMode_(); send_(chatId, 'Ок 👌'); break;

    default:
      send_(chatId, 'Невідома команда. Довідка: /help');
  }
}

function handleCallback_(cq) {
  tg_('answerCallbackQuery', { callback_query_id: cq.id });
  if (String(cq.from.id) !== String(OWNER_ID)) return;
  const parts = String(cq.data).split(':');
  if (parts[0] === 'wl') {
    const cache = CacheService.getScriptCache();
    if (cache.get('wl_' + parts[1])) return;
    cache.put('wl_' + parts[1], '1', 21600);
    const n = todayWords_(parts[1]).filter(w => w.source === 'бот').length || WORDS_PER_DAY;
    const e = { metric: 'Слова', qty: n, value: null, margin: null, note: 'слова дня', days_ago: 0 };
    saveEntry_(e, 'кнопка');
    tg_('editMessageReplyMarkup', { chat_id: cq.message.chat.id, message_id: cq.message.message_id, reply_markup: { inline_keyboard: [] } });
    send_(cq.message.chat.id, confirm_([e]));
    return;
  }
  if (parts[0] === 'hb') { habitCallback_(cq, parts[1], Number(parts[2])); return; }
  if (parts[0] === 'lg') { logCallback_(cq, parts); return; }
  if (parts[0] === 'ln') {
    setMode_('lang:' + parts[1], 1);
    editMenu_(cq, (parts[1] === 'es' ? '🇪🇸' : '🇬🇧') + ' Напиши (або надиктуй) українською, що хочеш сказати клієнту — або встав його повідомлення.', []);
    return;
  }
  if (parts[0] !== 'pt') return;
  const date = parts[1], idx = Number(parts[2]);
  const plan = getPlan_(date);
  const item = plan[idx];
  if (!item) return;
  sheet_(SHEET_PLAN).getRange(item.row, 3).setValue(item.done ? '⬜' : '✅');
  tg_('editMessageReplyMarkup', { chat_id: cq.message.chat.id, message_id: cq.message.message_id,
    reply_markup: { inline_keyboard: planKeyboard_(date) } });
}

// ======================= ЗА РОЗКЛАДОМ =======================

function morningPush() {
  const day = dayNum_();
  if (day > CHALLENGE_DAYS + 1) return;
  const rows = devRows_(), plans = planDates_(), m = daySums_(rows);
  const yd = addDays_(today_(), -1);
  const yLine = sumLine_(m[yd] || {});
  const yDone = yd >= HABITS_START ? habitDay_(m, yd, plans).filter(Boolean).length : null;
  const miss = missed_(m, plans);
  let msg = '☀️ Доброго ранку! ' + dayLine_() + '\n🪪 ' + IDENTITY +
    (yLine ? '\n\nВчора: ' + yLine : '') +
    (yDone !== null ? '\n🧱 Звички вчора: ' + yDone + '/' + HABITS.length : '');
  if (miss.twice.length) msg += '\n\n🚨 ' + pick_(DOUBLE_MISS).replace('{h}', miss.twice.map(h => h.icon + ' ' + h.k).join(', '));
  if (miss.once.length) msg += '\n\n⚠️ Вчора пропустив: ' + miss.once.map(h => h.icon + ' ' + h.k).join(', ') +
    '.\nПравило одне: ніколи не пропускай двічі. Сьогодні — хоча б мінімальна версія.';
  setMode_('plan', 8);
  send_(OWNER_ID, msg + '\n\n📝 Які 3 головні справи сьогодні і КОЛИ саме?\nНаприклад: «13:00 — написати 10 дизайнерам». Напиши або надиктуй 🎙\n/skip — без плану');
  const w = botWordsToday_().length ? botWordsToday_() : newDailyWords_();
  if (w.length) send_(OWNER_ID, wordsText_(w), { parse_mode: 'HTML' });
}

function middayNudge() {
  const today = today_();
  const rows = devRows_(), plans = planDates_(), m = daySums_(rows);
  const done = habitDay_(m, today, plans);
  const todo = HABITS.filter((h, i) => !done[i] && h.k !== 'Підсумок');
  const sales = salesCount_(m[today] || {});
  if (!todo.length && sales >= SALES_DAY_MIN) return;
  const nothing = !rows.some(r => r.day === today);
  let msg = nothing ? '👀 Вже ' + NUDGE_HOUR + ':00, а в тебе сьогодні нуль записів.\n' + pick_(TAUNTS) : '⏰ Перевірка о ' + NUDGE_HOUR + ':00.';
  if (sales < SALES_DAY_MIN) msg += '\n\n💼 Продажних дій сьогодні: ' + sales + '/' + SALES_DAY_MIN;
  if (todo.length) msg += '\n\nЩе не зроблено. Мінімальна версія на 2 хвилини:\n' + todo.map(h => '⬜ ' + h.icon + ' ' + h.k + ' → ' + h.mini).join('\n');
  msg += '\n\nПочни з найменшого. Прямо зараз, а не «після».';
  send_(OWNER_ID, msg, { reply_markup: { inline_keyboard: habitsKeyboard_(today, done) } });
}

function eveningPush() {
  const today = today_();
  const rows = devRows_(), plans = planDates_(), m = daySums_(rows);
  const line = sumLine_(m[today] || {});
  const done = habitDay_(m, today, plans);
  const n = done.filter(Boolean).length;
  send_(OWNER_ID, '🌙 Вечірня перевірка · ' + dayLine_() + '\n\n' +
    (line ? 'Сьогодні записано: ' + line : 'Сьогодні нічого не записано.') +
    '\n\n🧱 Звички: ' + n + '/' + HABITS.length + ' — натисни, що ще зробив:',
    { reply_markup: { inline_keyboard: habitsKeyboard_(today, done) } });
  if (getPlan_(today).length) send_(OWNER_ID, '📝 План дня — що виконано?', { reply_markup: { inline_keyboard: planKeyboard_(today) } });
  setMode_('evening', 6);
  send_(OWNER_ID, '✍️ Підсумок дня — текстом або голосом 🎙\n1. Що зробив?\n2. Де злився і чому? Чесно.\n3. Що завтра робиш ПЕРШИМ?' +
    (n < HABITS.length / 2 ? '\n\n' + pick_(TAUNTS) : ''));
  wordsQuiz_();
}

function lateNudge() {
  const today = today_();
  if (q_(daySums_(devRows_())[today] || {}, 'Підсумок')) return;
  setMode_('evening', 4);
  send_(OWNER_ID, '🕚 Підсумку дня досі немає.\n' + pick_(TAUNTS) + '\n\nТри речення, дві хвилини. Надиктуй 🎙');
}

function weeklyReview() {
  send_(OWNER_ID, devReport_());
  const coach = coach_();
  if (coach) send_(OWNER_ID, '🧠 Коуч:\n' + coach);
  const ideas = ideasSince_(addDays_(today_(), -6));
  if (ideas.length) send_(OWNER_ID, '💡 Ідеї тижня (' + ideas.length + '):\n' + ideas.map(x => '• ' + x).join('\n') +
    '\n\nЖодну не беремо в роботу, поки план продажів не виконано. Обери максимум одну на наступний тиждень — або жодної.');
  setMode_('review', 20);
  send_(OWNER_ID, '📋 Недільний огляд. Відповідай одним повідомленням або голосом:\n' +
    '1. Що цього тижня спрацювало?\n2. Що не вийшло і чому?\n3. Головний фокус на наступний тиждень?\n\n' +
    'І онови видимість: #інста … та #сайт …');
}

// ======================= GEMINI =======================

const PARSE_PROMPT =
  'Ти — парсер щоденника 90-денного челенджу. Ігор пише або диктує українською (іноді з російськими чи іспанськими словами), що зробив. Витягни ВСІ записи.\n' +
  'Показники (metric):\n' +
  '- Дотик: повідомлення, листи, контакти з клієнтами. qty = кількість.\n' +
  '- Відповідь: клієнти відповіли. qty = кількість.\n' +
  '- Дзвінок: дзвінки клієнтам (спроби). qty.\n' +
  '- Розмова: розмова чи зустріч з клієнтом, що відбулася. qty.\n' +
  '- Прорахунок: зроблений прорахунок чи КП. qty = кількість, value = сума в євро, якщо названа.\n' +
  '- Угода: оплачене замовлення. value = сума, margin = маржа, якщо названа.\n' +
  '- Іспанська: заняття іспанською (Duolingo, урок, розмова). qty = хвилини (години × 60). Якщо тривалість не названа, qty = 15.\n' +
  '- Англійська: заняття англійською (урок, подкаст, серіал англійською, розмова). qty = хвилини. Якщо тривалість не названа, qty = 15.\n' +
  '- Спорт: тренування, зал, біг. qty = 1 за кожне, value = хвилини, якщо названі.\n' +
  '- Слова: вивчені іспанські слова. qty = кількість.\n' +
  '- Вага: зважування. value = кг (наприклад 80.5).\n' +
  '- Підтягування: максимум підтягувань за один підхід. value = кількість повторень.\n' +
  '- Instagram: value = кількість підписників. Сайт: value = кількість візитів.\n' +
  '- Читання: читав книгу (українською чи англійською). qty = хвилини (якщо не названо — 15), note = мова і назва книги.\n' +
  '- Музика: писав музику, Suno, грав на інструменті. qty = хвилини (якщо не названо — 15).\n' +
  '- Сон: скільки спав. value = години (наприклад 6.5).\n' +
  '- Сигарети: викурені сигарети. qty = кількість.\n' +
  '- Без сигарет: цілий день не курив. qty = 1.\n' +
  'days_ago: 0 якщо сьогодні, 1 якщо «вчора», 2 якщо «позавчора».\n' +
  'Записуй тільки те, що вже зроблено. Плани на майбутнє («завтра напишу…») — не записуй.\n' +
  'idea: якщо Ігор описує нову ідею, проєкт чи інструмент, який хоче зробити (сайт, дизайн, бот, рекламу, новий напрям) — коротко перекажи її (до 12 слів), інакше null.\n' +
  'Якщо в повідомленні немає нічого з цього, entries = [].\n' +
  'Відповідай ТІЛЬКИ JSON: {"transcript": "дослівний текст повідомлення", "entries": [{"metric": "Дотик", "qty": 1, "value": null, "margin": null, "note": "до 6 слів", "days_ago": 0}], "idea": null}';

const PLAN_PROMPT =
  'Ігор диктує план на день. Виділи до 3 головних справ, кожну коротко (до 8 слів), українською.\n' +
  'Відповідай ТІЛЬКИ JSON: {"transcript": "дослівний текст", "plan": ["справа 1", "справа 2", "справа 3"]}';

const TRANSCRIBE_PROMPT =
  'Дослівно розшифруй аудіо українською. Відповідай ТІЛЬКИ JSON: {"transcript": "текст"}';

function geminiOn_() { return GEMINI_API_KEY && GEMINI_API_KEY.indexOf('ВСТАВ') !== 0; }

function gemini_(parts, json, maxTokens) {
  const p = PropertiesService.getScriptProperties();
  const good = p.getProperty('GEMINI_OK');
  const models = [good, GEMINI_MODEL].concat(GEMINI_FALLBACKS).filter((m, i, a) => m && a.indexOf(m) === i);
  let lastErr = '';
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    try {
      // Моделі Gemini 3 «думають» перед відповіддю, і думки з'їдають ліміт — тому ліміт великий
      const cfg = { temperature: json ? 0 : 0.6, maxOutputTokens: Math.max(maxTokens || 0, 8192) };
      if (json) cfg.responseMimeType = 'application/json';
      const res = UrlFetchApp.fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent', {
          method: 'post', contentType: 'application/json', muteHttpExceptions: true,
          headers: { 'x-goog-api-key': GEMINI_API_KEY },
          payload: JSON.stringify({ contents: [{ parts: parts }], generationConfig: cfg }),
        });
      const d = JSON.parse(res.getContentText());
      if (d.error) {
        lastErr = model + ': ' + d.error.message;
        if (/API key|API_KEY|PERMISSION_DENIED|location is not supported/i.test(d.error.message + ' ' + d.error.status)) break;  // інша модель не допоможе
        continue;
      }
      const c = (d.candidates || [])[0];
      const out = c && c.content && c.content.parts ? c.content.parts.filter(x => !x.thought).map(x => x.text || '').join('') : '';
      if (!out) {
        lastErr = model + ': порожня відповідь (' + ((c && c.finishReason) || (d.promptFeedback && d.promptFeedback.blockReason) || '?') + ')';
        continue;
      }
      if (good !== model) p.setProperty('GEMINI_OK', model);
      p.deleteProperty('GEMINI_ERR');
      return out;
    } catch (err) {
      lastErr = model + ': ' + err.message;
    }
  }
  p.setProperty('GEMINI_ERR', String(lastErr).slice(0, 500));
  console.error('Gemini: ' + lastErr);
  return null;
}

/** Людський опис останньої помилки Gemini. */
function geminiErr_() {
  const e = PropertiesService.getScriptProperties().getProperty('GEMINI_ERR') || '';
  if (!e) return '';
  let hint = '';
  if (/API key not valid|API_KEY_INVALID/i.test(e)) hint = 'Ключ неправильний. Створи новий на aistudio.google.com/apikey і встав у GEMINI_API_KEY.';
  else if (/quota|RESOURCE_EXHAUSTED|rate/i.test(e)) hint = 'Вичерпано ліміт безкоштовних запитів. Зачекай або перевір ліміти в aistudio.google.com.';
  else if (/location is not supported/i.test(e)) hint = 'Google не пускає з цього регіону.';
  else if (/PERMISSION_DENIED|has not been used|disabled/i.test(e)) hint = 'Для ключа не ввімкнено Gemini API. Створи ключ саме в aistudio.google.com/apikey.';
  else if (/not found|not supported/i.test(e)) hint = 'Модель недоступна для твого ключа.';
  return '⚠️ Gemini: ' + e + (hint ? '\n💡 ' + hint : '');
}

/** Кнопка «🔧 Перевірка»: чи працює Gemini і який ключ/модель. */
function diagText_() {
  if (!geminiOn_()) return '❌ Ключ Gemini не вписано (GEMINI_API_KEY). Візьми його на aistudio.google.com/apikey.';
  const out = gemini_([{ text: 'Відповідай одним словом: працює' }], false, 50);
  const model = PropertiesService.getScriptProperties().getProperty('GEMINI_OK');
  return out ? '✅ Gemini працює · модель ' + model + '\nКоуч, слова і голосові мають працювати.' : '❌ Gemini не відповідає.\n' + geminiErr_();
}

function ai_(instruction, text, audio) {
  if (!geminiOn_()) return null;
  const parts = [];
  if (audio) parts.push({ inlineData: { mimeType: audio.mime, data: audio.data } });
  parts.push({ text: instruction + (text ? '\n\nПовідомлення: """' + text + '"""' : '\n\nПовідомлення — в аудіо.') });
  const out = gemini_(parts, true);
  if (!out) return null;
  try { return JSON.parse(out.replace(/```json|```/g, '').trim()); }
  catch (e) { console.error('Не JSON: ' + out); return null; }
}

function coach_(reviewAnswer) {
  if (!geminiOn_()) return null;
  const d = devData_();
  const ctx = {
    день_челенджу: dayNum_(), всього_днів: CHALLENGE_DAYS, цілі_на_90_днів: GOALS_90.trim(),
    тиждень: { з: d.ws, по: d.we, бал: d.score, відсотки_цілей: d.goals, дії_факт_ціль: d.actions,
      іспанська_хв: d.spanish, англійська_хв: d.english, спорт: d.sport,
      звички: d.habits.list.map((h, i) => h.k + ': ' + d.habits.grid[i].filter(x => x === true).length + ' днів, серія ' + d.habits.streaks[i]),
      життя: d.life },
    прогноз_з_прорахунків: d.challenge.forecast, ідеї_тижня: ideasSince_(d.ws),
    місяць: d.month, воронка_4_тижні: d.funnel, тренд_8_тижнів: d.trend,
    план_дня_виконано: planStats_(d.ws, d.we), попередній_огляд: lastReview_(),
  };
  const prompt =
    'Ти — чесний і жорсткий коуч Ігоря в 90-денному челенджі. Ігорю 40. Він працює оператором ЧПУ в Іспанії (часто вночі), ' +
    'паралельно розвиває Estone (декоративний камінь і кераміка для дизайнерів та архітекторів в Україні й Іспанії), ' +
    'вчить іспанську (A2) та англійську, тренується, читає, пише музику в Suno, кидає курити. Живе за системою «Атомних звичок».\n' +
    'Його відомі пастки: слабка дисципліна; будувати інструменти й «упаковку» замість продажів; розпорошуватися на нові ідеї. ' +
    'В Іспанії замовлень майже немає, бо він нікому про себе не розказує; гальмує через страх спілкування з клієнтами іспанською — ' +
    'нагадуй, що команди /es і /en перекладають повідомлення для клієнтів. В Україні головний показник B2B — кількість прорахунків ' +
    '(15–20% з них стають продажами); якщо клієнт порахувався кілька разів і зник — ціна неконкурентна.\n' +
    'Тон: Ігор сам попросив жорсткий стиль. Коли він не робить обіцяне — говори прямо, з сарказмом і підколками на кшталт ' +
    '«ну добре, роби що хочеш, ти ж краще знаєш» або «ну да, ти ж потім усе наздоженеш, як завжди». Нагадуй, що саме такі «потім» ' +
    'привели його до 40 без результату. Підколюй за дії, а не принижуй як людину, і завжди давай конкретний вихід. ' +
    'Реальний прогрес визнавай коротко, без лестощів. Якщо Ігор пише про хворобу, горе чи сильне виснаження — без підколок: коротко підтримай і зменш план до мінімальних версій звичок.\n' +
    'Дай відповідь українською, до 170 слів, простим текстом без markdown: ' +
    '1) що добре (одне речення з цифрою); 2) головне вузьке місце (з цифрою); 3) три конкретні дії на наступні 7 днів. ' +
    'Якщо даних мало, так і скажи — це теж про дисципліну.\n\nДані: ' + JSON.stringify(ctx) +
    (reviewAnswer ? '\n\nВідповідь Ігоря на недільний огляд: ' + reviewAnswer +
      '\nВрахуй її: допоможи зробити фокус на наступний тиждень конкретним і вимірюваним.' : '');
  const out = gemini_([{ text: prompt }], false, 1500);
  return out ? out.replace(/\*\*/g, '').replace(/^#+\s*/gm, '').trim() : null;
}

// ======================= ЗАПИСИ =======================

function cleanEntry_(e) {
  if (!e || METRICS.indexOf(e.metric) === -1) return null;
  const n = x => (x === null || x === undefined || x === '' || isNaN(Number(x))) ? null : Number(x);
  const out = { metric: e.metric, qty: n(e.qty), value: n(e.value), margin: n(e.margin),
    note: String(e.note || '').slice(0, 80), days_ago: Math.max(0, Math.min(6, n(e.days_ago) || 0)) };
  if (['Іспанська', 'Англійська', 'Читання', 'Музика'].indexOf(out.metric) !== -1 && !(out.qty > 0)) out.qty = 15;
  if (out.metric === 'Сон') { out.qty = 1; if (!(out.value > 0)) return null; }
  if (['Спорт', 'Прорахунок', 'Угода'].concat(SNAPSHOTS).indexOf(out.metric) !== -1 && !(out.qty > 0)) out.qty = 1;
  if (out.metric === 'Спорт') out.qty = Math.max(1, Math.round(out.qty));
  if (SNAPSHOTS.indexOf(out.metric) !== -1) { out.qty = 1; if (out.value === null) return null; }
  if (!(out.qty > 0)) out.qty = 1;
  return out;
}

function saveEntry_(e, source) {
  let d = new Date();
  if (e.days_ago) d = new Date(d.getTime() - e.days_ago * 864e5);
  sheet_(SHEET_LOG).appendRow([d, e.metric, e.qty, e.value === null ? '' : e.value,
    e.margin === null ? '' : e.margin, e.note || '', source]);
}

function confirm_(entries) {
  const rows = devRows_();
  const ws = weekStart_(today_());
  const s = devSum_(rows, ws, addDays_(ws, 6));
  const lines = entries.map(e => {
    const when = e.days_ago === 1 ? ' (вчора)' : e.days_ago > 1 ? ' (' + e.days_ago + ' дн. тому)' : '';
    const ic = ICONS[e.metric] || '✅';
    switch (e.metric) {
      case 'Іспанська': case 'Англійська': case 'Читання': case 'Музика':
        return ic + ' ' + e.metric + ' +' + e.qty + ' хв' + when + ' · тиждень ' + q_(s, e.metric) + '/' + DEV_TARGETS[e.metric] +
          ' · серія ' + streak_(rows, e.metric) + ' дн. 🔥';
      case 'Сон':
        return ic + ' Сон ' + e.value + ' год' + when + (e.value < SLEEP_GOAL ? ' · менше ' + SLEEP_GOAL + ' год — завтра голова буде ватна' : ' 👍');
      case 'Сигарети':
        return ic + ' Сигарет +' + e.qty + when + ' · за тиждень ' + q_(s, 'Сигарети') + '. Чесно записав — вже добре. Наступну відклади на 30 хв.';
      case 'Без сигарет':
        return ic + ' День без сигарет' + when + ' · серія ' + streak_(rows, 'Без сигарет') + ' дн. 💪';
      case 'Підсумок':
        return ic + ' Підсумок дня' + when;
      case 'Спорт':
        return ic + ' Тренування' + (e.value ? ' ' + e.value + ' хв' : '') + when + ' · тиждень ' + q_(s, 'Спорт') + '/' + DEV_TARGETS['Спорт'];
      case 'Угода':
        return ic + ' Угода' + (e.value ? ' ' + fmt_(e.value) : '') + (e.margin !== null ? ' · маржа ' + fmt_(e.margin) : '') + when;
      case 'Слова':
        return ic + ' +' + e.qty + ' ' + plural_(e.qty, 'слово', 'слова', 'слів') + when + ' · тиждень ' + q_(s, 'Слова') + '/' + DEV_TARGETS['Слова'] +
          ' · всього ' + wordsTotal_(rows) + '/' + WORDS_GOAL;
      case 'Вага': {
        const first = firstSnap_(rows, 'Вага');
        const left = Math.round((e.value - WEIGHT_GOAL) * 10) / 10;
        return ic + ' Вага ' + e.value + ' кг' + (first !== null && first !== e.value ? ' (' + signed_(Math.round((e.value - first) * 10) / 10) + ' від старту)' : '') +
          (left > 0 ? ' · до цілі ' + left + ' кг' : ' · ціль досягнута! 🎉');
      }
      case 'Підтягування':
        return ic + ' Підтягування: ' + e.value + '/' + PULLUP_GOAL + ' ' + bar_(e.value, PULLUP_GOAL);
      case 'Instagram':
      case 'Сайт': {
        const sn = snapshot_(rows, e.metric);
        return ic + ' ' + e.metric + ': ' + e.value + (sn && sn.delta !== null ? ' (' + signed_(sn.delta) + ')' : '');
      }
      default:
        return ic + ' ' + e.metric + ' +' + e.qty + (e.value ? ' · ' + fmt_(e.value) : '') + when +
          ' · тиждень ' + q_(s, e.metric) + '/' + DEV_TARGETS[e.metric] + ' ' + bar_(q_(s, e.metric), DEV_TARGETS[e.metric]);
    }
  });
  return lines.join('\n') + '\n\n' + dayLine_();
}

function devRows_() {
  const sh = sheet_(SHEET_LOG);
  const n = sh.getLastRow();
  if (n < 2) return [];
  return sh.getRange(2, 1, n - 1, 7).getValues().map((r, i) => ({
    row: i + 2,
    day: r[0] instanceof Date ? Utilities.formatDate(r[0], TZ, 'yyyy-MM-dd') : '',
    metric: String(r[1]), qty: Number(r[2]) || 0, value: Number(r[3]) || 0, margin: Number(r[4]) || 0,
    note: String(r[5] || ''),
  }));
}

// ======================= ПЛАНИ ТА ОГЛЯДИ =======================

function splitPlan_(text) {
  let items = String(text).split(/\n|;/).map(x => x.replace(/^\s*(\d+[.)]|[-•*])\s*/, '').trim()).filter(Boolean);
  if (items.length === 1 && items[0].indexOf(',') !== -1) items = items[0].split(',').map(x => x.trim()).filter(Boolean);
  return items;
}

function savePlan_(date, items) {
  const sh = sheet_(SHEET_PLAN);
  getPlan_(date).map(p => p.row).sort((a, b) => b - a).forEach(r => sh.deleteRow(r));
  items.forEach(x => sh.appendRow([date, x, '⬜']));
}

function getPlan_(date) {
  const sh = sheet_(SHEET_PLAN);
  const n = sh.getLastRow();
  if (n < 2) return [];
  return sh.getRange(2, 1, n - 1, 3).getDisplayValues()
    .map((r, i) => ({ row: i + 2, date: r[0], text: r[1], done: r[2] === '✅' }))
    .filter(p => p.date === date);
}

function planKeyboard_(date) {
  return getPlan_(date).map((p, i) => [{
    text: (p.done ? '✅ ' : '⬜ ') + (p.text.length > 40 ? p.text.slice(0, 38) + '…' : p.text),
    callback_data: 'pt:' + date + ':' + i,
  }]);
}

function planStats_(from, to) {
  const sh = sheet_(SHEET_PLAN);
  const n = sh.getLastRow();
  if (n < 2) return 'планів ще немає';
  const rs = sh.getRange(2, 1, n - 1, 3).getDisplayValues().filter(r => r[0] >= from && r[0] <= to);
  return rs.filter(r => r[2] === '✅').length + ' з ' + rs.length + ' пунктів';
}

function lastReview_() {
  const sh = sheet_(SHEET_REVIEW);
  const n = sh.getLastRow();
  return n < 2 ? '' : String(sh.getRange(n, 2).getValue()).slice(0, 600);
}

// ======================= СЛОВА =======================

function esc_(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function wordRows_() {
  const sh = sheet_(SHEET_WORDS);
  const n = sh.getLastRow();
  if (n < 2) return [];
  return sh.getRange(2, 1, n - 1, 8).getDisplayValues().map((r, i) => ({
    row: i + 2, es: r[0], uk: r[1], ex: r[2], topic: r[3], added: r[4], source: r[5], stage: Number(r[6]) || 0, next: r[7],
  }));
}

function todayWords_(date) {
  const d = date || today_();
  return wordRows_().filter(w => w.added === d);
}

function botWordsToday_() { return todayWords_().filter(w => w.source === 'бот'); }

function addWords_(items, source, topic) {
  const sh = sheet_(SHEET_WORDS);
  const today = today_();
  items.forEach(w => sh.appendRow([w.es, w.uk || '', w.ex || '', topic || '', today, source, 0, addDays_(today, 1)]));
}

function newDailyWords_() {
  if (!geminiOn_()) return [];
  const known = wordRows_().map(w => w.es).slice(-600);
  const topic = WORD_TOPICS[(Math.max(1, dayNum_()) - 1) % WORD_TOPICS.length];
  const r = ai_('Підбери ' + WORDS_PER_DAY + ' нових корисних іспанських слів або коротких фраз для українця з рівнем A2, який живе в Іспанії. ' +
    'Тема: ' + topic + '.\nНЕ використовуй ці слова: ' + known.join(', ') + '\n' +
    'Іменники — з артиклем, дієслова — в інфінітиві. uk — переклад українською, ex — короткий приклад іспанською (до 8 слів).\n' +
    'Відповідай ТІЛЬКИ JSON: {"words": [{"es": "la encimera", "uk": "стільниця", "ex": "La encimera es de cuarzo."}]}', null, null);
  const words = r && r.words ? r.words.filter(w => w && w.es).slice(0, WORDS_PER_DAY) : [];
  if (!words.length) return [];
  addWords_(words, 'бот', topic);
  return botWordsToday_();
}

function addOwnWord_(chatId, text) {
  const t = String(text || '').trim();
  if (!t) { send_(chatId, 'Напиши слово: #слово desagüe (або #слово desagüe — злив)'); return; }
  const parts = t.split(/\s+[—–-]\s+/);
  let w = { es: parts[0].trim(), uk: (parts[1] || '').trim(), ex: '' };
  if (!w.uk && geminiOn_()) {
    const r = ai_('Переклади іспанське слово чи фразу українською і дай короткий приклад іспанською (до 8 слів). ' +
      'Відповідай ТІЛЬКИ JSON: {"es": "слово з артиклем", "uk": "переклад", "ex": "приклад"}', w.es, null);
    if (r && r.uk) w = { es: r.es || w.es, uk: r.uk, ex: r.ex || '' };
  }
  addWords_([w], 'я', 'моє слово');
  const e = { metric: 'Слова', qty: 1, value: null, margin: null, note: w.es, days_ago: 0 };
  saveEntry_(e, '#');
  send_(chatId, '📚 ' + w.es + (w.uk ? ' — ' + w.uk : '') + (w.ex ? '\n«' + w.ex + '»' : '') + '\n\n' + confirm_([e]));
}

function wordsText_(words) {
  return '📚 <b>Слова дня</b>\n\n' + words.map((w, i) =>
    (i + 1) + '. <b>' + esc_(w.es) + '</b> — ' + esc_(w.uk) + (w.ex ? '\n    <i>' + esc_(w.ex) + '</i>' : '')).join('\n') +
    '\n\nВвечері буде міні-тест 😉';
}

/** Вечірній тест: слова дня + ті, що пора повторити. Переклад схований під спойлером. */
function wordsQuiz_() {
  const today = today_();
  const all = wordRows_();
  const quiz = all.filter(w => w.added === today || (w.stage < WORD_INTERVALS.length && w.next && w.next <= today));
  if (!quiz.length) return;
  const sh = sheet_(SHEET_WORDS);
  quiz.forEach(w => {
    const stage = w.added === today ? 1 : w.stage + 1;
    const next = stage < WORD_INTERVALS.length ? addDays_(today, WORD_INTERVALS[stage]) : '';
    sh.getRange(w.row, 7, 1, 2).setValues([[stage, next]]);
  });
  const text = '🧠 <b>Міні-тест</b>: згадай переклад, потім натисни на сірий спойлер\n\n' +
    quiz.slice(0, 15).map(w => '• <b>' + esc_(w.es) + '</b> — <tg-spoiler>' + esc_(w.uk || '?') + '</tg-spoiler>').join('\n');
  const hasNew = quiz.some(w => w.added === today && w.source === 'бот');
  send_(OWNER_ID, text, Object.assign({ parse_mode: 'HTML' },
    hasNew ? { reply_markup: { inline_keyboard: [[{ text: '✅ Вивчив слова дня', callback_data: 'wl:' + today }]] } } : {}));
}

// ======================= МЕНЮ =======================

const MAIN_KB = { is_persistent: true, resize_keyboard: true, keyboard: [
  [{ text: '➕ Записати' }, { text: '✅ Звички' }],
  [{ text: '📝 План' }, { text: '🌙 Підсумок' }],
  [{ text: '📊 Сьогодні' }, { text: '📈 Тиждень' }],
  [{ text: '🧠 Коуч' }, { text: '📚 Слова' }],
  [{ text: '🗣 Клієнту' }, { text: '💡 Ідея' }],
  [{ text: '📱 Дашборд' }, { text: '🔧 Перевірка' }],
] };

const MENU = {
  '➕ Записати': c => send_(c, LOG_ROOT_TEXT, { reply_markup: { inline_keyboard: logRootKb_() } }),
  '✅ Звички': c => command_(c, '/habits'),
  '📝 План': c => command_(c, '/plan'),
  '🌙 Підсумок': c => {
    setMode_('evening', 6);
    send_(c, '✍️ Підсумок дня — текстом або голосом 🎙\n1. Що зробив?\n2. Де злився і чому? Чесно.\n3. Що завтра робиш ПЕРШИМ?');
  },
  '📊 Сьогодні': c => command_(c, '/today'),
  '📈 Тиждень': c => command_(c, '/week'),
  '🧠 Коуч': c => command_(c, '/coach'),
  '📚 Слова': c => command_(c, '/words'),
  '🗣 Клієнту': c => send_(c, '🗣 Якою мовою клієнт?', { reply_markup: { inline_keyboard: [[
    { text: '🇪🇸 Іспанською', callback_data: 'ln:es' }, { text: '🇬🇧 Англійською', callback_data: 'ln:en' }]] } }),
  '💡 Ідея': c => { setMode_('idea', 1); send_(c, '💡 Напиши або надиктуй ідею — збережу до неділі, щоб вона не відволікала.'); },
  '📱 Дашборд': c => command_(c, '/dash'),
  '🔧 Перевірка': c => { tg_('sendChatAction', { chat_id: c, action: 'typing' }); send_(c, diagText_()); },
};

// Що можна записати через «➕ Записати»: категорія → показники
const LOG_ROOT_TEXT = '➕ Що записати?';
const LOG_CATS = {
  sales: { name: '💼 Продажі', metrics: ['Дотик', 'Відповідь', 'Дзвінок', 'Розмова', 'Прорахунок', 'Угода', 'Instagram', 'Сайт'] },
  lang:  { name: '🗣 Мови', metrics: ['Іспанська', 'Англійська', 'Слова'] },
  body:  { name: '💪 Спорт і тіло', metrics: ['Спорт', 'Вага', 'Підтягування'] },
  life:  { name: '🌱 Життя', metrics: ['Читання', 'Музика', 'Сон', 'Сигарети', 'Без сигарет'] },
};
// Кнопки з готовими числами; показники без них бот попросить ввести
const QUICK_VALUES = {
  'Дотик': [1, 5, 10, 20], 'Відповідь': [1, 2, 3, 5], 'Дзвінок': [1, 3, 5, 10], 'Розмова': [1, 2, 3],
  'Іспанська': [15, 30, 45, 60], 'Англійська': [10, 15, 30], 'Слова': [5, 10],
  'Спорт': [30, 45, 60, 90], 'Читання': [15, 30, 60], 'Музика': [15, 30, 60], 'Сон': [5, 6, 7, 8], 'Сигарети': [1, 3, 5, 10],
};
const ASK_TEXT = {
  'Прорахунок': 'Напиши суму прорахунку в євро, наприклад: 2400', 'Угода': 'Напиши суму і маржу, наприклад: 3500 700',
  'Вага': 'Напиши вагу, наприклад: 80.5', 'Підтягування': 'Скільки максимум підтягнувся за підхід?',
  'Instagram': 'Скільки зараз підписників?', 'Сайт': 'Скільки візитів на сайт?',
};
const UNITS = { 'Іспанська': ' хв', 'Англійська': ' хв', 'Читання': ' хв', 'Музика': ' хв', 'Спорт': ' хв', 'Сон': ' год' };

function logRootKb_() {
  return Object.keys(LOG_CATS).map(k => [{ text: LOG_CATS[k].name, callback_data: 'lg:c:' + k }])
    .concat([[{ text: '↩️ Скасувати останній запис', callback_data: 'lg:u' }]]);
}

function editMenu_(cq, text, kb) {
  tg_('editMessageText', { chat_id: cq.message.chat.id, message_id: cq.message.message_id, text: text,
    reply_markup: { inline_keyboard: kb } });
}

function logCallback_(cq, parts) {
  const chatId = cq.message.chat.id;
  const act = parts[1];
  if (act === 'r') { editMenu_(cq, LOG_ROOT_TEXT, logRootKb_()); return; }
  if (act === 'u') { editMenu_(cq, '↩️ Скасовую…', []); command_(chatId, '/undo'); return; }
  if (act === 'c') {
    const cat = LOG_CATS[parts[2]];
    if (!cat) return;
    const btns = cat.metrics.map(m => ({ text: (ICONS[m] || '') + ' ' + m, callback_data: 'lg:m:' + METRICS.indexOf(m) + ':' + parts[2] }));
    const kb = [];
    for (let i = 0; i < btns.length; i += 2) kb.push(btns.slice(i, i + 2));
    kb.push([{ text: '⬅️ Назад', callback_data: 'lg:r' }]);
    editMenu_(cq, cat.name + ' — що саме?', kb);
    return;
  }
  const metric = METRICS[Number(parts[2])];
  if (!metric) return;
  const tag = '#' + DEV_ALIASES[metric][0];
  if (act === 'm') {
    if (metric === 'Без сигарет') { editMenu_(cq, '🚭 Записую…', []); handleTag_(chatId, tag); return; }
    const vals = QUICK_VALUES[metric];
    if (!vals) {
      setMode_('ask:' + parts[2], 1);
      editMenu_(cq, (ICONS[metric] || '') + ' ' + (ASK_TEXT[metric] || 'Напиши число'), []);
      return;
    }
    editMenu_(cq, (ICONS[metric] || '') + ' ' + metric + (UNITS[metric] ? ' (' + UNITS[metric].trim() + ')' : '') + ' — скільки?', [
      vals.map(v => ({ text: String(v), callback_data: 'lg:v:' + parts[2] + ':' + v })),
      [{ text: '✍️ Інше число', callback_data: 'lg:a:' + parts[2] }, { text: '⬅️ Назад', callback_data: 'lg:c:' + (parts[3] || 'sales') }],
    ]);
    return;
  }
  if (act === 'a') {
    setMode_('ask:' + parts[2], 1);
    editMenu_(cq, (ICONS[metric] || '') + ' ' + metric + ': напиши число' + (UNITS[metric] ? ' (' + UNITS[metric].trim() + ')' : ''), []);
    return;
  }
  if (act === 'v') {
    editMenu_(cq, (ICONS[metric] || '') + ' ' + metric + ': ' + parts[3] + (UNITS[metric] || ''), []);
    handleTag_(chatId, tag + ' ' + parts[3]);
  }
}

// ======================= ЗВИЧКИ =======================

function planDates_() {
  const sh = sheet_(SHEET_PLAN);
  const n = sh.getLastRow();
  const set = {};
  if (n >= 2) sh.getRange(2, 1, n - 1, 1).getDisplayValues().forEach(r => { set[r[0]] = 1; });
  return set;
}

/** Суми по днях: { '2026-09-27': { 'Дотик': {qty, value, margin}, … } } */
function daySums_(rows) {
  const m = {};
  rows.forEach(r => {
    const s = m[r.day] || (m[r.day] = {});
    const x = s[r.metric] || (s[r.metric] = { qty: 0, value: 0, margin: 0 });
    x.qty += r.qty; x.value += r.value; x.margin += r.margin;
  });
  return m;
}

function salesCount_(s) { return FIN_KEYS.reduce((a, k) => a + q_(s, k), 0); }

function habitDone_(k, s, date, plans) {
  switch (k) {
    case 'План': return !!plans[date];
    case 'Продажі': return salesCount_(s) > 0 || q_(s, 'Угода') > 0;
    case 'Іспанська': return q_(s, 'Іспанська') > 0 || q_(s, 'Слова') > 0;
    case 'Без сигарет': return q_(s, 'Без сигарет') > 0 && !q_(s, 'Сигарети');
    default: return q_(s, k) > 0;
  }
}

function habitDay_(m, date, plans) { return HABITS.map(h => habitDone_(h.k, m[date] || {}, date, plans)); }

function habitStreak_(m, plans, k) {
  let d = today_(), n = 0;
  if (!habitDone_(k, m[d] || {}, d, plans)) d = addDays_(d, -1);
  while (d >= HABITS_START && habitDone_(k, m[d] || {}, d, plans)) { n++; d = addDays_(d, -1); }
  return n;
}

/** % виконаних звичок за період (до сьогодні включно); null, якщо звички ще не рахувались. */
function habitPct_(m, plans, from, to) {
  const today = today_();
  let d = from < HABITS_START ? HABITS_START : from, total = 0, done = 0;
  const end = to > today ? today : to;
  for (; d <= end; d = addDays_(d, 1)) {
    habitDay_(m, d, plans).forEach(x => { total++; if (x) done++; });
  }
  return total ? Math.round(done / total * 100) : null;
}

/** Пропуски: once — пропущено вчора, twice — вчора і позавчора. */
function missed_(m, plans) {
  const y = addDays_(today_(), -1), y2 = addDays_(today_(), -2);
  const out = { once: [], twice: [] };
  if (y < HABITS_START) return out;
  HABITS.forEach(h => {
    if (habitDone_(h.k, m[y] || {}, y, plans)) return;
    if (y2 >= HABITS_START && !habitDone_(h.k, m[y2] || {}, y2, plans)) out.twice.push(h);
    else out.once.push(h);
  });
  return out;
}

function habitsKeyboard_(date, done) {
  const btns = HABITS.map((h, i) => ({ text: (done[i] ? '✅ ' : '⬜ ') + h.icon + ' ' + h.k, callback_data: 'hb:' + date + ':' + i }));
  const kb = [];
  for (let i = 0; i < btns.length; i += 2) kb.push(btns.slice(i, i + 2));
  return kb;
}

function habitCallback_(cq, date, idx) {
  const h = HABITS[idx];
  const chatId = cq.message.chat.id;
  if (!h) return;
  const plans = planDates_();
  let m = daySums_(devRows_());
  if (habitDone_(h.k, m[date] || {}, date, plans)) return;
  if (!QUICK_HABITS[h.k]) { send_(chatId, h.icon + ' ' + (h.hint || 'Запиши це повідомленням.')); return; }
  if (h.k === 'Без сигарет' && q_(m[date] || {}, 'Сигарети')) {
    send_(chatId, '🚬 За цей день записано сигарет: ' + q_(m[date], 'Сигарети') + '. День без сигарет не зараховується. Завтра — з нуля.');
    return;
  }
  const e = { metric: h.k, qty: QUICK_HABITS[h.k], value: null, margin: null, note: 'кнопка', days_ago: daysAgo_(date) };
  saveEntry_(e, 'кнопка');
  m = daySums_(devRows_());
  tg_('editMessageReplyMarkup', { chat_id: chatId, message_id: cq.message.message_id,
    reply_markup: { inline_keyboard: habitsKeyboard_(date, habitDay_(m, date, plans)) } });
}

/** Підсумок звичок за день + реакція в тоні коуча. */
function habitVerdict_(date) {
  const done = habitDay_(daySums_(devRows_()), date, planDates_());
  const miss = HABITS.filter((h, i) => !done[i]);
  const head = '🧱 Звички: ' + (HABITS.length - miss.length) + '/' + HABITS.length;
  if (!miss.length) return head + '\n🔥 Все закрито. Отак і виглядає людина, яка тримає слово.';
  return head + '\nНе зроблено: ' + miss.map(h => h.icon + ' ' + h.k).join(', ') +
    (miss.length > 2 ? '\n\n' + pick_(TAUNTS) : '\n\nЗавтра — не пропускати вдруге.');
}

function saveJournal_(text, date) {
  sheet_(SHEET_JOURNAL).appendRow([date, text]);
  if (!q_(daySums_(devRows_())[date] || {}, 'Підсумок')) {
    saveEntry_({ metric: 'Підсумок', qty: 1, value: null, margin: null, note: '', days_ago: daysAgo_(date) }, 'щоденник');
  }
}

function daysAgo_(date) {
  const t = today_();
  const a = Date.UTC(+date.slice(0, 4), +date.slice(5, 7) - 1, +date.slice(8, 10));
  const b = Date.UTC(+t.slice(0, 4), +t.slice(5, 7) - 1, +t.slice(8, 10));
  return Math.max(0, Math.min(6, Math.round((b - a) / 864e5)));
}

function pick_(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ======================= ІДЕЇ (щоб не розпорошуватись) =======================

/** Записує ідею в «Ідеї» і повертає текст відповіді. */
function saveIdea_(idea) {
  sheet_(SHEET_IDEAS).appendRow([new Date(), idea, 'нова']);
  const sales = salesCount_(devSum_(devRows_(), today_(), today_()));
  return '💡 Ідею записав: «' + idea + '». Розберемо в неділю, не зараз.' +
    (sales < SALES_DAY_MIN ? '\n\nА тепер чесно: продажних дій сьогодні ' + sales + '/' + SALES_DAY_MIN +
      '. Нова ідея — найзручніший спосіб не писати клієнтам. Спочатку клієнти, потім фантазії.' : '');
}

function ideasSince_(from) {
  const sh = sheet_(SHEET_IDEAS);
  const n = sh.getLastRow();
  if (n < 2) return [];
  return sh.getRange(2, 1, n - 1, 2).getValues()
    .filter(r => r[0] instanceof Date && Utilities.formatDate(r[0], TZ, 'yyyy-MM-dd') >= from)
    .map(r => String(r[1]));
}

// ======================= МОВА ДЛЯ КЛІЄНТІВ =======================

const LANG_IN = { es: 'іспанською', en: 'англійською' };

function langHelp_(chatId, lang, body) {
  if (!geminiOn_()) { send_(chatId, 'Потрібен ключ Gemini.'); return; }
  if (!body) {
    send_(chatId, 'Напиши після команди текст українською — перепишу для клієнта ' + LANG_IN[lang] + '.\n' +
      'Або встав повідомлення клієнта — перекладу і запропоную відповідь.\n\nПриклад: /' + lang + ' добрий день, можу приїхати на замір у четвер');
    return;
  }
  tg_('sendChatAction', { chat_id: chatId, action: 'typing' });
  const L = LANG_IN[lang];
  const r = ai_('Ти — асистент Ігоря, власника Estone: вироби з натурального каменю, кварцу й кераміки ' +
    '(кухонні стільниці, раковини, підвіконня, сходи; замір, виготовлення, монтаж) в Іспанії. Клієнт спілкується ' + L + '.\n' +
    'Якщо текст написаний українською або російською — це повідомлення Ігоря клієнту: перепиши його ' + L + ' для WhatsApp — ' +
    'природно, ввічливо і коротко, як пише місцевий майстер' + (lang === 'es' ? ' (звертайся на «usted», якщо з тексту не видно, що на «tú»)' : '') + '. kind = "out".\n' +
    'Якщо текст написаний ' + L + ' — це повідомлення клієнта: переклади українською і запропонуй коротку відповідь ' + L +
    ', яка веде до наступного кроку (фото, розміри, замір, прорахунок). kind = "in".\n' +
    'Відповідай ТІЛЬКИ JSON: {"kind": "out", "text": "повідомлення мовою клієнта", "uk": "переклад українською", "reply": "", "reply_uk": ""}', body, null);
  if (!r || (!r.text && !r.reply)) { send_(chatId, 'Не вдалося перекласти 😕 Спробуй ще раз.'); return; }
  const msg = r.kind === 'in'
    ? '📥 Клієнт пише:\n🇺🇦 ' + esc_(r.uk || r.text || '') + '\n\n💬 Варіант відповіді (натисни, щоб скопіювати):\n<code>' + esc_(r.reply || '') + '</code>\n🇺🇦 ' + esc_(r.reply_uk || '')
    : '📤 Для клієнта (натисни, щоб скопіювати):\n<code>' + esc_(r.text || '') + '</code>\n\n🇺🇦 ' + esc_(r.uk || '');
  send_(chatId, msg, { parse_mode: 'HTML' });
}

// ======================= РЕЖИМИ =======================

function mode_() {
  const p = PropertiesService.getScriptProperties();
  const m = p.getProperty('MODE');
  return m && Date.now() < Number(p.getProperty('MODE_UNTIL') || 0) ? m : '';
}
function setMode_(m, hours) {
  PropertiesService.getScriptProperties().setProperties({ MODE: m, MODE_UNTIL: String(Date.now() + hours * 36e5), MODE_DATE: today_() });
}
function modeDate_() { return PropertiesService.getScriptProperties().getProperty('MODE_DATE'); }
function clearMode_() { PropertiesService.getScriptProperties().deleteProperty('MODE'); }

// ======================= ЗВІТИ =======================

function dayNum_() {
  const a = Date.UTC(+CHALLENGE_START.slice(0, 4), +CHALLENGE_START.slice(5, 7) - 1, +CHALLENGE_START.slice(8, 10));
  const t = today_();
  const b = Date.UTC(+t.slice(0, 4), +t.slice(5, 7) - 1, +t.slice(8, 10));
  return Math.round((b - a) / 864e5) + 1;
}

function dayLine_() {
  const d = dayNum_();
  if (d < 1) return '⏳ Челендж стартує ' + CHALLENGE_START.slice(8, 10) + '.' + CHALLENGE_START.slice(5, 7);
  if (d > CHALLENGE_DAYS) return '🏁 Челендж завершено!';
  const n = Math.round(d / CHALLENGE_DAYS * 10);
  return '📅 День ' + d + '/' + CHALLENGE_DAYS + '  ' + '▰'.repeat(n) + '▱'.repeat(10 - n);
}

function sumLine_(s) {
  const out = [];
  METRICS.forEach(k => {
    if (!s[k]) return;
    if (['Іспанська', 'Англійська', 'Читання', 'Музика'].indexOf(k) !== -1) out.push(k.toLowerCase() + ' ' + q_(s, k) + ' хв');
    else if (k === 'Сон') out.push('сон ' + q_(s, k, 'value') + ' год');
    else if (k === 'Без сигарет') out.push('без сигарет ✓');
    else if (k === 'Підсумок') return;
    else if (k === 'Спорт') out.push('спорт ' + q_(s, k));
    else if (k === 'Слова') out.push('слова ' + q_(s, k));
    else if (SNAPSHOTS.indexOf(k) !== -1) return;
    else out.push(k.toLowerCase() + ' ' + q_(s, k));
  });
  return out.join(', ');
}

function todayText_() {
  const today = today_();
  const s = devSum_(devRows_(), today, today);
  const plan = getPlan_(today);
  const done = habitDay_(daySums_(devRows_()), today, planDates_());
  return dayLine_() + '\n\n' + (sumLine_(s) ? 'Записано: ' + sumLine_(s) : 'Сьогодні ще нічого не записано.') +
    '\n\n🧱 Звички ' + done.filter(Boolean).length + '/' + HABITS.length + ': ' +
    HABITS.map((h, i) => (done[i] ? '✅' : '⬜') + h.icon).join(' ') +
    (plan.length ? '\n\n📝 План:\n' + plan.map(p => (p.done ? '✅ ' : '⬜ ') + p.text).join('\n') : '');
}

function devReport_() {
  const d = devData_();
  const dm = x => x.slice(8, 10) + '.' + x.slice(5, 7);
  const lines = ['🎯 Тиждень ' + dm(d.ws) + '–' + dm(d.we) + ' · бал ' + d.score + '%', dayLine_(), '', '💼 Estone · ' + d.goals.fin + '%'];
  d.actions.forEach(a => lines.push(a.k + ': ' + a.v + '/' + a.t + '  ' + bar_(a.v, a.t)));
  if (d.month.turnoverT) lines.push('Місяць: оборот ' + fmt_(d.month.turnover) + ' з ' + fmt_(d.month.turnoverT) + ' (мін. ' + fmt_(d.month.turnoverMin) + '), угод ' + d.month.deals);
  lines.push('Челендж: ' + fmt_(d.challenge.turnover) + ' з ' + fmt_(d.challenge.goal) + '  ' + bar_(d.challenge.turnover, d.challenge.goal));
  if (d.challenge.quotesSum) lines.push('Прорахунків на ' + fmt_(d.challenge.quotesSum) + ' → прогноз продажів ≈ ' + fmt_(d.challenge.forecast));
  lines.push('', '🗣 Мови · ' + d.goals.es + '%',
    '🇪🇸 ' + d.spanish.min + '/' + d.spanish.t + ' хв  ' + bar_(d.spanish.min, d.spanish.t) + ' · серія ' + d.spanish.streak + ' дн.',
    'Слова: ' + d.words.week + '/' + d.words.t + ' · всього ' + d.words.total + '/' + d.words.goal,
    '🇬🇧 ' + d.english.min + '/' + d.english.t + ' хв  ' + bar_(d.english.min, d.english.t) + ' · серія ' + d.english.streak + ' дн.');
  lines.push('', '💪 Спорт · ' + d.goals.sport + '%', d.sport.n + '/' + d.sport.t + ' тренувань  ' + bar_(d.sport.n, d.sport.t));
  if (d.body.weight) lines.push('Вага: ' + d.body.weight.value + ' кг (ціль ' + WEIGHT_GOAL + ')');
  if (d.body.pullups) lines.push('Підтягування: ' + d.body.pullups.value + '/' + PULLUP_GOAL);
  if (d.goals.habits !== null) {
    lines.push('', '🧱 Звички · ' + d.goals.habits + '%');
    d.habits.list.forEach((h, i) => {
      const g = d.habits.grid[i].filter(x => x !== null);
      lines.push(h.icon + ' ' + h.k + ': ' + g.filter(Boolean).length + '/' + g.length + (d.habits.streaks[i] ? ' · серія ' + d.habits.streaks[i] : ''));
    });
  }
  const L = d.life;
  lines.push('', '🌱 Сон: ' + (L.sleepAvg ? L.sleepAvg + ' год у середньому' : 'немає даних (#сон 7)') +
    ' · 🚬 сигарет ' + L.cigs + ' · 🚭 днів без ' + L.smokeFree +
    '\n📖 читання ' + L.reading + '/' + L.readingT + ' хв · 🎹 музика ' + L.music + '/' + L.musicT + ' хв');
  lines.push('', '📝 План дня виконано: ' + planStats_(d.ws, d.we));
  if (dashOn_()) lines.push('', '📊 ' + dashUrl_());
  return lines.join('\n');
}

function devData_(ws) {
  const rows = devRows_();
  const today = today_();
  const curWs = weekStart_(today);
  ws = /^\d{4}-\d{2}-\d{2}$/.test(ws || '') ? weekStart_(ws) : curWs;
  const we = addDays_(ws, 6);
  const isCurrent = ws === curWs;
  const s = devSum_(rows, ws, we);
  const g = goalPct_(s);
  const plans = planDates_(), m = daySums_(rows);
  g.habits = habitPct_(m, plans, ws, we);
  const month = (isCurrent ? today : we).slice(0, 7);
  const ms = devSum_(rows, month + '-01', month + '-31');
  const f4 = devSum_(rows, addDays_(ws, -21), we);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = addDays_(ws, i), ds = devSum_(rows, d, d);
    days.push({ d: d, es: q_(ds, 'Іспанська'), en: q_(ds, 'Англійська'), sport: q_(ds, 'Спорт') });
  }
  const trend = [];
  for (let i = 7; i >= 0; i--) {
    const w = addDays_(ws, -7 * i);
    const gp = goalPct_(devSum_(rows, w, addDays_(w, 6)));
    gp.habits = habitPct_(m, plans, w, addDays_(w, 6));
    trend.push({ w: w, fin: gp.fin, es: gp.es, sport: gp.sport, habits: gp.habits, score: score_(gp) });
  }
  const day = dayNum_();
  const chal = devSum_(rows, CHALLENGE_START, addDays_(CHALLENGE_START, CHALLENGE_DAYS - 1));
  const sleepDays = days.filter(x => m[x.d] && m[x.d]['Сон']);
  return {
    ws: ws, we: we, isCurrent: isCurrent, today: today,
    day: day >= 1 && day <= CHALLENGE_DAYS ? day : 0, days_total: CHALLENGE_DAYS,
    score: score_(g), goals: g,
    actions: FIN_KEYS.map(k => ({ k: k, v: q_(s, k), t: DEV_TARGETS[k] })),
    spanish: { min: q_(s, 'Іспанська'), t: DEV_TARGETS['Іспанська'], streak: streak_(rows, 'Іспанська') },
    english: { min: q_(s, 'Англійська'), t: DEV_TARGETS['Англійська'], streak: streak_(rows, 'Англійська') },
    sport: { n: q_(s, 'Спорт'), t: DEV_TARGETS['Спорт'], min: q_(s, 'Спорт', 'value') },
    days: days, trend: trend,
    funnel: FUNNEL.map(k => ({ k: k, v: q_(f4, k) })),
    month: {
      key: month, deals: q_(ms, 'Угода'),
      turnover: q_(ms, 'Угода', 'value'), margin: q_(ms, 'Угода', 'margin'),
      turnoverT: (TURNOVER_PLAN[month] || {}).target || 0, turnoverMin: (TURNOVER_PLAN[month] || {}).min || 0,
      quotes: q_(ms, 'Прорахунок'), quotesSum: q_(ms, 'Прорахунок', 'value'),
    },
    challenge: {
      turnover: q_(chal, 'Угода', 'value'), deals: q_(chal, 'Угода'),
      goal: TURNOVER_GOAL, min: TURNOVER_MIN,
      quotes: q_(chal, 'Прорахунок'), quotesSum: q_(chal, 'Прорахунок', 'value'),
      forecast: Math.round(q_(chal, 'Прорахунок', 'value') * QUOTE_CONV), conv: QUOTE_CONV,
    },
    habits: {
      list: HABITS.map(h => ({ k: h.k, icon: h.icon })),
      grid: HABITS.map(h => days.map(x => x.d > today || x.d < HABITS_START ? null : habitDone_(h.k, m[x.d] || {}, x.d, plans))),
      streaks: HABITS.map(h => habitStreak_(m, plans, h.k)),
    },
    life: {
      sleepAvg: sleepDays.length ? Math.round(sleepDays.reduce((a, x) => a + m[x.d]['Сон'].value, 0) / sleepDays.length * 10) / 10 : 0,
      sleepGoal: SLEEP_GOAL, cigs: q_(s, 'Сигарети'),
      smokeFree: days.filter(x => habitDone_('Без сигарет', m[x.d] || {}, x.d, plans)).length,
      reading: q_(s, 'Читання'), readingT: DEV_TARGETS['Читання'], music: q_(s, 'Музика'), musicT: DEV_TARGETS['Музика'],
    },
    words: { week: q_(s, 'Слова'), t: DEV_TARGETS['Слова'], total: wordsTotal_(rows), goal: WORDS_GOAL },
    body: {
      weight: snapshot_(rows, 'Вага'), weightStart: firstSnap_(rows, 'Вага'), weightGoal: WEIGHT_GOAL,
      pullups: snapshot_(rows, 'Підтягування'), pullupsStart: firstSnap_(rows, 'Підтягування'), pullupGoal: PULLUP_GOAL,
    },
    insta: snapshot_(rows, 'Instagram'), site: snapshot_(rows, 'Сайт'),
    updated: Utilities.formatDate(new Date(), TZ, 'dd.MM HH:mm'),
  };
}

// ======================= ОБЧИСЛЕННЯ =======================

function today_() { return Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd'); }
function addDays_(s, n) {
  return new Date(Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10) + n)).toISOString().slice(0, 10);
}
function weekStart_(s) {
  const wd = (new Date(Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10))).getUTCDay() + 6) % 7;
  return addDays_(s, -wd);
}
function devSum_(rows, from, to) {
  const s = {};
  rows.forEach(r => {
    if (r.day < from || r.day > to) return;
    const x = s[r.metric] || (s[r.metric] = { qty: 0, value: 0, margin: 0 });
    x.qty += r.qty; x.value += r.value; x.margin += r.margin;
  });
  return s;
}
function q_(s, k, f) { return s[k] ? Math.round(s[k][f || 'qty'] * 100) / 100 : 0; }
function pct_(v, t) { return t ? Math.min(100, Math.round(v / t * 100)) : 0; }
function goalPct_(s) {
  const fin = Math.round(FIN_KEYS.reduce((a, k) => a + pct_(q_(s, k), DEV_TARGETS[k]), 0) / FIN_KEYS.length);
  // Мови: іспанська (хвилини + слова) важить 2/3, англійська — 1/3
  const es = Math.round((pct_(q_(s, 'Іспанська'), DEV_TARGETS['Іспанська']) + pct_(q_(s, 'Слова'), DEV_TARGETS['Слова']) +
    pct_(q_(s, 'Англійська'), DEV_TARGETS['Англійська'])) / 3);
  return { fin: fin, es: es, sport: pct_(q_(s, 'Спорт'), DEV_TARGETS['Спорт']) };
}
function score_(g) {
  const p = [g.fin, g.es, g.sport].concat(g.habits === null || g.habits === undefined ? [] : [g.habits]);
  return Math.round(p.reduce((a, x) => a + x, 0) / p.length);
}
function firstSnap_(rows, metric) {
  const r = rows.find(x => x.metric === metric);
  return r ? r.value : null;
}
function wordsTotal_(rows) {
  return Math.round(rows.filter(r => r.metric === 'Слова' && r.day >= CHALLENGE_START).reduce((a, r) => a + r.qty, 0));
}
function plural_(n, one, few, many) {
  const a = Math.abs(n) % 100, b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b === 1) return one;
  if (b >= 2 && b <= 4) return few;
  return many;
}
function signed_(x) { return (x > 0 ? '+' : '') + x; }
function streak_(rows, metric) {
  const days = {};
  rows.forEach(r => { if (r.metric === metric && r.qty > 0) days[r.day] = 1; });
  let d = today_();
  if (!days[d]) d = addDays_(d, -1);
  let n = 0;
  while (days[d]) { n++; d = addDays_(d, -1); }
  return n;
}
function snapshot_(rows, metric) {
  const rs = rows.filter(r => r.metric === metric);
  if (!rs.length) return null;
  const last = rs[rs.length - 1], prev = rs.length > 1 ? rs[rs.length - 2] : null;
  return { value: last.value, delta: prev ? last.value - prev.value : null, day: last.day };
}
function bar_(v, t) {
  const n = t ? Math.min(10, Math.round(v / t * 10)) : 0;
  return '▰'.repeat(n) + '▱'.repeat(10 - n);
}
function fmt_(x) { return Math.round(Number(x)).toLocaleString('uk-UA') + ' ' + CURRENCY; }

// ======================= ДОПОМІЖНЕ =======================

function dashOn_() { return DASH_KEY && DASH_KEY.indexOf('ВСТАВ') !== 0; }
function dashUrl_() { return WEBAPP_URL + '?key=' + encodeURIComponent(DASH_KEY); }

function ss_() {
  const id = PropertiesService.getScriptProperties().getProperty('SS_ID');
  return id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
}

const HEADERS = {
  'Записи': ['Дата', 'Показник', 'Кількість', 'Значення', 'Маржа', 'Нотатка', 'Джерело'],
  'Плани':  ['Дата', 'Справа', 'Статус'],
  'Огляди': ['Дата', 'Відповідь', 'Коуч'],
  'Слова':  ['Слово', 'Переклад', 'Приклад', 'Тема', 'Додано', 'Джерело', 'Етап', 'Наступне'],
  'Щоденник': ['Дата', 'Підсумок'],
  'Ідеї':   ['Дата', 'Ідея', 'Статус'],
};

function sheet_(name) {
  const ss = ss_();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(HEADERS[name]);
    sh.setFrozenRows(1);
    sh.getRange('1:1').setFontWeight('bold');
    if (name === SHEET_PLAN || name === SHEET_JOURNAL) sh.getRange('A:A').setNumberFormat('@');
    else if (name === SHEET_WORDS) sh.getRange('E:H').setNumberFormat('@');
    else sh.getRange('A:A').setNumberFormat('dd.MM.yyyy HH:mm');
  }
  return sh;
}

function tg_(method, payload) {
  const res = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/' + method, {
    method: 'post', contentType: 'application/json',
    payload: JSON.stringify(payload || {}), muteHttpExceptions: true,
  });
  return JSON.parse(res.getContentText());
}

function send_(chatId, text, extra) {
  return tg_('sendMessage', Object.assign({ chat_id: chatId, text: text, disable_web_page_preview: true }, extra || {}));
}

// ============ НАЛАШТУВАННЯ (запускати вручну) ============

/** 1. Створює вкладки таблиці. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  PropertiesService.getScriptProperties().setProperty('SS_ID', ss.getId());
  ss.setSpreadsheetTimeZone(TZ);
  const names = [SHEET_LOG, SHEET_PLAN, SHEET_REVIEW, SHEET_WORDS, SHEET_JOURNAL, SHEET_IDEAS];
  names.forEach(sheet_);
  ss.getSheets().forEach(s => {
    if (names.indexOf(s.getName()) === -1 && s.getLastRow() === 0) ss.deleteSheet(s);
  });
  console.log('Готово: вкладки створено.');
}

/** 2. Підключає бота (після розгортання і вставки WEBAPP_URL). */
function setWebhook() {
  if (WEBAPP_URL.indexOf('https://') !== 0) throw new Error('Спочатку встав WEBAPP_URL');
  console.log(tg_('setWebhook', { url: WEBAPP_URL, drop_pending_updates: true, allowed_updates: ['message', 'callback_query'] }));
  console.log(tg_('setMyCommands', { commands: [
    { command: 'menu', description: 'Показати меню' },
    { command: 'today', description: 'Сьогодні' },
    { command: 'habits', description: 'Звички дня' },
    { command: 'es', description: 'Переклад для клієнта іспанською' },
    { command: 'en', description: 'Переклад для клієнта англійською' },
    { command: 'week', description: 'Тиждень' },
    { command: 'plan', description: 'План дня' },
    { command: 'coach', description: 'Порада коуча' },
    { command: 'words', description: 'Слова на сьогодні' },
    { command: 'goals', description: 'Цілі челенджу' },
    { command: 'dash', description: 'Дашборд' },
    { command: 'undo', description: 'Скасувати останній запис' },
    { command: 'help', description: 'Довідка' },
  ] }));
  if (OWNER_ID) send_(OWNER_ID, '⌨️ Меню оновлено — кнопки внизу.', { reply_markup: MAIN_KB });
}

/** 3. Вмикає ранкові, денні, вечірні та недільні повідомлення. */
function installTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('morningPush').timeBased().atHour(MORNING_HOUR).nearMinute(30).everyDays(1).inTimezone(TZ).create();
  ScriptApp.newTrigger('middayNudge').timeBased().atHour(NUDGE_HOUR).everyDays(1).inTimezone(TZ).create();
  ScriptApp.newTrigger('eveningPush').timeBased().atHour(EVENING_HOUR).everyDays(1).inTimezone(TZ).create();
  ScriptApp.newTrigger('lateNudge').timeBased().atHour(LATE_HOUR).nearMinute(30).everyDays(1).inTimezone(TZ).create();
  ScriptApp.newTrigger('weeklyReview').timeBased().onWeekDay(ScriptApp.WeekDay.SUNDAY).atHour(REVIEW_HOUR).inTimezone(TZ).create();
  console.log('Розклад увімкнено: ' + ScriptApp.getProjectTriggers().length + ' тригери.');
}

/** Перевірка Gemini: розбір тексту. */
function testGemini() {
  console.log(JSON.stringify(ai_(PARSE_PROMPT, 'написав 15 дизайнерам, двоє відповіли, 20 хвилин іспанської, був у залі годину, вчора зробив прорахунок на 2400', null)));
}

/** Перевірка слів дня. */
function testWords() { console.log(JSON.stringify(newDailyWords_())); }

function checkWebhook() { console.log(tg_('getWebhookInfo', {})); }
