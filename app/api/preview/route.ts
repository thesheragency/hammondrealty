import { NextRequest, NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const id = searchParams.get('id'); // WordPress post ID for draft content
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

  // Sanitize slug to prevent open redirect attacks
  // WordPress slugs should never start with / or contain ://
  const sanitizedSlug = slug ? slug.replace(/^\/+/, '').replace(/[:]/g, '') : '';
  if (sanitizedSlug && (sanitizedSlug.includes('://') || sanitizedSlug.startsWith('/'))) {
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

  // Redirect to the appropriate path based on content type
  // For drafts, we use the slug for the URL but pass ID as a query param for fetching
  const pathSlug = sanitizedSlug || `preview-${id}`;
  let redirectPath: string;
  
  if (type === 'post') {
    redirectPath = `/blog/${pathSlug}`;
  } else if (type === 'page') {
    redirectPath = `/${pathSlug}`;
  } else {
    // For custom post types, use the type as the path prefix
    redirectPath = `/${type}/${pathSlug}`;
  }

  // Get the actual host from headers (handles proxied environments like Replit)
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || request.nextUrl.host;
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;
  
  const redirectUrl = new URL(redirectPath, baseUrl);
  
  // Pass the WordPress post ID as a query parameter for draft content fetching
  // This is needed because drafts may not have a proper slug yet
  if (id) {
    redirectUrl.searchParams.set('previewId', id);
  }

  return NextResponse.redirect(redirectUrl);
}
