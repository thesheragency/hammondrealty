---
name: ACF REST payload validation
description: WordPress ACF REST validation of required fields and blank repeater image values.
---

When writing a complete ACF repeater through WordPress REST, image subfields must be a media ID integer or `null`. Values returned as an empty string by GET cannot be sent back unchanged; REST rejects the whole repeater payload.

**Why:** A parity update failed with `rest_invalid_type` because an unchanged blank image row was sent as `""`, even though WordPress had returned that value. Converting intentionally blank image cells to `null` preserved frontend fallback behavior and allowed the complete repeater write.

**How to apply:** For any full repeater update containing image subfields, normalize blank strings to `null`, use existing media IDs for matched assets, and re-fetch the full repeater after writing.

## Required fields in metadata updates

When adding optional metadata to an existing record, include its unchanged required ACF fields alongside the new values.

**Why:** ACF REST rejects an `acf` object missing required fields, even when the request only adds optional metadata. A read-modify-write using the existing required values passed validation.

**How to apply:** Read the current record, retain its required field values exactly, add only the authorized changes, and verify the original full content and source remain unchanged afterward.