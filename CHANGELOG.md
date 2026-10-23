# Unreleased — combined Universal Phase 2

- Add bilingual three-profile comparison, six task-specific buyer pathways and national guide/category cross-links.
- Restrict language-switch query forwarding to known context fields.
- Prepare private durable HTTPS outbox receiver for info@botix.ca with matching receipts, bounded retries and offline concurrency/failure tests.
- Add supplier intake/outreach drafts, 90-day editorial backlog, Search Console instructions and operator activation runbook.
- Preserve public deployment, all 144 routes and disabled live delivery; no new imagery or supplier claims.

# Staging security fix

- Remove vulnerable braces dependency through a scoped lint glob replacement and tested path compatibility patch; retain all lint rules and unsuppressed audits.
- Install and independently verify trusted staging HTTPS on WHC. Application deployment remains separate.

# 0.6.0 — Phase 1F protected staging preparation

- Add GET-only staging acceptance for 144 bilingual routes, authentication, headers, original images, assets and disabled inquiries; reject production/cross-origin targets.
- Integrate acceptance into local preview smoke and add target/archive safety tests.
- Prepare manual Linux candidate archive workflow with full dependency audit gate and short artifact retention; no hosting deployment.
- Document exact staging-only WHC change/rollback plan, approval boundaries and outstanding host/browser checks.

# 0.5.0 — Phase 1E deployment engineering

- Add standalone output, build identity metadata, versioned packaging with public/static assets and checksums, runtime startup guards and packaged HTTP smoke checks.
- Verify WHC plan/Node capability; document conditional Passenger support, protected staging, Linux build requirements, manual release/rollback and DNS/email coexistence.
- Fix authenticated preview image rendering by serving protected originals; retain production image optimization.
- Extend CI verification without deployment automation; preserve disabled inquiries, protected preview and all Phase 1D routes.

# Changelog

## 0.4.0 — 2026-10-22

- Add pinned, read-only CI checks and isolated production/preview release smoke harness.
- Protect preview HTML/API/assets with a shared secret, noindex and fail-closed defaults; prohibit preview delivery.
- Add uncached health liveness, conservative CSP/no-referrer headers and opt-in HSTS.
- Validate trusted forwarded IP syntax while ignoring untrusted forwarded headers.
- Add final QA matrix, bilingual receiver test plan, release runbook and explicit production NO-GO gates.
- Record unpatched high development-only dependency advisory; no audit suppression, deployment or authorization implied.

## 0.3.0 — 2026-10-22

- Preserve rental dates, province and use case across quote workflows and normal language/pathway clicks on the main quote form; contextual category, journey and location CTAs.
- Hide unverified telephone links/schema, add local brief download and explicit unavailable/retry states.
- Gate production lead delivery on secure configuration and owner verification; add synthetic durable receiver harness.
- Add optional consent-gated form analytics with an event/locale allowlist.
- Add brand asset slots/fallback, supplier relationship schema, future-date checks and read-only catalogue validation.
- Document catalogue editing, logo deliverables, QA limitations, launch, legal/owner gates, monitoring and rollback.

## 0.2.0 — 2026-10-22

- Add bilingual sourced robotics catalogue, search/filter/sort and manufacturer references.
- Add contextual purchase, rental, pilot and general inquiry workflows with validated rental dates.
- Add rental/industry journeys and city guides, covering 144 bilingual content URLs.
- Preserve catalogue and inquiry parameters when switching language.
- Include the Phase 1A Next.js foundation, bilingual content, inquiry adapter and original homepage assets.

Browser visual acceptance and live delivery configuration remain outstanding.
