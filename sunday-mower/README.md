# Sunday Mower

A small, original lawn-mowing game. Eight illustrated gardens, a bunny operator, roller stripes, flying clippings, hidden keepsakes, pulsing sprinklers and rechargeable turbo. No generated images or external art assets.

## Play

Open index.html, or serve this directory on any static host. All assets are included; no network requests or build tools are required.

- Drag anywhere in the lawn to steer. Release to stop.
- Tap Turbo (or use a second finger) after mowing charges the battery. Turbo widens the cut and increases speed for 2.1 seconds.
- Thick grass takes two passes. Return after a short interval.
- Flower beds are solid; steer around them. Active sprinkler circles slow the mower.
- At 90% coverage, Done becomes available. Keep mowing for a better result: 98% earns two stars; 98% and all three treasures earns three. Fully cut lawns finish automatically once all treasures have been collected.
- Stars are best results per garden, capped at 24. Unlock Blue at six and Honey at fifteen; replay gardens from the journal.
- Keyboard: arrows/WASD to steer, Space for turbo, Escape to pause.

Progress and the active garden are saved locally when browser storage is available. Reload resumes behind a pause screen. No lives, payments, ads, gambling or artificial timers. Mowing is not simulated while the game is paused or hidden. Clear this site's stored data to reset progress.

## Technical notes

p5.js 1.11.11 (LGPL-2.1; see P5-LICENSE.txt), Canvas 2D, original procedural artwork and synthesized audio. Fixed 60 Hz simulation, 45 fps rendering, capped pixel density 1.5, 896 grass cells and at most 230 visual particles. Portrait and landscape layouts support touch and safe-area insets. Browser touch emulation is not a substitute for testing an actual phone. Sound begins after a gesture; mute is persistent. Saves are device/browser local.
