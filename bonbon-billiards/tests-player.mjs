// Independent geometric test player. Not loaded by the browser.
import {create,snapshot,restore,shoot,step,drain,LEVELS,POCKETS,objects,remaining} from './core.js';
function segDist(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy)));return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy)}
export function candidates(s){const cue=s.balls[0].position,out=s.level===2&&s.shots===0?[{angle:Math.PI,power:.9,ball:0,pocket:-1}]:[];for(const target of s.balls.filter(b=>b.id&&b.visible))for(const po of POCKETS){const p=target.position,len=Math.hypot(po.x-p.x,po.y-p.y),u={x:(po.x-p.x)/len,y:(po.y-p.y)/len},g={x:p.x-u.x*26,y:p.y-u.y*26},d1=Math.hypot(g.x-cue.x,g.y-cue.y),v={x:(g.x-cue.x)/d1,y:(g.y-cue.y)/d1},cos=u.x*v.x+u.y*v.y;if(cos<.15)continue;if(g.x<65||g.x>355||g.y<93||g.y>607)continue;
 if(s.balls.some(b=>b.id!==target.id&&b.id&&b.visible&&(segDist(b.position,cue,g)<26.1||segDist(b.position,p,po)<26.1)))continue;
 if(objects(s).some(b=>segDist(b,cue,g)<b.r+13.1||segDist(b,p,po)<b.r+13.1))continue;
 const a=Math.atan2(v.y,v.x),pow=Math.max(.08,Math.min(1,(1.09*d1+(1.09*len+40)/cos-170)/520));for(const power of [pow,Math.min(1,pow+.15),Math.max(.08,pow-.12),.85])out.push({angle:a,power,ball:target.id,pocket:POCKETS.indexOf(po)});
 }
 if(!out.length){for(let a=0;a<36;a++)out.push({angle:a*Math.PI/18,power:.8,ball:0,pocket:-1})}return out}
export function playShot(s,a){const n=restore(snapshot(s,false));shoot(n,a.angle,a.power);let pots=0,scratches=0,banks=0,cap=false,combo=0;for(let i=0;i<1300&&n.phase==='rolling';i++){step(n);for(const e of drain(n)){if(e.type==='pot'){pots++;if(e.bank)banks++;combo=Math.max(combo,e.combo)}if(e.type==='scratch')scratches++;if(e.type==='settlecap')cap=true}}return {s:n,pots,scratches,banks,cap,combo}}
export function plan(s){let best=null;for(const a of candidates(s)){const p=playShot(s,a);const dist=p.s.balls.filter(b=>b.id&&b.visible).reduce((t,b)=>t+Math.min(...POCKETS.map(po=>Math.hypot(po.x-b.position.x,po.y-b.position.y))),0);const value=p.pots*1000000-p.scratches*200000+p.s.score-dist*.1;if(!best||value>best.value)best={a,...p,value}}return best}
