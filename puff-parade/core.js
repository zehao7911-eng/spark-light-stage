import {Board} from './source-board.js';
export const STAGES=[
 {name:'First Friends',size:4,theme:0,depth:0,lesson:true,subtitle:'Flip 2 blue birds.'},
 {name:'Meadow Picnic',size:4,theme:0,depth:0,subtitle:'Finish with more pink friends.'},
 {name:'Waterlily Club',size:6,theme:1,depth:1,subtitle:'Finish with more pink friends.'},
 {name:'Apricot Hour',size:6,theme:2,depth:1,subtitle:'Finish with more pink friends.'},
 {name:'Moonflower Grove',size:6,theme:3,depth:2,subtitle:'Finish with more pink friends.'},
 {name:'The Grand Picnic',size:6,theme:4,depth:2,subtitle:'Finish with more pink friends.'}
];
export function rng(s){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed/4294967296}
export function create(stage=0,seed=1){
 const n=STAGES[stage].size,b=Array.from({length:n},()=>Array(n).fill(0)),m=n/2;
 b[m-1][m-1]=1;b[m][m]=1;b[m-1][m]=2;b[m][m-1]=2;
 if(stage===0){b.forEach(c=>c.fill(0));b[0][1]=1;b[1][1]=2;b[2][1]=2;b[1][2]=2;b[2][2]=1;}
 const s={v:1,stage,b,turn:1,seed:seed>>>0,moves:0,flips:0,bestFlip:0,hints:0,undos:0,history:[],ended:false,result:null,last:null};
 if(stage>=3){for(let i=0;i<(stage-2)*2;i++){const ms=legal(s.b,s.turn);if(!ms.length){s.turn=3-s.turn;continue}const p=ms[Math.floor(rng(s)*ms.length)];put(s.b,p.x,p.y,s.turn);s.turn=3-s.turn}if(s.turn!==1)s.turn=1;advance(s);}
 return s;
}
export function legal(b,player){const a=new Board(b.length);a.boardGrid=b;const [valid,pairs]=a.findValidMoves(player),map=new Map();
 for(const [x,y] of valid){if(b[x][y]!==0)continue;map.set(x+','+y,{x,y,flips:[]})}
 // Actual upstream Controller.flip pairs: each anchor can contribute a separate ray.
 for(const pair of pairs){for(const [x,y] of pair[1]){const m=map.get(x+','+y);if(m)for(const v of pair[3])if(!m.flips.some(c=>c[0]===v[0]&&c[1]===v[1]))m.flips.push(v)}}
 return [...map.values()].filter(m=>m.flips.length>0);
}
export function counts(b){return b.flat().reduce((a,v)=>(a[v]++,a),[0,0,0])}
export function put(b,x,y,player){const m=legal(b,player).find(m=>m.x===x&&m.y===y);if(!m)return null;b[x][y]=player;for(const [i,j] of m.flips)b[i][j]=player;return m}
export function advance(s){if(s.ended)return;const own=legal(s.b,s.turn);if(own.length)return;const next=3-s.turn;if(legal(s.b,next).length){s.turn=next;s.passed=true;return}finish(s);}
function finish(s){const c=counts(s.b);s.ended=true;s.result=c[1]>c[2]?'win':c[1]===c[2]?'draw':'loss';}
export function move(s,x,y){if(s.ended)return null;const player=s.turn,m=legal(s.b,player).find(m=>m.x===x&&m.y===y);if(!m)return null;
 if(player===1){s.history.push({b:s.b.map(c=>c.slice()),seed:s.seed,flips:s.flips,bestFlip:s.bestFlip,moves:s.moves});if(s.history.length>40)s.history.shift();s.moves++;s.flips+=m.flips.length;s.bestFlip=Math.max(s.bestFlip,m.flips.length)}
 put(s.b,x,y,player);s.last={x,y,player,flips:m.flips.map(c=>c.slice())};s.passed=false;
 if(STAGES[s.stage].lesson&&player===1&&m.flips.length>=2){s.ended=true;s.result='win';return s.last}
 s.turn=3-player;advance(s);return s.last;
}
export function undo(s){const h=s.history.pop();if(!h)return false;Object.assign(s,h);s.b=h.b.map(c=>c.slice());s.turn=1;s.ended=false;s.result=null;s.last=null;s.passed=false;s.undos++;return true;}
function evaluate(b,p){const n=b.length,c=counts(b);let v=(c[p]-c[3-p])*(c[0]<8?3:.2);for(let x=0;x<n;x++)for(let y=0;y<n;y++){if(!b[x][y])continue;const corner=(x===0||x===n-1)&&(y===0||y===n-1);const edge=x===0||y===0||x===n-1||y===n-1;let w=corner?30:edge?3:0;
 if((x===1||x===n-2)&&(y===1||y===n-2)&&b[x===1?0:n-1][y===1?0:n-1]===0)w=-8;v+=b[x][y]===p?w:-w;}return v+2*(legal(b,p).length-legal(b,3-p).length)}
