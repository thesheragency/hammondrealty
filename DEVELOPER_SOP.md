# Developer SOP: Headless WordPress Boilerplate Setup

## Overview
This document provides step-by-step instructions for developers setting up a new project using this headless WordPress boilerplate.

---

## Quick Start Checklist

- [ ] Remix the boilerplate in Replit
- [ ] Configure environment variables (Secrets)
- [ ] Install WordPress plugins
- [ ] Create WordPress application password
- [ ] Configure Yoast SEO settings
- [ ] Run initial content sync
- [ ] Verify SEO files are working
- [ ] (Optional) Configure ACF Global Scripts
- [ ] Set FRONTEND_URL for production

---

## Step 1: Remix the Boilerplate

1. Click "Use Template" or "Remix" on the boilerplate Repl
2. Name your new project appropriately
3. Wait for the environment to initialize

---

## Step 2: Configure Environment Variables

In Replit, go to **Tools > Secrets** and set the following:

### Required Secrets

| Secret Name | Value | Example |
|-------------|-------|---------|
| `WP_API_URL` | Your WordPress GraphQL endpoint | `https://yoursite.com/graphql` |

### Optional Secrets

| Secret Name | Value | When Needed |
|-------------|-------|-------------|
| `WP_AUTH_USER` | WordPress admin username | For preview mode |
| `WP_AUTH_PASSWORD` | WordPress application password | For preview mode |
| `FRONTEND_URL` | Your production domain | For production deployment |

**Note:** `DATABASE_URL` is automatically provided by Replit's PostgreSQL.

---

## Step 3: Install WordPress Plugins

Install and activate the following plugins on your WordPress site:

### Required
1. **WPGraphQL** - [Download](https://wordpress.org/plugins/wp-graphql/)
   - Provides the GraphQL API endpoint at `/graphql`

2. **WPGraphQL for Yoast SEO** - [Download](https://wordpress.org/plugins/add-wpgraphql-seo/)
   - Exposes Yoast SEO data via GraphQL

### Optional (Recommended)
3. **Yoast SEO** - [Download](https://wordpress.org/plugins/wordpress-seo/)
   - Manages SEO, sitemaps, and robots.txt
   - Premium version supports 301 redirects

4. **WPGraphQL for ACF** - [Download](https://www.wpgraphql.com/acf)
   - Required only if using ACF Global Scripts feature

---

## Step 4: Create WordPress Application Password

For preview mode to work, create an application password:

1. Go to WordPress Admin > Users > Your Profile
2. Scroll to "Application Passwords"
3. Enter a name (e.g., "Headless Frontend")
4. Click "Add New Application Password"
5. Copy the generated password (you won't see it again!)
6. Add to Replit secrets:
   - `WP_AUTH_USER` = your WordPress username
   - `WP_AUTH_PASSWORD` = the generated password

---

## Step 5: Configure Yoast SEO Settings

In WordPress Admin > Yoast SEO:

### Sitemaps
1. Go to Settings > Site Features > APIs
2. Ensure "XML sitemaps" is ON
3. Verify sitemap at: `https://yoursite.com/sitemap_index.xml`

### robots.txt
1. Go to Tools > File Editor
2. Customize robots.txt if needed
3. The boilerplate will proxy this automatically

### Redirects (Yoast Premium only)
1. Go to Redirects
2. Add any 301 redirects
3. These will be synced to your frontend

---

## Step 6: Run Initial Content Sync

1. Start the application in Replit (click Run or use workflow)
2. Open the frontend in your browser
3. Click the "Sync Now" button on the homepage
4. Or POST to `/api/wordpress/sync`

```bash
curl -X POST https://your-repl.replit.app/api/wordpress/sync
```

You should see a success message with counts of synced posts, pages, and redirects.

---

## Step 7: Verify SEO Files

Test that SEO files are being proxied correctly:

| URL | Expected Result |
|-----|-----------------|
| `/robots.txt` | Your robots.txt content |
| `/sitemap_index.xml` | Yoast sitemap with your frontend URLs |
| `/llms.txt` | AI crawler guidance file |

```bash
curl https://your-repl.replit.app/robots.txt
curl https://your-repl.replit.app/sitemap_index.xml
curl https://your-repl.replit.app/llms.txt
```

---

## Step 8: (Optional) ACF Global Scripts

To inject custom scripts into the head or body:

1. Install **ACF Pro** and **WPGraphQL for ACF**
2. Create ACF Options Page:
   - Go to ACF > Options Pages
   - Create page named "Global Scripts"
3. Add fields:
   - `globalHeadScripts` (Textarea) - for `<head>` scripts
   - `globalBodyScripts` (Textarea) - for `<body>` scripts
4. In WPGraphQL for ACF settings, enable "Show in GraphQL"
5. Run sync to pull the scripts

---

## Step 9: Production Deployment

### Set FRONTEND_URL

Before deploying to production, set the `FRONTEND_URL` secret:

```
FRONTEND_URL=https://www.yourclient.com
```

This ensures:
- Sitemaps contain production URLs
- robots.txt references correct domain
- llms.txt links are correct
- Canonical URLs work properly

### Deploy

1. Click "Deploy" in Replit
2. Configure your custom domain if needed
3. Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap_index.xml`

---

## Troubleshooting

### Sync Fails with GraphQL Error
- Verify `WP_API_URL` is correct (ends with `/graphql`)
- Check WPGraphQL plugin is activated
- Test endpoint: `curl https://yoursite.com/graphql`

### Preview Mode Not Working
- Verify `WP_AUTH_USER` and `WP_AUTH_PASSWORD` are set
- Ensure application password was generated correctly
- Check user has permission to view drafts

### Sitemap Returns 404
- Verify Yoast sitemaps are enabled
- Check WordPress sitemap works: `https://yoursite.com/sitemap_index.xml`
- If using WP native sitemaps: `https://yoursite.com/wp-sitemap.xml`

### SEO Files Show WordPress URLs
- Set `FRONTEND_URL` environment variable
- URLs auto-detect in development but need explicit setting for production

### ACF Scripts Not Syncing
- Verify ACF Options page is named correctly
- Check "Show in GraphQL" is enabled for fields
- Verify field names match expected: `globalHeadScripts`, `globalBodyScripts`

---

## API Quick Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/wordpress/sync` | POST | Sync content from WordPress |
| `/api/sync/status` | GET | Get sync status |
| `/api/posts` | GET | List all posts |
| `/api/posts/:slug` | GET | Get single post |
| `/api/pages` | GET | List all pages |
| `/api/pages/:slug` | GET | Get single page |
| `/api/redirects` | GET | List all redirects |
| `/api/preview/post/:id?token=xxx` | GET | Preview draft post |
| `/api/preview/page/:id?token=xxx` | GET | Preview draft page |
| `/robots.txt` | GET | Proxied robots.txt |
| `/sitemap_index.xml` | GET | Proxied sitemap |
| `/llms.txt` | GET | AI crawler file |

---

## Frontend Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with featured posts |
| `/blog` | Blog listing page |
| `/blog/:slug` | Individual post page |

---

## Support

For issues with:
- **This boilerplate**: Check replit.md for architecture details
- **WPGraphQL**: https://www.wpgraphql.com/docs
- **Yoast SEO**: https://yoast.com/help/
- **Replit**: https://docs.replit.com
