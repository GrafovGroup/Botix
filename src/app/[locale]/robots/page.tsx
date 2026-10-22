import { StructuredBreadcrumbs } from "@/components/structured-breadcrumbs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, siteUrl } from "@/lib/content";
import { CatalogExplorer } from "@/components/catalog-explorer";
import type { CatalogFilters } from "@/lib/catalog";
type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `${locale === "fr" ? "Catalogue de robots commerciaux" : "Commercial robot catalogue"} | BOTIX`,
    description:
      locale === "fr"
        ? "Comparez des profils documentés par type, application et secteur. Discutez de l’achat, de la location ou d’un projet pilote."
        : "Compare sourced robot profiles by type, application and industry. Discuss purchase, rental or pilot feasibility.",
    alternates: {
      canonical: `${siteUrl}/${locale}/robots`,
      languages: {
        "en-CA": `${siteUrl}/en/robots`,
        "fr-CA": `${siteUrl}/fr/robots`,
      },
    },
    openGraph: {
      title:
        locale === "fr"
          ? "BOTIX | Catalogue de robots"
          : "BOTIX | Robot catalogue",
      type: "website",
      url: `${siteUrl}/${locale}/robots`,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
    },
  };
}
export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const query = await searchParams;
  const filters: CatalogFilters = {};
  for (const key of [
    "query",
    "type",
    "application",
    "industry",
    "intent",
    "sort",
  ] as const) {
    const value = query[key];
    if (typeof value === "string") filters[key] = value.slice(0, 120);
  }
  return (
    <>
      <StructuredBreadcrumbs
        locale={locale}
        items={[
          {
            name: locale === "en" ? "Robot catalogue" : "Catalogue de robots",
            path: "robots",
          },
        ]}
      />
      <section className="section page-intro catalogue-intro">
        <p className="eyebrow">
          {locale === "en"
            ? "Robot intelligence / The catalogue"
            : "Intelligence robotique / Le catalogue"}
        </p>
        <h1>
          {locale === "en"
            ? "Find your starting point."
            : "Trouvez votre point de départ."}
        </h1>
        <p className="lead">
          {locale === "en"
            ? "From humanoid research to everyday automation. Compare the task, explore the platform, then build a practical project brief."
            : "De la recherche humanoïde à l’automatisation quotidienne. Comparez la tâche, explorez la plateforme, puis définissez votre projet."}
        </p>
      </section>
      <CatalogExplorer locale={locale} filters={filters} />
    </>
  );
}
