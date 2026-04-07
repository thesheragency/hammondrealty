# Headless WordPress Boilerplate

## Overview
This project delivers a high-performance, SEO-friendly headless WordPress solution using Next.js App Router with direct WordPress GraphQL fetching and Next.js ISR (Incremental Static Regeneration) caching. It supports WordPress's default "Posts" content type with full taxonomy support. The aim is to provide a robust and scalable foundation for decoupled WordPress sites, emphasizing developer experience and efficient content delivery.

## User Preferences
I want to interact with the agent in an iterative development approach. I prefer detailed explanations of changes and potential impacts. The agent should ask for confirmation before making major architectural changes or introducing new dependencies.

## System Architecture
The architecture is based on a Next.js 16 App Router frontend. Content is fetched directly from WordPress via WPGraphQL at render time, with Next.js handling page caching via ISR. On-demand revalidation via webhooks from WordPress ensures content freshness.

**Key Architectural Decisions:**
-   **Suspense Boundaries for Async Server Components:** All async server components (`YoastSchema`, `PostListServer`) MUST be wrapped in `<Suspense>` boundaries when rendered in page routes. This prevents hydration mismatches in Next.js 16 + Turbopack. Any new async server component added to a page must follow this pattern.
-   **Direct WordPress Fetching:** All page routes fetch content directly from WordPress GraphQL API. No intermediate database cache. WordPress is the single source of truth.
-   **ISR Caching:** Next.js caches rendered pages. Content updates are propagated via on-demand revalidation (`/api/revalidate` endpoint) triggered by WordPress webhooks on content save. The revalidate endpoint supports `oldSlug`/`oldPath` parameters to purge stale cached pages when slugs change in WordPress. Individual content revalidation also purges listing pages (homepage, `/blog`).
-   **Self-Healing Stale Slugs:** Page and post routes use `after()` from `next/server` to call `revalidatePath` after returning a 404. When a slug changes in WordPress, visiting the old URL returns 404 and automatically purges the stale ISR cache entry so subsequent visits won't serve stale content.
-   **SEO Integration:** Integrates Next.js Metadata API with Yoast SEO for comprehensive meta-data, Open Graph, Twitter Cards, and canonical URLs. It proxies SEO files (sitemaps, robots.txt) from WordPress and fetches Schema.org JSON-LD via Yoast's REST API, replacing WordPress domains with the frontend domain. OG/Twitter images follow a fallback chain: page-specific Yoast image → post featured image → Yoast global "Site image" (from Settings > Site basics). Centralized in `lib/seo-helpers.ts`.
-   **Authentication:** Centralized in `lib/wp-auth.ts`. Three credential sets serve distinct purposes:
    - `WP_USER` + `WP_APPLIC_PASS` — WordPress Application Password. Used ONLY for GraphQL queries, form submissions (Gravity Forms REST API v2), and preview/draft content. NEVER sent to public REST endpoints (redirects, Yoast, sitemaps).
    - `WP_AUTH_USER` + `WP_AUTH_PASSWORD` — nginx Basic Auth credentials. Only needed when WordPress is behind an nginx proxy with HTTP Basic Auth (staging environments). Gated by `WP_BASIC_AUTH_ENABLED` flag; requires explicit truthy value — ignored when flag is unset, `false`, or `0`.
    - `WP_PREVIEW_SECRET` — Shared secret for validating preview requests from WordPress.
    Auth policy: `getWpAuthHeaders()` (Application Password preferred, nginx fallback) is for authenticated endpoints only (GraphQL, form submissions, ACF data). `getNginxBasicAuthHeaders()` is for public REST endpoints (redirects, Yoast Schema, SEO proxy) — only sends credentials when `WP_BASIC_AUTH_ENABLED` is explicitly enabled. For staging sites with dual auth (nginx + WordPress), the system uses nginx Basic Auth header + WordPress session cookies obtained via wp-login.php with the Application Password credentials.
