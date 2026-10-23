"""Optimize original generated images and produce an internal provenance register."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json, hashlib
root=Path(__file__).resolve().parents[1]
plan=json.loads((root/'artifacts/phase3/image-plan.json').read_text())
results=json.loads((root/'artifacts/phase3/generated-results.json').read_text())
byid={r['id']:r for r in results}
assets=json.loads((root/'src/lib/page-images.json').read_text())
metadata={a['id']:a for a in assets}
register_path=root/'docs/page-image-register.json'
previous={a['id']:a for a in json.loads(register_path.read_text())} if register_path.exists() else {}
register=[]
for row in plan:
 if row['id'] not in byid: continue
 result=byid[row['id']]
 source=Path(result['path']);target=root/'public'/row['src'].lstrip('/')
 target.parent.mkdir(parents=True,exist_ok=True)
 source_hash=hashlib.sha256(source.read_bytes()).hexdigest()
 cached=previous.get(row['id'],{})
 if target.exists() and cached.get('sourceSha256')==source_hash and cached.get('sha256')==hashlib.sha256(target.read_bytes()).hexdigest():
  width,height=cached['width'],cached['height']
 else:
  with Image.open(source) as im:
   im=ImageOps.exif_transpose(im).convert('RGB');im.thumbnail((1536,1024));im.save(target,'WEBP',quality=81,method=6)
   width,height=im.size
 provenance=dict(row)
 if result.get('review'):
  provenance['placementBrief']=provenance.pop('prompt')
  provenance['originalPromptStatus']='Unavailable for recovered image; placement brief is not the original generation prompt.'
  provenance['visualReview']=result['review']
 register.append({**provenance,'alt':metadata[row['id']]['alt'],'source':str(source),'sourceSha256':source_hash,'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'width':width,'height':height,'bytes':target.stat().st_size,'generator':'built-in image_gen','website':'botix.ca'})
(root/'docs/page-image-register.json').write_text(json.dumps(register,ensure_ascii=False,indent=2)+'\n')
proof=root/'artifacts/phase3/contact-sheets';proof.mkdir(exist_ok=True)
for start in range(0,len(register),24):
 subset=register[start:start+24];sheet=Image.new('RGB',(1440,1200),'white');d=ImageDraw.Draw(sheet)
 for i,r in enumerate(subset):
  im=Image.open(root/'public'/r['src'].lstrip('/'));im.thumbnail((350,165));x=(i%4)*360;y=(i//4)*200;sheet.paste(im,(x,y));d.text((x+4,y+168),r['id'][:49],fill='black')
 sheet.save(proof/f'{start//24+1:02}.jpg',quality=88)
print(json.dumps({'images':len(register),'total_bytes':sum(r['bytes'] for r in register),'largest_bytes':max(r['bytes'] for r in register)}))
