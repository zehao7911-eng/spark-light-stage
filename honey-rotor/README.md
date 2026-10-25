# Honey Rotor

Honey Rotor is a GPL-3.0-or-later adaptation of Hextris, with original warm tabletop illustrations and a complete mobile-friendly 12-batch campaign. Source and all runtime assets are in this folder. No package installation/build/CDN is needed. Serve the folder over HTTP and open index.html (e.g. python -m http.server). ES modules require HTTP rather than directly opening file://.

## Upstream source and license
- Project: https://github.com/Hextris/hextris
- Authors: Logan Engstrom, Garrett Finucane, Noah Moroze, Michael Yang.
- Copyright (C) 2018 Logan Engstrom. GPL version 3 or later; complete text in LICENSE.txt.
- Upstream gh-pages HEAD verified 2026-10-25: 3f4847dc8fd7dab3d1c87e6324b9159d92fbd396.
- search/floodFill from js/checking.js retained in hextris-core.js; consolidateBlocks adapted to return clearing coordinates rather than use upstream UI globals. Rotation/lane mapping and trapezoid geometry adapted from Hex.js/Block.js. Source snapshots included in upstream/. The campaign, independent deterministic rules, scoring integration, input, storage, interface, original code-drawn art and Web Audio sounds are modified/new source included here. No proprietary/borrowed images, fonts or music included. This whole adaptation, including its new source/art, is offered under GPL-3.0-or-later; no warranty.

## Play
Rotate left/right (arrows, A/D or touch buttons/swipe). Space/Down/DROP lands the nectar. Three or more orthogonally touching blocks with the same color clear, including across the 0/5 side seam. Collapse may produce another match. Score increases by group size squared times combo (capped x6), times 10. Chain/combo windows and upcoming colors encourage planning. A full BURST/S removes the outside two layers. Overflow at stack height 6 removes outside layers and costs a heart; three spills end a batch. Complete harvest goals to collect 1-3 stars and unlock the next batch. Star totals use each batch's best result; replays do not duplicate rewards.

12 authored starting arrangements, targets12..48, 3/4 colors, three tabletop palettes. The last batch remains replayable. Saves active board, queue, orientation, RNG, resolution and score plus best medals; storage-denied mode stays playable without persistence. Profile key honey-rotor-v1. No analytics, accounts, purchases or network runtime assets. Sound is muted initially, enabled by a gesture and suspended when paused/hidden. Portrait/landscape responsive controls, bounded particles and 40 FPS rendering target; actual physical handset performance varies.

Validation: run `node tests.mjs`; see QA.md.
