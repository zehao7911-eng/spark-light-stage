import{LEVELS}from'./levels.js';export{LEVELS};
export const DISTRICTS=['Daybreak Dock','Rustbelt Ring','Aurora Anchorage'];
export const bit=n=>1<<n;
export function count(mask){let n=0;for(;mask;mask&=mask-1)n++;return n;}
export function compile(cells){const set=new Set(cells),all=[];for(let a of cells){let x=a%5,y=Math.floor(a/5);for(let[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){let nx=x+dx*2,ny=y+dy*2,b=(y+dy)*5+x+dx,c=ny*5+nx;if(nx>=0&&nx<5&&ny>=0&&ny<5&&set.has(b)&&set.has(c))all.push([a,b,c]);}}return all;}
const geometry=LEVELS.map(l=>({mask:l.cells.reduce((m,k)=>m|bit(k),0),moves:compile(l.cells)}));
export function legal(mask,m){return !!(mask&bit(m[0]))&&!!(mask&bit(m[1]))&&!(mask&bit(m[2]));}
export function options(s){return geometry[s.i].moves.filter(m=>legal(s.mask,m));}
export function fresh(i=0){if(!Number.isInteger(i)||!LEVELS[i])i=0;return{i,mask:LEVELS[i].mask,history:[],guides:0,selected:-1,won:false};}
export function select(s,k){if(s.won||!Number.isInteger(k)||k<0||k>=25||!(s.mask&bit(k)))return false;s.selected=s.selected===k?-1:k;return true;}
export function hop(s,from,to){if(s.won||!Number.isInteger(from)||!Number.isInteger(to))return null;const m=geometry[s.i].moves.find(m=>m[0]===from&&m[2]===to&&legal(s.mask,m));if(!m)return null;s.history.push(s.mask);s.mask^=bit(m[0])|bit(m[1])|bit(m[2]);s.selected=-1;s.won=count(s.mask)===1;return m.slice();}
export function undo(s){if(s.won||!s.history.length)return false;s.mask=s.history.pop();s.selected=-1;return true;}
export function solve(mask,i,budget=100000){let seen=new Set(),visits=0,exceeded=false;const search=m=>{if(count(m)===1)return[];if(seen.has(m))return null;if(++visits>budget){exceeded=true;return null;}seen.add(m);for(let move of geometry[i].moves){if(!legal(m,move))continue;const next=m^(bit(move[0])|bit(move[1])|bit(move[2])),route=search(next);if(route)return[move,...route];if(exceeded)return null;}return null;};const route=search(mask);return{route,visits,exceeded};}
export function guide(s){if(s.won)return null;s.guides++;let r=solve(s.mask,s.i,60000),rewound=0;if(!r.route){for(let k=s.history.length-1;k>=0;k--){let v=solve(s.history[k],s.i,60000);if(v.route){rewound=s.history.length-k;s.mask=s.history[k];s.history=s.history.slice(0,k);r=v;break;}}}if(!r.route){rewound+=s.history.length;s.mask=LEVELS[s.i].mask;s.history=[];r={route:LEVELS[s.i].route};}const m=r.route[0];if(!m)return null;s.selected=m[0];return{move:m.slice(),rewound};}
export const stars=s=>s.won?(s.guides?2:3):0;
export const boarded=s=>s.won?LEVELS[s.i].initial:LEVELS[s.i].initial-count(s.mask);
export function snapshot(s){return{i:s.i,mask:s.mask,history:s.history.slice(),guides:s.guides,selected:s.selected};}
export function restore(v){if(!v||!Number.isInteger(v.i)||!LEVELS[v.i]||!Number.isInteger(v.guides)||v.guides<0||v.guides>1000000||!Number.isInteger(v.selected)||v.selected< -1||v.selected>24||!Array.isArray(v.history)||v.history.length>24)return fresh();const g=geometry[v.i],valid=m=>Number.isInteger(m)&&m>0&&m<=33554431&&!(m&~g.mask);if(!valid(v.mask)||!v.history.every(valid))return fresh();let seq=[...v.history,v.mask];if(seq[0]!==LEVELS[v.i].mask)return fresh();for(let k=1;k<seq.length;k++)if(!g.moves.some(m=>legal(seq[k-1],m)&&(seq[k-1]^(bit(m[0])|bit(m[1])|bit(m[2])))===seq[k]))return fresh();return{i:v.i,mask:v.mask,history:v.history.slice(),guides:v.guides,selected:v.mask&bit(v.selected)?v.selected:-1,won:count(v.mask)===1};}
