# Staging app registration — 2026-10-22 20:54 Toronto

cPanel confirmed the owner saved the password for user `botix`. Created the isolated Node 24.21.0 staging application at `botix-staging/releases/1d4285d0d242`, URL `staging.botix.ca/`, startup `start.cjs`, production Node mode with `SITE_ENV=preview`, exact staging origin, disabled inquiry delivery, `TRUST_PROXY=false`, loopback hostname and port 3000. No other application was changed.

Post-creation verification: all 2,181 release hashes still match; dependencies exist; the staging public `.htaccess` retains authentication and noindex and now contains Passenger configuration. HTTPS `/en` still returns 401 with the expected Basic realm and private/no-store + noindex headers.

**Startup and authenticated acceptance are not yet verified.** The prepared `PREVIEW_ACCESS_SECRET` value field requires owner entry of the same saved password, then row Done and application Save. No secret was read or recorded. The credential handoff is the only owner action needed to continue staging tests. Previous statements that the application has not been created are historical; registration alone is not successful deployment. Exact uploaded source remains `1d4285d0d2421cb9caf26c0ca643472be4e5b436`.

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

# Current security remediation

The dependency and self-signed TLS blockers below are superseded by [STAGING_SECURITY_FIX.md](STAGING_SECURITY_FIX.md). The scoped lint dependency replacement removes braces; trusted staging TLS is installed and independently verified. Staging authorization remains complete. Actual app deployment/runtime/access-control acceptance is still outstanding. Earlier execution results below are historical.

# WHC staging change plan and acceptance — Phase 1F

## Authorized execution attempt — 2026-10-22

Staging authorization is now recorded in WHC_STAGING_AUTHORIZATION.md and the owner explicitly requested execution of WHC_STAGING_EXECUTION.md. Do not ask for the same authorization again. Earlier approval-pending text below is historical Phase 1F preparation evidence.

