# BRASSWING — Air & Ember

An original compact HTML5 dogfighting game directionally inspired by [LUFTRAUSERS](https://store.steampowered.com/app/233150/LUFTRAUSERS/). The official Steam gallery was actually inspected: crimson aircraft and battleship silhouettes, cream skies, sun discs, curved smoke trails, bright outlined bullets, large combo numerals, geometric workshop equipment and muted sepia panels. Original code-drawn silhouettes, environments, UI, synthesized tones and rules; no commercial art, music or generated images are packaged. This is a smaller browser interpretation with phone-oriented steering, not the commercial game's complete flight model, missions, original assets, 125 aircraft combinations or soundtrack.

## Play

Drag anywhere in the sky to point the plane, thrust and fire. The plane has inertia; it does not teleport to your finger. Release to glide and regenerate hull after 0.7 seconds. Gravity and enemy fire keep running during repairs. The sea damages and bounces your plane back up. Use Barrel Roll to remove hostile bullets within 170 world units and gain 0.75 seconds of protection; ramming during the roll damages enemies. Cooldown is 4.2 seconds. A second finger can press Roll while the first continues steering.

Mouse: hold and drag. Keyboard: WASD/arrows fly and fire, Space rolls, P/Escape pauses. Tap the pause button for notes, mute or a confirmed restart/retirement. No wall-clock time limit; attempts are unlimited.

Nine numbered sorties have increasing target quotas from 10 to 26. Every third sortie summons a large dreadnought after half the quota; it must also be destroyed. Fighter, bomber, ace and patrol-boat enemies have different silhouettes, health, speeds and shot patterns. Circles warn before enemy shots. Weapons have gentle aim assistance within a forward cone, not omnidirectional automatic targeting. The world wraps horizontally; a radar and edge arrows locate threats. Bounded spawning and damage invulnerability prevent unavoidable instantaneous multi-hit losses.

Nearby kills build a four-second chain and a score multiplier capped at 5. Collect drifting salvage for 25 points. Earn up to three medals: finish, take at most 35 total damage, achieve a chain of at least 6. Best medals and best score are saved without duplicate accumulation. Clearing sorties unlocks Vector engine, Scatter gun, Bulwark body, Jet engine, Lance gun and Dart body. Three weapons × three bodies × three engines give 27 real handling/loadout combinations. Weapons differ in spread/rate/damage/range/piercing; bodies differ in health/repair/speed; engines differ in thrust/turn/speed. Three visual palettes are free.

After sortie nine, Endless opens: continuing numbered waves reuse the same air/sea arena with seeded spawns, increasing quota and boss cycles, with difficulty capped at wave 12. This is not an unlimited collection of unique maps. Each wave starts a fresh plane; best cleared wave is saved.

## Offline and saves

Open packaged `index.html` directly; it includes CSS and all JavaScript. No server, CDN, fonts, library, accounts, advertisements, analytics, payments or network resources required. Editable source is included. For HTML5 platforms, unpack with index.html at archive root. The ZIP is an offline game package, not a server executable.

The entire current simulation, seeded generator, shots, enemy health/cooldowns, pickups, plane inertia, roll/repair timers, profile and mute preference save locally under `brasswing-v1`. Reload returns to a paused menu, with no held control. Cleared flight results restore without duplicate rewards. Smoke, screen shake and touch state are transient. Returning to the hangar or restarting an active flight requires confirmation. Hidden/blurred pages pause and stop sound. Sounds start only after user interaction. Storage can be unavailable without blocking play.

Original Canvas2D drawing, capped DPR 1.5, 40 FPS rendering/60 Hz fixed simulation, maximum 16 enemies/140 projectiles/24 salvage/150 effects/65 trail samples/16 audio voices. Portrait and landscape layouts account for safe areas; controls are at least 44 CSS pixels. Save flight card downloads a PNG of the current scene and score.

## Validation

See project validation record for exact final test coverage. Browser touch and viewport emulation are not physical handset testing.

Original code and art © 2026. No affiliation with Vlambeer or Devolver Digital.

Final checks: nine complete engine sorties and three endless waves; all 27 loadout combinations completed sortie one in simulation. Weapon patterns/piercing, wrap, repair, roll filtering/cooldown, damage invulnerability, exact save continuation, win/loss/retry and reward guards passed. Actual browser-native portrait touch completed all nine sorties with 22 earned medals; landscape touch completed the first three including a dreadnought. Simultaneous steering/roll, paused canvas pixels and silent sound, exact reload/released input, result restore without duplicate medals, actual PNG download, equipment/mute and 320/360/390/844 viewport controls passed. Cold-offline mouse completed sortie one; keyboard thrust/fire/roll, explicit damaged-plane repair and loss/retry fixtures, 35/34/18 pixel safe-area layouts and zero HTTP/JavaScript errors passed. Physical phones were not available; touch and viewport tests used browser emulation.
