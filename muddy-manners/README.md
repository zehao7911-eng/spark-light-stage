# Muddy Manners
A compact original HTML5 puppy mischief game, directionally inspired by Steam's DORONKO WANKO (https://store.steampowered.com/app/2512840/DoronkoWanko/). This is an independent miniature interpretation with new code, geometry, room layouts, UI and synthesized sound. It does not contain the commercial game's assets or full house/campaign.

## Play
Drag the RUN circle, tap the floor to trot, or follow a scent with the arrow button. Tap SPLASH near an object. The first stack is within reach immediately. Six successful pranks complete a room. Mud slowly replenishes, and the puddle quickly refills it. There is no failure timer or combat.

Three authored rooms: living room, playroom and sunroom. Sofas stain and bounce, books/blocks/seedlings tumble, pots fall, fans/pinwheels/sprinklers spin and spread mud, little robots wander with muddy tracks, and rolling toys/watering cans bounce. The playroom also has an opening toy chest, and the sunroom has a wooden bench, seed trays and gardening props.

Two hidden treasures are revealed by props per room. Completion earns two stars; reach85% muddy for a third. Choose Keep making a mess to continue freely after finishing. Open Receipt to see your updated result or advance. The album allows replay and unlocks a rose scarf at2 total stars, a sun hat at4 and a duck hat at6. Best stars are capped at9 total; replay does not farm duplicate rewards.

WASD/arrows steer and Space splashes. Pause, mute, restart current room and room album are available. Positions, stains, completed pranks, mud, robot state, best stars and outfit save in this browser. Held controls and auto-walk paths release on reload. Transient particles and the decorative individual paw-print trail restart. Saving is periodic and on interactions/pause; blocked browser storage falls back to a playable session.

## Art and mobile
Original lit 3D Pomeranian toy with68 instanced fur clumps, animated paws/tail/head/tongue, wardrobe, rounded furniture, linen-like pastel palette, window frame, curtains, framed art and potted greenery. Shared geometry, batched static rooms, capped110 instanced airborne particles and220 low-detail paw prints. Mud coverage uses288 cells rendered into one local floor texture. DPR capped1.5, rendering at most40FPS, fixed-step rules. No generated images, account, remote font, sampled voice or CDN requirement.

Phone-friendly one-finger controls and46px main interface buttons; portrait camera follows closer, landscape shows more of the room. Browser viewport and play testing are documented in QA.md. Physical handset performance is not certified.

## Files
Serve this folder over HTTP(S) and open index.html. All assets are bundled. Three.js r147 is MIT licensed; see vendor/THREE-LICENSE.txt. core.js contains testable rules, art.js the procedural 3D scene, game.js controls/UI/audio/storage. No build step or Unity/Godot runtime download. The downloadable ZIP includes the source and a Node rules test.
