import {Ball,Vector2,R,BOUNDS,POCKETS,collide,cushion,pocket,bumper} from './source-physics.js';
export {R,BOUNDS,POCKETS};
export const LEVELS=[
 {name:'First Sweet',theme:0,par:1,limit:4,cue:[245,350],balls:[[125,350]]},
 {name:'Peach Pair',theme:0,par:2,limit:7,cue:[210,450],balls:[[118,261],[302,261]]},
 {name:'Double Dip',theme:0,par:1,limit:6,cue:[340,225],balls:[[195,210],[195,240]],aim:Math.PI,power:.9},
 {name:'Sugar Cluster',theme:0,par:6,limit:11,cue:[210,490],balls:[[210,244],[183,217],[237,217],[210,190]]},
 {name:'Mint Salon',theme:1,par:3,limit:10,cue:[210,490],balls:[[109,230],[311,230],[120,470]],bumpers:[[210,350,23]]},
 {name:'The Long Way',theme:1,par:3,limit:11,cue:[210,510],balls:[[111,180],[309,180],[309,520]],bumpers:[[145,350,23],[275,350,23]]},
 {name:'Petit Cascade',theme:1,par:4,limit:12,cue:[210,500],balls:[[144,208],[276,208],[116,400],[304,400]],bumpers:[[210,300,22]]},
 {name:'Pearl Bouquet',theme:1,par:5,limit:13,cue:[210,530],balls:[[210,200],[183,227],[237,227],[156,254],[264,254]]},
 {name:'Violet Room',theme:2,par:5,limit:13,cue:[210,500],balls:[[116,195],[304,195],[114,455],[306,455]],bumpers:[[210,320,25]]},
 {name:'Moonlit Quartet',theme:2,par:7,limit:14,cue:[210,520],balls:[[142,170],[278,170],[142,400],[278,400]],bumpers:[[210,275,22],[210,440,22]]},
 {name:'A Little Ricochet',theme:2,par:9,limit:15,cue:[210,530],balls:[[120,178],[300,178],[114,375],[306,375],[210,220]],bumpers:[[160,450,21],[260,450,21]]},
 {name:'After-Dinner Stars',theme:2,par:11,limit:18,cue:[210,540],balls:[[157,174],[210,174],[263,174],[130,220],[183,220],[237,220]],bumpers:[[142,360,23],[278,360,23]]}
];
export function create(level=0){const l=LEVELS[level];const s={v:1,level,balls:[new Ball(new Vector2(...l.cue),0),...l.balls.map((p,i)=>new Ball(new Vector2(...p),i+1))],shots:0,scratches:0,score:0,combo:0,streak:0,bestCombo:0,undos:0,history:[],phase:'ready',angle:level===0?Math.PI:-Math.PI/2,power:.55,shotPots:0,shotScratch:false,elapsed:0,ended:false,won:false,events:[],time:0};
 if(level){const b=s.balls[1].position,p=POCKETS.reduce((a,p)=>Math.hypot(p.x-b.x,p.y-b.y)<Math.hypot(a.x-b.x,a.y-b.y)?p:a,POCKETS[0]),len=Math.hypot(p.x-b.x,p.y-b.y);s.angle=Math.atan2(b.y-(p.y-b.y)/len*26-l.cue[1],b.x-(p.x-b.x)/len*26-l.cue[0]);s.power=.75}
 if(l.aim!==undefined)s.angle=l.aim;if(l.power!==undefined)s.power=l.power;return s}
export function objects(s){return (LEVELS[s.level].bumpers||[]).map(([x,y,r])=>({x,y,r}))}
export function remaining(s){return s.balls.filter(b=>b.id&&b.visible).length}
export function moving(s){return s.balls.some(b=>b.visible&&b.moving)}
export function snapshot(s,history=true){const copy={...s,balls:s.balls.map(b=>({id:b.id,x:b.position.x,y:b.position.y,vx:b.velocity.x,vy:b.velocity.y,visible:b.visible,roll:b.roll,rails:b.rails})),events:[],history:history?s.history:[]};return copy}
export function restore(data){try{const d=typeof data==='string'?JSON.parse(data):structuredClone(data);const l=LEVELS[d?.level];if(!l||d.v!==1||!Array.isArray(d.balls)||d.balls.length!==l.balls.length+1||!['ready','rolling','won','lost'].includes(d.phase)||!['shots','scratches','score','combo','streak','bestCombo','undos','elapsed','time','angle','power'].every(k=>Number.isFinite(d[k]))||d.shots<0||d.shots>10000||d.power<0||d.power>1||!Array.isArray(d.history)||d.history.length>20)return null;
 const ids=new Set();for(const b of d.balls){if(!Number.isInteger(b.id)||b.id<0||b.id>=d.balls.length||ids.has(b.id)||![b.x,b.y,b.vx,b.vy,b.roll,b.rails].every(Number.isFinite)||Math.abs(b.vx)>1500||Math.abs(b.vy)>1500||b.x<0||b.x>420||b.y<0||b.y>700)return null;ids.add(b.id)}
 d.balls=d.balls.sort((a,b)=>a.id-b.id).map(b=>{const n=new Ball(new Vector2(b.x,b.y),b.id);n.velocity=new Vector2(b.vx,b.vy);n.roll=b.roll;n.rails=b.rails;if(!b.visible)n.hide();return n});d.events=[];d.history=d.history.filter(h=>h.level===d.level&&Array.isArray(h.balls)&&h.balls.length===d.balls.length&&h.balls.every(b=>[b.x,b.y,b.vx,b.vy,b.roll,b.rails].every(Number.isFinite)));return d}catch{return null}}
