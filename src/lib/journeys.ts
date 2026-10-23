import { bi, type ContentPage, type Bilingual } from "./content";
import { taxonomy } from "./catalog";
export type Journey = {
  slug: string;
  title: Bilingual;
  intro: Bilingual;
  considerations: Bilingual;
  measurement: Bilingual;
  intent: "purchase" | "rental" | "pilot" | "general";
  category?: string;
};
export const rentalJourneys: Journey[] = [
  {
    slug: "event-robots",
    title: bi("Event robots", "Robots événementiels"),
    intro: bi(
      "Plan a supervised robot appearance around the audience, venue and intended interaction. Start with the experience you want people to have.",
      "Planifiez une présence robotique supervisée selon le public, le lieu et l’interaction souhaitée. Définissez d’abord l’expérience à offrir.",
    ),
    considerations: bi(
      "Share the event date, indoor or outdoor setting, floor surface, public access, sound limits and an isolated preparation area. Platform and operator availability need assessment.",
      "Précisez la date, le cadre intérieur ou extérieur, le sol, l’accès du public, les limites sonores et l’aire de préparation. La disponibilité du robot et de l’opérateur doit être évaluée.",
    ),
    measurement: bi(
      "Agree on the interaction script, number of sessions, audience boundaries and a recovery plan if the activity must pause.",
      "Convenez du scénario, du nombre de séances, des limites d’accès et d’un plan de reprise si l’activité doit être interrompue.",
    ),
    intent: "rental",
  },
  {
    slug: "corporate-demonstrations",
    title: bi("Corporate demonstrations", "Démonstrations en entreprise"),
    intro: bi(
      "Give decision-makers a structured introduction to robotics, anchored in the questions your organisation needs answered.",
      "Offrez aux décideurs une découverte structurée de la robotique, axée sur les questions de votre organisation.",
    ),
    considerations: bi(
      "Identify the audience, room size, session duration, confidentiality requirements and the tasks to discuss. A presentation does not establish deployment readiness.",
      "Précisez le public, la salle, la durée, la confidentialité et les tâches à examiner. Une présentation ne confirme pas la capacité de déploiement.",
    ),
    measurement: bi(
      "Capture feasibility questions, required data and who will own a follow-up assessment. Define what can be demonstrated safely in the available space.",
      "Notez les questions de faisabilité, les données requises et le responsable de l’évaluation suivante. Définissez ce qui peut être démontré de manière sécuritaire.",
    ),
    intent: "rental",
  },
  {
    slug: "trade-shows",
    title: bi("Trade show robotics", "Robotique pour salons professionnels"),
    intro: bi(
      "Build a robotics demonstration into a booth experience with clear operating boundaries and a realistic run-of-show.",
      "Intégrez une démonstration robotique à votre kiosque avec des limites claires et un déroulement réaliste.",
    ),
    considerations: bi(
      "Provide booth dimensions, organiser requirements, access windows, power, networking and freight arrangements. Confirm crowd separation and onsite responsibilities.",
      "Fournissez les dimensions du kiosque, les exigences de l’organisateur, l’accès, l’alimentation, le réseau et le transport. Confirmez la séparation du public et les responsabilités.",
    ),
    measurement: bi(
      "Plan scheduled demonstration windows and staff-led explanations. Confirm how the robot is stored and secured outside exhibition hours.",
      "Planifiez des plages de démonstration et des explications animées par le personnel. Confirmez l’entreposage et la sécurité hors des heures d’exposition.",
    ),
    intent: "rental",
  },
  {
    slug: "research-demonstrations",
    title: bi(
      "University & research demonstrations",
      "Démonstrations universitaires et de recherche",
    ),
    intro: bi(
      "Scope an academic demonstration around learning objectives, supervision and the access your team needs to evaluate a platform.",
      "Définissez la démonstration selon les objectifs d’apprentissage, la supervision et l’accès nécessaire à l’évaluation.",
    ),
    considerations: bi(
      "Distinguish a guided demonstration from programmable research access. Confirm edition, interfaces, software licensing, data policies and laboratory safety requirements.",
      "Distinguez la démonstration guidée de l’accès programmable. Confirmez l’édition, les interfaces, les licences, les politiques de données et la sécurité du laboratoire.",
    ),
    measurement: bi(
      "Agree on the questions students or researchers can test and the limits of the session. Longer experimentation should be scoped as a separate pilot.",
      "Convenez des questions à tester et des limites de la séance. Une expérimentation prolongée nécessite un projet pilote distinct.",
    ),
    intent: "rental",
    category: "humanoid",
  },
  {
    slug: "short-term-pilots",
    title: bi(
      "Short-term robotics pilots",
      "Projets pilotes robotiques de courte durée",
    ),
    intro: bi(
      "Test a bounded operational question before considering a broader rollout. Define the task and evidence first.",
      "Testez une question opérationnelle ciblée avant d’envisager un déploiement élargi. Définissez d’abord la tâche et les résultats à mesurer.",
    ),
    considerations: bi(
      "Share site access, the trial window, training needs, integration boundaries and fallback procedures. Humanoid applications require particular attention to supervision and maturity.",
      "Précisez l’accès au site, la période d’essai, la formation, l’intégration et les procédures de rechange. Les humanoïdes nécessitent une attention particulière à la supervision et à la maturité.",
    ),
    measurement: bi(
      "Record the baseline, test conditions, operator interventions and acceptance criteria. Include a review point and equipment recovery arrangements.",
      "Consignez la situation initiale, les conditions, les interventions et les critères d’acceptation. Prévoyez un bilan et la récupération du matériel.",
    ),
    intent: "pilot",
  },
];
const industryDetails: Record<
  keyof typeof taxonomy.industries,
  [Bilingual, Bilingual, Bilingual]
