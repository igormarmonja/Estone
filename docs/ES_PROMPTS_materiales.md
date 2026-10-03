# Промти для генерації зображень (Gemini · Nano Banana Pro)

Модель: `gemini-3-pro-image-preview`. Принцип: **реальна фотографія, природні кольори, нейтральний баланс білого, денне світло**. Без кольорового тонування, без «3D-рендеру». Однакова для всіх спільна частина + опис конкретного кадру.

Генерувати (з кореня репозиторію):
```
~/.venvs/estone-photo/bin/python evostone-es/tools/gen_materials.py          # 4 плашки матеріалів
~/.venvs/estone-photo/bin/python evostone-es/tools/gen_scenes.py             # 10 сцен
~/.venvs/estone-photo/bin/python evostone-es/tools/gen_scenes.py s-design    # один кадр
```

## Плашки матеріалів

### Спільна частина
```
Real photograph for a premium stone supplier catalogue. Close-up of the corner of an installed kitchen countertop in a real, bright home, seen at about 45 degrees from slightly above: the top surface and the front edge are both visible and the stone fills most of the frame, tack sharp, so the natural pattern, grain and finish of the material are unmistakable. Natural daylight from a large window on the left, true-to-life colours and an accurate neutral white balance, exactly how the stone looks in person. Real reflections of the window on the surface, very subtle real-world imperfections. Background softly out of focus: a warm white wall and light natural oak cabinetry; one plain ceramic cup far behind, out of focus. Shot on a full-frame camera with a 90 mm lens at f/5.6, natural contrast, no stylised colour grading. Vertical 3:4. Must look like a real photo, not a 3D render or CGI. No text, no logos, no people.
```

### m-quartz.jpg
```
Material: white engineered quartz like 'Alpine Mist': a clean bright white base with thin, soft, light-grey veins that drift diagonally and wrap naturally over the edge; up close a fine, even, sand-like crystalline grain. Polished, 20 mm square edge with a tiny eased arris.
```

### m-natural.jpg
```
Material: genuine Calacatta Gold natural marble: creamy warm-white crystalline base, bold irregular veins in taupe-grey with honey-gold accents, tiny natural pits and a faint crystalline sparkle, the vein continuing over the edge as in real quarried stone. Honed finish with a soft sheen, 20 mm eased edge.
```

### m-porcelain.jpg
```
Material: large-format porcelain slab with a Calacatta Viola design: white body with wide veins in true burgundy, plum and violet tones with a soft grey haze, polished glossy finish, 12 mm slab with a 45-degree mitred edge forming a 4 cm apron, the violet vein matched continuously around the corner.
```

### m-solid.jpg
```
Material: pure white acrylic solid surface like 'Glacier White': perfectly uniform neutral white with no veins or grain, satin matte finish, a softly rounded edge and a seamless integrated sink bowl in the same material curving down from the top with no joint at all.
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
