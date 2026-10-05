# Technická oponentura — Astra

Aktuální obsahový refactor HTML je posouzen v poslední sekci. Starší číslování slidů níže dokumentuje předchozí verze.

Ověřeno 4. 10. 2026. Scope: outline.md v1; nikoliv ještě hotový deck. Zdroje a jejich dosah: sources.md. Doporučení níže jsou připravená pro zapracování Opusem.

## Rozhodnutí pro generátor

1. Tokenizer: skutečný `o200k_base`, ověřeno lokálně přes `tiktoken==0.14.0`. Neslučovat jeho tokeny s údaji GPT-2 z Transformer Explaineru.
2. Distribuce: pedagogická, viditelně „Ilustrativní pravděpodobnosti“. Doporučuji anglické `The cat sits on the` → ` roof`, ` mat`, ` floor`, ` sofa`; všechna čtyři pokračování jsou jednotlivé tokeny tohoto tokenizeru. České publikum už pointu kočky zná. Hodnoty 31/18/11/7 % + ostatní 33 % nejsou naměřený výstup. Alternativa pro zachování češtiny: zobrazovat skutečné fragmenty ` st`, ` gau`, ` z`, ` stole`, ne celá vícetokenová slova.
3. Emergence: obejít slovo jako vysvětlení. „Aby model dobře předpovídal text, učí se vzory a vztahy použitelné i pro překlad, kód a řešení úloh.“ Úspěch v úlohách je empirický; není to důkaz lidského myšlení ani univerzální teorie schopností.
4. Halucinace: „Věrohodné pokračování není záruka pravdy.“ Neříkat, že model neumí vyslovit „nevím“. Trénování nejistoty a abstence je možné.
5. Greedy decoding je deterministická volba pro stejné logits a pravidlo řešení shod. Celá inference nemusí být bitově reprodukovatelná; sampling není jediný zdroj variability. Viz PyTorch zdroje.

## Připomínky po slidech

