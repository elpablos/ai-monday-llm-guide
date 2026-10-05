// Slide content. Each slide: { id, era, html }; era = markov|shannon|ngrams|bengio|mikolov|word2vec|transformer|gpt|chatgpt|today, null for the opening. Builds: data-step="n" appears at step n,
// data-until="n" disappears at step n, data-on="n" gets class "on" from step n.
// Notes live in notes.js under the same id.
(() => {
  const st = (n) => `data-step="${n}"`;
  const tok = (t, id, cls = "") => `<div class="tok ${cls}"><b>${t.replace(/ /g, "·")}</b>${id != null ? `<i>${id}</i>` : ""}</div>`;
  const box = (t, cls = "") => `<span class="box ${cls}">${t}</span>`;
  const arr = `<span class="arrow"></span>`;
  const pct = (p, dec = 0) => (p >= 0.01 ? (p * 100).toFixed(dec).replace(/\.0+$/, "").replace(".", ",") + " %" : "<1 %");
  const bars = (rows, { cls = "", max = "820px", scale = 1, dec = 0 } = {}) =>
    `<div class="bars ${cls}" style="--max:${max}">` +
    rows.map(([l, p], i) => `<span class="lbl">${l}</span><span class="track ${i === 0 ? "lead-bar" : ""}"><span class="fill" style="--p:${p / scale}"></span><span class="pct">${pct(p, dec)}</span></span>`).join("") +
    `</div>`;
  // Arrowhead as an explicit triangle; url(#id) references warn under file:// with a hash.
  const ah = (x1, y1, x2, y2, color = "#666666", L = 15, W = 7) => {
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), s = Math.sin(a);
    const bx = x2 - L * c, by = y2 - L * s;
    return `<polygon points="${x2},${y2} ${bx - W * s},${by + W * c} ${bx + W * s},${by - W * c}" fill="${color}"/>`;
  };

  // o200k_base (tiktoken), verified in tech-review.md.
  const CZ = [["Ko", 33185], ["čka", 51851], [" sed", 10412], ["í", 556], [" na", 898], [" st", 420], ["ře", 38132], ["še", 13136], [".", 13]];
  // Synthetic logits for the temperature slide: softmax(logits / T).
  const LOGITS = [["A", 3], ["B", 2], ["C", 1], ["D", 0]];
  const temper = (T) => {
    const w = LOGITS.map(([, z]) => Math.exp(z / T)), sum = w.reduce((a, b) => a + b, 0);
    return LOGITS.map(([l], i) => [l, w[i] / sum]);
  };

  const stop = (year, name) => `<p class="stop"><span class="stop-year">${year}</span><span class="stop-name">${name}</span></p>`;
  const pil = (problem, gain, limit, step) => `<div class="pil push" ${step ? st(step) : ""}>${[["problém", problem], ["zlepšení", gain], ["limit", limit]].map(([k, v]) => `<div class="pil-cell"><span class="pil-label">${k}</span><span>${v}</span></div>`).join("")}</div>`;

  const S = [];

  S.push({ id: "dont-panic", era: null, html: `
    <p class="fine" style="font-size:28px">AI Monday, 5. 10. 2026</p>
    <h1 class="huge" style="margin-top:70px; font-size:112px">Stopařův průvodce<br>po LLMs</h1>
    <p class="lead muted gap-m" style="font-weight:500">aneb zničí nás Terminátoři?</p>
    <p class="lead push">Pavel Lorenz</p>
    <p class="say muted gap-s">DON'T PANIC</p>` });

  S.push({ id: "o-mne", era: null, html: `
    <h2>Kdo vám to dneska vypráví?</h2>
    <div class="row" style="gap:80px; align-items:flex-start">
      <div class="col" style="gap:26px; flex:1">
        <p class="lead">Pavel Lorenz</p>
        <p class="say">Staff engineer. Spíš praktik než teoretik.</p>
        <p class="say">AI řeším dnes a denně. Zajímá mě, co funguje v praxi.</p>
        <p class="say" ${st(1)}>A odmalička rozebírám věci, kterým nerozumím.</p>
        <p class="say muted" ${st(1)}><em>Většina z nich už pak nefungovala.</em></p>
      </div>
      <img class="sticker" ${st(1)} src="assets/llm-open-box-bw.png" width="528" height="288" alt="Rozebraná krabička se šroubovákem">
    </div>` });

  const LAYERS = [["dnešní asistenti", "GPT, ChatGPT"], ["modely a odbočky", "BERT, rerankery"], ["základy", "Shannon, Markov"]];
  S.push({ id: "motivace", era: null, html: `
    <h2>Zničí nás? Nahradí nás?</h2>
    <p class="lead" style="font-weight:500">Než se začnu bát, chci vědět, co je uvnitř.</p>
    <div class="row gap-l" style="gap:80px; align-items:flex-start">
      <div class="col" style="gap:0; width:760px; flex:none">
        ${LAYERS.map(([t, d], i) => `
          <div class="row" ${i ? st(i) : ""} style="gap:28px; padding:20px 0; border-bottom:2px dashed var(--line)">
            <span class="say" style="width:330px; flex:none; font-weight:600">${t}</span>
            <span class="say muted">${d}</span>
          </div>`).join("")}
      </div>
      <img class="sticker" src="assets/shovel-bw.png" width="128" height="192" alt="Lopata">
    </div>
    <p class="lead push" ${st(3)}>Jsem praktik, který kopal. Ne archeolog.</p>` });

  const ROOTS = [["1913", "Markov"], ["1948", "Shannon"], ["70. léta", "n-gramy"], ["2003", "Bengio"], ["2010", "Mikolov"], ["2013", "word2vec"], ["2017", "Transformer"], ["2018", "GPT"], ["2022", "ChatGPT"], ["dnes", "nástroje"]];
  S.push({ id: "back-to-roots", era: null, html: `
    <p class="huge" style="margin-top:80px; font-size:150px">Back to the roots</p>
    <div class="row gap-l" style="gap:0; justify-content:space-between; position:relative">
      <span style="position:absolute; left:0; right:0; top:15px; border-top:3px solid var(--ink)"></span>
      ${ROOTS.map(([y, n]) => `<div class="col" style="gap:10px; align-items:center; position:relative; width:120px">
        <span style="width:22px; height:22px; border-radius:50%; background:var(--paper); border:3px solid var(--ink); margin-top:5px"></span>
        <span class="mono" style="font-size:22px; font-weight:700">${y}</span><span class="fine" style="font-size:20px; text-align:center">${n}</span></div>`).join("")}
    </div>
    <p class="lead push">Každá zastávka: problém → zlepšení → nový limit.</p>` });

  S.push({ id: "markov", era: "markov", html: `
    ${stop("1913", "Andrej Markov")}
    <h2>Záleží na tom, co bylo předtím?</h2>
    <p class="say">Markov prošel 20 000 písmen Puškinova Evžena Oněgina a počítal, jak po sobě jdou samohlásky a souhlásky.</p>
    <div class="row gap-m mono" ${st(1)} style="gap:12px; font-size:34px; align-items:flex-start">
      ${[["O", "S"], ["N", "K"], ["E", "S"], ["G", "K"], ["I", "S"], ["N", "K"]].map(([c, t]) => `<span class="col" style="gap:8px; align-items:center"><span class="box" style="width:70px">${c}</span><span class="fine" style="font-size:22px">${t}</span></span>`).join("")}
      <span class="say muted" style="margin-left:30px; font-size:28px; align-self:center">S = samohláska, K = souhláska<br>počítej přechody S→S, S→K, K→S, K→K</span>
    </div>
    ${pil("je další písmeno nezávislé na předchozím?", "spočítat závislost na předchozím symbolu", "vidí jen kousek zpět a nic o významu", 2)}` });

  S.push({ id: "kocka", era: "shannon", html: `
    ${stop("1948 / 1951", "Claude Shannon")}
    <p class="big" style="margin-top:120px">Kočka sedí na …</p>
    <div class="row gap-l" ${st(1)} style="gap:64px; font-size:56px; font-weight:600">
      <span class="accent">střeše</span><span>gauči</span><span>zemi</span><span>stole</span><span class="muted">…</span>
    </div>
    <div class="push" ${st(2)}>
      <p class="lead">Gratuluju. Právě jste si zahráli na language model.</p>
      <p class="say muted gap-s">Našeptávač z mobilu. Jen hodně, hodně velký.</p>
    </div>` });

  const MOTOR = [
    ["text", `<span class="mono" style="font-size:44px">Kočka sedí na</span>`],
    ["tokeny", `<div class="tokens">${CZ.slice(0, 5).map(([t]) => tok(t)).join("")}</div>`],
    ["čísla", `<div class="row mono" style="gap:30px; font-size:34px">${CZ.slice(0, 5).map(([, id]) => `<span>${id}</span>`).join("")}<span class="muted">→ vektory čísel</span></div>`],
    ["síť", `<span class="box solid" style="font-size:30px; padding:18px 40px">neuronová síť: miliardy naučených čísel</span>`],
    ["výstup", `<span class="mono accent" style="font-size:34px">skóre pro každý možný další token</span>`],
  ];

  // Shannon 1951 guessed letters; Czech row + guess counts are an illustration.
  const GUESS = [["K", 5], ["O", 2], ["Č", 3], ["K", 1], ["A", 1], ["␣", 1], ["S", 4], ["E", 2], ["D", 1], ["Í", 1], ["␣", 1], ["N", 2], ["A", 1]];
  S.push({ id: "shannon", era: "shannon", html: `
    <h2>Tuhle hru hrajeme od roku 1951</h2>
    <p class="say">Claude Shannon nechával lidi hádat další písmeno textu.</p>
    <div class="row gap-l" ${st(1)} style="gap:10px; align-items:flex-start">
      ${GUESS.map(([c, n]) => `<div class="col" style="gap:10px; align-items:center; width:84px">
        <span class="box" style="width:76px; height:84px; font-size:44px; padding:0">${c}</span>
        <span class="mono ${n === 1 ? "accent" : "muted"}" style="font-size:26px">${n}</span></div>`).join("")}
    </div>
    <p class="fine gap-s" ${st(1)}>Číslo = kolikátým pokusem člověk uhodl. Často hned napoprvé.</p>
    ${pil("kolik informace nese psaný text?", "změřit, jak dobře lidé hádají další znak", "hádá člověk; stroj zatím jen z tabulek četností", 2)}
    <p class="fine gap-s"><span class="tag">ilustrace principu; Shannon 1951 testoval angličtinu</span></p>` });

  const NGRAM = [["střeše", 50], ["gauči", 20], ["zemi", 10]];
  S.push({ id: "ngramy", era: "ngrams", html: `
    ${stop("70.–90. léta", "n-gramy")}
    <h2>N-gramy: spočítej, co chodí po čem</h2>
    <div class="row" style="gap:90px; align-items:flex-start">
      <div class="col" style="gap:18px; width:640px">
        <p class="mono muted" style="font-size:30px">„sedí na …“ v korpusu</p>
        <div class="bars" style="--max:300px">${NGRAM.map(([w, n], i) =>
          `<span class="lbl">${w}</span><span class="track ${i === 0 ? "lead-bar" : ""}"><span class="fill" style="--p:${n / 50}"></span><span class="pct">${n}×</span></span>`).join("")}</div>
        <p class="fine">Desítky let fungovaly. Třeba v rozpoznávání řeči.</p>
      </div>
      <div class="col" style="gap:22px">
        <div ${st(1)}>
          <p class="mono" style="font-size:28px">viděl: kočka sedí na střeše</p>
          <p class="mono accent" style="font-size:28px; margin-top:8px">neviděl: kotě sedí na střeše → 0×</p>
        </div>
        <div class="col mono" ${st(2)} style="gap:10px; font-size:28px; margin-top:16px">
          <span><span class="muted">✗</span> černé kotě sedí na</span>
          <span><span class="muted">✗</span> kotě sedí na</span>
          <span class="accent" style="font-weight:700">✓ sedí na</span>
        </div>
      </div>
    </div>
    ${pil("jak strojově odhadnout další slovo?", "spočítat, co po čem chodí, a vyhladit", "tabulky četností: podobná slova nesdílí nic", 3)}
    <p class="fine gap-s"><span class="tag">ilustrativní četnosti</span></p>` });

  const GEN = [["tabulka nezná podobná slova", "2003", "Bengio et al.", "naučené vektory slov: kočka ≈ kotě"],
               ["pevné okno kontextu", "2010", "Mikolov et al.", "RNN language model: stav nese historii"],
               ["trénink krok za krokem", "2017", "Vaswani et al.", "Transformer: attention, paralelní trénink"]];

  const DIST = [["střeše", .625], ["gauči", .25], ["zemi", .125]];
  S.push({ id: "rozdeleni", era: "ngrams", html: `
    <h2>Nevypadne odpověď. Vypadne rozdělení.</h2>
    <p class="mono muted" style="font-size:30px">„sedí na …“: 50 + 20 + 10 = 80 výskytů</p>
    <div class="gap-m" ${st(1)}>${bars(DIST, { scale: .625, max: "760px", dec: 1 })}</div>
    <p class="fine gap-s" ${st(1)}>Z četností z minulého slidu: 50/80, 20/80, 10/80.</p>
    <p class="push"><span class="tag">ilustrativní četnosti</span></p>` });

  S.push({ id: "bengio", era: "bengio", html: `
    ${stop("2003", "Yoshua Bengio a kol.")}
    <h2>Co kdyby kočka a kotě nebyly dvě kolonky?</h2>
    <svg class="diagram" viewBox="0 0 900 250" width="900" height="250">
      <circle cx="120" cy="90" r="12" style="fill:#161616"/><text x="145" y="98" font-size="30">kočka</text>
      <circle cx="210" cy="140" r="12" style="fill:#161616"/><text x="235" y="148" font-size="30">kotě</text>
      <circle cx="760" cy="70" r="12" style="fill:#161616"/><text x="785" y="78" font-size="30">auto</text>
      <ellipse cx="200" cy="118" rx="150" ry="80" stroke="#161616" stroke-width="2.5" stroke-dasharray="8 8" fill="none"/>
      <text x="370" y="128" font-size="22" style="fill:#666666">blízko</text>
      <text x="760" y="140" font-size="22" text-anchor="middle" style="fill:#666666">daleko</text>
    </svg>
    <p class="fine gap-s"><span class="tag">schematická podobnost</span></p>
    ${pil("tabulka nezná podobná slova", "síť se učí vektory slov a z nich odhad dalšího", "pevné okno kontextu, drahý trénink", 1)}` });

  S.push({ id: "mikolov", era: "mikolov", html: `
    ${stop("2010", "Tomáš Mikolov a kol., Brno")}
    <h2>Pamatuj si, co bylo dřív</h2>
    <div class="row mono" style="gap:16px; font-size:30px; align-items:center">
      ${["Kočka", "sedí", "na", "…"].map((w, i) => `${i ? `${arr}` : ""}<span class="col" style="gap:10px; align-items:center"><span class="box">${w}</span><span class="fine" style="font-size:20px">stav ${i + 1}</span></span>`).join("")}
    </div>
    <p class="say gap-m">Rekurentní síť nese historii textu ve svém stavu. Žádné pevné okno.</p>
    ${pil("pevné okno kontextu", "RNN language model: stav přenáší historii", "počítá krok za krokem, dlouhé závislosti se učí špatně", 1)}` });

  S.push({ id: "word2vec", era: "word2vec", html: `
    ${stop("2013", "Mikolov a kol., Google")}
    <h2>word2vec: vektory slov levně a ve velkém</h2>
    <p class="say">Nejde o generování textu. Jde o to, naučit se dobré vektory pro slova z obřího korpusu.</p>
    <p class="mono gap-m" ${st(1)} style="font-size:34px">král − muž + žena ≈ královna</p>
    <p class="fine gap-s" ${st(1)}>Slavný příklad vztahů ve vektorech; funguje přibližně, ne vždy.</p>
    ${pil("naučit vektory slov bylo drahé", "levné učení slov z jejich okolí", "jedno slovo = jeden vektor bez ohledu na kontext; netvoří text", 2)}` });

  S.push({ id: "motor", era: "transformer", html: `
    ${stop("2017", "Transformer → motor dnešního LM")}
    <h2 style="margin-bottom:20px">Co je uvnitř? Jen minimum.</h2>
    <div class="col" style="gap:8px">
      ${MOTOR.map(([lbl, html], i) => `
        <div class="row" ${i ? st(i) : ""} style="gap:36px; min-height:62px">
          <span class="mono muted" style="font-size:26px; width:130px; text-align:right">${lbl}</span>${html}
        </div>`).join("")}
    </div>
    ${pil("RNN počítá krok za krokem", "attention: každý token se podívá na předchozí text; trénink paralelně", "kontext má strop a delší kontext je dražší", 3)}` });

  const KNOBS = [20, 110, 200, 300, 45, 160, 250, 330, 80, 190, 280, 15];
  S.push({ id: "pretraining", era: "gpt", html: `
    ${stop("2018+", "GPT")}
    <h2>Odkud to umí? Z textu. Hodně textu.</h2>
    <div class="row" style="align-items:flex-start; gap:70px">
      <div class="col" style="gap:22px; width:780px">
        ${[["Kočka sedí na", "rohožce"], ["Hlavní město Austrálie je", "Canberra"], ["def is_even(n): return n % 2 ==", "0"]].map(([t, n], i) =>
          `<div class="row" ${i ? st(i) : ""} style="gap:18px"><span class="mono" style="font-size:30px">${t}</span><span class="box ai" style="font-size:28px; padding:8px 16px">${n}</span></div>`).join("")}
        <p class="mono" style="font-size:28px; line-height:1.6; margin-top:20px" ${st(3)}>zakryj další token → model hádá → porovnej<br>→ maličko uprav naučená čísla → znovu<br><span class="accent">× biliony tokenů</span></p>
      </div>
      <svg class="diagram" viewBox="0 0 440 330" width="440" height="330" data-on="3">
        ${KNOBS.map((a, i) => {
          const cx = 50 + (i % 4) * 112, cy = 50 + Math.floor(i / 4) * 112, r = 40, rad = (a * Math.PI) / 180, hi = i === 5;
          return `<circle cx="${cx}" cy="${cy}" r="${r}" class="${hi ? "acc" : "ink"}" fill="#fff"/>
          <line class="knob-hand" style="transform-origin:${cx}px ${cy}px; --r:${(i % 3 - 1) * 14 + 9}deg" x1="${cx}" y1="${cy}" x2="${cx + Math.cos(rad) * r * .8}" y2="${cy + Math.sin(rad) * r * .8}" stroke="${hi ? "#161616" : "#161616"}" stroke-width="4" stroke-linecap="round"/>`;
        }).join("")}
      </svg>
    </div>
    <p class="lead push" ${st(4)}>Aby dobře doplňoval text, učí se jazyk, fakta, kód, styl a vztahy.</p>
    <p class="fine gap-s"><span class="tag">ilustrace, slova místo tokenů</span></p>` });

  S.push({ id: "gpt2", era: "gpt", html: `
    <h2>Co z toho vyleze? GPT-2, 2019</h2>
    <div class="col" style="gap:28px">
      <div class="row" style="gap:28px; align-items:baseline">
        <span class="mono muted" style="font-size:24px; width:200px; flex:none">vstup (lidský)</span>
        <p class="say">Fiktivní zpráva: v Andách objevili stádo jednorožců, kteří mluví anglicky.</p>
      </div>
      <div class="row" ${st(1)} style="gap:28px; align-items:baseline">
        <span class="mono accent" style="font-size:24px; width:200px; flex:none">pokračování</span>
        <p class="say">Článek v novinovém stylu. Vymyšlený biolog Jorge Pérez. Citace „vědců“.</p>
      </div>
    </div>
    <p class="lead push" ${st(2)}>Plynulý text ve správném žánru. Rozvíjí zadanou fikci. Není to ověřování zprávy.</p>
    <p class="fine gap-s"><span class="tag">české shrnutí skutečné ukázky: Radford et al. 2019, tab. 13</span></p>` });

  const FROG_PROMPT = `<div class="row" style="gap:24px; align-items:baseline">
        <span class="mono muted" style="font-size:24px; width:200px; flex:none">prompt</span>
        <p class="say">Napiš francouzsky krátký příběh: žába cestuje časem do antického Řecka.</p>
      </div>`;

  S.push({ id: "kostka", era: "gpt", html: `
    <h2>A teď hodíme kostkou</h2>
    <div class="row" style="gap:80px; align-items:flex-start">
      ${[[1.0, 0], [0.2, 1], [1.2, 2]].map(([T, step]) => `
        <div class="col" ${step ? st(step) : ""} style="gap:18px">
          <p class="mono" style="font-size:30px; font-weight:700; color:${T === 1 ? "var(--ink)" : "var(--accent)"}">T = ${T.toFixed(1)}</p>
          ${bars(temper(T), { cls: "compact", max: "260px" })}
        </div>`).join("")}
    </div>
    <p class="say gap-l" ${st(3)}>Kostka, která před každým hodem změní pravděpodobnosti svých stěn podle všeho, co zatím viděla.</p>
    <p class="lead accent gap-s" ${st(3)}>Stochastický ≠ náhodný chaos.</p>
    <p class="push"><span class="tag">ilustrativní čísla</span></p>` });

  const LOOP = ["kontext (tokeny)", "síť", "rozdělení", "sampling", "další token"];
  S.push({ id: "smycka", era: "gpt", html: `
    <h2>A znovu. A znovu. A znovu.</h2>
    <div class="row" style="align-items:flex-start; gap:70px">
      <svg class="diagram" viewBox="0 0 520 460" width="480" height="430">
        ${LOOP.map((p, i) => {
          const y = i * 92, last = i === 4;
          return `<rect x="0" y="${y}" width="380" height="60" rx="5" class="${last ? "acc" : "ink"}" fill="#fff"/>
          <text x="190" y="${y + 39}" font-size="24" text-anchor="middle" ${last ? 'style="fill:#161616;font-weight:700"' : ""}>${p}</text>
          ${i < 4 ? `<line x1="190" y1="${y + 61}" x2="190" y2="${y + 90}" stroke="#666666" stroke-width="2.5"/>${ah(190, y + 61, 190, y + 90)}` : ""}`;
        }).join("")}
        <path d="M380,${4 * 92 + 30} H440 V30 H386" class="acc"/>${ah(440, 30, 382, 30, "#161616")}
      </svg>
      <div class="col" style="gap:30px; margin-top:20px">
        ${[["Kočka sedí na", "·st"], ["Kočka sedí na st", "ře"], ["Kočka sedí na stře", "še"], ["Kočka sedí na střeše", "."]].map(([c, t], i) =>
          `<div class="row" ${i ? st(i) : ""} style="gap:24px"><span class="mono" style="font-size:34px; width:440px">${c}</span>${arr}${box(t, "ai")}</div>`).join("")}
        <p class="fine gap-s">Tokeny podle o200k_base, konkrétní volby ilustrativní.</p>
      </div>
    </div>` });

  S.push({ id: "base-model", era: "gpt", html: `
    <h2>Base model není asistent</h2>
    <div class="col" style="gap:30px">
      ${FROG_PROMPT}
      <div class="row" ${st(1)} style="gap:24px; align-items:baseline">
        <span class="mono accent" style="font-size:24px; width:200px; flex:none">GPT-3 (base)</span>
        <p class="say">Další zadání: příběh o dítěti a hrách bohů. Příběh o mladíkovi v jiné době. Příběh o dítěti s imaginárním přítelem…</p>
      </div>
    </div>
    ${pil("jak se učit bez ručně označených dat?", "predikuj další token na obřím textu, škáluj", "umí pokračovat v textu; roli pomocníka nemá zaručenou", 2)}
    <p class="fine gap-s"><span class="tag">české shrnutí skutečných výstupů: Ouyang et al. 2022, obr. 42</span></p>` });

  S.push({ id: "instruction", era: "chatgpt", html: `
    ${stop("2022", "ChatGPT")}
    <h2>Naučíme ho formát konverzace</h2>
    <pre class="code" style="font-size:28px; white-space:pre-wrap; max-width:1150px">Uživatel: Přelož „dobrý den“ do angličtiny.
