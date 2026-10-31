import {BOOTSTRAP} from './bootstrap.mjs?v=1';
export const ART_KEYS=[...Object.keys(BOOTSTRAP),'zombie_basic_walk','zombie_cone_walk','zombie_bucket_walk','zombie_boss_walk'];
export class ArtBank{
 constructor(onArt=()=>{},ImageType=globalThis.Image,clock=globalThis){this.full={};this.small={};this.onArt=onArt;this.errors=new Set();this.ImageType=ImageType;this.clock=clock;for(let [k,url]of Object.entries(BOOTSTRAP)){let i=new ImageType();i.onload=()=>{this.small[k]=i;this.onArt(k,url)};i.src=url}this.ready=this.load()}
 url(k){return this.full[k]?.src||BOOTSTRAP[k]||''}
 img(k){return this.full[k]||this.small[k]}
 load(){return Promise.all(ART_KEYS.map(k=>new Promise(resolve=>{let i=new this.ImageType(),done=false;const end=()=>{if(done)return;done=true;this.clock.clearTimeout(timer);resolve()};let timer=this.clock.setTimeout(()=>{this.errors.add(k);end()},10000);i.onload=()=>{this.full[k]=i;this.errors.delete(k);this.onArt(k,i.src);end()};i.onerror=()=>{this.errors.add(k);end()};i.src='assets/'+k+'.webp'})))}
}
