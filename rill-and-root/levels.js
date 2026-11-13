const rock=(x,y,w,h)=>({x,y,w,h});
export const LEVELS=[
 {name:'A Little Drink',source:0,goal:0,rocks:[],seeds:[[0,3],[0,5.5],[0,7.5]],route:[[0,.8],[0,8.5]],note:'Swipe the soil. Water the flower.'},
 {name:'Around the Pebble',source:-2.6,goal:2.4,rocks:[rock(0,4.4,5.5,.55)],seeds:[[-2.9,2.7],[-3.4,5.6],[.6,8.2]],route:[[-2.6,.8],[-3.5,5.5],[2.4,8.5]],note:'Stone stays. Find a way around.'},
 {name:'A Winding Stream',source:2.6,goal:-2.5,rocks:[rock(0,3.1,5.4,.5),rock(-2.6,6.4,2,.5)],seeds:[[3.5,3.8],[.3,6.8],[-2,8.7]],route:[[2.6,.8],[3.5,4],[0,7],[-2.5,8.5]],note:'A little bend goes a long way.'},
 {name:'Stepping Stones',source:-2.7,goal:2.4,rocks:[rock(-1.7,3.5,4.4,.5),rock(1.5,6.7,4.3,.5)],seeds:[[-1.4,2],[1,4.8],[-1.3,7.5]],route:[[-2.7,.8],[1.3,2.7],[1.3,4.5],[-1.5,5.8],[-1.5,7.5],[2.4,8.5]],note:'Make a stream between the shelves.'},
 {name:'The Waterwheel',source:0,goal:0,rocks:[],wheel:{x:0,y:3},gate:{x:0,y:5,w:7.8,h:.3},seeds:[[0,1.8],[0,6.4],[0,8]],route:[[0,.8],[0,8.5]],note:'Water turns the wheel and opens the gate.'},
 {name:'Beyond the Sluice',source:-2.7,goal:2.5,rocks:[rock(0,5.8,5.0,.5)],wheel:{x:-2.7,y:3},gate:{x:0,y:4.7,w:7.8,h:.3},seeds:[[-2.7,1.8],[-3.5,6.4],[.4,8.3]],route:[[-2.7,.8],[-2.7,4],[-3.3,6.4],[2.5,8.5]],note:'Turn the wheel, then follow the stream.'},
 {name:'A Cup of Rain',source:-2.6,goal:2.2,rocks:[],cups:[{x:-2.6,y:3.1,dir:1}],seeds:[[-2.6,1.8],[-.5,5.8],[1.8,8.4]],route:[[-2.6,.8],[-2.6,3.2],[-1.5,3.5],[2.2,8.5]],note:'Fill the cup. Watch it tip and pour.'},
 {name:'Pour Me a River',source:2.6,goal:-2.4,rocks:[rock(1.1,5.9,4.3,.5)],cups:[{x:2.6,y:2.9,dir:-1}],seeds:[[2.6,1.7],[.1,5],[-2.5,7.5]],route:[[2.6,.8],[2.6,2.9],[1.6,3.4],[-2,6.8],[-2.4,8.5]],note:'A tipping cup gives the stream a new start.'},
 {name:'Moonlit Mill',source:2.6,goal:-2.4,rocks:[rock(-1,3.9,4.8,.45)],wheel:{x:2.5,y:2.5},gate:{x:0,y:6.5,w:7.8,h:.3},seeds:[[2.6,1.3],[3.3,4.7],[-1.2,8.6]],route:[[2.6,.8],[2.5,2.7],[3.3,4.8],[-2.4,8.5]],note:'The mill lights up when the water arrives.'},
 {name:'Two Little Teacups',source:-2.7,goal:-1.8,rocks:[],cups:[{x:-2.7,y:2.8,dir:1},{x:1.7,y:6.2,dir:-1}],seeds:[[-2.7,1.5],[-.2,4.8],[-.8,8]],route:[[-2.7,.8],[-2.7,2.8],[-1.6,3.2],[1.7,6.2],[.6,6.7],[-1.8,8.5]],note:'One cup starts the next little waterfall.'},
 {name:'The Lantern Sluice',source:-2.6,goal:2.5,rocks:[rock(-.8,6.4,4.8,.45)],wheel:{x:2.5,y:4.3},gate:{x:0,y:7.7,w:7.8,h:.3},cups:[{x:-2.6,y:2.4,dir:1}],seeds:[[-2.6,1.4],[1.8,4],[3.4,7]],route:[[-2.6,.8],[-2.6,2.4],[-1.5,2.8],[2.5,4.3],[3.4,7],[2.5,8.5]],note:'A cup, a wheel, and one very thirsty flower.'},
 {name:'The Secret Garden',source:2.7,goal:-2.4,rocks:[rock(0,5.3,5.5,.45)],wheel:{x:2.5,y:4.1},gate:{x:0,y:7.8,w:7.8,h:.3},cups:[{x:2.7,y:2.1,dir:-1}],seeds:[[2.7,1.2],[2.5,4.1],[3.5,6.6]],route:[[2.7,.8],[2.7,2.1],[1.6,2.5],[2.5,4.1],[3.5,5.9],[-2.4,8.5]],note:'Bring the last flower home.'}
];
export const W=8.4,H=10.4,COLS=84,ROWS=104,CELL=.1;
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
