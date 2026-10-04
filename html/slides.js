// Slide content. Each slide: { id, act, html }. Builds: data-step="n" appears at step n,
// data-until="n" disappears at step n, data-on="n" gets class "on" from step n.
// Notes live in notes.js under the same id.
(() => {
  const st = (n) => `data-step="${n}"`;
  const tok = (t, id, cls = "") => `<div class="tok ${cls}"><b>${t.replace(/ /g, "·")}</b>${id != null ? `<i>${id}</i>` : ""}</div>`;
  const box = (t, cls = "") => `<span class="box ${cls}">${t}</span>`;
  const arr = `<span class="arrow"></span>`;
  const pct = (p) => (p >= 0.01 ? Math.round(p * 100) + " %" : "<1 %");
  const bars = (rows, { cls = "", max = "820px", scale = 1 } = {}) =>
    `<div class="bars ${cls}" style="--max:${max}">` +
    rows.map(([l, p], i) => `<span class="lbl">${l}</span><span class="track ${i === 0 ? "lead-bar" : ""}"><span class="fill" style="--p:${p / scale}"></span><span class="pct">${pct(p)}</span></span>`).join("") +
    `</div>`;
  // Arrowhead as an explicit triangle; url(#id) references warn under file:// with a hash.
  const ah = (x1, y1, x2, y2, color = "#5F6B78", L = 15, W = 7) => {
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

  const S = [];

  // ===== I. Otevíráme krabičku ==============================================
  S.push({ id: "dont-panic", act: "I", html: `
    <div class="swap" data-until="1">
      <p class="fine" style="font-size:28px">Stopařův průvodce po LLMs</p>
      <h1 class="huge" style="margin-top:150px">DON'T PANIC</h1>
      <p class="lead muted gap-m" style="font-weight:500">aneb zničí nás Terminátoři?</p>
      <p class="fine push">AI Monday, 5. 10. 2026</p>
    </div>
    <div class="swap" ${st(1)}>
      <div class="col" style="gap:14px">
        <p class="big" style="font-size:96px">Zničí nás AI?</p>
        <p class="big muted" style="font-size:96px">Vezme nám práci?</p>
        <p class="big muted" style="font-size:96px">Myslí? Ví, co říká?</p>
      </div>
      <div class="push" ${st(2)}>
        <p class="say">Nejvíc se bojíme toho, čemu nerozumíme.</p>
        <p class="lead accent gap-s">Tak to pojďme rozebrat.</p>
      </div>
    </div>` });

  S.push({ id: "sroubovak", act: "I", html: `
    <div style="position:relative; height:520px">
      <svg class="diagram swap" data-until="1" viewBox="0 0 1360 520" width="1360" height="520">
        
        <text x="40" y="250" font-size="34" fill="#5F6B78">prompt</text>
        <line x1="40" y1="285" x2="320" y2="285" class="ink"/>${ah(40, 285, 320, 285, "#17212B")}
        <rect x="340" y="150" width="460" height="260" rx="6" fill="#17212B"/>
        <text x="570" y="318" font-size="84" font-weight="700" text-anchor="middle" style="fill:#FAFBFC">LLM</text>
        <line x1="820" y1="285" x2="1110" y2="285" class="ink"/>${ah(820, 285, 1110, 285, "#17212B")}
        <text x="830" y="250" font-size="34" fill="#5F6B78">answer</text>
      </svg>
      <div class="swap" ${st(1)} style="align-items:center; justify-content:center">
        <img src="assets/llm-open-box.png" width="704" height="384" alt="Rozebraná krabička LLM se šroubovákem" style="image-rendering:pixelated">
      </div>
    </div>
    <div class="push" ${st(1)}>
      <p class="say muted"><em>Většina věcí po mně už nikdy nefungovala.</em></p>
      <p class="say">Ale vždycky jsem se něco naučil.</p>
    </div>` });

  // ===== II. Motor a jak se z něj stal asistent ===========================
  S.push({ id: "kocka", act: "II", html: `
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

  S.push({ id: "motor", act: "II", html: `
    <h2 style="margin-bottom:36px">Co je uvnitř? Jen minimum.</h2>
    <div class="col" style="gap:18px">
      ${MOTOR.map(([lbl, html], i) => `
        <div class="row" ${i ? st(i) : ""} style="gap:36px; min-height:92px">
          <span class="mono muted" style="font-size:26px; width:130px; text-align:right">${lbl}</span>${html}
        </div>`).join("")}
    </div>
    <p class="fine push" ${st(3)}>Uvnitř sítě se každý token může „podívat“ na předchozí text. Tomu se říká attention.</p>` });

  const DIST = [["střeše", .31], ["gauči", .18], ["zemi", .11], ["stole", .07], ["okně", .05]];
  S.push({ id: "rozdeleni", act: "II", html: `
    <h2>Nevypadne odpověď. Vypadne rozdělení.</h2>
    <p class="mono muted" style="font-size:30px">Kočka sedí na …</p>
    <div class="gap-m" ${st(1)}>${bars(DIST, { scale: .31, max: "760px" })}</div>
    <p class="fine gap-s" ${st(1)}>Ostatní: 28 % dohromady, rozprostřeno mezi desítky tisíc tokenů.</p>
    <p class="push"><span class="tag">ilustrativní čísla, slova místo tokenů</span></p>` });

  S.push({ id: "kostka", act: "II", html: `
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
  S.push({ id: "smycka", act: "II", html: `
    <h2>A znovu. A znovu. A znovu.</h2>
    <div class="row" style="align-items:flex-start; gap:70px">
      <svg class="diagram" viewBox="0 0 520 460" width="480" height="430">
        ${LOOP.map((p, i) => {
          const y = i * 92, last = i === 4;
          return `<rect x="0" y="${y}" width="380" height="60" rx="5" class="${last ? "acc" : "ink"}" fill="#fff"/>
          <text x="190" y="${y + 39}" font-size="24" text-anchor="middle" ${last ? 'style="fill:#2458B3;font-weight:700"' : ""}>${p}</text>
          ${i < 4 ? `<line x1="190" y1="${y + 61}" x2="190" y2="${y + 90}" stroke="#5F6B78" stroke-width="2.5"/>${ah(190, y + 61, 190, y + 90)}` : ""}`;
        }).join("")}
        <path d="M380,${4 * 92 + 30} H440 V30 H386" class="acc"/>${ah(440, 30, 382, 30, "#2458B3")}
      </svg>
      <div class="col" style="gap:30px; margin-top:20px">
        ${[["Kočka sedí na", "·st"], ["Kočka sedí na st", "ře"], ["Kočka sedí na stře", "še"], ["Kočka sedí na střeše", "."]].map(([c, t], i) =>
          `<div class="row" ${i ? st(i) : ""} style="gap:24px"><span class="mono" style="font-size:34px; width:440px">${c}</span>${arr}${box(t, "ai")}</div>`).join("")}
        <p class="fine gap-s">Tokeny podle o200k_base, konkrétní volby ilustrativní.</p>
      </div>
    </div>` });

  // ===== Historie: rampa k pretrainingu =====================================
  // Shannon 1951 guessed letters; Czech row + guess counts are an illustration.
  const GUESS = [["K", 5], ["O", 2], ["Č", 3], ["K", 1], ["A", 1], ["␣", 1], ["S", 4], ["E", 2], ["D", 1], ["Í", 1], ["␣", 1], ["N", 2], ["A", 1]];
  S.push({ id: "shannon", act: "II", html: `
    <h2>Tuhle hru hrajeme od roku 1951</h2>
    <p class="say">Claude Shannon nechával lidi hádat další písmeno textu.</p>
    <div class="row gap-l" ${st(1)} style="gap:10px; align-items:flex-start">
      ${GUESS.map(([c, n]) => `<div class="col" style="gap:10px; align-items:center; width:84px">
        <span class="box" style="width:76px; height:84px; font-size:44px; padding:0">${c}</span>
        <span class="mono ${n === 1 ? "accent" : "muted"}" style="font-size:26px">${n}</span></div>`).join("")}
    </div>
    <p class="fine gap-s" ${st(1)}>Číslo = kolikátým pokusem člověk uhodl. Často hned napoprvé.</p>
    <p class="lead push" ${st(2)}>Stejná hra jako s kočkou. Jen po písmenech.</p>
    <p class="fine gap-s"><span class="tag">ilustrace principu; Shannon 1951 testoval angličtinu</span></p>` });

  const NGRAM = [["střeše", 50], ["gauči", 20], ["zemi", 10]];
  S.push({ id: "ngramy", act: "II", html: `
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
    <p class="lead push" ${st(3)}>Chytré a praktické. Ale pořád jen tabulky četností.</p>
    <p class="fine gap-s"><span class="tag">ilustrativní četnosti</span></p>` });

  const GEN = [["tabulka nezná podobná slova", "2003", "Bengio et al.", "naučené vektory slov: kočka ≈ kotě"],
               ["pevné okno kontextu", "2010", "Mikolov et al.", "RNN language model: stav nese historii"],
               ["trénink krok za krokem", "2017", "Vaswani et al.", "Transformer: attention, paralelní trénink"]];
  S.push({ id: "neuronove", act: "II", html: `
    <h2>Každá generace řešila limit té předchozí</h2>
    <div class="row" style="gap:50px; align-items:flex-start">
      <div class="col" style="gap:40px; flex:1">
        ${GEN.map(([lim, y, who, sol], i) => `
          <div class="row" ${i ? st(i === 2 ? 3 : i) : ""} style="gap:22px">
            <span class="say muted" style="width:400px; font-size:28px; flex:none">${lim}</span>${arr}
            <span class="mono accent" style="font-size:30px; font-weight:700; width:84px; flex:none">${y}</span>
            <span class="say" style="font-size:30px"><b style="font-weight:600">${who}</b><br>${sol}</span>
          </div>`).join("")}
      </div>
      <div class="col" ${st(2)} style="gap:10px; width:300px; flex:none; border:2.5px dashed var(--line); border-radius:8px; padding:22px 24px; margin-top:70px">
        <span class="mono muted" style="font-size:22px">vedlejší větev</span>
        <span class="mono accent" style="font-size:30px; font-weight:700">2013</span>
        <span class="say" style="font-size:28px"><b style="font-weight:600">word2vec</b>, Mikolov et al.: vektory slov levně a ve velkém</span>
      </div>
    </div>
    <p class="lead push" ${st(4)}>Stará myšlenka. Lepší metody, víc dat a výpočtu.</p>` });

  const KNOBS = [20, 110, 200, 300, 45, 160, 250, 330, 80, 190, 280, 15];
  S.push({ id: "pretraining", act: "II", html: `
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
          <line class="knob-hand" style="transform-origin:${cx}px ${cy}px; --r:${(i % 3 - 1) * 14 + 9}deg" x1="${cx}" y1="${cy}" x2="${cx + Math.cos(rad) * r * .8}" y2="${cy + Math.sin(rad) * r * .8}" stroke="${hi ? "#2458B3" : "#17212B"}" stroke-width="4" stroke-linecap="round"/>`;
        }).join("")}
      </svg>
    </div>
    <p class="lead push" ${st(4)}>Aby dobře doplňoval text, učí se jazyk, fakta, kód, styl a vztahy.</p>
    <p class="fine gap-s"><span class="tag">ilustrace, slova místo tokenů</span></p>` });

  S.push({ id: "gpt2", act: "II", html: `
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
  S.push({ id: "base-model", act: "II", html: `
    <h2>Base model není asistent</h2>
    <div class="col" style="gap:30px">
      ${FROG_PROMPT}
      <div class="row" ${st(1)} style="gap:24px; align-items:baseline">
        <span class="mono accent" style="font-size:24px; width:200px; flex:none">GPT-3 (base)</span>
        <p class="say">Další zadání: příběh o dítěti a hrách bohů. Příběh o mladíkovi v jiné době. Příběh o dítěti s imaginárním přítelem…</p>
      </div>
    </div>
    <p class="lead push" ${st(2)}>Umí pokračovat v textu. Roli pomocníka ale nemá zaručenou.</p>
    <p class="fine gap-s"><span class="tag">české shrnutí skutečných výstupů: Ouyang et al. 2022, obr. 42</span></p>` });

  S.push({ id: "instruction", act: "II", html: `
    <h2>Naučíme ho formát konverzace</h2>
    <pre class="code" style="font-size:28px; white-space:pre-wrap; max-width:1150px">Uživatel: Přelož „dobrý den“ do angličtiny.
Asistent: Good morning / Good afternoon.

Uživatel: Shrň tenhle e-mail jednou větou.
Asistent: Klient posouvá schůzku na čtvrtek.</pre>
    <p class="say muted gap-m" ${st(1)}>Lidé napíšou obě strany dialogu. Tisíce takových ukázek.</p>
    <p class="lead push" ${st(2)}>Pořád doplňuje dokument. Jen dokument teď vypadá jako konverzace.</p>
    <p class="fine gap-s"><span class="tag">ilustrace</span></p>` });

  S.push({ id: "preference", act: "II", html: `
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

  S.push({ id: "zaba-po", act: "II", html: `
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
    <p class="lead push" ${st(2)}>Stejný motor. Jiné chování.</p>
    <p class="fine gap-s"><span class="tag">české shrnutí skutečných výstupů: Ouyang et al. 2022, obr. 42</span></p>` });

  S.push({ id: "evoluce", act: "II", html: `
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

  // ===== III. Kde to skřípe ================================================
  S.push({ id: "halucinace", act: "III", html: `
    <h2>Proč halucinuje?</h2>
    <p class="big" style="font-size:88px; margin-top:40px">Zní to jako odpověď.</p>
    <p class="big accent" style="font-size:88px; margin-top:16px" ${st(1)}>To nezaručuje pravdu.</p>
    <p class="say muted push" ${st(2)}>Model může říct „nevím“. Generování ale nezaručuje, že správně pozná kdy.</p>` });

  S.push({ id: "pocitani", act: "III", html: `
    <p class="big" style="margin-top:60px; font-size:150px">2837 × 491 = ?</p>
    <p class="lead muted gap-m" ${st(1)}>Kde jste v té mašině viděli násobičku?</p>
    <div class="row gap-l" ${st(2)} style="gap:28px">
      ${box("LLM", "ai")}${arr}${box("calculator()")}${arr}<span class="mono" style="font-size:64px; font-weight:700">1 392 967</span>
    </div>
    <p class="lead push" ${st(2)}>Když mám kalkulačku, použiju kalkulačku.</p>` });

  // ===== IV. Stavíme kolem toho software ===================================
  S.push({ id: "aktualni", act: "IV", html: `
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

  S.push({ id: "agent", act: "IV", html: `
    <h2>Agent? Tohle ve smyčce.</h2>
    <svg class="diagram" viewBox="0 0 1360 380" width="1360" height="380">
      ${[["LLM navrhne akci", 0, true], ["kód ji ověří a spustí", 1], ["výsledek do kontextu", 2]].map(([t, i, acc]) => {
        const x = 40 + i * 450;
        return `<rect x="${x}" y="40" width="380" height="90" rx="6" class="${acc ? "acc" : "ink"}" fill="#fff"/>
        <text x="${x + 190}" y="95" font-size="26" text-anchor="middle" ${acc ? 'style="fill:#2458B3;font-weight:700"' : ""}>${t}</text>
        ${i < 2 ? `<line x1="${x + 382}" y1="85" x2="${x + 446}" y2="85" stroke="#5F6B78" stroke-width="2.5"/>${ah(x + 382, 85, x + 446, 85)}` : ""}`;
      }).join("")}
      <path d="M1130,132 V230 H230 V136" class="acc" stroke-dasharray="10 8"/>${ah(230, 180, 230, 134, "#2458B3")}
      <text x="680" y="272" font-size="24" text-anchor="middle" style="fill:#2458B3">znovu, dokud není hotovo</text>
    </svg>
    <p class="lead push" ${st(1)}>LLM není celý agent. Je to jedna součástka systému.</p>` });

  S.push({ id: "spatne", act: "IV", html: `
    <h2>Dosáhl 18 let?</h2>
    <div class="row" style="gap:24px">
      <span class="accent" style="font-size:56px; width:60px">✗</span>${box("birth_date")}${arr}${box("LLM", "ai")}${arr}<span class="mono muted" style="font-size:34px">„ano, asi jo“</span>
    </div>
    <div class="row gap-m" ${st(1)} style="gap:24px">
      <span style="font-size:56px; width:60px">✓</span>${box("birth_date")}${arr}${box("věk(d, dnes) >= 18")}${arr}<span class="mono" style="font-size:40px; font-weight:700">true</span>
    </div>
    <p class="lead push" ${st(2)}>Nedělej z deterministického problému probabilistický jen proto, že máš LLM.</p>` });

  S.push({ id: "dobre", act: "IV", html: `
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

  S.push({ id: "architektura", act: "IV", html: `
    <h2 style="margin-bottom:20px; font-size:52px">Deterministic software + probabilistic capabilities</h2>
    <svg class="diagram" viewBox="0 0 1360 640" width="1190" height="560" style="align-self:center">
      
      <g>
        <rect x="580" y="0" width="200" height="50" rx="5" class="ink" fill="#fff"/><text x="680" y="33" font-size="22" text-anchor="middle">USER</text>
        <line x1="680" y1="52" x2="680" y2="86" stroke="#5F6B78" stroke-width="2.5"/>${ah(680, 52, 680, 86, "#5F6B78")}
        <rect x="330" y="90" width="700" height="64" rx="6" class="acc" fill="#fff"/>
        <text x="680" y="131" font-size="24" font-weight="700" text-anchor="middle" style="fill:#2458B3">LLM interpretuje, navrhuje, generuje</text>
      </g>
      <g ${st(1)}>
        <line x1="680" y1="156" x2="680" y2="194" stroke="#5F6B78" stroke-width="2.5"/>${ah(680, 156, 680, 194, "#5F6B78")}
        <rect x="330" y="198" width="700" height="58" rx="6" fill="#fff" stroke="#17212B" stroke-width="4"/>
        <text x="680" y="235" font-size="22" font-weight="700" text-anchor="middle">autorizace + validace argumentů (před akcí)</text>
        <line x1="520" y1="258" x2="330" y2="306" stroke="#5F6B78" stroke-width="2.5"/>${ah(520, 258, 330, 306, "#5F6B78")}
        <line x1="840" y1="258" x2="1030" y2="306" stroke="#5F6B78" stroke-width="2.5"/>${ah(840, 258, 1030, 306, "#5F6B78")}
        <rect x="60" y="310" width="520" height="96" rx="6" class="ink" fill="#fff"/>
        <text x="320" y="350" font-size="22" text-anchor="middle" font-weight="700">deterministic tools</text>
        <text x="320" y="384" font-size="20" text-anchor="middle" style="fill:#5F6B78">kalkulačka, API, business rules</text>
        <rect x="780" y="310" width="520" height="96" rx="6" class="ink" fill="#fff"/>
        <text x="1040" y="350" font-size="22" text-anchor="middle" font-weight="700">external knowledge</text>
        <text x="1040" y="384" font-size="20" text-anchor="middle" style="fill:#5F6B78">search, RAG, databáze, dokumenty</text>
      </g>
      <g ${st(2)}>
        <path d="M60,358 H20 V122 H324" class="acc" stroke-dasharray="10 8"/>${ah(20, 122, 330, 122, "#2458B3")}
        <path d="M1300,358 H1340 V122 H1036" class="acc" stroke-dasharray="10 8"/>${ah(1340, 122, 1030, 122, "#2458B3")}
        <text x="1340" y="80" font-size="20" text-anchor="end" style="fill:#2458B3">výsledky zpět do kontextu</text>
      </g>
      <g ${st(3)}>
        <line x1="320" y1="408" x2="520" y2="466" stroke="#5F6B78" stroke-width="2.5"/>${ah(320, 408, 520, 466, "#5F6B78")}
        <line x1="1040" y1="408" x2="840" y2="466" stroke="#5F6B78" stroke-width="2.5"/>${ah(1040, 408, 840, 466, "#5F6B78")}
        <rect x="330" y="470" width="700" height="58" rx="6" fill="#fff" stroke="#17212B" stroke-width="4"/>
        <text x="680" y="507" font-size="22" font-weight="700" text-anchor="middle">validace výstupu</text>
        <line x1="680" y1="530" x2="680" y2="566" stroke="#5F6B78" stroke-width="2.5"/>${ah(680, 530, 680, 566, "#5F6B78")}
        <rect x="580" y="570" width="200" height="50" rx="5" class="ink" fill="#fff"/><text x="680" y="603" font-size="22" text-anchor="middle">RESULT</text>
      </g>
    </svg>` });

  S.push({ id: "terminatori", act: "IV", html: `
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

  S.push({ id: "zdroje", act: "IV", html: `
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
