#!/usr/bin/env python3
"""Генерує 4 плашки матеріалів через Gemini (один стиль для всіх).
Ключ: змінна GEMINI_API_KEY або ключ, який середовище підставляє саме (x-goog-api-key).
Запуск:  python tools/gen_materials.py            → assets/img/m-*.jpg
         python tools/gen_materials.py quartz     → тільки одна
Промти й пояснення — docs/ES_PROMPTS_materiales.md (тримати синхронно)."""
import base64, io, json, os, sys, urllib.request
from pathlib import Path

MODEL = os.environ.get('GEMINI_IMAGE_MODEL', 'gemini-2.5-flash-image')
OUT = Path(__file__).resolve().parents[1] / 'assets/img'

STYLE = (
    "Minimalist architectural interior photograph, one single modern object made of stone as the hero, centred, "
    "in a calm warm-beige limewash room (walls #E3D5C5), nothing else in the scene except at most one small ceramic vase. "
    "Soft directional late-afternoon window light from the left with a gentle long shadow, "
    "warm neutral colour grade in sand, clay and warm brown tones (#F5EDE3, #BCAB99, #594133), soft contrast, slightly matte blacks. "
    "Shot on medium format, 50 mm lens, eye level, sharp material texture so the stone type is instantly recognisable. "
    "Vertical 3:4 framing. Photorealistic. No text, no logos, no people."
)
MATERIALS = {
    'quartz': "The object: a sleek modern kitchen island with a thick 4 cm white engineered quartz worktop with very fine soft grey veining and subtle sparkle, polished, waterfall sides in the same quartz, flush seamless edges.",
    'porcelain': "The object: a monolithic bathroom vanity block clad entirely in large-format calacatta-look porcelain with bold grey and soft gold veins continuing across the mitred corners, an integrated rectangular basin and a matte black wall tap above.",
    'natural': "The object: a sculptural round pedestal side table carved from natural travertine marble with visible natural pores and warm crema banding, honed matte finish, solid stone base.",
    'solid': "The object: a wall-hung seamless warm-white acrylic solid surface washbasin with soft organic curves flowing into a shelf, satin finish, no visible joints, a brushed brass wall tap above it.",
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
            raw = base64.b64decode(part['inlineData']['data'])
            try:                                   # Gemini віддає PNG — зберігаємо справжній JPEG
                from PIL import Image
                Image.open(io.BytesIO(raw)).convert('RGB').save(OUT / f'm-{key}.jpg', 'JPEG', quality=84, optimize=True, progressive=True)
            except ImportError:
                (OUT / f'm-{key}.png').write_bytes(raw)
            print('✓', f'm-{key}.jpg'); return
    raise SystemExit('немає зображення у відповіді: ' + json.dumps(r)[:400])

for k in (sys.argv[1:] or MATERIALS):
    gen(k)
