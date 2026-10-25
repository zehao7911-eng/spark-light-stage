/* Honey Rotor adaptation of Hextris.
Copyright (C) 2018 Logan Engstrom and Hextris contributors.
GPL-3.0-or-later, see LICENSE.txt. Modified 2026-10-25.
search/floodFill below retained from js/checking.js. consolidateBlocks scoring,
rotation and collision/geometry below adapted for deterministic independent rules. */
function search(twoD,oneD){
	// Searches a two dimensional array to see if it contains a one dimensional array. indexOf doesn't work in this case
	for(var i=0;i<twoD.length;i++){
		if(twoD[i][0] == oneD[0] && twoD[i][1] == oneD[1]) {
			return true;
		}
	}
	return false;
}

function floodFill(hex, side, index, deleting) {
	if (hex.blocks[side] === undefined || hex.blocks[side][index] === undefined) return;

	//store the color
	var color = hex.blocks[side][index].color;
	//nested for loops for navigating the blocks
	for(var x =-1;x<2;x++){
		for(var y =-1;y<2;y++){
			//make sure the they aren't diagonals
			if(Math.abs(x)==Math.abs(y)){continue;}
			//calculate the side were exploring using mods
			var curSide =(side+x+hex.sides)%hex.sides;
			//calculate the index
			var curIndex = index+y;
			//making sure the block exists at this side and index
			if(hex.blocks[curSide] === undefined){continue;}
			if(hex.blocks[curSide][curIndex] !== undefined){
				// checking equivalency of color, if its already been explored, and if it isn't already deleted
				if(hex.blocks[curSide][curIndex].color == color && search(deleting,[curSide,curIndex]) === false && hex.blocks[curSide][curIndex].deleted === 0 ) {
					//add this to the array of already explored
					deleting.push([curSide,curIndex]);
					//recall with next block explored
					floodFill(hex,curSide,curIndex,deleting);
				}
			}
		}
	}
}


export function consolidateBlocks(hex,side,index){
 const deleting=[[side,index]]; floodFill(hex,side,index,deleting);
 if(deleting.length<3)return [];
 for(const [s,i] of deleting)hex.blocks[s][i].deleted=1;
 return deleting;
}
export function rotateHex(hex,steps){
 hex.position+=steps;
 while(hex.position<0)hex.position+=6;
 hex.position%=hex.sides;
 hex.targetAngle-=steps*60;
}
export function attachedLane(hex,fallingLane){
 let lane=hex.sides-fallingLane;
 lane+=hex.position;
 return (lane+hex.sides)%hex.sides;
}
// Same trapezoid dimensions as Hextris Block.draw (distFromHex is the apothem).
export function blockShape(distFromHex,height){
 const width=2*distFromHex/Math.sqrt(3);
 const widthWide=2*(distFromHex+height)/Math.sqrt(3);
 return [[-width/2,-distFromHex],[width/2,-distFromHex],[widthWide/2,-distFromHex-height],[-widthWide/2,-distFromHex-height]];
}
export {search,floodFill};
