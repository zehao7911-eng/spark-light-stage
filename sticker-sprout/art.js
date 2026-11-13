'use strict';
const INK='#525b4c',PALETTE=['#efb596','#a8c69a','#d6bbe0','#f4d889','#9bc9d3','#edb3c4'];
const ART=[
{name:'Cat',color:0,path:'<path d="M23 48 19 22 39 32 Q50 27 61 32 L81 22 77 48 Q90 83 50 86 Q10 83 23 48Z"/><path d="M26 32 30 46 38 37M73 32 69 46 62 37" fill="#e28f83" stroke="none"/>'},
{name:'Frog',color:1,path:'<ellipse cx="50" cy="61" rx="35" ry="25"/><circle cx="30" cy="38" r="14"/><circle cx="70" cy="38" r="14"/><ellipse cx="50" cy="73" rx="21" ry="10" fill="#d9e7ae" stroke="none"/>'},
{name:'Bunny',color:2,path:'<ellipse cx="35" cy="30" rx="10" ry="24" transform="rotate(-12 35 30)"/><ellipse cx="65" cy="30" rx="10" ry="24" transform="rotate(12 65 30)"/><ellipse cx="50" cy="64" rx="32" ry="26"/><path d="M34 14 38 35M66 14 62 35" stroke="#eeacd0" stroke-width="6"/>'},
{name:'Bear',color:3,path:'<circle cx="24" cy="34" r="13"/><circle cx="76" cy="34" r="13"/><ellipse cx="50" cy="61" rx="33" ry="29"/><ellipse cx="50" cy="72" rx="15" ry="11" fill="#fff0cf" stroke="none"/>'},
{name:'Axolotl',color:4,path:'<path d="M21 48 9 33M19 58 5 55M21 68 9 80M79 48 91 33M81 58 95 55M79 68 91 80" stroke="#d69daa" stroke-width="7"/><ellipse cx="50" cy="61" rx="31" ry="26"/>'},
{name:'Fox',color:0,path:'<path d="M18 46 18 15 39 33 Q50 29 61 33 L82 15 82 46 Q88 72 50 91 Q12 72 18 46Z"/><path d="M19 50 Q35 53 50 74 Q65 53 81 50 Q80 73 50 88 Q20 73 19 50" fill="#fff3db" stroke="none"/>'},
{name:'Panda',color:2,path:'<circle cx="23" cy="33" r="13" fill="#666f5e"/><circle cx="77" cy="33" r="13" fill="#666f5e"/><ellipse cx="50" cy="61" rx="33" ry="29" fill="#fff7e1"/><ellipse cx="34" cy="59" rx="12" ry="15" fill="#858875" stroke="none" transform="rotate(25 34 59)"/><ellipse cx="66" cy="59" rx="12" ry="15" fill="#858875" stroke="none" transform="rotate(-25 66 59)"/>'},
{name:'Chick',color:3,path:'<path d="M40 34 Q28 18 47 22 Q60 8 60 33"/><ellipse cx="50" cy="61" rx="31" ry="29"/><path d="M16 56 Q-1 68 23 73M84 56 Q101 68 77 73"/><path d="M45 69 55 69 50 75Z" fill="#da9968"/>'},
{name:'Otter',color:0,path:'<circle cx="22" cy="44" r="10"/><circle cx="78" cy="44" r="10"/><ellipse cx="50" cy="63" rx="34" ry="25"/><ellipse cx="50" cy="74" rx="19" ry="12" fill="#f7e6ba" stroke="none"/>'},
{name:'Ghost',color:4,path:'<path d="M20 81 20 52 Q20 15 50 15 Q80 15 80 52 L80 81 Q70 94 60 80 Q50 94 40 80 Q30 94 20 81" fill="#fff9df"/>'},
{name:'Dragon',color:1,path:'<path d="M27 39 19 14 40 31M73 39 81 14 60 31" fill="#e6cd8b"/><ellipse cx="50" cy="59" rx="32" ry="27"/><path d="M31 37 39 27 48 38 58 25 67 38" fill="#d8aa88"/><ellipse cx="50" cy="75" rx="20" ry="11" fill="#d4dfb0" stroke="none"/>'},
{name:'Capybara',color:0,path:'<circle cx="26" cy="32" r="8"/><circle cx="72" cy="32" r="8"/><rect x="19" y="31" width="64" height="53" rx="24"/><ellipse cx="67" cy="74" rx="22" ry="13" fill="#e4bd90"/><path d="M50 74H59"/>'}
];
const DECO=[
{name:'Bloom',svg:'<g fill="#eab1c6"><circle cx="50" cy="30" r="16"/><circle cx="69" cy="44" r="16"/><circle cx="62" cy="67" r="16"/><circle cx="38" cy="67" r="16"/><circle cx="31" cy="44" r="16"/></g><circle cx="50" cy="49" r="13" fill="#f4d889"/>'},
{name:'Star',svg:'<path d="m50 13 11 25 27 3-20 19 5 27-23-14-23 14 5-27-20-19 27-3Z" fill="#f0d58d"/>'},
{name:'Bow',svg:'<path d="M49 47Q13 10 17 50Q12 87 49 55Q88 89 84 49Q88 12 49 47Z" fill="#d59caf"/><circle cx="50" cy="51" r="9" fill="#eeb5be"/>'},
{name:'Moon',svg:'<path d="M65 17Q19 14 18 54Q21 96 69 82Q36 75 36 48Q38 27 65 17Z" fill="#ddd0ef"/>'},
{name:'Leaf',svg:'<path d="M24 79Q7 25 78 16Q90 74 24 79Z" fill="#a8c69a"/><path d="M20 87 68 31M41 64 37 44M51 52 67 55" fill="none"/>'},
{name:'Heart',svg:'<path d="M50 83Q5 51 19 27Q33 11 50 31Q69 10 83 29Q97 51 50 83Z" fill="#e5a5a6"/>'}
];
function artSVG(id,color=ART[id].color,accessory=-1,face=true){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="${PALETTE[color]}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">${ART[id].path}${face?'<path d="M35 56v5M65 56v5" stroke-width="3.5"/><path d="M43 69q7 7 14 0" fill="none"/><ellipse cx="26" cy="68" rx="6" ry="3" fill="#de9293" stroke="none"/><ellipse cx="74" cy="68" rx="6" ry="3" fill="#de9293" stroke="none"/>':''}${accessory>=0?`<g transform="translate(52 -1) scale(.4)">${DECO[accessory].svg}</g>`:''}</g></svg>`}
function decoSVG(id){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g stroke="${INK}" stroke-width="2.2" stroke-linejoin="round">${DECO[id].svg}</g></svg>`}
const images={};function svgImage(svg){if(!images[svg]){const i=new Image();i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);images[svg]=i}return images[svg]}
