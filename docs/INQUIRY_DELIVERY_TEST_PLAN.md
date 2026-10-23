# BOTIX — Safe Inquiry Delivery Preparation and Synthetic Testing

## Confirmed destination
The owner confirmed **info@botix.ca** as the intended BOTIX inquiry mailbox on 2026-10-22. This supersedes the earlier unconfirmed typo `into@botix.ca`. Do not change it without owner instruction.

## Objective
Prepare and test a secure, durable inquiry delivery workflow for the existing BOTIX production application without activating real customer submissions.

## Engineering instructions
1. Inspect actual deployed code SHA and `codex/production-deployment`, existing form, API, webhook adapter, delivery gates, and branch/PR structure. Preserve all existing work.
2. Implement a configurable receiver integration that can route verified purchase, rental, demonstration, pilot/integration and general inquiries to `info@botix.ca`. Prefer owner-controlled existing infrastructure and no paid services. Do not assume WHC SMTP credentials or mailbox access are available.
3. Ensure server-side validation, consent, spam controls, rate limiting, TLS, durable acceptance, idempotency and safe retry. Success must mean receiver acceptance, not merely an email send attempt. Never commit passwords, SMTP keys, tokens or personally identifying lead data.
4. Build a local synthetic receiver harness and tests for acceptance, retry, duplicate, timeout, invalid fields, unavailable delivery, and English/French context. Use synthetic names/addresses and offline tests; do not send test emails externally unless the owner explicitly authorizes a mailbox test.
5. Keep production delivery disabled by default. Do not modify WHC, DNS, public website or live environment until an authorized deployment and receiver test.
6. Document secure receiver setup, mailbox ownership verification, routing/forwarding, reply-to behavior, spam handling, retention, logging, access control, error alerts and how to verify receipt at `info@botix.ca`.
7. Run tests, lint, typecheck, build and dependency audit; record actual results. Update `IMPLEMENTATION_STATUS.md`, `OWNER_ACTIONS.md`, `docs/PHASE_INDEX.md` and changelog on the implementation branch. Open a PR for review; no merge or deployment without authorization.
8. Follow `docs/UNIVERSAL_FRAMEWORK_ALIGNMENT.md`; keep phase naming consistent with the universal framework. The existing `docs/PHASE_2B_COMMERCIAL_ACTIVATION.md` is a historical specification label, not evidence that universal Phase 2A was skipped in substance. Avoid duplicating existing catalogue work.

## Acceptance
- Exact destination `info@botix.ca` configured in safe templates and verified in unit/synthetic tests.
- No real customer email sent and no live inquiry delivery activated.
- End-to-end external mailbox receipt remains an explicitly pending verification step.
- Report what customers can do, what's blocked and genuine owner decisions in plain business language.
