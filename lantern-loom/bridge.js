/* Adapted from Descensus 2, Bar.ts / Bus.ts / p2/createWorld.ts.
 * Copyright (c) 2017 Tom W Hall. MIT; see DESCENSUS-LICENSE.txt.
 * Changes: browser/CommonJS module, screen coordinates, static finalized bridges,
 * explicit capped length, cancellation, and no Pixi dependency. */
(function(root,factory){if(typeof module==='object')module.exports=factory(require('./p2.min.js'));else root.LoomBridge=factory(root.p2);})(typeof globalThis!=='undefined'?globalThis:this,function(p2){
 'use strict';
 function geometry(a,b,maxLength=160){
  let xDiff=b.x-a.x,yDiff=b.y-a.y;
  const length=Math.hypot(xDiff,yDiff);
  if(length>maxLength){xDiff*=maxLength/length;yDiff*=maxLength/length;}
  const x2=a.x+xDiff,y2=a.y+yDiff;
  return {x:(a.x+x2)/2,y:(a.y+y2)/2,angle:Math.atan2(yDiff,xDiff),width:Math.max(0.25,Math.hypot(xDiff,yDiff)),a:{...a},b:{x:x2,y:y2}};
 }
 function createWorld(){
  const world=new p2.World({gravity:[0,150]});
  world.solver=new p2.GSSolver({tolerance:0.01,iterations:10});
  world.sleepMode=p2.World.NO_SLEEPING;
  const wood=new p2.Material(),ball=new p2.Material();
  world.addContactMaterial(new p2.ContactMaterial(wood,ball,{restitution:0.08,friction:0.01,stiffness:1e8}));
  world.defaultContactMaterial.friction=0.01;
  return {world,wood,ball};
 }
 function makeBridge(ctx,a,b,maxLength){
  const g=geometry(a,b,maxLength);
  const body=new p2.Body({mass:0,position:[g.x,g.y],angle:g.angle});
  const box=new p2.Box({width:g.width,height:3});box.material=ctx.wood;body.addShape(box);
  ctx.world.addBody(body);return {...g,body};
 }
 function bus(){
  const topics={};
  function subscribe(topic,subscriber){if(!topics[topic])topics[topic]=[];if(topics[topic].indexOf(subscriber)===-1)topics[topic].push(subscriber);}
  function unsubscribe(topic,subscriber){if(!topics[topic])return;const index=topics[topic].indexOf(subscriber);if(index!==-1)topics[topic].splice(index,1);}
  function publish(topic,data){const subscribers=topics[topic];if(subscribers)for(let i=0;i<subscribers.length;i++)subscribers[i](data);}
  return {subscribe,unsubscribe,publish};
 }
 return {geometry,createWorld,makeBridge,bus};
});
