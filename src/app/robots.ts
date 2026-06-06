import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${brand.siteUrl}/sitemap.xml`,
  };
}
cd "c:/Users/Bishal/Documents/Codex/2026-05-28/https-chatgpt-com-share-6a17bad9-dc8c"
git remote remove haha
git remote add haha git@github.com:bishalahmednirob1/haha.git
git push haha --all
git push haha --tags