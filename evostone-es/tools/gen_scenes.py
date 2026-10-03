#!/usr/bin/env python3
"""Генерує сцени, для яких немає реальних фото (Gemini). Один стиль з плашками матеріалів.
Запуск: python tools/gen_scenes.py [name ...]   → assets/img/<name>.jpg
Це візуалізації: на сторінках вони позначені як «Imágenes ilustrativas»."""
import base64, io, json, os, sys, urllib.request
from pathlib import Path
from PIL import Image
sys.path.insert(0, str(Path(__file__).parent))
from grade import grade

MODEL = os.environ.get('GEMINI_IMAGE_MODEL', 'gemini-2.5-flash-image')
OUT = Path(__file__).resolve().parents[1] / 'assets/img'
STYLE = ("Photorealistic editorial photograph for a premium stone workshop website. "
         "Warm natural daylight, soft contrast, warm neutral colour grade in sand, clay and warm brown tones (#F5EDE3, #BCAB99, #594133), "
         "slightly matte blacks, clean uncluttered composition, shot on medium format, 50 mm lens. "
         "No text, no logos, no watermarks, no visible faces.")
SCENES = {
    'lp-corte-por-chorro-de-agua': ("4:5", "Close-up of an industrial CNC waterjet cutting head cutting a thick white marble slab on a steel slat table inside a clean stone workshop; a thin high-pressure water jet with fine mist and spray, the curved cut line visible in the stone."),
    'lp-corte-por-chorro-de-agua-1': ("4:3", "Large CNC waterjet cutting machine in a bright modern stone workshop, a big porcelain slab lying on the cutting bed, gantry and cutting head visible, warm light from high windows."),
    'lp-corte-por-chorro-de-agua-2': ("1:1", "Top-down detail of a marble floor medallion inlay made by waterjet: interlocking pieces of white, warm beige and dark brown marble forming a precise geometric rosette, polished surface."),
    'lp-corte-por-chorro-de-agua-3': ("1:1", "Freshly waterjet-cut stone pieces with intricate curved shapes and a cut-out logo-like abstract pattern laid out on a workbench in a stone workshop, wet surfaces, precise clean edges."),
    'lp-fachadas-ventiladas': ("4:5", "Modern Mediterranean villa with a ventilated facade clad in large-format warm beige porcelain stone panels with thin open joints, clean architecture, blue sky, palm shadows, late afternoon sun."),
    'lp-fachadas-ventiladas-1': ("4:3", "Contemporary residential building in Spain with a facade of large-format light travertine-look porcelain panels, horizontal rhythm, minimal windows, warm evening light."),
    'lp-fachadas-ventiladas-2': ("1:1", "Close-up corner detail of a ventilated facade: large porcelain stone panels with hidden aluminium fixings, precise 8 mm open joints, warm sunlight raking across the texture."),
    'lp-fachadas-ventiladas-3': ("1:1", "Installation detail of a ventilated facade under construction: aluminium substructure on the wall with some large beige stone-look porcelain panels already fixed, clean site, sunny day."),
    's-measure': ("5:4", "Stone installer measuring a kitchen for a countertop with a laser distance meter and a thin plywood template laid on new kitchen base cabinets, hands only, warm daylight, modern kitchen with no worktop yet."),
    's-design': ("5:4", "Designer's desk in a stone showroom: a technical drawing of a kitchen countertop with dimensions, several small stone and porcelain samples (white quartz, calacatta, travertine) and a pencil, warm daylight, top-down three-quarter view."),
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
            grade(im, wb=0.3).save(OUT / f'{name}.jpg', 'JPEG', quality=84, optimize=True, progressive=True)
            print('✓', name); return
    raise SystemExit('немає зображення: ' + json.dumps(r)[:300])

for n in (sys.argv[1:] or SCENES):
    gen(n)