| Slide | Verdikt a doporučená formulace | Podklad |
|---|---|---|
| 1 | OK jako otázka, nikoliv slib, že mechanismus vyřeší bezpečnost nebo vědomí. | dramaturgie |
| 2 | OK. Rozebíráme konkrétně autoregresivní textový transformer; multimodální vstupy mimo scope. | S1, S2 |
| 3 | OK. Lidské hádání pokračování je hra a analogie, ne tvrzení o totožném mechanismu. | S1 |
| 4 | Upravit „čeština se tokenizuje hůř“ na „Záleží na tokenizeru a konkrétním textu“. Ukázka níže má CZ 10 tokenů, EN 7. Titulek „LLM nevidí text“ vysvětlit jako „dostává token IDs“. Z toho neplyne absence reprezentací významu. | S3 + lokální výpočet |
| 5 | Upravit „podobné věci mají podobné vektory“ na „Naučené vektory zachycují vztahy mezi tokeny“. Blízkost není univerzální záruka významové podobnosti. ID není pořadí podle významu. Číselné vektory označit jako schematické. Doplnit informaci o pozici/pořadí. | S1, S2 |
| 6 | OK s dodatkem: causal attention může používat současnou i předchozí pozice, ne budoucí. Šipky k zájmenu označit jako schematické, nikoliv změřené attention váhy. Attention není vysvětlení celého reasoning. | S2 |
| 7 | OK s [Z]: schéma vynechává residual connections a normalizaci. „Žádná ručně napsaná tabulka odpovědí“ je lepší než „jen parametry“. Model má také architekturu a za běhu aktivace; některé tréninkové pasáže může memorovat. | S2, S8 |
| 8 | Nutná oprava kandidátů dle rozhodnutí výše. Logits jsou skóre pro tokeny; softmax z nich vytvoří distribuci. 31 % není 31% jistota pravdivosti odpovědi. „Ostatní“ doplní součet do 100 %. | S1 |
| 9 | „Mění pravděpodobnosti stran“, ne nutně strany. T>0: logits/T před softmax. Nižší T soustředí hmotu, vyšší zploští rozdělení; ani jedno nezaručuje pravdivost. T=0 řešit jako obvyklou konvenci pro greedy, ne dělení nulou. Volba může být i bez losování. | S1, S9, S10 |
| 10 | OK. V notes: až do ukončovacího tokenu či limitu; KV cache obvykle šetří opakované výpočty. „Opakuj“ neznamená trénuj; běžný chat průběžně nepřepisuje váhy. | S1, S4 |
| 11 | OK s rozhodnutím č. 3. Schopnosti závisejí i na datech, architektuře, škále a post-trainingu. Emergence není magický přepínač; vzhled skoku může záviset na metrice. | S4, S5 |
| 12 | Upravit „správná odpověď“ na „skutečný další token v tréninkovém textu“ — text nemusí být fakticky pravdivý. Ukázka rohožce není jediný token; použít následující ` ro`, nebo konzistentní EN ` mat`. Ztráta penalizuje nízkou pravděpodobnost pozorovaného tokenu. Obvykle trénujeme mnoho pozic a příkladů najednou. Přidat chat post-training: instrukce, preference, případně reward za řešení úloh. | S4, S6 |
| 13 | OK pouze jako analogie s viditelnou výhradou. LLM není dekompresor konkrétního originálu. Parametry nejsou dokumentové úložiště, ale memorování a reprodukce některých pasáží jsou možné. Halucinace nejsou doslova JPEG artefakty. | S8; autorská analogie |
| 14 | Nutně odstranit doslovné „nevím není vestavěný výstup“. „Model může říct nevím. Samotný mechanismus generování ale nezaručuje, že správně pozná kdy.“ Pravděpodobnost textu není pravdivost; tlak na hádání je jeden mechanismus, ne úplná teorie všech chyb. RAG ani tools nejsou univerzální oprava. | S7 |
| 15 | Výsledek je **1 392 967**, ověřeno integer aritmetikou. Joke o násobičce hned opravit: hardware samozřejmě násobí; v LM není garantovaný převod úlohy na přesný aritmetický výsledek. „Umí vzory“ nesmí popírat naučené postupy a silné matematické schopnosti. Kalkulačka vyžaduje správné argumenty a ověření výsledku v systému. | lokální výpočet; S4 |
| 16 | Build není definice agenta: samotné přidání state nestačí. „Smyčka: zvol akci → spusť tool → přečti výsledek → pokračuj nebo skonči.“ Context má LM od začátku; popisek „+ aplikační kontext“ dává smysl. Retrieval přináší vybrané externí podklady do kontextu; nepřetrénuje váhy. | S11, S12 |
| 17 | Tabulka jsou vhodné role, ne striktně neslučitelné typy software. I klasifikátor může mít deterministický běh. Determinismus ≠ správnost; modelující pravděpodobnosti ≠ vždy losující program. | engineering doporučení |
| 18 | Použít „dosáhl 18 let?“ a `věk >= 18`, ne „starší než 18“, což znamená něco jiného. Code potřebuje datum posouzení a definovaná kalendářní pravidla; jde o ilustraci výpočtu, ne právní rozhodování. | logika příkladu |
| 19 | „Tady se model může hodit“ je přesnější než „if/else prohraje“. LLM není jediný možný klasifikátor; výstup má mít validované enum a možnost neurčitosti/escalace. | engineering doporučení |
| 20 | Schéma musí mít autorizaci/validaci **před akcí**, ne pouze po výsledku. Model navrhuje volání; software ověří oprávnění a argumenty a tool spustí. Schema validace neověřuje automaticky pravdivost obsahu. | S12; engineering doporučení |
| 21 | OK „DON'T PANIC ≠ don't care“. Odstranit „rizika jsou hlavně v nasazení“ — přednáška to nedokládá. „Znalost mechanismu není důkaz bezpečnosti. Prakticky můžeme řídit oprávnění, ověřování a lidský dohled.“ Neimplikovat vyřešené dlouhodobé riziko ani jistotu o vědomí. | vymezení dosahu talku |
| 22 | 4 hlavní odkazy stačí: Explainer, Attention paper, InstructGPT, RAG. Ostatní do notes/sources.md. QR primárně na Explainer. | S1, S2, S6, S11 |

