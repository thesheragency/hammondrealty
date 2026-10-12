---
name: Booking conversion and notification boundaries
description: Where booking collects email, and how to preserve lead routing and verify successful submissions without false conversion events.
---

The initial booking form collects Name and Phone with Privacy Policy consent; Calendly collects email during booking.

**Why:** The user explicitly chose to remove the initial Email field and email prefill while retaining the existing CRM destination, Blake's notification flow, and GTM form-submit tracking.

**How to apply:** Do not reintroduce initial email collection or email prefill unless asked. Preserve name prefill and the phone location parameter, and allow consented Name + Phone leads through the existing CRM event/routing.

The user approved the existing Calendly date picker instead of a custom weekly view.

**Why:** Calendly's standard booking embed uses a month-based picker and does not expose a weekly-view setting; the user chose to keep the current integration rather than add API-based scheduling.

**How to apply:** Preserve the native Calendly flow unless explicitly asked to revisit that decision. Do not fake weekly availability or silently replace the booking provider.

Do not assume React submit validation or stopPropagation prevents GTM's automatic form listener from seeing a submission. The live container observed validation attempts and a success replay as separate native submit events.

**Why:** Native tracking runs earlier than React's submit handler. A single GA request can also contain multiple events, so request count alone is not proof of one conversion.

**How to apply:** Verify the actual GTM event count and GA conversion after confirmed server success; invalid input and failed submissions must produce no lead conversions. Preserve keyboard submission when preventing premature native submits.

Booking lead notifications are owned by Follow Up Boss, not the WordPress form-mail path.

**Why:** CRM creation and assignment can be verified through the API, but that does not prove delivery to the recipient's mailbox or establish their personal notification preferences.

**How to apply:** Preserve the CRM event/routing and distinguish verified lead arrival from unverified notification-email delivery in completion reports.

Calendly's inline SDK has no inline-widget destroy API and registers an anonymous window resize listener. Removing the iframe alone leaves that callback active.

**Why:** Client navigation must not leave widget callbacks reacting to later messages against detached containers. Cleanup must not remove GTM or other application listeners.

**How to apply:** Keep SDK-owned listener registration scoped to the widget mount and remove it with the widget DOM on unmount. Initialize only after the document is ready so the SDK cannot defer registration outside that cleanup scope.
