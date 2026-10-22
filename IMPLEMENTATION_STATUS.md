# BOTIX implementation status

## Phase 1D — 2026-10-22

Branch `codex/phase-1d` starts from completed GitHub Phase 1C `42d6e82` and incorporates the canonical Phase 1D brief `95e39c1`. PR #1 (1B) and #2 (1C) were inspected and remain open drafts/unmerged. No merge to main, deployment, DNS change, purchase or live delivery. Original local incremental history is preserved when publishing the exact tested tree through the GitHub integration.

Delivered: pinned/read-only CI, isolated production/preview HTTP harness, uncached liveness endpoint, protected preview with noindex and missing-secret denial, conservative CSP/no-referrer/opt-in HSTS, validated trusted forwarded-IP syntax, preview delivery prohibition and explicit production mode requirement. Public content/routes and existing imagery remain intact; approved logo files are absent. Added final manual QA matrix, bilingual authorized live receiver test plan, release/rollback runbook, dependency security record and production NO-GO report.

Local environment: macOS, Node **v24.19.0**, pnpm **11.25.0**, Next **16.4.2**. Tests: **31 passed**. Catalogue: six products/five manufacturers valid and dated within review policy. Synthetic receiver, ESLint, build and TypeScript passed. Production HTTP smoke passed **144 content URLs and 144 unique internal links**, canonical/hreflang, 404s, redirects, images, filter/query context, phone exclusion and seven inquiry API cases. Release harness also checks health/security headers, preview authentication/noindex, spoofed middleware header, preview delivery disabled and missing-secret fail-closed. `git diff --check` passed.

Dependency scans: production-only audit reports **zero vulnerabilities**; full audit exits 1 with **one high development-only braces advisory** (GHSA-vfj7-8cjw-p6xm), no patched release listed at review. No suppression or speculative dependency upgrade. The CI full-audit job intentionally exposes this blocker; a local pass does not claim GitHub-hosted CI passed.

Production status: **NO-GO**. Browser policy still prevents actual visual/client/a11y/Web Vitals evidence. Receiver/CRM/TLS, shared edge, provider/CDN/origin controls, approved branding, verified phone, privacy/legal/trademark and owner release authorizations remain outstanding. Preview app authentication must be backed by actual host controls; health is liveness only. See docs/GO_NO_GO.md, docs/PHASE_1D_QA.md and docs/RELEASE_RUNBOOK.md for evidence and gates.

## Phase 1C — 2026-10-22

Implemented on `codex/phase-1c` from completed GitHub Phase 1B `e1a4e02`, incorporating the canonical 1C brief from `b65aa11`. Phase 1B is still an unmerged draft PR; Phase 1C is prepared as a stacked review. Original incremental work is retained locally. No merge to main, deployment, DNS change, purchase or live lead transmission.

- Verified-only public phone configuration removes the placeholder from links and structured data by default. Localized brief downloads provide a local fallback without claiming submission.
- Quote context carries product, intent, locale, use case, province/city and rental dates. Normal workflow/language clicks on the main quote page capture current project fields; contact fields never enter navigation URLs. Modified/new-tab links preserve query-prefilled context only. Form data is not persisted in browser storage.
- Contextual humanoid/category, industry/rental and regional/city CTAs use actual journey intent. Sourcing and pilot copy explains written scope, safety responsibilities and evaluation criteria without guarantees.
- Form submission is disabled when runtime configuration is unavailable, with bilingual retry/save states. Success still requires receiver acceptance; failed attempts retain entries. Separate optional analytics consent emits only allowlisted event + locale, with no installed external provider.
- Production delivery fails closed without explicit enablement, HTTPS endpoint/site URL, independent secrets and owner receiver/shared-edge verification attestations. The local persisted synthetic receiver tests acceptance, deduplication, conflict and failure without network calls.
- Catalogue operations add supplier relationship states, future-review-date rejection, a read-only JSON/registry check (180-day review policy and media existence), and a worked editorial guide. All five relationships remain not-confirmed; six editorial products remain inquiry-only.
- Logo slots retain typography until approved assets arrive. No new images; existing asset audit limitations remain. Launch checklist covers hosting/DNS/secrets, CRM, phone, logos, rights, legal/trademark review, consent, monitoring, backups and rollback.

### Phase 1C verification and launch status

Final automated checks passed: **26 unit tests**, ESLint, TypeScript, production build, catalogue validation (six products/five manufacturers) and the synthetic receiver harness. Production HTTP smoke checks passed all **144 content routes and 144 unique internal links**, metadata/hreflang, missing-page 404s, root redirect, image optimisation, filters/French search, quote context/dates and seven inquiry API cases. Phone/schema exclusion and disabled-delivery smoke guard passed. `pnpm delivery:check` exited 1 as expected with missing production gates; no real destination was contacted. `git diff --check` passed. Browser policy blocked real-browser access; screenshots, mobile/keyboard/client interaction, contrast/accessibility tool audits and measured Web Vitals remain pending. Live receiver/TLS/CRM delivery is unconfigured and untested. Production readiness command correctly refuses the current missing settings. Owner signoff items remain in OWNER_ACTIONS.md and docs/LAUNCH_CHECKLIST.md; implementation is reviewable, production launch is not authorized or verified.

## Phase 1B — 2026-10-22

Implemented from the GitHub Phase 1B specification and governance commits through `4130483` on `codex/phase-1b`. GitHub implementation commit `3846713` includes the completed Phase 1A foundation, which was not yet on main. Original local Phase 1A commit `be26bbf` and tested Phase 1B history are preserved on local branches `codex/phase-1a` and `codex/phase-1b-local`; they are not ancestors of the GitHub implementation commit. No merge, deployment or DNS change.

