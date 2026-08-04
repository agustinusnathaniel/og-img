import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
    useTypeScriptCli: true,
  },
  partialPrefetching: true,
  reactStrictMode: true,
  serverExternalPackages: ['@takumi-rs/core'],
};

export default nextConfig;
