# Bellbird Rally

An original small evening garden rally, built for touch and desktop browsers. Hold and slide a wooden paddle under the glowing landing ring. Return a feather shuttle to light wind chimes, string four returns together for a chorus, and send a return past a golden bell for an extra chime. A miss creates a splash and another chance. No timer, lives, purchases or account.

## Run

Serve this folder over HTTP, for example `python -m http.server 8000`, then open localhost:8000. A WebGL-capable browser is required. All runtime dependencies and assets are bundled; no CDN or remote backend is used. Do not rely on opening index.html directly from a ZIP viewer.

- The shuttle waits for your touch; after a short release grace period, it rests in place until you continue.
- Hold and slide anywhere on the unobstructed play area. The white landing ring shows where the incoming shuttle will meet the paddle.
- Keyboard: hold left/right arrows to move; hold Space to keep the paddle active in place. Escape pauses.
- Fill the garden's chime meter to finish and unlock the next garden. Six gardens introduce high lobs, alternate side placement, alternating fast/low shots and gentle crosswind with different palettes and birds.
- Every four uninterrupted catches award two extra chimes. A central catch is a sweet spot. Missing resets the current rally but preserves lit chimes.
- Garden album stores completed gardens, best rally and best star rating. Replay does not duplicate completion. Three stars for no misses, two for at most three, one for completing.
- Local storage saves exact active simulation and album; reload begins paused, releases held input and does not award offline progress. Blocking or clearing browser storage may prevent persistence.
- Hidden pages, window blur and interruption pause the game; resize releases touch capture. Sound starts only after user interaction. Reduced motion disables impact camera shake.

## Reference and originality

Inspected and attempted the public Rezona Hit'em — Neon Batting Center at https://rezona.ai/game/pgcserver/pv/gabSFeBe/v9/dist/index.html. Started a round, used Space to swing, saw its aim reticle and different pitch speeds. No scored hit was verified in the reference. This project borrows the broad anticipation/contact/return feedback idea and implements its own garden rally, movement, chime progression, mascots, scene geometry, shaders, sound and interface. No reference code, models, images or audio are redistributed. Rezona's catalog and another crab game's introduction were also viewed but its gameplay was not used.

## Artwork and technology

Live Three.js scene uses original rounded procedural meshes: woven wooden paddle, feather shuttle, bellbird, thick ceramic pool rim, wooden platform/fence/lanterns, bell clappers and ribbons, tiny tea set, basket, willow leaves, lotus flowers and swimming fish. Water ripple shader, contact light, ground ripples, hit sparks, feathers, bird/wing motion and progress lantern glows are generated at runtime. Three.js r147 is bundled under MIT, with license retained in THREE-LICENSE.txt and its original header.

Cover/icon are original promotional illustrations made with OpenAI's built-in image generator, referenced to the actual game scene. They are not gameplay screenshots and show greater illustrative detail than realtime geometry. Exact prompts and source filenames are in ART-PROMPTS.json. No paid CLI generation or external stock assets were used.

The game is a responsive mobile-web build, not a native APK. Pointer controls, DPR cap 1.5, one 1024 shadow map, fixed 120 Hz lightweight model integration and capped rendering are used. Browser phone-sized viewport tests do not certify every physical handset or a fixed frame rate. No independent S rating or one-to-one reference replication is claimed.

## Validation and package

Run `node tests.cjs` to exercise all six garden completions through the normal movement API, live-state restore, collision bounds, sweet spots, chorus rewards, misses, idle no-score, terminal freeze and invalid-state rejection. Those simulated controllers track model landing positions; their completion times are not human play benchmarks. Public GUI play is checked separately. `python build.py [path-to-node]` fingerprints runtime assets, runs the model checks and makes a deterministic game-only ZIP in the parent directory. Upload the folder contents to a static HTTPS host, preserving subdirectories.
