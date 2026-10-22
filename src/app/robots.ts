import { siteEnvironment } from "@/lib/site-environment";
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";
export const dynamic = "force-dynamic";
export default function robots(): MetadataRoute.Robots {
  if (siteEnvironment() === "preview")
    return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
