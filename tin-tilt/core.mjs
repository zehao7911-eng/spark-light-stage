export const CUPS=[
 {name:'The Copper Cup',theme:0,goal:3,duration:4.1,bob:0,sway:.10},
 {name:'Banners at Noon',theme:0,goal:3,duration:3.8,bob:.16,sway:.24},
 {name:'Rivets & Roses',theme:1,goal:3,duration:3.7,bob:.24,sway:.30},
 {name:'The Wind-up League',theme:1,goal:4,duration:3.6,bob:.28,sway:.36},
 {name:'Midnight Marshal',theme:2,goal:4,duration:3.5,bob:.32,sway:.42},
 {name:'The Tin Crown',theme:2,goal:4,duration:3.4,bob:.36,sway:.48}
];
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export const fresh=()=>({version:1,unlocked:0,stars:Array(6).fill(0),scores:Array(6).fill(0),weapon:0,sound:true,motion:true,quality:1,run:null});
export const medals=p=>p.stars.reduce((a,b)=>a+b,0);
export const canWeapon=(p,n)=>n===0||(n===1&&medals(p)>=6)||(n===2&&medals(p)>=12);
export function create(level=0,weapon=0,loop=0){level=clamp(level|0,0,5);return {version:1,level,weapon:clamp(weapon|0,0,2),loop:clamp(loop|0,0,3),phase:'ready',clock:0,t:0,cleared:0,attempts:0,hearts:3,perfect:0,combo:0,score:0,stars:0,aim:{x:0,y:1.25},last:null,events:[],banked:false};}
export const active=s=>s.phase==='ready'||s.phase==='charge'||s.phase==='react';
export const duration=s=>Math.max(2.8,CUPS[s.level].duration-s.loop*.15);
export const tolerance=s=>s.weapon===1?.69:.53;
export const opponent=s=>['react','won','lost'].includes(s.phase)&&s.last?s.last.opponent:s.cleared;
export function target(s){let m=CUPS[s.level],time=['react','won','lost'].includes(s.phase)&&s.last?s.last.at:s.clock,who=opponent(s),side=who%2?-1:1,wave=time*(1.6+s.level*.08)+who*.9;return {x:side*.68+Math.sin(wave)*m.sway,y:2.43+Math.sin(wave*1.22+.5)*m.bob};}
export const distance=s=>Math.max(0,16*(1-s.clock/duration(s)));
export function aim(s,x,y){if(!['ready','charge'].includes(s.phase)||!Number.isFinite(x)||!Number.isFinite(y))return false;s.aim.x=clamp(x,-2.1,2.1);s.aim.y=clamp(y,.55,4.6);if(s.phase==='ready'){s.phase='charge';s.events.push({type:'charge'});}return true;}
export const drain=s=>s.events.splice(0);
export function step(s,dt){if(!active(s)||s.phase==='ready'||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(dt,1/30);s.t+=dt;s.clock+=dt;
 if(s.phase==='charge'){let q=target(s);if(s.weapon===2&&Math.hypot(s.aim.x-q.x,s.aim.y-q.y)<1.0){s.aim.x+=(q.x-s.aim.x)*dt*.45;s.aim.y+=(q.y-s.aim.y)*dt*.45;}
  if(s.clock>=duration(s)){s.clock=duration(s);q=target(s);let error=Math.hypot(s.aim.x-q.x,s.aim.y-q.y),hit=error<=tolerance(s),perfect=error<=.23,opponent=s.cleared;s.last={hit,perfect:hit&&perfect,error,x:s.aim.x,y:s.aim.y,tx:q.x,ty:q.y,at:s.clock,opponent,points:0};s.attempts++;if(hit){s.cleared++;s.combo++;if(perfect)s.perfect++;let points=100+(perfect?75:0)+Math.min(4,s.combo)*25;s.score+=points;s.last.points=points;}else{s.hearts--;s.combo=0;}s.phase='react';s.clock=0;s.events.push({type:'impact',...s.last});}
 }else if(s.clock>=1.65){if(s.hearts<=0){s.phase='lost';s.events.push({type:'lost'});}else if(s.cleared>=CUPS[s.level].goal){s.phase='won';s.stars=1+(s.hearts===3?1:0)+(s.perfect>=2?1:0);s.score+=s.hearts*100;s.events.push({type:'won'});}else{s.phase='charge';s.clock=0;s.events.push({type:'next'});}}
}
export function bank(p,s){if(s.phase!=='won'||s.banked)return false;s.banked=true;p.stars[s.level]=Math.max(p.stars[s.level],s.stars);p.scores[s.level]=Math.max(p.scores[s.level],s.score);p.unlocked=Math.min(5,Math.max(p.unlocked,s.level+1));return true;}
export function encode(p,s){let r=s?structuredClone(s):null;if(r)r.events=[];return JSON.stringify({...p,run:r});}
export function decode(raw){try{let p=JSON.parse(raw);if(!p||p.version!==1||!Number.isInteger(p.unlocked)||p.unlocked<0||p.unlocked>5||!Array.isArray(p.stars)||p.stars.length!==6||p.stars.some(v=>!Number.isInteger(v)||v<0||v>3)||!Array.isArray(p.scores)||p.scores.length!==6||p.scores.some(v=>!Number.isFinite(v)||v<0))return fresh();let out={...fresh(),...p};if(!Number.isInteger(out.weapon)||!canWeapon(out,out.weapon))out.weapon=0;for(let k of ['sound','motion'])if(typeof out[k]!=='boolean')out[k]=true;if(![0,1].includes(out.quality))out.quality=1;
 if(out.run){let s=out.run,valid=Number.isInteger(s.level)&&s.level>=0&&s.level<=out.unlocked&&CUPS[s.level]&&Number.isInteger(s.weapon)&&canWeapon(out,s.weapon)&&Number.isInteger(s.loop)&&s.loop>=0&&s.loop<=3&&['ready','charge','react','won','lost'].includes(s.phase)&&['clock','t','cleared','attempts','hearts','perfect','combo','score','stars'].every(k=>Number.isFinite(s[k])&&s[k]>=0)&&s.hearts<=3&&s.stars<=3&&s.cleared<=CUPS[s.level].goal&&['cleared','attempts','hearts','perfect','combo','stars'].every(k=>Number.isInteger(s[k]))&&s.aim&&Number.isFinite(s.aim.x)&&Number.isFinite(s.aim.y)&&Math.abs(s.aim.x)<=2.1&&s.aim.y>=.55&&s.aim.y<=4.6&&(s.last===null||(s.last&&['error','x','y','tx','ty','at','opponent','points'].every(k=>Number.isFinite(s.last[k]))&&typeof s.last.hit==='boolean'&&typeof s.last.perfect==='boolean'))&&(['react','won','lost'].includes(s.phase)?!!s.last:true);if(valid){s.events=[];}else out.run=null;}
 return out;}catch{return fresh();}}
