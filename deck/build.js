// Generator for "Stopařův průvodce po LLMs" deck. Run: node build.js
const pptxgen = require("pptxgenjs");
const QRCode = require("qrcode");

// ---- Visual system -------------------------------------------------------
const W = 13.333, H = 7.5;
const BG = "0A0B0D";      // near-black
const FG = "ECE9E2";      // off-white
const MUTED = "8A8F98";
const DIM = "2E333B";     // blueprint lines, inactive elements
const ACC = "FF9F1C";     // amber: probabilistic / highlight
const SANS = "Arial";
const MONO = "Courier New";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Stopařův průvodce po LLMs";
pres.author = "AI Monday 2026";
pres.theme = { headFontFace: SANS, bodyFontFace: SANS };

// Crop marks = the blueprint motif, on every slide via layouts.
function cropMarks() {
  const m = 0.35, l = 0.28, o = [];
  const ln = (x, y, w, h) => o.push({ line: { x, y, w, h, line: { color: DIM, width: 1 } } });
  ln(m, m, l, 0); ln(m, m, 0, l);
  ln(W - m - l, m, l, 0); ln(W - m, m, 0, l);
  ln(m, H - m, l, 0); ln(m, H - m - l, 0, l);
  ln(W - m - l, H - m, l, 0); ln(W - m, H - m - l, 0, l);
  return o;
}
const footer = { text: { text: "STOPAŘŮV PRŮVODCE PO LLMs", options: { x: 0.75, y: H - 0.62, w: 5, h: 0.3, fontFace: MONO, fontSize: 9, color: DIM, margin: 0 } } };
const slideNo = { x: W - 1.45, y: H - 0.62, w: 0.7, h: 0.3, fontFace: MONO, fontSize: 9, color: MUTED, align: "right" };

pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: BG },
  objects: [...cropMarks(), footer,
    { placeholder: { options: { name: "title", type: "title", x: 0.75, y: 0.95, w: 11.8, h: 0.9, fontFace: SANS, fontSize: 36, bold: true, color: FG, align: "left", valign: "top", margin: 0 }, text: "" } }],
  slideNumber: slideNo,
});
pres.defineSlideMaster({
  title: "STATEMENT",
  background: { color: BG },
  objects: [...cropMarks(), footer],
  slideNumber: slideNo,
});

// ---- Helpers -------------------------------------------------------------
let SECTION = null;
function section(title) { SECTION = title; pres.addSection({ title }); }
function newSlide(master, label) {
  const s = pres.addSlide({ masterName: master, sectionTitle: SECTION });
  if (label) s.addText(label, { x: 0.75, y: 0.5, w: 8, h: 0.3, fontFace: MONO, fontSize: 12, color: ACC, margin: 0, isTextBox: true, charSpacing: 2 });
  return s;
}
function title(s, t) { s.addText(t, { placeholder: "title" }); }
function txt(s, t, o) { s.addText(t, Object.assign({ fontFace: SANS, color: FG, margin: 0, isTextBox: true, valign: "top" }, o)); }
function mono(s, t, o) { txt(s, t, Object.assign({ fontFace: MONO }, o)); }
function box(s, label, x, y, w, h, o = {}) {
  s.addText(label, {
    shape: pres.shapes.RECTANGLE, x, y, w, h, margin: 4,
    line: { color: o.stroke || FG, width: o.lw || 1.25, dashType: o.dash || "solid" },
    fill: { color: o.fill || BG },
    fontFace: o.font || MONO, fontSize: o.fs || 16, bold: !!o.bold,
    color: o.color || FG, align: "center", valign: "middle",
  });
}
function arrow(s, x1, y1, x2, y2, o = {}) {
  s.addShape(pres.shapes.LINE, {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    flipH: x2 < x1, flipV: y2 < y1,
    line: { color: o.color || MUTED, width: o.width || 1.5, endArrowType: o.noHead ? undefined : "triangle", dashType: o.dash || "solid" },
  });
}
// Monospace chip width: Courier New advance = 0.6 em.
const charW = (fs) => 0.6 * fs / 72;
function chips(s, tokens, x, y, fs, o = {}) {
  const pad = 0.22, gap = o.gap ?? 0.12, h = fs / 72 + 0.32;
  tokens.forEach((t, i) => {
    const label = t.replace(/ /g, "·");
    const w = label.length * charW(fs) + pad;
    const hi = o.hi ? o.hi(i) : null;
    const masked = o.masked ? o.masked(i) : false;
    s.addText(label, {
      shape: pres.shapes.RECTANGLE, x, y, w, h, margin: 0,
      line: { color: hi ? ACC : (o.stroke || MUTED), width: 1, dashType: masked ? "dash" : "solid" },
      fill: hi ? { color: ACC, transparency: hi.t } : { color: BG },
      fontFace: MONO, fontSize: fs, color: masked ? DIM : (hi && hi.t < 40 ? BG : FG), align: "center", valign: "middle",
    });
    if (o.ids) mono(s, String(o.ids[i]), { x, y: y + h + 0.08, w, h: 0.3, fontSize: 11, color: MUTED, align: "center" });
    x += w + gap;
  });
  return x;
}
function bars(s, rows, x, y, o = {}) {
  const labelW = o.labelW || 1.8, maxW = o.maxW || 6, rowH = o.rowH || 0.55, fs = o.fs || 20;
  const max = o.max || Math.max(...rows.map(r => r[1]));
  rows.forEach(([label, p], i) => {
    const yy = y + i * rowH;
    mono(s, label, { x, y: yy, w: labelW, h: rowH * 0.8, fontSize: fs, align: "right", valign: "middle" });
    const bw = Math.max(0.03, maxW * p / max);
    s.addShape(pres.shapes.RECTANGLE, { x: x + labelW + 0.25, y: yy + rowH * 0.15, w: bw, h: rowH * 0.5, fill: { color: i === 0 ? ACC : FG, transparency: i === 0 ? 0 : 35 }, line: { type: "none" } });
    const pct = p >= 0.01 ? Math.round(p * 100) + " %" : "<1 %";
    mono(s, pct, { x: x + labelW + 0.4 + bw, y: yy, w: 1.2, h: rowH * 0.8, fontSize: fs * 0.8, color: MUTED, valign: "middle" });
  });
}
function notes(s, n) {
  const parts = [`⏱ ${n.time}`, "", "ŘÍCT:", n.say, "", "POINTA: " + n.point];
  if (n.joke) parts.push("", "VTIP / CALLBACK: " + n.joke);
  if (n.tech) parts.push("", "TECHNICKÁ POZNÁMKA: " + n.tech);
  if (n.src) parts.push("", "ZDROJ: " + n.src);
  parts.push("", "PŘECHOD: " + n.next);
  s.addNotes(parts.join("\n"));
}
const Z = "ZJEDNODUŠENÍ PRO VYSVĚTLENÍ — ";

// ---- Data ------------------------------------------------------------------
// o200k_base (tiktoken), verified 2026-10-04.
const TOK_CZ = ["Ko", "čka", " sed", "í", " na", " st", "ře", "še", "."];
const TOK_CZ_IDS = [33185, 51851, 10412, 556, 898, 420, 38132, 13136, 13];
const TOK_EN = ["The", " cat", " sits", " on", " the", " roof", "."];
const TOK_EN_IDS = [976, 9059, 38174, 402, 290, 16367, 13];
// Illustrative next-word distribution (whole words instead of tokens).
const DIST = [["střeše", 0.31], ["gauči", 0.18], ["zemi", 0.11], ["stole", 0.07], ["okně", 0.05]];
// Synthetic logits for the temperature slide (tech-review.md): softmax(logits / T).
const LOGITS = [["A", 3], ["B", 2], ["C", 1], ["D", 0]];
const temper = (T) => {
  const w = LOGITS.map(([, z]) => Math.exp(z / T)), sum = w.reduce((a, b) => a + b, 0);
  return LOGITS.map(([l], i) => [l, w[i] / sum]);
};

