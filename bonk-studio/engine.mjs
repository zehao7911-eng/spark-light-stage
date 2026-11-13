export const TOOLS=[{name:'BONK',word:'BONK!',color:'#ef795b',glyph:'✦'},{name:'SPLASH',word:'SPLASH!',color:'#75bac7',glyph:'≈'},{name:'DING',word:'DING!',color:'#e8bd61',glyph:'♧'},{name:'WHOOSH',word:'WHOOSH!',color:'#a6bea2',glyph:'≋'}];
export const FILMS=[
 {name:'A Very Bad Breakfast',set:0,seq:[0,1,0,1,1,0],tools:2,tag:'A saucepan. A puddle. A promising career.'},
 {name:'Soup, There It Goes',set:0,seq:[1,0,1,0,0,1,0,1],tools:2,tag:'The soup has other plans.'},
 {name:'The Doorbell Detective',set:1,seq:[2,0,2,1,2,0,1,2],tools:3,tag:'Every great mystery begins with a ding.'},
 {name:'Rain Check',set:1,seq:[1,2,0,1,2,1,0,2,1],tools:3,tag:'One umbrella. Entirely too much weather.'},
 {name:'Special Air Delivery',set:2,seq:[3,0,3,2,1,3,0,2],tools:4,tag:'Postage may vary with gravity.'},
 {name:'Lunar Laundry',set:2,seq:[1,3,2,0,3,1,0,2,3],tools:4,tag:'Even astronauts have laundry day.'},
 {name:'Midnight Catering',set:0,seq:[2,0,3,1,0,2,1,3,0,1],tools:4,tag:'Tonight, the kitchen gets the last laugh.'},
 {name:'The Grand Chase',set:1,seq:[3,2,1,0,3,1,2,0,1,3],tools:4,tag:'Catch the hat. Try to keep the dignity.'},
 {name:'One Giant Bonk',set:2,seq:[0,3,1,2,3,0,2,1,3,0,1,2],tools:4,tag:'A small step. A spectacular sound effect.'}
];
export function profile(v={}){return {stars:FILMS.map((_,i)=>Math.max(0,Math.min(3,Math.floor(+v.stars?.[i]||0)))),best:FILMS.map((_,i)=>Math.max(0,+v.best?.[i]||0)),rewards:{gold:!!v.rewards?.gold,confetti:!!v.rewards?.confetti},sound:v.sound!==false,gentle:!!v.gentle,cozy:!!v.cozy};}
export function merge(a,b){const p=profile(a),q=profile(b);p.stars=p.stars.map((n,i)=>Math.max(n,q.stars[i]));p.best=p.best.map((n,i)=>Math.max(n,q.best[i]));for(const k of ['gold','confetti'])p.rewards[k]||=q.rewards[k];return p;}
export function unlocked(p){let i=0;while(i<8&&p.stars[i]>0)i++;return i;}
export function makeRun(film=0){return {film:Math.max(0,Math.min(8,film|0)),phase:'ready',at:0,elapsed:0,cueTime:0,total:0,matched:0,perfect:0,misses:0,wrong:0,combo:0,maxCombo:0,score:0,history:[],eventId:0,event:null};}
export function emit(s,type,extra={}){s.event={id:++s.eventId,type,...extra};}
export function begin(s){if(s.phase!=='ready')return false;s.phase='intro';s.elapsed=0;emit(s,'start');return true;}
export function expected(s){return FILMS[s.film].seq[s.at]??0;}
export function windowSize(s){return s.film<2?2.5:s.film<6?2.25:2;}
export function finishCue(s,ok,perfect=false){let tool=expected(s);s.history.push({tool,ok,perfect});if(ok){s.matched++;s.combo++;s.maxCombo=Math.max(s.maxCombo,s.combo);if(perfect)s.perfect++;s.score+=(perfect?160:100)+Math.min(5,s.combo-1)*20;emit(s,'hit',{tool,perfect,combo:s.combo});}else{s.misses++;s.combo=0;emit(s,'miss',{tool});}s.phase='payoff';s.elapsed=0;}
export function choose(s,tool){if(s.phase!=='cue'||!Number.isInteger(tool)||tool<0||tool>=FILMS[s.film].tools)return false;if(tool!==expected(s)){if(s.cueTime<s.nextWrongAt)return false;s.wrong++;s.combo=0;s.nextWrongAt=s.cueTime+.5;emit(s,'wrong',{tool});return true;}finishCue(s,true,Math.abs(s.cueTime-.55)<.65);return true;}
export function tick(s,dt,cozy=false){if(!Number.isFinite(dt)||dt<=0||s.phase==='ready'||s.phase==='end')return;dt=Math.min(.1,dt);s.total+=dt;s.elapsed+=dt;
 if(s.phase==='intro'&&s.elapsed>=2.4){s.phase='windup';s.elapsed=0;emit(s,'take');}
 else if(s.phase==='windup'&&s.elapsed>=1.6){s.phase='cue';s.elapsed=0;s.cueTime=0;s.nextWrongAt=0;emit(s,'cue',{tool:expected(s)});}
 else if(s.phase==='cue'){s.cueTime+=dt;if(!cozy&&!(s.film===0&&s.at===0)&&s.cueTime>windowSize(s))finishCue(s,false);}
 else if(s.phase==='payoff'&&s.elapsed>=1.55){s.at++;if(s.at>=FILMS[s.film].seq.length){s.phase='end';s.elapsed=0;emit(s,'end',{won:won(s)});}else{s.phase='windup';s.elapsed=0;emit(s,'take');}}
}
export function won(s){return s.matched>=Math.ceil(FILMS[s.film].seq.length*.55);}
export function stars(s){if(!won(s))return 0;return 1+(s.misses<=1?1:0)+(s.misses===0&&s.wrong===0?1:0);}
export function record(p,s){if(s.phase!=='end')return false;p.stars[s.film]=Math.max(p.stars[s.film],stars(s));p.best[s.film]=Math.max(p.best[s.film],s.score);return true;}
export function claim(p,key){if(!['gold','confetti'].includes(key)||p.rewards[key])return false;p.rewards[key]=true;return true;}
export function restore(v){if(!v||!Number.isInteger(v.film)||v.film<0||v.film>8||!['ready','intro','windup','cue','payoff','end'].includes(v.phase)||!Number.isInteger(v.at)||v.at<0||v.at>FILMS[v.film].seq.length)return null;let s={...makeRun(v.film),...v};if(!['elapsed','cueTime','total','matched','perfect','misses','wrong','combo','maxCombo','score','eventId'].every(k=>Number.isFinite(s[k])&&s[k]>=0))return null;if(!Array.isArray(s.history))return null;s.event=null;s.nextWrongAt=s.cueTime;return s;}
