import type { NextConfig } from "next";

/**
 * L-CODE Dynamics | GOLIÁŠ v3.1 Configuration
 * Optimized for Fitness77 Production.
 */
const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
    deviceSizes: [640, 750, 828, 1080, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: 'https', hostname: 'obchod.fit77.cz' },
      { protocol: 'https', hostname: 'cdn.myshoptet.com' },
      { protocol: 'https', hostname: 'obchod.myshoptet.com' }
    ],
  },
  
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'lenis'],
  },

  async redirects() {
    return [
      {
        source: '/wp-sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
