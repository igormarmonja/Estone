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

// ----- Цілі на тиждень і місяць -----
const DEV_TARGETS = {
  'Дотик': 130, 'Відповідь': 26, 'Дзвінок': 20, 'Розмова': 13, 'Прорахунок': 8,
  'Іспанська': 420,   // активних хвилин (60 на день)
  'Англійська': 105,  // активних хвилин (15 на день)
  'Слова': 35,        // 5 на день
  'Спорт': 3,         // тренувань
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
  'Instagram':  ['інста', 'інстаграм', 'insta', 'instagram'],
  'Сайт':       ['сайт', 'site', 'web'],
};
const SNAPSHOTS = ['Вага', 'Підтягування', 'Instagram', 'Сайт'];
// ========================================================

const METRICS      = Object.keys(DEV_ALIASES);
const FIN_KEYS     = ['Дотик', 'Відповідь', 'Дзвінок', 'Розмова', 'Прорахунок'];
const FUNNEL       = ['Дотик', 'Відповідь', 'Розмова', 'Прорахунок', 'Угода'];
const SHEET_LOG    = 'Записи';
const SHEET_PLAN   = 'Плани';
const SHEET_REVIEW = 'Огляди';
const SHEET_WORDS  = 'Слова';
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
  'Instagram': '📸', 'Сайт': '🌐' };

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
  process_(chatId, null, { mime: v.mime_type || 'audio/ogg', data: Utilities.base64Encode(blob.getBytes()) });
}

/** Вільний текст або голос: план, огляд або записи — залежно від режиму. */
function process_(chatId, text, audio) {
  const mode = mode_();

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

  if (!geminiOn_()) { send_(chatId, 'Без Gemini я розумію тільки швидкі записи: #дотик 20. Довідка: /help'); return; }
  tg_('sendChatAction', { chat_id: chatId, action: 'typing' });
  const r = ai_(PARSE_PROMPT, text, audio);
  if (!r) { send_(chatId, 'Не вдалося розібрати 😕 Спробуй ще раз або швидкий запис: #дотик 20'); return; }
  const entries = (r.entries || []).map(cleanEntry_).filter(Boolean);
  const heard = audio && r.transcript ? '🎙 «' + String(r.transcript).slice(0, 300) + '»\n\n' : '';
  if (!entries.length) {
    send_(chatId, heard + 'Не знайшов, що записати 🤔\nПриклад: «написав 15 дизайнерам, 20 хвилин іспанської, був у залі»');
    return;
  }
  entries.forEach(e => saveEntry_(e, audio ? 'голос' : 'текст'));
  send_(chatId, heard + confirm_(entries));
}

// ======================= ШВИДКИЙ ЗАПИС # =======================

