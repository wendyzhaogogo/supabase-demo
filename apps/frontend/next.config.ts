import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable full static export - no server needed
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  
  // Configure trailing slash for static hosting
  trailingSlash: true,
  
  // Configure asset prefix for CDN deployment
  assetPrefix: '',
};

export default nextConfig;
