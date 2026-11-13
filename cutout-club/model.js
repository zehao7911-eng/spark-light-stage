(function(root){'use strict';
const categories=['look','head','carry','feet'];
const colours={gold:'#dab366',green:'#819b83',ink:'#4c4b5a',blue:'#91afc3',rose:'#c98386',ivory:'#e4dac7'};
const briefs=[
 ['A Little Rain','rain','warm','gold'],['Blue Hour','night','smart','blue'],['Garden Invitation','sun','light','green'],['The Lantern Ball','night','play','rose'],['Snow Mail','snow','warm','ivory'],['Gallery Opening','sun','smart','ink'],['Seaside Sunday','sun','light','blue'],['Rainy Record Shop','rain','play','green'],['Velvet Midnight','night','smart','rose'],['Winter Carnival','snow','play','gold']
];
const items=[];
function add(cat,name,shape,col,tags,unlock=0){items.push({id:items.length,cat,name,shape,col,tags,unlock});}
[
 ['Rain Song','coat','gold',['warm','gold'],0],['Field Notes','overall','green',['light','green'],0],['Chalk Lines','suit','ink',['smart','ink'],0],['Blue Nocturne','pleats','blue',['smart','blue'],1],['Garden Gauze','puff','green',['light','green'],2],['Rose Refrain','tulle','rose',['play','rose'],3],['Snow Letter','puffer','ivory',['warm','ivory'],4],['Ink Gallery','longcoat','ink',['smart','ink'],5],['Sea Glass','sailor','blue',['light','blue'],6],['Fern Parade','parka','green',['play','green'],7],['Rose Velvet','velvet','rose',['smart','rose'],8],['Honey Carnival','cape','gold',['play','gold'],9]
].forEach(x=>add('look',...x));
[
 ['Rain Bonnet','bonnet','blue',['rain','blue'],0],['Little Beret','beret','rose',['smart','rose'],0],['Moon Ribbon','moon','ink',['night','ink'],1],['Straw Afternoon','straw','gold',['sun','gold'],2],['Soft Earmuffs','muffs','ivory',['snow','warm'],4],['Ribbon Sky','bow','blue',['sun','light'],5],['Evening Bloom','flower','rose',['night','rose'],7],['Paper Crown','crown','gold',['snow','play'],9]
].forEach(x=>add('head',...x));
[
 ['Canvas Tote','tote','ivory',['light','ivory'],0],['Pocket Umbrella','umbrella','green',['rain','green'],0],['Night Lantern','lantern','gold',['night','gold'],1],['Fresh Bouquet','bouquet','rose',['sun','rose'],2],['Sunday Camera','camera','ink',['play','ink'],3],['Snow Muff','muff','ivory',['snow','ivory'],4],['Gallery Satchel','satchel','ink',['smart','ink'],5],['Shell Case','case','blue',['sun','blue'],6],['Rainy Records','record','green',['rain','green'],7],['Golden Parcel','gift','gold',['play','gold'],8]
].forEach(x=>add('carry',...x));
[
 ['Everyday Lace','lace','ink',['smart','ink'],0],['Puddle Boots','rainboot','blue',['rain','blue'],0],['Midnight Mary Janes','mary','rose',['night','rose'],1],['Garden Sandals','sandal','ivory',['sun','light'],2],['Little Dance','ribbon','rose',['play','rose'],3],['Frost Boots','fur','ivory',['snow','warm'],4],['Gallery Loafers','loafer','ink',['smart','ink'],5],['Sea Stripes','sneaker','blue',['sun','blue'],6],['Fern Walkers','hike','green',['rain','green'],7],['Star Steps','star','gold',['snow','gold'],8]
].forEach(x=>add('feet',...x));
function goals(level){return briefs[level].slice(1)}
function tags(look){return [...new Set(categories.flatMap(cat=>items[look?.[cat]]?.cat===cat?items[look[cat]].tags:[]))]}
function assess(level,look){let t=tags(look);return goals(level).map(g=>({tag:g,done:t.includes(g)}));}
function available(p){return items.filter(i=>i.unlock<=p.cleared)}
function cleanLook(l,p,allowAll=false){let o={};for(const cat of categories){let i=items[l?.[cat]];o[cat]=i&&i.cat===cat&&(allowAll||i.unlock<=p.cleared)?i.id:null;}if(o.look===null)o.look=1;if(o.feet===null)o.feet=30;return o;}
function profile(raw){let d=raw&&typeof raw==='object'?raw:{},p={album:Array(10).fill(null),cleared:0,sound:d.sound!==false,gentle:!!d.gentle,char:0};
 for(let n=0;n<10;n++){let a=d.album?.[n];if(!a||typeof a!=='object')break;let look=cleanLook(a.look,{cleared:n},true);if(!assess(n,look).every(g=>g.done))break;p.album[n]={look,char:Number.isInteger(a.char)?Math.max(0,Math.min(2,a.char)):0};p.cleared++;}
 p.char=Math.max(0,Math.min(p.cleared>=5?2:p.cleared>=2?1:0,Math.floor(+d.char||0)));return p;}
function state(p,raw){let level=Number.isInteger(raw?.level)?Math.max(0,Math.min(Math.min(p.cleared,9),raw.level)):Math.min(p.cleared,9);return{level,look:cleanLook(raw?.look,p),category:categories.includes(raw?.category)?raw.category:'look',undo:[],hints:0};}
function equip(s,p,id){let i=items[id];if(!i||i.unlock>p.cleared||s.look[i.cat]===id)return false;s.undo.push({...s.look});if(s.undo.length>30)s.undo.shift();s.look[i.cat]=id;return true;}
function undo(s){if(!s.undo.length)return false;s.look=s.undo.pop();return true;}
function ready(s){return assess(s.level,s.look).every(g=>g.done)}
function capture(s,p){if(!ready(s))return null;let old=p.cleared;p.album[s.level]={look:{...s.look},char:p.char};p.cleared=0;while(p.cleared<10&&p.album[p.cleared])p.cleared++;return{first:p.cleared>old,unlocked:p.cleared>old?items.filter(i=>i.unlock===p.cleared).map(i=>i.id):[],newModel:p.cleared>old&&[2,5].includes(p.cleared)};}
function hint(s,p){let missing=assess(s.level,s.look).filter(g=>!g.done).map(g=>g.tag),before=3-missing.length;let best=null,score=-1;for(const i of available(p)){let look={...s.look,[i.cat]:i.id},n=assess(s.level,look).filter(g=>g.done).length;let gain=n-before;if(gain>score&&gain>0){score=gain;best=i;}}s.hints++;return best?.id??null;}
root.Cutout={categories,colours,briefs,items,goals,tags,assess,available,cleanLook,profile,state,equip,undo,ready,capture,hint};if(typeof module!=='undefined')module.exports=root.Cutout;
})(typeof globalThis!=='undefined'?globalThis:this);
