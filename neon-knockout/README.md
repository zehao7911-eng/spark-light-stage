# Neon Knockout

An original, compact single-player HTML5 streetball duel, inspired by the impact, ball returns and comic energy of Lethal League Blaze (Steam 553310). All characters, court illustrations, animations, audio, code and UI are original. No assets or source code from the reference game are included. This is a smaller browser interpretation with its own air-boot movement and goal-wall scoring, not the commercial game's complete fighting system.

## Controls

Drag your fighter on the court, or use the two-axis movement pad. Hold HIT for forgiving automatic swings when the ball enters reach, or tap close to the ball for a perfect hit. DASH moves you quickly and gives brief invulnerability; its cooldown is two seconds. With no movement direction selected, DASH sidesteps the incoming ball. Keyboard: arrows/WASD move, Space hits, Shift dashes, P pauses.

You defend the green left wall; the rival defends the pink right wall. Hits aim at the rival's current position. Every return accelerates the ball, capped at 620 world units/second. Hit a rival or break past them to their back wall to score. Incoming balls can hurt you or score at your back wall. A short gold dashed ring shows when a return is possible. Five successful returns charge the next swing into Overdrive. If you are not holding HIT, a fast incoming ball slows temporarily near you (FOCUS), giving touch players a readable timing window. Three hearts, retries without losing upgrades, a 100-second match limit, and a gentle first opponent.

Rivals gain up to five hearts and increased movement speed in later rounds. Six illustrated courts unlock sequentially; further rounds revisit them with different seeded rival behaviour. Finishing gives one star, no damage gives another, and at least three perfect hits gives the third. Tokens buy three levels of bat reach and automatic guards; four outfit colors are freely selectable. The court book lets you replay earlier rounds, with confirmation before abandoning an active match.

## Technical

Open index.html directly, or serve this directory with any static web server. No build, account, external network, CDN, font, WebGL or image generation dependency. Original Canvas2D art is cached for the static environment. Draw at capped DPR 1.5, fixed 60Hz game updates, ball collision substeps, bounded effects and trails. Phone portrait and landscape layouts use at least 44px buttons. Audio is synthesized locally after a user gesture; mute is persistent. The original quiet four-beat backing pulse and impact sounds stop when paused.

Progress, the exact active match, random generator state, gear, outfit and mute setting save locally under neon-knockout-v1. Input is released on pause, hidden tabs, interrupted gestures and restore. No player data is transmitted. Clearing browser data resets progress. Actual phone hardware is not certified by browser touch/viewport emulation.
