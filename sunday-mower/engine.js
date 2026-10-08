(function(root){'use strict';
const COLS=28,ROWS=32,SIZE=20,X=80,Y=150;
const yards=[
 {name:'Sunday morning',beds:[],thick:0,water:[],color:0},
 {name:'Rose cottage',beds:[[8,8,5,4],[17,20,5,4]],thick:0,water:[],color:0},
 {name:'The long grass',beds:[[12,11,4,10]],thick:1,water:[],color:1},
 {name:'Sprinkler dance',beds:[[4,14,6,4],[19,14,5,4]],thick:0,water:[[14,8],[14,25]],color:0},
 {name:'Kitchen garden',beds:[[6,6,5,6],[17,6,5,6],[6,21,5,6],[17,21,5,6]],thick:1,water:[],color:1},
 {name:'Apricot afternoon',beds:[[11,5,6,5],[5,17,5,5],[18,21,5,5]],thick:1,water:[[21,11]],color:2},
 {name:'Moonflower lane',beds:[[5,7,6,4],[17,14,6,4],[5,23,6,4]],thick:1,water:[[19,25],[8,17]],color:3},
 {name:'The grand lawn',beds:[[6,6,4,5],[18,6,4,5],[12,15,4,5],[6,24,4,4],[18,24,4,4]],thick:1,water:[[7,17],[22,21]],color:2}
];
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function blocked(level,x,y,r=12){return yards[level].beds.some(([a,b,w,h])=>x>X+a*SIZE-r&&x<X+(a+w)*SIZE+r&&y>Y+b*SIZE-r&&y<Y+(b+h)*SIZE+r)}
function create(level=0){level=clamp(level|0,0,7);const cells=[];let total=0;
for(let j=0;j<ROWS;j++)for(let i=0;i<COLS;i++){const x=X+i*SIZE+10,y=Y+j*SIZE+10,solid=blocked(level,x,y,2),tall=yards[level].thick&&((i*7+j*3)%17<6)&&i>1&&j>2;const g=solid?0:tall?2:1;cells.push({i,j,g,max:g,last:-9});total+=g}
const spots=[[3,7],[24,15],[14,29]].map(([i,j],k)=>{let c=cells[j*COLS+i];while(!c.max)c=cells[(cells.indexOf(c)+1)%cells.length];return{x:X+c.i*SIZE+10,y:Y+c.j*SIZE+10,found:false,k}});
return{v:1,level,cells,total,cut:0,x:X+30,y:Y+30,angle:0,t:0,charge:0,turbo:0,chain:0,gap:0,score:0,spots,won:false,rating:0,events:[],wet:false};}
function step(s,dt,input={}){if(s.won)return;dt=clamp(dt,0,.04);s.t+=dt;s.turbo=Math.max(0,s.turbo-dt);
if(input.boost&&s.charge>=30&&s.turbo<=0){s.charge-=30;s.turbo=2.1;s.events.push({type:'boost',x:s.x,y:s.y})}
s.wet=yards[s.level].water.some(([i,j],k)=>Math.sin(s.t*1.2+k*2)>.1&&Math.hypot(s.x-(X+i*20+10),s.y-(Y+j*20+10))<85);
let tx=Number.isFinite(input.x)?input.x:s.x,ty=Number.isFinite(input.y)?input.y:s.y,dx=tx-s.x,dy=ty-s.y,d=Math.hypot(dx,dy),speed=(s.turbo>0?245:155)*(s.wet?.6:1),move=Math.min(d,speed*dt),oldx=s.x,oldy=s.y;
if(d>2){let nx=clamp(s.x+dx/d*move,X+11,X+COLS*SIZE-11),ny=clamp(s.y+dy/d*move,Y+11,Y+ROWS*SIZE-11);if(!blocked(s.level,nx,s.y))s.x=nx;if(!blocked(s.level,s.x,ny))s.y=ny;const target=Math.atan2(s.y-oldy,s.x-oldx);if(Math.hypot(s.x-oldx,s.y-oldy)>.1)s.angle+=Math.atan2(Math.sin(target-s.angle),Math.cos(target-s.angle))*Math.min(1,dt*14)}
let n=0;if(Math.hypot(s.x-oldx,s.y-oldy)>.1){const r=s.turbo>0?43:28;for(const c of s.cells)if(c.g&&s.t-c.last>.65&&Math.hypot(X+c.i*20+10-s.x,Y+c.j*20+10-s.y)<r){c.g--;c.last=s.t;s.cut++;n++;s.events.push({type:'cut',x:X+c.i*20+10,y:Y+c.j*20+10,tall:c.max===2})}}
if(n){s.gap=0;s.chain+=n;s.score+=n*(1+Math.min(4,Math.floor(s.chain/35)));s.charge=clamp(s.charge+n*.8,0,100)}else{s.gap+=dt;if(s.gap>1)s.chain=0}
for(const p of s.spots)if(!p.found&&Math.hypot(p.x-s.x,p.y-s.y)<40&&!s.cells.some(c=>c.g&&Math.hypot(X+c.i*20+10-p.x,Y+c.j*20+10-p.y)<24)){p.found=true;s.events.push({type:'find',...p});s.score+=150}
if(s.cut>=s.total&&s.spots.every(p=>p.found))finish(s);}
function finish(s){if(s.won||s.cut/s.total<.9)return false;s.won=true;s.rating=1+(s.cut/s.total>=.98?1:0)+(s.cut/s.total>=.98&&s.spots.every(p=>p.found)?1:0);s.events.push({type:'win',x:s.x,y:s.y});return true}
function restore(raw){try{if(!Number.isInteger(raw.level)||raw.level<0||raw.level>7||typeof raw.won!=='boolean'||!Number.isInteger(raw.rating)||raw.rating<0||raw.rating>3)return null;const fresh=create(raw.level);if(raw.v!==1||raw.cells.length!==fresh.cells.length)return null;for(let i=0;i<fresh.cells.length;i++){const a=raw.cells[i],b=fresh.cells[i];if(a.i!==b.i||a.j!==b.j||a.max!==b.max||!Number.isInteger(a.g)||a.g<0||a.g>b.max||!Number.isFinite(a.last))return null}for(const k of ['x','y','angle','t','charge','turbo','score','cut','total','chain','gap'])if(!Number.isFinite(raw[k]))return null;if(raw.cut!==raw.cells.reduce((n,c)=>n+c.max-c.g,0)||raw.total!==fresh.total||raw.x<X||raw.x>X+560||raw.y<Y||raw.y>Y+640||raw.charge<0||raw.charge>100||raw.turbo<0||raw.turbo>2.1||raw.t<0)return null;if(!Array.isArray(raw.spots)||raw.spots.length!==3)return null;for(let i=0;i<3;i++)if(raw.spots[i].x!==fresh.spots[i].x||raw.spots[i].y!==fresh.spots[i].y||typeof raw.spots[i].found!=='boolean')return null;if(raw.won&&(raw.cut/raw.total<.9||raw.rating!==1+(raw.cut/raw.total>=.98?1:0)+(raw.cut/raw.total>=.98&&raw.spots.every(p=>p.found)?1:0)))return null;return JSON.parse(JSON.stringify({...raw,events:[]}))}catch{return null}}
const api={yards,create,step,finish,restore,blocked,X,Y,COLS,ROWS};if(typeof module!=='undefined')module.exports=api;root.Mower=api;
})(typeof window==='undefined'?globalThis:window);
