# Staging deployment checkpoint — 2026-10-22 (Toronto)

**Application start and hosted acceptance pending; staging is not yet complete.** Staging authorization is already recorded. No additional deployment approval is needed.

- Exact uploaded source: `1d4285d0d2421cb9caf26c0ca643472be4e5b436`, PR [#8](https://github.com/GrafovGroup/Botix/pull/8), stacked on security fix #7. No merges.
- GitHub Linux candidate run [39876405864](https://github.com/GrafovGroup/Botix/actions/runs/39876405864) and release checks [39876405865](https://github.com/GrafovGroup/Botix/actions/runs/39876405865) both completed successfully. Includes full unsuppressed audit, tests, build and 144-route preview smoke.
- Artifact `12468028021`: Linux x64, Node 24.21.0, clean source, preview origin `https://staging.botix.ca`. Archive SHA256 `707c217fcc68cd1e4cfb3ed8de646f96da4ac4b4cb52a900a89c5a73dfa932da`.
- Uploaded and unpacked in private WHC release `~/botix-staging/releases/1d4285d0d242`. Server checksum matches. All 2,181 extracted file hashes match; no missing or escaping dependency symlinks.
- WHC reports x86_64, glibc 2.28 and `/opt/alt/alt-nodejs24/root/usr/bin/node` v24.21.0. Actual Passenger startup remains untested.
- Directory Privacy enabled only for `~/botix-staging-public`; original protected `.htaccess` copied to `~/botix-staging/rollback/pre-app.htaccess`. Added staging-only noindex/no-store, directory-listing denial and HTTP-to-HTTPS redirect.
- Verified HTTPS with normal certificate validation using explicit origin resolution: `/en` returns 401 with Basic challenge, `X-Robots-Tag: noindex, nofollow, noarchive` and `Cache-Control: private, no-store`. Empty root returns 403 with listing disabled. HTTP redirects to HTTPS with 302. These prove host protection, not app readiness.
- Node application form prepared with preview origin, disabled delivery, `TRUST_PROXY=false`, loopback hostname, port 3000 and `start.cjs`. It has NOT been submitted or started.

## Remaining user action and acceptance

The cPanel Create User form is open. Owner must create username `botix` with a unique password of at least 32 characters, keep it in a password manager, and submit the form. The browser tool requires user handoff for new credential entry and submission. Never paste the password into chat or GitHub. The same value must be configured privately as `PREVIEW_ACCESS_SECRET` for application authentication.

After that handoff: complete Node/Passenger configuration, verify runtime binding and protection of all routes/assets, run hosted 144-route and visual acceptance, and record restart/restore/resource checks. No hosted app acceptance is claimed. Production, mail, other sites and live inquiry delivery remain untouched.

Earlier status sections below are historical and superseded where this checkpoint gives newer evidence.

# Current staging status after security remediation

The unpatched dependency chain has been replaced with a version-scoped, compatibility-tested lint dependency and the staging certificate is now trusted. See [security remediation](STAGING_SECURITY_FIX.md). Staging GO still requires a clean Linux artifact and actual protected WHC application acceptance. Production remains separately unauthorized. Previous blocker reports below are historical.

# Authorized staging execution status — 2026-10-22

**Staging remains NO-GO; authorization is complete.** Fresh audit still fails on unpatched high dev-only braces; current supported dependency versions retain it. Staging DNS points to WHC but HTTPS verification fails on its self-signed certificate. Phase 1F Linux verify job passed; full-audit job failed (run 39872409833). No application uploaded/deployed. Follow [execution evidence](WHC_STAGING_ACCEPTANCE.md) and [authorization](WHC_STAGING_AUTHORIZATION.md); earlier pending-authorization notes below are historical. Production remains separately unauthorized.

# Phase 1F decision

**NO-GO for hosted staging and production.** Repository preparation is reviewable; actual WHC runtime acceptance has not occurred. See [staging acceptance](WHC_STAGING_ACCEPTANCE.md) and [QA evidence](PHASE_1F_QA.md). Required gates: explicit staging authorization, clean Linux candidate after unsuppressed full audit, verified Passenger/startup and TLS/protection, hosted HTTP/browser/capacity/restart/restore acceptance. Prior Phase 1E Linux verification passed but its dependency-audit job failed. Production still requires separate operational, business, branding and legal signoffs.

# BOTIX production decision — NO-GO

Date: 2026-10-22. Phase 1D is a reviewable implementation, not permission to release. **Production deployment, merge and live delivery are NOT authorized.** The owner separately authorized the completed domain attachment/nameserver connection before 1E; no further DNS changes or staging deployment are authorized by 1E. This report covers repository/local evidence, not a deployed environment. Independent owner signoff is required for every unresolved gate.

| Gate | Current result | Evidence / action |
| --- | --- | --- |
| Phase prerequisites | PASS for implementation | 1B e1a4e02 and 1C 42d6e82 preserved; PR #1 and #2 open/unmerged. Phase 1D stacks on 1C. |
| Unit/catalogue/synthetic checks | PASS locally: 35 tests, catalogue and synthetic receiver | IMPLEMENTATION_STATUS.md and PHASE_1E_QA.md. |
| Build/typecheck/lint/HTTP | PASS locally: build, lint, types and 144-route release smoke | Local production/preview harness; GitHub-hosted run status must be checked separately. |
| Production dependency audit | PASS for known advisory scan | pnpm audit --prod reports zero; not a security certification. |
| Full dependency audit | BLOCKED | High development-only braces advisory GHSA-vfj7-8cjw-p6xm, no published patch; no suppression. SECURITY_REVIEW_1D.md. |
| Real-browser visual/accessibility/performance | PENDING / release blocker | Browser security policy blocked access; run the 4-width bilingual manual matrix and record real reports. |
| Approved branding | PENDING | No approved files under public/brand. Typography only; owner supplies/accepts deliverables. |
| Phone | SAFE DEFAULT; ownership pending | Placeholder hidden until verified. Real routing and owner approval still required. |
| Product/manufacturer/media claims | SAFE EDITORIAL DEFAULT; owner review pending | Six dated source-verified editorial records, five unconfirmed relationships, inquiry-only; no new images. Review licenses/business scope before release. |
| Receiver/CRM/retention | PENDING / release blocker | No destination/credentials or live E2E evidence. Local synthetic harness is not provider verification. |
| Trusted ingress/shared limits | PENDING / release blocker | WHC Web Hosting Pro selected; spoofed-header protection must be verified at the actual edge and direct origin blocked. |
| Privacy/terms/trademark | PENDING / owner/legal | Actual legal entity, providers, retention and trademark clearance require signoff. No clearance or compliance assertion. |
| Preview and security header controls | Implemented; host verification pending | Runtime password/noindex, default protected mode, liveness and conservative CSP. Validate CDN/origin/HTTPS controls on chosen host. |
| Hosting/DNS/monitoring/backups/rollback | PENDING | WHC Node 24 capability verified; BOTIX runtime/TLS/propagation acceptance pending. Establish alerts and restore evidence, snapshot configuration, get separate action authorizations. |
| Merge/deploy/live delivery authorization | NOT GIVEN | No such action performed. |

A release can become GO only after all blocking/pending launch gates have dated evidence, an accountable owner, the exact release SHA and explicit approval. A local test pass, 200 health response, readiness boolean or CI application job is insufficient. If a security exception is proposed, it must be a separately reviewed, explicit owner/security decision with scope and expiry; this phase grants none.

Implementation and PR links: [1B #1](https://github.com/GrafovGroup/Botix/pull/1), [1C #2](https://github.com/GrafovGroup/Botix/pull/2), [1D branch](https://github.com/GrafovGroup/Botix/tree/codex/phase-1d). The 1D PR and exact commit are recorded in the completion report and PR metadata. Source specs remain canonical under docs/PHASE_1A_CODEX.md through PHASE_1D_CODEX.md.

Phase 1E adds standalone packaging and startup guards; see WHC_COMPATIBILITY.md, WHC_STAGING.md and WHC_DEPLOYMENT.md. Host Passenger compatibility, private-origin controls and full browser acceptance remain unverified. No claim of production GO follows from domain attachment.
