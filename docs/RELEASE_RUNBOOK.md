# Controlled release runbook

WHC Web Hosting Pro selected; Node capability verified, actual BOTIX compatibility still conditional. No deployment authorized. See WHC_DEPLOYMENT.md for the Phase 1E standalone build, staging and host acceptance procedure. Phase 1D depends on open Phase 1C PR #2, which depends on Phase 1B PR #1. Review and land in that order only with owner authorization; retarget later PRs to main and rerun checks. Do not force-push shared branches or silently merge them. Final go/no-go is in GO_NO_GO.md.

## 1. Establish a release candidate

1. Obtain owner approval of exact source SHA and staged PR diff. Record target host, hostname, deployment owner, account permissions and rollback artifact. GitHub workflow runs unprivileged checks only: contents read, no saved checkout credentials, no deployment/secret access, no pull_request_target. Actions are pinned by commit SHA.
2. Use Node 24 and pnpm 11.25.0; `pnpm install --frozen-lockfile`. Run `pnpm test`, `pnpm catalog:check`, `pnpm delivery:test`, `pnpm lint`, `pnpm build`, `pnpm typecheck`, `pnpm release:smoke`, `pnpm audit --prod --audit-level=high` and `pnpm audit --audit-level=high`.
3. The release harness requires free loopback port 3097 and starts/stops its own servers; production mode is only a local test setting. It disables delivery, clears webhook secrets, checks all 144 routes, then preview auth/noindex and missing-secret denial. It sends synthetic local requests only. Do not substitute a remote TEST_URL for this harness.
4. The complete dependency audit currently reports unpatched high-severity development-only braces (GHSA-vfj7-8cjw-p6xm). The separate CI audit job intentionally fails until resolved or an explicit reviewed risk decision changes policy. No advisory is ignored. Production-only audit is separately recorded. Do not treat the application check job alone as full release approval.

## 2. Configure an authorized preview

Use SITE_ENV=preview and a random PREVIEW_ACCESS_SECRET (at least 32 bytes), stored server-side. Basic username is `botix`; share the password only through approved channels. Enforce HTTPS before exposing Basic credentials beyond loopback. Keep INQUIRY_DELIVERY_ENABLED=false; the app refuses delivery in preview even if other credentials are accidentally present.

The app challenges HTML, API, RSC, image and static asset requests, emits noindex/nofollow/noarchive and private no-store, and serves disallow-all robots after authentication. Missing/short preview secret yields 503. A production Node process without explicit SITE_ENV=production defaults to this protected preview behavior. This shared-password layer is not a public admin/session system: additionally configure host-level access control, prevent direct origin bypass, ensure the CDN does not serve cached content before authentication, and rate-limit authentication attempts. Confirm all paths including assets with the actual host. Robots/noindex alone is not access control.

Run the manual matrix in PHASE_1D_QA.md. Obtain signed visual/accessibility evidence and actual metrics; browser checks remain outstanding here. Approved logos are absent, so follow BRAND_ASSETS.md only after delivery of the real approved files.

## 3. Production settings and preflight

| Setting | Scope | Required decision |
| --- | --- | --- |
| SITE_ENV=production | Build and runtime | Set only for approved public production; otherwise production server stays protected. |
| SITE_URL=https://botix.ca | Build and runtime | Exact request origin. If canonical host changes, update content siteUrl, sitemap, alternates and redirects together. |
| INQUIRY_DELIVERY_ENABLED | Server runtime | false until explicit owner authorization and verified receiver/edge controls. |
| INQUIRY_WEBHOOK_URL / SECRET | Server secrets | Owner-controlled HTTPS receiver and independent random bearer secret; no userinfo/fragments. |
| INQUIRY_SIGNING_SECRET | Server secret | Stable random value across all replicas/restarts; separate from webhook secret. |
| INQUIRY_RECEIVER_VERIFIED / INQUIRY_EDGE_RATE_LIMIT_CONFIRMED | Server runtime | Human attestations backed by evidence, not automatic installations. |
| TRUST_PROXY | Server runtime | true only when trusted ingress overwrites X-Forwarded-For and direct origin bypass is blocked. |
| NEXT_PUBLIC_PHONE_VERIFIED / NUMBER | Build-time public | false until ownership/routing verified; rebuild after changes. |
| ENABLE_HSTS | Build-time | false until HTTPS is universally enforced; true emits one-year HSTS without preload/includeSubDomains. Review rollback implications first. |
| PREVIEW_ACCESS_SECRET | Server secret | Preview only; not a production login and never NEXT_PUBLIC. |

`pnpm delivery:check` reads exported env, not .env files; never print secret values. A passing configuration check does not authorize enabling delivery. Complete the EN/FR live synthetic test plan with explicit owner authorization; record durable records, duplicate handling, routing, outage, edge spoof tests and retention evidence. Keep actual lead bodies out of logs.

Security headers include nosniff, DENY framing, no-referrer, restricted camera/microphone/geolocation and CSP base-uri/object/frame/form restrictions. CSP deliberately does not yet constrain scripts/styles, so it is not a complete XSS policy. A future nonce/script policy requires framework and browser verification. Headers/proxy are implemented in the app; confirm provider/CDN preserves them.

## 4. Owner go/no-go and release

Resolve all GO_NO_GO.md gates, including legal/trademark review and source/media/phone approvals. Obtain separate authorization for merge, deployment, DNS and live delivery. Snapshot DNS/TTL/certificates, host configuration and previous working artifact. Deploy only the approved immutable SHA through the selected provider's controlled process; use the conditional Phase 1E procedure only after provider validation and authorization.

After authorized deployment, read-only checks: HTTPS/apex-www redirects, /en and /fr, /api/health, sitemap/robots/canonicals, headers, hidden/unhidden phone as approved, errors/404s and backend service health. Live synthetic inquiry acceptance requires the separate approved plan. Monitor without recording personal data. Do not put prelaunch/legal-review notices on public pages.

## 5. Monitoring and rollback

/api/health is uncached liveness only: `{status: "ok", service: "botix"}`. It performs no external calls and reveals no secret/config state. A 200 is not proof of delivery readiness. In preview it requires authentication. Monitor it along with 5xx/429 rates, receiver durable acceptance, routing lag and alert delivery; assign owner, escalation and retention.

Trigger investigation/rollback for unavailable routes, broken language/context behavior, false confirmations, lost/duplicate routing or exposed preview. Disable delivery first if acceptance is uncertain. Preserve receiver evidence and deduplication records. Restore the previous approved artifact/config, keeping the same canonical host and signing-secret strategy where possible; changing the signing secret invalidates outstanding forms and can change retry keys. Reconcile uncertain submissions before reopening delivery. Restore DNS only if necessary and separately authorized. Re-run health/route/preview tests and owner acceptance, then document incident cause and remediation. Never delete leads to achieve rollback; backup/restore follows the approved receiver retention/access policy.
