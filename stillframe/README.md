# STILLFRAME

An original compact HTML5 time-action game directionally inspired by SUPERHOT's time-controlled combat and white architecture / red faceted enemies / black weapon visual language. The actual official Steam gallery was inspected, including screenshot `ss_1e3ef7d9d9654c6189e6680502a0ce3068d1aef7`: angular red figures, dark weapons, crystalline break-up, pale tiled spaces and strong directional lighting. This game uses an overhead miniature camera suited to phones, original geometry, original authored arenas and locally synthesized sound. It is not the commercial FPS, its full maps, story, original assets or complete mechanics.

## Play

Open the packaged `index.html` directly, or upload this folder to a static HTTPS host. The packaged root HTML contains all code and the bundled Three.js r147 runtime. No CDN, accounts, remote fonts or build process. Separate sources and the MIT Three.js license are included for editing.

- Drag on the arena to move. Releasing your finger holds the world once any action's brief follow-through finishes.
- Tap a red figure or black explosive can to aim without advancing time. If no valid target is selected, shooting aims at the nearest visible enemy.
- Hold **Fire** to shoot and keep time flowing at 0.65 speed. Moving advances time at full speed. Bullets and enemies do not advance at rest. Shots and throws provide a short 0.36 / 0.45-second action follow-through.
- Empty-handed or out of ammunition? Get within 64 units and use **Strike**. A blade can slice within 104 units. A pistol carries four rounds; a scattergun carries two spread shots.
- **Throw** discards the current weapon as a real projectile. A surviving armored foe is stunned and disarmed by a thrown weapon. Walk over black weapons to equip one when empty-handed or out of ammunition. Throwing a loaded weapon is a deliberate tradeoff; it keeps its remaining ammo when it lands.
- Red figures fire along a visible targeting wind-up. Bullets collide with cover and break glass; enemies can hit each other. Dark chest plates take two ordinary hits. Explosive cans can cause chain reactions and hurt you if you stand too close.
- Shatter every red figure to complete the scene. Two blue memories are optional and must be collected before the final enemy falls. Three vitality, unlimited retries and no wall-clock timer.
- Keyboard: WASD / arrows to move; Space / E to fire; Q to throw; P / Escape to pause. Mouse dragging and keyboard actions can be used together. Phone touch supports moving, holding Fire and throwing with separate fingers.

## Progress and replay

Nine authored scenes with cover, glass, melee runners, pistol/scattergun enemies, armored figures, collectible memories and weapon choices. Three stars per scene: completion, untouched, both memories. Archive keeps the best rating, capped at 27; repeating a scene cannot duplicate rewards. Ice player accent is free; Gold unlocks at six stars, Violet at twelve. These accents change the player's chest detail, preserving the red enemy language.

Endless unlocks after scene three. It repeats three authored arenas with four to eight foes per wave; enemy count caps at eight, not an infinite unique-map generator. Each new wave restores three vitality and a four-round pistol. Highest cleared wave is saved.

Win and loss screens can show a real-time visual replay sampled from your actual attempt, with position interpolation. Recording retains up to the latest 180 samples, about 14.4 world seconds; it does not record the entire wall-clock session. Replay does not simulate gameplay, spend ammunition, change profile state or award anything. Replay sound is intentionally silent. Save a locally generated PNG frame card from a completed scene.

## Saves and compatibility

Local key `stillframe-v1` stores the current actors, positions, ammunition, shots in flight, target, broken glass/cans, memories, world/action timing, replay samples and profile. Reload opens paused; held inputs and transient shards reset. Pause, focus loss and hidden tabs freeze simulation and silence sound. Private or restrictive browsers may not persist local storage; the game still runs. Restart resets the current scene/wave and retains the archive.

The main renderer uses original low-poly Three.js meshes, real 512-pixel soft shadows, batched static architecture, instanced shots/shards, at most 100 transient fragments, 48 shots and 28 ground weapons. Maximum 1.5 DPR, 40 FPS drawing, fixed 60 Hz simulation; idle time holding skips 3D renders. Collision uses a 2D overhead plane with continuous projectile substeps, not full 3D rigid-body physics.

If WebGL cannot initialize or the context is lost, Canvas2D compatibility mode preserves gameplay and controls. `?flat=1` explicitly selects that mode. Its illustration is simpler than the 3D renderer. Context loss pauses the game instead of reloading in a loop. Portrait/landscape controls, safe areas, minimum 44-pixel buttons, a mini-map and nearest off-screen foe indicator are provided.

QA includes engine playthroughs, actual browser touch events, mouse/keyboard events, cold offline runs and mobile viewport emulation. Physical phone hardware was not available. No generated images, commercial assets, analytics, payments, ads or external network dependencies.

Reference: https://store.steampowered.com/app/322500/SUPERHOT/
