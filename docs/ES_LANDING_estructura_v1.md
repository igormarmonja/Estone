# ESTONE España — структура лендингу
**Версія 1 · тільки структура, контент-каркас і план анімації. Верстку робимо після погодження.**

Основа: асортимент і тексти estone.com.ua (`index.html`, `assets/js/products.js`, `docs/ESTONE_COM_UA_struktura_v1.md`), фірмова палітра й шрифти звідти ж. Референс по подачі — niacreative.co: великі заголовки, багато повітря, м'які переходи кольору фону між розділами, фото, що «розкриваються» при скролі.

---

## 1. Позиціонування для Іспанії

**Головний козир — місце.** Виробництво стоїть у L'Estació de Novelda (Alicante). Новельда — мармурова столиця Іспанії. Для іспанського клієнта це одразу означає компетентність, тож ставимо це в hero і в title.

**Кому продаємо (у порядку пріоритету):**

| Аудиторія | Що їй треба | Що її закриває на лендингу |
|---|---|---|
| Приватний власник на Costa Blanca: іспанці та експати (UK, NL, скандинави, UA) | кухня або ванна «під ключ», зрозумілий термін, спілкування своєю мовою | Hero, Productos, Proceso, форма з WhatsApp |
| Interioristas / arquitectos | нестандартні форми, матеріали, технічні вузли | Colección de lavabos, Materiales, Proyectos |
| Кухонні студії, promotoras, інші мармурові майстерні | субпідряд: порізка, waterjet, ЧПУ, стабільні терміни | блок Profesionales |

**Головне повідомлення (ES):** *Piedra a medida, del taller a tu casa.* Замір, виробництво й монтаж робимо самі, від першого дзвінка до встановлення відповідає одна компанія.

**Конверсія:** одна головна дія, «Pedir presupuesto». Друга — WhatsApp: в Іспанії це основний канал, тому він має важити не менше за форму.

---

## 2. Принцип «не перевантажити»

Асортимент великий (8 напрямів), а лендинг має читатися за 60–90 секунд. Правила:

1. **Кожен продукт на першому рівні — це 1 фото, 1 назва, 1 речення і 3 теги.** Жодних списків характеристик.
2. **Деталі ховаємо в панель (drawer), що виїжджає збоку.** Клік «Ver más» відкриває панель із 3–4 фото, варіантами матеріалу та кнопкою «Presupuesto para esto». Форма вже знатиме, про який продукт ідеться. Сторінка при цьому не росте.
3. **Один розділ = одна думка.** 10 розділів + футер, не більше.
4. **Ритм:** світлий → світлий → темний → світлий… Контрастні «дихальні» смуги між групами розділів, як у референсі.

---

## 3. Структура сторінки (згори донизу)

Мова — ES. Заголовки нижче є чернеткою іспанського копірайту; фінальні тексти вичитає носій мови.

### 00 · Прелоадер (≈1,2 с, тільки при першому візиті)
Знак ESTONE малюється лінією, під ним лічильник 0→100 моноширинним шрифтом. Потім шторка їде вгору і відкриває hero. Для повторних візитів (sessionStorage) і `prefers-reduced-motion` вимикаємо.

### 01 · Hero — `#inicio`
- Фото або 6–8-секундне відео на весь екран: розпил мармурового блоку, вода від waterjet, готова кухня.
- **H1:** `Piedra a medida` / другий рядок: `desde Novelda, la capital del mármol`
- Підзаголовок: *Encimeras, lavabos, revestimientos y piezas únicas. Medimos, fabricamos e instalamos en toda la Costa Blanca.*
- CTA: `Pedir presupuesto` (основна) · `WhatsApp` (іконка + номер)
- Знизу рядок довіри моношрифтом: `14 años · Taller propio en Novelda · Instalación propia · ES / EN / UA`
- Анімація: рядки H1 виїжджають знизу з маски, фото при скролі злегка зумиться (scale 1.1→1) і йде з паралаксом.

### 02 · Manifiesto — `#estudio`
Один великий абзац на весь екран. Слова «проявляються» з сірого в темний у міру скролу (scrub).
> *Cada pieza empieza con una medición exacta y termina instalada por las mismas manos que la cortaron. Sin intermediarios, sin juntas innecesarias, con un plazo que te damos antes de empezar.*

Під ним 3 цифри з анімованим лічильником: `14 años` · `4 materiales` · `1 responsable, de la medición al montaje`. Цифри про об'єкти й м² додамо тільки реальні, від клієнта.

### 03 · Productos — `#productos` ⭐ головний розділ
**Подача:** горизонтальна галерея, закріплена на екрані (pin + горизонтальний скрол), 8 панелей. Кожна панель — фото на ~60 % висоти, номер `01/08`, назва, одне речення, теги матеріалів, `Ver más →` (відкриває drawer). На мобільному замість цього свайп-карусель зі snap.

