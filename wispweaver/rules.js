import {contains,closedLoop,Point} from './coil-core.js';
export const GARDENS=[
 {name:'Fern Hollow',theme:0,goal:12,size:3,thorns:0,speed:.45},
 {name:'Dewdrop Steps',theme:0,goal:16,size:4,thorns:1,speed:.55},
 {name:'The Old Willow',theme:0,goal:20,size:5,thorns:2,speed:.7},
 {name:'Moonpool',theme:1,goal:16,size:4,thorns:1,speed:.55},
 {name:'Lily Crossing',theme:1,goal:20,size:5,thorns:2,speed:.75},
 {name:'Silver Falls',theme:1,goal:24,size:6,thorns:3,speed:.9},
 {name:'Amber Canopy',theme:2,goal:20,size:5,thorns:2,speed:.7},
 {name:'Mothlight Terrace',theme:2,goal:24,size:6,thorns:3,speed:.9},
 {name:'The Wishing Tree',theme:2,goal:28,size:7,thorns:4,speed:1}
];
export function fresh(level){let r={level,time:0,caught:0,score:0,loops:0,bumps:0,biggest:0,wave:0,delay:0,done:false,settled:false,still:0,stillUsed:false,entities:[],events:[],found:[0,0,0]};spawn(r);return r;}
export function spawn(r){const g=GARDENS[r.level],remaining=g.goal-r.caught,n=Math.min(g.size,remaining),seed=r.wave+r.level*3;const centers=[{x:285,y:300},{x:360,y:290},{x:245,y:245},{x:315,y:340}];const c=centers[seed%4];r.entities=[];
 for(let i=0;i<n;i++){let a=i*2.399+seed*.55,rad=n===3?65:75+(i%2)*23;r.entities.push({id:r.wave*30+i,x:c.x+Math.cos(a)*rad,y:c.y+Math.sin(a)*rad,ax:c.x+Math.cos(a)*rad,ay:c.y+Math.sin(a)*rad,phase:i*1.7+seed,kind:r.level<2?0:r.level<4?(i%3===0?1:0):i%3,thorn:false});}
 for(let i=0;i<g.thorns;i++){const angle=i*2.4+seed*.7,rad=130+i*16;r.entities.push({id:1000+r.wave*30+i,x:300+Math.cos(angle)*rad,y:300+Math.sin(angle)*rad,ax:300+Math.cos(angle)*rad,ay:300+Math.sin(angle)*rad,phase:i+seed,thorn:true,kind:0});}
 r.wave++;r.events.push({type:'wave'});
}
export function tick(r,dt,drawing=false){r.events=[];if(r.done)return;r.time+=dt;r.still=Math.max(0,r.still-dt);if(r.delay>0){r.delay=Math.max(0,r.delay-dt);if(r.delay<=0){if(r.caught>=GARDENS[r.level].goal){r.done=true;r.events.push({type:'win'});}else spawn(r);}return;}
 const speed=GARDENS[r.level].speed*(r.still>0?.05:drawing?.3:1);
 for(const e of r.entities){e.phase+=dt*speed;e.x=e.ax+Math.sin(e.phase)*15;e.y=e.ay+Math.cos(e.phase*.8)*13;}
}
export function capture(r,trail){if(r.done||r.delay>0)return {type:'none'};const loop=closedLoop(trail.map(p=>new Point(p.x,p.y)),30);if(!loop)return {type:'open'};const enclosed=r.entities.filter(e=>contains(loop.points,e));if(enclosed.some(e=>e.thorn)){r.bumps++;return {type:'thorn',loop};}
 const caught=enclosed.filter(e=>!e.thorn);if(!caught.length)return {type:'empty',loop};r.loops++;r.biggest=Math.max(r.biggest,caught.length);r.caught+=caught.length;r.score+=caught.length*50+caught.length*caught.length*15;for(const e of caught)r.found[e.kind]++;const ids=new Set(caught.map(e=>e.id));r.entities=r.entities.filter(e=>!ids.has(e.id));if(!r.entities.some(e=>!e.thorn))r.delay=1.25;return {type:'catch',loop,caught,points:caught.length*50+caught.length*caught.length*15};}
export function medal(r){if(!r.done)return 0;return 1+(r.bumps===0?1:0)+(r.biggest>=Math.min(4,GARDENS[r.level].size)?1:0);}
export function restore(value){if(!value||!Number.isInteger(value.level)||value.level<0||value.level>=9||!Number.isFinite(value.time)||value.time<0||!Number.isInteger(value.caught)||value.caught<0||value.caught>GARDENS[value.level].goal||!Array.isArray(value.entities)||value.entities.length>16)return null;if(typeof value.done!=='boolean'||typeof value.settled!=='boolean'||typeof value.stillUsed!=='boolean'||value.settled&&!value.done||value.done&&value.caught!==GARDENS[value.level].goal||!value.done&&!value.delay&&!value.entities.some(e=>!e.thorn))return null;if(new Set(value.entities.map(e=>e.id)).size!==value.entities.length||value.entities.some(e=>!Number.isInteger(e.id)||!Number.isInteger(e.kind)||e.kind<0||e.kind>2||typeof e.thorn!=='boolean'))return null;for(const e of value.entities)for(const k of ['x','y','ax','ay','phase'])if(!Number.isFinite(e[k])||Math.abs(e[k])>2000)return null;for(const k of ['score','loops','bumps','biggest','wave','delay','still'])if(!Number.isFinite(value[k])||value[k]<0)return null;if(!Array.isArray(value.found)||value.found.length!==3||value.found.some(v=>!Number.isInteger(v)||v<0||v>100))return null;return {...value,events:[]};}

export function settle(profile,r){if(!r.done||r.settled)return false;profile.stars[r.level]=Math.max(profile.stars[r.level],medal(r));profile.best[r.level]=Math.max(profile.best[r.level],r.score);r.found.forEach((n,i)=>profile.found[i]+=n);r.settled=true;return true;}
