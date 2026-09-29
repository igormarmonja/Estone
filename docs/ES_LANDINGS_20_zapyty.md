# evostone.es — 20 посадкових сторінок під пошукові запити
**Версія 1 · 29.09.2026**

Головна сторінка (`/`) лишається без змін. Вона закриває бренд і загальний запит «encimeras y piedra a medida Alicante». Кожна посадкова сторінка закриває **один** продуктовий намір, щоб сторінки не конкурували між собою в пошуку.

> ⚠ **Частотність — експертна оцінка, а не виміри.** Інструмента з реальними обсягами в цій сесії немає. Перед запуском реклами чи просуванням перевірити в Google Keyword Planner (Іспанія, мова ES) або в Ahrefs/Semrush. Порядок у таблиці: від найбільшого очікуваного попиту до вужчих нішевих запитів.

| # | URL | Головний запит | Супутні запити | Намір |
|---|---|---|---|---|
| 1 | `/encimeras-de-cuarzo/` | encimeras de cuarzo | encimera cuarzo precio, encimeras cuarzo Alicante, encimera Silestone* | покупка |
| 2 | `/encimeras-de-cocina-a-medida/` | encimeras de cocina a medida | encimeras de cocina Alicante, encimera cocina piedra | покупка, загальний |
| 3 | `/encimeras-porcelanicas/` | encimeras porcelánicas | encimera porcelánico, piedra sinterizada, encimera tipo Dekton* | покупка |
| 4 | `/encimeras-de-granito/` | encimeras de granito | encimera granito precio, granito cocina | покупка |
| 5 | `/encimeras-de-marmol/` | encimeras de mármol | encimera mármol cocina, mármol blanco encimera | покупка |
| 6 | `/platos-de-ducha-a-medida/` | platos de ducha a medida | plato de ducha de piedra, plato ducha resina a medida | покупка |
| 7 | `/lavabos-de-piedra/` | lavabos de piedra | lavabo piedra natural, lavabo mármol | покупка |
| 8 | `/lavabos-a-medida/` | lavabos a medida | encimera baño con lavabo integrado, lavabo solid surface | покупка |
| 9 | `/mesas-de-marmol/` | mesas de mármol | mesa comedor mármol, mesa centro mármol | покупка |
| 10 | `/mesas-de-porcelanico/` | mesas de porcelánico | mesa cerámica comedor, mesa exterior porcelánico | покупка |
| 11 | `/escaleras-de-marmol/` | escaleras de mármol | peldaños de mármol, peldaños granito | покупка |
| 12 | `/porcelanico-gran-formato/` | porcelánico gran formato | revestimiento gran formato, paredes porcelánico XXL | покупка, проєкт |
| 13 | `/fregaderos-de-piedra/` | fregaderos de piedra | fregadero integrado encimera, fregadero mármol a medida | покупка |
| 14 | `/islas-de-cocina/` | islas de cocina de piedra | isla cocina cuarzo, encimera isla cascada | покупка |
| 15 | `/chimeneas-de-marmol/` | chimeneas de mármol | revestimiento chimenea piedra, portal chimenea | покупка |
| 16 | `/corte-por-chorro-de-agua/` | corte por chorro de agua | corte waterjet, corte por agua Alicante | B2B-послуга |
| 17 | `/corte-de-piedra-a-medida/` | corte de mármol a medida | corte de encimeras, corte de piedra | B2B-послуга |
| 18 | `/esculturas-de-marmol/` | esculturas de mármol modernas | escultura mármol, escultura piedra jardín | покупка, штучне |
| 19 | `/fachadas-ventiladas/` | fachada ventilada porcelánico | fachada ventilada precio, fachada porcelánico | проєкт, B2B |
| 20 | `/marmoleria-alicante/` | marmolería Alicante | marmolistas Alicante, marmolería Novelda / Elche | локальний |

\* Бренди Silestone і Dekton у текстах не згадуємо, доки клієнт не підтвердить роботу з ними і право на назви. Бренд-запити закриваємо загальними термінами («cuarzo», «piedra sinterizada»).

## Шаблон сторінки (невелика, 7 блоків)
1. Хлібні крихти `Inicio / <Продукт>` + H1 з ключем + підзаголовок, ціна «від» (якщо є в `PRICES`), CTA і WhatsApp, фото.
2. Вступ на 70–100 слів з ключем і супутніми запитами.
3. 4 переваги.
4. Технічні дані: таблиця на 5 рядків (товщини, розміри, обробки, термін). Це унікальний зміст сторінки.
5. Галерея з 3 фото-заглушок (`lp-<slug>-1..3.jpg`).
6. FAQ на 3 питання (FAQPage schema).
7. Спільний блок процесу на 4 кроки, «Також вас зацікавить» (3 посилання на сусідні сторінки), форма з прихованим полем «продукт».

## Технічне
- Тексти: `evostone-es/src/landings/es.mjs`, шаблон: `src/landing-template.mjs`. Стилі й скрипт окремі (`assets/css/landing.css`, `assets/js/landing.js`), тож головна сторінка від них не залежить.
- Сторінки додаються в `sitemap.xml`, `canonical` веде на саму сторінку, hreflang тільки `es-ES` (EN/RU-версії робимо окремо, якщо буде потрібно).
- Головна **поки не посилається** на посадкові (її не чіпали). Після погодження варто додати блок посилань у футер головної, щоб сторінки швидше індексувались.