function handleTag_(chatId, text) {
  const t = text.replace(/[’ʼ]/g, "'").replace(/€/g, ' ').trim();
  const m = t.match(/^#\s*([^\s\d]+)\s*(.*)$/);
  if (!m) { send_(chatId, HELP); return; }
  const tag = m[1].toLowerCase();
  if (tag === 'слово' || tag === 'word') { addOwnWord_(chatId, m[2]); return; }
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
  '🎙 Просто надиктуй голосом або напиши, що зробив:\n' +
  '«написав 15 дизайнерам, двоє відповіли, 20 хвилин іспанської, 15 англійської, був у залі»\n' +
  'Можна і про вчора: «вчора зробив прорахунок на 2400»\n\n' +
  '⚡ Швидко: #дотик 20 · #відповідь 2 · #дзвінок 3 · #розмова 1\n' +
  '#прорахунок 2400 · #угода 3500 маржа 700\n' +
  '#іспанська 20 · #слова 5 · #слово desagüe · #англ 15\n' +
  '#спорт 45 · #вага 80.5 · #підтягування 4\n#інста 520 · #сайт 140\n\n' +
  '/today — сьогодні\n/week — тиждень\n/plan — задати план дня\n/coach — порада коуча\n' +
  '/words — слова на сьогодні\n/goals — цілі челенджу\n/dash — дашборд\n/undo — скасувати останній запис\n/skip — скасувати очікування плану чи огляду';

function command_(chatId, text) {
  const cmd = text.split(/\s+/)[0].split('@')[0].toLowerCase();
  switch (cmd) {
    case '/start':
    case '/help':
      send_(chatId, HELP); break;

    case '/today':
      send_(chatId, todayText_()); break;

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
      send_(chatId, c ? '🧠 ' + c : 'Коуч зараз недоступний 😕 Спробуй пізніше.');
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
      send_(chatId, w.length ? wordsText_(w) : 'Не вдалося підібрати слова 😕 Спробуй пізніше.', { parse_mode: 'HTML' });
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
  const y = devSum_(devRows_(), addDays_(today_(), -1), addDays_(today_(), -1));
  const yLine = sumLine_(y);
  setMode_('plan', 8);
  send_(OWNER_ID, '☀️ Доброго ранку! ' + dayLine_() +
    (yLine ? '\nВчора: ' + yLine : '') +
    '\n\nЯкі 3 головні справи на сьогодні? Напиши або надиктуй 🎙\n/skip — без плану');
  const w = botWordsToday_().length ? botWordsToday_() : newDailyWords_();
  if (w.length) send_(OWNER_ID, wordsText_(w), { parse_mode: 'HTML' });
}

function middayNudge() {
  const today = today_();
  if (devRows_().some(r => r.day === today)) return;
  send_(OWNER_ID, '👀 Сьогодні ще жодного запису.\nОдин маленький крок прямо зараз: 5 повідомлень клієнтам, 10 хвилин іспанської або англійський подкаст. Що обираєш?');
}

function eveningPush() {
  const today = today_();
  const s = devSum_(devRows_(), today, today);
  const line = sumLine_(s);
  const plan = getPlan_(today);
  let msg = '🌙 Вечірня перевірка · ' + dayLine_() + '\n\n' +
    (line ? 'Сьогодні записано: ' + line : 'Сьогодні ще нічого не записано.');
  if (plan.length) msg += '\n\n📝 План дня — натисни, що виконано:';
  msg += '\n\nЩо ще зробив? Надиктуй одним голосовим 🎙';
  send_(OWNER_ID, msg, plan.length ? { reply_markup: { inline_keyboard: planKeyboard_(today) } } : null);
  wordsQuiz_();
}

function weeklyReview() {
  send_(OWNER_ID, devReport_());
  const coach = coach_();
  if (coach) send_(OWNER_ID, '🧠 Коуч:\n' + coach);
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
  'days_ago: 0 якщо сьогодні, 1 якщо «вчора», 2 якщо «позавчора».\n' +
  'Якщо в повідомленні немає нічого з цього, entries = [].\n' +
  'Відповідай ТІЛЬКИ JSON: {"transcript": "дослівний текст повідомлення", "entries": [{"metric": "Дотик", "qty": 1, "value": null, "margin": null, "note": "до 6 слів", "days_ago": 0}]}';

const PLAN_PROMPT =
  'Ігор диктує план на день. Виділи до 3 головних справ, кожну коротко (до 8 слів), українською.\n' +
  'Відповідай ТІЛЬКИ JSON: {"transcript": "дослівний текст", "plan": ["справа 1", "справа 2", "справа 3"]}';

const TRANSCRIBE_PROMPT =
  'Дослівно розшифруй аудіо українською. Відповідай ТІЛЬКИ JSON: {"transcript": "текст"}';

function geminiOn_() { return GEMINI_API_KEY && GEMINI_API_KEY.indexOf('ВСТАВ') !== 0; }

function gemini_(parts, json, maxTokens) {
  try {
    const cfg = { temperature: json ? 0 : 0.6, maxOutputTokens: maxTokens || 1024 };
    if (json) cfg.responseMimeType = 'application/json';
    const res = UrlFetchApp.fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/' + GEMINI_MODEL + ':generateContent', {
        method: 'post', contentType: 'application/json', muteHttpExceptions: true,
        headers: { 'x-goog-api-key': GEMINI_API_KEY },
        payload: JSON.stringify({ contents: [{ parts: parts }], generationConfig: cfg }),
      });
    const d = JSON.parse(res.getContentText());
    if (d.error) { console.error('Gemini: ' + d.error.message); return null; }
    const c = (d.candidates || [])[0];
    return c && c.content ? c.content.parts.map(p => p.text || '').join('') : null;
  } catch (err) {
    console.error(err);
    return null;
  }
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
      іспанська_хв: d.spanish, англійська_хв: d.english, спорт: d.sport },
    місяць: d.month, воронка_4_тижні: d.funnel, тренд_8_тижнів: d.trend,
    план_дня_виконано: planStats_(d.ws, d.we), попередній_огляд: lastReview_(),
  };
  const prompt =
    'Ти — чесний і доброзичливий коуч Ігоря в 90-денному челенджі. Ігор працює оператором ЧПУ в Іспанії, ' +
    'паралельно розвиває Estone (декоративний камінь і кераміка для дизайнерів та архітекторів в Україні й Іспанії), ' +
    'вчить іспанську (рівень A2), підтримує англійську і займається спортом. Його відома пастка: будувати інструменти й «упаковку» замість продажів.\n' +
    'Дай відповідь українською, до 150 слів, простим текстом без markdown: ' +
    '1) що добре (одне речення з цифрою); 2) головне вузьке місце (з цифрою); 3) три конкретні дії на наступні 7 днів. ' +
    'Не хвали без причини. Якщо даних мало, так і скажи і порадь почати записувати.\n\nДані: ' + JSON.stringify(ctx) +
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
  if ((out.metric === 'Іспанська' || out.metric === 'Англійська') && !(out.qty > 0)) out.qty = 15;
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
      case 'Іспанська':
        return ic + ' +' + e.qty + ' хв' + when + ' · тиждень ' + q_(s, 'Іспанська') + '/' + DEV_TARGETS['Іспанська'] +
          ' · серія ' + streak_(rows, 'Іспанська') + ' дн. 🔥';
      case 'Англійська':
        return ic + ' +' + e.qty + ' хв' + when + ' · тиждень ' + q_(s, 'Англійська') + '/' + DEV_TARGETS['Англійська'] +
          ' · серія ' + streak_(rows, 'Англійська') + ' дн.';
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

// ======================= РЕЖИМИ =======================

function mode_() {
  const p = PropertiesService.getScriptProperties();
  const m = p.getProperty('MODE');
  return m && Date.now() < Number(p.getProperty('MODE_UNTIL') || 0) ? m : '';
}
function setMode_(m, hours) {
  PropertiesService.getScriptProperties().setProperties({ MODE: m, MODE_UNTIL: String(Date.now() + hours * 36e5) });
}
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
    if (k === 'Іспанська' || k === 'Англійська') out.push(k.toLowerCase() + ' ' + q_(s, k) + ' хв');
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
  return dayLine_() + '\n\n' + (sumLine_(s) ? 'Записано: ' + sumLine_(s) : 'Сьогодні ще нічого не записано.') +
    (plan.length ? '\n\n📝 План:\n' + plan.map(p => (p.done ? '✅ ' : '⬜ ') + p.text).join('\n') : '');
}

