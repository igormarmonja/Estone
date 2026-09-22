# Gridalta — сайт gridalta.es

Статичний сайт компанії з ремонтів у Валенсії. Головна мета — привести людину у WhatsApp.

## Структура
- `index.html` — головна: hero, квіз «¿Qué quieres reformar?», послуги, ціни, бізнес, пакети, роботи, FAQ.
- `reforma-bano-valencia.html`, `reforma-cocina-valencia.html`, `reforma-integral-valencia.html`, `reforma-locales-valencia.html` — посадкові сторінки під популярні запити Валенсії.
- `aviso-legal.html`, `privacidad.html` — юридичні сторінки (CIF і адресу треба дописати).
- `assets/` — стилі, скрипт, фото (`assets/img/obra/` — фото робіт з презентації).

## Як змінювати
Усі сторінки генеруються: правте `src/build.js` (тексти) або `src/wa.js` (телефон, email, тексти WhatsApp-повідомлень), потім:

```
node src/build.js
```

Кожна кнопка WhatsApp відкриває чат з уже готовим повідомленням під конкретну послугу.
