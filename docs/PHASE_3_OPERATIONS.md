# Phase 3 commercial operations

## Private lead handling

Use the receiver receipt as a private record key. Store records only in an access-controlled operational system, never GitHub, public analytics, URL query parameters or an unrestricted spreadsheet. Keep contact data in the original restricted record; a tracker references that record rather than duplicating it.

Tracker fields: receipt key, received time, locale, category, intent, internal queue, assigned operator, stage, next-action date, response timestamp, source classification, qualification reason, retention review date, consent withdrawal flag. Sources start `unknown` unless evidenced; do not infer campaign attribution from personal data. Stages: new, assigned, awaiting-details, qualified, supplier-review, proposal, closed, do-not-contact. An operator—not a score—qualifies the project after reviewing task, site, timing, feasibility and evidence. Consent withdrawal overrides all follow-up. Do not add inquiry contacts to marketing lists.

`classifyLead` prepares queues for rentals/events, humanoid/research, facility cleaning, integration and general intake. Every new record is unassigned and unreviewed. Internal goal: initial human review within eight business hours during staffed coverage. This is not a public response guarantee. Assign a named responsible operator before activation; escalate overdue unassigned inquiries to that operator. Review unresolved transport outcomes before touching locks or re-sending.

## Qualified response playbooks

| Path | Confirm | Next decision |
|---|---|---|
| Humanoid sourcing | Exact edition, software access, supervision, task, safety perimeter, import/support responsibility | Manufacturer documentation and feasibility assessment |
| Rentals/events | Dates, venue access, audience, operator, power, transport, insurance responsibilities | Document platform availability before offering dates |
| Cleaning | Floor materials, transitions, area, traffic, water/charging, cleaning schedule | Site survey and measurable pilot criteria |
| Warehouse/industrial | Payload, pickup/drop-off, interfaces, traffic, guarding, qualified safety review | Integration owner and acceptance plan |
| Research/demo | Institution, research question, controls/API, supervision, data handling | Edition/access confirmation and test boundary |

## Bilingual response drafts — not sent

Initial EN: “Thank you for outlining your [task] project in [location]. To assess a practical next step, could you confirm [two relevant missing details]? We will review the operating requirements and sourcing or pilot feasibility before proposing an option. This does not reserve equipment or confirm availability.”

Initial FR: « Merci d’avoir présenté votre projet de [tâche] à [lieu]. Pour évaluer la prochaine étape, pourriez-vous préciser [deux éléments pertinents]? Nous examinerons les conditions d’utilisation et la faisabilité de l’approvisionnement ou d’un projet pilote avant de proposer une option. Cette démarche ne réserve pas d’équipement et ne confirme pas sa disponibilité. »

Follow-up EN: “Following up on your [task] inquiry: is the project still active, and have the site or timing requirements changed? If you prefer no further follow-up, please let us know.”

Follow-up FR: « Nous faisons un suivi concernant votre demande de [tâche]. Le projet est-il toujours actif? Les exigences du site ou l’échéancier ont-ils changé? Si vous préférez ne plus recevoir de suivi, veuillez nous le signaler. »

Qualification EN: “Based on the requirements shared, the next step is [documented assessment]. We still need to confirm [specific technical/commercial constraint] before discussing supply, pricing or scheduling.”

Qualification FR: « Selon les exigences communiquées, la prochaine étape est [évaluation documentée]. Nous devons encore confirmer [contrainte technique ou commerciale précise] avant de discuter de l’approvisionnement, du prix ou de l’échéancier. »

After one unanswered follow-up, place the opportunity on hold unless the person requested a later date; do not create automated sequences. All drafts require an authorized operator, actual project facts and consent review.

## Supplier verification

Use the evidence schema and bilingual outreach drafts in PHASE_2_OPERATIONS.md. Priority: humanoid editions/software/support, cleaning site feasibility, AMR/cobot integration responsibility, event operator/rental terms. Before contact, verify official source and actual contact route; before publication, obtain written rights and evidence for any dealership, stock, price, availability or media statement. Record source/date, Canadian scope, compliance/import responsibility, warranty, training, parts, software/data policies and review owner. No outreach is sent and no supplier relationship is inferred by this phase.

## Privacy-safe dashboard specification

- Visits: only after explicit optional analytics consent; no unique persistent identifier or fingerprint. Keep unknown/declined visits out of analytics, so observed totals represent consented activity only.
- Inquiry starts: consented form interaction event; accepted inquiries: durable receiver count, separate from local-MTA submission and confirmed inbox delivery.
- Source: allowlisted channel (direct, organic, referral, campaign, unknown); never raw referrer, full URL or search/query strings.
- Category/locale: fixed enums only. Qualified rate: operator-qualified / accepted over the same defined cohort, exclude duplicates. Response time: accepted-to-first-human-response during agreed staffed hours, not automated email time.
- Operational counts: queue size, oldest unassigned age, ambiguous-send count, failure count, review coverage. `queueSummary` produces aggregate queue/language/age counts without contact fields or receipt IDs.
- Existing browser events remain local consent-gated custom events. No analytics vendor, collector, cookie or external transmission is added. Dashboard is an implementation specification, not invented measurements.
- Suppress small external reporting cohorts; keep operational record access restricted. Owner approves retention, recipients and deletion procedure before activation.

Search Console setup and 90-day editorial work remain documented in PHASE_2_OPERATIONS.md. No rankings, traffic, lead conversion or indexing counts are claimed without access and actual observations.
