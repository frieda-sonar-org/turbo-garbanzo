import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/turbo-garbanzo' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/turbo-garbanzo' : '',
};

export default nextConfig;
