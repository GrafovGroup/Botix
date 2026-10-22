import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Home, StandardPage, LocationsPage } from "@/components/site-content";
import { isLocale, locales, pages, siteUrl, ui } from "@/lib/content";
import { journeyPages, servicePage } from "@/lib/journeys";
import { cities } from "@/lib/cities";
import { CityPage } from "@/components/journey-sections";
const allPages = [...pages, ...journeyPages, servicePage];
import { regions } from "@/lib/locations";
type Params = { locale: string; slug?: string[] };
export function generateStaticParams() {
  const paths = [
    "",
    ...allPages.filter((p) => p.slug !== "request-quote").map((p) => p.slug),
    ...cities.map((c) => `locations/cities/${c.slug}`),
    "locations",
    ...regions.map((r) => `locations/${r.slug}`),
  ];
  return locales.flatMap((locale) =>
    paths.map((path) => ({ locale, slug: path ? path.split("/") : [] })),
  );
}
function resolve({ locale, slug }: Params) {
  if (!isLocale(locale)) notFound();
  const path = slug?.join("/") || "";
  const page = allPages.find((p) => p.slug === path);
  const region = regions.find((r) => `locations/${r.slug}` === path);
  const city = cities.find((c) => `locations/cities/${c.slug}` === path);
  if (path && !page && !region && !city && path !== "locations") notFound();
  return { locale, path, page, region, city };
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, path, page, region, city } = resolve(await params);
  const en = locale === "en";
  const title =
    page?.title[locale] ||
    (city
      ? `${en ? "Robotics in" : "Robotique —"} ${city.name[locale]}`
      : undefined) ||
    (region
      ? `${en ? "Robotics in" : "Robotique —"} ${region.name[locale]}`
      : path === "locations"
        ? en
          ? "Robotics across Canada"
          : "La robotique partout au Canada"
        : en
          ? "Commercial & Humanoid Robotics in Canada"
          : "Robotique commerciale et humanoïde au Canada");
  const description =
    page?.intro[locale] ||
    region?.focus[locale] ||
    city?.focus[locale] ||
    (en
      ? "Explore humanoid and commercial robotics with BOTIX. Canadian B2B sourcing, rentals, pilots and integration coordination."
      : "Explorez la robotique humanoïde et commerciale avec BOTIX. Recherche de solutions, location, projets pilotes et coordination au Canada.");
  const route = path ? `/${path}` : "";
  return {
    metadataBase: new URL(siteUrl),
    title: `${title} | BOTIX`,
    description,
    alternates: {
      canonical: `/${locale}${route}`,
      languages: {
        "en-CA": `/en${route}`,
        "fr-CA": `/fr${route}`,
        "x-default": `/en${route}`,
      },
    },
    openGraph: {
      title: `${title} | BOTIX`,
      description,
      url: `/${locale}${route}`,
      siteName: "BOTIX",
      type: "website",
      locale: en ? "en_CA" : "fr_CA",
      alternateLocale: en ? "fr_CA" : "en_CA",
    },
    twitter: { card: "summary", title: `${title} | BOTIX`, description },
  };
}
export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale, path, page, region, city } = resolve(await params);
  const title =
    page?.title[locale] ||
    city?.name[locale] ||
    region?.name[locale] ||
    ui[locale].locations;
  const data = path
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: ui[locale].home,
            item: `${siteUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: title,
            item: `${siteUrl}/${locale}/${path}`,
          },
        ],
      }
    : {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "BOTIX",
        url: siteUrl,
        telephone: "+18336969996",
        areaServed: { "@type": "Country", name: "Canada" },
      };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data).replace(/</g, "\\u003c"),
        }}
      />
      {path && (
        <nav
          className="breadcrumbs"
          aria-label={locale === "en" ? "Breadcrumb" : "Fil d’Ariane"}
        >
          <Link href={`/${locale}`}>{ui[locale].home}</Link>
          <span>/</span>
          <span>{title}</span>
        </nav>
      )}
      {!path ? (
        <Home locale={locale} />
      ) : city ? (
        <CityPage city={city} locale={locale} />
      ) : page ? (
        <StandardPage page={page} locale={locale} />
      ) : (
        <LocationsPage locale={locale} region={region} />
      )}
    </>
  );
}
