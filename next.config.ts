import type { NextConfig } from "next";

// Derive the WordPress media hostname from WP_API_URL so that next/image
// remains valid regardless of whether WordPress is on staging or production.
// Falls back to the known staging hostname if the env var is absent at build time.
function wpMediaHostnames(): { protocol: "https"; hostname: string }[] {
  const wpApiUrl = process.env.WP_API_URL;
  const seen = new Set<string>();
  const patterns: { protocol: "https"; hostname: string }[] = [];

  const add = (h: string) => {
    if (h && !seen.has(h)) {
      seen.add(h);
      patterns.push({ protocol: "https", hostname: h });
    }
  };

  // Always include the known staging host as a fallback
  add("blakehammondrealty.sherstaging.com");

  if (wpApiUrl) {
    try {
      add(new URL(wpApiUrl).hostname);
    } catch {
      // invalid URL — ignore
    }
  }

  return patterns;
}

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // WordPress media — hostname(s) derived from WP_API_URL at build time
      ...wpMediaHostnames(),
      // YouTube thumbnails (for video facade)
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      // Vimeo CDN thumbnails
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
      },
    ],
  },
  allowedDevOrigins: [
    "*.replit.dev",
    "*.replit.app",
    "*.sisko.replit.dev",
    "127.0.0.1",
    "localhost",
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  async headers() {
    return [
      // Long-term cache for immutable Next.js static assets
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Short-term cache for optimized images (Next.js already sets this, but be explicit)
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      // RSC flight payloads must never be cached by the CDN. Cloudflare ignores
      // `Vary: RSC`, so a cached text/x-component response would otherwise be
      // served to real page loads (raw ":HL[...]" text on screen).
      {
        source: "/:path*",
        has: [{ type: "header", key: "RSC", value: "1" }],
        headers: [
          { key: "Cache-Control", value: "private, no-store, max-age=0" },
          { key: "CDN-Cache-Control", value: "no-store" },
          { key: "Cloudflare-CDN-Cache-Control", value: "no-store" },
        ],
      },
      {
        source: "/:path*",
        has: [{ type: "query", key: "_rsc" }],
        headers: [
          { key: "Cache-Control", value: "private, no-store, max-age=0" },
          { key: "CDN-Cache-Control", value: "no-store" },
          { key: "Cloudflare-CDN-Cache-Control", value: "no-store" },
        ],
      },
      // Security headers on all routes
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/get-in-touch",
        destination: "/connect",
        permanent: true,
      },
      // www → non-www: permanent redirect covering all paths (including robots.txt, sitemaps, etc.)
      // Using next.config redirects rather than proxy.ts so it applies reliably with Turbopack builds.
      // Hardcoding the destination origin prevents open-redirect attacks.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.blakehammondrealty.com" }],
        destination: "https://blakehammondrealty.com/:path*",
        statusCode: 301,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/:path([\\w-]*sitemap[\\w-]*\\.(?:xml|xsl))",
        destination: "/api/sitemap-proxy/:path",
      },
    ];
  },
};

export default nextConfig;
