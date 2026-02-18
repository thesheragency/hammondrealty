# Headless WordPress Boilerplate

## Overview
This project provides a modern headless WordPress implementation using Next.js App Router and PostgreSQL for content caching. It aims to deliver a complete solution for building decoupled WordPress sites, focusing on WordPress's default "Posts" content type with full taxonomy support (categories and tags). The boilerplate emphasizes high performance, SEO, and a robust developer experience.

## User Preferences
I want to interact with the agent in an iterative development approach. I prefer detailed explanations of changes and potential impacts. The agent should ask for confirmation before making major architectural changes or introducing new dependencies.

## System Architecture
The system is built on a Next.js 16 App Router frontend with TypeScript, utilizing Next.js API Routes for backend functionality. Content is sourced from WordPress via WPGraphQL and cached in a PostgreSQL database managed by Drizzle ORM.

**Key Architectural Decisions:**
- **Server-Side Rendering (SSR):** All pages are SSR for improved SEO and performance.
- **Content Caching:** WordPress content is synced to PostgreSQL to enable fast data retrieval, decoupling the frontend from direct, real-time WordPress queries. Taxonomies (categories and tags) are embedded as JSON within post records in the database for simplified schema and efficient access.
- **SEO Integration:** Leverages Next.js Metadata API with Yoast SEO integration, supporting page titles, meta descriptions, Open Graph, Twitter Cards, and canonical URLs. It also proxies SEO files (sitemaps, robots.txt, llms.txt) directly from WordPress, replacing WordPress URLs with the frontend domain. Schema.org structured data (JSON-LD) is fetched from Yoast's REST API (`/wp-json/yoast/v1/get_head`) and injected server-side via the `YoastSchema` component (`components/seo/YoastSchema.tsx`). WordPress domains in the JSON-LD are automatically replaced with the frontend domain. This is a hybrid approach: individual meta tags come from WPGraphQL, while schema markup comes from Yoast's REST API since WPGraphQL doesn't expose JSON-LD.
- **Preview Mode:** Allows previewing draft content directly from WordPress using Next.js Draft Mode. When an editor clicks "Preview" in WordPress, they're redirected to `/api/preview` which validates a secret, enables Draft Mode, and redirects to the content page. The page then fetches draft content using authenticated GraphQL requests. Includes `/api/exit-preview` to disable Draft Mode.
  - **Dual Authentication Support:** Handles staging sites with nginx HTTP Basic Auth protection. Uses a cookie-based auth flow: authenticates to WordPress via `/wp-login.php` (with staging Basic Auth to pass nginx), captures session cookies, then uses those cookies + staging Basic Auth for GraphQL requests. Session cookies are cached for 30 minutes.
  - **Post Type Configuration:** Registered post types are defined in `lib/config/post-types.ts`. The preview route validates incoming requests against this allowlist for security. See "Pre-Launch Checklist" below for adding custom post types.
  - **Required Environment Variables:**
    - `WP_PREVIEW_SECRET`: Shared secret for preview URL validation
    - `WP_AUTH_USER` / `WP_AUTH_PASSWORD`: Staging gate credentials (nginx/apache Basic Auth)
    - `preview_user_un`: WordPress username with Editor/Admin role
    - `preview_user_pass`: WordPress password (regular login password, NOT Application Password)
  - **WordPress Plugin:** A separate MU plugin (maintained in different repo) must override preview links to redirect to the headless frontend.
- **301 Redirects:** Uses Next.js middleware (`middleware.ts`) to fetch and apply 301/302 redirects from the WordPress Headless Tools plugin in real-time. Redirects are fetched from `/wp-json/headless/v1/redirects` and cached for 5 minutes. Supports Basic Auth for staging environments.
- **On-Demand Revalidation:** Provides a `/api/revalidate` endpoint for cache purging when content is updated in WordPress. Supports both POST and GET requests:
  - **POST** (recommended): `{ secret, path?, type?, slug? }`
    - `path`: Specific path to revalidate (e.g., `/blog/my-post`)
    - `type`: Content type (`post`, `page`, `posts`, `pages`, `all`)
    - `slug`: Content slug (used with `type` to build path)
  - **GET**: `?secret=...&path=/blog/my-post`
  - **Examples:**
    - Purge single post: `POST { secret, type: "post", slug: "my-post" }`
    - Purge all posts: `POST { secret, type: "posts" }`
    - Purge entire site: `POST { secret, type: "all" }`
  - Uses `REVALIDATE_SECRET` env var (falls back to `WP_PREVIEW_SECRET` if not set)
