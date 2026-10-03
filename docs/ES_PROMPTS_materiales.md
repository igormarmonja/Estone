# Промти для генерації зображень (Gemini · Nano Banana Pro)

Модель: `gemini-3-pro-image-preview`. Принцип: **реальна фотографія, природні кольори, нейтральний баланс білого, денне світло**. Без кольорового тонування, без «3D-рендеру». Однакова для всіх спільна частина + опис конкретного кадру.

Генерувати (з кореня репозиторію):
```
~/.venvs/estone-photo/bin/python evostone-es/tools/gen_materials.py          # 4 плашки матеріалів
~/.venvs/estone-photo/bin/python evostone-es/tools/gen_scenes.py             # 10 сцен
~/.venvs/estone-photo/bin/python evostone-es/tools/gen_scenes.py s-design    # один кадр
```

## Плашки матеріалів (з пошуком референсів у Google)

Модель спершу **сама шукає в інтернеті реальні фото матеріалу** (інструмент `google_search` у Nano Banana Pro), потім генерує кадр за ними. Знайдені джерела під час останньої генерації: caesarstoneus.com, marble.com, marblesystems.com, msisurfaces.com, ciero.ca, novatileandstone.com, corian.com.

Промт = опис матеріалу (з інструкцією «спочатку знайди фото») + спільна частина.

### Спільна частина
```
Then create a real photograph for a premium stone supplier catalogue, part of a consistent set of four: identical camera angle, light and setting in every image. Close-up of the front corner of an installed kitchen countertop in a calm, modern Mediterranean home, seen at about 45 degrees from slightly above; the top surface and the front edge are both visible, the stone fills about 70 percent of the frame and is tack sharp. Soft natural morning daylight from a large window on the left, true-to-life colours exactly like the real reference photos you found, accurate neutral white balance, real soft reflections, natural contrast, no colour grading, no filters. Background softly out of focus: a warm white plaster wall and pale natural oak cabinet fronts. Full-frame camera, 90 mm lens, f/5.6. Vertical 3:4. It must be indistinguishable from a real photograph, not a 3D render. No text, no logos, no people, no extra objects.
```

### m-quartz.jpg
```
First search the web for real photos of white quartz countertops with fine grey veining, such as Caesarstone 'Alpine Mist' or Silestone 'Lagoon', to learn the exact look. The countertop is this WHITE quartz (not grey, not beige): a bright clean white base with thin, soft, light-grey veins and a fine even crystalline grain visible up close, polished, 20 mm edge.
```

### m-natural.jpg
```
First search the web for real photos of natural Calacatta Gold marble slabs and countertops to learn its exact colours and veining. The countertop is genuine Calacatta Gold marble: warm white crystalline base, bold irregular grey veins with golden-honey accents that continue over the edge, honed with a soft sheen, 20 mm edge.
```

### m-porcelain.jpg
```
First search the web for real photos of Calacatta Viola porcelain / sintered stone countertops to learn the exact colours and veining. The countertop is large-format Calacatta Viola porcelain: white base with wide burgundy-violet veins with grey haze, polished, 12 mm slab with a 45-degree mitred edge forming a 4 cm apron, the vein matched around the corner.
```

### m-solid.jpg
```
First search the web for real photos of white acrylic solid surface countertops with integrated sinks (such as Corian Glacier White) to learn the exact look. The countertop is pure white solid surface: perfectly uniform warm-neutral white, no veins, satin matte finish, softly rounded edge, with the rim of a seamless integrated sink of the same material visible at the corner, no joints.
```

## Сцени (гідрорізка, фасади, процес)

### Спільна частина
```
Real editorial photograph for the website of a premium marble and stone workshop in Alicante, Spain. Natural daylight, true-to-life colours, accurate neutral white balance, natural contrast, no stylised colour grading. Clean, calm, uncluttered composition with a lot of air, like a page from an architecture magazine. Full-frame camera, 35-50 mm lens, sharp details, realistic materials and light, subtle real-world imperfections. Must look like a real photo, not a 3D render or CGI. No text, no logos, no watermarks, no visible faces.
```

### lp-corte-por-chorro-de-agua.jpg · 4:5
```
Close-up inside a modern stone workshop: the nozzle of a CNC waterjet cutter cutting a smooth curve into a thick white marble slab lying on the steel slat bed; a fine high-pressure jet, light mist and a thin film of water on the stone; daylight from high windows.
```

### lp-corte-por-chorro-de-agua-1.jpg · 4:3
```
Wide view of a clean, bright stone workshop with a large industrial CNC waterjet machine; a big light-grey porcelain slab lies on the cutting bed, more slabs stand on A-frame racks in the background; skylights, concrete floor.
```

### lp-corte-por-chorro-de-agua-2.jpg · 1:1
```
Top view of a polished marble floor medallion made with waterjet inlay: precise interlocking pieces of white Carrara, warm Crema Marfil and dark Emperador marble forming a geometric rosette, joints thinner than a hair, soft daylight.
```

### lp-corte-por-chorro-de-agua-3.jpg · 1:1
```
On a workshop table: freshly waterjet-cut pieces of white marble and grey porcelain with complex curved shapes and an abstract cut-out pattern, edges perfectly clean, a few water drops, natural light.
```

### lp-fachadas-ventiladas.jpg · 4:5
```
A modern Mediterranean villa on the Costa Blanca with a ventilated facade of large-format warm beige stone-look porcelain panels with thin open joints, flat roof, large glazing, a palm tree casting a soft shadow, clear blue sky, late afternoon sun.
```

### lp-fachadas-ventiladas-1.jpg · 4:3
```
A contemporary three-storey residential building in Spain clad in large light travertine-look porcelain panels laid in a horizontal rhythm, slim black window frames, clean street, soft evening light.
```

### lp-fachadas-ventiladas-2.jpg · 1:1
```
Close-up of a ventilated facade corner: large stone-look porcelain panels with hidden fixings and precise 8 mm open joints, sunlight grazing across the subtle stone texture, a slice of blue sky.
```

### lp-fachadas-ventiladas-3.jpg · 1:1
```
A ventilated facade during installation on a sunny day: aluminium substructure fixed to the wall, several large beige porcelain panels already mounted, a neat building site, view from the scaffolding.
```

### s-measure.jpg · 5:4
```
A stone installer's hands measuring new kitchen base cabinets for a countertop with a laser distance meter and a thin plywood template on top; a bright modern Spanish kitchen without the worktop yet, daylight.
```

### s-design.jpg · 5:4
```
A designer's table in a stone showroom: a printed technical drawing of an L-shaped kitchen countertop with dimensions, a pencil, and a neat row of small polished stone samples in white quartz, Calacatta marble, travertine and dark grey porcelain; soft daylight, three-quarter top view.
```
