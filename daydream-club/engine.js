(function(root){'use strict';const clone=x=>JSON.parse(JSON.stringify(x));
const tracks=[
{name:'Midnight snack',kind:0,beat:.66,notes:[0,2,4,6,8,10,11,13,15,17,19,21],key:0},
{name:'Love letters',kind:1,beat:.62,notes:[0,1,3,4,6,7,9,10,12,13,15,16,18,19,21,22],key:2},
{name:'Cloud portraits',kind:2,beat:.60,notes:[0,1,2,3,5,6,7,8,10,11,12,13,15,16,17,18],key:5},
{name:'Moonflower tea',kind:3,beat:.64,notes:[0,2,4,5,7,9,11,12,14,16,17,19,20,22,23,25],key:7},
{name:'A second helping',kind:0,beat:.57,notes:[0,1,2,3,5,6,7,8,10,11,12,13,15,16,17,18,20,21,22,23,25,26,27,28],key:3},
{name:'The dream parade',kind:4,beat:.60,notes:Array.from({length:24},(_,i)=>Math.floor(i/6)*12+i%6),key:0}
];
function make(level=0,easy=false){const t=tracks[level],beat=t.beat*(easy?1.18:1);return{level,easy,beat,time:0,notes:t.notes.map((b,i)=>({at:(b+4)*beat,kind:t.kind===4?Math.floor(i/6):t.kind,status:0})),combo:0,bestCombo:0,perfect:0,nice:0,miss:0,extra:0,lastTap:-10,events:[],done:false,awarded:false}}
function profile(){return{stars:Array(6).fill(0),accuracy:Array(6).fill(0),coins:0,outfit:0,owned:[0],mute:false,offset:0}}
function grade(s){return(s.perfect+s.nice*.72)/(s.notes.length+s.extra*.35)}
function advance(s,t){if(s.done)return;s.time=Math.max(s.time,t);const win=s.easy?.28:.19;for(let i=0;i<s.notes.length;i++){let n=s.notes[i];if(n.status===0&&s.time>n.at+win+.12){n.status=3;s.miss++;s.combo=0;s.events.push({i,grade:'miss',at:n.at+win})}}s.events=s.events.filter(e=>s.time-e.at<2).slice(-12);if(s.time>s.notes.at(-1).at+1.15)s.done=true}
function tap(s,t,offset=0){advance(s,t);if(s.done||t-s.lastTap<.08)return null;s.lastTap=t;let time=t+offset/1000,best=-1,delta=Infinity,win=s.easy?.28:.19;s.notes.forEach((n,i)=>{let d=Math.abs(n.at-time);if(n.status===0&&d<delta){best=i;delta=d}});if(best<0||delta>win){if(t<s.notes[0].at-win)return null;s.extra++;s.combo=0;s.events.push({i:-1,grade:'early',at:t});return{grade:'early',i:-1}}
let n=s.notes[best],perfect=delta<=(s.easy?.15:.105);n.status=perfect?1:2;s[perfect?'perfect':'nice']++;s.combo++;s.bestCombo=Math.max(s.bestCombo,s.combo);const e={i:best,grade:perfect?'perfect':'nice',at:t};s.events.push(e);return e}
function award(s,p){if(!s.done||s.awarded)return 0;let a=grade(s),stars=Math.min(s.easy?2:3,1+(a>=.55?1:0)+(a>=.86?1:0)),old=p.stars[s.level],gain=old?Math.max(0,stars-old):4+stars;p.stars[s.level]=Math.max(old,stars);p.accuracy[s.level]=Math.max(p.accuracy[s.level],a);p.coins+=gain;s.awarded=true;return gain}
function buy(p,i){if(i<0||i>3)return false;if(!p.owned.includes(i)){const cost=[0,8,12,16][i];if(p.coins<cost)return false;p.coins-=cost;p.owned.push(i)}p.outfit=i;return true}
function scene(s){let t=tracks[s.level];return t.kind===4?Math.min(3,Math.floor(s.time/s.beat/12)):t.kind}
const api={tracks,make,profile,clone,advance,tap,award,buy,grade,scene};if(typeof module!=='undefined')module.exports=api;root.DreamEngine=api;})(typeof window!=='undefined'?window:globalThis);
