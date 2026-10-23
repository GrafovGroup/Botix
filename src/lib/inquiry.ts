import { z } from "zod";
import { publishableProducts } from "./catalog";
export const intents = [
  "purchase",
  "rental",
  "pilot",
  "integration",
  "service",
  "general",
] as const;
export const categoryValues = [
  "humanoid",
  "cleaning",
  "logistics",
  "industrial",
  "inspection",
  "service",
  "unsure",
] as const;
export const provinceValues = [
  "AB",
  "BC",
  "MB",
  "NB",
  "NL",
  "NS",
  "NT",
  "NU",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
] as const;
const text = (min: number, max: number) => z.string().trim().min(min).max(max);
const dateField = z
  .string()
  .refine(
    (value) =>
      value === "" ||
      (/^\d{4}-\d{2}-\d{2}$/.test(value) &&
        Number.isFinite(Date.parse(value)) &&
        new Date(value).toISOString().slice(0, 10) === value),
    "Invalid date",
  )
  .optional()
  .default("");
export const inquirySchema = z
  .object({
    locale: z.enum(["en", "fr"]),
    intent: z.enum(intents),
    category: z.enum(categoryValues),
    product: z.string().max(100).optional().default(""),
    useCase: text(10, 600),
    startDate: dateField,
    endDate: dateField,
    company: text(2, 160),
    name: text(2, 120),
    email: z.email().max(254),
    phone: text(7, 40).regex(/^[+\d\s().x-]+$/),
    city: text(2, 120),
    province: z.enum(provinceValues),
    timeline: z.enum(["soon", "1-3", "3-6", "exploring"]),
    quantity: z.coerce.number().int().min(1).max(10000),
    budget: z.string().trim().max(100).optional().default(""),
    details: text(20, 4000),
    consent: z.literal(true),
    website: z.string().max(0),
    token: z.string().min(20).max(500),
  })
  .superRefine((data, ctx) => {
    const issue = (field: string) =>
      ctx.addIssue({
        code: "custom",
        path: [field],
        message: "Invalid project context",
      });
    if (data.product) {
      const product = publishableProducts().find(
        (p) => p.slug === data.product,
      );
      if (!product || !product.flags.inquiries) issue("product");
      else {
        if (product.category !== data.category) issue("category");
        const mode = data.intent === "integration" ? "pilot" : data.intent;
        if (!product.inquiryOptions.some((i) => i === mode)) issue("intent");
      }
    }
    if (data.intent === "rental" && (!data.startDate || !data.endDate)) {
      if (!data.startDate) issue("startDate");
      if (!data.endDate) issue("endDate");
    }
    if (Boolean(data.startDate) !== Boolean(data.endDate))
      issue(data.startDate ? "endDate" : "startDate");
    if (data.startDate && data.endDate && data.endDate < data.startDate)
      issue("endDate");
  });
