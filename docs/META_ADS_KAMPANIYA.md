# Meta Ads (Instagram + Facebook): кампанія на 100 прорахунків

Креативи вже згенеровані: `ads/meta/*.png` (4 макети × 2 формати: **feed 1080×1350** і **story/reels 1080×1920**).
Бренд на макетах — `EVOSTONE`, URL — `evostone.es`. Якщо назва в Іспанії інша, скажи — перегенерую за хвилину (одна змінна).

---

## 1. Мета і логіка

- **Мета кампанії:** *Engagement → Messaging apps → WhatsApp* (Click-to-WhatsApp). Люди пишуть тобі напряму, ти кваліфікуєш у чаті. Це найкраще для слабкої іспанської: можна відповідати письмово.
- **Другий оффер у тій самій кампанії:** «Muestras gratis» (зразки додому/в студію) — для тих, хто ще не готовий просити ціну.
- **Бюджет:** 45 €/день × 14 днів ≈ 630 € основа + ретаргетинг 7 €/день ≈ 100 € → **≈ 750–1 000 €** (у плані 1 000 €).
- **Реалістичні очікування:** CPL у WhatsApp-чаті 6–15 €, але **лише ~35–50% розмов стануть кваліфікованими прорахунками** (звідси ~25–30 чистих прорахунків із Meta, а не 100). Це припущення, перевірити на 3-й день.

## 2. Структура (проста, щоб алгоритм вчився швидко)

```
Campaign  «ES | WhatsApp | Encimeras Alicante»  (Engagement → WhatsApp)  — CBO 45 €/день
 ├─ Ad set 1  «Alicante · Hogar ES»      ES, 28–65, +40 км, широка (без інтересів або reformas/decoración)
 ├─ Ad set 2  «Expats Costa Blanca»      EN/DE/NL/SV мова інтерфейсу + UA/RU, Alicante, широка
 └─ Ad set 3  «Retargeting»  7 €/день    відвідувачі evostone.es 30 днів + кому писав у WA + engage IG/FB 60 днів
Кожен ad set: 4 оголошення (4 креативи) × 2 формати (feed + story як placements).
```
Не створюй 20 наборів: на малому бюджеті Meta не вийде з навчання (≈50 подій/тиждень на набір).

**Гео:** Alicante (місто) +40 км. Окремо можна додати Elche, Torrevieja, Benidorm як міста в ad set 1, не окремими наборами.
**Плейсменти:** Advantage+ (авто), але переглянь, що Audience Network вимкнений.
**Графік:** безперервно, але відповідай в робочі години (ліди вночі чекають до ранку; автовідповідь вже налаштована).

## 3. Тексти оголошень

> Перед запуском віддай на **перевірку носію** (30 хв фрілансера). Мета — природність.

### 3.1. Основний (ES) — варіант A: «Presupuesto sin visita»
- **Primary text:**
```
¿Reformas la cocina o el baño? 🏠
Fabricamos encimeras a medida en Alicante: cuarzo, sinterizado y piedra.
✔ Presupuesto en 24 h por WhatsApp, sin visita ni compromiso
✔ Fabricación propia (sin intermediarios)
✔ 5 años de garantía
Envíanos las medidas o una foto y te decimos el precio.
```
- **Headline:** `Tu encimera a medida · Alicante`
- **Description:** `Presupuesto en 24 h, sin compromiso`
- **CTA:** *Enviar mensaje* (Send WhatsApp message)

### 3.2. Варіант B: «Fabricación propia / sin intermediarios» (довіра)
- **Primary text:**
```
Del taller a tu casa, sin intermediarios. 🔧
En EVOSTONE fabricamos nuestras propias encimeras en Alicante. Medimos, cortamos, pulimos y entregamos con cuidado.
Cuarzo · sinterizado · piedra natural · acrílico.
Escríbenos y te preparamos un presupuesto a tu medida.
```
- **Headline:** `Fabricamos en Alicante`
- **Description:** `Cuarzo, sinterizado y piedra`

### 3.3. Варіант C: «Baño»
- **Primary text:**
```
Un baño con carácter empieza por una buena encimera. ✨
Lavabos y encimeras de baño a medida, en piedra, cuarzo o sinterizado. Piezas continuas, sin juntas de más y fáciles de limpiar.
Mándanos una foto de tu baño por WhatsApp y te asesoramos.
```
- **Headline:** `Lavabo y encimera de baño a medida`
- **Description:** `Te asesoramos gratis`

### 3.4. Варіант D: «Superficies continuas / garantía»
- **Primary text:**
```
Menos juntas, menos suciedad, más durabilidad. 🧼
Fabricamos encimeras continuas para que tu cocina se vea impecable y dure años. 5 años de garantía.
Pide tu presupuesto en 1 minuto.
```
- **Headline:** `Superficies continuas, sin juntas de más`
- **Description:** `5 años de garantía`