| # | Панель (ES) | Одне речення | Теги | Що в drawer |
|---|---|---|---|---|
| 01 | **Encimeras de cocina** | Encimeras a medida con fregadero integrado, isla y frontal a juego. | Cuarzo · Porcelánico · Mármol · Solid surface | товщини, кромки, врізні/інтегровані мийки, фартух |
| 02 | **Baño: encimeras y lavabos** | Lavabos de piedra sin juntas, de serie o diseñados para tu espacio. | 4 colecciones propias | посилання на розділ 04 |
| 03 | **Revestimiento gran formato** | Paredes, suelos y fachadas con placas de hasta 3,2 × 1,6 m, casi sin juntas. | Porcelánico · Sinterizado · Mármol | стіни, душові зони, фасади, підлога |
| 04 | **Escaleras** | Peldaños, zanquines y escaleras volantes cortadas a la medida exacta. | Mármol · Granito · Porcelánico | прямі, гвинтові, консольні сходи, підсвітка |
| 05 | **Mobiliario de piedra** | Mesas, islas, consolas y bancos. La piedra como mueble, no como superficie. | Mármol · Travertino · Porcelánico | столи, журнальні столики, лавки, полиці |
| 06 | **Esculturas y piezas únicas** | Esculturas, chimeneas y objetos tallados por CNC y a mano. | CNC 5 ejes · Talla | скульптури, портали камінів, декор, шильди/логотипи |
| 07 | **Corte a medida** | Cortamos, cantamos y pulimos tu material o el nuestro. | Puente de corte · CNC | для приватних клієнтів і майстерень |
| 08 | **Corte por chorro de agua** | Waterjet para formas imposibles: marquetería, logotipos, rosetones. | Waterjet · Cualquier material | інкрустація, фігурний розкрій, товщини/розміри столу |

Підвіконня (`alféizares`) і стільниці для HoReCa не виносимо окремими панелями — згадуємо в drawer 01/03 і в FAQ. Так тримаємо 8 панелей.

### 04 · Colección de lavabos — `#coleccion`
Фірмова річ, якої немає в конкурентів. Чотири серії названі на честь художників: для Іспанії це природний хук (Salvador — Далі).
- Ліворуч 4 великі назви-таби: **Leonardo · Monet · Kazimir · Salvador** (при наведенні назва стає товстішою, праворуч плавно змінюється фото).
- Праворуч фото і опис серії в одне речення + лічильник моделей (`6 modelos`).
- Клік по серії відкриває drawer з моделями (дані вже є в `products.js`: код, фото, опис, матеріали; перекласти на ES/EN).

| Серія | Одне речення (ES) |
|---|---|
| Leonardo | Piedra natural, vidrio y cuarzo combinados en piezas de autor. |
| Monet | Solid surface sin juntas: la encimera fluye hacia el lavabo. |
| Kazimir | Geometría pura con desagüe oculto de ranura. |
| Salvador | Formas orgánicas diseñadas para la estancia, no para el catálogo. |

### 05 · Materiales — `#materiales`
Темна смуга (фон `--dark`). Над нею бігучий рядок з назвами матеріалів великим шрифтом (marquee, швидкість залежить від скролу).
4 картки-«зразки»: при наведенні фото фактури збільшується, з'являються 3 властивості.

| Матеріал | Коротко |
|---|---|
| **Cuarzo** | No absorbe, resiste manchas y arañazos. El estándar para cocina. |
| **Porcelánico / sinterizado** | Aguanta calor, sol y exterior. Placas XXL para revestimientos. |
| **Mármol y piedra natural** | Cada placa es única. Seleccionada en Novelda. |
| **Solid surface (acrílico)** | Sin juntas visibles, formas curvas, reparable. |

Під картками одне посилання: `¿Cuál elegir? Te lo explicamos en 5 minutos por WhatsApp`.
Бренди плит (Dekton, Neolith, Silestone тощо) згадуємо тільки якщо реально з ними працюємо, і без логотипів до погодження прав.

### 06 · Proceso — `#proceso`
Ліворуч закріплене фото, яке змінюється разом з кроком; праворуч 4 кроки скроляться. Лінія прогресу заповнюється.
1. **Medición** — medimos in situ, con plantilla o láser.
2. **Diseño** — plano técnico y elección de placa contigo (puedes venir al taller a elegirla).
3. **Fabricación** — corte, CNC y pulido en nuestro taller de Novelda.
4. **Instalación** — nuestro equipo monta, sella y deja limpio.

Внизу: `Plazo habitual: X semanas` — цифру дає клієнт.

