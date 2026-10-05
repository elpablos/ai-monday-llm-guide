Chci, abys vytvořil kompletní prezentaci pro cca 30min přednášku na AI Monday v češtině.

Výsledkem má být hotový slide deck, ideálně PPTX + editovatelný zdroj, ze kterého byl vygenerován. Pokud máš k dispozici tooling pro prezentace, použij ho. Výstup vizuálně zkontroluj a iteruj nad ním, neodevzdávej jen první vygenerovanou verzi.

## Kontext přednášky

Pracovní název:

# Stopařův průvodce po LLMs
## aneb zničí nás Terminátoři?

Hlavní framing je inspirovaný Stopařovým průvodcem po Galaxii a lehce filmem 2001: Vesmírná odysea.

Klíčový motiv:

> DON'T PANIC

Nechci z toho ale cosplay Stopařova průvodce ani prezentaci plnou referencí na sci-fi. Je to jen lehký narativní rámec a running joke.

### Perex / úvodní myšlenka

Když jsem byl malej a něčemu nerozuměl, vzal jsem šroubovák a prostě se podíval, co je uvnitř. Většinu věcí už po mně nikdo nedal dohromady, ale aspoň jsem se pokaždé něco přiučil.

A jak se říká — co se v mládí naučíš, ve stáří jako když najdeš.

Tak pojďme společně vzít pomyslný otvírák na konzervy, podívat se pod pokličku té magické krabičky s nápisem LLM a zjistit, co se v ní doopravdy skrývá.

Proč si vlastně povídáme s něčím, co se v principu jen snaží uhodnout další token? Proč to halucinuje? Proč to neumí pořádně počítat? Co mají LLM společného s JPEGem? A jak je možné, že z něčeho tak zdánlivě jednoduchého nakonec vylezlo něco, co dokáže programovat, překládat nebo uvažovat nad problémy?

A hlavně — když zjistíme, jak to celé funguje, možná bude o něco jasnější, čeho se máme bát, čeho ne a k čemu je vlastně dobré AI používat.

---

# Publikum

AI Monday, tedy technicky orientované publikum, ale rozhodně ne všichni jsou ML engineers.

Počítej se směsí:

- software developerů
- product lidí
- managementu
- lidí, kteří používají ChatGPT/Claude, ale netuší moc, co se děje uvnitř
- několika lidí, kteří ML znají dobře

Prezentace proto nesmí být ani infantilní, ani matematický deep dive.

Cíl je:

> vysvětlit principy tak jednoduše, aby je pochopil laik, ale zároveň tak správně, aby se ML engineer v publiku nechytal za hlavu.

---

# Hlavní message

Přednáška NENÍ o tom:

- jak promptovat
- který model je nejlepší
- jak postavit AI agenta
- deset AI nástrojů, které musíte používat
- historii AI

Je to DEMYSTIFIKACE LLM.

Publikum má na konci chápat zejména:

1. LLM pracuje s tokeny, ne se slovy a významem tak, jak ho vnímá člověk.
2. Tokeny se převádějí na číselné reprezentace.
3. Transformer používá kontext a attention.
4. Základní úloha language modelu je predikce dalšího tokenu.
5. Model nevydává „správnou odpověď“, ale distribuci pravděpodobností.
6. Generování je opakované:
   kontext → pravděpodobnosti → výběr tokenu → nový kontext → znovu.
7. LLM je proto probabilistický/stochastický systém.
8. „Stochastický“ neznamená „náhodně plácající“.
9. Halucinace není podivný bug navíc. Je úzce spojená s tím, jak generativní model funguje.
10. Parametry modelu nejsou databáze dokumentů.
11. LLM není kalkulačka.
12. LLM není search engine.
13. Externí tools, retrieval/RAG, kalkulačka, databáze atd. dávají LLM schopnosti, které samotný model nemá.
14. Nemá smysl nahrazovat deterministické řešení probabilistickým jen proto, že teď máme AI.
15. Nejzajímavější systémy kombinují:
    - deterministické části
    - probabilistické schopnosti AI
    - deterministické guardrails.

Finální myšlenka může být přibližně:

> Don't replace certainty with probability unless probability solves a problem certainty can't.

