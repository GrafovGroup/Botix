# BOTIX.ca — Phase 1D Codex Master Prompt
## Production launch readiness, final QA and controlled release

You are Codex working in GrafovGroup/Botix. Execute autonomously as far as possible, but **do not merge, deploy, change DNS, purchase services, enable live lead delivery, or assert legal/trademark clearance without explicit owner authorization**.

## Preconditions and branch safety
Inspect main, codex/phase-1b, codex/phase-1c, their PRs and current history. Phase 1C is a stacked branch on Phase 1B; do not assume either is merged. Read docs/PHASE_GOVERNANCE.md, docs/PHASE_1A_CODEX.md, docs/PHASE_1B_CODEX.md, docs/PHASE_1C_CODEX.md, IMPLEMENTATION_STATUS.md, OWNER_ACTIONS.md, docs/LAUNCH_CHECKLIST.md, docs/BRAND_ASSETS.md, docs/PHASE_1C_QA.md and docs/INQUIRY_DELIVERY.md where present. Create a dedicated codex/phase-1d branch from completed Phase 1C. Never force-push or overwrite concurrent work. Produce reviewable PR and explicit dependencies; do not silently merge stacked branches.

## Business and design
BOTIX — Commercial Robotics. Premium Signature brand: black, white and silver; standalone wordmark and X icon, humanoid imagery supporting the brand. Humanoids are flagship; catalogue spans commercial cleaning, warehouse/logistics, industrial, inspection and rentals. Canadian B2B nationwide; bilingual English and Québec-appropriate French. Preserve factual sourcing gates and do not fabricate dealer status, stock, prices, partnerships, offices, customers or service guarantees.

## Workstream A — Real-browser final QA
If browser tooling is available, test at 375, 768, 1024 and 1440 px in both locales. Capture screenshots for home, humanoid catalogue, filtered catalogue, product detail, rental, industry, city/region and quote forms. Verify mobile nav, search/filter, language switch and context, dates, focus order, skip links, keyboard-only operation, touch targets, contrast, reduced motion, image cropping and form error/disabled states. Run accessibility and Core Web Vitals audits with recorded environment and measured results. If browser tooling is unavailable, do not invent screenshots or metrics: prepare a reproducible manual QA script and mark pending owner verification.

## Workstream B — Brand asset acceptance
Check public/brand for approved BOTIX Signature SVG/PNG assets. If absent, keep the current typographic fallback and prepare integration slots and a precise checklist; do not fabricate a vector master or claim the AI moodboard is production artwork. Once approved files are present, integrate horizontal, monochrome and icon-only variants and verify favicon, social image, header/footer and high-DPI display. Verify media provenance and licensing before use.

## Workstream C — Inquiry production readiness
Audit secure HTTPS receiver configuration, consent, data minimization, secret handling, durable acceptance, idempotency, timeout, error retention, rate limiting at a trusted edge, spoofed forwarded-header handling, monitoring and retention. Run existing synthetic receiver tests; never send real personal data to a test endpoint. Produce a step-by-step EN/FR live end-to-end test plan that requires owner-provided credentials and explicit authorization. Keep delivery disabled until independently verified and authorized.

## Workstream D — Release engineering
Add or refine CI checks (test, lint, typecheck, build, catalogue check, smoke tests where safe), environment variable documentation, staging protections, secure headers, canonical/hreflang/sitemap/robots verification, health checks, rollback plan, dependency/security review, and deployment runbook. Never put secrets in GitHub. If deployment provider is unspecified, keep provider-neutral scripts and list owner decision. Do not connect DNS, deploy or merge automatically.

## Workstream E — Content and business verification
Review all 144 reported EN/FR routes and ensure they still build; verify 13 region and 16 city guides remain distinct and factual. Validate six editorial products and five manufacturer references for source recency, image rights, legal claims and inquiry-only presentation. Identify unverified facts and list owner approvals. Confirm phone placeholder remains hidden until number verified. Privacy, terms and BOTIX trademark clearance are owner/legal signoffs, not automated compliance claims.

## Workstream F — Handoff
Update IMPLEMENTATION_STATUS.md, OWNER_ACTIONS.md, docs/PHASE_INDEX.md, CHANGELOG.md and docs/LAUNCH_CHECKLIST.md. Create docs/PHASE_1D_QA.md, docs/RELEASE_RUNBOOK.md and docs/GO_NO_GO.md with evidence, blockers and clear pass/fail gates. Record actual test commands and results, branch/PR/commit URLs, environment, unresolved issues and whether production deployment is authorized. Add release checklist to the PR description.

## Acceptance criteria
- Phase 1A–1C code and specifications preserved.
- All automated checks pass or precise blockers documented.
- Real-browser verification performed if tools permit; otherwise honestly outstanding.
- Approved brand files integrated only if supplied and confirmed.
- No unverified phone, product availability, partnership, testimonial, office or compliance claims.
- Lead delivery remains safely disabled until owner config, verified receiver and edge protections.
- Production go/no-go report explicitly lists missing approvals and does not imply deployment.
- No merge, deployment, DNS modification, live lead delivery or purchase without authorization.

## Execution sequence
Inspect -> create 1D branch from 1C -> implement non-destructively -> test -> update documentation -> open PR -> report owner-dependent items. Do not stop for routine decisions. All phase instructions and code belong in GitHub.
