import {
  inquiryHref,
  pageInquiryContext,
  type InquiryContext,
} from "@/lib/inquiry-context";
import { ContactPhone } from "@/components/contact-phone";
import Link from "next/link";
import Image from "next/image";
import {
  categories,
  faqs,
  ui,
  type Locale,
  type ContentPage,
} from "@/lib/content";
import { regions, type Region } from "@/lib/locations";
import { Arrow, RobotIcon } from "./icons";
import { JourneySections, CityLinks } from "./journey-sections";
import { InquiryForm } from "./inquiry-form";
export function QuoteCTA({
  locale,
  context = {},
}: {
  locale: Locale;
  context?: InquiryContext;
}) {
  return (
    <section className="cta-band">
      <div>
        <span className="eyebrow">
          {locale === "en" ? "Your next move" : "Votre prochaine étape"}
        </span>
        <h2>
          {locale === "en"
            ? "Let’s put possibility to work."
            : "Donnons vie aux possibilités."}
        </h2>
      </div>
      <Link className="button" href={inquiryHref(locale, context)}>
        {ui[locale].quote}
        <Arrow />
      </Link>
    </section>
  );
}
export function CategoryGrid({ locale }: { locale: Locale }) {
  return (
    <div className="category-grid">
      {categories.map((c, i) => (
        <Link
          href={`/${locale}/${c.slug}`}
          key={c.slug}
          className={`category-card card-${i}`}
        >
          <div className="card-top">
            <span className="eyebrow">{c.code}</span>
            <Arrow />
          </div>
          <RobotIcon kind={c.icon} />
          <h3>{c.name[locale]}</h3>
          <p>{c.short[locale]}</p>
        </Link>
      ))}
    </div>
  );
}
export function Home({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const t = ui[locale];
  return (
    <>
      <section className="hero">
        <Image
          className="hero-image"
          src={`/images/home-${locale}.webp`}
          alt={
            en
              ? "Silver humanoid robot with articulated arms in a dark studio"
              : "Robot humanoïde argenté aux bras articulés dans un studio sombre"
          }
          fill
          preload
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">
            <span className="status-dot" />
            {en
              ? "The next era of commercial robotics"
              : "La nouvelle ère de la robotique commerciale"}
          </p>
          <h1>
            {en ? (
              <>
                Intelligent robots.
                <br />
                <span>Real-world</span>
                <br />
                solutions.
              </>
            ) : (
              <>
                Des robots intelligents.
                <br />
                <span>Des solutions</span>
                <br />
                concrètes.
              </>
            )}
          </h1>
          <p className="hero-description">
            {en
              ? "Robotics for the way you work. Explore humanoid and commercial solutions for your business, anywhere in Canada."
              : "La robotique au service de votre travail. Explorez les solutions humanoïdes et commerciales pour votre entreprise, partout au Canada."}
          </p>
          <div className="hero-buttons">
            <Link className="button" href={`/${locale}/robots`}>
              {t.explore}
              <Arrow />
            </Link>
            <Link className="button ghost" href={`/${locale}/request-quote`}>
              {t.quote}
              <Arrow />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <span>01 / {en ? "HUMANOID ROBOTICS" : "ROBOTIQUE HUMANOÏDE"}</span>
          <Link href={`/${locale}/humanoid-robots`}>
            {en ? "EXPLORE THE POSSIBILITIES" : "EXPLORER LES POSSIBILITÉS"}{" "}
            <Arrow />
          </Link>
          <span className="scroll-label">
            {en ? "SCROLL TO DISCOVER" : "DÉFILER POUR DÉCOUVRIR"} ↓
          </span>
        </div>
      </section>
      <div className="capability-strip">
        <span>
          {en
            ? "BUILT AROUND YOUR BUSINESS"
            : "SELON LES BESOINS DE VOTRE ENTREPRISE"}
        </span>
        <span>{en ? "SOURCING & EVALUATION" : "RECHERCHE ET ÉVALUATION"}</span>
        <span>{en ? "RENTALS & PILOTS" : "LOCATION ET PROJETS PILOTES"}</span>
        <span>
          {en ? "CANADA-WIDE INQUIRIES" : "DEMANDES PARTOUT AU CANADA"}
        </span>
      </div>
      <section className="section portfolio">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {en
                ? "01 / Explore the portfolio"
                : "01 / Explorez les solutions"}
            </p>
            <h2>
              {en ? (
                <>
                  The right robot.
                  <br />
                  <span>The right application.</span>
                </>
              ) : (
                <>
                  Le bon robot.
                  <br />
                  <span>La bonne application.</span>
                </>
              )}
            </h2>
          </div>
          <p>
            {en
              ? "From emerging humanoid platforms to task-focused automation. Start with your operation. Find a path forward."
              : "Des plateformes humanoïdes émergentes à l’automatisation spécialisée. Partons de vos activités pour définir la suite."}
          </p>
        </div>
        <CategoryGrid locale={locale} />
      </section>
      <section className="feature-section section">
        <div className="feature-title">
          <p className="eyebrow">
            {en
              ? "02 / Human ambition. Robotic potential."
              : "02 / Ambition humaine. Potentiel robotique."}
          </p>
          <h2>
            {en ? (
              <>
                A new chapter
                <br />
                in how we work.
              </>
            ) : (
              <>
                Une nouvelle façon
                <br />
                de travailler.
              </>
            )}
          </h2>
          <Link className="text-link" href={`/${locale}/humanoid-robots`}>
            {en
              ? "DISCOVER HUMANOID ROBOTICS"
              : "DÉCOUVRIR LA ROBOTIQUE HUMANOÏDE"}{" "}
            <Arrow />
          </Link>
        </div>
        <div className="feature-copy">
          <p className="large-copy">
            {en
              ? "Humanoid robotics is moving from possibility to practical exploration. The opportunity starts with the right questions."
              : "La robotique humanoïde passe des possibilités à l’exploration concrète. Tout commence par les bonnes questions."}
          </p>
          <p>
            {en
              ? "We help frame demonstrations, research applications and supervised business pilots around clear tasks and measurable outcomes. Enterprise deployment is emerging; every application needs its own feasibility assessment."
              : "Nous aidons à définir les démonstrations, les applications de recherche et les projets pilotes supervisés selon des tâches claires et des résultats mesurables. Le déploiement en entreprise est émergent; chaque application nécessite une évaluation de faisabilité."}
          </p>
          <div className="mini-tags">
            <span>{en ? "RESEARCH" : "RECHERCHE"}</span>
            <span>{en ? "DEMONSTRATIONS" : "DÉMONSTRATIONS"}</span>
            <span>{en ? "ENTERPRISE PILOTS" : "PROJETS PILOTES"}</span>
          </div>
        </div>
      </section>
      <section className="section industries-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {en
                ? "03 / Your world. More possibilities."
                : "03 / Votre réalité. Plus de possibilités."}
            </p>
            <h2>
              {en ? "Built around the task." : "Tout commence par la tâche."}
            </h2>
          </div>
          <Link className="text-link" href={`/${locale}/industries`}>
            {en ? "EXPLORE INDUSTRIES" : "EXPLORER LES SECTEURS"} <Arrow />
          </Link>
        </div>
        <div className="industry-list">
          {(en
            ? [
                "Manufacturing & production",
                "Warehousing & distribution",
                "Commercial facilities & hospitality",
                "Research, education & events",
              ]
            : [
                "Fabrication et production",
                "Entreposage et distribution",
                "Immeubles commerciaux et hôtellerie",
                "Recherche, enseignement et événements",
              ]
          ).map((title, i) => (
            <Link key={title} href={`/${locale}/industries`}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{title}</h3>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>
      <section className="section process-section">
        <div>
          <p className="eyebrow">
            {en
              ? "04 / From ambition to action"
              : "04 / De l’ambition à l’action"}
          </p>
          <h2>
            {en ? (
              <>
                A clearer path
                <br />
                to robotics.
              </>
            ) : (
              <>
                Un parcours plus clair
                <br />
                vers la robotique.
              </>
            )}
          </h2>
          <Link className="text-link" href={`/${locale}/solutions`}>
            {en ? "OUR APPROACH" : "NOTRE APPROCHE"} <Arrow />
          </Link>
        </div>
        <div className="steps">
          {(en
            ? [
                [
                  "Discover",
                  "Tell us about the task, your team and the environment.",
                ],
                [
                  "Evaluate",
                  "Explore sourcing options, practical constraints and pilot criteria.",
                ],
                [
                  "Coordinate",
                  "Define integration, training and support responsibilities.",
                ],
              ]
            : [
                [
                  "Comprendre",
                  "Présentez la tâche, votre équipe et l’environnement.",
                ],
                [
                  "Évaluer",
                  "Explorez les options, les contraintes et les critères du projet pilote.",
                ],
                [
                  "Coordonner",
                  "Précisez les responsabilités d’intégration, de formation et de soutien.",
                ],
              ]
          ).map(([title, body], i) => (
            <div className="step" key={title}>
              <span className="step-number">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="rental-band section">
        <p className="eyebrow">
          {en
            ? "Experience it firsthand"
            : "Découvrez la robotique sur le terrain"}
        </p>
        <h2>
          {en
            ? "Make your next event an experience."
            : "Faites de votre événement une expérience."}
        </h2>
        <p>
          {en
            ? "Explore robot rentals, supervised demonstrations and focused pilots. Tell us your dates, location and vision; we’ll assess the possibilities."
            : "Explorez la location, les démonstrations supervisées et les projets pilotes ciblés. Précisez vos dates, le lieu et votre vision pour évaluer les possibilités."}
        </p>
        <Link className="button ghost" href={`/${locale}/robot-rentals`}>
          {en ? "EXPLORE RENTALS" : "EXPLORER LA LOCATION"}
          <Arrow />
        </Link>
      </section>
      <section className="section coverage-section">
        <div>
          <p className="eyebrow">
            {en ? "05 / Canadian reach" : "05 / Partout au Canada"}
          </p>
          <h2>
            {en ? (
              <>
                One conversation.
                <br />
                Coast to coast.
              </>
            ) : (
              <>
                Une conversation.
                <br />
                D’un océan à l’autre.
              </>
            )}
          </h2>
          <p>
            {en
              ? "Inquiries from every province and territory. Project-specific sourcing, delivery and support planning. In English and French."
              : "Des demandes de chaque province et territoire. La recherche, la livraison et le soutien planifiés selon le projet. En français et en anglais."}
          </p>
          <Link className="text-link" href={`/${locale}/locations`}>
            {t.locations} <Arrow />
          </Link>
        </div>
        <div className="region-index">
          {regions.map((r) => (
            <Link key={r.code} href={`/${locale}/locations/${r.slug}`}>
              <span>{r.code}</span>
              {r.name[locale]}
              <Arrow />
            </Link>
          ))}
        </div>
      </section>
      <section className="section faq-section">
        <div>
          <p className="eyebrow">
            {en ? "A few good questions" : "Quelques bonnes questions"}
          </p>
          <h2>{en ? "Start here." : "Commençons ici."}</h2>
        </div>
        <div>
          {faqs.map((f) => (
            <details key={f.title.en}>
              <summary>
                {f.title[locale]}
                <span aria-hidden>+</span>
              </summary>
              <p>{f.body[locale]}</p>
            </details>
          ))}
        </div>
      </section>
      <QuoteCTA locale={locale} />
    </>
  );
}
export function StandardPage({
  page,
  locale,
}: {
  page: ContentPage;
  locale: Locale;
}) {
  const legal = ["privacy", "terms"].includes(page.slug);
  return (
    <>
      <section className="page-intro section">
        <p className="eyebrow">{page.eyebrow[locale]}</p>
        <h1>{page.title[locale]}</h1>
        <p className="lead">{page.intro[locale]}</p>
        {!legal && !["request-quote", "contact"].includes(page.slug) && (
          <Link
            className="button"
            href={inquiryHref(locale, pageInquiryContext(page.slug, locale))}
          >
            {ui[locale].next}
            <Arrow />
          </Link>
        )}
      </section>
      {page.slug === "commercial-robots" && (
        <section className="section page-categories">
          <CategoryGrid locale={locale} />
        </section>
      )}
      <JourneySections slug={page.slug} locale={locale} />
      {page.sections.length > 0 && (
        <section className={`section article-sections ${legal ? "legal" : ""}`}>
          {page.sections.map((s, i) => (
            <article key={s.title.en}>
              <span className="eyebrow">0{i + 1}</span>
              <h2>{s.title[locale]}</h2>
              <p>{s.body[locale]}</p>
            </article>
          ))}
        </section>
      )}
      {["request-quote", "contact"].includes(page.slug) && (
        <section className="section form-section">
          <aside>
            <p className="eyebrow">
              {locale === "en"
                ? "A practical first step"
                : "Un premier pas concret"}
            </p>
            <h2>
              {locale === "en"
                ? "Your project starts here."
                : "Votre projet commence ici."}
            </h2>
            <p>
              {locale === "en"
                ? "Purchase, rental, pilot or integration. Tell us what you have in mind."
                : "Achat, location, projet pilote ou intégration. Parlez-nous de vos idées."}
            </p>
            <ContactPhone className="contact-phone" />
            <p>
              {locale === "en"
                ? "English & French · Canada-wide inquiries"
                : "Français et anglais · Demandes partout au Canada"}
            </p>
          </aside>
          <InquiryForm locale={locale} />
        </section>
      )}
      {!legal && !["request-quote", "contact"].includes(page.slug) && (
        <QuoteCTA
          locale={locale}
          context={pageInquiryContext(page.slug, locale)}
        />
      )}
    </>
  );
}
export function LocationsPage({
  locale,
  region,
}: {
  locale: Locale;
  region?: Region;
}) {
  const en = locale === "en";
  return (
    <>
      <section className="section page-intro">
        <p className="eyebrow">
          {en ? "Canada / Project coverage" : "Canada / Couverture des projets"}
        </p>
        <h1>
          {region
            ? `${en ? "Robotics in" : "La robotique —"} ${region.name[locale]}`
            : en
              ? "Across Canada. Around your needs."
              : "Partout au Canada. Selon vos besoins."}
        </h1>
        <p className="lead">
          {region
            ? region.focus[locale]
            : en
              ? "Explore regional planning considerations for your robotics project. We accept inquiries nationally; delivery, on-site work and support are assessed for each project."
              : "Explorez les considérations régionales pour votre projet. Nous acceptons les demandes de partout au pays; la livraison, le travail sur place et le soutien sont évalués pour chaque projet."}
        </p>
      </section>
      {region ? (
        <section className="section region-detail">
          <article>
            <h2>
              {en
                ? "What to include in your brief"
                : "À inclure dans votre demande"}
            </h2>
            <p>{region.checklist[locale]}</p>
            <h2>
              {en
                ? "Cities & surrounding communities"
                : "Villes et municipalités voisines"}
            </h2>
            <p>{region.cities.join(" · ")}</p>
            <p>
              {en
                ? "These places help locate your project; they do not represent BOTIX offices. Share your exact site conditions so transport, integration and service feasibility can be assessed."
                : "Ces lieux servent à situer votre projet et ne représentent pas des bureaux BOTIX. Décrivez les conditions du site pour évaluer le transport, l’intégration et le service."}
            </p>
            <Link className="text-link" href={`/${locale}/locations`}>
              ← {ui[locale].back}
            </Link>
          </article>
          <aside className="region-note">
            <span className="region-code">{region.code}</span>
            <h3>
              {en ? "Plan the whole project." : "Planifiez le projet complet."}
            </h3>
            <p>
              {en
                ? "Site access. Operating conditions. Training. Recovery. Support. Each belongs in the conversation."
                : "Accès au site. Conditions d’utilisation. Formation. Récupération. Soutien. Chaque aspect compte."}
            </p>
            <Link
              className="button"
              href={inquiryHref(locale, {
                intent: "general",
                province: region.code as InquiryContext["province"],
              })}
            >
              {ui[locale].quote}
              <Arrow />
            </Link>
          </aside>
        </section>
      ) : (
        <section className="section location-grid">
          {regions.map((r) => (
            <Link key={r.code} href={`/${locale}/locations/${r.slug}`}>
              <span className="eyebrow">
                {r.code} <Arrow />
              </span>
              <h2>{r.name[locale]}</h2>
              <p>{r.focus[locale]}</p>
              <small>{r.cities.slice(0, 4).join(" · ")}</small>
            </Link>
          ))}
        </section>
      )}
      <CityLinks locale={locale} region={region?.slug} />
      <QuoteCTA
        locale={locale}
        context={{
          intent: "general",
          province: region?.code as InquiryContext["province"],
        }}
      />
    </>
  );
}
