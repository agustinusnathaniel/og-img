import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  serverExternalPackages: ['@takumi-rs/core'],
};

export default nextConfig;
