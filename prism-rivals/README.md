# PRISM RIVALS

A complete English falling-crystal duel game for browser and phone. Match full rows to damage six pixel rivals. Multi-row clears and consecutive clears do extra damage. Every five locked pieces charge a Prism Burst, which removes the lowest occupied row. Rivals add a broken row periodically; six strikes or an overflowing board end the duel. Win to unlock the next portrait and palette. Best crests persist without duplicate rewards: win, retain three hearts, retain all six hearts.

Touch the large move, rotate, soft-drop and drop buttons. Hold swaps one piece per placement. Desktop: arrows, Up to rotate, Space to drop, C to hold, X to burst, Escape to pause. Ghost outlines show the landing. Pause/reload continues the current logical board. Saves stay in this browser; clearing storage removes them. No accounts, purchases, analytics, CDN or external runtime assets.

## Run

Open index.html directly or serve this folder. standalone.html is the same embedded build. index-source.html uses separate files for development. node tests.cjs checks rules. python build.py regenerates embedded HTML, SHA256.json and the ZIP. All original code and procedural art use the MIT license in LICENSE.

## Reference and scope

Rezona's Tetris Versus public catalog and title were inspected: https://rezona.ai/game/pgcserver/pv/aCIjaRDp/v21/dist/index.html . Both its embedded and direct game preview remained blank after retry; its complete mechanics and artwork could not be verified. This delivery is an independently implemented falling-block character duel, not a verified one-to-one reproduction. No reference code, characters, art, sounds or branding were copied. Earlier Paper Armada was excluded after history search showed it had already been referenced. Blindsight and Space Rescue Service previews also failed to render.

Six original pixel portraits, faceted crystal tiles, starfield, interface and synthesized sounds are rendered in code. There are six authored duel configurations, not infinite unique worlds. Small-screen viewport layouts are tested; physical phone GPU, audio and performance behavior varies by browser. There is no commercial Tetris affiliation.
