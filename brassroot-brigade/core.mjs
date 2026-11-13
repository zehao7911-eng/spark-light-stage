export const NAMES=['Seedling','Bud Battery','Frost Bloom','Corn Choir','Pumpkin Crown'];
export const DAMAGE=[0,1,2.6,6,14,30];
export const RAIDS=[
 {name:'First Light',area:0,pattern:[0,1,2,0,1,2,1,0,2],types:[0],gap:3.1,hp:1},
 {name:'Snail Mail',area:0,pattern:[1,1,0,2,0,2,1,0,2,1,0,2],types:[0,1,0],gap:2.8,hp:1.15},
 {name:'Beetle Breakfast',area:0,pattern:[0,2,1,0,2,1,0,1,2,0,2,1],types:[0,2,0],gap:2.5,hp:1.3},
 {name:'Rain on the Roof',area:1,pattern:[2,1,0,2,2,1,0,0,1,2,1,0,2,1,0],types:[0,1,2],gap:2.2,hp:1.4},
 {name:'The Little Stampede',area:1,pattern:[0,1,2,0,1,2,0,1,2,0,1,2,1,0,2,1,0,2],types:[0,0,2],gap:1.8,hp:1.4},
 {name:'A Shell of a Problem',area:1,pattern:[1,0,2,1,0,2,1,0,2,1,0,2,1,0,2],types:[1,2,1,0],gap:2.3,hp:1.8},
 {name:'Midnight Munchies',area:2,pattern:[0,2,1,2,0,1,0,2,1,0,2,1,2,0,1,0,2,1],types:[2,0,1],gap:1.9,hp:2},
 {name:'The Royal Picnic',area:2,pattern:[1,0,2,1,0,2,0,2,1,0,2,1,1,0,2,1],types:[0,2,1],gap:2,hp:2.1,boss:true}
];
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function create(raid=0){raid=clamp(Math.floor(raid)||0,0,7);return {v:1,raid,t:0,active:false,status:'ready',board:[1,1,0,1,0,0,1,0,0],cool:Array(9).fill(0),coins:6,earned:0,seedClock:0,spawn:0,enemies:[],shots:[],events:[],seq:0,kills:0,breaches:0,merges:0,highest:1,score:0,done:false};}
function emit(s,type,data={}){s.events.push({type,...data});if(s.events.length>70)s.events.shift();}
function start(s){if(s.status==='ready'){s.status='play';s.active=true;emit(s,'start');}}
export function move(s,a,b){if(!s||!['ready','play'].includes(s.status)||!Number.isInteger(a)||!Number.isInteger(b)||a<0||a>8||b<0||b>8||a===b||!s.board[a])return false;
 const v=s.board[a],w=s.board[b];if(w&&w!==v){emit(s,'nope',{at:b});return false;}if(w===5){emit(s,'nope',{at:b});return false;}
 s.board[a]=0;s.board[b]=w?v+1:v;s.cool[b]=Math.min(s.cool[a],s.cool[b],.15);s.cool[a]=0;
 if(w){s.merges++;s.highest=Math.max(s.highest,v+1);s.score+=v*50;emit(s,'merge',{at:b,level:v+1});}else emit(s,'move',{at:b});start(s);return true;}
export function plant(s,at=-1){if(!s||!['ready','play'].includes(s.status)||s.coins<2)return false;
 if(at===-1){const rows=[0,1,2].map(r=>({r,p:s.board.slice(r*3,r*3+3).reduce((a,l)=>a+DAMAGE[l],0)})).sort((a,b)=>a.p-b.p);at=-1;for(const {r} of rows){for(let c=0;c<3;c++)if(!s.board[r*3+c]){at=r*3+c;break;}if(at>=0)break;}}
 if(!Number.isInteger(at)||at<0||at>8||s.board[at])return false;s.board[at]=1;s.cool[at]=.1;s.coins-=2;emit(s,'plant',{at});start(s);return true;}
