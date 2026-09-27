# Лист-розсилка ESTONE (стиль scroll-landing)

HTML-шаблон email-розсилки в стилі лендингу evostone.es (шаблон `scroll-landing`, гілка з `evostone-es/`):
ті самі шрифти (Jost / Manrope / IBM Plex Mono), палітра, мітки `01 —— РОЗДІЛ`, двоколірні заголовки
й зміна фону розділів: dark → paper → sand → paper → dark → sand → brand → paper → dark.

| Мова | Готовий файл | Тексти |
|---|---|---|
| Español | `dist/es.html` | `src/content/es.mjs` |
| English | `dist/en.html` | `src/content/en.mjs` |
| Русский | `dist/ru.html` | `src/content/ru.mjs` |

## Розділи листа
1. Hero на фото: лого, № випуску, мітка, H1 у 2 рядки + «хвіст» моношрифтом, кнопка + WhatsApp, рядок довіри.
2. Маніфест: звертання на ім'я, великий текст, 3 цифри.
3. Колекція раковин 2×2 (фото, код серії, назва, опис, «Ver modelos →»).
4. Продукти: рядки з ціною «від» і стрілкою.
5. Матеріали (темний блок): «marquee» контурним шрифтом + 4 картки, кнопка WhatsApp.
6. Процес: 4 кроки.
7. Акцентний блок у фірмовому кольорі (зараз «Ven a ver las placas»).
8. Контакт: великий заголовок, WhatsApp / телефон / email / цех.
9. Футер з гігантським словом ESTONE, мовами, відпискою.

На телефоні (<620px) колонки стають у стовпчик, заголовки зменшуються.

## Як зробити новий випуск
1. `src/data.mjs` → `CAMPAIGN` (номер, дата, `id` для UTM).
2. `src/content/<мова>.mjs` → `subject`, `preheader`, `hero`, `visit` (і що ще треба).
3. `node email/build.mjs` → `dist/*.html`. Руками `dist/` не правимо.
4. HTML з `dist/` вставити в сервіс розсилки як «власний HTML». Тему листа взяти з `subject`.

## Картинки
Пошта не бачить відносних шляхів. Вміст `email/img/` треба викласти на сайт
(за замовчуванням очікується `https://evostone.es/email/img/`) або завантажити в сервіс розсилки
і прописати адресу в `IMG_BASE` (`src/data.mjs` або змінна оточення).

`node email/make-images.mjs` заново робить `img/` з фото сайту `assets/img/` (hero з затемненням, обрізані фото серій,
PNG-лого та іконки WhatsApp, бо Gmail не показує SVG). Потрібен Playwright з Chromium.

Перегляд локально: `IMG_BASE=../img/ node email/build.mjs`, відкрити `email/dist/es.html`
(перед комітом зібрати знову без `IMG_BASE`).

## Мерж-теги
`src/data.mjs` → `MERGE`. Зараз синтаксис Brevo (`{{ contact.FIRSTNAME }}`, `{{ unsubscribe }}`, `{{ mirror }}`).
Для Mailchimp: `*|FNAME|*`, `*|UNSUB|*`, `*|ARCHIVE|*`. Якщо ім'я може бути порожнім, використайте
значення за замовчуванням вашого сервісу (у Brevo: `{{ contact.FIRSTNAME | default : "…" }}`).

## Обмеження поштових клієнтів
- Веб-шрифти працюють в Apple Mail / iOS; Gmail і Outlook показують запасні (Futura / Helvetica / Arial).
- Контурний шрифт у «marquee» (`-webkit-text-stroke`) там, де не підтримується, стає тихим тоновим текстом.
- Outlook для Windows: фон hero через VML, кнопки без заокруглень.
- Лист ~50 KB, тобто нижче порогу 102 KB, після якого Gmail обрізає.

## Перед першою розсилкою (TODO)
- [ ] Викласти `email/img/` за адресою з `IMG_BASE`.
- [ ] Мерж-теги під конкретний сервіс розсилки.
- [ ] Поштова скринька на evostone.es (`SITE.email`).
- [ ] Ціни «від» (`PRICES`) орієнтовні, їх треба звірити з лендингом.
- [ ] Вичитка ES та EN носієм мови.
- [ ] Тест у Litmus / Email on Acid або хоча б у Gmail, Apple Mail, Outlook.
