# Corrected ACF content parity audit

Source of truth: frontend fallback/hardcoded/local values documented in `/tmp/acf-audit-a.md` and `/tmp/acf-audit-b.md`; current values are from `acf-backup-2026-09-23.json`. MATCH rows are omitted. Route `/` is used for the Home page. Repeater paths are expanded individually; selected-but-ignored fields are excluded from the mismatch table unless an exact frontend value exists.

## MISMATCH / ACF EMPTY

| route/object ID | full ACF field path | inferred field type | current WP value (concise but exact) | intended frontend value (concise but exact) | source | status |
|---|---|---|---|---|---|---|
| `/` (94) | `heroCtaLink` | URL | `/get-in-touch` | `/connect` | fallback | MISMATCH |
| `/` (94) | `processCtaLink` | URL | `/get-in-touch` | `/connect` | fallback | MISMATCH |
| `/` (94) | `whyCtaLink` | URL | `/get-in-touch` | `/connect` | fallback | MISMATCH |
| `/buyer` (86) | `heroCtaLink` | URL | `/get-in-touch` | `/connect` | fallback (selected but ignored) | MISMATCH |
| `/seller` (88) | `heroCtaLink` | URL | `/get-in-touch` | `/connect` | fallback | MISMATCH |
| `/seller` (88) | `whyCtaLink` | URL | `/get-in-touch` | `/connect` | fallback | MISMATCH |
| `/seller` (88) | `prepCtaLink` | URL | `/get-in-touch` | `/connect` | fallback (selected but ignored) | MISMATCH |
| `/seller` (88) | `zillowCtaLink` | URL | `/get-in-touch` | `/connect` | fallback | MISMATCH |
| `/about` (84) | `heroCtaLink` | URL | `/get-in-touch` | `/connect` | fallback | MISMATCH |
| `/about` (84) | `bioCtaLink` | URL | `/get-in-touch` | `/connect` | fallback | MISMATCH |
| `/booked` (76) | `buttonLink` | URL | `/thank-you` | `/` | fallback | MISMATCH |
| `/` (94) | `heroGraphicImage` | image | empty | `/images/graphic-hero_section_1779377398567.png` | local | ACF EMPTY |
| `/` (94) | `heroBedroomImage` | image | empty | `/images/4090_Sylvan_Gen_ln._Roseville_CA_95747-42_1779384768951.jpg` | local | ACF EMPTY |
| `/` (94) | `mastersClubImage` | image | empty | `/images/Mask_group_1780678314549.png` | local | ACF EMPTY |
| `/` (94) | `whyImage` | image | empty | `/images/A7406979-2_1782404791199.jpg` | local | ACF EMPTY |
| `/` (94) | `processBuyingSteps[0].image` | image | empty | `/images/step-buying-1-search.png` | local | ACF EMPTY |
| `/` (94) | `processBuyingSteps[1].image` | image | empty | `/images/step-buying-2-find.png` | local | ACF EMPTY |
| `/` (94) | `processBuyingSteps[2].image` | image | empty | `/images/step-buying-3-offer.png` | local | ACF EMPTY |
| `/` (94) | `processSellingSteps[0].image` | image | empty | `/images/process-discover-needs.png` | local | ACF EMPTY |
| `/` (94) | `processSellingSteps[1].image` | image | empty | `/images/step-selling-2-stage.png` | local | ACF EMPTY |
| `/` (94) | `processSellingSteps[2].image` | image | empty | `/images/step-selling-3-offers.png` | local | ACF EMPTY |
| `/` (94) | `processSellingSteps[3].image` | image | empty | `/images/4090_Sylvan_Gen_ln._Roseville_CA_95747-24_1780678783964.jpg` | local | ACF EMPTY |
| `/` (94) | `processPreparingSteps[0].image` | image | empty | `/images/step-preparing-1-audit.png` | local | ACF EMPTY |
| `/` (94) | `processPreparingSteps[1].image` | image | empty | `/images/step-preparing-2-updates.png` | local | ACF EMPTY |
| `/` (94) | `processPreparingSteps[2].image` | image | empty | `/images/process-preparing.png` | local | ACF EMPTY |
| `/` (94) | `processPreparingSteps[3].image` | image | empty | `/images/step-preparing-4-funding.png` | local | ACF EMPTY |
| `/` (94) | `processPreparingSteps[4].image` | image | empty | `/images/step-preparing-3-launch.png` | local | ACF EMPTY |
| `/buyer` (86) | `whyCtaLink` | URL | `/get-in-touch` | `/connect` | fallback | MISMATCH |
| `/buyer` (86) | `processCtaLink` | URL | `/get-in-touch` | `/connect` | fallback | MISMATCH |
| `/buyer` (86) | `tips[0].image` | image | empty | local default tip image (index 0) | local | ACF EMPTY |
| `/buyer` (86) | `tips[1].image` | image | empty | local default tip image (index 1) | local | ACF EMPTY |
| `/buyer` (86) | `tips[2].image` | image | empty | local default tip image (index 2) | local | ACF EMPTY |
| `/buyer` (86) | `tips[3].image` | image | empty | local default tip image (index 3) | local | ACF EMPTY |
| `/buyer` (86) | `tips[4].image` | image | empty | local default tip image (index 4) | local | ACF EMPTY |
| `/buyer` (86) | `tips[5].image` | image | empty | local default tip image (index 5) | local | ACF EMPTY |
| `/buyer` (86) | `steps[0].image` | image | empty | local default process image (index 0) | local | ACF EMPTY |
| `/buyer` (86) | `steps[1].image` | image | empty | local default process image (index 1) | local | ACF EMPTY |
| `/buyer` (86) | `steps[2].image` | image | empty | local default process image (index 2) | local | ACF EMPTY |
| `/seller` (88) | `processHeading` | text | `Minimize Days on Market` | `Sell Your Home as Quickly as Possible` | fallback | MISMATCH |
| `/seller` (88) | `prepHeading` | text | `Home Prep Program` | `Make Your Home as Valuable as Possible` | fallback | MISMATCH |
| `/seller` (88) | `prepBody` | textarea | `We handle the entire preparation process from start to finish with zero out-of-pocket costs, ensuring your house is ready to hit the market for top dollar.` | `We prepare your home for sale. You pay nothing until it's sold.` | hardcoded | MISMATCH |
| `/seller` (88) | `processCtaLink` | URL | `/get-in-touch` | `/connect` | fallback | MISMATCH |
| `/seller` (88) | `prepBeforeImage` | image | empty | `/images/prep-bedroom-before.jpg` | local | ACF EMPTY |
| `/seller` (88) | `prepAfterImage` | image | empty | `/images/prep-bedroom-after.jpg` | local | ACF EMPTY |
| `/seller` (88) | `zillowImage` | image | empty | `/images/A7407000-2_1782405532776.jpg` | local | ACF EMPTY |
| `/about` (84) | `heroImage` | image | empty | `/images/B1B889F6-9C80-4F33-A424-863BFD5EBF72_1_1779913878628.png` | local | ACF EMPTY |
| `/about` (84) | `portraitImage` | image | empty | `/images/B1B889F6-9C80-4F33-A424-863BFD5EBF72_1779913575853.png` | local | ACF EMPTY |
| `/home-value-analysis` (82) | `heroImage` | image | empty | `/images/4090_Sylvan_Gen_ln._Roseville_CA_95747-42_1779384768951.jpg` | local | ACF EMPTY |
| `/home-prep-program` (90) | `heroEyebrow` | text | `WE PREPARE YOUR HOME FOR SALE YOU PAY NOTHING UNTIL ITS SOLD` | `Home Prep Selling Program` | fallback | MISMATCH |
| `/home-prep-program` (90) | `heroHeading` | text | `Sell Your Home For Top Dollar Without The Hassle` | `We Prepare Your Home For Sale. You Pay Nothing Until It's Sold.` | fallback | MISMATCH |
| `/home-prep-program` (90) | `heroBody` | textarea | `We handle everything needed to get your home ready to sell — repairs, updates, cleaning, and staging. We even cover the costs upfront, so you don't have to manage the work or pay anything until your home sells.` | `I front the cost of all repairs, updates, and staging to get your home market-ready. You pay nothing out of pocket—everything is settled from your sale proceeds at closing.` | hardcoded | MISMATCH |
| `/home-prep-program` (90) | `heroCtaText` | text | `Schedule A Free Call` | `Schedule a Home Prep Consultation` | fallback | MISMATCH |
| `/home-prep-program` (90) | `familiarImage` | image | empty | `/images/sound-familiar-stressed-seller.png` | local | ACF EMPTY |
| `/home-prep-program` (90) | `familiarWorries[3].text` | text | `"Who should I hire to do it?"` | `"What should I leave?"` | fallback | MISMATCH |
| `/home-prep-program` (90) | `familiarWorries[4].text` | text | row absent | `"What should I repair?"` | fallback | ACF EMPTY |
| `/home-prep-program` (90) | `familiarWorries[5].text` | text | row absent | `"Who should I hire to do it?"` | fallback | ACF EMPTY |
| `/home-prep-program` (90) | `whyImage` | image | empty | `/images/prep-home-aerial.jpg` | local | ACF EMPTY |
| `/home-prep-program` (90) | `whyBody` | textarea | `On average, clients who use our Home Prep Program sell for 10–15% more than their home’s estimated as-is value.\r\n\r\nWe handle everything needed to get your home ready to sell, so you can get top dollar without the hassle.` | `Buyers reward homes that show better than the competition. This turnkey renovation program quietly removes every friction point without you writing a check before closing.` | fallback | MISMATCH |
| `/home-prep-program` (90) | `familiarCtaText` | text | `Schedule A Free Call` | `Schedule a Home Prep Consultation` | fallback | MISMATCH |
| `/home-prep-program` (90) | `whyCtaText` | text | `Schedule A Free Call` | `Schedule a Home Prep Consultation` | fallback | MISMATCH |
| `/home-prep-program` (90) | `processHeading` | text | `100% Funded\r\nRenovations` | `How the Home Prep Program Works` | hardcoded | MISMATCH (selected but ignored) |
| `/home-prep-program` (90) | `processSubtitle` | text | empty | `5 steps to a stress-free, high-profit sale.` | fallback | ACF EMPTY |
| `/home-prep-program` (90) | `processCtaText` | text | `Schedule A Free Call` | `Schedule a Home Prep Consultation` | fallback | MISMATCH |
| `/home-prep-program` (90) | `caseBullets[1].text` | text | `Sold for $75,000 over the as-is property valuation before renovations.` | `Sold for $75,000 more than the as-is value, netting the seller $50,000 more after repair costs.` | fallback | MISMATCH |
| `/home-prep-program` (90) | `caseCtaText` | text | `Schedule A Free Call` | `Schedule a Home Prep Consultation` | fallback | MISMATCH |
| `/home-prep-program` (90) | `caseBeforeImage` | image | empty | `/images/prep-roseville-before.jpg` | local | ACF EMPTY |
| `/home-prep-program` (90) | `caseAfterImage` | image | empty | `/images/prep-roseville-after.jpg` | local | ACF EMPTY |
| `/connect` (80) | `phone` | phone/text | `916-625-6118` | `(916) 625-6118` display value | fallback | MISMATCH (format) |
| `/booked` (76) | `buttonText` | text | `Get In Touch` | `Back To Home` | fallback | MISMATCH |

