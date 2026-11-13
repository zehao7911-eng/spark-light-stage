export const REGIONS=[{name:'Canopy Gardens',key:'forest',copy:'Warm lanterns above the morning mist.'},{name:'Amethyst Hollows',key:'cave',copy:'Quiet crystals. Hidden currents.'},{name:'The Moon Conservatory',key:'moon',copy:'One last light among the stars.'}];
// Each route is authored; world coordinates are shared with collision and rendering.
const P=(x,y,w=76,move=0)=>({x,y,w,move});const R=(x,y,w,h,type='reef')=>({x,y,w,h,type});
const specs=[
 ['A Soft Hello',[P(80,470),P(265,360),P(100,205)],[],[],[[170,360],[230,260],[130,180]]],
 ['The Long Way Home',[P(275,470),P(83,350),P(270,205),P(150,95)],[],[],[[190,365],[150,245],[220,125]]],
 ['Around the Old Oak',[P(75,470),P(270,350),P(80,175)],[R(158,280,38,75)],[],[[170,408],[240,243],[115,140]]],
 ['A Breath of Spring',[P(72,470),P(270,280),P(95,110)],[],[{x:155,y:395,w:52}],[[135,350],[245,240],[110,80]]],
 ['The Crystal Door',[P(70,470),P(280,355,66),P(87,190,66)],[R(165,280,35,80,'crystal')],[],[[142,416],[253,275],[100,150]]],
 ['Between Heartbeats',[P(280,470),P(78,320,66),P(275,145,66)],[R(166,175,24,160,'gate')],[],[[250,385],[95,250],[280,105]]],
 ['A Crosswind Waltz',[P(75,470),P(265,350,66),P(85,190,66)],[R(166,280,30,60,'crystal')],[],[[150,409],[240,260],[100,150]]],
 ['The Wandering Pier',[P(80,470),P(266,335,70,16),P(95,160,70,13)],[],[{x:165,y:370,w:40}],[[135,380],[230,265],[110,120]]],
 ['Under the Little Moon',[P(75,470),P(280,350),P(85,210),P(190,95)],[],[],[[165,380],[215,260],[170,125]]],
 ['The Clockwork Window',[P(275,470),P(85,325,64),P(275,165,64)],[R(168,180,22,150,'gate')],[],[[250,390],[100,255],[270,125]]],
 ['Moonflower Drift',[P(70,470),P(270,355,66,13),P(87,185,66)],[R(165,285,25,65,'crystal')],[{x:210,y:420,w:40}],[[147,405],[245,265],[100,148]]],
 ['Every Lantern Home',[P(75,470),P(275,365,66),P(80,235,66,12),P(190,100,68)],[R(167,270,25,55,'gate')],[{x:195,y:420,w:43}],[[160,405],[240,290],[150,150]]]
];
export const LEVELS=specs.map(([name,pads,rocks,vents,seeds],i)=>({name,region:Math.floor(i/4),pads:pads.map((p,id)=>({...p,id})),rocks,vents,seeds:seeds.map(([x,y],id)=>({x,y,id})),wind:[6,9,11].includes(i),par:70+i*4,description:i===0?'Drag to fly. Let go just above the golden dock.':i===3?'Rising air helps you climb. Hover is now ready.':i===5?'The violet shutter opens and closes. Fly around or wait.':i===7?'Some docks drift gently. A shield joins your toolkit.':i===11?'Bring the final lights home.':'Land at each golden beacon in order. Collect the three lightseeds.'}));

