# Internal asset usage register

Website: BOTIX.ca. Both assets were created specifically for this implementation with the built-in image generation tool on 2026-10-22. Generic unbranded robot designs; no manufacturer asset or completed-project representation. No external stock imagery.

| Asset | Source | Page / placement | Transformation |
| --- | --- | --- | --- |
| `public/images/home-en.webp` | Generated `exec-744242c8-5bbf-41dc-8da7-5d7b678eb328.png` | `/en` homepage hero only | WebP export, quality 88 |
| `public/images/home-fr.webp` | Generated `exec-ec88436e-2c44-41e6-8fde-b8e0b6a4b2d3.png` | `/fr` homepage hero only | WebP export, quality 88 |

Originals remain in `/Users/grafov/.codex/generated_images/01a16539-0af9-7373-b1fe-d60b972f5203/`. The project uses only the copied WebP files. Next Image responsive exports belong to the same single placement. Neither photo appears on category pages, location pages, cards, backgrounds elsewhere or social metadata.

The two source compositions were inspected: one robot has lowered arms and angular shoulder joints; the other has a bent arm, oval faceplate and illuminated ceiling. They are separate generations, not crops or recolourings. SHA-256 and perceptual comparison results are recorded in [asset-audit.json](asset-audit.json), with verification scope in [IMPLEMENTATION_STATUS.md](../IMPLEMENTATION_STATUS.md).

Code-drawn line icons, arrows and typographic wordmark are reusable interface symbols, not photography. No provisional vector logo files were available in the source repository.

Local cross-site audit: `scripts/audit-assets.py` screened 2,108 images in 10 neighbouring project directories, with no unreadable files and no exact duplicates. The closest dHash candidates for each asset were 13 bits away; visual inspection confirmed unrelated office-moving and reception-area scenes. Full results are in `docs/asset-audit.json`. The two BOTIX hero images were also visually compared and are distinct compositions. Remote-only or otherwise unavailable inventories are outside this audit; do not claim complete portfolio-wide verification.

## Phase 1B

No new photographic assets or manufacturer logos were added. Product cards use text and product galleries remain empty until rights-cleared assets are supplied. Each future gallery entry requires a locale, source, rights record and unique placement; update this register and rerun exact/visual duplicate checks before publishing media. The Phase 1A audit scope above is unchanged.