## Ověřená tokenizace

`tiktoken==0.14.0`, encoding `o200k_base`; mezery uvnitř tokenů jsou významné.

```text
Kočka sedí na rohožce.
[Ko][čka][ sed][í][ na][ ro][ho][ž][ce][.]
[33185, 51851, 10412, 556, 898, 974, 1555, 1018, 400, 13]

The cat sits on the mat.
[The][ cat][ sits][ on][ the][ mat][.]
[976, 9059, 38174, 402, 290, 2450, 13]

Jednotokenová pokračování: ' roof'=16367, ' mat'=2450,
' floor'=8350, ' sofa'=34790.
```

Reprodukce: `uv run --with tiktoken==0.14.0 python -c 'import tiktoken; e=tiktoken.get_encoding("o200k_base"); s="Kočka sedí na rohožce."; print(e.encode(s)); print([e.decode([i]) for i in e.encode(s)])'`.

## Timing

Nezávislý součet časů 22 řádků v outline v1: **1740 sekund = 29:00**, tedy s minutou rezervy 30:00. Jednominutová rezerva pro demo je velmi těsná; web předem otevřít a načíst model, mít offline zálohu.

## Dohoda po první výměně s Opusem

Opus preferuje pro slide 4 větu se střechou a pro slide 8 česká celá slova s viditelnou visačkou „zjednodušeno: slova místo tokenů, ilustrativní čísla“. Toto je přijatelná pedagogická varianta, pokud visačka bude čitelná i na projekci a notes explicitně vysvětlí rozdíl. Je to odchylka od doporučené přesnější EN varianty výše, nikoliv chyba, pokud je zjednodušení skutečně deklarované.

## Data pro slide temperature

Aby dvě sady barů nebyly dvě libovolné distribuce, lze použít syntetické logits `[3, 2, 1, 0]` pro čtyři kandidáty A–D a skutečný výpočet `softmax(logits/T)`:

| T | A | B | C | D |
|---|---|---|---|---|
| 0.2 | 99.3262 % | 0.6693 % | 0.0045 % | 0.00003 % |
| 1.0 | 64.3914 % | 23.6883 % | 8.7144 % | 3.2059 % |
| 1.2 | 58.6318 % | 25.4813 % | 11.0741 % | 4.8128 % |

Výpočet ověřen Python math.exp; syntetický slovník čtyř kandidátů, žádný top-k/top-p. Použít stejné maximum osy 100 % pro obě sady. Nepopisovat vyšší T jako změnu pořadí kandidátů: pro konečné kladné T se pořadí logits zachovává. Vysoká pravděpodobnost není faktická jistota.

## Deck v1 — kontrola 28 fyzických snímků

Prohlédnuty všechny rendery slide-01.jpg až slide-28.jpg jednotlivě v plné velikosti a všech 5 přehledů. Přečten build.js včetně notes; přímo v PPTX ověřeno 28 slides, 28 notes s ŘÍCT/POINTA/PŘECHOD a součet 1740 sekund = 29:00. Styl je konzistentní, hlavní texty čitelné, bez zjevného ořezu hlavního obsahu. Verze v1 ale vyžaduje níže uvedené opravy. Čísla v této sekci jsou **fyzické snímky 1–28**, ne štítky 00–20.

### Opravit před dokončením

