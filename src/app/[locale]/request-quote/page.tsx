import { PageVisuals } from "@/components/page-visuals";
import { ContactPhone } from "@/components/contact-phone";
import { StructuredBreadcrumbs } from "@/components/structured-breadcrumbs";
import { InquiryContextLink } from "@/components/inquiry-context-link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, siteUrl } from "@/lib/content";
import { resolveInquiryContext, inquiryHref } from "@/lib/inquiry-context";
import { InquiryForm } from "@/components/inquiry-form";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "fr" ? "Demander une soumission" : "Request a robotics quote";
  return {
    title: `${title} | BOTIX`,
    description:
      locale === "fr"
        ? "Discutez de votre achat, location, projet pilote ou intégration robotique au Canada."
        : "Discuss robotics sourcing, rentals, pilots and integration for your Canadian business.",
    alternates: {
      canonical: `${siteUrl}/${locale}/request-quote`,
      languages: {
        "en-CA": `${siteUrl}/en/request-quote`,
        "fr-CA": `${siteUrl}/fr/request-quote`,
      },
    },
    openGraph: {
      title,
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      url: `${siteUrl}/${locale}/request-quote`,
    },
  };
}
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const initial = resolveInquiryContext(await searchParams);
  const en = locale === "en";
  return (
    <>
      <StructuredBreadcrumbs
        locale={locale}
        items={[
          {
            name:
              locale === "en" ? "Request a quote" : "Demander une soumission",
            path: "request-quote",
          },
        ]}
      />
      <section className="section page-intro">
        <p className="eyebrow">
          {en
            ? "From interest to a practical brief"
            : "De l’intérêt à un projet concret"}
        </p>
        <h1>
          {en
            ? "Let’s define your next move."
            : "Définissons votre prochaine étape."}
        </h1>
        <p className="lead">
          {en
            ? "Choose your pathway. We’ll use your task, site and timing to assess the next step."
            : "Choisissez votre parcours. La tâche, le site et l’échéancier guideront l’évaluation."}
        </p>
        <nav
          className="workflow-tabs"
          aria-label={en ? "Inquiry pathway" : "Type de demande"}
        >
          {[
            [
              "purchase",
              en ? "Purchase / sourcing" : "Achat / approvisionnement",
            ],
            ["rental", en ? "Rental / event" : "Location / événement"],
            [
              "pilot",
              en ? "Pilot / integration" : "Projet pilote / intégration",
            ],
            ["general", en ? "General project" : "Projet général"],
          ].map(([intent, label]) => (
            <InquiryContextLink
              locale={locale}
              intent={intent as NonNullable<typeof initial.intent>}
              key={intent}
              href={inquiryHref(
                locale,
                initial,
                intent as NonNullable<typeof initial.intent>,
              )}
              current={initial.intent === intent}
            >
              {label}
            </InquiryContextLink>
          ))}
        </nav>
      </section>
      <PageVisuals locale={locale} path="request-quote" />
      <section className="section form-section">
        <aside>
          <p className="eyebrow">
            {en ? "A clear starting point" : "Un point de départ clair"}
          </p>
          <h2>{en ? "Tell us what matters." : "Dites-nous ce qui compte."}</h2>
          <p>
            {initial.intent === "rental"
              ? en
                ? "Include your venue, audience and desired dates. Operator support, transport and platform feasibility are assessed before a rental is agreed."
                : "Précisez le lieu, le public et les dates. Le soutien, le transport et la faisabilité sont évalués avant toute entente."
              : initial.intent === "pilot" || initial.intent === "integration"
                ? en
                  ? "Describe the task, baseline and measurable outcome. Include supervision, software access and the proposed trial environment."
                  : "Décrivez la tâche, la situation initiale et le résultat mesurable. Précisez la supervision, l’accès logiciel et le milieu d’essai."
                : en
                  ? "Share the application, operating site and constraints. A request starts an assessment; it does not create an order or guarantee availability."
                  : "Précisez l’application, le site et les contraintes. Une demande amorce une évaluation; elle ne constitue pas une commande ou une garantie de disponibilité."}
          </p>
          <ContactPhone className="contact-phone" />
        </aside>
        <InquiryForm
          preserveContext
          key={JSON.stringify(initial)}
          locale={locale}
          initial={initial}
        />
      </section>
    </>
  );
}
