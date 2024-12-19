import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        protocol: "https",
        pathname: "/avatars/**"
      }
    ]
  }
};

export default nextConfig;