### 07 · Proyectos — `#proyectos`
Сітка 5–7 робіт різного розміру (bento). Фото «розкриваються» через clip-path при появі. Курсор над фото перетворюється на коло з написом `Ver`. Клік відкриває лайтбокс із 3–5 кадрами та підписом: `Cocina · Cuarzo · Jávea`.
> Потрібні реальні іспанські об'єкти. Поки їх немає, беремо роботи з UA-сайту з нейтральним підписом без міста.

### 08 · Profesionales — `#profesionales`
Контрастний блок (фон `--brand`). Для студій, дизайнерів, promotoras і майстерень.
- H2: `Tu taller en Novelda`
- 4 рядки-переваги: `Corte y waterjet para terceros` · `Planos DWG / DXF, fabricamos a plano` · `Muestras y visitas al taller` · `Tarifa profesional y plazos fijos`
- CTA: `Hablar con el taller` (веде до форми з уже вибраною темою «Profesional»).

### 09 · FAQ — `#faq`
5–6 питань-акордеонів, розмітка `FAQPage`. Питання беремо з реальних запитів:
1. ¿Cuánto cuesta una encimera de cuarzo a medida? (діапазон + від чого залежить)
2. ¿Trabajáis en toda la provincia de Alicante? (зона: Alicante, Elche, Benidorm, Torrevieja, Jávea, Murcia, Valencia)
3. ¿Cuánto se tarda desde la medición hasta la instalación?
4. ¿Puedo ir al taller a elegir la placa?
5. ¿Cortáis material que traiga yo? (так, порізка/waterjet)
6. Do you speak English? / Розмовляєте українською?