`/home-value-analysis` `formHeading` is intentionally not included above: although its WP value differs from the hardcoded frontend heading, the selected ACF field is ignored; it is reported below with ignored selections.

## Additional mismatches found during completion review

These rendered ACF paths were found by a second systematic component-to-REST comparison and were included in the approved update scope.

| route/object ID | full ACF field path | field type | previous WP value | frontend source-of-truth value | source | status |
|---|---|---|---|---|---|---|
| `/` (94) | `helpCards[0].image` | image | `empty` | `/images/765ef0b1-a99d-4496-b398-582c961f2f01_1782404925125.jpg` | fallback/local | ACF EMPTY |
| `/` (94) | `helpCards[1].image` | image | `empty` | `/images/fancy_home_1782404943463.jpg` | fallback/local | ACF EMPTY |
| `/` (94) | `helpCards[2].image` | image | `empty` | `/images/6039388d-3f21-437f-a9ad-da1c64e71a57_1782404967023.jpg` | fallback/local | ACF EMPTY |
| `/` (94) | `helpCards[0].href` | URL | `/buying` | `/buyer` | fallback/local | MISMATCH |
| `/` (94) | `helpCards[1].href` | URL | `/selling` | `/seller` | fallback/local | MISMATCH |
| `/seller` (88) | `steps[0].image` | image | `empty` | `/images/step-consultation-audit.png` | fallback/local | ACF EMPTY |
| `/seller` (88) | `steps[1].image` | image | `empty` | `/images/step-prepare-home-for-sale.png` | fallback/local | ACF EMPTY |
| `/seller` (88) | `steps[2].image` | image | `empty` | `/images/step-selling-4-market.png` | fallback/local | ACF EMPTY |
| `/seller` (88) | `steps[3].image` | image | `empty` | `/images/selling-house.png` | fallback/local | ACF EMPTY |
| `/about` (84) | `helpCards[0].image` | image | `empty` | `/images/765ef0b1-a99d-4496-b398-582c961f2f01_1782404925125.jpg` | fallback/local | ACF EMPTY |
| `/about` (84) | `helpCards[1].image` | image | `empty` | `/images/fancy_home_1782404943463.jpg` | fallback/local | ACF EMPTY |
| `/about` (84) | `helpCards[2].image` | image | `empty` | `/images/6039388d-3f21-437f-a9ad-da1c64e71a57_1782404967023.jpg` | fallback/local | ACF EMPTY |
| `/about` (84) | `helpCards[0].href` | URL | `/buying` | `/buyer` | fallback/local | MISMATCH |
| `/about` (84) | `helpCards[1].href` | URL | `/selling` | `/seller` | fallback/local | MISMATCH |
| `/home-prep-program` (90) | `steps[0].image` | image | `empty` | `/images/step-consultation-audit.png` | fallback/local | ACF EMPTY |
| `/home-prep-program` (90) | `steps[1].image` | image | `empty` | `/images/step-upfront-renovation-funding.jpg` | fallback/local | ACF EMPTY |
| `/home-prep-program` (90) | `steps[2].image` | image | `empty` | `/images/step-project-management.png` | fallback/local | ACF EMPTY |
| `/home-prep-program` (90) | `steps[3].image` | image | `empty` | `/images/staging-living-room.webp` | fallback/local | ACF EMPTY |
| `/home-prep-program` (90) | `steps[4].image` | image | `empty` | `/images/step-preparing-3-launch.png` | fallback/local | ACF EMPTY |
| `/home-prep-program` (90) | `includedCards[0].image` | image | `empty` | `/images/included-painting.webp` | fallback/local | ACF EMPTY |
| `/home-prep-program` (90) | `includedCards[1].image` | image | `empty` | `/images/included-landscaping.webp` | fallback/local | ACF EMPTY |
| `/home-prep-program` (90) | `includedCards[2].image` | image | `empty` | `/images/included-repairs.webp` | fallback/local | ACF EMPTY |
| `/home-prep-program` (90) | `includedCards[3].image` | image | `empty` | `/images/staging-living-room.webp` | fallback/local | ACF EMPTY |
| `/home-prep-program` (90) | `includedCards[4].image` | image | `empty` | `/images/included-deep-cleaning.webp` | fallback/local | ACF EMPTY |
| `/home-prep-program` (90) | `includedCards[5].image` | image | `empty` | `/images/step-preparing-3-launch.png` | fallback/local | ACF EMPTY |
| `/home-prep-program` (90) | `includedCards[6].image` | image | `empty` | `/images/included-junk-hauling.webp` | fallback/local | ACF EMPTY |
| `/home-prep-program` (90) | `includedCards[7].image` | image | `empty` | `/images/included-estate-sales.webp` | fallback/local | ACF EMPTY |

