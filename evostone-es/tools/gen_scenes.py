#!/usr/bin/env python3
"""Генерує сцени, для яких немає реальних фото (Gemini). Один стиль з плашками матеріалів.
Запуск: python tools/gen_scenes.py [name ...]   → assets/img/<name>.jpg
Це візуалізації: на сторінках вони позначені як «Imágenes ilustrativas»."""
import base64, io, json, os, sys, urllib.request
from pathlib import Path
from PIL import Image
sys.path.insert(0, str(Path(__file__).parent))
from grade import grade

MODEL = os.environ.get('GEMINI_IMAGE_MODEL', 'gemini-3-pro-image-preview')  # Nano Banana Pro
OUT = Path(__file__).resolve().parents[1] / 'assets/img'
STYLE = ("Real editorial photograph for the website of a premium marble and stone workshop in Alicante, Spain. "
         "Natural daylight, true-to-life colours, accurate neutral white balance, natural contrast, no stylised colour grading. "
         "Clean, calm, uncluttered composition with a lot of air, like a page from an architecture magazine. "
         "Full-frame camera, 35-50 mm lens, sharp details, realistic materials and light, subtle real-world imperfections. "
         "Must look like a real photo, not a 3D render or CGI. No text, no logos, no watermarks, no visible faces.")
SCENES = {
    'lp-corte-por-chorro-de-agua': ("4:5", "Close-up inside a modern stone workshop: the nozzle of a CNC waterjet cutter cutting a smooth curve into a thick white marble slab lying on the steel slat bed; a fine high-pressure jet, light mist and a thin film of water on the stone; daylight from high windows."),
    'lp-corte-por-chorro-de-agua-1': ("4:3", "Wide view of a clean, bright stone workshop with a large industrial CNC waterjet machine; a big light-grey porcelain slab lies on the cutting bed, more slabs stand on A-frame racks in the background; skylights, concrete floor."),
    'lp-corte-por-chorro-de-agua-2': ("1:1", "Top view of a polished marble floor medallion made with waterjet inlay: precise interlocking pieces of white Carrara, warm Crema Marfil and dark Emperador marble forming a geometric rosette, joints thinner than a hair, soft daylight."),
    'lp-corte-por-chorro-de-agua-3': ("1:1", "On a workshop table: freshly waterjet-cut pieces of white marble and grey porcelain with complex curved shapes and an abstract cut-out pattern, edges perfectly clean, a few water drops, natural light."),
    'lp-fachadas-ventiladas': ("4:5", "A modern Mediterranean villa on the Costa Blanca with a ventilated facade of large-format warm beige stone-look porcelain panels with thin open joints, flat roof, large glazing, a palm tree casting a soft shadow, clear blue sky, late afternoon sun."),
    'lp-fachadas-ventiladas-1': ("4:3", "A contemporary three-storey residential building in Spain clad in large light travertine-look porcelain panels laid in a horizontal rhythm, slim black window frames, clean street, soft evening light."),
    'lp-fachadas-ventiladas-2': ("1:1", "Close-up of a ventilated facade corner: large stone-look porcelain panels with hidden fixings and precise 8 mm open joints, sunlight grazing across the subtle stone texture, a slice of blue sky."),
    'lp-fachadas-ventiladas-3': ("1:1", "A ventilated facade during installation on a sunny day: aluminium substructure fixed to the wall, several large beige porcelain panels already mounted, a neat building site, view from the scaffolding."),
    's-measure': ("5:4", "A stone installer's hands measuring new kitchen base cabinets for a countertop with a laser distance meter and a thin plywood template on top; a bright modern Spanish kitchen without the worktop yet, daylight."),
    's-design': ("5:4", "A designer's table in a stone showroom: a printed technical drawing of an L-shaped kitchen countertop with dimensions, a pencil, and a neat row of small polished stone samples in white quartz, Calacatta marble, travertine and dark grey porcelain; soft daylight, three-quarter top view."),
}

def gen(name):
    ratio, desc = SCENES[name]
    body = {"contents": [{"parts": [{"text": STYLE + " " + desc}]}],
            "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": ratio}}}
    headers = {"Content-Type": "application/json"}
    if os.environ.get('GEMINI_API_KEY'):
        headers["x-goog-api-key"] = os.environ['GEMINI_API_KEY']
    req = urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent",
                                 data=json.dumps(body).encode(), headers=headers)
    r = json.load(urllib.request.urlopen(req, timeout=240))
    for part in r['candidates'][0]['content']['parts']:
        if 'inlineData' in part:
            im = Image.open(io.BytesIO(base64.b64decode(part['inlineData']['data']))).convert('RGB')
            im.save(OUT / f'{name}.jpg', 'JPEG', quality=84, optimize=True, progressive=True)
            print('✓', name); return
    raise SystemExit('немає зображення: ' + json.dumps(r)[:300])

for n in (sys.argv[1:] or SCENES):
    gen(n)
