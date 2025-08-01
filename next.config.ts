import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    turbo: {
      rules: {
        '*.heic': {
          loaders: ['file-loader'],
          as: '*.jpg',
        },
      },
    },
  },
};

export default nextConfig;
