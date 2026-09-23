---
name: Live release boundaries
description: What to verify before treating a source update as a live-site rollout.
---

Do not infer that a GitHub update has deployed to the production origin, or that an updated origin is visible at a Cloudflare-fronted canonical URL. Verify each layer separately, including an uncached origin response and the canonical response. A connected DigitalOcean account may be valid yet not own the app behind the domain; verify app ownership before attempting any deployment there. Replit publishing is a separate user-initiated step from GitHub updates.

**Why:** A repository push succeeded through the GitHub connector after HTTPS git authentication failed, but the connected DigitalOcean account did not contain the live site's app. A manual Next.js revalidation refreshed the origin's content while Cloudflare continued serving old HTML.

**How to apply:** When a WordPress edit appears only with a cache-busting query, check the origin build, route cache headers, and Cloudflare status individually. Do not claim the live rollout is complete until the canonical URL serves the current visible text.