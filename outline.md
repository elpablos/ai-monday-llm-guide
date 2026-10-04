# Outline — Stopařův průvodce po LLMs

Vlastník: prez-opus. Technické review: prez-astra (`tech-review.md`, `sources.md`).
Zdroj pravdy pro texty: `html/slides.js` + `html/notes.js`. Časy v této osnově jsou převzaté z ⏱ v notes.

Cíl: 29:00 obsah + 1:00 rezerva (živé demo / zdržení) = 30:00.

## Příběh

Autocomplete → minimum motoru → rozdělení, kostka, smyčka → tahle hra je stará (Shannon, n-gramy,
neuronové LM, Transformer) → pretraining → base model není asistent → formát konverzace, preference →
co z toho plyne (halucinace, počítání, chybějící znalosti) → nástroje a agent → pravidlo vs. jazyk →
deterministic software + probabilistic capabilities → DON'T PANIC.

## I. Otevíráme krabičku — 2:15

| id | Slide | Pointa | Čas |
|---|---|---|---|
| dont-panic | DON'T PANIC + otázky | Bojíme se toho, čemu nerozumíme. | 1:15 |
| sroubovak | Šroubovák (Skullpix) | Rozebereme krabičku. | 1:00 |

## II. Motor — 5:45

| id | Slide | Pointa | Čas |
|---|---|---|---|
| kocka | Kočka sedí na … | Právě jste byli language model. Našeptávač. | 1:15 |
| motor | Co je uvnitř? Jen minimum. | text → tokeny → čísla → síť → skóre; attention jedna věta. | 1:45 |
| rozdeleni | Vypadne rozdělení | Výstup = pravděpodobnosti dalšího tokenu (ilustrace). | 1:00 |
| kostka | Hodíme kostkou | Stochastický ≠ chaos (ilustrace). | 1:00 |
| smycka | A znovu. A znovu. | Generování = smyčka. | 0:45 |

## III. Historie: rampa k pretrainingu — 3:30

| id | Slide | Pointa | Čas |
|---|---|---|---|
| shannon | Tuhle hru hrajeme od roku 1951 | Shannon: hádej další písmeno; Markov 1913 jednou větou. | 1:00 |
| ngramy | N-gramy | Četnosti → rozdělení; kočka ≠ kotě; backoff. | 1:15 |
| neuronove | Každá generace řešila limit té předchozí | Bengio 2003 → Mikolov 2010 → Transformer 2017; word2vec 2013 bokem. | 1:15 |

## IV. Z doplňovače asistent — 8:00

| id | Slide | Pointa | Čas |
|---|---|---|---|
| pretraining | Z textu. Hodně textu. | Malé opravy × biliony; učí se jazyk, fakta, kód, styl, vztahy. | 1:30 |
| gpt2 | GPT-2, 2019 | Rozvíjí zadanou fikci (shrnutí, tab. 13). | 1:15 |
| base-model | Base model není asistent | Žába: base píše další zadání (shrnutí, obr. 42). | 1:15 |
| instruction | Formát konverzace | Pořád doplňuje dokument; dokument je konverzace (ilustrace). | 1:00 |
| preference | Která odpověď je lepší? | Hodnotitelé vybírají (ilustrace). | 1:15 |
| zaba-po | Stejný prompt po post-trainingu | Stejný motor, jiné chování (obr. 42). | 1:00 |
| evoluce | Tři kroky k chatbotovi | Nejdřív pokračovat v textu, pak jak pokračovat, když něco chceme. | 0:45 |

## V. Kde to skřípe — 4:00

| id | Slide | Pointa | Čas |
|---|---|---|---|
| halucinace | Zní to jako odpověď | Zní to jako odpověď ≠ zaručená pravda. | 1:15 |
| pocitani | 2837 × 491 | Když mám kalkulačku, použiju kalkulačku. | 1:15 |
| aktualni | Co v tréninku nenajde | Najdeme podklady, přidáme je k otázce. | 1:30 |

## VI. Software kolem — 5:30

| id | Slide | Pointa | Čas |
|---|---|---|---|
| agent | Agent? Tohle ve smyčce. | LLM je součástka. | 1:00 |
| spatne | Dosáhl 18 let? | Pravidlo napiš jako pravidlo. | 1:15 |
| dobre | Je to stížnost? | Jazyk nech modelu. | 1:15 |
| architektura | Deterministic software + probabilistic capabilities | Autorizace před akcí, validace výstupu. | 1:00 |
| terminatori | Terminátoři → DON'T PANIC | Znalost mechanismu ≠ bezpečnost; DON'T PANIC ≠ don't care. | 1:00 |
| zdroje | Kam dál | QR Explainer, GPT-2, InstructGPT, Karpathy. | 0:00 |

**Součet: 2:15 + 5:45 + 3:30 + 8:00 + 4:00 + 5:30 = 29:00.**

## Živá ukázka

Transformer Explainer po slidu `kostka` (temperature slider), max 1 min z rezervy. Záloha: statické bary.
