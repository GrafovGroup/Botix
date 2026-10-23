"""Recover per-image tool receipts into the durable local asset mapping."""
from pathlib import Path
import json
import re
import shutil

root = Path(__file__).resolve().parents[1] / 'artifacts/phase3'
manifest = root / 'generated-results.json'
results = json.loads(manifest.read_text())
done = {row['id'] for row in results}
for receipt in sorted(root.glob('*-result.json')):
    row = json.loads(receipt.read_text())
    paths = re.findall(r'/Users/\S+/exec-\S+\.png', row.get('output_hint', ''))
    source = Path(paths[-1]) if paths else None
    if source and source.is_file() and row['id'] not in done:
        target = root / 'originals' / (row['id'] + '.png')
        target.parent.mkdir(exist_ok=True)
        shutil.copy2(source, target)
        results.append({'id': row['id'], 'path': str(target), 'generatedSource': str(source)})
        done.add(row['id'])
temporary = manifest.with_suffix('.tmp')
temporary.write_text(json.dumps(results, indent=2) + '\n')
temporary.replace(manifest)
print(f'{len(results)} original sources recorded; visual review still required for new receipts.')
