# BOTIX.ca — Phase 1E Codex Master Prompt
## WHC hosting compatibility, staging and deployment engineering

You are Codex working on GrafovGroup/Botix. BOTIX.ca domain is managed at Web Hosting Canada (WHC), and the owner prefers hosting there. WHC hosting plan and Node.js capability are NOT YET VERIFIED. Do not assume shared cPanel, VPS, SSH, process manager, Node version, ports, cron or reverse proxy are available.

## Preconditions
Read docs/PHASE_GOVERNANCE.md and all Phase 1A–1D specs, plus IMPLEMENTATION_STATUS.md, OWNER_ACTIONS.md, docs/GO_NO_GO.md, docs/RELEASE_RUNBOOK.md and security/QA notes. Inspect main and codex/phase-1b, codex/phase-1c, codex/phase-1d, plus PR state. Preserve stacked branch history and outstanding changes. Branch codex/phase-1e from the completed Phase 1D implementation. Do not force-push, merge, deploy, modify DNS, enable live inquiries, expose secrets or purchase hosting without owner authorization. Open a reviewable PR.

## Objective
Prepare a secure, reproducible WHC-compatible deployment for the current Next.js 16 App Router app, including dynamic inquiry endpoints, bilingual routes, security protections and runtime requirements. Keep BOTIX premium Signature brand, humanoid flagship, national Canadian B2B scope and EN/FR parity intact.

## 1. WHC compatibility decision
Inventory actual app runtime requirements: Node >=20.9, pnpm 11, Next 16.4.2, image optimization, server route handlers, environment secrets, proxy trust, HTTPS, writable temp needs, build memory and process supervision. Prepare docs/WHC_COMPATIBILITY.md comparing (a) WHC shared cPanel with verified Node.js Application Manager support and compatible versions, (b) WHC managed/unmanaged VPS with Node reverse proxy, (c) WHC domain/DNS with external runtime as contingency. Never assert WHC supports a feature without verified plan-specific evidence. Provide a minimal owner checklist for plan name, cPanel Node application capability, SSH, Node version, process limits and DNS access.

## 2. Deployable application configuration
Inspect existing Next.js config and hosting assumptions. Prepare appropriate standalone server build if compatible with Next.js version and chosen runtime; include static/public asset handling, production start commands, environment templates with placeholders only, secrets checks, health endpoint and secure graceful restart. Keep any deployment recipes conditional on confirmed WHC capabilities. Do not transform to static export if that would break the inquiry API, preview controls or security gates. Do not degrade privacy/security to fit shared hosting.

## 3. Staging workflow
Design protected staging using a temporary subdomain or WHC-supported preview location, but do not create DNS records. Ensure staging is password/access controlled and noindexed, with live lead delivery disabled, safe test data and no real PII. Document SSL, proxy, host and canonical handling, image optimization, localization, sitemap and redirects. Provide docs/WHC_STAGING.md with copyable operator steps once plan details are known.

## 4. CI/CD and release safety
Create provider-neutral scripts and GitHub Actions workflow where useful for tests, lint, typecheck, build, catalogue validation and safe smoke tests. Deployment credentials must be held only in GitHub/WHC secret managers, never committed. Do not create workflows that automatically deploy to production. Document manual release steps, versioned artifact, backup, rollback, process restart, health validation and log hygiene.

## 5. Inquiry and security
Retain Phase 1C/1D fail-closed lead delivery; keep disabled by default. Verify WHC ingress/proxy trust, edge rate limiting, forwarded headers, TLS termination and direct-origin protection. If shared hosting cannot provide these controls, mark it unsupported for live delivery and recommend VPS or split architecture. Do not turn on live forms until owner verifies CRM receiver, secrets, privacy policy, consent and E2E synthetic tests. Never put customer data into logs or test artifacts.

## 6. Domain and email coexistence
BOTIX.ca registration and DNS are at WHC. Document how to preserve MX, SPF, DKIM, DMARC and existing email services when future web A/AAAA/CNAME records change. No DNS changes are authorized. Avoid guessing current DNS records.

## 7. Verification
Run unit tests, catalogue checks, ESLint, TypeScript, production build, and available local HTTP/security smoke tests. Test production startup with representative non-secret env values where feasible. Browser visual/accessibility tests should run if tooling is available; otherwise preserve Phase 1D blockers. Record actual outputs, warnings and limitations. Check dependency advisories; do not silently suppress unresolved issues.

## 8. Handoff and acceptance
Commit docs/WHC_COMPATIBILITY.md, docs/WHC_STAGING.md, docs/WHC_DEPLOYMENT.md and necessary configuration/scripts. Update docs/PHASE_INDEX.md, IMPLEMENTATION_STATUS.md, OWNER_ACTIONS.md, CHANGELOG.md and docs/GO_NO_GO.md. Report PR, exact commit, actual tests, hosting requirements and remaining owner questions.

Acceptance: Phase 1D functionality preserved; a documented WHC hosting decision tree; a reproducible staging plan; no unsafe deployment shortcuts; no production DNS, deployment, lead activation or merge; test results accurately recorded. Work autonomously except for genuine owner decisions. If WHC plan is unknown, implement plan-agnostic groundwork and leave one concise plan-verification action.
