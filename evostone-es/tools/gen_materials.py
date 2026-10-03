#!/usr/bin/env python3
"""Генерує 4 плашки матеріалів через Gemini (один стиль для всіх).
Ключ: змінна GEMINI_API_KEY або ключ, який середовище підставляє саме (x-goog-api-key).
Запуск:  python tools/gen_materials.py            → assets/img/m-*.jpg
         python tools/gen_materials.py quartz     → тільки одна
Промти й пояснення — docs/ES_PROMPTS_materiales.md (тримати синхронно)."""
import base64, io, json, os, sys, urllib.request
from pathlib import Path

MODEL = os.environ.get('GEMINI_IMAGE_MODEL', 'gemini-3-pro-image-preview')  # Nano Banana Pro
OUT = Path(__file__).resolve().parents[1] / 'assets/img'

STYLE = (
    "Real photograph for a premium stone supplier catalogue. Close-up of the corner of an installed kitchen countertop "
    "in a real, bright home, seen at about 45 degrees from slightly above: the top surface and the front edge are both visible "
    "and the stone fills most of the frame, tack sharp, so the natural pattern, grain and finish of the material are unmistakable. "
    "Natural daylight from a large window on the left, true-to-life colours and an accurate neutral white balance, "
    "exactly how the stone looks in person. Real reflections of the window on the surface, very subtle real-world imperfections. "
    "Background softly out of focus: a warm white wall and light natural oak cabinetry; one plain ceramic cup far behind, out of focus. "
    "Shot on a full-frame camera with a 90 mm lens at f/5.6, natural contrast, no stylised colour grading. "
    "Vertical 3:4. Must look like a real photo, not a 3D render or CGI. No text, no logos, no people."
)
MATERIALS = {
    'quartz': ("Material: white engineered quartz like 'Alpine Mist': a clean bright white base with thin, soft, light-grey veins that drift diagonally "
               "and wrap naturally over the edge; up close a fine, even, sand-like crystalline grain. Polished, 20 mm square edge with a tiny eased arris."),
    'natural': ("Material: genuine Calacatta Gold natural marble: creamy warm-white crystalline base, bold irregular veins in taupe-grey with honey-gold accents, "
                "tiny natural pits and a faint crystalline sparkle, the vein continuing over the edge as in real quarried stone. Honed finish with a soft sheen, 20 mm eased edge."),
    'porcelain': ("Material: large-format porcelain slab with a Calacatta Viola design: white body with wide veins in true burgundy, plum and violet tones with a soft grey haze, "
                  "polished glossy finish, 12 mm slab with a 45-degree mitred edge forming a 4 cm apron, the violet vein matched continuously around the corner."),
    'solid': ("Material: pure white acrylic solid surface like 'Glacier White': perfectly uniform neutral white with no veins or grain, satin matte finish, "
              "a softly rounded edge and a seamless integrated sink bowl in the same material curving down from the top with no joint at all."),
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
