'use strict';
const TOYS=[
['log','Sleepy Log',2,5,'#b97744'],['bear','Patch Bear',4,8,'#bc8a50'],['corn','Popcorn',3,7,'#e4b752'],['balloon','Balloon',3,6,'#e87a73'],['clock','Alarm Clock',5,10,'#7fb3b4'],['book','Story Book',4,8,'#859f74'],['fish','Tin Fish',5,11,'#6babc0'],['flower','Daisy Pot',4,9,'#a988af'],
['battery','Battery',7,15,'#9db863'],['robot','Little Robot',9,19,'#7f9eaa'],['rocket','Rocket',8,18,'#cf715a'],['globe','Snow Globe',7,16,'#93c4ce'],['camera','Camera',8,17,'#716b86'],['radio','Radio',9,20,'#bf8b65'],['duck','Rubber Duck',6,13,'#e6ba54'],['tea','Tea Cup',6,14,'#e9d2ae'],
['planet','Tiny Planet',14,30,'#7899cd'],['crystal','Moon Crystal',12,27,'#a7b0e2'],['cactus','Cactus',10,23,'#72ad80'],['train','Toy Train',12,26,'#c25d56'],['cake','Birthday Cake',11,24,'#daa3b0'],['ghost','Shy Ghost',13,29,'#dddac9'],['star','Wish Star',14,31,'#eac076'],['music','Music Box',12,28,'#ae846b']
].map((a,i)=>({id:a[0],name:a[1],cost:a[2],value:a[3],color:a[4],page:Math.floor(i/8),r:['log','book','radio','train'].includes(a[0])?34:29}));
const COMBOS=[['Bedtime','bear','book'],['Breakfast','corn','tea'],['Wake up!','clock','radio'],['Gone fishing','fish','duck'],['Garden party','flower','balloon'],['Robot power','robot','battery'],['Winter launch','rocket','globe'],['Say cheese','camera','cake'],['Space wish','planet','star'],['Haunted melody','ghost','music'],['Desert moon','cactus','crystal'],['Midnight express','train','clock']];
const ART={},SVG={};
function toySVG(t){const c=t.color;let b='';const R=(x,y,w,h,r=5,fill=c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`,E=(x,y,rx,ry,fill=c)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}"/>`,P=(d,fill=c)=>`<path d="${d}" fill="${fill}"/>`,eyes=(x=38,y=46)=>E(x,y,2.3,3,'#30252c')+E(x+22,y,2.3,3,'#30252c')+`<path d="M${x+7} ${y+8}q4 5 8 0" fill="none" stroke="#513733" stroke-width="2"/>`;
switch(t.id){
case 'log':b=R(12,31,69,40,12)+E(79,51,13,20,'#e1b47c')+E(79,51,7,13,'#bd8958')+P('M22 38l39-2M19 58l35 4','none')+eyes(27,46);break;
case 'bear':b=E(28,26,12,13)+E(71,26,12,13)+E(50,61,26,29)+E(20,62,10,17)+E(80,62,10,17)+E(34,84,12,9)+E(66,84,12,9)+E(50,39,27,24)+E(50,52,13,9,'#e5c18f')+eyes(38,37)+R(42,65,15,15,2,'#927894')+P('M43 67l12 11M55 67l-12 11','none');break;
case 'corn':b=P('M25 39h50l-6 45H32Z','#c05d50')+R(25,32,50,13,4,'#f1d496')+[0,1,2,3,4,5].map(i=>E(29+i*8,27-(i%2)*7,10,10,'#fff0c2')).join('')+R(39,44,7,34,1,'#efd499')+R(57,44,6,34,1,'#efd499');break;
case 'balloon':b=E(50,35,27,31)+P('M48 64l-5 7h13l-4-7')+`<path d="M50 71q-15 9 0 18" fill="none"/>`+E(40,21,6,11,'#ffc5ae')+eyes(37,37);break;
case 'clock':b=E(27,17,14,8)+E(73,17,14,8)+P('M27 77l-6 11M73 77l6 11','none')+E(50,51,34,34)+E(50,51,27,27,'#f5e4b9')+P('M50 31v21l16 9','none')+E(50,51,3,3,'#503934');break;
case 'book':b=R(24,15,55,73,4,'#516d65')+R(20,12,53,70,4)+R(25,20,42,52,2,'#cad1a8')+P('M45 31l5 9 10 2-8 7 1 10-10-5-9 5 1-11-7-6 10-2Z','#e9b85a');break;
case 'fish':b=P('M23 50L8 29v42Z','#bfaf76')+E(55,50,34,22)+P('M40 30l15-14 10 17M42 71l15 12 9-16')+E(74,44,5,5,'#f5e6c6')+E(75,44,2,2,'#252636')+P('M41 38q-9 12 0 23','none');break;
case 'flower':b=P('M30 59h40l-8 29H38Z','#b7775c')+R(27,57,46,10,3,'#cc9671')+P('M50 58V30M50 49Q23 31 32 52Z','#66947a')+[0,1,2,3,4,5,6].map(i=>E(50+Math.cos(i*6.28/7)*12,26+Math.sin(i*6.28/7)*12,8,8,'#f3dcba')).join('')+E(50,26,8,8,'#dda748');break;
case 'battery':b=R(39,13,23,8,3,'#d0ccaf')+R(29,21,42,65,6)+R(29,21,42,22,5,'#4d6260')+P('M47 28h7M50 25v7M44 65h12','none')+eyes(38,49);break;
case 'robot':b=R(23,22,54,33,7)+R(30,56,40,25,4)+R(12,58,12,24,4)+R(76,58,12,24,4)+R(32,80,12,13,3)+R(57,80,12,13,3)+P('M50 22V11','none')+E(50,10,4,4,'#d98664')+R(30,29,40,19,3,'#364652')+E(40,37,4,4,'#edcf80')+E(61,37,4,4,'#edcf80')+R(39,61,22,9,2,'#c9ba96');break;
case 'rocket':b=P('M36 66L20 81l3-25 12-10M64 66l16 15-3-25-12-10','#729da9')+P('M35 68V34Q39 12 50 6Q61 12 65 34V68Z','#edcfaa')+P('M39 20L50 6l11 14')+E(50,39,10,11,'#567b91')+E(47,36,4,5,'#b1d9d5')+R(36,67,28,8,2);break;
case 'globe':b=E(50,41,31,33,'#a1c9ce')+E(40,29,12,17,'#d1e4d7')+P('M25 61q25-11 50 0v8H25Z','#f4e9cc')+P('M48 25l-15 30h12l-6 9h24l-6-9h11L52 25Z','#748d83')+R(18,69,64,15,5,'#ad7d64');break;
case 'camera':b=R(15,30,70,46,6)+R(25,22,18,12,3,'#b4ae9a')+R(65,35,12,7,2,'#e6c99c')+E(49,54,22,22,'#c6bb9e')+E(49,54,16,16,'#414f61')+E(44,49,6,7,'#8bacb7');break;
case 'radio':b=R(16,27,70,53,8)+P('M28 28L69 10','none')+R(23,35,43,12,2,'#e7cb8c')+R(23,53,35,20,4,'#55423d')+[0,1,2,3].map(i=>P(`M27 ${57+i*4}h26`,'none')).join('')+E(73,57,7,7,'#d9bd93');break;
case 'duck':b=E(49,64,31,23)+E(59,37,21,23)+P('M72 38l20 7-19 9','#dc8551')+P('M24 58L9 40l2 26Z')+E(42,63,16,10,'#ffe094')+E(64,31,3,4,'#302832');break;
case 'tea':b=E(49,81,36,6,'#b8a183')+E(77,50,15,19)+E(77,50,8,11,'#594139')+P('M21 36h51v20q0 23-25 23T21 56Z')+E(46,36,25,8,'#c9b08d')+E(46,36,20,5,'#74503d')+eyes(35,52);break;
case 'planet':b=E(50,49,28,28)+P('M27 33q18 1 30 11l-4 9 17 12M30 62l12-5 15 15','none')+`<ellipse cx="50" cy="49" rx="45" ry="12" transform="rotate(-24 50 49)" fill="none" stroke="#e2c29a" stroke-width="7"/>`;break;
case 'crystal':b=P('M49 9L74 33l-9 46-16 11-24-31 8-38Z')+P('M49 9l-4 42 20 28 9-46Z','#d6c9ec')+P('M33 21l12 30-20 8Z','#7e90be')+P('M45 51l4 39','none');break;
case 'cactus':b=R(39,17,23,51,11)+P('M43 42Q21 46 21 29M58 48q21 1 21-18','none')+P('M31 65h39l-6 25H37Z','#c78768')+eyes(40,32);break;
case 'train':b=R(10,51,78,24,4)+R(20,28,30,33,3)+R(26,33,16,17,2,'#b5ccc1')+R(54,43,29,19,4)+R(62,27,13,17,2,'#3e4b50')+R(58,24,21,6,2,'#d5b380')+[24,48,74].map(x=>E(x,77,10,10,'#473a40')+E(x,77,4,4,'#ccac7c')).join('');break;
case 'cake':b=E(50,79,36,8,'#cead81')+R(20,43,60,32,5)+P('M20 46q8 16 15 0q8 16 15 0q8 16 15 0q8 16 15 0v-8H20Z','#f2e0c0')+R(46,22,8,20,2,'#79a5ac')+P('M50 6q13 14 0 16q-9-3 0-16','#e79b57');break;
case 'ghost':b=P('M21 79V43Q21 12 50 12T79 43V79l-12-10-10 12-9-11-14 12Z')+E(40,43,6,10,'#554958')+E(62,43,6,10,'#554958')+E(51,60,4,6,'#927989');break;
case 'star':b=P('M50 8l13 27 29 4-22 21 5 30-25-15-27 15 6-30L7 39l29-4Z')+P('M50 8v52L23 90l6-30L7 39l29-4Z','#d39a56')+eyes(38,46);break;
case 'music':b=R(18,42,65,39,5)+P('M18 42l10-27h51l4 27Z','#c49b73')+R(25,46,51,6,1,'#e1bc84')+P('M49 43V25l14-3v14','none')+E(44,40,6,4,'#5e4d52')+E(58,35,6,4,'#5e4d52')+R(25,72,10,14,2)+R(67,72,10,14,2);break;
}return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><filter id="s"><feDropShadow dx="1" dy="3" stdDeviation="1" flood-color="#201720" flood-opacity=".35"/></filter></defs><g stroke="#4b3333" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#s)">${b}</g></svg>`}
for(const t of TOYS){SVG[t.id]='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(toySVG(t));const im=new Image();im.src=SVG[t.id];ART[t.id]=im;}