## NO ACF FIELD EXISTS (grouped by route)

- `/` (94): FAQ heading/intro and all FAQ Q&A; rendered hero testimonial; CTA eyebrow/heading/body/labels; footer description, contact details, address, copyright and privacy link.
- `/buyer` (86): FAQ Q&A; phone; buyer-form source/ID/redirect; delegated CTA/footer/testimonial content.
- `/seller` (88): prep body; Before/After labels and image alts; prep `Learn More`; FAQ Q&A; seller-form source/ID/redirect; delegated CTA/footer/testimonial content.
- `/about` (84): FAQ Q&A; help-card `Learn more`; delegated CTA/footer/testimonial content.
- `/home-value-analysis` (82): process eyebrow; hardcoded form heading; form source/ID; delegated CTA/testimonial content; default repeater cards/steps when no ACF repeater exists.
- `/home-prep-program` (90): hero body; process heading; case second paragraph; all FAQ Q&A; final CTA copy/links; hardcoded video ID and case slides 2–3 image/alt content.
- `/connect` (80): form labels/placeholders/validation/errors; form source/ID; ACF-selected `ps` and success copy are not rendered.
- `/book-consultation` (77): all substantive page copy except ACF eyebrow; expectations, form copy, Calendly URL, scheduling/confirmation copy are hardcoded or ignored.
- `/booked` (76): empty-video placeholder/play UI.
- `/thank-you` (75): `Message Received` eyebrow.
- `/faqs` (92): fallback category/Q&A content when native FAQ CPT rows are unavailable.
- `/privacy-policy` (130): no ACF field exists by design. Native WP `content` is substantive and is the source for policy body; `acf: []` is expected.