-   **Preview Mode:** Enables previewing draft content from WordPress using Next.js Draft Mode, supporting authenticated GraphQL requests for draft content. It includes dual authentication support for staging sites protected by HTTP Basic Auth.
-   **301 Redirects:** Next.js middleware fetches and applies 301/302 redirects from WordPress Headless Tools plugin in real-time, with in-memory caching (5-minute TTL).
-   **On-Demand Revalidation:** A `/api/revalidate` endpoint allows for purging the Next.js page cache when WordPress content is updated, supporting specific paths, content types, or the entire site.
-   **ACF Global Scripts:** Supports injecting custom `<head>` and `<body>` scripts configured through Advanced Custom Fields (ACF) in WordPress. Fetched directly from WordPress GraphQL.
-   **Gravity Forms Integration:** Provides a headless module for Gravity Forms, supporting multi-page forms, conditional logic, client-side validation, spam protection, and file uploads. It uses WPGraphQL for schema fetching and Gravity Forms REST API v2 for submissions.
-   **Design System:** A comprehensive design system is implemented using CSS variables for brand consistency, with a `/style-guide` page for visual reference.
-   **Modular Component Architecture:** Emphasizes modular React components for flexibility and maintainability.
-   **Template-Driven Routing:** All WordPress pages route through the dynamic `app/[slug]/page.tsx` catch-all. The page's WordPress template (not its slug) determines which renderer handles it. This means slug changes in WordPress are automatically reflected without any frontend code changes. Never create hardcoded route directories for individual WordPress page slugs. New template renderers are registered in `TEMPLATE_RENDERERS` (in `app/[slug]/page.tsx`) and mapped via `PAGE_TEMPLATE_CONFIG` (in `lib/config/post-types.ts`).
-   **Landing Page Builder (Feature Flag):** An optional module that enables self-service landing page creation using ACF Flexible Content blocks, rendered with modular components. It is the reference implementation of a template renderer and isolates its code in `modules/landing-builder/`.

**Data Flow:**
1. Visitor requests a page → Next.js serves cached page if available (ISR)
2. On cache miss → Next.js fetches page metadata from WordPress (slug → databaseId + templateName)
3. Template registry determines which renderer handles the page
4. Renderer fetches template-specific data (ACF fields, etc.) using databaseId and returns JSX
5. If no custom renderer matches, falls back to standard page rendering (title + content HTML)
6. Content updated in WordPress → WordPress webhook calls `/api/revalidate` → Next.js purges cached page
7. Next request gets fresh content from WordPress

**Core Features:**
-   Full taxonomy support for posts (categories and tags).
-   SEO-friendly URL structure and meta-data handling.
-   Template registry for mapping WordPress page templates to frontend renderers (`lib/config/post-types.ts`).
-   Extensible renderer dispatch in `app/[slug]/page.tsx` via `TEMPLATE_RENDERERS` map.

## Key Files
-   `lib/wp-auth.ts` — Centralized WordPress authentication
-   `lib/wordpress.ts` — All WordPress GraphQL queries and data transformers
-   `lib/seo-helpers.ts` — Centralized SEO metadata builder with Yoast fallback chain
-   `lib/yoast-schema.ts` — Yoast Schema.org JSON-LD fetching
-   `lib/seo-proxy.ts` — Sitemap/robots.txt proxying with domain replacement
-   `lib/config/post-types.ts` — Post type and page template registry
-   `lib/config/features.ts` — Feature flags
-   `middleware.ts` — 301/302 redirect handling
-   `app/api/revalidate/route.ts` — On-demand cache revalidation endpoint
-   `shared/schema.ts` — TypeScript type definitions (Post, Page, SeoMetadata, TaxonomyTerm)

## External Dependencies
-   **WordPress:** Content Management System (single source of truth).
-   **WPGraphQL Plugin:** Provides a GraphQL API for WordPress.
-   **WPGraphQL Yoast SEO Plugin:** Integrates Yoast SEO data into WPGraphQL.
-   **WPGraphQL for ACF Plugin:** Enables ACF fields within WPGraphQL.
-   **Redirection Plugin:** Manages 301 redirects in WordPress.
-   **Gravity Forms Plugin:** For building and managing forms.
-   **WPGraphQL for Gravity Forms Plugin (AxeWP):** Integrates Gravity Forms with WPGraphQL.
-   **PostgreSQL:** Available but only used for Drizzle compatibility (users table). Not used for content caching.
-   **Drizzle ORM:** TypeScript ORM (minimal usage, retained for compatibility).
-   **Next.js:** React framework for frontend and API routes.
-   **graphql-request:** GraphQL client for interacting with WPGraphQL.
-   **Shadcn UI:** UI component library.
