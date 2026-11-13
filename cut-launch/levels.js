const ship=(x,y,kind=0,r=.77,moving=false)=>({x,y,kind,r,moving});
export const MISSIONS=[
 {name:'First Contact',scene:0,layers:1,goals:[ship(0,0,0,.64)],chips:[[-.6,0],[0,0],[.6,0]],note:'Swipe across the glowing ship.'},
 {name:'Double Exposure',scene:0,layers:1,goals:[ship(-1.85,.8,1),ship(1.85,-.7,1)],chips:[[-1.9,.8],[0,2.6],[1.9,-.7]],note:'Two drones. Make two openings.'},
 {name:'Passing Through',scene:0,layers:1,goals:[ship(0,.2,2,.85,true)],chips:[[-2.3,1.8],[0,-1.9],[2.3,1.8]],note:'The courier moves. Its opening stays.'},
 {name:'Power the Bay',scene:1,layers:1,power:1,goals:[ship(0,2.1,4,.58),ship(0,-1.3,0,.9)],chips:[[-1.2,2],[0,-1.3],[1.2,2]],note:'Free the yellow core to power the launch.'},
 {name:'Winch Dance',scene:1,layers:1,winch:true,goals:[ship(-1.7,1.2,2),ship(1.7,-1.2,3)],chips:[[-1.7,1.2],[0,0],[1.7,-1.2]],note:'The winches pull. Open a path for each ship.'},
 {name:'Drone Parade',scene:1,layers:1,goals:[ship(-2,1.6,1,.65),ship(2,1.6,1,.65),ship(0,-1.5,1,.8)],chips:[[-2,1.6],[2,1.6],[0,-1.5]],note:'Three pilots are waiting for a way out.'},
 {name:'Double Weave',scene:2,layers:2,goals:[ship(0,0,3,.95)],chips:[[-1.2,0],[0,0],[1.2,0]],note:'Two glowing layers. Tear once, then again.'},
 {name:'Cold Start',scene:2,layers:1,power:2,goals:[ship(-1.9,1.9,4,.55),ship(1.9,1.9,4,.55),ship(0,-1.3,2,1)],chips:[[-1.9,1.9],[1.9,1.9],[0,-1.3]],note:'Two cores wake the sleeping hangar.'},
 {name:'All Systems Go',scene:2,layers:2,goals:[ship(-1.8,1,0,.78),ship(1.8,1,1,.78),ship(0,-1.65,2,.85)],chips:[[-1.8,1],[1.8,1],[0,-1.65]],note:'One last curtain. Bring every pilot home.'}
];
export const NX=23,NY=27,WIDTH=7.8,HEIGHT=8.8,DX=WIDTH/(NX-1),DY=HEIGHT/(NY-1);
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function goalPosition(d,t){return{x:d.x+(d.moving?Math.sin(t*.8)*1.45:0),y:d.y+(d.moving?Math.sin(t*.6)*.5:0)};}