**Current decision: NO-GO, blocked by security prerequisites.** Source application SHA: `f5cfaf8adf673d604b75324a9c8831757fb3bba3` (PR #5). Execution branch: `codex/staging-execution`, stacked on #5. PRs #1–#5 were inspected and remain open drafts/unmerged; dependency order remains #1 → #2 → #3 → #4 → #5 → execution evidence PR.

- Fresh full audit fails on high development-only `braces@3.0.3`, GHSA-vfj7-8cjw-p6xm. Registry latest braces is 3.0.3; GitHub advisory lists no patched version. Latest Next ESLint plugin 16.4.2 still requires fast-glob 3.3.1. Latest fast-glob 3.3.3 still requires micromatch ^4.0.8, whose latest 4.0.8 still requires braces ^3.0.3. No supported package upgrade currently removes the finding. No ignored advisory, changed audit threshold, disabled lint rule or unreviewed substitute package was introduced. A separately reviewed dependency-chain replacement or upstream fix is required; authorization to deploy does not waive this gate.
- Fresh production-only audit has zero vulnerabilities. Phase 1F GitHub run 39872409833: verify job 120149760268 passed all Linux builds/tests and production/preview smoke; dependency-audit job 120149760477 failed. Overall run failed. This is actual CI evidence, not inferred from local checks.
- Existing WHC authenticated cPanel access works. Prior owner-requested domain connection created staging.botix.ca at isolated document root `/home/nvfglyl5/botix-staging-public`; all three WHC authoritative nameservers returned A 51.161.57.68. Public resolver 1.1.1.1 now returns the same staging IP, but the local resolver still returns no address.
- A direct HTTPS check using `curl --resolve staging.botix.ca:443:51.161.57.68` (normal certificate validation retained) fails with exit 60: self-signed certificate. The cPanel SSL Status page also shows staging.botix.ca and www.staging.botix.ca as self-signed. No trusted HTTPS acceptance; no certificate-warning bypass and no credentials transmitted to staging.
- No upload, artifact publication/dispatch, new Node application, host configuration change or deployment occurred during this execution attempt. As directed by execution step 6, deployment stopped at failed prerequisites. Host architecture/libc, Passenger startup/bind contract, host-level authentication, resource limits under load, restart/drain and backup restore remain unverified. No remote 144-route/browser acceptance was attempted against an undeployed or untrusted endpoint.

Next steps: obtain a reviewed dependency remediation with a passing full audit; complete valid WHC AutoSSL issuance; then verify target/runtime/host protection, produce a clean Linux preview candidate, upload and run the authorized acceptance matrix. No additional staging authorization is required. Production/apex/www/mail changes, purchases, live inquiries and merges remain excluded. No application code changed, so full builds were not repeated; existing exact-SHA Linux results were inspected, fresh audits/DNS/TLS checks run, and documentation diff checked.

Evidence sources: [GitHub advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), [Phase 1F Actions run](https://github.com/GrafovGroup/Botix/actions/runs/39872409833). The local connection screenshot is kept outside Git; no credentials or account contact information are published.


**Decision: NO-GO for hosted staging acceptance.** Repository preparation is ready; no staging hostname/app/upload has been authorized or performed. Production remains NO-GO separately. This is the concrete plan for owner review, not an instruction to execute without approval.

## Exact proposed change scope

Target: **staging.botix.ca only**, on existing WHC Web Hosting Pro. After approval:

1. Read current cPanel domain/app configuration and authoritative zone; save an access-restricted rollback record. Confirm staging is unused and does not share any existing app root. Verify SSH access, Linux architecture/libc (`uname -m`, `getconf GNU_LIBC_VERSION`) and selected Node 24.21.0. Do not expose credentials in the evidence record. No package installation or build on shared hosting.
2. Create a separate staging subdomain/document root such as `botix-staging-public` under the account home, with directory listing disabled and no release sources in it. Use a separate private application root such as `$HOME/botix-staging/releases/<approved-sha>`. These are proposed relative locations, not existing verified paths. Validate neither is inside any other site's document root; never reuse `public_html`, metalfabricators-live or another site's app. Snapshot permissions and use restrictive access.
3. Create only the staging DNS A record to the **then-verified** hosting web IP (last observed 51.161.57.68). Inspect any existing staging AAAA/CNAME/CAA first; do not overwrite a conflict or guess a new address. Do not change apex/www, nameservers, MX, SPF, DKIM, DMARC, email hosts or verification TXT. Confirm actual authoritative answers and TLS validation. No wildcard changes.
4. Obtain a valid certificate for staging using WHC's supported free certificate process, if available; no paid certificate or plan upgrade. Ensure HTTPS before credentials are transmitted. Set host-wide access restrictions/auth, reject unknown Host values, disable public caching, establish auth throttling and prevent direct-origin bypass. Until protection is effective, expose no application files or business pages. If WHC cannot enforce it, stop before deployment and record alternatives.
5. Resolve the full dependency audit gate before candidate publication. The manual `Prepare Linux staging candidate` GitHub workflow uses Node 24.21.0 on Ubuntu x64, builds a **preview-specific** origin and uploads a tar archive/checksum only after tests and the unsuppressed full audit pass. It does not connect to WHC. It is not dispatched in this phase. Verify target x64/glibc compatibility before using it; modify/review the workflow if target differs. Existing local macOS bundles are not deployable. Select the approved branch/SHA explicitly when dispatching; verify workflow run, source SHA, `dirty=false`, manifest origin/mode and outer archive checksum before any upload. No artifact is a release approval by itself.
6. Upload the verified Linux archive to the new private release directory using the authorized WHC transfer route. Preserve symlinks; check digest before extraction. Never upload into the public document root. Ensure only the app owner can write code/config; cache and temp paths must be writable by the supervised worker. No secrets inside the archive.
7. Create a **new** Node application mapped only to staging, production Node mode, Node 24.21.0, candidate startup file `start.cjs`. The existing entrypoint validates env before requiring Next's generated server in the same process. Verify Passenger's startup extension and port/socket interception contract first. Required proposed env: SITE_ENV=preview, SITE_URL=https://staging.botix.ca, INQUIRY_DELIVERY_ENABLED=false, TRUST_PROXY=false, a random PREVIEW_ACCESS_SECRET of at least 32 characters, HOSTNAME=127.0.0.1 and PORT=3000 **only if Passenger supports that contract**. This is a proposed port, not a reserved host port. No guessed socket adapter or private Next imports; an incompatible contract is a stop condition. Do not restart existing apps.
8. Run the acceptance matrix below, including GET-only remote tests **after explicit test authorization**. Use synthetic inputs only. Record sanitized result/SHA/time, never headers, credentials, bodies or customer data. Test restart/drain and restore only the new staging app. Do not enable any lead receiver.

The runtime template remains `deploy/runtime.env.example`; no secret value is supplied. Use WHC secret/environment controls. Do not put Basic credentials into URLs, shell history, screenshots, PR text or command-line arguments. GitHub artifacts contain compiled site code/public imagery and may be accessible under repository Actions permissions; no confidential or runtime material belongs in a build. Retention is three days; retain an approved artifact privately if needed longer.

## Stop and rollback conditions

Stop if staging already exists, private roots cannot be guaranteed, target architecture/libc differs, full audit fails, TLS is invalid, auth can be bypassed, source files are web-served, Passenger refuses the startup contract, cache permissions fail, limits destabilize another site or any inquiry reports delivery available. Do not weaken auth, use static export or start an unsupervised process.

Rollback only newly created staging resources: stop the new app, restore its prior mapping/config if any, retain sanitized evidence and the verified archive, remove only newly introduced staging DNS/domain resources after confirming no dependency. Restore the pre-change staging zone entries exactly. Keep other apps, apex/www and all mail records untouched. Do not delete files outside the new staging release directory or remove existing certificates. A clean rollback must be observed before staging GO.

## Automated GET-only acceptance

After approval and working TLS, inject the password securely into the operator environment (not a command argument):

```sh
STAGING_URL=https://staging.botix.ca STAGING_TEST_AUTHORIZED=true pnpm staging:acceptance
```

`PREVIEW_ACCESS_SECRET` must already be supplied securely. The authorization flag is an accident guard, **not evidence of human approval**. The runner accepts only loopback or exact HTTPS staging.botix.ca, refuses production and cross-origin resources, never follows redirects, never submits inquiries, and prints only a result/count or sanitized failure. Run against only the approved environment. `pnpm standalone:smoke` automatically exercises the same checker against a local preview artifact without external traffic.

The checker covers all 144 authenticated EN/FR sitemap URLs, canonical/locale metadata, phone exclusion, security/noindex/cache headers, unauthenticated/wrong-password denial, hostile middleware header, API delivery disabled, redirect, localized 404, discovered JS/CSS auth, original images and dynamic EN/FR filters. It validates link origins before credentials can be sent. It does not prove browser accessibility, Passenger lifecycle, resource capacity, host log retention, direct-origin firewalling or backup recovery.

## Evidence matrix

| Check | Local evidence | WHC result required for GO |
| --- | --- | --- |
| Exact source/platform/origin, artifact digest | Build manifest and archive guards; local macOS not deployable | Approved Linux artifact, x64/glibc/Node match and verified transfer digest |
| Passenger startup, env, socket/port | start.cjs direct-Node tests only | New app starts and remains supervised on verified contract |
| TLS, canonical host and origin isolation | Loopback cannot certify TLS/firewall | Valid chain/hostname, HTTPS enforced, hostile Host/direct-origin denied |
| Preview access and disabled leads | Automated GET-only checker | Same checks pass at real ingress, including cache-hit/asset paths |
| 144 routes, filters, EN/FR, images, headers | Local preview and production smoke | Same approved release passes remote checker |
| Missing secret and wrong password | Local refusal/denial | Isolated restart with missing secret refuses app, restore secret safely |
| Cache/temp permissions | Local image/cache execution | Worker can write required cache/temp without world-writable code |
| Restart/drain/stability | Local process startup/shutdown | Synthetic in-flight requests survive a staging-only graceful restart; 30s drain allowance verified |
| Capacity and neighbouring apps | No WHC load test | Observe process/memory/inodes/CPU before and after small bounded requests; stop on pressure |
| Logs and secrets | Runner saves no response bodies | Host access/error logs omit credentials, query PII and bodies; retention/access verified |
| Backup and rollback | Proposed procedure only | Restore staging into isolated private location, verify digest/routing and remove only new test resources |
| Visual/accessibility | Prior local browser policy block remains | Four widths, both locales, keyboard/mobile nav, filters, disabled form, contrast and real performance reports |

Use the detailed screen matrix in PHASE_1D_QA.md at 375/768/1024/1440. Do not claim original-image staging performance matches optimized production performance. A 200 health result or automated checker pass alone is insufficient for staging GO. Record each row with tester, date, exact SHA/artifact digest and pass/fail; every WHC result is currently **NOT RUN / awaiting authorization**.

If GitHub does not expose dispatch for the unmerged workflow, obtain separately authorized landing/CI setup. Do not merge branches merely to enable the workflow. No dispatch or hosted artifact upload was performed in Phase 1F preparation.
