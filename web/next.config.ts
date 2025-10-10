import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Custom domain configuration for davdev.eu
  // No basePath or assetPrefix needed for custom domains
  
  // Allow cross-origin requests in development mode
  allowedDevOrigins: [
    '192.168.100.75',
    '*.192.168.100.*', // Allow any device on the 192.168.100.x network
    'localhost',
    '127.0.0.1'
  ],
};

export default nextConfig;