1. **8 — causal attention je na obrázku chybná.** Aktuální je `měla`, ale následující `hlad` a `.` mají barevné nenulové váhy. Budoucí pozice musí být maskované; nejjednodušší použít celou větu a zvýraznit až finální token/slovo, nebo naopak budoucí slova explicitně oddělit jako nepřístupná. Doplnit „slova místo tokenů“, protože jednotlivé české celky zde nejsou tokeny o200k_base. Pokud necháš aktuální `měla`, speaker nesmí vysvětlovat modelovou interpretaci pomocí budoucího `hlad`.
2. **26 — ŘÍCT tvrdí „není nic … vědomého“.** To odporuje vlastní technické poznámce. Nahradit: „Dnes jsme rozebrali výpočetní mechanismus. Samotným rozborem jsme ale nevyřešili otázku vědomí ani bezpečnosti.“
3. **15 — ŘÍCT „Když generuje, rekonstruuje“ mění analogii v doslovný mechanismus.** Nahradit „Když generuje, vytváří nové pokračování z naučených pravidelností; neobnovuje konkrétní originální dokument.“ U JPEG raději „zahazuje část detailů“ než kategorické „které oko nepozná“ (artefakty mohou být viditelné).
4. **12 — zpětná šipka jde do textu/tokenizeru.** Reálný loop připojí vygenerovaný token ID ke kontextu tokenů; netokenizuje opakovaně celý text. Přesměrovat šipku na `tokeny` a popisek změnit na `kontext tokenů`. To je stejně jednoduchý a přesnější obrázek.
5. **10 / 12 — softmax není jako krok viditelný.** Je pouze v notes a vzorci na temperature slidu. Přidat na 10 malý, čitelný tok `logits (skóre) → softmax → pravděpodobnosti`; na 12 stačí popisek šipky nebo `softmax → pravděpodobnosti`. Publikum má vidět, co překládá skóre do rozdělení.
6. **14 — 40 % / 3 % nejsou označené jako ilustrativní.** Dopsat „ilustrativní pravděpodobnosti“ přímo k grafu, výslovně do notes. Prostor získáš přesunutím post-training věty nahoru nebo zkrácením dolní řady. Samotné drobné „zjednodušení“ u knoflíků nestačí identifikovat původ čísel.
7. **24 — ŘÍCT je silnější než slide a odborná poznámka.** „Pravidly to nenapíšete“ a „model vyhrává“ změnit na „U rozmanitých zpráv rychle přibývají výjimky. Tady se vyplatí model vyzkoušet a změřit, jak dobře klasifikuje.“ Slide: „zabsurdní“ je neobratné; použít „Tady rychle přibývají výjimky.“
8. **23 — ŘÍCT „hlavně nedeterministicky špatně — jednou ano, jednou ne“ je kategorické.** „Výstup navíc může kolísat; ani opakovatelný výstup ale nezaručuje správnost.“ Připomíná to vlastní vysvětlení greedy decoding.
9. **17 — oprava vtipu o násobičce je jen v TECHNICKÉ POZNÁMCE.** Krátkou větu přesunout i do ŘÍCT: „Hardware uvnitř samozřejmě násobí. Jen nám to nezaručuje správné násobení čísel z promptu.“ Jinak řečník řekne nepravdu a vysvětlení nechá skryté.

### Doporučené drobné úpravy použitelnosti

- **9:** přidat svislé šipky mezi bloky a malou šipku attention → MLP, aby bylo jasné, že jde o průchod, ne tabulku.
- **25:** přidat vnější návratovou šipku z výsledků nástrojů/znalostí do LLM; notes ji vysvětlují, ale obraz bez ní ukazuje jen jednosměrný průchod, v němž se podklady nedostanou k modelu. Zachovat kontrolu oprávnění před akcí.
- **28:** vytvořit skutečné klikatelné odkazy (PPTX aktuálně obsahuje 0 external hyperlinks). QR má margin=1; zvýšit na 4 moduly kvůli skenování z projekce. QR cíl je správný podle build.js; dekódování renderu zatím neověřeno.
- **6, 7, 11, 12, 14:** pomocné popisky 11–14 pt jsou na projekci malé. Nezvětšovat drobné dekorativní footery; zvětšit však podstatná přiznání zjednodušení a ilustrativnosti alespoň na 15–16 pt. Celkový layout má dost místa.
- **README:** nyní v1 označuje za finální deck; doplnit stav po opravách. „Deck se nerozsype na cizím počítači“ je neověřená garance; uvést běžné fonty a doporučenou kontrolu na prezentačním stroji. Zmínit, že texty i tvary jsou editovatelné v PPTX.
- **Zdroje:** v notes jsou navíc Chiang a Delétang, které seznam S1–S12 nezahrnuje. Buď je vynechat (nejsou pro talk nutné), nebo přidat přesné odkazy. Hlavní technické citace mají být dohledatelné URL, nejen jméno a rok.

