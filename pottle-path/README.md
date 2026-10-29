# Pottle Path

A small brass gardener, a few little pots, and a conservatory waiting to bloom. Swipe a pot toward a glowing bed. The gardener finds a real path to stand behind it, walks there and pushes one tile. Every pot on a bed flowers; fill every bed to finish a room. There is no timer or game over.

Twelve authored boards across a glass atrium, copper laboratory and moonhouse. Difficulty grows from one push to multiple pots that must leave room for each other. It is a compact Sokoban interpretation, not a new genre. All rooms are checked by the same push-state solver used by the optional hint. Minimum pushes are 1,2,2,3,5,6,6,10,10,9,9,11. Walks are automated for phone convenience; pots do not teleport through walls or one another.

Stars: complete a room, use no hints, match the minimum pushes. Undo is unlimited and carries no star penalty. A hint points to one good push, without executing it. A bad corner can make a position unsolvable; Undo or Restart is always available. Best stars and fewest pushes are retained rather than added repeatedly. Nine/twenty-four stars unlock Sage/Plum chassis colours. An exact active walking/pushing plan, room, board, undo history and profile save locally. A restored game opens paused; storage failure does not prevent play.

## Controls and running

Serve this folder with any static HTTP server and open index.html. All scripts, vector art and cover are local; there is no library/CDN/font/network dependency, account, tracking, advertising or paid system. Canvas2D does not require WebGL.

Swipe a pot, or select it and tap an arrow. Tapping a neighbouring tile also pushes the selected pot toward it. Keyboard 1–3 selects a pot; arrows push; Z undoes; H hints; R restarts; Escape pauses. Extra pointers are ignored and cancellation never pushes. Invalid actions leave the board unchanged and explain whether the destination or the gardener's access is blocked.

Responsive portrait/landscape layouts, safe-area padding, primary controls at least 46px. Logic runs at 60Hz, normal drawing at most40Hz, maximum80 short effects, DPR1.5. Static room drawings are cached; there are at most three pots plus the gardener. Pausing, hiding or leaving the page releases input and stops simulation/audio; win screens keep a decorative garden animation while leaving the solved model frozen. Mobile viewport/pointer testing does not certify physical handset performance.

## Reference and original artwork

Actually played Rezona Golem Garden https://rezona.ai/game/pgcserver/pv/GljoMZmR/v1/dist/index.html : entered Room1, pressed Up and held Left, reached8moves and visibly pushed a planter left toward another pot. No full reference room completion is claimed. Z did not visibly undo during inspection, so reference undo is not claimed. This original implementation uses independently authored smaller boards, swipe-to-push with automatic access walks, free undo, transparent minimum-push hints, botanical mechanical chambers and optional best-only stars. No reference code, board layouts, images, characters, audio or UI were copied.

Art source studied: https://mygamesartstyle.jupiterthewarlock.com/styles/mechanical-2d/ . The enlarged Lonestar ship screenshot informed drawn panel outlines, modular components, limited metal shade groups and functional light nodes. This is an original botanical interpretation, not copied spacecraft artwork or an identical visual recreation. Runtime art is drawn directly with Canvas paths: an articulated brass gardener with visor/antenna/leaf/feet/arm joints, four flower families, terracotta-brass pots, soil rings, rim bolts, floor inlays, panel seams, pipes, valves, gauges, drawers, moving gears and a moon window. Original matching SVG icon; cover is a real game screenshot. No image-generation tools used. Sounds are original short synthesized footsteps, push clinks, chimes and bloom chords, unlocked by interaction.

## Verification

Run `node tests.cjs`: twelve complete minimal routes, actual access paths and push conservation, minimum-push parity, idle/terminal guards, undo during a walk and after a push, exact mid-walk continuation, hint rewards, bloom-input lock, corrupt save rejection and nonduplicating awards. Native UI campaign, phone layouts and deployment checks are recorded separately.
