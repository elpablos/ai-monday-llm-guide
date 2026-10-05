// Original monochrome field-note drawings. Decorative objects, not portraits or diagrams of real models.
(() => {
  const drawings = {
    markov: `<path d="M12 20 Q30 14 47 22 Q65 13 82 19 L81 75 Q62 68 47 78 Q29 69 13 76 Z M47 22 V78 M21 31 L37 30 M21 42 L38 40 M21 53 L36 53 M58 30 L74 28 M58 41 L72 40"/><path d="M25 83 Q49 88 75 82"/>`,
    shannon: `<path d="M10 22 L77 18 L82 65 L48 66 L30 80 L32 67 L13 70 Z"/><text x="26" y="52" font-size="27" stroke="none" fill="currentColor" font-family="monospace">A?</text><path d="M82 10 L89 5 M86 18 L94 16"/>`,
    ngrams: `<path d="M15 14 L79 17 L81 81 L13 78 Z M15 36 L79 38 M14 58 L80 60 M36 15 L35 79 M57 16 L57 80 M21 24 L28 28 M42 45 L49 45 M65 68 L74 68 M21 64 L28 71 M28 64 L21 71"/>`,
    bengio: `<circle cx="22" cy="26" r="9"/><circle cx="21" cy="68" r="9"/><circle cx="51" cy="43" r="9"/><circle cx="79" cy="24" r="9"/><circle cx="77" cy="70" r="9"/><path d="M30 29 L42 39 M29 64 L44 49 M59 38 L71 29 M58 50 L70 64 M49 52 L49 76"/>`,
    mikolov: `<path d="M16 28 L66 26 L69 66 L17 68 Z M26 37 L56 36 M27 46 L48 45 M66 46 Q88 45 83 76 Q80 88 48 86 L29 84 M38 76 L28 84 L37 91"/><circle cx="79" cy="15" r="5"/>`,
    word2vec: `<path d="M13 12 L42 15 L43 40 L11 39 Z M53 49 L84 46 L86 77 L54 80 Z M25 47 L27 69 L46 67 M39 61 L47 67 L40 74"/><text x="19" y="32" font-size="20" stroke="none" fill="currentColor" font-family="monospace">a</text><text x="62" y="69" font-size="20" stroke="none" fill="currentColor" font-family="monospace">b</text>`,
    transformer: `<path d="M16 18 L78 16 L80 37 L18 38 Z M16 46 L77 44 L79 65 L17 67 Z M31 74 L33 87 M48 73 L50 85 M67 73 L66 88"/><circle cx="30" cy="27" r="3"/><circle cx="48" cy="26" r="3"/><circle cx="66" cy="25" r="3"/><path d="M29 56 L41 55 M49 54 L68 54"/>`,
    gpt: `<path d="M19 13 L67 13 L79 27 L78 81 L17 83 Z M67 14 L66 29 L79 28 M29 39 L65 38 M28 49 L62 49 M28 60 L48 60 M28 71 L39 71"/><path d="M53 70 L68 69 M63 63 L69 69 L63 76"/>`,
    chatgpt: `<path d="M9 13 L64 15 L63 47 L31 48 L18 60 L19 46 L10 45 Z M69 35 L85 34 L86 72 L77 73 L81 86 L62 73 L41 74 L40 55"/><circle cx="24" cy="29" r="1"/><circle cx="37" cy="30" r="1"/><circle cx="50" cy="30" r="1"/><path d="M52 61 L72 61"/>`,
    today: `<path d="M16 12 L67 14 L70 83 L14 82 Z M23 23 L59 23 L60 40 L23 39 Z M25 52 L32 52 M43 52 L50 52 M25 64 L32 64 M43 64 L50 64 M25 75 L32 75 M58 53 L59 74"/><path d="M77 23 L89 14 M82 36 L94 36"/>`
  };
  window.ERA_DOODLES = Object.fromEntries(Object.entries(drawings).map(([id, paths]) => [id,
    `<svg class="era-doodle" aria-hidden="true" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`]));
})();
