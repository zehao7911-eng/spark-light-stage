# UNDERRUN · REDLINE

A mobile browser adaptation of the complete [UNDERRUN game](https://github.com/phoboslab/underrun), not a separate imitation engine. Original source revision: `f933e29152d7fc1ca61d4b3eaa8b29551d7d7a62`.

## Play

Drag the stick or drag anywhere on the arena to move. The first movement starts the wave. The weapon automatically aims at a visible enemy with a clear line of sight and fires. Press **DASH** to evade and smash nearby enemies. Six defeats trigger an automatic **OVERDRIVE** blast. Clear the wave, choose one upgrade, and go again.

Keyboard: WASD / arrows, Space to dash, Escape to pause. Sound is optional. There is no ammo inventory, relay-repair route, terminal puzzle or separate aiming stick.

Nine campaign waves span three compact arena layouts: Foundry, Cryo Vault, Reactor Nine. Later waves combine the original pursuing spiders and firing sentries, plus volatile enemies whose explosions can chain. Weapon spread, firing rate, impact, armor and blast upgrades change the action. Completing wave nine offers an endless continuation. Stars reward clearing, avoiding damage and a quick clear. Best score and cleared waves persist.

An unfinished run is saved at the **start of the current wave**, including upgrades and banked score. Reload restarts that wave; partial-wave kills cannot be farmed for banked score. An unclaimed upgrade choice is saved too. Pause freezes the current encounter; hiding the tab clears input and stops audio. Retry restores the wave's starting score and upgrades with fresh armor.

## Run and rebuild

Serve this directory over HTTP; for example `python -m http.server 8000`, then open `http://localhost:8000/`. The shipping `game.bundle.js` is already built. It combines the readable source files without a package manager, CDN or external dependency. Rebuild after editing with `python build.py`.

Run `node tests/simulate.cjs` for real source-level simulation of all nine waves using the original entity physics, collision, AI, bullets and PNG-map decoder with render/DOM stubs. The moving test controller exercises encounters; it does not directly mark enemies dead or force campaign victories. Additional isolated assertions cover dash protection, failure/retry accounting, automatic overdrive and denied storage. Native browser testing remains necessary for graphics and touch layout.

## Actual upstream integration

- Retained UNDERRUN's custom WebGL projection, 16-pixel sprite atlas, block/floor geometry, dynamic vertex lighting, fog and sprite orientation.
- Retained and adapted its entity physics, wall collision, spider animation/AI, sentry attacks, projectiles, particles, explosions and seeded world construction.
- `upstream/` preserves the relevant original source files. `source/` contains the modified versions. `m/q2.png` is the original atlas, unchanged. The three compact arena map PNGs are new, using the original map color encoding and loader logic.
- New work: wave progression, assisted targeting, analog/dynamic touch input, offensive dash, upgrades, scoring, save states, UI, effects overlay and synthesized sound.
- Original terminal narrative, CPU-repair gameplay, Sonant-X, original music and original audio implementation are not bundled. No Sonant-X code is included. The original project README notes that library's separate zlib license; it is not needed for this package.

The engine and original art are **MIT licensed, copyright 2018 Dominic Szablewski**. Preserve `LICENSE-UNDERRUN.md` when redistributing. This adaptation is not an official sequel or endorsed release. No generated image assets or paid services were used.

## Browser limits

WebGL 1 with a Canvas 2D effects overlay; no WebGPU requirement. Pixel framebuffer capped at 800×480, drawing capped at 40 FPS, fixed 60 Hz simulation. Particle count, shader lights, sparks, damage labels and projectile lifetime are bounded. All assets are local. Loading errors and WebGL interruption have a visible retry screen. Mobile portrait/landscape viewport checks do not substitute for a physical-device benchmark.
