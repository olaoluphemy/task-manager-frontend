import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://task-manager-api-s94k.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
