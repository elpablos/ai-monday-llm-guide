// Deck runtime: navigation, builds, notes, overview, print. No dependencies.
(() => {
  const SLIDES = window.SLIDES, NOTES = window.NOTES || {};
  const deck = document.querySelector(".deck");
  const notesEl = document.querySelector(".notes");
  const counter = document.querySelector(".counter");
  const body = document.body;

  const eras = [
    ["markov", "1913", "Markov"], ["shannon", "1948 / 51", "Shannon"],
    ["ngrams", "70.–90. léta", "n-gramy"], ["bengio", "2003", "Bengio"],
    ["mikolov", "2010", "Mikolov"], ["word2vec", "2013", "word2vec"],
    ["transformer", "2017", "Transformer"], ["gpt", "2018+", "GPT"],
    ["chatgpt", "2022+", "ChatGPT"], ["today", "dnes", "Nástroje"]
  ];
  const navigation = document.querySelector(".expedition");
  const range = document.querySelector("#slide-position");
  range.max = SLIDES.length;
  const destinations = eras.map(([id]) => SLIDES.findIndex(s => s.era === id));
  const eraButtons = eras.map(([id, year, label], n) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "era-stop";
    button.dataset.era = id;
    button.innerHTML = `<span class="era-year">${year}</span><span class="era-dot" aria-hidden="true"></span><span class="era-name">${label}</span>`;
    button.setAttribute("aria-label", `${year}: ${label}, přejít na zastávku`);
    button.disabled = destinations[n] < 0;
    button.addEventListener("click", (event) => {
      if (body.classList.contains("overview")) toggleOverview(false);
      go(destinations[n]);
      if (event.detail > 0) button.blur();
    });
    document.querySelector(".era-stops").appendChild(button);
    return button;
  });
  range.addEventListener("input", () => go(+range.value - 1));

  // ---- Build DOM ----------------------------------------------------------
  const els = SLIDES.map((s, i) => {
    const sec = document.createElement("section");
    sec.className = "slide";
    sec.dataset.id = s.id;
    sec.dataset.era = s.era || "opening";
    sec.setAttribute("aria-label", `Slide ${i + 1} z ${SLIDES.length}`);
    sec.innerHTML = `<div class="inner">${s.html}</div>`;
    const stopHeader = sec.querySelector(".stop");
    if (stopHeader && window.ERA_DOODLES?.[s.era]) {
      stopHeader.insertAdjacentHTML("beforeend", window.ERA_DOODLES[s.era]);
    }
    const printTrail = document.createElement("div");
    printTrail.className = "print-trail";
    printTrail.innerHTML = eras.map(([id, year, label]) => `<span${id === s.era ? ' class="current"' : ''}>${year} ${label}</span>`).join(" · ");
    sec.appendChild(printTrail);
    deck.appendChild(sec);
    const pn = document.createElement("div");
    pn.className = "print-note";
    pn.textContent = `${i + 1}. ${s.id}\n\n${NOTES[s.id] || ""}`;
    deck.appendChild(pn);
    return sec;
  });
  const maxStep = els.map((el) => {
    let m = 0;
    el.querySelectorAll("[data-step],[data-until],[data-on]").forEach((n) => {
      m = Math.max(m, +(n.dataset.step || 0), +(n.dataset.until || 0), +(n.dataset.on || 0));
    });
    return m;
  });

  // ---- State --------------------------------------------------------------
  let idx = 0, step = 0;
  let t0 = null;

  function setBuild(el, i, s) {
    el.querySelectorAll("[data-step]").forEach((n) => n.classList.toggle("is-hidden", s < +n.dataset.step));
    el.querySelectorAll("[data-until]").forEach((n) => {
      const hidden = s >= +n.dataset.until || (n.dataset.step && s < +n.dataset.step);
      n.classList.toggle("is-hidden", !!hidden);
    });
    el.querySelectorAll("[data-on]").forEach((n) => n.classList.toggle("on", s >= +n.dataset.on));
    for (let k = 0; k <= maxStep[i]; k++) el.classList.toggle("s" + k, k <= s);
    el.dataset.now = s;
  }
  // Overview and print show every slide in its final build state.
  const showAllFinal = () => els.forEach((el, i) => setBuild(el, i, maxStep[i]));

  function apply() {
    els.forEach((el, i) => el.classList.toggle("is-active", i === idx));
    setBuild(els[idx], idx, step);
    counter.textContent = `${idx + 1} / ${SLIDES.length}`;
    document.documentElement.style.setProperty("--progress", ((idx + (maxStep[idx] ? step / (maxStep[idx] + 1) : 0)) / (SLIDES.length - 1)) * 100 + "%");
    const h = `#/${idx + 1}` + (step ? `/${step}` : "");
    if (location.hash !== h) history.replaceState(null, "", h);
    range.value = idx + 1;
    range.setAttribute("aria-valuetext", `Slide ${idx + 1} z ${SLIDES.length}: ${els[idx].querySelector("h1,h2")?.textContent || SLIDES[idx].id}`);
    const eraIndex = eras.findIndex(([id]) => id === SLIDES[idx].era);
    navigation.classList.toggle("intro", eraIndex < 0);
    navigation.classList.toggle("historical", eraIndex >= 0 && eraIndex < 7);
    eraButtons.forEach((button, n) => {
      button.classList.toggle("past", n < eraIndex);
      button.classList.toggle("current", n === eraIndex);
      if (n === eraIndex) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    document.querySelector(".era-caption").textContent = eraIndex < 0 ? "Začínáme výpravu" : `${eras[eraIndex][1]} · ${eras[eraIndex][2]}`;
    if (eraIndex >= 0) eraButtons[eraIndex].scrollIntoView({block:"nearest", inline:"nearest"});
    renderNotes();
  }

  function go(i, s = 0) {
    idx = Math.max(0, Math.min(SLIDES.length - 1, i));
    step = Math.max(0, Math.min(maxStep[idx], s));
    if (t0 === null && (idx || step)) t0 = Date.now();
    apply();
  }
  const next = () => (step < maxStep[idx] ? go(idx, step + 1) : idx < SLIDES.length - 1 && go(idx + 1, 0));
  const prev = () => (step > 0 ? go(idx, step - 1) : idx > 0 && go(idx - 1, maxStep[idx - 1]));

  function fromHash() {
    const m = location.hash.match(/^#\/(\d+)(?:\/(\d+))?/);
    if (m) go(+m[1] - 1, +(m[2] || 0)); else go(0, 0);
  }

  // ---- Notes ----------------------------------------------------------------
  const esc = (t) => t.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
  function renderNotes() {
    if (!body.classList.contains("notes-open")) return;
    const s = SLIDES[idx];
    const txt = esc(NOTES[s.id] || "Bez poznámek.")
      .replace(/^([A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ /()]+:|⏱[^\n]*)/gm, '<span class="k">$1</span>');
    const el = Math.floor((t0 ? Date.now() - t0 : 0) / 1000);
    notesEl.innerHTML = `<header><span>Slide ${idx + 1} z ${SLIDES.length}, krok ${step} z ${maxStep[idx]}</span><span class="timer">${String(Math.floor(el / 60)).padStart(2, "0")}:${String(el % 60).padStart(2, "0")}</span></header>${txt}`;
  }
  setInterval(() => { if (body.classList.contains("notes-open")) { const t = notesEl.querySelector(".timer"); if (t) { const e = Math.floor((t0 ? Date.now() - t0 : 0) / 1000); t.textContent = `${String(Math.floor(e / 60)).padStart(2, "0")}:${String(e % 60).padStart(2, "0")}`; } } }, 1000);

  // ---- Layout ---------------------------------------------------------------
  function fit() {
    const vp = document.querySelector(".viewport").getBoundingClientRect();
    const sc = Math.min(vp.width / 1600, vp.height / 900);
    deck.style.setProperty("--scale", sc);
  }
  window.addEventListener("resize", fit);

  // ---- Modes ----------------------------------------------------------------
  function toggleNotes() { body.classList.toggle("notes-open"); fit(); renderNotes(); }
  function toggleOverview(on = !body.classList.contains("overview")) {
    body.classList.toggle("overview", on);
    if (on) { showAllFinal(); els[idx].scrollIntoView({ block: "center" }); } else { fit(); apply(); }
  }
  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  }
  function print(withNotes) {
    body.classList.toggle("print-notes", !!withNotes);
    window.print();
  }
  window.addEventListener("beforeprint", showAllFinal);
  window.addEventListener("afterprint", () => { body.classList.remove("print-notes"); if (!body.classList.contains("overview")) apply(); });

  // ---- Input ----------------------------------------------------------------
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    // Keep native slider/button keyboard interaction; Escape returns to the deck.
    if (e.target.closest("button,input,select,textarea,a")) {
      if (k === "Escape") e.target.blur();
      return;
    }
    if (body.classList.contains("overview")) {
      if (k === "Escape" || k === "o" || k === "O" || k === "Enter") { toggleOverview(false); e.preventDefault(); }
      else if (k === "ArrowRight") go(idx + 1, 0);
      else if (k === "ArrowLeft") go(idx - 1, 0);
      return;
    }
    if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(k)) { next(); e.preventDefault(); }
    else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(k)) { prev(); e.preventDefault(); }
    else if (k === "Home") go(0, 0);
    else if (k === "End") go(SLIDES.length - 1, maxStep[SLIDES.length - 1]);
    else if (k === "f" || k === "F") toggleFullscreen();
    else if (k === "n" || k === "N") toggleNotes();
    else if (k === "o" || k === "O") toggleOverview(true);
    else if (k === "p") print(false);
    else if (k === "P") print(true);
    else if (k === "t" || k === "T") { t0 = Date.now(); renderNotes(); }
    else if (k === "?") body.classList.toggle("show-help");
  });

  deck.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    if (body.classList.contains("overview")) {
      const sec = e.target.closest(".slide");
      if (sec) { go(els.indexOf(sec), 0); toggleOverview(false); }
      return;
    }
    const r = deck.getBoundingClientRect();
    (e.clientX - r.left) < r.width / 3 ? prev() : next();
  });

  let tx = null, ty = null;
  document.addEventListener("touchstart", (e) => { if (e.target.closest(".expedition,.notes,a,button,input")) { tx = null; return; } tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (tx === null || body.classList.contains("overview")) return;
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next() : prev());
    tx = null;
  }, { passive: true });

  window.addEventListener("hashchange", fromHash);
  fit();
  fromHash();
})();
