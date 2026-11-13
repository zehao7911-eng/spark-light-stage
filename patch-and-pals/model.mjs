export const JOBS = [
 ['Poppy','The hedge explorer',0,['twig'],.64,0],
 ['Miso','A very sticky picnic',1,['burr','ribbon'],.72,1],
 ['Sprig','A tumble in the garden',2,['spring','twig'],.66,2],
 ['Clover','The kite collector',0,['ribbon','ribbon','burr'],.76,2],
 ['Biscuit','Under the sofa',1,['spring','button','twig'],.68,0],
 ['Moss','A brambly adventure',2,['burr','burr','spring'],.78,1],
 ['Peaches','One last puddle',0,['twig','spring','ribbon','burr'],.7,1],
 ['Crumpet','The button hunter',1,['button','spring','ribbon','button'],.75,2],
 ['Fern','Ready for another story',2,['spring','burr','ribbon','twig'],.8,0]
].map((j,i)=>({id:i,name:j[0],story:j[1],animal:j[2],items:j[3],target:j[4],patch:j[5]}));
export const POINTS = [[119,286],[235,293],[167,346],[211,351]];
export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function create(job=0){return {version:1,job:clamp(Math.floor(job),0,8),stage:'pluck',removed:[],fill:.18,patchProgress:0,quality:0,overs:0,pulls:0,cuddles:0,finished:false};}
export function items(s){return JOBS[s.job].items.map((type,i)=>({id:i,type,x:POINTS[i][0],y:POINTS[i][1],length:type==='ribbon'?80:type==='spring'?64:47}));}
export function pull(s,id,dx,dy){
 if(s.stage!=='pluck'||!Number.isInteger(id)||s.removed.includes(id))return false;
 const it=items(s)[id];if(!it||![dx,dy].every(Number.isFinite))return false;
 if(Math.hypot(dx,dy)<it.length)return false;
 s.removed.push(id);s.pulls++;
 if(s.removed.length===items(s).length)s.stage='puff';
 return true;
}
export function pump(s,dt){if(s.stage!=='puff'||!Number.isFinite(dt)||dt<=0)return false;s.fill=clamp(s.fill+Math.min(dt,.1)*.23,.18,1);return true;}
export function releasePump(s){if(s.stage!=='puff')return 'ignored';const t=JOBS[s.job].target;if(s.fill<t-.075)return 'more';if(s.fill<=t+.12){s.stage='patch';s.quality++;return 'perfect';}s.fill=.3;s.overs++;return 'puff';}
export function placePatch(s,x,y){if(s.stage!=='patch'||![x,y].every(Number.isFinite))return false;if(Math.hypot(x-180,y-325)>45)return false;s.stage='stitch';s.patchProgress=0;return true;}
export function step(s,dt){if(s.stage!=='stitch'||!Number.isFinite(dt)||dt<=0)return false;s.patchProgress=clamp(s.patchProgress+Math.min(dt,.1)/1.6,0,1);if(s.patchProgress===1){s.stage='done';s.finished=true;return true;}return false;}
export function stars(s){return s.finished?2+(s.overs===0?1:0):0;}
export function finish(s,book){if(!s.finished)return false;book[s.job]=Math.max(book[s.job]||0,stars(s));return true;}
export function restore(raw){
 try {const a=typeof raw==='string'?JSON.parse(raw):raw;if(!a||a.version!==1||!Number.isInteger(a.job)||a.job<0||a.job>8)return null;
 if(!['pluck','puff','patch','stitch','done'].includes(a.stage))return null;
 const n=JOBS[a.job].items.length;if(!Array.isArray(a.removed)||new Set(a.removed).size!==a.removed.length||a.removed.some(i=>!Number.isInteger(i)||i<0||i>=n))return null;
 if(a.stage!=='pluck'&&a.removed.length!==n)return null;if(a.stage==='pluck'&&a.removed.length===n)return null;
 for(const k of ['fill','patchProgress','quality','overs','pulls','cuddles'])if(!Number.isFinite(a[k])||a[k]<0)return null;
 if(a.fill<.18||a.fill>1||a.patchProgress>1||a.overs>10000||a.cuddles>10000||a.pulls!==a.removed.length)return null;
 if((a.stage==='done')!==a.finished||a.stage==='done'&&a.patchProgress!==1)return null;
 return JSON.parse(JSON.stringify(a));
 }catch{return null;}
}
