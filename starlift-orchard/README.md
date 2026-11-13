# Starlift Orchard · A little lift

A mobile-friendly English HTML5 tractor-beam harvest game. Hold the green button for an automatic sweep, or hold and drag on the orchard to steer. Gather floating fruit in a growing beam, build a chain, and release to fling lifted objects. Thorn burrs damage the ship if drawn into its airlock; a released burr touching the field edge turns into starfruit. A missed falling fruit in the upper airlock strip can become a burr, following the source risk/reward rule.

Flights last 32 simulation seconds, or end when the ship loses all hearts. One medal is awarded on ending, another for meeting the fruit quota, and another for a full flight with no bumps. Best medals per flight index count toward permanent unlocks; replaying the same flight only improves its best medals, while completed flights earn fresh coins. Coins bank explicitly at the result screen; retries discard the active unbanked harvest.

## Progression

- 3 medals: Pulse turns all current burrs golden; cooldown starts at12 seconds.
- 7 medals: starfruit joins natural spawns and yields triple catch value.
- 12 medals: bubble fruit purifies one remaining burr when caught.
- Four gear lines, three levels each: wider beam, stronger pull, extra hearts, shorter pulse cooldown. These alter physical parameters, not merely scores. Fitting gear is blocked during a flight.
- Nine grove names, three gentle presentation tints and new seeded layouts continue as flight indices increase. Difficulty and quotas cap; this is procedural replay, not unlimited authored biomes. Some starting objects are deliberately familiar to teach collection. The meadow is a compact collection field rather than a freely explorable world.

## Run / build

Serve this folder over HTTP, e.g. `python -m http.server 8000`, and open index.html. The prebuilt game.js and all images/font are included. No account, payments, telemetry, CDN, WebGL or backend is required. Browser file-URL policies vary; use HTTP or static hosting.

Node dependency: esbuild0.25.12. Install with `npm install --ignore-scripts` or `pnpm install --ignore-scripts --frozen-lockfile` (the platform binary is provided as an optional registry package). Run `node build.mjs` to build. Tests: `node build.mjs --test`, then `node --test .test-bundle.cjs`. The build script resolves paths relative to itself. Original selected source and license are in upstream/ and NOTICE.md.

Touch: hold/drag the scene, or hold the large Lift button. Release to fling. Keyboard: hold Space, A/D or arrows steer, B pulses, Escape pauses. Keyboard activation with Enter on the focused Lift button toggles lift as an accessible alternative. At least44px controls; portrait and landscape layouts. Sound defaults off and starts only after user input. Decorative drawing is capped near30fps; physics uses fixed60Hz steps with bounded catch-up. Tab hiding/blur pauses, releases held input and saves. Reloaded active flights open paused. Reduced-motion removes decorative particles; gameplay motion remains necessary.

Progress is stored locally. Clearing site data removes saves; storage failure does not prevent play. See BROWSER-QA.md and test-report.txt. Browser viewport tests are not physical iOS/Android certification. Runtime assets total a few MB; weak devices may still render more slowly.
