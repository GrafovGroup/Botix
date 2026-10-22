# BOTIX implementation status

## Phase 1B — 2026-10-22

Implemented from the GitHub Phase 1B specification and governance commits through `4130483` on `codex/phase-1b`. This branch also contains completed Phase 1A (`be26bbf`), which was not yet on main. No merge, deployment or DNS change.

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
