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

  return httpServer;
}
