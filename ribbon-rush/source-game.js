/* Complete COLOR ROLL game adaptation. ABA Games (c) 2021, MIT.
 * Original source preserved in upstream/colorroll.js. Whole update and nested
 * addLane/addBars functions retained. Library APIs replaced by local runtime. */
(function(root){'use strict';
const orders=[{name:'First snip',sets:4,seed:227,zone:0},{name:'Ribbon parade',sets:5,seed:758,zone:0},{name:'Double bows',sets:6,seed:992,zone:0},{name:'Blueberry shift',sets:7,seed:342,zone:1},{name:'Triple treat',sets:8,seed:533,zone:1},{name:'The long spool',sets:9,seed:1453,zone:1},{name:'Golden scissors',sets:10,seed:821,zone:2},{name:'One last bow',sets:11,seed:1983,zone:2}];
function createRibbon(order=0,snapshot=null,endless=false){order=Math.min(7,Math.max(0,order|0));let def=orders[order],seed=def.seed,ticks=0,difficulty=1+order*.035,title,description,characters,options,input={isJustPressed:false},state='play',score=0,events=[],draws=[],currentColor='black',shots=0,misses=0,cleared=0,batches=0,maxChain=0;
const sqrt=Math.sqrt,pow=Math.pow,clamp=(v,a,b)=>Math.min(b,Math.max(a,v)),wrap=(v,a,b)=>((v-a)%(b-a)+(b-a))%(b-a)+a;
function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}function rnd(a=1,b){if(b==null){b=a;a=0}return a+random()*(b-a)}function rndi(a,b){return Math.floor(b==null?rnd(a):rnd(a,b))}function rnds(a=1,b){return rnd(a,b)*(random()<.5?-1:1)}function times(n,fn){return Array.from({length:Math.max(0,n|0)},(_,i)=>fn(i))}function remove(a,fn){for(let i=0;i<a.length;)if(fn(a[i]))a.splice(i,1);else i++}function color(c){currentColor=c}function rect(x,y,w,h){if(currentColor==='black'&&shotY==null&&x===49)return{isColliding:{rect:{}}};let a={x:Math.min(x,x+w),y:Math.min(y,y+h),w:Math.abs(w),h:Math.abs(h),color:currentColor},coll={};for(let b of draws)if(a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y)coll[b.color]=true;draws.push(a);return{isColliding:{rect:coll}}}
function play(){}function end(){if(state==='play'){state='lost';events.push({type:'lost'})}}function addScore(n,x,y){score+=n;events.push({type:'score',n,x,y})}
// BEGIN whole upstream game
title = "RIBBON RUSH";
description = `
[Tap] Shoot
`;
characters = [];
options = {
  isPlayingBgm: true,
  isReplayEnabled: true,
  isDrawingScoreFront: true,
  seed: 9,
};
/** @type {{x: number, y: number, vx: number, bars: {width: number, color: Color}[]}[]} */
let lanes;
let laneY;
let shotY;
let hitColor;
let laneCount;
let baseMultiplier;
let multiplier;
let penalty;
const colors = ["red", "green", "blue", "yellow"];
const laneHeight = 9;
function update() {
  if (!ticks) {
    lanes = [];
    shotY = undefined;
    hitColor = undefined;
    laneCount = 4;
    times(laneCount, () => addLane());
    baseMultiplier = 0;
    multiplier = 1;
    penalty = 1;
  }
  let sy = 97;
  if (shotY != null) {
    shotY -= sqrt(difficulty) * 3;
    sy = shotY;
  } else {
    hitColor = undefined;
    if (input.isJustPressed) {
      play("laser");
      multiplier = 1; shots++; events.push({type:'shot'});
      shotY = sy;
      laneY += 2 * penalty * sqrt(sqrt(difficulty));
    }
  }
  color(hitColor == null ? "black" : hitColor);
  rect(49, sy, 3, 99 - sy);
  const my = laneHeight * laneCount;
  laneY += sqrt(difficulty) * 0.012;
  if (laneY < my) {
    laneY += (my - laneY) * 0.2;
  }
  let ly = laneY;
  remove(lanes, (l) => {
    l.x = wrap(l.x + l.vx, 0, 99);
    l.y += (ly - l.y) * 0.2;
    let x = l.x;
    let isRemoved = false;
    let isShotRemoved = false;
    l.bars.forEach((b) => {
      color(b.color);
      let c;
      if (x + b.width < 99) {
        c = rect(x, l.y, b.width - 1, -laneHeight + 1).isColliding.rect;
      } else {
        c = rect(x, l.y, 99 - x, -laneHeight + 1).isColliding.rect;
        c = {
          ...c,
          ...rect(0, l.y, b.width - (99 - x) - 1, -laneHeight + 1).isColliding
            .rect,
        };
      }
      if (c.black) {
        hitColor = b.color;
        isRemoved = true;
      } else if (hitColor != null) {
        if (c[b.color]) {
          isRemoved = true;
        } else if (c.red || c.green || c.blue || c.yellow) {
          isShotRemoved = true;
        }
      }
      x = wrap(x + b.width, 0, 99);
    });
    ly -= laneHeight;
    if (isShotRemoved) {
      play("hit"); misses++; events.push({type:"miss"});
      shotY = undefined;
      penalty = clamp(penalty * (3 / multiplier), 1, 4);
    } else if (isRemoved) {
      play("coin");
      addScore(multiplier * pow(2, baseMultiplier), 50, l.y); events.push({type:"cut",x:50,y:l.y,color:hitColor,bars:JSON.parse(JSON.stringify(l.bars)),start:l.x,chain:Math.round(Math.log2(multiplier))+1}); maxChain=Math.max(maxChain,Math.round(Math.log2(multiplier))+1); cleared++;
      laneY -= multiplier;
      multiplier *= 2;
      return true;
    }
  });
  if (lanes.length === 0) {
    play("powerUp"); batches++; events.push({type:"batch",batches});
    shotY = undefined;
    laneCount++;
    if (laneCount > clamp(5 + baseMultiplier, 1, 9)) {
      baseMultiplier = clamp(baseMultiplier + 1, 1, 9);
      laneCount = 4;
    }
  }
  if (shotY == null) {
    times(laneCount - lanes.length, () => addLane());
    if (shotY == null && lanes[0].y > 97) {
      play("explosion");
      end();
    }
  }
  function addLane() {
    play("select");
    const x = rnd(99);
    const vx = rnds(0.5, 1) * sqrt(difficulty);
    if (lanes.length === 0) {
      laneY = 0;
      lanes.push({ x, y: 0, vx, bars: addBars() });
    } else {
      lanes.push({
        x,
        y: -lanes.length * laneHeight,
        vx,
        bars: addBars(lanes[lanes.length - 1].bars),
      });
    }
  }
  function addBars(prevBars) {
    let cs =
      prevBars != null
        ? prevBars.map((b) => b.color)
        : [colors[rndi(colors.length)]];
    if (cs.length === 1 || (cs.length < 4 && rnd() < 0.5)) {
      cs.push(colors[rndi(colors.length)]);
    } else {
      cs.splice(rndi(colors.length), 1);
    }
    let lx = 99;
    let x = rnd(99);
    const cc = cs.length;
    return cs.map((c, i) => {
      const width = i === cc - 1 ? lx : (99 / cc) * rnd(0.8, 1.2);
      lx -= width;
      x = wrap(x + width, 0, 99);
      return { x, width, color: c };
    });
  }
}
// END whole upstream game
function view(){return{order,endless,ticks,state,score,shots,misses,cleared,batches,maxChain,goal:def.sets,def,lanes:JSON.parse(JSON.stringify(lanes)),laneY,shotY,hitColor,laneCount,baseMultiplier,multiplier,penalty}}
function step(tap=false){if(state!=='play')return view();input.isJustPressed=!!tap;draws=[];currentColor='black';update();ticks++;difficulty=1+order*.035+(endless?Math.min(ticks/10800,1):0);if(!endless&&batches>=def.sets&&state==='play'){state='won';events.push({type:'won'})}return view()}
update();ticks=1;events=[];
function snap(){return JSON.parse(JSON.stringify({version:1,order,endless,seed,ticks,state,score,shots,misses,cleared,batches,maxChain,lanes,laneY,shotY:shotY??null,hitColor:hitColor??null,laneCount,baseMultiplier,multiplier,penalty}))}
function restore(s){if(!s||s.version!==1||s.order!==order||s.endless!==endless||!['play','won','lost'].includes(s.state)||!Array.isArray(s.lanes)||s.lanes.length>10)return false;for(let k of ['seed','ticks','score','shots','misses','cleared','batches','maxChain','laneY','laneCount','baseMultiplier','multiplier','penalty'])if(!Number.isFinite(s[k])||(k!=="laneY"&&s[k]<0)||Math.abs(s[k])>4294967295)return false;if(!Number.isInteger(s.seed)||s.ticks<1||s.penalty<1||s.penalty>4||s.laneCount<2||s.laneCount>10||s.baseMultiplier>9||s.multiplier<1||s.multiplier>1024)return false;if(s.shotY!==null&&(!Number.isFinite(s.shotY)||s.shotY< -20||s.shotY>140))return false;if(s.hitColor!==null&&!colors.includes(s.hitColor))return false;for(let l of s.lanes){if(!Number.isFinite(l.x)||l.x<0||l.x>=99||!Number.isFinite(l.y)||Math.abs(l.y)>4096||!Number.isFinite(l.vx)||Math.abs(l.vx)>3||!Array.isArray(l.bars)||l.bars.length<1||l.bars.length>4)return false;let sum=0;for(let b of l.bars){if(!colors.includes(b.color)||!Number.isFinite(b.width)||b.width<=0||b.width>99)return false;sum+=b.width}if(Math.abs(sum-99)>.001)return false}if(s.state==='won'&&s.batches<def.sets)return false;seed=s.seed;ticks=s.ticks;state=s.state;score=s.score;shots=s.shots;misses=s.misses;cleared=s.cleared;batches=s.batches;maxChain=s.maxChain;lanes=JSON.parse(JSON.stringify(s.lanes));laneY=s.laneY;shotY=s.shotY??undefined;hitColor=s.hitColor??undefined;laneCount=s.laneCount;baseMultiplier=s.baseMultiplier;multiplier=s.multiplier;penalty=s.penalty;difficulty=1+order*.035+(endless?Math.min(ticks/10800,1):0);events=[];return true}
if(snapshot)restore(snapshot);return{step,view,snapshot:snap,events,def};}
root.createRibbon=createRibbon;root.RibbonOrders=orders;if(typeof module!=='undefined')module.exports={createRibbon,orders};
})(typeof window==='undefined'?globalThis:window);
