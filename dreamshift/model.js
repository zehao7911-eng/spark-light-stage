(()=>{'use strict';const cameras=[[0,3.4,12],[0,3.4,7],[-6,3.4,7]];const H={die:1,pawn:1.6,apple:1};function sizeAt(a,c,x,z,h){let s=1;for(let i=0;i<25;i++)s=a*Math.hypot(x-c[0],z-c[2],s*h/2-c[1]);return Math.max(.22,Math.min(5.5,s))}function angular(o,c){return o.size/Math.hypot(o.x-c[0],o.z-c[2],o.size*H[o.kind]/2-c[1])}const data=[
['A small assumption','Make the little die fill the larger outline.','#b57a5f',[[ 'die',.7,0,0,1,1,0,-9]]],
['Less is more','The distant pawn is much too large.','#6f9695',[[ 'pawn',2.1,0,-10,1,1,0,0]]],
['A different angle','One position changes everything.','#aa8b51',[[ 'apple',1.05,-2,0,2,2,2,-10]]],
['Opposite thoughts','A large die. A small pawn.','#78817a',[[ 'die',.68,-2,0,1,1,-2,-9],['pawn',1.8,2,-10,1,1,2,0]]],
['A moment between','Pick it up far away. Carry it closer.','#90758a',[[ 'apple',1.15,-2,-6,0,1,-2,-10],['die',.8,2,0,2,2,2,-9]]],
['Objects in a mirror','Match shapes, not just their colours.','#a37b54',[[ 'pawn',.78,-2,0,2,2,-2,-9],['apple',2,2,-10,1,1,2,0]]],
['The size of a thought','Three objects. Three perspectives.','#628988',[[ 'die',.64,-2,0,1,1,-2,-9],['pawn',1.7,2,-10,1,1,2,0],['apple',1.05,0,-3,0,2,0,-10]]],
['Wake gently','Everything is only a point of view.','#b07763',[[ 'die',1.65,-2,-10,1,1,-2,0],['apple',.9,2,0,2,2,2,-10],['pawn',1.05,0,-4,0,1,0,-8]]]
];const levels=data.map((d,i)=>({title:d[0],note:d[1],color:d[2],objects:d[3].map((r,j)=>({id:j,kind:r[0],size:r[1],x:r[2],z:r[3]})),goals:d[3].map((r,j)=>({id:j,kind:r[0],x:r[6],z:r[7],size:sizeAt(angular({kind:r[0],size:r[1],x:r[2],z:r[3]},cameras[r[4]]),cameras[r[5]],r[6],r[7],H[r[0]])})),solution:d[3].map((r,j)=>({object:j,grab:r[4],drop:r[5],goal:j}))}));window.DreamModel={cameras,H,sizeAt,angular,levels};})();
