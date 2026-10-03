#!/usr/bin/env python3
"""Генерує 4 плашки матеріалів через Gemini Nano Banana Pro з пошуком референсів у Google.
Модель спершу сама шукає в інтернеті реальні фото конкретного матеріалу (Caesarstone Alpine Mist,
Calacatta Gold, Calacatta Viola, Corian Glacier White), а потім генерує кадр за ними.
Запуск:  ~/.venvs/estone-photo/bin/python tools/gen_materials.py           → assets/img/m-*.jpg
         ~/.venvs/estone-photo/bin/python tools/gen_materials.py quartz    → тільки одна
Промти — docs/ES_PROMPTS_materiales.md."""
import base64, io, json, os, sys, urllib.request
from pathlib import Path
from PIL import Image

MODEL = os.environ.get('GEMINI_IMAGE_MODEL', 'gemini-3-pro-image-preview')  # Nano Banana Pro
OUT = Path(__file__).resolve().parents[1] / 'assets/img'

STYLE = (
    "Then create a real photograph for a premium stone supplier catalogue, part of a consistent set of four: identical camera angle, light and setting in every image. "
    "Close-up of the front corner of an installed kitchen countertop in a calm, modern Mediterranean home, seen at about 45 degrees from slightly above; "
    "the top surface and the front edge are both visible, the stone fills about 70 percent of the frame and is tack sharp. "
    "Soft natural morning daylight from a large window on the left, true-to-life colours exactly like the real reference photos you found, "
    "accurate neutral white balance, real soft reflections, natural contrast, no colour grading, no filters. "
    "Background softly out of focus: a warm white plaster wall and pale natural oak cabinet fronts. "
    "Full-frame camera, 90 mm lens, f/5.6. Vertical 3:4. It must be indistinguishable from a real photograph, not a 3D render. "
    "No text, no logos, no people, no extra objects."
)
MATERIALS = {
    'quartz': ("First search the web for real photos of white quartz countertops with fine grey veining, such as Caesarstone 'Alpine Mist' or Silestone 'Lagoon', "
               "to learn the exact look. The countertop is this WHITE quartz (not grey, not beige): a bright clean white base with thin, soft, light-grey veins "
               "and a fine even crystalline grain visible up close, polished, 20 mm edge."),
    'natural': ("First search the web for real photos of natural Calacatta Gold marble slabs and countertops to learn its exact colours and veining. "
                "The countertop is genuine Calacatta Gold marble: warm white crystalline base, bold irregular grey veins with golden-honey accents that continue over the edge, honed with a soft sheen, 20 mm edge."),
    'porcelain': ("First search the web for real photos of Calacatta Viola porcelain / sintered stone countertops to learn the exact colours and veining. "
                  "The countertop is large-format Calacatta Viola porcelain: white base with wide burgundy-violet veins with grey haze, polished, 12 mm slab with a 45-degree mitred edge forming a 4 cm apron, the vein matched around the corner."),
    'solid': ("First search the web for real photos of white acrylic solid surface countertops with integrated sinks (such as Corian Glacier White) to learn the exact look. "
              "The countertop is pure white solid surface: perfectly uniform warm-neutral white, no veins, satin matte finish, softly rounded edge, "
              "with the rim of a seamless integrated sink of the same material visible at the corner, no joints."),
}

def gen(key):
    body = {"contents": [{"parts": [{"text": MATERIALS[key] + " " + STYLE}]}],
            "tools": [{"google_search": {}}],
            "generationConfig": {"responseModalities": ["TEXT", "IMAGE"], "imageConfig": {"aspectRatio": "3:4"}}}
    headers = {"Content-Type": "application/json"}
    if os.environ.get('GEMINI_API_KEY'):
        headers["x-goog-api-key"] = os.environ['GEMINI_API_KEY']
    req = urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent",
                                 data=json.dumps(body).encode(), headers=headers)
    r = json.load(urllib.request.urlopen(req, timeout=300))
    c = r['candidates'][0]
    for part in c['content']['parts']:
        if 'inlineData' in part:
            im = Image.open(io.BytesIO(base64.b64decode(part['inlineData']['data']))).convert('RGB')
            im.thumbnail((1600, 1600), Image.LANCZOS)
            im.save(OUT / f'm-{key}.jpg', 'JPEG', quality=84, optimize=True, progressive=True)
            src = [x.get('web', {}).get('title') for x in c.get('groundingMetadata', {}).get('groundingChunks', [])]
            print('✓', f'm-{key}.jpg', '· референси:', ', '.join(filter(None, src))[:200])
            return
    raise SystemExit('немає зображення: ' + json.dumps(r)[:400])

for k in (sys.argv[1:] or MATERIALS):
    gen(k)
