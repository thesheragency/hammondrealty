import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
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
  async redirects() {
    return [
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