## Selected ACF fields ignored by frontend

- `/buyer`: `whyVideoImage`; `tips[].highlighted`.
- `/seller`: `prepBody`, `prepCtaLink`, `prepCtaText`, `prepPhoneLink`, `prepPhoneText`, `zillowSecondaryLink`, `zillowSecondaryText`.
- `/home`: fetched testimonials are not passed to `TestimonialsSection`; FAQ/CTA/footer have no ACF reads.
- `/home-value-analysis`: `formHeading`, `formSuccessHeading`, `formSuccessBody`; `ctaSecondaryHref` is read but absent from `HOMEVALUE_SELECTION`.
- `/home-prep-program`: `processHeading`, `processSecondaryLink`, `processSecondaryText`; no ACF FAQ repeater is rendered.
- `/connect`: `ps`, `successHeading`, `successBody`.
- `/book-consultation`: every selected field except `eyebrow` (`heading`, `body`, `body2`, `expectations`, schedule/calendar/confirmation fields).

## Root causes and REST confirmation

- Stale WP `/get-in-touch` URLs conflict with frontend `/connect` fallbacks.
- Seller/Home Prep ACF contains an older content revision than the frontend source of truth.
- Blank image fields intentionally trigger local assets.
- Nonempty repeaters replace defaults wholesale; Home Prep's four-row `familiarWorries` therefore omits intended rows 4–5 and shifts the fourth value.
- Selected schema fields are disconnected from component reads; other rendered copy is hardcoded with no ACF field.
- Casing-only values normalized by `tc` are not reported as mismatches.
- Backup confirms REST exposure for the ACF pages. Privacy object 130 has `acf: []` and substantive native content, so it is native content rather than an ACF defect; empty native content is acceptable for non-ACF content.
## Existing media matches

