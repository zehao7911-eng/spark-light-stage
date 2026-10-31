/* PHASESHIFT: deterministic rules, independent of rendering. */
(function(root){
'use strict';
const D=[[0,-1],[1,0],[0,1],[-1,0]], DIR='^>v<';
const raw=[
 ['First light',['#######','#S.1.E#','#.....#','#######'],'Walk to the energy cell, then the exit.'],
 ['Across the seam',['########','#S.o##E#','#.1.##.#','#####o.#','########'],'Choose BLUE, tap a white socket. Choose AMBER, tap the other. Walk into either ring.'],
 ['Three islands',['#########','#S.o#o.2#','#.1.#...#','#########','#E..o...#','#########'],'Move a portal to connect another island. Your cells stay with you.'],
 ['Live circuit',['########','#S.aA.E#','#..1#..#','########'],'Step on a square switch to change its gate.'],
 ['Split current',['#########','#S.o#oA2#','#.1.#.a.#','#########','#E..o...#','#########'],'A switch changes every gate with its symbol.'],
 ['Return signal',['########','#S.aA1o#','#..#####','#.o#o.E#','#..#.2.#','########'],'A portal can bring you back as well as forward.'],
 ['Two frequencies',['#########','#S.aA1###','#.#######','#.bB2.E.#','#########'],'Diamond and square switches control separate circuits.'],
 ['One way out',['########','#S.>1.o#','###v####','#o.2>.E#','########'],'Striped arrows let you leave in one direction. Portals are your way around.'],
 ['Relay station',['#########','#S.o#oA1#','#.2.#.a.#','#########','#o.bB3.E#','#########'],'Connect the islands. Charge every cell.'],
 ['Cross talk',['#########','#S.aA1o.#','#..###..#','#b.B2#..#','######o##','#E.3o...#','#########'],'Switches remember their state when you teleport.'],
 ['Slipstream',['#########','#S.>1o..#','###v#####','#o.2aA.o#','#########','#E..o3..#','#########'],'Plan where each ring should be before stepping in.'],
 ['Event horizon',['#########','#S.o#oA1#','#.2.#.a.#','#########','#o.bB3.o#','#########','#E.<..o.#','#########'],'One last network. Every system you learned is here.']
];
function compile(r,i){let rows=r[1],w=Math.max(...rows.map(x=>x.length)),h=rows.length,tiles=[],pads=[],cells=[],start=-1,exit=-1;for(let z=0;z<h;z++)for(let x=0;x<w;x++){let c=rows[z][x]||'#',p=z*w+x;tiles[p]=c;if(c==='S')start=p;if(c==='E')exit=p;if(c==='o')pads.push(p);if(/[123]/.test(c))cells.push(p)}return {i,name:r[0],tip:r[2],w,h,tiles,pads,cells,start,exit,full:(1<<cells.length)-1};}
const levels=raw.map(compile);
function initial(l){return {p:l.start,mask:0,bits:0,blue:-1,amber:-1,moves:0,links:0,hints:0};}
function pass(l,s,p){let c=l.tiles[p];return c&&c!=='#'&&(c!=='A'||(s.bits&1))&&(c!=='B'||(s.bits&2));}
function won(l,s){return s.p===l.exit&&s.mask===l.full;}
function key(s){return [s.p,s.mask,s.bits,s.blue,s.amber].join(',');}
function apply(l,s,a){let n={...s};if(a.type==='link'){if(!l.pads.includes(a.p)||!['blue','amber'].includes(a.color))return null;let other=a.color==='blue'?'amber':'blue';if(s[a.color]===a.p)return null;n[a.color]=a.p;if(n[other]===a.p)n[other]=-1;n.links++;n.moves++;return n;}
if(a.type!=='move'||a.d<0||a.d>3)return null;let c=l.tiles[s.p],forced=DIR.indexOf(c);if(forced!==-1&&forced!==a.d)return null;let x=s.p%l.w,z=Math.floor(s.p/l.w),[dx,dz]=D[a.d],nx=x+dx,nz=z+dz;if(nx<0||nz<0||nx>=l.w||nz>=l.h)return null;let p=nz*l.w+nx;if(!pass(l,s,p))return null;n.p=p;
if(n.blue>=0&&n.amber>=0){if(p===n.blue)n.p=n.amber;else if(p===n.amber)n.p=n.blue;}
c=l.tiles[n.p];if(c==='a')n.bits^=1;if(c==='b')n.bits^=2;let ci=l.cells.indexOf(n.p);if(ci>=0)n.mask|=1<<ci;n.moves++;return n;}
function actions(l,s){let a=D.map((_,d)=>({type:'move',d}));for(let p of l.pads)for(let color of ['blue','amber'])if(s[color]!==p)a.push({type:'link',p,color});return a;}
function solve(l,start=initial(l),limit=180000){let queue=[start],records=new Map([[key(start),null]]),end=null;for(let q=0;q<queue.length&&q<limit;q++){let s=queue[q];if(won(l,s)){end=key(s);break}for(let a of actions(l,s)){let n=apply(l,s,a);if(!n)continue;let k=key(n);if(records.has(k))continue;records.set(k,{prev:key(s),a});queue.push(n);}}
if(!end)return null;let path=[];for(let r=records.get(end);r;r=records.get(r.prev))path.push(r.a);return path.reverse();}
function walkPath(l,s,target){if(target===s.p)return [];let q=[{s,path:[]}],seen=new Set([key(s)]);for(let at=0;at<q.length;at++){let e=q[at];for(let d=0;d<4;d++){let a={type:'move',d},n=apply(l,e.s,a);if(!n)continue;let path=[...e.path,a];if(n.p===target||e.s.p+ D[d][0]+D[d][1]*l.w===target)return path;let k=key(n);if(!seen.has(k)){seen.add(k);q.push({s:n,path})}}}return null;}
function stars(l,s,par){return 1+(s.hints===0?1:0)+(s.moves<=par?1:0);}
function safeProfile(v){let p={bests:Array(12).fill(0),bestMoves:Array(12).fill(null),skin:0,muted:false,active:null};if(!v||typeof v!=='object')return p;if(Array.isArray(v.bests))p.bests=p.bests.map((_,i)=>Math.max(0,Math.min(3,Math.floor(Number(v.bests[i])||0))));if(Array.isArray(v.bestMoves))p.bestMoves=p.bestMoves.map((_,i)=>Number.isInteger(v.bestMoves[i])&&v.bestMoves[i]>=0?v.bestMoves[i]:null);p.skin=Number.isInteger(v.skin)?Math.max(0,Math.min(2,v.skin)):0;p.muted=!!v.muted;if(v.active&&Number.isInteger(v.active.level)&&v.active.level>=0&&v.active.level<12){let l=levels[v.active.level],s=v.active.state;let ints=s&&['p','mask','bits','blue','amber','moves','links','hints'].every(k=>Number.isInteger(s[k]));if(ints&&l.tiles[s.p]&&l.tiles[s.p]!=='#'&&s.mask>=0&&s.mask<=l.full&&s.bits>=0&&s.bits<=3&&s.moves>=0&&s.moves<100000&&s.hints>=0&&s.links>=0&&[s.blue,s.amber].every(x=>x===-1||l.pads.includes(x))&&(s.blue===-1||s.blue!==s.amber))p.active={level:l.i,state:{...s}};}return p;}
root.PhaseModel={D,DIR,levels,initial,pass,won,key,apply,actions,solve,walkPath,stars,safeProfile};if(typeof module!=='undefined')module.exports=root.PhaseModel;
})(typeof globalThis!=='undefined'?globalThis:this);
