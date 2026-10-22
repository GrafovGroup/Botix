# Phase 1D QA record and reproducible procedure

## Evidence boundary

The same conversation's browser security policy rejected the local preview. No bypass, alternate browser connection, screenshots, accessibility score or measured Core Web Vitals is claimed. HTTP and unit checks exercise server behavior; client interaction/visual acceptance remains pending. Approved public/brand files are absent; typography remains. No imagery changed, so the existing asset register and its inaccessible-inventory limitations remain unchanged.

Local environment: macOS workspace, Node 24 runtime, pnpm 11.25.0, Next 16.4.2, React 19.3.1, TypeScript 5.9.3. Exact runtime version is captured in IMPLEMENTATION_STATUS.md. Automated evidence: tests, catalogue check, synthetic delivery harness, lint/build/typecheck and isolated release smoke. The harness starts loopback-only production and preview servers, disables delivery and clears receiver credentials, then shuts down its own processes. See GO_NO_GO.md for actual results and the unresolved dependency advisory.

## Browser matrix — PENDING

Use an authorized local or access-protected preview. Set browser viewport to **375×812, 768×1024, 1024×768 and 1440×900**, 100% zoom, record browser/version/OS/device/network and build SHA. Repeat every route below in `/en` and `/fr` (replace locale prefix). Use only synthetic input.

| Screen | Route | Evidence filename pattern |
| --- | --- | --- |
| Home | /en | home-{locale}-{width}.png |
| Humanoid hub | /en/humanoid-robots | humanoid-{locale}-{width}.png |
| Filtered catalogue | /en/robots?type=humanoid&intent=pilot | filters-{locale}-{width}.png |
| Product | /en/products/unitree-g1 | product-{locale}-{width}.png |
| Rental | /en/robot-rentals/event-robots | rental-{locale}-{width}.png |
| Industry | /en/industries/manufacturing | industry-{locale}-{width}.png |
| City | /en/locations/cities/toronto-gta | city-{locale}-{width}.png |
| Region | /en/locations/ontario | region-{locale}-{width}.png |
| Quote | /en/request-quote?intent=rental&product=unitree-g1 | quote-{locale}-{width}.png |

1. Inspect crop, hierarchy, text wrapping, sticky header, horizontal overflow and touch targets. Inspect brand fallback at normal/high DPI; no approved master exists to accept. Check 200% zoom and OS reduced motion.
2. At mobile widths open/close menu, follow every primary nav item, ensure menu state/focus and language switch work. With keyboard only: Tab from the start, activate skip link, verify visible focus and main content target, traverse filters/cards/details/forms/footer without a trap.
3. Search `humanoide` in French; combine type/application/industry/intent filters, sort, reset, and create an empty result. Verify results/empty-state guidance and back/forward history; switch locale and confirm filters remain.
4. Follow purchase/rental/pilot CTAs from product, category, rental/industry and region/city pages. Confirm context. On main quote form type a new use case and date range, change workflow/language normally, and verify those current fields persist. Contact details intentionally do not enter URLs and can reset; modified/new-tab clicks preserve prefilled query context only.
5. With delivery disabled confirm explicit unavailable state, disabled submit, retry availability control, editable fields and localized local download. Verify download contains entered values and “not submitted” text, not tokens/honeypot. With an authorized verified test receiver test native/client/server validation, missing consent, reversed dates, waiting/sending, 2xx confirmation, 502/503/timeout retention, expired challenge retry and throttling.
6. Confirm optional analytics is unchecked, emits nothing before consent, emits only allowlisted event/locale after consent, and stops after revocation. Inspect network: no analytics provider or form values in events; no real data in screenshots.
7. Run accessibility tooling (record version/rules) plus manual contrast, accessible names, error announcement and focus checks. Measure LCP/CLS/INP with a documented tool/profile on representative home/catalogue/quote; record raw reports, sample count and lab vs field distinction. Do not infer passing metrics from build/HTTP timing.
8. Store screenshots/reports under an owner-approved evidence location, with SHA, tester, date, locale, viewport, reproduction and pass/fail per case. Any defect reopens its release gate; fix on a review branch and rerun affected cases.

## Authorized live receiver test plan / Plan de test autorisé du destinataire

**Prerequisites / Préalables:** written owner authorization, designated synthetic destination, HTTPS URL and secrets in the host manager, approved retention/access policy, shared edge controls and operator present. No real personal data. Do not enable delivery until the owner authorizes that configuration change.

| Step | English | Français | Required evidence |
| --- | --- | --- | --- |
| 1 | Submit synthetic purchase request in English. | Envoyer une demande d’achat fictive en anglais. | Correct durable record, locale, context and routing. |
| 2 | Submit rental in French with dates/model/site. | Envoyer une location fictive en français avec dates, modèle et lieu. | Dates unchanged; French confirmation only after durable acceptance. |
| 3 | Submit pilot and general paths in both languages. | Tester les parcours pilote et général dans les deux langues. | Correct fields, consent and intended destination. |
| 4 | Retry the same challenge/payload after uncertain timeout. | Réessayer la même demande après un délai incertain. | One stored lead; stable idempotency key; no duplicate routing. |
| 5 | Reuse the key with changed payload. | Réutiliser la clé avec un contenu modifié. | Receiver rejects conflict; no overwrite or false success. |
| 6 | Simulate receiver rejection/outage/timeout. | Simuler un refus, une panne ou un délai dépassé. | Entries retained, honest error and brief export. |
| 7 | Test invalid dates, missing consent and expired challenge. | Tester dates invalides, consentement absent et jeton expiré. | No lead acceptance; localized corrective guidance. |
| 8 | Verify shared throttling across replicas and spoofed forwarded IPs. | Vérifier les limites partagées et les en-têtes IP falsifiés. | Edge overwrites headers; attacker cannot rotate claimed IP to bypass. |
| 9 | Verify privacy/monitoring and delete synthetic records per policy. | Vérifier confidentialité/surveillance puis supprimer les données fictives selon la politique. | No bodies/secrets in logs, alert received, approved deletion evidence. |

The local mock is not evidence of actual TLS, provider persistence, email/CRM routing, edge enforcement or legal compliance. All live rows remain pending.
