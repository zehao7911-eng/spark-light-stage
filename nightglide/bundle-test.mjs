// Executable packaging regression, not a browser substitute. The DOM/canvas here are
// deliberately inert: only bundle scope, input wiring, timers and visible text are tested.
import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
let frames=[],els={},store=null;
const gradient=()=>({addColorStop(){}}),context=new Proxy({createLinearGradient:gradient,createRadialGradient:gradient},{get(t,k){return t[k]??(()=>{})},set(t,k,v){t[k]=v;return true}});
function element(id){return els[id]??=( {id,style:{},children:[{textContent:''},{textContent:''}],classList:{toggle(){}},open:false,hidden:false,disabled:false,textContent:'',innerHTML:'',onclick:null,attributes:{},addEventListener(){},setAttribute(k,v){this.attributes[k]=v},getContext(){return context},focus(){},querySelector(){return element(id+'span')},showModal(){this.open=true},close(){this.open=false},closest(){return null}})}
let runtime={console,Math,JSON,Date,Number,Array,Object,String,Set,parseInt,setTimeout,clearTimeout,performance:{now:()=>0},requestAnimationFrame:f=>frames.push(f),document:{getElementById:element,querySelector:()=>null,createElement:()=>element('texture'),addEventListener(){}},window:{addEventListener(){}},localStorage:{getItem:()=>store,setItem:(k,v)=>store=v},Image:class{constructor(){this.width=768;this.height=1376}set src(v){queueMicrotask(()=>this.onload?.())}}};
const html=fs.readFileSync(new URL('./index.html',import.meta.url),'utf8');let js=html.match(/<script>([\s\S]*?)<\/script>/)[1];new vm.Script(js,{filename:'actual-shipped-inline.js'}).runInNewContext(runtime);await new Promise(r=>setTimeout(r,0));
assert.equal(element('loading').hidden,true);element('serve').onclick();
for(let n=1;n<=180;n++){const f=frames.shift();assert.ok(f,'animation callback');f(n*1000/60)}
const label=element('game').attributes['aria-label'];assert.ok(label.includes('. ready. You 1, keeper 0.'),label);assert.ok(element('serve').hidden===false,'next serve available');assert.ok(JSON.parse(store).current.serveNumber===1,'model serve is not overwritten by UI serve');
element('pause').onclick();let stopped=element('game').attributes['aria-label'];for(let n=181;n<=300;n++)frames.shift()(n*1000/60);assert.equal(element('game').attributes['aria-label'],stopped,'pause stops the shipped bundle');
console.log(JSON.stringify({bundleAssertions:5,frameCallbacks:300,opening:label,scope:'Actual shipped classic script, inert DOM/canvas; native browser QA is separate'}));

