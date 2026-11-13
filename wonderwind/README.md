# Wonderwind Workshop

An original 3D clockwork restoration toy for phones and browsers. Public visual/interaction inspiration: Rezona Tiny Crew, https://rezona.ai/game/pgcserver/pv/ZFiGfVyw/v15/dist/index.html . Independently written code and original procedural models; no reference source/assets redistributed.

## Play
Hold or rub a dusty patch with BRUSH. After four patches, FIX the three loose screws. Then hold the double-loop gold winding key with WIND. The toy comes to life, plays a gentle original synthesized tune, and can still be rotated and admired. Every toy has a different silhouette and moving mechanism: smiling daisy, lighthouse, airship, carousel, whale and moon teapot.

Drag empty space or use turn arrows to rotate the object. Find next brings the next repair into view and selects the right tool. Keys: A/D or left/right to turn, 1/2/3 to choose tools, hold Space to focus and work on the next repair. The focus shortcut is an accessibility aid, not a separate reward cheat.

All six toys are available in Collection. Finish to collect the toy and at least one star; use only correct tools for another, complete under 70 seconds for a third. No failure timer or purchases. Best stars and fastest repairs save locally. Replays do not farm stars. Restart resets only the current toy, not your collection.

## Run
Serve this folder via HTTP/HTTPS (`python -m http.server 8080`) or host it on GitHub Pages. ES modules need a server; file:// double-click is not supported. Three.js r147 is bundled locally with its MIT notice; no CDN, fonts, accounts, tracking, network service or backend required. Original code MIT (LICENSE.txt); original generated promotional cover/icon documented in ART-PROMPTS.md. The cover is an illustration, not a game screenshot.

## Technical details
120Hz fixed simulation with capped frame catch-up. DPR cap1.5, one1024 shadow map, bounded90 transient particles, procedural smooth toy geometry and local raycast targets. Dust visibly shrinks, screws rotate and settle, the winding key turns, final mechanisms animate. Tool hits are front-facing and completed targets cannot be reworked. Pause/tab hiding releases input and stops animation/audio. Saved repairs include partial patch progress, object rotation, tool mistakes and active time. Optional mechanism references reset on every model change.

## Tests
`node tests.mjs`: all six normal repair routes, stage/tool gates, wrong-tool accounting, progress bounds, exact active restore/continuation, corrupted-order rejection, detached snapshots, terminal time/reward guards, best-only awards and rotation bounds. Real browser checks include pointer repair, keyboard completion of all six toys, real 3D transitions, pause/reload and responsive layouts. Physical iOS/Android hardware is not tested.

Reference observation: actual Tiny Crew public play identified a Split seam requiring Arc Welder, then welding reached4percent with a HOT indicator. Blep Cat was opened but remained on Waking up; it was not selected or claimed as a completed reference.
