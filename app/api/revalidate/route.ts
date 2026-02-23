import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

interface RevalidateRequest {
  secret: string;
  path?: string;
  oldPath?: string;
  type?: 'post' | 'page' | 'posts' | 'pages' | 'all';
  slug?: string;
  oldSlug?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RevalidateRequest = await request.json();
    const { secret, path, oldPath, type, slug, oldSlug } = body;

    const revalidateSecret = process.env.REVALIDATE_SECRET || process.env.WP_PREVIEW_SECRET;

    if (!secret || secret !== revalidateSecret) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    const revalidatedPaths: string[] = [];

    if (path) {
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      revalidatePath(normalizedPath);
      revalidatedPaths.push(normalizedPath);
    }

    if (oldPath) {
      const normalizedOldPath = oldPath.startsWith('/') ? oldPath : `/${oldPath}`;
      revalidatePath(normalizedOldPath);
      revalidatedPaths.push(`${normalizedOldPath} (old path)`);
    }

    if (type && slug) {
      let contentPath: string;
      
      if (type === 'post' || type === 'posts') {
        contentPath = `/blog/${slug}`;
        revalidatePath(contentPath);
        revalidatedPaths.push(contentPath);
        revalidatePath('/blog');
        revalidatedPaths.push('/blog');
        revalidatePath('/');
        revalidatedPaths.push('/');
      } else {
        contentPath = `/${slug}`;
        revalidatePath(contentPath);
        revalidatedPaths.push(contentPath);
        revalidatePath('/');
        revalidatedPaths.push('/');
      }

      if (oldSlug && oldSlug !== slug) {
        let oldContentPath: string;
        if (type === 'post' || type === 'posts') {
          oldContentPath = `/blog/${oldSlug}`;
        } else {
          oldContentPath = `/${oldSlug}`;
        }
        revalidatePath(oldContentPath);
        revalidatedPaths.push(`${oldContentPath} (old slug)`);
      }
    }

    if (type === 'posts' && !slug) {
      revalidatePath('/blog');
      revalidatePath('/blog/[slug]', 'page');
      revalidatePath('/');
      revalidatedPaths.push('/blog', '/blog/[slug]', '/');
    }

    if (type === 'pages' && !slug) {
      revalidatePath('/[slug]', 'page');
      revalidatePath('/');
      revalidatedPaths.push('/[slug]', '/');
    }

    if (type === 'all') {
      revalidatePath('/', 'layout');
      revalidatedPaths.push('/ (entire site)');
    }

    if (revalidatedPaths.length === 0) {
      return NextResponse.json(
        { error: 'No path, type, or slug provided' },
        { status: 400 }
      );
    }

    console.log(`[Revalidate] Purged cache for: ${revalidatedPaths.join(', ')}`);

    return NextResponse.json({
      success: true,
      revalidated: revalidatedPaths,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Revalidate] Error:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');

  const revalidateSecret = process.env.REVALIDATE_SECRET || process.env.WP_PREVIEW_SECRET;

  if (!secret || secret !== revalidateSecret) {
    return NextResponse.json(
      { error: 'Invalid secret' },
      { status: 401 }
    );
  }

  if (!path) {
    return NextResponse.json(
      { error: 'Missing path parameter' },
      { status: 400 }
    );
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  revalidatePath(normalizedPath);

  console.log(`[Revalidate] Purged cache for: ${normalizedPath}`);

  return NextResponse.json({
    success: true,
    revalidated: [normalizedPath],
    timestamp: new Date().toISOString(),
  });
}
