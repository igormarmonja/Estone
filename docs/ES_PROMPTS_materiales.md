# Промти для плашок матеріалів (Gemini)

Чотири плашки мають бути в одному стилі. Тому промт складається з двох частин: **спільна частина** (сцена, світло, фон, тон, кадр) однакова для всіх, а міняється тільки **опис матеріалу**. Фон і світло підібрані під палітру сайту (#F5EDE3, #E3D5C5, #594133).

Генерувати: `python evostone-es/tools/gen_materials.py` (усі 4) або `… gen_materials.py quartz` (одну). Формат 3:4, модель `gemini-2.5-flash-image` (можна змінити через `GEMINI_IMAGE_MODEL`).

## Спільна частина (для всіх)

```
Editorial product photograph of a single stone sample slab, about 40 x 30 cm and 2 cm thick, standing upright and slightly turned (about 15 degrees) on a warm beige limewash plaster plinth, against a seamless warm beige limewash wall in the same tone (#E3D5C5). Soft directional late-afternoon window light from the left, gentle long shadow to the right, the polished or honed edge of the slab clearly visible. Warm neutral colour grade, soft contrast, slightly matte blacks, palette of sand, clay and warm brown (#F5EDE3, #BCAB99, #594133). Shot on medium format, 100 mm lens, f/5.6, sharp stone texture, shallow falloff on the background. Vertical 3:4 framing, slab centred and filling about 60 percent of the frame. No text, no logos, no hands, no people, no plants, no other objects.
```

## Cuarzo → m-quartz.jpg

```
The slab is engineered quartz: bright warm white with very fine soft grey cloud veining and tiny sparkle, polished high-gloss surface, crisp square edge.
```

## Porcelánico → m-porcelain.jpg

```
The slab is large-format porcelain stoneware with a calacatta look: warm white base with bold flowing veins in grey and soft gold, silky matte finish, thin 12 mm mitred edge.
```

## Piedra natural → m-natural.jpg

```
The slab is natural marble (warm crema / light travertine tone) with irregular organic veining and natural tonal variation, honed finish, slightly rough chiselled natural edge on one side.
```

## Solid surface (акриловий камінь) → m-solid.jpg

```
The slab is acrylic solid surface: seamless uniform warm white, satin finish, softly rounded bullnose edge, with a shallow integrated curved basin carved into the top showing its seamless continuity.
```

## Порада
Якщо якась плашка вийшла «не в тон», допишіть у кінець її опису: `Match the exact background, light direction and colour grade of a warm beige limewash studio set.` і згенеруйте ще раз лише її.
