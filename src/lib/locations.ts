import { bi, type Bilingual } from "./content";
export type Region = {
  slug: string;
  code: string;
  name: Bilingual;
  focus: Bilingual;
  cities: string[];
  checklist: Bilingual;
};
export const regions: Region[] = [
  {
    slug: "ontario",
    code: "ON",
    name: bi("Ontario", "Ontario"),
    focus: bi(
      "Plan around a mix of production, distribution and public-facing facilities. Separate a pilot’s operating zone from pedestrian and vehicle traffic.",
      "Planifiez pour les installations de production, de distribution et d’accueil. Séparez la zone du projet pilote des piétons et des véhicules.",
    ),
    cities: [
      "Toronto / GTA",
      "Mississauga",
      "Brampton",
      "Vaughan",
      "Markham",
      "Richmond Hill",
      "Oakville",
      "Burlington",
      "Hamilton",
      "Kitchener-Waterloo",
      "Cambridge",
      "London",
      "Ottawa",
    ],
    checklist: bi(
      "Include dock access, shift changes and the relationship between warehouse software and existing equipment.",
      "Précisez l’accès aux quais, les changements de quart et les liens entre le logiciel d’entrepôt et les équipements existants.",
    ),
  },
  {
    slug: "quebec",
    code: "QC",
    name: bi("Quebec", "Québec"),
    focus: bi(
      "Make operating language part of the technical brief. Confirm French operator instructions, training and the language of software interfaces during evaluation.",
      "Intégrez la langue de travail au cahier des charges. Confirmez les consignes, la formation et la langue des interfaces logicielles lors de l’évaluation.",
    ),
    cities: [
      "Montréal",
      "Laval",
      "Longueuil",
      "Brossard",
      "Québec",
      "Lévis",
      "Gatineau",
    ],
    checklist: bi(
      "Specify bilingual stakeholder needs, building access and winter entryway conditions for indoor mobile equipment.",
      "Précisez les besoins linguistiques, l’accès au bâtiment et les conditions hivernales des entrées pour les équipements mobiles intérieurs.",
    ),
  },
  {
    slug: "british-columbia",
    code: "BC",
    name: bi("British Columbia", "Colombie-Britannique"),
    focus: bi(
      "Assess building levels, loading access and transport arrangements early. Island and remote-site projects need an explicit delivery and recovery plan.",
      "Évaluez tôt les niveaux du bâtiment, l’accès au chargement et le transport. Les projets insulaires ou éloignés nécessitent un plan de livraison et de récupération.",
    ),
    cities: [
      "Vancouver",
      "Burnaby",
      "Richmond",
      "Surrey",
      "Coquitlam",
      "Victoria",
      "Saanich",
      "Langford",
    ],
    checklist: bi(
      "Identify lift dimensions, floor transitions and any moisture exposure along the operating route.",
      "Précisez les dimensions des ascenseurs, les transitions de plancher et l’exposition à l’humidité le long du parcours.",
    ),
  },
  {
    slug: "alberta",
    code: "AB",
    name: bi("Alberta", "Alberta"),
    focus: bi(
      "Distinguish indoor automation from outdoor or industrial inspection. Temperature, dust and classified areas need separate suitability checks.",
      "Distinguez l’automatisation intérieure de l’inspection extérieure ou industrielle. La température, la poussière et les zones classées exigent des vérifications distinctes.",
    ),
    cities: [
      "Calgary",
      "Airdrie",
      "Cochrane",
      "Edmonton",
      "St. Albert",
      "Sherwood Park",
      "Leduc",
    ],
    checklist: bi(
      "Include site induction, network access and the qualifications required of personnel attending the facility.",
      "Précisez l’accueil de sécurité, l’accès réseau et les qualifications exigées du personnel sur place.",
    ),
  },
  {
    slug: "manitoba",
    code: "MB",
    name: bi("Manitoba", "Manitoba"),
    focus: bi(
      "For facilities with seasonal operating changes, evaluate the robot’s route in the conditions it will actually encounter. Include tracked-in snow and transitions from loading areas.",
      "Pour les installations soumises aux variations saisonnières, évaluez le parcours dans les conditions réelles, y compris la neige apportée à l’intérieur et les zones de chargement.",
    ),
    cities: ["Winnipeg", "Brandon", "Steinbach"],
    checklist: bi(
      "Document floor condition changes, charging locations and contingency procedures for peak shifts.",
      "Documentez les variations de l’état des sols, la recharge et les procédures de rechange pendant les quarts de pointe.",
    ),
  },
  {
    slug: "saskatchewan",
    code: "SK",
    name: bi("Saskatchewan", "Saskatchewan"),
    focus: bi(
      "A regional project may need more planning for service visits and replacement parts. Define what local operators can safely maintain and what requires specialist support.",
      "Un projet régional peut exiger davantage de planification des visites de service et des pièces. Définissez l’entretien permis aux opérateurs et les interventions spécialisées.",
    ),
    cities: ["Saskatoon", "Regina", "Warman", "Martensville"],
    checklist: bi(
      "List maintenance skills on site, consumable storage and acceptable equipment downtime.",
      "Précisez les compétences d’entretien sur place, le stockage des consommables et les temps d’arrêt acceptables.",
    ),
  },
  {
    slug: "nova-scotia",
    code: "NS",
    name: bi("Nova Scotia", "Nouvelle-Écosse"),
    focus: bi(
      "For mixed-use facilities, define the boundaries between staff, visitors and robotic equipment. Schedule demonstrations around real venue access and operating hours.",
      "Pour les bâtiments polyvalents, définissez les limites entre le personnel, les visiteurs et les robots. Planifiez les démonstrations selon l’accès et les heures d’activité.",
    ),
    cities: ["Halifax", "Dartmouth", "Bedford", "Truro"],
    checklist: bi(
      "Include visitor flow, wet entryways and staging space for delivery and setup.",
      "Précisez la circulation des visiteurs, les entrées humides et l’espace nécessaire à la livraison et à l’installation.",
    ),
  },
  {
    slug: "new-brunswick",
    code: "NB",
    name: bi("New Brunswick", "Nouveau-Brunswick"),
    focus: bi(
      "Confirm the language needs of each operating team and the documentation required at your site. Multi-site projects benefit from a common evaluation checklist.",
      "Confirmez les besoins linguistiques de chaque équipe et la documentation requise. Pour plusieurs sites, utilisez une grille d’évaluation commune.",
    ),
    cities: ["Moncton", "Dieppe", "Fredericton", "Saint John"],
    checklist: bi(
      "Specify training languages, site-to-site transport and who owns operating procedures.",
      "Précisez les langues de formation, le transport entre sites et les responsables des procédures.",
    ),
  },
  {
    slug: "newfoundland-and-labrador",
    code: "NL",
    name: bi("Newfoundland and Labrador", "Terre-Neuve-et-Labrador"),
    focus: bi(
      "Build freight, equipment recovery and service access into the project schedule. Validate environmental protection for any equipment exposed to coastal conditions.",
      "Intégrez le transport, la récupération des équipements et l’accès au service à l’échéancier. Validez la protection requise contre les conditions côtières.",
    ),
    cities: ["St. John’s", "Mount Pearl", "Paradise", "Corner Brook"],
    checklist: bi(
      "Confirm shipping dimensions, receiving equipment and secure storage between operating periods.",
      "Confirmez les dimensions d’expédition, les équipements de réception et l’entreposage sécuritaire entre les utilisations.",
    ),
  },
  {
    slug: "prince-edward-island",
    code: "PE",
    name: bi("Prince Edward Island", "Île-du-Prince-Édouard"),
    focus: bi(
      "For seasonal or event-based operations, align the test period with representative staffing and visitor volumes. A quiet-day trial may not reflect peak conditions.",
      "Pour les activités saisonnières ou événementielles, choisissez un essai représentatif des effectifs et de l’achalandage. Une journée calme peut ne pas refléter la haute saison.",
    ),
    cities: ["Charlottetown", "Summerside", "Stratford"],
    checklist: bi(
      "Share seasonal dates, storage requirements and operator availability during the proposed rental or pilot.",
      "Précisez les dates saisonnières, l’entreposage et la disponibilité des opérateurs pendant la location ou le projet pilote.",
    ),
  },
  {
    slug: "yukon",
    code: "YT",
    name: bi("Yukon", "Yukon"),
    focus: bi(
      "Remote logistics and indoor environmental control are central to feasibility. Define a recovery plan before committing to an equipment trial.",
      "La logistique éloignée et le contrôle des conditions intérieures sont essentiels. Définissez un plan de récupération avant de confirmer un essai.",
    ),
    cities: ["Whitehorse", "Dawson City"],
    checklist: bi(
      "Confirm freight access, connectivity, battery storage conditions and on-site troubleshooting capacity.",
      "Confirmez l’accès au transport, la connectivité, l’entreposage des batteries et la capacité de dépannage sur place.",
    ),
  },
  {
    slug: "northwest-territories",
    code: "NT",
    name: bi("Northwest Territories", "Territoires du Nord-Ouest"),
    focus: bi(
      "Evaluate transport windows and service limitations as part of the technical scope. Connectivity-dependent functions need a realistic site assessment.",
      "Évaluez les périodes de transport et les limites de service dans la portée technique. Les fonctions dépendantes du réseau nécessitent une évaluation réaliste du site.",
    ),
    cities: ["Yellowknife", "Hay River", "Inuvik"],
    checklist: bi(
      "Describe network reliability, available technical staff and contingency arrangements for equipment faults.",
      "Décrivez la fiabilité du réseau, les ressources techniques et les dispositions en cas de panne.",
    ),
  },
  {
    slug: "nunavut",
    code: "NU",
    name: bi("Nunavut", "Nunavut"),
    focus: bi(
      "Begin with an explicit feasibility review covering transport, storage, operator support and recovery. Equipment suitability cannot be assumed from an indoor demonstration elsewhere.",
      "Commencez par une étude de faisabilité du transport, de l’entreposage, du soutien et de la récupération. Une démonstration intérieure ailleurs ne garantit pas la pertinence locale.",
    ),
    cities: ["Iqaluit", "Rankin Inlet", "Cambridge Bay"],
    checklist: bi(
      "Provide receiving capacity, indoor operating conditions and the support resources available throughout the proposed project.",
      "Précisez la capacité de réception, les conditions intérieures et les ressources de soutien disponibles pendant le projet.",
    ),
  },
];
