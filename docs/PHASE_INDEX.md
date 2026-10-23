# BOTIX phase index

| Phase | Canonical specification | Dependencies | Implementation | Status |
| --- | --- | --- | --- | --- |
| 1A | [Foundation](PHASE_1A_CODEX.md) | Brand handoff | Local `be26bbf`, `codex/phase-1a`; foundation included in GitHub `3846713` | Implemented; automated checks passed; included in 1B review branch |
| 1B | [Catalogue and conversion](PHASE_1B_CODEX.md) | Completed 1A | `codex/phase-1b`; [checklist](PHASE_1B_CHECKLIST.md) | Implemented; automated checks passed; browser acceptance outstanding |
| 1C | [Commercial readiness](PHASE_1C_CODEX.md) | Completed 1B e1a4e02 | `codex/phase-1c`; [checklist](PHASE_1C_CHECKLIST.md) | Implemented; 26 tests and 144-route checks passed; browser/owner launch gates remain |
| 1D | [Controlled release](PHASE_1D_CODEX.md) | Completed 1C 42d6e82 | `codex/phase-1d`; [checklist](PHASE_1D_CHECKLIST.md) | Implemented; 31 tests/144-route checks passed; full audit/browser/owner gates unresolved, NO-GO |
| 1E | [WHC deployment engineering](PHASE_1E_CODEX.md) | Completed 1D b4fd3cf | `codex/phase-1e`; [compatibility](WHC_COMPATIBILITY.md) | Implemented; 35 tests, 144-route production smoke and separately built preview artifact checks passed; host/browser/owner gates remain |
| 1F | [Protected staging](PHASE_1F_CODEX.md) | Completed 1E 24d232c | `codex/phase-1f`; [QA](PHASE_1F_QA.md), [acceptance](WHC_STAGING_ACCEPTANCE.md) | Staging authorized; security/CI/TLS gates passed and Linux artifact uploaded; credential handoff and hosted acceptance pending |

Universal lifecycle mapping: [framework mapping](UNIVERSAL_PHASE_MAPPING.md); mandatory operating instructions: [alignment](UNIVERSAL_FRAMEWORK_ALIGNMENT.md). Historical phase labels remain unchanged.

Owner reviews PRs before merge; deployment requires explicit authorization. See [governance](PHASE_GOVERNANCE.md), [implementation status](../IMPLEMENTATION_STATUS.md) and [owner actions](../OWNER_ACTIONS.md).
