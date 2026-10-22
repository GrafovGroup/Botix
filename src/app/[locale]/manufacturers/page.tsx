import { StructuredBreadcrumbs } from "@/components/structured-breadcrumbs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, siteUrl } from "@/lib/content";
import { publishableManufacturers } from "@/lib/catalog";
import { ManufacturerDirectory } from "@/components/catalog-templates";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `${locale === "fr" ? "Fabricants" : "Manufacturers"} | BOTIX`,
    description:
      locale === "fr"
        ? "Références de fabricants et profils robotiques documentés pour la recherche de solutions."
        : "Manufacturer references and sourced robot profiles for solution research.",
    openGraph: {
      title: locale === "fr" ? "Fabricants | BOTIX" : "Manufacturers | BOTIX",
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      url: `${siteUrl}/${locale}/manufacturers`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/manufacturers`,
      languages: {
        "en-CA": `${siteUrl}/en/manufacturers`,
        "fr-CA": `${siteUrl}/fr/manufacturers`,
      },
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const manufacturers = publishableManufacturers();
  if (!isLocale(locale) || !manufacturers.length) notFound();
  return (
    <>
      <StructuredBreadcrumbs
        locale={locale}
        items={[
          {
            name: locale === "en" ? "Manufacturers" : "Fabricants",
            path: "manufacturers",
          },
        ]}
      />
      <section className="section page-intro">
        <h1>{locale === "en" ? "Manufacturers" : "Fabricants"}</h1>
      </section>
      <ManufacturerDirectory manufacturers={manufacturers} locale={locale} />
    </>
  );
}
