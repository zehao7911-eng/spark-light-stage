# Bloom Zero

An original, compact HTML5 creature escape game, directionally inspired by CARRION's amorphous movement, tendril interactions and atmospheric industrial spaces. The official Steam gallery was inspected for dark steel chambers, cyan light, glass partitions, ducts and contrasting crimson organic silhouettes. All artwork, levels, sounds and code here are original. This is a smaller independent botanical escape game, not the commercial game, its maps or its full systems. No commercial assets, generated images, CDN, libraries, fonts or build step.

## Play

Open the packaged `index.html` directly, or host the folder on any static HTTPS host such as GitHub Pages. The root HTML is self-contained and works offline. The separate source files are provided for editing; when editing, regenerate the inline root HTML too.

- Drag on the scene to move in any direction. The creature can travel along walls and ceilings without jumping.
- Hold **Grasp** near the highlighted object: release root cores, pull shutter levers, recover specimens or reclaim drones. A reclaimed drone restores one vitality. Nearby objectives take priority over optional crates.
- **Burst** breaks glass, passes through hostile shots and stuns blue-shield drones. Shielded drones must be stunned before they can be reclaimed. Cooldown appears on the button.
- Release every root core, then reach the glowing exit. Two optional specimen jars and an untouched run improve your rating.
- Keyboard: WASD / arrows to move, E / Space to grasp, Shift to burst, P / Escape to pause. Mouse drag and on-screen buttons also work. Touch supports movement, Grasp and Burst together.

## Content and progression

Eight authored laboratory sectors introduce shutters, glass, patrol/sentry/shield drones, movable shielding crates, air currents and periodic reactor vents. There is no timer. Rooms are replayable through the archive; this is not an infinite map generator. Three stars per sector: finish, recover both specimens, take no damage. Best ratings are capped at 24 stars and cannot be farmed by repeating a room.

The first completion of each sector grants one mutation point. Between sectors, spend it on longer reach (+28 units per level), extra vitality (+1 per level), or faster Burst recharge (-0.55 seconds per level), each capped at three levels. Eight total points create a choice rather than unlocking everything. Honey and Jade forms unlock at six and twelve total stars; Rose is available from the beginning. Replay retains mutations and ratings. Restart or regrow resets the current room without taking your archive away.

The moving core has continuous circle collision with metal and closed partitions. Burst uses substeps to avoid tunnelling through metal. Projectiles have collision, line of sight and a visible targeting wind-up; crates block shots. Surface-attached tendrils and trailing body lobes are a procedural visual rig over the collision body, not a full soft-body physics simulation. Shattered glass produces bounded local shards. Cleared cores sprout vines, and drones visibly stun, retract and collapse.

## Saves and mobile

The current room, creature position/velocity/vitality/cooldown, core/lever progress, drone/shot/crate states, hazard phases, collected specimens, archive, mutations, form and mute setting save locally under `bloom-zero-v1`. Loading an active room starts paused. Input and transient visual particles reset on load. Pause, tab hiding and focus loss release held input, freeze simulation/rendering and silence sound. Browser storage may be unavailable in restrictive/private contexts; gameplay still runs, but persistence may not.

Portrait and landscape layouts, CSS safe-area support, minimum 44-pixel controls, following camera and mini-map. Canvas2D with a 60 Hz fixed simulation, 40 FPS drawing, maximum 1.5 DPR, cached facility backgrounds, at most 150 transient particles, 24 projectiles and 18 short sound voices. Audio starts only after interaction and can be muted. Download a PNG specimen card after finishing a sector.

QA uses real mouse/keyboard events and native browser touch events at phone sizes. Browser emulation is not a test on a physical handset. No analytics, account, payments, ads or external network dependency.

Reference: https://store.steampowered.com/app/953490/CARRION/
