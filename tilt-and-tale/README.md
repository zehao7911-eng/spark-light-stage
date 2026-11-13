# Tilt & Tale — The Little Grand Tourney

A one-finger, hand-drawn animal-knight jousting game. Nine original rivals, three illustrated arenas, six pieces of upgradeable tack, a crest book, earned colors and an Encore circuit. English throughout. No purchases, ads, accounts, backend, external libraries or generated images.

## Play

Open `index.html` or `standalone.html`. Tap/drag on the field to aim the blue sight at the rival's gold seal; touching the field also starts the charge. Alternatively, set the lance slider and press **Charge**. Riding and striking are automatic. Keep adjusting the aim as the gold seal moves. A perfect strike removes two balance marks; a solid hit removes one. A glancing strike also costs one armor heart; a miss costs armor without removing rival balance. Each pass waits for your input. There is no global timer.

Win the bout to earn a crest and, on the first victory over that rival, one upgrade. Choose tack on the result screen or later in the book. Three stars require every strike to be solid or perfect; replays improve the best crest but grant no additional upgrade. A loss retries the same rival for free. New rivals introduce gentle sway, a late guard change and fluttering seals. First-time controls have a small touch aiming assist; the slider and keyboard remain direct controls.

Tack: Steady widens the perfect zone; Padded adds armor; Breeze lengthens the approach; Bold strengthens perfect strikes; Ribbon forgives one graze per bout; Second Wind prevents one final fall. Each has a finite cap. A new match equips owned tack. Three crests unlock Rose colors; six unlock Indigo. All nine unlock Encore: repeat the nine authored opponents with capped extra balance/speed and retained tack. Encore is parameter variation, not infinitely many authored arenas. There are no duplicate upgrade rewards.

Desktop: arrows / W S to aim, Space to charge. The native slider also works with keyboard navigation. Pause, mute and the book are always available. Switching tabs, cancelling a touch or rotating the viewport mid-charge pauses the match. Progress and the exact current pass are stored locally per browser/origin. Reload shows an explicit Continue screen. Reduced motion can be enabled in Pause.

## Art and reference

Art direction: [Flat cartoon and bold contours](https://mygamesartstyle.jupiterthewarlock.com/styles/graphic-cartoon/) from the user's art atlas. Its representative *Cult of the Lamb* scene was visually inspected for consistent outline weight, flat color grouping and stage hierarchy. The game uses new characters, heraldry, architecture, UI and sound; no game screenshots, logos, character assets or full interfaces were copied. `STYLE.md` explains the shared rules. `artbook.html` displays the same runtime drawing system as a clearly labeled art study, not game progress.

Gameplay reference: Rezona [Tournament of Steel](https://rezona.ai/game/pgcserver/pv/OVKxsQlp/v1/dist/index.html). Actual entry into the first bout, riding input, damage and a loss screen were observed. The reference's combined riding / camera / shield / strike controls were simplified to a one-finger aim-and-charge loop. No reference source, assets or sound were extracted or reused. The imported open-source game catalog was consulted; its browser joust search returned no matching starting project. This is independently authored source, not a claim of modifying a complete open-source jousting game. Thousand Strokes was inspected at its rules screen and rejected for multi-action complexity; Root Cellar Cabaret remained at its loading screen and was not used as a gameplay reference.

## Build and verify

`python build.py` embeds all runtime CSS and scripts into `index.html` and `standalone.html`, creates `SHA256.json`, then produces `../TILT-AND-TALE.zip`. The ZIP includes a `tilt-and-tale/` root folder, editable sources, art study, licenses and checks. Double-click the self-contained entry file to play without network dependencies, or host the folder on a static server.

`node qa-model.cjs` checks 27 complete simulated routes across all nine rivals, losses, upgraded Encore matches, exact save continuation, Ribbon / Second Wind, finite target ranges, upgrade budgets and guarded terminal transitions. Those model controllers do not substitute for human fun or device testing. Simulation is fixed at 120 Hz, rendering is capped at 40 fps, DPR at 1.5, static scenery is cached and particles are bounded. Pausing stops simulation and redraws except a requested layout refresh. Arena artwork and creatures are code-drawn paths; there is no physics-engine claim for the cartoon tumbling animation.

Modern Canvas 2D and Pointer Events are required. Mobile portrait and landscape browser layouts are supported; performance on a physical device varies with hardware/browser. No platform rating or commercial payment is promised.

Original source, drawings and sound: MIT, see `LICENSE.txt`.
