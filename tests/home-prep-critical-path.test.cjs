const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const loadConfig = require("tailwindcss/loadConfig");

const config = loadConfig(path.resolve("tailwind.config.ts"));
for (const suffix of [
  "components/pages/HomePrepPage.tsx",
  "components/home-prep/BeforeAfterCarousel.tsx",
  "components/home-prep/IncludedSection.tsx",
  "components/home-prep/FaqIsland.tsx",
  "components/site/ReviewMarquee.tsx",
  "components/ui/VimeoFacade.tsx",
  "components/pages/BookConsultationPage.tsx",
]) {
  assert(config.content.some(file => file.endsWith(suffix)), `${suffix} CSS must be retained`);
}
assert(config.content.some(file => file.includes("/modules/landing-builder/")));
assert(config.content.every(file => fs.existsSync(file)));

const html = fs.readFileSync(".next/server/app/home-prep-program.html", "utf8");
assert.equal([...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)].length, 0);
assert.equal([...html.matchAll(/<link\b[^>]*as="font"[^>]*>/g)].length, 1);
assert(html.includes("q=60"), "Hero optimizer quality");
assert(html.includes("calc(100vw - 32px)"), "Mobile image uses its actual container width");
assert(html.includes('<div class="max-w-3xl"><p'), "Hero remains server-visible");
assert(html.includes("<style"), "Initial CSS is present in the HTML");
const manifest = JSON.parse(fs.readFileSync(".next/prerender-manifest.json", "utf8"));
assert.equal(manifest.routes["/home-prep-program"].initialRevalidateSeconds, 300);
console.log("PASS: reachable/lazy/CMS CSS retained, CSS inlined, one font preload, hero quality/sizing, unchanged ISR.");
