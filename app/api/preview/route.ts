import { NextRequest, NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const type = searchParams.get('type') || 'post';

  // Validate the preview secret
  if (!secret || secret !== process.env.WP_PREVIEW_SECRET) {
    return NextResponse.json(
      { error: 'Invalid preview secret' },
      { status: 401 }
    );
  }

  // Slug is required for redirect
  if (!slug) {
    return NextResponse.json(
      { error: 'Missing slug parameter' },
      { status: 400 }
    );
  }

  // Sanitize slug to prevent open redirect attacks
  // WordPress slugs should never start with / or contain ://
  const sanitizedSlug = slug.replace(/^\/+/, '').replace(/[:]/g, '');
  if (sanitizedSlug.includes('://') || sanitizedSlug.startsWith('/')) {
    return NextResponse.json(
      { error: 'Invalid slug format' },
      { status: 400 }
    );
  }

  // Enable Draft Mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the appropriate path based on content type
  let redirectPath: string;
  
  if (type === 'post') {
    redirectPath = `/blog/${sanitizedSlug}`;
  } else if (type === 'page') {
    redirectPath = `/${sanitizedSlug}`;
  } else {
    // For custom post types, use the type as the path prefix
    redirectPath = `/${type}/${sanitizedSlug}`;
  }

  const baseUrl = request.nextUrl.origin;
  const redirectUrl = new URL(redirectPath, baseUrl);

  // Final safety check: ensure redirect stays on same origin
  if (redirectUrl.origin !== request.nextUrl.origin) {
    return NextResponse.json(
      { error: 'Invalid redirect' },
      { status: 400 }
    );
  }

  return NextResponse.redirect(redirectUrl);
}
