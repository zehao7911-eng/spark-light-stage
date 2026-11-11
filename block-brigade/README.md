# BLOCK BRIGADE

Every window, someone's world. A complete original English, mobile-friendly 3D arcade rescue game using the supplied swimming video's cohesive block-built character and environment direction in a new setting and interaction.

## Run

Open `index.html` or `standalone.html`, or host the folder on any static server/GitHub Pages. Both entries embed all runtime code, the Three.js library, procedural models, icons and synthesized sounds. The ZIP contains a playable index at its root. No CDN, account, downloaded GLB, image generation, external font or GameWave SDK is needed to start. WebGL is required; unavailable/lost graphics show a reload action.

## Play

Respond to the call, watch/skip the arriving-engine introduction, then hold a glowing window to spray. Drag to another window to redirect. Clear all fires, then tap each green rescue marker. A ladder extends, the resident climbs down and runs along the pavement to the safe gathering point. The camera rises during rescue to keep the ladder clear of the foreground engine. Café awnings retract while the ladder is deployed so the exit route stays clear. The operator and crew celebrate in their actual scene positions after success.

Release between bursts to refill water pressure. An empty pump temporarily stops the spray and costs an optional star; it does not charge a retry or instantly fail the call. The first ready screen waits indefinitely. After the first committed interaction, a generous mission timer runs until success/timeout, except while paused/hidden. Extinguished windows stay extinguished; partially suppressed fires slowly regain heat. There is no surprise spread into previously cold windows.

Six finite authored calls span Maple Street café apartments, Harbour Quarter warehouses and an evening Old Town clock building. Calls introduce more fire positions and one, two or three residents. After two cleared calls, the optional **Foam Nozzle** becomes available in the field/dispatch board. It uses pressure faster but actively suppresses adjacent windows on the same floor, reducing the time needed on later targets. This is a real gameplay change, not a palette-only upgrade. Wind values change the visual smoke drift, not the accuracy of the assisted window targeting.

One star for completing the call, another for never emptying the pump, and another for the authored target time. Best-only stars and scores are saved; revisiting a result cannot multiply them. A clear unlocks the next call. Six calls and eighteen service stars form a finite replayable collection, not endless unique neighbourhoods. Retries are free.

Keyboard: Enter responds/skips an intro; hold 1–9 to spray a numbered window; hold Space to spray the selected window (or first remaining fire); R rescues an eligible green window; Escape pauses. A number also selects a rescued-window action when appropriate. Pointer cancellation, lost capture, pause and backgrounding release the hose.

## Artwork, model detail and scene construction

All characters, equipment, vehicles, buildings, windows, rooftop equipment, furniture, trees, street props, text textures, flames, droplets, smoke, glass fragments and sound are original procedural code. People share the same block scale and color pipeline. Firefighters have articulated shoulders/elbows/legs/head, helmet/visor, reflective jacket bands, radio, breathing tanks, gloves and boots. Residents wave at windows, descend on the ladder, run to the gathering area and celebrate. The fire engine has a cab, glazing, bumpers, headlights, warning beacons, six equipment shutters, wheels, roof deck, visible supply hose and hand nozzle.

The three areas have distinct facade materials, retail awnings/planters, warehouse crates/vents and an Old Town rooftop clock. Neighbouring shops, background buildings/cloud blocks, trees, lamps, parked cars, bystanders and cordon rails surround the operation. Bricks, smoke, water-stream segments and glass fragments use instancing/bounded pools where appropriate. Lit fire changes to steam, damp glass/walls and a green rescue state. Rebuilt scene-owned textures/materials/geometries are disposed while shared cached geometry/materials remain alive.

This follows the reference video's readable block modelling and complete 3D venue presentation; it does not use the reference's original models, source, video frames, sound or swimming rules. Three.js r147 is bundled under MIT; the original library header and `vendor/THREE-LICENSE.txt` are retained.

## Local saves and GameWave