function devReport_() {
  const d = devData_();
  const dm = x => x.slice(8, 10) + '.' + x.slice(5, 7);
  const lines = ['🎯 Тиждень ' + dm(d.ws) + '–' + dm(d.we) + ' · бал ' + d.score + '%', dayLine_(), '', '💼 Estone · ' + d.goals.fin + '%'];
  d.actions.forEach(a => lines.push(a.k + ': ' + a.v + '/' + a.t + '  ' + bar_(a.v, a.t)));
  if (d.month.turnoverT) lines.push('Місяць: оборот ' + fmt_(d.month.turnover) + ' з ' + fmt_(d.month.turnoverT) + ' (мін. ' + fmt_(d.month.turnoverMin) + '), угод ' + d.month.deals);
  lines.push('Челендж: ' + fmt_(d.challenge.turnover) + ' з ' + fmt_(d.challenge.goal) + '  ' + bar_(d.challenge.turnover, d.challenge.goal));
  lines.push('', '🗣 Мови · ' + d.goals.es + '%',
    '🇪🇸 ' + d.spanish.min + '/' + d.spanish.t + ' хв  ' + bar_(d.spanish.min, d.spanish.t) + ' · серія ' + d.spanish.streak + ' дн.',
    'Слова: ' + d.words.week + '/' + d.words.t + ' · всього ' + d.words.total + '/' + d.words.goal,
    '🇬🇧 ' + d.english.min + '/' + d.english.t + ' хв  ' + bar_(d.english.min, d.english.t) + ' · серія ' + d.english.streak + ' дн.');
  lines.push('', '💪 Спорт · ' + d.goals.sport + '%', d.sport.n + '/' + d.sport.t + ' тренувань  ' + bar_(d.sport.n, d.sport.t));
  if (d.body.weight) lines.push('Вага: ' + d.body.weight.value + ' кг (ціль ' + WEIGHT_GOAL + ')');
  if (d.body.pullups) lines.push('Підтягування: ' + d.body.pullups.value + '/' + PULLUP_GOAL);
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
    trend.push({ w: w, fin: gp.fin, es: gp.es, sport: gp.sport });
  }
  const day = dayNum_();
  return {
    ws: ws, we: we, isCurrent: isCurrent, today: today,
    day: day >= 1 && day <= CHALLENGE_DAYS ? day : 0, days_total: CHALLENGE_DAYS,
    score: Math.round((g.fin + g.es + g.sport) / 3), goals: g,
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
      turnover: q_(devSum_(rows, CHALLENGE_START, addDays_(CHALLENGE_START, CHALLENGE_DAYS - 1)), 'Угода', 'value'),
      deals: q_(devSum_(rows, CHALLENGE_START, addDays_(CHALLENGE_START, CHALLENGE_DAYS - 1)), 'Угода'),
      goal: TURNOVER_GOAL, min: TURNOVER_MIN,
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
};

