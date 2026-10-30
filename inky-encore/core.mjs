export const VERSION=1;
const G=(name,kind,points,links,curves={})=>({name,kind,points,edges:links.map((s,i)=>{let [a,b]=s;return {a,b,c:curves[i]||null}})});
export const SHOWS=[
 G('Dapper Roof','house',[[80,280],[80,170],[180,85],[280,170],[280,280]],[[0,1],[1,2],[2,3],[3,4],[4,0],[1,3],[1,4],[3,0]]),
 G('Tick-Tock Kid','clock',[[180,90],[280,200],[180,310],[80,200],[180,200]],[[0,1],[1,2],[2,3],[3,0],[0,4],[4,2]],{0:[280,90],1:[280,310],2:[80,310],3:[80,90]}),
 G('Mister Kite','kite',[[180,70],[280,170],[180,260],[80,170],[270,345],[90,345]],[[0,1],[1,2],[2,3],[3,0],[2,4],[4,5],[5,2]]),
 G('Finley Fish','fish',[[70,200],[220,200],[150,105],[150,295],[300,110],[300,290],[150,200]],[[0,2],[2,1],[1,3],[3,0],[1,4],[4,5],[5,1],[0,6],[6,1]],{0:[85,95],1:[220,100],2:[220,300],3:[80,305]}),
 G('Lady Umbrella','umbrella',[[60,190],[180,85],[300,190],[180,235],[180,325],[270,325],[270,250]],[[0,1],[1,2],[2,3],[3,0],[1,3],[3,4],[4,5],[5,6],[6,3]],{0:[65,80],1:[295,80],2:[245,155],3:[115,155],6:[230,380]}),
 G('Captain Comet','rocket',[[180,65],[270,185],[180,275],[90,185],[180,180],[295,295],[65,295],[180,365]],[[0,1],[1,2],[2,3],[3,0],[1,4],[4,3],[1,5],[5,2],[2,6],[6,3],[2,7]],{0:[250,70],3:[110,70]}),
 G('Snail Mail','snail',[[65,195],[140,90],[250,100],[300,205],[235,275],[125,275],[190,185],[65,350],[245,355]],[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,6],[6,4],[5,7],[7,8],[8,5]],{0:[65,95],1:[190,65],2:[310,110],3:[305,270],4:[180,310],5:[65,270],6:[100,185],7:[275,170],9:[155,390]}),
 G('Giddy Moon','moon',[[195,70],[300,190],[195,325],[75,265],[75,130],[175,200],[270,115],[290,290]],[[0,1],[1,2],[2,3],[3,4],[4,0],[0,5],[5,2],[5,6],[6,7],[7,5]],{0:[305,65],1:[315,310],2:[90,340],3:[30,200],4:[90,70],5:[125,100],6:[125,295]}),
 G('Bella Bell','bell',[[180,70],[270,145],[290,285],[180,320],[70,285],[90,145],[180,200],[270,375],[90,375]],[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[6,3],[3,7],[7,8],[8,3]],{0:[255,65],5:[105,65],2:[260,330],3:[100,330],9:[180,405]}),
 G('Professor Bloom','flower',[[180,210],[100,105],[180,55],[280,135],[305,225],[255,325],[180,370],[80,300],[55,200]],[[0,1],[1,2],[2,0],[0,3],[3,4],[4,0],[0,5],[5,6],[6,0],[0,7],[7,8],[8,0]],{0:[75,180],1:[85,35],2:[250,105],3:[240,65],4:[335,135],5:[285,265],6:[290,245],7:[290,395],8:[110,305],9:[100,350],10:[20,300],11:[85,130]}),
 G('Butterfly Blues','butterfly',[[180,170],[180,275],[65,80],[60,300],[295,80],[300,300],[270,370],[90,370]],[[0,2],[2,3],[3,1],[1,4],[4,5],[5,0],[0,1],[1,6],[6,7],[7,1]],{0:[80,25],1:[10,150],2:[90,370],3:[325,355],4:[355,150],5:[280,25],8:[180,405]}),
 G('The Grand Marquee','marquee',[[65,145],[295,145],[295,295],[65,295],[180,60],[180,375],[180,220],[180,305]],[[0,1],[1,2],[2,3],[3,0],[0,4],[4,1],[3,5],[5,2],[0,6],[6,2],[1,6],[6,3],[6,7]])
];
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function starts(g){let deg=g.points.map((_,i)=>g.edges.filter(e=>e.a===i||e.b===i).length),odd=deg.map((d,i)=>d%2?i:-1).filter(i=>i>=0);return odd.length?odd:deg.map((d,i)=>d?i:-1).filter(i=>i>=0)}
export function edgeBetween(g,a,b){return g.edges.findIndex(e=>(e.a===a&&e.b===b)||(e.a===b&&e.b===a))}
export function usedEdges(g,path){let u=[];for(let i=1;i<path.length;i++)u.push(edgeBetween(g,path[i-1],path[i]));return u}
export function solve(g,path=[]){let used=usedEdges(g,path);if(used.some(x=>x<0)||new Set(used).size!==used.length)return null;let mask=used.reduce((m,i)=>m|(1<<i),0),all=(1<<g.edges.length)-1,memo=new Set();
 function dfs(n,m){if(m===all)return [n];let k=n+':'+m;if(memo.has(k))return null;memo.add(k);for(let i=0;i<g.edges.length;i++){let e=g.edges[i];if(m&(1<<i))continue;let b=e.a===n?e.b:e.b===n?e.a:-1;if(b<0)continue;let r=dfs(b,m|(1<<i));if(r)return [n,...r]}return null}
 if(path.length)return dfs(path.at(-1),mask);for(let s of starts(g)){let r=dfs(s,mask);if(r)return r}return null;
}
export class Round{
 constructor(index=0,saved=null){this.index=clamp(Math.floor(index)||0,0,SHOWS.length-1);this.path=[];this.hints=0;this.restarts=0;this.won=false;if(saved&&Array.isArray(saved.path)&&saved.path.length<=SHOWS[this.index].edges.length+1){for(let n of saved.path){if(!this.step(n))break}this.hints=clamp(Number(saved.hints)||0,0,999);this.restarts=clamp(Number(saved.restarts)||0,0,999)}}
 get graph(){return SHOWS[this.index]} get used(){return usedEdges(this.graph,this.path)} get progress(){return Math.max(0,this.path.length-1)} get stars(){return this.won?1+Number(this.hints===0)+Number(this.restarts===0):0} get stuck(){return !this.won&&this.path.length>0&&!solve(this.graph,this.path)}
 step(n){if(this.won||!Number.isInteger(n)||!this.graph.points[n])return false;if(!this.path.length){if(!starts(this.graph).includes(n))return false;this.path.push(n);return true}let e=edgeBetween(this.graph,this.path.at(-1),n);if(e<0||this.used.includes(e))return false;this.path.push(n);this.won=this.progress===this.graph.edges.length;return true}
 undo(){if(!this.path.length)return false;this.path.pop();this.won=false;return true}
 restart(){if(!this.path.length||this.won)return false;this.path=[];this.restarts++;return true}
 hint(){if(this.won)return null;this.hints++;let undo=0,p=[...this.path],route=solve(this.graph,p);while(!route&&p.length){p.pop();undo++;route=solve(this.graph,p)}this.path=p;this.won=false;return {undo,from:route[0],to:p.length?route[1]:route[0]}}
 save(){return {index:this.index,path:this.path,hints:this.hints,restarts:this.restarts}}
}
export function profile(raw={}){raw=raw&&typeof raw==='object'?raw:{};let records=Array.from({length:12},(_,i)=>{let r=raw.records?.[i];return {stars:clamp(Math.floor(Number(r?.stars))||0,0,3),best:clamp(Math.floor(Number(r?.best))||0,0,99999)}});let total=records.reduce((s,r)=>s+r.stars,0);return {records,total,sound:raw.sound!==false,gentle:!!raw.gentle,ink:['coral','jade','violet'].includes(raw.ink)&&({coral:0,jade:9,violet:24}[raw.ink]<=total)?raw.ink:'coral'}}
export function record(p,r){if(!r.won)return false;let old=p.records[r.index],score=300+r.graph.edges.length*50+(r.hints===0?200:0)+(r.restarts===0?100:0);old.stars=Math.max(old.stars,r.stars);old.best=Math.max(old.best,score);p.total=p.records.reduce((s,v)=>s+v.stars,0);return true}
export function unlocked(p){let i=p.records.findIndex(r=>!r.stars);return i<0?11:i}
