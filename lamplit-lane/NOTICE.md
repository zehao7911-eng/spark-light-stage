# Open-source adaptation record

Uses Hexahedral by Matthew Miner, MIT, Copyright (c) 2018. Repository: https://github.com/mminer/hexahedral ; inspected commit `a2641001e13afe15ca8488be7d739203471fee77`. Full notice retained in LICENSE. Original selected source tree is preserved in upstream/ (code only; third-party sound files and old build dependencies are not redistributed).

The original reducers.js, helpers.js and constants are used in src/core/. They perform the actual LOAD_LEVEL/MOVE/WIN dispatch, immutable board copying, tile flip, Manhattan distance, movement validity and win detection. The two pure reducer/distance helpers from util.js are retained in a smaller module without old navigator/audio/debug dependencies. src/core/levels.js is an adapter to the new campaign; the upstream original levels remain in upstream/levels.js for inspection. This is actual rules reuse, not merely a visual reference or a copied utility unrelated to play.

New layers supply 36 seeded, distinct, guaranteed-solvable layouts, unlimited moves instead of forced loss, explicit continuation instead of timed auto-reset, reversible history, route assistance, exact-once awards, best medals, keepsakes, safe local saving, input, rendering and responsive UI. Reference routes define a forgiving par, not a mathematical proof of minimum moves. Trail assistance rewinds divergent steps before showing its next route step; it never silently solves the board.

The original game lists third-party sound credits. None of those sound assets or original audio constants are imported into the runtime. New art and sound provenance is in ART-SOURCE.md. VT323 is accompanied by FONT-OFL.txt. New code is distributed under MIT terms in LICENSE.
