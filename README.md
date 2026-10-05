# AI Monday — Stopařův průvodce po LLMs

Přednáška v češtině, cca 30 minut, AI Monday 5. 10. 2026.

## HTML deck (aktuální)

31 slidů, 93 stavů odkrývání, 29 minut obsahu + minuta rezervy. Aktuální verze: černobílý archeologický průvodce. Praktik otevírá dnešní krabičku a sleduje její kořeny: Markov → Shannon → n-gramy → naučené reprezentace a kontext → Transformer → GPT → asistent → nástroje → přesná pravidla a model. Počet slidů a timing viz `outline.md`; ověřené build stavy viz `html/review/archaeology/report.json`.

Otevři `html/index.html` v prohlížeči — funguje offline ze souboru, bez serveru a CDN.

| Klávesa | Akce |
|---|---|
| → ↓ mezerník Enter PageDown, klik vpravo, swipe | další krok / slide |
| ← ↑ Backspace PageUp, klik vlevo | zpět |
| F | celá obrazovka |
| N | poznámky řečníka + časovač (T = reset) |
| O | přehled všech slidů (Esc / klik = návrat) |
| P / Shift+P | tisk všech slidů (finální stav buildů) / včetně poznámek |
| ? | nápověda |
| Spodní historické zastávky | skok na začátek dané éry |
| Spodní posuvník | libovolný slide, vždy od prvního buildu |
| Tab, Enter; šipky na posuvníku | přístupné ovládání navigace (Esc vrátí klávesy prezentaci) |

Deeplink: `index.html#/7/2` = slide 7, krok 2.

| Soubor | Co |
|---|---|
| `html/slides.js` | obsah slidů (HTML/SVG), builds přes `data-step` / `data-until` / `data-on` |
| `html/notes.js` | nové speaker notes podle id slidu; mluvený tahák + technické nuance |
| `html/style.css` | černobílý systém: #FFFFFF / #161616 / #666666, Avenir Next → Segoe UI → Helvetica |
| `html/app.js` | navigace, notes, přehled, tisk, škálování 1600×900 |
| `html/doodles.js` | vlastní editovatelné SVG kresby pro historické zastávky |
| `html/qr.js` | vygenerovaný SVG QR na Transformer Explainer |
| `html/assets/` | vlastní černobílé SVG ilustrace + archiv starších Skullpix pokusů |
| `html/stoparuv-pruvodce-po-llms.pdf` | starší PDF export před archeologickým refactorem (26 stran); hlavní verze je HTML |

Opening má čtyři snímky: titul, praktik Pavel Lorenz, motivace archeologického průzkumu a mapa „Back to the roots“. Historie z issue #1 nyní tvoří páteř příběhu: u zastávky řešíme problém, zlepšení a zbývající limit. Word2vec je související větev, nikoli přímý technický předek Transformeru.

### Spodní timeline

Deset zastávek je stále vidět pod prezentací. Aktuální má plný černý bod a tučný název, minulé body jsou šedé, budoucí obrysové. Na openingu není vybraná žádná éra. Klik na bod otevře první slide s příslušným `era` v `slides.js`; slider pod osou prochází všechny slidy. Rozestupy jsou navigační, ne proporcionální rokům; jde o mapu výpravy, ne úplný rodokmen modelů. Na mobilu lze osu horizontálně posouvat a aktivní bod se sám ukáže.

Timeline má vyhrazené místo a nepřekrývá slide. V přehledu se schová; v tisku má každý snímek vlastní statickou osu. Klávesnice, hash odkazy, poznámky a offline režim zůstávají funkční.

### Úpravy a regenerace

- Deck nemá build krok: uprav `slides.js` / `notes.js` / `style.css` a obnov stránku.
- QR kód (jen při změně URL), z `deck/` kvůli nainstalovanému `qrcode`:
  `node -e "require('qrcode').toString('https://poloclub.github.io/transformer-explainer/',{type:'svg',margin:4,color:{dark:'#161616',light:'#FFFFFF'}},(e,s)=>require('fs').writeFileSync('../html/qr.js','window.QR_SVG = '+JSON.stringify(s)+';\\n'))"`
