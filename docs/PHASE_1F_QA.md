# Phase 1F QA and staging decision

Date: 2026-10-22. Branch: `codex/phase-1f`, based on completed Phase 1E `24d232c8b17b4b335e3f8d417a45ca6b21ce46f5`. Canonical brief from main `85d0c23` recorded before code in local `a7fe7ca`. PR dependency order: #1 → #2 → #3 → #4 → Phase 1F. Prior PRs inspected open/draft/unmerged. Tested implementation tree is the Phase 1F PR tree; local build manifests reference `a7fe7ca` with `dirty=true` because verification precedes the implementation commit. Those macOS artifacts are test evidence only, not deployment candidates. The final GitHub commit/tree is verified against the local committed tree when publishing; no historical SHA is fabricated in this document.

## Decision

**NO-GO for hosted staging and production.** Local preparation and automated checks do not certify WHC Passenger compatibility or authorize deployment. No Phase 1F DNS/account change, remote staging test, file upload, workflow dispatch, deployment, merge, purchase or live lead submission occurred. See [exact change plan](WHC_STAGING_ACCEPTANCE.md) for the approval scope, stop conditions and reversible host matrix.

## Verification commands

Local macOS / Node 24.19.0 / pnpm 11.25.0. Synthetic delivery remains local. Production and preview builds are separate:

```sh
pnpm test
pnpm catalog:check
pnpm delivery:test
pnpm lint
SITE_ENV=production SITE_URL=https://botix.ca pnpm build:release
pnpm typecheck
pnpm package:release
pnpm standalone:smoke
pnpm release:smoke
SITE_ENV=preview SITE_URL=https://staging.botix.ca pnpm build:release
pnpm package:release
pnpm standalone:smoke
pnpm audit --prod --json
pnpm audit --json
git diff --check
```

## Results

Passed: **38 unit tests**, catalogue validation (six products/five manufacturers), synthetic delivery acceptance/deduplication/failure cases, ESLint, TypeScript and both production and preview builds. Production source and packaged release smoke each passed **144 routes and 144 unique internal links**, metadata, filters, images, quote context and seven local inquiry cases. The separately packaged preview passed the new **144 authenticated route GET-only acceptance** plus existing access/noindex/assets/images, spoofed-header, delivery-disabled and missing-secret checks. Final `git diff --check` passed.

Local package identities (both macOS, dirty test artifacts): production `t5dZrsMJq4pyLGf4Ns9hL`; preview `eRwcEShuGLsdW9RrvEQ1J`. They are excluded from Git and forbidden for WHC upload. Archive refusal tests passed; a successful Linux archive has not yet been published.

Fresh dependency audit: production has zero advisories. Full audit reports one high development-only `braces` advisory, GHSA-vfj7-8cjw-p6xm, with no patched version supplied. This is an unresolved gate, not suppressed or excused. The manual candidate workflow stops before publication when the full audit fails.

Prior Phase 1E GitHub run **39870752110**, exact SHA `24d232c`: `verify` job **120144273909** passed tests, lint, catalogue, delivery, production/preview Linux builds and both packaged smoke modes. Separate `dependency-audit` job **120144274167** failed at audit; overall run failed. Phase 1F CI is inspected after its PR is opened and must not be inferred from this prior run.

## Review and limitations

The new checker uses GET only, manual redirects, exact remote origin authorization, same-origin path validation before credentials, per-request timeouts and sanitized CLI errors. It does not submit forms or save response bodies. Unit tests cover production/foreign/unsafe target rejection, cross-origin credential protection and incompatible archive refusal. The archive accepts only an explicitly clean Linux x64 preview build for staging.botix.ca; the Linux success path is prepared for CI and not represented as exercised by macOS testing.

Automatic PR CI exercises the new checker through the preview smoke harness. The separate manual candidate workflow has no WHC credentials or deploy step, uses pinned Actions and uploads only a checksum/archive with three-day retention after audit and validation. It was not dispatched. Workflow availability on an unmerged branch is not assumed, and does not justify an unauthorized merge.

WHC TLS, origin isolation, host-wide auth/cache behavior, Node/Passenger startup/port/socket support, cache permissions, restart/drain, resource limits, neighbouring-site stability, logs, backups and restore are **not tested** in this phase. Responsive visual/browser/keyboard/accessibility checks at 375/768/1024/1440 remain **not run**; prior local browser policy denial was not bypassed. No public UI or images changed, so no new asset usage or portfolio-wide uniqueness claim is made. Real lead/CRM, phone, vector logos, privacy/legal/trademark and production approvals remain separate owner gates.
