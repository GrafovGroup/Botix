"""Import durable image_gen receipts without losing existing provenance.

Run with --watch while generating. Originals remain outside the public tree;
only optimized WebP copies are served. Pillow is required, as for the existing
prepare-page-images.py workflow. Every import updates the register atomically.
"""
import argparse
import hashlib
import json
from pathlib import Path
import time

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
RECEIPTS = ROOT / "artifacts/phase3"
REGISTER = ROOT / "docs/page-image-register.json"


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def import_receipts():
    assets = {a["id"]: a for a in json.loads((ROOT / "src/lib/page-images.json").read_text())}
    entries = {a["id"]: a for a in json.loads(REGISTER.read_text())}
    changed = 0
    for file in sorted(RECEIPTS.glob("*-cloud-result.json")):
        receipt = json.loads(file.read_text())
        asset = assets[receipt["id"]]
        source = Path(receipt["path"])
        target = ROOT / "public" / asset["src"].lstrip("/")
        source_hash = digest(source)
        previous = entries.get(asset["id"], {})
        if target.exists() and previous.get("sourceSha256") == source_hash:
            assert previous["sha256"] == digest(target), f"Changed asset: {target}"
            continue
        assert not target.exists(), f"Refusing to overwrite an existing asset: {target}"
        target.parent.mkdir(exist_ok=True, parents=True)
        with Image.open(source) as image:
            image = ImageOps.exif_transpose(image).convert("RGB")
            image.thumbnail((1536, 1024))
            image.save(target, "WEBP", quality=81, method=6)
            width, height = image.size
        entries[asset["id"]] = {
            **asset, "prompt": receipt["prompt"], "source": str(source),
            "sourceSha256": source_hash, "sha256": digest(target),
            "width": width, "height": height, "bytes": target.stat().st_size,
            "generator": "built-in image_gen", "website": "botix.ca",
            "visualReview": "Pending contact-sheet review in the cloud completion run.",
        }
        changed += 1
    if changed:
        temporary = REGISTER.with_suffix(".tmp")
        temporary.write_text(json.dumps(list(entries.values()), ensure_ascii=False, indent=2) + "\n")
        temporary.replace(REGISTER)
    missing = sum(not (ROOT / "public" / a["src"].lstrip("/")).exists() for a in assets.values())
    return changed, missing


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--watch", action="store_true")
    args = parser.parse_args()
    while True:
        changed, missing = import_receipts()
        if changed or not args.watch:
            print(json.dumps({"imported": changed, "missing": missing}), flush=True)
        if not args.watch or not missing:
            break
        time.sleep(3)
