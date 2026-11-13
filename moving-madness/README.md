# Moving Madness

Three small, playable 3D furniture-delivery courses, following the colorful shapes, pull-and-release input, and surprising physical objects of [WHAT THE GOLF?](https://store.steampowered.com/app/785790). This is a three-course prototype for judging the look and feel, not a large campaign.

## One gesture

Pull backward on the scene and release to launch the selected furniture. A dotted line shows the direction and relative strength, not a collision prediction. The coral ring marks the selected object. The arrow over the truck marks the loading zone.

1. **Bed Springs:** the bed jumps when it crosses a spring pad. Send it into the truck.
2. **Keep Cool:** hitting the orange soda can opens the fridge and gives it a fizzy speed burst.
3. **Sofa, So Good:** the sofa breaks into three physical cushions on impact. Tap each cushion to select it and collect all three in the truck.

There is no move limit. A better move count earns more stars and updates your personal best. The three delivery stickers record completed courses.

## Feedback and controls

Furniture and props have independent positions and velocities. Collision impulses can knock boxes, cones, and posts around. Gravity, ground drag, wall rebounds, springs, and loading animations run at a fixed simulation step. Dust, wood chips, gas bursts, squashing, synthesized sounds, short vibration pulses, and cheering movers provide feedback.

Wait for the selected furniture to land before launching again. Other stopped cushions can be selected while a piece moves.

- ↶ restores the last pre-launch state, including a sofa that has split.
- ↻ restarts the current course.
- The delivery board lets you revisit unlocked courses.
- Desktop alternatives: Space launches a gentle shot toward the truck, Z undoes, R restarts.

Progress saves locally under `moving-madness-v1`: current physics state, moves, collected cargo, the last undo, best scores, unlocked courses, and sound preference. Overlays and hidden tabs pause the simulation. No offline simulation runs. Denied storage leaves the game playable without persistence.

## Run and host

`index.html` is the entry point. Host the complete folder on GitHub Pages or any static server. The ZIP includes its renderer locally; no CDN, external font, or runtime asset service is required. The game UI is English.

The main scene uses locally generated rounded furniture and scenery with Three.js, capped pixel density, mobile rendering at 30 fps, directional shadows, and cached geometry. If WebGL cannot initialize, a simpler Canvas view uses the same physics and controls. You can check that view with `?renderer=canvas`.

Tests cover real touch gestures for all three deliveries, sofa splitting and cargo collection, physical spring and gas triggers, wrong-angle boundary rebounds, mid-course save/undo, pause, repeated resets, landscape touch, denied storage, and Canvas fallback. Layouts were inspected at 360×640, 390×844, 844×390, and 1280×900. This browser testing does not certify every physical phone.

All furniture, scenery, artwork, and audio are created by the included code. Three.js is distributed under its accompanying MIT license in `vendor/THREE-LICENSE.txt`.
