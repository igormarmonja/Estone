# gridalta.es — лендинг Gridalta Reformas Integrales

Односторінковий сайт у стилі шаблону **scroll-landing** (як evostone.es): плавний скрол, зміна кольору фону між розділами, горизонтальна галерея послуг з бічною панеллю деталей. Фреймворків немає. Уся папка `gridalta/` є коренем домену.

| Мова | URL | Файл текстів |
|---|---|---|
| Español (основна) | `/` | `src/content/es.mjs` |
| English | `/en/` | `src/content/en.mjs` |
| Українська | `/ua/` | `src/content/uk.mjs` |

Тексти взято з попереднього сайту Gridalta (ES), EN і UA перекладено.

## Як редагувати

1. Тексти: `src/content/<мова>.mjs`.
2. Контакти, фото, тарифи калькулятора: `src/data.mjs`.
3. Розмітка розділів: `src/template.mjs` (один шаблон на всі мови).
4. Перезібрати сторінки:
   ```
   node build.mjs
   ```
   Команда перезаписує `index.html`, `en/index.html`, `ua/index.html`, `sitemap.xml` і `robots.txt`. Руками ці файли не правимо.

Без перезбирання можна міняти `assets/js/config.js` (куди надсилати заявки, аналітика), `assets/css/style.css` і `assets/js/main.js`.

Переглянути локально: `python3 -m http.server` у цій папці, потім http://localhost:8000.

## Розділи

Hero → 01 Цитата засновника й цифри → 02 Послуги (6 карток + drawer) → 03 До і після (повзунок) → 04 Калькулятор → 05 Чому Gridalta (порівняння) → 06 Проєкти → 07 Процес (5 кроків) → 08 Засновник → 09 Відгуки → 10 FAQ → 11 Контакт → футер.

## Фото

Фото взято з папки «Преза» на Google Drive. Файли стиснуті до 1600 px. Щоб замінити фото, покладіть файл з тим самим іменем в `assets/img/`.

| Файл | Де | Звідки (Drive) |
|---|---|---|
| `hero.jpg` | головний екран | Gridalta reformas integrales (3) |
| `s-vivienda*.jpg` | Reforma integral | valencia (34), (13), (2) |
| `s-cocina*.jpg` | Cocinas | valencia (15), (17), photo_2026-02-24_16-11-55 |
| `s-bano*.jpg` | Baños | integrales (4), valencia (131), integrales (8) |
| `s-villa*.jpg` | Villas y chalets ⚠ | integrales (1), (5), (2) |
| `s-local*.jpg` | Locales y oficinas ⚠ | integrales (6), valencia (64), (62) |
| `s-alquiler*.jpg` | Para alquilar o vender | valencia (7), (6), (8) |
| `ba-before.jpg`, `ba-after.jpg` | До і після | valencia (22) → (20) |
| `p-1.jpg` … `p-5.jpg` | кроки процесу | valencia (142), (33), (74), (63), (10) |
| `w-01.jpg` … `w-06.jpg` | Проєкти | valencia (1), integrales (7), valencia (12), (136), photo_2026-02-24_16-09-03, valencia (23) |
| `founder.jpg` | фото Сергія, **поки заглушка** | потрібне портретне фото 4:5 |

## Перед запуском (TODO)

- [ ] **Фото Сергія** покласти в `assets/img/founder.jpg`.
- [ ] ⚠ **Тарифи калькулятора** (`CALC` у `src/data.mjs`) орієнтовні. Їх підібрано так, щоб значення за замовчуванням давало 42.000–48.500 €, як на старому сайті. Решту ставок треба звірити з Сергієм.
- [ ] ⚠ Підписи проєктів (міста: Gandía, Dénia, Oliva) і кейс «До і після» перевірити: чи відповідають вони фото.
- [ ] ⚠ Для «Villas y chalets» і «Locales y oficinas» бажано додати фото саме вілл і комерційних об'єктів.
- [ ] `formEndpoint` у `assets/js/config.js`, щоб заявки кудись надходили (зараз форма лише показує подяку).
- [ ] Юридичні сторінки (Aviso legal / Privacidad / Cookies) і реквізити компанії у футері.
- [ ] Банер згоди на cookies, якщо підключаємо GA4 чи Meta Pixel.
- [ ] Вичитка EN носієм мови.
