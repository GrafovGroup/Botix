# BOTIX — Authorized WHC Staging Execution Handoff

## Authorization and references
The owner has authorized password-protected staging at staging.botix.ca on the existing WHC Web Hosting Pro account. See `docs/WHC_STAGING_AUTHORIZATION.md`, `docs/PHASE_1F_CODEX.md` and `docs/WHC_STAGING_ACCEPTANCE.md` (on `codex/phase-1f`). Do not request the same staging authorization again.

## Codex execution
1. Inspect main and `codex/phase-1f`, review stacked PR dependencies and use the completed Phase 1F implementation as the base; do not overwrite or force-push other work.
2. Resolve the outstanding full dependency-audit security blocker before candidate publication. Never silently suppress a vulnerability.
3. Verify actual WHC access, existing staging hostname records, isolated application root, Node 24 / Passenger startup contract, target Linux architecture, resource limits, TLS, access control, and rollback path.
4. Using approved WHC access, configure **only** staging.botix.ca and a password-protected/noindex staging application. Prepare and upload a verified Linux-built artifact only after all security prerequisites pass.
5. Run authorized staging-only acceptance: HTTPS, authentication including assets, 144 bilingual routes, dynamic filters, image serving, security headers, process lifecycle, responsive visual checks where tools permit, and disabled lead delivery. Record evidence, exact SHA, dates and test outcomes.
6. If WHC access is unavailable or a prerequisite fails, stop safely and document the exact blocker; do not claim a successful deployment.
7. Commit results and updated staging GO/NO-GO status to GitHub, with a reviewable PR.

## Strict limits
No production launch, no changes to botix.ca apex/www, no changes to mail DNS (MX/SPF/DKIM/DMARC), no purchases, no live inquiry delivery, no real customer data in tests, no merge without owner approval, no credentials in GitHub. Preserve all other WHC websites.

## Deliverables
- Updated `docs/WHC_STAGING_ACCEPTANCE.md` and `docs/GO_NO_GO.md`
- Actual staging evidence or specific blocking conditions
- Exact branch, commit and PR references
- Owner action list limited to remaining genuine dependencies

**Status at handoff:** authorization recorded; deployment not independently confirmed.
