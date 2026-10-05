---
name: Booking conversion and notification boundaries
description: Why booking retains email, and how to verify successful submissions without false conversion events.
---

The initial booking form keeps email because the user chose to collect it there after being told Calendly requires it for appointment confirmation.

**Why:** This preserves email prefill when the visitor proceeds to Calendly rather than asking for email for the first time at confirmation.

**How to apply:** Retain that choice for future booking-form changes unless the user explicitly changes it.

The user approved the existing Calendly date picker instead of a custom weekly view.

**Why:** Calendly's standard booking embed uses a month-based picker and does not expose a weekly-view setting; the user chose to keep the current integration rather than add API-based scheduling.

**How to apply:** Preserve the native Calendly flow unless explicitly asked to revisit that decision. Do not fake weekly availability or silently replace the booking provider.

Do not assume React submit validation or stopPropagation prevents GTM's automatic form listener from seeing a submission. The live container observed validation attempts and a success replay as separate native submit events.

**Why:** Native tracking runs earlier than React's submit handler. A single GA request can also contain multiple events, so request count alone is not proof of one conversion.

**How to apply:** Verify the actual GTM event count and GA conversion after confirmed server success; invalid input and failed submissions must produce no lead conversions. Preserve keyboard submission when preventing premature native submits.

Booking lead notifications are owned by Follow Up Boss, not the WordPress form-mail path.

**Why:** CRM creation and assignment can be verified through the API, but that does not prove delivery to the recipient's mailbox or establish their personal notification preferences.

**How to apply:** Preserve the CRM event/routing and distinguish verified lead arrival from unverified notification-email delivery in completion reports.
