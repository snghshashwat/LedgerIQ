/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
  ],

  // Image optimization
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
  },

  // Compression and minification
  compress: true,

  // Production source maps disabled for security
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
