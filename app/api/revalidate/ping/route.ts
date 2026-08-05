import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Diagnostic endpoint for WordPress to test connectivity to the Next.js app.
 * Call GET /api/revalidate/ping — no secret required.
 * Returns a JSON payload confirming the server is reachable and whether the
 * required environment variables are configured.
 *
 * Use this URL as the connectivity test in the WordPress headless plugin settings.
 */
export async function GET() {
  const frontendUrl = process.env.FRONTEND_URL;
  const secretSet = Boolean(
    process.env.REVALIDATE_SECRET || process.env.WP_PREVIEW_SECRET
  );

  return NextResponse.json({
    ok: true,
    service: 'blake-hammond-realty',
    revalidateEndpoint: `${frontendUrl ?? '(FRONTEND_URL not set)'}/api/revalidate`,
    env: {
      frontend_url_set: Boolean(frontendUrl),
      secret_set: secretSet,
    },
    timestamp: new Date().toISOString(),
  });
}
