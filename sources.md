# Zdroje a jejich použití

Ověřeno 4. 10. 2026. Identifikátory S1–S24 používají notes a tech-review.md. Zdroje nepředstavují žebříček současných modelů.

| ID | Primární zdroj | Pro co jej používáme |
|---|---|---|
| S1 | [Transformer Explainer — Polo Club](https://poloclub.github.io/transformer-explainer/) | Interaktivní ukázka GPT-2 small, průchod tokenizací, bloky, distribucí a samplingem. Volitelná hlubší ukázka přes QR na konci. Jde o GPT-2, ne univerzální popis každého dnešního modelu. |
| S2 | [Vaswani et al., Attention Is All You Need, 2017](https://arxiv.org/abs/1706.03762) | Attention, position informace, feed-forward vrstvy, residual connections. Původní encoder–decoder není přesná architektura dnešního decoder-only chat modelu. |
| S3 | [OpenAI — tiktoken](https://github.com/openai/tiktoken) | Implementace BPE tokenizeru; skutečná lokálně ověřená ukázka o200k_base. Tokenizace je bezeztrátová reprezentace vstupu; nesplést s analogií ztrátového učení parametrů. |
| S4 | [Brown et al., Language Models are Few-Shot Learners, 2020](https://arxiv.org/abs/2005.14165) | Empirické schopnosti autoregresivního LM napříč úlohami a in-context learning. Není důkaz obecného porozumění ani vysvětlení všech moderních schopností. |
| S5 | [Schaeffer et al., Are Emergent Abilities of Large Language Models a Mirage?, 2023](https://arxiv.org/abs/2304.15004) | Opatrnost s tvrzením o náhlém vzniku schopností: pozorovaný skok může souviset s metrikou. Nevyvrací existenci všech nových schopností. |
| S6 | [Ouyang et al., Training language models to follow instructions with human feedback, 2022](https://arxiv.org/abs/2203.02155) | Rozdíl mezi předtrénovaným LM a instruction-following modelem; konkrétní historický postup SFT + preference + RL. Ne všechny chat modely mají totožný recept. |
| S7 | [Kalai et al., Why Language Models Hallucinate, 2025](https://arxiv.org/abs/2509.04664) | Statistické chyby a incentivy k hádání místo abstence. Jeden vysvětlující rámec, ne jediná příčina všech halucinací. |
| S8 | [Carlini et al., Extracting Training Data from Large Language Models, 2020](https://arxiv.org/abs/2012.07805) | Důkaz, že některé tréninkové sekvence mohou být memorovány a reprodukovány. Proto „není databáze“ neznamená „nikdy si nepamatuje doslovný text“. |
| S9 | [PyTorch — Reproducibility](https://docs.pytorch.org/docs/stable/notes/randomness.html) | Reprodukovatelnost závisí na implementaci, platformě a konfiguraci; seed sám není univerzální záruka. |
| S10 | [PyTorch — Numerical accuracy](https://docs.pytorch.org/docs/stable/notes/numerical_accuracy.html) | Floating-point a pořadí operací, rozdíly batched vs non-batched výpočtů. Odvození pro talk: malé změny skóre mohou při blízkých kandidátech změnit i greedy volbu. |
| S11 | [Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks, 2020](https://arxiv.org/abs/2005.11401) | Kombinace parametrické a externí paměti s retrievalem. Praktické RAG systémy jsou širší rodina než přesná trénovaná architektura paperu. |
| S12 | [Yao et al., ReAct: Synergizing Reasoning and Acting in Language Models, 2022](https://arxiv.org/abs/2210.03629) | Příklad interakce modelu s prostředím přes akce a pozorování; opora pro smyčku agenta, nikoliv závazná definice všech agentů. |

## Co zobrazit na Resources

Aktuální narativní verze: Transformer Explainer (QR), GPT-2 paper, InstructGPT, Karpathy. Další zdroje zůstávají v notes; původní anatomické a JPEG odkazy níže jsou podklady předchozí verze.

## Vlastní pedagogické příklady

Pravděpodobnosti na slidech jsou ilustrativní, nikoliv naměřené predikce. JPEG analogie byla v narativním refactoru z hlavního decku odstraněna. Příklad násobení a tokenizace ověřeny lokálním výpočtem; přesné vstupy a tokenizer jsou v tech-review.md. Doporučení pro rozdělení deterministické logiky, validace a oprávnění jsou návrhem systémového designu, nikoliv zárukou správnosti libovolné aplikace.

## Doplňující odkazy z poznámek ke kompresi

- [Ted Chiang: ChatGPT Is a Blurry JPEG of the Web, 9. 2. 2023](https://www.newyorker.com/tech/annals-of-technology/chatgpt-is-a-blurry-jpeg-of-the-web) — původní esej s JPEG analogií. Citujeme pouze původ metafory, nepřebíráme její silnější technická tvrzení o halucinacích či absenci doslovného memorování.
- [Delétang et al.: Language Modeling Is Compression, 2023](https://arxiv.org/abs/2309.10668) — vztah predikce a **bezeztrátové** komprese s prediktivním modelem. Není důkazem toho, že parametry jsou JPEG tréninkových dokumentů. Doplněk pro dotazy, ne další slide.

## S13 — Andrej Karpathy: Deep Dive into LLMs like ChatGPT

https://www.youtube.com/watch?v=7xTGNNLPyMI

Reference doporučená Pavlem pro HTML verzi. Ověřeny metadata a autorský popis videa; relevantní kapitoly: tokenization 07:47, neural network I/O 14:27, internals 20:11, inference 26:01, pretraining → post-training 59:23, hallucinations/tools 1:20:32. Autor v popisu odkazuje na Excalidraw jako použitou vizualizační tabuli. Vlastní HTML diagramy navazují na princip jednoduché světlé technické tabule; nepřebíráme screenshoty videa.


## Historické ukázky — narativní refactor

Na slidech jsou **česká shrnutí skutečných vstupů/výstupů**, nikoli doslovné překlady či nově spuštěné modely. Odkazy míří na přesnou ukázku. Vybrané příklady ilustrují chování; neměří četnost chyb.

### S14 — GPT-2, 2019: pokračování fikční zprávy

[Radford et al., Language Models are Unsupervised Multitask Learners, str. 20, tabulka 13](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf#page=20).

Lidský vstup ohlašuje anglicky mluvící jednorožce v Andách. GPT-2 rozvine novinový styl, přidá biologa Jorge Péreze a jeho výroky. Autoři vybrali jeden z deseti výstupů; top-k = 40. Fikci zadal už člověk: není to ukázka selhání při ověřování faktické otázky. Papír byl ověřen i vizuálně na straně 20.

### S6 — GPT-3 vs InstructGPT, 2022: žába

[Ouyang et al., obr. 42 / Appendix F](https://arxiv.org/html/2203.02155v1#A6.F42).

Francouzské zadání žádá příběh o žábě cestující do antického Řecka. GPT-3 pokračuje dalšími zadáními; InstructGPT začne příběh. Jde o autory vybranou ilustraci, 175B modely, T=0,7 / T=1. InstructGPT zde zahrnuje SFT i RLHF; rozdíl nelze připsat samotnému instruction tuningu. Base modely mohou instrukce plnit s vhodným kontextem. [Sekce 3.1](https://arxiv.org/html/2203.02155v1#S3.SS1) dokládá demonstrace → porovnávání výstupů → ladění podle odměny.

### S15 — ChatGPT, 2022: formát rozhovoru a preference

[OpenAI, Introducing ChatGPT, Methods a Limitations, 30. 11. 2022](https://openai.com/index/chatgpt/).

Primární popis dialogových tréninkových ukázek a hodnocení alternativ odpovědi. Podklad k přechodu od instrukce k rozhovoru; historický InstructGPT sám není totéž co dnešní ChatGPT. A/B na slidu je **naše ilustrace**, ne dochovaný hlas konkrétního hodnotitele. Stručnější odpověď je vhodnější vzhledem k zadání, nikoli univerzálně. Launch text popisuje i opačný bias hodnotitelů — k dlouhým odpovědím. Preference lidí nejsou záruka pravdivosti.

### S16 — jiné preference learning postupy (pouze notes)

[Rafailov et al., Direct Preference Optimization, 2023](https://arxiv.org/abs/2305.18290).

Opora pro stručnou poznámku, že historický recept s odděleným reward modelem a RL není jediná cesta. Nejde o přehled dnešních tréninkových metod.

### Rozlišení původu ukázek

- GPT-2 jednorožci a GPT-3/InstructGPT žába: historické výstupy, česky shrnuté a zkrácené.
- Kočka, pretraining doplňovačky, dialog pro instruction tuning, preference A/B a tools: vlastní pedagogické ilustrace, viditelně označené; žádný smyšlený historický transcript.
- Bitcoin: ilustrace potřeby aktuálního zdroje, bez uvádění či předstírání živé ceny.

## Historická rampa — issue #1

Ověřeno 4. 10. 2026. Tři slidy mají ukázat změny metod a jejich limitů, nikoli úplnou genealogii AI. S17–S23 jsou původní práce, překlad původního textu či doplňující historický výzkum; S24 je reportáž a slouží pouze pro volitelný slovní callback.

### S17 — Markov: závislost v textu, 1913

- A. A. Markov, *An Example of Statistical Investigation of the Text Eugene Onegin Concerning the Connection of Samples in Chains*, překlad v Science in Context 19(4), 2006, 591–600: https://doi.org/10.1017/S0269889706001074
- Vydavatelský výtah potvrzuje analýzu 20 000 písmen z Puškinova Oněgina a původní přednášku z roku 1913. Zkoumání samohlásek/souhlásek a sousedních závislostí doplňuje David Link, *Traces of the Mouth* (2006): https://www.its.caltech.edu/~matilde/TracesOfTheMouth.pdf
- Použití: jednovětý historický kořen práce se závislostí v sekvenci. Není to tvrzení o prvním language modelu, generování ruštiny ani vynálezu LLM.

### S18 — Shannon: statistická struktura a hádání znaku

- C. E. Shannon, *A Mathematical Theory of Communication* (1948), zejména část 3, *The Series of Approximations to English*: https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
- C. E. Shannon, *Prediction and Entropy of Printed English* (1951), experimenty v oddílu 3: https://www.princeton.edu/~wbialek/rome/refs/shannon_51.pdf — DOI: https://doi.org/10.1002/j.1538-7305.1951.tb01366.x
- 1948: aproximace jazyka pomocí četností znaků i slov a jejich návazností. 1951: lidský účastník hádá další znak při znalosti předcházejícího textu; účelem je odhad entropie a redundance angličtiny. Není to trénink neuronové sítě.
- Český řádek na slidu je naše **ilustrace principu**, nikoli přeložený experimentální záznam. Hra s publikem je analogie úlohy; lidé a LM nemají stejný mechanismus.

### S19 — N-gramy, rozpoznávání řeči, smoothing a backoff

- F. Jelinek, L. R. Bahl, R. L. Mercer, *Design of a Linguistic Statistical Decoder for the Recognition of Continuous Speech* (1975): https://research.ibm.com/publications/design-of-a-linguistic-statistical-decoder-for-the-recognition-of-continuous-speech
- F. Jelinek, *Continuous Speech Recognition by Statistical Methods* (1976): https://research.ibm.com/publications/continuous-speech-recognition-by-statistical-methods
- S. F. Chen, J. Goodman, *An Empirical Study of Smoothing Techniques for Language Modeling* (1996), zejména úvod a oddíl 2: https://aclanthology.org/P96-1041/ (PDF: https://aclanthology.org/P96-1041.pdf).
- Podpora pro dlouhodobé praktické použití statistických LM v řeči a odhady pro nepozorované kombinace. N-gramový model používá posledních N−1 slov; základní trigram tedy dvě předchozí slova. Backoff zkracuje historii, smoothing přerozděluje pravděpodobnostní hmotu i neviděným kombinacím. Nejde o jediný univerzální algoritmus.
- Počty 50/20/10 a věty s kočkou/kotětem jsou syntetická ilustrace. Pokud ukazujeme rozdělení jen těchto tří možností, jmenovatel je 80 (62,5 / 25 / 12,5 %). Ve skutečném korpusu by bylo více pokračování.
- Vocab 100 000: 10¹⁰ možných dvojic a 10¹⁵ trojic jsou kombinatorický prostor, **ne** nutná velikost uložené tabulky. Základní slovní model sám nesdílí statistiky podle významové podobnosti; existovaly i modely se třídami slov a další rozšíření.

### S20 — Bengio et al.: naučené reprezentace, 2003

- Y. Bengio, R. Ducharme, P. Vincent, C. Jauvin, *A Neural Probabilistic Language Model*, JMLR 3, 1137–1155: https://www.jmlr.org/papers/v3/bengio03a.html
- Model společně učí distribuované reprezentace slov a pravděpodobnosti jejich posloupností. Umožňuje sdílet naučené pravidelnosti i mezi podobnými kombinacemi, které přesně neviděl. „Kočka/kotě“ je naše intuitivní ilustrace, ne převzatý experiment či skutečné vektory.
- Používá pevnou délku kontextu; tento limit neodstraňuje samotný embedding. Autoři označují výpočetní náročnost učení milionů parametrů za významnou překážku. Netvrdíme, že jde o vůbec první použití neuronových sítí pro jazyk.

### S21 — Mikolov et al.: RNN language model, 2010

- T. Mikolov, M. Karafiát, L. Burget, J. Černocký, S. Khudanpur, *Recurrent neural network based language model*, Interspeech 2010, 1045–1048: https://www.isca-archive.org/interspeech_2010/mikolov10_interspeech.html
- Plný text: https://www.isca-archive.org/interspeech_2010/mikolov10_interspeech.pdf
- Oddíl 2: historie se předává rekurentním stavem místo pevného počtu vstupních slov. To neznamená perfektní ani neomezenou paměť. Článek řeší výpočetní náročnost a experimenty v rozpoznávání řeči.
- Afiliace: Speech@FIT, VUT v Brně, a Johns Hopkins University. Opora pro brněnský callback se vztahuje k této práci; word2vec z roku 2013 vznikal v Googlu. Mikolov nevynalezl obecně RNN ani „LLM“.

### S22 — Mikolov et al.: word2vec, 2013

- *Efficient Estimation of Word Representations in Vector Space*: https://arxiv.org/abs/1301.3781 (oddíly 3.1 a 3.2: CBOW a Skip-gram).
- *Distributed Representations of Words and Phrases and their Compositionality*: https://arxiv.org/abs/1310.4546 (zejména oddíl 2.2: negative sampling).
- Efektivní učení slovních vektorů; první práce už vyhodnocuje syntaktické a sémantické vztahy. Navazující práce rozšiřuje metody o negative sampling, subsampling častých slov a fráze.
- Související linie reprezentací, ne další generace RNN LM nebo přímý předchůdce dnešních Transformer embeddings. CBOW používá okolí slova a Skip-gram predikuje okolí ze slova; word2vec není autoregresivní chatovací model. Zkratky a negative sampling patří do notes, ne do výkladu na plátně.

### S23 — LSTM a sekvenční výpočet (technické pozadí)

- S. Hochreiter, J. Schmidhuber, *Long Short-Term Memory* (1997): https://doi.org/10.1162/neco.1997.9.8.1735
- LSTM řeší problém učení dlouhých závislostí u rekurentních sítí. Rok 1997 předchází Mikolovově práci z roku 2010; neukazovat LSTM jako jeho následný vynález.
- S2, *Attention Is All You Need*, úvod/oddíl 2: Transformer odstranil recurrence a umožnil více paralelizace **při tréninku**. Attention existovala před Transformerem. Autoregresivní generování dalších tokenů zůstává postupné. Neříkat, že odpadly všechny limity nebo že moderní LLM vznikla pouze přidáním výpočetního výkonu.

### S24 — Volitelný callback Claude / Claude Shannon

- Steven Levy, WIRED (2025), *If Anthropic Succeeds, a Nation of Benevolent AI Geniuses Could Be Born*: https://www.wired.com/story/anthropic-benevolent-artificial-intelligence/
- Reportáž popisuje jméno Claude jako známé a vřelé; současně uvádí, že podle osloveného člověka může odkazovat také na Shannona. Používáme pouze jako opatrně připsanou slovní hříčku, ne potvrzení jediného nebo výhradního původu názvu. Nejde o technický zdroj ani další milník historie.
