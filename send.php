<?php
/* ─────────────────────────────────────────────────────────────
   ESTONE — приймач заявок з форм сайту.

   Кладеться в корінь сайту, поруч з index.html.
   У config.js має бути:  formEndpoint: '/send.php'

   Заявка потрапляє одразу в три місця, щоб не загубитись:
     1) Telegram  — миттєво, найнадійніший канал
     2) leads.csv — файл поруч, його можна відкрити Excel
     3) пошта     — якщо вказана, але це найненадійніший канал

   Нижче заповніть ТІЛЬКИ блок НАЛАШТУВАННЯ.
   ───────────────────────────────────────────────────────────── */

// ══════════════════ НАЛАШТУВАННЯ ══════════════════

// --- Telegram. Найшвидший спосіб отримувати заявки ---
// Як отримати за 5 хвилин:
//   1. У Telegram знайдіть @BotFather → /newbot → придумайте ім'я
//   2. Він видасть токен виду 1234567890:AAE...  — вставте нижче
//   3. Напишіть своєму новому боту будь-що (інакше він не зможе вам писати)
//   4. Відкрийте https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates
//      і знайдіть там "chat":{"id":123456789 — це ваш chat_id
$TELEGRAM_TOKEN = '';          // напр. '1234567890:AAEhBOweik6ad...'
$TELEGRAM_CHAT  = '';          // напр. '123456789' або '-1001234567890' для групи

// --- Пошта ---
$MAIL_TO   = 'info@estone.com.ua';
$MAIL_FROM = 'noreply@estone.com.ua';   // має бути на вашому домені
$MAIL_ON   = true;                       // false — не слати пошту взагалі

// --- Файл з заявками ---
$CSV_FILE = __DIR__ . '/leads.csv';

// --- Обмеження: не більше N заявок з однієї IP за годину ---
$RATE_LIMIT = 10;

// Приватні налаштування окремим файлом (не потрапляє в git і в архів із кодом)
if (is_readable(__DIR__ . '/send.config.php')) { require __DIR__ . '/send.config.php'; }

// ── Разова допомога: дізнатись свій chat_id ──────────────────
// Відкрийте в браузері estone.com.ua/send.php?chatid=1
// Працює тільки поки $TELEGRAM_CHAT порожній — потім вимикається сам.
// ── Автовизначення чату ──────────────────────────────────────
// Щоб не змушувати вас шукати chat_id вручну: якщо він не заданий,
// скрипт сам питає Telegram, кому писати. Беремо перший приватний
// чат, який написав боту, і запамʼятовуємо його назавжди у файлі.
// Далі значення не змінюється, навіть якщо боту напише хтось інший.
$CHAT_LOCK = __DIR__ . '/.estone_chat';

if ($TELEGRAM_TOKEN && !$TELEGRAM_CHAT && is_readable($CHAT_LOCK)) {
    $TELEGRAM_CHAT = trim((string)file_get_contents($CHAT_LOCK));
}

function tg_api($token, $method, $params = []) {
    $url = "https://api.telegram.org/bot{$token}/{$method}";
    $body = http_build_query($params);
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => (bool)$params, CURLOPT_POSTFIELDS => $body,
            CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 10,
        ]);
        $res = curl_exec($ch); curl_close($ch);
        return json_decode((string)$res, true);
    }
    $opts = ['timeout' => 10];
    if ($params) {
        $opts['method'] = 'POST';
        $opts['header'] = "Content-Type: application/x-www-form-urlencoded\r\n";
        $opts['content'] = $body;
    }
    return json_decode((string)@file_get_contents($url, false, stream_context_create(['http' => $opts])), true);
}

/** Знаходить і запамʼятовує чат. Повертає id або '' */
function tg_lock_chat($token, $lockFile) {
    $data = tg_api($token, 'getUpdates');
    if (empty($data['ok'])) { return ''; }
    foreach (($data['result'] ?? []) as $u) {
        $chat = $u['message']['chat'] ?? null;
        if (!$chat) { continue; }
        /* тільки приватний чат або група, куди бота додали свідомо */
        if (!in_array($chat['type'] ?? '', ['private', 'group', 'supergroup'], true)) { continue; }
        $id = (string)$chat['id'];
        @file_put_contents($lockFile, $id);
        tg_api($token, 'sendMessage', [
            'chat_id' => $id,
            'text' => "✅ Сповіщення увімкнено. Заявки з estone.com.ua приходитимуть сюди.",
        ]);
        return $id;
    }
    return '';
}