Po opravě znovu prověřit změněné snímky, notes a celý přehled kvůli regresím. Kontrola v této sekci je nad LibreOffice rendery dodanými Opusem; neznamená otevření v desktop PowerPointu.

## Deck v2 — uzavření kontroly

**Výsledek: uvedené nutné opravy jsou zapracované; další blokující připomínky nemám.**

- Znovu individuálně prohlédnuty změněné rendery 6–12, 14, 24, 25 a 28; celý deck zkontrolován v nových pěti přehledech. Žádný nový zjevný ořez či kolize hlavního obsahu.
- Causal mask, návrat ke kontextu tokenů, viditelný softmax, ilustrativní hodnoty při trainingu a návraty výsledků nástrojů odpovídají předaným opravám.
- Opravené poznámky ověřeny přímo v PPTX (JPEG, násobička, výpočet věku, klasifikace, závěrečné riziko/vědomí). Všech 28 snímků má notes s ŘÍCT, POINTA a PŘECHOD; součet 1740 s = 29:00.
- PPTX má čtyři externí hyperlinky na správné Resources URL.
- Nový QR s margin 4 úspěšně dekódován z renderu snímku 28 pomocí zxing-cpp na `https://poloclub.github.io/transformer-explainer/`.
- Chiang a Delétang doplněni v sources.md, jejich role oddělena od technického popisu LM.

Kontrolovaný PPTX SHA-256: `154cde47cb3fa0956fe840199bf9417ce1aa82eb6ed21a2d774e903a833be691`.

Limit kontroly: rendery, zdroj a struktura PPTX; nikoliv skutečný projektor či desktop PowerPoint. Živá ukázka nebyla interaktivně otestována; statický slide temperature slouží jako záloha.

## HTML light — Chrome DevTools review (2026-10-04)

Kontrola proběhla přes Chrome DevTools CLI, offline `file://`, nikoli jen čtením zdroje.

- Vizuálně zkontrolováno 22 finálních slidů, screenshoty v `html/review/` (první průchod).
- Všech 63 stavů odkrývání ověřeno v DOM: správný aktivní slide a viditelnost buildů; bez chyb. Poznámky existují pro 22/22 slidů.
- Nalezen a opraven posun při škálování: po opravě stage přesně [0,0,1280,720]. Emulace 390×844: celý slide [0,312.3125,390,219.375], zachovaný poměr stran; na telefonu je pro čtení vhodnější landscape.
- Přehled přepíná všechny buildy do finálního stavu, grafy mají nenulovou šířku, Escape obnovuje prezentaci.
- Home, ArrowRight, notes N, časovač, fullscreen F a návrat ověřeny. Poznámky ve spodním panelu viditelně zmenšují prezentační plochu a nepřekrývají slide.
- Opraveny SVG fragmentové markery kvůli file-origin chybě; po reloadu a průchodu 63 stavů konzole bez zpráv.
- Opus ověřil tisk přes headless Chrome na 22 stran; tisk inicializuje finální stavy i u nenavštívených slidů.
- Skullpix 0.3.0: vlastní transparentní ilustrace + JSON, strict render bez chyb a varování.

Finální opravné screenshoty: `html/review/final-720.png`, `final-mobile.png`, `final-overview.png`, `final-notes.png`.


## Narativní refactor — kontrola nových tvrzení

Primární zdroje S6 a S14–S16 ověřeny 4. 10. 2026. HTML je hlavní verze, starý PPTX se touto změnou neaktualizuje.

