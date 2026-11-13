export const COURSES=[
 {name:'The Welcome Bend',area:0,length:148,speed:5.1,target:3,friends:5},
 {name:'Picnic Crossing',area:0,length:168,speed:5.5,target:4,friends:6},
 {name:'Copper Creek',area:1,length:184,speed:5.8,target:4,friends:6},
 {name:'The Long Weekend',area:1,length:202,speed:6.1,target:4,friends:6},
 {name:'Bluebird Passage',area:2,length:216,speed:6.3,target:5,friends:6},
 {name:'Everybody, Together',area:2,length:234,speed:6.5,target:5,friends:6}
];
export const BIOMES=[{name:'ALDER VALLEY',sky:0xc4dfd8,water:0x53aab4,deep:0x2d8396,grass:0x7d9966,leaf:0x5e8865,light:0xffe5b1,rock:0x8d9c8b},{name:'COPPER CANYON',sky:0xe6c7ac,water:0x579a9c,deep:0x367c87,grass:0xa69b60,leaf:0xce864a,light:0xffddb0,rock:0xbc8e70},{name:'BLUEBIRD REACH',sky:0xb7cbdc,water:0x588fae,deep:0x376e94,grass:0x849d9c,leaf:0x557c83,light:0xffead0,rock:0x8d9fac}];
export const NAMES=['MILO','JUNE','BEA','OTIS','PIP','ROSE','FINN','ADA','KIT','NOAH','IVY','LOU','NELL','BO','SAGE','REMY','WREN','THEO'];
export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export const centre=d=>Math.sin(d*.038)*.8+Math.sin(d*.013)*.65;
export function profile(v={}){if(!v||typeof v!=='object')v={};return {stars:COURSES.map((_,i)=>clamp(v.stars?.[i]|0,0,3)),tokens:clamp(v.tokens|0,0,999999),trips:clamp(v.trips|0,0,99999),album:[...new Set((Array.isArray(v.album)?v.album:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<18))],gear:{rudder:clamp(v.gear?.rudder|0,0,3),hull:clamp(v.gear?.hull|0,0,3),bell:clamp(v.gear?.bell|0,0,3)},sound:v.sound!==false,low:!!v.low,rewards:{gold:!!v.rewards?.gold,confetti:!!v.rewards?.confetti}}}
export function unlocked(p){let n=0;while(n<5&&p.stars[n]>0)n++;return n}
export function claim(p,k){if(!['gold','confetti'].includes(k)||p.rewards[k])return false;p.rewards[k]=true;return true}
export function merge(a,b){let p=profile(a),q=profile(b);p.stars=p.stars.map((n,i)=>Math.max(n,q.stars[i]));p.trips=Math.max(p.trips,q.trips);p.album=[...new Set([...p.album,...q.album])];for(let k of ['gold','confetti'])p.rewards[k]||=q.rewards[k];return p}
export const cost=(p,k)=>6+5*(p.gear[k]||0);
export function buy(p,k){if(!['rudder','hull','bell'].includes(k)||p.gear[k]>=3||p.tokens<cost(p,k))return false;p.tokens-=cost(p,k);p.gear[k]++;return true}
export function layout(course){let c=COURSES[course],items=[],lanes=[-2.8,2.5,-1.8,2.9,0,-2.6];for(let j=0;j<c.friends;j++){let x=lanes[(j+course)%6],d=22+j*(c.length-49)/(c.friends-1);items.push({type:'friend',id:j,d,x,who:(course*3+j)%18,done:false});items.push({type:'rock',id:20+j,d:d+11,x:x>0?-2:2,width:course<2?.85:1.05,done:false});for(let k=0;k<3;k++)items.push({type:'coin',id:100+j*3+k,d:d-8+k*2,x,done:false});if(course>=2&&j%2===0)items.push({type:'log',id:40+j,d:d+17,x:0,width:1.9,done:false});if(course>=4&&j%2===1)items.push({type:'rock',id:60+j,d:d+16,x:-x*.8,width:.8,done:false});}return items.sort((a,b)=>a.d-b.d)}
export function makeRun(course=0,p=profile()){course=clamp(course|0,0,5);return {course,phase:'welcome',d:0,x:0,vx:0,t:0,elapsed:0,started:false,crew:[],coins:0,hits:0,hp:5+p.gear.hull,inv:0,jump:0,jumpCD:0,slow:3,slowing:false,pickup:null,won:false,payout:0,settled:false,eventSeq:0,events:[],items:layout(course),gear:{...p.gear},hop:unlocked(p)>=2,brake:unlocked(p)>=4}}
export function emit(s,type,data={}){s.events.push({id:++s.eventSeq,type,...data});if(s.events.length>32)s.events.shift()}
export function launch(s){if(s.phase!=='welcome')return false;s.phase='ready';s.t=0;return true}
export function commit(s){if(!['ready','play'].includes(s.phase))return false;if(!s.started){s.started=true;emit(s,'start')}s.phase='play';return true}
export function hop(s){if(!s.hop||s.jumpCD>0||!commit(s))return false;s.jump=.001;s.jumpCD=2.9;emit(s,'hop');return true}
export const height=s=>s.jump>0?Math.sin(Math.min(1,s.jump)*Math.PI)*1.65:0;
export function finish(s,won){if(s.phase==='end')return false;s.phase='end';s.won=won;s.slowing=false;emit(s,'end',{won});return true}
export function stars(s){return s.won?1+(s.crew.length===COURSES[s.course].friends?1:0)+(s.hits===0?1:0):0}
export function settle(p,s){if(s.phase!=='end'||s.settled)return 0;s.settled=true;let reward=(s.won?4+stars(s)*2:2)+Math.floor(s.coins/5);s.payout=reward;p.tokens=clamp(p.tokens+reward,0,999999);if(s.won){p.trips++;p.stars[s.course]=Math.max(p.stars[s.course],stars(s));p.album=[...new Set([...p.album,...s.crew])]}return reward}
export function step(s,dt,input={}){s.t+=dt;if(s.phase==='pickup'){if(s.t>=1.1){s.phase='play';s.t=0;s.pickup=null}return}if(s.phase==='arrive'){s.x+=(0-s.x)*(1-Math.exp(-dt*4));if(s.t>=3)finish(s,s.crew.length>=COURSES[s.course].target);return}if(s.phase!=='play')return;let c=COURSES[s.course];s.elapsed+=dt;s.inv=Math.max(0,s.inv-dt);s.jumpCD=Math.max(0,s.jumpCD-dt);if(s.jump>0){s.jump+=dt;if(s.jump>=1){s.jump=0;emit(s,'land')}}s.slowing=s.brake&&input.slow===true&&s.slow>0;if(s.slowing)s.slow=Math.max(0,s.slow-dt);else s.slow=Math.min(3,s.slow+dt*.45);
 let target=Number.isFinite(input.target)?clamp(input.target,-4.15,4.15):s.x+(input.axis||0)*2.5;let desired=clamp((target-s.x)*5,-5.8-s.gear.rudder*.5,5.8+s.gear.rudder*.5);s.vx+=(desired-s.vx)*(1-Math.exp(-dt*9));s.x=clamp(s.x+s.vx*dt,-4.15,4.15);s.d+=c.speed*dt*(s.slowing?.45:1);
 for(let a of s.items){if(a.done)continue;let delta=s.d-a.d;if(delta>2.8){a.done=true;if(a.type==='friend')emit(s,'miss',{who:a.who});continue}if(Math.abs(delta)>(a.type==='friend'?1.65:1.0))continue;let dx=Math.abs(s.x-a.x);if(a.type==='friend'&&dx<1.3+s.gear.bell*.13&&s.jump===0){a.done=true;s.crew.push(a.who);s.pickup={who:a.who,x:a.x,d:a.d,seat:s.crew.length-1};s.phase='pickup';s.t=0;s.vx*=.2;emit(s,'pickup',{who:a.who,x:a.x,d:a.d});break}if(a.type==='coin'&&dx<1.0){a.done=true;s.coins++;emit(s,'coin',{x:a.x,d:a.d});}if((a.type==='rock'||a.type==='log')&&dx<a.width+1&&s.inv===0&&height(s)<.85){a.done=true;s.hits++;s.hp--;s.inv=1.7;s.vx=s.x<a.x?-4:4;emit(s,'bump',{x:s.x,d:s.d});if(s.hp<=0){finish(s,false);return}}}
 if(s.d>=c.length){s.d=c.length;s.phase='arrive';s.t=0;s.jump=0;s.slowing=false;emit(s,'dock')}
}
export function tick(s,dt,input){if(!Number.isFinite(dt)||dt<=0)return;let left=Math.min(dt,.12);while(left>1e-6){let d=Math.min(.02,left);step(s,d,input);left-=d}}
export function restore(v){if(!v||!Number.isInteger(v.course)||v.course<0||v.course>5||!['welcome','ready','play','pickup','arrive','end'].includes(v.phase))return null;let s={...makeRun(v.course),...v};if(!['d','x','vx','t','elapsed','hp','coins','hits','inv','jump','jumpCD','slow'].every(k=>Number.isFinite(s[k]))||s.d<0||s.d>COURSES[s.course].length||Math.abs(s.x)>4.2||s.hp<0||s.hp>8||s.coins<0||s.hits<0||!Array.isArray(s.crew)||s.crew.length>6||s.crew.some(n=>!Number.isInteger(n)||n<0||n>17)||!Array.isArray(s.items))return null;let expected=layout(v.course);if(s.items.length!==expected.length||s.items.some((a,i)=>a.type!==expected[i].type||a.id!==expected[i].id||a.d!==expected[i].d||a.x!==expected[i].x))return null;s.items=expected.map((a,i)=>({...a,done:!!s.items[i].done}));s.gear=profile({gear:s.gear}).gear;s.hop=!!s.hop;s.brake=!!s.brake;s.started=!!s.started;s.settled=!!s.settled;s.eventSeq=Math.max(0,s.eventSeq|0);s.events=[];s.vx=0;s.jump=0;s.slowing=false;s.pickup=null;if(['play','pickup'].includes(s.phase))s.phase='ready';return s}


