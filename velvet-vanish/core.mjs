export const SHOWS=[
 {name:'The first little secret',rounds:3,swaps:2,speed:1.05,venue:0,kind:0,prize:'A stolen star'},
 {name:'A twist of the wrist',rounds:3,swaps:3,speed:.96,venue:0,kind:1,prize:'The brass key'},
 {name:'Cross my hands',rounds:4,swaps:4,speed:.9,venue:1,kind:2,prize:'A little moon'},
 {name:'The double take',rounds:4,swaps:5,speed:.85,venue:1,kind:3,prize:'The scarlet rose'},
 {name:'After the applause',rounds:4,swaps:6,speed:.8,venue:2,kind:4,prize:'A pocket planet'},
 {name:'The grand disappearance',rounds:5,swaps:7,speed:.75,venue:2,kind:5,prize:'The last diamond'}
];
export const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
const int=(n,a,b)=>Number.isInteger(n)&&n>=a&&n<=b;
export function stars(p){return p.best.reduce((a,b)=>a+b,0);}
export function fresh(){return{best:Array(6).fill(0),collection:Array(6).fill(false),photos:Array(6).fill(''),rewards:{like:false,comment:false},settings:{sound:true,light:false,gentle:false},coat:0,kit:0,serial:0};}
export function clean(raw){let p=fresh();if(!raw||typeof raw!=='object')return p;for(let i=0;i<6;i++){p.best[i]=int(raw.best?.[i],0,3)?raw.best[i]:0;p.collection[i]=raw.collection?.[i]===true||p.best[i]>0;}for(let i=0;i<6;i++){let s=raw.photos?.[i];if(typeof s==='string'&&s.length<55000&&/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(s))p.photos[i]=s;}for(let k of ['like','comment'])p.rewards[k]=raw.rewards?.[k]===true;for(let k of ['sound','light','gentle'])if(typeof raw.settings?.[k]==='boolean')p.settings[k]=raw.settings[k];p.serial=int(raw.serial,0,999999999)?raw.serial:0;let s=stars(p);p.kit=int(raw.kit,0,2)&&s>=[0,5,11][raw.kit]?raw.kit:0;p.coat=int(raw.coat,0,2)&&s>=[0,5,11][raw.coat]?raw.coat:0;return p;}
export function merge(a,b){a=clean(a);b=clean(b);for(let i=0;i<6;i++){a.best[i]=Math.max(a.best[i],b.best[i]);a.collection[i]||=b.collection[i];if(!a.photos[i])a.photos[i]=b.photos[i];}for(let k of ['like','comment'])a.rewards[k]||=b.rewards[k];a.serial=Math.max(a.serial,b.serial);return a;}
function rnd(r){let x=r.rng|0;x^=x<<13;x^=x>>>17;x^=x<<5;r.rng=x>>>0||1;return r.rng/4294967296;}
export function create(level,p,seed=1){return{v:1,id:++p.serial,level:clamp(level|0,0,5),seed:(seed>>>0)||1,rng:(seed>>>0)||1,kit:p.kit,round:0,phase:'ready',started:false,t:0,step:0,order:[0,1,2],target:0,sequence:[],pick:-1,misses:0,rewatches:0,score:0,chain:0,history:[],assisted:false,receipt:null};}
export function duration(r){return SHOWS[r.level].speed*(r.kit===1?1.28:r.kit===2?1.14:1);}
export function deal(r){if(r.phase!=='ready')return false;r.started=true;r.order=[0,1,2];r.target=Math.floor(rnd(r)*3);r.sequence=[];let prev='';for(let i=0;i<SHOWS[r.level].swaps+(r.round%2);i++){let a=Math.floor(rnd(r)*3),b=(a+1+Math.floor(rnd(r)*2))%3,key=[a,b].sort().join('');if(key===prev)b=3-a-b;r.sequence.push([a,b]);prev=[a,b].sort().join('');}r.step=0;r.pick=-1;r.t=0;r.phase='peek';return true;}
export function targetSlot(r){return r.order.indexOf(r.target);}
export function choose(r,slot){if(r.phase!=='choose'||!int(slot,0,2))return[];r.pick=slot;r.t=0;r.phase='reveal';let correct=slot===targetSlot(r);if(correct){r.chain++;r.score+=400+r.chain*100;}else{r.chain=0;r.misses++;}r.history.push({correct,pick:slot,target:targetSlot(r)});return[{type:correct?'correct':'miss',slot:targetSlot(r)}];}
export function rewatch(r){if(r.phase!=='choose')return false;r.rewatches++;r.assisted=true;r.order=[0,1,2];r.step=0;r.t=0;r.pick=-1;r.phase='peek';return true;}
export function next(r){if(r.phase!=='between')return false;r.round++;r.phase='ready';r.t=0;r.pick=-1;r.sequence=[];r.step=0;r.order=[0,1,2];return true;}
export function advance(r,dt){if(!Number.isFinite(dt)||dt<=0)return[];let ev=[];dt=Math.min(dt,.1);if(!['peek','cover','shuffle','reveal'].includes(r.phase))return ev;r.t+=dt;
 if(r.phase==='peek'&&r.t>=1.65){r.phase='cover';r.t=0;ev.push({type:'cover'});}
 else if(r.phase==='cover'&&r.t>=.55){r.phase='shuffle';r.t=0;ev.push({type:'swap'});}
 else if(r.phase==='shuffle'&&r.t>=duration(r)){let [a,b]=r.sequence[r.step];[r.order[a],r.order[b]]=[r.order[b],r.order[a]];r.step++;r.t=0;if(r.step===r.sequence.length){r.phase='choose';ev.push({type:'choose'});}else ev.push({type:'swap'});}
 else if(r.phase==='reveal'&&r.t>=1.45){r.t=0;if(r.history.length===SHOWS[r.level].rounds){r.phase='win';r.receipt=receipt(r);ev.push({type:'win'});}else{r.phase='between';ev.push({type:'between'});}}
 return ev;
}
export function receipt(r){let n=SHOWS[r.level].rounds,hits=r.history.filter(h=>h.correct).length;return{score:r.score,hits,total:n,stars:hits===n&&!r.assisted?3:hits>=Math.ceil(n*.6)?2:1,misses:r.misses,rewatches:r.rewatches};}
export function settle(p,r){if(r.phase!=='win'||!r.receipt)return false;let old=p.best[r.level];p.best[r.level]=Math.max(old,r.receipt.stars);let was=p.collection[r.level];p.collection[r.level]=true;return old!==p.best[r.level]||!was;}
export function pack(r){return JSON.parse(JSON.stringify(r));}
export function decode(x){try{if(!x||x.v!==1||!int(x.id,1,999999999)||!int(x.level,0,5)||!int(x.seed,1,4294967295)||!int(x.rng,1,4294967295)||!int(x.kit,0,2)||!int(x.round,0,SHOWS[x.level].rounds-1)||!['ready','peek','cover','shuffle','choose','reveal','between','win'].includes(x.phase)||typeof x.started!=='boolean'||!Number.isFinite(x.t)||x.t<0||x.t>2||!int(x.target,0,2)||!int(x.pick,-1,2)||!int(x.rewatches,0,100000)||!int(x.misses,0,5)||typeof x.assisted!=='boolean')return null;
 let r=pack(x),n=SHOWS[r.level].rounds;if(!Array.isArray(r.history)||r.history.length>n||r.history.some(h=>typeof h.correct!=='boolean'||!int(h.pick,0,2)||!int(h.target,0,2)||h.correct!==(h.pick===h.target)))return null;
 let score=0,chain=0,misses=0;for(let h of r.history){if(h.correct)score+=400+(++chain)*100;else{chain=0;misses++;}}if(score!==r.score||chain!==r.chain||misses!==r.misses||r.assisted!==(r.rewatches>0))return null;
 if(!Array.isArray(r.order)||[...r.order].sort().join('')!=='012'||!Array.isArray(r.sequence)||!int(r.step,0,r.sequence.length)||r.sequence.length>8||r.sequence.some(a=>!Array.isArray(a)||a.length!==2||!int(a[0],0,2)||!int(a[1],0,2)||a[0]===a[1]))return null;
 let reveal=['reveal','between','win'].includes(r.phase);if(r.history.length!==r.round+(reveal?1:0))return null;if(r.phase==='win'&&(r.history.length!==n||r.round!==n-1))return null;if(!r.started&&!(r.phase==='ready'&&r.round===0&&r.history.length===0))return null;
 if(r.phase==='ready'){if(r.sequence.length||r.step||r.t||r.pick!==-1)return null;}else{if(r.sequence.length!==SHOWS[r.level].swaps+r.round%2)return null;let o=[0,1,2];for(let i=0;i<r.step;i++){let[a,b]=r.sequence[i];[o[a],o[b]]=[o[b],o[a]];}if(o.join()!==r.order.join())return null;if(['peek','cover'].includes(r.phase)&&r.step!==0)return null;if(r.phase==='shuffle'&&r.step>=r.sequence.length)return null;if(['choose','reveal','between','win'].includes(r.phase)&&r.step!==r.sequence.length)return null;if(reveal){let h=r.history.at(-1);if(h.pick!==r.pick||h.target!==targetSlot(r))return null;}else if(r.pick!==-1)return null;}
 r.receipt=r.phase==='win'?receipt(r):null;return r;
 }catch{return null;}}