- **Pretraining** učí predikovat pozorovaný další token; tréninkový text nemusí být pravdivý. Metafora knoflíků popisuje učení parametrů, ne ruční pravidla. Schopnosti se opírají o pravidelnosti v datech, nikoli o „emergenci“ coby vysvětlení.
- **Base model** může s vhodným kontextem plnit úlohy; neříkat, že nikdy neodpovídá. Rozdíl je v cíli tréninku a spolehlivosti chování pomocníka.
- **Historické srovnání žáby** je GPT-3 vs hotový InstructGPT. Nedokládá izolovaný účinek SFT. Ukázka byla vybraná autory a není měřením úspěšnosti. Francouzský originál je na slidech česky shrnutý, nikoli vydávaný za český modelový výstup.
- **GPT-2 jednorožci** ilustrují pokračování žánru nad fikčním vstupem; neprokazují halucinaci na faktickou otázku. Vybráno z deseti generování.
- **Asistent** vzniká učením na požadovaných odpovědích a dialogu, ne pouhým připsáním štítků User/Assistant. Původní ChatGPT a InstructGPT jsou historicky odlišné modely; dialogová data dokládá S15.
- **Preference** nejsou obecná lidská pravda ani preference všech lidí. A/B je naše označená demonstrace, ne výstup z paperu či skutečný hlas hodnotitele. Historická cesta s reward modelem a RL má alternativy (S16); do hlavního výkladu taxonomie nepatří.
- **Stejný motor** znamená zachovaný princip autoregresivního generování. Parametry i distribuce post-training mění; nevzniká tím garantované úložiště faktů.
- **Nástroje a dokumenty**: bez přístupu k aktuálním datům nelze ověřit nynější cenu. Interní podklady nemusely být v tréninku; netvrdit bez důkazu, že je žádný model nikdy neviděl. Retrieval dodá kontext, nezaručí správné použití podkladů.
- **Determinismus** nezaručuje správnost programu. Výpočet věku vyžaduje definovaná pravidla; interpretaci zprávy je potřeba empiricky ověřit. Model navrhuje akce, software kontroluje oprávnění a argumenty před provedením.

### Ověření implementace

- Chrome DevTools: 24 slidů, všech 75 build states, žádné zjištěné přetékání ani chyby viditelnosti. Konzole bez zpráv. Výsledek v `html/review/narrative/report.json`.
- Vizuálně prohlédnuty rendery všech 75 stavů; po posledních formulacích znovu změněné stavy 9, 16, 18 a Resources 24. Historické ukázky navíc zkontrolovány v plné velikosti. Bez zjištěných kolizí a ořezu.
- Všech 24 notes má ŘÍCT, POINTA a PŘECHOD; přečten mluvený tahák i nuance. Upraveny formulace o tokenizaci, trénování dialogu, preferencích, fikci a nejistotě. Žádný smyšlený historický transcript.
- Součet notes i osnovy: 1740 sekund = 29:00 + 1:00 rezerva. Je to plán, nikoli měřený živý přednes.
- Znovu ověřeny Home/ArrowRight, panel notes a formátování nadpisů, overview se všemi finálními stavy a návrat Escape; emulace 390×844 zachovává celý slide v poměru 16:9. Notes nepřekrývají slide.
- PDF z HTML má 24 stran; vizuálně prohlédnuty všechny stránky. Obsahuje finální stavy buildů, nikoli každé mezikrokové odhalení. PPTX zůstává historický fallback.
- `node --check` pro slides.js, notes.js a app.js; `git diff --check` bez chyb.

Zbývá živý dry-run a projekce v místnosti. Při přetažení nejdřív vynechat live Explainer, zrychlit temperature a závěrečný architektonický diagram; chránit kontrast base model → asistent a preference.

## Issue #1 — historická rampa před pretrainingem

Zdroje S17–S24 ověřeny 4. 10. 2026. Rozšířené zadání issue požaduje 3–4 minuty; původní limit 60–90 s platil pouze pro Mikolovovu odbočku.

