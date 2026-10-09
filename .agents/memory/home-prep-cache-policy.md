---
name: Home Prep performance and freshness tradeoff
description: Why Home Prep uses ISR rather than forcing fresh WordPress rendering on every visitor request.
---

Home Prep's earlier per-request freshness approach was deliberately replaced with ISR at the user's request. Preserve cached HTML with secured on-demand WordPress save invalidation and a short backup revalidation interval.

**Why:** The user measured roughly two seconds of server response time and requested faster mobile loading without delaying CMS edits or changing other pages' caching behavior.

**How to apply:** When a CMS edit appears stale, check the WordPress save webhook, both rendered-route and GraphQL data-cache invalidation, and the CDN. Do not automatically restore forced dynamic rendering to work around a broken invalidation layer.

The user explicitly requested that Home Prep videos download only after playback is requested, even though the prior version autoplayed on entering the viewport.

**Why:** Preserve page weight and mobile speed; a poster is the intended exception to the otherwise unchanged presentation.

**How to apply:** Do not restore viewport-triggered video autoplay as a cosmetic fix. Keep click-to-play and the current video source.
