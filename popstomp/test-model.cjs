const assert=require('node:assert/strict'),M=require('./model.js');let checks=0;
function ok(x,msg){checks++;assert.ok(x,msg)}
function settle(s){for(let i=0;i<240&&(s.wait>0||s.queue.length);i++)M.update(s,1/60);return s;}
function trial(s,x,y,power=0,mode='stomp'){let a=JSON.parse(JSON.stringify(s));a.events=[];if(!M.stomp(a,x,y,power,mode))return null;settle(a);return a;}
function best(s){let out=null,quality=-Infinity;const pts=[...s.fruits.filter(f=>!f.dead),{x:110,y:350},{x:287,y:350},{x:110,y:470},{x:287,y:470},{x:210,y:345},{x:210,y:465}];for(const f of pts)for(const move of [{power:0,mode:'stomp'},...(s.chargeUnlocked?[{power:1,mode:'stomp'}]:[]),...(s.sweepUnlocked?[{power:0,mode:'sweep'}]:[])]){let a=trial(s,f.x,f.y,move.power,move.mode);if(!a)continue;let hp=s.fruits.reduce((n,f)=>n+f.hp,0)-a.fruits.reduce((n,f)=>n+f.hp,0),gain=a.juice-s.juice,cost=a.used-s.used,score=(hp+gain*.4)/cost+.01*(a.phase==='won');if(score>quality){quality=score;out={...move,x:f.x,y:f.y,preview:a}}}return out;}
const campaigns=[];
for(let run=0;run<3;run++){
 const p=M.profile({});let levels=[];
 for(let level=0;level<12;level++){
  let s=M.create(level,p);let moves=[];
  for(let i=0;i<40&&s.phase==='play';i++){
   let b=best(s);ok(b,'a legal input exists');ok(M.stomp(s,b.x,b.y,b.power,b.mode),'stomp accepted');settle(s);moves.push({x:b.x,y:b.y,power:b.power,mode:b.mode});
   ok(s.fruits.every(f=>Number.isFinite(f.x+f.y+f.hp)&&f.hp>=0),'finite fruit');ok(s.stamps>=0,'no negative stomps');if(s.refillUnlocked){ok(s.refills===Math.floor(s.juice/12),'every refill threshold counted');ok(s.stamps+s.used===s.initial+s.refills,'refill resource conservation');}
   // Save/reload through real serialization, preserving frozen damage and queue state.
   if(s.phase==='play'&&run===1){let r=M.restore(JSON.parse(JSON.stringify(s)),p);ok(r,'valid restore');ok(r.juice===s.juice,'restored juice');s=r;}
  }
  ok(s.phase==='won','win act '+level);ok(M.rating(s)===3,'three stars act '+level);ok(s.caps===3,'three collectible caps');
  ok(M.award(p,s),'first award');let stars=M.total(p);ok(!M.award(p,s),'duplicate award blocked');ok(M.total(p)===stars,'no duplicate stars');levels.push({level:level+1,moves,stomps:s.used,par:s.par,stars:M.rating(s),chain:s.bestChain});
 }
 ok(p.cleared===12&&M.total(p)===36,'complete campaign');campaigns.push(levels);
}
let p=M.profile({}),s=M.create(0,p);ok(!M.stomp(s,NaN,300),'reject NaN');ok(!M.stomp(s,100,-1),'reject outside');let before=JSON.stringify(s.fruits);for(let i=0;i<300;i++)M.update(s,1/60);ok(JSON.stringify(s.fruits)===before,'idle never wins or harms');
while(s.phase==='play'){M.stomp(s,210,305);settle(s)}ok(s.phase==='lost','empty stomps lose');ok(M.encore(s),'free encore');ok(s.stamps===4&&s.assisted,'encore genuine resources');while(s.phase==='play'){let b=best(s);M.stomp(s,b.x,b.y,b.power,b.mode);settle(s);if(s.phase==='lost')M.encore(s)}ok(M.rating(s)===1,'assisted rating');
s=M.create(4,M.profile({stars:[3,3,3,3]}));let frozen=s.fruits.find(f=>f.hp===2);M.stomp(s,frozen.x,frozen.y);M.update(s,.05);let queued=M.restore(JSON.parse(JSON.stringify(s)),M.profile({stars:[3,3,3,3]}));ok(queued&&queued.queue.length,'mid-stomp queue restored');settle(s);settle(queued);ok(JSON.stringify(s.fruits.map(f=>f.hp))===JSON.stringify(queued.fruits.map(f=>f.hp)),'restore same resolution');
let locked=M.create(0,p);M.stomp(locked,128,344,1,'sweep');ok(locked.used===1,'locked tools not activated');
let base=M.create(6,M.profile({stars:Array(6).fill(3)})),normal=trial(base,202,469,0),charged=trial(base,202,469,1),wide=trial(base,200,351,0,'sweep');ok(charged.juice>normal.juice,'charged footprint really changes damage and reach');ok(charged.used===2&&normal.used===1,'charged actual cost');ok(wide.juice>trial(base,200,351).juice,'sweep changes the entire row');ok(wide.used===2,'sweep actual cost');
let queuedCost=M.create(0,p);M.stomp(queuedCost,128,344);let spent=queuedCost.stamps;ok(!M.stomp(queuedCost,128,344),'wait and chain reject extra input');ok(spent===queuedCost.stamps,'rejected input does not spend');
let lastStomp=M.create(6,M.profile({stars:Array(6).fill(3)}));lastStomp.stamps=1;ok(M.stomp(lastStomp,113,351,1,'sweep'),'last resource falls back to a single stomp');ok(lastStomp.stamps===0&&lastStomp.used===1,'one resource never overspends');
let unlocked=M.create(8,M.profile({stars:Array(8).fill(3)}));let step=best(unlocked);M.stomp(unlocked,step.x,step.y,step.power,step.mode);settle(unlocked);let u2=best(unlocked);M.stomp(unlocked,u2.x,u2.y,u2.power,u2.mode);settle(unlocked);ok(unlocked.refills>0,'fizz refill really returns stomps');
for(const bad of [null,{},[],{version:1,level:99},{version:1,level:4}])ok(M.restore(bad,p)===null,'malformed run rejected');
let win=M.create(0,p);for(const v of campaigns[0][0].moves){M.stomp(win,v.x,v.y,v.power,v.mode);settle(win)}let end=JSON.stringify(win);ok(!M.stomp(win,100,350),'terminal input locked');M.update(win,.05);ok(end===JSON.stringify(win),'terminal immutable');
require('node:fs').writeFileSync('qa-model-report.json',JSON.stringify({passed:true,checks,campaigns},null,2));console.log(JSON.stringify({passed:true,checks,campaigns:campaigns.length,acts:36,stomps:campaigns[0].map(x=>x.stomps)}));
