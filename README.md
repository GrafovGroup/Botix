# BOTIX.ca — Commercial Robotics

Bilingual Canadian B2B robotics site built with Next.js App Router, React, TypeScript and Tailwind CSS. English and Québec French live at `/en` and `/fr`; `/` redirects to `/en`.

## Run locally

Use Node.js 20.9+ (Node 24 tested) and pnpm 11.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:3000/en. Production checks:

```sh
pnpm test
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

For a local webhook test, set `SITE_URL=http://127.0.0.1:3000`; production canonical URLs default to `https://botix.ca`. Keep deployment-specific environment files out of Git.

## Architecture

- `src/lib/content.ts`: typed English/French page content, categories and FAQ.
- `src/lib/locations.ts`: 13 unique province/territory planning guides, with priority cities and nearby municipalities. `src/lib/cities.ts` adds 16 distinct metro/city guides with local operational considerations.
- `src/app/[locale]/[[...slug]]/page.tsx`: static page generation, locale validation, metadata and grounded structured data.
- `src/components`: reusable navigation, footer, homepage sections, inquiry form and verified catalog templates.
- `src/lib/catalog.ts`: product/manufacturer content models with source and approval gates. Six source-checked editorial examples and five manufacturer references are published; invalid/draft records remain excluded. Do not invent specifications, inventory or supplier relationships.
- `src/app/api/inquiry/route.ts`: server validation, same-origin check, 16 KiB request limit, signed timing challenge, honeypot, bounded in-memory attempt limiter and delivery adapter.
- `src/lib/journeys.ts`: five rental and eight industry paths, plus the service-robot hub.
- `/[locale]/robots`: server-rendered GET search, combined filters and sorting. `/[locale]/request-quote` preserves validated product, intent, city and use-case context; rental requests require ordered dates.
- `src/lib/analytics.ts`: consent-gated custom event hook; no external trackers or analytics IDs.
- `docs/ASSET_USAGE.md`: asset provenance, placement and uniqueness register.

## Inquiry delivery

Copy `.env.example` to `.env.local` and configure an owner-controlled HTTPS webhook plus bearer secret. The endpoint must return 2xx **only after durable acceptance**, respect the `Idempotency-Key` header, and protect personal information. Non-2xx, network failure, timeout or missing credentials never produce a success response. The form retains entries on errors and offers a phone fallback.

Set `INQUIRY_SIGNING_SECRET` to a stable random value of at least 32 bytes in shared deployment secrets. The local fallback is process-specific and is not suitable across replicas. Tokens require 2 seconds before submission and expire after 2 hours. A retry of the same form uses the same delivery key, allowing the receiver to deduplicate an uncertain network result.

The built-in limiter is process-local (five attempts per 10 minutes). Set `TRUST_PROXY=true` only when the hosting proxy overwrites `X-Forwarded-For`. For public multi-instance hosting, enforce shared IP rate limiting at the edge or add a shared limiter before enabling delivery. Without a trusted proxy the limiter is token-scoped; it is a basic development safeguard, not distributed abuse protection. No inquiry body is logged or stored by this application.

No live delivery service has been configured or tested. Tests use a mock accepting endpoint and exercise failure cases without sending personal information.

## Content and operating constraints

The standard phone placeholder is `(833) 696-9996`, linked as `tel:+18336969996`. Confirm ownership/routing or provide the project-specific number. No office addresses, customer logos, inventory, prices, partnerships, performance guarantees or completed deployment claims are fabricated.

Logo files described by the original brief were absent from the repository. The current header uses a typographic wordmark; the approved brand kit remains an owner input. Original generated photography is generic and unbranded. Internal provenance is never shown as customer-facing disclaimers.

See [implementation status](IMPLEMENTATION_STATUS.md), [owner actions](OWNER_ACTIONS.md), the [phase index and specifications](docs/PHASE_INDEX.md), [brand handoff](docs/BRAND.md), [asset register](docs/ASSET_USAGE.md) and [changelog](CHANGELOG.md). Deployment and DNS changes require owner authorization under the repository brief.
