# ACF field audit 0

Scope was limited to `components/pages/HomePage.tsx`, `BuyingPage.tsx`, `SellingPage.tsx`, and `AboutPage.tsx`, compared with `acf-prewrite-live-backup.json` and the four corresponding confirmed-production HTML captures. Script/style content was excluded as visible evidence. No frontend, WordPress, or remote data was changed.

## Coverage

- 330 scalar/repeater leaves audited: Home 118, Buyer 67, Seller 88, About 57.
- 261 `rendered-match`
- 3 `rendered-fallback-empty`
- 11 `ignored-with-counterpart`
- 15 `ignored-no-counterpart`
- 40 `uncertain`

All populated visible copy already matching production is preserved. Exact `desired` values appear only on eight confident mismatches: four unsupported icon selections, the ignored Buyer hero phone CTA pair, and the ignored Seller prep CTA pair.

## Material findings

- Home's three empty Buying-process images visibly fall back to local assets. They need WordPress media matches, but are explicitly not writable until exact media IDs are known.
- The backup contains no attachment objects. Consequently, 36 populated image-ID leaves remain `uncertain`: the captured HTML serves local assets, so REST ID-to-visible-asset parity cannot be proven.
- Home featured testimonials are computed but not connected to either rendered testimonial area; production displays hardcoded/dynamic testimonial content instead.
- Home `why_image` and `why_image_alt` have no rendered counterpart.
- Buyer hero ACF CTA fields are ignored in favor of the confirmed `916-625-6118` telephone CTA. Buyer `highlighted` flags and `why_video_image` have no rendered effect.
- Seller video fields, prep phone fields, and Zillow secondary CTA fields have no rendered counterpart. Seller `prep_body` is ignored but its hardcoded visible copy exactly matches the populated ACF value.
- Dynamic process tabs were assessed from component consumption plus captured server payload/HTML evidence; inactive tab descriptions/images were not treated as ordinary initially visible text.

The exhaustive machine-readable entries, evidence/source legends, counters, and write-safety notes are in `field-audit-0.json`.