async function build() {
  // ===== I. OTEVÍRÁME ======================================================
  section("I. Otevíráme krabičku");

  let s = newSlide("STATEMENT");
  mono(s, "STOPAŘŮV PRŮVODCE PO LLMs", { x: 0.75, y: 0.5, w: 10, h: 0.4, fontSize: 16, color: ACC, charSpacing: 3 });
  txt(s, "DON'T PANIC", { x: 0.6, y: 2.2, w: 12.2, h: 2.2, fontSize: 120, bold: true, color: FG, valign: "middle" });
  txt(s, "aneb zničí nás Terminátoři?", { x: 0.75, y: 4.6, w: 10, h: 0.6, fontSize: 28, color: MUTED });
  mono(s, "AI Monday · 5. 10. 2026", { x: 0.75, y: 5.6, w: 6, h: 0.4, fontSize: 14, color: MUTED });
  notes(s, {
    time: "0:30 (sekce I celkem 2:30)",
    say: "Představit se jednou větou. Název: Stopařův průvodce po LLMs. DON'T PANIC je rada z obálky Průvodce — a dneska je to i rada pro debatu o AI.",
    point: "Nastavit tón: lehce, ale vážně míněno.",
    joke: "Průvodce měl na obálce velkými přátelskými písmeny DON'T PANIC. My máme slidy.",
    next: "Co se o AI dneska nejčastěji ptáme?",
  });

  s = newSlide("STATEMENT", "00 · OTÁZKY");
  ["Zničí nás AI?", "Vezme nám práci?", "Myslí?", "Ví, co říká?"].forEach((q, i) =>
    txt(s, q, { x: 0.75, y: 1.3 + i * 0.85, w: 8, h: 0.7, fontSize: 40, bold: true, color: i === 0 ? FG : MUTED }));
  txt(s, "Nejvíc se bojíme toho, čemu nerozumíme.", { x: 0.75, y: 5.0, w: 11, h: 0.6, fontSize: 26, color: FG });
  txt(s, "Tak to pojďme rozebrat.", { x: 0.75, y: 5.6, w: 11, h: 0.6, fontSize: 26, bold: true, color: ACC });
  notes(s, {
    time: "1:00",
    say: "Projít otázky rychle, nechat je viset. Neodpovídat — slíbit, že se k první vrátíme na konci, poctivě.",
    point: "Strach pramení z neznalosti mechanismu. Dneska mechanismus otevřeme.",
    tech: "Neslibovat, že porozumění mechanismu = bezpečnost. Na konci (slide Terminátoři) to uzavřeme poctivě.",
    next: "Já jsem na neznámé věci měl vždycky jeden nástroj.",
  });

  s = newSlide("STATEMENT", "01 · ŠROUBOVÁK");
  // black box with lifted lid
  arrow(s, 1.0, 3.9, 3.6, 3.9, { color: FG });
  mono(s, "prompt", { x: 1.0, y: 3.35, w: 2.2, h: 0.4, fontSize: 18, color: MUTED });
  s.addShape(pres.shapes.RECTANGLE, { x: 3.7, y: 2.9, w: 4.2, h: 2.0, fill: { color: "000000" }, line: { color: FG, width: 2 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 3.8, y: 2.25, w: 4.2, h: 0.28, fill: { color: "000000" }, line: { color: FG, width: 2 }, rotate: -9 });
  mono(s, "LLM", { x: 3.7, y: 3.45, w: 4.2, h: 0.9, fontSize: 40, bold: true, align: "center", valign: "middle" });
  arrow(s, 8.0, 3.9, 10.6, 3.9, { color: FG });
  mono(s, "answer", { x: 8.4, y: 3.35, w: 2.2, h: 0.4, fontSize: 18, color: MUTED });
  // screwdriver
  s.addShape(pres.shapes.LINE, { x: 8.3, y: 1.35, w: 1.6, h: 1.0, flipH: true, line: { color: FG, width: 4 } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.75, y: 0.85, w: 1.5, h: 0.42, rectRadius: 0.12, fill: { color: ACC }, line: { type: "none" }, rotate: -32 });
  txt(s, "Většina věcí po mně už nikdy nefungovala.", { x: 0.75, y: 5.7, w: 11, h: 0.5, fontSize: 22, color: MUTED, italic: true });
  txt(s, "Ale vždycky jsem se něco naučil.", { x: 0.75, y: 6.15, w: 11, h: 0.5, fontSize: 22, color: FG });
  notes(s, {
    time: "1:00",
    say: "Příběh z dětství: šroubovák, rozebírání, nic už nefungovalo. Co se v mládí naučíš… Dneska vezmeme pomyslný otvírák na konzervy na tuhle krabičku: prompt dovnitř, odpověď ven.",
    point: "Celá přednáška = postupné rozebírání téhle krabičky.",
    joke: "Rodiče by vám řekli, kolik rádií to stálo.",
    next: "Než sáhneme dovnitř, zkusíme si, co ta krabička vlastně dělá. Na sobě.",
  });

  // ===== II. ROZEBÍRÁME =====================================================
  section("II. Rozebíráme");

  s = newSlide("STATEMENT", "02 · HRA");
  txt(s, "Kočka sedí na …", { x: 0.75, y: 2.4, w: 12, h: 2, fontSize: 88, bold: true, valign: "middle" });
  notes(s, {
    time: "0:30 (spolu s dalším slidem 1:15)",
    say: "Nic neříkat. Nechat publikum doplnit nahlas. Počkat 3–4 vteřiny.",
    point: "Každý v sále má v hlavě několik kandidátů s různou jistotou.",
    next: "Klik — co jste říkali.",
  });

  s = newSlide("STATEMENT", "02 · HRA");
  txt(s, "Kočka sedí na …", { x: 0.75, y: 1.2, w: 12, h: 1.2, fontSize: 54, bold: true, color: MUTED });
  ["střeše", "gauči", "zemi", "stole", "…"].forEach((w, i) =>
    txt(s, w, { x: 0.75 + i * 2.3, y: 2.9, w: 2.2, h: 0.8, fontSize: 36, color: i === 0 ? ACC : FG, bold: i === 0 }));
  txt(s, "Gratuluju. Právě jste si zahráli na language model.", { x: 0.75, y: 5.0, w: 12, h: 0.8, fontSize: 30, bold: true });
  notes(s, {
    time: "0:45",
    say: "Vyjmenovat, co zaznělo. Nikdo nevěděl ‚správnou' odpověď — ale všichni věděli, co je pravděpodobné a co ne (‚na kvantové fyzice' asi nikdo).",
    point: "Language model dělá přesně tohle: z kontextu odhaduje, co bude dál.",
    tech: "Zatím vědomě neříkáme nic o transformeru ani o tom, že model nepracuje se slovy.",
    next: "Jenže je tu háček: model ty věty nevidí jako my.",
  });

  s = newSlide("CONTENT", "03 · TOKENIZER");
  title(s, "LLM nevidí text. Dostává tokeny.");
  chips(s, TOK_CZ, 0.75, 2.45, 26, { ids: TOK_CZ_IDS });
  mono(s, "9 tokenů", { x: 10.6, y: 2.55, w: 2, h: 0.4, fontSize: 16, color: ACC });
  chips(s, TOK_EN, 0.75, 4.05, 26, { ids: TOK_EN_IDS });
  mono(s, "7 tokenů", { x: 10.6, y: 4.15, w: 2, h: 0.4, fontSize: 16, color: ACC });
  mono(s, "· = mezera   ·   tokenizer o200k_base   ·   počet tokenů záleží na tokenizeru a textu", { x: 0.75, y: 5.75, w: 11.8, h: 0.4, fontSize: 15, color: MUTED });
  notes(s, {
    time: "1:15",
    say: "Model nedostane ‚Kočka sedí na střeše'. Dostane kousky — tokeny. Někdy celé slovo, někdy kus slova, mezera bývá součástí tokenu, tečka je samostatný token. Pod každým tokenem je jeho číslo ve slovníku tokenizeru.",
    point: "Základní jednotka LLM je token, ne slovo ani význam.",
    joke: "Střecha se rozpadla na ‚st', ‚ře', ‚še'. Tak tohle si model musí dát dohromady sám.",
    tech: "Skutečný výstup tiktoken o200k_base pro tyto dvě věty. Jiné modely mají jiné tokenizery a jiná čísla. Počet tokenů záleží na tokenizeru a konkrétním textu — nezobecňovat na ‚čeština je vždycky horší'. ‚Nevidí text' = dostává token IDs; neplyne z toho, že uvnitř nevznikají reprezentace významu. Tokenizace je bezeztrátová (z ID jde text přesně zrekonstruovat).",
    src: "github.com/openai/tiktoken",
    next: "A s čísly ve slovníku se ještě nedá počítat. Potřebujeme víc.",
  });

  s = newSlide("CONTENT", "04 · EMBEDDINGS");
  title(s, "Tokeny se změní na čísla");
  const ex = [["·sed", "10412", "[ 0.12, −0.83, 0.40, … ]"], ["·na", "898", "[−0.51, 0.07, 0.93, … ]"], ["·st", "420", "[ 0.66, 0.21, −0.18, … ]"]];
  ex.forEach(([t, id, v], i) => {
    const y = 2.25 + i * 0.85;
    box(s, t, 0.75, y, 1.3, 0.6, { fs: 20 });
    arrow(s, 2.15, y + 0.3, 2.75, y + 0.3);
    mono(s, id, { x: 2.85, y, w: 1.1, h: 0.6, fontSize: 18, color: MUTED, valign: "middle" });
    arrow(s, 3.95, y + 0.3, 4.55, y + 0.3);
    mono(s, v, { x: 4.65, y, w: 4.2, h: 0.6, fontSize: 18, color: ACC, valign: "middle" });
  });
  mono(s, "+ pozice v textu", { x: 4.65, y: 4.85, w: 4, h: 0.4, fontSize: 16, color: FG });
  mono(s, "schematické hodnoty · reálně stovky až tisíce čísel", { x: 4.65, y: 5.3, w: 4.6, h: 0.6, fontSize: 15, color: MUTED });
  // similarity sketch
  s.addShape(pres.shapes.RECTANGLE, { x: 9.4, y: 2.25, w: 3.2, h: 3.2, fill: { color: BG }, line: { color: DIM, width: 1, dashType: "dash" } });
  [["kočka", 9.75, 2.7], ["pes", 10.35, 3.1], ["kotě", 9.95, 3.35], ["střecha", 11.2, 4.4], ["okap", 11.5, 4.85]].forEach(([w, x, y]) => {
    s.addShape(pres.shapes.OVAL, { x, y, w: 0.13, h: 0.13, fill: { color: ACC }, line: { type: "none" } });
    mono(s, w, { x: x + 0.18, y: y - 0.1, w: 1.3, h: 0.3, fontSize: 12, color: FG });
  });
  mono(s, "schéma, ne měření", { x: 9.4, y: 5.55, w: 3.4, h: 0.3, fontSize: 15, color: MUTED });
  notes(s, {
    time: "1:15",
    say: "Aby s tím počítač mohl počítat, z každého tokenu uděláme dlouhý vektor čísel — embedding. Přidá se i informace o pozici, protože ‚pes kousl pošťáka' není ‚pošťák kousl psa'. Tyhle vektory se model naučí při tréninku a zachycují vztahy mezi tokeny — tokeny používané v podobných souvislostech často skončí blízko sebe.",
    point: "Jazyk převedeme na čísla. Naučené vektory zachycují vztahy mezi tokeny.",
    tech: Z + "Hodnoty vektorů jsou vymyšlené. Token ID je jen index ve slovníku, není seřazené podle významu. Blízkost ve vektorovém prostoru není univerzální záruka významové podobnosti. Obrázek vpravo je 2D ilustrace; reálný prostor má stovky až tisíce dimenzí a jednotlivé souřadnice obvykle nemají lidsky čitelný význam. Pozice se dnes často kóduje přímo uvnitř attention (např. RoPE), ne jen přičtením k embeddingu.",
    next: "Teď máme řadu vektorů. Jak model pozná, které spolu souvisí?",
  });

  s = newSlide("CONTENT", "05 · ATTENTION");
  title(s, "Na co se mám dívat?");
  const att = ["Kočka", " honila", " myš", ",", " protože", " měla", " hlad", "."];
  const wts = [0.0, 0.55, 0.45, 0.9, 0.75, 0.6]; // transparency per visible token; 6+ = future, masked
  chips(s, att, 0.75, 2.7, 28, { gap: 0.14, stroke: DIM, hi: (i) => i <= 5 ? { t: wts[i] * 100 } : null, masked: (i) => i > 5 });
  // mark current token
  const xMela = 0.75 + att.slice(0, 5).reduce((a, t) => a + t.length * charW(28) + 0.22 + 0.14, 0);
  s.addShape(pres.shapes.RECTANGLE, { x: xMela - 0.06, y: 2.64, w: att[5].length * charW(28) + 0.34, h: 0.82, fill: { type: "none" }, line: { color: FG, width: 2.5 } });
  mono(s, "▲ teď zpracovávám tohle", { x: xMela - 0.06, y: 3.6, w: 3.6, h: 0.35, fontSize: 14, color: FG });
  mono(s, "budoucnost: nevidí", { x: xMela + 1.53, y: 2.25, w: 3, h: 0.35, fontSize: 14, color: MUTED });
  txt(s, "Když zpracovávám tento token, které části kontextu jsou pro něj důležité?", { x: 0.75, y: 4.6, w: 11.5, h: 0.9, fontSize: 26 });
  mono(s, "sytost = váha attention · schéma, ne změřené váhy · zjednodušeno: slova místo tokenů", { x: 0.75, y: 5.75, w: 11.8, h: 0.35, fontSize: 15, color: MUTED });
  notes(s, {
    time: "1:45",
    say: "Model čte zleva doprava. Zpracovává ‚měla' — ‚hlad' ještě nevidí. Kdo měla? Kočka i myš jsou ženského rodu, gramatika nepomůže. Vy tušíte, že spíš kočka. Attention je mechanismus, kterým model pro každý token spočítá, na které předchozí tokeny se ‚podívat' a jak moc — a z nich si poskládá novou reprezentaci.",
    point: "Attention = každý token si vybírá, co z kontextu je pro něj relevantní.",
    tech: Z + "Váhy na slidu jsou vymyšlené pro ilustraci. V decoder-only modelu je attention kauzální: token vidí sebe a předchozí tokeny, budoucí jsou maskované (na slidu přerušovaně, bez váhy). Na slidu jsou slova, reálně jsou to tokeny (např. Ko|čka). Reálně běží mnoho attention hlav paralelně v mnoha vrstvách a jednotlivé hlavy sledují různé vztahy; jedna hlava se nedá číst jako ‚model si myslí X'. Attention není totéž co uvažování. Mechanika pro zvídavé: query/key/value — každý token vyšle dotaz (query), porovná ho s klíči (keys) ostatních tokenů a vezme vážený průměr jejich hodnot (values). Na slide nedávat.",
    src: "Vaswani et al. 2017, Attention Is All You Need; Transformer Explainer (sekce Attention)",
    next: "Attention je jedna součástka. Teď ukážeme, jak se skládají.",
  });

  s = newSlide("CONTENT", "06 · TRANSFORMER");
  title(s, "Opakuj. Hodněkrát.");
  box(s, "tokeny + pozice → vektory", 1.0, 1.95, 4.6, 0.55, { fs: 15, stroke: MUTED });
  for (let i = 0; i < 3; i++) {
    const y = 2.75 + i * 0.85;
    s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y, w: 4.6, h: 0.68, fill: { color: BG }, line: { color: FG, width: 1.25 } });
    box(s, "attention", 1.15, y + 0.1, 2.05, 0.48, { fs: 15, stroke: ACC, color: ACC });
    box(s, "MLP", 3.4, y + 0.1, 2.05, 0.48, { fs: 15 });
    arrow(s, 3.2, y + 0.34, 3.4, y + 0.34, { width: 1 });
    arrow(s, 3.3, y - (i ? 0.17 : 0.25), 3.3, y, { width: 1 });
  }
  arrow(s, 3.3, 5.0, 3.3, 5.4, { width: 1 });
  mono(s, "× N vrstev", { x: 5.8, y: 3.3, w: 2.2, h: 0.5, fontSize: 20, color: ACC, bold: true });
  box(s, "logits", 1.0, 5.4, 4.6, 0.55, { fs: 15, stroke: MUTED });
  txt(s, "Žádná ručně napsaná tabulka odpovědí.", { x: 7.6, y: 2.2, w: 5, h: 1.1, fontSize: 30, bold: true });
    txt(s, "Architektura + miliardy naučených čísel — parametrů.", { x: 7.6, y: 4.3, w: 5, h: 0.9, fontSize: 20, color: MUTED });
  notes(s, {
    time: "1:00",
    say: "Transformer blok = attention (tokeny si vyměňují informace) + MLP (každý token se zpracuje zvlášť). A tenhle blok se opakuje — desítky vrstev nad sebou. Na konci vypadne pro každou pozici sada čísel: logits.",
    point: "Uvnitř není ručně napsaná tabulka odpovědí. Je tam architektura a parametry naučené z dat.",
    tech: Z + "Vynechány normalizace, residual connections, detaily výstupní vrstvy. Počet vrstev a parametrů se liší model od modelu; u velkých modelů jde o desítky až přes sto vrstev a miliardy až stovky miliard parametrů (u uzavřených modelů často nezveřejněno). Za běhu vznikají aktivace (mezivýsledky). Některé tréninkové pasáže může model memorovat (viz slide JPEG).",
    next: "Co přesně z toho na konci vypadne?",
  });

  s = newSlide("CONTENT", "07 · VÝSTUP");
  title(s, "Nevypadne odpověď. Vypadne rozdělení.");
  mono(s, [{ text: "Kočka sedí na …  →  logits (skóre)  →  " }, { text: "softmax", options: { color: ACC, bold: true } }, { text: "  →  pravděpodobnosti" }], { x: 0.75, y: 2.0, w: 11.8, h: 0.5, fontSize: 18, color: MUTED });
  bars(s, DIST, 0.75, 2.75, { labelW: 1.9, maxW: 6.5, rowH: 0.62, fs: 22, max: 0.31 });
  mono(s, "… ostatní: 28 % dohromady, rozprostřeno mezi desítky tisíc tokenů", { x: 0.75, y: 5.95, w: 11, h: 0.35, fontSize: 14, color: MUTED });
  mono(s, "ILUSTRATIVNÍ ČÍSLA\nzjednodušeno: slova místo tokenů", { x: 7.6, y: 4.1, w: 5.0, h: 0.7, fontSize: 16, color: ACC, align: "right" });
  notes(s, {
    time: "1:15",
    say: "Tohle je nejdůležitější slide. Model nevrací ‚správnou odpověď'. Vrací skóre (logits) pro každý token ve slovníku a softmax je převede na pravděpodobnosti, které dávají dohromady 100 %. Celý slovník — desítky až stovky tisíc tokenů.",
    point: "Výstup LLM je distribuce pravděpodobností dalšího tokenu, ne odpověď.",
    joke: "Odpověď ‚42' tam někde taky je. S hodně malou pravděpodobností.",
    tech: Z + "Čísla jsou ilustrativní a kandidáti jsou celá slova. Reálně (viz tokenizer) by model nejdřív volil první token, např. ‚·st', a ‚střeše' by vzniklo až během několika kroků. 31 % neznamená 31% jistotu, že je odpověď pravdivá — je to podíl pravděpodobnosti pro tento token. Chatovací modely navíc po post-trainingu nemají distribuce jako čistý jazykový model. Přesnější varianta pro technické publikum: EN ‚The cat sits on the' → ·roof/·mat/·floor/·sofa (všechno jednotlivé tokeny o200k_base).",
    src: "Transformer Explainer — sekce výstupních pravděpodobností",
    next: "A z rozdělení musíme vybrat jeden token. Jak?",
  });

  s = newSlide("CONTENT", "08 · SAMPLING");
  title(s, "A teď hodíme kostkou");
  [0.2, 1.0, 1.2].forEach((T, k) => {
    const x = 0.75 + k * 4.1;
    mono(s, "T = " + T.toFixed(1), { x, y: 1.95, w: 3.8, h: 0.4, fontSize: 18, color: k === 1 ? FG : ACC, bold: true });
    bars(s, temper(T), x, 2.5, { labelW: 0.35, maxW: 2.4, rowH: 0.48, fs: 16, max: 1 });
  });
  mono(s, "syntetické logits [3, 2, 1, 0] · softmax(logits / T) · osa 0–100 %", { x: 0.75, y: 4.55, w: 11.8, h: 0.35, fontSize: 15, color: MUTED });
  txt(s, "Kostka, která před každým hodem změní pravděpodobnosti svých stěn — podle všeho, co zatím viděla.", { x: 0.75, y: 5.05, w: 11.8, h: 0.9, fontSize: 22 });
  mono(s, "Stochastický ≠ náhodný chaos.", { x: 0.75, y: 6.15, w: 8, h: 0.4, fontSize: 18, color: ACC, bold: true });
  notes(s, {
    time: "1:45 (+ až 1:00 živá ukázka z rezervy)",
    say: "Z rozdělení se vybere token — sampling. Je to kostka, ale extrémně zatížená, a před každým hodem se přezváží podle kontextu. Temperature mění tvar rozdělení: nízká ho zostří (vyhrává favorit), vysoká ho zploští (víc šance pro outsidery). Pořadí kandidátů se nemění, mění se jen poměry.",
    point: "Stochastický neznamená chaotický. Rozdělení je velmi strukturované; náhoda jen vybírá v jeho rámci.",
    tech: "Temperature není ‚míra kreativity', je to parametr, který dělí logits před softmaxem: softmax(logits/T); hodnoty na slidu jsou skutečně spočtené pro 4 syntetické kandidáty (bez top-k/top-p). Ani nízká, ani vysoká T nezaručuje pravdivost. T = 0 je konvence pro greedy decoding (vždy nejpravděpodobnější token), ne dělení nulou. Greedy je deterministická volba pro stejné logits, ale celá inference nemusí být bitově reprodukovatelná: floating-point, pořadí operací a dávkování mohou posunout skóre a u blízkých kandidátů změnit i greedy volbu. Sampling tedy není jediný zdroj variability. Další strategie: top-k, top-p.",
    src: "Transformer Explainer (temperature slider); PyTorch docs — Reproducibility, Numerical accuracy",
    next: "ŽIVÁ UKÁZKA (volitelně, max 1 min): poloclub.github.io/transformer-explainer — posunout temperature slider, ukázat jak se mění rozdělení. Pak: a tohle se opakuje.",
  });

  s = newSlide("CONTENT", "09 · SMYČKA");
  title(s, "A znovu. A znovu. A znovu.");
  const pipe = ["text", "tokenizer", "tokeny", "embeddings", "transformer × N", "logits", "softmax → pravděpodobnosti", "sampling", "další token"];
  pipe.forEach((p, i) => {
    const y = 1.95 + i * 0.5;
    box(s, p, 0.9, y, 3.2, 0.38, { fs: 13, stroke: i === 8 ? ACC : MUTED, color: i === 8 ? ACC : FG });
    if (i < 8) arrow(s, 2.5, y + 0.38, 2.5, y + 0.5, { width: 1 });
  });
  // return loop
  arrow(s, 4.1, 6.14, 4.6, 6.14, { noHead: true, color: ACC });
  arrow(s, 4.6, 6.14, 4.6, 3.14, { noHead: true, color: ACC });
  arrow(s, 4.6, 3.14, 4.1, 3.14, { color: ACC });
  mono(s, "↺ kontext\n  tokenů", { x: 4.7, y: 4.2, w: 1.2, h: 0.7, fontSize: 14, color: ACC });
  const steps = [["Kočka sedí na", "·st"], ["Kočka sedí na st", "ře"], ["Kočka sedí na stře", "še"], ["Kočka sedí na střeše", "."]];
  steps.forEach(([ctx, t], i) => {
    const y = 2.3 + i * 0.85;
    mono(s, ctx, { x: 6.3, y, w: 3.85, h: 0.5, fontSize: 20, color: FG, valign: "middle" });
    arrow(s, 10.2, y + 0.25, 10.8, y + 0.25);
    box(s, t, 10.95, y, 0.9, 0.5, { fs: 20, stroke: ACC, color: ACC });
  });
  mono(s, "tokeny podle o200k_base; konkrétní volby ilustrativní", { x: 6.3, y: 5.85, w: 7, h: 0.35, fontSize: 15, color: MUTED });
  notes(s, {
    time: "0:45",
    say: "Vybraný token (jeho ID) se přilepí ke kontextu tokenů — text se znovu netokenizuje — a celé se to spustí znovu. Token po tokenu. Teď vidíte celou rozebranou krabičku — vlevo je to, co bylo uvnitř. Vpravo vidíte, jak vzniká ‚střeše' ze tří tokenů.",
    point: "Generování = smyčka: kontext → pravděpodobnosti → token → nový kontext. Nic víc.",
    tech: "Smyčka běží do ukončovacího tokenu nebo limitu délky. Mezivýsledky předchozích tokenů se obvykle cachují (KV cache), takže se nepřepočítává všechno od nuly. ‚Opakuj' neznamená ‚uč se': při běžném chatu se váhy modelu nemění. Kontext má omezenou délku (context window).",
    next: "A teď ta otázka, která by vás měla trápit nejvíc.",
  });

  s = newSlide("CONTENT", "10 · PROČ TO FUNGUJE");
  title(s, "Tak proč je to tak chytré?");
  const ex11 = [["Hlavní město Austrálie je …", "fakta"], ["def is_even(n): return …", "kód"], ["„Le chat dort.“ = „Kočka …", "překlad"], ["Pokud A > B a B > C, pak A …", "logická struktura"]];
  ex11.forEach(([p, k], i) => {
    const y = 2.0 + i * 0.8;
    box(s, p, 0.75, y, 6.9, 0.58, { fs: 17, stroke: MUTED });
    arrow(s, 7.75, y + 0.29, 8.4, y + 0.29);
    mono(s, k, { x: 8.55, y, w: 4, h: 0.58, fontSize: 18, color: ACC, valign: "middle" });
  });
  txt(s, "Aby model dobře předpovídal text, učí se vzory a vztahy použitelné i pro překlad, kód a řešení úloh.", { x: 0.75, y: 5.35, w: 11.8, h: 0.9, fontSize: 24, bold: true });
  notes(s, {
    time: "1:15",
    say: "Pokud je základní operace jen hádání dalšího tokenu, odkud se bere překlad, kód, sumarizace? Odpověď: abyste u těchto vět dobře tipovali další token, musíte zachytit fakta, syntaxi kódu, vztahy mezi jazyky, strukturu argumentu. Trénink tlačí model, aby si tyhle pravidelnosti nějak zakódoval — jinak by predikoval špatně.",
    point: "Jednoduchá úloha × obrovská data × velký model (+ post-training) → schopnosti, které nikdo explicitně neprogramoval.",
    tech: "Opatrně: neříkat jako fakt, že model ‚má model světa' nebo ‚rozumí'. Jak přesně jsou tyhle struktury uvnitř reprezentované, je otevřená výzkumná otázka (interpretability). Slovo ‚emergence' nepoužívat jako vysvětlení. Úspěch v úlohách je empirický fakt, ne důkaz lidského myšlení. Schopnosti závisí na datech, architektuře, škále i post-trainingu. Pojem ‚emergentní schopnosti' je odborně sporný — část skokových efektů závisí na zvolené metrice (Schaeffer et al. 2023). Dnešní chat modely navíc prošly post-trainingem (instrukce, RLHF/RL), nejsou to čisté next-token prediktory.",
    src: "Brown et al. 2020 (Language Models are Few-Shot Learners); Schaeffer et al. 2023 (Are Emergent Abilities a Mirage?)",
    next: "Jak se to model naučí?",
  });

  s = newSlide("CONTENT", "11 · TRAINING");
  title(s, "Pootočíme pár miliard knoflíků");
  mono(s, "text:     Kočka sedí na rohožce.", { x: 0.75, y: 2.0, w: 7, h: 0.45, fontSize: 18 });
  mono(s, "model:    Kočka sedí na …", { x: 0.75, y: 2.5, w: 8, h: 0.45, fontSize: 18, color: MUTED });
  bars(s, [["·st", 0.40], ["·ro", 0.03]], 1.75, 3.05, { labelW: 0.8, maxW: 3, rowH: 0.5, fs: 17, max: 0.4 });
  mono(s, "ilustrativní\npravděpodobnosti", { x: 4.3, y: 3.5, w: 3, h: 0.6, fontSize: 15, color: ACC });
  mono(s, "skutečný další token v textu: ·ro", { x: 0.75, y: 4.2, w: 7, h: 0.45, fontSize: 18, color: ACC, bold: true });
  ["chyba", "malá úprava parametrů", "znovu", "× biliony tokenů", "pak post-training: instrukce, preference"].forEach((t, i) =>
    mono(s, (i ? "→ " : "") + t, { x: 0.75, y: 4.85 + i * 0.4, w: 6, h: 0.4, fontSize: 17, color: i === 3 ? ACC : (i === 4 ? MUTED : FG) }));
  // knobs
  const ang = [20, 110, 200, 300, 45, 160, 250, 330, 80, 190, 280, 15];
  ang.forEach((a, i) => {
    const cx = 8.3 + (i % 4) * 1.05, cy = 2.4 + Math.floor(i / 4) * 1.05, r = 0.36;
    s.addShape(pres.shapes.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: BG }, line: { color: i === 5 ? ACC : MUTED, width: 1.25 } });
    const rad = a * Math.PI / 180, ex2 = cx + Math.cos(rad) * r * 0.8, ey = cy + Math.sin(rad) * r * 0.8;
    arrow(s, cx, cy, ex2, ey, { noHead: true, color: i === 5 ? ACC : FG, width: 2 });
  });
  mono(s, "zjednodušení", { x: 8.0, y: 5.6, w: 4.2, h: 0.35, fontSize: 15, color: MUTED, align: "center" });
  notes(s, {
    time: "1:15",
    say: "Vezmeme skutečný text, zakryjeme další token a necháme model hádat. Řekněme, že dá 40 % tokenu ‚·st' (střeše) a jen 3 % tokenu ‚·ro' (rohožce) — čísla jsou ilustrativní. V textu ale bylo ‚·ro'. Spočítáme chybu a všechny parametry maličko pootočíme tím směrem, aby příště dal ‚·ro' o kousek víc. A tohle zopakujeme na bilionech tokenů, mnoho pozic a příkladů najednou.",
    point: "Training = obří množství malých oprav, ne zapisování faktů do tabulky.",
    joke: "Pár miliard knoflíků. Ručně by to trvalo.",
    tech: Z + "‚Skutečný další token' není ‚správná odpověď' — trénovací text nemusí být fakticky pravdivý; ztráta jen penalizuje nízkou pravděpodobnost pozorovaného tokenu. Úprava parametrů = gradient descent přes backpropagation; nevysvětlujeme. Tohle je pre-training. Chat model pak prochází post-trainingem: supervised fine-tuning na ukázkách konverzací a ladění podle preferencí (RLHF), případně odměny za vyřešené úlohy (RL) — proto odpovídá jako asistent, ne jako doplňovač textu.",
    src: "Ouyang et al. 2022 (InstructGPT) pro post-training",
    next: "Co tedy v těch parametrech vlastně je?",
  });

  s = newSlide("CONTENT", "12 · KOMPRESE");
  title(s, "Co mají LLM společného s JPEGem?");
  const row = (y, items, lbl, hiLast) => {
    mono(s, lbl, { x: 0.75, y, w: 1.2, h: 0.6, fontSize: 18, color: ACC, bold: true, valign: "middle" });
    items.forEach((t, i) => {
      const x = 2.1 + i * 2.75;
      box(s, t, x, y, 2.3, 0.6, { fs: 14, stroke: hiLast && i === 3 ? ACC : MUTED });
      if (i < 3) arrow(s, x + 2.32, y + 0.3, x + 2.73, y + 0.3);
    });
  };
  row(2.2, ["obrázek", "ztrátová komprese", "malý soubor", "přibližná rekonstrukce"], "JPEG");
  row(3.35, ["biliony tokenů", "training", "parametry", "generování"], "LLM", true);
  txt(s, "Parametry nejsou databáze dokumentů.", { x: 0.75, y: 4.6, w: 11.8, h: 0.6, fontSize: 26, bold: true });
  txt(s, "LLM není JPEG. Mechanismus je úplně jiný — analogie pro intuici, ne technický popis. (A některé pasáže si model umí zapamatovat doslova.)", { x: 0.75, y: 5.3, w: 11.8, h: 0.8, fontSize: 18, color: MUTED });
  notes(s, {
    time: "1:15",
    say: "JPEG zahazuje část detailů a obrázek pak přibližně zrekonstruuje. Na LLM se dá dívat podobně: z obrovského množství textu zůstalo v parametrech něco jako ztrátově zhuštěné pravidelnosti — ne kopie dokumentů. Když generuje, vytváří nové pokračování z naučených pravidelností; neobnovuje konkrétní originální dokument.",
    point: "Model není databáze originálů. Je to ztrátová, zhuštěná reprezentace pravidelností.",
    joke: "Analogie je od Teda Chianga: ChatGPT is a blurry JPEG of the web.",
    tech: Z + "LLM není doslova kompresní algoritmus a halucinace nejsou JPEG artefakty. Nuance: modely si přesto umí zapamatovat a doslova reprodukovat části trénovacích dat (memorization), hlavně často opakované texty — ‚není databáze' neznamená ‚nic si nepamatuje'. Formální vztah predikce a komprese existuje (Delétang et al. 2023), ale to je jiná rovina než tahle intuice.",
    src: "Ted Chiang, ChatGPT Is a Blurry JPEG of the Web, The New Yorker 2023 — newyorker.com/tech/annals-of-technology/chatgpt-is-a-blurry-jpeg-of-the-web (autorská analogie); Delétang et al. 2023, Language Modeling Is Compression — arxiv.org/abs/2309.10668; Carlini et al. 2020, Extracting Training Data from LLMs",
    next: "A tím se dostáváme k tomu, co nám na LLM nejvíc vadí.",
  });

  // ===== III. KDE TO SKŘÍPE ================================================
  section("III. Kde to skřípe");

  s = newSlide("CONTENT", "13 · HALUCINACE");
  title(s, "Proč halucinuje?");
  s.addShape(pres.shapes.RECTANGLE, { x: 0.75, y: 2.0, w: 7.2, h: 2.3, fill: { color: "111318" }, line: { color: DIM, width: 1 } });
  mono(s, [
    { text: "while not done:", options: { breakLine: true } },
    { text: "    probs = model(context)", options: { breakLine: true } },
    { text: "    # vždycky nějaké rozdělení", options: { color: ACC, breakLine: true } },
    { text: "    token = sample(probs)", options: { breakLine: true } },
    { text: "    context += token", options: {} },
  ], { x: 1.0, y: 2.2, w: 6.8, h: 2.0, fontSize: 18, color: FG });
  txt(s, "Halucinace není cizí přívěsek nalepený na LLM.", { x: 0.75, y: 4.65, w: 11.8, h: 0.6, fontSize: 26, bold: true });
  txt(s, "Je to důsledek toho, že po generativním modelu chceme odpověď i tam, kde nemá spolehlivou oporu.", { x: 0.75, y: 5.25, w: 11.8, h: 0.9, fontSize: 20, color: MUTED });
  txt(s, "Věrohodné pokračování není záruka pravdy.", { x: 8.3, y: 2.0, w: 4.3, h: 1.2, fontSize: 22, bold: true, color: ACC });
  mono(s, "Model může říct „nevím“. Generování ale nezaručuje, že správně pozná kdy.", { x: 8.3, y: 3.2, w: 4.3, h: 1.1, fontSize: 15, color: MUTED });
  notes(s, {
    time: "2:00",
    say: "Podívejte se na smyčku. Model v každém kroku vyrobí nějaké rozdělení a my z něj vždycky něco vybereme. Nikde v té smyčce není krok ‚ověř, jestli je to pravda'. Model generuje věrohodné pokračování — a věrohodné a pravdivé se většinou překrývá, ale ne vždycky. Pravděpodobnost textu není pravdivost.",
    point: "Halucinace vyplývá z toho, co generativní model dělá; není to cizí bug navíc.",
    tech: Z + "Halucinace nemají jediný mechanismus (chybějící nebo vzácná data, konflikty v datech, chyby při dekódování, tlak tréninku a evaluací odměňovat tipování víc než ‚nevím'). ‚Nevím' je možný výstup a moderní modely se dají trénovat, aby nejistotu přiznávaly častěji, používaly tools a citovaly zdroje — jen na to není garance ze samotného generování tokenů. RAG ani tools nejsou univerzální oprava. Kalai et al. popisují tlak na hádání místo abstence jako jeden mechanismus, ne úplnou teorii všech chyb.",
    src: "Kalai et al. 2025, Why Language Models Hallucinate (OpenAI)",
    next: "Druhá věc, která lidi překvapuje.",
  });

  s = newSlide("STATEMENT", "14 · POČÍTÁNÍ");
  txt(s, "2837 × 491 = ?", { x: 0.75, y: 1.8, w: 12, h: 1.6, fontSize: 96, bold: true, valign: "middle" });
  txt(s, "Kde přesně jste v té mašině viděli násobičku?", { x: 0.75, y: 4.4, w: 12, h: 0.8, fontSize: 32, color: MUTED });
  notes(s, {
    time: "0:45 (spolu s dalším slidem 1:30)",
    say: "Nechat chvíli viset. Pak: vzpomeňte si na rozebranou krabičku — tokenizer, embeddings, attention, logits, sampling. Kde byla násobička? (Hned dodat:) Hardware uvnitř samozřejmě násobí. Jen nám to nezaručuje správné násobení čísel z promptu.",
    point: "V architektuře není deterministická aritmetická jednotka pro tenhle úkol.",
    tech: Z + "‚Není tam násobička' je rétorická zkratka, ne doslovný popis: uvnitř je spousta násobení matic, jen ne garantovaný algoritmus pro násobení čísel z promptu. Modely aritmetiku částečně umí jako naučené vzory a moderní reasoning modely jsou v matematice velmi dobré; víceciferné násobení bez nástroje ale zůstává náchylné k chybám. Čísla se navíc tokenizují po kouscích. Hardware samozřejmě násobí — jde o to, že v LM není garantovaný převod úlohy na přesný aritmetický výsledek. Neříkat, že modely matematiku ‚neumí'.",
    next: "Tak co s tím?",
  });

  s = newSlide("STATEMENT", "14 · POČÍTÁNÍ");
  txt(s, "2837 × 491 = ?", { x: 0.75, y: 1.2, w: 12, h: 1.0, fontSize: 54, bold: true, color: MUTED });
  box(s, "LLM", 0.75, 3.0, 2.2, 0.9, { fs: 26, bold: true, stroke: ACC, color: ACC });
  arrow(s, 3.05, 3.45, 3.95, 3.45, { color: FG });
  box(s, "calculator()", 4.05, 3.0, 3.4, 0.9, { fs: 24 });
  arrow(s, 7.55, 3.45, 8.45, 3.45, { color: FG });
  mono(s, "1 392 967", { x: 8.6, y: 3.0, w: 4, h: 0.9, fontSize: 40, bold: true, valign: "middle" });
  txt(s, "Když mám kalkulačku, použiju kalkulačku.", { x: 0.75, y: 5.0, w: 12, h: 0.8, fontSize: 32, bold: true });
  notes(s, {
    time: "0:45",
    say: "Řešení není nutit model, aby se naučil násobit líp. Řešení je dát mu kalkulačku. Model pozná, že jde o výpočet, zavolá nástroj, a výsledek je přesný.",
    point: "Deterministický problém → deterministický nástroj.",
    tech: "Kalkulačka spočítá přesně jen to, co dostane: systém musí ověřit, že model předal správné argumenty, a výsledek validovat. Výsledek 1 392 967 ověřen integer aritmetikou.",
    joke: "Kalkulačka za 50 Kč porazí model za miliardy. V tomhle jednom.",
    next: "A tohle je obecný princip. Pojďme mu dávat nástroje.",
  });

  // ===== IV. SOFTWARE KOLEM ================================================
  section("IV. Stavíme kolem toho software");

  const chain = [["LLM", 0], ["+ aplikační\nkontext", 1], ["+ retrieval", 1], ["+ tools", 2], ["+ state", 2], ["= agent", 3]];
  const captions = [
    ["RAG: nedonutíme model, aby všechno věděl.", "Najdeme relevantní informace a vložíme mu je do kontextu."],
    ["Tools: kalkulačka · search · databáze · API · Python · interní systémy", "Model navrhne volání, náš kód ho provede a vrátí výsledek."],
    ["LLM není celý agent. Je to jedna komponenta.", "Agent = smyčka: zvol akci → spusť tool → přečti výsledek → pokračuj, nebo skonči."],
  ];
  [1, 2, 3].forEach((step) => {
    s = newSlide("CONTENT", "15 · NÁSTROJE");
    title(s, "Tak mu dejme nástroje");
    chain.forEach(([t, st], i) => {
      const on = st <= step, x = 0.75 + i * 2.05;
      box(s, t, x, 2.4, 1.85, 0.9, { fs: 16, bold: i === 0 || i === 5, stroke: !on ? DIM : (st === step ? ACC : FG), color: !on ? DIM : (st === step ? ACC : FG), dash: i === 5 ? "dash" : "solid" });
    });
    const [c1, c2] = captions[step - 1];
    txt(s, c1, { x: 0.75, y: 4.1, w: 11.8, h: 0.7, fontSize: 26, bold: true });
    txt(s, c2, { x: 0.75, y: 4.85, w: 11.8, h: 0.7, fontSize: 22, color: MUTED });
    notes(s, [null,
      { time: "1:00", say: "Začneme holým modelem. Kontext má model vždycky — první rozšíření je aplikační kontext: co mu do promptu vloží aplikace (instrukce, historie, data o uživateli). Druhé: retrieval. Nejdřív vyhledáme relevantní dokumenty (search, vektorová DB, cokoliv) a vložíme je do kontextu. Model pak odpovídá nad nimi.", point: "RAG nenahrává znalosti do modelu. Dává mu je do kontextu při každém dotazu.", tech: "Parametry se při RAG nemění. Kvalita odpovědi stojí na kvalitě vyhledávání; model může i přes dodaný kontext halucinovat nebo ho špatně použít.", src: "Lewis et al. 2020, Retrieval-Augmented Generation", next: "A když nestačí informace, potřebujeme akce." },
      { time: "1:00", say: "Tools: model nedělá výpočet ani dotaz sám. Vygeneruje strukturovaný požadavek (‚zavolej calculator s 2837×491'), náš kód ho vykoná a výsledek vrátí do kontextu. State/memory: co si systém pamatuje mezi kroky a konverzacemi — ukládá to software kolem, ne model.", point: "Tools a state dávají systému schopnosti, které samotný model nemá.", tech: "Model sám o sobě nic nespouští; volání nástrojů provádí okolní kód (a ten rozhoduje o oprávněních).", next: "Když to dáme dohromady ve smyčce, dostaneme to, čemu se dnes říká agent." },
      { time: "1:00", say: "Samotné přidání stavu z toho agenta nedělá. Agent = smyčka: model zvolí akci, systém spustí tool, výsledek jde zpátky do kontextu, model rozhodne, jestli pokračovat, nebo skončit. A všimněte si: LLM je jedna krabička z šesti. Zbytek je normální software.", point: "Agent není synonymum pro LLM. LLM je komponenta.", src: "Yao et al. 2022, ReAct", next: "A tady začíná klasický software." },
    ][step]);
  });

  s = newSlide("CONTENT", "16 · DVA SVĚTY");
  title(s, "Dva světy");
  const det = ["pravidla", "výpočty", "validace", "autorizace", "DB constraints", "workflows", "invarianty"];
  const prob = ["interpretace jazyka", "klasifikace nejasného vstupu", "extrakce", "sumarizace", "generování", "fuzzy matching"];
  mono(s, "DETERMINISTIC", { x: 0.75, y: 2.0, w: 5.5, h: 0.5, fontSize: 24, bold: true, color: FG });
  mono(s, "PROBABILISTIC", { x: 7.0, y: 2.0, w: 5.5, h: 0.5, fontSize: 24, bold: true, color: ACC });
  det.forEach((t, i) => mono(s, t, { x: 0.75, y: 2.7 + i * 0.47, w: 5.5, h: 0.42, fontSize: 18, color: FG }));
  prob.forEach((t, i) => mono(s, t, { x: 7.0, y: 2.7 + i * 0.47, w: 5.6, h: 0.42, fontSize: 18, color: FG }));
  s.addShape(pres.shapes.LINE, { x: 6.55, y: 2.0, w: 0, h: 3.9, line: { color: DIM, width: 1, dashType: "dash" } });
  notes(s, {
    time: "1:15",
    say: "Vlevo věci, kde umíme pravidlo napsat přesně a chceme stejný výsledek pokaždé. Vpravo věci, kde pravidlo napsat neumíme — jazyk, nejasné vstupy, význam.",
    point: "Nejde o to, co je modernější. Jde o to, jaký typ problému řešíme.",
    tech: "Jde o vhodné role, ne striktně oddělené typy softwaru. I klasifikátor může běžet deterministicky; determinismus ≠ správnost; model pracující s pravděpodobnostmi ≠ vždy losující program.",
    next: "Ukážu na dvou příkladech.",
  });

  s = newSlide("CONTENT", "17 · ŠPATNĚ");
  title(s, "Dosáhl 18 let?");
  mono(s, "✗", { x: 0.75, y: 2.3, w: 0.6, h: 0.8, fontSize: 36, color: ACC, bold: true, valign: "middle" });
  box(s, "birth_date", 1.5, 2.4, 2.6, 0.7, { fs: 18 });
  arrow(s, 4.2, 2.75, 5.0, 2.75);
  box(s, "LLM", 5.1, 2.4, 1.8, 0.7, { fs: 20, stroke: ACC, color: ACC });
  arrow(s, 7.0, 2.75, 7.8, 2.75);
  mono(s, "„ano, asi jo“", { x: 7.95, y: 2.4, w: 4, h: 0.7, fontSize: 20, color: MUTED, valign: "middle" });
  mono(s, "✓", { x: 0.75, y: 3.7, w: 0.6, h: 0.8, fontSize: 36, color: FG, bold: true, valign: "middle" });
  box(s, "birth_date", 1.5, 3.8, 2.6, 0.7, { fs: 18 });
  arrow(s, 4.2, 4.15, 5.0, 4.15);
  box(s, "věk(d, dnes) >= 18", 5.1, 3.8, 2.6, 0.7, { fs: 15 });
  arrow(s, 7.8, 4.15, 8.6, 4.15);
  mono(s, "true", { x: 8.75, y: 3.8, w: 3, h: 0.7, fontSize: 22, bold: true, valign: "middle" });
  txt(s, "Nedělej z deterministického problému probabilistický jen proto, že máš LLM.", { x: 0.75, y: 5.3, w: 11.8, h: 0.9, fontSize: 24, bold: true });
  notes(s, {
    time: "1:00",
    say: "Datum narození — dosáhl 18 let? To jsou tři řádky kódu. Poslat to do LLM znamená: pomalejší, dražší, a občas špatně. Výstup navíc může kolísat; ani opakovatelný výstup ale nezaručuje správnost.",
    point: "Když umíš napsat pravidlo, napiš pravidlo.",
    tech: "Kód potřebuje datum posouzení a definovaná kalendářní pravidla (29. 2. apod.). Ilustrace výpočtu, ne právní rozhodování.",
    joke: "Halucinující ověření věku. Přesně to, co chce slyšet compliance.",
    next: "A kde naopak LLM dává smysl?",
  });

  s = newSlide("CONTENT", "18 · DOBŘE");
  title(s, "Je to stížnost?");
  txt(s, "„No paráda, zase mi to přišlo rozbitý.“", { x: 0.75, y: 2.0, w: 11.8, h: 0.9, fontSize: 34, bold: true });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.75, y: 3.2, w: 5.6, h: 1.6, fill: { color: "111318" }, line: { color: DIM, width: 1 } });
  mono(s, [
    { text: 'if "paráda" in msg:', options: { breakLine: true } },
    { text: "    return PRAISE", options: { breakLine: true } },
    { text: "# ...a 4000 dalších výjimek", options: { color: MUTED } },
  ], { x: 0.95, y: 3.4, w: 5.3, h: 1.3, fontSize: 17, color: FG });
  box(s, "LLM", 7.0, 3.6, 1.6, 0.8, { fs: 20, stroke: ACC, color: ACC });
  [["complaint", true], ["praise", false], ["question", false], ["nejisté → člověk", false]].forEach(([l, on], i) => {
    arrow(s, 8.7, 4.0, 9.5, 3.2 + i * 0.5, { color: on ? ACC : DIM });
    mono(s, l, { x: 9.6, y: 3.0 + i * 0.5, w: 3.2, h: 0.4, fontSize: 18, color: on ? ACC : MUTED, bold: on });
  });
  txt(s, "Tady rychle přibývají výjimky. Tady se model může hodit.", { x: 0.75, y: 5.4, w: 11.8, h: 0.7, fontSize: 24, bold: true });
  notes(s, {
    time: "1:00",
    say: "‚No paráda' — klíčové slovo říká pochvala, člověk okamžitě ví, že je to sarkastická stížnost. U rozmanitých zpráv rychle přibývají výjimky. Tady se vyplatí model vyzkoušet a změřit, jak dobře klasifikuje.",
    point: "LLM tam, kde pravidlo napsat neumíme.",
    tech: "LLM není jediný možný klasifikátor (menší specializovaný model může stačit). Výstup omezit na validovaný enum včetně možnosti ‚nejisté' s eskalací na člověka; výsledek je odhad, ne fakt.",
    next: "Dejme to dohromady.",
  });

  s = newSlide("CONTENT", "19 · ARCHITEKTURA");
  title(s, "To nejlepší z obou světů");
  const cx = 6.67, dy = 0.12;
  box(s, "USER", cx - 1.0, 1.85 + dy, 2.0, 0.42, { fs: 14, stroke: MUTED });
  arrow(s, cx, 2.27 + dy, cx, 2.5 + dy);
  box(s, "LLM  ·  interpretuje / navrhuje / generuje", cx - 3.2, 2.5 + dy, 6.4, 0.55, { fs: 15, stroke: ACC, color: ACC, bold: true });
  arrow(s, cx, 3.05 + dy, cx, 3.28 + dy);
  box(s, "AUTORIZACE + VALIDACE ARGUMENTŮ  (před akcí)", cx - 3.2, 3.28 + dy, 6.4, 0.5, { fs: 14, bold: true, lw: 2 });
  arrow(s, cx - 1.6, 3.78 + dy, cx - 3.0, 4.05 + dy); arrow(s, cx + 1.6, 3.78 + dy, cx + 3.0, 4.05 + dy);
  box(s, "deterministic tools\ncalculator · APIs · business rules", 1.3, 4.05 + dy, 4.6, 0.85, { fs: 13 });
  box(s, "external knowledge\nsearch / RAG · database · documents", 7.43, 4.05 + dy, 4.6, 0.85, { fs: 13 });
  arrow(s, cx - 3.0, 4.9 + dy, cx - 1.6, 5.15 + dy); arrow(s, cx + 3.0, 4.9 + dy, cx + 1.6, 5.15 + dy);
  box(s, "VALIDACE VÝSTUPU", cx - 3.2, 5.15 + dy, 6.4, 0.5, { fs: 14, bold: true, lw: 2 });
  arrow(s, cx, 5.65 + dy, cx, 5.88 + dy);
  box(s, "RESULT", cx - 1.0, 5.88 + dy, 2.0, 0.42, { fs: 14, stroke: MUTED });
  // results flow back into the LLM context
  const back = { noHead: true, color: ACC, dash: "dash", width: 1.25 };
  arrow(s, 1.3, 4.47 + dy, 0.95, 4.47 + dy, back); arrow(s, 0.95, 4.47 + dy, 0.95, 2.77 + dy, back);
  arrow(s, 0.95, 2.77 + dy, cx - 3.2, 2.77 + dy, { color: ACC, dash: "dash", width: 1.25 });
  arrow(s, 12.03, 4.47 + dy, 12.4, 4.47 + dy, back); arrow(s, 12.4, 4.47 + dy, 12.4, 2.77 + dy, back);
  arrow(s, 12.4, 2.77 + dy, cx + 3.2, 2.77 + dy, { color: ACC, dash: "dash", width: 1.25 });
  mono(s, "výsledky zpět do kontextu", { x: 8.4, y: 2.25 + dy, w: 4.0, h: 0.3, fontSize: 12, color: ACC, align: "right" });
  notes(s, {
    time: "1:30",
    say: "LLM uprostřed tam, kde je potřeba pracovat s nejistotou: pochopit, co uživatel chce, rozhodnout, co zavolat, vygenerovat text. Kolem něj deterministický software: nástroje, data, pravidla. Model jen navrhuje volání. Software před akcí ověří oprávnění a argumenty a teprve pak tool spustí. A na výstupu deterministická validace — guardrails, které ověří, že výsledek má správný tvar a splňuje pravidla, než s ním něco uděláme. (V reálu je to smyčka: výsledek toolu jde zpátky do LLM.)",
    point: "Take the best of both worlds. Pravděpodobnost tam, kde je potřeba; jistota všude, kde jde.",
    tech: "Guardrails = schema validace, allow-listy akcí, oprávnění, limity, human-in-the-loop u nevratných akcí. Schema validace ověří tvar, ne pravdivost obsahu.",
    next: "Takže… zničí nás Terminátoři?",
  });

  s = newSlide("STATEMENT", "20 · TERMINÁTOŘI?");
  txt(s, "Takže… zničí nás Terminátoři?", { x: 0.75, y: 1.3, w: 12, h: 1.0, fontSize: 44, bold: true });
  txt(s, "Znalost mechanismu není důkaz bezpečnosti.", { x: 0.75, y: 2.9, w: 12, h: 0.7, fontSize: 28, color: FG });
  txt(s, "Co můžeme řídit hned: oprávnění, ověřování a lidský dohled.", { x: 0.75, y: 3.7, w: 11.5, h: 1.3, fontSize: 22, color: MUTED });
  txt(s, "DON'T PANIC ≠ don't care.", { x: 0.75, y: 5.4, w: 12, h: 0.7, fontSize: 30, bold: true, color: ACC });
  notes(s, {
    time: "0:45",
    say: "Slíbil jsem poctivou odpověď. Dnes jsme rozebrali výpočetní mechanismus. Samotným rozborem jsme ale nevyřešili otázku vědomí ani bezpečnosti. Ale to, že rozumíme mechanismu, neznamená, že systémy postavené nad LLM jsou automaticky bezpečné. Chyby, zneužití, špatně nastavená oprávnění agentů — to jsou reálná rizika. Prakticky můžeme hned řídit oprávnění, ověřování a lidský dohled.",
    point: "Nepanikařit neznamená nestarat se.",
    tech: "Nezlehčovat ani nepřehánět. Neříkat, že rizika jsou ‚hlavně v nasazení' — talk to nedokládá. Neimplikovat vyřešené dlouhodobé riziko ani jistotu o vědomí. Nedělat predikce o AGI. Pokud padne dotaz na dlouhodobá rizika: je to legitimní výzkumná a regulační oblast, dnešní přednáška ji neřeší.",
    next: "Takže na závěr.",
  });

  s = newSlide("STATEMENT");
  txt(s, "DON'T PANIC", { x: 0.6, y: 1.0, w: 12.2, h: 1.8, fontSize: 100, bold: true, valign: "middle" });
  txt(s, "It's just software.", { x: 0.75, y: 3.0, w: 12, h: 0.7, fontSize: 32 });
  txt(s, "Very weird software.", { x: 0.75, y: 3.6, w: 12, h: 0.7, fontSize: 32, color: ACC, bold: true });
  txt(s, "Don't replace certainty with probability\nunless probability solves a problem certainty can't.", { x: 0.75, y: 5.0, w: 12, h: 1.1, fontSize: 20, color: MUTED });
  notes(s, {
    time: "0:30",
    say: "LLM není magie. Je to velmi zvláštní a velmi silný software. Nenahrazujte jistotu pravděpodobností, pokud pravděpodobnost neřeší problém, který jistota neumí. Budoucnost není AI místo softwaru — je to deterministický software s probabilistickými schopnostmi. DON'T PANIC. Díky.",
    point: "Callback na začátek. Konec.",
    next: "Resources + Q&A.",
  });

  s = newSlide("CONTENT", "RESOURCES");
  title(s, "Kam dál");
  const qr = await QRCode.toDataURL("https://poloclub.github.io/transformer-explainer/", { margin: 4, width: 600, color: { dark: "#0A0B0DFF", light: "#ECE9E2FF" } });
  s.addImage({ data: qr, x: 9.6, y: 1.95, w: 2.9, h: 2.9 });
  mono(s, "Transformer Explainer", { x: 9.6, y: 4.95, w: 2.9, h: 0.35, fontSize: 13, color: ACC, align: "center" });
  const res = [
    ["Transformer Explainer", "poloclub.github.io/transformer-explainer", "https://poloclub.github.io/transformer-explainer/"],
    ["Vaswani et al. 2017", "Attention Is All You Need · arxiv.org/abs/1706.03762", "https://arxiv.org/abs/1706.03762"],
    ["Ouyang et al. 2022", "InstructGPT · arxiv.org/abs/2203.02155", "https://arxiv.org/abs/2203.02155"],
    ["Lewis et al. 2020", "Retrieval-Augmented Generation · arxiv.org/abs/2005.11401", "https://arxiv.org/abs/2005.11401"],
  ];
  res.forEach(([a, b, url], i) => {
    mono(s, a, { x: 0.75, y: 2.0 + i * 0.75, w: 8.5, h: 0.35, fontSize: 18, color: FG, bold: true });
    mono(s, [{ text: b, options: { hyperlink: { url }, color: MUTED } }], { x: 0.75, y: 2.35 + i * 0.75, w: 8.5, h: 0.32, fontSize: 14, color: MUTED });
  });
  notes(s, {
    time: "0:00 (visí během Q&A)",
    say: "Kdo si chce na krabičku sáhnout sám: Transformer Explainer běží v prohlížeči, všechno co jsme dnes rozebrali tam jde proklikat.",
    point: "Zdroje pro hlubší ponoření.",
    src: "Kompletní seznam se zdroji ke každému tvrzení: sources.md (S1–S12).",
    next: "Q&A.",
  });

  await pres.writeFile({ fileName: "stoparuv-pruvodce-po-llms.pptx" });
  console.log("written stoparuv-pruvodce-po-llms.pptx");
}
build();
