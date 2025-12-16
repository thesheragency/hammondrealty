# Headless WordPress Boilerplate

## Overview
A modern headless WordPress implementation with Next.js App Router and PostgreSQL caching. This boilerplate provides a complete solution for building decoupled WordPress sites with WPGraphQL integration, using WordPress's default "Posts" content type with full taxonomy support (categories and tags).

## Tech Stack
- **Frontend**: Next.js 16 App Router with TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **WordPress Integration**: WPGraphQL client (graphql-request)
- **SEO**: Next.js Metadata API with Yoast SEO integration

## Recent Changes (December 2024)
- Migrated from Express + Vite + React to Next.js App Router
- Server-side rendering for all pages (better SEO)
- Moved from wouter to Next.js routing
- API routes now in app/api/ directory

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── blog/              # Blog pages
│   │   ├── page.tsx       # Blog listing
│   │   └── [slug]/        # Dynamic blog post
│   │       └── page.tsx
│   └── api/               # API routes
│       ├── posts/         # Posts endpoints
│       ├── wordpress/     # WordPress sync
│       └── global-settings/
├── components/             # React components
│   ├── layout/            # Header, Footer, Layout
│   ├── preview/           # Preview mode banner
│   ├── posts/             # Post cards, list, content
│   ├── scripts/           # Global scripts injection
│   └── ui/                # Shadcn UI components
├── lib/                    # Utilities and data layer
│   ├── db.ts              # Database connection
│   ├── storage.ts         # Data access layer
│   ├── wordpress.ts       # WPGraphQL client
│   └── utils.ts           # Utility functions
├── hooks/                  # Custom React hooks
└── shared/                 # Shared types and schemas
    └── schema.ts          # Drizzle schema definitions
```

## API Endpoints

### Posts
- `GET /api/posts` - List all posts with categories and tags
- `GET /api/posts/featured` - List featured/sticky posts
- `GET /api/posts/:slug` - Get single post by slug

### Preview
- `GET /api/preview/post/:id?token=xxx` - Preview draft post
- `GET /api/preview/page/:id?token=xxx` - Preview draft page

### Sync
- `POST /api/wordpress/sync` - Sync content from WordPress
- `GET /api/sync/status` - Get sync status

### Global Settings
- `GET /api/global-settings` - Get all global settings (ACF scripts)
- `GET /api/global-settings/:key` - Get specific global setting

### SEO Files (Auto-proxied)
- `GET /sitemap.xml` - Proxied from WordPress/Yoast
- `GET /sitemap_index.xml` - Yoast sitemap index (or WP native fallback)
- `GET /wp-sitemap.xml` - WordPress native sitemap
- `GET /robots.txt` - Proxied from WordPress (with fallback)
- `GET /llms.txt` - AI crawler guidance (generated from content)
- `GET /llms-full.txt` - Extended AI crawler file with full content

### Other
- `GET /api/redirects` - List all Yoast redirects
- `GET /api/pages` - List all pages
- `GET /api/pages/:slug` - Get single page
- `GET /api/health` - Health check

## Database Schema

### Posts Table
- `id` - UUID primary key
- `wpId` - WordPress post ID
- `title` - Post title
- `slug` - URL slug
- `content` - Full HTML content
- `excerpt` - Post excerpt
- `author` - Author display name
- `featuredImage` - Featured image URL
- `featuredImageAlt` - Image alt text
- `publishedAt` - Publication date
- `wpModified` - Last modified date
- `status` - Post status (publish, draft, etc.)
- `seoMetadata` - Yoast SEO data (JSON)
- `categories` - Embedded array of category objects (JSON)
- `tags` - Embedded array of tag objects (JSON)
- `isFeatured` - Featured/sticky post flag
- `syncedAt` - Last sync timestamp

### Taxonomy Storage
Categories and tags are stored as embedded JSON arrays within each post (not in separate tables). Each taxonomy term object contains:
- `id` - WordPress term ID
- `name` - Display name
- `slug` - URL slug
- `description` - Term description
- `count` - Number of associated posts

This embedded approach simplifies the schema and is ideal for caching WordPress content.

## Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL connection string (auto-provided by Replit)
- `WP_API_URL` - WordPress GraphQL endpoint (e.g., https://yoursite.com/graphql)

### Optional
- `FRONTEND_URL` - Production frontend URL for sitemap/SEO files (auto-detected in dev)
- `WP_AUTH_USER` - WordPress username for authenticated requests
- `WP_AUTH_PASSWORD` - WordPress application password
- `WP_BASIC_AUTH_ENABLED` - Set to `false` on production sites that don't have nginx basic auth

## Environment Configuration by Deployment Stage

| Variable | Development | Staging | Production |
|----------|-------------|---------|------------|
| `DATABASE_URL` | Auto-provided | Set to staging DB | Set to production DB |
| `WP_API_URL` | Your WP GraphQL URL | Staging WP URL | Production WP URL |
| `FRONTEND_URL` | Auto-detected | Staging domain | Production domain |
| `WP_AUTH_USER` | Set if WP has basic auth | Set if WP has basic auth | Usually not needed |
| `WP_AUTH_PASSWORD` | Set if WP has basic auth | Set if WP has basic auth | Usually not needed |
| `WP_BASIC_AUTH_ENABLED` | `true` (default) | `true` (if needed) | `false` (recommended) |

**Note:** Set `WP_BASIC_AUTH_ENABLED=false` on production sites where your WordPress doesn't have nginx-level HTTP Basic Auth protection. This prevents sending unnecessary auth headers.

## WordPress Requirements

1. **WPGraphQL Plugin** - Required for GraphQL API
2. **WPGraphQL Yoast SEO** - For SEO metadata
3. **WPGraphQL for ACF** - For ACF Global Scripts support (optional)
4. **Redirection** - For 301 redirect management (free plugin with built-in REST API)

## ACF Global Scripts Setup

To use ACF Global Scripts for injecting head/body scripts:

1. Install **ACF Pro** and **WPGraphQL for ACF** plugins
2. Create an ACF Options Page (e.g., "SherOptions" or "Global Scripts")
3. Create a Field Group with GraphQL Type Name: `globalScripts`
4. Add two fields to the field group:
   - Field Name: `global_head_scripts` (Textarea) - for `<script>`, `<style>`, `<link>`, `<meta>` tags
   - Field Name: `global_body_scripts` (Textarea) - for `<script>` tags or any HTML content
5. Set the Field Group location to your Options Page
6. Enable "Show in GraphQL" and check your Options Page under "GraphQL Types to Show"

### Configuring the Query

The GraphQL query in `server/wordpress.ts` must match your Options Page name. The query field name is the camelCase version of your Options Page name:

| Options Page Name | GraphQL Query Field |
|-------------------|---------------------|
| SherOptions | `sherOptions` |
| Global Scripts | `globalScripts` |
| Site Settings | `siteSettings` |

**Current configuration** (update in `server/wordpress.ts` if your Options Page has a different name):
```graphql
query GetAcfOptions {
  sherOptions {
    globalScripts {
      globalHeadScripts
      globalBodyScripts
    }
  }
}
```

### Script Injection Behavior

- **Head Scripts**: Injects `<script>`, `<style>`, `<link>`, and `<meta>` tags into `<head>`
- **Body Scripts**: Injects `<script>` tags and any other HTML content at end of `<body>`
- Plain text content is preserved (wrapped appropriately) for verification

## 301 Redirects Setup

For 301 redirect management, this boilerplate uses the free [Redirection](https://wordpress.org/plugins/redirection/) plugin by John Godley (5M+ installs).

### Installation Steps

1. Install **Redirection** plugin from WordPress Plugin Directory
2. Copy `wordpress-plugins/headless-redirects-api.php` to your WordPress `wp-content/mu-plugins/` folder
   - Create the `mu-plugins` folder if it doesn't exist
   - The mu-plugin auto-activates once uploaded
3. Test the endpoint: `GET https://yoursite.com/wp-json/headless/v1/redirects`
4. Run sync in the boilerplate to fetch redirects

