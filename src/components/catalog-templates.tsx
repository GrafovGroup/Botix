import Link from "next/link";
import Image from "next/image";
import { type Locale, bi } from "@/lib/content";
import {
  type Product,
  type Manufacturer,
  publishableProducts,
  manufacturers,
  taxonomy,
  quoteHref,
} from "@/lib/catalog";
import { ProductCard, RelatedProducts } from "./catalog-explorer";
import { StructuredBreadcrumbs } from "./structured-breadcrumbs";
import { QuoteCTA } from "./site-content";
export function ProductTemplate({
  product: p,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const en = locale === "en";
  const maker = manufacturers.find((m) => m.slug === p.manufacturer)!;
  const related = publishableProducts()
    .filter(
      (other) =>
        other.slug !== p.slug &&
        other.industries.some((i) => p.industries.includes(i)),
    )
    .slice(0, 3);
  const faqs = [
    {
      q: bi(
        "Can I buy or rent this model through BOTIX?",
        "Puis-je acheter ou louer ce modèle auprès de BOTIX?",
      ),
      a: bi(
        "This is an editorial profile, not a stock listing. Ask us to assess sourcing, rental or pilot feasibility for your location, dates and application. No dealer relationship or availability is implied.",
        "Il s’agit d’un profil éditorial, non d’une annonce de stock. Demandez une évaluation selon le lieu, les dates et l’application. Aucun statut de revendeur ni disponibilité n’est implicite.",
      ),
    },
    {
      q: bi(
        "What should I confirm before choosing a platform?",
        "Que dois-je confirmer avant de choisir une plateforme?",
      ),
      a: p.intendedUse,
    },
    {
      q: bi(
        "Where do these specifications come from?",
        "D’où proviennent ces caractéristiques?",
      ),
      a: bi(
        "Each fact below links to its manufacturer source and review date. Confirm the current edition, accessories and operating conditions in the project assessment.",
        "Chaque caractéristique renvoie à la source du fabricant et à la date de vérification. Confirmez l’édition, les accessoires et les conditions dans l’évaluation du projet.",
      ),
    },
  ];
  return (
    <>
      <StructuredBreadcrumbs locale={locale} items={[{name:en?"Robot catalogue":"Catalogue de robots",path:"robots"},{name:p.name[locale],path:`products/${p.slug}`}]}/>
      <nav
        className="breadcrumbs"
        aria-label={en ? "Breadcrumb" : "Fil d’Ariane"}
      >
        <Link href={`/${locale}`}>{en ? "Home" : "Accueil"}</Link>
        <span>/</span>
        <Link href={`/${locale}/robots`}>
          {en ? "Robot catalogue" : "Catalogue de robots"}
        </Link>
        <span>/</span>
        <span>{p.name[locale]}</span>
      </nav>
      <section className="section product-hero">
        <div>
          <p className="eyebrow">
            {en ? "Editorial robot profile" : "Profil éditorial de robot"} /{" "}
            {taxonomy.types[p.category][locale]}
          </p>
          <h1>{p.name[locale]}</h1>
          <Link
            className="text-link"
            href={`/${locale}/manufacturers/${maker.slug}`}
          >
            {maker.name} ↗
          </Link>
          <p className="lead">{p.summary[locale]}</p>
          <div className="hero-buttons">
            {p.flags.inquiries &&
              p.inquiryOptions.map((intent, i) => (
                <Link
                  key={intent}
                  className={`button ${i ? "ghost" : ""}`}
                  href={quoteHref(locale, intent, p)}
                >
                  {taxonomy.intents[intent][locale]} ↗
                </Link>
              ))}
          </div>
        </div>
        <aside className="product-brief">
          <p className="eyebrow">
            {en ? "Evaluate the application" : "Évaluer l’application"}
          </p>
          <h2>{en ? "Start with the task." : "Commencez par la tâche."}</h2>
          <p>{p.intendedUse[locale]}</p>
          <span className="editorial-label">
            {en
              ? "SOURCING AND AVAILABILITY REQUIRE ASSESSMENT"
              : "APPROVISIONNEMENT ET DISPONIBILITÉ À ÉVALUER"}
          </span>
        </aside>
      </section>
      {p.media.some((m) => m.locale === locale) && (
        <section
          className="section product-gallery"
          aria-label={en ? "Product gallery" : "Galerie du produit"}
        >
          {p.media
            .filter((m) => m.locale === locale)
            .map((m) => (
              <figure key={m.src}>
                <Image
                  src={m.src}
                  alt={m.alt[locale]}
                  width={1200}
                  height={800}
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
                {m.attribution && (
                  <figcaption>{m.attribution[locale]}</figcaption>
                )}
              </figure>
            ))}
        </section>
      )}
      <section className="section product-details">
        <div>
          <p className="eyebrow">
            {en ? "Evaluation points" : "Points à évaluer"}
          </p>
          <h2>{en ? "Where it fits." : "Sa place dans votre projet."}</h2>
          {p.benefits.map((b) => (
            <p key={b.en}>{b[locale]}</p>
          ))}
          <h3>{en ? "Applications to assess" : "Applications à évaluer"}</h3>
          <ul>
            {p.applications.map((a) => (
              <li key={a}>{taxonomy.applications[a][locale]}</li>
            ))}
          </ul>
          <h3>{en ? "Industry pathways" : "Parcours sectoriels"}</h3>
          <div className="mini-tags">
            {p.industries.map((i) => (
              <Link key={i} href={`/${locale}/industries/${i}`}>
                {taxonomy.industries[i][locale]} ↗
              </Link>
            ))}
          </div>
          <Link
            className="text-link"
            href={`/${locale}/${p.relatedSolutions[0]}`}
          >
            {en ? "Explore this category" : "Explorer cette catégorie"} ↗
          </Link>
        </div>
        <div>
          {p.facts.length > 0 && (
            <>
              <p className="eyebrow">
                {en ? "Source-backed facts" : "Caractéristiques documentées"}
              </p>
              <h2>
                {en
                  ? "A grounded starting point."
                  : "Un point de départ documenté."}
              </h2>
              <dl className="spec-list">
                {p.facts.map((f) => (
                  <div className="spec-row" key={f.label.en}>
                    <dt>{f.label[locale]}</dt>
                    <dd>
                      {f.value[locale]}
                      <a
                        href={f.evidence.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {en ? "Manufacturer source" : "Source du fabricant"} ↗ ·{" "}
                        {en ? "Reviewed" : "Vérifié le"} {f.evidence.checkedOn}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}
          <p className="catalogue-note">
            {en
              ? "Specifications describe the manufacturer’s referenced configuration. They are not a guarantee of performance in your environment or a BOTIX commercial offer."
              : "Les caractéristiques décrivent la configuration référencée du fabricant. Elles ne constituent ni une garantie dans votre environnement ni une offre commerciale BOTIX."}
          </p>
        </div>
      </section>
      <section className="section faq-section">
        <h2>{en ? "Before your next step." : "Avant de poursuivre."}</h2>
        <div>
          {faqs.map((f) => (
            <details key={f.q.en}>
              <summary>
                {f.q[locale]}
                <span aria-hidden>+</span>
              </summary>
              <p>{f.a[locale]}</p>
            </details>
          ))}
        </div>
      </section>
      <RelatedProducts products={related} locale={locale} />
    </>
  );
}
export function ManufacturerDirectory({
  manufacturers: items,
  locale,
}: {
  manufacturers: Manufacturer[];
  locale: Locale;
}) {
  return (
    <>
      <p className="section catalogue-note directory-note">
        {locale === "en"
          ? "Manufacturer references support product research. Listing does not indicate a partnership or authorised dealer relationship."
          : "Ces références facilitent la recherche de produits. La présence d’un fabricant n’indique ni partenariat ni statut de revendeur autorisé."}
      </p>
      <section className="section location-grid">
        {items.map((m) => (
          <Link key={m.slug} href={`/${locale}/manufacturers/${m.slug}`}>
            <p className="eyebrow">
              {locale === "en"
                ? "Manufacturer reference"
                : "Référence fabricant"}
            </p>
            <h2>{m.name}</h2>
            <p>{m.summary[locale]}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
export function ManufacturerTemplate({
  manufacturer: m,
  locale,
}: {
  manufacturer: Manufacturer;
  locale: Locale;
}) {
  return (
    <>
      <StructuredBreadcrumbs locale={locale} items={[{name:locale==="en"?"Manufacturers":"Fabricants",path:"manufacturers"},{name:m.name,path:`manufacturers/${m.slug}`}]}/>
      <nav
        className="breadcrumbs"
        aria-label={locale === "en" ? "Breadcrumb" : "Fil d’Ariane"}
      >
        <Link href={`/${locale}/manufacturers`}>
          {locale === "en" ? "Manufacturers" : "Fabricants"}
        </Link>
        <span>/</span>
        <span>{m.name}</span>
      </nav>
      <section className="section page-intro">
        <p className="eyebrow">
          {locale === "en" ? "Manufacturer reference" : "Référence fabricant"}
        </p>
        <h1>{m.name}</h1>
        <p className="lead">{m.summary[locale]}</p>
        <p>
          {locale === "en"
            ? "Research reference only; no BOTIX dealer or partnership relationship is implied."
            : "Référence de recherche; aucun statut de revendeur ou partenariat BOTIX n’est implicite."}
        </p>
        <a
          className="text-link"
          href={m.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {locale === "en" ? "Manufacturer website" : "Site du fabricant"} ↗
        </a>
      </section>
      <section className="section product-grid">
        {publishableProducts()
          .filter((p) => p.manufacturer === m.slug)
          .map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} />
          ))}
      </section>
      <QuoteCTA locale={locale} />
    </>
  );
}
