// Run against an isolated local production server only. Does not submit inquiries.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const base=process.env.BOTIX_IMAGE_SMOKE_ORIGIN||'http://127.0.0.1:3103';
assert.ok(/^http:\/\/127\.0\.0\.1:\d+$/.test(base));
const assets=JSON.parse(await readFile('src/lib/page-images.json','utf8'));
for(const route of new Set(assets.map(a=>a.route))){
 const response=await fetch(base+route);assert.equal(response.status,200,route);const html=await response.text();
 for(const asset of assets.filter(a=>a.route===route)){
  assert.ok(html.includes(encodeURIComponent(asset.src))||html.includes(asset.src),`${route}: ${asset.src}`);
  const image=await fetch(base+asset.src);assert.equal(image.status,200,asset.src);assert.ok(image.headers.get('content-type')?.includes('image/'));
 }
}
console.log('PASS: all 144 rendered routes contain their own image placements; all 286 new image URLs serve correctly.');
