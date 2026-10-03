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
    "Close-up product photograph (not extreme macro) of the corner of a stone countertop slab, seen at 45 degrees from slightly above, "
    "the polished top surface and the front edge both visible, the stone fills about 80 percent of the frame and is tack sharp, "
    "so the material texture, veins and grain are clearly readable. "
    "Behind it a softly blurred warm beige limewash wall (#E3D5C5). "
    "Soft directional window light from the left with a gentle highlight sliding across the surface, "
    "warm neutral colour grade (#F5EDE3, #BCAB99, #594133), soft contrast. "
    "Medium format, 100 mm lens, f/8. Vertical 3:4 framing. Photorealistic. No text, no logos, no objects, no people."
)
MATERIALS = {
    'quartz': ("The material is white engineered quartz in the style of an 'Alpine Mist' quartz, shown as a horizontal kitchen countertop corner: bright white base "
               "with clearly visible fine thin soft-grey veins running diagonally across the top and wrapping over the edge, "
               "and at close range a tiny uniform crystalline grain with faint sparkle typical of engineered quartz; very even, regular, man-made look; polished; crisp square 20 mm edge."),
    'natural': ("The material is natural Calacatta Gold marble: warm white crystalline base with bold, irregular golden-beige and grey veins that branch organically, "
                "fine natural fissures and a slight translucency at the edge; the vein continues naturally over the edge; honed-polished finish, 30 mm edge."),
    'porcelain': ("The material is large-format porcelain stoneware with a Calacatta Viola look: white base with dramatic burgundy-violet and grey veins, "
                  "perfectly flat surface with a silky finish, thin 12 mm slab with a 45-degree mitred edge where the violet vein wraps continuously around the corner."),
    'solid': ("The material is pure white acrylic solid surface: completely uniform matte-satin white with no veins and no grain, "
              "a softly rounded bullnose edge and, at the corner, a seamless integrated sink bowl curving down into the surface with no joint at all."),
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
