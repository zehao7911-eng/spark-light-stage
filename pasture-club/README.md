# Pasture Club

A small, original p5.js shepherding game. Guide a wagging farm dog behind a flock of cream and peach sheep. They flee nearby dogs, flock with matching wool, bounce against fences and settle into the correct home. Bark gives a stronger radial nudge, but careless barking scatters the herd.

## Play

Open `index.html` directly, or serve this folder with any static server. No network, CDN, WebGL, build step, account or paid assets are needed. All UI is English.

- Drag anywhere on the pasture to move the dog. Releasing stops movement.
- Get behind a sheep to push it toward the opening in the matching wool sign.
- Tap **BARK** for a stronger push. It recharges in 1.5 seconds.
- Pick up three berries with the dog. There is no time limit or loss of lives.
- Keyboard: WASD / arrow keys to move; Space to bark; Escape to pause.

Nine authored pastures introduce narrow gates, flower gardens, two flock colors and larger groups of up to eighteen sheep. These are replayable levels, not infinite unique maps. Stars reward bringing everyone home, gathering every berry, and staying within the displayed bark allowance. Best ratings cap at 27 stars; repeating a level cannot farm additional stars. Three additional dog coats unlock at 6, 14 and 22 stars.

## Presentation and compatibility

Original code-drawn wool curls, ear reactions, running legs, wagging tails, layered timber fences, flower beds, fruit trees, shadows, homecoming petals and synthesized sounds. No generated images or commercial game artwork. The flock uses custom steering and circle separation with solid rectangular obstacles, not full soft-body physics.

Responsive portrait and landscape pasture layout, safe-area padding, 44 px minimum primary controls, native Pointer Events and multitouch bark input. Canvas 2D is rendered with bundled p5.js 1.11.11; its LGPL-2.1 license is included. Fixed 60 Hz simulation, 45 FPS drawing, DPR limited to 1.5, 18 sheep maximum, 170 feedback particles and 16 concurrent sound voices. Grass and garden details are cached.

Current sheep positions, velocities, berry collection, bark cooldown, progress and album save locally. Reload opens a paused Continue screen. Held input and transient petals are not restored. Pause, loss of focus and hidden tabs freeze the simulation and silence sounds. Browser touch emulation and desktop play are tested; no physical phone test is claimed.

Clear this game's local data by deleting `pasture-club-v1` from localStorage. Browser privacy settings may prevent saving, but play remains available.
