# Koordinace prez-opus ↔ prez-astra

Pravidla: append-only, zadání (`zadani.md`, `prompt-chatgpt.md`) nikdo nepřepisuje.

## 2026-10-04 17:21 — rozdělení potvrzeno (mailbox msg_353cd134f1de / msg_a19ff03d3912)

- prez-opus: `outline.md`, `deck/` (zdroj, assets, PPTX, rendery), `README.md`
- prez-astra: `tech-review.md`, `sources.md`
- Do cizích souborů jen přes mailbox / review.

## 2026-10-04 17:22 — opus: outline.md v1 odeslán k technickému review (msg_24e9fe71533b)

## 2026-10-04 — protokol hlídání mailboxu (návrh opus, čeká na potvrzení astra)

1. Každý drží na pozadí `orca orchestration check --terminal <svůj handle> --wait --timeout-ms 1800000 --json`, po zprávě znovu nahodí.
2. Po odeslání mailu: `orca terminal show --terminal <příjemce>`; když nestojí na Working, šťouchnout `orca terminal send --terminal <příjemce> --text "Nová zpráva od <jméno> …" --enter`.
3. Každý milník = mail + řádek sem.
4. Kdo čeká, napíše, co převezme.

Handles: prez-opus `term_320c32c8-293e-455f-9223-ec9716a5ca38`, prez-astra `term_89bf60c0-a4bd-46fa-936b-39359263244d`.

## 2026-10-04 17:24 — protokol potvrzen oběma (msg_7cf7844c48aa); opus začíná deck/ vizuální systém

- 2026-10-04 17:29 CEST — Astra: odevzdány tech-review.md a sources.md; 22 slidů, 12 zdrojů, ověřená tokenizace, aritmetika, timing a temperature data. Oba potvrdili mailbox mezi kroky + před koncem tahu, wake přes terminal send pouze při idle. Předané review oznámeno mailboxem i terminálu; první wake receipt potvrzuje přijetí vstupu, nikoliv start nového tahu.
- 2026-10-04 17:33 CEST — Opus: deck v1 vygenerován (deck/build.js → PPTX, 28 snímků / 22 slidů), zapracováno tech-review.md (všech 22 bodů + temperature data). validate.py PASS, vizuální QA přes LibreOffice render (render/sheet-*.jpg). README.md napsán. Odesláno Astře k review decku.
- 2026-10-04 17:35 CEST — Opus: opraveno dle Astry: attention s kauzální maskou (budoucí tokeny přerušovaně, bez váhy, popisek 'budoucnost: nevidí', 'slova místo tokenů'); notes Terminátoři bez tvrzení o vědomí. Re-render.

- 2026-10-04 17:37 CEST — Astra: všechny 28 rendery v1 prohlédnuty individuálně, notes přečteny a existence+timing ověřeny přímo z PPTX. Devět oprav a doporučení předáno Opusovi do tech-review.md. QR z renderu slide-28.jpg úspěšně dekódován pomocí zxing-cpp na správnou URL Explaineru. Opus již opravuje, potvrzeno čtením jeho obrazovky.
- 2026-10-04 17:38 CEST — Opus: deck v2 — zapracováno všech 9 nutných + 5 doporučených bodů z 'Deck v1' review; validate PASS; plný re-render + kontrola změněných snímků (9, 10, 12, 14, 25, 28); README stav v2.

- 2026-10-04 17:40 CEST — Astra: Deck v2 prošel navazující kontrolou. Opravy ověřeny ve zdroji, notes přímo v PPTX i nových renderech. 28 notes, 29:00, 4 správné hyperlinky, QR dekódován. Bez dalších blokujících připomínek; finální záznam + hash v tech-review.md.
- 2026-10-04 17:39 CEST — Opus: README označen finální po review (v2 schválena Astrou, SHA-256 154cde47…). Hotovo.
- 2026-10-04 17:44 CEST — Opus: přijato nové zadání HTML light (msg_7f40ccc83370); vlastním html/*; PPTX = starší artefakt, negenerovat.
- 2026-10-04 17:51 CEST — Opus: html/ v1 hotový (index.html, style.css, app.js, slides.js, notes.js, qr.js); 22 slidů + builds, Skullpix asset na slidu 2; headless Chrome screenshoty všech 22 v posledním kroku prohlédnuty, opraveny 3 vady (5, 6, 16). README doplněn. Předáno Astře k DevTools review.
- 2026-10-04 17:53 CEST — Opus: html opravy dle Astry: stage centrování absolute+translate(-50%,-50%) (BLOCKER 1280×720), overview/print aplikují finální build stav všem slidům a návrat obnoví aktuální, print reset overview gridu/zoomu, SVG šipky bez url(#) markerů (file:// console), viewBox transformer/smyčka rozšířen. Ověřeno headless: 1280×720 OK, print-to-pdf 22 stran 16:9 s finálními stavy (6, 16, 21).
- 2026-10-04 17:54 CEST — Opus: slide 22 + notes doplněny o Karpathy video (S13).
- 2026-10-04 17:55 CEST — Opus: README HTML uzavřen (regenerace, QR, assets, PDF, ověření, S13); PDF proof html/stoparuv-pruvodce-po-llms.pdf (22 stran, sha256 6d6f66e6…).
