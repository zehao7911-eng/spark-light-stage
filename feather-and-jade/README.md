# FEATHER & JADE

A little porcelain aviary. Original source-pixel bird tile solitaire, with twelve authored layered arrangements, three conservatory interiors and a twelve-bird illustrated collection. No generated images, commercial assets, CDN, fonts or runtime libraries.

## The whole rule

Tap two matching **lit** bird tiles. A tile is lit when its top is uncovered and at least one side is open. Dim tiles have a small lock mark. Clear every pair to welcome that perch's bird. There is no timer, life count or lost reward for a mismatch.

Tiles have actual footprint/height relationships. A tile higher in a stack blocks overlapping lower tiles; neighbours at the same height can pinch its two sides. Uncovering a tile really changes its availability and face appearance. The artwork's pseudo-depth is source-pixel rendering, not a 3D engine.

Click / tap an available bird, then its twin. Tapping the same tile deselects it. A different lit bird changes selection without penalty. Dragging or cancelling a pointer does not match a tile. Keyboard: focus the picture, arrows cycle available tiles, Enter or Space selects, Z undoes, Escape pauses.

Undo restores the previous pair or Breeze, including score and tile positions. Hint searches for a pair that begins a complete solution to the **current** remaining board; it never removes a tile. The bounded search may decline a hard or stuck position and recommend Breeze. Some otherwise legal matching choices can leave an unsolvable position. Undo is free, and Breeze always offers recovery.

Breeze rearranges all remaining tiles into a flat, solvable fan and reassigns their faces using **exactly the remaining motif inventory**. It does not remove tiles, grant pair points, or erase already collected progress. The reshuffle animation is cosmetic; input waits for it to settle. A full authored solution is used to assign each starting board, and rule tests verify current-state Hint and recovery.

## Feedback and collection

Each genuine pair grants 100 points plus 20 times the current Chorus (maximum six). A new pair within 3.5 seconds continues the optional Chorus; slower play simply starts again at one, with no loss or time limit. Bird sprites flap from the actual removed positions to the window perch, ceramic faces clear, new faces brighten, the keeper raises a hand and pitched porcelain/bird notes play. A final large pixel bird appears on its stand with chimes and sparkle accents.

Stars: finish; use no Hint; use no Breeze. Hint and Breeze use remain counted through Undo. The book retains the maximum stars and maximum score separately, so replaying cannot repeatedly farm stars. Nine total stars unlock Indigo lacquer; 24 unlock Rosewood. These finishes change appearance only. Twelve finite perches; no claim of endless authored levels.

Local storage saves remaining tiles, their positions and faces, score, active Chorus time, assistance use, progress, records and settings. An unfinished board reopens paused. Selection, Undo history and cosmetic flight/repacking animation are session-only. Pause, hidden page and focus loss stop time, animation and voices. Storage denial does not block play. Sound starts only after a user gesture. Gentle reduces draw rate, rain movement and the large bird's bob. No microphone, account, payments, adverts or analytics.

## Launch

Extract every file together with `index.html` at the ZIP root. Serve the folder over HTTP, for example `python -m http.server 8080`, then visit `http://127.0.0.1:8080/`. ES modules require a server; double-clicking the HTML file is not a supported launch path. Static hosting and GitHub Pages subdirectories work without a build or installation step.

Optional tests: `node tests.mjs` or `npm test`, no dependencies. Tests cover every authored three-star route, independently searched routes, Breeze inventory conservation and solvability, state restore, undo/assistance persistence, terminal guards, Chorus timing, blocked selection, invalid saves and no idle removal. Actual native browser and public verification is recorded outside this source directory in the delivery report. Simulated mobile viewports do not constitute physical phone testing, human playtesting or a platform grade.

## Artwork and provenance

Original 320×430 source-pixel scenes, nearest-neighbour scaling, celadon/ivory layered porcelain, lacquer joinery/inlay, seed jars, tiled conservatory walls, glazing, ferns, rain and moonlit panes. Eight distinct bird motifs with four additional collection variants: wren, robin, kingfisher, owl, finch, parakeet, cockatiel and duck. Feather bands, eye markings, crests, tail shapes and bills differ; flight uses eight wing poses. Original human bird keeper, original SVG icon and a real runtime screenshot cover. Short screens focus the view on the lacquer table to enlarge the tiles; regular portrait retains the full aviary. No source or assets from a commercial game. This is a classic tile-solitaire interpretation, not a claim to invent the genre.

The integer plotting helper and general responsive layout utilities adapt earlier work in this same workspace under MIT; notices are retained. All new game logic, source-pixel scene/bird artwork and synthesized sound are original to this game. See LICENSE.txt.
