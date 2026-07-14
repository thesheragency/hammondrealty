---
name: Tailwind v3 + Turbopack CSS quirks
description: CSS rules that crash or warn in this Next.js 16 (Turbopack) + Tailwind v3 setup
---

- Custom rules with compound selectors that reference Tailwind utility class names (e.g. `.border.hover-elevate::after`) must be placed **outside** `@layer utilities`. Inside the layer, Tailwind generates variants for them (e.g. `.after\:border...::after::before`), which fails Turbopack's CSS parser and 500s every page.
- **Why:** Tailwind treats anything in `@layer utilities` as a utility eligible for variant expansion.
- **How to apply:** keep the elevate interaction system and similar compound-selector CSS in plain (unlayered) CSS in `app/globals.css`.
- A `theme.extend.screens` entry with units different from the defaults (e.g. `lg: "80rem"` vs px defaults) triggers "min-*/max-* variants are not supported with mixed units". Use px (`lg: "1280px"`).
