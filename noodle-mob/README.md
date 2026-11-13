# NOODLE MOB

Little chef. Big slurp.

Lead a dumpling chef across a toy kitchen table. Gather a springy train of snacks, then take them to the bowls with matching snack pictures. Serving six snacks charges **BIG SERVE**: tap it with a loaded train to launch a multi-bowl delivery cascade.

- **Phone / mouse:** drag anywhere on the table to lead the chef. You can also tap a snack or bowl for a guided route.
- **Keyboard:** arrows or WASD to move; Space for BIG SERVE; Escape to pause. Snack and bowl buttons also support Tab and Enter.
- Red peppers cause a sneeze. Up to two tail snacks tumble back onto the table; pick them up again. Served food stays safe. A short protection bubble gives you time to recover.
- New tables wait for your first action. There is no timer or life counter.

Nine services take place in a sunny kitchen, a pastel tea trolley and a warm night-market truck. Later tables add solid rolling pins, teacups, a moving belt and a rotating tabletop. Clear all nine to unlock a bounded, continually remixed **Endless Buffet**.

The Slurp Book keeps nine illustrated dishes and your best stars. Earn stars for finishing, carrying a train of at least three snacks (one in the introduction), and sneezing no more than twice. Six, fifteen and twenty-four total stars unlock mint, berry and lilac noodle trims. Replays improve bests without farming a currency.

## Run / upload

Upload the contents of this folder or the root-index ZIP to static HTML5 hosting. `index.html` must be at the root. For local development, run `python -m http.server 8080` in this folder, then open `http://localhost:8080`.

No CDN, remote engine, login, backend or paid service is required at runtime. Sound starts only after a user gesture. Progress uses this game's own browser-local storage key, `noodle-mob.v1`; private browsing or blocked storage can prevent saving.

## Source / checks

`core.js` contains deterministic movement, collision, routing, food conservation, deliveries and save validation. `levels.js` contains the authored services. `art.js` renders measured transparent sprites and live effects. `app.js` handles real input, progression, sound, pause and persistence. The game uses Canvas 2D with original pre-rendered toy-clay artwork, not a real-time 3D mesh scene.

Run `node test-core.cjs` for the model checks. Run `python build.py` for a deterministic game-only ZIP. All delivered art and code are local. The eight full-resolution original PNGs are retained separately by the author; WebP versions and the full generation prompts are included here.

See `CREDITS.md`, `QA.md`, `ART-PROMPTS.json` and `assets/art-manifest.json`.