A případně:

> The future isn't AI replacing software.
> It's deterministic software with probabilistic capabilities.

Poslední callback:

> DON'T PANIC.
> It's just software.
> Very weird software.

---

# Narativ

Chci, aby přednáška působila jako fyzické rozebírání zařízení.

Na začátku máme černou magickou krabičku:

                    ┌─────────────┐
prompt ────────────>│     LLM     │────────────> answer
                    └─────────────┘

A postupně z ní sundáváme jednotlivé vrstvy.

Na konci už místo magické krabice vidíme přibližně:

text
  ↓
tokenizer
  ↓
tokeny
  ↓
embeddings / číselné reprezentace
  ↓
transformer blocks / attention
  ↓
logits
  ↓
pravděpodobnosti dalšího tokenu
  ↓
sampling
  ↓
další token
  ↓
repeat

Pak na tuto jednoduchou mašinu postupně přidáváme okolní software:

LLM
 + context
 + retrieval
 + tools
 + memory/state
 + deterministic code
 + validation
 + guardrails

A teprve z toho vznikají dnešní AI aplikace / agenti.

---

# Doporučená struktura

Ber ji jako výchozí. Pokud během práce najdeš lepší dramaturgii, uprav ji, ale zachovej hlavní příběh.

## 1. DON'T PANIC

Silný jednoduchý opening.

„Zničí nás AI?“
„Vezme nám práci?“
„Myslí?“
„Ví?“

Pak:

> Lidé se nejvíc bojí toho, čemu nerozumí.
> Tak to pojďme rozebrat.

Nechci dlouhou historii AI.

---

## 2. Šroubovák

Použij příběh z dětství o rozebírání věcí.

Vizuálně něco jako:

magická černá krabička LLM + šroubovák / otevřené víko.

Klidně humor:

> většina věcí už po mně nikdy nefungovala

---

## 3. Zahrajme si na language model

Velký text:

> Kočka sedí na ...

Nech prostor pro publikum.

Pak ukaž možné pokračování:

střeše
gauči
zemi
stole
...

Pointa:

> Gratuluju. Právě jste si zahráli na language model.

Neříkej zatím nic o transformeru.

---

## 4. LLM nevidí text

Rozlož jednoduchou větu na tokeny.

Vysvětli:

- token není nutně slovo
- může být kus slova
- interpunkce
- různé jazyky mají různou tokenizaci

Nezahlcovat detaily.

---

## 5. A tokeny se změní na čísla

Token IDs → embeddings.

Nejít do lineární algebry.

Mentální model:

> Aby s tím mohl počítač něco dělat, převedeme jazyk na čísla.

Pokud vysvětluješ embedding, drž se vztahů / podobnosti, nikoliv tvrzení typu „v embeddingu máme význam slova uložený na konkrétních souřadnicích“.

---

## 6. Attention

Jedna srozumitelná myšlenka:

> Když zpracovávám tento token, které předchozí části kontextu jsou pro něj důležité?

Můžeš použít větu s nejednoznačným zájmenem nebo jinou jednoduchou ukázku.

NECHCI:

- Q/K/V matematický deep dive
- maticové násobení
- sqrt(d)
- několik slidů o multi-head attention

Je možné Q/K/V zmínit jako technický detail v poznámkách pro speakera, ale ne jako hlavní obsah slidu.

---

## 7. Transformer

Teprve teď ukaž, že se vrstvy attention + MLP opakují.

Důležitá pointa:

> Není tam žádná ručně napsaná databáze odpovědí.

Nemusíme vysvětlovat celý Transformer paper.

---

## 8. Co z toho na konci vypadne?

Logits → softmax → distribuce pravděpodobností.

Například:

"Kočka sedí na ..."

střeše  31 %
gauči    18 %
zemi     11 %
stole     7 %
...

Tohle je jeden z nejdůležitějších slidů.

---

## 9. A teď hodíme kostkou

Vysvětli sampling a stochasticitu.

Důraz:

> Stochastický neznamená náhodný chaos.

Model vytváří velmi strukturovanou distribuci pravděpodobností.

Použij analogii:

