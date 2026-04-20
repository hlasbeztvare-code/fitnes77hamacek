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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, 
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: 'obchod.fit77.cz' },
      { protocol: 'https', hostname: 'fitness77.cz' },
    ],
  },
  
  // L-CODE Performance Mandate: Standalone output for Mac Mini optimization
  output: 'standalone',

  experimental: {
    optimizePackageImports: [
      'framer-motion', 
      'lucide-react', 
      'lenis', 
      '@framer-motion',
      'clsx',
      'tailwind-merge',
      'lucide-react'
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
