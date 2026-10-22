import { z } from "zod";
import { bi, type Locale } from "./content";
export const robotTypes = [
  "humanoid",
  "cleaning",
  "logistics",
  "industrial",
  "inspection",
  "service",
] as const;
export const inquiryOptions = ["purchase", "rental", "pilot"] as const;
export type RobotType = (typeof robotTypes)[number];
export const taxonomy = {
  types: {
    humanoid: bi("Humanoid", "Humanoïde"),
    cleaning: bi("Cleaning", "Nettoyage"),
    logistics: bi("Warehouse / AMR", "Entrepôt / RMA"),
    industrial: bi("Industrial / cobot", "Industrie / cobot"),
    inspection: bi("Inspection", "Inspection"),
    service: bi("Service & hospitality", "Service et hôtellerie"),
  },
  applications: {
    research: bi("Research & learning", "Recherche et apprentissage"),
    floorcare: bi("Floor care", "Entretien des sols"),
    transport: bi("Internal transport", "Transport interne"),
    handling: bi("Part handling", "Manipulation de pièces"),
    inspection: bi("Site inspection", "Inspection de sites"),
    guest: bi("Guest service", "Service à la clientèle"),
    demonstration: bi("Demonstration", "Démonstration"),
  },
  industries: {
    manufacturing: bi("Manufacturing", "Fabrication"),
    warehousing: bi("Warehousing", "Entreposage"),
    facilities: bi("Facility management", "Gestion des installations"),
    hospitality: bi("Hospitality", "Hôtellerie et restauration"),
    events: bi("Events", "Événements"),
    retail: bi("Retail", "Commerce de détail"),
    research: bi("Universities & research", "Universités et recherche"),
    logistics: bi("Logistics", "Logistique"),
  },
  intents: {
    purchase: bi("Purchase inquiry", "Demande d’achat"),
    rental: bi("Rental inquiry", "Demande de location"),
    pilot: bi("Pilot inquiry", "Demande de projet pilote"),
  },
};
const localized = z.object({
  en: z.string().trim().min(1),
  fr: z.string().trim().min(1),
});
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const https = z
  .url()
  .refine(
    (value) => value.startsWith("https://"),
    "An HTTPS source is required",
  );
