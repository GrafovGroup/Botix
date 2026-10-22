import { bi, type Bilingual } from "./content";
export type City = {
  slug: string;
  region: string;
  name: Bilingual;
  nearby: string[];
  focus: Bilingual;
  checklist: Bilingual;
};
export const cities: City[] = [
  {
    slug: "toronto-gta",
    region: "ontario",
    name: bi("Toronto & the GTA", "Toronto et le Grand Toronto"),
    nearby: [
      "Mississauga",
      "Brampton",
      "Vaughan",
      "Markham",
      "Richmond Hill",
      "Oakville",
    ],
    focus: bi(
      "For a multi-site GTA project, compare site conditions before treating buildings as interchangeable. A robot route in an office tower can have very different constraints from a distribution floor.",
      "Pour un projet multisite dans le Grand Toronto, comparez les lieux avant de les considérer comme équivalents. Une tour de bureaux présente des contraintes différentes d’un centre de distribution.",
    ),
    checklist: bi(
      "Provide receiving windows, loading-bay access, lift dimensions and traffic patterns for each address. Group nearby sites only after confirming operator training and charging arrangements.",
      "Précisez les heures de réception, les quais, les ascenseurs et la circulation pour chaque adresse. Regroupez les sites après avoir confirmé la formation et la recharge.",
    ),
  },
  {
    slug: "vancouver",
    region: "british-columbia",
    name: bi("Vancouver & Metro Vancouver", "Vancouver et le Grand Vancouver"),
    nearby: ["Burnaby", "Richmond", "Surrey", "Coquitlam", "North Vancouver"],
    focus: bi(
      "Scope robotics around the complete indoor route, including lifts and shared public space. Wet entryways and transitions between loading areas and finished floors deserve a separate inspection.",
      "Définissez le parcours intérieur complet, y compris les ascenseurs et les espaces publics. Les entrées humides et les transitions depuis le chargement nécessitent une inspection distincte.",
    ),
    checklist: bi(
      "Share building levels, dock access, door controls and the location of charging or water services. For several municipalities, identify who can attend each site for setup and recovery.",
      "Précisez les niveaux, les quais, les commandes de portes et les services de recharge ou d’eau. Pour plusieurs municipalités, identifiez les responsables de l’installation et de la récupération.",
    ),
  },
  {
    slug: "montreal",
    region: "quebec",
    name: bi("Montréal", "Montréal"),
    nearby: ["Laval", "Longueuil", "Brossard", "Saint-Laurent"],
    focus: bi(
      "Make French operating instructions and training part of the initial assessment. For facilities with several levels, evaluate the entire handoff through lifts, doors and shared corridors.",
      "Intégrez les consignes et la formation en français dès l’évaluation. Pour les installations à plusieurs niveaux, examinez les transferts par ascenseurs, portes et corridors partagés.",
    ),
    checklist: bi(
      "Specify operator languages, floor transitions and winter entrance conditions. Confirm the building manager’s requirements for supervised demonstrations and service access.",
      "Précisez les langues des opérateurs, les transitions de sol et les conditions hivernales des entrées. Confirmez les exigences du gestionnaire pour les démonstrations et les accès de service.",
    ),
  },
  {
    slug: "ottawa-gatineau",
    region: "ontario",
    name: bi("Ottawa–Gatineau", "Ottawa–Gatineau"),
    nearby: ["Ottawa", "Gatineau", "Kanata", "Orléans"],
    focus: bi(
      "A project spanning Ottawa and Gatineau should identify the requirements of each site separately, including operating language, visitor procedures and data handling.",
      "Un projet entre Ottawa et Gatineau doit distinguer les exigences de chaque site : langue de travail, procédures d’accueil et traitement des données.",
    ),
    checklist: bi(
      "List site contacts on both sides of the river, access permissions and any network restrictions. Define whether demonstrations can use offline functionality and what data may leave the site.",
      "Indiquez les contacts des deux côtés de la rivière, les permissions et les restrictions réseau. Définissez les fonctions hors ligne et les données pouvant quitter le site.",
    ),
  },
  {
    slug: "calgary",
    region: "alberta",
    name: bi("Calgary", "Calgary"),
    nearby: ["Airdrie", "Cochrane", "Okotoks"],
    focus: bi(
      "Separate an indoor pilot from any route exposed to outdoor temperature or dust. Evaluate the operational task and site induction requirements before selecting a demonstration platform.",
      "Distinguez le projet intérieur des parcours exposés à la température extérieure ou à la poussière. Évaluez la tâche et l’accueil de sécurité avant de choisir une plateforme.",
    ),
    checklist: bi(
      "Share indoor storage, receiving access, surface conditions and required safety orientation. If an inspection area has special classifications, provide those for a dedicated equipment review.",
      "Précisez l’entreposage intérieur, la réception, les surfaces et l’orientation de sécurité. Transmettez toute classification particulière pour une évaluation dédiée.",
    ),
  },
  {
    slug: "edmonton",
    region: "alberta",
    name: bi("Edmonton", "Edmonton"),
    nearby: ["St. Albert", "Sherwood Park", "Leduc"],
    focus: bi(
      "For warehouse or production pilots, document the transition from loading areas to the main robot route. Moisture, debris and shifts in surface condition can change the evaluation.",
      "Pour un projet en entrepôt ou en production, documentez la transition depuis les quais. L’humidité, les débris et les variations de surface peuvent modifier l’évaluation.",
    ),
    checklist: bi(
      "Include shift peaks, maintenance contacts and fault-recovery access. Decide who can move or secure equipment when the usual operator is unavailable.",
      "Précisez les pointes par quart, les contacts d’entretien et l’accès en cas de panne. Déterminez qui peut déplacer ou sécuriser l’équipement en l’absence de l’opérateur.",
    ),
  },
  {
    slug: "quebec-city",
    region: "quebec",
    name: bi("Quebec City", "Québec"),
    nearby: ["Lévis", "Saint-Augustin-de-Desmaures", "L’Ancienne-Lorette"],
    focus: bi(
      "Evaluate a building’s actual floor transitions and public circulation before proposing indoor mobile robotics. French operator documentation and an accessible route belong in the scope.",
      "Évaluez les transitions de sol et la circulation réelle avant de proposer la robotique mobile intérieure. La documentation en français et un parcours accessible font partie de la portée.",
    ),
    checklist: bi(
      "Provide thresholds, ramps, room access and demonstration hours. For sites across the river, identify transport and setup responsibilities for each location.",
      "Précisez les seuils, les rampes, les accès et les heures de démonstration. Pour les sites de part et d’autre du fleuve, identifiez les responsabilités de transport et d’installation.",
    ),
  },
  {
    slug: "winnipeg",
    region: "manitoba",
    name: bi("Winnipeg", "Winnipeg"),
    nearby: ["Headingley", "East St. Paul", "West St. Paul"],
    focus: bi(
      "Test floor-care or transport robots against representative entrance and loading-zone conditions. A dry, empty trial should not stand in for the building’s busiest shift.",
      "Testez les robots dans des conditions représentatives des entrées et des quais. Un essai à vide sur sol sec ne remplace pas le quart le plus achalandé.",
    ),
    checklist: bi(
      "Describe snow or moisture tracked indoors, floor mat locations and storage between shifts. Include a plan for consumables and operator checks.",
      "Décrivez la neige ou l’humidité apportée à l’intérieur, les tapis et l’entreposage entre les quarts. Prévoyez les consommables et les vérifications.",
    ),
  },
  {
    slug: "halifax",
    region: "nova-scotia",
    name: bi("Halifax", "Halifax"),
    nearby: ["Dartmouth", "Bedford", "Sackville"],
    focus: bi(
      "For hospitality or public-venue demonstrations, separate the performance area from through-traffic. Confirm venue access before choosing a platform or announcing an interaction.",
      "Pour les démonstrations en lieux publics ou hôteliers, séparez l’activité de la circulation. Confirmez l’accès avant de choisir une plateforme ou d’annoncer une interaction.",
    ),
    checklist: bi(
      "Share unloading access, wet entrance routes, audience size and secure staging space. Define the operator’s responsibilities during setup, presentation and recovery.",
      "Précisez le déchargement, les entrées humides, le public et l’aire de préparation sécurisée. Définissez les responsabilités pendant l’installation, la présentation et la récupération.",
    ),
  },
  {
    slug: "victoria",
    region: "british-columbia",
    name: bi("Victoria", "Victoria"),
    nearby: ["Saanich", "Langford", "Esquimalt"],
    focus: bi(
      "Treat transport to and from Vancouver Island as part of the pilot scope. The project brief should include receiving capability and a practical recovery window.",
      "Intégrez le transport vers l’île de Vancouver et le retour à la portée du projet. Précisez la réception et une période réaliste de récupération.",
    ),
    checklist: bi(
      "Confirm freight dimensions, venue storage, charging and local operator support. Align any demonstration date with transport contingencies before committing publicly.",
      "Confirmez les dimensions du fret, l’entreposage, la recharge et le soutien local. Coordonnez la date avec les imprévus de transport avant tout engagement public.",
    ),
  },
  {
    slug: "hamilton",
    region: "ontario",
    name: bi("Hamilton", "Hamilton"),
    nearby: ["Burlington", "Stoney Creek", "Ancaster"],
    focus: bi(
      "For an industrial task, separate the robot arm or mobile base from the tooling, guarding and process controls it needs. Assess the complete cell or route.",
      "Pour une tâche industrielle, distinguez le robot de l’outillage, des protections et des commandes nécessaires. Évaluez la cellule ou le parcours complet.",
    ),
    checklist: bi(
      "Share part dimensions, payload centres, handling points and shift patterns. Include safe maintenance access and the conditions under which people enter the operating area.",
      "Précisez les pièces, les centres de charge, les transferts et les quarts. Incluez l’accès d’entretien et les conditions d’entrée dans la zone de travail.",
    ),
  },
  {
    slug: "kitchener-waterloo",
    region: "ontario",
    name: bi("Kitchener–Waterloo", "Kitchener–Waterloo"),
    nearby: ["Cambridge", "Woolwich"],
    focus: bi(
      "For laboratory or engineering evaluation, distinguish access to a physical platform from access to development tools. Confirm the exact hardware and software edition.",
      "Pour une évaluation en laboratoire, distinguez l’accès au robot de l’accès aux outils de développement. Confirmez les éditions matérielles et logicielles.",
    ),
    checklist: bi(
      "Describe research goals, interfaces, data needs and a supervised test protocol. Identify which questions can be answered in a demonstration and which need a longer pilot.",
      "Décrivez les objectifs, les interfaces, les données et le protocole supervisé. Distinguez les questions résolubles en démonstration de celles nécessitant un projet prolongé.",
    ),
  },
  {
    slug: "london",
    region: "ontario",
    name: bi("London", "London"),
    nearby: ["St. Thomas", "Middlesex Centre"],
    focus: bi(
      "For a mixed production and warehouse workflow, map the handoffs between teams before choosing robotics. Transfer ownership is as important as the travel route.",
      "Pour un parcours entre production et entrepôt, cartographiez les transferts entre équipes. Les responsabilités comptent autant que le trajet.",
    ),
    checklist: bi(
      "Provide loading heights, station access, queueing space and the staff responsible for exceptions. Evaluate the busiest handoff during the pilot, not only unobstructed travel.",
      "Précisez les hauteurs, les accès, les files et les responsables des exceptions. Évaluez le transfert le plus achalandé, pas seulement le trajet dégagé.",
    ),
  },
  {
    slug: "saskatoon",
    region: "saskatchewan",
    name: bi("Saskatoon", "Saskatoon"),
    nearby: ["Warman", "Martensville"],
    focus: bi(
      "Build operator support and consumable planning into an initial robotics trial. Identify which maintenance tasks can be performed locally and which need specialist assistance.",
      "Intégrez le soutien et les consommables au premier essai. Identifiez les tâches d’entretien réalisables sur place et celles nécessitant un spécialiste.",
    ),
    checklist: bi(
      "List available technical skills, secure storage and the acceptable interruption window. Document a manual fallback for the task under evaluation.",
      "Précisez les compétences techniques, l’entreposage sécurisé et l’interruption acceptable. Documentez une solution manuelle pour la tâche évaluée.",
    ),
  },
  {
    slug: "regina",
    region: "saskatchewan",
    name: bi("Regina", "Regina"),
    nearby: ["White City", "Emerald Park", "Pilot Butte"],
    focus: bi(
      "For a facility or event project, align the trial with actual staffing and occupancy. A useful brief explains who will supervise and how exceptions will be handled.",
      "Pour un projet immobilier ou événementiel, alignez l’essai sur les effectifs et l’occupation réels. Précisez la supervision et la gestion des exceptions.",
    ),
    checklist: bi(
      "Share visitor routes, floor-care schedules, charging locations and delivery access. Confirm where equipment can be secured outside operating hours.",
      "Précisez les parcours des visiteurs, les horaires d’entretien, la recharge et la livraison. Confirmez la sécurité du matériel hors des heures d’activité.",
    ),
  },
  {
    slug: "st-johns",
    region: "newfoundland-and-labrador",
    name: bi("St. John’s", "St. John’s"),
    nearby: ["Mount Pearl", "Paradise", "Conception Bay South"],
    focus: bi(
      "Plan freight, receiving and recovery before setting a rental or pilot date. Coastal exposure and indoor operating conditions should be described separately.",
      "Planifiez le fret, la réception et la récupération avant de fixer la date. Décrivez séparément l’exposition côtière et les conditions intérieures.",
    ),
    checklist: bi(
      "Provide shipping access, storage conditions and the team available for setup. Include a contingency window and confirm the return process before an equipment commitment.",
      "Précisez les accès, l’entreposage et l’équipe d’installation. Prévoyez une marge et confirmez le retour avant tout engagement matériel.",
    ),
  },
];
