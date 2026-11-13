'use strict';
const PAL=[{name:'THE CROOKED TOWER',sky:'#947294',far:'#76557c',back:'#66335e',wall:'#48223f',floor:'#230926',top:'#d8a267',accent:'#ffd66b',tile:'#925767'},{name:'THE CRUMBLING CELLAR',sky:'#a2653c',far:'#88502e',back:'#71421f',wall:'#4a301e',floor:'#171017',top:'#d5a767',accent:'#ffe291',tile:'#8e5828'},{name:'THE PINK FREEZER',sky:'#7f92a7',far:'#607383',back:'#50616f',wall:'#313e56',floor:'#212339',top:'#98cad4',accent:'#ffd670',tile:'#b187a6'}];
const SPR={};
function makeSprite(name,frame=0){const c=document.createElement('canvas');c.width=64;c.height=80;const g=c.getContext('2d'),D='#211922',white='#fff5dc',skin='#f4b280',shade='#c57248';g.lineJoin='round';g.lineCap='round';const shape=(pts,col,line=1.2)=>{g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fillStyle=col;g.fill();if(line){g.strokeStyle=D;g.lineWidth=line;g.stroke();}},ellipse=(x,y,rx,ry,col,line=1.2)=>{g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fillStyle=col;g.fill();if(line){g.lineWidth=line;g.strokeStyle=D;g.stroke();}},line=(pts,col=D,width=1.2)=>{g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.strokeStyle=col;g.lineWidth=width;g.stroke();};const f=frame%8,s=Math.sin(f*Math.PI/4);
if(name.startsWith('chef')){
const dash=name==='chef-dash',run=name==='chef-run',air=name==='chef-jump',hurt=name==='chef-hurt';g.translate(0,run?Math.abs(s)*-2:0);
if(dash){
shape([[8,64],[5,74],[18,76],[28,72],[32,67],[22,64]],D);shape([[32,61],[41,63],[52,71],[58,73],[56,77],[43,76],[28,68]],D);
shape([[16,39],[5,44],[2,54],[7,62],[17,65],[28,60],[33,52]],D);shape([[18,39],[14,43],[16,55],[25,61],[38,60],[40,48],[31,41]],white);
shape([[24,45],[10,38],[5,39],[3,43],[6,48],[15,53]],skin);line([[6,41],[8,45],[11,45]]);shape([[40,48],[51,42],[60,42],[63,47],[57,52],[49,51],[41,57]],skin);line([[58,43],[58,47],[61,47]]);
g.translate(5,9);g.rotate(-.12);
}else{
const a=run?s*8:air?-7:0,b=run?-s*8:air?6:0;
shape([[23,60],[22+a,70],[13+a,73],[12+a,77],[29+a,77],[34,66]],D);shape([[38,62],[42+b,70],[42+b,75],[54+b,76],[57+b,72],[48+b,68]],D);
shape([[19,38],[11,46],[12,59],[20,64],[43,64],[49,53],[45,40]],D);shape([[21,38],[16,45],[22,57],[43,60],[46,45],[37,40]],white);shape([[20,54],[24,63],[42,65],[47,57]],D);line([[25,44],[30,56],[40,57]],'#bfb4a3');
shape([[18,44],[13,51],[14,61],[19,64],[23,61],[21,54],[25,46]],skin);line([[16,58],[20,58],[21,60]]);
shape(air?[[44,43],[50,35],[54,23],[59,20],[62,24],[59,34],[57,45],[49,53]]:[[43,45],[50,49],[54,58],[50,62],[45,60],[44,54],[39,51]],skin);if(!air)line([[48,56],[52,57],[51,60]]);
}
// A nervous, long-nosed chef with thick black hair and a tiny moustache.
shape([[20,15],[14,25],[17,38],[23,44],[36,47],[48,44],[52,34],[47,23],[37,17]],skin);shape([[18,19],[14,22],[14,35],[19,39],[21,32],[22,23]],D);ellipse(19,34,4,6,skin);line([[18,32],[21,34],[18,36]]);
ellipse(31,27,dash?5:6,dash?8:10,white);ellipse(41,28,dash?6:7,dash?8:11,white);ellipse(33+(dash?2:0),27,1.4,4,D,0);ellipse(43,28,1.3,4,D,0);
shape([[40,31],[47,32],[55,36],[54,39],[45,40],[43,37]],skin);line([[47,34],[51,35]],shade);
shape([[36,39],[40,37],[44,40],[46,38],[48,42],[39,43]],D);if(dash||hurt||air){shape([[26,40],[34,43],[44,45],[41,51],[28,49],[23,44]],D);shape([[28,41],[39,44],[43,45],[39,47],[28,45]],white,.7);line([[33,43],[33,46],[37,44],[37,47]],D,.7);shape([[29,48],[35,48],[38,50],[30,50]],'#e4767b',.6);}else{line([[28,41],[27,45],[34,47],[40,46]]);}
shape([[22,10],[19,18],[24,21],[40,22],[47,18],[45,11]],white);shape([[20,12],[12,9],[12,4],[19,2],[25,4],[30,1],[40,2],[43,5],[50,4],[54,7],[52,12],[45,15],[31,14]],white);line([[23,6],[25,10],[40,8],[43,11]],'#b6b6b1',.8);
if(hurt){line([[26,23],[36,30],[36,22],[27,31]],D,1.5);line([[39,24],[47,30],[47,24],[39,31]],D,1.5);}if(dash||air){shape([[10,20],[7,26],[11,28],[13,25]],'#76d5ed',.7);shape([[53,16],[50,21],[54,24],[56,21]],'#76d5ed',.7);}
}else if(name==='tomato'){
shape([[13,68],[10,73],[21,74],[24,68]],D);shape([[41,66],[40,73],[54,74],[50,68]],D);ellipse(32,49,23,20,'#f25243');ellipse(24,40,8,4,'#ff8a6e',0);shape([[22,31],[27,23],[31,29],[38,22],[38,29],[47,28],[38,35],[26,34]],'#57952d');ellipse(30,47,6,8,white);ellipse(43,46,6,9,white);ellipse(32,48,2,4,D,0);ellipse(45,47,2,4,D,0);shape([[30,58],[44,56],[46,63],[34,65]],D);line([[34,59],[40,59]],white,2);line([[13,52],[5,55],[4,61]],D,3);line([[51,50],[59,54],[59,60]],D,3);
}else if(name==='cheese'||name==='helmet'){
let helmet=name==='helmet';shape([[15,66],[9,71],[12,75],[25,75],[29,68]],D);shape([[35,67],[37,75],[54,75],[56,71],[45,67]],D);shape([[12,33],[35,23],[50,32],[53,64],[39,69],[13,65]],'#ffc442');shape([[12,33],[32,43],[50,32],[35,23]],'#ffe387');ellipse(23,53,3,4,'#da8b37',0);ellipse(44,60,4,3,'#da8b37',0);ellipse(33,36,3,2,'#da8b37',0);ellipse(30,47,5,8,white);ellipse(41,46,5,8,white);ellipse(32,48,1.5,4,D,0);ellipse(43,47,1.5,4,D,0);line([[30,59],[34,62],[43,60]]);shape([[16,47],[8,50],[8,58],[12,61],[16,56]],'#ffc442');shape([[50,48],[59,46],[61,49],[58,56],[52,56]],'#ffc442');if(helmet){shape([[6,34],[10,21],[23,15],[43,16],[53,26],[53,34],[60,35],[60,39],[6,40]],'#a4afc0');shape([[19,19],[27,12],[35,12],[39,20],[38,32],[20,32]],'#ced6d7');line([[15,24],[13,33],[45,24],[49,31]],'#6b7a8e',2);}
}else if(name==='pizza'){shape([[12,32],[49,29],[32,66]],'#ffe787');shape([[12,32],[15,25],[26,22],[43,22],[50,27],[49,33],[36,31],[23,34]],'#ce8645');ellipse(29,42,4,4,'#cf4f46');ellipse(38,36,3,3,'#cf4f46');ellipse(29,54,2,2,'#cf4f46');
}else if(name==='coin'){ellipse(32,47,13,16,'#f2b647');ellipse(29,46,9,13,'#ffe18a');line([[28,37],[28,54],[32,51]],'#b2753c',2);
}else if(name==='heart'){shape([[32,66],[11,48],[10,39],[16,32],[25,32],[32,39],[38,31],[48,32],[54,39],[53,47]],'#f78399');line([[17,38],[22,37],[25,40]],'#ffd0bf',3);
}else if(name==='star'){shape([[32,22],[38,36],[54,38],[43,49],[46,66],[32,59],[17,66],[20,49],[9,38],[25,35]],'#ffd867');ellipse(28,45,1.5,4,D,0);ellipse(36,45,1.5,4,D,0);line([[28,54],[33,55],[37,52]]);
}
return c;}
for(const name of ['chef-idle','chef-run','chef-dash','chef-jump','chef-hurt','tomato','cheese','helmet','pizza','coin','heart','star'])SPR[name]=Array.from({length:name.startsWith('chef')?8:1},(_,i)=>makeSprite(name,i));
// Hand-drawn scene stamps, cached once rather than redrawn each frame.
const SCENE={};
function stamp(kind){const c=document.createElement('canvas');c.width=160;c.height=170;const g=c.getContext('2d');g.lineJoin='round';const p=(pts,col,stroke='#392239')=>{g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fillStyle=col;g.fill();g.strokeStyle=stroke;g.lineWidth=1;g.stroke();},l=(pts,col='#392239')=>{g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.strokeStyle=col;g.lineWidth=1;g.stroke();};
if(kind==='door'){p([[24,160],[21,33],[35,21],[111,22],[128,39],[125,160]],'#6d4758');p([[32,160],[33,42],[44,32],[103,33],[115,45],[114,160]],'#180d25');p([[16,22],[31,8],[115,11],[138,28],[127,38],[25,34]],'#dba46f');for(let x=33;x<117;x+=17)l([[x,24],[x-3,31]]);p([[30,66],[59,68],[61,82],[32,82]],'#985e46');p([[83,124],[120,116],[124,130],[89,138]],'#9b6149');g.fillStyle='#ffd979';g.font='bold italic 12px serif';g.fillText('EXIT',51,54);}
if(kind==='pillar'){p([[40,161],[39,21],[47,8],[112,10],[121,22],[119,161]],'#a19e8a');p([[40,162],[121,162],[124,149],[37,149]],'#77786b');p([[36,25],[121,27],[125,15],[39,12]],'#c8c7ae');for(let i=0;i<5;i++)l([[43,35+i*23],[62,33+i*23],[65,41+i*23],[83,40+i*23]],'#797b73');p([[53,62],[62,56],[76,59],[75,74],[59,76]],'#191d28');p([[89,61],[99,55],[111,59],[109,75],[91,76]],'#191d28');p([[80,76],[73,93],[90,94]],'#6b7267');p([[53,105],[107,103],[104,123],[59,124]],'#272333');g.fillStyle='#eee5c1';for(let x=60;x<104;x+=9)g.fillRect(x,106,6,10);}
if(kind==='statue'){p([[20,164],[140,164],[132,145],[27,145]],'#76687a');p([[54,145],[48,98],[40,92],[39,69],[48,51],[44,29],[55,17],[85,13],[105,27],[101,51],[118,77],[112,95],[100,97],[106,143]],'#a7829a');p([[54,48],[66,41],[86,44],[95,55],[87,68],[60,66]],'#735671');p([[51,37],[48,21],[57,11],[87,10],[105,23],[105,34],[91,35],[78,29]],'#b899ad');l([[57,84],[76,77],[98,84],[91,91],[64,91]]);l([[57,112],[90,107],[87,133]]);p([[56,50],[66,47],[66,57],[59,59]],'#251b2c');p([[79,48],[88,49],[88,58],[82,58]],'#251b2c');}
if(kind==='poster'){p([[13,12],[141,4],[147,142],[8,152]],'#dcb79a');p([[23,23],[130,17],[133,47],[20,49]],'#cc565a');g.fillStyle='#362039';g.font='bold italic 17px serif';g.fillText('PIZZA!',32,40);p([[36,66],[119,64],[70,131]],'#edc76e');p([[35,67],[41,58],[116,55],[123,64]],'#a45e40');for(let i=0;i<6;i++){g.beginPath();g.arc(55+(i%3)*21,76+Math.floor(i/3)*23,5,0,7);g.fillStyle='#c34f4c';g.fill();}l([[16,18],[19,31],[133,130],[134,142]]);}
if(kind==='pipes'){p([[25,0],[49,0],[51,105],[115,105],[114,0],[137,0],[138,140],[26,141]],'#656e8b');for(let y=12;y<104;y+=29){p([[20,y],[55,y-1],[55,y+9],[21,y+10]],'#8396a1');p([[108,y],[142,y],[143,y+9],[109,y+9]],'#8396a1');}l([[35,0],[36,126],[125,127],[125,0]],'#a4a9ae');}
return c;}
for(const n of ['door','pillar','statue','poster','pipes'])SCENE[n]=stamp(n);
