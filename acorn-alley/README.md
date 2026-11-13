# Acorn Alley

An original small HTML5 woodland bowling holiday. Swipe upwards anywhere to roll an acorn into toy mushroom pins. Knock them all down, collect optional golden acorns and visit the next lane. Unlimited rolls, no lives, accounts, payments or failure timer. All visible text is English. All art is original code-authored geometry and SVG; no image generation was used. The cover is an actual game screenshot.

## Play

Serve this folder using any static HTTP/HTTPS host, such as GitHub Pages. For local testing, `python -m http.server 8000` and open localhost:8000. WebGL is required. All resources, including Three.js r147 and Matter.js 0.20.0, are local. No remote fonts, CDN, analytics or backend.

- Swipe upwards anywhere. The direction aims the roll; longer swipes give more power. The dotted preview is an initial aiming guide with side-wall reflections, not a prediction of moving gates, pins or bumper collisions.
- You can also tap ROLL for the current aim. Keyboard left/right adjusts aim and Space rolls. Escape pauses.
- Hit pins topple and collide with other pins. The acorn returns automatically after a completed roll; fallen pins move onto the rear score shelf, while standing pins stay where physics left them. Keep rolling until every pin has fallen.
- Raised mint bumpers and timber rails bounce the acorn. Later gates move laterally. There is no hidden requirement to bank a shot.
- Each lane awards up to three stars: clear every pin; use no more than its stated roll goal; collect every optional golden acorn. Best stars per lane count once. Six stars unlock Chestnut paint; fifteen unlock Golden. Choose the ball in the lane book. Clearing the final lane starts another holiday through the same nine layouts, not infinitely new maps.

## Content and art

Nine authored layouts: first a three-pin straight roll, then a full ten-pin triangle, separated banks around a central bumper, angled rails, a two-bumper pond, a moving gate, split corner banks behind a barrier, a staggered lantern lane and a mixed final cup. Three coordinated settings share the same core miniature board, with changed surroundings and obstacle geometry. These are nine configurations, not nine unrelated worlds.

Original rounded acorn with cap scales and stem, spotted mushroom toys, a scarf-and-cap squirrel host with breathing/tail/cheering motions, multitone planked lane, inset brass studs and velvet gutters, raised wooden frame, cloth pennants, readable roof sign, lanterns, leafy borders, little flowers, pond lilies and fairground ornaments. The acorn rotates according to its travel, pins animate their tilt from actual collision state, collected pins appear on the score shelf and real counters illuminate the back-board lamps. Short wood-grain clacks, rolling noise, nut chimes and chain pitches are original synthesized audio, unlocked by the first interaction. Sound can be muted.

Reference selection checked the user's prior-game catalog and current Rezona library. Teddy Skyways was opened and its flight title/start screen inspected, then discarded as a gameplay reference. No reference game's source, models, textures, images, characters, UI or audio were reused. This is independent woodland bowling, not a commercial recreation or an asserted platform grade.

## Persistence and implementation

Save stores active pin and ball positions/velocities, fallen/cleared states, collected nuts, rolls, gate clock, unlocked lanes, best stars, ball paint and sound. Reload opens paused and releases uncommitted swipe input. A won save returns to results without duplicate rewards. Pause, hidden tabs and blur stop simulation and silence audio. Pointer cancellation and resize release aiming without launching. Blocked storage leaves the current session playable. Graphics loss offers reload.

Physics uses fixed 120Hz Matter.js planar rigid circles, bodies and obstacle contacts, displayed as a 3D diorama. Pins topple when an actual collision exceeds the impact threshold; their visual fall is interpolated. This is a deliberate approximation, not a fully three-dimensional rigid-body bowling solver. Contact caches are rebuilt on restore, so overlapping contacts can settle differently even though saved poses/velocities are restored. Cosmetic particles/poses are not saved. Gate movement is kinematic and horizontal. Scene picking, aim and every pin use the same lane coordinates.

Renderer target40Hz, DPR1.5 cap, one1024 shadow map, static mesh batching, cached geometry/materials, bounded110 particles and14 short audio voices plus one rolling loop. No physical-handset performance certification; responsive browser checks are reported separately. A modern WebGL-capable phone browser is required.

`core.js` contains physics/rules/layouts; `view.js` the independent 3D art and animation; `app.js` input, menus, audio, persistence and rewards. `node tests.cjs` exercises all nine layouts by ordinary launch/step APIs, validates opening straight strike, midroll restoration, invalid input/save rejection and immutable completion. Its angle-search controller is not human timing or difficulty evidence. Native browser play is checked separately.

`python build.py [node-path]` fingerprints resources, runs tests and writes ACORN-ALLEY.zip. Retain THREE-LICENSE.txt and MATTER-LICENSE.txt when redistributing the bundled libraries. Original game code, SVG and procedural art may be modified and redistributed with those notices.
