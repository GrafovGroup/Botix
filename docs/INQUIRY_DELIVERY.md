# Inquiry delivery contract and local verification

The adapter POSTs JSON over HTTPS to an owner-controlled endpoint. Redirects fail. Authorization is `Bearer <INQUIRY_WEBHOOK_SECRET>`; `Idempotency-Key` is a stable HMAC of the signed form challenge. Payload fields include source, submittedAt, locale, intent, category/product, useCase, dates, business/contact/location, quantity, timeline, budget, details and contact consent. Honeypot and challenge token are excluded. Optional analytics consent is never part of the lead payload.

Return 2xx **only after durable acceptance**. Authenticate before processing, validate/limit inputs, persist to an access-controlled queue/database before responding, and route to the owner's CRM/email workflow. Apply a unique constraint to the delivery key: retries with the same normalized payload return the original acknowledgement without a second record. Exclude submittedAt from retry comparison; the sender recreates it. A reused key with changed payload should return 409 rather than silently replace a lead. Let the visitor reload the form for a genuinely new submission. Keep deduplication records for at least the two-hour challenge window plus the receiving workflow's retry/reconciliation interval, under the approved retention policy.

No 2xx acknowledgement is accepted by the app as proof of email reading or customer response. It means the configured receiver accepted the lead durably under this contract. The application cannot independently inspect receiver persistence, hence the required owner end-to-end verification. Non-2xx/network/10-second timeout yields failure and retains form values; a timed-out request may already have been accepted, so retry with the same key. Rotating the signing secret invalidates outstanding challenges; plan a controlled rotation and reconcile uncertain deliveries first.

## Configuration

Export environment settings from .env.example through a secret manager; never put secrets in NEXT_PUBLIC values. Both secrets must be at least 32 characters (generate at least 32 random bytes). All modes require INQUIRY_DELIVERY_ENABLED=true, a valid HTTPS URL and both secrets. Production additionally needs explicit SITE_ENV=production, HTTPS SITE_URL and receiver/edge attestations. Keep delivery disabled until approved. `pnpm delivery:check` audits production gates without transmitting anything and outputs names of missing settings only. Attestations document human verification; they do not install an edge limiter or receiver.

The token/attempt limiter is process-local. Configure shared edge protection independently and ensure the trusted proxy overwrites forwarded IP headers. No challenge, secret, lead body or personal data should be logged. Limit staff access and define retention, deletion, supplier-sharing and incident practices before production acceptance.

## Synthetic local harness

Run `pnpm delivery:test`. It uses `receiver.invalid`, injected transport, synthetic `.invalid` contacts and a temporary receiver store; no external fetch occurs. It verifies persistence-before-acknowledgement, identical-retry deduplication, changed-payload conflict, non-2xx and thrown network failure. Temporary records are deleted on completion. This is adapter/contract coverage, not a TLS, CRM or browser test.

Run `pnpm dev` with delivery disabled, then `node scripts/smoke-test.mjs` for route/API cases. The smoke runner refuses an enabled delivery endpoint. Real destination tests require owner authorization and synthetic fixtures. Verify accepted record, downstream routing, access controls, failure behavior and duplicate handling, then record evidence in LAUNCH_CHECKLIST.md before setting production attestations.

## Visitor fallback

Without a verified public phone, no placeholder tel link or telephone structured data is emitted. Visitors can download their current brief locally; this is not a submission or confirmation. Downloads contain their entered contact information, remain on their own device and are not sent to analytics. Form state is not stored in browser storage. Normal workflow/language clicks on the main quote page carry current project context, including typed dates/use case, into the destination URL. Contact name, company, email and phone never enter navigation URLs. Other navigation and modified/new-tab clicks retain only query-prefilled context; unsaved contact fields can be discarded. Optional analytics consent defaults off on each form mount and can be revoked by unchecking it.

Preview mode prohibits delivery regardless of receiver settings. The local HTTP release harness clears receiver settings and uses same-origin loopback requests. Forwarded IPs are ignored when TRUST_PROXY is false; when true, only syntactically valid IPs become separate buckets, and malformed/missing values share an unknown bucket. This parsing is not authentication: the actual ingress must overwrite forwarded headers and enforce shared limits.