function sheet_(name) {
  const ss = ss_();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(HEADERS[name]);
    sh.setFrozenRows(1);
    sh.getRange('1:1').setFontWeight('bold');
    if (name === SHEET_PLAN) sh.getRange('A:A').setNumberFormat('@');
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
  [SHEET_LOG, SHEET_PLAN, SHEET_REVIEW, SHEET_WORDS].forEach(sheet_);
  ss.getSheets().forEach(s => {
    if ([SHEET_LOG, SHEET_PLAN, SHEET_REVIEW, SHEET_WORDS].indexOf(s.getName()) === -1 && s.getLastRow() === 0) ss.deleteSheet(s);
  });
  console.log('Готово: вкладки створено.');
}

/** 2. Підключає бота (після розгортання і вставки WEBAPP_URL). */
function setWebhook() {
  if (WEBAPP_URL.indexOf('https://') !== 0) throw new Error('Спочатку встав WEBAPP_URL');
  console.log(tg_('setWebhook', { url: WEBAPP_URL, drop_pending_updates: true, allowed_updates: ['message', 'callback_query'] }));
  console.log(tg_('setMyCommands', { commands: [
    { command: 'today', description: 'Сьогодні' },
    { command: 'week', description: 'Тиждень' },
    { command: 'plan', description: 'План дня' },
    { command: 'coach', description: 'Порада коуча' },
    { command: 'words', description: 'Слова на сьогодні' },
    { command: 'goals', description: 'Цілі челенджу' },
    { command: 'dash', description: 'Дашборд' },
    { command: 'undo', description: 'Скасувати останній запис' },
    { command: 'help', description: 'Довідка' },
  ] }));
}

/** 3. Вмикає ранкові, денні, вечірні та недільні повідомлення. */
function installTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('morningPush').timeBased().atHour(MORNING_HOUR).nearMinute(30).everyDays(1).inTimezone(TZ).create();
  ScriptApp.newTrigger('middayNudge').timeBased().atHour(NUDGE_HOUR).everyDays(1).inTimezone(TZ).create();
  ScriptApp.newTrigger('eveningPush').timeBased().atHour(EVENING_HOUR).everyDays(1).inTimezone(TZ).create();
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
