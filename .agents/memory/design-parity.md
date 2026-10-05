---
name: Design parity with original Vite site
description: How to compare this site against the original design source site and what the real differences were
---

- The original design site is a Vite dev SPA that exposes full sources at `/src/<path>` with inline base64 sourcemaps (decode `sourcesContent[0]`). It sleeps when its owner closes the workspace — retry/poll before concluding fetch failure.
- Page-level layout (containers, breakpoints, typography, line-heights) is identical between the two sites; Tailwind v4 (theirs) vs v3 (ours) produced no visible differences. Diffing sorted `className` sets per page is a fast, reliable parity check.
- The only real visual gap was forms: the design uses flat, square inputs (44px, `border-foreground/15`, focus = primary border, no ring) and a flat full-width 45px submit button, with NO card chrome — while our Gravity Forms renderer wrapped everything in a shadcn Card.
- **Why `!important` in `.gf-*` rules:** shadcn Input/Textarea/SelectTrigger carry Tailwind utility classes (h-9, rounded-md, px-3, focus-visible:ring-*) emitted in the utilities layer, which beats component-layer rules at equal specificity. Any future `.gf-*` styling changes to those properties must keep `!important` or move styling into the component classNames.
- WP staging (blakehammondrealty.sherstaging.com) going unreachable makes every SSR page take ~10s-per-fetch timeouts and WP catch-all routes 500 — looks like an app bug but is an upstream outage; check `curl wp-json` reachability first.

## Stale visual captures

Use a fresh Chromium profile with browser network caching disabled for visual verification when captures disagree with current server HTML or generated CSS. Restarting the app or changing the page URL alone may not refresh cached assets.

**Why:** Repeated built-in captures omitted newly added CMS-backed content while a fresh profile rendered it correctly; that original cause was not established. Later, a fresh profile reused stale CSS across iterations and clean app restarts. Disabling network caching and clearing the browser cache made the current CSS take effect.

**How to apply:** Keep checks bounded to the requested viewports, disable browser caching before loading, inspect the rendered element and its geometry, and use current screenshots as evidence. Do not treat stale captures as proof of a frontend defect.

## Drag and touch verification

Keep CDP mouse coordinates inside the browser viewport; test infinite wrapping with repeated in-bounds drags. Use native touch input for swipe and vertical-scroll acceptance, not synthetic pointer events alone.

**Why:** Chromium discarded out-of-window mouse moves during a wraparound check. Native touch verification also exposed implicit pointer capture transferring from a card child to its row, a behavior mouse-only checks did not reveal.

**How to apply:** Exercise both directions and loop boundaries with repeated real gestures, allow the intentional autoplay delay to expire before testing the other row's motion, and verify vertical touch scrolling directly.
