(function(root){'use strict';
const paths=[
[0,1,2,3,4,9,14,13,12,11,16,21,22,23,24],
[0,5,10,11,12,7,2,3,4,9,14,19,24],
[20,15,10,5,0,1,2,7,12,13,14,19,24],
[0,1,6,11,10,15,20,21,22,17,12,13,14,9,4],
[0,1,2,8,14,13,12,18,24,25,26,27,21,15,16,17,23,29,35],
[30,24,18,12,6,0,1,2,8,14,20,21,22,16,10,4,5,11,17,23,29,35],
[5,4,3,9,15,14,13,7,1,0,6,12,18,24,25,26,27,28,29,35],
[0,6,12,13,14,8,2,3,4,10,16,15,21,27,26,25,31,32,33,34,35],
[0,1,7,13,12,18,24,25,19,20,14,8,2,3,4,10,16,22,28,29,35],
[30,24,18,12,6,0,1,2,3,9,15,14,13,19,25,26,27,21,22,23,29,35],
[0,6,12,18,24,30,31,25,19,13,7,1,2,3,9,15,21,27,28,22,16,10,4,5],
[0,1,2,8,14,13,7,6,12,18,24,30,31,32,26,20,21,15,9,3,4,5,11,17,23,29,35]
];
const names=['First glaze','Berry bend','Sugar garden','Cherry on top','Peach terraces','The long way home','Ribbon roads','Vanilla clouds','Midnight batch','Cocoa courtyard','Starlight kitchen','A little celebration'];
const levels=paths.map((p,i)=>{const n=i<4?5:6, count=i===0?1:i<3?2:3;let stations=[];for(let k=1;k<=count;k++)stations.push({at:p[Math.floor((p.length-1)*k/(count+1))],type:k});let spare=Array.from({length:n*n},(_,x)=>x).filter(x=>!p.includes(x));let blocked=spare.filter((x,j)=>i<2?j%3===0:j%3!==1);return {n,path:p,start:p[0],end:p.at(-1),stations,blocked,name:names[i],theme:Math.floor(i/4),par:p.length-1}});
function adjacent(a,b,n){return Math.abs(a%n-b%n)+Math.abs(Math.floor(a/n)-Math.floor(b/n))===1}
function validate(l,p){if(!Array.isArray(p)||p[0]!==l.start)return {ok:false,reason:'Start at the oven.',at:l.start};let seen=new Set;for(let j=0;j<p.length;j++){let x=p[j];if(!Number.isInteger(x)||x<0||x>=l.n*l.n||l.blocked.includes(x)||seen.has(x)||(j&&!adjacent(x,p[j-1],l.n)))return {ok:false,reason:'The conveyor needs a clear route.',at:x};seen.add(x)}let ordered=p.filter(x=>l.stations.some(s=>s.at===x));if(ordered.some((x,j)=>x!==l.stations[j]?.at))return {ok:false,reason:'Follow the topping order below.',at:ordered.find((x,j)=>x!==l.stations[j]?.at)};if(ordered.length!==l.stations.length)return {ok:false,reason:'Visit every topping machine.',at:l.stations[ordered.length].at};if(p.at(-1)!==l.end)return {ok:false,reason:'Finish at the gift box.',at:l.end};return {ok:true}}
function extend(l,p,x){if(!Number.isInteger(x)||x<0||x>=l.n*l.n)return p;if(x===p.at(-1))return p;let old=p.indexOf(x);if(old>=0)return p.slice(0,old+1);if(l.blocked.includes(x)||!adjacent(p.at(-1),x,l.n)||p.at(-1)===l.end)return p;return [...p,x]}
const api={levels,validate,extend,adjacent};if(typeof module!=='undefined')module.exports=api;else root.Sugar=api;
})(typeof window!=='undefined'?window:globalThis);
