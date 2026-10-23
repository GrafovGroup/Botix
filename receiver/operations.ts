import type { Inquiry } from "../src/lib/inquiry";

/** Internal queue labels and goals, never advertised promises or auto qualification. */
export function classifyLead(
  p: Pick<Inquiry, "intent" | "category" | "locale" | "timeline">,
) {
  const queue =
    p.intent === "rental"
      ? "rentals-events"
      : p.intent === "integration"
        ? "integration"
        : p.category === "humanoid"
          ? "humanoid-research"
          : p.category === "cleaning"
            ? "facility-cleaning"
            : ["logistics", "industrial", "inspection"].includes(p.category)
              ? "integration"
              : "commercial-intake";
  return {
    queue,
    language: p.locale,
    priority:
      p.timeline === "soon" ? "time-sensitive-review" : "standard-review",
    owner: "unassigned",
    qualification: "unreviewed",
    responseGoalBusinessHours: 8,
  } as const;
}
export const leadStages = [
  "new",
  "assigned",
  "awaiting-details",
  "qualified",
  "supplier-review",
  "proposal",
  "closed",
  "do-not-contact",
] as const;
export type LeadStage = (typeof leadStages)[number];
export function mayFollowUp(stage: LeadStage, consent: boolean) {
  return consent && !["closed", "do-not-contact"].includes(stage);
}
