(function(root){
const recipes=[
 {name:'Strawberry Sunday',hue:'#eba9b4',cream:'#fff1dc',accent:'#e65368',pattern:'ring',fruit:'berry'},
 {name:'Blueberry Cloud',hue:'#a4afd9',cream:'#f7edf8',accent:'#6375b8',pattern:'spiral',fruit:'blue'},
 {name:'Pistachio Picnic',hue:'#a9c285',cream:'#f9f0cb',accent:'#8ca967',pattern:'petals',fruit:'leaf'},
 {name:'Peach Blush',hue:'#f1b49e',cream:'#fff0d7',accent:'#f49a6c',pattern:'heart',fruit:'peach'},
 {name:'Chocolate Garden',hue:'#8c574c',cream:'#e9c8a3',accent:'#df667c',pattern:'petals',fruit:'berry'},
 {name:'Lemon Ribbon',hue:'#efd480',cream:'#fff5c9',accent:'#d6af40',pattern:'spiral',fruit:'lemon'}];
function paths(pattern){let out=[]; if(pattern==='ring'){for(let k=0;k<2;k++){let r=k?0.84:1.49;out.push(Array.from({length:Math.round(r*70)},(_,i)=>{let t=i/(Math.round(r*70)-1)*Math.PI*2;return [Math.cos(t)*r,Math.sin(t)*r]}))}}
if(pattern==='spiral')out.push(Array.from({length:210},(_,i)=>{let t=i/209*Math.PI*5,r=1.53*(1-i/230);return [Math.cos(t)*r,Math.sin(t)*r]}));
if(pattern==='petals'){for(let j=0;j<5;j++)out.push(Array.from({length:45},(_,i)=>{let t=i/44*Math.PI*2,angle=j*Math.PI*2/5,r=.8+.65*Math.sin(t/2);return [Math.sin(angle)*r+Math.cos(angle)*Math.sin(t)*.4,Math.cos(angle)*r-Math.sin(angle)*Math.sin(t)*.4]}))}
if(pattern==='heart')out.push(Array.from({length:160},(_,i)=>{let t=i/159*Math.PI*2;return [16*Math.sin(t)**3*.09,-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))*.085]}));return out}
class Game{constructor(profile){this.p={cakes:0,coins:0,style:0,owned:[0],...profile};this.p.cakes=Math.max(0,Math.min(10000,Math.floor(Number(this.p.cakes)||0)));this.p.coins=Math.max(0,Math.min(1e7,Math.floor(Number(this.p.coins)||0)));this.p.owned=Array.isArray(this.p.owned)?[...new Set([0,...this.p.owned.filter(n=>Number.isInteger(n)&&n>=0&&n<4)])]:[0];if(!this.p.owned.includes(this.p.style))this.p.style=0;this.start()}
start(){this.recipe=recipes[this.p.cakes%recipes.length];this.paths=paths(this.recipe.pattern);this.nodes=this.paths.flat().map(p=>({x:p[0],z:p[1],filled:false}));this.phase='pipe';this.covered=0;this.decorated=0;this.targets=Array.from({length:5+this.p.cakes%3},(_,i)=>{let t=i/(5+this.p.cakes%3)*Math.PI*2;return {x:Math.sin(t)*1.3,z:Math.cos(t)*1.3,done:false}});this.awarded=false;this.last=null;this.icing=[];this.sprinkles=[];this.paused=false;this.pipeTime=0;this.waste=0;this.reward=0;this.stars=0}
pipe(x,z,dt){if(this.paused||this.phase!=='pipe'||!Number.isFinite(x+z)||Math.hypot(x,z)>1.92)return 0;let hits=0;for(let n of this.nodes)if(!n.filled&&Math.hypot(n.x-x,n.z-z)<.24){n.filled=true;hits++}this.covered+=hits;this.pipeTime+=dt;if(!hits)this.waste+=dt;if(this.covered/this.nodes.length>=.94){this.phase='top';this.last=null}return hits}
top(x,z){if(this.paused||this.phase!=='top')return -1;let i=this.targets.findIndex(t=>!t.done&&Math.hypot(t.x-x,t.z-z)<.48);if(i<0)return -1;this.targets[i].done=true;this.decorated++;if(this.decorated===this.targets.length)this.phase='serve';return i}
serve(){if(this.paused||this.phase!=='serve'||this.awarded)return 0;this.awarded=true;this.phase='done';this.stars=this.covered/this.nodes.length>=.94&&this.waste<4?3:2;this.reward=35+this.stars*10+this.p.cakes%6*5;this.p.coins+=this.reward;this.p.cakes++;return this.reward}
buy(i){if(!Number.isInteger(i)||i<0||i>3)return false;if(this.p.owned.includes(i)){this.p.style=i;return true}let price=i*90;if(this.p.coins<price)return false;this.p.coins-=price;this.p.owned.push(i);this.p.style=i;return true}
}
root.Frost={Game,recipes,paths};if(typeof module!=='undefined')module.exports=root.Frost;
})(typeof window==='undefined'?globalThis:window);
