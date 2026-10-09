(function(root){
'use strict';
const copy=x=>JSON.parse(JSON.stringify(x));
const paths=[ [0,1,2,5,4,3,6,7,8],[0,3,6,7,4,1,2,5,8],[0,1,4,3,6,7,8,5,2],[2,1,0,3,4,5,8,7,6],[6,3,0,1,4,7,8,5,2],[8,7,6,3,4,5,2,1,0],[2,5,8,7,4,1,0,3,6],[6,7,8,5,2,1,4,3,0] ];
const names=['Fernwake','Peachwater','Honey Hill','Bluebell Bay','Copperwood','Snowdrop','Lantern Lake','Starling Isles'];
const delta=[-3,1,3,-1];
function direction(a,b){return b===a-3?0:b===a+1?1:b===a+3?2:3;}
function random(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
class Atlas{
 constructor(n=1,seed=n*739){this.n=Math.max(1,Math.min(9999,n|0));this.seed=seed>>>0;this.theme=(this.n-1)%8;this.name=names[this.theme];this.clock=0;this.moves=0;this.hints=0;this.state='edit';this.hero=0;this.walk=[];this.leg=0;this.collected=[];this.history=[];this.events=[];this.tiles=[];const path=paths[this.theme];
  for(let id=0;id<9;id++){const pos=path[id],links=[];if(id)links.push(direction(pos,path[id-1]));if(id<8)links.push(direction(pos,path[id+1]));this.tiles.push({id,pos,rot:0,links,stamp:[2,4,6].includes(id),home:id===0,goal:id===8});}
  const rng=random(this.seed);for(let k=0;k<5+this.theme;k++){const a=Math.floor(rng()*9),b=(a+1+Math.floor(rng()*8))%9;[this.tiles[a].pos,this.tiles[b].pos]=[this.tiles[b].pos,this.tiles[a].pos];}for(const t of this.tiles)t.rot=Math.floor(rng()*4);this.initial=copy(this.tiles);this.par=22+this.theme*2;this.hero=0;
 }
 tileAt(pos){return this.tiles.find(t=>t.pos===pos);}
 edges(t){return t.links.map(d=>(d+t.rot)%4);}
 neighbors(id){const t=this.tiles[id],out=[];for(const d of this.edges(t)){const row=Math.floor(t.pos/3),col=t.pos%3;if(d===0&&row===0||d===2&&row===2||d===1&&col===2||d===3&&col===0)continue;const b=this.tileAt(t.pos+delta[d]);if(this.edges(b).includes((d+2)%4))out.push(b.id);}return out;}
 route(from,to){const q=[[from]],seen=new Set([from]);while(q.length){const p=q.shift(),id=p[p.length-1];if(id===to)return p;for(const b of this.neighbors(id))if(!seen.has(b)){seen.add(b);q.push([...p,b]);}}return null;}
 reachable(){const set=[];for(let i=0;i<9;i++)if(this.route(0,i))set.push(i);return set;}
 remember(){this.history.push({tiles:copy(this.tiles),moves:this.moves});if(this.history.length>150)this.history.shift();}
 rotate(id){if(this.state!=='edit'||!this.tiles[id])return false;this.remember();this.tiles[id].rot=(this.tiles[id].rot+1)%4;this.moves++;this.emit('turn',id);return true;}
 swap(a,b){if(this.state!=='edit'||a===b||!this.tiles[a]||!this.tiles[b])return false;this.remember();[this.tiles[a].pos,this.tiles[b].pos]=[this.tiles[b].pos,this.tiles[a].pos];this.moves++;this.emit('swap',b);return true;}
 undo(){if(this.state!=='edit'||!this.history.length)return false;const h=this.history.pop();this.tiles=h.tiles;this.moves=h.moves;this.emit('undo',0);return true;}
 hint(){if(this.state!=='edit')return false;const target=paths[this.theme];for(const t of this.tiles){if(t.pos!==target[t.id]){this.swap(t.id,this.tileAt(target[t.id]).id);this.hints++;return true;}}for(const t of this.tiles){if(t.rot!==0){this.remember();t.rot=0;this.moves++;this.hints++;this.emit('turn',t.id);return true;}}return false;}
 explore(){if(this.state!=='edit')return false;this.state='walk';this.hero=0;this.collected=[];this.walk=[0];this.leg=0;let at=0;for(const id of [2,4,6,8]){const p=this.route(at,id);if(!p)break;this.walk.push(...p.slice(1));at=id;}this.emit('go',0);return true;}
 edit(){if(this.state!=='walk')return;this.state='edit';this.hero=0;this.collected=[];this.leg=0;this.walk=[];this.emit('back',0);}
 update(dt){if(!Number.isFinite(dt)||dt<=0||this.state==='won')return;dt=Math.min(dt,.1);this.clock+=dt;if(this.state!=='walk')return;this.leg+=dt*1.7;if(this.leg<1)return;this.leg-=1;if(this.walk.length>1){this.walk.shift();this.hero=this.walk[0];const t=this.tiles[this.hero];if(t.stamp&&!this.collected.includes(t.id)){this.collected.push(t.id);this.emit('stamp',t.id);}}if(this.walk.length===1){if(this.hero===8&&this.collected.length===3){this.state='won';this.stars=1+(this.moves<=this.par?1:0)+(this.hints===0?1:0);this.emit('win',8);}else {this.emit('blocked',this.hero);this.state='edit';this.hero=0;this.walk=[];this.leg=0;this.collected=[];}}}
 emit(type,id){this.events.push({type,id});if(this.events.length>20)this.events.shift();}
 snapshot(){const v=copy(this);v.events=[];return v;}
 static restore(s){if(!s||!Number.isInteger(s.n)||s.n<1||s.n>9999||!Array.isArray(s.tiles)||s.tiles.length!==9||!['edit','walk','won'].includes(s.state))return null;const g=new Atlas(s.n,s.seed),ids=new Set(),pos=new Set();for(const t of s.tiles){if(!Number.isInteger(t.id)||t.id<0||t.id>8||!Number.isInteger(t.pos)||t.pos<0||t.pos>8||!Number.isInteger(t.rot)||t.rot<0||t.rot>3||ids.has(t.id)||pos.has(t.pos))return null;ids.add(t.id);pos.add(t.pos);if(JSON.stringify(t.links)!==JSON.stringify(g.tiles[t.id].links))return null;}if(!Number.isFinite(s.clock)||!Number.isFinite(s.leg)||!Array.isArray(s.walk)||s.walk.some(x=>!Number.isInteger(x)||x<0||x>8)||!Array.isArray(s.collected)||s.collected.some(x=>![2,4,6].includes(x))||!Number.isInteger(s.moves)||s.moves<0)return null;Object.assign(g,copy(s));g.events=[];return g;}
}
root.Atlas=Atlas;root.ATLAS_PATHS=paths;if(typeof module!=='undefined')module.exports={Atlas,paths};
})(typeof window==='undefined'?globalThis:window);
