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

Marketing form definitions and notification settings are owned by Gravity Forms. ACF selects each form through an embed shortcode; booking retains its existing headless presentation and Calendly flow. Keep legacy ACF form-copy fields until the migration is approved.

**Why:** The user requested Gravity Forms for all forms without visual or behavioral changes, and explicitly approved staged ACF removal to avoid breaking the still-live frontend.

**How to apply:** Do not create duplicate ACF input-label/validation settings or replace the forms with independent custom lead handlers. Preserve the existing CRM sources/routing. Native Gravity Forms sends WordPress notifications; successful CRM creation does not establish mailbox delivery or personal CRM email preferences.

Native Gravity Forms submission responses on this CMS do not guarantee an entry ID, even when the entry is saved and its notification sends.

**Why:** An authorized integration test saved an entry and sent its native notification, but the REST response omitted the entry ID. Treating the missing ID as failure would block the calendar after a successful submission.

**How to apply:** Use native validation success plus the required CRM acknowledgement to advance booking. For test evidence, locate the uniquely marked entry through the authenticated WordPress API. Distinguish mail-transport acceptance from confirmed receipt in an inbox.

Calendly's inline SDK has no inline-widget destroy API and registers an anonymous window resize listener. Removing the iframe alone leaves that callback active.

**Why:** Client navigation must not leave widget callbacks reacting to later messages against detached containers. Cleanup must not remove GTM or other application listeners.

**How to apply:** Keep SDK-owned listener registration scoped to the widget mount and remove it with the widget DOM on unmount. Initialize only after the document is ready so the SDK cannot defer registration outside that cleanup scope.
