# Bloomtide

A complete small HTML5 swimming/evolution game inspired by the public Rezona EVO Evolution cell-stage loop. Hold/slide to swim toward food, eat luminous nutrient clusters and golden cells, avoid larger coral hunters, dash, and attach a new part at each evolution. Six waters lead to a final bloom and a new seeded lineage. English UI, touch and keyboard, no account or CDN.

## Play

Serve this folder over HTTP, e.g. `python -m http.server 8000`. Hold on the canvas in the direction you wish to swim; slide to steer, release to coast to a stop. Arrow keys/WASD also swim and Space dashes. Use the Dash button to pass a hunter. Green is you, golden cells are prey, coral spiked cells are dangerous. Each new tier resets the nutrient meter and offers one upgrade: Flagella increases swim speed, Pearl Shell increases maximum hearts, Cilia increases the nutrient pull radius. Each part caps at three. The six stage goals increase from eight to twenty-eight nutrients in the first lineage. A golden cell is worth three.

Losing all hearts gives a second chance at the lagoon centre, costs up to three current nutrients and briefly grants protection. No lives, real-world prize or payment. Completing a lineage unlocks the next seeded layout with slightly larger food goals; biome names and art repeat. The journal counts completed lineages when the player starts the next one, and retains discovered parts/highest evolution. It is not a set of infinitely unique authored environments.

Local browser storage preserves the exact active food/creature/position/velocity/health/cooldown/part state and journal. Reload starts paused and releases direction input. Blocked/cleared storage may prevent persistence. Pause, blur and hidden pages stop simulation and audio. Pointer cancellation/resize releases movement. Art loading has a timeout and retry dialog instead of waiting indefinitely.

## Reference and artwork

Actually played Rezona EvoGenesis — Cell & Ground, https://rezona.ai/game/pgcserver/pv/XonoJKzl/v5/dist/index.html : started swimming and triggered its first evolution menu by ordinary pointer play. Broad cell-stage loop and simple controls are the reference. This is an independent cell-stage game; it does not include the reference's ground/tribal stages and is not a one-to-one source or art copy. No reference code/assets/audio are redistributed. Slagyard's loading screen was viewed and skipped as an FPS.

The actual player, hunters, prey, food and lagoon background are original raster artwork made with OpenAI's built-in image generator. The transparent 2x2 character atlas was sliced at exact cell boundaries, alpha-trimmed, resized and bundled as WebP assets; original illustration content was not painted over with code. Icon is resized from the player. Exact prompts and source filenames are in ART-PROMPTS.json. These assets are drawn in gameplay, not only a cover. Runtime Canvas2D supplies body squash, tail animation, shell/attraction rings, parallax, absorption arcs, sparks, ripples, floating dust and bounded effects. These are animated sprites, not rigged 3D models or a soft-body/fluid simulation. No external framework is needed. Original synthesized audio starts after interaction.

The previously in-flight gothic hall image belonged to an abandoned chess-art revision, was not used here and is not part of this package.

## Validation

`node tests.cjs` exercises all six stages by normal movement/upgrade APIs, upgrades, idle no-score, dash cooldown, deterministic saved-state continuation and invalid saves. The model's nearest-food test controller is not a claim about human completion times. `python build.py [node-path]` fingerprints runtime source/art, runs checks and creates a game-only ZIP. Browser responsive tests are separate; no physical handset or guaranteed frame rate claim. Canvas DPR is capped at1.5, render frequency bounded, actors/effects bounded.
