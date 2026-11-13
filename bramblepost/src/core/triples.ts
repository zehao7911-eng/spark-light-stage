// Adapted from match-three-js, MIT, Copyright (c) 2016 Playtester's Kitchen.
import * as _ from './native';
import * as tools from './tools';
import { walk } from './walk';
import { Orb } from '../types';
import { Chunk } from '../types';

let _findTriples = (chunks: Chunk[], isTransposed: boolean): number[][][] => {
    let triples: number[][][] = [];

    _.each(chunks, chunk => {
        let orbs = chunk.orbs[0];
        if (_.uniq(orbs).length === 1) {
            let anchor = chunk.positionInfo.first;
            let firstOrb: number[] = anchor;
            let secondOrb: number[];
            let thirdOrb: number[];

            if (isTransposed) {
                secondOrb = [anchor[0] + 1, anchor[1]];
                thirdOrb = [anchor[0] + 2, anchor[1]];
            } else {
                secondOrb = [anchor[0], anchor[1] + 1];
                thirdOrb = [anchor[0], anchor[1] + 2];
            }

            let absolutePositions = [
                firstOrb,
                secondOrb,
                thirdOrb
            ];
            triples.push(absolutePositions);
        }
    });

    return triples;
};

/**
  * @description Gathers all triples, which are the coordinates for all instances of 
  * three consecutive matching orbs, first in rows, then in columns.
  */
export function find(orbs: Orb[][]): number[][][] {
    let horizontalChunks = walk.horizontally(orbs, [3, 1], true);
    let verticalChunks = walk.vertically(orbs, [3, 1], true);

    return [
            ..._findTriples(horizontalChunks, false),
            ..._findTriples(verticalChunks, true)
    ];
};

// Connected union is repeated to include bridges between previously separated triples.
export function combine(triples: number[][][]): number[][][] {
 let groups = triples.map(t => t.map(c => c.slice()));
 for (let i=0; i<groups.length; i++) {
   for (let j=i+1; j<groups.length; j++) {
     if (groups[i].some(a => groups[j].some(b => a[0]===b[0] && a[1]===b[1]))) {
       const cells = new Map(groups[i].concat(groups[j]).map(c => [c.join(','), c]));
       groups[i] = [...cells.values()]; groups.splice(j,1); j=i;
     }
   }
 }
 return groups;
}
