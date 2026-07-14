---
name: Design parity with original Vite site
description: How to compare this site against the original design source site and what the real differences were
---

- The original design site is a Vite dev SPA that exposes full sources at `/src/<path>` with inline base64 sourcemaps (decode `sourcesContent[0]`). It sleeps when its owner closes the workspace — retry/poll before concluding fetch failure.
- Page-level layout (containers, breakpoints, typography, line-heights) is identical between the two sites; Tailwind v4 (theirs) vs v3 (ours) produced no visible differences. Diffing sorted `className` sets per page is a fast, reliable parity check.
- The only real visual gap was forms: the design uses flat, square inputs (44px, `border-foreground/15`, focus = primary border, no ring) and a flat full-width 45px submit button, with NO card chrome — while our Gravity Forms renderer wrapped everything in a shadcn Card.
- **Why `!important` in `.gf-*` rules:** shadcn Input/Textarea/SelectTrigger carry Tailwind utility classes (h-9, rounded-md, px-3, focus-visible:ring-*) emitted in the utilities layer, which beats component-layer rules at equal specificity. Any future `.gf-*` styling changes to those properties must keep `!important` or move styling into the component classNames.
- WP staging (blakehammondrealty.sherstaging.com) going unreachable makes every SSR page take ~10s-per-fetch timeouts and WP catch-all routes 500 — looks like an app bug but is an upstream outage; check `curl wp-json` reachability first.
