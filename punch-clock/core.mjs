export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export const clone=x=>JSON.parse(JSON.stringify(x));
export const BOUTS=[
 {name:'TIN CAN TERRY',title:'THE WELCOME COMMITTEE',type:0,venue:0,hp:4,wind:1.05,pattern:[1],line:'PLEASE REMOVE ALL FEELINGS.'},
 {name:'MIX MASTER',title:'WHISK MANAGEMENT',type:1,venue:0,hp:6,wind:1.12,pattern:[1,2],line:'YOU LOOK A LITTLE BEATEN.'},
 {name:'TAX-O-TRON',title:'UNEXPECTED EXPENSES',type:2,venue:0,hp:8,wind:1.0,pattern:[2,1,2],line:'YOUR FISTS ARE NOT DEDUCTIBLE.'},
 {name:'SODA POPPA',title:'CARBONATED VIOLENCE',type:3,venue:1,hp:8,wind:.98,pattern:[1,2,1],line:'SHAKE WELL. APOLOGISE LATER.'},
 {name:'DIAL TONE',title:'PLEASE HOLD',type:4,venue:1,hp:10,wind:1.02,pattern:[2,2,1],line:'YOUR PUNCH IS IMPORTANT TO US.'},
 {name:'BIG SCREEN',title:'INSERT COIN. RECEIVE FIST.',type:5,venue:1,hp:12,wind:.95,pattern:[2,1,3],line:'SKILL ISSUE DETECTED.'},
 {name:'OVERTIME TERRY',title:'UNPAID EMOTIONAL DAMAGE',type:0,venue:2,hp:12,wind:.93,pattern:[2,3,1],line:'THIS COULD HAVE BEEN AN EMAIL.'},
 {name:'MIX MASTER DELUXE',title:'FULLY WHISKED',type:1,venue:2,hp:14,wind:.90,pattern:[3,2,2],line:'LET HIM COOK.'},
 {name:'FINAL NOTICE',title:'THE LAST PUNCH CLOCK',type:2,venue:2,hp:16,wind:.90,pattern:[2,3,3],line:'WE HAVE BEEN TRYING TO REACH YOU.'}
];
export const COSTS=[4,7,11];
export function earned(p){return p.stars.reduce((a,n)=>a+(n?4+n*2:0),0);}
export function spent(p){return p.upgrades.reduce((a,n)=>a+COSTS.slice(0,n).reduce((x,y)=>x+y,0),0);}
export function wallet(p){return Math.max(0,earned(p)-spent(p));}
export function profile(v={}){let p={v:1,stars:BOUTS.map((_,i)=>clamp(Math.floor(+v?.stars?.[i]||0),0,3)),best:BOUTS.map((_,i)=>clamp(Math.floor(+v?.best?.[i]||0),0,999999)),upgrades:[0,1,2].map(i=>clamp(Math.floor(+v?.upgrades?.[i]||0),0,3)),look:clamp(Math.floor(+v?.look||0),0,2),sound:v?.sound!==false,comfort:v?.comfort!==false,gentle:v?.gentle===true,light:v?.light!==false,tap:v?.tap===true,rewards:{like:v?.rewards?.like===true,comment:v?.rewards?.comment===true}};for(let i=2;i>=0;i--)while(p.upgrades[i]>0&&spent(p)>earned(p))p.upgrades[i]--;if(p.look>Math.floor(p.stars.filter(Boolean).length/3))p.look=0;return p;}
export function mergeProfile(a,b){let p=profile(a),q=profile(b);p.stars=p.stars.map((n,i)=>Math.max(n,q.stars[i]));p.best=p.best.map((n,i)=>Math.max(n,q.best[i]));p.upgrades=p.upgrades.map((n,i)=>Math.max(n,q.upgrades[i]));for(let k of['like','comment'])p.rewards[k] ||=q.rewards[k];return profile(p);}
export function unlocked(p){let i=p.stars.findIndex(x=>!x);return i<0?BOUTS.length-1:i;}
export function buy(p,i){if(!Number.isInteger(i)||i<0||i>2||p.upgrades[i]>=3||wallet(p)<COSTS[p.upgrades[i]])return false;p.upgrades[i]++;return true;}
export function makeRun(bout=0){bout=clamp(Math.floor(+bout||0),0,BOUTS.length-1);let b=BOUTS[bout];return {v:1,bout,mode:'ready',phase:'windup',left:b.wind,duration:b.wind,t:0,held:false,heat:0,hp:6,enemy:b.hp,turn:0,burst:b.pattern[0],index:0,side:0,energy:0,blocks:0,perfect:0,punches:0,hurt:0,whiffs:0,score:0,lastAttack:-10,lastBlock:-10,lastPunch:-10,lastHurt:-10,lastImpact:-10,pendingDamage:0,pendingPerfect:false,events:[]};}
function phase(s,name,seconds){s.phase=name;s.left=s.duration=seconds;}
function beginTurn(s){let b=BOUTS[s.bout];s.turn++;s.index=0;s.burst=b.pattern[s.turn%b.pattern.length];s.energy=0;s.side=s.turn%2;phase(s,'windup',b.wind*(s.turn%3===2?1.12:1));}
function counter(s,p){if(s.phase!=='counter'||s.energy<.99){if(s.mode==='playing'){s.whiffs++;s.lastPunch=s.t;s.events.push({type:'whiff',double:s.phase==='windup'&&s.index>0});}return false;}s.pendingPerfect=s.t-s.lastBlock<=(p.comfort?.35:.24)+p.upgrades[2]*.045;s.pendingDamage=(s.pendingPerfect?2:1)+p.upgrades[0]*.35;s.energy=0;s.heat=Math.max(0,s.heat-.20);s.lastPunch=s.t;s.events.push({type:'swing'});phase(s,'strike',.12);return true;}
function impact(s){let perfect=s.pendingPerfect,damage=s.pendingDamage;s.enemy=Math.max(0,s.enemy-damage);s.pendingDamage=0;s.punches++;s.perfect+=perfect?1:0;s.score+=100+(perfect?60:0)+Math.min(100,s.perfect*8);s.lastImpact=s.t;s.events.push({type:'punch',perfect,damage,side:s.punches%2});if(s.enemy<=0){s.mode='won';s.held=false;phase(s,'finish',1);s.events.push({type:'win'});}else phase(s,'stagger',perfect?.60:.46);}

