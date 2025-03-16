import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // This will be used when running `next start`
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // You can add environment variables here
  env: {
    PORT: "5000",
  },
  // Add image domains configuration
  images: {
    domains: ["picsum.photos/", "localhost"],
    // Alternatively, you can use remotePatterns for more control
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'via.placeholder.com',
    //     pathname: '/**',
    //   },
    // ],
  },
};

export default nextConfig;