Asistent: Good morning / Good afternoon.

Uživatel: Shrň tenhle e-mail jednou větou.
Asistent: Klient posouvá schůzku na čtvrtek.</pre>
    <p class="say muted gap-m" ${st(1)}>Lidé napíšou obě strany dialogu. Tisíce takových ukázek.</p>
    <p class="lead push" ${st(2)}>Pořád doplňuje dokument. Jen dokument teď vypadá jako konverzace.</p>
    <p class="fine gap-s"><span class="tag">ilustrace</span></p>` });

  S.push({ id: "preference", era: "chatgpt", html: `
    <h2>Která odpověď je lepší?</h2>
    <p class="mono" style="font-size:30px; margin-bottom:28px">Vysvětli mi jednou větou, co je token.</p>
    <div class="grid2" style="gap:50px">
      <div class="pref" data-pick="a">
        <p class="mono muted" style="font-size:22px; margin-bottom:10px">odpověď A</p>
        <p class="say" style="font-size:30px">Tokenizace má dlouhou historii. Začněme tím, jak počítače kódují znaky… <span class="muted">(a dalších pět odstavců)</span></p>
      </div>
      <div class="pref" data-pick="b">
        <p class="mono muted" style="font-size:22px; margin-bottom:10px">odpověď B</p>
        <p class="say" style="font-size:30px">Kousek textu, se kterým model pracuje: někdy celé slovo, někdy jen jeho část.</p>
      </div>
    </div>
    <p class="lead gap-l" ${st(1)}>Lidé porovnávají. Model se posouvá k odpovědím, které hodnotitelé preferují.</p>
    <p class="push"><span class="tag">ilustrace, ne skutečný anotační záznam</span></p>
    <style>
      [data-id="preference"] .pref { border: 2.5px solid var(--line); border-radius: 8px; padding: 26px 30px; background: #fff; transition: border-color .3s, box-shadow .3s; }
      [data-id="preference"].s1 .pref[data-pick="b"] { border-color: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); }
      [data-id="preference"].s1 .pref[data-pick="b"]::after { content: "✓ vybráno"; display: block; margin-top: 14px; font: 700 24px var(--mono); color: var(--accent); }
    </style>` });

  S.push({ id: "zaba-po", era: "chatgpt", html: `
    <h2>Stejný prompt, po post-trainingu</h2>
    <div class="col" style="gap:30px">
      ${FROG_PROMPT}
      <div class="row" style="gap:24px; align-items:baseline">
        <span class="mono muted" style="font-size:24px; width:200px; flex:none">GPT-3 (base)</span>
        <p class="say muted">Další zadání dalších příběhů…</p>
      </div>
      <div class="row" ${st(1)} style="gap:24px; align-items:baseline">
        <span class="mono accent" style="font-size:24px; width:200px; flex:none">InstructGPT</span>
        <p class="say">Příběh o ztracené, unavené žábě, která hledá cestu do starého Řecka.</p>
      </div>
    </div>
    <p class="lead gap-m" ${st(2)}>Stejný motor. Jiné chování.</p>
    ${pil("doplňovač nehraje roli asistenta", "ukázkové konverzace + preference hodnotitelů", "zní jako odpověď; to nezaručuje pravdu", 2)}
    <p class="fine gap-s"><span class="tag">české shrnutí skutečných výstupů: Ouyang et al. 2022, obr. 42</span></p>` });

  S.push({ id: "evoluce", era: "chatgpt", html: `
    <h2>Tři kroky k chatbotovi</h2>
    <div class="row" style="gap:28px; margin-top:20px; align-items:flex-start">
      ${[["doplňovač textu", "pretraining"], ["asistent", "instruction tuning"], ["lepší asistent", "preference"]].map(([a, b], i) => `
        ${i ? `<span ${st(i)} style="display:flex; padding-top:52px">${arr}</span>` : ""}
        <div class="col" ${i ? st(i) : ""} style="gap:14px; width:380px">
          <span class="box ${i === 2 ? "ai" : ""}" style="font-family:var(--sans); font-size:40px; font-weight:700; padding:28px 20px">${a}</span>
          <span class="mono muted" style="font-size:24px; text-align:center">${b}</span>
        </div>`).join("")}
    </div>
    <p class="lead push" ${st(3)}>Nejdřív jsme model naučili pokračovat v textu. Pak jsme ho naučili, jak má pokračovat, když po něm něco chceme.</p>` });

  S.push({ id: "halucinace", era: "today", html: `
    ${stop("dnes", "LLM v praxi")}
    <h2>Proč halucinuje?</h2>
    <p class="big" style="font-size:88px; margin-top:40px">Zní to jako odpověď.</p>
    <p class="big accent" style="font-size:88px; margin-top:16px" ${st(1)}>To nezaručuje pravdu.</p>
    <p class="say muted push" ${st(2)}>Model může říct „nevím“. Generování ale nezaručuje, že správně pozná kdy.</p>` });

  S.push({ id: "pocitani", era: "today", html: `
    <p class="big" style="margin-top:60px; font-size:150px">2837 × 491 = ?</p>
    <p class="lead muted gap-m" ${st(1)}>Kde jste v té mašině viděli násobičku?</p>
    <div class="row gap-l" ${st(2)} style="gap:28px">
      ${box("LLM", "ai")}${arr}${box("calculator()")}${arr}<span class="mono" style="font-size:64px; font-weight:700">1 392 967</span>
    </div>
    <p class="lead push" ${st(2)}>Když mám kalkulačku, použiju kalkulačku.</p>` });

  S.push({ id: "aktualni", era: "today", html: `
    <h2>Co v tréninku nenajde</h2>
    <div class="col" style="gap:20px">
      <p class="quote" style="font-size:52px">„Kolik teď stojí bitcoin?“</p>
      <p class="quote" style="font-size:52px" ${st(1)}>„Co říká naše interní směrnice o cestovném?“</p>
    </div>
    <p class="say muted gap-m" ${st(2)}>Trénink někdy skončil. A pokud naše dokumenty nedostal, nemá se o co opřít.</p>
    <div class="row gap-m" ${st(3)} style="gap:20px">
      ${box("dotaz")}${arr}${box("search / API / retrieval")}${arr}${box("výsledek do kontextu")}${arr}${box("LLM odpoví", "ai")}
    </div>
    <p class="lead push" ${st(3)}>Najdeme podklady. Přidáme je k otázce.</p>` });

  S.push({ id: "agent", era: "today", html: `
    <h2>Agent? Tohle ve smyčce.</h2>
    <svg class="diagram" viewBox="0 0 1360 380" width="1360" height="380">
      ${[["LLM navrhne akci", 0, true], ["kód ji ověří a spustí", 1], ["výsledek do kontextu", 2]].map(([t, i, acc]) => {
        const x = 40 + i * 450;
        return `<rect x="${x}" y="40" width="380" height="90" rx="6" class="${acc ? "acc" : "ink"}" fill="#fff"/>
        <text x="${x + 190}" y="95" font-size="26" text-anchor="middle" ${acc ? 'style="fill:#161616;font-weight:700"' : ""}>${t}</text>
        ${i < 2 ? `<line x1="${x + 382}" y1="85" x2="${x + 446}" y2="85" stroke="#666666" stroke-width="2.5"/>${ah(x + 382, 85, x + 446, 85)}` : ""}`;
      }).join("")}
      <path d="M1130,132 V230 H230 V136" class="acc" stroke-dasharray="10 8"/>${ah(230, 180, 230, 134, "#161616")}
      <text x="680" y="272" font-size="24" text-anchor="middle" style="fill:#161616">znovu, dokud není hotovo</text>
    </svg>
    <p class="lead gap-m" ${st(1)}>LLM není celý agent. Je to jedna součástka systému.</p>
    ${pil("model neví aktuální věci a nepočítá přesně", "nástroje, vyhledávání a kód kolem modelu", "pořád odhad; za výsledek odpovídá systém", 1)}` });

  S.push({ id: "spatne", era: "today", html: `
    <h2>Dosáhl 18 let?</h2>
    <div class="row" style="gap:24px">
      <span class="accent" style="font-size:56px; width:60px">✗</span>${box("birth_date")}${arr}${box("LLM", "ai")}${arr}<span class="mono muted" style="font-size:34px">„ano, asi jo“</span>
    </div>
    <div class="row gap-m" ${st(1)} style="gap:24px">
      <span style="font-size:56px; width:60px">✓</span>${box("birth_date")}${arr}${box("věk(d, dnes) >= 18")}${arr}<span class="mono" style="font-size:40px; font-weight:700">true</span>
    </div>
    <p class="lead push" ${st(2)}>Nedělej z deterministického problému probabilistický jen proto, že máš LLM.</p>` });

  S.push({ id: "dobre", era: "today", html: `
    <h2>Je to stížnost?</h2>
    <p class="quote">„No paráda, zase mi to přišlo rozbitý.“</p>
    <div class="row gap-l" style="align-items:center; gap:70px">
      <pre class="code" ${st(1)} style="font-size:26px">if "paráda" in msg:
    return PRAISE
