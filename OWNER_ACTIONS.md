# BOTIX — current owner checklist

Updated 2026-10-22. Staging is already authorized. The protected staging application is running and its 144-route HTTP acceptance passed. Production launch was authorized and completed at https://botix.ca; focused desktop/mobile and public 144-route checks passed. See docs/PRODUCTION_DEPLOYMENT.md. Technical work and test evidence belong to Codex; see [staging acceptance](docs/WHC_STAGING_ACCEPTANCE.md) and [framework mapping](docs/UNIVERSAL_PHASE_MAPPING.md).

## 1. Finish staging credential handoff — needed now

- [x] cPanel confirmed the owner saved the password for staging user `botix` on 2026-10-22. Keep it in your password manager; never paste it into chat or GitHub.
- [x] Owner saved the staging application credential. Both authentication layers now accept it after correcting the WHC launcher; no further password change is needed.

No additional staging approval or hosting purchase is requested. Codex then completes runtime setup, authenticated EN/FR checks, mobile/desktop visual and keyboard checks, performance and restart/restore verification, and presents the actual preview.

## 2. Remaining business and brand inputs

- [ ] Supply approved BOTIX Signature vector files and approve the visual preview. The typographic fallback remains until actual approved assets arrive; see [brand asset handoff](docs/BRAND_ASSETS.md).
- [ ] Verify `(833) 696-9996` routes to BOTIX, or provide the project-specific number. Until then it stays out of public links and structured data.
- [x] Intended inquiry mailbox confirmed as **info@botix.ca**.
- [ ] Verify mailbox ownership and approve secure receiver/mailbox infrastructure, responsible recipients and retention/access rules; then separately authorize a synthetic mailbox test. Private durable receiver and offline tests are prepared in Phase 2. Live activation remains separate.
- [ ] Confirm operating entity, privacy contact, actual providers/processing practices and business scope; obtain appropriate privacy/terms and trademark review. No legal clearance is claimed.
- [ ] Review editorial product references; supply evidence for any supplier relationship, rental availability, inventory or licensed media to be added. Existing content does not assert dealership or stock.

## 3. Review the live release

- [ ] Approve the customer-facing design and business content following the real preview.
- [x] Production launch authorized by “make the site live” and verified at botix.ca.
- [ ] Review the stacked PRs before separate merge authorization. Live inquiry delivery requires a verified receiving workflow and explicit enablement approval.

Codex owns remaining hosting, security, browser, accessibility, performance, monitoring and rollback work. Do not return routine technical checks to the owner as manual tasks. Email/DNS changes, purchases and live inquiry delivery were not part of this production deployment.

## Asset inventory limitation

The existing image audit covered 2,108 locally available images across 10 other project directories. Remote-only or inaccessible inventories were not verified. No new imagery is introduced by framework alignment; maintain [ASSET_USAGE.md](docs/ASSET_USAGE.md) for future changes.

## Combined Phase 2 review

Repository implementation is prepared in `codex/phase-2-combined`; see [status](docs/PHASE_2_COMBINED_STATUS.md). Review before separately authorizing deployment. No new staging app, live email, DNS change, purchase or merge was performed.
