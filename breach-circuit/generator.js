(function(root){'use strict';const C=root.BreachCore;
const layouts=[
 {name:'First Contact',mirrors:[],bumpers:[]},
 {name:'Bank Statement',mirrors:[],bumpers:[{x:210,y:350,r:22}]},
 {name:'Angle of Attack',mirrors:[[156,290,245,240]],bumpers:[]},
 {name:'Double Reflection',mirrors:[[150,240,225,290],[170,370,255,330]],bumpers:[]},
 {name:'Thermal Transfer',mirrors:[[156,255,260,310]],bumpers:[{x:240,y:375,r:18}]},
 {name:'Orbiting Evidence',mirrors:[],bumpers:[{x:180,y:280,r:20},{x:255,y:365,r:19}]},
 {name:'Cross Current',mirrors:[[135,220,245,260],[145,385,270,345]],bumpers:[]},
 {name:'Pressure Vessel',mirrors:[[215,240,280,285]],bumpers:[{x:180,y:300,r:30}]},
 {name:'Night Shift',mirrors:[[150,240,220,275],[165,350,245,320],[220,390,278,420]],bumpers:[]},
 {name:'Split Decision',mirrors:[[150,315,195,350]],bumpers:[{x:176,y:250,r:18},{x:248,y:350,r:26}]},
 {name:'Afterimage',mirrors:[[142,250,215,300],[220,300,285,255]],bumpers:[{x:230,y:395,r:18}]},
 {name:'Breach Circuit',mirrors:[[150,240,225,280],[165,370,245,330]],bumpers:[{x:260,y:405,r:17},{x:180,y:310,r:19}]}
];
function clear(l,p,targets){if(p.x<74||p.x>287||p.y<202||p.y>407||Math.abs(p.x-110)<27)return false;if(targets.some(t=>C.distance(t,p)<43))return false;if(l.bumpers.some(b=>C.distance(b,p)<b.r+26))return false;if(l.mirrors.some(a=>C.segmentDistance(p.x,p.y,...a)<26))return false;return true;}
function make(index,seed=34001+index*307,endless=false,attempt=0){let base=JSON.parse(JSON.stringify(layouts[index%12])),l={...base,id:endless?1000+index:index,seed,scene:endless?index%3:Math.floor(index/4),targets:[],start:{side:'R',p:.5}},rand=C.random(seed),dummy={...l,targets:[{x:-9999,y:-9999}]};let candidates=C.presets().map(p=>({p,path:C.simulate(dummy,p).path.filter(v=>v.age>.1&&v.age<2.7)}));if(index===0&&!endless){const path=candidates.find(a=>a.p.id==='R3').path;for(const time of[.13,.255]){const p=path.reduce((a,b)=>Math.abs(a.age-time)<Math.abs(b.age-time)?a:b);l.targets.push({id:l.targets.length,x:+p.x.toFixed(2),y:+p.y.toFixed(2),kind:l.targets.length%4});}}else{const count=endless?Math.min(9,5+Math.floor(index/3)):Math.min(8,3+Math.floor(index/2));let pool=[];for(let i=0;i<candidates.length;i++)for(let j=2;j<candidates[i].path.length;j+=4){let p=candidates[i].path[j];if(clear(l,p,[]))pool.push({x:p.x,y:p.y,source:i,weight:rand()});}pool.sort((a,b)=>a.weight-b.weight);const fav=[Math.floor(rand()*21),Math.floor(rand()*21),Math.floor(rand()*21)];for(const p of pool){if(clear(l,p,l.targets)){l.targets.push({id:l.targets.length,x:+p.x.toFixed(2),y:+p.y.toFixed(2),kind:l.targets.length%4});if(l.targets.length===count)break;}}if(l.targets.length<count)throw Error('Could not place reachable targets '+index);}
const plan=C.plan(l);if(!plan)throw Error('Unreachable generated chamber '+index);const minPlan=index<2?1:index<6?2:3;if(plan.length<minPlan&&attempt<(endless?3:90))return make(index,seed+101,endless,attempt+1);l.gold=Math.max(1,plan.length+(index>0?1:0));l.plan=index===0&&!endless?['R3']:plan.map(p=>p.id);if(endless)l.name='Field Test '+(index+1);return l;}
root.BreachGenerator={make,layouts};if(typeof module!=='undefined')module.exports=root.BreachGenerator;
})(globalThis);
