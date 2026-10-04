// Speaker notes per slide id. ŘÍCT = short spoken lines; nuance goes to TECHNICKÁ POZNÁMKA.
// Builds within one slide are separated by '— další krok —'. Times sum to 29:00 (+1:00 reserve).
window.NOTES = {
  "dont-panic": `⏱ 1:15

ŘÍCT:
Stopařův průvodce po LLMs. Na obálce Průvodce stálo velkými přátelskými písmeny DON'T PANIC.

— další krok —

Zničí nás AI? Vezme nám práci? Myslí? K první otázce se na konci vrátíme poctivě.

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

  "motor": `⏱ 1:45

ŘÍCT:
Pět kroků. Text.

— další krok —

Rozseká se na tokeny, kousky textu. Tady jsou z „Kočka“ dva.

— další krok —

Každý token je číslo. Z něj dlouhý seznam čísel, se kterým jde počítat.

— další krok —

Projdou sítí: miliardy naučených čísel, žádná tabulka odpovědí. Každý token se v ní může podívat na předchozí text. To je attention.

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

  "kostka": `⏱ 1:00

ŘÍCT:
Vybírá se losem. Ale kostka je extrémně zatížená.

— další krok —

Temperature nízko: vyhrává favorit.

— další krok —

Temperature výš: šanci dostanou i outsideři.

— další krok —

Stochastický neznamená chaos.

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

PŘECHOD: Mimochodem, tahle hra je hodně stará.`,

  "shannon": `⏱ 1:00

ŘÍCT:
V roce 1951 dělal Claude Shannon v zásadě stejnou hru, kterou jsme před chvílí hráli my.

— další krok —

Lidi dostali začátek textu a hádali další písmeno. Na téhle ilustraci číslo říká, kolikátým pokusem se člověk trefil. Často hned napoprvé.

— další krok —

Stejná hra jako s kočkou. Jen po písmenech. Kořeny jdou ještě dál: Markov v roce 1913 počítal na dvaceti tisících písmen Evžena Oněgina, jak po sobě jdou samohlásky a souhlásky.

(Volitelně, 10 s:) Claude Shannon. To jméno vám možná něco připomíná. WIRED píše, že v Claudeovi lze číst i odkaz na něj.

POINTA: „Hádej, co bude dál“ je desítky let stará myšlenka.

TECHNICKÁ POZNÁMKA: Řádek s počty pokusů je česká ilustrace principu, ne Shannonova data (experiment byl v angličtině, 1951, Prediction and Entropy of Printed English; 1948 A Mathematical Theory of Communication: aproximace jazyka různých řádů). Markov 1913 = analýza sekvenční závislosti samohlásek/souhlásek, ne „vynález language modelu“. Myšlenka nebyla „u ledu“: postupně se používala a zlepšovala. Claude callback: podle WIRED (Levy 2025) jméno vyjadřuje familiaritu a vřelost a podle toho, koho se ptáte, i odkaz na Shannona — není to jednoznačný původ názvu, říkat jen jako vtip.

ZDROJ: Markov 1913 (S17); Shannon 1948, 1951 (S18); WIRED 2025 (S24).

PŘECHOD: Jak z toho udělat stroj? Nejdřív prostě počítáním.`,

  "ngramy": `⏱ 1:15

ŘÍCT:
Vezmeme hromadu textu a spočítáme, co chodí po „sedí na“. Střeše padesátkrát, gauči dvacetkrát. Z toho je rozdělení. Dvě předchozí slova určují odhad třetího — trigram. Stejná smyčka jako dnes, jen pravděpodobnosti jsou z tabulky.

— další krok —

Problém: když chci delší historii včetně kočky, tabulka zná „kočka sedí na střeše“, ale „kotě sedí na střeše“ nikdy neviděla. Pro ni jsou kočka a kotě dvě nesouvisející kolonky.

— další krok —

Řešilo se to chytře: když neznám delší kontext, zkusím kratší. Backoff.

— další krok —

Fungovalo to desítky let, třeba v rozpoznávání řeči. Ale pořád jsme skládali a vyhlazovali tabulky četností.

POINTA: N-gramy: správný princip, ale základní slovní tabulka sama nesdílí podobnost slov.

TECHNICKÁ POZNÁMKA: N-gram = posloupnost N slov; trigram predikuje z 2 předchozích. Exploze kombinací: slovník 100 000 slov → 10^10 bigramů, 10^15 trigramů; většinu nikdy neuvidíme (sparsity), proto nepomůže jen zvyšovat N. Smoothing a backoff byly vyspělé techniky (srovnání Chen & Goodman 1996); statistický speech recognition (IBM, Jelinek, 70. léta). Neprezentovat jako primitivní slepou uličku. „Kočka ≠ kotě“ platí pro základní slovní model; class-based n-gramy podobnost slov částečně řešily. Četnosti na slidu ilustrativní: 50/20/10 z korpusu se třemi pokračováními = 62,5 / 25 / 12,5 %. Exploze kombinací = teoretický počet možností, ne nutně alokovaná velikost tabulky.

ZDROJ: Jelinek 1976, Chen & Goodman 1996 (S19).

PŘECHOD: Co kdyby kočka a kotě nebyly dvě nesouvisející kolonky?`,

  "neuronove": `⏱ 1:15

ŘÍCT:
2003, Bengio: slova jako naučené vektory. Síť se může naučit, že se kočka a kotě používají podobně, a zvládnout i kombinace, které neviděla. Jen trénink byl tehdy drahý a okno kontextu pořád pevné.

— další krok —

2010, Mikolov a kolegové: rekurentní síť nese historii textu ve svém stavu, bez pevného okna. Mimochodem, docela podstatná část téhle historie se odehrávala v Brně.

— další krok —

Vedle toho 2013, word2vec: vektory slov levně a ve velkém. Ukázalo se, kolik vztahů v nich je. Není to další generace chatbotů, spíš vedlejší větev.

— další krok —

RNN ale počítá krok za krokem. 2017, Transformer: místo rekurence attention. Trénink jde paralelně. A to se dá škálovat.

— další krok —

Největší WTF možná není nová myšlenka. Je to stará myšlenka s lepšími metodami, víc daty a výpočtem, v absurdním měřítku.

POINTA: Každá generace řešila konkrétní limit té předchozí. Transformer nebyl začátek vesmíru.

TECHNICKÁ POZNÁMKA: Netvrdit, že Mikolov vynalezl LLM, ani že word2vec je přímý technický předchůdce embeddingů v Transformeru; nepřehánět kauzalitu. Rané neuronové LM brzdila výpočetní náročnost (Bengio 2003 i Mikolov 2010 ji řeší explicitně). Klasické RNN trpěly při učení dlouhých závislostí (vanishing/exploding gradients); LSTM (Hochreiter & Schmidhuber 1997) bylo důležitým krokem. Transformer odstranil recurrence, takže trénink jde paralelizovat; generování (inference) jde dál token po tokenu. Bengio 2003 měl stále pevné okno. RNN stav ≠ garantovaná neomezená paměť. LSTM (1997) existovalo před Mikolovem 2010, jde jen o nuanci. Word2vec není další generace RNN LM ani autoregresivní model, proto je na slidu jako vedlejší větev. Nemluvit o „70 letech u ledu“ ani o „pouhém škálování“ bez algoritmů a dat. Mikolov et al. 2010 = Mikolov, Karafiát, Burget, Černocký, Khudanpur (Interspeech; VUT Brno + JHU). Word2vec = CBOW/Skip-gram (2013); už první práce zkoumala vztahy mezi vektory, navazující přidala negative sampling. Word2vec vznikl v Googlu: Brno patří k RNN LM 2010, netvrdit u word2vec.

ZDROJ: Bengio et al. 2003 (S20); Mikolov et al. 2010 (S21); Mikolov et al. 2013a, 2013b (S22); Hochreiter & Schmidhuber 1997 (S23); Vaswani et al. 2017 (S2).

PŘECHOD: Tak proč škálování doplňovače textu začne programovat a překládat?`,

  "pretraining": `⏱ 1:30

ŘÍCT:
Z textu. Zakryjeme další slovo a necháme model hádat.

— další krok —

Funguje to na fakta…

— další krok —

…i na kód.

— další krok —

Porovnáme s tím, co v textu bylo, a maličko upravíme naučená čísla. Bilionkrát.

— další krok —

Aby dobře doplňoval, musí se naučit jazyk, fakta, kód, styl a vztahy. Pravidla mu nikdo nenapsal.

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

  "instruction": `⏱ 1:00

ŘÍCT:
Ukážeme mu dokumenty, které vypadají jako konverzace.

— další krok —

Lidé napíšou obě strany dialogu. Na tisících takových ukázek dál trénujeme stejnou síť.

— další krok —

Pořád doplňuje dokument. Jen dokument teď vypadá jako konverzace.

POINTA: Instruction tuning nemění motor, mění to, jaký dokument model doplňuje.

TECHNICKÁ POZNÁMKA: Ukázka na slidu je ilustrace. Supervised fine-tuning (SFT); u ChatGPT lidští trenéři psali obě strany dialogu (S15). Recepty se liší model od modelu; nepřisuzovat přesně původnímu InstructGPT.

ZDROJ: OpenAI 2022, Introducing ChatGPT (S15); Ouyang et al. 2022 (S6).

PŘECHOD: Odpovědí je ale víc. Která je lepší?`,

  "preference": `⏱ 1:15

ŘÍCT:
Otázka chce odpověď jednou větou. A se pustí do dlouhého vysvětlování. B dá jednu větu. Kterou chcete?

— další krok —

Lidé porovnávají tisíce dvojic. Model se posouvá k tomu, co hodnotitelé preferují.

POINTA: Preference = ladění podle toho, co hodnotitelé vyberou.

TECHNICKÁ POZNÁMKA: Syntetická ilustrace, ne skutečný anotační záznam. Kratší není obecně lepší: B vyhrává, protože otázka výslovně chtěla jednu větu. Typicky reward model z lidských porovnání + RL (RLHF); jiné postupy např. DPO (S16). Preference ≠ pravda; jde o preference konkrétní skupiny podle instrukcí. Launch ChatGPT zmiňuje i bias hodnotitelů k delším odpovědím, takže netvrdit, že RLHF automaticky zkracuje.

ZDROJ: Ouyang et al. 2022 (S6); OpenAI 2022 (S15); Rafailov et al. 2023, DPO (S16).

PŘECHOD: Vraťme se k žábě.`,

  "zaba-po": `⏱ 1:00

ŘÍCT:
Stejný prompt. Base model psal další zadání.

— další krok —

Po celém post-trainingu napsal příběh o unavené žábě, která hledá cestu do Řecka.

— další krok —

Stejný motor. Jiné chování.

POINTA: Post-training mění chování, ne mechanismus.

TECHNICKÁ POZNÁMKA: České shrnutí skutečných výstupů (obr. 42). InstructGPT = celý pipeline SFT + RLHF, ne izolovaný efekt jednoho kroku. Výstupy s různým nastavením (GPT-3 T 0.7, InstructGPT T 1).

ZDROJ: Ouyang et al. 2022, obr. 42 (S6).

PŘECHOD: Shrnuto do tří kroků.`,

  "evoluce": `⏱ 0:45

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

PŘECHOD: Uvnitř jsme nevyměnili motor. A z toho plyne první problém.`,

  "halucinace": `⏱ 1:15

ŘÍCT:
Zní to jako odpověď. Sebejistě.

— další krok —

To nezaručuje pravdu. Motor pořád odhaduje další token.

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

  "aktualni": `⏱ 1:30

ŘÍCT:
Kolik teď stojí bitcoin?

— další krok —

Co říká naše interní směrnice?

— další krok —

Trénink někdy skončil. A pokud naše dokumenty nedostal, bez podkladů by mohl hádat. V lepším případě přizná nejistotu.

— další krok —

Podklady najdeme za něj: search, API, dokumenty. Přidáme je k otázce.

POINTA: Retrieval (RAG) a nástroje dávají systému informace, které model nemá.

TECHNICKÁ POZNÁMKA: Parametry se při RAG nemění. Kvalita stojí na vyhledávání; model může dodaný kontext i tak špatně použít.

ZDROJ: Lewis et al. 2020, RAG (S11).

PŘECHOD: A když tohle pustíme ve smyčce, máme agenta.`,

  "agent": `⏱ 1:00

ŘÍCT:
Model navrhne akci, kód ji ověří a spustí, výsledek jde zpátky. A znovu, dokud není hotovo.

— další krok —

LLM není celý agent. Zbytek je normální software.

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

ZDROJ: kompletní seznam v sources.md (S1–S24).

PŘECHOD: Q&A.`,

};
