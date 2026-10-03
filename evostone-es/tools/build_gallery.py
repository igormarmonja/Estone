#!/usr/bin/env python3
"""Галерея evostone.es: бере фото зі списку gallery_list.csv, тонує теплим фільтром,
дає іспанські SEO-імена, робить веб-версію (1600 px) і мініатюру (720 px),
пише src/gallery/es.json. Потім: node build.mjs

Запуск:  python tools/build_gallery.py <папка з оригіналами> <manifest.csv>
manifest.csv — від інвентаризації (колонки id,path). Для нової партії фото достатньо
дописати рядки в gallery_list.csv: id,cat,slug,title_es.
Категорії: cocinas, banos, escaleras, revestimientos, mobiliario, esculturas, alfeizares, taller.
"""
import csv, json, sys
from collections import Counter
from pathlib import Path
from PIL import Image, ImageOps
sys.path.insert(0, str(Path(__file__).parent))
from grade import grade

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/img/galeria'
src_dir, manifest = Path(sys.argv[1]), sys.argv[2]
paths = {r['id']: r['path'] for r in csv.DictReader(open(manifest))}
(OUT / 't').mkdir(parents=True, exist_ok=True)

n = Counter(); items = []
for r in csv.DictReader(open(ROOT / 'tools/gallery_list.csv')):
    n[r['slug']] += 1
    name = f"{r['slug']}-{n[r['slug']]:02d}.jpg"
    im = ImageOps.exif_transpose(Image.open(src_dir / paths[r['id']])).convert('RGB')
    w, h = im.size
    if max(w, h) <= 1600:                       # копії з месенджерів: штамп дати внизу
        im = im.crop((0, 0, w, int(h * 0.94)))
    im = grade(im)
    big = im.copy(); big.thumbnail((1600, 1600), Image.LANCZOS)
    big.save(OUT / name, quality=82, optimize=True, progressive=True)
    th = im.copy(); th.thumbnail((720, 720), Image.LANCZOS)
    th.save(OUT / 't' / name, quality=78, optimize=True, progressive=True)
    items.append({'file': name, 'cat': r['cat'], 'title': r['title_es'], 'w': big.width, 'h': big.height})

(ROOT / 'src/gallery').mkdir(exist_ok=True)
json.dump(items, open(ROOT / 'src/gallery/es.json', 'w'), ensure_ascii=False, indent=1)
print(len(items), 'фото →', OUT)
