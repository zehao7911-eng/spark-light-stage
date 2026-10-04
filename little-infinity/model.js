'use strict';
function buildInfinity(){
const D=[[0,-1],[1,0],[0,1],[-1,0]],clone=s=>JSON.parse(JSON.stringify(s));
function room(id,map,color){return {id,map,color,n:map.length}}
const colors=[['#2f83fb','#113763','#0d2747','#74c5ff'],['#19bf8b','#124b43','#10382e','#8cf5c4'],['#aa74ff','#40345f','#292440','#d5b4ff'],['#ffa84f','#663d27','#402b25','#ffdc94']];
function R(id,map,c=0){return room(id,map,colors[c])}
const levels=[
{name:'A LITTLE PUSH',tip:'Move the gold box onto the empty square.',rooms:[R('root',['#####','#...#','#PCo#','#..h#','#####'])]},
{name:'THERE IS A ROOM',tip:'A box that cannot move can be entered.',rooms:[R('root',['#####','#...#','#P.A#','#...#','#####']),R('A',['#####','#...#','...h#','#...#','#####'],1)]},
{name:'THE WAY BACK',tip:'Cross the edge of a small room to come back out.',rooms:[R('root',['#####','#...#','#.Ao#','#.h.#','#####']),R('A',['#####','#...#','.PC..','#...#','#####'],1)]},
{name:'A MOVING WORLD',tip:'Push the little world onto the outline. Then step inside.',rooms:[R('root',['#######','#.....#','#PA.o##','#.....#','#.....#','#.....#','#######']),R('A',['#####','#...#','...h#','#...#','#####'],1)]},
{name:'BORROWED SPACE',tip:'Take the gold box outside before you take its place.',rooms:[R('root',['#####','#...#','#.A.#','#oh.#','#####']),R('A',['#####','#...#','.PC..','#...#','#####'],1)]},
{name:'A SMALLER ROOM',tip:'There is another world inside this one.',rooms:[R('root',['#####','#...#','#P.A#','#...#','#####']),R('A',['#####','#...#','...B#','#...#','#####'],1),R('B',['#####','#...#','.C.o#','#..h#','#####'],2)]},
{name:'OUTSIDE, INSIDE',tip:'Two squares. One of them is inside.',rooms:[R('root',['#######','#.....#','#.A...#','#..o..#','#.....#','#.....#','#######']),R('A',['#####','#...#','.PC..','#.oh#','#####'],1)],extra:[{id:'second',kind:'crate',room:'root',x:2,y:4}]},
{name:'THE WORLD IS A BOX',tip:'Place the world, then finish the room within it.',rooms:[R('root',['#######','#.....#','#P.Ao##','#.....#','#.....#','#.....#','#######']),R('A',['#####','#...#','.C.h#','#...#','#####'],1)],extra:[{id:'outer',kind:'crate',room:'root',x:2,y:4}],goals:[{room:'root',x:3,y:4}]},
{name:'TWO LITTLE WORLDS',tip:'A gold box can travel from one world into another.',rooms:[R('root',['#######','#.....#','#.A.B##','#.....#','#.....#','#.....#','#######']),R('A',['#####','#...#','.PC..','#...#','#####'],1),R('B',['#####','#...#','...o#','#..h#','#####'],2)]},
{name:'A WORLD IN TRANSIT',tip:'A nested world can leave its home, too.',rooms:[R('root',['#######','#.....#','#.A.o##','#.....#','#.....#','#.....#','#######']),R('A',['#####','#...#','.PB..','#...#','#####'],1),R('B',['#####','#...#','...h#','#...#','#####'],2)]},
{name:'THREE DEEP',tip:'The smallest room is not the end of the journey.',rooms:[R('root',['#####','#...#','#.Ao#','#..h#','#####']),R('A',['#####','#...#','.PB..','#...#','#####'],1),R('B',['#####','#...#','...D.','#...#','#####'],2),R('D',['#####','#...#','..Co.','#...#','#####'],3)]},
{name:'LITTLE INFINITY',tip:'Every world is real. Every box can travel.',rooms:[R('root',['#######','#.....#','#.A.B##','#.....#','#..o..#','#.....#','#######']),R('A',['#####','#...#','.PD..','#...#','#####'],1),R('B',['#####','#...#','...o#','#..h#','#####'],2),R('D',['#####','#...#','..C..','#...#','#####'],3)]}
];
function initial(L){let entities=[],goals=[],playerGoal;for(let r of L.rooms)for(let y=0;y<r.n;y++)for(let x=0;x<r.n;x++){let c=r.map[y][x];if(c==='P')entities.push({id:'p',kind:'player',room:r.id,x,y});else if(c==='C')entities.push({id:'c'+entities.length,kind:'crate',room:r.id,x,y});else if(/[ABD]/.test(c))entities.push({id:c,kind:'world',child:c,room:r.id,x,y});else if(c==='o')goals.push({room:r.id,x,y});else if(c==='h')playerGoal={room:r.id,x,y}}entities.push(...(L.extra||[]));goals.push(...(L.goals||[]));return {entities,goals,playerGoal,moves:0}}
function board(L,id){return L.rooms.find(r=>r.id===id)}
function entity(s,id){return s.entities.find(e=>e.id===id)}
function at(s,r,x,y){return s.entities.find(e=>e.room===r&&e.x===x&&e.y===y)}
function owner(s,r){return s.entities.find(e=>e.kind==='world'&&e.child===r)}
function inside(s,child,id){let r=child;for(let i=0;i<10;i++){if(r===id)return true;let o=owner(s,r);if(!o)return false;r=o.room}return true}
function place(L,s,e,r,x,y,d,seen,depth){if(depth>50)return false;let b=board(L,r);if(x<0||y<0||x>=b.n||y>=b.n){let o=owner(s,r);if(!o||o.id===e.id)return false;return place(L,s,e,o.room,o.x+D[d][0],o.y+D[d][1],d,seen,depth+1)}if(b.map[y][x]==='#')return false;let k=e.id+'/'+r+'/'+x+'/'+y+'/'+d;if(seen.has(k))return false;let next=new Set(seen);next.add(k);let hit=at(s,r,x,y);if(hit&&hit.id!==e.id){let before=clone(s.entities);let ok=place(L,s,hit,r,x+D[d][0],y+D[d][1],d,next,depth+1);if(!ok){s.entities=before;e=entity(s,e.id);hit=entity(s,hit.id);if(hit.kind!=='world'||(e.kind==='world'&&inside(s,hit.child,e.child)))return false;let n=board(L,hit.child).n,m=Math.floor(n/2),ex=d===1?0:d===3?n-1:m,ey=d===2?0:d===0?n-1:m;return place(L,s,e,hit.child,ex,ey,d,next,depth+1)}}e=entity(s,e.id);e.room=r;e.x=x;e.y=y;return true}
function move(L,S,d){let s=clone(S),p=entity(s,'p');if(!place(L,s,p,p.room,p.x+D[d][0],p.y+D[d][1],d,new Set(),0))return null;s.moves++;return s}
function won(s){let p=entity(s,'p'),g=s.playerGoal;return !!g&&p.room===g.room&&p.x===g.x&&p.y===g.y&&s.goals.every(g=>{let e=at(s,g.room,g.x,g.y);return e&&e.kind!=='player'})}
function key(s){return s.entities.map(e=>e.id+':'+e.room+','+e.x+','+e.y).join('|')}
function solve(L,S,cap=70000){let q=[{s:S,prev:-1,d:-1}],seen=new Set([key(S)]);for(let i=0;i<q.length&&q.length<cap;i++){let c=q[i];if(won(c.s)){let out=[];while(c.prev>=0){out.push(c.d);c=q[c.prev]}return out.reverse()}for(let d=0;d<4;d++){let s=move(L,c.s,d);if(!s)continue;let k=key(s);if(!seen.has(k)){seen.add(k);q.push({s,prev:i,d})}}}return null}
return {levels,D,initial,move,won,solve,board,entity,at,owner,clone};
}
window.InfinityModel=buildInfinity();
window.InfinityModel.workerSource="("+buildInfinity.toString()+")()";

