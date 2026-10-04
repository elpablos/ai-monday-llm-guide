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
  const EN = [["The", 976], [" cat", 9059], [" sits", 38174], [" on", 402], [" the", 290], [" roof", 16367], [".", 13]];
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

  // ===== II. Rozebíráme ===================================================
  S.push({ id: "kocka", act: "II", html: `
    <p class="big" style="margin-top:120px">Kočka sedí na …</p>
    <div class="row gap-l" ${st(1)} style="gap:64px; font-size:56px; font-weight:600">
      <span class="accent">střeše</span><span>gauči</span><span>zemi</span><span>stole</span><span class="muted">…</span>
    </div>
    <p class="lead push" ${st(2)}>Gratuluju. Právě jste si zahráli na language model.</p>` });

  S.push({ id: "tokeny", act: "II", html: `
    <h2>LLM nevidí text. Dostává tokeny.</h2>
    <div class="tokens">${CZ.map(([t, id]) => tok(t, id)).join("")}<span class="count">9 tokenů</span></div>
    <div class="tokens gap-m" ${st(1)}>${EN.map(([t, id]) => tok(t, id)).join("")}<span class="count">7 tokenů</span></div>
    <p class="fine push">Tokenizer o200k_base. Tečka · je mezera. Čísla pod tokeny jsou jejich ID ve slovníku.</p>` });

  S.push({ id: "embeddings", act: "II", html: `
    <h2>Tokeny se změní na čísla</h2>
    <div class="row" style="align-items:flex-start; gap:60px">
      <div class="col" style="gap:28px">
        ${[["·sed", 10412, "[ 0.12, −0.83, 0.40, … ]"], ["·na", 898, "[−0.51, 0.07, 0.93, … ]"], ["·st", 420, "[ 0.66, 0.21, −0.18, … ]"]].map(([t, id, v]) =>
          `<div class="row" style="gap:22px">${box(t)}${arr}<span class="mono muted" style="font-size:28px;width:110px">${id}</span>${arr}<span class="mono accent" style="font-size:30px; white-space:nowrap">${v}</span></div>`).join("")}
        <p class="mono" style="font-size:28px; margin-top:12px">+ pozice v textu</p>
        <p class="fine">Schematické hodnoty. Reálně stovky až tisíce čísel na token.</p>
      </div>
      <figure ${st(1)} style="margin:0">
        <svg class="diagram" viewBox="0 0 360 360" width="360" height="360">
          <rect x="1" y="1" width="358" height="358" class="faint" stroke-dasharray="6 6"/>
          ${[["kočka", 50, 60], ["kotě", 80, 120], ["pes", 140, 85], ["střecha", 220, 250], ["okap", 255, 305]].map(([w, x, y]) =>
            `<circle cx="${x}" cy="${y}" r="8" fill="#2458B3"/><text x="${x + 16}" y="${y + 8}" font-size="22">${w}</text>`).join("")}
        </svg>
        <figcaption class="fine" style="margin-top:12px">Schéma, ne měření: co se používá podobně, skončí blízko.</figcaption>
      </figure>
    </div>` });

  const ATT = [["Kočka", 1], [" honila", .45], [" myš", .55], [",", .1], [" protože", .25], [" měla", .4]];
  S.push({ id: "attention", act: "II", html: `
    <h2>Na co se mám dívat?</h2>
    <div class="tokens" style="gap:16px">
      ${ATT.map(([t, w], i) => `<div class="tok ${i === 5 ? "cur" : ""}"><b class="att" style="--w:${w}">${t.replace(/ /g, "·")}</b>${i === 5 ? '<i style="color:var(--ink); font-size:22px; margin-top:12px">▲ zpracovávám</i>' : ""}</div>`).join("")}
      <div class="tok future"><b>·hlad</b><i style="font-size:22px; margin-top:12px">nevidí</i></div><div class="tok future"><b>.</b></div>
    </div>
    <p class="say gap-l">Když zpracovávám tento token, které části kontextu jsou pro něj důležité?</p>
    <p class="fine push" ${st(1)}>Sytost modré = váha attention. Schéma, ne změřené váhy; slova místo tokenů.</p>
    <style>
      [data-id="attention"] .att { transition: background-color .4s var(--ease); }
      [data-id="attention"].s1 .att { background: color-mix(in srgb, var(--accent) calc(var(--w) * 70%), #fff); }
    </style>` });

  S.push({ id: "transformer", act: "II", html: `
    <h2>Opakuj. Hodněkrát.</h2>
    <div class="row" style="align-items:flex-start; gap:90px">
      <svg class="diagram" viewBox="0 0 700 560" width="700" height="560">
        
        <rect x="0" y="0" width="600" height="58" rx="6" class="ink" fill="#fff"/>
        <text x="300" y="38" font-size="24" text-anchor="middle">tokeny + pozice → vektory</text>
        ${[0, 1, 2].map((i) => {
          const y = 100 + i * 110;
          return `<line x1="300" y1="${y - 40}" x2="300" y2="${y - 4}" class="ink" stroke="#5F6B78"/>${ah(300, (y - 40), 300, (y - 4), "#5F6B78")}
          <rect x="0" y="${y}" width="600" height="80" rx="8" class="ink" fill="#fff"/>
          <rect x="22" y="${y + 14}" width="250" height="52" rx="5" class="acc" fill="#fff"/><text x="147" y="${y + 48}" font-size="24" text-anchor="middle" style="fill:#2458B3">attention</text>
          <line x1="276" y1="${y + 40}" x2="322" y2="${y + 40}" class="ink"/>${ah(276, (y + 40), 322, (y + 40), "#5F6B78")}
          <rect x="328" y="${y + 14}" width="250" height="52" rx="5" class="ink" fill="#fff"/><text x="453" y="${y + 48}" font-size="24" text-anchor="middle">MLP</text>`;
        }).join("")}
        <text x="618" y="270" font-size="30" font-weight="700" style="fill:#2458B3">× N</text>
        <line x1="300" y1="420" x2="300" y2="466" class="ink"/>${ah(300, 420, 300, 466, "#5F6B78")}
        <rect x="0" y="470" width="600" height="58" rx="6" class="ink" fill="#fff"/>
        <text x="300" y="508" font-size="24" text-anchor="middle">logits</text>
      </svg>
      <div class="col" style="margin-top:60px; gap:36px; width:560px">
        <p class="lead">Žádná ručně napsaná tabulka odpovědí.</p>
        <p class="say muted" ${st(1)}>Architektura + miliardy naučených čísel. Parametrů.</p>
      </div>
    </div>` });

  const DIST = [["střeše", .31], ["gauči", .18], ["zemi", .11], ["stole", .07], ["okně", .05]];
  S.push({ id: "rozdeleni", act: "II", html: `
    <h2>Nevypadne odpověď. Vypadne rozdělení.</h2>
    <div class="row mono" style="font-size:28px; gap:20px; color:var(--muted)">
      <span>Kočka sedí na …</span>${arr}<span>logits</span>${arr}<span class="accent" style="font-weight:700">softmax</span>${arr}<span>pravděpodobnosti</span>
    </div>
    <div class="gap-m" ${st(1)}>${bars(DIST, { scale: .31, max: "760px" })}</div>
    <p class="fine gap-s" ${st(1)}>Ostatní: 28 % dohromady, rozprostřeno mezi desítky tisíc tokenů.</p>
    <p class="push"><span class="tag">Ilustrativní čísla, slova místo tokenů</span></p>` });

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
    <p class="fine push">Syntetické logits [3, 2, 1, 0], softmax(logits / T). Pořadí se nemění, mění se poměry.</p>` });

  const PIPE = ["text", "tokenizer", "tokeny", "embeddings", "transformer × N", "logits", "softmax → pravděpodobnosti", "sampling", "další token"];
  S.push({ id: "smycka", act: "II", html: `
    <h2>A znovu. A znovu. A znovu.</h2>
    <div class="row" style="align-items:flex-start; gap:70px">
      <svg class="diagram" viewBox="0 0 600 600" width="560" height="560">
        
        ${PIPE.map((p, i) => {
          const y = i * 66, last = i === 8;
          return `<rect x="0" y="${y}" width="420" height="48" rx="5" class="${last ? "acc" : "ink"}" fill="#fff"/>
          <text x="210" y="${y + 32}" font-size="21" text-anchor="middle" ${last ? 'style="fill:#2458B3;font-weight:700"' : ""}>${p}</text>
          ${i < 8 ? `<line x1="210" y1="${y + 49}" x2="210" y2="${y + 64}" stroke="#5F6B78" stroke-width="2"/>${ah(210, (y + 49), 210, (y + 64), "#5F6B78")}` : ""}`;
        }).join("")}
        <path d="M420,${8 * 66 + 24} H480 V${2 * 66 + 24} H426" class="acc"/>${ah(480, 2 * 66 + 24, 426, 2 * 66 + 24, "#2458B3")}
        <text x="492" y="300" font-size="22" style="fill:#2458B3">kontext</text>
        <text x="492" y="328" font-size="22" style="fill:#2458B3">tokenů</text>
      </svg>
      <div class="col" style="gap:30px; margin-top:40px">
        ${[["Kočka sedí na", "·st"], ["Kočka sedí na st", "ře"], ["Kočka sedí na stře", "še"], ["Kočka sedí na střeše", "."]].map(([c, t], i) =>
          `<div class="row" ${i ? st(i) : ""} style="gap:24px"><span class="mono" style="font-size:34px; width:440px">${c}</span>${arr}${box(t, "ai")}</div>`).join("")}
        <p class="fine gap-s">Tokeny podle o200k_base, konkrétní volby ilustrativní.</p>
      </div>
    </div>` });

  S.push({ id: "proc-chytre", act: "II", html: `
    <h2>Tak proč je to tak chytré?</h2>
    <div class="col" style="gap:22px">
      ${[["Hlavní město Austrálie je …", "fakta"], ["def is_even(n): return …", "kód"], ["„Le chat dort.“ = „Kočka …", "překlad"], ["Pokud A > B a B > C, pak A …", "struktura"]].map(([p, k], i) =>
        `<div class="row" ${i ? st(i) : ""} style="gap:28px">${box(p)}${arr}<span class="mono accent" style="font-size:32px">${k}</span></div>`).join("")}
    </div>
    <p class="lead push" ${st(4)}>Aby model dobře předpovídal text, učí se vzory a vztahy použitelné i pro překlad, kód a řešení úloh.</p>` });

  const KNOBS = [20, 110, 200, 300, 45, 160, 250, 330, 80, 190, 280, 15];
  S.push({ id: "training", act: "II", html: `
    <h2>Pootočíme pár miliard knoflíků</h2>
    <div class="row" style="align-items:flex-start; gap:70px">
      <div class="col" style="gap:20px; width:760px">
        <p class="mono" style="font-size:30px">text:  Kočka sedí na rohožce.</p>
        <p class="mono muted" style="font-size:30px">model: Kočka sedí na …</p>
        ${bars([["·st", .40], ["·ro", .03]], { cls: "compact", scale: .4, max: "380px" })}
        <p class="fine">Ilustrativní pravděpodobnosti.</p>
        <p class="mono accent" style="font-size:30px; font-weight:700" ${st(1)}>skutečný další token v textu: ·ro</p>
        <p class="mono" style="font-size:28px; line-height:1.6" ${st(2)}>chyba → malá úprava parametrů → znovu<br><span class="accent">× biliony tokenů</span></p>
        <p class="fine" ${st(3)}>Pak post-training: instrukce, preference, odměny.</p>
      </div>
      <svg class="diagram" viewBox="0 0 440 330" width="440" height="330" data-on="2">
        ${KNOBS.map((a, i) => {
          const cx = 50 + (i % 4) * 112, cy = 50 + Math.floor(i / 4) * 112, r = 40, rad = (a * Math.PI) / 180;
          const hi = i === 5;
          return `<circle cx="${cx}" cy="${cy}" r="${r}" class="${hi ? "acc" : "ink"}" fill="#fff"/>
          <line class="knob-hand" style="transform-origin:${cx}px ${cy}px; --r:${(i % 3 - 1) * 14 + 9}deg" x1="${cx}" y1="${cy}" x2="${cx + Math.cos(rad) * r * .8}" y2="${cy + Math.sin(rad) * r * .8}" stroke="${hi ? "#2458B3" : "#17212B"}" stroke-width="4" stroke-linecap="round"/>`;
        }).join("")}
      </svg>
    </div>` });

  S.push({ id: "jpeg", act: "II", html: `
    <h2>Co mají LLM společného s JPEGem?</h2>
    ${[["JPEG", ["obrázek", "ztrátová komprese", "malý soubor", "přibližná rekonstrukce"], 0], ["LLM", ["biliony tokenů", "training", "parametry", "generování"], 1]].map(([lbl, items, step]) => `
      <div class="row gap-s" ${step ? st(step) : ""} style="gap:20px; margin-bottom:28px">
        <span class="mono accent" style="font-size:30px; font-weight:700; width:110px">${lbl}</span>
        ${items.map((t) => box(t)).join(arr)}
      </div>`).join("")}
    <p class="lead gap-m" ${st(2)}>Parametry nejsou databáze dokumentů.</p>
    <p class="say muted gap-s" ${st(2)}>LLM není JPEG. Je to analogie pro intuici, ne technický popis.</p>` });

  // ===== III. Kde to skřípe ================================================
  S.push({ id: "halucinace", act: "III", html: `
    <h2>Proč halucinuje?</h2>
    <pre class="code">while not done:
    probs = model(context)    <span class="c"># vždycky nějaké rozdělení</span>
    token = sample(probs)     <span class="c"># vždycky nějaký token</span>
    context += token</pre>
    <p class="lead gap-m" ${st(1)}>Věrohodné pokračování není záruka pravdy.</p>
    <p class="say muted gap-s" ${st(1)}>Model může říct „nevím“. Generování ale nezaručuje, že správně pozná kdy.</p>` });

  S.push({ id: "pocitani", act: "III", html: `
    <p class="big" style="margin-top:60px; font-size:150px">2837 × 491 = ?</p>
    <p class="lead muted gap-m" ${st(1)}>Kde jste v té mašině viděli násobičku?</p>
    <div class="row gap-l" ${st(2)} style="gap:28px">
      ${box("LLM", "ai")}${arr}${box("calculator()")}${arr}<span class="mono" style="font-size:64px; font-weight:700">1 392 967</span>
    </div>
    <p class="lead push" ${st(2)}>Když mám kalkulačku, použiju kalkulačku.</p>` });

  // ===== IV. Stavíme kolem toho software ===================================
  const CHAIN = [["LLM", 0], ["+ aplikační\nkontext", 0], ["+ retrieval", 0], ["+ tools", 1], ["+ state", 1], ["= agent", 2]];
  S.push({ id: "nastroje", act: "IV", html: `
    <h2>Tak mu dejme nástroje</h2>
    <div class="row" style="gap:18px">
      ${CHAIN.map(([t, s], i) => `<span class="box chain ${i === 5 ? "dashed" : ""}" data-chain="${s}" style="width:200px; height:110px; font-size:24px; padding:8px">${t}</span>`).join("")}
    </div>
    <div class="gap-l" style="position:relative; height:260px">
      <div class="swap" data-until="1"><p class="lead">RAG: najdeme relevantní informace a vložíme je do kontextu.</p><p class="say muted gap-s">Do modelu nic nenahráváme.</p></div>
      <div class="swap" ${st(1)} data-until="2"><p class="lead">Tools: kalkulačka, search, databáze, API, Python.</p><p class="say muted gap-s">Model navrhne volání, náš kód ho provede a vrátí výsledek.</p></div>
      <div class="swap" ${st(2)}><p class="lead">LLM není celý agent. Je to jedna komponenta.</p><p class="say muted gap-s">Agent je smyčka: zvol akci, spusť tool, přečti výsledek, pokračuj, nebo skonči.</p></div>
    </div>
    <style>
      [data-id="nastroje"] .chain { transition: border-color .3s, color .3s, background-color .3s; }
      [data-id="nastroje"][data-now="0"] .chain:is([data-chain="1"], [data-chain="2"]),
      [data-id="nastroje"][data-now="1"] .chain[data-chain="2"] { border-color: var(--line); color: var(--line); background: transparent; }
      [data-id="nastroje"][data-now="0"] .chain[data-chain="0"],
      [data-id="nastroje"][data-now="1"] .chain[data-chain="1"],
      [data-id="nastroje"][data-now="2"] .chain[data-chain="2"] { border-color: var(--accent); color: var(--accent); font-weight: 700; }
    </style>` });

  S.push({ id: "dva-svety", act: "IV", html: `
    <h2>Dva světy</h2>
    <div class="grid2">
      <div class="col" style="gap:14px">
        <p class="lead" style="margin-bottom:12px">Deterministic</p>
        ${["pravidla", "výpočty", "validace", "autorizace", "DB constraints", "workflows"].map((t) => `<p class="say">${t}</p>`).join("")}
      </div>
      <div class="col" ${st(1)} style="gap:14px">
        <p class="lead accent" style="margin-bottom:12px">Probabilistic</p>
        ${["interpretace jazyka", "klasifikace nejasného vstupu", "extrakce", "sumarizace", "generování", "fuzzy matching"].map((t) => `<p class="say">${t}</p>`).join("")}
      </div>
    </div>` });

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
    <h2 style="margin-bottom:28px">To nejlepší z obou světů</h2>
    <svg class="diagram" viewBox="0 0 1360 640" width="1360" height="640">
      
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
           ["Vaswani et al. 2017: Attention Is All You Need", "https://arxiv.org/abs/1706.03762", "arxiv.org/abs/1706.03762"],
           ["Ouyang et al. 2022: InstructGPT", "https://arxiv.org/abs/2203.02155", "arxiv.org/abs/2203.02155"],
           ["Lewis et al. 2020: Retrieval-Augmented Generation", "https://arxiv.org/abs/2005.11401", "arxiv.org/abs/2005.11401"],
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
