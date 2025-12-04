import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  fetchProjects, 
  fetchProjectBySlug, 
  fetchProjectPreview,
  fetchPages,
  fetchPagePreview,
  fetchRedirects,
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

  // Get all projects (from local cache)
  app.get('/api/projects', async (_req: Request, res: Response) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ 
        message: 'Failed to fetch projects',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get featured projects
  app.get('/api/projects/featured', async (_req: Request, res: Response) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      res.status(500).json({ 
        message: 'Failed to fetch featured projects',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get single project by slug
  app.get('/api/projects/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const project = await storage.getProjectBySlug(slug);
      
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ 
        message: 'Failed to fetch project',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Preview endpoint for projects
  app.get('/api/preview/project/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const token = req.query.token as string || req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ message: 'Preview token required' });
      }
      
      const project = await fetchProjectPreview(parseInt(id), token);
      
      if (!project) {
        return res.status(404).json({ message: 'Project not found or not accessible' });
      }
      
      res.json(project);
    } catch (error) {
      console.error('Error fetching project preview:', error);
      res.status(500).json({ 
        message: 'Failed to fetch project preview',
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
      const projectsStatus = await storage.getSyncStatus('projects');
      const pagesStatus = await storage.getSyncStatus('pages');
      const redirectsStatus = await storage.getSyncStatus('redirects');
      
      res.json({
        projects: projectsStatus || null,
        pages: pagesStatus || null,
        redirects: redirectsStatus || null,
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
      projects: { success: false, count: 0, error: null as string | null },
      pages: { success: false, count: 0, error: null as string | null },
      redirects: { success: false, count: 0, error: null as string | null },
    };

    // Sync projects
    try {
      const wpProjects = await fetchProjects();
      
      for (const project of wpProjects) {
        await storage.upsertProject(project);
      }
      
      results.projects.success = true;
      results.projects.count = wpProjects.length;
      
      await storage.upsertSyncStatus({
        entityType: 'projects',
        itemsCount: wpProjects.length,
        status: 'success',
        errorMessage: null,
      });
    } catch (error) {
      results.projects.error = error instanceof Error ? error.message : 'Unknown error';
      
      await storage.upsertSyncStatus({
        entityType: 'projects',
        itemsCount: 0,
        status: 'error',
        errorMessage: results.projects.error,
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

    const allSuccessful = results.projects.success && results.pages.success && results.redirects.success;
    
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

  return httpServer;
}
