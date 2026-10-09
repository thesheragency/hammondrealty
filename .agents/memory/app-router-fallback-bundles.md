---
name: App Router fallback JavaScript
description: Why route-local lazy loading can still leave large animation libraries in initial assets.
---

Next.js App Router includes shared error/not-found fallbacks with healthy pages. A client-only fallback can therefore pull its animation library into the initial bundle even when every interactive section on the requested route is deferred.

**Why:** Removing Home Prep's page-wide client boundary and deferring its interactive sections still left Framer Motion eagerly loaded. The production client-reference manifest identified the shared not-found fallback as its source.

The user subsequently confirmed that the render/JavaScript improvements made the hero appear sooner on a real throttled phone test. Preserve that server-visible hero and the deferred interaction approach during further performance work.

**Why:** The user explicitly confirmed the previous changes worked and scoped the next round to CSS, fonts, and image delivery without changing page appearance or behavior.

**How to apply:** Verify the emitted initial script assets, not just dynamic-import syntax. Use the client-reference manifest to locate unexpected eager dependencies. Keep static error layouts server-rendered, and use lightweight CSS for simple fades.