export const verificationSchema = z.object({
  sourceUrl: https,
  checkedOn: z.iso.date(),
  approvedForPublication: z.boolean(),
});
export type Verification = z.infer<typeof verificationSchema>;
const factSchema = z.object({
  label: localized,
  value: localized,
  evidence: verificationSchema,
});
export type VerifiedFact = z.infer<typeof factSchema>;
export const mediaSchema = z.object({
  locale: z.enum(["en", "fr"]),
  src: z.string().regex(/^\/images\/[a-z0-9/-]+\.(webp|png|jpg)$/),
  alt: localized,
  source: https,
  rights: z.enum(["owned", "licensed", "written-permission"]),
  rightsRecord: z.string().min(5),
  placement: z.string().min(3),
  attribution: localized.optional(),
});
export type ProductMedia = z.infer<typeof mediaSchema>;
export const productSchema = z.object({
  slug,
  name: localized,
  manufacturer: slug,
  category: z.enum(robotTypes),
  subcategory: localized,
  summary: localized,
  intendedUse: localized,
  benefits: z.array(localized).min(1),
  applications: z
    .array(
      z.enum([
        "research",
        "floorcare",
        "transport",
        "handling",
        "inspection",
        "guest",
        "demonstration",
      ]),
    )
    .min(1),
  industries: z
    .array(
      z.enum([
        "manufacturing",
        "warehousing",
        "facilities",
        "hospitality",
        "events",
        "retail",
        "research",
        "logistics",
      ]),
    )
    .min(1),
  inquiryOptions: z.array(z.enum(inquiryOptions)).min(1),
  availability: z.discriminatedUnion("status", [
    z.object({ status: z.literal("not-confirmed") }),
    z.object({
      status: z.literal("verified"),
      description: localized,
      evidence: verificationSchema,
    }),
  ]),
  facts: z.array(factSchema),
  media: z.array(mediaSchema),
  relatedSolutions: z.array(
    z
      .string()
      .regex(
        /^(solutions|humanoid-robots|commercial-robots\/[a-z-]+|robot-rentals)$/,
      ),
  ),
  seo: z.object({ title: localized, description: localized }),
  flags: z.object({ featured: z.boolean(), inquiries: z.boolean() }),
  publication: z.enum(["draft", "editorial", "verified"]),
  evidence: verificationSchema,
});
export type Product = z.infer<typeof productSchema>;
export const manufacturerSchema = z.object({
  slug,
  name: z.string().min(1),
  summary: localized,
  website: https,
  evidence: verificationSchema,
});
export type Manufacturer = z.infer<typeof manufacturerSchema>;
const reviewed = "2026-10-22";
const evidence = (sourceUrl: string): Verification => ({
  sourceUrl,
  checkedOn: reviewed,
  approvedForPublication: true,
});
const sources = {
  g1: "https://www.unitree.com/g1/",
  cc1: "https://www.pudurobotics.com/en/products/puduCC1",
  mir: "https://mobile-industrial-robots.com/products/robots/mir250",
  ur: "https://www.universal-robots.com/manuals/EN/HTML/SW10_6/Content/prod-usr-man/hardware/arm_e-Series/UR5e/H_g5_sections/appendix_g5/tech_spec_sheet.htm",
  spot: "https://bostondynamics.com/products/spot/",
  bella: "https://www.pudurobotics.com/en/products/bellabot",
};
const fact = (
  label: ReturnType<typeof bi>,
  value: ReturnType<typeof bi>,
  source: string,
): VerifiedFact => ({ label, value, evidence: evidence(source) });
export const manufacturers: Manufacturer[] = [
  {
    slug: "unitree",
    name: "Unitree Robotics",
    summary: bi(
      "Manufacturer of the G1 humanoid platform.",
      "Fabricant de la plateforme humanoïde G1.",
    ),
    website: "https://www.unitree.com",
    evidence: evidence(sources.g1),
  },
  {
    slug: "pudu",
    name: "PUDU Robotics",
    summary: bi(
      "Manufacturer of commercial cleaning and delivery robots.",
      "Fabricant de robots de nettoyage commercial et de livraison.",
    ),
    website: "https://www.pudurobotics.com",
    evidence: evidence(sources.cc1),
  },
  {
    slug: "mir",
    name: "Mobile Industrial Robots",
    summary: bi(
      "Manufacturer of autonomous mobile robots for material transport.",
      "Fabricant de robots mobiles autonomes pour le transport de matières.",
    ),
    website: "https://mobile-industrial-robots.com",
    evidence: evidence(sources.mir),
  },
  {
    slug: "universal-robots",
    name: "Universal Robots",
    summary: bi(
      "Manufacturer of collaborative industrial arms.",
      "Fabricant de bras industriels collaboratifs.",
    ),
    website: "https://www.universal-robots.com",
    evidence: evidence(sources.ur),
  },
  {
    slug: "boston-dynamics",
    name: "Boston Dynamics",
    summary: bi(
      "Manufacturer of the Spot mobile inspection platform.",
      "Fabricant de la plateforme mobile d’inspection Spot.",
    ),
    website: "https://bostondynamics.com",
    evidence: evidence(sources.spot),
  },
];
type Seed = Pick<
  Product,
  | "slug"
  | "name"
  | "manufacturer"
  | "category"
  | "subcategory"
  | "summary"
  | "intendedUse"
  | "benefits"
  | "applications"
  | "industries"
  | "facts"
