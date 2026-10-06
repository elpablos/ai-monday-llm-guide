# AI Monday — Stopařův průvodce po LLMs

Přednáška v češtině, cca 30 minut, AI Monday 5. 10. 2026.

## HTML deck (aktuální)

31 slidů, 95 stavů odkrývání, 29 minut obsahu + minuta rezervy. Aktuální verze: černobílý archeologický průvodce. Praktik otevírá dnešní krabičku a sleduje její kořeny: Markov → Shannon → n-gramy → naučené reprezentace a kontext → Transformer → GPT → asistent → nástroje → přesná pravidla a model. Počet slidů a timing viz `outline.md`; ověřené build stavy viz `html/review/archaeology/report.json`.

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
| `html/assets/` | sedm používaných černobílých ilustrací (PNG/SVG), původ viz vlastní README |

Opening má čtyři snímky: titul, praktik Pavel Lorenz, motivace archeologického průzkumu a mapa „Back to the roots“. Historie z issue #1 nyní tvoří páteř příběhu: u zastávky řešíme problém, zlepšení a zbývající limit. Word2vec je související větev, nikoli přímý technický předek Transformeru.

### Spodní timeline

Deset zastávek je stále vidět pod prezentací. Aktuální má plný černý bod a tučný název, minulé body jsou šedé, budoucí obrysové. Na openingu není vybraná žádná éra. Klik na bod otevře první slide s příslušným `era` v `slides.js`; slider pod osou prochází všechny slidy. Rozestupy jsou navigační, ne proporcionální rokům; jde o mapu výpravy, ne úplný rodokmen modelů. Na mobilu lze osu horizontálně posouvat a aktivní bod se sám ukáže.

Timeline má vyhrazené místo a nepřekrývá slide. V přehledu se schová; v tisku má každý snímek vlastní statickou osu. Klávesnice, hash odkazy, poznámky a offline režim zůstávají funkční.

### Úpravy a regenerace

- Deck nemá build krok: uprav `slides.js` / `notes.js` / `style.css` a obnov stránku.
- Ilustrace a jejich původ: `html/assets/README.md`. Diagramy jsou přímo v `slides.js` a `doodles.js`.
- QR kód v `html/qr.js` je uložený SVG, bez runtime závislostí. Při změně URL jej lze obnovit z kořene repa (Node.js + npm):

  ```sh
  npx --yes --package qrcode@1.5.4 qrcode -t svg -q 4 -d 161616 -l FFFFFF -o /tmp/ai-monday-qr.svg "https://poloclub.github.io/transformer-explainer/"
  node -e "const fs=require('fs'); fs.writeFileSync('html/qr.js', 'window.QR_SVG = ' + JSON.stringify(fs.readFileSync('/tmp/ai-monday-qr.svg','utf8')) + ';\n')"
  ```

- PDF: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --print-to-pdf=html/stoparuv-pruvodce-po-llms.pdf "file://$PWD/html/index.html#/1"` (nebo v prohlížeči P / Shift+P s poznámkami).

### Ověření

Reprodukovatelná kontrola otevřeného decku přes Chrome DevTools CLI: `python3 scripts/review-html.py --page 2 --all-states --output html/review/archaeology` (číslo stránky uprav podle `chrome-devtools list_pages`). Screenshoty z review a PDF exporty jsou lokální generované soubory, které Git ignoruje; JSON reporty zůstávají verzované. Skript ukládá screenshoty a kontroluje všechny stavy, notes, timing, přetékání a synchronizaci timeline. Interakce a mobilní rozložení: `python3 scripts/review-navigation.py --page 2`.

Ověřování: prez-astra přes Chrome DevTools (`scripts/review-html.py`, všechny build stavy, konzole, notes, stage 1280×720, mobilní emulace, přehled); prez-opus headless screenshoty. Aktuální výsledek kontroly je v `html/review/archaeology/report.json` a na konci `tech-review.md`. Neověřeno: projektor a prezentační počítač — před přednáškou proklikat.

Vizuální směr: černobílý zápisník z výpravy, vlastní linkové SVG kresby a jednoduchá schémata. Karpathyho technická tabule (sources.md S13) zůstává inspiračním zdrojem a doplňujícím videem.

## Podklady

- `outline.md` — osnova a timing.
- `sources.md` — ověřené zdroje S1–S27 a původ ilustrací.
- `tech-review.md` — technická kontrola a historie ověřování.
- `docs/history/` — původní zadání, prompty a koordinační log.
- `scripts/` — opakovatelné kontroly HTML přes Chrome DevTools.

Starý PowerPoint projekt, jeho závislosti, nepoužívané ilustrace a exporty byly odstraněny. Předchozí soubory jsou dohledatelné v historii Gitu (stav před úklidem: `ee49094`). HTML je jediná udržovaná verze prezentace.

## Živá ukázka

Po slidu **A teď hodíme kostkou** (id `kostka`): [Transformer Explainer](https://poloclub.github.io/transformer-explainer/) — posunout temperature slider. Max 1 min (bere z rezervy). Stránku otevřít a načíst předem; když nepojede Wi-Fi, stačí statické bary na slidu.

## Pravidla obsahu

Každé zjednodušení je v notes označené `ZJEDNODUŠENÍ PRO VYSVĚTLENÍ`. Ilustrativní čísla jsou označená přímo na slidu. Tokenizace (o200k_base) a výsledek 2837 × 491 = 1 392 967 jsou skutečně spočítané.

## GitHub Pages — nasazení tagem

Workflow `.github/workflows/pages.yml` publikuje verzi označenou novým tagem `v*`. Push do `main` sám nic nenasazuje. Každý nový tag aktualizuje jednu společnou adresu webu, nevytváří samostatný web pro každou verzi.

Před prvním nasazením nastav v GitHub Settings → Pages zdroj **GitHub Actions**. Pro privátní osobní repozitář je potřeba tarif podporující Pages (např. Pro). V environmentu `github-pages` povol deployment tagů `v*`, pokud má nastavené omezení větví/tagů.

```sh
git tag -a v1.0 -m "AI Monday presentation v1.0"
git push origin v1.0
```

Výsledná adresa: https://elpablos.github.io/ai-monday-llm-guide/ . Prezentace včetně poznámek řečníka i zdrojový repozitář jsou veřejné. Historie zadání, review reporty a ostatní dokumenty se nepublikují.

Lokální kontrola balíčku: `python3 scripts/package-pages.py`. Výstup `_site/` je ignorovaný Gitem. Otevři `_site/index.html` nebo jej obsluž přes `python3 -m http.server --directory _site 8000`.

## Licence

Projekt je dostupný pod [MIT licencí](LICENSE). Copyright © 2026 Pavel Lorenz. Licence se nevztahuje na obsah externích odkazovaných zdrojů; jejich původ uvádí `sources.md`.