// ── Сторінка налаштування: estone.com.ua/send.php?chatid=1 ───
if (isset($_GET['chatid']) && $TELEGRAM_TOKEN) {
    header('Content-Type: text/plain; charset=utf-8');
    if ($TELEGRAM_CHAT) {
        exit("Сповіщення вже працюють. Чат: {$TELEGRAM_CHAT}\n\n"
           . "Щоб змінити отримувача — видаліть файл .estone_chat у корені сайту\n"
           . "і напишіть боту з потрібного акаунта або групи.\n");
    }
    $id = tg_lock_chat($TELEGRAM_TOKEN, $CHAT_LOCK);
    if ($id) {
        exit("Готово. Заявки приходитимуть у чат {$id}.\n"
           . "Перевірте Telegram — має прийти підтвердження.\n");
    }
    $probe = tg_api($TELEGRAM_TOKEN, 'getMe');
    if (empty($probe['ok'])) {
        exit("Не вдалось звʼязатись з Telegram. Перевірте токен у send.config.php.\n");
    }
    exit("Бот на звʼязку (@" . ($probe['result']['username'] ?? '?') . "), але йому ще ніхто не писав.\n\n"
       . "Відкрийте Telegram, знайдіть бота, натисніть «Запустити» або напишіть йому будь-що,\n"
       . "потім оновіть цю сторінку.\n\n"
       . "Якщо заявки має бачити кілька людей — створіть групу, додайте туди бота,\n"
       . "напишіть повідомлення в групі й оновіть цю сторінку.\n");
}

// ══════════════════ ДАЛІ НІЧОГО МІНЯТИ НЕ ТРЕБА ══════════════════

header('Content-Type: application/json; charset=utf-8');

// Дозволяємо запит тільки зі свого сайту
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = ['https://estone.com.ua', 'https://www.estone.com.ua'];
if ($origin && in_array($origin, $allowed, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
}
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method']);
    exit;
}

// Читаємо тіло запиту, не більше 32 КБ
$raw = file_get_contents('php://input', false, null, 0, 32768);
$in  = json_decode($raw, true);
if (!is_array($in)) { $in = $_POST; }
if (!is_array($in)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'payload']);
    exit;
}

/** Чистимо значення: обрізаємо, прибираємо переноси рядків з коротких полів */
function clean($v, $len = 300, $multiline = false) {
    $v = is_scalar($v) ? (string)$v : '';
    $v = trim($v);
    if (!$multiline) { $v = preg_replace('/[\r\n]+/u', ' ', $v); }
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $v);
    return mb_substr($v, 0, $len);
}

$name    = clean($in['name']    ?? '', 120);
$phone   = clean($in['phone']   ?? '', 40);
$product = clean($in['product'] ?? '', 120);
$size    = clean($in['size']    ?? '', 200);
$comment = clean($in['comment'] ?? '', 1500, true);
$model   = clean($in['model']   ?? '', 60);
$form    = clean($in['form']    ?? '', 60);
$page    = clean($in['page']    ?? '', 300);

// UTM-мітки: звідки прийшов клієнт
$utm = [];
foreach (['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'] as $k) {
    if (!empty($in[$k])) { $utm[$k] = clean($in[$k], 200); }
}

// Мінімальна перевірка
$digits = preg_replace('/\D/', '', $phone);
if ($name === '' || strlen($digits) < 9) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'validation']);
    exit;
}

// Обмеження частоти
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$ip = clean(explode(',', $ip)[0], 45);
$rateFile = sys_get_temp_dir() . '/estone_rate_' . md5($ip);
$hits = [];
if (is_readable($rateFile)) {
    $hits = array_filter((array)json_decode((string)file_get_contents($rateFile), true),
                         fn($t) => $t > time() - 3600);
}
if (count($hits) >= $RATE_LIMIT) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'rate']);
    exit;
}
$hits[] = time();
@file_put_contents($rateFile, json_encode(array_values($hits)));

$when   = date('Y-m-d H:i:s');
$source = $utm ? implode(' · ', array_map(fn($k, $v) => "$k=$v", array_keys($utm), $utm)) : 'прямий захід';

