# Phase 1B execution checklist

Canonical scope: `docs/PHASE_1B_CODEX.md`; governance: `docs/PHASE_GOVERNANCE.md`.
Prerequisite: completed Phase 1A commit `be26bbf`. Branch `codex/phase-1b` includes GitHub specification commits through `4130483`. Phase 1A remains intact.

## Assumptions

- Six manufacturer-sourced editorial examples can make browsing useful without claiming a BOTIX fleet, stock or dealership. Every fact carries an HTTPS source and review date. Inquiry CTAs request feasibility, not a purchase contract.
- No licensed manufacturer media is supplied. Product layouts support rights-validated galleries; seeded products use a typographic presentation without copied images or fabricated depictions.
- New city guides must add distinct operational guidance and connect to province guides. Nearby municipalities are grouped by metro area rather than emitted as thin duplicate pages.
- Reuse the existing delivery adapter and anti-spam controls; credentials remain owner-managed.
- No merge, deployment, DNS modification or paid services.

## Deliverables

- [x] Validated typed catalogue, manufacturers, applications, industries, publication and claim gates.
- [x] Bilingual browse/search, combined filters, sorting, reset and empty states.
- [x] Six commercial/flagship hubs and verified editorial product details with related options, FAQs and inquiry CTAs.
- [x] Shared purchase, rental, pilot/integration and general quote workflows with contextual product, use case and dates.
- [x] Five rental journeys and eight industry paths.
- [x] Distinct national city/metro guides, internal links, sitemap, metadata and hreflang.
- [x] Validation/filter/form tests; lint, typecheck, build and route/API smoke checks.
- [x] Documentation, owner dependencies, phase index, commits, pushed feature branch and review PR.

## Acceptance / verification

18 unit tests and all automated checks passed; 144 content routes passed HTTP verification. Browser security policy blocked the preview, so visual and interaction acceptance remains outstanding. Live delivery requires owner credentials.

Record actual results in `IMPLEMENTATION_STATUS.md`. Browser checks depend on available browser infrastructure; report limits precisely. External delivery remains unconfigured unless owner credentials are supplied.
