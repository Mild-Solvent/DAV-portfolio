import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // GitHub Pages uses a subdirectory for project pages
  // Update this if your repo name is different
  basePath: process.env.NODE_ENV === 'production' ? '/DAV-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/DAV-portfolio/' : '',
};

export default nextConfig;
