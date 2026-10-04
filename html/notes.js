// Speaker notes per slide id. ŘÍCT = short spoken lines; nuance goes to TECHNICKÁ POZNÁMKA.
// Builds within one slide are separated by '— další krok —'. Times sum to 29:00 (+1:00 reserve).
window.NOTES = {
  "dont-panic": `⏱ 1:30

ŘÍCT:
Stopařův průvodce po LLMs. Na obálce Průvodce stálo velkými přátelskými písmeny DON'T PANIC.

— další krok —

Zničí nás AI? Vezme nám práci? Myslí? Ví, co říká?
Neodpovídám. Slibuju, že se k první otázce na konci vrátíme poctivě.

— další krok —

Nejvíc se bojíme toho, čemu nerozumíme. Tak to pojďme rozebrat.

POINTA: Strach z neznámého mechanismu. Dnes ho otevřeme.

PŘECHOD: Na neznámé věci jsem měl vždycky jeden nástroj.`,

  "sroubovak": `⏱ 1:00

ŘÍCT:
Jako malej jsem všechno rozebíral šroubovákem. Tady je krabička: prompt dovnitř, odpověď ven.

— další krok —

Tak ji otevřeme. Většina věcí po mně už nefungovala. Ale vždycky jsem se něco naučil.

POINTA: Celá přednáška = rozebírání téhle krabičky.

PŘECHOD: Než sáhneme dovnitř, zkusíme si, co dělá. Na sobě.`,

  "kocka": `⏱ 1:15

ŘÍCT:
Nic neříkat. Nechat sál doplnit. Počkat 3–4 vteřiny.

— další krok —

Střeše, gauči, zemi… Nikdo nevěděl tu „správnou“. Ale všichni věděli, co je pravděpodobné.

— další krok —

Gratuluju, právě jste byli language model. Je to našeptávač z mobilu. Jen hodně velký.

POINTA: Language model odhaduje, co bude dál.

PŘECHOD: Co k tomu potřebuje uvnitř? Jen minimum.`,

  "motor": `⏱ 2:00

ŘÍCT:
Pět kroků. Víc nepotřebujete.
Text.

— další krok —

Rozseká se na tokeny: slova, části slov, interpunkci. Tady jsou z „kočky“ dva kousky.

— další krok —

Každý token je číslo ve slovníku. A z čísla se udělá dlouhý seznam čísel, se kterým jde počítat.

— další krok —

Ta čísla projdou sítí. Miliardy naučených čísel, žádná tabulka odpovědí. Uvnitř se každý token může podívat na předchozí text — tomu se říká attention.

— další krok —

Na konci vypadne skóre pro každý možný další token.

POINTA: Text → tokeny → čísla → síť → skóre. Žádná databáze odpovědí.

TECHNICKÁ POZNÁMKA: ZJEDNODUŠENÍ PRO VYSVĚTLENÍ. Tokenizace podle o200k_base (tiktoken); jiné modely mají jiné tokenizery. Token ID → embedding (vektor) + informace o pozici. Síť = transformer: vrstvy attention + MLP, opakované N×; vynechány normalizace, residual connections. Attention je kauzální (vidí současnou a předchozí pozice, ne budoucí) a není totéž co uvažování. Model může některé tréninkové pasáže memorovat, takže „není databáze“ ≠ „nic si doslova nepamatuje“.

ZDROJ: tiktoken (S3); Vaswani et al. 2017 (S2); Transformer Explainer (S1).

PŘECHOD: Co přesně je to skóre?`,

  "rozdeleni": `⏱ 1:00

ŘÍCT:
Model nevrací odpověď. Vrací rozdělení: jak pravděpodobný je každý možný další token.

— další krok —

Střeše 31 %, gauči 18 %… a zbytek rozprostřený přes desítky tisíc dalších tokenů.

POINTA: Výstup je rozdělení pravděpodobností dalšího tokenu.

TECHNICKÁ POZNÁMKA: Síť vrací skóre (logits), softmax z nich udělá pravděpodobnosti. Čísla ilustrativní, kandidáti jako celá slova (ve skutečnosti by šel první token, např. „·st“). 31 % není 31% jistota pravdivosti. Chat modely po post-trainingu mají jiné distribuce než čistý LM.

VTIP: „42“ tam někde je taky. S hodně malou pravděpodobností.

PŘECHOD: Z rozdělení musíme vybrat jeden token.`,

  "kostka": `⏱ 1:15

ŘÍCT:
Vybírá se losem. Ale kostka je extrémně zatížená.

— další krok —

Temperature nízko: vyhrává favorit.

— další krok —

Temperature výš: šanci dostanou i outsideři.

— další krok —

Kostka, která před každým hodem změní pravděpodobnosti svých stěn. Stochastický neznamená chaos.

POINTA: Náhoda vybírá uvnitř velmi strukturovaného rozdělení.

TECHNICKÁ POZNÁMKA: Ilustrativní čísla: syntetické logits [3,2,1,0], softmax(logits / T), hodnoty skutečně spočtené. Pořadí kandidátů se nemění. Temperature není „kreativita“ a nezaručuje pravdivost. T = 0 = konvence pro greedy. Ani greedy nemusí být bitově reprodukovatelné (floating point, dávkování); sampling není jediný zdroj variability.

ZDROJ: Transformer Explainer (S1); PyTorch Reproducibility / Numerical accuracy (S9, S10).

ŽIVÁ UKÁZKA (volitelně, max 1 min z rezervy): Transformer Explainer, posunout temperature slider.

PŘECHOD: A tohle se opakuje.`,

  "smycka": `⏱ 0:45

ŘÍCT:
Vybraný token se přilepí ke kontextu a jede se znovu. Token po tokenu.
(Rychle proklikat 3 kroky vpravo.) „Střeše“ vzniká ze tří tokenů.

POINTA: Generování = smyčka. Nic víc.

TECHNICKÁ POZNÁMKA: Běží do ukončovacího tokenu nebo limitu. Text se znovu netokenizuje, přidá se ID. Při chatu se váhy nemění.

PŘECHOD: Odkud to ale ví, co je pravděpodobné?`,

  "pretraining": `⏱ 1:45

ŘÍCT:
Z textu. Kus internetu, knih, kódu. Zakryjeme další slovo a necháme model hádat.

— další krok —

Funguje to na fakta…

— další krok —

…i na kód.

— další krok —

Porovnáme odhad s tím, co v textu opravdu bylo, a maličko upravíme naučená čísla. A znovu. Bilionkrát.

— další krok —

A aby to dobře doplňoval, musí se naučit jazyk, fakta, kód, styl a vztahy. Nikdo pro každou z těch úloh nenapsal zvláštní pravidla.

POINTA: Pretraining = obří množství malých oprav. Schopnosti jsou vedlejší produkt dobrého doplňování.

VTIP: Pár miliard knoflíků. Ručně by to trvalo.

TECHNICKÁ POZNÁMKA: ZJEDNODUŠENÍ PRO VYSVĚTLENÍ. Slova místo tokenů, příklady ilustrativní. „Knoflíky“ = naučené parametry, ne fyzické prvky. Nejde o binární správně/špatně: trénink zvyšuje pravděpodobnost skutečně pozorovaného tokenu (gradient descent přes backpropagation). Trénovací text nemusí být pravdivý. Schopnosti jsou empirický výsledek škály dat a modelu, ne důkaz lidského myšlení; slovo „emergence“ nepoužívat jako vysvětlení.

ZDROJ: Brown et al. 2020 (S4); Schaeffer et al. 2023 (S5).

PŘECHOD: Jak vypadá výsledek? Skutečná ukázka z roku 2019.`,

  "gpt2": `⏱ 1:15

ŘÍCT:
GPT-2, 2019. Lidé mu dali začátek vymyšlené zprávy: v Andách objevili jednorožce, kteří mluví anglicky.

— další krok —

A model napsal článek. Novinový styl, vymyšlený biolog Jorge Pérez, citace vědců.

— další krok —

Plynulý text ve správném žánru. Rozvíjí zadanou fikci. Není to ověřování zprávy.

POINTA: Pretrained model umí plynule pokračovat v žánru, který dostane.

TECHNICKÁ POZNÁMKA: České shrnutí skutečné ukázky (Radford et al. 2019, tab. 13), ne doslovná citace. Autoři vybrali 1 z 10 pokusů, sampling top-k 40. Je to pokračování fikce: vstup už byl fikce, nejde o halucinaci při faktické otázce.

ZDROJ: Radford et al. 2019, GPT-2 (S14).

PŘECHOD: Co když ho požádáme o něco?`,

  "base-model": `⏱ 1:15

ŘÍCT:
Skutečný prompt: napiš francouzsky krátký příběh o žábě, která cestuje časem do antického Řecka.

— další krok —

GPT-3 bez dalšího tréninku příběh nenapsal. Přidal další zadání: příběh o dítěti a bozích, o mladíkovi v jiné době…

— další krok —

Viděl začátek seznamu zadání. A v seznamu pokračoval. Umí pokračovat v textu. Roli pomocníka ale nemá zaručenou.

POINTA: Base model doplňuje dokument; pomoc není jeho výchozí role.

TECHNICKÁ POZNÁMKA: České shrnutí skutečných výstupů (Ouyang et al. 2022, obr. 42, stejný prompt jako obr. 8), příklad vybraný autory pro ilustraci, ne benchmark. Base model umí instrukce plnit i přes vhodně postavený prompt; není absolutně neschopný. Starší completion model, ne dnešní chat.

ZDROJ: Ouyang et al. 2022, InstructGPT (S6), https://arxiv.org/html/2203.02155v1#A6.F42

PŘECHOD: Jak z doplňovače uděláme asistenta?`,

  "instruction": `⏱ 1:15

ŘÍCT:
Ukážeme mu dokumenty, které vypadají jako konverzace. Uživatel se ptá, asistent odpovídá.

— další krok —

Lidé napíšou obě strany dialogu. Tisíce takových ukázek. A na těchto ukázkách dál trénujeme stejnou síť.

— další krok —

Pořád doplňuje dokument. Jen dokument teď vypadá jako konverzace.

POINTA: Instruction tuning nemění motor, mění to, jaký dokument model doplňuje.

TECHNICKÁ POZNÁMKA: Ukázka na slidu je ilustrace. Supervised fine-tuning (SFT); u ChatGPT lidští trenéři psali obě strany dialogu (S15). Recepty se liší model od modelu; nepřisuzovat přesně původnímu InstructGPT.

ZDROJ: OpenAI 2022, Introducing ChatGPT (S15); Ouyang et al. 2022 (S6).

PŘECHOD: Odpovědí je ale víc. Která je lepší?`,

  "preference": `⏱ 1:30

ŘÍCT:
Otázka chce odpověď jednou větou. A se pustí do dlouhého vysvětlování. B dá jednu větu. Kterou chcete?

— další krok —

Lidé takhle porovnávají tisíce dvojic. Model se posouvá k odpovědím, které hodnotitelé preferují.

POINTA: Preference = ladění podle toho, co hodnotitelé vyberou.

TECHNICKÁ POZNÁMKA: Syntetická ilustrace, ne skutečný anotační záznam. Kratší není obecně lepší: B vyhrává, protože otázka výslovně chtěla jednu větu. Typicky reward model z lidských porovnání + RL (RLHF); jiné postupy např. DPO (S16). Preference ≠ pravda; jde o preference konkrétní skupiny podle instrukcí. Launch ChatGPT zmiňuje i bias hodnotitelů k delším odpovědím, takže netvrdit, že RLHF automaticky zkracuje.

ZDROJ: Ouyang et al. 2022 (S6); OpenAI 2022 (S15); Rafailov et al. 2023, DPO (S16).

PŘECHOD: Vraťme se k žábě.`,

  "zaba-po": `⏱ 1:15

ŘÍCT:
Stejný prompt. Base model psal další zadání.

— další krok —

Model po celém post-trainingu napsal příběh. O ztracené, unavené žábě, která hledá cestu do starého Řecka.

— další krok —

Stejný motor. Jiné chování.

POINTA: Post-training mění chování, ne mechanismus.

TECHNICKÁ POZNÁMKA: České shrnutí skutečných výstupů (obr. 42). InstructGPT = celý pipeline SFT + RLHF, ne izolovaný efekt jednoho kroku. Výstupy s různým nastavením (GPT-3 T 0.7, InstructGPT T 1).

ZDROJ: Ouyang et al. 2022, obr. 42 (S6).

PŘECHOD: Shrnuto do tří kroků.`,

  "evoluce": `⏱ 1:00

ŘÍCT:
Doplňovač textu.

— další krok —

Asistent.

— další krok —

Lepší asistent.

— další krok —

Nejdřív jsme model naučili pokračovat v textu. Pak jsme ho naučili, jak má pokračovat, když po něm něco chceme.

POINTA: Pretraining → instruction tuning → preference.

TECHNICKÁ POZNÁMKA: Moderní modely mají další fáze (např. RL na úlohách s ověřitelným výsledkem). Pro talk stačí tři.

PŘECHOD: A co se změnilo uvnitř?`,

  "porad-token": `⏱ 0:45

ŘÍCT:
Uvnitř běží pořád stejný motor. Kontext, síť, rozdělení, další token.

— další krok —

Výsledek je odhad dalšího tokenu. Ne vyhledaný fakt.

POINTA: Post-training mění chování, ne mechanismus.

PŘECHOD: Z toho plyne první problém.`,

  "halucinace": `⏱ 1:30

ŘÍCT:
Asistent zní jako odpověď. Sebejistě, ve správném formátu.

— další krok —

To nezaručuje pravdu. Motor pořád odhaduje další token; není to databáze pravdy.

— další krok —

Model může říct „nevím“. Generování ale nezaručuje, že správně pozná kdy.

POINTA: Vypadá jako asistent ≠ garantovaně správně.

TECHNICKÁ POZNÁMKA: V každém kroku vznikne nějaké rozdělení a vybere se nějaký token; samotné generování neobsahuje krok ověření pravdy. Halucinace nemají jediný mechanismus (vzácná data, konflikty, dekódování, tlak na hádání místo abstence). Trénink může abstenci zlepšit; RAG ani tools nejsou univerzální oprava.

ZDROJ: Kalai et al. 2025 (S7).

PŘECHOD: Druhá věc, která lidi překvapuje.`,

  "pocitani": `⏱ 1:15

ŘÍCT:
Chvíli nechat viset.

— další krok —

Kde jste v té mašině viděli násobičku? Hardware samozřejmě násobí. Jen nám nikdo nezaručí správné násobení čísel z promptu.

— další krok —

Řešení: dát mu kalkulačku. Když mám kalkulačku, použiju kalkulačku.

POINTA: Deterministický problém → deterministický nástroj.

TECHNICKÁ POZNÁMKA: Modely umí aritmetiku částečně a reasoning modely jsou v matematice silné; víceciferné násobení bez nástroje zůstává náchylné k chybám. Systém musí ověřit argumenty i výsledek nástroje. 2837 × 491 = 1 392 967 ověřeno.

PŘECHOD: A pak jsou věci, které model vědět nemůže vůbec.`,

  "aktualni": `⏱ 1:45

ŘÍCT:
Kolik teď stojí bitcoin?

— další krok —

Co říká naše interní směrnice?

— další krok —

Trénink někdy skončil. A pokud naše dokumenty nedostal, nemá se o co opřít. Bez podkladů by mohl jen hádat; v lepším případě přizná nejistotu nebo odmítne.

— další krok —

Takže podklady najdeme za něj. Search, API, vyhledání v dokumentech. Přidáme je k otázce a model odpoví nad nimi.

POINTA: Retrieval (RAG) a nástroje dávají systému informace, které model nemá.

TECHNICKÁ POZNÁMKA: Parametry se při RAG nemění. Kvalita stojí na vyhledávání; model může dodaný kontext i tak špatně použít.

ZDROJ: Lewis et al. 2020, RAG (S11).

PŘECHOD: A když tohle pustíme ve smyčce, máme agenta.`,

  "agent": `⏱ 1:15

ŘÍCT:
Model navrhne akci. Náš kód ji ověří a spustí. Výsledek jde zpátky do kontextu. A znovu, dokud není hotovo.

— další krok —

LLM není celý agent. Je to jedna součástka. Zbytek je normální software.

POINTA: Agent = LLM + nástroje + kód ve smyčce.

TECHNICKÁ POZNÁMKA: Model sám nic nespouští; okolní kód rozhoduje o oprávněních. Samotné přidání paměti/stavu z modelu agenta nedělá.

ZDROJ: Yao et al. 2022, ReAct (S12).

PŘECHOD: Kam tedy LLM patří a kam ne?`,

  "spatne": `⏱ 1:15

ŘÍCT:
Datum narození. Dosáhl 18 let? Poslat to do LLM: pomalejší, dražší a občas špatně.

— další krok —

Tři řádky kódu. Podle přesně daných pravidel.

— další krok —

Nedělej z deterministického problému probabilistický jen proto, že máš LLM.

POINTA: Když umíš napsat pravidlo, napiš pravidlo.

VTIP: Halucinující ověření věku. Přesně to, co chce slyšet compliance.

TECHNICKÁ POZNÁMKA: Determinismus není správnost: kód je správný, jen když jsou správná pravidla. Věk potřebuje datum posouzení a kalendářní pravidla (29. 2.). Ilustrace výpočtu, ne právní rozhodování.

PŘECHOD: A kde naopak LLM dává smysl?`,

  "dobre": `⏱ 1:15

ŘÍCT:
„No paráda, zase mi to přišlo rozbitý.“

— další krok —

Klíčové slovo říká pochvala. A pravidel přibývá: výjimka, výjimka z výjimky…

— další krok —

Každý člověk ví, že je to stížnost. Tady se vyplatí model vyzkoušet a změřit, jak dobře klasifikuje.

POINTA: LLM tam, kde pravidlo napsat neumíme.

TECHNICKÁ POZNÁMKA: LLM není jediný možný klasifikátor. Výstup omezit na validovaný výčet včetně „nejisté → člověk“; výsledek je odhad, ne fakt.

PŘECHOD: Dejme to dohromady.`,

  "architektura": `⏱ 1:00

ŘÍCT:
LLM uprostřed: pochopí, co uživatel chce, navrhne další krok.

— další krok —

Než se cokoliv stane, software ověří oprávnění a argumenty. Pak nástroje a data.

— další krok —

Výsledky jdou zpátky modelu.

— další krok —

A na výstupu zase deterministická kontrola.

POINTA: Deterministic software + probabilistic capabilities.

TECHNICKÁ POZNÁMKA: Guardrails = schema validace, allow-listy, oprávnění, limity, human-in-the-loop u nevratných akcí. Schema validace ověří tvar, ne pravdivost.

PŘECHOD: Takže… zničí nás Terminátoři?`,

  "terminatori": `⏱ 1:00

ŘÍCT:
Slíbil jsem poctivou odpověď.

— další krok —

Rozebrali jsme mechanismus. Tím jsme ale nevyřešili otázku vědomí ani bezpečnosti. Co můžeme řídit hned: oprávnění, ověřování, lidský dohled.

— další krok —

DON'T PANIC neznamená don't care.

— další krok —

LLM není magie. Je to software. Velmi zvláštní software. Nenahrazujte jistotu pravděpodobností, pokud pravděpodobnost neřeší problém, který jistota neumí. Díky.

POINTA: Nepanikařit ≠ nestarat se. Callback na začátek.

TECHNICKÁ POZNÁMKA: Nezlehčovat ani nepřehánět. Neříkat, že rizika jsou „hlavně v nasazení“. Nedělat predikce o AGI.

PŘECHOD: Resources + Q&A.`,

  "zdroje": `⏱ 0:00 (visí během Q&A)

ŘÍCT:
Kdo si chce na krabičku sáhnout sám: Transformer Explainer běží v prohlížeči.

VIDEO PRO ZVÍDAVÉ: Andrej Karpathy, Deep Dive into LLMs like ChatGPT. Kapitoly: tokenizace 07:47, vstup/výstup sítě 14:27, inference 26:01, post-training 59:23, halucinace a tools 1:20:32. (S13)

POINTA: Kdo chce krabičku rozebrat hlouběji sám, má kde začít.

ZDROJ: kompletní seznam v sources.md (S1–S16).

PŘECHOD: Q&A.`,

};
