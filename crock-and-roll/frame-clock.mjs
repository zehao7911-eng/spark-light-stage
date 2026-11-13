// Presentation time never shares the simulation clock flushed by pointer input.
export class FrameClock{
 constructor(now=0){this.last=now;this.acc=0;}
 reset(now){this.last=now;this.acc=0;}
 sample(now,fps=30,paused=false){let dt=Math.min(.12,Math.max(0,(now-this.last)/1000));this.last=now;if(paused){this.acc=0;return{dt,draw:0};}this.acc+=dt;let step=1/fps;if(this.acc+1e-6<step)return{dt,draw:0};let draw=Math.min(.12,this.acc);this.acc=Math.max(0,this.acc-Math.floor((this.acc+1e-6)/step)*step);return{dt,draw};}
}