- Six sourced editorial products, five manufacturer references, typed publication/evidence/rights gates and import-time catalogue validation. Source links and review dates are attached to each fact. No stock, rental availability or dealer claims; no online transactions.
- English/French catalogue search, combined filters, sorting, reset and empty states; product benefits, specifications, FAQ, related options and contextual calls to action. Product galleries require licensed media and unique locale placements; no manufacturer media was supplied or copied.
- Shared purchase, rental, pilot/integration and general inquiry paths with validated product/category context, use case and rental dates. Language changes retain query context.
- Five rental journeys, eight industry paths, six category hubs and 16 distinct city/metro guides supplement the 13 regional guides. Metadata, hreflang, breadcrumbs and sitemap cover 144 public content URLs.
- Verification: 18 unit tests, ESLint, TypeScript and production build passed. HTTP smoke checks passed all 144 routes and 144 unique internal links, metadata, missing-page 404s, image optimisation, catalogue filters/French search, contextual inquiry and seven API cases.
- Independent review found query context lost on language switching; fixed by preserving search parameters.
- Browser security policy blocked the local preview. Desktop/mobile visual, keyboard and client-side interaction checks remain outstanding; HTTP checks do not substitute for them. Live CRM delivery remains unconfigured and untested.
- Existing homepage images retain their original two placements. No new photographic assets were added in Phase 1B.

## Phase 1A historical record

Implemented locally from `grafovgroup/botix` on branch `codex/phase-1a`, 2026-10-22. No deployment, DNS modification or external lead transmission.

## Delivered

- Next.js 16 App Router, React 19, TypeScript, Tailwind 4; pinned dependencies and pnpm lockfile.
- Black, white and silver visual system, original humanoid heroes, reusable page sections, responsive CSS, mobile menu, visible focus styles, skip link, native FAQ disclosures and reduced-motion support.
- 58 public content routes: 29 each in English and Québec French, with locale-preserving language switching.
- Homepage; humanoid and commercial hubs; cleaning, logistics, industrial and inspection categories; rentals; industries; solutions; about; contact; quote request; privacy; terms.
- Canada location index plus 13 distinct province/territory guides. Priority cities and neighbouring municipalities are covered within regional guides; standalone city pages have not been generated.
- Typed product and manufacturer data models and routable templates. Empty/unverified records remain 404 and excluded from the sitemap; no product facts or commercial relationships invented.
- Quote form covering all requested fields; client/server validation, explicit consent, honeypot, signed timing challenge, origin check, body-size cap, bounded local attempt limiter and HTTPS delivery adapter with timeout and idempotency key.
- Missing delivery configuration returns 503; upstream delivery failure returns 502. UI retains entries and provides the required telephone fallback.
- Canonical URLs, en-CA/fr-CA alternates, metadata, textual Open Graph/Twitter metadata, sitemap, robots, organization/breadcrumb structured data and security headers.
- Consent-gated analytics integration hook without external trackers or fabricated IDs.
- Setup documentation, environment example, asset register, duplicate-audit script and owner action list.

## Verification

- Unit tests: **8 passed**. Covers bilingual category data, 13 unique regional briefs, unverified catalog exclusion, inquiry validation, token tampering/expiry, throttling and delivery acceptance/failure.
- ESLint: **passed**.
- TypeScript: **passed** (standalone check and production build).
- Production build: **passed**; all 58 public content routes prerendered, with sitemap/robots generated separately.
- HTTP smoke test: **passed** for all 58 content URLs and 58 unique internal links; locale tags, one H1, canonicals and hreflang checked on every content page.
- Missing content/product/manufacturer pages: **404 verified**. Root redirect to `/en`: **verified**.
- Both Next Image optimisation endpoints: **200 with image content verified**.
- Inquiry HTTP cases: unconfigured delivery 503, foreign origin 403, absent consent 400, honeypot 400 and oversized body 413, all **verified**.
- Original asset verification: two different generated compositions, separate placement per locale; no exact duplicates against **2,108 local images across 10 other project directories**. Closest perceptual candidates visually inspected and unrelated. Detailed hashes and audit scope are in `docs/asset-audit.json`.

## Verification limits and follow-up

- Browser automation returned no connected browsers. Desktop/mobile visual rendering, interactive keyboard/mobile-menu testing, client-side submission UI and accessibility-tool audits remain unverified in a real browser. Responsive breakpoints and semantic markup are implemented and reviewed in source; no browser screenshots or Core Web Vitals claims are made.
- The development preview was served on loopback and HTTP-tested. Run `pnpm dev` for owner review. `node scripts/smoke-test.mjs` checks a local server with delivery **unconfigured**; do not run its submission checks against a configured live destination.
- External delivery uses a mock in unit tests; actual CRM/email credentials and delivery must be verified after owner configuration.
- The process-local rate limiter is not a shared deployment limiter. Production hosting needs trusted proxy handling and shared edge throttling; use a stable signing secret across replicas.
- Approved logo vectors were absent. A typographic wordmark is installed pending the supplied brand kit and visual approval.
- Privacy and terms text needs review against the actual operating entity, providers, retention practices and applicable law. Outstanding facts and decisions are in `OWNER_ACTIONS.md`; no public pre-launch/review disclaimers were added.
- Other local assets were screened; remote-only or unavailable site inventories remain outside the duplicate audit.

## Dependency compatibility

TypeScript 5.9.3 and ESLint 9.39.5 are pinned because the installed Next.js lint plugins do not yet support TypeScript 7 / ESLint 10 together. ESLint 9 is a compatibility dependency and should be revisited when those plugins support ESLint 10. Next.js implementation follows its bundled layout, route handler and image documentation.
