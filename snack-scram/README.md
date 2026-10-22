# Snack & Scram — Courtyard Update

Original Unity 6 WebGL food-and-escape game inspired by Pizza Possum. Original procedural 3D models, shaders, articulated animation, and synthesized audio; no commercial game assets.

## Three courtyards
1. Bakery Break-in: six cake bites and one flower refuge.
2. Market Mischief: two courses across the red-striped market; ten bites in total.
3. The Garden Feast: three meals and two pursuing guards; twelve bites.

A successful getaway advances to the next courtyard. After the garden, another lap begins with slightly faster pursuit (capped). Three wins unlock the tiny chef hat. Best score, wins, round and audio preference persist locally. Previous v1 records migrate without a reset. This remains a compact three-courtyard game, not a full commercial campaign.

## Controls and feedback
Drag with one finger or WASD/arrows to move. Tap a food callout to approach and eat automatically; each course switches the target. Eat all courses, then enter the marked flower refuge and stay hidden until its bar fills. Tap DASH (Space on keyboard) for a 0.85-second burst with a four-second cooldown. Guard dogs react to the second bite, then pursue; the opening grace is 5.5/7/8 seconds for the three courtyards. Hide before they catch you.

Bites arc into the mouth, with jaw/cheek animation, belly inflation, flying crumbs, crunchy sound and score bounce. Chasing includes persistent alert marks, guard rings, running dust, barks and a proximity vignette/heartbeat. Dash, pause, mute, retry, confirmed record reset and rendered PNG postcard are available. All interface text is English.

## Hosting and editable project
Serve this folder over HTTP(S), not file://. Upload the root index.html and accompanying files. All runtime assets are local; gzip fallback supports GitHub Pages without special server headers. Versioned v2 build filenames avoid stale v1 engine caches.

Unity-source contains Assets, Packages and ProjectSettings for Unity 6000.6.5f1. Install official WebGL Build Support, then invoke SnackBuild.Build. Generated Library/Temp/Logs are excluded. Source template uses the engine's generated filenames; packaged export uses versioned names.

## Validation and limits
Native core tests cover three stages across six runs, meal boundaries, duplicate feeding, first-bite timing, hide success, pause and catch grace. Actual browser UI tests completed all three courtyards twice including one full pass at 390x844, score 102/210/276; catch/retry, dash cooldown freeze, save/reload and hat retention passed. Also inspected 320x667 and 844x390 layouts. Desktop mobile viewport emulation is not physical handset certification. Runtime is approximately 5 MB compressed. First bite about 0.55 seconds is measured after input; network/engine startup is separate.
