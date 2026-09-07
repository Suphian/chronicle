import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/library/*": ["./worldbuilding/**/*.md"],
  },
};

export default nextConfig;
