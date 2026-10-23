"""Compare BOTIX photography with locally available website image assets."""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib, json, os
root = Path(__file__).resolve().parents[1]
scan = root.parent
skip = {'node_modules', '.git', '.next', '.cache', '.pnpm', '__pycache__'}
def signature(path):
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im).convert('L').resize((9,8))
        a = list(im.getdata())
        return sum((a[y*9+x] > a[y*9+x+1]) << (y*8+x) for y in range(8) for x in range(8))
targets = list((root/'public/images').glob('*.webp'))
records = {p.name:{'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'dhash':signature(p),'closest':[]} for p in targets}
count=0; unreadable=[]; projects=set()
for directory, dirs, files in os.walk(scan):
    dirs[:] = [d for d in dirs if d not in skip]
    for name in files:
        path=Path(directory)/name
        if path in targets or path.suffix.lower() not in {'.jpg','.jpeg','.png','.webp'}:continue
        try:
            sig=signature(path); digest=hashlib.sha256(path.read_bytes()).hexdigest()
        except Exception:
            unreadable.append(str(path.relative_to(scan)));continue
        count+=1;projects.add(path.relative_to(scan).parts[0])
        for record in records.values():
            distance=(record['dhash']^sig).bit_count()
            record['closest'].append({'file':str(path.relative_to(scan)),'distance':distance,'exact':digest==record['sha256']})
            record['closest']=sorted(record['closest'],key=lambda x:x['distance'])[:5]
for record in records.values():record['dhash']=f"{record['dhash']:016x}"
result={'scope':str(scan),'compared_images':count,'projects':sorted(projects),'unreadable':unreadable,'assets':records,'notes':'dHash is candidate screening, not proof of visual uniqueness. Remote-only inventories are outside scope.'}
(root/'docs/asset-audit.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
