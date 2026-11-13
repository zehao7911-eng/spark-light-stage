# Bloomline

An original p5.js territory-gardening game. Drag a little rabbit gardener out of the flower beds, draw a loop, and return to an existing bed to close it. The enclosed lawn blossoms in a spreading wave. Ladybirds can snip unfinished ribbon; completed flowers are safe.

## Play

Open `index.html` directly or serve this folder with any static server. Everything is bundled: no network, WebGL, CDN, build step or account required. English interface.

- Drag on the lawn to move toward your finger. Release to stop.
- Close a loop by returning to flowers. Smaller enclosed regions fill with new beds; the largest remaining lawn stays unplanted.
- **Pulse** briefly freezes bugs and protects fresh ribbon. Five-second cooldown. A second finger can activate it while dragging.
- Crossing your own fresh ribbon retracts the tail; it does not award free territory.
- Golden buds count when their tiles become flowers. Cuts only remove the current ribbon, with a safe return to the nearest bed. There are no lives or time limit.
- Keyboard: arrows / WASD, Space for Pulse, Escape to pause.

Eight authored gardens vary coverage goals, starter flower islands, bug counts and speed, with a cooler night-garden setting. They are replayable stages, not unlimited unique maps. Stars reward completion, no more than two cuts, and all three golden buds. Only each garden's best rating counts, capped at 24 stars. Lavender and Honey palettes unlock at 5 and 12 stars.

Original code-drawn rabbit, paint roller, ladybirds, swaying flowers, wood tray, blossoms, particles and synthesized chord feedback. No commercial or generated images. Gameplay uses a 26×26 grid with orthogonal movement, interpolated visual motion and flood-fill territory capture. It is not a fluid or soft-body simulation.

Current flowers, ribbon, gardener, bugs, cooldowns, buds and album save locally. Reload opens paused; held input, transient particles, flower-growth animation and visual interpolation are not restored. Blur, hidden tabs and pause freeze the simulation and silence audio. Privacy settings may prevent saving without preventing play.

Responsive portrait / landscape layout, safe-area padding, 44 px minimum primary buttons, native Pointer Events. Bundled p5.js 1.11.11 with LGPL-2.1 license. Canvas 2D, 60 Hz simulation, 45 FPS rendering, DPR at most 1.5, 4 bugs, 200 feedback particles and 16 sound voices. Browser mobile touch emulation is tested; physical-phone testing is not claimed.

Save key: `bloomline-v1`.
