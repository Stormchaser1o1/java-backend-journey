/**
 * Render smoke test — mounts the real App in jsdom and fails on any
 * console error or thrown exception. Catches broken imports, bad hooks
 * and crashing effects that a successful bundle build would not.
 *
 * Run with: npm run smoke
 */
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><head></head><body><div id="root"></div></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
});

const { window } = dom;

// Minimal browser globals React and the app touch.
globalThis.window = window;
globalThis.document = window.document;
globalThis.HTMLElement = window.HTMLElement;
globalThis.Element = window.Element;
globalThis.Node = window.Node;
globalThis.localStorage = window.localStorage;
globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window);
globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
globalThis.getComputedStyle = window.getComputedStyle.bind(window);

// jsdom ships neither of these.
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  dispatchEvent: () => false,
});
globalThis.matchMedia = window.matchMedia;

class IO {
  constructor(cb) {
    this.cb = cb;
  }
  observe(el) {
    this.cb([{ isIntersecting: true, target: el }], this);
  }
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = IO;
window.IntersectionObserver = IO;

const problems = [];
const origError = console.error;
console.error = (...args) => {
  problems.push(args.map(String).join(' '));
  origError(...args);
};
window.addEventListener('error', (e) => problems.push(`window error: ${e.message}`));

// Load the app through Vite so JSX and CSS imports resolve exactly as they
// do in the real build.
const { createServer } = await import('vite');
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const { default: React } = await import('react');
const { createRoot } = await import('react-dom/client');
const { default: App } = await vite.ssrLoadModule('/src/App.jsx');

const root = createRoot(document.getElementById('root'));
await new Promise((resolve) => {
  root.render(React.createElement(App));
  setTimeout(resolve, 300);
});

const html = document.getElementById('root').innerHTML;

const checks = [
  ['renders non-empty markup', html.length > 800],
  ['renders the hero heading', html.includes('hero-title')],
  ['renders every roadmap phase', (html.match(/class="[^"]*phase /g) || []).length === 14],
  ['renders the stat grid', html.includes('stats-grid')],
  ['renders the progress ring', html.includes('ring-value')],
  ['renders the revision panel', html.includes('revision-list')],
  ['renders module note toggles', (html.match(/has-note/g) || []).length >= 7],
  ['renders the revision-mode button', html.includes('revision-toggle')],
  ['no NaN leaked into the DOM', !html.includes('NaN')],
];

// Every note entry must point at a note file that actually exists on disk,
// and be attached to a module id the roadmap really has.
{
  const { existsSync } = await import('node:fs');
  const { default: notes } = await vite.ssrLoadModule('/src/data/notes.js');
  const { default: progress } = await vite.ssrLoadModule('/src/data/progress.js');

  const moduleKeys = new Set(
    progress.phases.flatMap((p) => p.modules.map((m) => `${p.id}:${m.id}`))
  );

  const orphanKeys = Object.keys(notes).filter((k) => !moduleKeys.has(k));
  const missingFiles = Object.values(notes)
    .map((n) => n.path)
    .filter((p) => !existsSync(new URL(`../../notes/${p}`, import.meta.url)));

  checks.push(
    [`every note maps to a real module${orphanKeys.length ? ` (${orphanKeys})` : ''}`, orphanKeys.length === 0],
    [`every note file exists${missingFiles.length ? ` (${missingFiles})` : ''}`, missingFiles.length === 0]
  );
}

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (!ok) failed++;
}

if (problems.length) {
  console.log(`\nFAIL  ${problems.length} console error(s):`);
  problems.forEach((p) => console.log(`  - ${p}`));
  failed++;
}

await vite.close();

console.log(failed ? `\n${failed} check(s) failed.` : '\nAll checks passed.');
process.exit(failed ? 1 : 0);
