#!/usr/bin/env python3
"""Генерує 4 плашки матеріалів через Gemini (один стиль для всіх).
Ключ: змінна GEMINI_API_KEY або ключ, який середовище підставляє саме (x-goog-api-key).
Запуск:  python tools/gen_materials.py            → assets/img/m-*.jpg
         python tools/gen_materials.py quartz     → тільки одна
Промти й пояснення — docs/ES_PROMPTS_materiales.md (тримати синхронно)."""
import base64, json, os, sys, urllib.request
from pathlib import Path

MODEL = os.environ.get('GEMINI_IMAGE_MODEL', 'gemini-2.5-flash-image')
OUT = Path(__file__).resolve().parents[1] / 'assets/img'

STYLE = (
    "Editorial product photograph of a single stone sample slab, about 40 x 30 cm and 2 cm thick, "
    "standing upright and slightly turned (about 15 degrees) on a warm beige limewash plaster plinth, "
    "against a seamless warm beige limewash wall in the same tone (#E3D5C5). "
    "Soft directional late-afternoon window light from the left, gentle long shadow to the right, "
    "the polished or honed edge of the slab clearly visible. "
    "Warm neutral colour grade, soft contrast, slightly matte blacks, palette of sand, clay and warm brown (#F5EDE3, #BCAB99, #594133). "
    "Shot on medium format, 100 mm lens, f/5.6, sharp stone texture, shallow falloff on the background. "
    "Vertical 3:4 framing, slab centred and filling about 60 percent of the frame. "
    "No text, no logos, no hands, no people, no plants, no other objects."
)
MATERIALS = {
    'quartz': "The slab is engineered quartz: bright warm white with very fine soft grey cloud veining and tiny sparkle, polished high-gloss surface, crisp square edge.",
    'porcelain': "The slab is large-format porcelain stoneware with a calacatta look: warm white base with bold flowing veins in grey and soft gold, silky matte finish, thin 12 mm mitred edge.",
    'natural': "The slab is natural marble (warm crema / light travertine tone) with irregular organic veining and natural tonal variation, honed finish, slightly rough chiselled natural edge on one side.",
    'solid': "The slab is acrylic solid surface: seamless uniform warm white, satin finish, softly rounded bullnose edge, with a shallow integrated curved basin carved into the top showing its seamless continuity.",
}

def gen(key):
    body = {"contents": [{"parts": [{"text": STYLE + " " + MATERIALS[key]}]}],
            "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "3:4"}}}
    headers = {"Content-Type": "application/json"}
    if os.environ.get('GEMINI_API_KEY'):
        headers["x-goog-api-key"] = os.environ['GEMINI_API_KEY']
    req = urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent",
                                 data=json.dumps(body).encode(), headers=headers)
    r = json.load(urllib.request.urlopen(req, timeout=240))
    for part in r['candidates'][0]['content']['parts']:
        if 'inlineData' in part:
            (OUT / f'm-{key}.jpg').write_bytes(base64.b64decode(part['inlineData']['data']))
            print('✓', f'm-{key}.jpg'); return
    raise SystemExit('немає зображення у відповіді: ' + json.dumps(r)[:400])

for k in (sys.argv[1:] or MATERIALS):
    gen(k)
