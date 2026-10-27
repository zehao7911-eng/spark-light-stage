# Midnight at Bat · Batting Club

An original HTML5 3D rooftop batting game inspired by Hit'em — Neon Batting Center on Rezona.

## Controls
- Tap a direction button (left, center, right) when the moving ring meets the small ring.
- A perfect swing toward the lit star scores a target bonus.
- Ten pitches in a set: fastballs, curves, changeups and sinkers. Every hit adds to a streak.
- A home run triggers a short ball-follow camera and distance readout.
- Keyboard: arrows or A/D/W choose direction; Space swings; Escape pauses.
- Completing sets unlocks three bat finishes. Sets become faster after at least three hits. Fewer hits keeps the same difficulty.
- Active sets and personal records are saved locally; storage access is optional.

## Run and package
Use any static HTTP server, for example `python -m http.server 8000` from this folder. The ZIP has index.html at its root for simple HTML5 hosting. JavaScript modules require HTTP/HTTPS; opening with file:// may be blocked by the browser.
All game assets and Three.js are bundled locally. No runtime CDN, account, API key or external analytics.

## Art and implementation
Original procedural Three.js character with rounded helmet, eye details and blinking, articulated arms following the bat grip, swing/weight-shift animation, pitcher windup, ball stitching and trail, cage, turf, lights, seating, targets and score signs. Generated city art is used in the actual 3D scene. Generated cover/icon are promotional illustrations, not screenshots.
Code-native models are simpler than the cover illustration. There is no claim of pixel-perfect recreation or affiliation with Rezona/reference creators.

## Reference
Actually inspected and played:
https://rezona.ai/game/pgcserver/pv/gabSFeBe/v9/dist/index.html
The public served script was read to understand the observable ten-pitch structure, timing tiers, hit stop, ball flight and home-run logic. That script and the original game's model, images, textures, music and UI are not included. New source, models, audio and generated artwork were independently authored here.
Mobile direction taps and an automatic strike-point timing ring replace mouse-aim precision. Directional star targets, persistent finishes and difficulty progression are new adaptations.

## Verification
Run `node tools/test.mjs`: complete natural routes across four speeds, timing tiers, repeated-swing guard, hit-stop freeze, stars/home runs, no-input completion, exact mid-pitch/pending-contact restore, invalid saves and bounded trajectory checks.
Phone browser layouts checked at 320x568, 390x844 and 844x390. Physical handset certification is not claimed.
High quality: 1024px shadows and render scale capped at1.5. Low quality: no shadows and scale1.0. Static geometry is batched. Rendering stops behind title/pause/result and when hidden.

See CREDITS.md and ART-PROMPTS.json.