„Je to kostka, která před každým hodem úplně změní pravděpodobnosti svých stran podle všeho, co zatím viděla.“

Vysvětli intuitivně temperature.

Klidně vizuálně:

temperature 0.2:
A ███████████████████
B ██
C ▏

temperature 1.2:
A ███████
B █████
C ████
D ███

Bez zbytečných rovnic.

---

## 10. A znovu. A znovu. A znovu.

Animovat nebo vizualizovat autoregresivní smyčku:

context
 ↓
prediction
 ↓
token
 ↺

Tohle by mělo být velmi jednoduché.

---

## 11. Tak proč je to tak chytré?

Tohle je důležitá otázka.

Pokud je základní operace jen next-token prediction, jak z toho vznikne překlad, programování, sumarizace, reasoning atd.?

Vysvětli emergentní schopnosti opatrně.

Neříkej nepodložené věci typu „model si vytvoří skutečný model světa“ jako fakt.

Můžeme říct:

Training ho nutí zachytit obrovské množství statistických struktur a vztahů v jazyce a datech, protože bez nich by další token nedokázal dobře predikovat.

---

## 12. Training

Teprve teď vysvětli velmi zjednodušeně training:

text:
„Kočka sedí na rohožce.“

model:
„Kočka sedí na ...“

predikce:
střeše 40 %
rohožce 3 %

správná odpověď:
rohožce

→ chyba
→ malá úprava parametrů
→ znovu
→ obrovské množství opakování

Není potřeba vysvětlovat derivace ani backpropagation matematicky.

Může být running joke:

> pootočíme pár miliard knoflíků

Ale explicitně řekni, že je to zjednodušení.

---

## 13. LLM jako komprese světa?

Tady použij teaser s JPEGem.

Chci vysvětlit analogii, ale velmi pečlivě.

JPEG:

obrázek
 ↓
lossy compression
 ↓
kompaktní reprezentace
 ↓
přibližná rekonstrukce

LLM:

obrovské množství tréninkových dat
 ↓
training
 ↓
parametry
 ↓
generování

Pointa:

Model není databáze originálních dokumentů.

Je možné se na něj dívat jako na něco, co zachytilo obrovské množství struktur a pravidel v komprimované, ztrátové podobě.

ALE explicitně uveď:

> LLM není JPEG a mechanismus funguje úplně jinak.
> Je to analogie pro intuici, ne technický popis.

Nevytvářej falešné tvrzení, že halucinace jsou doslova ekvivalent JPEG artefaktů.

Analogii použij pouze jako pedagogický most.

---

## 14. Proč halucinuje?

Klíčový slide.

Model má za úkol generovat pravděpodobné pokračování.

Nemá implicitní funkci:

I_DONT_KNOW()

A nemá automatický přístup k nějaké autoritativní databázi faktů.

Proto je generování věrohodného pokračování přirozenou vlastností systému.

Formulace:

> Halucinace není cizí přívěsek nalepený na LLM.
> Je to důsledek toho, že po generativním modelu chceme odpověď i tam, kde nemá dostatečně spolehlivou oporu.

Buď technicky přesný:
moderní modely lze trénovat, aby uncertainty lépe komunikovaly, používaly tools atd., ale samotné generování tokenů problém pravdivosti neřeší.

---

## 15. Proč neumí dobře počítat?

Například:

2837 × 491 = ?

Pak:

> Kde přesně jste v tom stroji, který jsme právě rozebrali, viděli násobičku?

Nikde.

LLM může matematiku částečně naučit jako vzory a moderní modely mohou být v matematice velmi schopné, ale samotný jazykový model není totéž co deterministická kalkulačka.

Pak ukaž:

LLM → calculator tool → exact result

Silná pointa:

> Když mám kalkulačku, použiju kalkulačku.

---

## 16. Tak mu dejme nástroje

Postupně:

LLM
 ↓
LLM + context
 ↓
LLM + retrieval
 ↓
LLM + tools
 ↓
LLM + state
 ↓
agent

Vysvětli RAG jednoduše:

> Nedonutíme model, aby všechno věděl.
> Najdeme relevantní informace a vložíme mu je do kontextu.

Tools:

- calculator
- search
- database
- API
- Python
- interní systémy