export function shoot(s,angle=s.angle,power=s.power){if(s.phase!=='ready'||s.ended||!Number.isFinite(angle)||!Number.isFinite(power))return false;s.history.push(snapshot(s,false));s.history=s.history.slice(-20);s.shots++;s.shotPots=0;s.shotScratch=false;s.combo=0;s.elapsed=0;s.phase='rolling';s.angle=angle;s.power=Math.max(.08,Math.min(1,power));s.balls[0].shoot(170+s.power*520,angle);for(const b of s.balls)b.rails=0;s.events.push({type:'shot',power:s.power});return true}
export function undoShot(s){if(!s.history.length)return null;const history=s.history.slice(0,-1),prev=restore(s.history.at(-1));if(!prev)return null;prev.history=history;prev.undos=s.undos+1;prev.phase='ready';prev.events=[{type:'undo'}];return prev}
function safeCue(s){const orig=LEVELS[s.level].cue,spots=[orig];for(let y=560;y>=140;y-=42)for(let x=90;x<350;x+=42)spots.push([x,y]);for(const p of spots){const v=new Vector2(...p);if(s.balls.every(b=>!b.visible||!b.id||v.distFrom(b.position)>R*2+3)&&objects(s).every(o=>v.distFrom(o)>o.r+R+3)&&pocket(v)<0){s.balls[0].show(v);return}}s.balls[0].show(new Vector2(210,570))}
function settle(s){if(s.shotPots)s.streak=Math.min(4,s.streak+1);else s.streak=0;if(s.shotScratch)safeCue(s);if(!remaining(s)){s.phase='won';s.ended=true;s.won=true;s.events.push({type:'win'})}else if(s.shots>=LEVELS[s.level].limit){s.phase='lost';s.ended=true;s.won=false;s.events.push({type:'loss'})}else{s.phase='ready';s.events.push({type:'ready'})}}
export function step(s,dt=1/120){if(s.phase!=='rolling'||s.ended)return;s.time+=dt;s.elapsed+=dt;
 for(const b of s.balls){if(!b.visible)continue;b.update(dt);const p=pocket(b.position);if(p>=0){const pos=b.position;b.hide();if(b.id===0){s.scratches++;s.shotScratch=true;s.events.push({type:'scratch',x:pos.x,y:pos.y,pocket:p,id:b.id})}else{s.shotPots++;s.combo=s.shotPots;s.bestCombo=Math.max(s.bestCombo,s.combo);const points=100*s.combo*Math.min(4,s.streak+1)+(b.rails?50:0);s.score+=points;s.events.push({type:'pot',x:pos.x,y:pos.y,pocket:p,id:b.id,combo:s.combo,points,bank:b.rails>0})}continue}if(cushion(b))s.events.push({type:'rail',x:b.position.x,y:b.position.y,power:b.velocity.length,id:b.id});for(const o of objects(s))if(bumper(b,o))s.events.push({type:'bumper',x:b.position.x,y:b.position.y,power:b.velocity.length,id:b.id})}
 for(let i=0;i<s.balls.length;i++)for(let j=i+1;j<s.balls.length;j++)if(collide(s.balls[i],s.balls[j]))s.events.push({type:'hit',x:(s.balls[i].position.x+s.balls[j].position.x)/2,y:(s.balls[i].position.y+s.balls[j].position.y)/2,power:s.balls[i].velocity.length+s.balls[j].velocity.length});
 // Hard cap only as a fail-safe; normal shots settle naturally in <6 seconds.
 if(s.elapsed>10){for(const b of s.balls)b.velocity=Vector2.zero;s.events.push({type:'settlecap'})}if(!moving(s))settle(s);s.events=s.events.slice(-80)
}
export function drain(s){const ev=s.events;s.events=[];return ev}
export function medals(s){return s.won?1+Number(s.shots<=LEVELS[s.level].par&&s.undos===0)+Number(s.scratches===0):0}
export function total(p){return p.best.reduce((a,b)=>a+b,0)}
export function reward(p,s){if(!s.won)return;p.best[s.level]=Math.max(p.best[s.level],medals(s));p.scores[s.level]=Math.max(p.scores[s.level],s.score);p.unlocked=Math.max(p.unlocked,Math.min(11,s.level+1))}
export function preview(s,angle=s.angle){const q=s.balls[0];if(!q.visible)return null;const v={x:Math.cos(angle),y:Math.sin(angle)},p=q.position;let best={distance:1100,type:'rail',x:p.x,y:p.y};
 const hit=(x,y,r,type,id)=>{const dx=x-p.x,dy=y-p.y,along=dx*v.x+dy*v.y,perp=dx*dx+dy*dy-along*along;if(along<0||perp>r*r)return;const d=along-Math.sqrt(Math.max(0,r*r-perp));if(d>=0&&d<best.distance)best={distance:d,type,id,x:p.x+v.x*d,y:p.y+v.y*d}};
 for(const b of s.balls)if(b.id&&b.visible)hit(b.position.x,b.position.y,R*2,'ball',b.id);for(const o of objects(s))hit(o.x,o.y,o.r+R,'bumper');
 for(const [axis,edge] of [['x',BOUNDS.left+R],['x',BOUNDS.right-R],['y',BOUNDS.top+R],['y',BOUNDS.bottom-R]]){const d=(edge-p[axis])/v[axis];if(d>0&&d<best.distance){const x=p.x+v.x*d,y=p.y+v.y*d;if(x>=BOUNDS.left&&x<=BOUNDS.right&&y>=BOUNDS.top&&y<=BOUNDS.bottom)best={distance:d,type:'rail',x,y}}}return best}

