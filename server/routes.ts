import type { Express, Request, Response, NextFunction } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { 
  fetchPosts, 
  fetchPostBySlug, 
  fetchPostPreview,
  fetchPages,
  fetchPagePreview,
  fetchRedirects,
  fetchAcfGlobalScripts,
  checkWordPressConnection
} from "./wordpress";

// Get WordPress base URL (without /graphql path)
function getWordPressBaseUrl(): string {
  const wpApiUrl = process.env.WP_API_URL || '';
  // Remove /graphql suffix to get base URL
  return wpApiUrl.replace(/\/graphql\/?$/, '');
}

// Get frontend URL - from env var or auto-detect from request
function getFrontendUrl(req: Request): string {
  // Use explicit FRONTEND_URL if set
  if (process.env.FRONTEND_URL) {
    return process.env.FRONTEND_URL.replace(/\/$/, '');
  }
  
  // Auto-detect from request
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || '';
  return `${protocol}://${host}`;
}

// Fetch and transform XML/text from WordPress, replacing WP URLs with frontend URLs
async function proxyWordPressFile(wpPath: string, frontendUrl: string): Promise<{ content: string; contentType: string } | null> {
  const wpBaseUrl = getWordPressBaseUrl();
  if (!wpBaseUrl) {
    return null;
  }

  try {
    // Build request headers with authentication if available
    const headers: Record<string, string> = {};
    if (process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD) {
      const credentials = Buffer.from(
        `${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`
      ).toString('base64');
      headers['Authorization'] = `Basic ${credentials}`;
    }

    const response = await fetch(`${wpBaseUrl}${wpPath}`, { headers });
    if (!response.ok) {
      return null;
    }

    let content = await response.text();
    const contentType = response.headers.get('content-type') || 'text/plain';

    // Replace WordPress URLs with frontend URLs
    const wpUrl = new URL(wpBaseUrl);
    const wpDomain = wpUrl.origin;
    const wpHost = wpUrl.host;
    
    // Replace full URLs (https://domain.com)
    content = content.replace(new RegExp(escapeRegExp(wpDomain), 'g'), frontendUrl);
    
    // Replace protocol-relative URLs (//domain.com) - used in XSL stylesheets
    content = content.replace(new RegExp(`//${escapeRegExp(wpHost)}`, 'g'), frontendUrl);

    return { content, contentType };
  } catch (error) {
    console.error(`Error fetching ${wpPath} from WordPress:`, error);
    return null;
  }
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Redirect middleware
async function redirectMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip API routes
  if (req.path.startsWith('/api')) {
    return next();
  }

  try {
    const redirects = await storage.getAllRedirects();
    const redirect = redirects.find(r => r.origin === req.path || r.origin === req.path.replace(/\/$/, ''));
    
    if (redirect) {
      return res.redirect(redirect.type || 301, redirect.target);
    }
  } catch (error) {
    console.error('Redirect check error:', error);
  }
  
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Apply redirect middleware
  app.use(redirectMiddleware);

  // Health check endpoint
  app.get('/api/health', async (_req: Request, res: Response) => {
    try {
      const wpConnected = await checkWordPressConnection();
      res.json({
        status: 'ok',
        wordpress: wpConnected ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  // Get all posts (from local cache)
  app.get('/api/posts', async (_req: Request, res: Response) => {
    try {
      const posts = await storage.getAllPosts();
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ 
        message: 'Failed to fetch posts',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get featured posts
  app.get('/api/posts/featured', async (_req: Request, res: Response) => {
    try {
      const posts = await storage.getFeaturedPosts();
      res.json(posts);
    } catch (error) {
      console.error('Error fetching featured posts:', error);
      res.status(500).json({ 
        message: 'Failed to fetch featured posts',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get single post by slug
  app.get('/api/posts/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const post = await storage.getPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      res.json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ 
        message: 'Failed to fetch post',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Preview endpoint for posts
  app.get('/api/preview/post/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const token = req.query.token as string || req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ message: 'Preview token required' });
      }
      
      const post = await fetchPostPreview(parseInt(id), token);
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found or not accessible' });
      }
      
      res.json(post);
    } catch (error) {
      console.error('Error fetching post preview:', error);
      res.status(500).json({ 
        message: 'Failed to fetch post preview',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Preview endpoint for pages
  app.get('/api/preview/page/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const token = req.query.token as string || req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ message: 'Preview token required' });
      }
      
      const page = await fetchPagePreview(parseInt(id), token);
      
      if (!page) {
        return res.status(404).json({ message: 'Page not found or not accessible' });
      }
      
      res.json(page);
    } catch (error) {
      console.error('Error fetching page preview:', error);
      res.status(500).json({ 
        message: 'Failed to fetch page preview',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get all redirects
  app.get('/api/redirects', async (_req: Request, res: Response) => {
    try {
      const redirects = await storage.getAllRedirects();
      res.json(redirects);
    } catch (error) {
      console.error('Error fetching redirects:', error);
      res.status(500).json({ 
        message: 'Failed to fetch redirects',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get sync status
  app.get('/api/sync/status', async (_req: Request, res: Response) => {
    try {
      const postsStatus = await storage.getSyncStatus('posts');
      const pagesStatus = await storage.getSyncStatus('pages');
      const redirectsStatus = await storage.getSyncStatus('redirects');
      const globalScriptsStatus = await storage.getSyncStatus('globalScripts');
      
      res.json({
        posts: postsStatus || null,
        pages: pagesStatus || null,
        redirects: redirectsStatus || null,
        globalScripts: globalScriptsStatus || null,
      });
    } catch (error) {
      console.error('Error fetching sync status:', error);
      res.status(500).json({ 
        message: 'Failed to fetch sync status',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Sync WordPress content
  app.post('/api/wordpress/sync', async (req: Request, res: Response) => {
    const results = {
      posts: { success: false, count: 0, error: null as string | null },
      pages: { success: false, count: 0, error: null as string | null },
      redirects: { success: false, count: 0, error: null as string | null },
      globalScripts: { success: false, count: 0, error: null as string | null },
    };

    // Sync posts
    try {
      const wpPosts = await fetchPosts();
      
      for (const post of wpPosts) {
        await storage.upsertPost(post);
      }
      
      results.posts.success = true;
      results.posts.count = wpPosts.length;
      
      await storage.upsertSyncStatus({
        entityType: 'posts',
        itemsCount: wpPosts.length,
        status: 'success',
        errorMessage: null,
      });
    } catch (error) {
      results.posts.error = error instanceof Error ? error.message : 'Unknown error';
      
      await storage.upsertSyncStatus({
        entityType: 'posts',
        itemsCount: 0,
        status: 'error',
        errorMessage: results.posts.error,
      });
    }

    // Sync pages
    try {
      const wpPages = await fetchPages();
      
      for (const page of wpPages) {
        await storage.upsertPage(page);
      }
      
      results.pages.success = true;
      results.pages.count = wpPages.length;
      
      await storage.upsertSyncStatus({
        entityType: 'pages',
        itemsCount: wpPages.length,
        status: 'success',
        errorMessage: null,
      });
    } catch (error) {
      results.pages.error = error instanceof Error ? error.message : 'Unknown error';
      
      await storage.upsertSyncStatus({
        entityType: 'pages',
        itemsCount: 0,
        status: 'error',
        errorMessage: results.pages.error,
      });
    }

    // Sync redirects
    try {
      const wpRedirects = await fetchRedirects();
      
      // Clear existing redirects and insert new ones
      await storage.clearRedirects();
      
      for (const redirect of wpRedirects) {
        await storage.upsertRedirect({
          origin: redirect.origin,
          target: redirect.target,
          type: redirect.type,
          format: redirect.format,
        });
      }
      
      results.redirects.success = true;
      results.redirects.count = wpRedirects.length;
      
      await storage.upsertSyncStatus({
        entityType: 'redirects',
        itemsCount: wpRedirects.length,
        status: 'success',
        errorMessage: null,
      });
    } catch (error) {
      results.redirects.error = error instanceof Error ? error.message : 'Unknown error';
      
      await storage.upsertSyncStatus({
        entityType: 'redirects',
        itemsCount: 0,
        status: 'error',
        errorMessage: results.redirects.error,
      });
    }

    // Sync ACF global scripts
    try {
      const globalScripts = await fetchAcfGlobalScripts();
      let count = 0;
      
      if (globalScripts.headScripts) {
        await storage.upsertGlobalSetting({
          key: 'global_head_scripts',
          value: globalScripts.headScripts,
        });
        count++;
      }
      
      if (globalScripts.bodyScripts) {
        await storage.upsertGlobalSetting({
          key: 'global_body_scripts',
          value: globalScripts.bodyScripts,
        });
        count++;
      }
      
      results.globalScripts.success = true;
      results.globalScripts.count = count;
      
      await storage.upsertSyncStatus({
        entityType: 'globalScripts',
        itemsCount: count,
        status: 'success',
        errorMessage: null,
      });
    } catch (error) {
      results.globalScripts.error = error instanceof Error ? error.message : 'Unknown error';
      
      await storage.upsertSyncStatus({
        entityType: 'globalScripts',
        itemsCount: 0,
        status: 'error',
        errorMessage: results.globalScripts.error,
      });
    }

    const allSuccessful = results.posts.success && results.pages.success && results.redirects.success && results.globalScripts.success;
    
    res.status(allSuccessful ? 200 : 207).json({
      message: allSuccessful ? 'Sync completed successfully' : 'Sync completed with some errors',
      results,
      timestamp: new Date().toISOString(),
    });
  });

  // Get pages
  app.get('/api/pages', async (_req: Request, res: Response) => {
    try {
      const pages = await storage.getAllPages();
      res.json(pages);
    } catch (error) {
      console.error('Error fetching pages:', error);
      res.status(500).json({ 
        message: 'Failed to fetch pages',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get single page by slug
  app.get('/api/pages/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const page = await storage.getPageBySlug(slug);
      
      if (!page) {
        return res.status(404).json({ message: 'Page not found' });
      }
      
      res.json(page);
    } catch (error) {
      console.error('Error fetching page:', error);
      res.status(500).json({ 
        message: 'Failed to fetch page',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get global settings (ACF scripts)
  app.get('/api/global-settings', async (_req: Request, res: Response) => {
    try {
      const settings = await storage.getAllGlobalSettings();
      const result: Record<string, string | null> = {};
      
      for (const setting of settings) {
        result[setting.key] = setting.value;
      }
      
      res.json(result);
    } catch (error) {
      console.error('Error fetching global settings:', error);
      res.status(500).json({ 
        message: 'Failed to fetch global settings',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get specific global setting by key
  app.get('/api/global-settings/:key', async (req: Request, res: Response) => {
    try {
      const { key } = req.params;
      const setting = await storage.getGlobalSetting(key);
      
      if (!setting) {
        return res.status(404).json({ message: 'Setting not found' });
      }
      
      res.json(setting);
    } catch (error) {
      console.error('Error fetching global setting:', error);
      res.status(500).json({ 
        message: 'Failed to fetch global setting',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // ============================================
  // SEO File Proxies (sitemap, robots, llms.txt)
  // ============================================

  // Proxy Yoast SEO XSL stylesheets (needed for sitemap rendering in browser)
  app.get('/wp-content/plugins/wordpress-seo/*', async (req: Request, res: Response) => {
    const frontendUrl = getFrontendUrl(req);
    const result = await proxyWordPressFile(req.path, frontendUrl);
    
    if (!result) {
      return res.status(404).send('File not found');
    }
    
    res.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.type(result.contentType).send(result.content);
  });

  // Sitemap proxy - catches all sitemap XML files from Yoast
  app.get('/sitemap*.xml', async (req: Request, res: Response) => {
    const frontendUrl = getFrontendUrl(req);
    const result = await proxyWordPressFile(req.path, frontendUrl);
    
    if (!result) {
      return res.status(404).type('text/plain').send('Sitemap not found');
    }
    
    res.set('Cache-Control', 'public, max-age=3600');
    res.type(result.contentType || 'application/xml').send(result.content);
  });

  // Also handle sitemap_index.xml specifically (Yoast default)
  app.get('/sitemap_index.xml', async (req: Request, res: Response) => {
    const frontendUrl = getFrontendUrl(req);
    
    // Try Yoast sitemap first, then WordPress native sitemap
    let result = await proxyWordPressFile('/sitemap_index.xml', frontendUrl);
    if (!result) {
      result = await proxyWordPressFile('/wp-sitemap.xml', frontendUrl);
    }
    
    if (!result) {
      return res.status(404).type('text/plain').send('Sitemap index not found');
    }
    
    res.set('Cache-Control', 'public, max-age=3600');
    res.type(result.contentType || 'application/xml').send(result.content);
  });

  // Handle WordPress native sitemap
  app.get('/wp-sitemap.xml', async (req: Request, res: Response) => {
    const frontendUrl = getFrontendUrl(req);
    const result = await proxyWordPressFile('/wp-sitemap.xml', frontendUrl);
    
    if (!result) {
      return res.status(404).type('text/plain').send('WordPress sitemap not found');
    }
    
    res.set('Cache-Control', 'public, max-age=3600');
    res.type(result.contentType || 'application/xml').send(result.content);
  });

  // Handle WordPress native sitemap sub-pages
  app.get('/wp-sitemap-*.xml', async (req: Request, res: Response) => {
    const frontendUrl = getFrontendUrl(req);
    const result = await proxyWordPressFile(req.path, frontendUrl);
    
    if (!result) {
      return res.status(404).type('text/plain').send('Sitemap not found');
    }
    
    res.set('Cache-Control', 'public, max-age=3600');
    res.type(result.contentType || 'application/xml').send(result.content);
  });

  // Robots.txt proxy from WordPress/Yoast
  app.get('/robots.txt', async (req: Request, res: Response) => {
    const frontendUrl = getFrontendUrl(req);
    const result = await proxyWordPressFile('/robots.txt', frontendUrl);
    
    res.set('Cache-Control', 'public, max-age=3600');
    
    if (!result) {
      // Fallback: generate a basic robots.txt
      const fallbackRobots = `User-agent: *
Allow: /

Sitemap: ${frontendUrl}/sitemap_index.xml
`;
      return res.type('text/plain').send(fallbackRobots);
    }
    
    res.type('text/plain').send(result.content);
  });

  // llms.txt - AI crawler guidance file
  // First tries to fetch from WordPress, then generates from synced content
  app.get('/llms.txt', async (req: Request, res: Response) => {
    const frontendUrl = getFrontendUrl(req);
    
    res.set('Cache-Control', 'public, max-age=3600');
    
    // Try to fetch from WordPress first (if plugin generates it)
    const wpResult = await proxyWordPressFile('/llms.txt', frontendUrl);
    if (wpResult) {
      return res.type('text/plain').send(wpResult.content);
    }
    
    // Generate from synced content
    try {
      const posts = await storage.getAllPosts();
      const pages = await storage.getAllPages();
      
      let content = `# ${frontendUrl.replace(/https?:\/\//, '')}

> This site is powered by headless WordPress with a React frontend.

## Pages

`;
      
      for (const page of pages) {
        const pageDesc = page.seoMetadata?.metaDesc || page.content?.replace(/<[^>]*>/g, '').slice(0, 150) || 'Page content';
        content += `- [${page.title}](${frontendUrl}/${page.slug}): ${pageDesc}\n`;
      }
      
      content += `
## Blog Posts

`;
      
      for (const post of posts) {
        const postDesc = post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 150) || post.seoMetadata?.metaDesc || 'Blog post';
        content += `- [${post.title}](${frontendUrl}/blog/${post.slug}): ${postDesc}\n`;
      }
      
      content += `
## Optional

- [Sitemap](${frontendUrl}/sitemap_index.xml)
`;
      
      res.type('text/plain').send(content);
    } catch (error) {
      console.error('Error generating llms.txt:', error);
      res.status(500).type('text/plain').send('Error generating llms.txt');
    }
  });

  // llms-full.txt - Extended version with more content for AI training
  app.get('/llms-full.txt', async (req: Request, res: Response) => {
    const frontendUrl = getFrontendUrl(req);
    
    res.set('Cache-Control', 'public, max-age=3600');
    
    try {
      const posts = await storage.getAllPosts();
      const pages = await storage.getAllPages();
      
      let content = `# ${frontendUrl.replace(/https?:\/\//, '')} - Full Content

> Complete content index for AI systems.

`;
      
      // Add pages with full content
      content += `## Pages\n\n`;
      for (const page of pages) {
        const plainContent = page.content?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '';
        content += `### ${page.title}\n`;
        content += `URL: ${frontendUrl}/${page.slug}\n`;
        content += `${plainContent.slice(0, 1000)}${plainContent.length > 1000 ? '...' : ''}\n\n`;
      }
      
      // Add posts with full content
      content += `## Blog Posts\n\n`;
      for (const post of posts) {
        const plainContent = post.content?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '';
        content += `### ${post.title}\n`;
        content += `URL: ${frontendUrl}/blog/${post.slug}\n`;
        content += `Published: ${post.publishedAt || 'N/A'}\n`;
        content += `${plainContent.slice(0, 1000)}${plainContent.length > 1000 ? '...' : ''}\n\n`;
      }
      
      res.type('text/plain').send(content);
    } catch (error) {
      console.error('Error generating llms-full.txt:', error);
      res.status(500).type('text/plain').send('Error generating llms-full.txt');
    }
  });

  // Frontend route validation middleware
  // Returns proper 404 status for invalid frontend routes
  const STATIC_FRONTEND_ROUTES = ['/', '/blog'];
  
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    const pathname = req.path;
    
    // Skip API routes and static assets
    if (pathname.startsWith('/api') || 
        pathname.startsWith('/assets') || 
        pathname.startsWith('/src') ||
        pathname.startsWith('/node_modules') ||
        pathname.startsWith('/@') ||
        pathname.startsWith('/vite') ||
        pathname.includes('.')) {
      return next();
    }
    
    // Check static routes - pass through to Vite
    if (STATIC_FRONTEND_ROUTES.includes(pathname)) {
      return next();
    }
    
    // Check blog post routes
    const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
    if (blogMatch) {
      const slug = blogMatch[1];
      const post = await storage.getPostBySlug(slug);
      if (post) {
        return next();
      }
    }
    
    // Unknown route or post not found - override res.status to ensure 404
    const originalStatus = res.status.bind(res);
    res.status = function(code: number) {
      // Force 404 for invalid routes, ignore Vite's 200
      return originalStatus(404);
    };
    next();
  });

  return httpServer;
}
