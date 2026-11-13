// Original Lights-Out-family rules. No DOM, clock, network, or randomness.
const caches=new Map();
export function masks(n){return Array.from({length:n*n},(_,i)=>{let x=i%n,y=Math.floor(i/n),v=1<<i;for(let [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){let a=x+dx,b=y+dy;if(a>=0&&a<n&&b>=0&&b<n)v|=1<<(b*n+a)}return v})}
export function solver(n){if(caches.has(n))return caches.get(n);if(n!==3&&n!==4)throw Error('Unsupported house size');let cross=masks(n),size=1<<(n*n),dist=new Int16Array(size).fill(-1),q=new Int32Array(size),head=0,tail=1;dist[0]=0;q[0]=0;while(head<tail){let d=q[head++];for(let m of cross){let next=d^m;if(dist[next]<0){dist[next]=dist[d]+1;q[tail++]=next}}}let s={cross,dist,reachable:tail,goal:size-1};caches.set(n,s);return s}
export function route(n,board){let s=solver(n),d=board^s.goal;if(!Number.isInteger(board)||board<0||board>s.goal||s.dist[d]<0)return null;let path=[];while(d){let i=s.cross.findIndex(m=>s.dist[d^m]===s.dist[d]-1);if(i<0)throw Error('Broken route');path.push(i);d^=s.cross[i]}return path}
// Fixed solver-selected starts, stable across reloads. Every par is exact.
const starts=[16,85,170,98,292,341,33,129,516,4369,23130,3855];
export const HOUSES=starts.map((seed,index)=>{let n=index<6?3:4,s=solver(n),desired=[1,2,3,3,4,4,3,4,4,5,6,7][index];let diff=index===0?s.cross[4]:seed;
 if(s.dist[diff]!==desired){let pool=[];for(let k=1;k<s.dist.length;k++)if(s.dist[k]===desired)pool.push(k);diff=pool[(seed*17+index*71)%pool.length]}
 return Object.freeze({index,n,start:s.goal^diff,par:s.dist[diff],name:['Bramble Bakery','Hedge & Petal','Oakbeam Workshop','Raincoat Landing','Teacup Wharf','Blue Thread House','The Reading Nook','Scarlet Scarf','Acorn Post','Moonwatch Tower','Paintbox Cottage','The Little Lute'][index],resident:['Pip','Hazel','Bram','Puddle','Juniper','Fern','Professor Hoot','Clover','Aster','Milo','Rowan','Lumi'][index],job:['Baker','Gardener','Carpenter','Rain collector','Tea maker','Tailor','Librarian','Knitter','Postie','Astronomer','Painter','Musician'][index],scene:Math.floor(index/4)})});
export class Round{
 constructor(index=0,saved=null){this.index=Number.isInteger(index)&&index>=0&&index<12?index:0;this.house=HOUSES[this.index];this.board=this.house.start;this.history=[];this.hints=0;
  if(saved&&saved.index===this.index&&Array.isArray(saved.history)&&saved.history.length<=2000){let board=this.board,history=[];for(let i of saved.history){if(!Number.isInteger(i)||i<0||i>=this.house.n**2||board===solver(this.house.n).goal)break;board^=solver(this.house.n).cross[i];history.push(i)}if(board===saved.board&&history.length===saved.history.length){this.board=board;this.history=history;this.hints=Number.isInteger(saved.hints)&&saved.hints>=0?Math.min(999,saved.hints):0}}}
 get won(){return this.board===solver(this.house.n).goal}get moves(){return this.history.length}get lit(){let v=this.board,n=0;while(v){v&=v-1;n++}return n}get stars(){return this.won?1+(this.moves<=this.house.par+2?1:0)+(this.moves<=this.house.par&&this.hints===0?1:0):0}
 step(i){if(this.won||!Number.isInteger(i)||i<0||i>=this.house.n**2||this.moves>=2000)return false;this.board^=solver(this.house.n).cross[i];this.history.push(i);return true}
 undo(){if(this.won||!this.moves)return false;this.board^=solver(this.house.n).cross[this.history.pop()];return true}
 restart(){this.board=this.house.start;this.history=[];this.hints=0}
 hint(){if(this.won)return null;this.hints++;return route(this.house.n,this.board)[0]}
 save(){return{index:this.index,board:this.board,history:[...this.history],hints:this.hints}}
}
export function profile(raw={}){if(!raw||typeof raw!=='object')raw={};let records=HOUSES.map((_,i)=>{let r=raw.records?.[i];return{stars:Number.isInteger(r?.stars)&&r.stars>=0&&r.stars<=3?r.stars:0,moves:Number.isInteger(r?.moves)&&r.moves>=0?r.moves:null}});let total=records.reduce((s,r)=>s+r.stars,0),glow=['honey','peach','starlight'].includes(raw.glow)?raw.glow:'honey';if(total<({honey:0,peach:9,starlight:24}[glow]))glow='honey';return{records,total,glow,sound:raw.sound!==false,gentle:raw.gentle===true}}
export function unlocked(p){for(let i=0;i<11;i++)if(!p.records[i].stars)return i;return 11}
export function record(p,r){if(!r.won)return false;let old=p.records[r.index];old.stars=Math.max(old.stars,r.stars);old.moves=old.moves===null?r.moves:Math.min(old.moves,r.moves);p.total=p.records.reduce((s,x)=>s+x.stars,0);return true}
