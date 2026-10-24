import { Arrow } from "@/components/icons";
import Link from "next/link";
import { bi, type Locale } from "@/lib/content";
import { inquiryHref, type InquiryContext } from "@/lib/inquiry-context";
import { type RobotType, taxonomy } from "@/lib/catalog";
const questions: Record<RobotType, ReturnType<typeof bi>> = {
  humanoid: bi(
    "Define a supervised task, the research or demonstration objective, human separation and a measurable pilot outcome.",
    "Définissez une tâche supervisée, l’objectif de recherche ou de démonstration, la séparation des personnes et un résultat mesurable.",
  ),
  cleaning: bi(
    "Measure floor area, surface transitions, cleaning windows, water access and charging space.",
    "Mesurez la surface au sol, les transitions, les plages de nettoyage, l’accès à l’eau et l’espace de recharge.",
  ),
  logistics: bi(
    "Document payload, transfer points, aisle widths, shared traffic and the systems that dispatch work.",
    "Documentez la charge, les points de transfert, les allées, la circulation et les systèmes de répartition des tâches.",
  ),
  industrial: bi(
    "Describe the part, cycle, tooling and safeguarding responsibilities before choosing a robotic arm.",
    "Décrivez la pièce, le cycle, l’outillage et les responsabilités de protection avant de choisir un bras robotique.",
  ),
  inspection: bi(
    "Define inspection targets, terrain, connectivity, data access and operator supervision.",
    "Définissez les cibles d’inspection, le terrain, la connectivité, l’accès aux données et la supervision.",
  ),
  service: bi(
    "Map guest traffic, handoff heights, accessibility, supervision and the event or service schedule.",
    "Précisez la circulation, les hauteurs de transfert, l’accessibilité, la supervision et l’horaire de service ou de l’événement.",
  ),
};
export function BuyerPathways({
  locale,
  category = "humanoid",
  context = {},
}: {
  locale: Locale;
  category?: RobotType;
  context?: InquiryContext;
}) {
  const en = locale === "en";
  return (
    <section className="section">
      <p className="eyebrow">{taxonomy.types[category][locale]}</p>
      <h2>
        {en
          ? "Choose a practical next step."
          : "Choisissez une prochaine étape concrète."}
      </h2>
      <p className="lead">{questions[category][locale]}</p>
      <div className="buyer-paths">
        {(
          [
            [
              "purchase",
              bi("Evaluate a purchase", "Évaluer un achat"),
              bi(
                "Define the task, total operating requirements, training and support responsibilities.",
                "Définissez la tâche, les besoins d’exploitation, la formation et les responsabilités de soutien.",
              ),
            ],
            [
              "pilot",
              bi(
                "Scope a supervised pilot",
                "Définir un projet pilote supervisé",
              ),
              bi(
                "Agree on a controlled operating zone, success criteria and an assessment period.",
                "Précisez une zone contrôlée, les critères de réussite et la période d’évaluation.",
              ),
            ],
            [
              "rental",
              bi(
                "Plan a rental or demonstration",
                "Planifier une location ou une démonstration",
              ),
              bi(
                "Include dates, venue access and operator needs. Availability and transport depend on the project.",
                "Précisez les dates, l’accès au lieu et les besoins en opérateurs. La disponibilité et le transport dépendent du projet.",
              ),
            ],
          ] as const
        ).map(([intent, title, description]) => (
          <article key={intent}>
            <h3>{title[locale]}</h3>
            <p>{description[locale]}</p>
            <Link
              className="text-link"
              href={inquiryHref(locale, { ...context, category, intent })}
            >
              {en ? "Prepare my brief" : "Préparer mon projet"} <Arrow />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
export function LocationPathways({ locale }: { locale: Locale }) {
  const en = locale === "en";
  return (
    <section className="section">
      <h2>
        {en ? "Connect the site to the task." : "Reliez le site à la tâche."}
      </h2>
      <p>
        {en
          ? "Use your local planning guide alongside a task-specific pathway. Bring site access, supervision and support needs into the same assessment."
          : "Combinez votre guide local et un parcours adapté à la tâche. Intégrez l’accès au site, la supervision et le soutien à la même évaluation."}
      </p>
      <div className="city-link-grid">
        {(
          [
            "humanoid",
            "cleaning",
            "logistics",
            "industrial",
            "inspection",
            "service",
          ] as const
        ).map((category) => (
          <Link
            key={category}
            href={`/${locale}/${category === "humanoid" ? "humanoid-robots" : `commercial-robots/${category}`}`}
          >
            {taxonomy.types[category][locale]} <Arrow />
          </Link>
        ))}
      </div>
    </section>
  );
}
