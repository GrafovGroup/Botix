import { PageVisuals } from "./page-visuals";
import { BuyerGuide } from "./buyer-guide";
import { BuyerPathways, LocationPathways } from "./buyer-pathways";
import { regions } from "@/lib/locations";
import { inquiryHref, type InquiryContext } from "@/lib/inquiry-context";
import Link from "next/link";
import { type Locale } from "@/lib/content";
import { type City, cities } from "@/lib/cities";
import { journeys, rentalJourneys, industryJourneys } from "@/lib/journeys";
import {
  publishableProducts,
  filterProducts,
  type RobotType,
} from "@/lib/catalog";
import { ProductCard } from "./catalog-explorer";
import { InquiryForm } from "./inquiry-form";
export function JourneySections({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const en = locale === "en";
  const journey = journeys.find((j) => j.slug === slug);
  const list =
    slug === "industries"
      ? industryJourneys
      : slug === "robot-rentals"
        ? rentalJourneys
        : null;
  const category =
    slug === "humanoid-robots"
      ? "humanoid"
      : slug.startsWith("commercial-robots/")
        ? slug.split("/")[1]
        : undefined;
  const matches = category
    ? filterProducts(publishableProducts(), { type: category }, locale)
    : slug.startsWith("industries/")
      ? filterProducts(
          publishableProducts(),
          { industry: slug.split("/")[1] },
          locale,
        )
      : [];
  return (
    <>
      {list && (
        <section className="section location-grid journey-grid">
          {list.map((j) => (
            <Link key={j.slug} href={`/${locale}/${slug}/${j.slug}`}>
              <p className="eyebrow">
                {en ? "Explore your pathway" : "Explorez votre parcours"}
              </p>
              <h2>{j.title[locale]}</h2>
              <p>{j.intro[locale]}</p>
              <span aria-hidden>↗</span>
            </Link>
          ))}
        </section>
      )}
      {(category || slug === "commercial-robots") && (
        <section className="section category-browse">
          <h2>{en ? "Explore the platforms." : "Explorez les plateformes."}</h2>
          <p>
            {en
              ? "Compare sourced editorial profiles and define a task-specific inquiry."
              : "Comparez les profils documentés et préparez une demande adaptée à la tâche."}
          </p>
          <Link
            className="button"
            href={`/${locale}/robots${category ? `?type=${category}` : ""}`}
          >
            {en ? "Browse catalogue" : "Parcourir le catalogue"} ↗
          </Link>
        </section>
      )}
      {category && (
        <BuyerPathways locale={locale} category={category as RobotType} />
      )}
      {matches.length > 0 && (
        <section className="section product-grid">
          {matches.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} />
          ))}
        </section>
      )}
      <BuyerGuide route={slug} locale={locale} />
      {journey && (
        <section className="section form-section" id="inquiry">
          <aside>
            <p className="eyebrow">
              {en ? "Make it specific" : "Précisez votre projet"}
            </p>
            <h2>
              {en
                ? "Tell us about your project."
                : "Parlez-nous de votre projet."}
            </h2>
            <p>{journey.considerations[locale]}</p>
            <Link
              className="text-link"
              href={inquiryHref(locale, {
                intent: journey.intent,
                category: journey.category as RobotType | undefined,
                useCase: journey.title[locale],
              })}
            >
              {en ? "Open full inquiry" : "Ouvrir la demande complète"} ↗
            </Link>
          </aside>
          <InquiryForm
            locale={locale}
            initial={{
              intent: journey.intent,
              category: journey.category as RobotType | undefined,
              useCase: journey.title[locale],
            }}
          />
        </section>
      )}
    </>
  );
}
export function CityLinks({
  locale,
  region,
}: {
  locale: Locale;
  region?: string;
}) {
  const list = cities.filter(
    (c) =>
      !region ||
      c.region === region ||
      (region === "quebec" && c.slug === "ottawa-gatineau"),
  );
  if (!list.length) return null;
  return (
    <section className="section">
      <p className="eyebrow">
        {locale === "en"
          ? "City & metro planning guides"
          : "Guides des villes et régions métropolitaines"}
      </p>
      <div className="city-link-grid">
        {list.map((c) => (
          <Link key={c.slug} href={`/${locale}/locations/cities/${c.slug}`}>
            {c.name[locale]} <span aria-hidden>↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
export function CityPage({ city: c, locale }: { city: City; locale: Locale }) {
  const en = locale === "en";
  return (
    <>
      <section className="section page-intro">
        <p className="eyebrow">
          {en
            ? "Canada / City planning guide"
            : "Canada / Guide de planification local"}
        </p>
        <h1>
          {en
            ? `Robotics in ${c.name[locale]}`
            : `La robotique — ${c.name[locale]}`}
        </h1>
        <p className="lead">{c.focus[locale]}</p>
      </section>
      <PageVisuals locale={locale} path={`locations/cities/${c.slug}`} />
      <section className="section region-detail">
        <article>
          <h2>
            {en
              ? "Build a site-specific brief."
              : "Définissez votre projet selon le site."}
          </h2>
          <p>{c.checklist[locale]}</p>
          <h3>{en ? "Surrounding communities" : "Municipalités voisines"}</h3>
          <p>{c.nearby.join(" · ")}</p>
          <p>
            {en
              ? "Coverage describes where we welcome inquiries, not a local office or confirmed service capacity. Delivery, onsite support and platform availability are assessed for the project."
              : "La couverture désigne les lieux d’où nous accueillons les demandes, non un bureau ou une capacité confirmée. La livraison, le soutien et la disponibilité sont évalués selon le projet."}
          </p>
          <Link className="text-link" href={`/${locale}/locations/${c.region}`}>
            {en ? "Province planning guide" : "Guide provincial"} ↗
          </Link>
          {c.slug === "ottawa-gatineau" && (
            <Link className="text-link" href={`/${locale}/locations/quebec`}>
              Québec ↗
            </Link>
          )}
        </article>
        <aside className="region-note">
          <p className="eyebrow">
            {en ? "Your next step" : "Votre prochaine étape"}
          </p>
          <h2>{en ? "Start with the site." : "Commencez par le site."}</h2>
          <p>
            {en
              ? "Include your city, building access and the task you want to evaluate."
              : "Précisez la ville, l’accès au bâtiment et la tâche à évaluer."}
          </p>
          <Link
            className="button"
            href={inquiryHref(locale, {
              intent: "general",
              city: c.name[locale],
              province: regions.find((r) => r.slug === c.region)
                ?.code as InquiryContext["province"],
            })}
          >
            {en ? "Discuss the project" : "Discuter du projet"} ↗
          </Link>
        </aside>
      </section>
      <LocationPathways locale={locale} />
    </>
  );
}