- Markov 1913: závislosti písmen v Oněginovi, nikoli „vynález LLM“. Shannon 1948: statistické aproximace jazyka; Shannon 1951: člověk predikuje další znak. Česká demonstrace se musí přiznat jako vlastní ilustrace.
- N-gram je N-prvková posloupnost; při odhadu dalšího slova má model historii N−1 slov. Zobrazené počty jsou syntetické, nikoli autentický korpus. Backoff a smoothing umožňují pracovat s neviděnými kombinacemi; n-gramy byly prakticky úspěšné v rozpoznávání řeči.
- Podobnost kočka/kotě se v základní tabulce slovních n-gramů automaticky nesdílí. Není to tvrzení o všech rozšířeních statistických LM. 10¹⁰/10¹⁵ jsou počty možných kombinací, ne velikost skutečně uložené tabulky.
- Bengio 2003: společné učení vektorů a predikce umožňuje generalizaci; kontext zůstává pevný. Trénink byl výpočetně náročný.
- Mikolov et al. 2010: kontext přenášený rekurentním stavem, ne nekonečná spolehlivá paměť. Brněnský callback je podložen afiliací VUT + Johns Hopkins. Netvrdit, že Mikolov vynalezl RNN nebo LLM.
- Word2vec 2013: související linie efektivního učení slovních reprezentací, ne řetězec RNN → word2vec → Transformer. CBOW/Skip-gram a negative sampling zůstanou technickou poznámkou. První paper již zkoumá sémantické a syntaktické vztahy.
- LSTM 1997 je starší než Mikolovova práce; neprezentovat ho jako následný milník roku 2010. Transformer zvyšuje paralelizaci tréninku, nikoli generování celé autoregresivní odpovědi najednou. Attention existovala i před rokem 2017.
- Historie je pokračující vývoj metod, dat a výpočetních možností, nikoli 70 let odložená myšlenka či pouhé zvětšení starého modelu.
- Claude/Shannon: pouze volitelný callback připsaný reportáži WIRED; žádné tvrzení o výhradním nebo jednoznačně potvrzeném původu názvu.

### Ověření změny

- `scripts/review-html.py --page 2 --all-states --output html/review/issue-1`: 26 slidů, všech 85 stavů odkrývání, 0 nalezených problémů; konzole bez zpráv. Aktivní slide, viditelnost buildů, hranice obsahu a povinné oddíly notes kontrolovány programově.
- Prohlédnuty screenshoty všech stavů; nové slidy 8–10 navíc v plné velikosti. Bez zjištěných ořezů a kolizí. Word2vec má oddělený box, ne šipku v přímé posloupnosti modelů.
- Nezávisle načteno 26 notes pro 26 slidů; součet 1740 sekund. Osnova: 2:15 + 5:45 + 3:30 + 8:00 + 4:00 + 5:30 = 29:00, minuta rezervy do 30:00. Odstraněn duplicitní slide `porad-token`; pointa zůstává v přechodu evoluce → halucinace. Zkrácen také mluvený text, nejen časové štítky.
- Po finální změně notes znovu ověřen reload, klávesový přechod smyčka → Shannon, aktuální text v panelu N a overview všech 26 slidů s návratem Escape.
- Export HTML PDF má 26 stran. Prez-opus zkontroloval celkový grid a temperature; prez-astra nové historické strany 8–10 v detailu. Původní PPTX se nemění.
- `node --check` (slides.js, notes.js), `python3 -m py_compile scripts/review-html.py` a `git diff --check` bez chyb.

Odhad času není měřený živý přednes. Pokud historie při dry-runu přeteče přes čtyři minuty, nejdřív vypustit volitelný Claude callback a detail backoff; zachovat oba Mikolovovy příspěvky a rozlišení kontextu / reprezentací / paralelizace tréninku.

### PR #2 — oprava QA po automatickém review (5. 10. 2026)

Chyby konzole se nyní načítají jako strukturované `consoleMessages` s filtrem `error`, přidávají do `issues` a způsobí exit code 1. Ověřeno přes skutečný Chrome DevTools na izolované testovací stránce: běžný log + warning → exit 0; `console.error` → exit 1; nezachycená JS výjimka → exit 1. Text chyby je uložen v reportu. Syntax a `git diff --check` prošly. Obsah prezentace se touto opravou nemění.

## Archeologický refactor — 5. 10. 2026

