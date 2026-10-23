import { bi } from "./content";

// Original planning guidance; no product capability or availability claims.
export const buyerGuides = [
  {
    route: "commercial-robots",
    id: "selecting-a-robot",
    category: "unsure",
    intent: "general",
    title: bi(
      "Select a robot around the work.",
      "Choisissez un robot selon le travail.",
    ),
    intro: bi(
      "Start with a repeatable task and its operating conditions. Compare the complete arrangement, including people and support, before comparing individual machines.",
      "Commencez par une tâche répétable et ses conditions d’exécution. Comparez l’ensemble du fonctionnement, y compris les personnes et le soutien, avant les machines.",
    ),
    steps: [
      {
        title: bi("Describe the workflow", "Décrivez le fonctionnement"),
        body: bi(
          "Record the inputs, expected output, frequency and exception cases. Include the busiest period and who handles failures. An average day alone can hide the real constraint.",
          "Notez les entrées, le résultat attendu, la fréquence et les exceptions. Incluez la période de pointe et la personne qui gère les échecs. Une journée moyenne peut masquer la contrainte réelle.",
        ),
      },
      {
        title: bi(
          "Compare equivalent scopes",
          "Comparez des périmètres équivalents",
        ),
        body: bi(
          "Ask each option to cover the same task boundary, operating hours, supervision and acceptance criteria. Separate documented capability from a demonstration and from functions that still require development.",
          "Demandez à chaque option de couvrir les mêmes limites de tâche, horaires, conditions de supervision et critères d’acceptation. Distinguez les capacités documentées, les démonstrations et les fonctions qui exigent encore du développement.",
        ),
      },
      {
        title: bi(
          "Choose the next evidence step",
          "Choisissez la prochaine validation",
        ),
        body: bi(
          "A document review may resolve an edition or interface question; a site assessment or supervised pilot may be needed for physical work. Agree what evidence would justify progressing, changing scope or stopping.",
          "Un examen documentaire peut résoudre une question de version ou d’interface; une évaluation du site ou un essai supervisé peut être nécessaire pour le travail physique. Convenez des preuves qui justifieraient de poursuivre, de modifier le périmètre ou d’arrêter.",
        ),
      },
    ],
    brief: bi(
      "Bring the task, site, current process, quantity, timeline and an optional budget range. Identify who evaluates the result and approves the next step.",
      "Précisez la tâche, le site, le processus actuel, la quantité, l’échéancier et, au choix, une fourchette budgétaire. Identifiez qui évalue le résultat et approuve la prochaine étape.",
    ),
  },
  {
    route: "solutions",
    id: "site-assessment",
    category: "unsure",
    intent: "integration",
    title: bi(
      "Prepare the site and safety assessment.",
      "Préparez l’évaluation du site et de la sécurité.",
    ),
    intro: bi(
      "A robot changes how people, equipment and information move through a workplace. Bring those interactions into the project before selecting equipment.",
      "Un robot modifie la circulation des personnes, de l’équipement et de l’information. Intégrez ces interactions au projet avant de choisir l’équipement.",
    ),
    steps: [
      {
        title: bi("Map the operating area", "Délimitez la zone d’utilisation"),
        body: bi(
          "Measure access widths, transitions, slopes, work surfaces and charging space. Document pedestrian and vehicle traffic, restricted areas and changes between shifts. Measurements complement photographs; neither replaces a site assessment.",
          "Mesurez les accès, transitions, pentes, surfaces de travail et espaces de recharge. Documentez la circulation, les zones restreintes et les variations entre quarts. Les mesures complètent les photos; aucune ne remplace l’évaluation du site.",
        ),
      },
      {
        title: bi("Assign responsibilities", "Attribuez les responsabilités"),
        body: bi(
          "Identify the site operator, supplier, integration lead and qualified safety assessor. Clarify stopping, isolation, restart and exception-handling responsibilities before a pilot. A robot label alone does not validate the complete application.",
          "Identifiez l’exploitant, le fournisseur, le responsable de l’intégration et l’évaluateur de sécurité qualifié. Clarifiez les responsabilités d’arrêt, d’isolement, de redémarrage et de gestion des exceptions. L’étiquette d’un robot ne valide pas l’application complète.",
        ),
      },
      {
        title: bi("Define access boundaries", "Définissez les limites d’accès"),
        body: bi(
          "List required networks, accounts, cameras and remote support access. Decide who approves access, what data is retained and how work continues during an outage. Keep credentials and sensitive site drawings in an agreed private channel.",
          "Dressez la liste des réseaux, comptes, caméras et accès de soutien requis. Déterminez qui autorise les accès, quelles données sont conservées et comment le travail se poursuit en cas de panne. Utilisez un canal privé convenu pour les identifiants et plans sensibles.",
        ),
      },
    ],
    brief: bi(
      "Include city, building use, operating schedule, site constraints and the responsible technical contact.",
      "Précisez la ville, l’usage du bâtiment, l’horaire, les contraintes et la personne-ressource technique.",
    ),
  },
  {
    route: "robot-rentals",
    id: "rental-planning",
    category: "service",
    intent: "rental",
    title: bi(
      "Plan the demonstration before the event.",
      "Planifiez la démonstration avant l’événement.",
    ),
    intro: bi(
      "Describe the audience experience, venue and operating plan. Equipment, operators, transport and dates need confirmation together for the proposed scope.",
      "Décrivez l’expérience du public, le lieu et le plan d’utilisation. L’équipement, les opérateurs, le transport et les dates doivent être confirmés ensemble selon le périmètre proposé.",
    ),
    steps: [
      {
        title: bi("Write the run-of-show", "Préparez le déroulement"),
        body: bi(
          "Set out arrival, unloading, setup, rehearsal, demonstration periods, breaks and collection. Specify what the robot should do and what the audience may do. Allow venue approval and testing before guests arrive.",
          "Précisez l’arrivée, le déchargement, l’installation, la répétition, les démonstrations, les pauses et la reprise. Définissez les actions du robot et celles permises au public. Prévoyez les approbations du lieu et les essais avant l’arrivée des visiteurs.",
        ),
      },
      {
        title: bi(
          "Resolve venue requirements",
          "Clarifiez les exigences du lieu",
        ),
        body: bi(
          "Confirm loading access, lifts, floor conditions, power, storage and an operating perimeter. Identify the event contact, operator coverage, insurance responsibilities and a fallback activity if the planned demonstration cannot run.",
          "Confirmez les accès, ascenseurs, sols, alimentation, entreposage et périmètre d’utilisation. Identifiez le contact de l’événement, la présence des opérateurs, les responsabilités d’assurance et une activité de remplacement si la démonstration ne peut avoir lieu.",
        ),
      },
      {
        title: bi("Check the written scope", "Vérifiez le périmètre écrit"),
        body: bi(
          "Request a breakdown of operating hours, transport, setup, training, consumables and cancellation conditions. Confirm custom content separately. A proposed date or editorial robot profile does not reserve equipment.",
          "Demandez le détail des heures, du transport, de l’installation, de la formation, des consommables et des conditions d’annulation. Confirmez séparément le contenu personnalisé. Une date proposée ou un profil éditorial ne réserve pas d’équipement.",
        ),
      },
    ],
    brief: bi(
      "Provide dates, venue, city, audience size, desired activity, supervision needs and access windows. Mention flexibility in dates or format.",
      "Fournissez les dates, le lieu, la ville, la taille du public, l’activité, la supervision et les plages d’accès. Indiquez la flexibilité des dates ou du format.",
    ),
  },
  {
    route: "humanoid-robots",
    id: "feasibility-pilot",
    category: "humanoid",
    intent: "pilot",
    title: bi(
      "Turn humanoid interest into a testable pilot.",
      "Transformez l’intérêt pour les humanoïdes en essai mesurable.",
    ),
    intro: bi(
      "Start with a narrow supervised task. Feasibility depends on the exact platform edition, software access, task and environment, beyond what a demonstration shows.",
      "Commencez par une tâche limitée et supervisée. La faisabilité dépend de la version exacte, de l’accès logiciel, de la tâche et de l’environnement, au-delà d’une démonstration.",
    ),
    steps: [
      {
        title: bi(
          "Separate objective and platform",
          "Distinguez objectif et plateforme",
        ),
        body: bi(
          "Specify research, public demonstration or workplace task evaluation. Describe the object, movement, interaction and supervision. Ask which capabilities exist in the proposed edition and which require development.",
          "Précisez s’il s’agit de recherche, d’une démonstration publique ou d’une tâche professionnelle. Décrivez l’objet, le mouvement, l’interaction et la supervision. Vérifiez les capacités de la version proposée et celles qui exigent du développement.",
        ),
      },
      {
        title: bi("Bound the evaluation", "Délimitez l’évaluation"),
        body: bi(
          "Define the zone, permitted tasks, human separation, stop conditions and review responsibilities. Measure attempts and interventions as well as successes. Assess exceptional conditions before including them in the trial.",
          "Définissez la zone, les tâches, la séparation des personnes, les conditions d’arrêt et les responsabilités de révision. Mesurez les tentatives et interventions, en plus des réussites. Évaluez les situations exceptionnelles avant de les inclure dans l’essai.",
        ),
      },
      {
        title: bi("Decide before expanding", "Décidez avant d’élargir"),
        body: bi(
          "Compare results with the original objective and document unresolved support, software and safety questions. A pilot may lead to a revised task, more testing or stopping; it does not automatically establish readiness for routine operation.",
          "Comparez les résultats à l’objectif et consignez les questions de soutien, de logiciel et de sécurité. Un essai peut mener à une tâche révisée, à d’autres validations ou à un arrêt; il ne démontre pas automatiquement l’aptitude à une utilisation courante.",
        ),
      },
    ],
    brief: bi(
      "Describe the supervised task, business or research objective, location, technical team, software access needs and what the result should demonstrate.",
      "Décrivez la tâche supervisée, l’objectif d’affaires ou de recherche, le lieu, l’équipe technique, l’accès logiciel et ce que le résultat devrait démontrer.",
    ),
  },
  {
    route: "commercial-robots/logistics",
    id: "integration-discovery",
    category: "logistics",
    intent: "integration",
    title: bi(
      "Discover the handoffs before automating transport.",
      "Analysez les transferts avant d’automatiser le transport.",
    ),
    intro: bi(
      "Internal transport links pickup, movement, delivery and confirmation. Interfaces at either end can determine feasibility as much as the route itself.",
      "Le transport interne relie la prise en charge, le déplacement, la livraison et la confirmation. Les interfaces aux extrémités peuvent être aussi déterminantes que le trajet.",
    ),
    steps: [
      {
        title: bi("Define material handoffs", "Définissez les transferts"),
        body: bi(
          "Record load dimensions, weight, stability, orientation and transfer heights. Identify who prepares the load and confirms completion. Include empty-container returns and blocked destinations, rather than modelling only a successful trip.",
          "Notez les dimensions, le poids, la stabilité, l’orientation et les hauteurs de transfert. Identifiez qui prépare la charge et confirme la fin. Incluez les contenants vides et les destinations bloquées, pas seulement les trajets réussis.",
        ),
      },
      {
        title: bi(
          "Map systems and exceptions",
          "Cartographiez systèmes et exceptions",
        ),
        body: bi(
          "Identify dispatch, doors, lifts, charging, network coverage and production systems. Assign each interface an owner. Document the manual fallback for rejected jobs, unavailable routes and connectivity loss.",
          "Identifiez la répartition des missions, les portes, ascenseurs, recharges, réseaux et systèmes de production. Attribuez un responsable à chaque interface. Documentez la solution manuelle pour les missions refusées, les trajets indisponibles et les pertes de connexion.",
        ),
      },
      {
        title: bi(
          "Agree measurable acceptance",
          "Convenez de critères mesurables",
        ),
        body: bi(
          "Evaluate representative traffic and workload. Compare completed missions, waits, interventions and recovery with a baseline. Confirm operational ownership, training and support before considering wider deployment.",
          "Évaluez une circulation et une charge représentatives. Comparez les missions terminées, attentes, interventions et reprises à une référence. Confirmez les responsabilités, la formation et le soutien avant d’envisager un déploiement élargi.",
        ),
      },
    ],
    brief: bi(
      "Bring a route sketch, load examples, transfer points, peak volumes, system names and the integration owner. Omit credentials and confidential production data from the public inquiry.",
      "Préparez un croquis, des exemples de charges, les transferts, les volumes de pointe, les systèmes et le responsable de l’intégration. Excluez les identifiants et données confidentielles de la demande publique.",
    ),
  },
  {
    route: "commercial-robots/industrial",
    id: "ownership-cost",
    category: "industrial",
    intent: "purchase",
    title: bi(
      "Compare total ownership scope, not just hardware.",
      "Comparez le coût global, au-delà de l’équipement.",
    ),
    intro: bi(
      "Cover the full application and its operating period. Use documented quotations and your own operating baseline; there is no universal payback figure.",
      "Couvrez l’application complète et sa période d’utilisation. Utilisez des soumissions documentées et vos données d’exploitation; il n’existe pas de délai de rentabilité universel.",
    ),
    steps: [
      {
        title: bi("List initial project costs", "Recensez les coûts initiaux"),
        body: bi(
          "Separate the robot, tooling, fixtures, guarding, integration, site changes, delivery, commissioning and training. Identify who supplies and accepts each item. Mark exclusions and unresolved quantities to compare equivalent scopes.",
          "Distinguez le robot, l’outillage, les montages, protections, intégrations, adaptations, livraison, mise en service et formation. Identifiez qui fournit et accepte chaque élément. Notez les exclusions et quantités à préciser pour comparer des périmètres équivalents.",
        ),
      },
      {
        title: bi(
          "Include recurring work",
          "Incluez l’exploitation récurrente",
        ),
        body: bi(
          "Ask about software, maintenance, consumables, parts, supervision, retraining and support. Account for planned downtime and manual exception handling. Confirm the actual warranty and service scope rather than assuming comprehensive coverage.",
          "Vérifiez les logiciels, l’entretien, les consommables, pièces, supervision, formation continue et soutien. Tenez compte des arrêts planifiés et des exceptions manuelles. Confirmez le périmètre réel de garantie et de service au lieu de supposer une couverture complète.",
        ),
      },
      {
        title: bi("Test the assumptions", "Vérifiez les hypothèses"),
        body: bi(
          "Compare conservative and expected operating cases over the same horizon. Vary utilisation, intervention time and support costs instead of presenting one optimistic return. Keep measured benefits separate from assumptions and avoid counting a saving twice.",
          "Comparez un scénario prudent au scénario attendu sur la même période. Faites varier l’utilisation, le temps d’intervention et le soutien plutôt que de présenter un rendement optimiste unique. Distinguez les gains mesurés des hypothèses et évitez de compter deux fois une économie.",
        ),
      },
    ],
    brief: bi(
      "Include application, parts and tooling, operating hours, constraints, decision timeline and optional budget range. Identify costs already supported by supplier evidence.",
      "Précisez l’application, les pièces et l’outillage, les heures, les contraintes, l’échéancier et, au choix, le budget. Identifiez les coûts déjà documentés par un fournisseur.",
    ),
  },
] as const;
