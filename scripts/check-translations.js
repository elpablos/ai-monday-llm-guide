// Both language editions must stay navigable at the same slide/build coordinates.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
function load(language) {
  const directory = path.join(root, 'html', language);
  const context = vm.createContext({ window: {} });
  for (const name of ['slides.js', 'notes.js']) {
    vm.runInContext(fs.readFileSync(path.join(directory, name), 'utf8'), context);
  }
  const { SLIDES: slides, NOTES: notes } = context.window;
  assert.equal(new Set(slides.map(s => s.id)).size, slides.length, 'Duplicate slide IDs');
  assert.equal(Object.keys(notes).length, slides.length, 'Orphaned or missing notes');
  return slides.map(slide => {
    assert.ok(notes[slide.id], `Missing notes: ${language}/${slide.id}`);
    for (const heading of language ? ['SAY:', 'POINT:', 'TRANSITION:'] : ['ŘÍCT:', 'POINTA:', 'PŘECHOD:']) {
      assert.ok(notes[slide.id].includes(heading), `Missing ${heading}: ${language}/${slide.id}`);
    }
    for (const [, src] of slide.html.matchAll(/src="([^"]+)"/g)) {
      assert.ok(fs.existsSync(path.resolve(directory, src)), `Missing asset: ${src}`);
    }
    return {
      id: slide.id,
      era: slide.era,
      builds: Array.from(slide.html.matchAll(/data-(step|until|on)="(\d+)"/g), m => `${m[1]}:${m[2]}`).sort(),
      time: notes[slide.id].match(/⏱\s*(\d+:\d+)/)?.[1]
    };
  });
}
const cs = load('');
const en = load('en');
assert.deepEqual(JSON.parse(JSON.stringify(en)), JSON.parse(JSON.stringify(cs)), 'Language editions have different slide IDs, eras, builds or timings');
console.log(`Czech / English parity: ${cs.length} slides; notes, builds, timing and assets OK.`);
