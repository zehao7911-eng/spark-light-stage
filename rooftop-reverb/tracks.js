export const COLOURS=['#f1b56c','#9dd7bf','#de91a7','#9aaedb'];
export const TRACKS=[
 {title:'Windows Wide Open',place:'APRICOT ROOF',theme:0,bpm:80,step:2,lanes:[0,1,2,3,2,1,0,2,1,3,2,0],melody:[0,2,4,7,4,2,0,4,2,7,4,0]},
 {title:'The Last Tram Home',place:'APRICOT ROOF',theme:0,bpm:88,step:1.5,lanes:[0,0,1,2,3,2,1,0,3,3,2,1,0,2,1,3,2,0],melody:[0,0,2,4,7,4,2,0,9,7,4,2,0,4,2,7,4,0]},
 {title:'Raindrops in Stereo',place:'RAINCHECK STATION',theme:1,bpm:84,step:1.5,lanes:[1,3,1,2,0,2,3,1,0,2,0,3,1,2,3,0,1,3,2,0],melody:[2,7,2,4,0,4,9,2,0,4,0,7,2,4,7,0,2,9,4,0]},
 {title:'Platform After Midnight',place:'RAINCHECK STATION',theme:1,bpm:100,step:1.25,lanes:[0,1,0,2,1,3,2,3,0,2,1,3,0,1,2,0,3,1,2,3,1,0,2,0],melody:[0,2,0,4,2,7,4,9,0,4,2,7,0,2,4,0,9,2,4,7,2,0,4,0]},
 {title:'A Song for the Ferns',place:'GLASSHOUSE DAWN',theme:2,bpm:88,step:1.5,lanes:[3,2,1,0,1,2,3,1,2,0,3,2,1,3,0,1,2,3,1,0],melody:[7,4,2,0,2,4,9,2,4,0,7,4,2,9,0,2,4,7,2,0]},
 {title:'Every Little Light',place:'GLASSHOUSE DAWN',theme:2,bpm:104,step:1,lanes:[0,1,2,3,0,2,1,3,2,1,0,3,1,2,0,2,3,1,0,1,3,2,0,3,2,1,3,0],melody:[0,2,4,7,0,4,2,9,4,2,0,7,2,4,0,4,9,2,0,2,7,4,0,9,4,2,7,0]}
];
export function chart(index){const d=TRACKS[index];if(!d)throw Error('Unknown record');const beat=60/d.bpm;return d.lanes.map((lane,i)=>({id:i,lane,time:1.7+i*d.step*beat,pitch:d.melody[i],state:'waiting',grade:0,error:0}));}
