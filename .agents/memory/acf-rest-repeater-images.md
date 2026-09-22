---
name: ACF REST repeater images
description: WordPress ACF REST validation behavior for image subfields inside full repeater payloads.
---

When writing a complete ACF repeater through WordPress REST, image subfields must be a media ID integer or `null`. Values returned as an empty string by GET cannot be sent back unchanged; REST rejects the whole repeater payload.

**Why:** A parity update failed with `rest_invalid_type` because an unchanged blank image row was sent as `""`, even though WordPress had returned that value. Converting intentionally blank image cells to `null` preserved frontend fallback behavior and allowed the complete repeater write.

**How to apply:** For any full repeater update containing image subfields, normalize blank strings to `null`, use existing media IDs for matched assets, and re-fetch the full repeater after writing.