### 3.5. Muestras gratis (для ретаргетингу та «теплих»)
- **Primary text:**
```
¿No te decides por el material? Te llevamos muestras de cuarzo, sinterizado y piedra a casa o a tu estudio, sin compromiso. 🎨
Escríbenos y te decimos cuándo pasamos.
```
- **Headline:** `Muestras gratis a domicilio`

### 3.6. EN (експати, Costa Blanca)
```
Custom kitchen & bathroom countertops, made in Alicante. 🇪🇸
Quartz, sintered stone and natural stone. Get a free quote in 24 h on WhatsApp — just send us your measurements or a photo.
✔ Own workshop (no middlemen)  ✔ 5-year warranty
```
Headline: `Custom countertops in Alicante` · Description: `Free quote in 24 h`

### 3.7. UA/RU (українці/російськомовні)
```
Стільниці на замовлення в Alicante 🇪🇸
Кварц, спечений камінь, натуральний камінь. Розрахунок за 24 год у WhatsApp — надішліть розміри або фото. Спілкуємося українською.
✔ Власне виробництво  ✔ 5 років гарантії
```
Headline: `Стільниці на замовлення · Alicante` · Description: `Розрахунок за 24 год`
> Мова оголошення = мова ad set: UA/RU робиться окремим набором 2b (лише якщо експат-аудиторія в Alicante достатня за прогнозом Meta).

## 4. Click-to-WhatsApp: налаштування чату (щоб конвертувало)

Ads Manager → на рівні оголошення → *Messaging settings*:
- **Greeting (привітання):** «¡Hola! Gracias por escribirnos 👋 Cuéntanos: ¿cocina o baño? ¿En qué ciudad? Y si tienes medidas o una foto, mejor.»
- **Ice breakers (3 кнопки):**
  1. `Quiero un presupuesto de cocina`
  2. `Quiero un presupuesto de baño`
  3. `Pedir muestras gratis`
- **Попередньо заповнене повідомлення** відповідає кнопці.
- Підключи **Facebook Page ↔ WhatsApp Business номер** (Page → Settings → Linked accounts → WhatsApp).
- **Відповідь за 15 хв** — інакше платиш за холодні розмови.

## 5. Аудиторії та Pixel

- **Pixel + Conversions API** на evostone.es (через GTM або плагін). Події: `Lead` (форма), `Contact` (клік по WhatsApp), `ViewContent`.
- **Custom audiences:** відвідувачі сайту 30 дн.; клікнули WhatsApp; взаємодія IG/FB 60 дн.; список клієнтів (email/телефон з CRM) для **Lookalike 1%** Іспанія → потім звужуєш до Alicante.
- **Ідеально до 1 тис. €:** жодних вузьких інтересів. Широка аудиторія + якісний креатив > тонке таргетування.

## 6. Правила керування (перші 7 днів)

| День | Дія |
|---|---|
| 1–2 | Нічого не чіпати (навчання). Відповідати на всі чати за 15 хв |
| 3 | Вимкнути оголошення з витратою >25 € без жодного повідомлення; зрівняти CPL |
| 5 | Вимкнути 50% найгірших; дубль найкращого з новим заголовком; запустити Muestras gratis для ретаргетингу |
| 7 | +30% бюджету на переможця, якщо CPL ≤ цілі; новий раунд креативів (відео!) |
| щодня | Таблиця: витрата · розмов · кваліфікованих · прорахунків |

**Метрики:** CTR link ≥ 1,2%; ціна розмови ≤ 15 €; ≥ 40% розмов дають розміри/фото; час відповіді ≤ 15 хв.

## 7. Креативи: що ще зняти на телефон (найбільший вплив)

Статичні макети — старт. **Відео працюють у 2–3 рази краще.** Зніми за 1 день (9:16, 10–20 с, без музики з авторськими правами, субтитри іспанською):
1. Різання/шліфування плити на ЧПУ у цеху (3 планів).
2. Монтаж стільниці в кухні «від порожнього до готового» (таймлапс).
3. До/після однієї кухні.
4. Ти в цеху: «Soy {ім'я}, fabricamos encimeras en Alicante» (навіть з акцентом — довіряють живій людині).
5. Відгук клієнта (15 с, іспанською).

## 8. Файли

| Файл | Призначення |
|---|---|
| `ads/meta/01-cocina-*.png` | варіант A «Presupuesto» (кухня) |
| `ads/meta/02-taller-*.png` | варіант B «Fabricación propia» |
| `ads/meta/03-bano-*.png` | варіант C «Baño» |
| `ads/meta/04-sin-juntas-*.png` | варіант D «Superficies continuas» |
| `*-feed.png` | стрічка (4:5) · `*-story.png` — Stories/Reels (9:16) |

Перед публікацією перевір, що **не заявляєш того, чого немає** (напр. «instalación incluida», «plazo desde 5 días»): я навмисно їх прибрав із макетів і текстів, поки ти не підтвердиш.
