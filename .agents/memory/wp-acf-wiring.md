---
name: WordPress ACF wiring pattern
description: How designed static pages pull ACF content from WordPress, and the caching gotchas
---

- Designed pages (components/pages/*) accept an optional `acf` prop from their async route wrapper; every value renders via fallback expressions so pages render identically when WP is unreachable.
- `lib/wp-acf.ts` is generated from GraphQL introspection. **Why:** ACF groups are registered in the WordPress code-snippets plugin (snippets 11/12); introspection is the reliable source of field names.
- **Gotcha:** Next.js patches `fetch` with a data cache — graphql-request calls get cached indefinitely in dev. wp-acf uses direct `fetch` with `next: { revalidate: 60, tags: ['wp-content'] }` so WP edits appear within ~60s; the /api/revalidate webhook purges instantly in prod.
- **Gotcha:** WP text fields contain `\r\n` for intentional line breaks; render multiline ACF headings inside `<span className="whitespace-pre-line">`.
- Final slugs are WordPress's: /buyer, /seller, /connect (frontend renamed to match, July 2026). Old paths redirect via WP Headless Tools redirects; PROTECTED_PATHS in middleware.ts keeps WP redirects from hijacking frontend-owned routes.
- ACF fields are editable via REST: `POST /wp-json/wp/v2/pages/{id}` with `{acf:{field_name:...}}` (snake_case there, camelCase in GraphQL).
- Menus: WP defines 5 locations (HEADER_NAVIGATION, HEADER_CTAS, FOOTER_NAVIGATION, FOOTER_SERVICES, FOOTER_SOCIAL). `lib/wp-menus.ts` fetches them in the root layout; SiteHeader/SiteFooter consume via SiteMenusProvider context with hardcoded fallbacks. Hrefs are protocol-allowlisted (`/`,`#`,http(s),mailto,tel) to block javascript: injection from a compromised CMS.
- Privacy policy: /privacy-policy renders WP page content (page 130) via GraphQL when it's substantive (>100 chars stripped of tags), else the hardcoded design fallback. Legal copy is edited in WP, not code.
- Conditional ACF CTAs (phone links, secondary/schedule buttons) render only when the ACF text value is non-empty — absent fields hide the element rather than showing a broken link.
- Deployment: production must build/run via `npx next build` / `npx next start` (set in .replit [deployment]). **Why:** `npm run build` is the old template's Vite+esbuild script — it never builds Next and fails on the dead `client/src/` tree. Don't "fix" the Vite build; bypass it.
- Forms: GravityForm component fetches schema via `/api/forms/submit?formId=N` (GraphQL) but SUBMITS via `/api/forms/submit-rest` (GF REST v2 FormData, `input_{id}` keys). Live form IDs: 1 Get In Touch (/connect), 2 Home Value, 3 Buyer, 4 Seller. GF rejects `@example.com` emails as invalid — test with realistic addresses.
