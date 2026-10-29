import {LEVELS} from './levels.mjs';
export {LEVELS};
export const clone=b=>b.map(x=>[...x]);
export const finished=(b,cap)=>b.every(a=>!a.length||a.length===cap&&a.every(c=>c===a[0]));
export const sealed=(a,cap)=>a.length===cap&&a.every(c=>c===a[0]);
export function legal(b,a,z,cap){if(!Number.isInteger(a)||!Number.isInteger(z)||a===z||a<0||z<0||a>=b.length||z>=b.length||!b[a].length||b[z].length>=cap||sealed(b[a],cap))return 0;let top=b[a].at(-1);if(b[z].length&&b[z].at(-1)!==top)return 0;let n=0;for(let i=b[a].length-1;i>=0&&b[a][i]===top;i--)n++;return Math.min(n,cap-b[z].length);}
export function transfer(b,a,z,cap){let n=legal(b,a,z,cap);if(!n)return null;let c=clone(b);c[z].push(...c[a].splice(-n));return c;}
function key(b){return b.map(x=>x.join('')).sort().join('|');}
export function solve(board,cap,max=90000){if(finished(board,cap))return [];let nodes=[{b:clone(board),p:-1,a:null}],seen=new Set([key(board)]),head=0;
 while(head<nodes.length&&nodes.length<max){let k=head++,n=nodes[k];for(let a=0;a<n.b.length;a++){if(!n.b[a].length||sealed(n.b[a],cap))continue;let emptyUsed=false;for(let z=0;z<n.b.length;z++){if(!n.b[z].length){if(emptyUsed)continue;emptyUsed=true;if(n.b[a].every(c=>c===n.b[a][0]))continue;}let b=transfer(n.b,a,z,cap);if(!b)continue;let h=key(b);if(seen.has(h))continue;seen.add(h);let index=nodes.length;nodes.push({b,p:k,a:[a,z]});if(finished(b,cap)){let route=[];for(let j=index;nodes[j].p>=0;j=nodes[j].p)route.push(nodes[j].a);return route.reverse();}}}}
 return null;}
export function create(level=0){level=Math.max(0,Math.min(11,Math.floor(level)||0));return {v:1,level,board:clone(LEVELS[level].board),history:[],moves:0,hints:0,anim:null,status:'play',events:[]};}
export function pour(s,a,z){if(!s||s.status!=='play'||s.anim)return false;let q=LEVELS[s.level],n=legal(s.board,a,z,q.cap);if(!n){s.events.push({type:'wrong',at:z});return false;}s.history.push(clone(s.board));if(s.history.length>120)s.history.shift();s.anim={from:a,to:z,n,color:s.board[a].at(-1),t:0};s.moves++;s.events.push({type:'pour',from:a,to:z,color:s.anim.color});return true;}
export function step(s,dt){if(!s||s.status!=='play'||!s.anim||!Number.isFinite(dt)||dt<=0)return;s.anim.t=Math.min(1,s.anim.t+Math.min(dt,.05)/.92);if(s.anim.t<1)return;let a=s.anim,q=LEVELS[s.level],b=transfer(s.board,a.from,a.to,q.cap);if(!b){s.anim=null;return;}s.board=b;s.anim=null;s.events.push({type:'settle'});if(sealed(b[a.to],q.cap))s.events.push({type:'seal',at:a.to,color:a.color});if(finished(b,q.cap)){s.status='won';s.events.push({type:'win'});}}
export function undo(s){if(!s||s.status!=='play'||s.anim||!s.history.length)return false;s.board=s.history.pop();s.moves=Math.max(0,s.moves-1);s.events.push({type:'undo'});return true;}
export function hint(s){if(!s||s.status!=='play'||s.anim)return false;s.hints++;return true;}
export function stars(s){return s.status==='won'?1+(s.moves<=LEVELS[s.level].par+2?1:0)+(s.hints===0?1:0):0;}
export const newProfile=()=>({best:Array(12).fill(null)});
export function record(p,s){if(s.status!=='won')return false;let old=p.best[s.level];p.best[s.level]={stars:Math.max(old?.stars||0,stars(s)),moves:Math.min(old?.moves??Infinity,s.moves)};return true;}
function boardValid(b,q){if(!Array.isArray(b)||b.length!==q.board.length||!b.every(a=>Array.isArray(a)&&a.length<=q.cap&&a.every(c=>Number.isInteger(c)&&c>=0&&c<q.colors)))return false;let cnt=Array(q.colors).fill(0);b.flat().forEach(c=>cnt[c]++);return cnt.every(c=>c===q.cap);}
export function restore(raw){try{let x=typeof raw==='string'?JSON.parse(raw):raw;if(!x||x.v!==1||!Number.isInteger(x.level)||x.level<0||x.level>11||!['play','won'].includes(x.status))return null;let q=LEVELS[x.level];if(!boardValid(x.board,q)||!Array.isArray(x.history)||x.history.length>120||!x.history.every(b=>boardValid(b,q))||!Number.isInteger(x.moves)||x.moves<0||x.moves>10000||!Number.isInteger(x.hints)||x.hints<0||x.hints>10000)return null;
 if(x.anim){let a=x.anim;if(x.status!=='play'||!Number.isFinite(a.t)||a.t<0||a.t>=1||legal(x.board,a.from,a.to,q.cap)!==a.n||x.board[a.from]?.at(-1)!==a.color)return null;}if(x.status==='won'&&!finished(x.board,q.cap))return null;return {...x,events:[]};}catch{return null;}}
export function cleanProfile(x){let p=newProfile();if(!Array.isArray(x?.best))return p;for(let i=0;i<12;i++){let b=x.best[i];if(b&&Number.isInteger(b.stars)&&b.stars>=1&&b.stars<=3&&Number.isInteger(b.moves)&&b.moves>=LEVELS[i].par&&b.moves<10000)p.best[i]={stars:b.stars,moves:b.moves};}return p;}
