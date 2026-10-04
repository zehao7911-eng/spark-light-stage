'use strict';
window.IvoryModel=(()=>{
const palettes=[{bg:'#cee5df',water:'#afd0ce',top:'#fff0d3',left:'#ddaeb0',right:'#b4839a',trim:'#e8c0bd',accent:'#6e9f9b',deep:'#67878b'}, {bg:'#dac5dd',water:'#b5a5c9',top:'#efe7e4',left:'#b49bbd',right:'#87799d',trim:'#c4aacd',accent:'#d08eaa',deep:'#716c98'}, {bg:'#eac8b5',water:'#d6b8b7',top:'#fff0cd',left:'#e8a791',right:'#b97f89',trim:'#e7c192',accent:'#80a6a1',deep:'#887b99'}, {bg:'#253d59',water:'#264b65',top:'#a9cbd6',left:'#668ca6',right:'#3b6486',trim:'#80acbe',accent:'#e9c19d',deep:'#173c57'}];
const names=['THE FIRST TURN','THE TWO GARDENS','THE SILENT LIFT','A DIFFERENT SKY','THE LOST PETAL','THE RETURNING TIDE','THE TWIN BELLS','THE LAST HORIZON'];
function level(i){let two=![0,2].includes(i),lift=i>=2,seam=[3,7].includes(i),runes=i>=4?(i===4?1:2):0,L={id:i,name:names[i],palette:palettes[i%4],two,lift,seam,linked:i>=6,runes,view:seam?3:0,rot:[0,i>=4?1:0],nodes:[],edges:[],centers:[[0,0,2],[3,-3,lift?4:2]],target:two?'goal':'end',start:'start'};let n=(id,x,z,y,extra={})=>L.nodes.push({id,x,z,y,...extra}),e=(a,b)=>L.edges.push([a,b]);
n('start',-4,0,2);n('p1',-3,0,2);n('approach',-2,0,2);e('start','p1');e('p1','approach');n('b1a',-1,0,2,{bridge:0,local:-1});n('b1c',0,0,2,{bridge:0,local:0});n('b1b',1,0,2,{bridge:0,local:1});e('b1a','b1c');e('b1c','b1b');n('north',0,-2,2);
if(i===0){n('end',0,-3,2,{goal:true});e('north','end')}
else {n('bend',0,-3,2,{lift:lift});e('north','bend');if(i===2){n('landing',1,-3,4);e('bend','landing');n('end',2,-3,4,{goal:true});e('landing','end')}else{n('landing',1,-3,lift?4:2);e('bend','landing');n('b2a',2,-3,lift?4:2,{bridge:1,local:-1});n('b2c',3,-3,lift?4:2,{bridge:1,local:0});n('b2b',4,-3,lift?4:2,{bridge:1,local:1});e('b2a','b2c');e('b2c','b2b');n('upper',3,-5,lift?4:2);n('gate',3,-6,lift?4:2);e('upper','gate');if(seam){n('sky',5,-4,6);n('sky2',6,-4,6);n('goal',7,-4,6,{goal:true});e('sky','sky2');e('sky2','goal');L.seamNodes=['gate','sky'];}else{n('goal',3,-7,lift?4:2,{goal:true});e('gate','goal')}
if(runes>0){n('petal',5,-3,lift?4:2,{rune:0})}if(runes>1){n('tide',-2,-3,2,{rune:1});n('tidepath',-1,-3,2);e('tide','tidepath');e('tidepath','bend')}}}
return L}
const levels=Array.from({length:8},(_,i)=>level(i));
function initial(L){return {at:L.start,rot:[...L.rot],lift:0,view:L.view,mask:0,moves:0}}
function positions(L,S){return L.nodes.map(n=>{let o={...n};if(n.bridge!==undefined){let c=L.centers[n.bridge],a=S.rot[n.bridge]*Math.PI/2;o.x=c[0]+n.local*Math.cos(a);o.z=c[1]-n.local*Math.sin(a);o.y=c[2]}if(n.lift)o.y=2+S.lift*2;return o})}
function edges(L,S){let ns=positions(L,S),links=[...L.edges],get=id=>ns.find(n=>n.id===id); // Lift landing connects only at matching elevation.
links=links.filter(([a,b])=>Math.abs(get(a).y-get(b).y)<.1);
for(let a of ns)for(let b of ns)if(a.id<b.id&&((a.bridge!==undefined)!==(b.bridge!==undefined)||a.lift||b.lift)){let d=Math.hypot(a.x-b.x,a.z-b.z);if(d>.9&&d<1.1&&Math.abs(a.y-b.y)<.1)links.push([a.id,b.id])}
if(L.seam&&S.view===0)links.push(L.seamNodes);
return links}
function neighbours(L,S,id){let out=[];for(let [a,b] of edges(L,S)){if(a===id)out.push(b);if(b===id)out.push(a)}return [...new Set(out)]}
function route(L,S,target){let q=[[S.at]],seen=new Set([S.at]);for(let path of q){let id=path.at(-1);if(id===target)return path.slice(1);for(let n of neighbours(L,S,id))if(!seen.has(n)){seen.add(n);q.push([...path,n])}}return null}
function apply(L,S,a){let t=JSON.parse(JSON.stringify(S));if(a.type==='walk'){if(!neighbours(L,S,S.at).includes(a.id))return null;t.at=a.id;let n=L.nodes.find(n=>n.id===a.id);if(n.rune!==undefined)t.mask|=1<<n.rune;}else if(a.type==='turn'){if(a.i===1&&!L.two)return null;t.rot[a.i]=(t.rot[a.i]+1)%4;if(L.linked)t.rot[1-a.i]=(t.rot[1-a.i]+3)%4;}else if(a.type==='lift'){if(!L.lift)return null;t.lift=1-t.lift;}else if(a.type==='view')t.view=(t.view+1)%4;else return null;t.moves++;return t}
function won(L,S){let n=L.nodes.find(n=>n.id===S.at);return !!n.goal&&S.mask===(1<<L.runes)-1}
function solve(L,start){let q=[{s:start,path:[]}],seen=new Set();for(let k=0;k<q.length&&k<40000;k++){let {s,path}=q[k],key=[s.at,...s.rot,s.lift,s.view,s.mask].join('/');if(seen.has(key))continue;seen.add(key);if(won(L,s))return path;let acts=neighbours(L,s,s.at).map(id=>({type:'walk',id}));acts.push({type:'turn',i:0});if(L.two)acts.push({type:'turn',i:1});if(L.lift)acts.push({type:'lift'});if(L.seam)acts.push({type:'view'});for(let a of acts){let t=apply(L,s,a);if(t)q.push({s:t,path:[...path,a]})}}return null}
return {levels,initial,positions,edges,neighbours,route,apply,won,solve};})();
