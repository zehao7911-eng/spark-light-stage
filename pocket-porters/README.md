# Pocket Porters

An original complete HTML5 furniture-moving game. Drag the selected furniture, turn it through a narrow doorway and pack the little truck. Twelve authored room layouts across a sunny apartment, tiled café, planted glasshouse and music room. No account, payment, lives, mandatory timer or external CDN. All game text is English. No image generation was used.

## Play

Serve this folder over HTTP/HTTPS (`python -m http.server 8000` for local use). A modern WebGL browser is required. Drag the selected item anywhere relative to its starting position. The little movers follow toward your drag endpoint after release, stopping at a wall or other furniture. Tap an item or its lower label to select it; tap TURN for a quarter-turn when the final orientation has space. Quarter-turn collision checks use the final axis-aligned footprint, rather than a full swept rigid-body solver. If a doorway blocks an item, try turning it or giving it more room. Loading is automatic at the striped ramp in front of the truck. A drag endpoint over the ramp gently centres the destination to reduce tiny alignment demands; wall collisions still apply. Other unshipped furniture is solid; deciding which item to move first can open a route.

Keyboard: arrows or WASD move the selected item, Space turns, Escape pauses. Sound toggle, pause, help, restart confirmation and postcards are available. There is no time-limit failure; pace is an optional stamp goal. All items packed gives one stamp, at most two wall bumps another, and finishing under each job's displayed time another. Best stamps per job count toward the album; replay does not farm more stamps. Six stamps unlock Mint/Sunflower truck paint selection, twenty-four add a gold truck badge on subsequent builds. Actual renderer thumbnails of visited fresh jobs form the postcard album. These are screenshots, not generated illustrations.

The first job is a straight one-drag sofa move. The second introduces quarter-turning through a narrow door. Later jobs change real partition geometry, offset doors, item shapes, item order and routes; some require returning around a counter or taking an item out first. All twelve can be replayed from unlocked postcards. Completing the last job starts a fresh day with the same authored rooms and retained album, not infinitely new maps.

## Reference and quality direction

The user's supplied Harbor Haul V2 benchmark (https://static-oss.neon-arcade.ai/playwave/prod/sites/temp/HARBORHAULV2-q9c8rk/index.html) informed the coherent sunny postcard world, clear everyday objective, visible loading state and matching UI. Its tea-crate pickup was actually completed in a prior review; a full delivery was not claimed. SMG Studio's official Moving Out page (https://www.smgstudio.com/movingout/) and Steam listing (https://store.steampowered.com/app/996770/Moving_Out/) were read for the broad furniture-removal premise. Earlier work used Moving Out 2 as a loose luggage reference; this game has independently authored room-clearance controls and furniture, not the old luggage-gulp loop.

No reference source, models, textures, characters, fonts or sound were copied. An initially inspected Rezona Unhome opening was a first-person room game and was discarded as a mechanic reference. This is an independent small single-player game; it does not reproduce the commercial game's co-op, damage, throwing, campaign or art, nor claim an A/S grade or minimum-guarantee approval.

## Art, audio and mobile

All runtime art is code-authored original Three.js geometry: rounded upholstered sofa/bench cushions and buttons, chair, leafy plant, floor lamp, drawer cabinet, piano with individual keys and nameplate; two tiny uniformed movers with hands, faces, hats, walking feet and carry poses; thick timber/tiles/stone floors, inset windows, shutters, rugs, café counter crockery, greenhouse plants, music curtains/drums, cutaway walls, ramp, pavement, street lamps and a moving truck with cabin, windows, wheels, timber bed, lights and plate. A shared warm paper/mint/coral palette and matching original SVG icon/cards tie it together. The cover is an actual runtime screenshot.

Mesh batching reduces static draw calls. Fixed 120Hz constraint simulation, render target40Hz, DPR1.5 cap, one1024 directional shadow map, bounded crew/furniture, short-lived confetti and bounded audio voices. Motion is kinematic collision-limited carrying, not a full general furniture/soft-body physics engine. Decorative back-wall props are scenery; the room partitions and other cargo define the collision model. Actual handset performance is not certified. Browser phone/landscape checks are reported separately.

Local storage keeps active item positions/orientations/loading flight, selected item, counters, best stamps, unlocks, sound and postcard thumbnails. Reload is paused with pointer/key/target commands released. It does not resume a previously held drag. Blocked storage leaves the current session playable. Pause/blur/hidden tabs stop simulation, drawing and audio; resize/cancel releases input; graphics loss offers reload. A completed reload returns to results without awarding twice.

## Source and validation

`core.js` contains the independent deterministic collision/loading rules and twelve layouts. `view.js` creates the world and animations. `app.js` owns pointer/keyboard input, menus, audio, rewards and browser persistence. `node tests.cjs` finds legal routes and then actually executes ordinary select/point/rotate/step APIs through all twelve jobs, including a wide-sofa narrow-door rejection and successful turn. It also checks finite values, invalid controls/saves, partial loading-flight restore, idle no-progress and terminal immutability. The grid-search test controller is not a human completion-time or difficulty claim.

`python build.py [node-path]` runs checks, fingerprints resources and writes the game-only POCKET-PORTERS.zip. Browser native-input play, art review and responsive checks are separate from model tests.

Bundled Three.js r147 is MIT, copyright its authors; complete notice in THREE-LICENSE.txt. All other game code, original SVG and runtime art in this package may be edited and redistributed; retain the third-party notice.

