(function(root){'use strict';const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const stages=[
{name:'First little melody',bells:[[200,300],[510,310],[355,450],[200,620],[510,650]],posts:[],stars:[[365,225],[145,480],[415,715]],palette:0},
{name:'Copper conversation',bells:[[170,300],[550,320],[260,465,2],[490,545],[200,700,2]],posts:[[370,340,35],[370,650,35]],stars:[[365,240],[120,570],[575,710]],palette:1},
{name:'Paper carousel',bells:[[200,285,1,35],[500,325,1,40],[310,450,1,35],[175,620],[520,665,1,25]],posts:[[465,465,37]],stars:[[355,270],[120,450],[355,735]],palette:0},
{name:'A pocket of rain',bells:[[140,290],[350,320,2],[570,290],[220,490],[505,530,2],[330,705]],posts:[[360,470,43],[140,670,28]],stars:[[250,245],[590,650],[170,755]],palette:2},
{name:'The velvet waltz',bells:[[170,305,2,25],[520,330,1,30],[350,465,2],[170,610],[520,665,2]],posts:[[295,290,29],[270,625,34],[450,510,30]],stars:[[450,250],[120,470],[370,755]],palette:3},
{name:'Two tiny orchestras',bells:[[145,300],[360,290,2,25],[575,310],[210,470,2],[500,470,2],[165,685],[520,700,1,35]],posts:[[355,440,29],[355,630,33]],stars:[[255,235],[590,575],[275,745]],palette:1},
{name:'Midnight suite',bells:[[180,305,2,30],[515,305,2,30],[335,440,1,40],[140,580],[560,580],[275,705,2]],posts:[[265,550,29],[445,650,33]],stars:[[360,245],[600,425],[120,755]],palette:3},
{name:'A box full of stars',bells:[[140,285,2],[350,310,2,32],[565,285,2],[220,470,1,30],[500,495,2],[150,695,2],[550,705,2]],posts:[[360,465,35],[365,670,29]],stars:[[250,230],[600,580],[280,765]],palette:2}
];
function create(level=0){level=clamp(level|0,0,7);const d=stages[level];return{version:1,level,t:0,hx:360,hy:170,x:360,y:290,vx:0,vy:0,length:120,reeling:false,bells:d.bells.map((b,i)=>({id:i,left:b[2]||1,inside:false,flash:0})),stars:d.stars.map((p,i)=>({id:i,found:false})),hits:0,combo:0,chainClock:0,glow:0,won:false,rating:0,events:[]}}
function bellPos(s,i){const b=stages[s.level].bells[i];return{x:b[0]+Math.sin(s.t*.95+i*2.1)*(b[3]||0),y:b[1]+(b[3]?Math.sin(s.t*.73+i)*12:0)}}
function step(s,dt,input={}){if(s.won)return;dt=clamp(dt,0,1/30);s.t+=dt;s.glow=Math.max(0,s.glow-dt);s.chainClock=Math.max(0,s.chainClock-dt);if(!s.chainClock)s.combo=0;
 const tx=Number.isFinite(input.x)?clamp(input.x,90,630):s.hx,ty=Number.isFinite(input.y)?clamp(input.y,145,690):s.hy;const dx=tx-s.hx,dy=ty-s.hy,d=Math.hypot(dx,dy),travel=Math.min(d,dt*540);if(d>0){s.hx+=dx/d*travel;s.hy+=dy/d*travel}
 const reel=!!input.reel;if(reel&&!s.reeling)s.events.push({type:'reel',x:s.hx,y:s.hy});s.reeling=reel;s.length+=((reel?58:120)-s.length)*Math.min(1,dt*10);
 // A slack, unilateral elastic tether. The hand is kinematic; the yo-yo has momentum.
 let rx=s.x-s.hx,ry=s.y-s.hy,dist=Math.hypot(rx,ry)||1,tension=Math.max(0,dist-s.length)*65;
 s.vx+=(-rx/dist*tension-s.vx*2.4)*dt;s.vy+=(440-ry/dist*tension-s.vy*2.4)*dt;
 let v=Math.hypot(s.vx,s.vy);if(v>850){s.vx*=850/v;s.vy*=850/v}s.x+=s.vx*dt;s.y+=s.vy*dt;
 for(const [x,y,r]of stages[s.level].posts){const dx=s.x-x,dy=s.y-y,d=Math.hypot(dx,dy),rr=r+18;if(d<rr){const nx=dx/(d||1),ny=dy/(d||1);s.x=x+nx*rr;s.y=y+ny*rr;const dot=s.vx*nx+s.vy*ny;if(dot<0){s.vx-=1.65*dot*nx;s.vy-=1.65*dot*ny;if(-dot>90)s.events.push({type:'bump',x:s.x,y:s.y})}}}
 if(s.x<76||s.x>644){s.x=clamp(s.x,76,644);s.vx*=-.6}if(s.y<195||s.y>804){s.y=clamp(s.y,195,804);s.vy*=-.6}
 // Safety stretch limit only; ordinary motion follows the spring above.
 rx=s.x-s.hx;ry=s.y-s.hy;dist=Math.hypot(rx,ry);if(dist>s.length+100){s.x=s.hx+rx/dist*(s.length+100);s.y=s.hy+ry/dist*(s.length+100)}
 for(let i=0;i<s.bells.length;i++){const b=s.bells[i],p=bellPos(s,i),d=Math.hypot(s.x-p.x,s.y-p.y);b.flash=Math.max(0,b.flash-dt);if(d>49)b.inside=false;if(d<40&&!b.inside&&b.left>0&&Math.hypot(s.vx,s.vy)>55){b.inside=true;b.left--;b.flash=.8;s.hits++;s.combo++;s.chainClock=3;s.glow=.4;s.events.push({type:'bell',x:p.x,y:p.y,i,done:b.left===0,combo:s.combo});}}
 for(const a of s.stars)if(!a.found){const p=stages[s.level].stars[a.id];if(Math.hypot(s.x-p[0],s.y-p[1])<37){a.found=true;s.events.push({type:'star',x:p[0],y:p[1],i:a.id});}}
 if(s.bells.every(b=>b.left===0)&&s.stars.every(a=>a.found))finish(s);
}
function finish(s){if(s.won||s.bells.some(b=>b.left))return false;s.won=true;const n=s.stars.filter(a=>a.found).length;s.rating=1+(n>=2?1:0)+(n===3?1:0);s.events.push({type:'win',x:s.x,y:s.y});return true}
function restore(r){try{if(r.version!==1||!Number.isInteger(r.level)||r.level<0||r.level>7||typeof r.won!=='boolean'||typeof r.reeling!=='boolean')return null;const f=create(r.level);for(const k of['t','hx','hy','x','y','vx','vy','length','hits','combo','chainClock','glow','rating'])if(!Number.isFinite(r[k]))return null;if(r.t<0||r.hx<90||r.hx>630||r.hy<145||r.hy>690||r.x<50||r.x>670||r.y<120||r.y>850||r.length<57||r.length>121||Math.hypot(r.vx,r.vy)>2000||r.bells.length!==f.bells.length||r.stars.length!==3)return null;for(let i=0;i<f.bells.length;i++){const b=r.bells[i];if(b.id!==i||!Number.isInteger(b.left)||b.left<0||b.left>f.bells[i].left||typeof b.inside!=='boolean'||!Number.isFinite(b.flash))return null}for(let i=0;i<3;i++)if(r.stars[i].id!==i||typeof r.stars[i].found!=='boolean')return null;if(r.hits!==f.bells.reduce((n,b,i)=>n+b.left-r.bells[i].left,0))return null;const found=r.stars.filter(a=>a.found).length;if(r.won&&(r.bells.some(b=>b.left)||r.rating!==1+(found>=2?1:0)+(found===3?1:0)))return null;return JSON.parse(JSON.stringify({...r,events:[]}))}catch{return null}}
 const api={stages,create,step,finish,bellPos,restore};if(typeof module!=='undefined')module.exports=api;root.Chime=api;
})(typeof window==='undefined'?globalThis:window);
