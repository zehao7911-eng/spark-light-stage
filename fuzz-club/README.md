# Fuzz Club

Swipe the fluff. Untie the little tangles.

An original tactile woodland grooming game. The public **Needlesta / Needlestack** reference on [Rezona](https://rezona.ai/game/pgcserver/pv/DKkkOgxz/v5/dist/index.html) was opened and its dense fibre pile, close-up hand/shovel/blower tools and presentation inspected. Tool switching was verified, but attempted removal input in the embedded reference did not change its cleared counter. We do not claim a completed reference playthrough. Fuzz Club independently changes the concept to brushing woolly mascots, rather than first-person hay searching. No reference code, images, sound files, characters or interfaces are redistributed.

## Play

Serve this directory over HTTP, e.g. `python -m http.server 8000`. Open localhost:8000 in a WebGL-capable browser. Everything needed to run is bundled; no account, CDN or backend is required.

- Swipe across the fluffy coat. The comb bends individual wool tufts and smooths the bedhead.
- Brush over the visible little knots until they pop. Consecutive pops play a short rising chord.
- Reach at least 90% smoothness and release every knot for a happy guest. Finishing tidies the last few cosmetic tufts and awards a bow and a locally saved photo.
- Six guests have distinct colours, ears, faces and body details. Later guests have more knots and gentler smoothing per stroke. There is no clock or loss condition.
- Tap the nose for a little boop. Keyboard: arrows move the comb; Space or Enter brushes a patch. Escape pauses.
- The album opens completed guests for replay and unlocks the next guest. Completion is recorded once; replay does not duplicate entries.
- Local browser storage keeps coat state, tuft spring positions/velocities, tangles, progress and earned photos. Reload begins paused and releases held touch. Clearing site storage removes the local album. Private/blocked storage may limit persistence.

## Source, assets and limits

`core.js` is original seeded grooming logic and damped per-tuft bend dynamics, with local brush falloff, tangles and validated saves. `view.js` renders 839–842 tufts per guest as three instanced rounded wool segments per tuft, plus original procedural mascots, faces, comb, chair and particle effects. These are live 3D objects, not flattened cover sprites. `app.js` provides native controls, touch capture/cancellation, keyboard input, page-hide/blur pause, local progress and original synthesized brushing/pop sounds.

Three.js r147 is bundled under MIT with its original header; see `THREE-LICENSE.txt`. Background and cover/icon were generated for this original project with OpenAI's built-in image tool. The cover references an actual game screenshot and the same studio background. It is promotional artwork rather than a screenshot. The icon is resized from that square cover. Exact prompts and original filenames are in `ART-PROMPTS.json`. Live wool/wood geometry, felt bump texture, UI and synthesized audio were created in code.

Earned album pictures are generated from the real live character render. Their framing uses the projected full character bounds and contains the image without cutting off ears or feet. Photos stay on this browser and are not uploaded.

Run `node tests.cjs` for all-six-client completion via ordinary brush methods, partial opening feedback, spring movement, exact mid-groom continuation, idle/invalid-input guards and reward idempotence. `build.py [optional-node-path]` adds cache versions, runs checks and creates a reproducible game-only ZIP. These model checks are separate from native browser playtests.

Responsive checks target 320×568, 390×844 and 844×390; controls are at least 44 CSS pixels. Renderer density is capped at 1.5 and rendering at approximately 40 FPS. Viewport tests are not physical phone certification. This is a simple original tactile grooming game, not an identical reproduction or a full professional hair simulator.