<span class="m"># …a 4000 dalších výjimek</span></pre>
      <div class="row" ${st(2)} style="gap:28px">
        ${box("LLM", "ai")}${arr}
        <div class="col mono" style="gap:8px; font-size:30px">
          <span class="accent" style="font-weight:700">complaint</span><span class="muted">praise</span><span class="muted">question</span><span class="muted">nejisté → člověk</span>
        </div>
      </div>
    </div>
    <p class="lead push" ${st(2)}>Tady rychle přibývají výjimky. Tady se model může hodit.</p>` });

  S.push({ id: "architektura", era: "today", html: `
    <h2 style="margin-bottom:20px; font-size:52px">Deterministic software + probabilistic capabilities</h2>
    <svg class="diagram" viewBox="0 0 1360 640" width="1190" height="560" style="align-self:center">
      
      <g>
        <rect x="580" y="0" width="200" height="50" rx="5" class="ink" fill="#fff"/><text x="680" y="33" font-size="22" text-anchor="middle">USER</text>
        <line x1="680" y1="52" x2="680" y2="86" stroke="#666666" stroke-width="2.5"/>${ah(680, 52, 680, 86, "#666666")}
        <rect x="330" y="90" width="700" height="64" rx="6" class="acc" fill="#fff"/>
        <text x="680" y="131" font-size="24" font-weight="700" text-anchor="middle" style="fill:#161616">LLM interpretuje, navrhuje, generuje</text>
      </g>
      <g ${st(1)}>
        <line x1="680" y1="156" x2="680" y2="194" stroke="#666666" stroke-width="2.5"/>${ah(680, 156, 680, 194, "#666666")}
        <rect x="330" y="198" width="700" height="58" rx="6" fill="#fff" stroke="#161616" stroke-width="4"/>
        <text x="680" y="235" font-size="22" font-weight="700" text-anchor="middle">autorizace + validace argumentů (před akcí)</text>
        <line x1="520" y1="258" x2="330" y2="306" stroke="#666666" stroke-width="2.5"/>${ah(520, 258, 330, 306, "#666666")}
        <line x1="840" y1="258" x2="1030" y2="306" stroke="#666666" stroke-width="2.5"/>${ah(840, 258, 1030, 306, "#666666")}
        <rect x="60" y="310" width="520" height="96" rx="6" class="ink" fill="#fff"/>
        <text x="320" y="350" font-size="22" text-anchor="middle" font-weight="700">deterministic tools</text>
        <text x="320" y="384" font-size="20" text-anchor="middle" style="fill:#666666">kalkulačka, API, business rules</text>
        <rect x="780" y="310" width="520" height="96" rx="6" class="ink" fill="#fff"/>
        <text x="1040" y="350" font-size="22" text-anchor="middle" font-weight="700">external knowledge</text>
        <text x="1040" y="384" font-size="20" text-anchor="middle" style="fill:#666666">search, RAG, databáze, dokumenty</text>
      </g>
      <g ${st(2)}>
        <path d="M60,358 H20 V122 H324" class="acc" stroke-dasharray="10 8"/>${ah(20, 122, 330, 122, "#161616")}
        <path d="M1300,358 H1340 V122 H1036" class="acc" stroke-dasharray="10 8"/>${ah(1340, 122, 1030, 122, "#161616")}
        <text x="1340" y="80" font-size="20" text-anchor="end" style="fill:#161616">výsledky zpět do kontextu</text>
      </g>
      <g ${st(3)}>
        <line x1="320" y1="408" x2="520" y2="466" stroke="#666666" stroke-width="2.5"/>${ah(320, 408, 520, 466, "#666666")}
        <line x1="1040" y1="408" x2="840" y2="466" stroke="#666666" stroke-width="2.5"/>${ah(1040, 408, 840, 466, "#666666")}
        <rect x="330" y="470" width="700" height="58" rx="6" fill="#fff" stroke="#161616" stroke-width="4"/>
        <text x="680" y="507" font-size="22" font-weight="700" text-anchor="middle">validace výstupu</text>
        <line x1="680" y1="530" x2="680" y2="566" stroke="#666666" stroke-width="2.5"/>${ah(680, 530, 680, 566, "#666666")}
        <rect x="580" y="570" width="200" height="50" rx="5" class="ink" fill="#fff"/><text x="680" y="603" font-size="22" text-anchor="middle">RESULT</text>
      </g>
    </svg>` });

  S.push({ id: "terminatori", era: "today", html: `
    <div class="swap" data-until="3">
      <p class="big" style="font-size:88px">Takže… zničí nás Terminátoři?</p>
      <p class="lead gap-l" ${st(1)}>Znalost mechanismu není důkaz bezpečnosti.</p>
      <p class="say muted gap-s" ${st(1)}>Co můžeme řídit hned: oprávnění, ověřování a lidský dohled.</p>
      <p class="lead accent push" ${st(2)}>DON'T PANIC ≠ don't care.</p>
    </div>
    <div class="swap" ${st(3)}>
      <h1 class="huge" style="margin-top:40px">DON'T PANIC</h1>
      <p class="lead gap-l" style="font-weight:500">It's just software.</p>
      <p class="lead accent">Very weird software.</p>
      <p class="say muted push">Don't replace certainty with probability<br>unless probability solves a problem certainty can't.</p>
    </div>` });

  S.push({ id: "zdroje", era: "today", html: `
    <h2>Kam dál</h2>
    <div class="row" style="align-items:flex-start; gap:90px">
      <div class="col" style="gap:30px; flex:1">
        ${[["Transformer Explainer", "https://poloclub.github.io/transformer-explainer/", "poloclub.github.io/transformer-explainer"],
           ["Radford et al. 2019: GPT-2", "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf", "cdn.openai.com/better-language-models/…multitask_learners.pdf"],
           ["Ouyang et al. 2022: InstructGPT", "https://arxiv.org/abs/2203.02155", "arxiv.org/abs/2203.02155"],
           ["Karpathy: Deep Dive into LLMs like ChatGPT", "https://www.youtube.com/watch?v=7xTGNNLPyMI", "youtube.com/watch?v=7xTGNNLPyMI"]].map(([t, u, d]) =>
          `<div><p class="say" style="font-weight:600">${t}</p><a class="mono" style="font-size:24px" href="${u}" target="_blank" rel="noopener">${d}</a></div>`).join("")}
      </div>
      <figure style="margin:0; text-align:center">
        <div class="qr" style="width:340px; height:340px">${window.QR_SVG || ""}</div>
        <figcaption class="fine" style="margin-top:10px">Transformer Explainer</figcaption>
      </figure>
    </div>` });

  window.SLIDES = S;
})();
