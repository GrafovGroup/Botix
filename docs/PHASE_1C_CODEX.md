# BOTIX.ca — Phase 1C Codex Master Prompt
## Commercial launch readiness, conversion and operational handoff

You are Codex implementing Phase 1C in the existing GrafovGroup/Botix repository. First inspect all branches, Phase 1A/1B work, docs/PHASE_GOVERNANCE.md, docs/PHASE_1A_CODEX.md, docs/PHASE_1B_CODEX.md, docs/BRAND.md, IMPLEMENTATION_STATUS.md and OWNER_ACTIONS.md. Phase 1B implementation is currently on codex/phase-1b; do not assume it has been merged. Preserve code, never force-push or overwrite concurrent work. Create a dedicated codex/phase-1c branch from the completed 1B implementation once stable. Open a PR; no merge or deployment without approval.

# Objective
Make BOTIX.ca commercially launch-ready, prioritizing real B2B inquiry conversion and trust. Humanoid robotics remains the flagship, supported by cleaning, logistics, industrial, inspection, hospitality and rental categories. Premium Signature brand: black/white/silver, distinctive X and wordmark, humanoid imagery as supporting media. Canadian nationwide bilingual English and Québec French from day one.

# Workstreams
1. **Visual QA and branding.** Audit mobile/tablet/desktop pages in a real browser where available. Inspect navigation, sticky header, product filters, inquiry paths, focus states, forms, translation parity, image cropping, CLS, contrast and reduced motion. Record screenshot evidence or honestly document unavailable browser tooling. Approved Signature logo vector files are not currently in repository: prepare robust brand asset slots and fallback typography; never invent an 'approved' final vector or trace artwork inaccurately. Record exact owner deliverables for logo integration.
2. **Lead conversion.** Review CTA hierarchy and routes across humanoid/product/category/rental/industry/location pages. Optimize contextual quote intent, preserving product, locale, rental dates and use case. Implement helpful error states, loading and confirmation only after durable submission. Track consent-gated events without sending personal data. Add unit tests for context preservation.
3. **Inquiry delivery readiness.** Inspect existing HTTPS webhook adapter, origin checks, Zod validation, signed timing challenge, honeypot and idempotency. Provide provider-neutral secure configuration and local mock/test harness. Production must require owner-controlled endpoint, secrets, verified receiving workflow, data-retention policy and shared edge rate limiting. Do not add credentials or send real leads without owner approval. Never claim the form is live while delivery is unconfigured.
4. **Supplier and catalogue operations.** Create a maintainable editorial workflow for product verification, source links, review dates, image licensing, availability status, quote eligibility and manufacturer relationship status. Build admin-friendly schema or CSV import validation if appropriate, without adding a risky public admin panel. All unverified or draft products remain unpublished. Do not fabricate pricing, stock, Canadian support, dealerships or deployment outcomes.
5. **Commercial trust and legal.** Improve About, How It Works, sourcing process, rentals/pilots safety expectations, FAQ and contact pathways without inventing offices, customers, certifications or service levels. Review privacy/terms for Canadian audience and mark legal review needed. Trademark clearance for BOTIX remains owner/legal task.
6. **SEO and performance.** Audit canonical/hreflang, bilingual metadata, structured data, robots, sitemap, internal linking, page uniqueness and national location relevance. Prioritize genuine local usefulness; avoid duplicate doorway pages. Optimize images, fonts, LCP/CLS and accessible mobile experience; report measured metrics only if tools actually run.
7. **Launch runbook.** Add docs/LAUNCH_CHECKLIST.md including domain/DNS, hosting, environment secrets, webhook receiver, email/CRM routing, phone ownership, logo signoff, image licensing, privacy, analytics consent, legal review, backups, monitoring, form end-to-end test and rollback plan. Never deploy or change DNS without explicit owner authorization.

# Acceptance criteria
- Phase 1A/1B code preserved and Phase 1C delivered as reviewable branch/PR.
- No placeholder telephone number presented as confirmed; make fallback safe until owner verifies number.
- All main conversion paths usable in English and French; contextual forms tested.
- Automated lint, typecheck, build and tests pass, or blockers clearly recorded.
- Visual QA documented with screenshots if available; otherwise explicitly pending.
- Source-of-truth docs updated: IMPLEMENTATION_STATUS.md, OWNER_ACTIONS.md, docs/PHASE_INDEX.md, CHANGELOG.md.
- No fabricated commercial claims, pricing, supplier relationships, stock, testimonials or product specifications.
- No merge, production deployment, DNS changes, purchases or live lead transmission without owner authorization.

# Execution
Inspect -> create checklist -> branch from 1B -> implement incrementally -> run tests and route smoke checks -> document results -> open PR -> report branch, commits, PR, owner blockers and launch status. Work autonomously except genuinely owner-dependent approvals. Store all phase work in GitHub, not only chat.
