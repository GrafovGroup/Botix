# BOTIX.ca — Phase 1F Codex Master Prompt
## WHC protected staging deployment and acceptance testing

You are Codex working on GrafovGroup/Botix. Continue from completed Phase 1E and follow docs/PHASE_GOVERNANCE.md and all prior phase specs. This phase prepares and, ONLY where specifically authorized, tests a protected staging environment on the owner's WHC Web Hosting Pro account. The proposed staging hostname is staging.botix.ca, but its creation, DNS changes, account configuration, file upload, external service use and deployment require explicit owner authorization. Do not interpret the request to continue phases as blanket authorization for live hosting changes. Production deployment, DNS changes to botix.ca, live lead delivery, branch merges and purchases remain unauthorized.

## 1. Repository and branch safety
Inspect main and codex/phase-1b through codex/phase-1e, existing PRs and release artifacts. Create codex/phase-1f from the completed Phase 1E implementation. Preserve history and avoid force pushes, resets, overwrites or unreviewed merges. Read docs/WHC_COMPATIBILITY.md, docs/WHC_STAGING.md, docs/WHC_DEPLOYMENT.md, docs/GO_NO_GO.md, OWNER_ACTIONS.md, IMPLEMENTATION_STATUS.md and docs/PHASE_INDEX.md. Record dependency ordering for stacked PRs.

## 2. WHC evidence and requirements
Existing Phase 1E evidence: WHC Web Hosting Pro / WEB PRO on srv48.swhc.ca, cPanel Node application tools, Node 22/24, approx 1.54 GB memory and 1 CPU account limits; actual Passenger startup, SSL, process limits and live routing remain unverified. Never assume the host supports Next.js 16 standalone without an actual test. Prefer Node 24 and Linux-built Next standalone assets matching target architecture/libc. Build in CI rather than consuming limited shared-host resources. Do not upload macOS artifacts.

## 3. Protected staging design
Prepare staging.botix.ca as the preferred hostname ONLY IF owner approves it and WHC supports it. Before authorization, provide operator-ready instructions, scripts, configuration templates and exact change plan without touching DNS or WHC settings. Protected preview must deny access without valid credentials, noindex all paths, disable inquiry delivery, avoid real customer data, and preserve correct EN/FR routing, canonicals, security headers and original-image access. Never weaken authentication to make image optimization work. Use preview-specific build and SITE_URL. No credentials in Git, screenshots, logs or PRs.

## 4. Passenger / cPanel compatibility
Prepare minimal start.cjs or equivalent only after inspecting existing implementation; document app root outside public web directory, Node app selector, startup file, environment injection, package placement, restart/drain, port/socket handling, cache write permissions, static assets and logs. Create a reversible test matrix for Passenger startup, health, SSL, 404s, dynamic catalogue filters, preview auth and image serving. If unsupported, stop and document exact limitation and safe alternatives; no static-export workaround that breaks APIs/security.

## 5. Acceptance testing
Automate locally and in GitHub: tests, lint, typecheck, production/preview builds, catalogue validation, security smoke and dependency audit. For WHC-hosted staging tests, require explicit authorization first. If authorized, verify HTTPS, protected preview, redirect behavior, bilingual pages, 144 content URLs, responsive visual QA at 375/768/1024/1440, keyboard accessibility, filters, form disabled states, runtime stability, process restart, memory use, headers, logs and backup restore. If browser tooling or WHC access unavailable, do not claim checks passed. Record evidence and blockers honestly.

## 6. Lead delivery and domain safety
Keep production and preview inquiry delivery disabled. Never send live personal information. Do not change apex/www DNS or mail records; preserve WHC MX/SPF/DKIM/DMARC. No actual DNS edits or host deployment without owner authorization. Phone remains hidden until verified; logo vector files remain provisional until supplied. Trademark/privacy/legal review remains owner task.

## 7. Documentation and handoff
Add docs/PHASE_1F_QA.md and docs/WHC_STAGING_ACCEPTANCE.md with a GO/NO-GO decision and evidence. Update docs/PHASE_INDEX.md, docs/GO_NO_GO.md, docs/WHC_COMPATIBILITY.md, IMPLEMENTATION_STATUS.md, OWNER_ACTIONS.md, CHANGELOG.md as appropriate. Record exact commands, tested SHA, branch, PR, blockers and explicit remaining approvals. Open a reviewable PR; no merge or production deployment.

## Acceptance
- Prior phases preserved, reviewable 1F branch and PR.
- Staging configuration ready for WHC, with host compatibility unknowns clearly identified.
- No unauthorized DNS, WHC changes, live lead transmission, deployment, merge or purchases.
- Verified checks distinguished from proposed tests.
- Staging GO only after actual protected WHC runtime acceptance; production GO requires separate business/legal/branding/inquiry signoffs.
- Codex works autonomously on repository-local tasks, leaving only genuine owner decisions.