Agent:

> LLM není celý agent.
> LLM je jedna z komponent systému.

---

## 17. A tady začíná klasický software

Tohle je důležitý přechod do původní hlavní myšlenky přednášky.

Ukaž dva světy:

DETERMINISTIC

- rules
- calculations
- validation
- authorization
- database constraints
- workflows
- invariants
- exact transformations

PROBABILISTIC

- interpretace jazyka
- klasifikace nejasného vstupu
- extrakce
- sumarizace
- generování
- práce s významem
- fuzzy matching / semantic understanding

---

## 18. Špatně

Příklad:

Máme datum narození.

Chceme zjistit, zda je člověk starší 18 let.

Špatně:

birth_date → LLM → "ano"

Správně:

birth_date → deterministic code → true/false

Pointa:

> Nedělej z deterministického problému probabilistický problém jen proto, že máš LLM.

---

## 19. Dobře

Například zákaznická zpráva:

„No paráda, zase mi to přišlo rozbitý.“

Chceme:

complaint / praise / question

Tady jednoduché if/else začne být velmi rychle absurdní.

Tady LLM / klasifikátor dává smysl.

---

## 20. Nejlepší z obou světů

Finální architektonický obrázek:

                  USER
                    │
                    ▼
               ┌─────────┐
               │   LLM   │
               └────┬────┘
                    │
       interpret / decide / generate
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
 deterministic tools     external knowledge
 calculator              search / RAG
 validation              database
 APIs                    documents
 business rules
          │                   │
          └─────────┬─────────┘
                    ▼
                VALIDATION
                    │
                    ▼
                  RESULT

Message:

> Take the best of both worlds.

LLM tam, kde potřebujeme práci s neurčitostí.

Deterministický software tam, kde umíme pravidla napsat přesně.

A deterministické guardrails kolem AI tam, kde potřebujeme spolehlivost.

---

## 21. DON'T PANIC

Poslední slide minimalistický.

Například:

# DON'T PANIC

LLMs aren't magic.

They are very strange,
very powerful software.

A pod tím menší:

> Don't replace certainty with probability unless probability solves a problem certainty can't.

Případně druhý závěrečný claim:

> deterministic software
> +
> probabilistic capabilities

---

# Transformer Explainer

Velmi důležitý zdroj a případně živá ukázka:

https://poloclub.github.io/transformer-explainer/

Prostuduj ho.

Může sloužit jako reference pro:

- tokenization
- embeddings
- transformer block
- attention
- logits
- softmax
- sampling
- temperature
- top-k / top-p

Nemusíš kopírovat jejich design.

Naopak chci vlastní, výrazně jednodušší vizualizace.

Do prezentace můžeš dát odkaz / QR kód na konci nebo na relevantním slidu.

Můžeme během talku web otevřít živě, takže můžeš do speaker notes navrhnout konkrétní místo, kde by to dávalo smysl.

---

# Vizuální styl

Nechci standardní corporate PowerPoint.

Nechci:

- gradientové AI mozky
- robotické hlavy
- neonové circuit-board obrázky
- stock fotky lidí ukazujících na hologram
- slide plný textových bulletů
- náhodné ikony v barevných kolečkách
- klasický consulting deck

Chci:

- dark background
- velmi jednoduchou typografii
- velké nápisy
- výrazné diagramy
- hodně whitespace
- jeden nápad na slide
- jednoduché schematické ilustrace
- lehký retro/sci-fi feeling
- černá / tmavá + bílá, případně jeden akcent
- terminál / monolit / technické schéma může být inspirace
- vizuálně někde mezi sci-fi manuálem, technickým blueprintem a Stopařovým průvodcem

Humor ano, ale dávkovat.

Sci-fi reference:
- DON'T PANIC
- Terminátor
- 2001 monolit
- případně 42

Používat jako koření, ne jako hlavní obsah.

---

# Jazyk

Celá prezentace primárně česky.

Technické termíny, kde je to přirozené, nech anglicky:

- token
- embedding
- attention
- transformer
- logits
- sampling
- temperature
- context
- RAG
- tool
- agent
- guardrail
- deterministic
- stochastic / probabilistic

