#!/usr/bin/env python3
"""Package only the runnable HTML deck; no review reports or source documents."""
import json
import pathlib
import re
import shutil

root = pathlib.Path(__file__).resolve().parents[1]
source = root / "html"
output = root / "_site"
if output.exists():
    shutil.rmtree(output)
output.mkdir()
for name in ("index.html", "app.js", "slides.js", "notes.js", "style.css", "doodles.js", "qr.js"):
    shutil.copy2(source / name, output / name)
assets = sorted(set(re.findall(r'assets/([^"\s<>]+)', (source / "slides.js").read_text())))
(output / "assets").mkdir()
for name in assets:
    if pathlib.Path(name).name != name:
        raise ValueError(f"Unexpected asset path: {name}")
    shutil.copy2(source / "assets" / name, output / "assets" / name)
(output / ".nojekyll").touch()
print(json.dumps({"files": sorted(str(p.relative_to(output)) for p in output.rglob("*") if p.is_file())}, indent=2))
