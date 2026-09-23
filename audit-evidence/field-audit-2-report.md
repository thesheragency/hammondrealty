# Field audit 2 — consultation, booked, thank-you, FAQs

## Scope and method

Audited only:

- `components/pages/BookConsultationPage.tsx`
- `components/pages/BookedPage.tsx`
- `components/pages/ThankYouPage.tsx`
- `components/pages/FaqsPage.tsx`

Current values came from `acf-prewrite-live-backup.json`. Production truth came from the corresponding `live-*.html` captures after excluding scripts from visible-copy evidence. Component source was used only to determine whether a field is read and to document dynamic states. The FAQ accordion also uses the captured RSC payload to establish that native answers are empty. No frontend or WordPress changes were made.

## Results

`field-audit-2.json` contains **87 exhaustive leaf entries**:

| Classification | Count |
|---|---:|
| `rendered-match` | 10 |
| `rendered-fallback-empty` | 1 |
| `ignored-with-counterpart` | 41 |
| `ignored-no-counterpart` | 33 |
| `uncertain` | 2 |

This includes all 29 page-group leaves, every nested `expectations` leaf, and both ACF schema leaves on all 29 FAQ posts even though `fetchFaqs()` does not select them.

## Key findings

- **Book Consultation:** only `eyebrow` is rendered from ACF. The heading, body, closing copy, and all six repeater leaves have confirmed hardcoded live counterparts; exact visible copy is supplied as `desired`. Scheduling/calendar/confirmation fields are also ignored, but values are proposed only where the captured visible HTML provides an exact counterpart.
- **Booked:** badge, heading, and body match. Empty `video_embed` visibly falls back to the placeholder. The backup’s `button_text`/`button_link` conflict with confirmed production (`Get In Touch` → `/thank-you`), so both are marked `uncertain` with the production values recorded as `desired`.
- **Thank You and FAQ page heading:** all page-group fields match confirmed live output.
- **FAQ posts:** ACF `question` and `answer` are never selected. Native titles provide the 29 visible question counterparts. Native content is empty, so all 29 populated ACF answers are currently absent from visible output and from the captured payload.
- **Media:** the audited schemas contain no image fields. `video_embed` is an embed field, not a WordPress media-ID field; therefore no writable media match is asserted.

No fallback replacement is proposed for any populated field already matching visible production.