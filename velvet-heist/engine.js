(function(root){
const clone=x=>JSON.parse(JSON.stringify(x)), dirs=[[0,-1],[1,0],[0,1],[-1,0]];
const specs=[
{n:5,start:[0,4],end:[4,0],key:[1,3],loot:[3,1],gems:[[0,1],[4,4]],blocks:[[2,2]],bush:[[1,1]],guards:[]},
{n:5,start:[0,4],end:[4,0],key:[0,2],loot:[4,2],gems:[[1,0],[3,4]],blocks:[[2,1],[2,3]],bush:[[1,2],[3,2]],guards:[{p:[[2,2]],d:[0,1,2,3]}]},
{n:5,start:[0,4],end:[4,0],key:[1,4],loot:[3,0],gems:[[0,0],[4,4]],blocks:[[1,2],[3,2]],bush:[[2,3],[2,1]],guards:[{p:[[2,1],[2,2],[2,3],[2,2]],d:[2,2,0,0]}]},
{n:5,start:[0,4],end:[4,0],key:[0,0],loot:[4,4],gems:[[0,1],[4,3]],blocks:[[2,0],[2,4]],bush:[[1,2],[3,2]],guards:[{p:[[1,1]],d:[0,1,2,3]},{p:[[3,3]],d:[2,3,0,1]}]},
{n:6,start:[0,5],end:[5,0],key:[1,4],loot:[4,1],gems:[[0,0],[5,5]],blocks:[[2,1],[2,2],[3,3],[3,4]],bush:[[1,2],[4,3]],guards:[{p:[[2,3],[3,3],[3,2],[2,2]],d:[1,0,3,2]}]},
{n:6,start:[0,5],end:[5,0],key:[5,4],loot:[0,1],gems:[[2,0],[3,5]],blocks:[[1,2],[2,2],[3,2],[4,2]],bush:[[0,2],[5,2]],guards:[{p:[[2,4],[3,4],[3,3],[2,3]],d:[1,0,3,2]},{p:[[3,1]],d:[0,1,2,3]}]},
{n:6,start:[0,5],end:[5,0],key:[0,0],loot:[5,5],gems:[[2,1],[3,4]],blocks:[[1,1],[4,4],[2,3]],bush:[[2,2],[3,3]],guards:[{p:[[1,3],[1,4],[2,4],[2,3]],d:[2,1,0,3]},{p:[[4,1],[4,2],[3,2],[3,1]],d:[2,3,0,1]}]},
{n:6,start:[0,5],end:[5,0],key:[4,5],loot:[1,0],gems:[[0,2],[5,3]],blocks:[[2,1],[2,4],[3,1],[3,4]],bush:[[2,2],[3,3]],guards:[{p:[[1,2],[1,3],[2,3],[2,2]],d:[2,1,0,3]},{p:[[4,2],[4,3],[3,3],[3,2]],d:[2,3,0,1]}]},
{n:6,start:[0,5],end:[5,0],key:[3,5],loot:[2,0],gems:[[0,0],[5,5]],blocks:[[1,1],[4,1],[1,4],[4,4]],bush:[[2,3],[3,2]],guards:[{p:[[2,2]],d:[0,1,2,3]},{p:[[3,3]],d:[2,3,0,1]}]},
{n:6,start:[0,5],end:[5,0],key:[0,1],loot:[5,4],gems:[[2,0],[3,5]],blocks:[[1,2],[4,3],[2,4],[3,1]],bush:[[1,3],[4,2]],guards:[{p:[[2,2],[3,2],[3,3],[2,3]],d:[1,2,3,0]},{p:[[0,3]],d:[0,1,2,3]}]},
{n:6,start:[0,5],end:[5,0],key:[1,0],loot:[4,5],gems:[[0,3],[5,2]],blocks:[[1,1],[2,1],[3,4],[4,4]],bush:[[2,3],[3,2]],guards:[{p:[[2,2],[3,2],[3,3],[2,3]],d:[1,2,3,0]},{p:[[4,1]],d:[2,3,0,1]}]},
{n:6,start:[0,5],end:[5,0],key:[5,5],loot:[0,0],gems:[[2,2],[3,3]],blocks:[[1,2],[4,3],[2,4],[3,1]],bush:[[1,3],[4,2]],guards:[{p:[[2,1],[2,2],[3,2],[3,1]],d:[2,1,0,3]},{p:[[3,4],[3,3],[2,3],[2,4]],d:[0,3,2,1]}]}
];
// Patrol paths always use traversable tiles; block locations are decorative obstacles.
for(const l of specs)l.blocks=l.blocks.filter(p=>!l.guards.some(g=>g.p.some(q=>eq(p,q))));
function eq(a,b){return a[0]===b[0]&&a[1]===b[1]}
function guard(l,g,t){const p=g.p[t%g.p.length],d=dirs[g.d[t%g.d.length]];return {p,look:[p[0]+d[0],p[1]+d[1]]}}
function walk(l,p){return p[0]>=0&&p[1]>=0&&p[0]<l.n&&p[1]<l.n&&!l.blocks.some(q=>eq(p,q))}
function caught(l,p,t){return l.guards.some(g=>eq(guard(l,g,t).p,p)||(!l.bush.some(q=>eq(q,p))&&eq(guard(l,g,t).look,p)))}
function state(i){return {level:i,p:clone(specs[i].start),t:0,key:false,loot:false,gems:0,moves:0,status:'play',hint:false,catches:0}}
function step(s,a){if(s.status!=='play')return null;const l=specs[s.level],p=a===4?s.p:[s.p[0]+dirs[a][0],s.p[1]+dirs[a][1]];if(!walk(l,p))return null;const r=clone(s);r.p=clone(p);r.moves++;r.t=(r.t+1)%4;
if(l.guards.some(g=>eq(guard(l,g,s.t).p,p))||caught(l,p,r.t)){r.status='caught';r.catches++;return r}
if(eq(p,l.key))r.key=true;if(eq(p,l.loot)&&r.key)r.loot=true;l.gems.forEach((q,i)=>{if(eq(q,p))r.gems|=1<<i});if(eq(p,l.end)&&r.loot)r.status='win';return r}
function solve(s,all=true){if(s.status!=='play')return null;const key=r=>[...r.p,r.t,+r.key,+r.loot,r.gems].join(','),seen=new Set([key(s)]),q=[{s,path:[]}];for(let n=0;n<q.length&&n<120000;n++){const cur=q[n];for(let a=0;a<5;a++){const r=step(cur.s,a);if(!r||r.status==='caught')continue;const path=cur.path.concat(a);if(r.status==='win'&&(!all||r.gems===3))return path;if(r.status==='win')continue;const k=key(r);if(!seen.has(k)){seen.add(k);q.push({s:r,path})}}}return null}
function award(profile,s,par){if(s.status!=='win')return 0;const stars=1+(s.gems===3?1:0)+(!s.hint&&s.catches===0&&s.moves<=par+4?1:0),old=profile.best[s.level]||0;profile.best[s.level]=Math.max(old,stars);profile.unlocked=Math.max(profile.unlocked,Math.min(11,s.level+1));return stars}
const api={specs,dirs,clone,eq,guard,walk,caught,state,step,solve,award};root.Heist=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