Nesnaž se všechno násilně překládat.

Tón:

- přirozený
- lehce drzý
- praktický
- jednoduchý
- bez marketingového AI bullshit bingo
- ne akademický
- ne infantilní

Používej krátké věty.

---

# Technická přesnost

Při tvorbě prezentace si ověř technická tvrzení.

Zvlášť pozor na:

- LLM není jednoduše „databáze“
- sampling není jediný zdroj veškeré variability systému
- greedy decoding může být determinističtější
- floating-point / hardware / inference implementation mohou přinášet další nedeterminismus
- temperature není „míra kreativity“, ale parametr transformující distribuci při sampling
- embeddings nevysvětluj jako magickou mapu významu
- attention není totéž co reasoning
- halucinace nevysvětluj jako jediný jednoduchý mechanismus
- LLM není doslova JPEG
- next-token prediction je základní objective autoregresivního LM, ale moderní chat model následně prochází dalším post-trainingem
- agent není synonymum pro LLM
- RAG není způsob „nahrát znalosti do modelu“

Pokud je nutné něco zjednodušit, klidně to udělej, ale speaker notes explicitně označ:

„zjednodušení pro vysvětlení“.

---

# Speaker notes

Ke KAŽDÉMU slidu vytvoř speaker notes.

Notes mají obsahovat:

1. co přesně mám říct
2. hlavní pointu slidu
3. případný joke / callback
4. technickou poznámku, pokud je slide zjednodušený
5. přechod na další slide

Nechci ale kompletní naučený monolog slovo od slova.

Spíš kvalitní tahák pro řečníka.

---

# Timing

Cíl: cca 30 minut.

Navrhni timing jednotlivých sekcí.

Preferuji přibližně:

- 3 min opening
- 12–15 min „rozebíráme LLM“
- 5 min halucinace / počítání / limity
- 5 min tools / RAG / agents
- 4–5 min determinismus + závěr

Pokud bude deck mít 18–22 slidů, je to OK, protože některé jsou jen rychlé vizuální kroky nebo build-up.

---

# Animace / postupné odkrývání

Pokud použitý formát umožňuje animace/builds, využij je hlavně pro:

- rozebírání black boxu
- autoregresivní loop
- probability distribution
- temperature
- postupné přidávání capabilities k LLM
- deterministic + probabilistic architecture

Pokud animace nejsou dobře podporované, udělej raději několik navazujících slidů než jeden přeplácaný slide.

---

# Zdroje

Na posledním slidu vytvoř minimalistické Resources.

Minimálně:

- Transformer Explainer
  https://poloclub.github.io/transformer-explainer/

Doplň jen několik opravdu relevantních primárních / kvalitních zdrojů.

Nechci bibliografii o 30 položkách.

Zdroje důležitých technických tvrzení můžeš dát malým písmem do speaker notes, nemusí rušit slide.

---

# Výstupy

Vytvoř:

1. finální prezentaci
2. editovatelný zdroj
3. případné vlastní diagramy/asset soubory
4. krátký README:
   - jak deck regenerovat
   - jaké fonty/assets používá
   - které slidy mají být případně doplněny živou ukázkou
5. outline decku s časováním
6. seznam použitých externích zdrojů

Pokud generuješ PPTX programově, proveď vizuální kontrolu renderovaných slidů.

Kontroluj zejména:

- overflow textu
- čitelnost
- konzistenci typografie
- kontrast
- příliš mnoho textu
- zarovnání
- zda diagramy dávají smysl bez vysvětlování

Iteruj, dokud deck nebude působit jako prezentace pro konferenci, ne jako automaticky vygenerovaný PowerPoint.

---

# Priorita

Když budeš volit mezi:

A) více informacemi

a

B) silnější, jednodušší pointou

preferuj B.

Jeden slide = jedna myšlenka.

Cíl není publikum naučit implementovat Transformer.

Cíl je, aby na konci řekli:

> „Aha. Tak proto se LLM chová takhle.“

A aby si odnesli:

> AI není magie.
> Je to jiný typ výpočetního nástroje.
> A největší sílu má ve chvíli, kdy ho správně zkombinujeme s klasickým softwarem.
