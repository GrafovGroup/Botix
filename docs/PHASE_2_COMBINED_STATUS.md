# Combined Phase 2 status

Implementation branch: `codex/phase-2-combined`, based on production evidence head `1a2c31d`; deployed application remains `93673ec63eaf51497ae00b17a5657f6b84a66798`. Canonical combined prompt and supplements copied from GitHub main `8f2d577` and committed before implementation. Main still contains specifications, not the running application. Existing phase, staging, framework and production branch history inspected and preserved; no merges or hosting changes.

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
- [ ] Final automated build/smoke and browser evidence recorded below before handoff.

## Changed routes and release scope

`/en/robots`, `/fr/robots`: comparison and catalogue navigation. Both locales of humanoid/category hubs: buyer guidance and intent links. Both locales of region/city guides: category cross-links. Header language links: allowlisted query context. Inquiry adapter: strict durable receipt/retry contract; receiver under `receiver/` is prepared separately. No route removed/renamed; no sitemap growth. No new asset placements.

## Test evidence

45 unit/integration tests passed, including concurrent receiver deduplication/restart, storage failure, EN/FR receipts, invalid/oversize/auth/consent rejection, ambiguous accepted-response retry and disabled-delivery guard. Catalogue validates six products/five manufacturers. Offline delivery harness passes. Full audit reports no known vulnerabilities. Final build, route smoke and browser results follow after verification.

## Limitations / owner decisions

1. Review combined Phase 2 for a separately authorized staging/production deployment; no Phase 2 code is live yet and no PRs are merged.
2. Provide secure receiver/mailbox infrastructure and authorize a synthetic external test before live delivery activation. info@botix.ca is the intended destination, not proof of mailbox receipt.
3. Approved vector assets, verified phone and commercial/legal facts remain existing owner inputs. Typographic fallback retained. No supplier availability, stock, pricing or legal clearance claimed.
