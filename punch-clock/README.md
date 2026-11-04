# PUNCH CLOCK

Bad hours. Good hands. An original one-button robot counterpunch game.

Hold the screen or the large gold button to guard. Wait for the last incoming fist, then release to counter. A quick release after the last block produces a perfect hit. Do not hold forever: the guard overheats. There are no paid lives, real-money mechanics, ads or purchases.

## Contents

- Nine finite bouts, six appliance-robot silhouettes, three industrial venues. Bouts seven to nine are explicitly rematches with longer patterns, not three additional character models.
- Single, double and triple punches; alternating fists; varied windups; block, counter, damage and knockout animations.
- Three workshop upgrade families, three cosmetic glove colours, best-only medals and bolt rewards, saved progress and free retries.
- Sound, Comfort timing, Gentle effects, Light rendering and tap-toggle accessibility controls. Keyboard: hold Space, release Space; Escape opens pause.
- Original mechanical illustration: jointed metal limbs, rivets, hoses, glass faces, appliance heads, damage cracks, guard sparks, a telescopic player forearm and three cached backdrops. Synthesized Web Audio effects require the first real input.

## Play / import

Open `index.html` or `standalone.html`. They are byte-identical self-contained play builds: no CDN, external engine, font, art, audio or network dependency is required to start. The icon is an optional sibling SVG. For source development, serve this directory with `python -m http.server 4640` and open `index-source.html`.

The ZIP contains an `index.html` at its root. Keep the root structure when importing into a game host. Do not paste the GitHub source viewer URL as the game URL. Do not add automatic refresh loops or a host-dependent loading screen.

`build.py` rebuilds the two inline HTML files and the root ZIP. Run `node tests.mjs`, `node model-tests.mjs` and `node sdk-tests.mjs` to repeat deterministic checks. See `VALIDATION.md` for tested scope and limits.

## Saves and rewards

Local storage key: `punch-clock-v1`. Stores settings, best medals/scores, workshop choices, cosmetics and the active bout. Reloading an active bout opens pause and preserves phase, timer, damage, heat, score and counter energy. Held input is deliberately cleared to avoid a stuck guard. Leaving the tab pauses play. Local storage may be unavailable in private or restricted browsers; the game remains playable in memory.

Each bout earns 6, 8 or 10 lifetime bolts for a one, two or three-star best result. A replay only pays the improvement to its best result. Workshop ranks cost 4, 7 and 11 bolts; each family has three ranks. All bouts are winnable without upgrades. There is no endless-content claim: this is a nine-bout arcade campaign with medal replays.

## Reference and authorship

Reference observed through normal controls: [Rezona Battle bot](https://rezona.ai/game/pgcserver/pv/hEWowlTQ/v3/dist/index.html). Observed deployment, movement, punch feedback, a red opponent flash, reduced health and blue guarding. The reference was not completed. No reference source, media, characters, UI or audio were downloaded or copied. The one-button counter/heat system, appliance cast, rendering and progression here are original. Adjacent prior projects include directional parry and auto-punch games; this does not claim to invent boxing.

The independent frame clock and optional host bridge derive from the project's MIT-licensed Boop Society / Tow the Moon scaffolding, with notices retained in `LICENSE`. No new third-party runtime is bundled. No image generation was used. `cover.png` is an actual gameplay screenshot.
