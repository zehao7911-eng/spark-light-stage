# Sources and provenance

## Adapted source

- Project: **Astray**, https://github.com/wwwtyro/Astray
- Inspected commit: `d3c4f61f2cbbe35752fbfa205f85a41d7f9fe0f0`
- Reused portion: recursive square-maze generation from `maze.js`.
- Local adaptation: `vendor/astray-maze.js`; seeded LCG random source, local variables, row-major strings and bounded odd-size input validation.
- Actual runtime use: reconstructing eleven fixed seeded chambers defined in `levels.js`, with separately authored openings, goals, collectibles and mechanisms. The introductory corridor is hand-authored.
- License: Unlicense / public domain, preserved in `ASTRAY-LICENSE.txt`.
- Excluded assets/dependencies: `ball.png`, `brick.png`, `concrete.png`, legacy `Three.js`, Box2dWeb, jQuery and keyboard helper. No upstream media is redistributed.

## Rendering dependency

- Three.js r147, local file `vendor/three.min.js`.
- Copyright Three.js authors; MIT, preserved in `THREE-LICENSE.txt`.
- No remote library request. The build inlines this local copy into the playable HTML.

## Original contributions

Quarter-turn gravity/slide rules; finite state transitions; animation timeline; keys, gates and portal rules; shortest-path and recoverability validation; snapshots and restore; stage selection; star/core unlock economy; accessible touch/keyboard controls; all maze presentation, instrument housings, clamp detail, drone, core, collectibles, portal/dock meshes, fallback graphics, SVG icon and synthesized sounds.

`README.md` documents the limits of the observed Rezona references. `STYLE.md` records the original machinery art system derived from the broad principles of the user's atlas. Commercial game screenshots were viewed only as references, not included as runtime assets.
