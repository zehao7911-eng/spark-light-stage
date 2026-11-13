import assert from 'node:assert/strict';
import {create,move,plant,pulse,step,stars,record,profileNew,restore,cleanProfile,RAIDS,DAMAGE} from '../core.mjs';
let checks=0;function check(x,m){checks++;assert.ok(x,m);}
export function tend(s){
 // Ordinary legal actions only: grow the weakest path, pair crops without emptying a path.
 for(let r=0;r<3;r++){let ids=[r*3,r*3+1,r*3+2];for(let a of ids)for(let b of ids)if(a<b&&s.board[a]&&s.board[a]===s.board[b]&&s.board[a]<5){move(s,a,b);return;}}
 if(s.coins>=2&&plant(s))return;
 let pow=[0,1,2].map(r=>s.board.slice(r*3,r*3+3).reduce((v,l)=>v+DAMAGE[l],0));
 for(let a=0;a<9;a++)for(let b=a+1;b<9;b++)if(s.board[a]&&s.board[a]===s.board[b]&&s.board[a]<5){let ra=Math.floor(a/3),rb=Math.floor(b/3);let min=DAMAGE[s.board[a]];if(pow[ra]-min>=1&&pow[ra]>=pow[rb]){move(s,a,b);return;}if(pow[rb]-min>=1){move(s,b,a);return;}}
 if(s.earned>=8)pulse(s);
}
let routes=[];
for(let n=0;n<8;n++){for(let cadence of [.35,.8,1.3]){let s=create(n),ticks=0;while(['ready','play'].includes(s.status)&&ticks<18000){if(ticks%Math.round(cadence*60)===0)tend(s);step(s,1/60);s.events=[];ticks++;}check(s.status==='won',`raid${n} won cadence${cadence}: ${s.status} breaches${s.breaches}`);check(s.kills+s.breaches===RAIDS[n].pattern.length,'all scheduled pests accounted');check(s.enemies.length===0,'no phantom remaining');check(stars(s)>=2,'maintains meaningful stars');let snap=JSON.stringify(s);step(s,1);check(JSON.stringify(s)===snap,'terminal freeze');routes.push({raid:n+1,cadence,time:s.t,stars:stars(s),score:s.score,breaches:s.breaches,highest:s.highest});}}
let s=create();for(let i=0;i<1000;i++)step(s,1/60);check(s.status==='ready'&&s.spawn===0&&s.t===0,'idle never starts');check(!move(s,0,0)&&!move(s,90,1)&&!move(s,.2,1),'invalid plot input');check(move(s,0,1),'first actual merge');check(s.board[1]===2&&s.board[0]===0&&s.merges===1,'merge conservation');check(!move(s,3,1),'different crops rejected');check(plant(s,0),'empty plot planted');check(!plant(s,0),'occupied plot protected');check(!pulse(s),'burst requires real catches');for(let i=0;i<600;i++)step(s,1/60);let r=restore(JSON.stringify(s));check(r&&JSON.stringify(r)===JSON.stringify({...s,events:[]}),'exact restore active motion');s.events=[];for(let i=0;i<100;i++){step(s,1/60);step(r,1/60);}check(JSON.stringify(s)===JSON.stringify(r),'continuation deterministic');
let p=profileNew(),win=create();win.status='won';win.highest=3;win.score=1230;record(p,win);record(p,win);check(p.best[0].score===1230&&p.best[0].stars===3,'records best-only idempotent');win.score=100;win.highest=1;win.breaches=1;record(p,win);check(p.best[0].score===1230&&p.best[0].stars===3,'lower replay cannot erase reward');check(p.unlocked===1,'next raid unlock');check(!record(p,create()),'no reward without win');
for(const x of [null,'{',{}, {...create(),board:[9]}, {...create(),coins:999},{...create(),raid:8},{...create(),t:NaN},{...create(),enemies:[{row:8}]}])check(!restore(x),'invalid save rejected');check(cleanProfile({best:[{stars:8}],unlocked:900}).best[0]===null,'bad profile sanitized');
console.log(JSON.stringify({checks,routes},null,2));
