import { NextRequest, NextResponse } from 'next/server';
import { draftMode } from 'next/headers';
import { isValidPostType, buildPreviewPath } from '@/lib/config/post-types';

/**
 * Validate and sanitize a slug to prevent security issues
 * - Decodes URL encoding to catch encoded attacks
 * - Rejects path traversal attempts (.., backslashes)
 * - Rejects protocol handlers and special characters
 * - Allows hierarchical slugs (parent/child) for nested WordPress pages
 * - Each segment must be alphanumeric with hyphens/underscores
 */
function sanitizeSlug(slug: string): string | null {
  if (!slug) return null;
  
  // Decode URL encoding to catch encoded attacks like %2e%2e
  let decoded: string;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // Invalid encoding
    return null;
  }
  
  // Reject path traversal patterns
  if (decoded.includes('..') || decoded.includes('\\') || decoded.includes('//')) {
    return null;
  }
  
  // Reject protocol handlers and special patterns
  if (decoded.includes('://') || decoded.includes(':')) {
    return null;
  }
  
  // Reject control characters and null bytes
  if (/[\x00-\x1f\x7f]/.test(decoded)) {
    return null;
  }
  
  // Remove leading/trailing slashes and whitespace
  const cleaned = decoded.replace(/^\/+|\/+$/g, '').trim();
  
  // Split into segments for hierarchical slugs (parent/child)
  const segments = cleaned.split('/');
  
  // Validate each segment: alphanumeric, hyphens, underscores only
  // This allows paths like "parent/child" but blocks malicious patterns
  for (const segment of segments) {
    if (!segment || !/^[a-zA-Z0-9_-]+$/.test(segment)) {
      return null;
    }
  }
  
  return cleaned;
}

/**
 * Validate post type against allowlist
 * Only alphanumeric and underscores allowed (WordPress post type format)
 */
function sanitizeType(type: string): string | null {
  if (!type) return null;
  
  // WordPress post types are lowercase alphanumeric with underscores
  if (!/^[a-z0-9_]+$/.test(type)) {
    return null;
  }
  
  return type;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const id = searchParams.get('id');
  const type = searchParams.get('type') || 'post';

  // Validate the preview secret
  if (!secret || secret !== process.env.WP_PREVIEW_SECRET) {
    return NextResponse.json(
      { error: 'Invalid preview secret' },
      { status: 401 }
    );
  }

  // Either slug or id is required
  if (!slug && !id) {
    return NextResponse.json(
      { error: 'Missing slug or id parameter' },
      { status: 400 }
    );
  }

  // Sanitize and validate the type parameter
  const sanitizedType = sanitizeType(type);
  if (!sanitizedType) {
    return NextResponse.json(
      { error: 'Invalid type format' },
      { status: 400 }
    );
  }

  // Validate type against registered post types
  if (!isValidPostType(sanitizedType)) {
    console.warn(`[Preview] Unregistered post type requested: ${sanitizedType}`);
    return NextResponse.json(
      { error: `Post type '${sanitizedType}' is not registered. Add it to lib/config/post-types.ts` },
      { status: 400 }
    );
  }

  // Sanitize slug if provided
  const sanitizedSlug = slug ? sanitizeSlug(slug) : null;
  if (slug && !sanitizedSlug) {
    return NextResponse.json(
      { error: 'Invalid slug format' },
      { status: 400 }
    );
  }

  // Validate ID is numeric if provided
  if (id && !/^\d+$/.test(id)) {
    return NextResponse.json(
      { error: 'Invalid id format' },
      { status: 400 }
    );
  }

  // Enable Draft Mode
  const draft = await draftMode();
  draft.enable();

  // Build the redirect path using the post type configuration
  const pathSlug = sanitizedSlug || `preview-${id}`;
  const redirectPath = buildPreviewPath(sanitizedType, pathSlug);
  
  if (!redirectPath) {
    return NextResponse.json(
      { error: 'Failed to build preview path' },
      { status: 500 }
    );
  }

  // Get the actual host from headers (handles proxied environments like Replit)
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || request.nextUrl.host;
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;
  
  const redirectUrl = new URL(redirectPath, baseUrl);
  
  // Pass the WordPress post ID as a query parameter for draft content fetching
  if (id) {
    redirectUrl.searchParams.set('previewId', id);
  }
  
  // Pass the type for the catch-all route to know which fetcher to use
  redirectUrl.searchParams.set('type', sanitizedType);

  console.log(`[Preview] Redirecting to: ${redirectUrl.pathname}${redirectUrl.search}`);
  
  return NextResponse.redirect(redirectUrl);
}
