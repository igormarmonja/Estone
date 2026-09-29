# Робота з фото й відео: сортування, обробка, промти

Документ на дві задачі: привести існуючий архів до стану, придатного для сайту й соцмереж,
і надалі знімати так, щоб обробка майже не була потрібна.

---

## 1. Спершу — сортування, а не обробка

Обробляти все підряд немає сенсу: 80% часу з'їдають кадри, які все одно не підуть.
Розкладіть архів на чотири купи. Це швидше, ніж здається — рішення по кадру займає секунди.

| Купа | Що це | Що з нею робити |
|---|---|---|
| **A. Готове** | Об'єкт дороблений, кадр рівний, у полі зору немає сміття й інструменту | Обробка мінімальна: кадрування, світло, різкість |
| **B. Рятується** | Виріб хороший, але кадр кривий, темний, або в кутку сміття | Генеративна чистка + вирівнювання, промти нижче |
| **C. Тільки деталь** | Загальний план провальний, але є вдалий фрагмент: стик, кромка, мийка | Кроп у макро. Часто найсильніший контент |
| **D. У відхід** | Меблі не дороблені, будматеріали в кадрі, розмито | Не чіпати. Витрачений на них час не повернеться |

**Важливо про купу D.** Спокуса «витягнути нейронкою» майже завжди програшна: недороблена кухня
залишиться недоробленою, а домальовані фасади видно. Краще переїхати на об'єкт і перезняти.

---

## 2. Права на фото — перевірте до публікації

У поточному архіві є три типи чужого матеріалу. Публікувати їх як своє портфоліо не можна:
це і юридичний ризик, і Google бачить ці зображення на інших сайтах, тобто унікальності вони не дають.

- **Файли з водяним знаком іншого бренду** (наприклад `mettax®`) — прибирати знак не можна,
  це не вирішує питання прав.
- **Файли з іменами `SaveClip.App_...`, `photo_..._n.jpg`** — завантажені з Instagram/Facebook.
- **Маркетингові кадри готелів** — знято на замовлення готелю, права у нього.

**Що робити:** напишіть замовнику або готелю й попросіть дозвіл на використання з підписом
об'єкта. Формулювання, яке працює: «Ми виготовляли для вас [виріб]. Просимо дозволу показати
його в портфоліо з зазначенням вашого об'єкта». Готелі зазвичай погоджуються — для них це
теж згадка. Відповідь зберігайте.

---

## 3. Промти для обробки

Промти написані під сервіси з генеративною заливкою (Nano Banana, Photoshop Generative Fill,
Magnific, Krea). Формат однаковий: **що зберегти → що прибрати → що не робити**.
Останній блок найважливіший: без нього нейронка перемальовує сам виріб.

### 3.1. Прибрати сміття й будівельний мотлох

```
Remove all construction debris, tools, cables, packaging, plastic film, buckets,
cardboard and dust from the floor and surfaces in this interior photo.
Keep the stone countertop, cabinetry, walls, windows and lighting exactly as they are —
do not redraw, restyle or change the material, colour, veining or edge profile of the stone.
Fill the cleared floor and wall areas with the same existing material continued naturally.
Photorealistic, matched lighting and shadows, no added furniture or decor.
```

### 3.2. Вирівняти завалений горизонт і перспективу

```
Correct the perspective and vertical lines in this interior photo: make wall edges,
cabinet fronts and window frames perfectly vertical, and the countertop edge horizontal.
Keep the original framing as wide as possible; extend the ceiling, floor and side walls
generatively only where the correction leaves empty corners.
Do not change the countertop shape, the sink, the fittings or the material.
Photorealistic, architectural photography look.
```

### 3.3. Витягнути темний або жовтий кадр

```
Relight this interior photograph as if shot in soft daylight:
neutralise the yellow-orange colour cast from artificial lighting, recover detail
in the dark areas, keep the highlights on the stone from blowing out.
Preserve the true colour and veining of the stone surface — it must stay the same material,
not become whiter or greyer. Natural, non-HDR result, no halos around edges.
```

### 3.4. Прибрати недороблену частину з кадру

Працює лише коли недороблене — на периферії. Якщо воно в центрі, кадр у купу D.

