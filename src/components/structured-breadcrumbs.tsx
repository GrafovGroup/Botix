import { type Locale, siteUrl } from "@/lib/content";
export function StructuredBreadcrumbs({
  locale,
  items,
}: {
  locale: Locale;
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: locale === "en" ? "Home" : "Accueil", path: "" },
      ...items,
    ].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}/${locale}${item.path ? `/${item.path}` : ""}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
