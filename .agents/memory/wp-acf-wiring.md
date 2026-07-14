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
