# Phase 1E execution checklist

Canonical prompt: PHASE_1E_CODEX.md from main 075921a, committed locally before implementation. Branch codex/phase-1e starts at Phase 1D b4fd3cf. PRs #1/#2/#3 inspected: open, draft, unmerged; preserve stack and target 1D for this review.

- [x] Inspect app requirements, previous specs, owner actions, release/security/QA evidence.
- [x] Record plan-specific WHC evidence and conditional shared/VPS/external-runtime decision tree.
- [x] Standalone build, assets/modules packaging, environment/build identity checks, secret exclusion and checksums.
- [x] Document protected staging, HTTPS, origins, cache/auth, DNS/email preservation and manual rollback.
- [x] Extend CI with both production and separately built preview artifact checks; no deployment automation.
- [x] Preserve disabled inquiry delivery, trusted-ingress gates and browser/owner acceptance blockers.
- [x] Complete final automated verification and exact-output record.
Publication evidence: the stacked PR URL, final commit and remote/tested-tree comparison belong in the PR metadata and completion report.

No staging creation, app deployment, new DNS mutation, merge, purchase or live inquiry activation in this phase. Earlier domain connection was separately owner-authorized and is recorded as historical account evidence.
