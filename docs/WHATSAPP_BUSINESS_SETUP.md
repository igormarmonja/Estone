# WhatsApp Business для Іспанії: налаштування «під ключ»

Акаунт створюєш ти зі свого телефону (я не маю доступу до твого номера), але **весь вміст нижче готовий — просто копіюєш**.
Час: ~45 хвилин. Робиться в **WhatsApp Business (безкоштовний додаток)**, не в API.

---

## Крок 1. Номер (5 хв — найважливіше рішення)

- Потрібен **окремий іспанський номер +34** (SIM або eSIM). Не змішуй з особистим WhatsApp: клієнти бачитимуть бізнес-профіль, а ти не втратиш приватні чати.
- Бюджетно: SIM Lebara/Digi/Simyo за ~5–10 €/міс. Номер без дзвінків теж ок, але **лишай увімкненим прийом дзвінків** — іспанці люблять набрати.
- Якщо цей номер уже зареєстрований у звичайному WhatsApp — у Business-додатку обери «Мігрувати» (історія чатів перенесеться), або візьми новий номер.
- Постав додаток на телефон, який завжди з тобою. Додатково підключи **WhatsApp Web / Desktop** (до 4 пристроїв), щоб відповідати з ноутбука й зі швидким перекладом.

## Крок 2. Профіль (10 хв)

| Поле | Що вписати |
|---|---|
| Назва | `EVOSTONE · Encimeras a medida` *(підтверди бренд в Іспанії; якщо інший — заміни скрізь)* |
| Категорія | найближча з доступних: «Mejoras del hogar» / «Muebles». Не обирай «Construcción» — там інша аудиторія |
| Фото профілю | логотип на однотонному фоні (квадрат 640×640) |
| Адреса | адреса цеху в Alicante (+ pin на мапі). Якщо клієнтів у цеху не приймаєш, пиши «Taller y showroom — con cita previa» |
| Години | Пн–Сб 10:00–20:00 (синхронізуй із реальністю) |
| Сайт | `https://evostone.es` |
| Email | робочий |

**Опис (до 512 символів) — вставити:**
```
Fabricamos encimeras a medida en Alicante: cuarzo, sinterizado y piedra para cocinas y baños.
✔ Fabricación propia en nuestro taller
✔ Presupuesto en 24 h por WhatsApp, sin compromiso
✔ Medición e instalación profesionales
✔ 5 años de garantía
Envíanos fotos o medidas y te respondemos hoy.
Dudas en inglés / ucraniano / ruso: también te atendemos.
```
> Прибери рядок, якщо те, що в ньому, не відповідає дійсності (наприклад «Medición e instalación» — залежить від того, що включено в ціну).

## Крок 3. Автоповідомлення (5 хв)

**Привітання** (для нового чату, надсилається один раз):
```
¡Hola! 👋 Gracias por escribir a EVOSTONE. Fabricamos encimeras a medida en Alicante.
Para darte un presupuesto en 24 h, cuéntanos:
1️⃣ ¿Cocina o baño? ¿En qué ciudad?
2️⃣ Medidas aproximadas o una foto/plano (aunque sea de móvil)
3️⃣ ¿Qué material te gusta? (cuarzo, sinterizado, acrílico… te asesoramos)
Te respondemos en cuanto podamos. 😊
```

**Відсутність (поза годинами):**
```
Ahora mismo estamos fuera de horario (Lun–Sáb 10:00–20:00). Hemos recibido tu mensaje y te respondemos mañana a primera hora. Si quieres adelantar, envíanos medidas o fotos de tu encimera. ¡Gracias!
```

**Ярлики (labels):** `Nuevo` · `Presupuesto pedido` · `Presupuesto enviado` · `Seguimiento` · `Medición` · `Cerrado ✅` · `Perdido` · `Partner B2B` · `Expat EN/UA`

## Крок 4. Швидкі відповіді (`/` + слово) — вставити в «Respuestas rápidas»

