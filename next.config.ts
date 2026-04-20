import type { NextConfig } from "next";

/**
 * L-CODE Dynamics | GOLIÁŠ v3.1 Configuration
 * Optimized for Fitness77 Production.
 */
const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  compress: true,
  poweredByHeader: false,
  reactStrictMode: false, // Performance increase: disable strict mode in production-like env
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year for maximum performance
    dangerouslyAllowSVG: true,
  },
  
  experimental: {
    optimizePackageImports: [
      'framer-motion', 
      'lucide-react', 
      'lenis', 
      '@framer-motion',
      'clsx',
      'tailwind-merge'
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
};

export default nextConfig;
