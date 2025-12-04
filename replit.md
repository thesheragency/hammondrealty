# Headless WordPress Boilerplate

## Overview
A modern headless WordPress implementation with React frontend, Express backend, and PostgreSQL caching. This boilerplate provides a complete solution for building decoupled WordPress sites with WPGraphQL integration, using WordPress's default "Posts" content type with full taxonomy support (categories and tags).

## Tech Stack
- **Frontend**: React with TypeScript, TanStack Query, wouter routing
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **WordPress Integration**: WPGraphQL client (graphql-request)
- **SEO**: react-helmet-async for meta tags, Yoast SEO integration

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── layout/    # Header, Footer, Layout
│   │   │   ├── preview/   # Preview mode banner
│   │   │   ├── posts/     # Post cards, list, content
│   │   │   ├── seo/       # SEO head component
│   │   │   └── ui/        # Shadcn UI components
│   │   ├── pages/         # Route pages (home, blog, 404)
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and query client
├── server/                 # Express backend
│   ├── db.ts              # Database connection
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # Data access layer
│   └── wordpress.ts       # WPGraphQL client
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
2. Create an ACF Options Page named "Global Scripts" 
3. Add two fields to the options page:
   - Field Name: `global_head_scripts` (Textarea)
   - Field Name: `global_body_scripts` (Textarea)
4. In WPGraphQL for ACF settings, enable "Show in GraphQL" for these fields

The boilerplate expects the following GraphQL structure:
```graphql
query GetAcfOptions {
  acfOptionsGlobalScripts {
    globalScripts {
      globalHeadScripts
      globalBodyScripts
    }
  }
}
```

**Note**: If your ACF Options page has a different name, update the query in `server/wordpress.ts`.

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

## Recent Changes
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
