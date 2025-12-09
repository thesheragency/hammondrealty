import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { 
  fetchPosts, 
  fetchPages, 
  fetchRedirects, 
  fetchAcfGlobalScripts 
} from '@/lib/wordpress';

export const dynamic = 'force-dynamic';

interface SyncResult {
  count: number;
  status: 'success' | 'error';
  error?: string;
}

export async function POST() {
  const results: Record<string, SyncResult> = {
    posts: { count: 0, status: 'success' },
    pages: { count: 0, status: 'success' },
    redirects: { count: 0, status: 'success' },
    globalSettings: { count: 0, status: 'success' },
  };

  try {
    const posts = await fetchPosts();
    for (const post of posts) {
      await storage.upsertPost(post);
    }
    results.posts.count = posts.length;
    await storage.upsertSyncStatus({
      entityType: 'posts',
      itemsCount: posts.length,
      status: 'success',
    });
  } catch (error) {
    results.posts.status = 'error';
    results.posts.error = error instanceof Error ? error.message : 'Unknown error';
    await storage.upsertSyncStatus({
      entityType: 'posts',
      itemsCount: 0,
      status: 'error',
      errorMessage: results.posts.error,
    });
  }

  try {
    const pages = await fetchPages();
    for (const page of pages) {
      await storage.upsertPage(page);
    }
    results.pages.count = pages.length;
    await storage.upsertSyncStatus({
      entityType: 'pages',
      itemsCount: pages.length,
      status: 'success',
    });
  } catch (error) {
    results.pages.status = 'error';
    results.pages.error = error instanceof Error ? error.message : 'Unknown error';
  }

  try {
    const redirects = await fetchRedirects();
    await storage.clearRedirects();
    for (const redirect of redirects) {
      await storage.upsertRedirect(redirect);
    }
    results.redirects.count = redirects.length;
    await storage.upsertSyncStatus({
      entityType: 'redirects',
      itemsCount: redirects.length,
      status: 'success',
    });
  } catch (error) {
    results.redirects.status = 'error';
    results.redirects.error = error instanceof Error ? error.message : 'Unknown error';
  }

  try {
    const globalScripts = await fetchAcfGlobalScripts();
    if (globalScripts.headScripts !== null) {
      await storage.upsertGlobalSetting({
        key: 'global_head_scripts',
        value: globalScripts.headScripts,
      });
      results.globalSettings.count++;
    }
    if (globalScripts.bodyScripts !== null) {
      await storage.upsertGlobalSetting({
        key: 'global_body_scripts',
        value: globalScripts.bodyScripts,
      });
      results.globalSettings.count++;
    }
  } catch (error) {
    results.globalSettings.status = 'error';
    results.globalSettings.error = error instanceof Error ? error.message : 'Unknown error';
  }

  const hasErrors = Object.values(results).some(r => r.status === 'error');

  return NextResponse.json({
    success: !hasErrors,
    results,
    syncedAt: new Date().toISOString(),
  });
}
