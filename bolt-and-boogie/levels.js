const p=(x,y,w,a,colors,layer=0,h=52)=>({x,y,w,h,a,colors,layer});
export const COLORS=['#e96750','#43a99d','#e8b94f'];
export const COLOR_NAMES=['CORAL','JADE','GOLD'];
export const ACTS=[
 {name:'A Little Rattle',place:'THE VELVET CELLAR',room:0,boards:[p(200,155,220,-.12,[1,1]),p(200,255,220,.1,[0,0])],boxes:[1,0]},
 {name:'Cross Talk',place:'THE VELVET CELLAR',room:0,boards:[p(195,126,200,.13,[2,0]),p(204,222,230,-.15,[1,2]),p(195,311,190,.12,[0,1])],boxes:[0,1,2]},
 {name:'The Swing Set',place:'THE VELVET CELLAR',room:0,boards:[p(150,219,210,1.05,[1,0],0),p(250,218,210,-1.05,[2,1],1),p(200,220,240,0,[0,2],2)],boxes:[0,2,1]},
 {name:'A Fairground Face',place:'THE MOONLIGHT MIDWAY',room:1,boards:[p(200,105,220,-.06,[2,2]),p(135,217,190,1.3,[0,1],0),p(266,217,190,-1.3,[1,0],1),p(200,314,210,.06,[2,2],2)],boxes:[2,0,1,2]},
 {name:'Off the Hook',place:'THE MOONLIGHT MIDWAY',room:1,boards:[p(185,130,240,-.12,[0,1],0),p(225,223,220,.25,[2,0],1),p(170,310,220,-.18,[1,2],2),p(195,220,200,1.2,[0,0],3)],boxes:[0,1,2,0]},
 {name:'Roundabout',place:'THE MOONLIGHT MIDWAY',room:1,boards:[p(200,120,220,0,[1,2],0),p(200,300,220,0,[0,1],1),p(115,211,210,1.3,[2,0],2),p(285,211,210,-1.3,[1,1],3)],boxes:[1,0,2,1]},
 {name:'Dockside Duet',place:'THE SALTWATER SALOON',room:2,boards:[p(200,105,245,-.1,[0,2],0),p(110,221,185,1.3,[1,0],1),p(290,221,185,-1.3,[2,1],2),p(200,325,235,.08,[0,0],3),p(200,215,245,-.1,[1,1],4)],boxes:[1,0,2,1,0]},
 {name:'Double Trouble',place:'THE SALTWATER SALOON',room:2,boards:[p(160,110,170,.12,[1,2],0),p(240,195,170,-.12,[0,1],1),p(160,280,170,.12,[2,0],2),p(215,145,220,-.15,[2,1],3),p(185,235,220,.15,[0,2],4),p(225,325,210,-.15,[1,0],5)],boxes:[0,1,2,0,1,2]},
 {name:'The Grand Boogie',place:'THE SALTWATER SALOON',room:2,boards:[p(200,100,235,0,[0,1],0),p(110,212,185,1.27,[2,0],1),p(290,212,185,-1.27,[1,2],2),p(200,324,235,0,[0,1],3),p(195,185,230,.35,[2,0],4),p(205,255,230,-.35,[1,2],5)],boxes:[1,2,0,1,2,0]}
];