The only localStorage key used is **block-brigade-v1**. It stores this game's profile and exact current call state: heat/out/wet flags, residents, pressure, elapsed time, nozzle mode, score, ladder target/time and whether the real round has already begun. Reload opens an unfinished call paused. A held spray restores released; a rescue can resume at its saved ladder progress. Other games' localStorage is never enumerated, uploaded or cleared.

`sdk.mjs` is scoped to this game and is called by actual interactions, completion and save logic. `gameStart` corresponds to the first accepted hose/rescue action, and the committed Resume of an already-started restored call. The restored core may be ready with existing progress and no new initial-start event; the controller still starts that host visit once. `gameOver` occurs on actual success/timeout or explicit abandonment for another call. Pause, result viewing, registration and duplicate callbacks do not invent rounds. Standalone startup never depends on SDK injection or successful cloud/listener calls.

Optional `onLike`/`onComment` registration independently checks methods and async code 0. It contains rejections, bounds retries/timeouts, checks scene/SDK generation, and disposes returned listeners including late resolution after exit. A positive direct like (`status === true`) grants the visibly gold operator helmet; an unlike grants nothing. A successful direct comment, including string `content: ''` for an image-only comment, grants visible success-confetti particles. Registration itself grants nothing. Both rewards use the actual durable `claim` function; flags survive local/cloud merges and duplicate events. Optional details appear only in the dispatch board when supported. There is no undocumented host-social-UI opener or gameplay gate. Project IDs remain strings, and count snapshots are not used as event IDs.

Cloud accepts a direct `{game:'block-brigade',v:1,...}` object or an empty object. It monotonically merges this game's stars, best scores and cosmetic flags. Local settings/current in-progress call stay authoritative so a late cloud reply cannot reset play. Full own-game snapshots are saved. A nonempty foreign-game cloud object is not overwritten. Hanging cloud operations cannot block rendering/input. Device density is not used to multiply CSS viewport dimensions. These flags are not a server-verified globally exactly-once reward promise across devices or storage deletion.

The official [GameWave document](https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh) was rechecked on November 5, 2026; it still displayed October 30. Its independent startup, direct callback fields, async registration/unsubscribe and direct save rules were applied.

## Build and validation

Run `node build.cjs` to regenerate both self-contained entries. `node tests.mjs` runs 57 deterministic gameplay/GameWave mock checks covering all six clears, star/score deduplication, timeout loss, first-action waiting, pressure recovery, actual foam neighbour suppression, progressed-ready reload, mid-ladder continuation, valid snapshots, own/foreign cloud state, absent/partial/late SDK, genuine like/unlike/image-comment semantics, one-time flags after reload, async failure, cleanup races, bounded registration retries and a resumed ready-with-progress session ending exactly once.

Evidence states are separate:

- Source and deterministic gameplay checks: passed.
- SDK adapter mock checks: passed; these are not real GameWave App events.
- Local browser actual inputs: Dispatch 1 completed in about 11 seconds with 3 stars/1300 points; Dispatch 2 completed with both residents safe, 2 stars/2400 points and foam unlocked. A timeout and free retry were also observed. Dispatch 3 foam left the selected window extinguished and the neighbouring fire at 62%; reload preserved this progressed ready state, nozzle and score, then a new real rescue action was accepted. Native 390×844 portrait layout, live flames, ladder route and elevated rescue camera were inspected. A discovered truck-intersection route was corrected before delivery.
- Public served entry and pinned ZIP: verified at release; external evidence records the commit/hashes without changing the game archive afterwards.
- Physical iOS/Android and actual supported GameWave App import/like/comment callbacks: not tested here. They remain required before claiming platform certification.

High quality caps pixel density at 1.35 with one 1024px shadow map; low quality uses density 1/no shadows. Portrait drawing targets approximately 30fps, desktop high approximately 40fps. The bounded simulation clock is independent of compositor RAF throttling. Paused/hidden pages stop gameplay and new sound. Optional audio/storage failures do not block normal play. `artbook.html` is a developer-only live scene contact sheet requiring HTTP for its source module imports; the actual game entries remain self-contained.

## Music

The game loops the audio track supplied for this build.