export function pulse(s){if(!s||s.status!=='play'||s.earned<8)return false;s.earned-=8;for(const e of s.enemies){e.hp-=5;e.flash=.2;e.x+=.5;}emit(s,'pulse');return true;}
export function step(s,dt){if(!s||s.status!=='play'||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(dt,1/20);s.t+=dt;s.seedClock+=dt;
 if(s.seedClock>=4){s.seedClock-=4;s.coins=Math.min(20,s.coins+1);emit(s,'seed');}
 const q=RAIDS[s.raid];if(s.spawn<q.pattern.length&&s.t>=.7+s.spawn*q.gap){const n=s.spawn++,type=q.boss&&n===q.pattern.length-1?3:q.types[n%q.types.length];let hp=([4,10,6,82][type])*q.hp;const e={id:++s.seq,row:q.pattern[n],x:8.5,hp,max:hp,type,slow:0,flash:0};s.enemies.push(e);emit(s,type===3?'boss':'spawn',{id:e.id,row:e.row});}
 for(let i=0;i<9;i++){let l=s.board[i];s.cool[i]=Math.max(0,s.cool[i]-dt);if(!l||s.cool[i]>0)continue;let r=Math.floor(i/3),c=i%3;let target=s.enemies.filter(e=>e.row===r&&e.hp>0&&e.x>c-.3).sort((a,b)=>a.x-b.x)[0];if(!target)continue;
 s.cool[i]=[0,.85,.8,.75,.7,.65][l];s.shots.push({x:c+.35,row:r,damage:DAMAGE[l],level:l,from:i,id:++s.seq});emit(s,'shoot',{at:i,level:l});}
 for(const b of s.shots){let old=b.x;b.x+=dt*10;let target=s.enemies.filter(e=>e.row===b.row&&e.hp>0&&e.x>=old-.28&&e.x<=b.x+.28).sort((a,b)=>a.x-b.x)[0];if(target){b.dead=true;let hit=b.damage*(target.type===1?.8:1);target.hp-=hit;target.flash=.15;if(b.level>=3)target.slow=1.2;if(b.level>=4){for(const e of s.enemies)if(e!==target&&e.row===target.row&&Math.abs(e.x-target.x)<1.1){e.hp-=hit*.6;e.flash=.15;}}
 emit(s,'hit',{x:target.x,row:target.row,level:b.level});}}
 s.shots=s.shots.filter(b=>!b.dead&&b.x<10).slice(-50);
 for(const e of s.enemies){e.flash=Math.max(0,e.flash-dt);e.slow=Math.max(0,e.slow-dt);if(e.hp<=0){s.kills++;s.earned=Math.min(8,s.earned+1);s.coins=Math.min(20,s.coins+(e.type===3?4:1));s.score+=e.type===3?600:100;emit(s,'pop',{x:e.x,row:e.row,kind:e.type});e.dead=true;continue;}
 e.x-=dt*([.25,.18,.38,.14][e.type])*(e.slow>0?.55:1);if(e.x<-.8){s.breaches++;e.dead=true;emit(s,'breach',{row:e.row});}}
 s.enemies=s.enemies.filter(e=>!e.dead);
 if(s.breaches>=5){s.status='lost';s.active=false;emit(s,'lost');return;}
 if(s.spawn===q.pattern.length&&!s.enemies.length){s.status='won';s.active=false;s.done=true;s.score+=(5-s.breaches)*100;emit(s,'won',{stars:stars(s)});}
}
export function stars(s){return s.status==='won'?1+(s.breaches===0?1:0)+(s.highest>=3?1:0):0;}
export function record(profile,s){if(s.status!=='won')return false;let old=profile.best[s.raid]||{stars:0,score:0};profile.best[s.raid]={stars:Math.max(old.stars,stars(s)),score:Math.max(old.score,s.score)};profile.unlocked=Math.max(profile.unlocked,Math.min(7,s.raid+1));profile.seen=Math.max(profile.seen,s.highest);return true;}
export function profileNew(){return {best:Array(8).fill(null),unlocked:0,seen:1};}
export function restore(raw){try{let x=typeof raw==='string'?JSON.parse(raw):raw;if(!x||x.v!==1||!Number.isInteger(x.raid)||x.raid<0||x.raid>7||!['ready','play','won','lost'].includes(x.status))return null;let s=create(x.raid);
 if(!Array.isArray(x.board)||x.board.length!==9||!x.board.every(v=>Number.isInteger(v)&&v>=0&&v<=5))return null;
 for(const k of ['t','coins','earned','seedClock','spawn','seq','kills','breaches','merges','highest','score'])if(!Number.isFinite(x[k])||x[k]<0)return null;
 if(x.spawn>RAIDS[x.raid].pattern.length||x.coins>20||x.earned>8||x.breaches>5||x.highest>5||!Array.isArray(x.enemies)||x.enemies.length>30||!Array.isArray(x.shots)||x.shots.length>50||!Array.isArray(x.cool)||x.cool.length!==9)return null;
 if(!x.cool.every(v=>Number.isFinite(v)&&v>=0&&v<=1))return null;
 if(!x.enemies.every(e=>Number.isInteger(e.row)&&e.row>=0&&e.row<=2&&Number.isInteger(e.type)&&e.type>=0&&e.type<=3&&['id','x','hp','max','slow','flash'].every(k=>Number.isFinite(e[k]))&&e.x>=-1&&e.x<=9&&e.hp>0&&e.hp<=e.max&&e.max<250))return null;
 if(!x.shots.every(b=>Number.isInteger(b.row)&&b.row>=0&&b.row<=2&&Number.isInteger(b.level)&&b.level>=1&&b.level<=5&&Number.isFinite(b.x)&&b.x>=0&&b.x<10&&b.damage===DAMAGE[b.level]))return null;
 Object.assign(s,x,{events:[]});return s;}catch{return null;}}
export function cleanProfile(x){let p=profileNew();if(!x||typeof x!=='object')return p;p.unlocked=clamp(Math.floor(x.unlocked)||0,0,7);p.seen=clamp(Math.floor(x.seen)||1,1,5);if(Array.isArray(x.best))for(let i=0;i<8;i++){let b=x.best[i];if(b&&Number.isFinite(b.score)&&Number.isInteger(b.stars)&&b.stars>=1&&b.stars<=3)p.best[i]={stars:b.stars,score:clamp(Math.floor(b.score),0,100000)};}return p;}
