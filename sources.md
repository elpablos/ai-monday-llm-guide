# Zdroje a jejich použití

Ověřeno 4. 10. 2026. Identifikátory S1–S12 používá tech-review.md. Zdroje nepředstavují žebříček současných modelů.

| ID | Primární zdroj | Pro co jej používáme |
|---|---|---|
| S1 | [Transformer Explainer — Polo Club](https://poloclub.github.io/transformer-explainer/) | Interaktivní ukázka GPT-2 small, průchod tokenizací, bloky, distribucí a samplingem. Demo po slidu 9. Jde o GPT-2, ne univerzální popis každého dnešního modelu. |
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

Transformer Explainer (hlavní odkaz + QR), Attention Is All You Need, InstructGPT, RAG. Ostatní odkazy patří do speaker notes relevantních slidů a tohoto souboru.

## Vlastní pedagogické příklady

Pravděpodobnosti na slidech jsou ilustrativní, nikoliv naměřené predikce. JPEG je autorský pedagogický most, nikoliv technické tvrzení o shodě algoritmů. Příklad násobení a tokenizace ověřeny lokálním výpočtem; přesné vstupy a tokenizer jsou v tech-review.md. Doporučení pro rozdělení deterministické logiky, validace a oprávnění jsou návrhem systémového designu, nikoliv zárukou správnosti libovolné aplikace.

## Doplňující odkazy z poznámek ke kompresi

- [Ted Chiang: ChatGPT Is a Blurry JPEG of the Web, 9. 2. 2023](https://www.newyorker.com/tech/annals-of-technology/chatgpt-is-a-blurry-jpeg-of-the-web) — původní esej s JPEG analogií. Citujeme pouze původ metafory, nepřebíráme její silnější technická tvrzení o halucinacích či absenci doslovného memorování.
- [Delétang et al.: Language Modeling Is Compression, 2023](https://arxiv.org/abs/2309.10668) — vztah predikce a **bezeztrátové** komprese s prediktivním modelem. Není důkazem toho, že parametry jsou JPEG tréninkových dokumentů. Doplněk pro dotazy, ne další slide.

## S13 — Andrej Karpathy: Deep Dive into LLMs like ChatGPT

https://www.youtube.com/watch?v=7xTGNNLPyMI

Reference doporučená Pavlem pro HTML verzi. Ověřeny metadata a autorský popis videa; relevantní kapitoly: tokenization 07:47, neural network I/O 14:27, internals 20:11, inference 26:01, pretraining → post-training 59:23, hallucinations/tools 1:20:32. Autor v popisu odkazuje na Excalidraw jako použitou vizualizační tabuli. Vlastní HTML diagramy navazují na princip jednoduché světlé technické tabule; nepřebíráme screenshoty videa.
