# Tether & Chime

An original pocket-orchestra skill toy. Swing an inertial yo-yo into brass bells, reel in the slack tether, collect stars and light up eight illustrated mechanical music boxes. All illustrations are code-drawn; no image generation, stock art or external requests.

## Play

Open index.html directly, or host this directory with any static server, including GitHub Pages. Everything is bundled and works offline.

- Drag anywhere to move the small round hand grip. The yo-yo swings below on an elastic, slack tether; moving the hand does not directly move the ball.
- Brush bells with a moving yo-yo to ring them. Dotted bells need two separate swings: move away, then return. Bells light permanently once complete.
- Hold REEL, hold a second finger, or hold Space to shorten the string. Release to let it out. Moving bells and springy brass bumpers appear in later boxes. Bumpers affect the ball; the rope passes above the board.
- Collect the three floating stars. Once all bells are lit, Done is available. Two stars give a two-star rating; all three give three. All bells and stars finish the box automatically.
- Best results per box are saved, capped at 24 stars. Mint yo-yo unlocks at six and Lilac at fifteen. Replay unlocked boxes in Collection.
- Keyboard: WASD/arrows move the hand; Space reels; Escape pauses.

There is no timer, payment, life limit or failure penalty. Small side-to-side hand movements build a swing. Reel in to reach a high star. Use wider movements to hit a dotted bell twice; camping inside a bell does not count as a second hit.

## Technical notes

p5.js 1.11.11 (LGPL-2.1; see P5-LICENSE.txt). Canvas 2D at 45 fps, fixed 60 Hz spring simulation, capped pixel density 1.5, 200 transient particles and 22 trail points, bounded audio voices. Original synthesized pitched bell harmonics and soft bumper sounds begin after a gesture. Mute is persistent. The simulation and audio stop on pause/hidden/blur. Local storage saves the exact hand, ball momentum, tether length, moving-bell phase and collection state; reload opens paused, with held inputs cleared on resume. Temporary particles and ribbon history are not saved. If storage is unavailable, play still works but progress will not persist. No offline accrual.

Portrait/landscape layouts, safe-area insets and 44-pixel UI targets support phones. Browser touch emulation is not physical-device testing.
