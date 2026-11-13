export const CALLS=[
 {name:'Morning at Maple Café',area:0,fires:[0,1,3],people:[1],limit:100,par:29,wind:0},
 {name:'The Upstairs Neighbours',area:0,fires:[1,2,3,4,5],people:[3,5],limit:100,par:40,wind:.25},
 {name:'Harbour Warehouse',area:1,fires:[0,1,3,4,6],people:[1,6],limit:105,par:39,wind:.45},
 {name:'The Loading Bay',area:1,fires:[0,2,3,4,5,7],people:[2,7],limit:105,par:44,wind:.7},
 {name:'Old Town, New Heroes',area:2,fires:[0,1,3,4,6,7,8],people:[0,4,8],limit:115,par:51,wind:.5},
 {name:'The Midnight Call',area:2,fires:[0,1,2,3,4,5,6,7,8],people:[2,6,8],limit:120,par:56,wind:.9}
];
export const AREAS=[{name:'MAPLE STREET',sky:0xc8dedc,wall:0xd49e75,trim:0xf2dfb5,accent:0x548f80,sign:'MAPLE CAFÉ'},{name:'HARBOUR QUARTER',sky:0xb5cdd8,wall:0x8a9d9d,trim:0xe5d6aa,accent:0x48738b,sign:'HARBOUR GOODS'},{name:'OLD TOWN',sky:0x667d98,wall:0xae765e,trim:0xe4c99e,accent:0x4a687e,sign:'THE CORNER HOUSE'}];
export function profile(v={}){return {stars:CALLS.map((_,i)=>Math.max(0,Math.min(3,Math.floor(+v.stars?.[i]||0)))),best:CALLS.map((_,i)=>Math.max(0,+v.best?.[i]||0)),foam:!!v.foam,sound:v.sound!==false,low:!!v.low,rewards:{gold:!!v.rewards?.gold,confetti:!!v.rewards?.confetti}}}
export function merge(a,b){let p=profile(a),q=profile(b);p.stars=p.stars.map((x,i)=>Math.max(x,q.stars[i]));p.best=p.best.map((x,i)=>Math.max(x,q.best[i]));p.rewards.gold||=q.rewards.gold;p.rewards.confetti||=q.rewards.confetti;return p}
export function unlocked(p){let i=0;while(i<5&&p.stars[i]>0)i++;return i}
export function claim(p,k){if(!['gold','confetti'].includes(k)||p.rewards[k])return false;p.rewards[k]=true;return true}
export function slot(i){return {x:(i%3-1)*2.6,y:2.25+Math.floor(i/3)*2.5,z:.17}}
export function makeRun(call=0){call=Math.max(0,Math.min(5,call|0));let c=CALLS[call];return {call,phase:'welcome',started:false,t:0,elapsed:0,pressure:100,dry:0,dryLock:false,target:-1,spraying:false,foam:false,score:0,combo:0,maxCombo:0,lastOut:-100,rescue:-1,rescueTime:0,windows:Array.from({length:9},(_,i)=>({heat:c.fires.includes(i)?100:0,out:!c.fires.includes(i),person:c.people.includes(i),rescued:false,wet:0})),won:false,eventId:0,event:null}}
export function emit(s,type,extra={}){s.event={id:++s.eventId,type,...extra}}
export function intro(s){if(s.phase!=='welcome')return false;s.phase='intro';s.t=0;return true}
export function ready(s){if(s.phase!=='intro')return false;s.phase='ready';s.t=0;emit(s,'ready');return true}
export function extinguished(s){return s.windows.filter(w=>w.out).length-(9-CALLS[s.call].fires.length)}
export function rescued(s){return s.windows.filter(w=>w.person&&w.rescued).length}
export function totalPeople(s){return CALLS[s.call].people.length}
export function totalFires(s){return CALLS[s.call].fires.length}
export function finish(s,won){if(s.phase==='end')return false;s.phase='end';s.won=won;s.spraying=false;s.rescue=-1;emit(s,'end',{won});return true}
export function complete(s){if(s.windows.every(w=>w.out&&(!w.person||w.rescued)))return finish(s,true);return false}
export function interact(s,i,on=true){if(!['ready','play'].includes(s.phase)||!Number.isInteger(i)||i<0||i>8)return false;let w=s.windows[i];if(w.out&&(!w.person||w.rescued))return false;if(!s.started){s.started=true;emit(s,'start')}s.target=i;if(w.out&&w.person&&!w.rescued&&on){s.phase='rescue';s.rescue=i;s.rescueTime=0;s.spraying=false;emit(s,'ladder',{i});return true}s.spraying=on;s.phase=on?'play':'ready';return true}
export function release(s){s.spraying=false;if(s.phase==='play')s.phase='ready'}
export function setFoam(s,on){s.foam=!!on}
export function out(s,i){let w=s.windows[i];if(w.out)return;w.heat=0;w.out=true;s.combo=s.elapsed-s.lastOut<5?s.combo+1:1;s.lastOut=s.elapsed;s.maxCombo=Math.max(s.combo,s.maxCombo);s.score+=250+Math.min(5,s.combo-1)*50;emit(s,'out',{i,combo:s.combo});if(i===s.target)s.spraying=false;if(s.phase==='play')s.phase='ready'}
export function tick(s,dt){if(!Number.isFinite(dt)||dt<=0)return;dt=Math.min(.1,dt);if(s.phase==='intro'){s.t+=dt;if(s.t>=5.5)ready(s);return}if(!s.started||!['ready','play','rescue'].includes(s.phase))return;s.elapsed+=dt;s.t+=dt;let active=s.spraying&&s.phase==='play'&&!s.dryLock&&s.target>=0&&!s.windows[s.target].out;
 s.pressure=Math.max(0,Math.min(100,s.pressure+dt*(active?(s.foam?-27:-22):34)));if(s.pressure<=.1&&!s.dryLock){s.dry++;s.dryLock=true;s.spraying=false;if(s.phase==='play')s.phase='ready';emit(s,'dry')}if(s.pressure>42)s.dryLock=false;
 for(let i=0;i<9;i++){let w=s.windows[i];w.wet=Math.max(0,w.wet-dt*.08);if(w.out)continue;let factor=i===s.target?1:s.foam&&Math.abs(i%3-s.target%3)<=1&&Math.floor(i/3)===Math.floor(s.target/3)?.38:0;if(active&&factor){w.heat=Math.max(0,w.heat-dt*(s.foam?61:52)*factor);w.wet=Math.min(1,w.wet+dt*.8);if(w.heat<=.05)out(s,i)}else w.heat=Math.min(100,w.heat+dt*.8);}
 if(s.phase==='rescue'){s.rescueTime+=dt;if(s.rescueTime>=3.6){let i=s.rescue;s.windows[i].rescued=true;s.score+=500;s.rescue=-1;s.rescueTime=0;s.phase='ready';emit(s,'safe',{i})}}
 if(!complete(s)&&s.elapsed>=CALLS[s.call].limit)finish(s,false);
}
export function stars(s){return s.won?1+(s.dry===0?1:0)+(s.elapsed<=CALLS[s.call].par?1:0):0}
export function record(p,s){if(s.phase!=='end'||!s.won)return false;p.stars[s.call]=Math.max(p.stars[s.call],stars(s));p.best[s.call]=Math.max(p.best[s.call],s.score);return true}
export function restore(v){if(!v||!Number.isInteger(v.call)||v.call<0||v.call>5||!['welcome','intro','ready','play','rescue','end'].includes(v.phase)||!Array.isArray(v.windows)||v.windows.length!==9)return null;let s={...makeRun(v.call),...v};if(!['t','elapsed','pressure','dry','score','combo','maxCombo','rescueTime'].every(k=>Number.isFinite(s[k])&&s[k]>=0)||s.pressure>100||s.windows.some(w=>!Number.isFinite(w.heat)||w.heat<0||w.heat>100||typeof w.out!=='boolean'||typeof w.person!=='boolean'||typeof w.rescued!=='boolean'))return null;if(s.phase==='rescue'&&(!Number.isInteger(s.rescue)||s.rescue<0||s.rescue>8||!s.windows[s.rescue].person))return null;s.spraying=false;if(s.phase==='play')s.phase='ready';s.event=null;return s}