### 10 · Contacto — `#contacto`
Великий фінальний заголовок `Hablemos de tu proyecto`, що «збирається» з літер при появі.
- **Форма (мінімум полів):** Nombre · Teléfono / WhatsApp · Qué necesitas (чипи: Cocina, Baño, Revestimiento, Escalera, Mueble, Escultura, Corte / Waterjet, Otro) · Medidas aproximadas (необов'язково) · Foto o plano (завантаження) · чекбокс RGPD.
- Праворуч: WhatsApp, телефон `+34 652 69 20 97`, email, адреса з мапою, години роботи, `Visitas al taller con cita`.
- Прихований `lang` і `producto` (з drawer), UTM — як у UA-конфігу (`config.js`).

### 11 · Footer
Лого, короткий перелік розділів, мови `ES · EN · UA`, соцмережі, **Aviso legal · Política de privacidad · Política de cookies** (обов'язкові за LSSI і RGPD), NIF/CIF компанії, посилання на estone.com.ua.

**Навігація:** шапка-«пігулка», як на UA-сайті, ховається при скролі вниз і з'являється при скролі вгору. Пункти: `Productos · Colección · Materiales · Proyectos · Profesionales · Contacto` + кнопка `Presupuesto`. На мобільному — повноекранне меню, пункти виїжджають по одному.

---

## 4. Анімація й переходи між розділами

Стек: **GSAP + ScrollTrigger** (вже лежать у `assets/vendor`) + **Lenis** для плавного скролу (≈3 KB). Без фреймворків, чистий HTML/CSS/JS, як UA-сайт.

| Прийом | Де | Як |
|---|---|---|
| Зміна кольору фону між розділами | вся сторінка | кожен `section` має `data-bg`; ScrollTrigger плавно міняє `--page-bg` у body (paper → sand → dark → paper). Головний прийом «перетікання» розділів, як у референсі |
| Рядки заголовків з маски | всі H1/H2 | рядок у `overflow:hidden`, текст їде з `yPercent:100`, stagger 0.08 |
| Слова, що проявляються | Manifiesto | scrub opacity .15→1 по словах |
| Clip-path reveal фото | Productos, Proyectos | `inset(100% 0 0 0)` → `inset(0)` + scale 1.15→1 |
| Горизонтальний pin | Productos | pin секції, `x` треку = scroll. На <900px вимикається |
| Sticky-кроки | Proceso | pin фото, crossfade між кадрами |
| Marquee | Materiales | безкінечний рядок, швидкість і напрям залежать від velocity Lenis |
| Кастомний курсор | десктоп | крапка; над фото стає колом `Ver`, над кнопками — магнітний ефект |
| Drawer | Productos, Colección | панель праворуч, фон затемнюється, Lenis ставиться на паузу |
| Лічильники | Manifiesto | 0 → значення при появі |

**Обмеження:**
- `prefers-reduced-motion` → усі scrub/pin вимикаються, лишаються прості fade.
- Мобільний: без курсора й горизонтального pin, анімації легші.
- Бюджет: LCP < 2,5 с на 4G, JS < 120 KB, фото AVIF/WebP із `srcset`, відео hero < 2,5 MB з постером.

---

## 5. Візуальна система (кольори бренду, не референсу)

Беремо токени з `assets/css/style.css`:

| Токен | Колір | Роль на ES-лендингу |
|---|---|---|
| `--paper` | #F5EDE3 | основний фон |
| `--sand` | #E3D5C5 | фон розділів Colección, FAQ |
| `--card` | #FFFBF5 | картки, drawer |
| `--stone` | #BCAB99 | лінії, неактивні стани |
| `--brand` | #8A4F2A | акценти, фон Profesionales |
| `--dark` | #594133 | Materiales, футер, текст |

Шрифти ті самі: **Jost** (заголовки), **Manrope** (текст), **IBM Plex Mono** (лейбли й цифри). Для «дорожчого» вигляду, як у референсі, заголовки на ES-лендингу робимо значно більшими (H1 до 140–160 px на десктопі, H2 — 72–96 px) і з більшим повітрям між розділами (160–200 px).

---

## 6. SEO-каркас (замість /marketing:seo-audit)

Скіла `/marketing:seo-audit` у цій сесії немає. Аудит існуючого сайту тут і не підходить, бо іспанського сайту ще немає. Тому нижче SEO-закладка під запуск.

**Title:** `Encimeras y piedra a medida en Alicante | Taller en Novelda · ESTONE`
**Description:** `Encimeras de cocina y baño, lavabos, revestimiento gran formato, escaleras y corte waterjet. Taller propio en Novelda: medimos, fabricamos e instalamos en la Costa Blanca.`
**H1:** `Piedra a medida` (другий рядок з Novelda). Для SEO H1 має містити ключ, тож повний текст H1 — `Piedra a medida desde Novelda`, візуально розбитий на два рядки.

**Семантичне ядро (гіпотези, частотність перевірити в Google Keyword Planner / Ahrefs):**

| Кластер | Ключі | Розділ |
|---|---|---|
| Кухня | encimeras de cuarzo Alicante · encimeras de cocina a medida · encimera porcelánica · encimera de mármol | 03-01, FAQ 1 |
| Ванна | lavabo de piedra a medida · encimera de baño con lavabo integrado · lavabo solid surface | 03-02, 04 |
| Облицювання | revestimiento porcelánico gran formato · paredes de mármol | 03-03 |
| Сходи | escaleras de mármol a medida · peldaños de granito | 03-04 |
| Послуги | corte por chorro de agua Alicante · corte waterjet piedra · corte de mármol a medida | 03-07/08, 08 |
| Локальні | marmolería Novelda · marmolería Alicante / Elche / Torrevieja | Hero, Footer |
| EN (експати) | kitchen worktops Costa Blanca · quartz worktops Alicante | EN-версія |

Один лендинг не займе топ по всіх кластерах. Він закриває бренд + «marmolería / encimeras Alicante». Для решти — етап 2 (нижче).

**Технічне:**
- `hreflang` es-ES / en / uk, `lang="es"`.
- Schema.org: `LocalBusiness` (адреса Novelda, geo, години, телефон), `FAQPage`, `Product` для серій раковин.
- Google Business Profile на адресу в Novelda — для локального пошуку це важливіше за сам сайт.
- Контент drawer'ів має бути в HTML (не підвантажуватися через JS), щоб його індексували.
- `alt` фото іспанською з матеріалом і типом виробу.

---

## 7. Етап 2 (після лендингу)

Коли лендинг запрацює, кожна панель Productos стає окремою сторінкою: `/encimeras-cocina/`, `/lavabos/`, `/revestimiento-gran-formato/`, `/escaleras/`, `/mobiliario/`, `/esculturas/`, `/corte-waterjet/`, плюс `/en/`. Кнопки `Ver más` тоді ведуть на ці сторінки, а не в drawer. Структуру лендингу під це міняти не доведеться.

---

## 8. Питання до клієнта перед версткою

1. **Домен і бренд:** `evostone.es` (так записано в UA-структурі) чи новий домен під ESTONE? Від цього залежить лого й title.
2. **Мови:** ES + EN на старті? Чи потрібна UA/RU для діаспори на Costa Blanca?
3. **Фото:** є іспанські об'єкти, цех у Novelda, waterjet у роботі? Без них розділи 07 і 03-08 слабкі.
4. **Waterjet і CNC:** розмір столу, макс. товщина, які матеріали. Потрібно для 03-08 і блоку Profesionales.
5. **Скульптури й меблі:** є готові роботи чи це поки напрям?
6. **Ціни:** показуємо «desde X €/m» чи тільки «presupuesto en 24 h»?
7. **Юридичні дані:** назва компанії в Іспанії, NIF/CIF — для футера й Aviso legal.
8. **Термін** від заміру до монтажу, реальні цифри для блоку Manifiesto.
