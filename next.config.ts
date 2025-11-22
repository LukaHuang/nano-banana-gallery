import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
