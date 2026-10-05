---
name: Headless content edit boundaries
description: User's rules for content changes and tightly scoped visual edits.
---

All page content is managed in WordPress using ACF fields and pulled into the frontend through the WP API. New text, quotes, ratings, button labels, and links must use ACF fields rather than frontend literals. Empty new fields hide their corresponding elements without hardcoded fallback content.

Before changing text, check whether it is hardcoded in the component or fetched from WordPress. For WordPress-sourced text, do not hardcode over it: tell the user exactly which WordPress page and field to update.

Only change what the prompt asks for. Do not touch other sections, pages, or existing copy, colors, fonts, and spacing unless told to.

Check desktop and mobile at 375px before finishing visual edits.

**Why:** The user explicitly stated these constraints for this headless site and corrected a new hero line that had been hardcoded instead of managed through ACF.

**How to apply:** Apply these boundaries to future text and visual changes in this project.