- **ACF Global Scripts:** Supports injecting custom `<head>` and `<body>` scripts configured via Advanced Custom Fields (ACF) in WordPress.
- **Gravity Forms Integration:** Includes a reusable headless module for Gravity Forms, supporting multi-page forms, conditional logic, client-side validation, spam protection, multicolumn layouts (12-column grid), and file uploads. Uses a hybrid approach: WPGraphQL for fetching form schemas and Gravity Forms REST API v2 for form submissions (enabling native file upload support without additional plugins).
  - **Client-Side Validation:** Comprehensive validation utility (`lib/gf/validation.ts`) with support for required fields, email format, phone format (7-15 digits), number ranges, URL format, date validation, time validation (12/24-hour), and file upload validation (type and size). Validation runs on blur for real-time feedback and blocks page navigation/submission until resolved.
  - **TIME Field Support:** Full support for Gravity Forms TIME field type with hour/minute inputs and AM/PM selector (for 12-hour format). Serializes as "HH:MM AM/PM" or "HH:MM" depending on format configuration.
  - **DATE Field UX:** Calendar icon positioned on left with entire input clickable to open date picker for improved usability.
- **Design System:** Features a comprehensive design system with CSS variables for brand colors, typography, spacing, and radius, located in `app/globals.css`. A `/style-guide` page provides a live visual reference for all design tokens and components.
- **Modular Component Architecture:** Emphasizes modular React components for easy restyling and maintenance.
- **Landing Page Builder (Feature Flag):** An optional module for self-service landing page creation using ACF Flexible Content blocks. When enabled, pages using the "Landing Page" template in WordPress are rendered with modular blocks instead of standard page content.
  - **Feature Flag:** Set `FEATURE_LANDING_BUILDER=false` to disable. Enabled by default.
  - **Template Detection:** Uses the centralized `PAGE_TEMPLATE_CONFIG` registry in `lib/config/post-types.ts` to map WordPress template names to frontend renderers. Template matching is case-insensitive and ignores `.php` extensions. Each entry can optionally reference a feature flag.
  - **Available Blocks:** Hero, Feature Grid, CTA Banner, Form Section (Gravity Forms or iframe), Rich Text, Testimonials.
  - **Form Section:** Supports toggling between Gravity Forms (by ID) and iframe embeds (for CRM forms like HubSpot, Salesforce).
  - **Module Location:** All landing builder code is isolated in `modules/landing-builder/` to prevent accidental modification during frontend updates.
  - **Style Guide Integration:** All blocks use Tailwind CSS and the global style guide variables, ensuring landing pages stay on-brand.

**Core Features:**
- Full taxonomy support (categories and tags) for posts.
- SEO-friendly URL structure and meta-data handling.
- Development tooling for database schema pushing.

## External Dependencies
- **WordPress:** Content Management System.
- **WPGraphQL Plugin:** Provides a GraphQL API for WordPress.
- **WPGraphQL Yoast SEO Plugin:** Integrates Yoast SEO data into WPGraphQL.
- **WPGraphQL for ACF Plugin:** Enables ACF fields within WPGraphQL (optional, for global scripts).
- **Redirection Plugin:** Manages 301 redirects in WordPress.
- **Gravity Forms Plugin:** For building and managing forms.
- **WPGraphQL for Gravity Forms Plugin (AxeWP):** Integrates Gravity Forms with WPGraphQL.
- **PostgreSQL:** Primary database for cached content.
- **Drizzle ORM:** TypeScript ORM for interacting with PostgreSQL.
- **Next.js:** React framework for frontend and API routes.
- **graphql-request:** GraphQL client for interacting with WPGraphQL.
- **Shadcn UI:** UI component library.

## Pre-Launch Checklist

### WordPress Post Type Configuration

Before launching each instance of this boilerplate, verify all WordPress post types are properly registered:

1. **Review WordPress post types:**
   - In WordPress Admin, go to the preview plugin settings (Sher Headless Tools → Preview Settings)
   - Note all enabled post types and their frontend routes

2. **Update Next.js configuration:**
   - Open `lib/config/post-types.ts`
   - Ensure each WordPress post type has a matching entry:
   ```typescript
   export const POST_TYPE_CONFIG: Record<string, PostTypeConfig> = {
     post: { route: '/blog/[slug]', fetcher: 'post', label: 'Blog Post' },
     page: { route: '/[slug]', fetcher: 'page', label: 'Page' },
     // Add custom post types:
     product: { route: '/products/[slug]', fetcher: 'page', label: 'Product' },
     event: { route: '/events/[slug]', fetcher: 'page', label: 'Event' },
   };
   ```

