import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  reactStrictMode: true,
  serverExternalPackages: ['@takumi-rs/core'],
};

export default nextConfig;
