# Brand asset integration handoff

The approved visual direction is Signature black/white/silver. Actual approved vectors are absent; the current typographic BOTIX/X fallback remains in use. No reconstructed vector is represented as approved.

Owner deliverables:
- Original standalone wordmark and separate X mark, as SVG with viewBox and outlined paths (no external fonts, scripts or linked images).
- Light-on-dark and dark-on-light variants with explicit naming, intrinsic dimensions, clear-space and minimum-size rules.
- Favicon/app-icon exports and approved crop/safe area; a brand presentation board is not an icon or wordmark asset.
- Approval/date/version and rights to use; bilingual descriptor rules and trademark usage/clearance guidance.

Integrate reviewed files under public/brand/. Set the wordmark slot in src/lib/brand.ts with its local path and dimensions; Brand reserves dimensions and falls back to typography if the image fails. The separate mark slot is reserved for a future approved favicon/icon integration. Do not enable a slot until its file exists and is approved. Check header/footer contrast, 375/768/1440px sizing, accessible BOTIX name, broken-image fallback and keyboard navigation. Keep logo usage in the internal asset register. Brand symbols are interface identity assets; this does not authorize reuse of photographic placements.
