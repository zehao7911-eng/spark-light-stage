export const TYPES=['CASE','MAINBOARD','CPU','SSD','RAM','POWER SUPPLY','GRAPHICS CARD','MONITOR'];
export const QUALITY=['COMMON','UNCOMMON','RARE','EPIC','LEGENDARY'];
export const QCOLORS=['#d0e5ed','#69ee9d','#55c9ff','#cc83ff','#ffd45e'];
const series=['Office','Compact','Scout','Studio','Mint','Arctic','Pulse','Circuit','Turbo','Crystal','Volt','Glacier','Spectra','Phantom','Nova','Aurora','Solar','Titan','Prism','Quantum'];
export const PARTS=Array.from({length:160},(_,id)=>{const type=Math.floor(id/20),model=id%20,quality=Math.floor(model/4);return{id,type,model,quality,name:series[model]+' '+['Case','Board','CPU','SSD','RAM','PSU','GPU','Display'][type],color:QCOLORS[quality],fps:Math.round((2+type*.4)*Math.pow(1.22,model)),variant:model%4}});
// Each category has its own readable silhouette; model numbers, geometry and finish distinguish all 20 variants.
export function partIcon(type,color='#78d8ff',model=0){const stroke='stroke="#142b48" stroke-width="3" stroke-linejoin="round"';let body='';const rect=(x,y,w,h,fill,rx=2)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${stroke}/>`;const fan=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#193c59" ${stroke}/><path d="M${x-r+3} ${y}h${r*2-6}M${x} ${y-r+3}v${r*2-6}" stroke="${color}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="3" fill="#efffff"/>`;
if(type===0)body=rect(18,7,30,50,color)+rect(22,12,22,38,'#24455e')+fan(33,24,8)+fan(33,43,8);
if(type===1)body=rect(10,9,43,47,'#329578')+rect(20,17,20,18,'#c3dfda')+rect(44,15,4,31,color)+rect(16,41,23,4,color);
if(type===2)body='<path d="M13 8v48M21 8v48M29 8v48M37 8v48M45 8v48M8 15h48M8 23h48M8 31h48M8 39h48M8 47h48" stroke="#eec665" stroke-width="3"/>'+rect(14,14,36,36,color)+rect(22,22,20,20,'#dbe7ef');
if(type===3)body=rect(7,20,50,23,'#2e806d')+rect(13,24,13,15,'#17354c')+rect(31,24,13,15,'#17354c')+rect(50,23,5,17,'#ffd37a');
if(type===4)body=rect(6,19,52,24,color)+[0,1,2,3].map(i=>rect(10+i*12,23,8,12,'#18384e')).join('')+'<path d="M9 44h46" stroke="#f6ce73" stroke-width="5"/>';
if(type===5)body=rect(10,13,43,38,color)+fan(31,32,13)+'<path d="M49 45q14 8 4 13" fill="none" stroke="#303e56" stroke-width="4"/>';
if(type===6)body=rect(5,19,53,28,color)+fan(21,33,10)+fan(44,33,10)+rect(13,47,25,4,'#f5cf6c');
if(type===7)body=rect(4,10,56,36,'#203a55')+rect(8,14,48,27,color)+rect(29,47,7,8,'#8ea2b0')+rect(18,55,29,4,'#d8e8ee');
return `<svg viewBox="0 0 64 68" aria-hidden="true">${body}<text x="61" y="66" text-anchor="end" font-size="9" fill="#fff" stroke="#18324a" stroke-width="2" paint-order="stroke">${String(model+1).padStart(2,'0')}</text></svg>`}
export function makePart(T,item){const g=new T.Group(),v=item.variant,q=item.quality,c=new T.Color(item.color).getHex(),dark=0x183047,silver=0xc3d8df,green=0x247a67;const mats=new Map();const m=n=>{if(!mats.has(n))mats.set(n,new T.MeshStandardMaterial({color:n,roughness:.45,metalness:.25}));return mats.get(n)};const box=(w,h,d,col,x,y,z)=>{const o=new T.Mesh(new T.BoxGeometry(w,h,d),m(col));o.position.set(x,y,z);g.add(o);return o};const fan=(x,y,z,r)=>{const f=new T.Mesh(new T.TorusGeometry(r,.035,6,16),m(c));f.position.set(x,y,z);g.add(f);for(let j=0;j<5;j++){const o=box(r*1.5,.04,.04,silver,x,y,z);o.rotation.z=j*Math.PI/5}return f};
switch(item.type){
case 0:{const h=1.6+v*.16,w=1+v*.09;box(w,h,.85,dark,0,h/2,0);box(.07,h,.92,c,-w/2,h/2,0);box(.07,h,.92,c,w/2,h/2,0);box(w,.07,.92,c,0,h,0);box(w,.07,.92,c,0,0,0);for(let i=0;i<2+(v%2);i++)fan(0,.35+i*.48,-.46,.19);if(q>1)for(const x of [-w/2,w/2])box(.035,h*.9,.05,0xefffff,x,h/2,-.48);break}
case 1:box(1.4,.09,1.7,green,0,.06,0);box(.5,.07,.5,silver,-.15,.15,-.15);for(let i=0;i<2+v%3;i++)box(.07,.12,1,c,.45+i*.09,.17,-.1);for(let i=0;i<2;i++)box(.85,.07,.07,0xffd578,-.15,.16,.48+i*.16);for(let i=0;i<4+q;i++)box(.1,.13,.13,dark,-.55+i*.14,.16,-.65);box(.15,.3,1,silver,-.68,.2,0);break;
case 2:box(1,.09,1,green,0,.09,0);box(.84,.1,.84,silver,0,.19,0);box(.46,.025,.46,c,0,.25,0);for(let i=0;i<8+v;i++)for(const z of [-.52,.52])box(.045,.08,.12,0xe6b95a,-.44+i*.88/(7+v),.07,z);for(let i=0;i<q;i++)box(.07,.02,.35,dark,-.25+i*.12,.27,0);break;
case 3:box(1.8,.075,.57,green,0,.07,0);for(let i=0;i<2+v;i++)box(.25,.07,.39,dark,-.65+i*.3,.15,0);box(.15,.02,.48,0xffd776,.87,.12,0);if(q>1)box(1.5,.07,.52,c,-.1,.23,0);break;
case 4:box(1.8,.07,.56,green,0,.08,0);for(let i=0;i<4+v;i++)box(.17,.09,.28,dark,-.72+i*1.4/(3+v),.16,0);for(let i=0;i<18;i++)box(.055,.02,.12,0xffd77d,-.8+i*.09,.09,.31);if(q>0){box(1.82,.11,.08,c,0,.18,-.25);for(let i=0;i<2+v;i++)box(.2,.05,.45,c,-.6+i*.4,.2,0)}break;
case 5:box(1.1,1+v*.06,.85,c,0,.55,0);fan(0,.55,-.44,.36);for(let i=0;i<4+v;i++)box(.07,.1,.12,dark,-.35+i*.13,.85,-.45);for(let i=0;i<3;i++)box(.045,.045,.5,[0xe5c44b,0xca5656,0x333c49][i],.4+i*.07,.2,.6);break;
case 6:box(1.5+v*.15,.7,.38,dark,0,.4,0);box(1.55+v*.15,.07,.42,c,0,.78,0);for(let i=0;i<1+Math.min(2,v);i++)fan(-v*.21+i*.48,.41,-.22,.21);box(.65,.05,.07,0xffce73,0,.02,0);box(.07,.9,.43,silver,-.8-v*.075,.4,0);break;
case 7:{const w=1.8+v*.2;box(w,1.14,.13,dark,0,1.05,0);box(w-.13,.98,.025,c,0,1.06,-.08);for(let i=0;i<3+q;i++)box((w-.25)/(3+q),.03,.01,silver,-(w-.3)/2+i*(w-.25)/(3+q),.7+i*.08,-.1);box(.14,.5,.15,silver,0,.3,.02);box(.8,.08,.45,dark,0,.04,0);break;}}
// Engraved model strips make consecutive members identifiable even within the same quality.
for(let i=0;i<1+v;i++)box(.055,.035,.18,q>=3?0xffedaf:0xb3cce0,-.2+i*.12,.015,-.18);
g.userData.partId=item.id;return g;
}