export type Inquiry = z.infer<typeof inquirySchema>;
export const formText = {
  en: {
    intent: "I’m interested in",
    product: "Model of interest (optional)",
    useCase: "Use case / task (at least 10 characters)",
    startDate: "Desired start date",
    endDate: "Desired end date",
    datesNote:
      "Dates are required for rentals; otherwise optional. Dates do not confirm a booking.",
    category: "Robot category",
    company: "Company",
    name: "Full name",
    email: "Business email",
    phone: "Phone",
    city: "City",
    province: "Province / territory",
    timeline: "Timeline",
    quantity: "Estimated quantity",
    budget: "Budget (optional, CAD)",
    details: "Tell us about the task and operating environment",
    consent:
      "I agree that BOTIX may use these details to respond to my inquiry, as described in the privacy notice.",
    submissionUnavailable:
      "Online submission is unavailable. You can prepare and save your brief below.",
    checkAgain: "Check again",
    saveBrief: "Save my brief",
    analyticsConsent:
      "Optional: share anonymous form interaction events to help improve this form. No field values are included. Uncheck to stop sharing.",
    retryToken:
      "The security check has been refreshed. Your entries are still here; please submit again.",
    rate: "Too many attempts. Wait 10 minutes before trying again, or save your brief.",
    javascript: "Enable JavaScript to use the inquiry form.",
    submit: "Send inquiry",
    sending: "Sending…",
    required: "All fields are required unless marked optional.",
    invalid:
      "Please review the highlighted fields. Describe the task in at least 10 characters and the project in at least 20. Rental dates must be complete and in order.",
    failed:
      "Your inquiry could not be confirmed. Your entries are still here. Please retry or save a copy of your brief.",
    unavailable:
      "We could not send your inquiry through this form. Your entries are still here. Save a copy of your brief and try again later.",
    success:
      "Your inquiry has been securely received for review. Thank you for sharing your project.",
    choose: "Select an option",
    privacy: "Read privacy notice",
    intents: [
      "Purchase / sourcing",
      "Rental / event",
      "Enterprise pilot",
      "Integration",
      "Service",
      "General project",
    ],
    categories: [
      "Humanoid",
      "Cleaning",
      "Warehouse / logistics",
      "Industrial / cobot",
      "Inspection",
      "Service / hospitality",
      "Help me choose",
    ],
    timelines: [
      "As soon as feasible",
      "1–3 months",
      "3–6 months",
      "Exploring options",
    ],
    fieldError: "Check this field.",
  },
  fr: {
    intent: "Je m’intéresse à",
    product: "Modèle envisagé (facultatif)",
    useCase: "Utilisation / tâche (au moins 10 caractères)",
    startDate: "Date de début souhaitée",
    endDate: "Date de fin souhaitée",
    datesNote:
      "Dates obligatoires pour la location; sinon facultatives. Elles ne confirment pas une réservation.",
    category: "Catégorie de robot",
    company: "Entreprise",
    name: "Nom complet",
    email: "Courriel professionnel",
    phone: "Téléphone",
    city: "Ville",
    province: "Province / territoire",
    timeline: "Échéancier",
    quantity: "Quantité estimée",
    budget: "Budget (facultatif, CAD)",
    details: "Décrivez la tâche et l’environnement de travail",
    consent:
      "J’accepte que BOTIX utilise ces renseignements pour répondre à ma demande, conformément à l’avis de confidentialité.",
    submissionUnavailable:
      "La transmission en ligne est indisponible. Vous pouvez préparer et enregistrer votre projet ci-dessous.",
    checkAgain: "Vérifier de nouveau",
    saveBrief: "Enregistrer mon projet",
    analyticsConsent:
      "Facultatif : partager des événements d’interaction anonymes pour améliorer le formulaire. Aucune valeur saisie n’est incluse. Décochez pour arrêter le partage.",
    retryToken:
      "La vérification de sécurité a été renouvelée. Vos renseignements sont conservés; envoyez de nouveau la demande.",
    rate: "Trop de tentatives. Attendez 10 minutes avant de réessayer, ou enregistrez votre projet.",
    javascript: "Activez JavaScript pour utiliser le formulaire de demande.",
    submit: "Envoyer la demande",
    sending: "Envoi en cours…",
    required: "Tous les champs sont obligatoires, sauf indication contraire.",
    invalid:
      "Vérifiez les champs indiqués. Décrivez la tâche en au moins 10 caractères et le projet en au moins 20. Les dates de location doivent être complètes et dans l’ordre.",
    failed:
      "La transmission n’a pas pu être confirmée. Vos renseignements sont conservés dans le formulaire. Réessayez ou enregistrez une copie de votre projet.",
    unavailable:
      "Nous n’avons pas pu transmettre votre demande par ce formulaire. Vos renseignements y sont conservés. Enregistrez une copie de votre projet et réessayez plus tard.",
    success:
      "Votre demande a été reçue de façon sécurisée pour examen. Merci de nous avoir présenté votre projet.",
    choose: "Choisir une option",
    privacy: "Lire l’avis de confidentialité",
    intents: [
      "Achat / approvisionnement",
      "Location / événement",
      "Projet pilote",
      "Intégration",
      "Service",
      "Projet général",
    ],
    categories: [
      "Humanoïde",
      "Nettoyage",
      "Entrepôt / logistique",
      "Industrie / cobot",
      "Inspection",
      "Service / hôtellerie",
      "Aidez-moi à choisir",
    ],
    timelines: [
      "Dès que possible",
      "1 à 3 mois",
      "3 à 6 mois",
      "Exploration des options",
    ],
    fieldError: "Vérifiez ce champ.",
  },
};
