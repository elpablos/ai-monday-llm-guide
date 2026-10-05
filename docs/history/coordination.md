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

## Narativní refactor — 4. 10. večer

Pavel zadal přímo implementaci na `main`: od autocomplete přes pretraining, instruction tuning a preference k asistentovi; zachovat limity a engineering pointu. Opus vlastní HTML obsah, notes, outline, README; Astra zdroje, faktické review a Chrome DevTools QA. Bez změn starého PPTX. Vybrané primární historické ukázky: GPT-2 (2019), tabulka 13, a GPT-3/InstructGPT (2022), obr. 42. Krátká česká shrnutí, žádné smyšlené historické výstupy. A/B preference zůstává explicitně vlastní ilustrace. Cílový čas 29 minut + minuta rezervy.
- 2026-10-04 21:29 CEST — Opus: narativní refactor HTML hotový k QA: 24 slidů / 29:00 (notes ⏱ i outline sečteno). Nové: motor, gpt2, base-model, instruction, preference, zaba-po, evoluce, porad-token, aktualni, agent; věk a sarkasmus zvlášť (původní příklady). Pryč: tokeny, embeddings, attention, transformer, JPEG, proc-chytre, nastroje, dva-svety. Zapracovány všechny Astřiny opravy (žába obr42, GPT-2 tab13, S15/S16, notes tech pass). Headless screenshoty všech 24 prohlédnuty. Necommitováno.
- 2026-10-04 21:30 CEST — Opus: finální formulace dle Astry (gpt2, halucinace, aktualni na slidech; instruction/preference/aktualni/halucinace/zdroje v notes, bez římského fóra); outline sladěn; PDF html/stoparuv-pruvodce-po-llms.pdf přegenerováno (24 stran). Necommitováno.
- 2026-10-04 21:33 CEST — Opus: Resources = Explainer, GPT-2 (S14), InstructGPT, Karpathy; PDF přegenerováno (24 stran). slides+notes předány Astře; README/outline vlastní Astra. Necommitováno.

### Narativní refactor — integrace a QA
- prez-opus: 24slidový příběh, krátké notes, nové historické momenty, HTML PDF.
- prez-astra: primární zdroje a limity historických tvrzení, obsahové review, Chrome DevTools kontrola všech 75 build states, vizuální kontrola HTML/PDF, sjednocení README a časů v osnově.
- Výsledek: 29:00 + 1:00 rezerva, technické review aktualizováno; bez zjištěných regresí. Živý dry-run zůstává na řečníkovi.
- 2026-10-04 21:53 CEST — Opus (issue #1, branch issue-1-language-model-history): 3 historické slidy shannon/ngramy/neuronove po smyčce, porad-token odstraněn, timing 2:15+5:45+3:30+8:00+4:00+5:30 = 29:00; outline.md generovaný z ⏱ v notes. PDF až po review. Necommitováno.
- 2026-10-04 21:55 CEST — Opus (issue #1): neuronove přepracováno (word2vec jako vedlejší větev, finále „Stará myšlenka. Lepší metody, víc dat a výpočtu.“), notes S17–S24 + Claude callback (WIRED, volitelně 10 s), most evoluce→halucinace doslovně, mluvený text zkrácen u 11 slidů; 29:00; outline přegenerován.
- 2026-10-04 21:56 CEST — Opus (issue #1): přesnosti notes dle Astry (kočka/kotě „může naučit“, word2vec Google ne Brno, aktualni podmínka, „Kočka“, ngram POINTA, delší historie, limity drahý trénink + RNN krok za krokem, 62,5/25/12,5 %). Stabilní snapshot pro QA.
- 2026-10-04 21:58 CEST — Opus (issue #1): PDF html/stoparuv-pruvodce-po-llms.pdf přegenerováno, 26 stran 16:9, prohlédnuto celé (grid) + detail kostky; slides+notes předány Astře.

- prez-astra: finální review issue #1, 85 build states bez chyb, všechny rendery prohlédnuty; doplnění S17–S24, README, výsledků QA a CLI volby --output. Připraveno k PR z issue-1-language-model-history do main, bez přímých změn main.
- 2026-10-05 10:44 CEST — Opus: archeologický deck obsah FREEZE: 31 slidů s era, notes 29:00, outline přegenerován po érách; B/W stickery llm-open-box-bw + shovel-bw (assets/README doplněn); opening zjednodušen dle Astry, Bengio obrázek, Markov S/K, rozdělení z četností 62,5/25/12,5.
- 2026-10-05 10:45 CEST — Opus: notes tech opravy dle Astry (attention ≠ novinka 2017, GPT-like motor, GPT 2018 vs dnešní měřítko, přechody motor/gpt2/smyčka, motivace bez BERT v práci). FINÁLNÍ FREEZE.

- 2026-10-05 — prez-astra: lokální main fast-forward na hotovou historii PR #2; nový runtime timeline (10 zastávek + slider), černobílé CSS, vlastní doodles.js, zdroje S25–S26. Opus převzal slides/notes/outline a Skullpix; po obsahovém review proběhlo zjednodušení openingu a přesnost historie. Finální Chrome DevTools QA: 31 slidů / 93 stavů / 29:00, bez nalezených problémů; vizuální průchod všech stavů a funkční test navigace.
- 2026-10-05 11:21 CEST — Opus: 3 SVG ilustrace (robot-guide, opened-llm, archaeology) hotové + assets/README doplněn; kontrola v kontextu slidů 1–3 OK. Assets FREEZE.
- 2026-10-05 — vizuální připomínky: prez-opus vytvořil robot-guide.svg, opened-llm.svg a archaeology.svg; prez-astra upravil titul/callback, zvětšil piktogramy na190px, integroval kresby a zkontroloval93stavů přes Chrome DevTools (bez nálezů).

## 2026-10-05 — úklid repozitáře

Odstraněný starý PPTX projekt a jeho rendery/závislosti, nepoužívané varianty ilustrací a lokální screenshoty. Stav před úklidem je dohledatelný v Gitu pod `ee49094`. Původní zadání, prompty a tento log přesunuty beze změn obsahu do `docs/history/`. HTML je jediná udržovaná verze.