- Pixel-art ilustrace: viz `html/assets/README.md` (Skullpix).
- PDF: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --print-to-pdf=html/stoparuv-pruvodce-po-llms.pdf "file://$PWD/html/index.html#/1"` (nebo v prohlížeči P / Shift+P s poznámkami).

### Ověření

Reprodukovatelná kontrola otevřeného decku přes Chrome DevTools CLI: `python3 scripts/review-html.py --page 2 --all-states --output html/review/archaeology` (číslo stránky uprav podle `chrome-devtools list_pages`). Ukládá screenshoty a kontroluje všechny stavy, notes, timing, přetékání a synchronizaci timeline. Interakce a mobilní rozložení: `python3 scripts/review-navigation.py --page 2`.

Ověřování: prez-astra přes Chrome DevTools (`scripts/review-html.py`, všechny build stavy, konzole, notes, stage 1280×720, mobilní emulace, přehled); prez-opus headless screenshoty. Aktuální výsledek kontroly je v `html/review/archaeology/report.json` a na konci `tech-review.md`. Neověřeno: projektor a prezentační počítač — před přednáškou proklikat.

Vizuální směr: černobílý zápisník z výpravy, vlastní linkové SVG kresby a jednoduchá schémata. Karpathyho technická tabule (sources.md S13) zůstává inspiračním zdrojem a doplňujícím videem.

PPTX níže je starší artefakt, dál se negeneruje.

## Soubory

| Soubor | Co to je | Vlastník |
|---|---|---|
| `deck/stoparuv-pruvodce-po-llms.pptx` | starší fallback deck v2 (schválen technickou a vizuální oponenturou, viz tech-review.md) se speaker notes ke každému snímku | prez-opus |
| `deck/build.js` | editovatelný zdroj — všechny texty, diagramy, notes, data | prez-opus |
| `deck/render/*.pdf`, `sheet-*.jpg` | render pro vizuální kontrolu | prez-opus |
| `outline.md` | osnova s timingem | prez-opus |
| `tech-review.md` | technická oponentura po slidech | prez-astra |
| `sources.md` | zdroje S1–S26 a původ historických ukázek | prez-astra |
| `coordination.md` | log spolupráce (append-only) | oba |
| `zadani.md`, `prompt-*.md` | původní zadání, beze změn | — |

## Starší PPTX: regenerace

```bash
cd deck
npm install          # pptxgenjs, qrcode
node build.js        # → stoparuv-pruvodce-po-llms.pptx
# vizuální kontrola (LibreOffice: brew install --cask libreoffice)
/Applications/LibreOffice.app/Contents/MacOS/soffice --headless --convert-to pdf --outdir render stoparuv-pruvodce-po-llms.pptx
pdftoppm -jpeg -r 110 render/stoparuv-pruvodce-po-llms.pdf render/slide
```

Žádné externí assety: diagramy jsou nativní PowerPoint tvary (editovatelné), QR kód se generuje při buildu.

## Starší PPTX: vizuální systém

- Pozadí `0A0B0D`, text `ECE9E2`, tlumená `8A8F98`, linky `2E333B`, jeden akcent amber `FF9F1C`.
- Amber = pravděpodobnostní část / to, na co se právě díváme. Bílá = deterministická část.
- Fonty: **Arial** (nadpisy, text) + **Courier New** (tokeny, kód, diagramy) — běžně dostupné na Macu i Windows. Přesto deck před přednáškou otevřít na prezentačním stroji a proklikat (kontrola proběhla nad LibreOffice rendery, ne v desktop PowerPointu).
- Všechny texty, diagramy (nativní tvary) i speaker notes jsou v PPTX editovatelné; pro větší změny ale upravovat `build.js` a přegenerovat.
- Motiv: ořezové značky v rozích (technický blueprint), mono štítek sekce vlevo nahoře.

## Starší PPTX: struktura a builds

Animace nejsou použité; postupné odkrývání je řešené navazujícími slidy (28 snímků, 22 „logických“ slidů):
`Kočka sedí na …` (2), `2837 × 491` (2), `Tak mu dejme nástroje` (3). Timing je v `outline.md` a v hlavičce notes každého slidu.

## Živá ukázka

Po slidu **A teď hodíme kostkou** (id `kostka`): [Transformer Explainer](https://poloclub.github.io/transformer-explainer/) — posunout temperature slider. Max 1 min (bere z rezervy). Stránku otevřít a načíst předem; když nepojede Wi-Fi, stačí statické bary na slidu.

## Pravidla obsahu

Každé zjednodušení je v notes označené `ZJEDNODUŠENÍ PRO VYSVĚTLENÍ`. Ilustrativní čísla jsou označená přímo na slidu. Tokenizace (o200k_base) a výsledek 2837 × 491 = 1 392 967 jsou skutečně spočítané.

## Stav

- v1: deck vygenerován, zapracováno tech review k osnově.
- v2: zapracováno review decku v1 (tech-review.md, sekce „Deck v1“): kauzální maska v attention, softmax viditelně, loop zpět do tokenů, ilustrativní čísla v trainingu, zpětné šipky v architektuře, formulace v notes, klikatelné odkazy, QR s okrajem 4.
- **Finální po review** (4. 10. 2026): Astra v2 schválila bez blokujících připomínek; SHA-256 PPTX `154cde47…`. Neověřeno: desktop PowerPoint, projektor, živé demo Explaineru (záloha = statický slide 08).
