# Outline — Stopařův průvodce po LLMs (archeologická verze)

Vlastník: prez-opus. Technické review: prez-astra (`tech-review.md`, `sources.md`).
Zdroj pravdy: `html/slides.js` + `html/notes.js`; časy převzaté z ⏱ v notes, sekce = `era` slidů.

Cíl: 29:00 obsah + 1:00 rezerva = 30:00. Každá zastávka: problém → zlepšení → limit.

## Úvod (era: null) — 3:00

| id | Slide | Pointa | Čas |
|---|---|---|---|
| dont-panic | Titul | Stopařův průvodce, Pavel Lorenz, AI Monday #17; Terminátoři či transformátoři + robůtek. | 0:45 |
| o-mne | Kdo vám to dneska vypráví? | Staff engineer, praktik; rozebírám věci (sticker). | 0:45 |
| motivace | Zničí nás? Nahradí nás? | Než se bát, podívat se dovnitř; tři vrstvy průzkumu. | 1:00 |
| back-to-roots | Back to the roots | Deset zastávek: problém → zlepšení → limit. | 0:30 |

## Markov (era: markov) — 0:45

| id | Slide | Pointa | Čas |
|---|---|---|---|
| markov | 1913 Markov | Další symbol závisí na předchozím; limit: kousek zpět, žádný význam. | 0:45 |

## Shannon (era: shannon) — 2:15

| id | Slide | Pointa | Čas |
|---|---|---|---|
| kocka | Kočka sedí na … | Hra s publikem: právě jste byli language model. | 1:15 |
| shannon | 1948/51 Shannon | Hádání dalšího písmene; limit: hádá člověk. | 1:00 |

## n-gramy (era: ngrams) — 2:15

| id | Slide | Pointa | Čas |
|---|---|---|---|
| ngramy | n-gramy | Četnosti, backoff; limit: kočka ≠ kotě. | 1:30 |
| rozdeleni | Vypadne rozdělení | Z četností rozdělení; princip zdědily dnešní modely. | 0:45 |

## Bengio (era: bengio) — 0:45

| id | Slide | Pointa | Čas |
|---|---|---|---|
| bengio | 2003 Bengio | Naučené vektory; limit: pevné okno, drahý trénink. | 0:45 |

## Mikolov (era: mikolov) — 0:45

| id | Slide | Pointa | Čas |
|---|---|---|---|
| mikolov | 2010 Mikolov (Brno) | RNN LM, stav nese historii; limit: krok za krokem. | 0:45 |

## word2vec (era: word2vec) — 0:45

| id | Slide | Pointa | Čas |
|---|---|---|---|
| word2vec | 2013 word2vec | Vedlejší větev: vektory levně; limit: jeden vektor na slovo. | 0:45 |

## Transformer (era: transformer) — 2:00

| id | Slide | Pointa | Čas |
|---|---|---|---|
| motor | 2017 Transformer | tokeny → čísla → síť → skóre; attention, paralelní trénink; limit: kontext má strop. | 2:00 |

## GPT (era: gpt) — 5:15

| id | Slide | Pointa | Čas |
|---|---|---|---|
| pretraining | GPT: z textu, hodně textu | Malé opravy × biliony; učí se jazyk, fakta, kód, styl, vztahy. | 1:30 |
| gpt2 | GPT-2, 2019 | Rozvíjí zadanou fikci (shrnutí, tab. 13). | 1:00 |
| kostka | Hodíme kostkou | Sampling, temperature (ilustrace dnešních modelů). | 1:00 |
| smycka | A znovu. | Generování = smyčka. | 0:30 |
| base-model | Base model není asistent | Shakespeare jako ilustrace doplňování → skutečná žába před; limit éry GPT. | 1:15 |

## ChatGPT (era: chatgpt) — 3:15

| id | Slide | Pointa | Čas |
|---|---|---|---|
| instruction | 2022 ChatGPT: formát konverzace | Dál trénujeme stejnou síť (ilustrace). | 0:45 |
| preference | Která odpověď je lepší? | Hodnotitelé vybírají (ilustrace). | 1:15 |
| zaba-po | Stejný prompt po post-trainingu | Stejný motor, jiné chování; limit: nezaručuje pravdu. | 0:45 |
| evoluce | Tři kroky k chatbotovi | Nejdřív pokračovat v textu, pak jak pokračovat, když něco chceme. | 0:30 |

## Dnes (era: today) — 8:00

| id | Slide | Pointa | Čas |
|---|---|---|---|
| halucinace | Dnes: zní to jako odpověď | ≠ zaručená pravda. | 1:00 |
| pocitani | 2837 × 491 | Když mám kalkulačku, použiju kalkulačku. | 1:00 |
| aktualni | Co v tréninku nenajde | Najdeme podklady, přidáme je k otázce. | 1:30 |
| agent | Agent? Tohle ve smyčce. | LLM je součástka; limit: pořád odhad. | 0:45 |
| spatne | Dosáhl 18 let? | Pravidlo napiš jako pravidlo. | 1:00 |
| dobre | Je to stížnost? | Jazyk nech modelu. | 1:00 |
| architektura | Deterministic software + probabilistic capabilities | Autorizace před akcí, validace výstupu. | 0:45 |
| terminatori | Terminátoři / transformátoři → DON'T PANIC | Znalost mechanismu ≠ bezpečnost. | 1:00 |
| zdroje | Kam dál | QR Explainer, GPT-2, InstructGPT, Karpathy. | 0:00 |

**Součet: 3:00 + 0:45 + 2:15 + 2:15 + 0:45 + 0:45 + 0:45 + 2:00 + 5:15 + 3:15 + 8:00 = 29:00.**

## Živá ukázka

Transformer Explainer po slidu `kostka` (temperature slider), max 1 min z rezervy. Záloha: statické bary.