> = {
  manufacturing: [
    bi(
      "Evaluate repeatable production tasks without losing sight of tooling, changeovers and the people around the cell.",
      "Évaluez les tâches répétables en tenant compte de l’outillage, des changements de série et des personnes autour de la cellule.",
    ),
    bi(
      "Provide part variation, tolerances, cycle targets, payload and upstream/downstream dependencies. Include a task-specific safety assessment.",
      "Précisez la variation des pièces, les tolérances, les cycles, les charges et les dépendances. Prévoyez une évaluation de sécurité propre à la tâche.",
    ),
    bi(
      "Compare complete cycle performance, recovery from faults and changeover effort—not just isolated robot motion.",
      "Comparez le cycle complet, la reprise après incident et les changements de série, au-delà du mouvement isolé du robot.",
    ),
  ],
  warehousing: [
    bi(
      "Map movements between receiving, storage and dispatch before choosing a mobile platform.",
      "Cartographiez les déplacements entre réception, stockage et expédition avant de choisir une plateforme mobile.",
    ),
    bi(
      "Record load dimensions, aisle clearances, transfer heights, pedestrian crossings and shift peaks. Document warehouse software interfaces.",
      "Consignez les dimensions des charges, les dégagements, les hauteurs de transfert, les traversées et les pointes d’activité. Documentez les interfaces logicielles.",
    ),
    bi(
      "Use representative loads and peak traffic in a trial. Measure exceptions, operator interventions and queueing at transfer points.",
      "Utilisez des charges et une circulation représentatives. Mesurez les exceptions, les interventions et les files aux points de transfert.",
    ),
  ],
  facilities: [
    bi(
      "Assess floor care and inspection against the daily realities of a shared commercial building.",
      "Évaluez l’entretien des sols et l’inspection selon la réalité quotidienne d’un immeuble partagé.",
    ),
    bi(
      "Map surfaces, floor changes, lifts, wet entrances and occupancy schedules. Confirm water, drainage, charging and access responsibilities.",
      "Cartographiez les surfaces, les transitions, les ascenseurs, les entrées humides et l’occupation. Confirmez l’eau, la vidange, la recharge et les accès.",
    ),
    bi(
      "Evaluate cleaning quality and route completion under normal occupancy. Include consumables, manual finishing and maintenance time.",
      "Évaluez la qualité et les parcours en occupation normale. Incluez les consommables, les finitions manuelles et l’entretien.",
    ),
  ],
  hospitality: [
    bi(
      "Explore service transport and cleaning while protecting guest experience and staff control.",
      "Explorez le transport de service et le nettoyage en préservant l’expérience client et le contrôle du personnel.",
    ),
    bi(
      "Assess narrow routes, table layouts, tray handling, noise and accessibility. Staff remain responsible for loading, guest assistance and exceptions.",
      "Évaluez les passages étroits, les tables, les plateaux, le bruit et l’accessibilité. Le personnel demeure responsable du chargement et des exceptions.",
    ),
    bi(
      "Observe a representative service period, including queues and busy crossings. Define where a human handoff is essential.",
      "Observez une période de service représentative, avec les files et les croisements. Définissez les transferts nécessitant une personne.",
    ),
  ],
  events: [
    bi(
      "Frame a memorable robotics experience with a clear script, controlled space and an operator-led plan.",
      "Définissez une expérience robotique marquante avec un scénario clair, un espace contrôlé et un opérateur.",
    ),
    bi(
      "Share venue rules, attendance, dates, access windows, floor conditions and the intended interaction. Confirm feasibility before advertising a specific platform.",
      "Précisez les règles du lieu, l’achalandage, les dates, les accès, le sol et l’interaction. Confirmez la faisabilité avant d’annoncer une plateforme précise.",
    ),
    bi(
      "Agree on the run-of-show, safe audience boundaries and a fallback presentation if an interaction pauses.",
      "Convenez du déroulement, des limites de sécurité et d’une présentation de rechange en cas d’interruption.",
    ),
  ],
  retail: [
    bi(
      "Consider floor care and indoor transport alongside customer traffic and changing merchandising layouts.",
      "Évaluez l’entretien et le transport intérieur selon la circulation des clients et les aménagements changeants.",
    ),
    bi(
      "Identify opening hours, promotional displays, accessible routes, shelf transitions and staff supervision. Avoid assuming surveillance or customer-data capabilities.",
      "Précisez les heures, les présentoirs, les parcours accessibles et la supervision. Ne présumez aucune capacité de surveillance ou de collecte de données clients.",
    ),
    bi(
      "Test the route with normal customer activity and seasonal layouts. Review interruptions, manual support and the effect on accessible circulation.",
      "Testez le parcours avec l’achalandage normal et les aménagements saisonniers. Examinez les interruptions, le soutien et l’accessibilité.",
    ),
  ],
  research: [
    bi(
      "Choose a platform around research questions, software access and the laboratory’s supervision capacity.",
      "Choisissez une plateforme selon les questions de recherche, l’accès logiciel et la capacité de supervision du laboratoire.",
    ),
    bi(
      "Confirm hardware edition, development interfaces, licensing, sensor data access and safe testing space. Separate an educational demonstration from development capability.",
      "Confirmez l’édition, les interfaces, les licences, les données des capteurs et l’espace sécuritaire. Distinguez la démonstration de la capacité de développement.",
    ),
    bi(
      "Define reproducible tasks and a documented test protocol. Emerging humanoid systems need staged evaluation rather than assumed production readiness.",
      "Définissez des tâches reproductibles et un protocole documenté. Les humanoïdes émergents nécessitent une évaluation progressive.",
    ),
  ],
  logistics: [
    bi(
      "Examine material flows across the handoffs that connect production, storage and dispatch.",
      "Examinez les flux aux points de transfert entre production, stockage et expédition.",
    ),
    bi(
      "Document ownership of each transfer, loading equipment, network coverage, fleet coordination and recovery procedures.",
      "Documentez les responsabilités, le chargement, le réseau, la coordination de flotte et les procédures de reprise.",
    ),
    bi(
      "Evaluate end-to-end flow with actual load patterns. Record congestion, waiting time and exception handling at interfaces.",
      "Évaluez le flux complet avec les charges réelles. Consignez la congestion, l’attente et les exceptions aux interfaces.",
    ),
  ],
};
export const industryJourneys: Journey[] = Object.entries(industryDetails).map(
  ([slug, [intro, considerations, measurement]]) => ({
    slug,
    title: taxonomy.industries[slug as keyof typeof taxonomy.industries],
    intro,
    considerations,
    measurement,
    intent:
      slug === "events" ? "rental" : slug === "research" ? "pilot" : "purchase",
  }),
);
export const journeys = [
  ...rentalJourneys.map((j) => ({ ...j, slug: `robot-rentals/${j.slug}` })),
  ...industryJourneys.map((j) => ({ ...j, slug: `industries/${j.slug}` })),
];
export const journeyPages: ContentPage[] = journeys.map((j) => ({
  slug: j.slug,
  title: j.title,
  eyebrow: bi(
    j.slug.startsWith("industries/")
      ? "Industry / Buyer journey"
      : "Rentals / Project planning",
    j.slug.startsWith("industries/")
      ? "Secteur / Parcours d’achat"
      : "Location / Planification du projet",
  ),
  intro: j.intro,
  sections: [
    {
      title: bi("Prepare a useful brief", "Préparer une demande utile"),
      body: j.considerations,
    },
    {
      title: bi("Define what success looks like", "Définir la réussite"),
      body: j.measurement,
    },
    {
      title: bi(
        "Discuss scope and feasibility",
        "Discuter de la portée et de la faisabilité",
      ),
      body: bi(
        "Share your location, dates and requirements. Sourcing, operator support and delivery depend on the selected platform and project assessment.",
        "Précisez le lieu, les dates et les besoins. L’approvisionnement, le soutien et la livraison dépendent de la plateforme et de l’évaluation du projet.",
      ),
    },
  ],
}));
export const servicePage: ContentPage = {
  slug: "commercial-robots/service",
  title: bi("Make service flow.", "Fluidifiez le service."),
  eyebrow: bi("H–06 / Service & hospitality", "H–06 / Service et hôtellerie"),
  intro: bi(
    "Explore indoor delivery and guest-facing robotics for hospitality, retail and supervised events. Start with the route and the human handoff.",
    "Explorez la livraison intérieure et les interactions robotiques en hôtellerie, en commerce et lors d’événements supervisés. Commencez par le parcours et le transfert humain.",
  ),
  sections: [
    {
      title: bi(
        "Design the service journey",
        "Concevoir le parcours de service",
      ),
      body: bi(
        "Map loading, delivery, return and exception handling. Confirm corridor widths, guest access and who takes responsibility at every stop.",
        "Cartographiez le chargement, la livraison, le retour et les exceptions. Confirmez les passages, l’accès des clients et les responsabilités à chaque arrêt.",
      ),
    },
    {
      title: bi("Support the team", "Soutenir l’équipe"),
      body: bi(
        "Assess training, cleaning, daily checks and recovery procedures. A robot can support a bounded task; guest care and operating decisions remain with people.",
        "Évaluez la formation, le nettoyage, les vérifications et la reprise. Un robot peut soutenir une tâche ciblée; les soins aux clients et les décisions restent humains.",
      ),
    },
  ],
};
