import Link from "next/link";
import {
  publishableProducts,
  filterProducts,
  type CatalogFilters,
  taxonomy,
} from "@/lib/catalog";
import { comparisonProducts } from "@/lib/catalog-comparison";
import { inquiryHref } from "@/lib/inquiry-context";
import type { Locale } from "@/lib/content";
export function ProductComparison({
  locale,
  selected,
  filters = {},
}: {
  locale: Locale;
  filters?: CatalogFilters;
  selected: string | string[] | undefined;
}) {
  const en = locale === "en";
  const products = comparisonProducts(selected);
  return (
    <section className="section" id="compare">
      <p className="eyebrow">
        {en
          ? "Compare the task, then the platform"
          : "Comparez la tâche, puis la plateforme"}
      </p>
      <h2>{en ? "Build your shortlist." : "Créez votre sélection."}</h2>
      <p>
        {en
          ? "Choose up to three profiles. Compare intended uses and inquiry paths; technical fit and availability require project assessment."
          : "Choisissez jusqu’à trois profils. Comparez les usages et les parcours; la compatibilité technique et la disponibilité nécessitent une évaluation du projet."}
      </p>
      <form action={`/${locale}/robots#compare`} method="get">
        {Object.entries(filters).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value || ""} />
        ))}
        <fieldset className="comparison-options">
          <legend>
            {en
              ? "Profiles to compare (maximum 3)"
              : "Profils à comparer (maximum 3)"}
          </legend>
          {filterProducts(publishableProducts(), filters, locale).map((p) => (
            <label key={p.slug}>
              <input
                type="checkbox"
                name="compare"
                value={p.slug}
                defaultChecked={products.some((x) => x.slug === p.slug)}
              />
              {p.name[locale]}
            </label>
          ))}
        </fieldset>
        <button className="button" type="submit">
          {en ? "Compare profiles" : "Comparer les profils"} ↗
        </button>
        <p className="catalogue-note">
          {en
            ? "If you select more than three, only the first three are compared."
            : "Si vous sélectionnez plus de trois profils, seuls les trois premiers seront comparés."}
        </p>
      </form>
      {products.length > 0 && (
        <div
          className="comparison-scroll"
          role="region"
          aria-label={en ? "Product comparison" : "Comparaison des produits"}
          tabIndex={0}
        >
          <table className="comparison-table">
            <caption>
              {en
                ? "Your selected editorial profiles"
                : "Vos profils éditoriaux sélectionnés"}
            </caption>
            <thead>
              <tr>
                <th scope="col">{en ? "Criteria" : "Critères"}</th>
                {products.map((p) => (
                  <th scope="col" key={p.slug}>
                    <Link href={`/${locale}/products/${p.slug}`}>
                      {p.name[locale]}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{en ? "Task" : "Tâche"}</th>
                {products.map((p) => (
                  <td key={p.slug}>{p.intendedUse[locale]}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">
                  {en ? "Industry fit" : "Secteurs pertinents"}
                </th>
                {products.map((p) => (
                  <td key={p.slug}>
                    {p.industries
                      .map((i) => taxonomy.industries[i][locale])
                      .join(" · ")}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">{en ? "Next step" : "Prochaine étape"}</th>
                {products.map((p) => (
                  <td key={p.slug}>
                    {p.inquiryOptions.map((intent) => (
                      <p key={intent}>
                        <Link
                          className="text-link"
                          href={inquiryHref(locale, {
                            intent,
                            category: p.category,
                            product: p.slug,
                          })}
                        >
                          {taxonomy.intents[intent][locale]}
                        </Link>
                      </p>
                    ))}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">
                  {en ? "Source / review date" : "Source / date de révision"}
                </th>
                {products.map((p) => (
                  <td key={p.slug}>
                    <a
                      href={p.evidence.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {en ? "Manufacturer source" : "Source du fabricant"}
                    </a>
                    <p>{p.evidence.checkedOn}</p>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