// ── 1. Записуємо у файл ───────────────────────────────────────
$isNew = !file_exists($CSV_FILE);
if ($fh = @fopen($CSV_FILE, 'a')) {
    if (flock($fh, LOCK_EX)) {
        if ($isNew) {
            fwrite($fh, "\xEF\xBB\xBF"); // щоб Excel не ламав кирилицю
            fputcsv($fh, ['Дата','Ім\'я','Телефон','Модель','Що цікавить','Розміри','Коментар','Форма','Сторінка','Джерело','IP'], ';');
        }
        fputcsv($fh, [$when, $name, $phone, $model, $product, $size, $comment, $form, $page, $source, $ip], ';');
        flock($fh, LOCK_UN);
    }
    fclose($fh);
}

// ── 2. Telegram ───────────────────────────────────────────────
$tgOk = null;
if ($TELEGRAM_TOKEN && !$TELEGRAM_CHAT) {
    /* пробуємо знайти чат не частіше ніж раз на 5 хвилин,
       щоб недоступний Telegram не гальмував кожну заявку */
    $try = sys_get_temp_dir() . '/estone_chat_try';
    if (!is_readable($try) || (time() - (int)filemtime($try)) > 300) {
        @touch($try);
        $TELEGRAM_CHAT = tg_lock_chat($TELEGRAM_TOKEN, $CHAT_LOCK);
    }
}
if ($TELEGRAM_TOKEN && $TELEGRAM_CHAT) {
    $lines = ["🔔 <b>Нова заявка з сайту</b>", ''];
    $lines[] = "👤 <b>" . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "</b>";
    $lines[] = "📞 " . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    if ($model)   { $lines[] = "🏷 Модель <b>" . htmlspecialchars($model, ENT_QUOTES, 'UTF-8') . "</b>"; }
    if ($product) { $lines[] = "🧱 " . htmlspecialchars($product, ENT_QUOTES, 'UTF-8'); }
    if ($size)    { $lines[] = "📐 " . htmlspecialchars($size, ENT_QUOTES, 'UTF-8'); }
    if ($comment) { $lines[] = "💬 " . htmlspecialchars($comment, ENT_QUOTES, 'UTF-8'); }
    $lines[] = '';
    $lines[] = "📄 " . htmlspecialchars($page ?: '/', ENT_QUOTES, 'UTF-8') . "  ·  форма: " . htmlspecialchars($form, ENT_QUOTES, 'UTF-8');
    $lines[] = "🔗 " . htmlspecialchars($source, ENT_QUOTES, 'UTF-8');
    $lines[] = "🕑 $when";

    $tgOk = tg_send($TELEGRAM_TOKEN, $TELEGRAM_CHAT, implode("\n", $lines));
}

function tg_send($token, $chat, $text) {
    $r = tg_api($token, 'sendMessage', [
        'chat_id' => $chat, 'text' => $text, 'parse_mode' => 'HTML',
    ]);
    return !empty($r['ok']);
}

// ── 3. Пошта ──────────────────────────────────────────────────
$mailOk = null;
if ($MAIL_ON && $MAIL_TO) {
    $subject = "Заявка з сайту: $name, $phone";
    $body = "Нова заявка з estone.com.ua\n\n"
          . "Ім'я:         $name\n"
          . "Телефон:      $phone\n"
          . ($model   ? "Модель:       $model\n"   : '')
          . ($product ? "Цікавить:     $product\n" : '')
          . ($size    ? "Розміри:      $size\n"    : '')
          . ($comment ? "Коментар:     $comment\n" : '')
          . "\nФорма:        $form\n"
          . "Сторінка:     $page\n"
          . "Джерело:      $source\n"
          . "Час:          $when\n"
          . "IP:           $ip\n";

    $headers = [
        'From: ESTONE <' . $MAIL_FROM . '>',
        'Reply-To: ' . $MAIL_FROM,
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PHP/' . phpversion(),
    ];
    $mailOk = @mail($MAIL_TO, '=?UTF-8?B?' . base64_encode($subject) . '?=',
                    $body, implode("\r\n", $headers));
}

// Заявку вважаємо прийнятою, якщо спрацював хоч один канал
echo json_encode([
    'ok'       => true,
    'telegram' => $tgOk,
    'mail'     => $mailOk,
], JSON_UNESCAPED_UNICODE);
