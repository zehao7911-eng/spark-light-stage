# NIGHTWARD — The Quiet Hours

An original small English HTML5 3D night-duty game. Tap a task and your porter walks around hospital partitions. Tap the large tool button to start/stop cleaning goo, repairing leaks, restoring power or settling a shy spirit. Holding the button also works. Pick up sleepy patients and take them to Recovery; carry coffee to Reception. The corridor warden stays in the hall, so rooms provide a safe detour.

## Play

Scene markers and the task counters both select duties. Selection starts obstacle-aware walking; arriving at a patient or station picks up or delivers the carried item. Cleaning and repairs require the tool button, with visible partial progress. A short tap starts/stops work. Releasing a longer hold stops work and retains progress. A dashed edge marker points toward an offscreen station. The magnifier button switches between a following close camera and the full ward. Tapping bare floor chooses a walking destination.

The warden gives a proximity warning, stops for a 1.35-second wind-up and pulses its floor ring before contact can cause a catch. A catch returns the porter to the desk, releases the carried item, grants four seconds of protection and keeps every completed duty. No timer, lives, currency purchases, accounts, ads or random odds. Eight authored shifts use one connected hospital and changing task arrangements; maintenance, power and UV duties enter gradually. This is a finite small campaign, not eight different buildings or a commercial-scale simulation.

Each shift awards one star for completion, one for avoiding the warden and one for finding the optional staff badge. Only the best stars count, up to 24. Sage uniform unlocks at six stars and Copper at fifteen; their colors actually change the porter's clothing. Completed shifts can be replayed through the shift book.

Keyboard: Tab navigates real buttons; Enter on the tool button starts/stops work; holding Space on that button works while held. Arrow keys choose adjacent floor tiles. Escape pauses. Sound begins only after an interaction, is bounded to fourteen voices and may be muted. Sounds are synthesized, not copied reference audio.

## Saving and interruptions

`nightward-v1` stores the current shift, continuous position, route, completed duties, partial tool progress, carried item, patrol state, best stars, uniform and settings. Reload opens paused and never reconstructs a held pointer/key. Blur, hidden tabs, pause and resize release tool input and freeze the simulation. Resume is explicit. If storage is unavailable the game still plays, but saving is unreliable. Clearing browser storage clears progress.

## Rendering and mobile

Local Three.js r147, original procedurally modeled characters, furniture, props, UI icons and effects. No generated pictures, remote fonts, CDN, remote API or external runtime downloads are required. Static meshes are merged by material, contact shadows are textured planes, spray particles are pooled, delivery effects are capped at seventy and DPR is capped at 1.5. The Light Rendering option lowers DPR to one and omits the spray plume. Fixed-step logic runs at 60 Hz with a bounded catch-up; graphics target 40 Hz. Physical handset thermal/performance behavior is not certified by desktop responsive testing.

The hospital is a cutaway scene. Furniture and solid fixture cells are separate from traversable space, door-only graph edges block crossing partitions, and interaction checks respect the same door barriers. The warden uses a deterministic corridor patrol with contact-radius capture; it has no simulated sight or hearing. Following camera motion is eased; Gentle Motion uses the overview camera and slower decorative movement. The porter and patients are articulated/stylized meshes, not cloth or general rigid-body simulations.

## Source and packaging

Serve `index.html`, or open `NIGHTWARD-OFFLINE.html` as a local HTML file in a browser that permits WebGL. Both inline code, style and Three.js; only the optional favicon remains external. The editable files and Three.js license are included. Run `node test-model.cjs`, then `python build.py` for the SHA256 manifest and deterministic `NIGHTWARD.zip` package. The ZIP contains the game at `nightward/index.html`.

## Reference and skills

Gameplay reference: [Rezona's Night Shift at the Haunted Animal Hospital](https://rezona.ai/game/pgcserver/pv/GMjoMZku/v8/dist/index.html). The title, first shift duty HUD, coffee selection, patrol death and retry were actually observed. The attempted coffee interaction did not establish a completed reference delivery, and a complete reference shift is not claimed. The reference's first-person multi-key controls are deliberately translated into a cutaway view and direct mobile target/work controls. Its patient, cleanup, coffee and patrol loop is the reference; this is not a pixel-identical port. No reference source, characters, textures, logos, models, music or complete interface are included.

The local `game-art`, `game-design`, `3d-games`, `web-games`, `mobile-games` and `game-audio` skills informed palette, silhouettes, staging, animation, geometry/collision separation, touch targets, bounded rendering, progression, pause behavior and feedback. The imported open-source catalog was searched; its puzzle entries do not supply this specific hospital controller. It is a catalog of links, not an installed quality-guarantee engine. Runtime code here is independently authored, with Three.js as a library dependency, rather than an asserted adaptation of a complete upstream game. No platform grade or superior-to-reference verdict is guaranteed by the skill or technical checks.
