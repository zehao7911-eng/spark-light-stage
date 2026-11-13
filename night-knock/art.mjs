import {BOOTSTRAP} from './bootstrap.mjs?v=1';
export const ART_KEYS=Object.keys(BOOTSTRAP);
export class ArtBank{
 constructor(onArt=()=>{},ImageType=globalThis.Image,clock=globalThis){this.full={};this.errors=new Set();this.onArt=onArt;this.ImageType=ImageType;this.clock=clock;this.ready=this.load()}
 url(key){return this.full[key]||BOOTSTRAP[key]||''}
 load(){return Promise.all(ART_KEYS.map(key=>new Promise(resolve=>{let im=new this.ImageType(),done=false;const end=()=>{if(done)return;done=true;this.clock.clearTimeout(timer);resolve()};let timer=this.clock.setTimeout(()=>{this.errors.add(key);end()},10000);im.onload=()=>{this.full[key]=im.src;this.errors.delete(key);this.onArt(key,im.src);end()};im.onerror=()=>{this.errors.add(key);end()};im.src=`assets/${key}.webp`})))}
}
