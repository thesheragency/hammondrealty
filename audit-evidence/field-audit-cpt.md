# Testimonial and FAQ CPT field audit

## Scope and decision rule

This audit covers every ACF field on the 3 testimonial posts and 29 FAQ posts in `acf-prewrite-live-backup.json`: **70 fields total**. It compares the backup with the current production HTML snapshots and the source that renders those sections. The governing rule is to preserve current live copy, not to promote component defaults merely because they exist.

No remote write or frontend edit was performed. The machine-readable detail is in `field-audit-cpt.json`; its field names use the ACF REST names (`reviewer_name`, `quote`, `rating`, `platform`, `question`, `answer`).

## Result

- **No ACF changes are justified.** All 70 current ACF values should be preserved.
- All three testimonials' `reviewer_name`, `quote`, and `platform` values correspond to current production rendering.
- Testimonial `rating` is present and set to 5, but the mapper discards it. The section's stars and “5.0” labels are hardcoded, so rating is classified as **preserve, unbound**, not as independently proven visible copy.
- Every FAQ ACF `question` matches its native title and the question shown on production. However, ACF `question` is not what the frontend queries.
- Every FAQ ACF `answer` is currently bypassed. The frontend queries native `content`; all 29 native content values are empty. Consequently, production `/faqs` renders 29 empty answers and its FAQ JSON-LD contains 29 empty `acceptedAnswer.text` values.

## Critical FAQ binding finding

`fetchFaqs()` in `lib/wp-acf.ts:78-88` requests:

- native `title`
- native `content`
- `menuOrder`

It does **not** request `faqFields.question` or `faqFields.answer`. `FaqsPage.tsx:95-96` treats the 29 returned WordPress posts as a valid list, so the hardcoded category fallback is not used. This explains why populated ACF answers coexist with blank production answers.

The JSON audit includes a separate `nativeContentProposal` because native content is not an ACF field:

- **24 exact proposals** are recorded where the same question-specific answer is current shared-page copy in Home, Buying, Selling, Home Prep, or About source/rendering.
- **5 proposals are withheld** for FAQ IDs 61–65. Their wording corresponds only to the inactive `/faqs` fallback. ID 61 also duplicates the live question represented by ID 66. Treating those defaults as live copy would violate the preservation rule.
- These proposals are evidence for a future, separately authorized native-content operation. They are **not remote writes** and are not ACF update recommendations.

## Testimonial evidence

Testimonials 43–45 are rendered on the current Home, About, Buyer, Seller, Home Prep, and Home Value production snapshots. The quotes and reviewer names match the backup. `lib/wp-acf.ts:103-123` maps `reviewerName`, `quote`, and normalized `platform`; `rating` is queried but omitted from the mapped object.

The shared testimonial component also contains frontend copy with no CPT ACF field:

- “Trusted By Homeowners”
- “Rated 5 out of 5 stars based on verified client feedback.”
- “5.0”
- “Google reviews”
- “Zillow reviews”

It also has a larger hardcoded fallback review set. That fallback is not the production source while the three WordPress testimonials are returned, so it was not treated as desired CPT data.

## Shared FAQ sections without FAQ CPT ACF binding

The shared FAQ component hardcodes “Frequently Asked Questions.” Its intro is supplied by page-level ACF or a component default, not FAQ CPT fields. Page-specific FAQ arrays are also hardcoded in:

- `components/pages/HomePage.tsx:144-165`
- `components/pages/BuyingPage.tsx:109-130`
- `components/pages/SellingPage.tsx:138-159`
- `components/pages/HomePrepPage.tsx:142-163`
- `components/pages/AboutPage.tsx:99-116`

Those arrays establish exact current correspondence for 24 FAQ answers, but they do not mean the FAQ CPT ACF fields drive those shared sections.

## Evidence handling

Visible HTML and source rendering were given priority. Next.js script payloads were used only to corroborate component inputs. A script payload is transport data, not visible content, and the JSON audit explicitly labels that limitation.

## Counts by field classification

| CPT | Fields | Classification |
|---|---:|---|
| Testimonial | 9 | Preserve exact live (`quote`, `reviewer_name`, `platform`) |
| Testimonial | 3 | Preserve unbound (`rating`) |
| FAQ | 29 | Preserve exact live question, but renderer uses native title |
| FAQ | 24 | Preserve exact shared copy, but renderer uses empty native content |
| FAQ | 5 | Preserve; inactive-fallback-only answer, no native proposal |
