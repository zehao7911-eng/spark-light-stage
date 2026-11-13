# ECHOGLEN

A small illustrated adventure about leaving a little help behind. Walk a fox through nine moonlit rooms. Leave stationary echoes on moon pads to hold their gates open, gather three optional moths, and reach the moon-bell shrine.

## Play

Serve this folder over HTTP (for example `python -m http.server 8000`) and open `index.html`. ES modules need HTTP rather than a file URL. No build, remote font, CDN, account, or backend is required. All runtime assets are bundled.

Tap clear ground to walk, or drag the movement stick. On a moon pad, press **LEAVE ECHO**. With all slots occupied, standing on another pad changes the action to **MOVE ECHO** and replaces the oldest echo. Press **RECALL** away from a new pad to recall all echoes. Keyboard: arrows / WASD, Space, Escape.

The opening room starts on a pad: one press produces an echo and opens the visible gate. Later rooms introduce two simultaneous echoes, linked bellflowers, wind corridors, moving dreams, and moving a single echo between successive gates. There is no countdown. Purple dreams cost one of three hearts and return the fox to its starting pad; collected moths and echoes remain. A three-star room means completion, all three moths, and no stumbles.

Three painted settings divide the nine-room campaign: Lantern Woods, Moon Library, Amber Glasshouse. Completing the campaign unlocks seeded **Dream Trails** mazes. The map records room bests; local storage retains an unfinished room, including position, echoes, moths and hearts. Reload resumes with a stopped character behind a Continue screen.

## Source and art

The campaign, echo system, controller, renderer, UI, audio and illustrated art are new work. The bonus Dream Trails generator adapts the actual recursive maze routine from **Astray** by wwwtyro, commit `d3c4f61f2cbbe35752fbfa205f85a41d7f9fe0f0`, released under the Unlicense. `upstream/maze.js` preserves the original file; `source-maze.js` scopes two implicit variables and injects a seeded random function. Astray's other code, engine and assets are not used. See `LICENSE-ASTRAY.txt` and https://github.com/wwwtyro/Astray .

Five raster assets were generated with the built-in ImageGen tool as one coherent illustrated kit, then encoded as WebP. See `art-manifest.json` for prompt descriptions and provenance. `assets/atlas.json` contains separately measured alpha bounds and foot anchors, rather than assuming the generated sheet is a perfect grid. The fox has directional walking poses; left-facing poses mirror right-facing poses. Props have separate closed/open and unlit/lit states. No stock game sprites are embedded.

## Technical notes

Native Canvas 2D, fixed 60 Hz simulation, capped 40 FPS drawing, DPR capped at 1.5, bounded particles and audio voices. Portrait shows the whole room; landscape follows the fox vertically. Input is cleared on pointer cancellation, blur and resize. Hidden tabs pause and stop sound. Image loading has timeout and retry rather than an indefinite loading overlay. Audio is optional and unlocked by interaction.

Run `node tests.mjs` for independently searched campaign routes, real movement/collision execution, portal and echo rules, save restoration, generated mazes and failure states. Browser checks additionally cover actual touch-sized layout and the visible play/reward loop. Viewport emulation is not a physical-device performance certification.
