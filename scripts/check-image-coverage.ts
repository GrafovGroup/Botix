import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import sitemap from '../src/app/sitemap';
import assets from '../src/lib/page-images.json';
const routes=sitemap().map(r=>new URL(r.url).pathname);
assert.equal(routes.length,144);
const files=new Set<string>(), hashes=new Set<string>();
for(const route of routes){
 const listed=assets.filter(a=>a.route===route);
 assert.equal(listed.length,route==='/en'||route==='/fr'?1:2,route);
 for(const image of listed){
  assert.ok(!files.has(image.src),`Reused placement: ${image.src}`);files.add(image.src);
  assert.ok(image.alt.length>15);assert.ok(existsSync('public'+image.src),`Missing ${image.src}`);
  const hash=createHash('sha256').update(readFileSync('public'+image.src)).digest('hex');
  assert.ok(!hashes.has(hash),`Duplicate image: ${image.src}`);hashes.add(hash);
 }
}
for(const locale of ['en','fr']){
 const file=`public/images/home-${locale}.webp`;
 const hash=createHash('sha256').update(readFileSync(file)).digest('hex');assert.ok(!hashes.has(hash));hashes.add(hash);
}
assert.equal(hashes.size,288);
console.log('PASS: 144 routes, 288 unique image placements including two original homepage heroes, no missing files or exact duplicates.');
