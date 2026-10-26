// OSGG C++ logic translated from main.cpp, Jimmy Christensen (C)2008, GPL-3.0-or-later.
// Original Y-up coordinates become canvas Y-down. Units tuned for a 360×520 field.
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function integrate(s,thrust,rotation=90,wind=0){
 const rad=rotation*Math.PI/180;
 s.vx+=thrust*Math.cos(rad);s.vy-=thrust*Math.sin(rad);
 s.vy+=.035;
 s.vx+=wind;s.vx*=.975;s.vy*=.996;
 s.vx=clamp(s.vx,-1.9,1.9);s.vy=clamp(s.vy,-2.2,2.3);
 s.x+=s.vx;s.y+=s.vy;
}
export function safeLanding(s,p,previousY,soft=0){
 // OSGG landCol: both feet inside deck, crossing deck height, speed and rotation safe.
 let within=s.x-9>=p.x-p.w/2&&s.x+9<=p.x+p.w/2;
 let crossed=previousY+14<=p.y+.8&&s.y+14>=p.y&&s.vy>=0;
 if(!within||!crossed)return null;
 return s.vy<=1.3+soft*.25&&Math.abs(s.vx)<=1.5&&Math.abs(s.rotationForce||0)<=1?'safe':'hard';
}
export function dock(s,p,fuelMax){
 // OSGG safe-base response: refill, upright, cancel velocities and rotation force.
 s.fuel=Math.min(fuelMax,s.fuel+15);s.rotation=90;s.rotationForce=0;s.vy=0;s.vx=0;s.y=p.y-14;
}
