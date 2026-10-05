# Vlastní ilustrace

`llm-open-box.json` je editovatelný zdroj pro Skullpix 0.3.0. PNG má 176 × 96 px a průhledné pozadí. V prezentaci se zvětšuje celočíselně pomocí `image-rendering: pixelated`.

Regenerace z kořene tohoto projektu:

```sh
python -m skullpix render html/assets/llm-open-box.json -o html/assets/llm-open-box.png --strict --json
```

Skullpix je lokálně v `/Users/pavel.lorenz/Projects/bastlinet/skullpix`; jeho Python je `.venv/bin/python`. Ilustrace byla vytvořena pro tuto prezentaci, bez převzatých obrazových assetů. Vlastní diagramy zůstávají editovatelné přímo v `../slides.js` jako HTML/SVG.

## Černobílé stickery (archeologická verze decku)

| Zdroj | PNG | Kde |
|---|---|---|
| `llm-open-box-bw.json` | 176 × 96 | slide `o-mne` (528 × 288) |
| `shovel-bw.json` | 64 × 96 | slide `motivace` (128 × 192) |

`llm-open-box-bw.json` je `llm-open-box.json` s černobílou paletou. Regenerace:

```sh
for f in llm-open-box-bw shovel-bw; do python -m skullpix render html/assets/$f.json -o html/assets/$f.png --strict --json; done
```

Další malé kresby historických zastávek jsou vlastní SVG v `../doodles.js` (kniha, písmena, tabulka, síť, paměť, dvojice reprezentací, bloky, dokument, dialog, kalkulačka). Runtime je vkládá do hlavičky zastávky podle `era`. Jsou dekorativní, nikoli přesným schématem modelu; upravují se přímo ve zdroji, bez externích fontů nebo assetů.
