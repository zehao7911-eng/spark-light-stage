/* Complete PIN CLIMB game adaptation. Copyright (c) 2021 ABA Games, MIT.
 * Upstream preserved in upstream/pinclimb.js; see SOURCE.md for every gameplay change.
 * Compatibility runtime below supplies original vector, drawing-collision, RNG,
 * sound and scoring APIs. The complete game update is retained; library rendering, audio and replay options are replaced. */
(function(root){'use strict';
const chapters=[
 {name:'First little leap',goal:95,seed:740,zone:0,pattern:0},
 {name:'Across the fern',goal:145,seed:1251,zone:0,pattern:1},
 {name:'The hanging garden',goal:180,seed:932,zone:0,pattern:2},
 {name:'Moonflower ladder',goal:215,seed:451,zone:1,pattern:1},
 {name:'Wide awake',goal:250,seed:2957,zone:1,pattern:3},
 {name:'Orchid overpass',goal:285,seed:667,zone:1,pattern:2},
 {name:'A little more swing',goal:320,seed:1198,zone:2,pattern:3},
 {name:'Top of the glasshouse',goal:365,seed:2079,zone:2,pattern:4}
];
function createGecko(chapter=0,snapshot=null){chapter=Math.min(7,Math.max(0,chapter|0));let def=chapters[chapter],seed=def.seed,seq=0,nextId=1,ticks=0,difficulty=1+chapter*.025,input={isPressed:false,isJustPressed:false},height=0,score=0,state='play',captures=0,combo=0,bestCombo=0,lastCapture=-999,events=[],lineSegment=null,used=new Set(),starFlowers=0,longest=0,hearts=3,snapCooldown=0;let title,description,characters,options;
class V{constructor(x=0,y=0,id){if(typeof x==='object'){this.x=x.x;this.y=x.y;this.id=x.id}else{this.x=x;this.y=y;this.id=id??nextId++}}addWithAngle(a,l){this.x+=Math.cos(a)*l;this.y+=Math.sin(a)*l;return this}distanceTo(v){return Math.hypot(this.x-v.x,this.y-v.y)}}
const vec=(x,y)=>new V(x,y),ceil=Math.ceil;
function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}
function rnd(a,b){let v=a+random()*(b-a);if(a===10&&b===90){seq++;let lanes=def.pattern===0?[35,65]:def.pattern===1?[22,50,78,50]:def.pattern===2?[25,35,70,60]:def.pattern===3?[22,54,82,50]:[25,57,82,50,30];v=lanes[seq%lanes.length]+(random()-.5)*8}if(a===5&&b===15)v=11+random()*(def.pattern===3?9:6);return v}
function play(type){if(type==='powerUp'){captures++;let gap=ticks-lastCapture;combo=gap<240?combo+1:1;lastCapture=ticks;bestCombo=Math.max(bestCombo,combo);if(captures%4===0)starFlowers++;events.push({type:'grip',combo,captures,x:cord.pin.x,y:cord.pin.y})}if(type==='select')events.push({type:'stretch'})}
function addScore(n,p){longest=Math.max(longest,n);score+=n*Math.min(combo,5);events.push({type:'score',value:n,x:p.x,y:p.y});used.add(cord.pin.id)}
function end(){state='lost';events.push({type:'lost'})}
function line(a,b){lineSegment={a:{x:a.x,y:a.y},b:{x:b.x,y:b.y}}}
function box(p,size){let a=lineSegment.a,b=lineSegment.b,dx=b.x-a.x,dy=b.y-a.y,d=dx*dx+dy*dy,t=d?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/d)):0,hit=Math.hypot(p.x-a.x-dx*t,p.y-a.y-dy*t)<size/2+.65;if(p.danger){if(hit&&p.y<cord.pin.y-4&&snapCooldown<=0){hearts--;snapCooldown=.85;cord.length=cordLength;combo=0;events.push({type:"prick",x:p.x,y:p.y});if(hearts<=0)end()}hit=false}return{isColliding:{rect:{black:hit&&snapCooldown<=0}}}}
function remove(array,fn){for(let i=0;i<array.length;)if(fn(array[i]))array.splice(i,1);else i++}
function color(){}
// BEGIN entire upstream game, adapted in place
// Write the game name to 'title'.
title = "GECKO GLIDE";
// 'description' is displayed on the title screen.
description = `
[Hold] Stretch
`;
// User-defined characters can be written here.
characters = [];
// Configure game options.
options = {
  isPlayingBgm: true,
  isReplayEnabled: true,
  // If you want to play a different BGM or SE,
  // you can try changing the 'seed' value.
  seed: 400,
};
// (Optional) Defining the types of variables is useful for
// code completion and error detection.
/** @type {{angle: number, length: number, pin: Vector}} */
let cord;
/** @type {Vector[]} */
let pins;
let nextPinDist;
const cordLength = 7;
// 'update()' is called every frame (60 times per second).
function update() {
  // 'ticks' counts the number of frames from the start of the game.
  if (!ticks) {
    // Initialize the game state here. (ticks === 0)
    pins = [vec(50, 124),vec(42, 105),vec(65, 82),vec(36, 60),vec(64, 37),vec(44, 15)]; // 'vec()' creates a 2d vector instance.
    nextPinDist = 10;
    cord = { angle: -2, length: cordLength, pin: pins[0] };
  }
  // 'difficulty' represents the difficulty of the game.
  // The value of this variable is 1 at the beginning of the game and
  // increases by 1 every minute.
  let scr = difficulty * 0.02;
  if (cord.pin.y < 124) {
    scr += (124 - cord.pin.y) * 0.1;
  }
  // 'input.isJustPressed' is set to true the moment the button is pressed.
  if (input.isJustPressed) {
    // 'play()' plays the SE.
    play("select");
  }
  // 'input.isPressed' is set to true while the button is pressed.
  if (input.isPressed) {
    cord.length = Math.min(44, cord.length + difficulty * .65);
  } else {
    cord.length += (cordLength - cord.length) * 0.1;
  }
  cord.angle += difficulty * 0.036;
  // Draw a line connecting the coordinates of
  // the first argument and the second argument.
  line(cord.pin, vec(cord.pin).addWithAngle(cord.angle, cord.length));
  if (cord.pin.y > 146) {
    play("explosion");
    // Call 'end()' to end the game. (Game Over)
    end();
  }
  let nextPin;
  // 'remove()' passes the elements of the array of the first argument to
  // the function of the second argument in order and executes it.
  // If the function returns true, the element will be removed from the array.
  remove(pins, (p) => {
    p.y += scr;
    // Draw a box and check if it collides with other black rectangles or lines.
    if (box(p, 3).isColliding.rect.black && p !== cord.pin && p.y < cord.pin.y - 4) {
      nextPin = p;
    }
    return p.y > 152;
  });
  if (nextPin != null) {
    play("powerUp");
    // Add up the score.
    // By specifying the coordinates as the second argument,
    // the added score is displayed on the screen.
    addScore(ceil(cord.pin.distanceTo(nextPin)), nextPin);
    cord.pin = nextPin;
    cord.length = cordLength;
  }
  height += Math.max(0, scr - difficulty * 0.02);
  nextPinDist -= scr;
  while (nextPinDist < 0) {
    // 'rnd()' returns a random value.
    let bud = vec(rnd(10, 90), -2 - nextPinDist); pins.push(bud); if(chapter > 0 && seq % 5 === 0){let thorn=vec(bud.x<50?86:14,bud.y+6);thorn.danger=true;pins.push(thorn);}
    nextPinDist += rnd(5, 15);
  }
}
// END entire upstream game.
function view(){return{chapter,ticks,difficulty,height,score,state,captures,combo,bestCombo,starFlowers,longest,hearts,snapCooldown,cord:{angle:cord.angle,length:cord.length,pin:{x:cord.pin.x,y:cord.pin.y,id:cord.pin.id}},pins:pins.map(p=>({x:p.x,y:p.y,id:p.id,danger:!!p.danger,used:used.has(p.id)})),tip:{x:cord.pin.x+Math.cos(cord.angle)*cord.length,y:cord.pin.y+Math.sin(cord.angle)*cord.length},goal:def.goal,def}}
function step(held=false){if(state!=='play')return view();snapCooldown=Math.max(0,snapCooldown-1/60);let desired=!!held&&snapCooldown<=0;input.isJustPressed=desired&&!input.isPressed;input.isPressed=desired;update();ticks++;if(height>=def.goal&&state==='play'){state='won';events.push({type:'won'})}return view()}
// Initialize through upstream update(), then reset presentation-only input events.
update();ticks=1;events=[];
function snap(){return{version:1,chapter,seed,seq,nextId,ticks,height,score,state,captures,combo,bestCombo,lastCapture,starFlowers,longest,hearts,snapCooldown,used:[...used],pins:pins.map(p=>({x:p.x,y:p.y,id:p.id,danger:!!p.danger})),cord:{angle:cord.angle,length:cord.length,pinId:cord.pin.id},nextPinDist}}
function restore(s){if(!s||s.version!==1||s.chapter!==chapter||!['play','won','lost'].includes(s.state)||!Array.isArray(s.pins)||s.pins.length<1||s.pins.length>40)return false;for(let k of ['seed','seq','nextId','ticks','height','score','captures','combo','bestCombo','starFlowers','lastCapture','nextPinDist','longest','hearts','snapCooldown'])if(!Number.isFinite(s[k])||Math.abs(s[k])>4294967295)return false;if(s.seed<0||s.seed>4294967295||s.ticks<1||s.height<0||s.score<0||s.captures<0||!Number.isInteger(s.hearts)||s.hearts<0||s.hearts>3||s.snapCooldown<0||s.snapCooldown> .86)return false;let ids=new Set();for(let p of s.pins){if(!Number.isFinite(p.x)||!Number.isFinite(p.y)||p.x<0||p.x>100||p.y< -25||p.y>154||!Number.isInteger(p.id)||ids.has(p.id))return false;ids.add(p.id)}if(!s.cord||!ids.has(s.cord.pinId)||!Number.isFinite(s.cord.angle)||!Number.isFinite(s.cord.length)||s.cord.length<6.9||s.cord.length>44.01||!Array.isArray(s.used)||s.used.some(id=>!Number.isInteger(id)))return false;if(s.state==='won'&&s.height<def.goal)return false;seed=s.seed;seq=s.seq;nextId=s.nextId;ticks=s.ticks;height=s.height;score=s.score;state=s.state;captures=s.captures;combo=s.combo;bestCombo=s.bestCombo;lastCapture=s.lastCapture;starFlowers=s.starFlowers;longest=s.longest;hearts=s.hearts;snapCooldown=s.snapCooldown;used=new Set(s.used);pins=s.pins.map(p=>Object.assign(new V(p.x,p.y,p.id),{danger:!!p.danger}));cord={angle:s.cord.angle,length:s.cord.length,pin:pins.find(p=>p.id===s.cord.pinId)};nextPinDist=s.nextPinDist;input.isPressed=false;input.isJustPressed=false;events=[];return true}
if(snapshot)restore(snapshot);
return{step,view,snapshot:snap,events,def};
}
root.createGecko=createGecko;root.GeckoChapters=chapters;if(typeof module!=='undefined')module.exports={createGecko,chapters};
})(typeof window==='undefined'?globalThis:window);
