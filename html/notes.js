// Speaker notes per slide id. ŘÍCT = short spoken lines; nuance goes to TECHNICKÁ POZNÁMKA.
// Builds within one slide are separated by '— další krok —'. Times sum to 29:00 (+1:00 reserve).
window.NOTES = {
  "dont-panic": `⏱ 0:45

ŘÍCT:
Stopařův průvodce po LLMs. Jmenuju se Pavel Lorenz.
AI Monday číslo sedmnáct. Zničí nás Terminátoři, nebo transformátoři? Malá narážka: to T v GPT znamená Transformer. K té otázce se na konci vrátíme poctivě.

POINTA: Nejvíc se bojíme toho, čemu nerozumíme.

PŘECHOD: Kdo vám to vlastně vypráví?`,

  "o-mne": `⏱ 0:45

ŘÍCT:
Pracuju jako staff engineer v Heureka Group a jsem hlavně praktik. AI řeším dnes a denně. Zajímá mě, co z toho funguje v praxi.

— další krok —

A odmalička rozebírám věci, kterým nerozumím. Většina z nich už pak nefungovala. Ale vždycky jsem se něco naučil.

POINTA: Pohled praktika, ne výzkumníka.

PŘECHOD: Tak jsem rozebral i tohle.`,

  "motivace": `⏱ 1:00

ŘÍCT:
Zničí nás? Nahradí nás? Tyhle titulky čtete taky. Než se začnu bát, chci vědět, co je uvnitř. Tak jsem kopal. Nahoře dnešní asistenti, GPT a ChatGPT.

— další krok —

Cestou jsem potkal i BERT a rerankery. Užitečné odbočky.

— další krok —

A až dole základy: Shannon a Markov.

— další krok —

Nestudoval jsem to desítky let. Jsem praktik, který si dohledává, co se tu vlastně objevilo. Tenhle pohled ale pomáhá každému, kdo si s AI hraje.

POINTA: Strach z neznámého → podívat se dovnitř.

TAHÁK NAVÍC / PŘI DOTAZU (nečíst celý při přednesu):
GPT = Generative Pre-trained Transformer: generativní, předtrénovaný model s architekturou Transformer. Základní hra: „Kočka sedí na …“ → co přijde dál?
BERT = Bidirectional Encoder Representations from Transformers. Bidirectional znamená obousměrný. Jedna z hlavních tréninkových her: „Kočka sedí na [MASK] a pozoruje ulici.“ → co patří do mezery? Vidí kontext vlevo i vpravo. Obě věty jsou naše ilustrace.
Krátce nahlas: „GPT se učilo pokračovat v textu. BERT doplňovat díry v textu, přičemž viděl i to za nimi. Dvě různé tréninkové hry nad příbuznou technologií.“
BERT může být základ klasifikátoru, extrakce odpovědi z dokumentu nebo rerankeru. Reranker přehodnotí nalezené výsledky podle relevance k dotazu.

TECHNICKÁ POZNÁMKA: Tři vrstvy jsou mapa talku, ne genealogie: BERT (S25) a rerankery jsou odbočky, ne předchůdci GPT. GPT při základním autoregresivním tréninku predikuje další token z předchozího textu; původní BERT používá masked language modeling a také next sentence prediction. Původní BERT není běžný autoregresivní chatbot; GPT ovšem umí také klasifikovat. Rozdíl tréninkových úloh není striktní rozdělení možných aplikací. Předtrénovaný GPT ještě automaticky není asistent.

ZDROJ: BERT (S25); GPT 2018 (S26).

PŘECHOD: Pojďme tedy od začátku.`,

  "back-to-roots": `⏱ 0:30

ŘÍCT:
Back to the roots. Deset zastávek. U každé: jaký problém řešili, co zlepšili a na jaký nový limit narazili.

POINTA: Příběh limitů, ne seznam jmen.

PŘECHOD: Rok 1913.`,

  "markov": `⏱ 0:45

ŘÍCT:
1913, Andrej Markov, ruský matematik. Vzal dvacet tisíc písmen Evžena Oněgina.

— další krok —

Každé písmeno označil: samohláska, nebo souhláska. A počítal, jak často po sobě jdou jednotlivé dvojice.

— další krok —

A výsledek? Po samohlásce následovala další samohláska asi ve 13 procentech případů. Po souhlásce asi v 66 procentech. Když víme, co bylo předtím, líp odhadneme, co přijde dál. O významu příběhu přitom nevíme nic.

POINTA: Kořen myšlenky „další symbol závisí na předchozím“.

TAHÁK NAVÍC / PŘI DOTAZU:
Andrej Andrejevič Markov (1856–1922), matematik působící v Petrohradě. Zkoumal pravděpodobnost a závislé náhodné jevy; odtud Markovovy řetězce.
Ano, publikoval to: práce z roku 1913 je dostupná v anglickém překladu jako An Example of Statistical Investigation of the Text Eugene Onegin Concerning the Connection of Samples in Chains (Science in Context, 2006).

TECHNICKÁ POZNÁMKA: Říkat „písmena nejsou statisticky nezávislá“, nikoli „není to náhodné“. I náhodný proces může mít závislosti. Markov teorii závislých posloupností rozvíjel už od roku 1906; Oněgin byl empirický příklad, ne vynález language modelu ani důkaz porozumění jazyku. Hodnoty 0,128 a 0,663 jsou zaokrouhlené výsledky pro jeho analyzovaný vzorek (S17, Link, s. 335), ne univerzální vlastnost jazyků. Písmena na slidu jsou naše ilustrace latinkou, nikoli původní Markovova data.

ZDROJ: Markov 1913 (S17).

PŘECHOD: O 35 let později to někdo vzal vážně pro celý jazyk.`,

  "kocka": `⏱ 1:15

ŘÍCT:
Nic neříkat. Nechat sál doplnit. Počkat 3–4 vteřiny.

— další krok —

Střeše, gauči, zemi… Nikdo nevěděl tu „správnou“. Ale všichni věděli, co je pravděpodobné.

— další krok —

Gratuluju, právě jste byli language model. Je to našeptávač z mobilu. Jen hodně velký.

POINTA: Language model odhaduje, co bude dál.

PŘECHOD: Tuhle hru hrál už v roce 1951 Claude Shannon.`,

  "shannon": `⏱ 1:00

ŘÍCT:
V roce 1951 dělal Claude Shannon v zásadě stejnou hru, kterou jsme před chvílí hráli my.

— další krok —

Lidi dostali začátek textu a hádali další písmeno. Na téhle ilustraci číslo říká, kolikátým pokusem se člověk trefil. Často hned napoprvé.

— další krok —

Stejná hra jako s kočkou, jen po písmenech. Shannon tím zjišťoval, kolik nejistoty zbývá v dalším písmenu, když známe kontext. Jazyk má pravidelnosti a jejich důsledky můžeme měřit. Tady ale hádal člověk.

(Volitelně, 10 s:) Claude Shannon. To jméno vám možná něco připomíná. WIRED píše, že v Claudeovi lze číst i odkaz na něj.

POINTA: „Hádej, co bude dál“ je desítky let stará myšlenka.

TAHÁK NAVÍC / PŘI DOTAZU:
Ano, dvě zásadní publikace:
1948 — A Mathematical Theory of Communication: základy teorie informace, také statistické aproximace angličtiny. Od náhodných znaků přes četnosti písmen po návaznosti znaků a slov. Text postupně víc připomíná jazyk.
1951 — Prediction and Entropy of Printed English: lidé hádají další písmeno; Shannon z toho odhaduje entropii a redundanci angličtiny.
Jsou to už language models? Statistické generátory z roku 1948 můžeme chápat jako jednoduché jazykové modely. Neuronová síť k tomu není potřeba. Na tomto slidu ale ukazujeme princip lidského experimentu z roku 1951.

TECHNICKÁ POZNÁMKA: Řádek s počty pokusů je česká ilustrace principu, ne Shannonova data (experiment byl v angličtině, 1951, Prediction and Entropy of Printed English; 1948 A Mathematical Theory of Communication: aproximace jazyka různých řádů). Markov 1913 = analýza sekvenční závislosti samohlásek/souhlásek, ne „vynález language modelu“. Myšlenka nebyla „u ledu“: postupně se používala a zlepšovala. Claude callback: podle WIRED (Levy 2025) jméno vyjadřuje familiaritu a vřelost a podle toho, koho se ptáte, i odkaz na Shannona — není to jednoznačný původ názvu, říkat jen jako vtip.

ZDROJ: Markov 1913 (S17); Shannon 1948, 1951 (S18); WIRED 2025 (S24).

PŘECHOD: Jak z toho udělat stroj? Nejdřív prostě počítáním.`,

  "ngramy": `⏱ 1:30

ŘÍCT:
Nemůžeme mít spolehlivou tabulku pro každou celou větu: většinu dlouhých kontextů nikdy neuvidíme. Tak si necháme jen pár posledních slov. Vezmeme hromadu textu a spočítáme, co chodí po „sedí na“. Střeše padesátkrát, gauči dvacetkrát. Z toho je rozdělení. Dvě předchozí slova určují odhad třetího — trigram. Stejná smyčka jako dnes, jen pravděpodobnosti jsou z tabulky.

— další krok —

Problém: když chci delší historii včetně kočky, tabulka zná „kočka sedí na střeše“, ale „kotě sedí na střeše“ nikdy neviděla. Pro ni jsou kočka a kotě dvě nesouvisející kolonky.

— další krok —

Řešilo se to chytře: když neznám delší kontext, zkusím kratší. Backoff.

— další krok —

Fungovalo to desítky let, třeba v rozpoznávání řeči. Tady patří do příběhu i Bedřich Jelínek a jeho tým v IBM: kombinovali, co odpovídá zvuku, s tím, jak pravděpodobná je posloupnost slov. Limit základní tabulky: podobná slova sama od sebe nesdílí statistiky.

POINTA: N-gramy: správný princip, ale základní slovní tabulka sama nesdílí podobnost slov.

TAHÁK NAVÍC / PŘI DOTAZU (volitelné, cca 30–45 s):
N-gram je sám language model. Není to náhrada za „LM, který nešel spočítat“. Je to praktické zjednodušení: místo celé historie použijeme posledních N−1 slov. Unigram: žádné předchozí slovo. Bigram: jedno. Trigram: dvě.
Nejde jen o výkon počítače. Hlavně nemáme dost příkladů pro všechny dlouhé kontexty. Kratší kontexty potkáme častěji, a tak jejich pravděpodobnosti dokážeme lépe odhadnout. Princip vidíme už u Shannonových aproximací; 70.–90. léta na timeline označují praktické využití, ne vynález.
Frederick / Bedřich Jelínek (1932–2010), vědec českého původu, vedl výzkumnou skupinu IBM v letech 1972–1993. N-gramy nevynalezl. Pomohl statistické metody prosadit a rozvinout v praktickém rozpoznávání řeči.
Naše ilustrace: „mít“ a „mýt“ znějí stejně. Zvuk pravopis nerozhodne, kontext pomůže: „mít pravdu“, ale „mýt nádobí“. Rozpoznávač kombinuje shodu se zvukem a pravděpodobnost slovní posloupnosti.
Publikace: Frederick Jelinek, Continuous Speech Recognition by Statistical Methods, Proceedings of the IEEE, 1976.

TECHNICKÁ POZNÁMKA: N-gram = posloupnost N slov; trigram predikuje z 2 předchozích. Exploze kombinací: slovník 100 000 slov → 10^10 bigramů, 10^15 trigramů; většinu nikdy neuvidíme (sparsity), proto nepomůže jen zvyšovat N. Smoothing a backoff byly vyspělé techniky (srovnání Chen & Goodman 1996); statistický speech recognition (IBM, Jelinek, 70. léta). Neprezentovat jako primitivní slepou uličku. „Kočka ≠ kotě“ platí pro základní slovní model; class-based n-gramy podobnost slov částečně řešily. Četnosti na slidu ilustrativní: 50/20/10 z korpusu se třemi pokračováními = 62,5 / 25 / 12,5 %. Exploze kombinací = teoretický počet možností, ne nutně alokovaná velikost tabulky.

ZDROJ: Jelinek 1976, Chen & Goodman 1996 (S19).

PŘECHOD: Z četností rovnou plyne rozdělení.`,

  "rozdeleni": `⏱ 0:45

ŘÍCT:
Model nevrací odpověď. Vrací rozdělení: jak pravděpodobný je každý možný další token.

— další krok —

Z četností z minulého slidu: 50 z 80 je 62,5 %, 20 z 80 je 25 %, 10 z 80 je 12,5 %. To je rozdělení. Tenhle princip dnešní modely zdědily.

POINTA: Výstup je rozdělení pravděpodobností dalšího tokenu.

TECHNICKÁ POZNÁMKA: Ilustrativní korpus se třemi pokračováními; skutečný n-gram model by navíc vyhlazoval a nechal pravděpodobnost i neviděným slovům. Dnešní modely počítají skóre (logits) a softmax, ne četnosti, ale výstup je stejně rozdělení. Pravděpodobnost ≠ jistota pravdivosti.

VTIP: Ani velká pravděpodobnost není razítko pravdy.

PŘECHOD: Jenže kočka a kotě jsou pro tabulku cizí.`,

  "bengio": `⏱ 0:45

ŘÍCT:
2003, Bengio a kolegové. Co kdyby kočka a kotě nebyly dvě kolonky? Každé slovo dostane naučenou polohu. Síť se může naučit, že se kočka a kotě používají podobně, a zvládnout i kombinace, které neviděla. Auto je jinde.

— další krok —

Limit: okno kontextu je pořád pevné a trénink byl tehdy drahý.

POINTA: Z tabulky četností k naučené reprezentaci jazyka.

TAHÁK NAVÍC / PŘI DOTAZU:
Yoshua Bengio: průkopník hlubokého učení z Université de Montréal; spolu s Hintonem a LeCunem získal Turingovu cenu za rok 2018.
Tady jde o A Neural Probabilistic Language Model (2003), s Ducharmem, Vincentem a Jauvinem. Společně učí číselné reprezentace slov a predikci dalšího slova. Díky sdílení pravidelností mezi podobnými slovy může model lépe odhadnout i kombinace, které neviděl. Má pevné okno; není to RNN.
Nezaměnit s Learning Long-Term Dependencies with Gradient Descent Is Difficult (Bengio, Simard, Frasconi, 1994). Ta neříká „rekurentní sítě nefungují“. Ukazuje, proč se běžným gradientním učením obtížně učí dlouhé závislosti: opravný signál přes mnoho kroků může zeslábnout (mizející gradient).

TECHNICKÁ POZNÁMKA: Obrázek je schematická 2D podobnost, ne měření. Bengio 2003 se učí vektory slov a pravděpodobnosti společně; pevné okno N předchozích slov; výpočetní náročnost je explicitní téma paperu.

ZDROJ: Bengio et al. 2003 (S20); Bengio, Simard, Frasconi 1994: https://doi.org/10.1109/72.279181; Turingova cena: https://awards.acm.org/binaries/content/assets/press-releases/2019/march/turing-award-2018.pdf

PŘECHOD: Jak se zbavit pevného okna?`,

  "mikolov": `⏱ 0:45

ŘÍCT:
2010, Tomáš Mikolov a kolegové. Rekurentní síť si nese historii textu ve svém stavu. Žádné pevné okno. Mimochodem, docela podstatná část téhle historie se odehrávala v Brně.

— další krok —

Limit: počítá krok za krokem a dlouhé závislosti se učí špatně.

POINTA: Stav místo pevného okna.

TAHÁK NAVÍC / VOLITELNÝ PŘÍBĚH (cca 25 s):
„A teď Brno. Tomáš Mikolov zkouší rekurentní sítě, i když od okolí slyší, že se nedají pořádně trénovat. Rozchodí je a dostane tak dobré výsledky, že mu někteří nevěří. Tak zveřejní kód: můžete si to ověřit sami.“
CALLBACK NA JELÍNKA (cca 10 s): „A naše zastávky se tu osobně propojí: v roce 2010 byl Tomáš na stáži na Johns Hopkins a pracoval i pod vedením Bedřicha Jelínka — toho od statistického rozpoznávání řeči.“
Opora: stanovisko školitele potvrzuje šestiměsíční stáž v roce 2010 pod vedením Freda Jelínka a Sanjeeva Khudanpura (S27).

Chronologie: 2010 práce RNNLM a zveřejnění toolkitu; 2012 doktorát na VUT a nástup do Google Brain; 2013 word2vec s kolegy v Googlu. RNNLM toolkit tedy nevznikl až kvůli nedůvěře v Googlu.

TECHNICKÉ UPŘESNĚNÍ PŘÍBĚHU: Nedůvěru okolí a neznalost problémů gradientů při začátcích popisuje Mikolov ve vlastních vzpomínkách (S27). Nedokládá to doslovné „nečetl Bengia“ ani „celý svět pochopil paper špatně“. Bengio 1994 popsal obtíže učení dlouhých závislostí, ne nemožnost funkčních RNN. Mikolov později s Bengiem na tomto tématu spolupracoval. Neříkat, že v Česku nemohl uspět: zásadní část práce vznikla právě na VUT ve spolupráci s JHU; konkrétní odmítavé reakce nejsou důkazem důvodu jeho emigrace.

TECHNICKÁ POZNÁMKA: Mikolov, Karafiát, Burget, Černocký, Khudanpur (Interspeech 2010; VUT Brno + JHU). Stav RNN ≠ garantovaná neomezená paměť; vanishing/exploding gradients. LSTM (1997, S23) existovalo dřív, jen nuance. Neříkat, že Mikolov vynalezl LLM.

ZDROJ: Mikolov et al. 2010 (S21); Hochreiter & Schmidhuber 1997 (S23); Mikolovovy rozhovory (S27).

PŘECHOD: A pak odbočka.`,

  "word2vec": `⏱ 0:45

ŘÍCT:
2013, word2vec. Mikolov a kolegové, tentokrát v Googlu. Tady nejde o generování textu. Jde o to, levně se naučit dobré vektory slov z jejich okolí v obřím korpusu.

— další krok —

Slavný příklad: král minus muž plus žena vyjde blízko královny. Funguje to přibližně, ne vždy.

— další krok —

Limit: jedno slovo, jeden vektor, bez ohledu na kontext. A text sám netvoří.

POINTA: Vedlejší větev, která ukázala, kolik struktury je ve vektorech slov.

TAHÁK NAVÍC / VOLITELNÝ CALLBACK (cca 15 s):
„V Googlu pak s kolegy vytvoří word2vec — rychlý způsob, jak se naučit vektory slov. A znovu pomůže dát ostatním do ruky něco, co si můžou spustit. Nestačil paper. Pomohl fungující software.“
Podle Mikolovovy vzpomínky musel prosazovat zveřejnění kódu: Google v něm zprvu viděl konkurenční výhodu. Po uvolnění v roce 2013 zájem výrazně vzrostl. Odlišit od RNNLM toolkitu z roku 2010; jde o dvě etapy. Postoje kolegů i průběh schvalování uvádět jako jeho osobní vyprávění (S27).

TECHNICKÁ POZNÁMKA: CBOW a Skip-gram (arXiv 1301.3781), negative sampling v navazující práci (1310.4546). Word2vec není další generace RNN LM ani přímý předchůdce embeddingů v Transformeru. Analogie král/královna je z původních prací, výsledky přibližné.

ZDROJ: Mikolov et al. 2013a, 2013b (S22); Mikolovovy rozhovory (S27).

PŘECHOD: Zpátky k problému „krok za krokem“.`,

  "motor": `⏱ 2:00

ŘÍCT:
2017, Transformer. Ukážu ho na dnešním motoru typu GPT, jen minimum. Pět kroků. Text.

— další krok —

Rozseká se na tokeny, kousky textu. Tady jsou z „Kočka“ dva.

— další krok —

Každý token dostane číselné ID. To je jen číslo položky v katalogu. Pod ním si model vyzvedne celý balíček čísel — embedding. A s tím pak počítá.

— další krok —

Projdou sítí: miliardy naučených čísel, žádná tabulka odpovědí. Transformer staví na attention místo rekurence: každý token se může podívat na předchozí text a při tréninku se pozice zpracují paralelně. Limit: kontext má strop.

— další krok —

Na konci vypadne skóre pro každý možný další token.

POINTA: Text → tokeny → čísla → síť → skóre. Žádná databáze odpovědí.

TAHÁK NAVÍC / PŘI DOTAZU:
Dvě různá mapování: slovník tokenizeru přiřadí kousku textu token ID; embedding tabulka modelu tomuto ID přiřadí naučený vektor o N rozměrech.
Schematicky: token → ID 33185 → řádek E[33185] → [0.12, −0.47, …]. Čísla ve vektoru jsou ilustrativní. ID je index, ne samotný embedding ani číselný význam tokenu. Sousední ID neznamenají podobná slova.
Tohle je vstupní embedding. Stejný token začíná stejným vektorem z tabulky; při zpracování v síti se jeho reprezentace mění podle kontextu. Informace o pozici se zapojuje podle konkrétní architektury.

TECHNICKÁ POZNÁMKA: ZJEDNODUŠENÍ PRO VYSVĚTLENÍ. Attention existovala před rokem 2017; Transformer odstranil rekurenci. Ukazujeme dnešní autoregresivní LM, ne původní encoder–decoder Transformer: o200k a miliardy parametrů nejsou rok 2017. Paralelizace se týká tréninku, generování dál postupuje token po tokenu. Tokenizace podle o200k_base (tiktoken); jiné modely mají jiné tokenizery. Token ID → embedding (vektor) + informace o pozici. Síť = transformer: vrstvy attention + MLP, opakované N×; vynechány normalizace, residual connections. Attention je kauzální (vidí současnou a předchozí pozice, ne budoucí) a není totéž co uvažování. Model může některé tréninkové pasáže memorovat, takže „není databáze“ ≠ „nic si doslova nepamatuje“.

ZDROJ: tiktoken (S3); Vaswani et al. 2017 (S2); Transformer Explainer (S1).

PŘECHOD: Odkud se ta naučená čísla vzala?`,

  "pretraining": `⏱ 1:30

ŘÍCT:
2018, první GPT: tenhle motor nakrmíme hromadou textu. Dnešní modely dělají totéž v mnohem větším měřítku. GPT znamená Generative Pre-trained Transformer. Tady popisujeme pretraining: vzniká base model, který umí pokračovat v textu. Učení role asistenta přijde až později.
Z textu. Zakryjeme další slovo a necháme model hádat.

— další krok —

Funguje to na fakta…

— další krok —

…i na kód.

— další krok —

Porovnáme s tím, co v textu bylo, a maličko upravíme naučená čísla. U dnešních velkých modelů se bavíme o bilionech tréninkových tokenů.

— další krok —

Aby dobře doplňoval, musí se naučit jazyk, fakta, kód, styl a vztahy. Pravidla mu nikdo nenapsal.

POINTA: Pretraining = obří množství malých oprav. Schopnosti jsou vedlejší produkt dobrého doplňování.

OBRÁZEK / VOLITELNĚ ŘÍCT (cca 15 s):
„Trochu jako ztrátová komprese toho, co lidé o světě napsali. Do parametrů se promítnou pravidelnosti z obrovského množství dat.“
Svěrák se zeměkoulí a stránkami je metafora. Model nekomprimuje samotný svět a není archiv, ze kterého vytáhneme původní dokumenty. Parametry ale mohou některé pasáže i memorovat. Nepřirovnávat halucinace doslova k JPEG artefaktům. Technický vztah predikce a bezeztrátové komprese je jiné tvrzení než tato vizuální analogie.

VTIP: Pár miliard knoflíků. Ručně by to trvalo.

TECHNICKÁ POZNÁMKA: ZJEDNODUŠENÍ PRO VYSVĚTLENÍ. Slova místo tokenů, příklady ilustrativní. Biliony tokenů a ukázka kódu patří k dnešnímu měřítku, ne korpusu GPT 2018 (S26, menší korpus knih). „Knoflíky“ = naučené parametry, ne fyzické prvky. Nejde o binární správně/špatně: trénink zvyšuje pravděpodobnost skutečně pozorovaného tokenu (gradient descent přes backpropagation). Trénovací text nemusí být pravdivý. Schopnosti jsou empirický výsledek škály dat a modelu, ne důkaz lidského myšlení; slovo „emergence“ nepoužívat jako vysvětlení.

ZDROJ: Radford et al. 2018 (S26); Brown et al. 2020 (S4); Schaeffer et al. 2023 (S5).

PŘECHOD: Jak vypadá výsledek? Skutečná ukázka z roku 2019.`,

  "gpt2": `⏱ 1:00

ŘÍCT:
GPT-2, 2019. Lidé mu dali začátek vymyšlené zprávy: v Andách objevili jednorožce, kteří mluví anglicky.

— další krok —

A model napsal článek. Novinový styl, vymyšlený biolog Jorge Pérez, citace vědců.

— další krok —

Plynulý text ve správném žánru. Rozvíjí zadanou fikci. Není to ověřování zprávy.

POINTA: Pretrained model umí plynule pokračovat v žánru, který dostane.

TECHNICKÁ POZNÁMKA: České shrnutí skutečné ukázky (Radford et al. 2019, tab. 13), ne doslovná citace. Autoři vybrali 1 z 10 pokusů, sampling top-k 40. Je to pokračování fikce: vstup už byl fikce, nejde o halucinaci při faktické otázce.

ZDROJ: Radford et al. 2019, GPT-2 (S14).

PŘECHOD: Jak vybírá konkrétní pokračování?`,

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

TECHNICKÁ POZNÁMKA: Temperature je parametr dnešních modelů, ilustrace; nepřisuzovat ho historickým n-gramům (Shannon 1948 sice generoval text losováním z četností, ale bez tohohle slideru). Ilustrativní čísla: syntetické logits [3,2,1,0], softmax(logits / T), hodnoty skutečně spočtené. Pořadí kandidátů se nemění. Temperature není „kreativita“ a nezaručuje pravdivost. T = 0 = konvence pro greedy. Ani greedy nemusí být bitově reprodukovatelné (floating point, dávkování); sampling není jediný zdroj variability.

ZDROJ: Transformer Explainer (S1); PyTorch Reproducibility / Numerical accuracy (S9, S10).

ŽIVÁ UKÁZKA (volitelně, max 1 min z rezervy): Transformer Explainer, posunout temperature slider.

PŘECHOD: A tohle se opakuje.`,

  "smycka": `⏱ 0:30

ŘÍCT:
Síť nám dá nabídku dalších tokenů i s jejich pravděpodobnostmi. Z té nabídky jeden vybereme, přilepíme ho za text a celé to pustíme znovu. Tak postupně vzniká odpověď.
(Rychle proklikat 3 kroky vpravo.) „Střeše“ vzniká ze tří tokenů.

POINTA: Generování = smyčka. Nic víc.

TAHÁK NAVÍC / PŘI DOTAZU:
Kontext = dosavadní text; v chatu také instrukce a dostupná historie konverzace.
Síť = zpracuje kontext a spočítá skóre pro každý token ve slovníku. Tahle smyčka platí pro base model i pro model po post-trainingu, který už funguje jako asistent.
Rozdělení = pravděpodobnosti možných dalších tokenů, dohromady 100 %. Zatím jsme nic nevybrali.
Sampling = vylosování jednoho tokenu podle těchto pravděpodobností. Favorit má největší šanci, ale nemusí vyhrát. Temperature před výběrem mění rozdělení; alternativou je vzít nejpravděpodobnější token bez losování (greedy decoding).
Další token = vybraný token připojíme a tím vznikne nový kontext. Opakujeme.
Příklad jen pro intuici, celá slova místo tokenů: „Kočka sedí na“ → střeše 40 %, gauči 30 %, zemi 20 %, ostatní 10 %. Padne „gauči“ → nový kontext „Kočka sedí na gauči“ → znovu odhadujeme, třeba tečku nebo „a“. Čísla jsou vymyšlená ilustrace, ne výstup modelu ani hodnoty grafu na slidu.

TECHNICKÁ POZNÁMKA: Běží do ukončovacího tokenu nebo limitu. Text se znovu netokenizuje, přidá se ID. Při běžném generování se váhy nemění. Smyčka je logický popis; implementace může průběžné výpočty ukládat a znovu používat, nemusí celý kontext pokaždé počítat od začátku.

PŘECHOD: Teď ho zkusme o něco požádat.`,

  "base-model": `⏱ 1:15

ŘÍCT:
Být, či nebýt? A druhá otázka: Co děláš? Nechat krátkou pauzu pro publikum.

— další krok —

Toť otázka. A u druhé: žes tak vesel stále — Pejsku náš, co děláš… My vidíme otázku. Doplňovač v tom může vidět začátek známého textu a prostě pokračovat. Tohle je ilustrace, ne naměřený výstup modelu.

— další krok —

A teď skutečný příklad. Prompt: napiš francouzsky krátký příběh o žábě, která cestuje časem do antického Řecka.

— další krok —

GPT-3 bez dalšího tréninku příběh nenapsal. Přidal další zadání: příběh o dítěti a bozích, o mladíkovi v jiné době…

— další krok —

Viděl začátek seznamu zadání a pokračoval v něm. Limit éry GPT: umí pokračovat v textu, roli pomocníka nemá zaručenou.

POINTA: Base model doplňuje dokument; pomoc není jeho výchozí role.

TECHNICKÁ POZNÁMKA: Shakespeare i písnička jsou naše ilustrace doplňování známého textu, nikoli autentické výstupy konkrétního modelu. Stejně může pokračovat i chatovací asistent; rozdíl base/asistent dokládá až následující příklad se žábou. České shrnutí skutečných výstupů (Ouyang et al. 2022, obr. 42, stejný prompt jako obr. 8), příklad vybraný autory pro ilustraci, ne benchmark. Base model umí instrukce plnit i přes vhodně postavený prompt; není absolutně neschopný. Starší completion model, ne dnešní chat.

ZDROJ: Ouyang et al. 2022, InstructGPT (S6), https://arxiv.org/html/2203.02155v1#A6.F42

PŘECHOD: Jak z doplňovače uděláme asistenta?`,

  "instruction": `⏱ 0:45

ŘÍCT:
2022, ChatGPT. Ukážeme mu dokumenty, které vypadají jako konverzace.

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

  "zaba-po": `⏱ 0:45

ŘÍCT:
Stejný prompt. Base model psal další zadání.

— další krok —

Po celém post-trainingu napsal příběh o unavené žábě, která hledá cestu do Řecka.

— další krok —

Stejný motor. Jiné chování. Limit: zní to jako odpověď, a to ještě nezaručuje pravdu.

POINTA: Post-training mění chování, ne mechanismus.

TECHNICKÁ POZNÁMKA: Shakespeare i písnička jsou naše ilustrace doplňování známého textu, nikoli autentické výstupy konkrétního modelu. Stejně může pokračovat i chatovací asistent; rozdíl base/asistent dokládá až následující příklad se žábou. České shrnutí skutečných výstupů (obr. 42). InstructGPT = celý pipeline SFT + RLHF, ne izolovaný efekt jednoho kroku. Výstupy s různým nastavením (GPT-3 T 0.7, InstructGPT T 1).

ZDROJ: Ouyang et al. 2022, obr. 42 (S6).

PŘECHOD: Shrnuto do tří kroků.`,

  "evoluce": `⏱ 0:30

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

  "halucinace": `⏱ 1:00

ŘÍCT:
Dnes. Zní to jako odpověď. Sebejistě.

— další krok —

To nezaručuje pravdu. Motor pořád odhaduje další token.

— další krok —

Model může říct „nevím“. Generování ale nezaručuje, že správně pozná kdy.

POINTA: Vypadá jako asistent ≠ garantovaně správně.

TECHNICKÁ POZNÁMKA: V každém kroku vznikne nějaké rozdělení a vybere se nějaký token; samotné generování neobsahuje krok ověření pravdy. Halucinace nemají jediný mechanismus (vzácná data, konflikty, dekódování, tlak na hádání místo abstence). Trénink může abstenci zlepšit; RAG ani tools nejsou univerzální oprava.

ZDROJ: Kalai et al. 2025 (S7).

PŘECHOD: Druhá věc, která lidi překvapuje.`,

  "pocitani": `⏱ 1:00

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

  "agent": `⏱ 0:45

ŘÍCT:
Model navrhne akci, kód ji ověří a spustí, výsledek jde zpátky. A znovu, dokud není hotovo.

— další krok —

LLM není celý agent. Zbytek je normální software. Limit: pořád je to odhad, za výsledek odpovídá systém.

POINTA: Agent = LLM + nástroje + kód ve smyčce.

TECHNICKÁ POZNÁMKA: Model sám nic nespouští; okolní kód rozhoduje o oprávněních. Samotné přidání paměti/stavu z modelu agenta nedělá.

ZDROJ: Yao et al. 2022, ReAct (S12).

PŘECHOD: Kam tedy LLM patří a kam ne?`,

  "spatne": `⏱ 1:00

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

  "dobre": `⏱ 1:00

ŘÍCT:
„No paráda, zase mi to přišlo rozbitý.“

— další krok —

Klíčové slovo říká pochvala. A pravidel přibývá: výjimka, výjimka z výjimky…

— další krok —

Každý člověk ví, že je to stížnost. Tady se vyplatí model vyzkoušet a změřit, jak dobře klasifikuje.

POINTA: LLM tam, kde pravidlo napsat neumíme.

TECHNICKÁ POZNÁMKA: LLM není jediný možný klasifikátor. Výstup omezit na validovaný výčet včetně „nejisté → člověk“; výsledek je odhad, ne fakt.

PŘECHOD: Dejme to dohromady.`,

  "architektura": `⏱ 0:45

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

PŘECHOD: Takže… zničí nás Terminátoři či transformátoři?`,

  "terminatori": `⏱ 1:00

ŘÍCT:
Tak Terminátoři, nebo transformátoři? Slíbil jsem poctivou odpověď.

— další krok —

Rozebrali jsme mechanismus. Tím jsme ale nevyřešili otázku vědomí ani bezpečnosti. Co můžeme řídit hned: oprávnění, ověřování, lidský dohled.

— další krok —

DON'T PANIC neznamená don't care.

— další krok —

LLM není magie. Je to software. Velmi zvláštní software. Kde stačí přesné pravidlo, použijte ho. Model přidejte tam, kde samotná pravidla nestačí. Díky.

POINTA: Nepanikařit ≠ nestarat se. Callback na začátek.

TECHNICKÁ POZNÁMKA: Nezlehčovat ani nepřehánět. Neříkat, že rizika jsou „hlavně v nasazení“. Nedělat predikce o AGI.

PŘECHOD: Resources + Q&A.`,

  "zdroje": `⏱ 0:00 (visí během Q&A)

ŘÍCT:
Kdo si chce na krabičku sáhnout sám: Transformer Explainer běží v prohlížeči.

VIDEO PRO ZVÍDAVÉ: Andrej Karpathy, Deep Dive into LLMs like ChatGPT. Kapitoly: tokenizace 07:47, vstup/výstup sítě 14:27, inference 26:01, post-training 59:23, halucinace a tools 1:20:32. (S13)

POINTA: Kdo chce krabičku rozebrat hlouběji sám, má kde začít.

ZDROJ: kompletní seznam v sources.md (S1–S26).

PŘECHOD: Q&A.`,

};
