export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export type Bilingual = { en: string; fr: string };
export const bi = (en: string, fr: string): Bilingual => ({ en, fr });
export const isLocale = (value: string): value is Locale =>
  value === "en" || value === "fr";
export const siteUrl = (process.env.SITE_URL || "https://botix.ca").replace(
  /\/$/,
  "",
);
export type Section = { title: Bilingual; body: Bilingual };
export type ContentPage = {
  slug: string;
  title: Bilingual;
  eyebrow: Bilingual;
  intro: Bilingual;
  sections: Section[];
};
const section = (
  en: string,
  fr: string,
  bodyEn: string,
  bodyFr: string,
): Section => ({ title: bi(en, fr), body: bi(bodyEn, bodyFr) });
export const categories = [
  {
    slug: "humanoid-robots",
    name: bi("Humanoid robotics", "Robotique humanoïde"),
    short: bi(
      "The next frontier of work.",
      "La prochaine évolution du travail.",
    ),
    code: "H–01",
    icon: "humanoid",
  },
  {
    slug: "commercial-robots/cleaning",
    name: bi("Commercial cleaning", "Nettoyage commercial"),
    short: bi("A more consistent clean.", "Un nettoyage plus constant."),
    code: "C–02",
    icon: "cleaning",
  },
  {
    slug: "commercial-robots/logistics",
    name: bi("Warehouse & logistics", "Entrepôts et logistique"),
    short: bi("Keep your operation moving.", "Fluidifiez vos opérations."),
    code: "L–03",
    icon: "logistics",
  },
  {
    slug: "commercial-robots/industrial",
    name: bi("Industrial & collaborative", "Industrie et collaboration"),
    short: bi("Precision at every step.", "La précision à chaque étape."),
    code: "I–04",
    icon: "industrial",
  },
  {
    slug: "commercial-robots/inspection",
    name: bi("Inspection robotics", "Robotique d’inspection"),
    short: bi(
      "A closer look. A clearer picture.",
      "Observer mieux. Décider mieux.",
    ),
    code: "S–05",
    icon: "inspection",
  },
  {
    slug: "commercial-robots/service",
    name: bi("Service & hospitality", "Service et hôtellerie"),
    short: bi("Support every handoff.", "Facilitez chaque transfert."),
    code: "H–06",
    icon: "service",
  },
];
export const pages: ContentPage[] = [
  {
    slug: "humanoid-robots",
    eyebrow: bi("H–01 / Humanoid robotics", "H–01 / Robotique humanoïde"),
    title: bi(
      "A new form of possibility.",
      "Une nouvelle forme de possibilités.",
    ),
    intro: bi(
      "Explore humanoid robotics for research, demonstrations and carefully scoped enterprise pilots. Start with the task, the environment and the evidence you need.",
      "Explorez la robotique humanoïde pour la recherche, les démonstrations et les projets pilotes en entreprise. Définissons d’abord la tâche, l’environnement et les résultats à mesurer.",
    ),
    sections: [
      section(
        "Start with a bounded pilot",
        "Commencer par un projet ciblé",
        "Identify a repeatable task, a controlled operating area and a measurable outcome. Humanoid enterprise deployment is emerging; suitability must be established for each application.",
        "Définissez une tâche répétable, une zone contrôlée et un résultat mesurable. Le déploiement en entreprise est encore émergent; chaque application doit faire l’objet d’une évaluation.",
      ),
      section(
        "Evaluate the complete system",
        "Évaluer le système complet",
        "Review manipulation, mobility, supervision, charging, software access and recovery procedures. A compelling demonstration is only one part of an operational assessment.",
        "Examinez la manipulation, la mobilité, la supervision, la recharge, l’accès logiciel et les procédures de reprise. Une démonstration ne remplace pas une évaluation opérationnelle.",
      ),
      section(
        "Plan for people",
        "Prévoir la place des équipes",
        "Define training, safe separation, operator responsibilities and escalation procedures before a pilot. Availability, integration and support depend on the selected platform.",
        "Prévoyez la formation, les distances de sécurité, les responsabilités et les procédures d’intervention avant le projet pilote. La disponibilité, l’intégration et le soutien dépendent de la plateforme retenue.",
      ),
    ],
  },
  {
    slug: "commercial-robots",
    eyebrow: bi("Robotics portfolio", "Solutions robotiques"),
    title: bi(
      "Purpose-built for the work ahead.",
      "Des robots adaptés au travail à accomplir.",
    ),
    intro: bi(
      "Explore commercial robotics by the task you need to solve. Compare the operational requirements before choosing a platform.",
      "Explorez la robotique commerciale selon la tâche à accomplir. Comparez les exigences opérationnelles avant de choisir une plateforme.",
    ),
    sections: [
      section(
        "A practical starting point",
        "Un point de départ concret",
        "Document your current workflow, constraints and cost drivers. We use this brief to coordinate sourcing and identify questions for potential suppliers.",
        "Documentez votre processus, vos contraintes et vos facteurs de coûts. Ce portrait guide la recherche de solutions et les questions à poser aux fournisseurs potentiels.",
      ),
    ],
  },
  {
    slug: "commercial-robots/cleaning",
    eyebrow: bi("C–02 / Cleaning", "C–02 / Nettoyage"),
    title: bi(
      "Make room for a better clean.",
      "Faites place à un meilleur nettoyage.",
    ),
    intro: bi(
      "Assess autonomous floor-care options for commercial facilities, with attention to real surfaces, traffic patterns and daily routines.",
      "Évaluez les options de nettoyage autonome pour vos installations commerciales en tenant compte des surfaces, de la circulation et des routines quotidiennes.",
    ),
    sections: [
      section(
        "Map the floor, then the workflow",
        "Cartographier les lieux et le travail",
        "Share cleanable area in square metres, floor materials, thresholds, ramps and operating hours. Congested areas and changing layouts need special attention.",
        "Précisez la superficie en mètres carrés, les matériaux, les seuils, les rampes et les heures d’activité. Les zones encombrées et les aménagements changeants exigent une attention particulière.",
      ),
      section(
        "Include the daily essentials",
        "Prévoir les tâches quotidiennes",
        "Account for water access, drainage, consumables, charging and operator checks. Confirm cleaning performance through a site-specific trial.",
        "Prévoyez l’accès à l’eau, la vidange, les consommables, la recharge et les vérifications. Confirmez la performance par un essai adapté au site.",
      ),
    ],
  },
  {
    slug: "commercial-robots/logistics",
    eyebrow: bi("L–03 / Logistics", "L–03 / Logistique"),
    title: bi(
      "Move materials. Unlock capacity.",
      "Déplacez les matières. Libérez du potentiel.",
    ),
    intro: bi(
      "Explore autonomous mobile robots and material-handling workflows for warehouses and internal logistics.",
      "Explorez les robots mobiles autonomes et la manutention pour les entrepôts et la logistique interne.",
    ),
    sections: [
      section(
        "Follow the load",
        "Suivre la charge",
        "Specify load dimensions, mass in kilograms, pickup and drop-off points, aisle widths and crossings. Evaluate the route across busy and quiet shifts.",
        "Précisez les dimensions, la masse en kilogrammes, les points de transfert, les largeurs d’allées et les intersections. Évaluez le trajet à différents quarts de travail.",
      ),
      section(
        "Connect the operation",
        "Relier les opérations",
        "Review doors, lifts, fleet orchestration and warehouse software interfaces. Integration effort and site preparation belong in the project scope.",
        "Examinez les portes, les ascenseurs, la gestion de flotte et les interfaces du système d’entrepôt. L’intégration et la préparation du site font partie du projet.",
      ),
    ],
  },
  {
    slug: "commercial-robots/industrial",
    eyebrow: bi("I–04 / Industrial", "I–04 / Industrie"),
    title: bi(
      "Repeatability, by design.",
      "La répétabilité dès la conception.",
    ),
    intro: bi(
      "Frame industrial arm and cobot applications around the process, tooling and risk assessment—not just the robot.",
      "Définissez les applications de bras industriels et de cobots selon le procédé, l’outillage et l’évaluation des risques.",
    ),
    sections: [
      section(
        "Define the process window",
        "Définir les paramètres du procédé",
        "Provide payload, reach, cycle expectations, part variation and required tolerances. End effectors and fixtures can be as important as the arm itself.",
        "Précisez la charge utile, la portée, les cycles visés, la variation des pièces et les tolérances. Les préhenseurs et les montages peuvent être aussi importants que le bras.",
      ),
      section(
        "Engineer the complete cell",
        "Concevoir la cellule complète",
        "Collaborative branding does not remove the need for application-specific safety assessment. Scope guarding, controls, commissioning and training with qualified specialists.",
        "Le caractère collaboratif ne remplace pas l’évaluation de sécurité propre à l’application. Prévoyez la protection, les commandes, la mise en service et la formation avec des spécialistes qualifiés.",
      ),
    ],
  },
  {
    slug: "commercial-robots/inspection",
    eyebrow: bi("S–05 / Inspection", "S–05 / Inspection"),
    title: bi(
      "Turn observations into decisions.",
      "Transformez les observations en décisions.",
    ),
    intro: bi(
      "Scope mobile inspection around the information your team needs and the environment a platform must navigate.",
      "Définissez l’inspection mobile selon les données dont votre équipe a besoin et l’environnement à parcourir.",
    ),
    sections: [
      section(
        "Specify the evidence",
        "Définir les données nécessaires",
        "Define visual, thermal or other sensing requirements, inspection frequency and reporting needs. Sensor suitability requires verification for the intended conditions.",
        "Définissez les besoins visuels, thermiques ou autres, la fréquence et les rapports souhaités. La pertinence des capteurs doit être vérifiée pour les conditions prévues.",
      ),
      section(
        "Account for the environment",
        "Tenir compte de l’environnement",
        "Document stairs, terrain, connectivity, weather exposure and restricted areas. Hazardous locations require a separately verified equipment and safety approach.",
        "Documentez les escaliers, le terrain, la connectivité, les conditions météo et les zones restreintes. Les lieux dangereux nécessitent une vérification distincte des équipements et de la sécurité.",
      ),
    ],
  },
  {
    slug: "robot-rentals",
    eyebrow: bi(
      "Rentals / Demonstrations / Pilots",
      "Location / Démonstration / Projets pilotes",
    ),
    title: bi(
      "Experience the possibility.",
      "Découvrez les possibilités sur le terrain.",
    ),
    intro: bi(
      "Discuss a robot rental, demonstration or pilot for your event, research team or operating site. Options depend on platform availability, location and technical feasibility.",
      "Discutez d’une location, d’une démonstration ou d’un projet pilote pour un événement, la recherche ou vos installations. Les options dépendent de la disponibilité, du lieu et de la faisabilité technique.",
    ),
    sections: [
      section(
        "Events & demonstrations",
        "Événements et démonstrations",
        "Share the date, venue, audience and desired interaction. We assess transport, operator support, power and safe operating space as part of the request.",
        "Précisez la date, le lieu, le public et l’interaction souhaitée. Le transport, l’opérateur, l’alimentation et l’espace sécuritaire sont évalués dans la demande.",
      ),
      section(
        "Business pilots",
        "Projets pilotes en entreprise",
        "Agree on success criteria, supervision and a practical test window. Confirm scope, responsibilities and commercial terms before making commitments.",
        "Convenez des critères de réussite, de la supervision et de la durée d’essai. Confirmez la portée, les responsabilités et les modalités avant tout engagement.",
      ),
    ],
  },
  {
    slug: "industries",
    eyebrow: bi(
      "Built around your operation",
      "Selon votre réalité opérationnelle",
    ),
    title: bi(
      "Different industries. Better questions.",
      "Des secteurs différents. Les bonnes questions.",
    ),
    intro: bi(
      "The right robotics project begins with a clear understanding of the people, space and process around it.",
      "Un bon projet robotique commence par une compréhension des équipes, des lieux et des processus.",
    ),
    sections: [
      section(
        "Facilities & hospitality",
        "Immeubles et hôtellerie",
        "Consider floor care and internal transport alongside guest experience, accessibility and quiet operating hours.",
        "Évaluez le nettoyage et le transport interne en tenant compte de l’expérience client, de l’accessibilité et des heures de tranquillité.",
      ),
      section(
        "Manufacturing & distribution",
        "Fabrication et distribution",
        "Explore repeatable handling and transport tasks. Map shift patterns, loading points and upstream or downstream dependencies.",
        "Explorez les tâches répétables de manutention et de transport. Cartographiez les quarts, les points de chargement et les dépendances des procédés.",
      ),
      section(
        "Research, education & events",
        "Recherche, enseignement et événements",
        "Scope supervised humanoid demonstrations, experimentation and learning. Confirm software access, operator training and venue requirements.",
        "Définissez les démonstrations supervisées, l’expérimentation et l’apprentissage. Confirmez l’accès logiciel, la formation et les exigences du lieu.",
      ),
    ],
  },
  {
    slug: "solutions",
    eyebrow: bi("From question to scope", "De la question au projet"),
    title: bi(
      "A clear path to robotics.",
      "Un parcours clair vers la robotique.",
    ),
    intro: bi(
      "Bring us the operational challenge. We help structure the requirements, explore sourcing options and coordinate the next technical conversation.",
      "Présentez-nous votre défi opérationnel. Nous aidons à définir les besoins, à explorer les options et à coordonner les échanges techniques.",
    ),
    sections: [
      section(
        "01 / Discover",
        "01 / Comprendre",
        "Define the task, site constraints, project stakeholders and desired outcome.",
        "Définissez la tâche, les contraintes, les parties prenantes et le résultat souhaité.",
      ),
      section(
        "02 / Evaluate",
        "02 / Évaluer",
        "Compare potential approaches, supplier information and the questions that require a site assessment or pilot.",
        "Comparez les approches, les renseignements des fournisseurs et les questions nécessitant une visite ou un projet pilote.",
      ),
      section(
        "From shortlist to a written scope",
        "De la sélection à une portée écrite",
        "Treat catalogue profiles as a starting point. Confirm the exact model and configuration, supplier relationship, software access, transport, training and support responsibilities in writing before committing. Evaluate total project costs and acceptance criteria, not only the platform.",
        "Les profils du catalogue constituent un point de départ. Confirmez par écrit le modèle, la configuration, la relation fournisseur, l’accès logiciel, le transport, la formation et les responsabilités de soutien avant de vous engager. Évaluez les coûts du projet et les critères d’acceptation, au-delà de la plateforme.",
      ),
      section(
        "A supervised pilot with a clear decision",
        "Un projet pilote supervisé menant à une décision claire",
        "Define a baseline, measurable task, operating limits, responsible operator and stop criteria. Review site access, public separation, emergency stop and recovery procedures with the responsible supplier and site team. Agree how results will support a proceed, revise or stop decision.",
        "Définissez la situation initiale, une tâche mesurable, les limites d’utilisation, l’opérateur responsable et les critères d’arrêt. Examinez l’accès au site, la séparation du public, l’arrêt d’urgence et la récupération avec le fournisseur responsable et l’équipe du site. Convenez de la façon dont les résultats guideront la poursuite, la révision ou l’arrêt du projet.",
      ),
      section(
        "03 / Coordinate",
        "03 / Coordonner",
        "Align sourcing, integration responsibilities, training and support expectations before progressing.",
        "Clarifiez l’approvisionnement, les responsabilités d’intégration, la formation et le soutien avant de poursuivre.",
      ),
    ],
  },
  {
    slug: "about",
    eyebrow: bi("BOTIX / Commercial Robotics", "BOTIX / Robotique commerciale"),
    title: bi(
      "Intelligent robots. Real-world solutions.",
      "Des robots intelligents. Des solutions concrètes.",
    ),
    intro: bi(
      "BOTIX is a Canadian B2B commercial robotics platform connecting operational needs with a structured sourcing and evaluation process.",
      "BOTIX est une plateforme canadienne de robotique commerciale interentreprises qui relie les besoins opérationnels à une démarche structurée de recherche et d’évaluation.",
    ),
    sections: [
      section(
        "Ambition, grounded in reality",
        "L’ambition ancrée dans le réel",
        "Humanoid robotics is our flagship focus, alongside cleaning, logistics, industrial and inspection applications. We start with fit and feasibility, not assumptions about what a robot can do.",
        "La robotique humanoïde est au cœur de notre approche, aux côtés du nettoyage, de la logistique, de l’industrie et de l’inspection. La pertinence et la faisabilité guident chaque projet.",
      ),
      section(
        "A national conversation",
        "Une conversation à l’échelle du pays",
        "We welcome inquiries from across Canada in English and French. Site access, supplier coverage and service arrangements are assessed for each project.",
        "Nous accueillons les demandes de partout au Canada, en français et en anglais. L’accès au site, la couverture des fournisseurs et le service sont évalués pour chaque projet.",
      ),
    ],
  },
  {
    slug: "contact",
    eyebrow: bi("Let’s talk robotics", "Parlons robotique"),
    title: bi(
      "What could your team do next?",
      "Quelle est la prochaine étape pour votre équipe?",
    ),
    intro: bi(
      "Tell us about your operation, your location and the work you want to improve. For a detailed project, use our quote request.",
      "Parlez-nous de vos activités, de votre emplacement et du travail à améliorer. Pour un projet détaillé, utilisez notre demande de soumission.",
    ),
    sections: [],
  },
  {
    slug: "request-quote",
    eyebrow: bi("Start a conversation", "Entamons la conversation"),
    title: bi(
      "Let’s define your next move.",
      "Définissons votre prochaine étape.",
    ),
    intro: bi(
      "A few details help us understand your project. Share what you know; technical requirements can be refined together.",
      "Quelques renseignements nous aideront à comprendre votre projet. Transmettez ce que vous savez; nous préciserons ensemble les exigences techniques.",
    ),
    sections: [],
  },
  {
    slug: "privacy",
    eyebrow: bi("Privacy", "Confidentialité"),
    title: bi(
      "Your information, handled with purpose.",
      "Vos renseignements, utilisés à bon escient.",
    ),
    intro: bi(
      "This notice describes how inquiry information is used by BOTIX. Please avoid sending sensitive personal information in project descriptions.",
      "Cet avis décrit l’utilisation des renseignements transmis à BOTIX. Évitez d’inclure des renseignements personnels sensibles dans votre description.",
    ),
    sections: [
      section(
        "Information you provide",
        "Renseignements fournis",
        "Our inquiry form requests business contact details, project requirements and consent so we can assess and respond to your request. Optional budget information helps frame sourcing options.",
        "Le formulaire demande vos coordonnées professionnelles, les besoins du projet et votre consentement pour évaluer votre demande et y répondre. Le budget facultatif aide à orienter les options.",
      ),
      section(
        "Use and service providers",
        "Utilisation et prestataires",
        "Inquiry information is used to respond and coordinate your requested project. Delivery and hosting providers may process it for that purpose. Project details may be shared with relevant suppliers as needed to respond to your request; unnecessary personal details should not be included.",
        "Les renseignements servent à répondre à votre demande et à coordonner votre projet. Les prestataires d’hébergement et de transmission peuvent les traiter à cette fin. Les détails pertinents du projet peuvent être communiqués aux fournisseurs pour répondre à votre demande; évitez les renseignements personnels superflus.",
      ),
      section(
        "Choices and questions",
        "Vos choix et questions",
        "Use our contact page to request access, correction or deletion of information you submitted. This site does not enable optional analytics or advertising trackers by default.",
        "Utilisez notre page de contact pour demander l’accès, la correction ou la suppression des renseignements transmis. Ce site n’active pas par défaut d’outils facultatifs d’analyse ou de publicité.",
      ),
    ],
  },
  {
    slug: "terms",
    eyebrow: bi("Website terms", "Conditions d’utilisation"),
    title: bi("Clear expectations.", "Des attentes claires."),
    intro: bi(
      "This website provides general information about commercial robotics and a way to discuss potential projects.",
      "Ce site présente des renseignements généraux sur la robotique commerciale et permet de discuter de projets potentiels.",
    ),
    sections: [
      section(
        "Information and inquiries",
        "Renseignements et demandes",
        "Website content is not a binding offer or a guarantee of suitability, availability, pricing or performance. An inquiry does not create a purchase or rental agreement.",
        "Le contenu ne constitue ni une offre ferme ni une garantie de pertinence, de disponibilité, de prix ou de performance. Une demande ne constitue pas un contrat d’achat ou de location.",
      ),
      section(
        "Project-specific terms",
        "Modalités propres au projet",
        "Any supply, rental, pilot or integration work requires a separate agreement defining scope, responsibilities, commercial terms and applicable safety requirements.",
        "Tout achat, location, projet pilote ou travail d’intégration nécessite une entente distincte précisant la portée, les responsabilités, les modalités commerciales et les exigences de sécurité.",
      ),
      section(
        "Responsible use",
        "Utilisation responsable",
        "Do not misuse this site, interfere with its operation or submit information you are not entitled to share. Contact BOTIX if you have questions about the content.",
        "N’utilisez pas ce site abusivement, ne perturbez pas son fonctionnement et ne transmettez pas de renseignements que vous n’êtes pas autorisé à partager. Communiquez avec BOTIX pour toute question.",
      ),
    ],
  },
];
export const ui = {
  en: {
    robots: "Robots",
    industries: "Industries",
    solutions: "Solutions",
    rentals: "Rentals",
    about: "About",
    quote: "Request a quote",
    explore: "Explore robots",
    contact: "Contact",
    locations: "Across Canada",
    privacy: "Privacy",
    terms: "Terms",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
    home: "Home",
    language: "Français",
    next: "Discuss your project",
    read: "Explore category",
    back: "All locations",
  },
  fr: {
    robots: "Robots",
    industries: "Secteurs",
    solutions: "Solutions",
    rentals: "Location",
    about: "À propos",
    quote: "Demander une soumission",
    explore: "Explorer les robots",
    contact: "Contact",
    locations: "Partout au Canada",
    privacy: "Confidentialité",
    terms: "Conditions",
    menu: "Menu",
    close: "Fermer",
    skip: "Aller au contenu",
    home: "Accueil",
    language: "English",
    next: "Discuter de votre projet",
    read: "Explorer la catégorie",
    back: "Tous les emplacements",
  },
};
export const faqs: Section[] = [
  section(
    "Which robot is right for my business?",
    "Quel robot convient à mon entreprise?",
    "Start with the task rather than a model. Share your environment, workflow, constraints and success criteria so we can frame relevant sourcing options.",
    "Commencez par la tâche plutôt que le modèle. Décrivez votre environnement, votre processus, vos contraintes et vos critères de réussite pour orienter les options.",
  ),
  section(
    "Can I arrange a rental or demonstration?",
    "Puis-je organiser une location ou une démonstration?",
    "Submit your dates, location and intended use. Rentals, demonstrations and pilots are assessed according to platform availability and technical feasibility.",
    "Transmettez les dates, le lieu et l’utilisation prévue. Les locations, démonstrations et projets pilotes sont évalués selon la disponibilité et la faisabilité technique.",
  ),
  section(
    "Do you work with businesses across Canada?",
    "Travaillez-vous avec des entreprises partout au Canada?",
    "We accept inquiries from every province and territory. Delivery, integration and support arrangements are confirmed for each location and project.",
    "Nous acceptons les demandes de toutes les provinces et de tous les territoires. La livraison, l’intégration et le soutien sont confirmés pour chaque lieu et projet.",
  ),
  section(
    "Are humanoids ready for every workplace?",
    "Les humanoïdes conviennent-ils à tous les milieux de travail?",
    "No. Enterprise use is emerging. A supervised, clearly scoped pilot can help evaluate suitability, safety and practical limitations for your application.",
    "Non. Leur utilisation en entreprise est émergente. Un projet pilote supervisé et bien défini permet d’évaluer la pertinence, la sécurité et les limites pratiques de votre application.",
  ),
];
