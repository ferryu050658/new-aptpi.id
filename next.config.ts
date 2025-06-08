import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Configuration for cPanel Node.js deployment
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Ensure server-side features work
  serverRuntimeConfig: {
    // Server-only secrets here
  },
  publicRuntimeConfig: {
    // Public config here
  },
  // Don't use static export - we need server for AI
  // output: 'standalone', // Remove this for cPanel Node.js
};

export default nextConfig;