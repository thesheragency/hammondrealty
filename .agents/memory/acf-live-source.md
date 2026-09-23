---
name: ACF live content source of truth
description: Preserve published visible content when reconciling WordPress ACF.
---

Use the currently visible published frontend content as the authoritative source for ACF parity, not workspace fallback strings.

**Why:** The user explicitly chose preservation of live copy when informed that populated ACF overrides code defaults. The deployed frontend can differ from both the workspace source and current REST values.

**How to apply:** Capture published content before writes, distinguish actual rendered content from serialized data and inactive defaults, and preserve uncertain values. Keep frontend files and deployment untouched. Back up external WordPress values separately from the workspace checkpoint.

REST media-ID persistence is not proof that the frontend can resolve an ACF image.

**Why:** The WordPress GraphQL endpoint returned null image connections even when authenticated REST retained valid attachment IDs. This behavior affected existing and newly assigned references; local frontend fallbacks concealed it.

**How to apply:** Verify REST persistence and GraphQL resolution separately. If GraphQL remains null, report the integration limitation rather than substituting another asset or claiming end-to-end image parity.