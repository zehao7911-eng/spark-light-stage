import assert from 'node:assert/strict';import {ArtBank,ART_KEYS} from '../art.mjs';
const images=[],timers=[];class FakeImage{constructor(){images.push(this)}set src(v){this._src=v}get src(){return this._src}}
let updates=[];const clock={setTimeout(fn){timers.push(fn);return timers.length-1},clearTimeout(){}};let b=new ArtBank((k,v)=>updates.push(k),FakeImage,clock);
assert.equal(images.length,16);assert.ok(b.url('portrait_denny').startsWith('data:image/webp;base64,'));images[2].onload();assert.equal(updates.length,1);assert.equal(b.url(ART_KEYS[2]),`assets/${ART_KEYS[2]}.webp`);
for(let t of timers)t();await b.ready;assert.ok(b.errors.size>0);images[0].onload();assert.equal(updates.length,2);assert.equal(b.errors.has(ART_KEYS[0]),false);assert.equal(b.url(ART_KEYS[0]),`assets/${ART_KEYS[0]}.webp`);images[1].onerror();assert.ok(b.url(ART_KEYS[1]).startsWith('data:'));console.log('PASS real-art bootstrap, independent arrival, slow timeout and late recovery.');
