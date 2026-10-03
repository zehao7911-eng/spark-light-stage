# Pepper Panic

A mobile HTML5 score-attack platformer, with redrawn cartoon art and mechanics inspired by Pizza Tower. This is a small browser reinterpretation, not a pixel-perfect copy or the full original game.

Open index.html in a modern browser. The packaged index.html is self-contained and works offline without a CDN or asset downloads.

## Controls
- Arrow keys / A and D: move.
- Space / W / Up: jump; press again for an air jump.
- Hold X / Shift / Smash: build speed, smash fragile walls and ordinary enemies.
- Press Smash again in the air: ground slam.
- Jump on helmet enemies; stone ledges cannot be smashed.
- Break the face pillar at the far end, then return to the EXIT.
- During the return, the green LAP 2 button offers an optional second lap with extra points.
- The countdown summons the pursuing pizza face. Reach the exit before it catches you.

## Progression
Three scene palettes cycle across increasingly long floors. Secret stars, score grades, combos, three permanent perks, personal floor records and optional extra laps give replay goals. Progress saves locally. Damage breaks the combo and costs points; normal enemies do not end a run. Pause freezes timers.

## Offline and mobile
English UI, multi-pointer touch controls, portrait and landscape layouts, a 360px minimum tested viewport, no external requests, cached sprite art, fixed-step physics, capped effects and synthesized sound. Audio unlocks on user interaction. Physical-device performance varies; validation used emulated touch and viewport sizes in Edge.

## Editable source
art.js draws cached sprites and scene stamps. game.js handles gameplay, input, audio and saves. style.css provides responsive controls. index.html in this ZIP already embeds them, so edit the modular files and rebuild the embedded document when changing it.

## Validation
Three consecutive floors completed through real touch controls with concurrent inputs. Extra lap, countdown pursuer, retry, jump/slam, obstacle collisions, score rewards, pause and reload progress verified. Portrait 360x640 and 390x844, landscape 844x390 and desktop 1280x800 reviewed. No uncaught JavaScript errors.
