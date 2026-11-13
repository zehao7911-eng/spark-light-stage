# Crestwing

A small, original one-finger hill-flight game. Dive into downslopes, release on climbs, and carry momentum home before sunset. Three consecutive lovely landings start a golden glide and return two seconds. Optional wind ribbons award sparks and one extra second.

## Play

Open `index.html` directly, or serve this folder on any static host. All runtime dependencies are bundled; no CDN, account, build step, or network is required. GitHub Pages supports this folder as-is.

- Touch/mouse: hold anywhere on the landscape to dive; release to glide.
- Keyboard: hold Space, Down, or S; release to glide. P/Escape pauses/resumes.
- Dive on downhill slopes, release during the climb, then dive into the next downhill. Staying held or leaving the game idle is slower than timing the slopes.
- Reach the cottage before time runs out. Sparks and lovely landings award medals and upgrade feathers. Wings improve lift, toes improve perfect-landing boosts, and the charm widens spark pickup range. Upgrades each have three levels.
- Eight accumulated medals unlock the flower crown; twenty unlock the postbird cap. Cosmetic selections do not change physics.

There is no final valley. Length, slope amplitude and time allowance increase to explicit caps; three hill wavelengths and four sky palettes cycle. These are variations of the same flight course, not an unlimited collection of handcrafted maps. Each attempt earns its completion or consolation reward once. Replaying a failed valley keeps purchased upgrades.

## Technical notes

Original Canvas 2D art and a deterministic fixed-step hill/air simulation rendered with p5.js 1.11.11. Synthesized sound starts only after user interaction. Portrait and landscape use responsive world framing. DPR is capped at 1.5, rendering at 45 FPS, simulation at 60 Hz; effects, trails and pickup counts are bounded. No WebGL or external models are needed.

Automatic localStorage saves retain the current flight, timers, pickups, currency, medals, upgrades, sound and outfit. A restored active flight opens paused. Hiding the tab pauses play and sound. Browser storage availability and persistence depend on the host/browser; private or restricted contexts can prevent saving.

Bundled p5.js is LGPL-2.1 licensed; see P5-LICENSE.txt. All other code and procedural art were created for this project. No generated images or commercial game assets are included.

Validation covers deterministic save continuation, sixteen base-profile valleys, contrasting held/released controls, purchase guards and once-only rewards; native CDP touch play, portrait/landscape layout checks, pause pixel freezing, exact reloads, and cold-file offline keyboard/mouse operation. Device viewport emulation is not a physical handset performance test.