> & { source: string; options?: Product["inquiryOptions"] };
function seed(p: Seed): Product {
  const { source, options, ...base } = p;
  return {
    ...base,
    inquiryOptions: options || ["purchase", "pilot"],
    availability: { status: "not-confirmed" },
    media: [],
    relatedSolutions: [
      p.category === "humanoid"
        ? "humanoid-robots"
        : `commercial-robots/${p.category}`,
      "solutions",
    ],
    seo: { title: p.name, description: p.summary },
    flags: { featured: p.category === "humanoid", inquiries: true },
    publication: "editorial",
    evidence: evidence(source),
  };
}
export const products: Product[] = [
  seed({
    slug: "unitree-g1",
    name: bi("Unitree G1", "Unitree G1"),
    manufacturer: "unitree",
    category: "humanoid",
    subcategory: bi("Humanoid platform", "Plateforme humanoïde"),
    summary: bi(
      "A compact humanoid platform to evaluate for supervised demonstrations and research-oriented discussions.",
      "Une plateforme humanoïde compacte à évaluer pour des démonstrations supervisées et des projets de recherche.",
    ),
    intendedUse: bi(
      "Define the exact edition first. Development access differs between G1 and G1 EDU; assess software needs and supervision before planning a pilot.",
      "Précisez d’abord l’édition. L’accès au développement diffère entre G1 et G1 EDU; évaluez les besoins logiciels et la supervision avant un projet pilote.",
    ),
    benefits: [
      bi(
        "Compact standing dimensions can inform lab-space planning.",
        "Les dimensions debout orientent la planification de l’espace en laboratoire.",
      ),
    ],
    applications: ["research", "demonstration"],
    industries: ["research", "events"],
    options: ["purchase", "rental", "pilot"],
    facts: [
      fact(
        bi("Standing dimensions", "Dimensions debout"),
        bi("1,320 × 450 × 200 mm", "1 320 × 450 × 200 mm"),
        sources.g1,
      ),
      fact(
        bi("G1 mass, including battery", "Masse du G1, batterie comprise"),
        bi("Approximately 35 kg", "Environ 35 kg"),
        sources.g1,
      ),
    ],
    source: sources.g1,
  }),
  seed({
    slug: "pudu-cc1",
    name: bi("PUDU CC1", "PUDU CC1"),
    manufacturer: "pudu",
    category: "cleaning",
    subcategory: bi("Commercial floor care", "Entretien commercial des sols"),
    summary: bi(
      "A commercial cleaning platform combining several floor-care modes.",
      "Une plateforme de nettoyage commercial offrant plusieurs modes d’entretien des sols.",
    ),
    intendedUse: bi(
      "Assess floor materials, consumables and docking requirements. Carpet vacuuming requires a separate assembly.",
      "Évaluez les revêtements, les consommables et la station d’accueil. L’aspiration des tapis nécessite un ensemble distinct.",
    ),
    benefits: [
      bi(
        "Multiple cleaning modes provide a basis for comparing daily floor-care tasks.",
        "Plusieurs modes permettent de comparer les tâches quotidiennes d’entretien.",
      ),
    ],
    applications: ["floorcare"],
    industries: ["facilities", "hospitality", "retail", "manufacturing"],
    facts: [
      fact(
        bi("Cleaning modes", "Modes de nettoyage"),
        bi(
          "Sweeping, mopping, scrubbing and vacuuming",
          "Balayage, lavage, récurage et aspiration",
        ),
        sources.cc1,
      ),
      fact(
        bi("Water tanks", "Réservoirs d’eau"),
        bi("15 L clean / 15 L waste", "15 L propre / 15 L usée"),
        sources.cc1,
      ),
    ],
    source: sources.cc1,
  }),
  seed({
    slug: "mir250",
    name: bi("MiR250", "MiR250"),
    manufacturer: "mir",
    category: "logistics",
    subcategory: bi("Autonomous mobile robot", "Robot mobile autonome"),
    summary: bi(
      "An autonomous mobile base for evaluating internal material transport.",
      "Une base mobile autonome pour évaluer le transport interne de matières.",
    ),
    intendedUse: bi(
      "Specify the top module, load centre, route and transfer interfaces. The mobile base is one part of the complete material-handling system.",
      "Précisez le module supérieur, le centre de charge, le trajet et les interfaces de transfert. La base mobile est un élément du système de manutention.",
    ),
    benefits: [
      bi(
        "A compact base can help frame aisle and doorway assessments.",
        "Une base compacte aide à évaluer les allées et les portes.",
      ),
    ],
    applications: ["transport"],
    industries: ["manufacturing", "warehousing", "logistics"],
    facts: [
      fact(
        bi("Maximum payload", "Charge utile maximale"),
        bi("250 kg", "250 kg"),
        sources.mir,
      ),
      fact(
        bi("Base footprint", "Empreinte de la base"),
        bi("580 × 800 mm", "580 × 800 mm"),
        sources.mir,
      ),
    ],
    source: sources.mir,
  }),
  seed({
    slug: "ur5e",
    name: bi("UR5e", "UR5e"),
    manufacturer: "universal-robots",
    category: "industrial",
    subcategory: bi("Collaborative arm", "Bras collaboratif"),
    summary: bi(
      "A six-joint industrial arm for evaluating a defined manipulation process.",
      "Un bras industriel à six articulations pour évaluer un procédé de manipulation défini.",
    ),
    intendedUse: bi(
      "Assess tooling, payload centre of gravity, guarding and the full application risk assessment. A collaborative arm does not make every application collaborative.",
      "Évaluez l’outillage, le centre de gravité, les protections et les risques de l’application. Un bras collaboratif ne rend pas toute application collaborative.",
    ),
    benefits: [
      bi(
        "Published reach and payload help establish initial tooling constraints.",
        "La portée et la charge publiées aident à définir les contraintes d’outillage.",
      ),
    ],
    applications: ["handling"],
    industries: ["manufacturing", "research"],
    facts: [
      fact(
        bi("Maximum payload", "Charge utile maximale"),
        bi("5 kg at the mechanical interface", "5 kg à l’interface mécanique"),
        sources.ur,
      ),
      fact(bi("Reach", "Portée"), bi("850 mm", "850 mm"), sources.ur),
    ],
    source: sources.ur,
  }),
  seed({
    slug: "spot",
    name: bi("Spot", "Spot"),
    manufacturer: "boston-dynamics",
    category: "inspection",
    subcategory: bi("Mobile inspection", "Inspection mobile"),
    summary: bi(
      "A mobile platform presented by its manufacturer for industrial inspection and sensing.",
      "Une plateforme mobile présentée par le fabricant pour l’inspection industrielle et la collecte de données.",
    ),
    intendedUse: bi(
      "Specify the inspection evidence, route and payload. Confirm sensor suitability and data governance; no surveillance or regulated capability is assumed.",
      "Précisez les données d’inspection, le parcours et la charge embarquée. Confirmez les capteurs et la gouvernance des données; aucune capacité réglementée ou de surveillance n’est présumée.",
    ),
    benefits: [
      bi(
        "A mobile sensing approach can inform repeatable inspection planning.",
        "Une approche de collecte mobile aide à planifier des inspections répétables.",
      ),
    ],
    applications: ["inspection", "research"],
    industries: ["manufacturing", "facilities", "research"],
    facts: [
      fact(
        bi(
          "Manufacturer-stated focus",
          "Orientation indiquée par le fabricant",
        ),
        bi(
          "Industrial inspection and dynamic sensing",
          "Inspection industrielle et collecte mobile de données",
        ),
        sources.spot,
      ),
    ],
    source: sources.spot,
  }),
  seed({
    slug: "bellabot",
    name: bi("BellaBot", "BellaBot"),
    manufacturer: "pudu",
    category: "service",
    subcategory: bi("Indoor delivery", "Livraison intérieure"),
    summary: bi(
      "A tray-based delivery robot for evaluating indoor service workflows.",
      "Un robot de livraison à plateaux pour évaluer les parcours de service intérieurs.",
    ),
    intendedUse: bi(
      "Review aisle clearance, tray loading, guest interaction and staff responsibilities. Confirm the operating route and loading limits in the selected configuration.",
      "Examinez les dégagements, le chargement, les interactions et les responsabilités du personnel. Confirmez le trajet et les limites de la configuration retenue.",
    ),
    benefits: [
      bi(
        "Separate trays provide a starting point for mapping delivery rounds.",
        "Les plateaux distincts permettent de planifier les tournées de livraison.",
      ),
    ],
    applications: ["guest", "transport", "demonstration"],
    industries: ["hospitality", "retail", "events"],
    options: ["purchase", "rental", "pilot"],
    facts: [
      fact(
        bi("Maximum total load", "Charge totale maximale"),
        bi(
          "40 kg; maximum 10 kg per tray",
          "40 kg; maximum de 10 kg par plateau",
        ),
        sources.bella,
      ),
      fact(
        bi("Robot mass", "Masse du robot"),
        bi("55 kg", "55 kg"),
        sources.bella,
      ),
    ],
    source: sources.bella,
  }),
];
export function validateCatalog(
  items: unknown[],
  makers: unknown[] = manufacturers,
): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const media = new Set<string>();
  const makerIds = new Set<string>();
  for (const value of makers) {
    const m = manufacturerSchema.safeParse(value);
    if (!m.success) {
      errors.push("Invalid manufacturer");
      continue;
    }
    if (makerIds.has(m.data.slug))
      errors.push(`Duplicate manufacturer: ${m.data.slug}`);
    makerIds.add(m.data.slug);
  }
  for (const value of items) {
    const result = productSchema.safeParse(value);
    if (!result.success) {
      errors.push(
        `Invalid product: ${result.error.issues.map((i) => i.path.join(".")).join(", ")}`,
      );
      continue;
    }
    const p = result.data;
    if (ids.has(p.slug)) errors.push(`Duplicate product: ${p.slug}`);
    ids.add(p.slug);
    if (!makerIds.has(p.manufacturer))
      errors.push(`Unknown manufacturer: ${p.slug}`);
    if (
      p.publication !== "draft" &&
      (!p.evidence.approvedForPublication ||
        p.facts.some((f) => !f.evidence.approvedForPublication))
    )
      errors.push(`Unverified publication: ${p.slug}`);
    if (
      p.publication === "editorial" &&
      p.availability.status !== "not-confirmed"
    )
      errors.push(`Editorial availability claim: ${p.slug}`);
    if (
      p.availability.status === "verified" &&
      !p.availability.evidence.approvedForPublication
    )
      errors.push(`Unverified availability: ${p.slug}`);
    for (const m of p.media) {
      if (media.has(m.src) || media.has(m.placement))
        errors.push(`Reused media: ${p.slug}`);
      media.add(m.src);
      media.add(m.placement);
    }
  }
  return errors;
}
export const publishableManufacturers = () =>
  manufacturers.filter(
    (m) =>
      manufacturerSchema.safeParse(m).success &&
      m.evidence.approvedForPublication,
  );