**Note**: The mu-plugin is required because Redirection's built-in REST API uses WordPress session authentication, which doesn't work for headless external access. The mu-plugin provides a Basic Auth compatible endpoint.

### Creating Redirects

1. Go to WordPress Admin → Tools → Redirection
2. Add redirects with source URL and target URL
3. Set redirect type (301, 302, 307, 308)
4. Sync the boilerplate to pull new redirects

### Features

- 404 error monitoring
- Regex pattern matching
- Import/export support (CSV, JSON, Apache, Nginx)

## Key Features

### Content Caching
WordPress content is synced to PostgreSQL for fast access. Use the Sync button or POST to `/api/wordpress/sync`.

### Taxonomy Support
Full support for WordPress taxonomies:
- Categories displayed on post cards and detail pages
- Tags shown in post footer
- Both taxonomies are synced and cached locally

### SEO Integration
- Page titles and meta descriptions
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- 301 redirects from Yoast Premium

### Preview Mode
Preview draft content from WordPress by passing `preview=true&id=xxx&token=xxx` query parameters.

### Redirect Handling
Yoast redirects are synced and applied via Express middleware.

## Frontend Routes
- `/` - Home page with featured posts
- `/blog` - Blog listing page
- `/blog/:slug` - Individual post detail page
- `/style-guide` - Live visual reference for all design tokens

## Development

```bash
npm run dev        # Start development server
npm run db:push    # Push schema to database
```

## SEO Files Proxy

The boilerplate automatically proxies SEO-critical files from WordPress to your frontend domain:

### Sitemaps
- Fetches from WordPress/Yoast (`/sitemap_index.xml`) or native WP (`/wp-sitemap.xml`)
- Automatically replaces WordPress URLs with your frontend URL
- Proxies Yoast XSL stylesheets for proper browser rendering
- Works on dev, staging, and production (uses `FRONTEND_URL` or auto-detects)

### robots.txt
- Proxied from WordPress (Yoast can customize this in WP admin)
- Falls back to a basic robots.txt if WordPress doesn't provide one
- Automatically includes sitemap reference

