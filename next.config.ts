import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/library/*": ["./worldbuilding/**/*.md"],
    "/world": ["./worldbuilding/**/*.md"],
  },
};

export default nextConfig;
