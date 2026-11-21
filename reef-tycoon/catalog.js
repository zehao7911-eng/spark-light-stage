const names=['Starfish','Blue Tang','Sun Puffer','Reef Clown','Mossback','Violet Seahorse','Spikejaw','Moon Ray','Aurora Koi','Crown Shark','Ember Nautilus','Cosmic Whale'],rates=[2,4,8,14,40,50,290,410,640,1050,1800,3000],colors=[0xff7eaa,0x38b8ff,0xffa12e,0xff6536,0xb6bd4b,0xb273ee,0x3889c7,0x79d8d9,0xff9988,0x6e86ae,0xf08d50,0x9273ce];
const regions = [
 {name:'World 1', sky:0x8cdffd, water:0x39bbd9, stone:0x987351, feature:'Coral', groups:[
 ['Common', 'Starfish|Blue Tang|Codfish|Minnow|Anchovy|Sardine|Mullet|Flatfish'],
 ['Uncommon','Sun Puffer|Reef Clown|Mossback|Violet Seahorse|Butterflyfish|Ribbon Eel|Parrotfish|Coral Grouper'],
 ['Rare','Spikejaw|Moon Ray|Aurora Koi|Crown Shark|Ember Nautilus|Cosmic Whale|Sailfin|Copper Snapper']]},
 {name:'World 2',sky:0xffdfaf,water:0x62cbb6,stone:0xc28149,feature:'Arch',groups:[
 ['Doodle','Inkfin|Crayon Carp|Chalk Ray|Brush Eel|Stencil Shark|Paper Pike|Doodle Squid|Pastel Puffer|Scribble Sole|Paintbox Perch'],
 ['Prism','Prism Fish|Glass Minnow|Opal Tang|Beryl Ray|Ruby Koi|Citrine Eel|Jade Seahorse|Amethyst Squid|Quartz Shark|Diamond Sailfish']]},
 {name:'Abyss',sky:0x343d6e,water:0x27558b,stone:0x42395c,feature:'Vent',groups:[
 ['Midnight','Lanternfish|Viperfish|Gulper Eel|Ghost Shark|Black Dragonfish|Vampire Squid|Barreleye|Fangtooth'],
 ['Trench','Voidfish|Anglerfish|Dumbo Octopus|Hatchetfish|Chimera|Sable Ray|Trench Nautilus|Coffinfish']]},
 {name:'Beasts',sky:0xffb38a,water:0x569b82,stone:0x764834,feature:'Fang',groups:[
 ['Beast','Kraken|Leviathan|Ironjaw Shark|Tusked Ray|Armored Sturgeon|Goliath Grouper|Sawtooth Eel|Titan Puffer|Hydra Pike|Ridgeback Whale|Cinder Squid|Thunder Gar|Boulderfin|Horned Marlin|Crown Serpent|Sea Deity']]},
 {name:'Events',sky:0x986fba,water:0x6a71b6,stone:0x836d9b,feature:'Moon',groups:[
 ['Moon','Moon Jelly|Lunar Ray|Crescent Shark|Eclipse Eel|Orbit Puffer|Moonstone Carp|Starlit Seahorse|Nebula Squid'],
 ['Derby','Pennant Perch|Ribbon Marlin|Trophy Tuna|Laurel Koi']]},
 {name:'Weather',sky:0x7e9db8,water:0x378aab,stone:0x5a6e85,feature:'Spire',groups:[
 ['Storm','Static Ray|Thunderhead Shark|Rain Carp|Cyclone Eel|Nimbus Puffer|Squall Sailfish'],
 ['Aurora','Polar Cod|Sunshower Tang|Frost Pike|Rainbow Salmon|Boreal Jelly|Halo Dolphin']]}
];
const forms=['eel','ray','shark','puffer','squid','jelly','octopus','seahorse','whale','dolphin','nautilus','sole','flatfish','sail','marlin','pike','gar','shark','angler','lantern','serpent','star'];
const roster=regions.flatMap((region,r)=>region.groups.flatMap(([band,list],tier)=>list.split('|').map((name,slot)=>{
 let id=names.indexOf(name);
 if(id<0){id=names.length;names.push(name);const observed={Doodle:[230000,245000,260000,278000,295000],Moon:[80000,129000,195000,250000,320000],Beast:[34000,40000,45000,55000,55000],Common:[2,4,5,7,9]};rates.push(observed[band]?.[slot]??Math.round((r+1)**3*(tier+1)*7*(1+slot*.22)));colors.push(0x438586)}
 const anatomy={'Kraken':'octopus','Leviathan':'serpent','Sea Deity':'serpent','Ribbon Marlin':'marlin','Chalk Ray':'ray','Viperfish':'pike','Coffinfish':'angler'};
 return {id,name,band,tier,r,slot,form:anatomy[name]||forms.find(f=>name.toLowerCase().includes(f))||'fin'};
})));
const byId=new Map(roster.map(rec=>[rec.id,rec]));
