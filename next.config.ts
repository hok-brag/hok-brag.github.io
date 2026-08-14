import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: githubPages ? "export" : undefined,
  basePath: "",                    
  env: {
    NEXT_PUBLIC_BASE_PATH: "",     
  },
  trailingSlash: githubPages,
  images: { unoptimized: true },
};

export default nextConfig;
