# ORRERY RUN — Turn. Roll. Awaken.

An English HTML5 quarter-turn gravity-maze puzzle. Turn a small three-dimensional mechanical room, watch the core roll through its corridors, collect three fragments and dock it. Two turn buttons, sideways swipes, unlimited free undo and replay. Twelve fixed, distinct curated layouts introduce keys and paired portals. No lives, reflex timer, advertisements, purchases, accounts or remote game service.

## Play

Tap Turn Left or Turn Right, or swipe sideways over the instrument. The room turns ninety degrees; gravity then rolls the core to the last free cell before a wall. The camera and gravity indicator stay in the world while the whole maze and its core rotate together. A turn may brace against a wall without rolling; that orientation can set up the next turn. Input waits until the visible motion has finished. A cancelled swipe does not turn the room.

Collect all three fragments before entering the circular dock. From engine five, a key is also required; collecting it opens the matching gate. From engine nine, paired portals carry the core to their partner and stop that roll. The next quarter-turn moves it onward. Every reachable decision state in all twelve chambers was checked to retain a winning route.

Stars: finish the engine; finish without a hint; finish within the displayed gold turn target. Gold permits two turns above a breadth-first shortest solution. A free hint solves the actual current position, orientation, collected fragments and key state, then highlights one turn button. It never turns the maze for the player. Using a hint remains recorded through undo. Undo restores the complete previous decision state and move count. Replaying never reduces a best star score or duplicates first-clear unlocks.

Completing four engines reveals key-gate chambers; eight reveal portal chambers. Nine total stars unlock Amber Core; twenty-four unlock Amethyst Core. Core choices are cosmetic and do not change puzzle rules. All twelve chambers remain replayable from the observatory. These are finite, curated seeded layouts, not twelve unrelated worlds or an infinite campaign.

Keyboard: Left/A and Right/D turn, Z undoes, H hints, P/Escape pauses. Tab and Enter operate accessible buttons. No key-hold repeat is required. Pause, blur, background tabs and resize release an unfinished swipe, freeze gameplay and stop synthesized audio. Resume is explicit. Sound starts only after a gesture and has a mute control.

## Saving and mobile views

The browser stores best stars, unlocked chambers, core choice, settings, decision history and an interrupted turn under `orrery-run-v1`. A mid-turn save records its prior decision state, turn direction and elapsed animation time; restore rebuilds that same route and visible core pose, then opens paused. The fragment/key mask follows the actual animation timeline. Short-lived sparkle particles are decorative and are not restored. Saves belong to this browser and origin; clearing browser data clears them. Storage-blocked browsers remain playable without reliable persistence.

WebGL uses original procedural Three.js geometry, a fixed orthographic camera, one shadow-casting directional light, local generated glows, instanced maze parts and bounded particles. Rendering targets about thirty frames per second. DPR is capped at 1.5; Battery Saver caps it at 1.0 and disables real-time shadows. Gentle Motion reduces decorative motion. Light View is a complete Canvas 2D renderer of the same game, automatically selected when WebGL cannot initialize or a live graphics context is lost. It is also selectable in Pause. Switching views preserves the puzzle and releases the old renderer. No automatic page-reload loop is used.

The simulation uses explicit grid sliding and authored animation, not a continuous rigid-body or full three-dimensional physics engine. The three-dimensional meshes visualise that same collision topology. Animated sphere clearance, gate state and portal transitions are checked separately from screenshot review. Touch controls are at least 44 CSS pixels. CSS-viewport testing does not certify performance on every physical handset or audio quality by listening.

## Run and rebuild

Serve this folder over HTTP(S), including GitHub Pages. `index.html` and `standalone.html` inline the game, renderer and local libraries. There is no CDN, external font, downloaded texture, music recording, network API or account dependency. The separate local SVG favicon is optional. File-URL browser policies vary; HTTP is the recommended preview method.

Run `python build.py` to rebuild both playable files, the SHA256 manifest and deterministic ZIP. Editable source: `index-source.html`, `style.css`, `game.js`, `art.js`, `model.js`, `levels.js`, and the adapted generator in `vendor/astray-maze.js`. `phone-preview.html` is a clearly labelled responsive QA fixture containing the actual game at 390×844, 320×568 or 844×390 CSS pixels. It is not a physical handset emulator.

`curate-levels.cjs` reproduces the selected maze configurations and writes `levels.js` plus `curation-report.json`. It starts with the hand-authored introductory path, uses seeded upstream generation for the remaining chambers, adds curated openings, keys, gates and portals, then rejects duplicate layouts, unsolved configurations or recoverability failures. If changing it, rerun `node test-model.cjs` and `python build.py` before publishing.

## References, scope and licensing

The imported Awesome Open Source Games skill led to [wwwtyro/Astray](https://github.com/wwwtyro/Astray). Its actual entry point, maze generator, render setup, keyboard/Box2D loop and Unlicense were read at commit `d3c4f61f2cbbe35752fbfa205f85a41d7f9fe0f0`. This package directly adapts its recursive square-maze generator, replacing unseeded randomness and implicit globals with a seeded, validated function. The modern quarter-turn controller, puzzle curation, solver, collection, saving, interface, graphics and sounds are new. It is not a port of the complete original game. No upstream bitmap, legacy Three.js, Box2D, jQuery or keyboard library is included. See `SOURCES.md` and `ASTRAY-LICENSE.txt`.

Rezona spatial references inspected during selection: [Fracture Point](https://rezona.ai/game/pgcserver/pv/gabSFRUb/v13/dist/index.html), including Begin/Skip and the first chamber, and [the public Monument Valley interpretation](https://rezona.ai/game/pgcserver/pv/DajkmMXU/v1/dist/index.html), including its language switch, first path and a native drag that visibly moved the traveller. No full reference completion, successfully used portal or verified gravity-rotation mechanic is claimed. The earlier traveller/rotating-bridge game in this workspace was excluded; ORRERY RUN uses a distinct quarter-turn sliding-core puzzle. No Rezona code or assets are copied.

Art direction: the user's [industrial machinery atlas](https://mygamesartstyle.jupiterthewarlock.com/styles/industrial-sci-fi/). The enlarged second Dyson Sphere Program screenshot was actually viewed for nested hard-surface frames, metal panels, repeated structural parts, transport/circuit traces, restrained warm/cool lighting and functional energy lights. This original small observatory, maze, drone, cores, controls and effects do not copy that game's structures or complete interface. No image generation or commercial game artwork is used.

Original code and art are MIT; the adapted generator is Unlicense/public domain; Three.js r147 is MIT. All required notices are included. See `LICENSE.txt`, `ASTRAY-LICENSE.txt` and `THREE-LICENSE.txt`.

## Validation

`node test-model.cjs` drives twelve normal turn/step campaigns, solves each shortest route, checks all reachable decision states for a route to victory, samples the actual animation against rendered wall dimensions, serializes interrupted turns and warps, and checks free undo, off-route hints, idempotent rewards and invalid saves. `qa-model-report.json` records routes and counts. These checks are distinct from native browser input, visual inspection, physical handset tests and a subjective commercial platform grade. Public-file and immutable-ZIP verification are recorded separately outside the package.
