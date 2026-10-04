# Vlastní ilustrace

`llm-open-box.json` je editovatelný zdroj pro Skullpix 0.3.0. PNG má 176 × 96 px a průhledné pozadí. V prezentaci se zvětšuje celočíselně pomocí `image-rendering: pixelated`.

Regenerace z kořene tohoto projektu:

```sh
python -m skullpix render html/assets/llm-open-box.json -o html/assets/llm-open-box.png --strict --json
```

Skullpix je lokálně v `/Users/pavel.lorenz/Projects/bastlinet/skullpix`; jeho Python je `.venv/bin/python`. Ilustrace byla vytvořena pro tuto prezentaci, bez převzatých obrazových assetů. Vlastní diagramy zůstávají editovatelné přímo v `../slides.js` jako HTML/SVG.
