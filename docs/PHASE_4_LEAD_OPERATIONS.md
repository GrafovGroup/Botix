# Phase 4 lead qualification and response kit

Internal recommendations. No live inquiry acceptance, response SLA or revenue is claimed. Target mailbox remains info@botix.ca; Phase 3 requires secure receipt verification and separate activation. Do not duplicate private inquiry payloads into GitHub or public tools.

## Qualification and discovery

Capture business sector, application, intended category, quantity, city/province, timeline, optional budget, site constraints, technical contact and buying stage. Ask the requester to choose exploration, feasibility, pilot, procurement or expansion; do not infer purchasing authority or budget. Existing forms capture the main task/context fields; the assigned operator records buying stage during discovery.

Discovery EN: What happens today? What task should change? Which exceptions are common? Who operates the site and owns technical decisions? What would a useful trial demonstrate? What dates or access constraints matter? Is the budget range known or still being developed? Who must approve the next step?

Découverte FR : Comment le travail se déroule-t-il aujourd’hui? Quelle tâche devrait changer? Quelles exceptions reviennent souvent? Qui exploite le site et prend les décisions techniques? Que devrait démontrer un essai utile? Quelles dates ou contraintes d’accès comptent? Le budget est-il connu ou en préparation? Qui doit approuver la prochaine étape?

Review rubric: score each of task clarity, site information, technical ownership, decision timeline and evidence readiness from 0 (unknown), 1 (partly documented), or 2 (documented). The 0–10 total prioritizes a human review only; it does not determine commercial feasibility, supplier availability or automatic qualification. Lack of an optional budget is not a disqualifier. Consent withdrawal/do-not-contact blocks follow-up regardless of score. Unresolved safety, rights or support questions require a hold for the responsible reviewer.

An operator may mark qualified only after documenting the actual task, location, decision owner, feasible next assessment and unresolved constraints. Record the reason, reviewer and date. The internal initial-review goal is eight business hours during agreed staffing, not a customer guarantee. Unassigned or overdue records require operator attention; no automated marketing sequence.

## Private CRM schema

| Field | Type / handling |
| --- | --- |
| receipt_key | Private opaque receiver key; unique and deduplicated |
| received_at / first_human_response_at | UTC timestamps; response cannot precede receipt; null when unknown |
| locale / category / intent | Existing fixed enums |
| source | direct, organic, referral, approved-campaign, unknown; no raw URL |
| assigned_operator | Authorized operator ID; null until assigned |
| stage | new, assigned, awaiting-details, qualified, supplier-review, proposal, closed, do-not-contact |
| buying_stage | exploration, feasibility, pilot, procurement, expansion, unknown |
| qualification_scores / reason | Five 0–2 values plus restricted human review rationale |
| next_action_at / retention_review_at | Explicit dates under approved operational/retention policy |
| consent_withdrawn | Boolean; overrides follow-up |
| outcome | undecided, won, lost, no-fit, withdrawn; evidence required for decided outcomes |
| private_record_reference | Restricted original record location; do not duplicate contact data |

CSV export is optional and private: preserve this schema, escape spreadsheet formula prefixes in any operator-authored text, restrict access, encrypt transfers and apply the approved deletion policy. Never place exports in public/, artifacts uploaded to public CI, URLs or analytics. No CRM subscription is purchased or external sync enabled.

## Proposal/quote response template — not an issued quotation

EN: “Project: [confirmed task and site]. Proposed next step: [assessment/pilot/sourcing review]. Included scope: [documented items]. Exclusions and dependencies: [specific items]. Technical and safety responsibilities: [named parties]. Availability and timing: [verified evidence or items to confirm]. Commercial terms and currency: [approved actual quotation only]. Acceptance criteria: [agreed measures]. Next decision: [responsible person and date].”

FR : « Projet : [tâche et site confirmés]. Prochaine étape proposée : [évaluation/essai/examen d’approvisionnement]. Périmètre inclus : [éléments documentés]. Exclusions et dépendances : [éléments précis]. Responsabilités techniques et de sécurité : [parties identifiées]. Disponibilité et échéancier : [preuves vérifiées ou éléments à confirmer]. Conditions commerciales et devise : [soumission réelle approuvée uniquement]. Critères d’acceptation : [mesures convenues]. Prochaine décision : [responsable et date]. »

Use the Phase 3 category playbooks and bilingual initial/follow-up replies. Populate every issued response with real project facts. Drafts do not reserve equipment, promise a supplier relationship or establish legal/commercial terms. No message is sent without authorized operator action.
