# BREACH CIRCUIT

Move the exit. Drop the core. Break the glass.

A self-contained English HTML5 portal-physics game. Drag the amber exit along the side or ceiling rails, then press **DROP CORE**. The sphere falls into the cyan inlet, emerges inward from your exit, and ricochets through specimen glass. The first chamber starts already aligned: one drop gives the first two-capsule chain.

Glass stays broken between drops. **RECALL** immediately retrieves a flying core without removing hits. **UNDO** restores the previous drop, including glass, score, exit and drop count. Both are free. **GUIDE** highlights a preset that reaches remaining glass; it does not move the exit or drop for you. Guide use stays recorded through Undo.

Twelve chambers introduce round bumpers, angled metal deflectors, double-bank routes and denser specimen arrangements in three laboratory environments. Clear all twelve to unlock seeded **Field Tests**, with carried score, distinct target arrangements and bounded physics objects. These are compact single-screen physics challenges, not a full first-person adventure.

## Controls and rewards

- Finger / mouse: drag on the chamber to move the exit to the nearest rail. Tap **DROP CORE**; the same button becomes **RECALL** in flight.
- Keyboard / accessibility: Tab and Enter select labelled rail presets. Space drops or recalls with the chamber focused; Z undoes; H highlights a guide; Escape pauses.
- Earn three best data marks per chamber: break all glass, finish within the displayed gold-drop target, and finish without Guide. Replays retain maximum marks and score; they do not duplicate a currency.
- Amber, magenta and lime energy cores unlock at 6, 18 and 30 total marks. They change the rendered core and energy trail, not the physics.

No lives, countdown, account, advertisements or paid items. A miss automatically recalls the core after a short flight; all previous hits remain. You can recall sooner at any time.

## Run / upload

Serve this folder over HTTP, for example `python -m http.server 8080`, or upload the root-index ZIP to HTML5 hosting. All images, scripts and synthesized sound are local; no CDN or third-party engine is required. Progress uses the browser-local key `breach-circuit.v1`. Blocked storage leaves tab-only play available.

`core.js` implements fixed-step motion, teleport direction, wall / bumper / deflector contact, swept capsule hits, recall, undo and save validation. `generator.js` generates reachable target layouts from actual simulated trajectories. `chambers.js` contains the frozen twelve-chamber campaign. `art.js` combines original pre-rendered material artwork with live portal rings, motion trails, glass fragments and collisions. `app.js` handles real input, progression, persistence and synthesized audio.

The game is Canvas 2D with a side-view 3D art treatment; it is not a real-time first-person 3D renderer. Gold targets are generous drop budgets derived from tested discrete routes, not a claimed global optimum over every possible continuous exit position.

Run `node test-core.cjs` for the independent model checks. Run `python build.py` for the deterministic game-only ZIP. See `CREDITS.md`, `QA.md`, `ART-PROMPTS.json` and `assets/art-manifest.json`.
