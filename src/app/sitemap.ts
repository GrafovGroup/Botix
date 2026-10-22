import type { MetadataRoute } from "next";
import { locales, pages, siteUrl } from "@/lib/content";
import { journeyPages, servicePage } from "@/lib/journeys";
import { cities } from "@/lib/cities";
import { regions } from "@/lib/locations";
import { publishableProducts, publishableManufacturers } from "@/lib/catalog";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    ...pages.map((p) => p.slug),
    "robots",
    ...[...journeyPages, servicePage].map((p) => p.slug),
    ...cities.map((c) => `locations/cities/${c.slug}`),
    "locations",
    ...regions.map((r) => `locations/${r.slug}`),
    ...publishableProducts().map((p) => `products/${p.slug}`),
    ...(publishableManufacturers().length ? ["manufacturers"] : []),
    ...publishableManufacturers().map((m) => `manufacturers/${m.slug}`),
  ].flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path ? `/${path}` : ""}`,
      alternates: {
        languages: {
          "en-CA": `${siteUrl}/en${path ? `/${path}` : ""}`,
          "fr-CA": `${siteUrl}/fr${path ? `/${path}` : ""}`,
        },
      },
    })),
  );
}
