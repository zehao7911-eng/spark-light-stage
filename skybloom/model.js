(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SkyModel=api})(typeof window==='object'?window:globalThis,function(){'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const levels=[
{name:'Lantern Lane',subtitle:'A little light goes a long way.',theme:0,par:1,wind:0,drift:3,points:[[180,290],[133,255],[225,252],[115,205],[180,210],[244,200],[180,155]]},
{name:'Two Little Wishes',subtitle:'Two gatherings. One lovely sky.',theme:0,par:2,wind:4,drift:4,points:[[80,320],[95,263],[70,205],[115,156],[265,320],[250,263],[280,210],[240,157]]},
{name:'The Star Map',subtitle:'Let the whole constellation sing.',theme:1,par:2,wind:-5,drift:5,points:[[52,315],[84,275],[55,225],[195,318],[220,278],[198,230],[118,138],[160,110],[203,140]]},
{name:'Moonlit Waltz',subtitle:'Catch them where their paths meet.',theme:1,par:3,wind:9,drift:14,points:[[55,320],[90,285],[55,246],[265,320],[300,280],[270,236],[145,155],[190,130],[235,157]]},
{name:'The Big Wheel',subtitle:'A circle of lights above the fair.',theme:2,par:2,wind:-9,drift:8,points:[[180,127],[241,144],[286,189],[303,250],[286,311],[241,356],[180,373],[119,356],[74,311],[57,250],[74,189],[119,144]]},
{name:'One Last Wish',subtitle:'Make the whole town look up.',theme:2,par:3,wind:12,drift:9,points:[[48,338],[85,302],[51,260],[92,219],[267,337],[304,299],[270,257],[306,216],[145,145],[180,110],[215,145],[181,180]]}
];
function create(level=0){level=clamp(Number.isInteger(level)?level:0,0,levels.length-1);return{level,time:0,shots:0,lit:0,score:0,bestChain:0,chain:0,chainAge:0,rocket:null,held:false,targetX:180,rings:[],targets:levels[level].points.map((p,i)=>({id:i,lit:false,x:p[0],y:p[1]})),won:false,finish:0,events:[]}}
function position(s,i){const l=levels[s.level],p=l.points[i];return{x:p[0]+Math.sin(s.time*.65+i*.7)*l.drift,y:p[1]+Math.cos(s.time*.51+i*.9)*l.drift*.32}}
function press(s,x){if(s.won||!Number.isFinite(x))return false;s.targetX=clamp(x,26,334);if(!s.rocket){s.rocket={x:s.targetX,y:505,vx:0};s.shots++;s.events.push({type:'launch',x:s.rocket.x,y:505})}s.held=true;return true}
function steer(s,x){if(s.held&&Number.isFinite(x))s.targetX=clamp(x,26,334)}
function burst(s){if(!s.rocket||s.won)return false;const r=s.rocket;s.rocket=null;s.held=false;if(s.rings.length===0){s.chain=0;s.chainAge=0}s.rings.push({x:r.x,y:r.y,age:0,max:65,hit:[]});s.events.push({type:'burst',x:r.x,y:r.y,chain:0});return true}
function suspend(s){s.held=false}
function tick(s,dt){if(!Number.isFinite(dt)||dt<=0||s.won)return;dt=Math.min(dt,.05);s.time+=dt;s.chainAge+=dt;
if(s.rocket&&s.held){const r=s.rocket;r.vx+=(s.targetX-r.x)*22*dt;r.vx*=Math.exp(-8*dt);r.x=clamp(r.x+(r.vx+levels[s.level].wind)*dt,24,336);r.y-=165*dt;if(r.y<=88)burst(s)}
const born=[];for(const ring of s.rings){ring.age+=dt;const radius=ring.max*Math.min(1,ring.age/.38);for(const t of s.targets){if(t.lit)continue;const p=position(s,t.id);if(Math.hypot(p.x-ring.x,p.y-ring.y)>radius+7)continue;t.lit=true;t.x=p.x;t.y=p.y;s.lit++;s.chain++;s.bestChain=Math.max(s.bestChain,s.chain);s.score+=100+(s.chain-1)*20;s.chainAge=0;born.push({x:p.x,y:p.y,age:-.07,max:63,hit:[]});s.events.push({type:'light',x:p.x,y:p.y,id:t.id,chain:s.chain});}}
s.rings=s.rings.filter(r=>r.age<.78).concat(born).slice(-32);if(s.lit===s.targets.length){s.finish+=dt;if(s.finish>1.25){s.won=true;s.held=false;s.rocket=null;s.events.push({type:'win'})}}
}
function stars(s){return !s.won?0:s.shots<=levels[s.level].par?3:s.shots<=levels[s.level].par+2?2:1}
function restore(a){if(!a||!Number.isInteger(a.level)||a.level<0||a.level>=levels.length)return null;const s=create(a.level);if(!Array.isArray(a.targets)||a.targets.length!==s.targets.length)return null;for(const key of ['time','shots','score','bestChain','chain','chainAge','finish']){if(!Number.isFinite(a[key])||a[key]<0||a[key]>1e8)return null;s[key]=a[key]}if(!Number.isInteger(s.shots)||!Number.isInteger(s.bestChain)||!Number.isInteger(s.chain))return null;
for(let i=0;i<s.targets.length;i++){const t=a.targets[i];if(typeof t?.lit!=='boolean')return null;s.targets[i].lit=t.lit;if(t.lit){if(!Number.isFinite(t.x)||!Number.isFinite(t.y)||t.x<0||t.x>360||t.y<65||t.y>400)return null;s.targets[i].x=t.x;s.targets[i].y=t.y;}}s.lit=s.targets.filter(t=>t.lit).length;s.won=s.lit===s.targets.length&&a.won===true;
if(a.rocket&&!s.won){const r=a.rocket;if(!Number.isFinite(r.x)||!Number.isFinite(r.y)||!Number.isFinite(r.vx)||r.x<24||r.x>336||r.y<80||r.y>505||Math.abs(r.vx)>2000)return null;s.rocket={x:r.x,y:r.y,vx:r.vx};s.targetX=r.x;}
if(Array.isArray(a.rings)){for(const r of a.rings.slice(-32)){if(!['x','y','age','max'].every(k=>Number.isFinite(r[k]))||r.x<0||r.x>360||r.y<65||r.y>510||r.age<-.1||r.age>.8||![63,65].includes(r.max))return null;s.rings.push({x:r.x,y:r.y,age:r.age,max:r.max,hit:[]})}}return s}
return{levels,create,press,steer,burst,suspend,tick,stars,restore,position,clamp};
});
