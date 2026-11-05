# CHOMP & SHINE

Small tools. Enormous smiles. An original complete English 3D touch game at the Good Smiles Club. A new subject and action loop after the firefighter and harbour-crane games, retaining the cohesive block-built models and soft materials requested from the user's reference video.

## Play

Open `index.html` or `standalone.html` directly, or host this directory on a static web server. Both entries embed the renderer, all game code, original procedural models and synthesized sound. No image generation, CDN, login, external font or GameWave host is needed to boot. WebGL is required. The distribution ZIP has an index at its root.

Open the clinic. Hold a speckled tooth to brush it clean; sweep between teeth for a sparkle streak. Once every tooth is clean, drag the candy upward until it pops free. Later visits introduce chipped teeth: tap the gold markers to fit a new crown. Only sweets are removed, never teeth. There is no countdown, damage, paid retry or failure trap. Pause and resume freely. An elapsed-time target and a three-tooth brushing streak add optional rating stars; completing the patient always earns one star and unlocks the next.

Six authored visits: Pip the crocodile, Momo the hippo, Tango the dragon, Basil the crocodile, Luna the hippo and Sunny the dragon. They have 6, 8 or 10 working teeth, distinct palettes, candy locations and later crown tasks. All six can be replayed. Content is a finite six-visit collection, not infinitely unique generated patients.

After two completed patients the **Wide Brush** automatically brushes neighbouring teeth while working on the selected tooth. After four patients the **Foam Rinse** button cleans part of every tooth with a ten-second refill. These actually affect cleaning, rather than merely changing a number. Saved stars and best scores only increase; repeating a result cannot farm unlocks. The patient book exposes earned tools and free replays.

Keyboard: hold 1–9 or 0 for a tooth; arrows select, hold Space to use the current stage's tool; F activates unlocked rinse; Esc pauses. Touch cancellation, lost pointer capture, pause, blur and backgrounding release the current tool. A short candy gesture returns the grip to rest, a full upward gesture removes it. Backgrounding freezes the visit. No timer runs before the first accepted action. Mobile and desktop layouts use safe-area insets, large controls and bounded rendering; a battery-saver mode is in Pause.

## Artwork and performance

All creature models, tooth spots, candy wrappers, crowns, dentist assistants, clinic counters, windows, jars, plant leaves, signs, lamp, brush, particles and sounds are original code-authored assets. Body proportions and colour rules are shared, while the crocodile has nose bumps/back ridges, the hippo rounded block ears and a wide muzzle, and the dragon horns and segmented wings. Eyes blink and follow the working tool; the creature breathes and bobs on completion. Teeth visibly lose individual dirt patches, gums remain pink, candies wobble and stretch upward, crowns lock into place, and foam/shards/sparkles provide immediate feedback. No third-party character, logo, complete UI, ripped game art or commercial game source is used.

The main form uses one shared bevelled-box geometry and a small material palette. Static room meshes and creature body meshes are instanced by material; the interactive tooth groups, tool and eyes remain separate. One 1024 shadow map, device ratio capped at 1.4, 30 Hz phone/40 Hz desktop draw scheduling, bounded simulation steps and at most 100 pooled-lifetime particles constrain work. Battery saver removes shadows and uses device ratio 1. Scene-owned textures and geometry are disposed on patient changes. The Three.js r147 runtime is bundled under its MIT licence in `vendor/THREE-LICENSE.txt`. Three.js is the rendering dependency, not an external complete-game source.

## Save and GameWave SDK

Only `chomp-and-shine-save-v1` and the game's own quality preference are read/written. No enumeration, clearing or upload of other games' browser storage occurs. Profile stars, best scores, explicit optional-reward flags and individual tooth states are saved. Reload can resume mid-brush or between stages; a partial candy pull resets to rest. Cloud profile merging preserves best progression. A stale same-patient cloud visit cannot replace a locally more-complete visit before opening the clinic.

The official GameWave document was rechecked on 2026-11-06, displaying an October 30 modification date: https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh . `sdk.mjs` is individually scoped to this game. Actual accepted cleaning/pulling/crowning/rinse actions start the host visit. Actual completed patients end it exactly once; explicit abandonment when changing an unfinished patient ends that visit. Opening menus, idle time and viewing results do not start a round. A restored progressed ready visit starts the resumed host session on the next accepted action. Late `window.neonlib` injection is polled safely; rendering never waits for it.

Like and direct-comment registration are independent, guarded and asynchronous, require successful registration, consume direct callback fields, and clean up subscriptions including late completions. A confirmed positive like grants a visible gold brush handle; a successful direct comment, including empty-text image comments, grants extra end-of-visit confetti. Each is optional and has a persisted one-time flag; duplicate callbacks and reload do not grant again in this browser. Offers are shown only for supported successfully registered methods. Local-only guarantees are browser-scoped; game-specific cloud save is used when the host supports it and its returned data is empty or has this game's discriminator. Foreign cloud data is never overwritten. No invented platform button or fabricated interaction event is used.

## Validation

`node tests.mjs` runs game-specific deterministic tests across all six complete patients, progression/replay, tools, cancellation, save restoration and GameWave mocks. It covers absent/partial/late SDK, callback validation, unlike rejection, image-only direct comments, durable deduplication, cleanup, rejected async calls, registration timeout, cloud namespace preservation and the progressed-ready resumed lifecycle. Mocks establish integration logic, not actual App behaviour.

Public-browser and ZIP release evidence is recorded outside the distribution directory in the workspace release-evidence JSON. A desktop browser at a phone-sized viewport is responsive testing, not a physical-device benchmark. Actual GameWave App import/callbacks and physical Android/iOS devices have not been tested; those claims must not be inferred from the mocks or public Pages check.
