import Link from "next/link";
import {
  publishableProducts,
  filterProducts,
  taxonomy,
  type CatalogFilters,
  type Product,
  manufacturers,
} from "@/lib/catalog";
import { type Locale } from "@/lib/content";
export function ProductCard({
  product: p,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  return (
    <article
      className={`product-card ${p.flags.featured ? "featured-product" : ""}`}
    >
      <div className="card-top">
        <span className="eyebrow">{taxonomy.types[p.category][locale]}</span>
        <span aria-hidden>↗</span>
      </div>
      <div className="product-monogram" aria-hidden>
        {p.name[locale]}
      </div>
      <p className="eyebrow">
        {manufacturers.find((m) => m.slug === p.manufacturer)?.name}
      </p>
      <h3>
        <Link href={`/${locale}/products/${p.slug}`}>{p.name[locale]}</Link>
      </h3>
      <p>{p.summary[locale]}</p>
      <div className="mini-tags">
        {p.inquiryOptions.map((i) => (
          <span key={i}>{taxonomy.intents[i][locale]}</span>
        ))}
      </div>
      <span className="editorial-label">
        {locale === "en"
          ? "EDITORIAL PROFILE · FEASIBILITY ON REQUEST"
          : "PROFIL ÉDITORIAL · FAISABILITÉ SUR DEMANDE"}
      </span>
    </article>
  );
}
export function CatalogExplorer({
  locale,
  filters = {},
}: {
  locale: Locale;
  filters?: CatalogFilters;
}) {
  const en = locale === "en";
  const results = filterProducts(publishableProducts(), filters, locale);
  const select = (
    name: keyof CatalogFilters,
    label: string,
    options: Record<string, { en: string; fr: string }>,
  ) => (
    <label className="field">
      {label}
      <select name={name} defaultValue={filters[name] || ""}>
        <option value="">{en ? "All" : "Tous"}</option>
        {Object.entries(options).map(([value, text]) => (
          <option value={value} key={value}>
            {text[locale]}
          </option>
        ))}
      </select>
    </label>
  );
  return (
    <section className="section catalogue-section">
      <form
        className="catalogue-filters"
        action={`/${locale}/robots`}
        method="get"
        role="search"
      >
        <label className="field catalogue-search">
          {en ? "Search the catalogue" : "Rechercher dans le catalogue"}
          <input
            name="query"
            type="search"
            maxLength={120}
            defaultValue={filters.query || ""}
            placeholder={
              en ? "Model, task or manufacturer" : "Modèle, tâche ou fabricant"
            }
          />
        </label>
        {select("type", en ? "Robot type" : "Type de robot", taxonomy.types)}
        {select(
          "application",
          en ? "Application" : "Application",
          taxonomy.applications,
        )}
        {select("industry", en ? "Industry" : "Secteur", taxonomy.industries)}
        {select(
          "intent",
          en ? "Inquiry pathway" : "Type de demande",
          taxonomy.intents,
        )}
        <label className="field">
          {en ? "Sort by" : "Trier par"}
          <select name="sort" defaultValue={filters.sort || "featured"}>
            <option value="featured">
              {en ? "Featured first" : "À découvrir"}
            </option>
            <option value="name-asc">{en ? "Name: A–Z" : "Nom : A–Z"}</option>
            <option value="name-desc">{en ? "Name: Z–A" : "Nom : Z–A"}</option>
          </select>
        </label>
        <div className="filter-actions">
          <button className="button" type="submit">
            {en ? "Apply filters" : "Appliquer"} ↗
          </button>
          <Link className="text-link" href={`/${locale}/robots`}>
            {en ? "Reset" : "Réinitialiser"}
          </Link>
        </div>
      </form>
      <div className="catalogue-results">
        <div className="results-heading">
          <p className="eyebrow">
            {results.length} {en ? "PROFILES" : "PROFILS"}
          </p>
          <Link className="text-link" href={`/${locale}/manufacturers`}>
            {en ? "Manufacturers" : "Fabricants"} ↗
          </Link>
        </div>
        <p className="catalogue-note">
          {en
            ? "Editorial examples for comparison. These profiles do not indicate BOTIX stock, dealership status or rental availability. Tell us your requirements to assess sourcing or pilot feasibility."
            : "Exemples éditoriaux pour comparer les options. Ces profils n’indiquent ni stock BOTIX, ni statut de revendeur, ni disponibilité en location. Présentez vos besoins pour évaluer l’approvisionnement ou un projet pilote."}
        </p>
        {results.length ? (
          <div className="product-grid">
            {results.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <h2>
              {en ? "Let’s broaden the search." : "Élargissons la recherche."}
            </h2>
            <p>
              {en
                ? "No published profile matches every selected filter. Clear a filter, try a different task, or describe your requirements to us."
                : "Aucun profil publié ne correspond à tous les filtres. Retirez un filtre, essayez une autre tâche ou décrivez-nous vos besoins."}
            </p>
            <Link
              className="button"
              href={`/${locale}/request-quote?intent=general`}
            >
              {en ? "Discuss my project" : "Discuter de mon projet"} ↗
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
export function RelatedProducts({
  locale,
  products,
}: {
  locale: Locale;
  products: Product[];
}) {
  if (!products.length) return null;
  return (
    <section className="section">
      <p className="eyebrow">
        {locale === "en" ? "Continue exploring" : "Poursuivre l’exploration"}
      </p>
      <h2>
        {locale === "en" ? "Related approaches." : "Des approches connexes."}
      </h2>
      <div className="product-grid related-grid">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} locale={locale} />
        ))}
      </div>
    </section>
  );
}
