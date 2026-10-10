(function(root){
'use strict';
const names=['Pip','Miso','Clover','Bramble','Peach','Otto','Luna','Bean'];
const titles=['Window shopping','Two tickets, please','A little elbow room','The quiet carriage','Friends on board','Last bus home','Morning commuters','The scenic route','Platform picnic','A very full train','Sleeper service','Goodnight, hills','Salt in the air','A musical crossing','Moonlit company','Little luxuries','All aboard','The long way home'];
const icons={window:'▣',front:'↑',back:'↓',buddy:'♥',quiet:'♩̸',space:'↔',music:'♫'};
const labels={window:'Window seat',front:'Front row',back:'Back row',buddy:'Beside my friend',quiet:'Away from music',space:'Empty seat beside me'};
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t^=t+Math.imul(t^t>>>7,61|t);return((t^t>>>14)>>>0)/4294967296}}
function near(a,b){if(a<0||b<0)return false;return (Math.floor(a/4)===Math.floor(b/4)&&Math.floor((a%4)/2)===Math.floor((b%4)/2)&&Math.abs(a-b)===1)||Math.abs(a-b)===4}
function pair(s){return s^1}
function make(level,seed){level=Math.max(0,Math.floor(level)||0);const r=rng(seed===undefined?71293+level*997:seed),n=[4,4,5,5,6,6,6,7,7,8,8,8,6,7,7,8,8,8][level%18],spots=[0,1,2,3,4,5,6,7];for(let i=7;i>0;i--){let j=Math.floor(r()*(i+1));[spots[i],spots[j]]=[spots[j],spots[i]]}const solution=spots.slice(0,n),g=solution.map((s,i)=>({id:i,name:names[i],species:i,music:false,rules:[]}));
const add=(i,t,to)=>{if(!g[i].rules.some(x=>x.type===t))g[i].rules.push({type:t,to})};
// Every rule is derived from a witness arrangement, so every departure is solvable.
if(level>=3){let musician=Math.floor(r()*n);g[musician].music=true;for(let i=0;i<n;i++)if(i!==musician&&!near(solution[i],solution[musician]))add(i,'quiet')}
if(level>=1){for(let i=0;i<n;i++){const j=solution.indexOf(pair(solution[i]));if(j>i){add(i,'buddy',j);add(j,'buddy',i);break}}}
if(level>=2&&n<8){let i=solution.findIndex(s=>!solution.includes(pair(s)));if(i>=0)add(i,'space')}
for(let i=0;i<n;i++){const s=solution[i],available=[s%4===0||s%4===3?'window':null,s<4?'front':'back'].filter(Boolean);if(!g[i].rules.length||level>=5){const t=available[Math.floor(r()*available.length)];add(i,t)}if(level>=8&&r()<.45)available.forEach(t=>add(i,t));g[i].rules=g[i].rules.slice(0,3)}
return{level,title:titles[level%18],vehicle:Math.floor(level/6)%3,n,guests:g,solution};}
function checks(p,positions,i){const s=positions[i];return p.guests[i].rules.map(rule=>{if(s<0)return false;switch(rule.type){case'window':return s%4===0||s%4===3;case'front':return s<4;case'back':return s>=4;case'buddy':return positions[rule.to]===pair(s);case'quiet':return !p.guests.some((g,j)=>g.music&&near(s,positions[j]));case'space':return !positions.includes(pair(s));default:return false}})}
function happy(p,pos,i){return pos[i]>=0&&checks(p,pos,i).every(Boolean)}
function solved(p,pos){return p.guests.every((g,i)=>happy(p,pos,i))}
function valid(p,a){return Array.isArray(a)&&a.length===p.n&&a.every(x=>Number.isInteger(x)&&x>=-1&&x<8)&&new Set(a.filter(x=>x>=0)).size===a.filter(x=>x>=0).length}
function newState(level,seed){const p=make(level,seed);return{p,positions:Array(p.n).fill(-1),moves:0,hints:0,history:[],won:false}}
function place(s,i,target){if(s.won||!Number.isInteger(i)||i<0||i>=s.p.n||!Number.isInteger(target)||target< -1||target>7||s.positions[i]===target)return false;s.history.push(s.positions.slice());if(s.history.length>100)s.history.shift();const old=s.positions[i],other=target<0?-1:s.positions.indexOf(target);s.positions[i]=target;if(other>=0)s.positions[other]=old;s.moves++;s.won=solved(s.p,s.positions);return true}
function undo(s){if(!s.history.length||s.won)return false;s.positions=s.history.pop();s.moves++;return true}
function solve(p,current){let best=null,bestScore=-1,pos=Array(p.n).fill(-1);function dfs(i,mask){if(i===p.n){if(!solved(p,pos))return;let score=pos.reduce((n,v,j)=>n+(v===current[j]?1:0),0);if(score>bestScore){bestScore=score;best=pos.slice()}return}for(let seat=0;seat<8;seat++){if(mask>>seat&1)continue;pos[i]=seat;const g=p.guests[i];if(g.rules.some(x=>x.type==='window'&&seat%4!==0&&seat%4!==3||x.type==='front'&&seat>=4||x.type==='back'&&seat<4))continue;let bad=false;for(let j=0;j<=i;j++){for(const rule of p.guests[j].rules){if(rule.type==='buddy'&&rule.to<=i&&pos[rule.to]!==pair(pos[j]))bad=true;if(rule.type==='quiet')for(let k=0;k<=i;k++)if(p.guests[k].music&&near(pos[j],pos[k]))bad=true;if(rule.type==='space')for(let k=0;k<=i;k++)if(k!==j&&pos[k]===pair(pos[j]))bad=true}}if(!bad)dfs(i+1,mask|1<<seat)}pos[i]=-1}dfs(0,0);return best}
function hint(s){if(s.won)return false;const target=solve(s.p,s.positions);if(!target)return false;const i=target.findIndex((v,j)=>v!==s.positions[j]);s.hints++;return place(s,i,target[i])?i:false}
function stars(s){return s.hints===0&&s.moves<=s.p.n+2?3:s.hints<=1&&s.moves<=s.p.n+8?2:1}
function pack(s){return{level:s.p.level,positions:s.positions,moves:s.moves,hints:s.hints,history:s.history,won:s.won}}
function restore(data){if(!data||!Number.isInteger(data.level)||data.level<0||data.level>17)return null;const s=newState(data.level);if(!valid(s.p,data.positions)||!Number.isInteger(data.moves)||data.moves<0||data.moves>100000||!Number.isInteger(data.hints)||data.hints<0||data.hints>data.moves)return null;s.positions=data.positions.slice();s.moves=data.moves;s.hints=data.hints;s.history=Array.isArray(data.history)?data.history.filter(a=>valid(s.p,a)).slice(-100).map(a=>a.slice()):[];s.won=solved(s.p,s.positions);return s}
const api={names,titles,icons,labels,near,pair,make,checks,happy,solved,valid,newState,place,undo,solve,hint,stars,pack,restore};if(typeof module!=='undefined')module.exports=api;else root.SeatEngine=api;
})(typeof window!=='undefined'?window:globalThis);