3. **Create matching Next.js routes:**
   - For each custom post type, create a route folder:
     - `app/products/[slug]/page.tsx` for products
     - `app/events/[slug]/page.tsx` for events
   - Copy and adapt from `app/[slug]/page.tsx` as a template

4. **Test preview for each post type:**
   - Create a draft for each post type in WordPress
   - Click "Preview" and verify it loads correctly on the frontend

### WordPress Page Template Configuration

Page templates (e.g., "Landing Page") are mapped to frontend renderers via `PAGE_TEMPLATE_CONFIG` in `lib/config/post-types.ts`. This registry determines which component renders pages that use a specific WordPress template.

1. **Register the template in the config:**
   ```typescript
   export const PAGE_TEMPLATE_CONFIG: Record<string, PageTemplateConfig> = {
     'template-landing-page': {
       renderer: 'landing-builder',
       label: 'Landing Page',
       featureFlag: 'FEATURE_LANDING_BUILDER',
     },
     // Add name variations WordPress might return:
     'landing page': {
       renderer: 'landing-builder',
       label: 'Landing Page',
       featureFlag: 'FEATURE_LANDING_BUILDER',
     },
     // Custom templates:
     // 'template-full-width': { renderer: 'default', label: 'Full Width' },
   };
   ```

2. **Add new renderer types** to the `TemplateRenderer` union type if needed:
   ```typescript
   export type TemplateRenderer = 'landing-builder' | 'default';
   ```

3. **Wire the renderer** into your page route (e.g., `app/[slug]/page.tsx`) using `getTemplateRenderer(templateName)`.

4. **Feature flags** are optional. If `featureFlag` is set, the template is ignored when `process.env[featureFlag] === 'false'`.

### Environment Variables Checklist

Verify all required environment variables are set:

- [ ] `WP_API_URL` - WordPress GraphQL endpoint (e.g., `https://wp.example.com/graphql`)
- [ ] `WP_PREVIEW_SECRET` - Shared secret matching WordPress plugin
- [ ] `preview_user_un` - WordPress username with Editor/Admin role
- [ ] `preview_user_pass` - WordPress password (NOT Application Password)
- [ ] `WP_AUTH_USER` / `WP_AUTH_PASSWORD` - Only if staging has nginx/apache Basic Auth protection

### Database Setup (Required for New Instances)

When duplicating this boilerplate, the database secrets copy over but the actual database does not. You must provision a fresh database for each new project instance:

1. **Provision Database:** Use the Replit Database tool in the workspace to create a new PostgreSQL database
2. **Push Schema:** Run `npx drizzle-kit push` to create the tables
3. **Sync Content:** Run the WordPress content sync to populate the cache

The database uses these tables:
- `posts` - Cached WordPress posts
- `pages` - Cached WordPress pages  
- `redirects` - 301/302 redirects from WordPress
- `sync_status` - Tracks last sync times
- `global_settings` - ACF global options

### Content Sync

- [ ] Run initial content sync to populate PostgreSQL cache
- [ ] Verify posts and pages display correctly
- [ ] Test preview mode for both posts and pages

### Landing Page Builder Setup (Optional)

If using the landing page builder feature:

1. **Create Page Template in WordPress:**
   Create `template-landing-page.php` in your theme:
   ```php
   <?php
   /**
    * Template Name: Landing Page
    * Description: Flexible landing page builder template
    */
   get_header();
   the_content();
   get_footer();
   ```

2. **Create ACF Field Group:**
   - **Field Group Title:** Landing Page Sections
   - **Field Name:** `landing_sections`
   - **Field Type:** Flexible Content
   - **Location Rule:** Post Template is equal to "Landing Page"
   - **Show in GraphQL:** Yes (required for headless access)

3. **Add ACF Layouts (blocks):**
   Each layout should have "Show in GraphQL" enabled:
   - `hero_section` - Headline, subheadline, CTA, background
   - `feature_grid` - Grid of feature cards with icons
   - `cta_banner` - Full-width call-to-action
   - `form_section` - Gravity Forms or iframe embed
   - `rich_text` - WYSIWYG content
   - `testimonials` - Customer quotes

4. **Install Required Plugins:**
   - ACF Pro (for Flexible Content)
   - WPGraphQL for ACF

5. **Test:**
   - Create a Page, select "Landing Page" template
   - Add sections using the ACF flexible content interface
   - Publish and view on frontend

**To Disable:** Set environment variable `FEATURE_LANDING_BUILDER=false`