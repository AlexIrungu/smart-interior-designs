import type { NextConfig } from "next";

// GITHUB_PAGES=true builds the static client preview (see .github/workflows/deploy-pages.yml).
// Everything else — local dev and the eventual real host — runs as a normal Next.js server.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/smart-interior-designs" : "";

const nextConfig: NextConfig = {
  ...(isPages && {
    output: "export",
    basePath,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
  env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_STATIC_PREVIEW: String(isPages) },
};

export default nextConfig;