### llms.txt (AI Crawler Guidance)
- Follows the [llms.txt standard](https://llmstxt.org/) for AI crawlers
- **Yoast SEO 26.5+** natively generates llms.txt - enable it in Yoast → Settings → Site Features → llms.txt
- Proxied from WordPress with URL replacement (requires WP_AUTH_USER/WP_AUTH_PASSWORD if site is protected)
- Falls back to auto-generation from synced posts/pages if Yoast doesn't provide it
- Also provides `/llms-full.txt` with extended content from your cached data

### How It Works
1. Request comes to your frontend (e.g., `/sitemap_index.xml`)
2. Express fetches the file from WordPress
3. WordPress domain URLs are replaced with your `FRONTEND_URL`
4. Modified file is served with correct content-type headers

### Production Setup
Set `FRONTEND_URL` to your production domain:
```
FRONTEND_URL=https://www.yoursite.com
```

In development, the URL auto-detects from the request, so no configuration needed.

## Design System

The boilerplate includes a comprehensive design system for consistent styling:

### Design Tokens (CSS Variables)
Located in `client/src/index.css` under the "DESIGN TOKENS" section:
- **Brand colors**: `--color-brand`, `--color-accent` (light + dark mode)
- **Typography**: Font families, heading sizes (H1-H6), body text variants
- **Spacing & radius**: Standard Tailwind scale

### Typography Classes
Pre-built CSS classes for consistent text styling:
- Headings: `.text-h1` through `.text-h6` (responsive desktop/mobile sizes)
- Body: `.text-body`, `.text-body-lg`, `.text-small`, `.text-subheading`

### Style Guide Page
Visit `/style-guide` to see all design tokens rendered live. Use this to:
- Preview colors, typography, buttons, cards, links
- Verify customizations before deploying
- Share with designers for approval

### Customization Workflow
1. Edit CSS variables in `client/src/index.css`
2. Preview changes at `/style-guide`
3. See `design_guidelines.md` for full documentation

## Gravity Forms Integration

This boilerplate includes a reusable headless Gravity Forms module for WordPress.

### WordPress Requirements
1. **Gravity Forms** - Licensed plugin for form building
2. **WPGraphQL** - GraphQL API for WordPress (already required)
3. **WPGraphQL for Gravity Forms** - AxeWP plugin: https://github.com/AxeWP/wp-graphql-gravity-forms

### Usage

Render any Gravity Form by ID:
```tsx
import { GravityForm } from '@/components/forms/GravityForm';

export default function ContactPage() {
  return (
    <GravityForm 
      formId={1} 
      onSuccess={(confirmation) => console.log('Submitted!', confirmation)}
      onError={(errors) => console.error('Errors:', errors)}
    />
  );
}
```

### Supported Field Types
- **Fully supported**: text, textarea, email, phone, number, select, radio, checkbox, date, hidden, html, section
- **Stub (shows message)**: name, address, file upload

### Features
- **Multi-page forms**: Automatic page navigation with progress indicator
- **Conditional logic**: Show/hide fields based on other field values
- **Validation**: Required field validation with error messages
- **Spam protection**: Honeypot field + rate limiting (10 submissions/minute per IP)
- **Global styling**: CSS variables in `app/globals.css` for consistent form appearance

### API Endpoints
- `GET /api/forms/submit?formId=X` - Fetch form schema
- `POST /api/forms/submit` - Submit form data

### Customizing Form Styles

Edit CSS variables in `app/globals.css`:
```css
:root {
  --form-field-spacing: 1rem;
  --form-label-weight: 500;
  --form-label-size: 0.875rem;
  --form-input-bg: 0 0% 100%;
  --form-input-border: 0 0% 80%;
  --form-input-focus-ring: var(--ring);
  --form-placeholder: 0 0% 55%;
}
```

### GraphQL Schema Notes

The queries use AxeWP's schema with inline fragments:
- Form query: `gfForm(id: $formId, idType: DATABASE_ID)`
- Submit mutation: `submitGfForm(input: { id, fieldValues })`

If your AxeWP version differs, adjust field names in `lib/gf/queries.ts` and `lib/gf/mutations.ts`.

## Recent Changes
- Added Gravity Forms integration with multi-page and conditional logic support
- Added form styling CSS variables and style guide section
- Added design system with CSS variable infrastructure for easy brand customization
- Added `/style-guide` page for live visual design token preview
- Added typography utility classes (text-h1 through text-h6, text-body, etc.)
- Added SEO file proxies (sitemap, robots.txt, llms.txt)
- Added FRONTEND_URL support with auto-detection fallback
- Added WP_BASIC_AUTH_ENABLED for controlling Basic Auth across environments
- Added ACF Global Scripts support (head/body script injection)
- Refactored from custom "Projects" to WordPress default "Posts" content type
- Added full taxonomy support (categories and tags)
- Updated routing: /projects → /blog
- Added author and publication date display
- Updated preview endpoints for posts
- Modular component architecture for easy restyling
- Performance: Reduced font loading (Inter + Fira Code only), lazy loading for routes and images
