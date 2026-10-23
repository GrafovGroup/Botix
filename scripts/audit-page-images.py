"""Exact + perceptual candidate screening, all BOTIX placements and accessible neighbouring sites."""
from pathlib import Path
from PIL import Image,ImageOps
import hashlib,json,os
root=Path(__file__).resolve().parents[1]
skip={'node_modules','.git','.next','.cache','.pnpm','__pycache__','artifacts'}
def fingerprint(p):
 with Image.open(p) as im:
  a=list(ImageOps.exif_transpose(im).convert('L').resize((9,8)).getdata())
  return sum((a[y*9+x]>a[y*9+x+1])<<(y*8+x) for y in range(8) for x in range(8))
paths=sorted((root/'public/images').rglob('*.webp'))
records=[{'file':str(p.relative_to(root)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'dhash':fingerprint(p)} for p in paths]
within=[]
for i,a in enumerate(records):
 for b in records[i+1:]:
  distance=(a['dhash']^b['dhash']).bit_count()
  if distance<=8 or a['sha256']==b['sha256']:within.append({'a':a['file'],'b':b['file'],'distance':distance,'exact':a['sha256']==b['sha256']})
external=[];errors=[];count=0;projects=set()
for directory,dirs,files in os.walk(root.parent):
 dirs[:]=[d for d in dirs if d not in skip and Path(directory)/d!=root]
 for name in files:
  p=Path(directory)/name
  if p.suffix.lower() not in {'.jpg','.jpeg','.png','.webp'}:continue
  try: sig=fingerprint(p);digest=hashlib.sha256(p.read_bytes()).hexdigest()
  except Exception:errors.append(str(p));continue
  count+=1;projects.add(p.relative_to(root.parent).parts[0])
  for r in records:
   distance=(r['dhash']^sig).bit_count()
   if distance<=6 or digest==r['sha256']:external.append({'a':r['file'],'b':str(p.relative_to(root.parent)),'distance':distance,'exact':digest==r['sha256']})
result={'images':len(records),'within_site_candidates':within,'external_candidates':external,'external_images_screened':count,'projects':sorted(projects),'unreadable':errors,'scope':'Accessible local sibling projects only; remote-only inventories unavailable. Perceptual matches require visual review; low distance is not proof of reuse.'}
(root/'docs/phase3-image-audit.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
