# Flapjack House

A cozy original p5.js pancake-flipping game. Cook a golden underside, toss the pancake, slide the pan under its landing ring, and cook the other side. Finished pancakes fly onto a growing butter-and-syrup breakfast stack.

## Play

Open `index.html` directly or serve this folder with any static server. All files are bundled; no internet, CDN, WebGL, build step or account is required. English interface.

- Drag horizontally anywhere in the kitchen to slide the pan.
- When the pancake edge lights up gold, tap **FLIP**. A second finger can flip while dragging.
- While airborne, slide under the dotted landing ring. Pancakes carry horizontal pan momentum and are affected by the signed window breeze.
- Release after catching to let the pan gently return to the middle.
- When both sides are golden, the pancake plates automatically. Fresh batter pours automatically between batches.
- Dropped or burned pancakes are replaced without a life limit or game over. A too-early flip can be corrected by flipping back to finish the first side.
- Keyboard: A/D or left/right arrows to slide; Space to flip; Escape to pause.

Eight breakfast orders include plain, blueberry, cocoa and small silver-dollar pancakes; double batches; faster cooking; and visible left/right window gusts. There is no time limit. These are authored replayable orders, not infinite unique recipes. Stars reward completing breakfast, wasting no pancakes, and serving every pancake golden. Only each order's best rating counts, capped at 24 stars. Copper and Blue pan finishes unlock at 6 and 15 stars; finishes are cosmetic.

Cooking uses two separate side values. Tosses have real continuous position, velocity, gravity, angular rotation, horizontal pan momentum and wind acceleration. A flat descending pancake overlapping the pan is caught; bad orientation can bounce. Two resting pancakes keep separate positions. This is a simplified 2D cooking simulation, not a full rigid-body solver.

Original code-drawn cat chef, bubbles, steam curls, toasted surfaces, blueberries, chocolate chips, beveled pans, glazed mugs, copper utensils, sunlit window, tiled wall, wooden counter and arcing plate animation. Original synthesized effects; no generated or commercial images, recorded music, external fonts or remote assets.

Current cooking sides, airborne positions/velocities/rotation, pan, stack, counts and recipe book save locally. Reload opens paused, with held input released. Temporary steam/particles/plating flights are not restored; already-served pancakes appear on their plate. Pause, blur and hidden tabs freeze the model and visuals and silence sounds. Browser privacy settings may disable saving without preventing play.

Responsive portrait and landscape layouts, safe-area padding, native Pointer Events and minimum 44 px primary buttons. Canvas 2D, bundled p5.js 1.11.11 (LGPL-2.1 license included), fixed 60 Hz model, 45 FPS drawing, DPR limited to 1.5, cached kitchen, at most two active pancakes, six plated pancakes, 160 feedback particles and 16 sound voices. Mobile browser touch emulation is tested; no physical phone test is claimed.

Save key: `flapjack-house-v1`.
