# Phase 1D execution checklist

Canonical brief: PHASE_1D_CODEX.md, GitHub 95e39c1. Branch codex/phase-1d starts from Phase 1C 42d6e82; PRs #1 and #2 are open drafts, unmerged. No main merge, deployment, DNS, purchase or live delivery authorized.

- [x] CI checks and reproducible isolated production/preview HTTP harness.
- [x] Preview access/noindex protections, health endpoint, conservative security headers.
- [x] Delivery/forwarded-header audit, synthetic tests and bilingual live test plan.
- [x] Catalogue/content/asset and dependency security review.
- [x] Final QA manual script at 375/768/1024/1440 in both locales; browser policy block retained, no invented screenshots/metrics.
- [x] Release runbook, go/no-go gates, evidence and owner handoff.
- [x] Automated verification, GitHub branch and stacked review PR.

Approved assets remain absent from public/brand. Retain typography and existing image placements. No new business claims or artwork.

Local validation: 31 tests, catalogue, synthetic receiver, lint/typecheck/build and 144-route production/preview HTTP checks passed. Production dependency audit is clean; full audit has one unresolved high dev-only advisory. Real-browser acceptance and all owner/provider/legal/live-delivery gates remain pending; see GO_NO_GO.md.
