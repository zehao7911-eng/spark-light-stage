// Adapted from match-three-js, MIT, Copyright (c) 2016 Playtester's Kitchen.
'use strict';
import * as _ from './native';
import * as orbs from './orbs';
import * as triples from './triples';

import { Orb } from '../types';
import { MatchData } from '../types';

export class Board {
    width: number;
    height: number;
    types: Orb[]
    orbs: Orb[][];
    attic: Board;
    constructor (width: number = 8, height: number = 8, types: Orb[] = _.range(7), needsAttic: boolean = true) {
        this.width = width;
        this.height = height;
        this.types = types;
        if (!Number.isInteger(width)||!Number.isInteger(height)||width<3||height<3||types.length<3) throw new Error("Invalid board");
        this.generateOrbs();
        if (this.hasMatch() || this.needsShuffle()) {
            this.shuffle();
        };
        if (needsAttic) {
            this.attic = new Board(this.width, this.height, this.types, false);
        };
    }

    get size(): [number, number] {
        return [this.width, this.height];
    }

    get availableTypes(): Orb[] {
        return _.uniq(_.flatten(this.orbs)).sort();
    }
    
    get triples(): number[][][] {
        return triples.find(this.orbs);
    }
    
    get matches(): number[][][] {
        return triples.combine(this.triples);
    }
    
    generateOrbs(): void {
        let chooseOrb = () => { return _.sample(this.types); };
        let sampleRow = () => { return _.times(this.width, chooseOrb); };
        this.orbs = _.times(this.height, sampleRow);
    }

    resetAttic(): void {
        this.attic = new Board(this.width, this.height, this.types, false);
    }

    evaluate(): MatchData {
        let [newOrbs, matchData] = orbs.evaluate(this.orbs, this.matches, this.attic.orbs);
        this.orbs = newOrbs;
        return matchData;

    }

    needsShuffle(): boolean {
        return !this.hasPotentialMatch();
    }

    hasPotentialMatch(): boolean {
        return orbs.hasPotentialMatch(this.orbs);
    }
    
    hasMatch(): boolean {
        return Boolean(triples.find(this.orbs)[0]);
    }

    swap(swapOrbs): void {
        this.orbs = orbs.swap(this.orbs, swapOrbs);
    }
    
    // Bounded rejection generation: no recursive shuffling or unbounded mutation.
    unmatch(): void {
        for(let r=0;r<this.height;r++)for(let c=0;c<this.width;c++) {
          let allowed=this.types.filter(t=>!(c>1&&this.orbs[r][c-1]===t&&this.orbs[r][c-2]===t)&&!(r>1&&this.orbs[r-1][c]===t&&this.orbs[r-2][c]===t));
          this.orbs[r][c]=_.sample(allowed);
        }
    }
    shuffle(): void {
        for(let i=0;i<100;i++) {this.unmatch();if(!this.needsShuffle())return;}
        throw new Error('Could not generate playable board');
    }
};
