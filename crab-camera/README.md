# CRAB CAMERA
An independently written HTML5 / WebGL underwater photo safari. Tap the seabed to walk, get close to the glowing subject ring, then SNAP. The first animal is already in range so the first action produces a real photo reward. Six original rounded sea creatures, three dioramas, eighteen journal slots. No failure timer, purchases, combat or external service. Actual camera-rendered JPEG photos are stored locally in your journal; partial expedition position and discoveries survive reload. Walking destination is intentionally not restored.

Reference: Rezona What Does the Crab Hide, https://rezona.ai/game/pgcserver/pv/pyWJxSDR/v7/dist/index.html . Actually opened public game and attempted WASD/Space; observed photo flash and miss feedback, reference HUD remained0/6 and0/3. No reference completion claimed. This version independently reimplements the explore/approach/photo loop with tap movement, original procedural art and three compact underwater scenes. It is NOT a pixel-identical copy or source extraction. Reference logos, bitmap assets, characters and scripts are not included.

Serve this folder using `python -m http.server 8000`, open index.html. ZIP entry point is at root; no build, CDN, account or backend. Desktop arrows/WASD choose steps, Space snaps; touch/mouse tap floor then SNAP. Pause/audio/journal controls available. Hidden page pauses; sound begins after user action. WebGL is required. DPR1.5,1024shadow cap,32ambient bubbles. Portrait, narrow phone and landscape browser layouts checked; physical handset not tested.

Run `node tests.mjs` for three complete six-photo routes, save roundtrips, inventory uniqueness, terminal rewards, movement bounds and invalid delta checks.

Original code and procedural models MIT; bundled Three.js147 MIT in THREE-LICENSE.txt. No proprietary reference assets reused. Icon original SVG. Cover is an actual rendered game capture. No generated promotional art.