| Скорочення | Текст |
|---|---|
| `/hola` | ¡Hola, {nombre}! Soy {tu nombre} de EVOSTONE. Fabricamos encimeras a medida en Alicante. ¿Me cuentas qué necesitas? |
| `/datos` | Para tu presupuesto necesito: 1) ¿cocina o baño? 2) ciudad, 3) medidas aproximadas o foto/plano, 4) material y color si ya lo tienes. Con eso te respondo en 24 h. |
| `/foto` | Si puedes, mándame una foto de la cocina completa y otra de las zonas donde irá la encimera, con un metro o folio de referencia. Con eso ya calculo. 📷 |
| `/materiales` | Trabajamos cuarzo, sinterizado (Dekton/Neolith/similares), piedra natural y acrílico. Los más pedidos en cocina son cuarzo y sinterizado: resistentes al calor y a las manchas. Te preparo opciones en 2–3 rangos de precio. |
| `/presu` | Hola {nombre}, aquí tienes tu presupuesto: • Material: … • Medidas: … • Precio: … € (IVA incl.) • Plazo: … días laborables. Si te encaja, reservamos la medición esta semana. |
| `/seguim3` | Hola {nombre}, ¿pudiste ver el presupuesto? Si tienes dudas con material o precio, te lo explico por aquí. 😊 |
| `/seguim7` | Hola {nombre}, te puedo llevar muestras de materiales sin compromiso. ¿Te las dejo esta semana? |
| `/seguim14` | Hola {nombre}, tu presupuesto sigue vigente hasta {fecha}. Cualquier cosa, aquí estoy. |
| `/medicion` | Perfecto. Para la medición necesitamos acceso a la cocina con los muebles ya colocados. ¿Te viene bien {día} por la mañana o por la tarde? |
| `/idioma` | Mi español es básico, así que prefiero escribirte por aquí para no equivocarme. Si quieres, podemos hablar en inglés o ucraniano. 🙏 |
| `/precio` | El precio depende de material, metros y acabados (cantos, huecos, zócalo). Para darte una cifra real necesito medidas aproximadas; si me las mandas hoy, te respondo en 24 h. |

*(Усі UA-варіанти для експатів — див. нижче)*

**UA/EN експати:**
- `/hi_ua`: Вітаю! Я {ім'я} з EVOSTONE, виготовляємо стільниці на замовлення в Alicante. Надішліть розміри або фото/план — підготуємо розрахунок протягом 24 год.
- `/hi_en`: Hi {name}! I'm {name} from EVOSTONE — we make custom kitchen and bathroom countertops in Alicante. Send me measurements or a photo/plan and I'll get you a quote within 24 hours.

## Крок 5. Каталог (10 хв)

Мінімум 6–8 позицій (по одній фото-картці): `Encimera de cocina — cuarzo`, `— sinterizado`, `Encimera con isla`, `Lavabo/encimera de baño`, `Salpicadero (frontal) de piedra`, `Alféizar/repisa`, `Trabajo a medida (proyectos)`.
Опис: що це, матеріали, «desde … €/ml» (**якщо готовий називати ціну «від»** — це підвищує кількість повідомлень), кнопка «Pedir presupuesto» (посилання на WhatsApp). Фото — з `assets/img` (кухня `w-11`, `w-12`; ванна `mo-01`, `ka-01`; цех `vyrobnytstvo-02`).

## Крок 6. Посилання, QR і Click-to-WhatsApp

- **Пряме посилання:** `https://wa.me/34XXXXXXXXX` (число без пробілів і плюса).
- **З підставленим текстом (для сайту/реклами/візитки):**
  `https://wa.me/34XXXXXXXXX?text=Hola%2C%20quiero%20un%20presupuesto%20de%20encimera`
  *(для різних джерел міняй текст — це самий простий трекер: «…vengo de Instagram», «…vengo de Google»).*
- **QR-код:** WhatsApp Business → Herramientas → «Enlace corto / Código QR». Роздрукуй на візитках, зразках, упаковці.
- **Кнопка на evostone.es:** плаваюча зелена кнопка в куті на мобільному + у шапці.
- **Meta Ads (Click-to-WhatsApp):** пов'язати сторінку Facebook із номером (див. `META_ADS_KAMPANIYA.md`).

## Крок 7. Правила, щоб не втратити номер (важливо для холодних B2B-повідомлень)

WhatsApp банить за скарги й масові розсилки навіть з Business-додатка.
- **Не пиши холодним номерам списком.** Спочатку — LinkedIn/Instagram/email, WhatsApp — коли людина відповіла або номер публічно вказаний як робочий (на сайті, у Google Maps).
- **Ліміт нових розмов: ~15–25 на день** на початку, нарощуй повільно (2–3 тижні розгону).
- Персоналізуй кожне перше повідомлення (ім'я, проєкт, місто). Без посилань у першому повідомленні.
- Кожне повідомлення має легку відмову: «Si no es buen momento, dímelo y no te escribo más».
- **Broadcast-списки** працюють лише для тих, хто зберіг твій номер — використовуй тільки для клієнтів/партнерів, що погодились.
- Резервна копія чатів: Google Drive щодня.

## Чек-лист готовності (поставити всі галочки до запуску реклами)

- [ ] номер +34 і Business-додаток
- [ ] профіль, опис, години, адреса, сайт
- [ ] привітання та «відсутність»
- [ ] 10+ швидких відповідей
- [ ] 6–8 позицій каталогу з фото
- [ ] ярлики
- [ ] `wa.me`-посилання й QR для кожного джерела
- [ ] кнопка WhatsApp на evostone.es
- [ ] тестове повідомлення з іншого телефону: автопривітання працює
