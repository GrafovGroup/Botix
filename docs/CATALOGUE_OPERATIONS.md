# Catalogue editorial workflow

The source of truth is src/lib/catalog.ts. There is no public admin panel. Edit through a feature branch and reviewed PR; keep private supplier contracts and license documents in owner-controlled storage, not this public repository. Use a public-safe evidence reference and approved description where a field is rendered publicly.

## Publication states and review responsibilities

| Field | Editorial requirement |
| --- | --- |
| publication | draft is excluded from public lists/routes/sitemap. editorial is a source-verified reference only; verified still does not enable online sales. |
| evidence / facts[].evidence | HTTPS primary source, actual review date (no future dates), explicit approval after a human checks the exact model/edition. Review source and translations together. |
| availability | not-confirmed until evidence establishes an approved current claim. Editorial references cannot carry verified availability. Never infer Canadian stock from a manufacturer's catalogue. |
| inquiryOptions / flags.inquiries | Enable only relevant purchase/rental/pilot inquiry paths. This requests feasibility, not supply, booking or inventory. Turn inquiries off when the model should only be referenced. |
| manufacturer.relationship | not-confirmed by default. A verified relationship needs an approved public description and dated evidence; product fact verification is not reseller authorization. Current UI does not advertise relationship claims automatically. |
| media | Local image path, EN/FR alt text, locale, source, owned/licensed/written-permission rights, rights record, unique placement. Separate images per locale/placement. No asset until rights and duplicate checks pass. |
| bilingual copy | Exact units/model distinctions, useful benefits without guarantees, practical applications, SEO and alt text in English and Québec French. |

Editorial owner checks primary documents and licensing. A second reviewer checks translations, claims, publication state and rendered routes. Business owner approves availability/relationships. Record review decisions in the PR with source links/date and any expiry/recheck trigger. Do not paste confidential agreements into a PR.

## Worked example: adding a product safely

1. Branch from current implementation. Copy an existing record as a **draft**, with a new slug. Clear inherited approvals and media. A temporary research copy must not become a published claim:

```ts
const candidate = structuredClone(products[0]);
candidate.slug = "research-candidate";
candidate.publication = "draft";
candidate.flags = { featured: false, inquiries: false };
candidate.availability = { status: "not-confirmed" };
candidate.evidence.approvedForPublication = false;
candidate.facts = [];
candidate.media = [];
```

2. Replace all copied names, manufacturer, descriptions, taxonomy, SEO and source data with the actual candidate. Draft copying is only a starting structure; never approve inherited facts for a different model. Add verified manufacturer data first if needed. For each specification, record the original primary URL, exact edition/variant, actual checkedOn date, translated label/value and approval decision. Do not invent facts to fill a table; an empty facts array renders no table.
3. Keep `availability: {status: "not-confirmed"}` and `relationship: {status: "not-confirmed"}` unless the owner provides separately verified evidence. Select relevant inquiry options; enable inquiries only after editorial approval.
4. For images, obtain license/permission and unique source per placement. Save optimized media under public/images/, fill media schema, update ASSET_USAGE.md, run exact and visual duplicate checks against current and accessible other-site assets. Report unavailable inventories internally. Until then retain the text-only product presentation.
5. Set publication to editorial only after the whole record and facts are source-checked and approved. Use verified only for owner-approved commercial content; the site remains inquiry-only. Run commands below, inspect both locale routes and include evidence in the PR. Merge/deployment still require authorization.

## Read-only import validation

An external JSON candidate must be `{ "products": [...], "manufacturers": [...] }` using the same full schema; include every referenced manufacturer. Run:

```sh
pnpm catalog:check
pnpm catalog:check /absolute/path/catalogue-candidate.json
pnpm test
pnpm lint
pnpm build
pnpm typecheck
```

Validation never writes/imports the file. It checks schema, duplicate identifiers/placements, approved publication facts, future dates, manufacturer references, relationship evidence, media paths, and source reviews older than 180 days for published records. Correct failures before manually incorporating approved changes into src/lib/catalog.ts. Drafts may remain incomplete in research notes but must satisfy structural schema when added to the repository registry. Published source review expiry fails the release command; the website does not silently remove records overnight. Schedule review at least every six months and sooner for specification, license, supplier or availability changes. This policy is operational, not a manufacturer freshness guarantee.

## Corrections and withdrawal

If a claim is unsupported, change publication to draft immediately on a corrective branch and disable inquiries; rerun sitemap/route tests and seek release approval. Do not merely hide the card while leaving its route active. If only the relationship/availability is uncertain, revert the claim to not-confirmed and remove any public copy implying it. Recheck related links and translated text. Preserve the source history and correction reason in the PR; do not erase audit history.
