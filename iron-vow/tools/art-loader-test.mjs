import assert from 'node:assert/strict';
import {Battlefield} from '../art.mjs';
const original={Image:globalThis.Image,setTimeout:globalThis.setTimeout,clearTimeout:globalThis.clearTimeout};
let instances=[],timers=[],repaints=0;
try{
 globalThis.Image=class{constructor(){instances.push(this)}set src(v){this.url=v}get src(){return this.url}};
 globalThis.setTimeout=fn=>{let t={fn,cancelled:false};timers.push(t);return t};globalThis.clearTimeout=t=>{t.cancelled=true};
 let view=new Battlefield({getContext:()=>({})});view.onArt=()=>repaints++;
 let small=instances.filter(x=>x.url.startsWith('data:')),full=instances.filter(x=>!x.url.startsWith('data:'));
 assert.equal(small.length,12);assert.equal(full.length,12);
 small.forEach(x=>x.onload());assert.equal(Object.keys(view.small).length,12);assert.equal(repaints,12);for(let boss of [0,1])for(let pose of ['idle','windup','attack','stunned'])assert.ok(view.small[`boss-${boss}-${pose}`]);
 full[0].onload();assert.ok(view.images['arena-castle']);assert.equal(Object.keys(view.images).length,1);
 // All other full-size resources take more than ten seconds. First paint still has real art.
 for(let t of timers)if(!t.cancelled)t.fn();await view.ready;assert.equal(view.errors.length,11);assert.equal(Object.keys(view.small).length,12);
 let late=full.find(x=>x.url.endsWith('boss-0-windup.webp'));late.onload();assert.ok(view.images['boss-0-windup']);assert.equal(view.errors.length,10);
 // Images arriving after the timeout remain accepted and repaint the scene.
 for(let im of full)im.onload();assert.equal(Object.keys(view.images).length,12);assert.equal(view.errors.length,0);assert.ok(repaints>=25);
 console.log('PASS art loading: embedded first paint, independent progressive arrivals, bounded timeout, late-image recovery and repaint.');
}finally{if(original.Image===undefined)delete globalThis.Image;else globalThis.Image=original.Image;globalThis.setTimeout=original.setTimeout;globalThis.clearTimeout=original.clearTimeout}
