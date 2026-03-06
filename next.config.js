/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true, // gzip/brotli on all responses

  images: {
    // Serve AVIF first (50% smaller than WebP), fall back to WebP, then original
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 30 days at the CDN edge
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        // Supabase Storage public CDN
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // HTTP response headers — applied to every route
  async headers() {
    return [
      {
        // Hashed JS/CSS chunks — immutable for 1 year
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Optimised images endpoint — 30-day cache
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
      {
        // Security headers — HSTS, CSP, COOP are now set by src/middleware.ts
        // Keep only the stable headers that don't require a dynamic nonce.
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff"                         },
          { key: "X-Frame-Options",         value: "SAMEORIGIN"                      },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
