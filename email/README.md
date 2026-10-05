# Листи-розсилки ESTONE (стиль scroll-landing)

У папці два листи на спільних блоках `src/parts.mjs`:

| Лист | Готовий файл | Де тексти |
|---|---|---|
| **Для дизайнерів та архітекторів, UA, під eSputnik** | `dist/esputnik-dyzainery-uk.html` | `src/esputnik-partners.mjs` → об'єкти `T` (тексти, ціни) і `LINK` (посилання) |
| Розсилка evostone.es, ES/EN/RU | `dist/es.html`, `en.html`, `ru.html` | `src/content/<мова>.mjs` |

## Лист для eSputnik
1. `node email/build.mjs`
2. eSputnik → Повідомлення → Email → новий → **Імпорт HTML** (або «Код»), вставити вміст `dist/esputnik-dyzainery-uk.html`.
3. Тема листа: рядок `subject` у `T`; прехедер уже зашитий у HTML.
4. Посилання `https://esputnik.com/unsubscribe` і `https://esputnik.com/viewInBrowser` eSputnik сам підміняє
   на персональні. Не міняйте їх.
5. Картинки й шрифти беруться прямо з публічного репозиторію GitHub (`raw.githubusercontent.com/igormarmonja/Estone/<коміт>/email/`),
   адреса прив'язана до коміту й не зміниться. Нові фото: закомітити в `email/img/`, запушити,
   підставити новий хеш коміту в `ASSETS_REF` у `src/esputnik-partners.mjs` і перезібрати.
   Якщо репозиторій стане приватним, картинки зникнуть: тоді треба перенести їх у бібліотеку зображень eSputnik або на estone.com.ua.

Розділи: шапка → hero (dark) → «Чому пишемо саме зараз» + 3 причини (paper) → фото колекції + кнопка каталогу (dark) →
авторські розробки, 4 щілинні раковини (paper) → вироби з блоку мармуру (sand) → спеціальні пропозиції, −20% на пісочні декори (dark) →
портфоліо, 3 фото (paper) → подарунок: каталог PDF (brand) → підпис Ігоря (paper) → футер (dark).
Жодного `position:absolute`: фото стоять звичайними `<img>`, текст іде під ними.

Шрифт — український **Fixel** (MacPaw, ліцензія OFL, `fonts/OFL.txt`). Він працює в Apple Mail, iOS, Samsung Mail і Thunderbird;
Gmail та Outlook веб-шрифтів не підтримують і показують Helvetica / Arial.

**Заглушки під фото** (поки показують «ФОТО»): `img/p-why.jpg` (520×300, блок «Чому зараз»),
`img/p-slot-1.jpg` … `p-slot-4.jpg` (252×290, авторські раковини). Фото краще готувати вдвічі більшими
(1040×600 і 504×580). Покласти з тим самим іменем, закомітити, запушити й оновити `ASSETS_REF`.
Назви й ціни моделей 3–4 — у `T.slot.items`.

---

## Розсилка evostone.es (ES/EN/RU)

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
