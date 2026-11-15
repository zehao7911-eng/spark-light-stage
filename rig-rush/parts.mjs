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
export function makePart(T,item){
const g=new T.Group(),v=item.variant,q=item.quality,c=new T.Color(item.color).getHex(),dark=0x172b3c,metal=0xaec3cf,pcb=0x24614f,gold=0xd9ad53;const mats=new Map();const mat=n=>{if(!mats.has(n))mats.set(n,new T.MeshStandardMaterial({color:n,roughness:.44,metalness:.28}));return mats.get(n)};
function box(w,h,d,col,x=0,y=0,z=0){const o=new T.Mesh(new T.BoxGeometry(w,h,d),mat(col));o.position.set(x,y,z);g.add(o);return o}
function cyl(r,h,col,x,y,z,axis='y'){const o=new T.Mesh(new T.CylinderGeometry(r,r,h,20),mat(col));o.position.set(x,y,z);if(axis==='z')o.rotation.x=Math.PI/2;g.add(o);return o}
function fan(x,y,z,r){cyl(r,.055,dark,x,y,z,'z');const ring=new T.Mesh(new T.TorusGeometry(r,.035,5,20),mat(c));ring.position.set(x,y,z-.04);g.add(ring);for(let j=0;j<6;j++){const o=box(r*1.45,.045,.045,metal,x,y,z-.055);o.rotation.z=j*Math.PI/6}cyl(.07,.07,c,x,y,z-.07,'z')}
function pins(w,z,y=.06){for(let i=0;i<12;i++)box(w/18,.035,.12,gold,-w/2+(i+.5)*w/12,y,z)}
function fins(w,h,d,x,y,z,count){for(let i=0;i<count;i++)box(w/count*.4,h,d,metal,x-w/2+(i+.5)*w/count,y,z)}
function port(x,y,z){box(.16,.1,.05,metal,x,y,z);box(.1,.05,.06,dark,x,y,z-.03)}
switch(item.type){
case 0:{
const w=[1+v*.17,1.75+v*.18,1.4+v*.16,1.15+v*.18,1.3+v*.18][q],h=[1.6+v*.28,.85+v*.17,1.7+v*.16,1.7+v*.24,2+v*.18][q],d=[.9,1.2,1.15,.85,1][q]+v*.07;
// The removable shell is always first; frames remain when assembled.
const shell=box(w,h,d,dark,0,h/2,0);if(q>=3){shell.material=shell.material.clone();shell.material.transparent=true;shell.material.opacity=.13;shell.material.depthWrite=false;}for(const x of [-w/2,w/2])for(const z of [-d/2,d/2])box(.085,h,.085,c,x,h/2,z);for(const y of [0,h])box(w+.12,.09,d+.12,c,0,y,0);
if(q===0){for(let i=0;i<1+v;i++)fan(0,.3+i*(h-.6)/Math.max(1,v),-d/2-.055,Math.min(.25,w*.25));box(w*.8,.12,.08,metal,0,h-.14,-d/2-.06)}
if(q===1){for(let i=0;i<2+v;i++)fan(-w*.36+i*w*.72/(1+v),h*.48,-d/2-.05,.22);for(let i=0;i<3;i++)box(w*.7,.04,.05,metal,0,h-.15-i*.09,-d/2-.08)}
if(q===2){box(.07,h,d,metal,w*.15,h/2,0);box(w*.27,h*.8,.07,c,w*.33,h/2,-d/2-.06);for(let i=0;i<2+v%2;i++)fan(-w*.2,.4+i*.52,-d/2-.08,.22);box(w*.6,.1,d*.6,metal,-w*.1,h+.12,0)}
if(q===3){for(const side of [-1,1]){const brace=box(.08,h*1.1,.1,metal,side*w*.28,h/2,-d/2);brace.rotation.z=side*.28}for(let i=0;i<1+v;i++)fan(0,.35+i*.48,-d/2-.08,.21);box(w*.7,.08,.13,c,0,h+.2,0)}
if(q===4){for(let i=0;i<3+v;i++){box(w*1.08,.09,d*1.08,metal,0,.2+i*(h-.4)/(2+v),0)}fan(0,h*.55,-d/2-.1,w*.31);for(const side of [-1,1])box(.13,h*.9,.13,c,side*(w/2+.15),h*.5,0)}break}
case 1:{
const w=[1.05,1.3,1.7,1.85,1.6][q]+v*.12,d=[1.2,1.6,1.55,1.9,2.1][q]+v*.08;box(w,.075,d,pcb,0,.06,0);const sockets=q===3?2:1;for(let i=0;i<sockets;i++){box(.48,.07,.48,metal,-w*.17,.14,-d*.18+i*.7);box(.33,.025,.33,dark,-w*.17,.19,-d*.18+i*.7)}for(let i=0;i<2+v;i++)box(.07,.14,d*.55,c,w*.2+i*.1,.18,-d*.08);for(let i=0;i<1+q;i++)box(w*.62,.07,.07,metal,-w*.13,.15,d*.15+i*.12);if(q>=2){box(w*.2,.24,d*.7,c,-w*.38,.22,0);fins(w*.18,.13,d*.5,-w*.38,.4,0,4+v)}if(q===4){box(w*.85,.1,d*.23,metal,0,.24,d*.35);fan(-w*.28,.28,-d*.36,.18)}for(let i=0;i<3+v;i++)port(-w*.4+i*.18,.22,-d/2-.03);break}
case 2:{
const w=.8+v*.18,d=.8+v*.1;box(w,.1,d,pcb,0,.07,0);box(w*.85,.1,d*.85,metal,0,.17,0);pins(w,d/2);pins(w,-d/2);
if(q===0){for(let i=0;i<1+v;i++)box(.22,.035,.3,c,-w*.28+i*.22,.25,0)}
if(q===1){fins(w,.35+v*.1,d*.8,0,.4+v*.05,0,5+v*2);box(w*.4,.04,d*.4,c,0,.62+v*.1,0)}
if(q===2){cyl(w*.47,.3+v*.08,metal,0,.4,0);for(let i=0;i<8+v*2;i++){const a=i*Math.PI*2/(8+v*2),o=box(w*.75,.05,.12,c,Math.cos(a)*.15,.62+v*.08,Math.sin(a)*.15);o.rotation.y=a}cyl(.12,.08,dark,0,.67+v*.08,0)}
if(q===3){for(const side of [-1,1]){fins(w*.42,.75+v*.13,d*.7,side*w*.28,.65+v*.06,0,5+v);cyl(.04,.65,gold,side*w*.28,.4,0)}fan(0,.66,-d*.43,.3)}
if(q===4){box(w*.82,.35+v*.08,d*.8,c,0,.39,0);cyl(w*.25,.04,dark,0,.6+v*.08,0);for(const side of [-1,1]){box(.08,.5,.08,dark,side*w*.35,.65,d*.25);box(.08,.08,.55,metal,side*w*.35,.9,d*.48)}}break}
case 3:{
if(q===0){const w=1+v*.28;box(w,.075,.55,pcb,0,.06,0);for(let i=0;i<1+v;i++)box(.22,.06,.35,dark,-w*.3+i*.25,.13,0);pins(w*.4,.31)}
if(q===1){const w=1.2+v*.18;box(w,.19,.9,c,0,.15,0);box(w*.75,.015,.6,metal,0,.255,0);port(.25,.14,-.47);for(const x of [-w*.4,w*.4])cyl(.04,.02,dark,x,.27,.3)}
if(q===2){const w=1.25+v*.2;box(w,.08,.65,pcb,0,.08,0);fins(w,.23+v*.09,.58,0,.25,0,6+v);box(w*.85,.04,.08,c,0,.4+v*.09,0)}
if(q===3){box(1.1+v*.15,.09,1.2,pcb,0,.06,0);for(let i=0;i<2+v;i++)box(.2,.12,.85,metal,-.4+i*.22,.18,0);box(.09,.4,1.3,c,-.6-v*.075,.2,0);pins(.8,.65)}
if(q===4){const w=1.5+v*.16;box(w,.15,.8,dark,0,.13,0);for(let i=0;i<2+v;i++){box(.22,.2,.65,c,-w*.35+i*w*.7/(1+v),.3,0);cyl(.065,.08,metal,-w*.35+i*w*.7/(1+v),.45,0)}box(w,.04,.07,gold,0,.46,-.3)}break}
case 4:{
const w=1.2+v*.22,d=.5;box(w,.07,d,pcb,0,.06,0);pins(w,.3);for(let i=0;i<3+v;i++)box(.17,.07,.25,dark,-w*.36+i*w*.72/(2+v),.14,0);
if(q===1)for(const z of [-.18,.18])box(w,.18,.08,c,0,.21,z);
if(q===2){fins(w,.2+v*.1,.45,0,.24,0,4+v);box(w,.04,.12,c,0,.4+v*.1,0)}
if(q===3){for(let i=0;i<2+v;i++){const o=box(.18,.35,.45,c,-w*.32+i*w*.64/(1+v),.3,0);o.rotation.z=(i%2?1:-1)*.24}box(w*.92,.07,.08,metal,0,.55,0)}
if(q===4){box(w,.23,.44,metal,0,.25,0);for(let i=0;i<3+v;i++)cyl(.08,.35,c,-w*.36+i*w*.72/(2+v),.53,0);box(w,.06,.13,c,0,.75,0)}break}
case 5:{
const w=[.85,1.3,1.15,1.5,1.4][q]+v*.13,h=[.7,.55,1,.85,1.1][q]+v*.07,d=.8+v*.08;box(w,h,d,c,0,h/2,0);if(q===0)for(let i=0;i<5+v;i++)box(w*.7,.025,.03,dark,0,.12+i*.08,-d/2-.02);else if(q===1){for(let j=0;j<2;j++)fan((j-.5)*w*.5,h*.5,-d/2-.04,h*.34)}else if(q===2){fan(0,h/2,-d/2-.04,h*.38);for(let i=0;i<2+v;i++)port(-w*.3+i*.2,h*.2,d/2+.03)}else if(q===3){for(const x of [-w*.3,w*.3]){fan(x,h*.55,-d/2-.03,h*.26);box(.07,h*1.1,.09,metal,x,h/2,-d/2-.12)}}else{for(let i=0;i<2+v;i++)box(.13,h*1.15,d*1.1,metal,-w*.35+i*w*.7/(1+v),h*.52,0);fan(0,h*.5,-d*.6,h*.32)}for(let i=0;i<2+v;i++)box(.05,.06,.45,[dark,gold,c][i%3],w*.3-i*.1,.15,d/2+.15);break}
case 6:{
const w=[1.1,1.55,1.9,1.65,2.25][q]+v*.17,h=.63+v*.08;box(w,h,.3,dark,0,h/2+.13,0);box(w,.08,.34,c,0,h+.16,0);box(.07,h+.26,.4,metal,-w/2,.35,0);pins(w*.5,.2,.05);
if(q===0)fan(0,h*.55+.1,-.19,.25+v*.02);
if(q===1){fan(w*.28,h*.55+.1,-.2,.25);for(let i=0;i<5+v;i++)box(.04,h*.65,.05,metal,-w*.4+i*.11,h*.55+.1,-.2)}
if(q===2)for(const x of [-w*.25,w*.25])fan(x,h*.55+.1,-.2,.27+v*.02);
if(q===3){box(w*.88,h*.77,.12,c,0,h*.55+.1,-.23);for(let i=0;i<2+v;i++)box(w*.7,.025,.03,metal,0,.25+i*.13,-.32);for(const x of [-w*.3,w*.3]){cyl(.08,.22,metal,x,h+.29,0);box(.09,.09,.35,dark,x,h+.4,.12)}}
if(q===4){for(const x of [-w*.31,0,w*.31])fan(x,h*.55+.1,-.2,.24+v*.025);for(let i=0;i<3+v;i++)box(.12,.1,.3,gold,-w*.35+i*w*.7/(2+v),h+.28,0)}break}
case 7:{
const w=[1.4,1.8,2.6,1.5,1.5][q]+v*.2,h=[1.15,1.15,1,1.65,1.2][q]+v*.08;
function screen(x,y,z,ww,hh,angle=0){const a=box(ww,hh,q===0?.4:.12,dark,x,y,z);a.rotation.y=angle;const s=box(ww-.12,hh-.12,.025,c,x-Math.sin(angle)*(q===0?.225:.08),y,z-Math.cos(angle)*(q===0?.225:.08));s.rotation.y=angle;for(let i=0;i<3;i++){const l=box(ww*.55,.025,.01,metal,x,y-hh*.22+i*.09,z-(q===0?.24:.1));l.rotation.y=angle}}
if(q===4){screen(-w*.49,1,0,w*.93,h,.18);screen(w*.49,1,0,w*.93,h,-.18);box(w*1.8,.08,.12,metal,0,.38,0)}else screen(0,h/2+.4,0,w,h);box(.12,.48,.13,metal,0,.24,.05);if(v%2===0)box(w*.5,.08,.42,dark,0,.04,0);else for(const x of [-1,1]){const foot=box(w*.38,.08,.12,dark,x*w*.16,.04,-.05);foot.rotation.y=x*.5}if(q===0)box(w*.65,.08,.55,metal,0,.35,.1);if(q===3&&v>1)screen(0,h+.8,0,w*.8,.5);break}
}
// Four structural layouts inside each family, not four paint jobs.
const bounds=new T.Box3().setFromObject(g),sx=bounds.max.x,sy=bounds.max.y,sz=bounds.max.z;
if(item.type===0){if(v===1){box(sx*1.25,.09,.14,metal,0,sy+.25,0);for(const x of [-sx*.62,sx*.62])box(.09,.3,.14,c,x,sy+.1,0)}if(v===2){box(.3,sy*.65,sz*1.5,metal,sx+.2,sy*.4,0);for(let i=0;i<3;i++)box(.35,.06,sz*1.55,dark,sx+.2,.3+i*.25,0)}if(v===3){for(const x of [-sx,sx])box(.18,.3,sz*1.8,metal,x,-.12,0);box(sx*1.5,.18,sz,c,0,sy+.18,0)}}
if(item.type===1){if(v===1)box(sx*.9,.5,.1,metal,0,.32,sz*.7);if(v===2){box(.5,.1,.5,metal,sx*.55,.2,sz*.42);box(.36,.025,.36,c,sx*.55,.27,sz*.42)}if(v===3){for(const side of [-1,1]){const plate=box(.18,.43,sz*1.3,c,side*sx*.8,.3,0);plate.rotation.z=side*.22}}}
if(item.type===2){if(v===1){fins(.35,.4,.5,sx+.16,.4,0,4)}if(v===2){for(const x of [-sx-.1,sx+.1]){cyl(.07,sy+.25,gold,x,(sy+.25)/2,0);box(.1,.1,sz*1.7,metal,x,sy+.23,0)}}if(v===3){for(const side of [-1,1])box(.22,sy*.6,sz*1.2,c,side*(sx+.17),sy*.4,0);box(sx*2,.09,.18,metal,0,sy+.2,0)}}
if(item.type===3){if(v===1)box(.12,.46,.5,metal,sx,.28,0);if(v===2)fins(sx*1.8,.4,.2,0,.34,-sz-.15,7);if(v===3){box(sx*1.8,.07,sz*1.5,pcb,0,sy+.25,0);for(const x of [-sx*.7,sx*.7])box(.09,.32,.1,gold,x,sy+.1,0)}}
if(item.type===4){if(v===1||v===3){const count=v===1?1:3;for(let j=1;j<=count;j++){const z=sz+j*.37;box(sx*1.8,.07,.28,pcb,0,.08,z);for(let i=0;i<4;i++)box(.2,.12,.22,c,-sx*.65+i*sx*.43,.18,z)}}if(v===2){box(sx*1.5,.15,.4,c,0,sy+.22,0);for(const x of [-sx*.65,sx*.65])box(.08,.3,.12,metal,x,sy+.07,0)}}
if(item.type===5){if(v===1){for(const x of [-sx*.6,sx*.6])box(.08,.25,.08,metal,x,sy+.1,0);box(sx*1.2,.08,.08,metal,0,sy+.24,0)}if(v===2){box(.4,sy*.8,sz*1.5,dark,sx+.24,sy*.4,0);fan(sx+.24,sy*.45,-sz*.8,.16)}if(v===3){box(sx*1.8,.35,sz*1.8,dark,0,sy+.22,0);for(let i=0;i<5;i++)box(sx*1.4,.025,.04,metal,0,sy+.1+i*.055,-sz*.95)}}
if(item.type===6){if(v===1){box(.35,sy*.8,.45,metal,sx+.15,sy*.48,0);for(let i=0;i<3;i++)box(.07,sy*.65,.035,dark,sx+.03+i*.12,sy*.48,-.25)}if(v===2){for(const x of [-sx*.7,sx*.7])cyl(.065,.43,gold,x,sy+.18,0);box(sx*1.5,.08,.12,metal,0,sy+.4,0)}if(v===3){box(sx*1.8,.08,.7,c,0,-.13,0);for(const x of [-sx*.8,sx*.8])box(.08,.4,.15,metal,x,.03,0)}}
if(item.type===7){if(v===2){box(sx*1.45,.2,.22,dark,0,.25,-.2);for(const x of [-sx*.5,sx*.5])fan(x,.25,-.33,.075)}if(v===3){box(.52,sy*.62,.12,dark,sx+.35,sy*.5,0);box(.43,sy*.55,.025,c,sx+.35,sy*.5,-.08);box(.5,.06,.1,metal,sx+.15,.35,0)}}
g.userData.partId=item.id;g.userData.structure=`${TYPES[item.type]} / family ${q+1} / form ${v+1}`;return g;
}

export function partThumb(id){const r=PARTS[id];return `<span class="modelThumb" style="background-position:${r.model*100/19}% ${r.type*100/7}%" role="img" aria-label="${r.name}"></span>`}