export const publishableProducts = () =>
  products.filter(
    (p) =>
      p.publication !== "draft" &&
      validateCatalog([p]).length === 0 &&
      publishableManufacturers().some((m) => m.slug === p.manufacturer),
  );
export function canTransact(_product: Product) {
  void _product;
  return false;
} // Phase 1B is inquiry-only, including verified entries.
export type CatalogFilters = {
  query?: string;
  type?: string;
  application?: string;
  industry?: string;
  intent?: string;
  sort?: string;
};
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function filterProducts(
  items: Product[],
  filters: CatalogFilters,
  locale: Locale,
) {
  const q = normalize((filters.query || "").trim());
  return items
    .filter(
      (p) =>
        p.publication !== "draft" &&
        validateCatalog([p]).length === 0 &&
        (!q ||
          normalize(
            `${p.name[locale]} ${p.summary[locale]} ${p.manufacturer} ${taxonomy.types[p.category][locale]} ${p.applications.map((a) => taxonomy.applications[a][locale]).join(" ")}`,
          ).includes(q)) &&
        (!filters.type || p.category === filters.type) &&
        (!filters.application ||
          p.applications.some((a) => a === filters.application)) &&
        (!filters.industry ||
          p.industries.some((i) => i === filters.industry)) &&
        (!filters.intent || p.inquiryOptions.some((i) => i === filters.intent)),
    )
    .sort((a, b) =>
      filters.sort === "name-desc"
        ? b.name[locale].localeCompare(a.name[locale], locale)
        : filters.sort === "name-asc"
          ? a.name[locale].localeCompare(b.name[locale], locale)
          : Number(b.flags.featured) - Number(a.flags.featured) ||
            a.name[locale].localeCompare(b.name[locale], locale),
    );
}
export function quoteHref(locale: Locale, intent: string, product?: Product) {
  const params = new URLSearchParams({ intent });
  if (product) {
    params.set("product", product.slug);
    params.set("category", product.category);
  }
  return `/${locale}/request-quote?${params}`;
}

const catalogErrors=validateCatalog(products);
if(catalogErrors.length) throw new Error(`Catalogue validation failed: ${catalogErrors.join("; ")}`);
