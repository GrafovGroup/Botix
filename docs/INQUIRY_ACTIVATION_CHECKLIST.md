# Inquiry activation checklist

Mailbox: **info@botix.ca**, owner confirmed receiving capability on 2026-10-22. This is not evidence of website-to-inbox delivery. Do not request spelling or basic availability again.

## Prepared locally

- Authenticated HTTPS receiver validates and durably accepts an idempotent record before returning 202; UI confirmation describes receipt for review, not confirmed mailbox delivery.
- Outbox and worker state are private directories outside every web root (0700), files 0600. Secrets are environment-only and never shell-evaluated.
- `receiver/mailbox.ts` prepares a fixed-recipient UTF-8 text notification, fixed sender/envelope, safe Reply-To, deterministic Message-ID and internal triage. No automatic reply to an unverified customer address.
- `scripts/mailbox-worker.ts` processes one named receipt only with `BOTIX_MAILBOX_SEND_AUTHORIZED=true`. It is never invoked by the website/build. Host-local `/usr/sbin/sendmail` uses an argument array and no shell. Verify WHC supports that executable and approves its envelope before use. Do not silently fall back to another provider.
- A retained exclusive lock prevents duplicate workers or retries after crash. Timeout/error after sending starts becomes `needs-reconciliation`. Local MTA acceptance is `submitted-to-local-mta`, never claimed as inbox receipt. Operator checks mailbox/message ID and bounce handling before retrying an uncertain send. Do not delete locks as a routine retry strategy.
- Synthetic tests inject a fake transport: no external email or customer data sent.

## Owner-authorized synthetic deployment and inbox verification (pending)

1. Obtain explicit authorization to configure the private receiver/transport on WHC and send synthetic EN/FR inquiries to **info@botix.ca**. No public delivery activation is implied.
2. Inspect actual host mail routing, local sendmail availability, DNS authentication and envelope policy read-only. Any needed DNS/email change requires its own authorization. Do not assume WHC hosts the mailbox.
3. Configure a private receiver endpoint with validated TLS and server-side auth. Owner enters any new credentials; keep them outside GitHub, browser logs and shell history. Add shared edge throttling and bounded connection/body timeouts. Limit who can access the queue; assign the responsible operator and approved retention policy.
4. Run one authorized synthetic record per intent/language using reserved `.invalid` sender addresses, never a real customer's data. Confirm receipt body, exact recipient, Reply-To, language, classification and Message-ID in the destination inbox. A server success code alone fails this gate. Verify duplicates do not resend and ambiguous failure is held for reconciliation. Record private message IDs privately; commit only redacted outcomes.
5. Check transport failure, queue age alerts, restart persistence, access permissions, backups, deletion/retention procedure and operator response coverage. Retention duration is owner policy, not an invented legal standard.
6. After inbox evidence, request separate explicit activation approval. Set delivery readiness evidence and secrets on the website, enable production delivery, redeploy only with approval, and verify a separately authorized synthetic browser submission end to end. Keep a reversible disable switch.

## Current status

Public delivery remains disabled. Receiver, sendmail worker and scheduler have not been installed/started on WHC. No external synthetic messages have been sent. Production continues serving Phase 2. Approved vector artwork remains an asset handoff, separate from mail activation.

## Authorized host inspection — 2026-10-23

Owner explicitly authorized secure receiver setup and a clearly labelled synthetic email to info@botix.ca. Public activation remains separate. WHC has /usr/sbin/sendmail available. Public and host DNS show MX `0 botix.ca.`; WHC Email list_pops for botix.ca returned only the account default user, not info@botix.ca. No domain mailbox directory was found. Intended mailbox provider clarification requested before sending; no email was sent and no DNS/email settings changed.
