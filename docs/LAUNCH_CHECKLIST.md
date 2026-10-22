# BOTIX launch checklist

Internal operational runbook. Phase 1C implements readiness controls; it does not authorize deployment or certify a live business workflow. The owner must assign an accountable operator and record evidence for each unchecked item. Never place this checklist's review language on public business pages.

## Release and environment

- [ ] Owner approves Phase 1B and 1C PRs and authorizes merge separately from deployment. Phase 1C is stacked on Phase 1B; after 1B lands, retarget/rebase non-destructively and rerun checks.
- [ ] Choose hosting, production hostname, account owner, billing and access controls. No services purchased by this phase.
- [ ] Record current DNS zone, TTL, certificates, redirect rules and previous release before any authorized change. Test apex/www HTTPS redirect to the chosen canonical hostname; keep SITE_URL aligned with `https://botix.ca` metadata or change both deliberately.
- [ ] Set deployment secrets through the host secret manager, never Git: webhook URL/secret, stable signing secret, SITE_URL. Generate independent random secrets of at least 32 bytes. Rotate with a documented receiver transition; old form challenges become invalid and visitors must retry.
- [ ] Keep INQUIRY_DELIVERY_ENABLED=false until the receiver and privacy workflow are approved. Production additionally requires INQUIRY_RECEIVER_VERIFIED=true and INQUIRY_EDGE_RATE_LIMIT_CONFIRMED=true. These are operator attestations, not automatic verification.
- [ ] Enforce shared IP/edge abuse limits before the app across all replicas, request body limits, HTTPS and restricted proxy trust. Set TRUST_PROXY=true only when the trusted edge overwrites forwarded headers. Verify spoofed forwarded IPs cannot bypass limits. Local token limiter alone is insufficient.
- [ ] Run pnpm delivery:check with secrets injected from the target environment. The CLI reads exported environment variables, not .env files. Never print secrets into logs.

## Business and brand

- [ ] Verify phone ownership and routing with a real call. Only then set NEXT_PUBLIC_PHONE_VERIFIED=true and NEXT_PUBLIC_PHONE_NUMBER to the verified E.164 value, and rebuild. Default +18336969996 is a placeholder and is hidden in links and structured data until verified.
- [ ] Supply and sign off logo deliverables listed in BRAND_ASSETS.md. Fallback typography is not a claimed approved vector.
- [ ] Approve homepage imagery. Obtain separate rights-cleared product imagery for each locale/placement; update ASSET_USAGE.md and exact/visual duplicate audit. No new photography was introduced in 1C; prior inaccessible portfolio inventories remain outside scope.
- [ ] Review factual claims, catalogue sources, exact editions, availability and manufacturer relationships using CATALOGUE_OPERATIONS.md. No published stock, prices, dealership or service guarantees may be inferred from editorial references.
- [ ] Confirm legal entity, privacy contact, service-provider/subprocessor list, retention/deletion policy, cross-border handling, request/complaint process and incident owner. Counsel reviews English/French privacy and terms against actual practices; no legal-compliance certification is claimed.
- [ ] Obtain BOTIX trademark/name clearance and approved usage guidance from owner/legal. No clearance claim has been made.

## Receiver and conversion acceptance

- [ ] Choose owner-controlled HTTPS receiver and CRM/email routing, restricted access, retention policy and durable queue/storage. Follow INQUIRY_DELIVERY.md; do not rely on email enqueue success without an agreed durable handoff.
- [ ] Run pnpm delivery:test locally. This uses a synthetic persisted receiver with injected transport, not a live CRM or TLS test.
- [ ] With owner authorization, run synthetic end-to-end tests against the actual destination in EN and FR: purchase, rental, pilot and general; check contextual model/site/dates, received record and routing, consent, duplicate retry, outage, timeout, invalid fields and rate limits. Do not send real leads as a test.
- [ ] Confirm failed or unavailable submissions retain form data, permit local brief download and never show success. Confirm verified telephone only. Confirm private data does not enter analytics or application logs.
- [ ] Capture real-browser screenshots at 375px, 768px and 1440px: home, catalogue (filters/empty state), product, rental, industry, location and quote in both languages. Check keyboard order, mobile menu, focus, errors, loading, download, language/query retention, overflow, image crops and reduced motion. Browser access was policy-blocked during implementation; no bypass or screenshot evidence exists.
- [ ] Measure LCP/CLS/INP with browser tooling under a documented device/network profile; inspect contrast and accessibility with tools and manual checks. No measured Web Vitals are reported by this phase.
- [ ] Run pnpm test, pnpm catalog:check, pnpm lint, pnpm build, pnpm typecheck. On an isolated local server with delivery disabled run node scripts/smoke-test.mjs. It refuses submissions when the API reports delivery enabled.
- [ ] Confirm canonical/hreflang, sitemap, robots, 404s, social metadata and all 144 URLs. Staging must be access-controlled/noindexed by the hosting environment; public robots currently permits production indexing.

## Analytics, monitoring and rollback

- [ ] Decide whether to connect an analytics receiver. Default is a local custom event only, no external network. The optional checkbox is separate from contact consent; allow only event + locale, no field values, URL, identifiers or automatic provider pageviews. Verify revocation stops events. Do not claim analytics is anonymous if a future provider adds identifiers.
- [ ] Monitor HTTPS availability, 5xx/429 rates and webhook acceptance/latency with no request bodies or secrets. Assign alerts and an on-call owner; use synthetic data only with authorization. Test alert routing.
- [ ] Back up receiver records under approved encryption, retention and restore policies; test restoration. The website itself stores no inquiry database. Retain the previous release artifact, source SHA and host configuration snapshot.
- [ ] Rollback procedure: disable delivery via INQUIRY_DELIVERY_ENABLED=false if acceptance is uncertain; preserve receiver evidence; redeploy the previous approved artifact; restore DNS only if a DNS change was the cause and owner authorizes it. Verify HTTPS, EN/FR routes and disabled-submission handling, then reconcile accepted/duplicate records before re-enabling. Never roll back by deleting lead records.
- [ ] Owner signs off launch, schedules monitoring and authorizes deployment/DNS explicitly. Review owner checklist after every provider, legal, phone or infrastructure change.
