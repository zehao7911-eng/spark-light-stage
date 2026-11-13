(function(root){'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const names=['Citrine Grin','Miss Frequency','The Velvet Duke','Sunday Sun','Bubblegum Oracle','Midnight Operator','The Big Idea','Disco Daydream','The Grand Wink'];
const kinds=['sun','tv','duke','sun','cloud','tv','cloud','duke','sun'];
function random(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
function profile(){return{version:1,stage:0,coins:0,records:Array(9).fill(null),upgrades:{reach:0,echo:0},mute:false,gentle:false}}
function unlocked(p){let i=p.records.findIndex(x=>!x);return i<0?9:i}
function create(stage,seed=0){stage=clamp(Math.floor(stage)||0,0,999);let rng=random(8181+stage*137+seed*197),count=stage===0?12:Math.min(24,14+Math.floor(stage/2)*2),cols=4,rows=Math.ceil(count/cols),eyes=[];
 for(let i=0;i<count;i++){let row=Math.floor(i/cols),col=i%cols;let x=105+col*90+(rng()-.5)*18,y=148+row*(rows>4?61:80)+(rng()-.5)*12,r=rows>4?25:30;
 if([3,7,8].includes(stage%9)){let outer=stage%9===3?12:stage%9===7?14:16,ring=i<outer,nn=ring?Math.min(outer,count):count-outer,k=ring?i:i-outer,a=k*Math.PI*2/nn-Math.PI/2,rr=ring?151:69;x=240+Math.cos(a)*rr;y=298+Math.sin(a)*rr;r=ring?24:23;}
 else if(stage%9===4){x+=row%2?12:-12;y+=col%2?6:-6;}
 else if(stage%9===6){y+=Math.sin(col*1.6)*12;}
 eyes.push({id:i,x,y,r,kind:i%7===3?'gold':(stage>0&&i%6===1?'puff':'plain'),hp:stage>0&&i%6===1?3:1,charge:0,popped:false,at:0});}
 return{stage,seed,name:names[stage%9],kind:kinds[stage%9],eyes,time:0,combo:0,best:0,last:-99,pops:0,charge:0,stampUsed:0,choirUsed:0,strokes:0,won:false,paid:false,earned:0,stars:0,events:[]};}
function cost(p,key){return[25,60,120][p.upgrades[key]]??Infinity}
function buy(p,key){if(!['reach','echo'].includes(key)||p.coins<cost(p,key))return false;p.coins-=cost(p,key);p.upgrades[key]++;return true}
function emit(s,type,o={}){s.events.push({type,...o});if(s.events.length>100)s.events.shift()}
function pop(s,p,e,chain=false,depth=0){if(e.popped||s.won)return 0;e.popped=true;e.charge=1;e.at=s.time;s.pops++;s.combo=s.time-s.last<2.8?s.combo+1:1;s.best=Math.max(s.best,s.combo);s.last=s.time;s.punchAt=s.time;s.charge=Math.min(8,s.charge+1);for(let q of s.eyes)if(!q.popped){let d=Math.hypot(q.x-e.x,q.y-e.y);if(d<220){q.kickAt=s.time;q.kick=(1-d/220)*.24}}emit(s,'pop',{x:e.x,y:e.y,kind:e.kind,combo:s.combo});let n=1;
 if(e.kind==='gold'&&depth<6){let range=118+p.upgrades.echo*24;emit(s,'wave',{x:e.x,y:e.y,r:range});for(let other of s.eyes)if(!other.popped&&Math.hypot(other.x-e.x,other.y-e.y)<range)n+=pop(s,p,other,true,depth+1);}
 return n;}
function finish(s,p){if(s.won||s.pops<s.eyes.length)return false;s.won=true;s.stars=1+(s.best>=6?1:0)+(s.best>=12||s.stampUsed>0||s.choirUsed>0?1:0);s.earned=20+s.pops+Math.min(20,s.best);emit(s,'win');return true}
function pointSegment(x,y,a,b){let dx=b.x-a.x,dy=b.y-a.y,t=clamp(((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy||1),0,1);return Math.hypot(x-a.x-t*dx,y-a.y-t*dy)}
function stroke(s,p,a,b){if(s.won)return 0;let n=0,range=10+p.upgrades.reach*5;for(let e of s.eyes){if(!e.popped&&pointSegment(e.x,e.y,a,b)<e.r+range){if(e.kind==='puff'){e.hp--;e.charge=Math.min(1,e.charge+.34);emit(s,'puff',{x:e.x,y:e.y});if(e.hp<=0)n+=pop(s,p,e);}else n+=pop(s,p,e);}}if(n)s.strokes++;finish(s,p);return n}
function hold(s,p,pt,dt){if(s.won||!pt)return;for(let e of s.eyes){if(!e.popped&&e.kind==='puff'&&Math.hypot(e.x-pt.x,e.y-pt.y)<e.r+20+p.upgrades.reach*5){e.charge=Math.min(1,e.charge+dt*2.5);if(e.charge>=1)pop(s,p,e);}}finish(s,p)}
function stamp(s,p,pt){if(s.won||unlocked(p)<2||s.charge<8)return false;s.charge=0;s.stampUsed++;let remaining=s.eyes.filter(e=>!e.popped);if(!remaining.length)return false;let target=pt||remaining[Math.floor(remaining.length/2)],r=155+p.upgrades.reach*12;emit(s,'stamp',{x:target.x,y:target.y,r});for(let e of remaining)if(Math.hypot(target.x-e.x,target.y-e.y)<r)pop(s,p,e);finish(s,p);return true}
function choir(s,p){if(s.won||unlocked(p)<5||s.choirUsed)return false;s.choirUsed++;emit(s,'choir');for(let i=0;i<s.eyes.length;i++)if(i%2===0&&!s.eyes[i].popped)pop(s,p,s.eyes[i]);finish(s,p);return true}
function step(s,p,dt,pt){if(s.won)return;dt=clamp(dt,0,.05);s.time+=dt;if(s.time-s.last>2.8)s.combo=0;hold(s,p,pt,dt)}
function settle(s,p){if(!s.won||s.paid)return false;s.paid=true;p.coins+=s.earned;if(s.stage<9){let old=p.records[s.stage];p.records[s.stage]={stars:Math.max(old?.stars||0,s.stars),combo:Math.max(old?.combo||0,s.best),pops:s.pops};}p.stage=Math.min(999,s.stage);return true}
function stars(p){return p.records.reduce((n,r)=>n+(r?.stars||0),0)}
function save(s,p){return JSON.stringify({version:1,s,p})}
function load(raw){try{let d=JSON.parse(raw);if(d.version!==1||d.p?.version!==1||!Number.isFinite(d.p.coins)||d.p.coins<0||d.p.coins>1e9||!Array.isArray(d.p.records)||d.p.records.length!==9)return null;
 let p=d.p;p.stage=clamp(Math.floor(p.stage)||0,0,999);for(let k of ['reach','echo'])if(!Number.isInteger(p.upgrades?.[k])||p.upgrades[k]<0||p.upgrades[k]>3)return null;
 for(let r of p.records)if(r&&(!Number.isInteger(r.stars)||r.stars<1||r.stars>3||!Number.isFinite(r.combo)))return null;
 let s=d.s;if(!s||!Number.isInteger(s.stage)||s.stage<0||s.stage>999||!Number.isFinite(s.time)||s.time<0||!Array.isArray(s.eyes)||s.eyes.length!==create(s.stage,s.seed).eyes.length)return null;
 let expected=create(s.stage,s.seed);for(let i=0;i<s.eyes.length;i++){let e=s.eyes[i],f=expected.eyes[i];if(e.id!==f.id||e.x!==f.x||e.y!==f.y||e.kind!==f.kind||typeof e.popped!=='boolean'||!Number.isFinite(e.charge))return null;}
 if(s.pops!==s.eyes.filter(e=>e.popped).length||typeof s.won!=='boolean'||typeof s.paid!=='boolean'||(s.won!== (s.pops===s.eyes.length))||!Number.isFinite(s.best)||!Number.isFinite(s.earned))return null;
 s.events=[];p.mute=!!p.mute;p.gentle=!!p.gentle;return{s,p};}catch{return null}}
const API={names,kinds,profile,create,unlocked,cost,buy,stroke,stamp,choir,step,settle,save,load,stars,pointSegment};if(typeof module!=='undefined')module.exports=API;root.WinkModel=API;
})(typeof window==='undefined'?globalThis:window);
