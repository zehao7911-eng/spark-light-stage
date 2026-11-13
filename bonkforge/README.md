# BONKFORGE

A short, tactile HTML5 whack arcade. Tap turquoise gremlins, crack armored helmets with two hits, leave yellow duck workers alone. Five defeated gremlins charge an automatic Mega Bonk that defeats other active hostile targets. The crowned gremlin takes three hits. Meet each shift's quota before losing five hearts.

Nine finite shifts in three distinct illustrated environments: Courtyard, Royal Foundry and Sky Dock. Target counts, concurrent appearances, timing, armor, workers and crowned encounters change across shifts. Each shift awards one completion star, one for finishing with at least four hearts, and one for an eight-hit combo. Only best stars/scores count; replaying cannot duplicate stars.

## Controls

- Touch/mouse: tap a visible gremlin. Empty hits break the combo; missing a hostile or hitting a worker costs a heart.
- Keyboard: 1–9 target the nine hatches in reading order. Escape pauses.
- First target waits until the first player input. Pause, blur and backgrounding stop simulation, effects and sound.
- Shift map selects unlocked shifts. Retry restarts the current shift. There is no store, payment, network account or advertisement.

## Source adaptation

Complete original game controller: https://github.com/christopherscott/whackamole, Christopher Scott Hernandez 2010, MIT. The full unmodified original `whackamole.js` is in `upstream/`; its retrieved SHA-256 is in `upstream/manifest.json`. The old source is a compact 2010 v0 game, not an unchanged mature engine. Its live/kill/move/togglePop/reset/step state machine, remaining-pop-time score, finite encounter count and start/end/replay flow were modernized in `core.js`. Old real-time timers and DOM sprite rendering became a deterministic fixed-60Hz model, responsive Canvas renderer and accessible touch controls. Nine shifts, concurrent enemies, armor, workers, charge, local saves, UI and new art are additions. No old imagery/fonts/audio are included. Preserve `LICENSE-UPSTREAM.txt`.

## Art

Built-in image_gen produced the original cover, square icon, transparent character/prop atlas and three-environment sheet. These are raster 3D-style sprites and painted/rendered environments in a 2D Canvas game, not live rigged 3D models. Fine sprite movement, pop/bounce, hit recoil and squash, flying loot, metal chips, impact labels, synthesized audio and haptics provide feedback. No commercial game assets or brands are copied. The project is not affiliated with Supercell. `ART-PROMPTS.json` preserves exact prompts; `assets/atlas.json` records measured transparent bounds and original generated filenames. Click cover/icon links in `credits.html` to download.

## Run and build

Host this directory on an ordinary static HTTP server or GitHub Pages. The distributed `index.html` uses only the local `bonk.bundle.js`, stylesheet and assets; no CDN or npm installation. Opening index.html directly also works in modern browsers because no JSON request or module import is required.

To rebuild: `python build.py`. To run model checks: `node tests.cjs`. Builder embeds atlas metadata and content-versions runtime and art references. Browser image failures show a Retry screen after a 20-second deadline instead of an endless loader.

## Save and performance

Local storage preserves stars, bests, mute and exact active target phases, health, combo, charge and RNG. Reload opens the title; Continue resumes the saved state after a gesture. Corrupt/blocked storage safely starts fresh. Transient particles/labels are not saved. Finite nine-shift campaign, no claim of infinite authored levels. Fixed 60Hz simulation; 40FPS render target; DPR at most 1.5; maximum nine target slots, 150 particles, five labels, three hammer strikes, eighteen audio voices. All buttons at least 44 CSS pixels. Reduced motion disables shake/flash. Viewport tests are not a guarantee for every physical handset.