Nové formulace zkontrolovány proti S17–S23, doplněným primárním zdrojům S25 (BERT) a S26 (GPT 2018). Historické výstupy GPT-2 a GPT-3/InstructGPT zůstávají označená česká shrnutí původních ukázek S14/S6.

- Timeline je navigační mapa, nikoli proporcionální časová škála nebo přímá genealogie. Word2vec je související větev; BERT a rerankery jsou odbočky průzkumu, nikoli předchůdci GPT.
- Markov: latinkové ONEGIN a S/K jsou naše ilustrace, ne autentická data z roku 1913. Nevyvozujeme z obrázku konkrétní naměřený poměr přechodů.
- Shannon: český řádek a počty pokusů jsou stále označená ilustrace; původní experiment z roku 1951 používal angličtinu.
- N-gramy: navazující distribuce teď skutečně odpovídá zobrazeným četnostem 50/20/10 z 80: 62,5/25/12,5 %. Jde o zjednodušený tříslovný korpus bez smoothingu. Období 70.–90. léta označuje praktické využití, ne vynález n-gramů.
- Bengio: obrázek kočka/kotě/auto je schematická podobnost, nikoli měřený embedding. Word2vec: král − muž + žena ≈ královna je zjednodušené přiblížení příkladu v úvodu S22, nikoli garantovaná slovní aritmetika. CBOW a Skip-gram zůstávají jen v technických notes.
- Transformer: attention nevznikla v roce 2017. Historický posun je architektura bez rekurence a větší paralelizace tréninku. Zobrazený motor patří dnešnímu autoregresivnímu LM; o200k_base a miliardy parametrů nejsou popisem původního Transformeru. Generování zůstává postupné.
- GPT: biliony tréninkových tokenů a příklad kódu vysvětlují dnešní měřítko, nikoli korpus GPT 2018. Původní GPT kombinoval pretraining s adaptací na úlohy; to nezaměňujeme s pozdějším učením chatovací role.
- Přechody mezi slidy byly opraveny podle nového pořadí. Biografie vychází ze zadání: Pavel Lorenz, staff engineer, praktik, AI denně. Nepřidáváme firmu ani domnělé profesní používání konkrétních modelů.

### Kontrola HTML a ovládání

- Chrome DevTools: **31 slidů, všech 93 build stavů, 0 nalezených problémů**, žádné zprávy konzole. Report a screenshoty: `html/review/archaeology/`.
- Vizuálně prohlédnuty všechny stavy, opening a historické zastávky také v samostatných náhledech; přehledná bílá plocha, černá typografie, monochromní grafy a ilustrace, bez zjištěných ořezů. Při review zjednodušen opening ze sedmi vrstev na tři, opraveno zalomení titulku a odstraněny číselné vektory z Bengia.
- Deset tlačítek osy navádí na první slide éry; posuvník pokrývá celý deck. Ověřeny kliky, počátek/střed/konec posuvníku, jeho nativní ArrowRight/End, návrat Escape, notes, overview, a automatické zviditelnění každé zastávky při šířce 390 px. `navigation.json` obsahuje výsledek.
- Notes jsou u 31/31 slidů, oddělují ŘÍCT od technických nuancí; po přesunech opraveny přechody. Osnova a notes shodně **1740 sekund = 29:00**, s minutou rezervy. Jde o plán, ne změřený přednes.
- `node --check` pro JS, Python syntax a `git diff --check` prošly. Deck nadále funguje offline přes `file://`.
- Původní PPTX i starší PDF (26 stran) jsou ponechané jako historické exporty; hlavní a aktualizovaný artefakt je HTML. Nový tiskový styl přidává na každou stranu vlastní statickou timeline.

**Dry-run:** nejdřív škrtat volitelný live Explainer, detail backoff a slovní rozbor word2vec analogie. U motoru hlídat dvě minuty; při přetažení zkrátit architektonický diagram. Zachovat base model → asistent, preference a příklad pravidlo vs. jazyk. Ověřit čitelnost osy na skutečném projektoru.
