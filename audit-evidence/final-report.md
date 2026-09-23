# WordPress ACF parity — live content preserved

## Result

Audited 599 existing ACF scalar/repeater leaves across 44 published WordPress objects: 12 pages, 3 testimonials, and 29 FAQs. The published post collection was empty. Every existing ACF leaf is represented in `final-field-inventory.json`; coverage gaps: zero.

Updated 44 top-level ACF fields/repeaters on 9 pages, representing 60 changed leaf values or removed repeater rows. All writes were read back successfully through authenticated REST, including field types and complete repeater arrays. Unrelated ACF values were checked unchanged.

The source of truth was the original captured **published visible content**, not workspace defaults or the previous audit. After refreshing the existing content cache, all 12 routes returned HTTP 200 and their server-rendered text and link sequences exactly matched their pre-write captures. This is an HTML comparison, not an interactive or pixel-perfect test. A workspace Home Prep screenshot also confirmed a functioning render.

No frontend files, routes, components, styles, copy, dependency files, WordPress schema, or deployment configuration were changed. No publishing occurred. The existing authenticated content-cache refresh endpoint was invoked to eliminate stale content before final comparison.

## Safeguards

- Confirmed pre-work Git checkpoint: `400c2c1d758c5f575cdcac995485ea16b86e08b3`, “Checkpoint before WordPress ACF parity updates.” This is a repository checkpoint, not a backup of external WordPress.
- Complete external pre-write backup: `acf-prewrite-live-backup.json`, covering all 44 published objects and their full ACF payloads.
- Each page was compared with its backup immediately before writing; concurrent changes would have aborted the operation.
- Full arrays were sent for changed repeaters. Empty image cells were normalized to REST-compatible `null`.
- Existing draft/private records, native WordPress content, and media records were not modified.

## Corrections

| WordPress page | Top-level fields/repeaters written | Main corrections |
|---|---:|---|
| Home | 5 | Live CTA/card links and visible icon keys |
| Buyer | 5 | Visible phone CTA counterpart, live links, icon keys |
| Seller | 8 | Live headings and links; hardcoded prep CTA counterpart |
| About | 3 | Live CTA/card links |
| Home Prep | 13 | Live eyebrow/CTA copy, four worries in their live order, four benefit descriptions, first process step, case copy, two exact image references |
| Home Value | 2 | Existing-but-ignored heading fields aligned to their visible counterparts |
| Connect | 1 | Live phone formatting |
| Book Consultation | 5 | Existing-but-ignored heading, body, expectations, closing copy, scheduling label |
| Booked | 2 | Live button label and destination |

The complete old-to-new values are in `verified-change-log.json`. Full validated write payloads are retained separately. Existing live legacy links such as `/get-in-touch`, `/buying`, and `/selling` were preserved exactly; route cleanup was not part of this task.

## Media limitations — not silently substituted

All 62 image-field usages were examined against 68 existing WordPress media records. Eight usages had byte-identical SHA256 matches; six already referenced the matching IDs. Two blank fields were filled:

- Home Prep `steps[2].image` → media ID 238.
- Home Prep `included_cards[0].image` → media ID 184.

The other 54 usages had no proven byte-identical match or no rendered counterpart. Their existing values were preserved. Each exact path and reason appears in `image-verification.json`.

Specifically, Home Prep `hero_image` remains empty: the visible `/images/prep-hero-roseville.jpg` did not match any downloaded WordPress source/original, including similarly named media ID 192. No replacement was guessed and no new media was uploaded.

GraphQL readback confirmed every updated text/link value, but returned `null` for 14 populated image cells included in changed repeater payloads, including both newly assigned images. REST correctly retains their media IDs. This prevents a claim of complete end-to-end image parity; the frontend continues using its existing local fallbacks. Fixing the WordPress GraphQL image integration would exceed the ACF-values-only scope. See `graphql-readback.json`.

## Preserved and separately classified content

- Existing fields ignored by the frontend are classified separately from content with no ACF field. They were updated only when an exact visible counterpart existed.
- Fields with no visible counterpart, dormant success states, uncertain media, and title-case-only differences were preserved rather than invented or cleared.
- Testimonial ACF names/quotes/platforms match live usage; the rating field is ignored by the hardcoded star display.
- FAQ ACF question/answer values were preserved. The `/faqs` page reads native title/content, not these ACF fields. All 29 native FAQ answers are empty; fixing those answers would require native-content changes outside scope. Shared page-specific FAQ answers were not overwritten.
- Privacy Policy uses native page content and has no ACF fields.
- Shared navigation/footer/CTA copy, form labels/validation/success states, videos, additional Home Prep case-slide images, and local thank-you variants have no corresponding page ACF binding where noted in the detailed audits. They were not changed, and no fields were created.
- Blog and native generic-page rendering do not introduce additional populated published ACF objects in this inventory.

## Evidence guide

- `final-field-inventory.json`: exhaustive per-leaf inventory and final dispositions.
- `acf-prewrite-live-backup.json`: complete pre-write restore source.
- `verified-change-log.json`: old/new values with REST verification.
- `approved-patches.json`, `validated-patches.json`: complete submitted payloads.
- `live-*.html`, `live-acf-payloads.json`: initial production captures; script data was corroboration, not a replacement for rendered evidence.
- `live-postwrite-check.json`: final 12-route preservation comparison.
- `image-verification.json`, `media-inventory.json`: exact image checks and skipped paths.
- `graphql-readback.json`: final GraphQL results and image limitations.
- `field-audit-*.json/.md`, `resolved-live-*.json`: working audit evidence. Initial proposals/classifications are superseded by the resolved evidence, final inventory, and verified change log.

**Completion boundary:** ACF-only updates and the audit are complete. Full media parity is not claimed; unsafe image mappings and the GraphQL resolver limitation are explicitly retained as exceptions.