# Headless WordPress Boilerplate

## Overview
A modern headless WordPress implementation with React frontend, Express backend, and PostgreSQL caching. This boilerplate provides a complete solution for building decoupled WordPress sites with WPGraphQL integration.

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
│   │   │   ├── projects/  # Project cards, list, content
│   │   │   ├── seo/       # SEO head component
│   │   │   └── ui/        # Shadcn UI components
│   │   ├── pages/         # Route pages (home, projects, 404)
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

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/featured` - List featured projects
- `GET /api/projects/:slug` - Get single project by slug

### Preview
- `GET /api/preview/project/:id?token=xxx` - Preview draft project
- `GET /api/preview/page/:id?token=xxx` - Preview draft page

### Sync
- `POST /api/wordpress/sync` - Sync content from WordPress
- `GET /api/sync/status` - Get sync status

### Other
- `GET /api/redirects` - List all Yoast redirects
- `GET /api/pages` - List all pages
- `GET /api/pages/:slug` - Get single page
- `GET /api/health` - Health check

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
3. **ACF Pro** - For custom fields (featuredImage)

## Key Features

### Content Caching
WordPress content is synced to PostgreSQL for fast access. Use the Sync button or POST to `/api/wordpress/sync`.

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

## Development

```bash
npm run dev        # Start development server
npm run db:push    # Push schema to database
```

## Recent Changes
- Initial headless WordPress boilerplate setup
- Projects custom post type with ACF support
- Yoast SEO integration with OpenGraph/Twitter tags
- PostgreSQL caching layer
- Preview mode for draft content
- 301 redirect handling
