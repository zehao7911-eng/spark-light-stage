(function(r){'use strict';
// Image-generated art is decorative. Rules, hit boxes and progress remain in GarageCore.
const version=new URL(document.currentScript.src).search;
const atlas=new Image(),scenes=[new Image(),new Image(),new Image()];
const boxes=[{x:272,y:102,w:714,h:329},{x:313,y:505,w:630,h:309},{x:174,y:877,w:916,h:305}];
const sprites=new Map(),bodyHues=[40,164,208,276,8,105,29],bodySaturation=[.67,.3,.38,.25,.35,.22,.35];let settled=0,failed=0;
function load(img,name){img.decoding='async';img.onload=()=>{settled++;document.documentElement.dataset.imageArt=settled+'/4';window.dispatchEvent(new Event('garageartready'));};img.onerror=()=>{settled++;failed++;document.documentElement.dataset.imageArtErrors=String(failed);document.documentElement.dataset.imageArt=settled+'/4';};img.src='assets/'+name+'-v2.webp'+version;}
load(atlas,'vehicles');['maple','amber','moon'].forEach((n,i)=>load(scenes[i],n));
function scene(g,zone){const im=scenes[zone];if(!im.complete||!im.naturalWidth)return false;g.drawImage(im,0,0,im.naturalWidth,im.naturalHeight,0,0,288,84);return true;}
function hsl(red,green,blue){red/=255;green/=255;blue/=255;const hi=Math.max(red,green,blue),lo=Math.min(red,green,blue),d=hi-lo,l=(hi+lo)/2;let h=0;if(d){h=hi===red?((green-blue)/d+6)%6:hi===green?(blue-red)/d+2:(red-green)/d+4;h*=60;}return[h,d===0?0:d/(1-Math.abs(2*l-1)),l];}
function rgb(h,s,l){const c=(1-Math.abs(2*l-1))*s,z=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;const a=h<60?[c,z,0]:h<120?[z,c,0]:h<180?[0,c,z]:h<240?[0,z,c]:h<300?[z,0,c]:[c,0,z];return a.map(v=>Math.round((v+m)*255));}
function vehicle(g,c,b,id,paint,rolling,t,chosen,blocked){if(!atlas.complete||!atlas.naturalWidth)return false;const row=id===0?0:c.len===3?2:1,w=c.len*36-6,h=30,variant=id===0?paint:(id-1)%7,key=row+':'+variant;let spr=sprites.get(key);
if(!spr){spr=document.createElement('canvas');spr.width=w*2;spr.height=h*2;const a=spr.getContext('2d');a.imageSmoothingEnabled=false;const q=boxes[row];a.drawImage(atlas,q.x,q.y,q.w,q.h,0,0,spr.width,spr.height);
// Recolour only painted metal; preserve glass, luggage, tyres and cream highlights.
const pixels=a.getImageData(0,0,spr.width,spr.height),d=pixels.data;for(let k=0;k<d.length;k+=4){if(d[k+3]<32)continue;const [hu,sa,li]=hsl(d[k],d[k+1],d[k+2]);let body=row===0?(hu<22||hu>345)&&sa>.35:row===1?hu>18&&hu<66&&sa>.4:hu>190&&hu<222&&sa>.18;if(!body||li<.14||li>.88||row===0&&variant===0)continue;const hh=row===0?[8,164,276][variant]:bodyHues[variant],ss=row===0?.28:bodySaturation[variant],col=rgb(hh,Math.min(sa,ss),li);d[k]=col[0];d[k+1]=col[1];d[k+2]=col[2];}a.putImageData(pixels,0,0);sprites.set(key,spr);}
g.save();if(c.h)g.translate(Math.round(b.x),Math.round(b.y));else{g.translate(Math.round(b.x+30),Math.round(b.y));g.rotate(Math.PI/2);}g.fillStyle='#253a4270';g.fillRect(2,3,w,29);g.drawImage(spr,0,0,w,h);
if(rolling){g.fillStyle='#d1d2b5';const a=Math.floor(t*20)%4;for(const x of [Math.round(w*.14),Math.round(w*.8)]){g.fillRect(x+a,0,2,1);g.fillRect(x+a,29,2,1);}}
if(id>0){g.fillStyle='#173e48eb';g.fillRect(Math.round(w/2)-5,11,11,8);g.fillStyle='#fff0c8';g.font='bold 6px monospace';g.textBaseline='top';g.textAlign='left';g.fillText(String(id+1).padStart(2,'0'),Math.round(w/2)-4,12);}
if(chosen){g.fillStyle='#ffe4a7';g.fillRect(7,-1,w-14,1);g.fillRect(7,30,w-14,1);}if(blocked){g.fillStyle='#fff0b7';g.fillRect(blocked>0?w-3:0,7,3,16);}g.restore();return true;}
r.GarageImageArt={scene,vehicle};
})(globalThis);
