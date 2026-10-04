# Outline — Stopařův průvodce po LLMs

Vlastník: prez-opus. Technické review: prez-astra (`tech-review.md`).
Stav: v1 + tech review zapracované do `deck/build.js` (deck v1). Zdroj pravdy pro texty je teď generátor; tato osnova drží strukturu a timing.

Cíl: 29:00 obsah + 1:00 rezerva (živé demo / smích / zdržení) = 30:00.
Značka **[Z]** = zjednodušení pro vysvětlení, ve speaker notes bude explicitně označené.

## Dramaturgie

Jeden objekt prochází celou přednáškou: černá krabička `prompt → LLM → answer`.
Act I ji otevřeme, Act II rozebereme na šroubky, Act III ukážeme, kde to skřípe,
Act IV kolem ní postavíme software. Finále = stejná krabička, ale už víme, co v ní je.

Running gags (dávkovat): DON'T PANIC, „pootočíme pár miliard knoflíků", 42 (jen jednou, u distribuce).

## I. Otevíráme krabičku — 2:30

| # | Slide | Pointa | Čas |
|---|-------|--------|-----|
| 1 | DON'T PANIC | Zničí nás AI? Myslí? Ví? → lidé se bojí toho, čemu nerozumí. Tak to rozebereme. | 1:30 |
| 2 | Šroubovák | Černá krabička LLM + šroubovák. „Většina věcí už po mně nefungovala." | 1:00 |

## II. Rozebíráme — 14:00

| # | Slide | Pointa | Čas |
|---|-------|--------|-----|
| 3 | Kočka sedí na … | Pauza pro publikum → „Gratuluju, právě jste byli language model." | 1:15 |
| 4 | LLM nevidí text | Věta rozpadlá na tokeny (CZ vs EN: čeština se tokenizuje hůř). | 1:15 |
| 5 | Tokeny → čísla | Token ID → vektor. Podobné věci mají podobné vektory. Žádná „mapa významu". **[Z]** | 1:15 |
| 6 | Attention | Na které předchozí tokeny se při zpracování tohoto dívat? Ukázka se zájmenem. Q/K/V jen v notes. **[Z]** | 1:45 |
| 7 | Transformer | attention + MLP, opakováno N×. Žádná databáze odpovědí, jen parametry. **[Z]** | 1:00 |
| 8 | Co vypadne | logits → softmax → distribuce (střeše 31 %, gauči 18 % …). Klíčový slide. | 1:15 |
| 9 | Hodíme kostkou | Sampling. Kostka, která před každým hodem změní strany. Temperature = tvar distribuce, ne „kreativita". | 1:45 |
| 10 | A znovu. A znovu. | Autoregresivní smyčka context → prediction → token ↺. Krabička je teď celá rozebraná (build). | 0:45 |
| 11 | Tak proč je to chytré? | Dobrá predikce dalšího tokenu vyžaduje zachytit obrovské množství struktur v datech. Opatrně, bez „model světa" jako faktu. | 1:15 |
| 12 | Training | Predikce vs. správný token → chyba → malá úprava parametrů → opakuj. „Pár miliard knoflíků." + post-training (chat model ≠ čistý LM). **[Z]** | 1:15 |
| 13 | LLM jako JPEG? | Ztrátová komprese jako intuice: parametry nejsou databáze dokumentů. Explicitně: LLM není JPEG, je to analogie. **[Z]** | 1:15 |

## III. Kde to skřípe — 3:30

| # | Slide | Pointa | Čas |
|---|-------|--------|-----|
| 14 | Proč halucinuje? | Úkol = věrohodné pokračování. „Nevím" není vestavěný výstup ani přístup k autoritativním faktům. Post-training a tools pomáhají, generování samo pravdivost neřeší. **[Z]** | 2:00 |
| 15 | 2837 × 491 = ? | Kde jste v tom stroji viděli násobičku? Umí vzory, ne garantovanou aritmetiku → calculator tool. „Když mám kalkulačku, použiju kalkulačku." **[Z]** | 1:30 |

## IV. Stavíme kolem toho software — 9:00

| # | Slide | Pointa | Čas |
|---|-------|--------|-----|
| 16 | Dejme mu nástroje | Build: LLM → +context → +retrieval (RAG) → +tools → +state → agent. RAG nenahrává znalosti do modelu, vkládá je do kontextu. LLM není celý agent. | 3:00 |
| 17 | Dva světy | DETERMINISTIC vs PROBABILISTIC — co patří kam. | 1:15 |
| 18 | Špatně | `birth_date → LLM → "ano"` vs `birth_date → code → true/false`. | 1:00 |
| 19 | Dobře | „No paráda, zase mi to přišlo rozbitý." → complaint/praise/question. Tady if/else prohraje. | 1:00 |
| 20 | Best of both worlds | Architektura: LLM + deterministic tools + knowledge + VALIDATION. | 1:30 |
| 21 | DON'T PANIC | Poctivé uzavření rizik (viz níže) + „It's just software. Very weird software." + certainty vs probability. | 1:15 |
| 22 | Resources | Transformer Explainer (QR) + 3–4 primární zdroje. Visí během Q&A. | 0:00 |

**Součet: 2:30 + 14:00 + 3:30 + 9:00 = 29:00 + 1:00 rezerva = 30:00.**

## Uzavření rizik (slide 21)

Odpověď na úvodní „zničí nás Terminátoři?" nesmí být falešné uklidnění.
Formulace: rozumět mechanismu ≠ důkaz, že systém je bezpečný. Rizika existují,
ale jsou to hlavně rizika toho, *jak* LLM nasazujeme: jaké nástroje a oprávnění
mu dáme, co validujeme, kde necháme člověka. DON'T PANIC ≠ don't care.

## Živá ukázka

Transformer Explainer (https://poloclub.github.io/transformer-explainer/) po slidu 9:
posunout temperature slider a ukázat, jak se mění distribuce. Max 1 min, bere z rezervy.
Záložní varianta (bez Wi-Fi): slide 9 má statické temperature bary.

## Otevřené otázky pro Astru

1. Slide 4: konkrétní tokenizer pro ukázku (tiktoken o200k_base?), ať čísla sedí.
2. Slide 8: čísla distribuce — reálný výstup malého modelu, nebo ilustrativní (označit)?
3. Slide 11: bezpečná formulace emergentních schopností + zdroj.
4. Slide 14: zdroj k halucinacím (např. OpenAI „Why language models hallucinate", 2025).
5. Slide 9 notes: nedeterminismus i při temperature 0 (batching, floating point) — zdroj.
