(function(root,factory){if(typeof module==='object')module.exports=factory();else root.BrassRules=factory();})(this,function(){
'use strict';
const D=[[0,-1],[1,0],[0,1],[-1,0]], NAMES=['Wren in a Teacup','The Little Carousel','Harbor after Rain','Moonflower Waltz','The Sleeping Fox','Cloud Observatory'];
const CHAPTERS=['FIRST NOTES','BRASS & BRIDGES','THE BELLMAKER','AFTER THE RAIN','MIDNIGHT CONCERT','THE GRAND FINALE'];
function rng(seed){let s=seed>>>0||1;return()=>{s^=s<<13;s^=s>>>17;s^=s<<5;return(s>>>0)/4294967296;};}
function shuffle(a,r){for(let i=a.length-1;i;i--){let j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function level(id){
 id=Math.max(0,Math.floor(id));const r=rng(7181+id*7919),n=id<5?4:5,start=Math.floor(r()*n)*n,end=Math.floor(r()*n)*n+n-1,target=Math.min(n*n-2,7+Math.floor(id/3)),cap=25000;let calls=0,path=[];
 function dfs(i,seen,p){if(++calls>cap)return false;if(i===end){if(p.length>=target){path=p.slice();return true;}return false;}for(const d of shuffle([0,1,2,3],r)){const x=i%n+D[d][0],y=Math.floor(i/n)+D[d][1],j=y*n+x;if(x<0||x>=n||y<0||y>=n||seen.has(j))continue;seen.add(j);p.push(j);if(dfs(j,seen,p))return true;p.pop();seen.delete(j);}return false;}
 if(!dfs(start,new Set([start]),[start])){path=[];let row=Math.floor(start/n),last=Math.floor(end/n);for(let x=0;x<n-1;x++)path.push(row*n+x);while(row!==last){path.push(row*n+n-2);row+=Math.sign(last-row);}path.push(last*n+n-2,end);path=[...new Set(path)];}
 const dir=(a,b)=>{let ax=a%n,ay=Math.floor(a/n),bx=b%n,by=Math.floor(b/n);return D.findIndex(d=>d[0]===bx-ax&&d[1]===by-ay);};
 let tiles=Array.from({length:n*n},()=>({kind:r()<.55?'bend':'line',rot:Math.floor(r()*4),solution:0,locked:false,bell:0}));
 path.forEach((i,k)=>{const a=k?dir(i,path[k-1]):3,b=k===path.length-1?1:dir(i,path[k+1]);let kind,rot;if((a+2)%4===b){kind='line';rot=a%2;}else{kind='bend';rot=[0,1,2,3].find(t=>[t,(t+1)%4].includes(a)&&[t,(t+1)%4].includes(b));}tiles[i]={kind,rot:Math.floor(r()*4),solution:rot,locked:false,bell:0};});
 const bells=Math.min(4,2+Math.floor(id/9));for(let k=1;k<=bells;k++){const at=Math.min(path.length-2,Math.max(1,Math.floor(k*(path.length-1)/(bells+1))));tiles[path[at]].bell=k;}
 if(id>=5){const at=path[Math.floor(path.length*.5)];tiles[at].locked=true;tiles[at].rot=tiles[at].solution;}
 if(id>=17){const at=path.find((i,k)=>k>0&&k<path.length-1&&tiles[i].kind==='line'&&!tiles[i].bell);if(at!==undefined){tiles[at].kind='bridge';tiles[at].rot=0;tiles[at].solution=0;}}
 // Guarantee an opening puzzle has real work, while remaining one tap from a win.
 if(id===0)path.forEach((i,k)=>{tiles[i].rot=(tiles[i].solution+(k===2?3:0))%4;});
 let l={id,n,start,end,path,tiles,bells,ordered:id>=11,initial:tiles.map(t=>t.rot),name:NAMES[Math.floor(id/6)%6],chapter:CHAPTERS[Math.floor(id/6)%6]};return l;
}
function ports(t){if(t.kind==='bridge')return[0,1,2,3];return t.kind==='line'?[t.rot%2,(t.rot%2+2)%4]:[t.rot,(t.rot+1)%4];}
function trace(l){let i=l.start,entry=3,seen=new Set(),steps=[],bells=[],reason='gap';while(steps.length<l.n*l.n*2){const t=l.tiles[i],p=ports(t),key=i+':'+entry;if(seen.has(key)){reason='loop';break;}seen.add(key);if(!p.includes(entry)){reason='gap';break;}const exit=t.kind==='bridge'?(entry+2)%4:p.find(x=>x!==entry);steps.push({i,entry,exit});if(t.bell&&!bells.includes(t.bell))bells.push(t.bell);if(i===l.end&&exit===1){const all=bells.length===l.bells,order=!l.ordered||bells.every((b,k)=>b===k+1);return{ok:all&&order,steps,bells,stop:i,reason:!all?'bells':!order?'order':'complete'};}const x=i%l.n+D[exit][0],y=Math.floor(i/l.n)+D[exit][1];if(x<0||x>=l.n||y<0||y>=l.n){reason='edge';break;}i=y*l.n+x;entry=(exit+2)%4;}return{ok:false,steps,bells,stop:i,reason};}
function fresh(){return{v:1,at:0,coins:0,stars:[],up:[0,0,0],sound:true,started:false,rot:null,moves:0,tests:0,hints:0};}
function restore(raw){try{const s=JSON.parse(raw);if(!s||s.v!==1||!Number.isInteger(s.at)||s.at<0||s.at>100000||!Number.isFinite(s.coins)||s.coins<0||!Array.isArray(s.stars)||!s.stars.every(x=>Number.isInteger(x)&&x>=0&&x<=3)||!Array.isArray(s.up)||s.up.length!==3||!s.up.every(x=>Number.isInteger(x)&&x>=0&&x<=3))return null;let l=level(s.at);if(s.rot!==null&&(!Array.isArray(s.rot)||s.rot.length!==l.tiles.length||!s.rot.every(x=>Number.isInteger(x)&&x>=0&&x<4)))return null;for(const k of ['moves','tests','hints'])if(!Number.isInteger(s[k])||s[k]<0)return null;return s;}catch(_){return null;}}
function load(s){let l=level(s.at);if(s.rot)l.tiles.forEach((t,i)=>{if(!t.locked)t.rot=s.rot[i];});return l;}
function remember(s,l){s.rot=l.tiles.map(t=>t.rot);}
function rotate(s,l,i){const t=l.tiles[i];if(!t||t.locked||t.kind==='bridge')return false;t.rot=(t.rot+1)%4;s.moves++;remember(s,l);return true;}
function hint(s,l){const i=l.path.find(i=>{const t=l.tiles[i];return !t.locked&&t.kind!=='bridge'&&ports(t).join(',')!==ports({...t,rot:t.solution}).join(',');});if(i===undefined)return-1;l.tiles[i].rot=l.tiles[i].solution;s.hints++;remember(s,l);return i;}
function finish(s,l){const tr=trace(l);s.tests++;if(!tr.ok)return{...tr,reward:0,stars:0};const stars=s.hints?1:s.tests<=2?3:2;const old=s.stars[l.id]||0,reward=old?Math.max(0,stars-old)*8:30+l.bells*5+stars*5+s.up[1]*8;s.coins+=reward;s.stars[l.id]=Math.max(old,stars);return{...tr,reward,stars:s.stars[l.id]};}
function next(s){if(!s.stars[s.at])return false;s.at++;s.rot=null;s.moves=0;s.tests=0;s.hints=0;return true;}
function price(s,i){return[55,70,85][i]*(s.up[i]+1);}
function buy(s,i){if(!Number.isInteger(i)||i<0||i>2||s.up[i]>=3||s.coins<price(s,i))return false;s.coins-=price(s,i);s.up[i]++;return true;}
return{D,NAMES,CHAPTERS,rng,level,ports,trace,fresh,restore,load,remember,rotate,hint,finish,next,price,buy};
});