// Shared by renderer and model tests. Each swap follows separated front/back lanes.
export function cups(r){let positions=r.order.map((id,slot)=>({id,slot,x:(slot-1)*1.1,y:1.30,z:.57,lift:0}));
 if(r.phase==='shuffle'){let[a,b]=r.sequence[r.step],u=clamp(r.t/duration(r)),s=u*u*(3-2*u),arc=Math.sin(u*Math.PI);let oa=positions[a],ob=positions[b];oa.x=(a-1)*1.1+(b-a)*1.1*s;ob.x=(b-1)*1.1+(a-b)*1.1*s;oa.z+=arc*.38;ob.z-=arc*.38;oa.y+=arc*(Math.abs(b-a)===2?.70:.07);ob.y+=arc*(Math.abs(b-a)===2?.70:.12);}
 let target=positions.find(p=>p.id===r.target),show=r.phase==='peek',reveal=r.phase==='reveal'||r.phase==='between'||r.phase==='win';if(show)target.lift=.55;else if(r.phase==='cover')target.lift=.55*(1-clamp(r.t/.55));if(reveal){let u=clamp(r.phase==='reveal'?r.t/.45:1);for(let p of positions)if(p.slot===r.pick||p.id===r.target)p.lift=.65*u;}
 return positions;
}
