# Combined Phase 2 status

Implementation branch: `codex/phase-2-combined`, based on production evidence head `1a2c31d`; deployed application is `7a0fdd05b07a60670c325bd7e766389dda38c2dc`. Canonical combined prompt and supplements copied from GitHub main `8f2d577` and committed before implementation. Main still contains specifications, not the running application. Existing phase, staging, framework and production branch history inspected and preserved; no merges. Owner-authorized Phase 2 hosting deployment is complete; see [deployment evidence](PHASE_2_DEPLOYMENT.md).

## 2A — Catalogue and buyer pathways

- [x] Audit existing six editorial products/five manufacturers and preserve their validation/publication gates, source review dates, relationship and media-rights evidence. No new unverified products or imagery.
- [x] Up to three sourced profiles compared by intended use, industries, inquiry paths and source/review date. Keyboard-scrollable semantic table; GET form works without JavaScript. Selections limited and deduplicated; unknown products excluded. Current catalogue filters retained.
- [x] Six category-specific task-planning introductions and purchase/pilot/rental pathways; humanoid flagship remains prominent. Related product/detail URLs preserved.
- [x] Supplier intake schema/checklist and bilingual outreach drafts in PHASE_2_OPERATIONS.md. No outreach sent; no relationship inferred.

## 2B — National SEO

- [x] Preserve all 144 EN/FR routes, including 13 regions and 16 city/metro guides and surrounding communities. Existing site-specific guidance retained; no duplicate municipality doorway pages.
- [x] Link all region/city guides to robot category pathways; preserve local quote context, canonical, hreflang, breadcrumbs, robots and sitemap behavior.
- [x] Search Console owner verification/submission guide and prioritized 90-day bilingual editorial backlog prepared. No access, indexed-count, ranking, traffic or lead baseline invented.

## 2C — Bilingual conversion, quality and delivery preparation

- [x] Comparison labels, task guidance, buyer CTAs and receipt text in English/Québec French. Language links preserve selected profiles/catalogue filters and drop unrelated contact parameters.
- [x] Private durable HTTPS receiver prepared for info@botix.ca with authenticated bounded input, consent/schema checks, atomic deduplication, fsync before acknowledgement, routing/reply-to fields and safe failures. Adapter requires matching receipt and makes one bounded retry after ambiguous failure. Offline synthetic tests only.
- [x] Keep live delivery disabled; private receiver is not started by the website. Existing anti-spam challenge/honeypot/attempt controls and production verification gates remain. Shared edge limits, mailbox transport, credential provisioning and external receipt verification are separate activation requirements.
- [x] Operator setup, retention/access/logging/alert guidance, synthetic-to-authorized-mailbox test sequence and bilingual supplier drafts documented.
- [x] Automated build/smoke and focused browser evidence recorded below.

## Changed routes and release scope

`/en/robots`, `/fr/robots`: comparison and catalogue navigation. Both locales of humanoid/category hubs: buyer guidance and intent links. Both locales of region/city guides: category cross-links. Header language links: allowlisted query context. Inquiry adapter: strict durable receipt/retry contract; receiver under `receiver/` is prepared separately. No route removed/renamed; no sitemap growth. No new asset placements.

## Test evidence

45 unit/integration tests passed, including concurrent receiver deduplication/restart, storage failure, EN/FR receipts, invalid/oversize/auth/consent rejection, ambiguous accepted-response retry and disabled-delivery guard. Catalogue validates six products/five manufacturers. Offline delivery harness passes. Full audit reports no known vulnerabilities. GitHub Actions run `39889230523` passed both verify and full dependency-audit jobs for implementation `da5c42bbcd2e9f12eef501a9ab26e35452a77fa4`: tests, 3 launcher tests, catalogue, offline delivery, lint, production build/typecheck, 144-route production smoke, packaged production smoke, separate preview build and 144-route protected preview acceptance. Local production build and packaged smoke also passed. Later documentation-only evidence updates do not change the tested application source.

Browser evidence (local optimized production-mode build, delivery disabled): desktop 1440px comparison, selecting a third profile with keyboard submission, EN→FR retaining all three selections, French rental link prefilled with Unitree G1/humanoid/rental and disabled submit, mobile 390px comparison region keyboard scrolling with visible focus, and mobile humanoid purchase/pilot/rental cards. Page width remained 390px while the table scrolled inside a 340px region; no page overflow. Browser captured no console errors. New UI is server-rendered and adds no client interaction bundle. Existing image placements and reduced-motion styles are unchanged; no new animation. This is focused acceptance, not a full WCAG certification or a field Web Vitals report.

Observed local warm comparison request: HTTP 200, first byte 0.040367s, total 0.040562s, 39,616 HTML bytes. This single loopback sample is diagnostic only, not a production/mobile performance claim. No real-user performance or Search Console baseline is available.

Screenshots saved privately in the task hosting evidence directory: `phase2-comparison-desktop.png`, `phase2-comparison-mobile.png`, `phase2-buyer-mobile.png`. Local preview: http://127.0.0.1:3102/en/robots?compare=unitree-g1&compare=pudu-cc1#compare. Review PR: https://github.com/GrafovGroup/Botix/pull/12.

## Limitations / owner decisions

1. Review combined Phase 2 for a separately authorized staging/production deployment; no Phase 2 code is live yet and no PRs are merged.
2. Provide secure receiver/mailbox infrastructure and authorize a synthetic external test before live delivery activation. info@botix.ca is the intended destination, not proof of mailbox receipt.
3. Approved vector assets, verified phone and commercial/legal facts remain existing owner inputs. Typographic fallback retained. No supplier availability, stock, pricing or legal clearance claimed.
