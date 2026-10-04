# evostone.es — лендинг ESTONE для Іспанії

Статичний сайт без фреймворків. Уся папка `evostone-es/` — це корінь домену evostone.es.

| Мова | URL | Файл текстів |
|---|---|---|
| Español (основна) | `/` | `src/content/es.mjs` |
| English | `/en/` | `src/content/en.mjs` |
| Русский | `/ru/` | `src/content/ru.mjs` |

Структура й логіка розділів описані в `../docs/ES_LANDING_estructura_v1.md`.

## Як редагувати

1. Тексти: `src/content/<мова>.mjs`.
2. Контакти, ціни «від», список продуктів і фото: `src/data.mjs`.
3. Розмітка всіх розділів: `src/template.mjs` (один шаблон на всі мови).
4. Перезібрати сторінки:
   ```
   node build.mjs
   ```
   Команда перезаписує `index.html`, `en/index.html`, `ru/index.html`, `sitemap.xml`, `robots.txt`. Руками ці файли не правимо.

Без перезбирання: `assets/js/config.js` (куди відправляти заявки, аналітика), `assets/css/style.css`, `assets/js/main.js`, `assets/js/lead.js`.

**Бренд.** В Іспанії компанія називається **Stone Evolution**, скорочено **Evostone**. Обидві назви задані в `src/data.mjs`: `SITE.brand` для логотипа й заголовків, `SITE.legalName` для копірайту й даних schema.org.

**Заявки.** Кнопки з атрибутом `data-lead` (у шапці, на першому екрані, «Pedir presupuesto» у картках, у галереї) відкривають попап із формою. Значення атрибута, наприклад `data-lead="kitchen"`, одразу відмічає продукт. Розмітка попапу — `src/lead-modal.mjs`, логіка попапу й відправки всіх форм — `assets/js/lead.js`, стилі — блок «Попап заявки» в кінці `style.css`. Без JS кнопки ведуть до форми внизу сторінки. Посилання з `#solicitud` у кінці адреси відкриває попап одразу (зручно для реклами). Заявки з попапу мають поле `source: popup`.

Переглянути локально: `python3 -m http.server` у цій папці, потім http://localhost:8000.

## Посадкові сторінки під пошукові запити (ES)

20 сторінок у `/<slug>/`, наприклад `/encimeras-de-cuarzo/` чи `/corte-por-chorro-de-agua/`. Список запитів і логіку описано в `../docs/ES_LANDINGS_20_zapyty.md`.

- Тексти: `src/landings/es.mjs`. Одна сторінка = один об'єкт з полями slug, title, description, h1, intro, benefits, specs, faq, related.
- Шаблон: `src/landing-template.mjs`. Стилі: `assets/css/landing.css`. Скрипт: `assets/js/landing.js`. Головна сторінка цих файлів не використовує.
- Фото: `lp-<slug>.jpg` (перший екран) і `lp-<slug>-1..3.jpg` (галерея). Сторінки про раковини вже мають фото колекції.
- Нова сторінка = новий об'єкт у `pages`, потім `node build.mjs`. Вона автоматично потрапляє в sitemap і в перелік у футері посадкових.
- Головна поки не посилається на посадкові. Коли клієнт погодить, варто додати блок посилань у її футер.

## Фото

Поки фото немає, на його місці показується заглушка з іменем потрібного файлу. Щойно файл з цим іменем з'явиться в `assets/img/`, заглушка зникне сама. Код міняти не потрібно.

| Файл | Де | Рекомендований розмір |
|---|---|---|
| `hero.jpg` | головний екран (поки стоїть `cover.jpg` з UA-сайту) | 2400×1500, до 350 KB |
| `p-kitchen.jpg`, `p-kitchen-2.jpg`, `p-kitchen-3.jpg` | Encimeras de cocina | 1200×1200 |
| `p-cladding*.jpg` | Revestimiento gran formato | 1200×1200 |
| `p-stairs*.jpg` | Escaleras | 1200×1200 |
| `p-furniture*.jpg` | Mobiliario | 1200×1200 |
| `p-sculpture*.jpg` | Esculturas | 1200×1200 |
| `p-cutting*.jpg` | Corte a medida | 1200×1200 |
| `p-waterjet*.jpg` | Waterjet | 1200×1200 |
| `m-quartz.jpg`, `m-porcelain.jpg`, `m-natural.jpg`, `m-solid.jpg` | зразки матеріалів (крупна фактура) | 900×1200 |
| `s-measure.jpg`, `s-design.jpg`, `s-workshop.jpg`, `s-install.jpg` | кроки процесу | 1400×1100 |
| `w-01.jpg` … `w-06.jpg` | Proyectos (`w-01` — велике) | 1600×1200 |

Фото раковин (`le-*`, `mo-*`, `ka-*`, `sa-*`) і розділу «Ванна» вже взяті з українського сайту.

### Що вже стоїть (жовтень 2026)
Реальні фото з Drive-папки клієнта розставлено по головній і 18 посадкових. Яке фото з якого файлу взято, записано в `../docs/ES_FOTO_source_ids.json` (id відповідають manifest після інвентаризації).
Ще порожні (потрібна генерація або фото): `s-measure`, `s-design`, `p-waterjet*`, `lp-corte-por-chorro-de-agua*`, `lp-fachadas-ventiladas*`.

## Анімація

- **Lenis**: плавний скрол.
- **GSAP + ScrollTrigger**: колір фону змінюється між розділами (`data-bg` у секції: `paper`, `sand`, `dark`, `brand`), заголовки виїжджають з маски, слова маніфесту проявляються, продукти гортаються горизонтально (на десктопі), біжить рядок матеріалів, фото проєктів розкриваються.
- Прелоадер показується лише при першому візиті в сесії.
- На телефоні замість горизонтального скролу — свайп-карусель, кастомного курсора немає.
- Якщо в системі ввімкнено «зменшити рух», анімації вимикаються.

## Перед запуском (TODO)

- [ ] Ціни «від» у `src/data.mjs` → `PRICES`. Зараз вони **орієнтовні, їх треба перевірити**.
- [ ] Гідроабразив: розмір столу, товщина, матеріали → тексти `products.items.waterjet` і `pros`.
- [ ] Юридичні сторінки (Aviso legal / Privacidad / Cookies) і дані компанії у футері.
- [ ] Поштова скринька на evostone.es (`SITE.email`), точні координати цеху (`SITE.geo`).
- [ ] `formEndpoint` у `assets/js/config.js`, щоб заявки кудись надходили.
- [ ] Банер згоди на cookies, якщо підключаємо GA4 чи Meta Pixel.
- [ ] Вичитка ES та EN носієм мови.
- [ ] Наступні мови: uk, pl, ca, valencià. Треба створити `src/content/<code>.mjs`, додати рядок у `LANGS` у `src/data.mjs` і для pl дописати шрифтові діапазони (latin-ext уже є).
