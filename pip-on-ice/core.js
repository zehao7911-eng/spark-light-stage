export const W=272,H=284,R=10;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const LEVELS=[
 {name:'A Little Nudge',theme:0,start:[136,250],goal:[136,50],fish:[[136,190],[136,140],[136,90]],par:1,blocks:[],pads:[]},
 {name:'Around the Icebox',theme:0,start:[48,244],goal:[218,48],fish:[[50,170],[92,75],[175,48]],par:3,blocks:[[112,128,48,56]],pads:[]},
 {name:'The Cushioned Corner',theme:0,start:[48,240],goal:[220,60],fish:[[48,148],[130,55],[214,120]],par:3,blocks:[[101,140,72,36]],pads:[[205,207,25]]},
 {name:'Two Ways Home',theme:0,start:[136,250],goal:[136,36],fish:[[48,190],[224,120],[136,88]],par:4,blocks:[[104,141,64,42]],pads:[[50,90,22]]},
 {name:'Lantern Lane',theme:1,start:[42,240],goal:[227,43],fish:[[45,120],[122,44],[223,125]],par:4,blocks:[[93,101,32,95],[167,142,32,95]],pads:[]},
 {name:'Soft Landing',theme:1,start:[136,250],goal:[136,38],fish:[[71,206],[208,139],[136,80]],par:4,blocks:[[109,131,54,42]],pads:[[51,88,27],[223,210,25]]},
 {name:'The Moon Bridge',theme:1,start:[42,248],goal:[228,40],fish:[[42,164],[132,86],[222,155]],par:4,blocks:[[93,169,86,26],[93,108,26,61]],pads:[[210,231,22]]},
 {name:'A Warm Welcome',theme:1,start:[230,247],goal:[45,38],fish:[[230,135],[132,45],[47,121]],par:4,blocks:[[91,135,90,38]],pads:[[135,223,29]]},
 {name:'Northern Lights',theme:2,start:[136,250],goal:[136,34],fish:[[41,170],[233,170],[136,90]],par:5,blocks:[[112,180,48,27],[89,116,94,26]],pads:[]},
 {name:'Snowdrop Crossing',theme:2,start:[42,247],goal:[230,40],fish:[[44,86],[145,217],[224,119]],par:5,blocks:[[89,115,30,110],[163,64,30,110]],pads:[[222,226,22]]},
 {name:'The Cosy Detour',theme:2,start:[228,246],goal:[45,40],fish:[[42,219],[139,83],[231,122]],par:5,blocks:[[101,164,71,27],[101,109,27,55]],pads:[[192,47,27],[56,141,21]]},
 {name:'Home Before Sunrise',theme:2,start:[136,250],goal:[136,37],fish:[[43,190],[229,138],[72,57]],par:6,blocks:[[96,176,80,26],[96,109,26,67],[164,65,26,67]],pads:[[226,221,23],[46,112,22]]}
];
export function fresh(i=0){i=clamp(Math.floor(i)||0,0,LEVELS.length-1);const l=LEVELS[i];return {i,x:l.start[0],y:l.start[1],vx:0,vy:0,moving:false,won:false,shots:0,fish:0,banks:0,events:[],history:[]};}
export function snapshot(s){return {i:s.i,x:s.x,y:s.y,vx:s.vx,vy:s.vy,moving:s.moving,won:s.won,shots:s.shots,fish:s.fish,banks:s.banks};}
export function launch(s,dx,dy){if(s.won||s.moving||!Number.isFinite(dx+dy))return false;const d=Math.hypot(dx,dy);if(d<6)return false;s.history.push(snapshot(s));if(s.history.length>40)s.history.shift();const speed=clamp(d*3.5,32,270);s.vx=dx/d*speed;s.vy=dy/d*speed;s.shots++;s.moving=true;s.events.push({type:'launch',x:s.x,y:s.y});return true;}
export function undo(s){if(!s.history.length)return false;const p=s.history.pop(),h=s.history;Object.assign(s,p);s.history=h;s.events=[{type:'undo',x:s.x,y:s.y}];return true;}
export function step(s,dt){if(!s.moving||s.won)return;const l=LEVELS[s.i];dt=clamp(dt,0,1/60);let speed=Math.hypot(s.vx,s.vy),drag=88;for(const [x,y,r]of l.pads)if(Math.hypot(s.x-x,s.y-y)<r)drag=175;
 const k=Math.max(0,speed-drag*dt)/Math.max(.00001,speed);s.vx*=k;s.vy*=k;s.x+=s.vx*dt;s.y+=s.vy*dt;
 let hit=false;
 if(s.x<R){s.x=R;s.vx=Math.abs(s.vx)*.88;hit=true;}if(s.x>W-R){s.x=W-R;s.vx=-Math.abs(s.vx)*.88;hit=true;}if(s.y<R){s.y=R;s.vy=Math.abs(s.vy)*.88;hit=true;}if(s.y>H-R){s.y=H-R;s.vy=-Math.abs(s.vy)*.88;hit=true;}
 for(const [x,y,w,h]of l.blocks){const cx=clamp(s.x,x,x+w),cy=clamp(s.y,y,y+h),dx=s.x-cx,dy=s.y-cy,d=Math.hypot(dx,dy);if(d<R){let nx,ny,depth;if(d>.00001){nx=dx/d;ny=dy/d;depth=R-d;}else{const a=[[s.x-x,-1,0],[x+w-s.x,1,0],[s.y-y,0,-1],[y+h-s.y,0,1]].sort((a,b)=>a[0]-b[0])[0];nx=a[1];ny=a[2];depth=a[0]+R;}s.x+=nx*depth;s.y+=ny*depth;let dot=s.vx*nx+s.vy*ny;if(dot<0){s.vx-=1.86*dot*nx;s.vy-=1.86*dot*ny;hit=true;}}}
 if(hit){s.banks++;s.events.push({type:'bank',x:s.x,y:s.y});}
 for(let n=0;n<3;n++)if(!(s.fish&(1<<n))&&Math.hypot(s.x-l.fish[n][0],s.y-l.fish[n][1])<18){s.fish|=1<<n;s.events.push({type:'fish',x:l.fish[n][0],y:l.fish[n][1],n});}
 speed=Math.hypot(s.vx,s.vy);if(Math.hypot(s.x-l.goal[0],s.y-l.goal[1])<23&&speed<110){s.x=l.goal[0];s.y=l.goal[1];s.vx=s.vy=0;s.moving=false;s.won=true;s.events.push({type:'win',x:s.x,y:s.y});return;}
 if(speed<3){s.vx=s.vy=0;s.moving=false;s.events.push({type:'rest',x:s.x,y:s.y});}
}
export function predict(s,dx,dy){const p={...snapshot(s),history:[],events:[]};if(!launch(p,dx,dy))return {points:[],end:p};const points=[[p.x,p.y]];for(let k=0;k<2400&&p.moving;k++){step(p,1/180);if(k%18===0)points.push([p.x,p.y]);p.events=[];}points.push([p.x,p.y]);return {points,end:p};}
export function stars(s){return s.won?1+(s.fish===7?1:0)+(s.shots<=LEVELS[s.i].par?1:0):0;}
export function score(s){return s.won?300+100*pop(s.fish)+Math.max(0,LEVELS[s.i].par-s.shots+1)*50:100*pop(s.fish);}
export function pop(n){return (n&1)+((n>>1)&1)+((n>>2)&1);}
export function restore(p){try{if(!p||!Number.isInteger(p.i)||p.i<0||p.i>=12)return fresh();let s=fresh(p.i);for(const k of ['x','y','vx','vy'])if(!Number.isFinite(p[k]))return fresh(p.i);if(p.x<R||p.x>W-R||p.y<R||p.y>H-R||Math.hypot(p.vx,p.vy)>271)return fresh(p.i);for(const k of ['shots','fish','banks'])if(!Number.isInteger(p[k])||p[k]<0||p[k]>(k==='fish'?7:100000))return fresh(p.i);Object.assign(s,snapshot(p));s.moving=!!p.moving;s.won=!!p.won;if(s.won){s.x=LEVELS[s.i].goal[0];s.y=LEVELS[s.i].goal[1];s.vx=s.vy=0;s.moving=false;}if(!s.moving)s.vx=s.vy=0;return s;}catch{return fresh();}}
