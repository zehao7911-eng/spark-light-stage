// Adapted from match-three-js, MIT, Copyright (c) 2016 Playtester's Kitchen.
import * as _ from './native';

import { Orb } from '../types';
import { Chunk } from '../types';

// return the index of all occurrences of `value` in `list`. [5, 3, 7, 5], 5 -> [0, 3]
export function indexOfAll (list: Orb[], value: Orb): number[] {
    return _.reduce(list, (acc: number[], e, i: number) => {
        if (e === value) {
            acc.push(i);
        }

        return acc;
    }, []);
};