```
Crop and outpaint this photo to a clean horizontal composition centred on the stone
countertop and sink. Remove the unfinished cabinetry on the left edge by extending
the finished wall surface in its place.
Keep the countertop, its edge profile and the integrated sink exactly unchanged.
Photorealistic, consistent lighting, no new objects.
```

### 3.5. Збільшити роздільність для сайту й друку

Для Magnific / Topaz Gigapixel. Головне — низька креативність, інакше домалює фактуру каменю.

```
Upscale to 2x. Creativity: low. HDR: low. Resemblance: high.
Priority: preserve the natural stone veining and the sharp edge line of the countertop.
Do not invent new texture, grain or reflections on the stone surface.
```

### 3.6. Макро-кадр деталі (купа C)

```
Crop this photo to a tight close-up of the seam between the countertop and the integrated
sink, 3:2 horizontal. Increase micro-contrast on the stone surface so the seamless
transition is clearly readable. Keep colours natural and the material unchanged.
```

### 3.7. Кадр для соцмереж з вільним місцем під текст

```
Extend this photo to a 4:5 vertical composition by outpainting the ceiling and the wall
above the countertop, keeping the product in the lower two thirds.
The added area must be plain wall and soft shadow, with no new objects — it is space for text.
Photorealistic, identical lighting.
```

**Правило для всіх промтів:** після обробки порівняйте кромку, малюнок каменю й форму мийки
з оригіналом. Якщо змінилось хоч щось із цього — результат у відхід, це вже не ваш виріб.

---

## 4. Відео: що з ним робити

### Що можна зібрати з наявних зйомок

| Формат | Довжина | З чого складається |
|---|---|---|
| **Ролик об'єкта** | 30–45 с | Загальний план → проходка → 3–4 деталі → фінальний загальний |
| **Reels «як це зроблено»** | 15–25 с | Плита на верстаті → різ → шліфування → готовий виріб у інтер'єрі |
| **Reels «до / після»** | 10–15 с | Стара поверхня → монтаж прискорено → результат |
| **Деталь без слів** | 8–12 с | Один макроплан: вода стікає в інтегровану мийку, палець веде по безшовному стику |

### Правила монтажу, які працюють у цій ніші

1. **Перші 1,5 секунди — готовий результат**, а не логотип і не порожня кімната. Далі можна назад у процес.
2. **Без музики з голосом.** Інструментал, і тихо: у стрічці більшість дивиться без звуку.
3. **Вертикаль 9:16** для Reels і Shorts, горизонталь 16:9 — для сайту. Знімати краще горизонтально
   з запасом і різати вертикаль на монтажі.
4. **Титри тільки фактами:** «Кварц. 4,2 м. Без стику». Не «Найкраща якість».
5. **Склейка кожні 1,5–2,5 секунди.** Довші плани в стрічці не досиджують.

### Що дозняти спеціально під відео

Це знімається за один виїзд і закриває контент на місяці:

- Плита на ЧПУ в момент різу, зблизька (звук теж — його потім можна лишити)
- Шліфування торця, рука майстра в кадрі
- Момент стикування двох полотен на об'єкті
- Заливка чаші акрилом
- Розкладка зразків декорів на столі, зверху

---

## 5. Як знімати, щоб не було цієї проблеми

Це важливіше за всю обробку разом. П'ять правил, які закривають 90% браку:

1. **Спочатку приберіть кадр.** Винести все зайве: коробки, ганчірки, пакети, інструмент,
   магніти й записки з холодильника. Дві хвилини прибирання економлять годину обробки.
2. **Знімайте вдень, світло вимкніть.** Змішане світло (денне + жовті лампи) — головна причина
   кадрів, які «якось не такі». Одне джерело світла завжди краще за два.
3. **Телефон на рівні стільниці, не з висоти очей.** Приблизно 110–120 см. Так виріб виглядає
   масивним, а не пласким.
4. **Ввімкніть сітку в камері й ведіть по вертикалях.** Завалені стіни — друга причина браку,
   і вона виправляється безкоштовно на етапі зйомки.
5. **Один об'єкт — п'ять кадрів:** загальний, з кута, мийка зблизька, торець і стик, фрагмент
   фактури. Цього набору вистачає і на сайт, і на пост, і на кейс.

**І головне:** знімайте на здачі об'єкта, коли все дороблено й прибрано, а не в процесі.
Поставте це в чек-лист монтажникам — п'ять хвилин наприкінці роботи.