The following local source assets already have exact-filename matches in the WordPress Media Library and can be referenced by existing media ID after approval:

- `/images/4090_Sylvan_Gen_ln._Roseville_CA_95747-24_1780678783964.jpg` — media ID 145
- `/images/4090_Sylvan_Gen_ln._Roseville_CA_95747-42_1779384768951.jpg` — media ID 146
- `/images/A7406979-2_1782404791199.jpg` — media ID 149
- `/images/A7407000-2_1782405532776.jpg` — media ID 150
- `/images/B1B889F6-9C80-4F33-A424-863BFD5EBF72_1779913575853.png` — media ID 151
- `/images/B1B889F6-9C80-4F33-A424-863BFD5EBF72_1_1779913878628.png` — media ID 152
- `/images/Mask_group_1780678314549.png` — media ID 153
- `/images/graphic-hero_section_1779377398567.png` — media ID 177
- `/images/prep-bedroom-after.jpg` — media ID 187
- `/images/prep-bedroom-before.jpg` — media ID 191
- `/images/prep-home-aerial.jpg` — media ID 193
- `/images/prep-roseville-after.jpg` — media ID 196
- `/images/prep-roseville-before.jpg` — media ID 197
- `/images/process-discover-needs.png` — media ID 200
- `/images/process-preparing.png` — media ID 201
- `/images/sound-familiar-stressed-seller.png` — media ID 204
- `/images/step-buying-1-search.png` — not found; will be skipped, not uploaded
- `/images/step-buying-2-find.png` — not found; will be skipped, not uploaded
- `/images/step-buying-3-offer.png` — not found; will be skipped, not uploaded
- `/images/step-preparing-1-audit.png` — media ID 216
- `/images/step-preparing-2-updates.png` — media ID 221
- `/images/step-preparing-3-launch.png` — media ID 223
- `/images/step-preparing-4-funding.png` — media ID 225
- `/images/step-selling-2-stage.png` — media ID 231
- `/images/step-selling-3-offers.png` — media ID 232
