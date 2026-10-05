<?php
/* ─────────────────────────────────────────────────────────────
   ESTONE — міст між ботом і вами.

   Навіщо: у контактах на сайті стоїть посилання на бота
   @keramika_estone_bot. Якщо нічого не налаштувати, клієнт напише
   боту — і повідомлення нікуди не дійде, бо бот сам по собі
   нічого не робить.

   Цей файл приймає повідомлення від бота і пересилає їх вам,
   а клієнту відповідає, що ви на звʼязку.

   ЯК УВІМКНУТИ (один раз):
     1. Залийте tg.php і send.config.php у корінь сайту
     2. У send.config.php має бути заповнений $TELEGRAM_CHAT
     3. Відкрийте в браузері:  estone.com.ua/tg.php?setup=1
        Має зʼявитись «Готово».
   Все. Далі повідомлення від клієнтів приходять вам у Telegram.

   ВИМКНУТИ: estone.com.ua/tg.php?setup=0
   ───────────────────────────────────────────────────────────── */

$TELEGRAM_TOKEN = '';
$TELEGRAM_CHAT  = '';
if (is_readable(__DIR__ . '/send.config.php')) { require __DIR__ . '/send.config.php'; }

if (!$TELEGRAM_TOKEN) { http_response_code(500); exit('Немає токена: заповніть send.config.php'); }

$API    = "https://api.telegram.org/bot{$TELEGRAM_TOKEN}/";
$SECRET = substr(hash('sha256', $TELEGRAM_TOKEN . '|estone'), 0, 32);
$HOST   = $_SERVER['HTTP_HOST'] ?? 'estone.com.ua';
$SELF   = 'https://' . $HOST . ($_SERVER['SCRIPT_NAME'] ?? '/tg.php');

function api($method, $params) {
    global $API;
    $body = http_build_query($params);
    if (function_exists('curl_init')) {
        $ch = curl_init($API . $method);
        curl_setopt_array($ch, [
            CURLOPT_POST => true, CURLOPT_POSTFIELDS => $body,
            CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 10,
        ]);
        $res = curl_exec($ch); curl_close($ch);
        return json_decode((string)$res, true);
    }
    $ctx = stream_context_create(['http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => $body, 'timeout' => 10,
    ]]);
    return json_decode((string)@file_get_contents($API . $method, false, $ctx), true);
}

/* ── Увімкнення та вимкнення ─────────────────────────────── */
if (isset($_GET['setup'])) {
    header('Content-Type: text/plain; charset=utf-8');
    if ($_GET['setup'] === '0') {
        $r = api('deleteWebhook', []);
        exit(!empty($r['ok']) ? "Вимкнено. Бот більше не пересилає повідомлення.\n"
                              : "Не вдалося вимкнути.\n");
    }
    if (!$TELEGRAM_CHAT) {
        exit("Спершу заповніть \$TELEGRAM_CHAT у send.config.php.\n"
           . "Своє число можна взяти тут: https://{$HOST}/send.php?chatid=1\n");
    }
    $r = api('setWebhook', [
        'url' => $SELF,
        'secret_token' => $SECRET,
        'allowed_updates' => json_encode(['message']),
    ]);
    if (!empty($r['ok'])) {
        api('sendMessage', [
            'chat_id' => $TELEGRAM_CHAT,
            'text' => "✅ Готово. Тепер повідомлення клієнтів боту приходять сюди.",
        ]);
        exit("Готово. Перевірте Telegram — має прийти підтвердження.\n");
    }
    exit("Не вдалося увімкнути: " . ($r['description'] ?? 'невідома помилка') . "\n");
}

/* ── Приймаємо повідомлення від Telegram ─────────────────── */
$given = $_SERVER['HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN'] ?? '';
if (!hash_equals($SECRET, $given)) { http_response_code(403); exit; }

$update = json_decode(file_get_contents('php://input', false, null, 0, 65536), true);
$msg = $update['message'] ?? null;
if (!$msg || !$TELEGRAM_CHAT) { http_response_code(200); exit('ok'); }

$chat = $msg['chat'] ?? [];
$from = $msg['from'] ?? [];
$id   = $chat['id'] ?? 0;

/* Своє ж повідомлення назад не пересилаємо */
if ((string)$id === (string)$TELEGRAM_CHAT) { http_response_code(200); exit('ok'); }

$who   = trim(($from['first_name'] ?? '') . ' ' . ($from['last_name'] ?? ''));
$login = !empty($from['username']) ? '@' . $from['username'] : '';
$text  = $msg['text'] ?? ($msg['caption'] ?? '');
$kind  = isset($msg['photo']) ? ' 📷 (надіслав фото)'
       : (isset($msg['document']) ? ' 📎 (надіслав файл)' : '');

$e = fn($v) => htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
$lines = [
    '💬 <b>Повідомлення боту</b>',
    '',
    '👤 <b>' . $e($who ?: 'Без імені') . '</b> ' . $e($login) . $kind,
];
if (!empty($from['username'])) {
    $lines[] = '↩️ Відповісти: https://t.me/' . $from['username'];
} else {
    $lines[] = '↩️ Логіна немає — попросіть телефон у відповіді';
}
if ($text !== '') { $lines[] = ''; $lines[] = $e($text); }

api('sendMessage', [
    'chat_id' => $TELEGRAM_CHAT,
    'text' => implode("\n", $lines),
    'parse_mode' => 'HTML',
    'disable_web_page_preview' => true,
]);

/* Клієнту — коротка відповідь, щоб не писав у тишу */
$reply = ($text === '/start')
    ? "Вітаємо! Це ESTONE — виробництво виробів з каменю.\n\n"
      . "Напишіть, що потрібно прорахувати, і додайте розміри або фото — відповімо протягом години в робочий час.\n\n"
      . "Телефон: +380 68 864 71 07"
    : "Дякуємо, отримали. Відповімо протягом години в робочий час.\n"
      . "Якщо терміново — телефон +380 68 864 71 07";
api('sendMessage', ['chat_id' => $id, 'text' => $reply]);

http_response_code(200);
echo 'ok';
