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
  
  // Configure asset prefix for GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '/supabase-demo' : '',
  
  // Set base path for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/supabase-demo' : '',
};

export default nextConfig;
