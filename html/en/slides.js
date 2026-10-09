// Slide content. Each slide: { id, era, html }; era = markov|shannon|ngrams|bengio|mikolov|word2vec|transformer|gpt|chatgpt|today, null for the opening. Builds: data-step="n" appears at step n,
// data-until="n" disappears at step n, data-on="n" gets class "on" from step n.
// Notes live in notes.js under the same id.
(() => {
  const st = (n) => `data-step="${n}"`;
  const tok = (t, id, cls = "") => `<div class="tok ${cls}"><b>${t.replace(/ /g, "·")}</b>${id != null ? `<i>${id}</i>` : ""}</div>`;
  const box = (t, cls = "") => `<span class="box ${cls}">${t}</span>`;
  const arr = `<span class="arrow"></span>`;
  const pct = (p, dec = 0) => (p >= 0.01 ? (p * 100).toFixed(dec).replace(/\.0+$/, "") + " %" : "<1 %");
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
  const EN = [["The", 976], [" cat", 9059], [" sits", 38174], [" on", 402], [" the", 290], [" roof", 16367], [" all", 722], [" day", 2163], [".", 13]];
  // Synthetic logits for the temperature slide: softmax(logits / T).
  const LOGITS = [["A", 3], ["B", 2], ["C", 1], ["D", 0]];
  const temper = (T) => {
    const w = LOGITS.map(([, z]) => Math.exp(z / T)), sum = w.reduce((a, b) => a + b, 0);
    return LOGITS.map(([l], i) => [l, w[i] / sum]);
  };

  const stop = (year, name) => `<p class="stop"><span class="stop-year">${year}</span><span class="stop-name">${name}</span></p>`;
  const pil = (problem, gain, limit, step) => `<div class="pil push" ${step ? st(step) : ""}>${[["problem", problem], ["improvement", gain], ["limit", limit]].map(([k, v]) => `<div class="pil-cell"><span class="pil-label">${k}</span><span>${v}</span></div>`).join("")}</div>`;

  const S = [];

  S.push({ id: "dont-panic", era: null, html: `
    <h1 class="huge title-heading">The Hitchhiker’s<br>Guide to LLMs</h1>
    <p class="lead muted title-subtitle">Will Terminators<br>or Transformers destroy us?</p>
    <img class="story-art" src="../assets/robot-explorer-simple.png" width="440" height="440" alt="A curious robot takes apart an LLM box with a screwdriver">
    <p class="lead push">Pavel Lorenz</p>
    <p class="say muted gap-s">AI Monday #17 — 5 October 2026</p>` });

  S.push({ id: "o-mne", era: null, html: `
    <h2>Who’s telling this story?</h2>
    <div class="row" style="gap:80px; align-items:flex-start">
      <div class="col story-copy" style="gap:26px">
        <p class="lead" style="font-size:38px">Pragmatic Staff Engineer<br><span class="muted">@ Heureka Group</span></p>
        <p class="say">I work with AI every day. I care about what works in practice.</p>
        <p class="say" ${st(1)}>Since childhood, I’ve taken apart things I don’t understand.</p>
        <p class="say muted" ${st(1)}><em>Most of them never worked again.</em></p>
      </div>
      <img class="story-art" src="../assets/pavel-portrait-simple.png" width="440" height="440" alt="Black-and-white portrait of Pavel Lorenz based on his GitHub avatar">
    </div>` });

  const LAYERS = [["today’s assistants", "GPT, ChatGPT"], ["models and branches", "BERT, rerankers"], ["foundations", "Shannon, Markov"]];
  S.push({ id: "motivace", era: null, html: `
    <h2>Will they destroy us? Replace us?</h2>
    <p class="lead" style="font-weight:500">Before I worry, I want to see what’s inside.</p>
    <div class="row gap-l" style="gap:80px; align-items:flex-start">
      <div class="col" style="gap:0; width:760px; flex:none">
        ${LAYERS.map(([t, d], i) => `
          <div class="row" ${i ? st(i) : ""} style="gap:28px; padding:20px 0; border-bottom:2px dashed var(--line)">
            <span class="say" style="width:330px; flex:none; font-weight:600">${t}</span>
            <span class="say muted">${d}</span>
          </div>`).join("")}
      </div>
      <img class="story-art" src="../assets/pavel-archaeologist.png" width="440" height="440" alt="Pavel uses a magnifying glass to uncover an LLM box above older layers and a book">
    </div>
    <p class="lead push" ${st(3)}>An engineer who went digging. No archaeology degree.</p>` });

  const ROOTS = [["1913", "Markov"], ["1948", "Shannon"], ["1970s", "n-grams"], ["2003", "Bengio"], ["2010", "Mikolov"], ["2013", "word2vec"], ["2017", "Transformer"], ["2018", "GPT"], ["2022", "ChatGPT"], ["today", "tools"]];
  S.push({ id: "back-to-roots", era: null, html: `
    <p class="huge" style="margin-top:80px; font-size:150px">Back to the roots</p>
    <div class="row gap-l" style="gap:0; justify-content:space-between; position:relative">
      <span style="position:absolute; left:0; right:0; top:15px; border-top:3px solid var(--ink)"></span>
      ${ROOTS.map(([y, n]) => `<div class="col" style="gap:10px; align-items:center; position:relative; width:120px">
        <span style="width:22px; height:22px; border-radius:50%; background:var(--paper); border:3px solid var(--ink); margin-top:5px"></span>
        <span class="mono" style="font-size:22px; font-weight:700">${y}</span><span class="fine" style="font-size:20px; text-align:center">${n}</span></div>`).join("")}
    </div>
    <p class="lead push">Each stop: problem → improvement → a new limit.</p>` });

  S.push({ id: "markov", era: "markov", html: `
    ${stop("1913", "Andrey Markov")}
    <h2>Does what came before matter?</h2>
    <p class="say">Markov examined 20,000 letters of Pushkin’s Eugene Onegin, counting transitions between vowels and consonants.</p>
    <div class="row gap-m mono" ${st(1)} style="gap:12px; font-size:34px; align-items:flex-start">
      ${[["O", "V"], ["N", "C"], ["E", "V"], ["G", "C"], ["I", "V"], ["N", "C"]].map(([c, t]) => `<span class="col" style="gap:8px; align-items:center"><span class="box" style="width:70px">${c}</span><span class="fine" style="font-size:22px">${t}</span></span>`).join("")}
      <span class="say muted" style="margin-left:30px; font-size:28px; align-self:center">V = vowel, C = consonant<br>count transitions V→V, V→C, C→V, C→C</span>
    </div>
    ${pil("is the next letter independent of the last?", "measure dependence on the previous symbol", "short memory, no meaning", 2)}` });

  S.push({ id: "kocka", era: "shannon", html: `
    ${stop("1948 / 1951", "Claude Shannon")}
    <p class="big" style="margin-top:120px">The cat sits on the …</p>
    <div class="row gap-l" ${st(1)} style="gap:64px; font-size:56px; font-weight:600">
      <span class="accent">roof</span><span>couch</span><span>floor</span><span>table</span><span class="muted">…</span>
    </div>
    <div class="push" ${st(2)}>
      <p class="lead">Congratulations. You just played language model.</p>
      <p class="say muted gap-s">Your phone’s autocomplete. Just much, much bigger.</p>
    </div>` });

  const MOTOR = [
    ["text", `<span class="mono" style="font-size:44px">The cat sits on the</span>`],
    ["tokens", `<div class="tokens">${EN.slice(0, 5).map(([t]) => tok(t)).join("")}</div>`],
    ["numbers", `<div class="row mono" style="gap:30px; font-size:34px">${EN.slice(0, 5).map(([, id]) => `<span>${id}</span>`).join("")}<span class="muted">→ vectors of numbers</span></div>`],
    ["network", `<span class="box solid" style="font-size:30px; padding:18px 40px">neural network: billions of learned numbers</span>`],
    ["output", `<span class="mono accent" style="font-size:34px">a score for every possible next token</span>`],
  ];

  // Shannon 1951 guessed letters; this English row and guess counts are illustrative.
  const GUESS = [["T", 5], ["H", 2], ["E", 1], ["␣", 1], ["C", 3], ["A", 2], ["T", 1], ["␣", 1], ["S", 4], ["I", 2], ["T", 1], ["S", 1]];
  S.push({ id: "shannon", era: "shannon", html: `
    <h2>We’ve played this game since 1951</h2>
    <p class="say">Claude Shannon asked people to guess the next letter.</p>
    <div class="row gap-l" ${st(1)} style="gap:10px; align-items:flex-start">
      ${GUESS.map(([c, n]) => `<div class="col" style="gap:10px; align-items:center; width:84px">
        <span class="box" style="width:76px; height:84px; font-size:44px; padding:0">${c}</span>
        <span class="mono ${n === 1 ? "accent" : "muted"}" style="font-size:26px">${n}</span></div>`).join("")}
    </div>
    <p class="fine gap-s" ${st(1)}>Number = guesses needed to get it right. Often just one.</p>
    ${pil("how much information does text carry?", "measure how well people guess the next character", "people guess; machines still use frequency tables", 2)}
    <p class="fine gap-s"><span class="tag">illustrative example; not Shannon’s original data</span></p>` });

  const NGRAM = [["roof", 50], ["couch", 20], ["floor", 10]];
  S.push({ id: "ngramy", era: "ngrams", html: `
    ${stop("1970s–1990s", "n-grams")}
    <h2>N-grams: count what follows what</h2>
    <div class="row" style="gap:90px; align-items:flex-start">
      <div class="col" style="gap:18px; width:640px">
        <p class="mono muted" style="font-size:30px">“sits on the …” in the corpus</p>
        <div class="bars" style="--max:300px">${NGRAM.map(([w, n], i) =>
          `<span class="lbl">${w}</span><span class="track ${i === 0 ? "lead-bar" : ""}"><span class="fill" style="--p:${n / 50}"></span><span class="pct">${n}×</span></span>`).join("")}</div>
        <p class="fine">Useful for decades. In speech recognition, for example.</p>
      </div>
      <div class="col" style="gap:22px">
        <div ${st(1)}>
          <p class="mono" style="font-size:28px">seen: the cat sits on the roof</p>
          <p class="mono accent" style="font-size:25px; margin-top:8px">unseen: the kitten sits on the roof → 0×</p>
        </div>
        <div class="col mono" ${st(2)} style="gap:10px; font-size:28px; margin-top:16px">
          <span><span class="muted">✗</span> the black kitten sits on the</span>
          <span><span class="muted">✗</span> the kitten sits on the</span>
          <span class="accent" style="font-weight:700">✓ sits on the</span>
        </div>
      </div>
    </div>
    ${pil("how can a machine predict the next word?", "count what follows what, then smooth", "frequency tables: similar words share nothing", 3)}
    <p class="fine gap-s"><span class="tag">illustrative counts</span></p>` });

  const GEN = [["the table cannot relate similar words", "2003", "Bengio et al.", "learned word vectors: cat ≈ kitten"],
               ["fixed context window", "2010", "Mikolov et al.", "RNN language model: state carries history"],
               ["training one step at a time", "2017", "Vaswani et al.", "Transformer: attention, parallel training"]];

  const DIST = [["roof", .625], ["couch", .25], ["floor", .125]];
  S.push({ id: "rozdeleni", era: "ngrams", html: `
    <h2>Not an answer. A distribution.</h2>
    <p class="mono muted" style="font-size:30px">“sits on the …”: 50 + 20 + 10 = 80 occurrences</p>
    <div class="gap-m" ${st(1)}>${bars(DIST, { scale: .625, max: "760px", dec: 1 })}</div>
    <p class="fine gap-s" ${st(1)}>From the previous slide’s counts: 50/80, 20/80, 10/80.</p>
    <p class="push"><span class="tag">illustrative counts</span></p>` });

  S.push({ id: "bengio", era: "bengio", html: `
    ${stop("2003", "Yoshua Bengio et al.")}
    <h2>What if cat and kitten shared something?</h2>
    <svg class="diagram" viewBox="0 0 900 250" width="900" height="250">
      <circle cx="120" cy="90" r="12" style="fill:#161616"/><text x="145" y="98" font-size="30">cat</text>
      <circle cx="210" cy="140" r="12" style="fill:#161616"/><text x="235" y="148" font-size="30">kitten</text>
      <circle cx="760" cy="70" r="12" style="fill:#161616"/><text x="785" y="78" font-size="30">car</text>
      <ellipse cx="200" cy="118" rx="150" ry="80" stroke="#161616" stroke-width="2.5" stroke-dasharray="8 8" fill="none"/>
      <text x="370" y="128" font-size="22" style="fill:#666666">near</text>
      <text x="760" y="140" font-size="22" text-anchor="middle" style="fill:#666666">far</text>
    </svg>
    <p class="fine gap-s"><span class="tag">schematic similarity</span></p>
    ${pil("the table cannot relate similar words", "learn word vectors to predict the next word", "fixed context window, costly training", 1)}` });

  S.push({ id: "mikolov", era: "mikolov", html: `
    ${stop("2010", "Tomáš Mikolov et al., Brno")}
    <h2>Remember what came before</h2>
    <div class="row mono" style="gap:16px; font-size:30px; align-items:center">
      ${["The cat", "sits", "on the", "…"].map((w, i) => `${i ? `${arr}` : ""}<span class="col" style="gap:10px; align-items:center"><span class="box">${w}</span><span class="fine" style="font-size:20px">state ${i + 1}</span></span>`).join("")}
    </div>
    <p class="say gap-m">A recurrent network carries text history in its state. No fixed window.</p>
    ${pil("fixed context window", "RNN language model: state carries history", "sequential computation; long dependencies are hard to learn", 1)}` });

  S.push({ id: "word2vec", era: "word2vec", html: `
    ${stop("2013", "Mikolov et al., Google")}
    <h2>word2vec: word vectors at scale</h2>
    <p class="say">Learn useful word vectors from a huge corpus. Text generation is a different task.</p>
    <p class="mono gap-m" ${st(1)} style="font-size:34px">king − man + woman ≈ queen</p>
    <p class="fine gap-s" ${st(1)}>A famous vector analogy: approximate, and not always reliable.</p>
    ${pil("learning word vectors was expensive", "efficient learning from surrounding words", "one vector per word, regardless of context; no text generation", 2)}` });

  S.push({ id: "motor", era: "transformer", html: `
    ${stop("2017", "Transformer → the engine of today’s LM")}
    <h2 style="margin-bottom:20px">What’s inside? Just the basics.</h2>
    <div class="col" style="gap:8px">
      ${MOTOR.map(([lbl, html], i) => `
        <div class="row" ${i ? st(i) : ""} style="gap:36px; min-height:62px">
          <span class="mono muted" style="font-size:26px; width:130px; text-align:right">${lbl}</span>${html}
        </div>`).join("")}
    </div>
    ${pil("RNNs compute one step at a time", "attention looks back through the text; parallel training", "context is limited; longer context costs more", 3)}
    <p class="fine muted gap-s" style="font-size:20px; font-style:italic" ${st(3)}>Try tokenization: <a href="https://tiktokenizer.vercel.app/?model=o200k_base" target="_blank" rel="noopener noreferrer">Tiktokenizer · o200k_base</a></p>` });

  S.push({ id: "pretraining", era: "gpt", hideEraDoodle: true, html: `
    ${stop("2018+", "GPT — Generative Pre-trained Transformer").replace('</p>', '<img class="era-doodle" src="../assets/world-compression.svg" width="190" height="190" alt="A vise holding a globe and text — a compression metaphor"></p>')}
    <h2 style="font-size:58px; margin-bottom:36px">How does it learn? Mountains of text.</h2>
    <div class="row" style="align-items:flex-start; gap:70px">
      <div class="col" style="gap:22px; width:780px">
        ${[["The cat sits on the", "mat"], ["The capital of Australia is", "Canberra"], ["def is_even(n): return n % 2 ==", "0"]].map(([t, n], i) =>
          `<div class="row" ${i ? st(i) : ""} style="gap:18px"><span class="mono" style="font-size:30px">${t}</span><span class="box ai" style="font-size:28px; padding:8px 16px">${n}</span></div>`).join("")}
        <p class="mono" style="font-size:28px; line-height:1.6; margin-top:20px" ${st(3)}>hide next token → model guesses → compare<br>→ slightly adjust learned numbers → repeat<br><span class="accent">× trillions of tokens</span></p>
      </div>

    </div>
    <p class="lead push" ${st(4)}>To complete text well, it learns language, facts, code, style and relationships.</p>
    <p class="fine gap-s"><span class="tag">illustration, words in place of tokens</span></p>` });

  S.push({ id: "gpt2", era: "gpt", html: `
    <h2>What comes out? GPT-2, 2019</h2>
    <div class="col" style="gap:28px">
      <div class="row" style="gap:28px; align-items:baseline">
        <span class="mono muted" style="font-size:24px; width:200px; flex:none">human input</span>
        <p class="say">Fictional news: a herd of English-speaking unicorns discovered in the Andes.</p>
      </div>
      <div class="row" ${st(1)} style="gap:28px; align-items:baseline">
        <span class="mono accent" style="font-size:24px; width:200px; flex:none">continuation</span>
        <p class="say">A newspaper-style article. Invented biologist Jorge Pérez. Quotes from “scientists”.</p>
      </div>
    </div>
    <p class="lead push" ${st(2)}>Fluent prose in the right genre. It expands the fiction in the prompt, without checking facts.</p>
    <p class="fine gap-s"><span class="tag">summary of a real example: Radford et al. 2019, table 13</span></p>` });

  const FROG_PROMPT = `<div class="row" style="gap:24px; align-items:baseline">
        <span class="mono muted" style="font-size:24px; width:200px; flex:none">prompt</span>
        <p class="say">Write a short story in French: a frog travels back in time to ancient Greece.</p>
      </div>`;

  S.push({ id: "kostka", era: "gpt", html: `
    <h2>Now roll the dice</h2>
    <div class="row" style="gap:80px; align-items:flex-start">
      ${[[1.0, 0], [0.2, 1], [1.2, 2]].map(([T, step]) => `
        <div class="col" ${step ? st(step) : ""} style="gap:18px">
          <p class="mono" style="font-size:30px; font-weight:700; color:${T === 1 ? "var(--ink)" : "var(--accent)"}">T = ${T.toFixed(1)}</p>
          ${bars(temper(T), { cls: "compact", max: "260px" })}
        </div>`).join("")}
    </div>
    <p class="say gap-l" ${st(3)}>A die that changes its odds before every roll, based on everything it has seen so far.</p>
    <p class="lead accent gap-s" ${st(3)}>Stochastic ≠ random chaos.</p>
    <p class="push"><span class="tag">illustrative numbers</span></p>` });

  const LOOP = ["context (tokens)", "network", "distribution", "sampling", "next token"];
  S.push({ id: "smycka", era: "gpt", html: `
    <h2>Again. And again. And again.</h2>
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
        ${[["The cat sits on the", "·roof"], ["The cat sits on the roof", "·all"], ["The cat sits on the roof all", "·day"], ["The cat sits on the roof all day", "."]].map(([c, t], i) =>
          `<div class="row" ${i ? st(i) : ""} style="gap:24px"><span class="mono" style="font-size:26px; width:490px">${c}</span>${arr}${box(t, "ai")}</div>`).join("")}
        <p class="fine gap-s">Verified o200k_base tokens; illustrative choices.</p>
      </div>
    </div>` });

  S.push({ id: "base-model", era: "gpt", html: `
    <h2>A base model is not an assistant</h2>
    <div class="col" style="gap:12px; padding-bottom:18px; border-bottom:2px dashed var(--line)">
      <div class="row" style="gap:36px; align-items:baseline">
        <p class="say" style="font-weight:600">To be, or not to be?</p>
        <p class="say" ${st(1)}>→ that is the question.</p>
        <span class="tag">illustration of the principle</span>
      </div>
      <div class="row" style="gap:36px; align-items:baseline">
        <p class="say" style="font-weight:600">Twinkle, twinkle…</p>
        <p class="say" ${st(1)}>→ …little star.</p>
      </div>
      <p class="fine muted" ${st(1)}>Illustrative nursery rhyme completion</p>
    </div>
    <div class="col gap-m" ${st(2)} style="gap:24px">
      ${FROG_PROMPT}
      <div class="row" ${st(3)} style="gap:24px; align-items:baseline">
        <span class="mono accent" style="font-size:24px; width:200px; flex:none">GPT-3 (base)</span>
        <p class="say">More prompts: a child and the games of the gods. A young man in another era. A child with an imaginary friend…</p>
      </div>
      <p class="fine"><span class="tag">summary of real outputs: Ouyang et al. 2022, fig. 42</span></p>
    </div>
    <p class="lead push" ${st(4)}>It can continue text. We still need to teach it to assist.</p>` });

  S.push({ id: "instruction", era: "chatgpt", html: `
    ${stop("2022", "ChatGPT")}
    <h2>Teach it the conversation format</h2>
    <pre class="code" style="font-size:28px; white-space:pre-wrap; max-width:1150px">User: Rewrite “Send me the file” more politely.
Assistant: Could you please send me the file?

User: Summarize this email in one sentence.
Assistant: The client is moving the meeting to Thursday.</pre>
    <p class="say muted gap-m" ${st(1)}>People write both sides of the dialogue. Thousands of examples.</p>
    <p class="lead push" ${st(2)}>It still completes a document. Now the document looks like a conversation.</p>
    <p class="fine gap-s"><span class="tag">illustration</span></p>` });

  S.push({ id: "preference", era: "chatgpt", html: `
    <h2>Which answer is better?</h2>
    <p class="mono" style="font-size:30px; margin-bottom:28px">Explain what a token is in one sentence.</p>
    <div class="grid2" style="gap:50px">
      <div class="pref" data-pick="a">
        <p class="mono muted" style="font-size:22px; margin-bottom:10px">answer A</p>
        <p class="say" style="font-size:30px">Tokenization has a long history. Let’s start with how computers encode characters… <span class="muted">(five more paragraphs follow)</span></p>
      </div>
      <div class="pref" data-pick="b">
        <p class="mono muted" style="font-size:22px; margin-bottom:10px">answer B</p>
        <p class="say" style="font-size:30px">A chunk of text the model works with: sometimes a whole word, sometimes part of one.</p>
      </div>
    </div>
    <p class="lead gap-l" ${st(1)}>People compare answers. Training shifts the model toward their preferences.</p>
    <p class="push"><span class="tag">illustration, not an actual annotation record</span></p>
    <style>
      [data-id="preference"] .pref { border: 2.5px solid var(--line); border-radius: 8px; padding: 26px 30px; background: #fff; transition: border-color .3s, box-shadow .3s; }
      [data-id="preference"].s1 .pref[data-pick="b"] { border-color: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); }
      [data-id="preference"].s1 .pref[data-pick="b"]::after { content: "✓ selected"; display: block; margin-top: 14px; font: 700 24px var(--mono); color: var(--accent); }
    </style>` });

  S.push({ id: "zaba-po", era: "chatgpt", html: `
    <h2>Same prompt, after post-training</h2>
    <div class="col" style="gap:30px">
      ${FROG_PROMPT}
      <div class="row" style="gap:24px; align-items:baseline">
        <span class="mono muted" style="font-size:24px; width:200px; flex:none">GPT-3 (base)</span>
        <p class="say muted">More prompts for more stories…</p>
      </div>
      <div class="row" ${st(1)} style="gap:24px; align-items:baseline">
        <span class="mono accent" style="font-size:24px; width:200px; flex:none">InstructGPT</span>
        <p class="say">A story about a lost, tired frog seeking its way to ancient Greece.</p>
      </div>
    </div>
    <p class="lead gap-m" ${st(2)}>Same engine. Different behavior.</p>
    ${pil("a text completer does not act as an assistant", "example conversations + human preferences", "sounds like an answer; no guarantee of truth", 2)}
    <p class="fine gap-s"><span class="tag">summary of real outputs: Ouyang et al. 2022, fig. 42</span></p>` });

  S.push({ id: "evoluce", era: "chatgpt", html: `
    <h2>Three steps to a chatbot</h2>
    <div class="row" style="gap:28px; margin-top:20px; align-items:flex-start">
      ${[["text completer", "pretraining"], ["assistant", "instruction tuning"], ["better assistant", "preference"]].map(([a, b], i) => `
        ${i ? `<span ${st(i)} style="display:flex; padding-top:52px">${arr}</span>` : ""}
        <div class="col" ${i ? st(i) : ""} style="gap:14px; width:380px">
          <span class="box ${i === 2 ? "ai" : ""}" style="font-family:var(--sans); font-size:40px; font-weight:700; padding:28px 20px">${a}</span>
          <span class="mono muted" style="font-size:24px; text-align:center">${b}</span>
        </div>`).join("")}
    </div>
    <p class="lead push" ${st(3)}>First, teach it to continue text. Then, teach it how to continue when we ask for something.</p>` });

  S.push({ id: "halucinace", era: "today", html: `
    ${stop("today", "LLMs in practice")}
    <h2>Why does it hallucinate?</h2>
    <p class="big" style="font-size:88px; margin-top:40px">It sounds like an answer.</p>
    <p class="big accent" style="font-size:88px; margin-top:16px" ${st(1)}>That doesn’t make it true.</p>
    <p class="say muted push" ${st(2)}>A model can say “I don’t know”. Generation does not guarantee it knows when to.</p>
    <p class="fine muted gap-s" style="font-size:20px; font-style:italic" ${st(2)}>Try in <a href="https://openrouter.ai/" target="_blank" rel="noopener noreferrer">openrouter.ai</a>: “In what year did Professor Novak win an award for research on blue unicorns?”</p>` });

  S.push({ id: "pocitani", era: "today", html: `
    <p class="big" style="margin-top:60px; font-size:150px">2837 × 491 = ?</p>
    <p class="lead muted gap-m" ${st(1)}>Where did you see a multiplier in that machine?</p>
    <div class="row gap-l" ${st(2)} style="gap:28px">
      ${box("LLM", "ai")}${arr}${box("calculator()")}${arr}<span class="mono" style="font-size:64px; font-weight:700">1 392 967</span>
    </div>
    <img src="../assets/calculator.svg" width="245" height="289" alt="A drawn calculator showing the result 1,392,967" style="position:absolute; right:70px; top:390px" ${st(2)}>
    <p class="lead push" ${st(2)}>If I have a calculator, I use it.</p>` });

  S.push({ id: "aktualni", era: "today", html: `
    <h2>What it never saw in training</h2>
    <div class="col" style="gap:20px">
      <p class="quote" style="font-size:52px">“What’s the price of bitcoin right now?”</p>
      <p class="quote" style="font-size:52px" ${st(1)}>“What does our internal travel policy say?”</p>
    </div>
    <p class="say muted gap-m" ${st(2)}>Training ended at some point. And without our documents, it has no source to rely on.</p>
    <div class="row gap-m" ${st(3)} style="gap:20px">
      ${box("query")}${arr}${box("search / API / retrieval")}${arr}${box("result into context")}${arr}${box("LLM answers", "ai")}
    </div>
    <p class="lead push" ${st(3)}>Find the sources. Add them to the question.</p>` });

  S.push({ id: "agent", era: "today", html: `
    <h2>An agent? Put this in a loop.</h2>
    <svg class="diagram" viewBox="0 0 1360 380" width="1360" height="380">
      ${[["LLM proposes an action", 0, true], ["code checks + runs", 1], ["result into context", 2]].map(([t, i, acc]) => {
        const x = 40 + i * 450;
        return `<rect x="${x}" y="40" width="380" height="90" rx="6" class="${acc ? "acc" : "ink"}" fill="#fff"/>
        <text x="${x + 190}" y="95" font-size="26" text-anchor="middle" ${acc ? 'style="fill:#161616;font-weight:700"' : ""}>${t}</text>
        ${i < 2 ? `<line x1="${x + 382}" y1="85" x2="${x + 446}" y2="85" stroke="#666666" stroke-width="2.5"/>${ah(x + 382, 85, x + 446, 85)}` : ""}`;
      }).join("")}
      <path d="M1130,132 V230 H230 V136" class="acc" stroke-dasharray="10 8"/>${ah(230, 180, 230, 134, "#161616")}
      <text x="680" y="272" font-size="24" text-anchor="middle" style="fill:#161616">repeat until done</text>
    </svg>
    <p class="lead gap-m" ${st(1)}>The LLM is one component of the agent system.</p>
    ${pil("no live knowledge or guaranteed arithmetic", "tools, search and code around the model", "still a prediction; the system owns the outcome", 1)}` });

  S.push({ id: "spatne", era: "today", html: `
    <h2>Are they 18 or older?</h2>
    <div class="row" style="gap:24px">
      <span class="accent" style="font-size:56px; width:60px">✗</span>${box("birth_date")}${arr}${box("LLM", "ai")}${arr}<span class="mono muted" style="font-size:34px">“yeah, probably”</span>
    </div>
    <div class="row gap-m" ${st(1)} style="gap:24px">
      <span style="font-size:56px; width:60px">✓</span>${box("birth_date")}${arr}${box("age(d, today) >= 18")}${arr}<span class="mono" style="font-size:40px; font-weight:700">true</span>
    </div>
    <p class="lead push" ${st(2)}>Don’t make a deterministic problem probabilistic just because you have an LLM.</p>` });

  S.push({ id: "dobre", era: "today", html: `
    <h2>Is this a complaint?</h2>
    <p class="quote">“Oh great, it arrived broken again.”</p>
    <div class="row gap-l" style="align-items:center; gap:70px">
      <pre class="code" ${st(1)} style="font-size:26px">if "great" in msg:
    return PRAISE
<span class="m"># …and 4,000 more exceptions</span></pre>
      <div class="row" ${st(2)} style="gap:28px">
        ${box("LLM", "ai")}${arr}
        <div class="col mono" style="gap:8px; font-size:30px">
          <span class="accent" style="font-weight:700">complaint</span><span class="muted">praise</span><span class="muted">question</span><span class="muted">uncertain → human</span>
        </div>
      </div>
    </div>
    <p class="lead push" ${st(2)}>Here, exceptions multiply. Here, a model can help.</p>` });

  S.push({ id: "architektura", era: "today", html: `
    <h2 style="margin-bottom:20px; font-size:52px">Deterministic software + probabilistic capabilities</h2>
    <svg class="diagram" viewBox="0 0 1360 640" width="1190" height="560" style="align-self:center">

      <g>
        <rect x="580" y="0" width="200" height="50" rx="5" class="ink" fill="#fff"/><text x="680" y="33" font-size="22" text-anchor="middle">USER</text>
        <line x1="680" y1="52" x2="680" y2="86" stroke="#666666" stroke-width="2.5"/>${ah(680, 52, 680, 86, "#666666")}
        <rect x="330" y="90" width="700" height="64" rx="6" class="acc" fill="#fff"/>
        <text x="680" y="131" font-size="24" font-weight="700" text-anchor="middle" style="fill:#161616">LLM interprets, proposes, generates</text>
      </g>
      <g ${st(1)}>
        <line x1="680" y1="156" x2="680" y2="194" stroke="#666666" stroke-width="2.5"/>${ah(680, 156, 680, 194, "#666666")}
        <rect x="330" y="198" width="700" height="58" rx="6" fill="#fff" stroke="#161616" stroke-width="4"/>
        <text x="680" y="235" font-size="22" font-weight="700" text-anchor="middle">authorization + argument validation (before action)</text>
        <line x1="520" y1="258" x2="330" y2="306" stroke="#666666" stroke-width="2.5"/>${ah(520, 258, 330, 306, "#666666")}
        <line x1="840" y1="258" x2="1030" y2="306" stroke="#666666" stroke-width="2.5"/>${ah(840, 258, 1030, 306, "#666666")}
        <rect x="60" y="310" width="520" height="96" rx="6" class="ink" fill="#fff"/>
        <text x="320" y="350" font-size="22" text-anchor="middle" font-weight="700">deterministic tools</text>
        <text x="320" y="384" font-size="20" text-anchor="middle" style="fill:#666666">calculator, API, business rules</text>
        <rect x="780" y="310" width="520" height="96" rx="6" class="ink" fill="#fff"/>
        <text x="1040" y="350" font-size="22" text-anchor="middle" font-weight="700">external knowledge</text>
        <text x="1040" y="384" font-size="20" text-anchor="middle" style="fill:#666666">search, RAG, databases, documents</text>
      </g>
      <g ${st(2)}>
        <path d="M60,358 H20 V122 H324" class="acc" stroke-dasharray="10 8"/>${ah(20, 122, 330, 122, "#161616")}
        <path d="M1300,358 H1340 V122 H1036" class="acc" stroke-dasharray="10 8"/>${ah(1340, 122, 1030, 122, "#161616")}
        <text x="1340" y="80" font-size="20" text-anchor="end" style="fill:#161616">results back into context</text>
      </g>
      <g ${st(3)}>
        <line x1="320" y1="408" x2="520" y2="466" stroke="#666666" stroke-width="2.5"/>${ah(320, 408, 520, 466, "#666666")}
        <line x1="1040" y1="408" x2="840" y2="466" stroke="#666666" stroke-width="2.5"/>${ah(1040, 408, 840, 466, "#666666")}
        <rect x="330" y="470" width="700" height="58" rx="6" fill="#fff" stroke="#161616" stroke-width="4"/>
        <text x="680" y="507" font-size="22" font-weight="700" text-anchor="middle">output validation</text>
        <line x1="680" y1="530" x2="680" y2="566" stroke="#666666" stroke-width="2.5"/>${ah(680, 530, 680, 566, "#666666")}
        <rect x="580" y="570" width="200" height="50" rx="5" class="ink" fill="#fff"/><text x="680" y="603" font-size="22" text-anchor="middle">RESULT</text>
      </g>
    </svg>` });

  S.push({ id: "terminatori", era: "today", html: `
    <div class="swap" data-until="3">
      <p class="big" style="font-size:76px">So… will Terminators<br>or Transformers destroy us?</p>
      <img class="story-art" src="../assets/robot-question-simple.png" width="440" height="440" alt="A simple robot, part Terminator and part Transformer, shrugs">
      <p class="lead gap-l" style="max-width:840px" ${st(1)}>Knowing the mechanism doesn’t prove it’s safe.</p>
      <p class="say muted gap-s" style="max-width:840px" ${st(1)}>What we can control now: permissions, validation and human oversight.</p>
      <p class="lead accent push" ${st(2)}>DON'T PANIC ≠ don't care.</p>
    </div>
    <div class="swap" ${st(3)}>
      <h1 class="huge" style="margin-top:40px">DON'T PANIC</h1>
      <img class="story-art" src="../assets/robot-finale-simple.png" width="440" height="440" alt="A small robot waves beside a closed LLM box and a screwdriver">
      <p class="lead gap-l" style="font-weight:500">It's just software.</p>
      <p class="lead accent">Very weird software.</p>
      <p class="say muted push">Use an exact rule where it works.<br>Add a model where rules alone fall short.</p>
    </div>` });

  S.push({ id: "zdroje", era: "today", html: `
    <h2>Where next</h2>
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