export function hold(s,down,p,fire=true){if(!s||!['ready','playing'].includes(s.mode)||s.held===!!down)return false;s.events=[];if(down){if(s.mode==='ready'){s.mode='playing';s.events.push({type:'start'});}s.held=true;s.events.push({type:'guard'});}else{s.held=false;if(fire)counter(s,p);}return true;}
export function tick(s,dt,p){if(!s||!Number.isFinite(dt)||dt<=0)return;s.events=[];if(s.mode!=='playing')return;dt=Math.min(dt,1/30);s.t+=dt;s.heat=clamp(s.heat+(s.held?.18*Math.pow(.82,p.upgrades[1]):-.62)*dt,0,1);s.left-=dt;if(s.left>0)return;
 if(s.phase==='windup'){s.lastAttack=s.t;let blocked=s.held&&s.heat<.999;if(blocked){s.blocks++;s.heat=clamp(s.heat+.14,0,1);s.energy=1;s.lastBlock=s.t;s.score+=20;s.events.push({type:'block',side:s.side,last:s.index===s.burst-1});}else{s.hp--;s.hurt++;s.lastHurt=s.t;s.events.push({type:'hurt',side:s.side,overheat:s.heat>=.999});if(s.hp<=0){s.mode='lost';s.held=false;phase(s,'finish',1);s.events.push({type:'lose'});return;}}
  s.index++;if(s.index<s.burst){s.side=1-s.side;phase(s,'windup',p.comfort?.56:.42);}else phase(s,'counter',(p.comfort?1.20:.80)+p.upgrades[2]*.14);
 }else if(s.phase==='strike')impact(s);else if(s.phase==='counter'||s.phase==='stagger')beginTurn(s);
}
export function stars(s){return s.mode==='won'?1+(s.hurt<=1?1:0)+(s.perfect>=Math.ceil(s.punches/2)?1:0):0;}
export function bank(p,s){if(s.mode!=='won')return false;let before=earned(p);p.stars[s.bout]=Math.max(p.stars[s.bout],stars(s));p.best[s.bout]=Math.max(p.best[s.bout],s.score);return earned(p)-before;}
export function restore(v){try{if(v?.v!==1||!Number.isInteger(v.bout)||!BOUTS[v.bout]||!['ready','playing','won','lost'].includes(v.mode)||!['windup','counter','strike','stagger','finish'].includes(v.phase))return null;let s=clone(v);if(!['left','duration','t','heat','hp','enemy','turn','burst','index','side','energy','blocks','perfect','punches','hurt','whiffs','score','lastAttack','lastBlock','lastPunch','lastHurt','lastImpact','pendingDamage'].every(k=>Number.isFinite(s[k])))return null;if(s.hp<0||s.hp>6||s.enemy<0||s.enemy>BOUTS[s.bout].hp||s.heat<0||s.heat>1||s.left<-.04||s.duration<=0||s.duration>3||s.index<0||s.index>3||s.burst<1||s.burst>3||s.score<0)return null;s.held=false;s.events=[];return s;}catch{return null;}}
