import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Custom domain configuration for davdev.eu
  // No basePath or assetPrefix needed for custom domains
};

export default nextConfig;
