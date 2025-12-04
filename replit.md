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
- `DATABASE_URL` - PostgreSQL connection string
- `WP_API_URL` - WordPress GraphQL endpoint (e.g., https://yoursite.com/graphql)

### Optional
- `WP_AUTH_USER` - WordPress username for authenticated requests
- `WP_AUTH_PASSWORD` - WordPress application password

## WordPress Requirements

1. **WPGraphQL Plugin** - Required for GraphQL API
2. **WPGraphQL Yoast SEO** - For SEO metadata
3. **WPGraphQL for ACF** - For ACF Global Scripts support (optional)
4. **Yoast SEO Premium** - For 301 redirect support (optional)

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

## Recent Changes
- Added ACF Global Scripts support (head/body script injection)
- Refactored from custom "Projects" to WordPress default "Posts" content type
- Added full taxonomy support (categories and tags)
- Updated routing: /projects → /blog
- Added author and publication date display
- Updated preview endpoints for posts
- Modular component architecture for easy restyling
