import pathlib,hashlib,json
p=pathlib.Path(__file__).resolve().parents[1];s=(p/'upstream/colorroll.js').read_text();s='\n'.join(x for x in s.splitlines() if x.strip())
s=s.replace('"COLOR ROLL"','"RIBBON RUSH"').replace('const laneHeight = 7;', 'const laneHeight = 9;').replace('laneCount = 2;', 'laneCount = 4;').replace('clamp(5 + baseMultiplier, 1, 10)', 'clamp(5 + baseMultiplier, 1, 9)')
s=s.replace('multiplier = 1;\n      shotY = sy;', "multiplier = 1; shots++; events.push({type:'shot'});\n      shotY = sy;")
# Feed every cleared source row into the new visual feedback, without changing its matching rules.
s=s.replace('addScore(multiplier * pow(2, baseMultiplier), 50, l.y);', 'addScore(multiplier * pow(2, baseMultiplier), 50, l.y); events.push({type:"cut",x:50,y:l.y,color:hitColor,bars:JSON.parse(JSON.stringify(l.bars)),start:l.x,chain:Math.round(Math.log2(multiplier))+1}); maxChain=Math.max(maxChain,Math.round(Math.log2(multiplier))+1); cleared++;')
s=s.replace('sqrt(difficulty) * 0.005', 'sqrt(difficulty) * 0.012')
s=s.replace('play("hit");', 'play("hit"); misses++; events.push({type:"miss"});')
s=s.replace('play("powerUp");', 'play("powerUp"); batches++; events.push({type:"batch",batches});')
prefix='''/* Complete COLOR ROLL game adaptation. ABA Games (c) 2021, MIT.
 * Original source preserved in upstream/colorroll.js. Whole update and nested
 * addLane/addBars functions retained. Library APIs replaced by local runtime. */
(function(root){'use strict';
const orders=[{name:'First snip',sets:4,seed:227,zone:0},{name:'Ribbon parade',sets:5,seed:758,zone:0},{name:'Double bows',sets:6,seed:992,zone:0},{name:'Blueberry shift',sets:7,seed:342,zone:1},{name:'Triple treat',sets:8,seed:533,zone:1},{name:'The long spool',sets:9,seed:1453,zone:1},{name:'Golden scissors',sets:10,seed:821,zone:2},{name:'One last bow',sets:11,seed:1983,zone:2}];
function createRibbon(order=0,snapshot=null,endless=false){order=Math.min(7,Math.max(0,order|0));let def=orders[order],seed=def.seed,ticks=0,difficulty=1+order*.035,title,description,characters,options,input={isJustPressed:false},state='play',score=0,events=[],draws=[],currentColor='black',shots=0,misses=0,cleared=0,batches=0,maxChain=0;
const sqrt=Math.sqrt,pow=Math.pow,clamp=(v,a,b)=>Math.min(b,Math.max(a,v)),wrap=(v,a,b)=>((v-a)%(b-a)+(b-a))%(b-a)+a;
function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}function rnd(a=1,b){if(b==null){b=a;a=0}return a+random()*(b-a)}function rndi(a,b){return Math.floor(b==null?rnd(a):rnd(a,b))}function rnds(a=1,b){return rnd(a,b)*(random()<.5?-1:1)}function times(n,fn){return Array.from({length:Math.max(0,n|0)},(_,i)=>fn(i))}function remove(a,fn){for(let i=0;i<a.length;)if(fn(a[i]))a.splice(i,1);else i++}function color(c){currentColor=c}function rect(x,y,w,h){if(currentColor==='black'&&shotY==null&&x===49)return{isColliding:{rect:{}}};let a={x:Math.min(x,x+w),y:Math.min(y,y+h),w:Math.abs(w),h:Math.abs(h),color:currentColor},coll={};for(let b of draws)if(a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y)coll[b.color]=true;draws.push(a);return{isColliding:{rect:coll}}}
function play(){}function end(){if(state==='play'){state='lost';events.push({type:'lost'})}}function addScore(n,x,y){score+=n;events.push({type:'score',n,x,y})}
// BEGIN whole upstream game
'''
suffix='''
// END whole upstream game
function view(){return{order,endless,ticks,state,score,shots,misses,cleared,batches,maxChain,goal:def.sets,def,lanes:JSON.parse(JSON.stringify(lanes)),laneY,shotY,hitColor,laneCount,baseMultiplier,multiplier,penalty}}
function step(tap=false){if(state!=='play')return view();input.isJustPressed=!!tap;draws=[];currentColor='black';update();ticks++;difficulty=1+order*.035+(endless?Math.min(ticks/10800,1):0);if(!endless&&batches>=def.sets&&state==='play'){state='won';events.push({type:'won'})}return view()}
update();ticks=1;events=[];
function snap(){return JSON.parse(JSON.stringify({version:1,order,endless,seed,ticks,state,score,shots,misses,cleared,batches,maxChain,lanes,laneY,shotY:shotY??null,hitColor:hitColor??null,laneCount,baseMultiplier,multiplier,penalty}))}
function restore(s){if(!s||s.version!==1||s.order!==order||s.endless!==endless||!['play','won','lost'].includes(s.state)||!Array.isArray(s.lanes)||s.lanes.length>10)return false;for(let k of ['seed','ticks','score','shots','misses','cleared','batches','maxChain','laneY','laneCount','baseMultiplier','multiplier','penalty'])if(!Number.isFinite(s[k])||(k!=="laneY"&&s[k]<0)||Math.abs(s[k])>4294967295)return false;if(!Number.isInteger(s.seed)||s.ticks<1||s.penalty<1||s.penalty>4||s.laneCount<2||s.laneCount>10||s.baseMultiplier>9||s.multiplier<1||s.multiplier>1024)return false;if(s.shotY!==null&&(!Number.isFinite(s.shotY)||s.shotY< -20||s.shotY>140))return false;if(s.hitColor!==null&&!colors.includes(s.hitColor))return false;for(let l of s.lanes){if(!Number.isFinite(l.x)||l.x<0||l.x>=99||!Number.isFinite(l.y)||Math.abs(l.y)>4096||!Number.isFinite(l.vx)||Math.abs(l.vx)>3||!Array.isArray(l.bars)||l.bars.length<1||l.bars.length>4)return false;let sum=0;for(let b of l.bars){if(!colors.includes(b.color)||!Number.isFinite(b.width)||b.width<=0||b.width>99)return false;sum+=b.width}if(Math.abs(sum-99)>.001)return false}if(s.state==='won'&&s.batches<def.sets)return false;seed=s.seed;ticks=s.ticks;state=s.state;score=s.score;shots=s.shots;misses=s.misses;cleared=s.cleared;batches=s.batches;maxChain=s.maxChain;lanes=JSON.parse(JSON.stringify(s.lanes));laneY=s.laneY;shotY=s.shotY??undefined;hitColor=s.hitColor??undefined;laneCount=s.laneCount;baseMultiplier=s.baseMultiplier;multiplier=s.multiplier;penalty=s.penalty;difficulty=1+order*.035+(endless?Math.min(ticks/10800,1):0);events=[];return true}
if(snapshot)restore(snapshot);return{step,view,snapshot:snap,events,def};}
root.createRibbon=createRibbon;root.RibbonOrders=orders;if(typeof module!=='undefined')module.exports={createRibbon,orders};
})(typeof window==='undefined'?globalThis:window);
'''
(p/'source-game.js').write_text(prefix+s+suffix,encoding='utf-8');(p/'upstream/manifest.json').write_text(json.dumps({'repo':'https://github.com/abagames/crisp-game-lib-games','commit':'cfb39d2f988feb5918eb83697145b5a35adabf58','file':'docs/colorroll/main.js','sha256':hashlib.sha256((p/'upstream/colorroll.js').read_bytes()).hexdigest()},indent=2))

