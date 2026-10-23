import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, locales, siteUrl } from "@/lib/content";
import { publishableProducts } from "@/lib/catalog";
import { ProductTemplate } from "@/components/catalog-templates";
type Params = { locale: string; product: string };
function get(params: Params) {
  if (!isLocale(params.locale)) notFound();
  const product = publishableProducts().find((p) => p.slug === params.product);
  if (!product) notFound();
  return { product, locale: params.locale };
}
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    publishableProducts().map((p) => ({ locale, product: p.slug })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { product, locale } = get(await params);
  return {
    title: `${product.name[locale]} | BOTIX`,
    description: product.seo.description[locale],
    openGraph: {
      title: product.name[locale],
      description: product.summary[locale],
      url: `${siteUrl}/${locale}/products/${product.slug}`,
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/products/${product.slug}`,
      languages: {
        "en-CA": `${siteUrl}/en/products/${product.slug}`,
        "fr-CA": `${siteUrl}/fr/products/${product.slug}`,
      },
    },
  };
}
export default async function Page({ params }: { params: Promise<Params> }) {
  const { product, locale } = get(await params);
  return <ProductTemplate product={product} locale={locale} />;
}
