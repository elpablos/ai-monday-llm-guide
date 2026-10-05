# Vlastní ilustrace

## Aktuální linkové kresby

Černobílé editovatelné SVG od prez-opus, vytvořené přímo pro prezentaci. Čára 6 px s kulatými konci, černá `#161616` a bílá; robot má viewBox 400 × 400, ostatní 500 × 360.

| Soubor | Obsah | Slide |
|---|---|---|
| `robot-guide.svg` | zvědavý robůtek s otazníkem | titul |
| `opened-llm.svg` | otevřená krabička LLM, víko a šroubovák | o mně |
| `archaeology.svg` | odkrytá krabička ve vrstvách země, lupa a lopatka | motivace |

SVG se upravují přímo, nemají build krok ani externí závislosti. Nahrazují první pixelové pokusy, které už aktuální HTML nepoužívá. Kresby historických zastávek jsou v `../doodles.js`; zvětšeny na 190 × 190 px v designové ploše slidu.

## Starší Skullpix pokusy (archiv)


`llm-open-box.json` je editovatelný zdroj pro Skullpix 0.3.0. PNG má 176 × 96 px a průhledné pozadí. V původní verzi se zvětšoval celočíselně pomocí `image-rendering: pixelated`.

Regenerace z kořene tohoto projektu:

```sh
python -m skullpix render html/assets/llm-open-box.json -o html/assets/llm-open-box.png --strict --json
```

Skullpix je lokálně v `/Users/pavel.lorenz/Projects/bastlinet/skullpix`; jeho Python je `.venv/bin/python`. Ilustrace byla vytvořena pro tuto prezentaci, bez převzatých obrazových assetů. Vlastní diagramy zůstávají editovatelné přímo v `../slides.js` jako HTML/SVG.

### Starší černobílé pixelové stickery

| Zdroj | PNG | Kde |
|---|---|---|
| `llm-open-box-bw.json` | 176 × 96 | původní slide `o-mne` |
| `shovel-bw.json` | 64 × 96 | původní slide `motivace` |

`llm-open-box-bw.json` je `llm-open-box.json` s černobílou paletou. Regenerace:

```sh
for f in llm-open-box-bw shovel-bw; do python -m skullpix render html/assets/$f.json -o html/assets/$f.png --strict --json; done
```

Další malé kresby historických zastávek jsou vlastní SVG v `../doodles.js` (kniha, písmena, tabulka, síť, paměť, dvojice reprezentací, bloky, dokument, dialog, kalkulačka). Runtime je vkládá do hlavičky zastávky podle `era`. Jsou dekorativní, nikoli přesným schématem modelu; upravují se přímo ve zdroji, bez externích fontů nebo assetů.
