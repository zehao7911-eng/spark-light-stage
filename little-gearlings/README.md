# Little Gearlings

An original tactile gear-linking workshop. Drag a spare brass gear onto an empty axle, connect the green drive to the coloured endpoint and watch a mechanical toy awaken. The opening flower needs just one gear. Six original automata and twelve peg layouts introduce gentle route puzzles without timers or lives.

## Play and run

Serve this folder over HTTP (`python -m http.server 8000`) and open localhost:8000 in a WebGL-capable browser. Assets and Three.js are bundled; no CDN, account or server API is needed.

- Drag from the cream spare tray to an empty peg; tapping an empty peg also places a spare.
- Movable gears can be dragged to another peg or returned to the spare tray. The green drive and coloured endpoint are anchored.
- Touching gears form a square-grid connectivity graph. Drive-connected gears turn in alternating directions. Connecting the endpoint fills its awakening meter in about two seconds; breaking the connection drains it again.
- Undo reverses the last layout change. The hint button highlights a next empty peg on a shortest valid route; it does not auto-place or complete the puzzle.
- Keyboard: Tab to the accessible board buttons, Enter to place/remove a gear. Escape pauses. Board coordinates and anchored gears have English accessible names.
- Completion unlocks the next layout. Six distinct toys: daisy, ladybird, fish, balloon, moth and little sun. Six encore layouts use new peg starts/endpoints and obstacles, rather than palette-only repeats.
- Three stars for the minimum placements; two within three extra moves; one for completion. Undo counts as a move, and replay retains the best rating without duplicating completion.
- Local storage preserves active board, undo stack, gear angle, awakening state and cabinet. Reload begins paused and clears any held drag. Clearing or blocking storage can remove/prevent saves. No offline progress is awarded.
- Blur/hidden pages pause automatically. Resize and pointer cancellation release a drag without silently spending or deleting a gear. All audio is synthesized and starts after interaction.

## Reference and assets

Reference inspected and attempted: Rezona Tiny Crew — ASMR Macro Maintenance, https://rezona.ai/game/pgcserver/pv/ZFiGfVyw/v15/dist/index.html . Started the diamond job, tried the drill with Space, switched to air blower with key 4 and held Space. The displayed total remained 0%; no completed reference repair is claimed. Its broad hands-on restoration and object-detail presentation inspired this independently written gear-linking toy workshop. No reference code, artwork, models or audio are copied or redistributed. Fracture Point's introduction was viewed and rejected as unsuitable for this simple-control project.

All live 3D geometry is original procedural work: rounded wood workbench, felt board, thick twelve-tooth gears with central and four radial cutouts, axles, engraved rings, wires, tray, mechanical toy parts, tools, lamp, jar, books and fern. Wood texture and soft reflection cubemap are generated in code. This is an approachable grid mechanism visualization, not an engineering-grade gear/contact simulator. Powered connectivity and opposite rotation are computed; tooth engagement is stylized.

Three.js r147 is bundled under MIT; original header and THREE-LICENSE.txt retained. Cover and icon were created with OpenAI's built-in image generator using an actual gameplay screenshot as reference. They are promotional illustrations with more surface detail than realtime meshes, not claimed screenshots. Exact prompts and original filenames are in ART-PROMPTS.json. No paid CLI generation or extracted third-party game assets were used.

## Verification and limits

Run `node tests.cjs` for all twelve normal placement-route completions, connected-gear states, fixed peg/blocked peg rules, spare counts, undo, relocation/return, idle no-win, deterministic active-state restoration and invalid-save checks. `python build.py [node-path]` fingerprints runtime assets, runs tests and creates a deterministic game-only ZIP in the parent folder. Browser GUI checks are separate from model tests.

The responsive HTML5 game targets mobile browsers and desktop. It is not a native APK. DPR is capped at 1.5; one 1024 shadow map and bounded effects are used. Phone-sized browser tests are not physical-handset certification or a guaranteed frame rate. No S rating, one-to-one reference recreation or commercial-engine physics accuracy is claimed.
