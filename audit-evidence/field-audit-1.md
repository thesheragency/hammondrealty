# Field audit 1 — Home Prep, Home Value, and Get in Touch

## Scope and method

Audited only:

- `components/pages/HomePrepPage.tsx` — WP page 90, `home-prep-program`
- `components/pages/HomeValuePage.tsx` — WP page 82, `home-value-analysis`
- `components/pages/GetInTouchPage.tsx` — WP page 80, `connect`

Current ACF values came from `acf-prewrite-live-backup.json`. Confirmed production HTML is the copy source of truth. Script contents were excluded from visible-copy evidence; the embedded production payload was used only to verify ACF provenance and repeater leaves that can be hidden by tabs/carousels.

The exhaustive machine-readable result is `field-audit-1.json` (170 scalar/repeater leaves).

## Results

| Page | Leaves | rendered-match | rendered-fallback-empty | ignored-with-counterpart | ignored-no-counterpart | uncertain |
|---|---:|---:|---:|---:|---:|---:|
| Home Prep | 103 | 61 | 9 | 2 | 5 | 26 |
| Home Value | 52 | 47 | 0 | 2 | 2 | 1 |
| Get in Touch | 15 | 10 | 1 | 0 | 3 | 1 |
| **Total** | **170** | **118** | **10** | **4** | **10** | **28** |

## Findings

- Home Value is textually aligned except for hardcoded `form_heading` and `cta_heading`. Its populated hero media ID cannot be tied to the exact production-visible local asset from the supplied evidence, so it is preserved as uncertain.
- Get in Touch is aligned apart from ignored `ps`/success fields, the empty local hero-image fallback, and a phone-format snapshot discrepancy.
- Home Prep has the material snapshot drift. Confirmed live copy differs from the backup in the hero eyebrow/CTA casing, four benefit descriptions, the first process step, case copy, and the production repeater length/order. Exact visible live values are supplied only where confirmed.
- `hero_body` and `process_heading` on Home Prep, plus `form_heading` and `cta_heading` on Home Value, have exact production-visible hardcoded counterparts. Other ignored fields have no visible counterpart and therefore no proposed value.
- No populated ACF value that is visibly confirmed was replaced with a code default.

## Image handling

Every image leaf is included. Empty image fields that invoke local assets are marked `rendered-fallback-empty`; they require a WordPress media match and are explicitly not writable without a verified exact media ID. Populated media IDs that could not be mapped to the exact production-visible asset using the supplied evidence are `uncertain` and have no proposed replacement.

No frontend or WordPress changes were made.