(function(root){'use strict';
const raw=[
[[0,0,0],[1,0,0],[2,0,0],[2,1,1],[2,2,1],[3,2,2]],
[[0,0,0],[1,0,0],[1,1,1],[1,2,1],[2,2,1],[3,2,2],[3,4,2],[4,4,2]],
[[0,0,0],[1,0,1],[2,0,1],[2,1,2],[2,2,2],[1,2,2],[0,2,3],[0,3,3],[1,3,4]],
[[0,0,0],[1,0,0],[2,0,1],[2,1,1],[2,2,2],[3,2,2],[4,2,3],[4,3,3],[3,3,3],[3,4,4]],
[[0,0,1],[1,0,1],[2,0,2],[2,1,2],[2,2,1],[3,2,1],[4,2,2],[4,1,3],[4,0,3],[3,0,4],[2,3,3]],
[[0,0,0],[1,0,1],[1,1,2],[1,2,2],[2,2,3],[3,2,3],[3,3,2],[2,3,2],[1,3,3],[1,4,4],[0,4,4]],
[[0,0,1],[1,0,1],[2,0,2],[2,1,3],[1,1,3],[0,1,4],[0,2,4],[1,2,3],[2,2,3],[3,2,4],[3,3,4],[4,3,4]],
[[0,0,0],[1,0,0],[2,0,1],[3,0,2],[3,1,2],[3,2,3],[2,2,3],[1,2,2],[0,2,2],[0,3,3],[1,3,4],[2,3,4]],
[[0,0,0],[1,0,1],[2,0,1],[2,1,2],[3,1,3],[3,2,3],[3,3,4],[2,3,4],[1,3,3],[1,4,3],[0,4,4],[0,3,4],[4,2,4]],
[[0,0,1],[1,0,1],[2,0,2],[2,1,2],[2,2,3],[3,2,3],[4,2,4],[4,3,4],[3,3,3],[2,3,3],[1,3,4],[0,3,4],[0,2,4],[1,2,4]],
[[0,0,0],[1,0,1],[1,1,1],[2,1,2],[3,1,2],[3,2,3],[3,3,3],[2,3,4],[1,3,4],[1,4,3],[0,4,3],[0,3,4],[0,2,4],[2,4,4]],
[[0,0,0],[1,0,1],[2,0,1],[2,1,2],[2,2,2],[3,2,3],[4,2,3],[4,3,4],[3,3,4],[2,3,3],[1,3,3],[1,4,4],[0,4,4],[0,3,4],[0,2,3],[1,2,3]]
];
const titles=['A different angle','The missing bridge','Pocket of sky','The bell garden','Behind the waterfall','The copper orchard','A quiet crossing','Four little horizons','The moon archive','Where shadows meet','The last lantern','A way back home'];
const objects=[[1,3,4,2],[2,4,6,3],[2,5,7,4],[2,5,8,3],[2,6,9,4],[2,5,9,7],[3,6,10,7],[3,6,10,8],[3,6,10,8],[3,7,11,6],[3,7,11,6],[3,7,12,8]];
function make(level){if(!Number.isInteger(level)||level<0||level>=12)throw Error('Invalid chapter');return{level,title:titles[level],chapter:Math.floor(level/4),nodes:raw[level].map(([x,z,h],id)=>({x,z,h,id})),shards:objects[level].slice(0,3),relic:objects[level][3],gate:raw[level].length-1}}
function project(n,v){v=(v%4+4)%4;return[{u:n.x,d:n.z},{u:n.z,d:-n.x},{u:-n.x,d:-n.z},{u:-n.z,d:n.x}][v]}
function visible(p,v){const map=new Map();p.nodes.forEach(n=>{const a=project(n,v),k=a.u+','+n.h,old=map.get(k);if(old===undefined||project(p.nodes[old],v).d<a.d)map.set(k,n.id)});return new Set(map.values())}
function neighbors(p,node,v){const a=p.nodes[node],u=project(a,v).u,vis=visible(p,v);return p.nodes.filter(n=>n.id!==node&&vis.has(n.id)&&Math.abs(project(n,v).u-u)===1&&Math.abs(n.h-a.h)<=1).map(n=>n.id)}
function collect(p,node,mask){const i=p.shards.indexOf(node);if(i>=0)mask|=1<<i;if(node===p.relic)mask|=8;return mask}
function solved(p,s){return s.node===p.gate&&(s.mask&7)===7}
function initial(level){const p=make(level);return{p,node:0,view:0,mask:0,moves:0,hints:0,history:[],won:false}}
function snap(s){return{node:s.node,view:s.view,mask:s.mask}}
function act(s,a){if(s.won)return false;const old=snap(s);if(a.type==='turn'&&(a.dir===1||a.dir===-1))s.view=(s.view+a.dir+4)%4;else if(a.type==='go'&&Number.isInteger(a.node)&&neighbors(s.p,s.node,s.view).includes(a.node)){s.node=a.node;s.mask=collect(s.p,s.node,s.mask)}else return false;s.history.push(old);if(s.history.length>100)s.history.shift();s.moves++;s.won=solved(s.p,s);return true}
function undo(s){if(s.won||!s.history.length)return false;Object.assign(s,s.history.pop());s.moves++;return true}
function solve(p,start,requireRelic=false){const key=s=>s.node+','+s.view+','+s.mask,arr=[{node:start.node,view:start.view,mask:start.mask}],seen=new Map([[key(arr[0]),0]]),prev=[null];for(let qi=0;qi<arr.length;qi++){const s=arr[qi];if(solved(p,s)&&(!requireRelic||(s.mask&8))){const out=[];for(let j=qi;prev[j];j=prev[j].from)out.push(prev[j].action);return out.reverse()}if(solved(p,s))continue;const actions=[...neighbors(p,s.node,s.view).map(node=>({type:'go',node})),{type:'turn',dir:1},{type:'turn',dir:-1}];for(const a of actions){const t={...s};if(a.type==='turn')t.view=(t.view+a.dir+4)%4;else{t.node=a.node;t.mask=collect(p,t.node,t.mask)}const k=key(t);if(!seen.has(k)){seen.set(k,arr.length);prev.push({from:qi,action:a});arr.push(t)}}}return null}
const pars=raw.map((_,i)=>solve(make(i),initial(i),true)?.length||999);
function stars(s){return 1+((s.mask&8)?1:0)+(s.hints===0&&s.moves<=pars[s.p.level]+4?1:0)}
function validSnap(p,s){return s&&Number.isInteger(s.node)&&s.node>=0&&s.node<p.nodes.length&&Number.isInteger(s.view)&&s.view>=0&&s.view<4&&Number.isInteger(s.mask)&&s.mask>=0&&s.mask<16}
function pack(s){return{level:s.p.level,...snap(s),moves:s.moves,hints:s.hints,history:s.history}}
function restore(d){if(!d||!Number.isInteger(d.level)||d.level<0||d.level>11)return null;const s=initial(d.level);if(!validSnap(s.p,d)||!Number.isInteger(d.moves)||d.moves<0||d.moves>100000||!Number.isInteger(d.hints)||d.hints<0||d.hints>100000)return null;Object.assign(s,snap(d),{moves:d.moves,hints:d.hints});s.history=Array.isArray(d.history)?d.history.filter(x=>validSnap(s.p,x)).slice(-100).map(snap):[];s.won=solved(s.p,s);return s}
const api={make,titles,project,visible,neighbors,collect,solved,initial,snap,act,undo,solve,pars,stars,validSnap,pack,restore};if(typeof module!=='undefined')module.exports=api;else root.FoldEngine=api;
})(typeof window!=='undefined'?window:globalThis);


