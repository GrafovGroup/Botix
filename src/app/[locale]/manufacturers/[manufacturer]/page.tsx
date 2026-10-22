import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, locales, siteUrl } from "@/lib/content";
import { publishableManufacturers } from "@/lib/catalog";
import { ManufacturerTemplate } from "@/components/catalog-templates";
type Params = { locale: string; manufacturer: string };
function get(params: Params) {
  if (!isLocale(params.locale)) notFound();
  const manufacturer = publishableManufacturers().find(
    (m) => m.slug === params.manufacturer,
  );
  if (!manufacturer) notFound();
  return { manufacturer, locale: params.locale };
}
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    publishableManufacturers().map((m) => ({ locale, manufacturer: m.slug })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { manufacturer, locale } = get(await params);
  return {
    title: `${manufacturer.name} | BOTIX`,
    description: manufacturer.summary[locale],
    openGraph: {
      title: manufacturer.name,
      description: manufacturer.summary[locale],
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      url: `${siteUrl}/${locale}/manufacturers/${manufacturer.slug}`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/manufacturers/${manufacturer.slug}`,
      languages: {
        "en-CA": `${siteUrl}/en/manufacturers/${manufacturer.slug}`,
        "fr-CA": `${siteUrl}/fr/manufacturers/${manufacturer.slug}`,
      },
    },
  };
}
export default async function Page({ params }: { params: Promise<Params> }) {
  const { manufacturer, locale } = get(await params);
  return <ManufacturerTemplate manufacturer={manufacturer} locale={locale} />;
}
