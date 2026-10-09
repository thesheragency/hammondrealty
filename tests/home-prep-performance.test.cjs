const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

// Test the actual animation hook with deterministic DOM/observer/RAF fixtures.
// No browser, external requests, or analytics events are involved.
let effect, cleanup, resize, intersection, layoutReads = 0, clock = 0, frameId = 0;
const frames = new Map(), documentListeners = new Map();
const viewport = {
  setPointerCapture() {}, hasPointerCapture() { return false; },
  releasePointerCapture() {}, setAttribute() {}, removeAttribute() {},
};
const track = {
  style: {},
  firstElementChild: { getBoundingClientRect() { layoutReads++; return { width: 1000 }; } },
};
const refs = [viewport, track];
const moduleStub = { exports: {} };
const source = fs.readFileSync("hooks/useDraggableMarquee.ts", "utf8");
const javascript = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const documentStub = {
  hidden: false,
  addEventListener: (name, fn) => documentListeners.set(name, fn),
  removeEventListener: name => documentListeners.delete(name),
};
vm.runInNewContext(javascript, {
  module: moduleStub, exports: moduleStub.exports,
  require: name => {
    assert.equal(name, "react");
    return {
      useRef: value => ({ current: refs.length ? refs.shift() : value }),
      useEffect: fn => { effect = fn; },
    };
  },
  performance: { now: () => clock },
  window: { matchMedia: () => ({
    matches: false, addEventListener() {}, removeEventListener() {},
  }) },
  document: documentStub,
  ResizeObserver: class {
    constructor(fn) { resize = fn; } observe() {} disconnect() {}
  },
  IntersectionObserver: class {
    constructor(fn) { intersection = fn; } observe() {} disconnect() {}
  },
  requestAnimationFrame: fn => { frames.set(++frameId, fn); return frameId; },
  cancelAnimationFrame: id => frames.delete(id),
});
const { handlers } = moduleStub.exports.useDraggableMarquee("left");
cleanup = effect();
resize([{ borderBoxSize: [{ inlineSize: 1000 }] }]);
assert.equal(layoutReads, 0, "Measurements use observer-provided width");
assert.equal(frames.size, 0, "No RAF loop before the section approaches the viewport");
intersection([{ isIntersecting: true }]);
assert.equal(frames.size, 1);
const tick = () => {
  const [id, fn] = frames.entries().next().value;
  frames.delete(id);
  clock += 16;
  fn(clock);
};
const before = track.style.transform;
for (let i = 0; i < 10; i++) tick();
assert.notEqual(track.style.transform, before, "Autoplay moves the row");
assert.equal(layoutReads, 0, "Animation frames perform no layout reads");
const event = {
  pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0,
  clientX: 100, clientY: 20, currentTarget: viewport, preventDefault() {},
};
handlers.onPointerDown(event);
const beforeDrag = track.style.transform;
clock += 16;
handlers.onPointerMove({ ...event, clientX: 220 });
assert.notEqual(track.style.transform, beforeDrag, "Pointer drag still moves the row");
handlers.onPointerUp(event);
assert.equal(layoutReads, 0, "Dragging uses cached dimensions");
intersection([{ isIntersecting: false }]);
assert.equal(frames.size, 0, "RAF stops off-screen");
intersection([{ isIntersecting: true }]);
documentStub.hidden = true;
documentListeners.get("visibilitychange")();
assert.equal(frames.size, 0, "RAF stops in a hidden tab");
documentStub.hidden = false;
documentListeners.get("visibilitychange")();
assert.equal(frames.size, 1, "RAF resumes when visible");
cleanup();
assert.equal(frames.size, 0);
assert.equal(documentListeners.size, 0);

const home = fs.readFileSync("components/pages/HomePrepPage.tsx", "utf8");
assert(!home.includes('"use client"'), "Home Prep is a server component");
assert(!home.includes("motion."), "No page-wide animation library");
assert(home.includes('<div className="max-w-3xl">'), "Hero has no animation visibility gate");
const deferred = fs.readFileSync("components/home-prep/DeferredIsland.tsx", "utf8");
for (const name of ["case", "included", "reviews", "faq", "video"]) {
  assert(deferred.includes(`${name}: dynamic(`), `${name} uses a separate lazy chunk`);
}
assert(deferred.includes("{near && ("), "Lazy imports render only near the viewport");
const gtm = fs.readFileSync("components/scripts/GlobalScripts.tsx", "utf8");
assert(gtm.includes('strategy="afterInteractive"'));
assert(gtm.includes("fetchAcfGlobalScripts"), "Tracking remains CMS-owned");
const widget = fs.readFileSync("components/scripts/EquallyWidget.tsx", "utf8");
assert(widget.includes('"lazyOnload"'));
console.log("PASS: cached marquee measurements, viewport/visibility RAF gating, drag, cleanup, server hero, five deferred islands, CMS-owned deferred tracking.");