function minimax(b,turn,p,depth,alpha=-1e9,beta=1e9){const ms=legal(b,turn),other=3-turn;if(!depth||(!ms.length&&!legal(b,other).length))return evaluate(b,p);if(!ms.length)return minimax(b,other,p,depth-1,alpha,beta);let val=turn===p?-1e9:1e9;for(const m of ms){const nb=b.map(c=>c.slice());put(nb,m.x,m.y,turn);const v=minimax(nb,other,p,depth-1,alpha,beta);if(turn===p){val=Math.max(val,v);alpha=Math.max(alpha,val)}else{val=Math.min(val,v);beta=Math.min(beta,val)}if(beta<=alpha)break}return val}
export function choose(s,depth=STAGES[s.stage].depth){const ms=legal(s.b,s.turn);if(!ms.length)return null;if(depth===0)return ms[Math.floor(rng(s)*ms.length)];const scored=ms.map(m=>{const b=s.b.map(c=>c.slice());put(b,m.x,m.y,s.turn);return {m,v:minimax(b,3-s.turn,s.turn,depth-1)}}).sort((a,b)=>b.v-a.v);const best=scored.filter(v=>v.v===scored[0].v);return best[Math.floor(rng(s)*best.length)].m;}
export function stars(s){if(!s.ended||s.result!=='win')return 0;return 1+Number(s.hints===0)+Number(s.undos===0)}
export function reward(profile,s){const earned=stars(s);profile.best[s.stage]=Math.max(profile.best[s.stage]||0,earned);profile.unlocked=Math.max(profile.unlocked,Math.min(5,s.stage+Number(s.result==='win')));return earned}
export function total(p){return p.best.reduce((a,b)=>a+b,0)}
export function restore(data){try{const s=typeof data==='string'?JSON.parse(data):structuredClone(data),n=STAGES[s.stage]?.size;if(!n||s.v!==1||!Array.isArray(s.b)||s.b.length!==n||!s.b.every(c=>Array.isArray(c)&&c.length===n&&c.every(v=>Number.isInteger(v)&&v>=0&&v<=2))||![1,2].includes(s.turn)||!Number.isInteger(s.seed)||!['moves','flips','bestFlip','hints','undos'].every(k=>Number.isInteger(s[k])&&s[k]>=0&&s[k]<100000)||!Array.isArray(s.history)||s.history.length>40)return null;s.history=s.history.filter(h=>h.b?.length===n&&h.b.every(c=>c.length===n&&c.every(v=>v>=0&&v<=2))&&['moves','flips','bestFlip','seed'].every(k=>Number.isInteger(h[k])&&h[k]>=0));if(!s.ended)advance(s);else if(!['win','loss','draw'].includes(s.result))return null;return s}catch{return null}}
