(function(root){'use strict';
const TOYS=[
 {name:'Cloud train',family:0,color:'#89aea9',kind:'train'}, {name:'Moon rocket',family:0,color:'#d49b73',kind:'rocket'}, {name:'Paper plane',family:0,color:'#b9b4d2',kind:'plane'},
 {name:'Garden bunny',family:1,color:'#e8c5a3',kind:'bunny'}, {name:'Mushroom lamp',family:1,color:'#c87962',kind:'mushroom'}, {name:'Little sprout',family:1,color:'#87a179',kind:'sprout'},
 {name:'Sailing boat',family:2,color:'#8cabae',kind:'boat'}, {name:'Sleepy whale',family:2,color:'#7196ae',kind:'whale'}, {name:'Pearl shell',family:2,color:'#caa8ba',kind:'shell'},
 {name:'Honey bear',family:3,color:'#c49a68',kind:'bear'}, {name:'Tea house',family:3,color:'#aa8c72',kind:'house'}, {name:'Music box',family:3,color:'#c28f96',kind:'music'}];
const NAMES=['First light','Garden guests','By the sea','Honey afternoon','A little flight','Rainy day','Moon market','The grand window'];
const MANIFESTS=[[0,3,6,1,4,7],[3,9,0,5,10,2],[6,0,9,8,1,11],[9,3,6,11,4,7],[0,6,3,2,8,5],[3,9,6,4,11,8],[0,9,6,1,10,7],[9,3,0,10,5,2]];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));const copy=o=>JSON.parse(JSON.stringify(o));
class Game{
 constructor(day=1){this.day=clamp(Math.floor(day),1,999);this.phase='cut';this.t=0;this.tape=Array(20).fill(false);this.bubbles=Array(12).fill(false);this.ids=MANIFESTS[(this.day-1)%8].slice();if(this.day>8){const k=Math.floor(this.day/8)%3;this.ids=this.ids.map(id=>id-id%3+(id%3+k)%3);}this.slots=Array(6).fill(-1);this.prices=Array(6).fill(1);this.selected=-1;this.sold=Array(6).fill(false);this.paired=Array(6).fill(false);this.revenue=0;this.pairSales=0;this.customers=[];this.visitors=0;this.spawn=0;this.stars=0;this.events=[];this.hinted=false;this.cuts=0;}
 emit(type,x={}){this.events.push({type,...x});}
 cut(i){if(this.phase!=='cut'||!Number.isInteger(i)||i<0||i>=20||this.tape[i])return false;this.tape[i]=true;this.cuts++;this.emit('rip',{i});if(this.tape.every(Boolean)){this.phase='stock';this.emit('open');}return true;}
 peel(){for(let i=0;i<20;i++)if(!this.tape[i]){for(let j=i;j<Math.min(20,i+4);j++)this.cut(j);break;}}
 pop(i){if(!['cut','stock'].includes(this.phase)||i<0||i>=12||!Number.isInteger(i)||this.bubbles[i])return false;this.bubbles[i]=true;this.emit('pop',{i});return true;}
 place(item,slot){if(this.phase!=='stock'||!Number.isInteger(item)||item<0||item>=6||!Number.isInteger(slot)||slot<0||slot>=6)return false;let from=this.slots.indexOf(item),other=this.slots[slot];if(from===slot){this.emit('play',{item});return true;}if(from>=0)this.slots[from]=other;this.slots[slot]=item;this.selected=-1;this.emit('snap',{item,slot});return true;}
 select(i){if(this.phase==='stock'&&i>=0&&i<6){this.selected=i;this.emit('play',{item:i});}}
 price(slot){if(this.phase!=='stock'||this.slots[slot]<0)return false;this.prices[slot]=(this.prices[slot]+1)%3;this.emit('price',{slot});return true;}
 pairs(){return this.slots.map((id,s)=>id>=0&&this.slots.some((j,k)=>j>=0&&j!==id&&(Math.floor(s/3)===Math.floor(k/3)&&Math.abs(s-k)===1||Math.abs(s-k)===3)&&TOYS[this.ids[id]].family===TOYS[this.ids[j]].family));}
 open(){if(this.phase!=='stock'||this.slots.includes(-1))return false;this.phase='shop';this.paired=this.pairs();this.selected=-1;this.spawn=.5;this.emit('bell');return true;}
 spawnCustomer(){let remaining=this.slots.map((id,s)=>({id,s})).filter(o=>!this.sold[o.id]&&!this.customers.some(c=>c.item===o.id&&c.stage!=='exit'));if(!remaining.length)return;let target=remaining[this.visitors%remaining.length],family=TOYS[this.ids[target.id]].family,budget=Math.floor(this.visitors/3)%3,options=remaining.filter(o=>TOYS[this.ids[o.id]].family===family&&this.prices[o.s]<=budget);let pick=options[0];this.customers.push({id:this.visitors,kind:this.visitors%4,family,budget,item:pick?pick.id:-1,slot:pick?pick.s:-1,stage:pick?'browse':'leave',age:0,progress:0,price:pick?(4+this.prices[pick.s]*3+(this.paired[pick.s]?3:0)):0});this.visitors++;this.emit('enter');}
 pet(id){if(this.phase!=='shop')return false;const c=this.customers.find(c=>c.id===id);if(!c||c.tipped||c.item<0||!['admire','pay'].includes(c.stage))return false;c.tipped=true;c.price++;c.progress+=.3;this.emit('tip',{id:c.id});return true;}
 update(dt){if(this.phase==='won')return;dt=clamp(dt,0,.05);this.t+=dt;if(this.phase!=='shop')return;this.spawn-=dt;if(this.spawn<=0&&this.customers.length<4){this.spawnCustomer();this.spawn=1.25;}
 for(const c of this.customers){c.age+=dt;c.progress+=dt;
  if(c.stage==='browse'&&c.progress>=1.25){c.stage='admire';c.progress=0;this.emit('admire',{slot:c.slot});}
  else if(c.stage==='admire'&&c.progress>=.65){this.sold[c.item]=true;c.stage='pay';c.progress=0;this.emit('pickup',{item:c.item,slot:c.slot});}
  else if(c.stage==='pay'&&c.progress>=1.3){this.revenue+=c.price;this.pairSales+=this.paired[c.slot]?1:0;c.stage='exit';c.progress=0;this.emit('coin',{value:c.price,item:c.item});}
  else if(c.stage==='leave'&&c.progress>=2.2){c.stage='exit';c.progress=0;this.emit('shrug');}
 }
 this.customers=this.customers.filter(c=>!(c.stage==='exit'&&c.progress>1));
 if(this.sold.every(Boolean)&&!this.customers.some(c=>c.stage==='pay')){this.phase='won';this.stars=1+(this.pairSales===6?1:0)+(this.bubbles.every(Boolean)?1:0);this.emit('won');}
 }
 snapshot(){let o=copy(this);delete o.events;return o;}
 static restore(o){try{if(!o||!Number.isInteger(o.day)||o.day<1||o.day>999)return null;let g=new Game(o.day);const arr=(a,n,f)=>Array.isArray(a)&&a.length===n&&a.every(f),bool=x=>typeof x==='boolean',int=(a,b)=>x=>Number.isInteger(x)&&x>=a&&x<=b;
 if(!['cut','stock','shop','won'].includes(o.phase)||!arr(o.tape,20,bool)||!arr(o.bubbles,12,bool)||!arr(o.slots,6,int(-1,5))||!arr(o.prices,6,int(0,2))||!arr(o.sold,6,bool)||!arr(o.paired,6,bool))return null;
 const non=o.slots.filter(x=>x>=0);if(new Set(non).size!==non.length||!int(-1,5)(o.selected)||!int(0,6)(o.pairSales)||!int(0,84)(o.revenue)||!int(0,3)(o.stars)||!int(0,10000)(o.visitors)||!Number.isFinite(o.t)||o.t<0||o.t>1e7||!Number.isFinite(o.spawn)||o.spawn<-.1||o.spawn>2)return null;
 if(o.phase!=='cut'&&!o.tape.every(Boolean)||['shop','won'].includes(o.phase)&&o.slots.includes(-1)||o.phase==='won'&&(!o.sold.every(Boolean)||o.stars<1))return null;
 if(!int(0,20)(o.cuts)||o.cuts!==o.tape.filter(Boolean).length||typeof o.hinted!=='boolean')return null;
 if(!Array.isArray(o.customers)||o.customers.length>4)return null;let busy=new Set();for(const c of o.customers){if(c.tipped!==undefined&&typeof c.tipped!=='boolean')return null;if(!int(0,10000)(c.id)||!int(0,3)(c.kind)||!int(0,3)(c.family)||!int(0,2)(c.budget)||!int(-1,5)(c.item)||!int(-1,5)(c.slot)||!['browse','admire','pay','exit','leave'].includes(c.stage)||!Number.isFinite(c.age)||c.age<0||c.age>30||!Number.isFinite(c.progress)||c.progress<0||c.progress>3.5||!int(0,14)(c.price))return null;if(['browse','admire','pay'].includes(c.stage)){if(c.slot<0||c.item<0||o.slots[c.slot]!==c.item||busy.has(c.item)||c.family!==TOYS[g.ids[c.item]].family||c.price!==4+o.prices[c.slot]*3+(o.paired[c.slot]?3:0)+(c.tipped?1:0))return null;busy.add(c.item);}}
 for(const key of ['phase','t','tape','bubbles','slots','prices','sold','paired','revenue','pairSales','customers','visitors','spawn','stars','hinted','cuts'])g[key]=copy(o[key]??g[key]);g.selected=-1;return g;}catch{return null;}}
}
const API={Game,TOYS,NAMES,MANIFESTS,clamp};if(typeof module!=='undefined')module.exports=API;else Object.assign(root,API);
})(typeof window!=='undefined'?window:globalThis);

