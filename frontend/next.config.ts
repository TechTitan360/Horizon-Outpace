import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow dev access from local network
  allowedDevOrigins: ["192.168.1.78"],
};

export default nextConfig;
