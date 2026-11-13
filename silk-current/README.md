# SILK CURRENT

An original, lightweight HTML5 ocean rescue game. No engine installation, asset downloads, CDN requests or build step is required.

## Play

Drag or click in the ocean to guide the silver sea wing. Swim close to a school of little fish, then return them to the glowing flower sanctuary. A dotted current and home marker guide the return trip. Deliveries restore time and successive deliveries build a score streak. Meet the rescue goal, choose a gift and enter the next sanctuary.

- Touch: drag to swim; tap the lightning button to dash; two fingers also dash.
- Keyboard: arrows or WASD to swim, Space to dash, E for an unlocked sonar pulse, Escape to pause.
- Sound is optional and starts only after an intentional interaction.
- Pausing freezes simulation, effects and drawing. Losing focus pauses the run.
- Record scores are saved locally. Individual timed expeditions restart fresh.

Six gifts have three levels each: sonar attraction, larger collection radius and speed, protective companions, shorter dash cooldown, stronger time recovery, and a chance of additional rescued companions. All mastered gifts stay mastered; later expeditions continue with score bonuses. Three art palettes alternate through an endless sequence of increasing rescue goals, capped at 34, with bounded creature and effect pools.

## Art and implementation

Original Canvas 2D artwork: animated veined sea wings, lacework sea fans, layered coral banks, botanical tufts, translucent jellyfish, distant giant rays, light shafts, water refraction patterns, homecoming particles and ribbon wakes. The terrain and botanical sprites are rendered once per biome. Pixel ratio is capped at 1.6. There are no external image, font, audio, model or runtime dependencies. All UI copy is English.

The installed `open-source-game-reference` skill was used to inspect its browser arcade catalog. No catalog game's code or assets were selected or copied; this game is an original implementation, not a port or a commercial game reproduction.

## Run and check

Open `index.html` in a modern browser, or serve this folder with any static HTTP server. Run `node qa.cjs` for the deterministic gameplay tests. Upload the folder to ordinary static hosting; no service worker or special HTTP isolation headers are required.

Physical-device battery, thermal and frame-rate measurements have not been certified. Portrait and landscape layout/input checks use a browser viewport.
