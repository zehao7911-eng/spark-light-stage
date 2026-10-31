# SEEDSTRIKE

Match seeds. Grow a defense.

Swap adjacent cells to line up three members of the same seed family. They grow into a plant that fights automatically. Include a grown plant in the next match to increase its level. Four and five seed matches create stronger plants immediately. Cascades can grow several defenders from one move. Invalid swaps are free.

## A complete garden

One six-wave defense run introduces seven seed families, armored enemies and a large final visitor. Clear rewards add new seeds to the board. Plants remain for the next wave. After the final visitor, Keep growing starts repeatable, bounded horde waves. This is one garden with six waves, not six separately painted worlds.

Lime shoots rapidly into nearby lanes. Frostbud slows. Fume pierces groups in its lane. Melon splashes across the lawn. Sunbloom heals nearby plants and generates Sunburst charge. Cactus hurts enemies at close range. Snap Dragon takes a powerful close-range bite. Match grown plants up to level four. Grown roots remain while loose seeds fall around them. If no swap is available, a new arrangement preserves your plants rather than deleting the army.

Enemies walk and bite plants. Cone and bucket armor visibly break away. The final visitor summons reinforcements at two health thresholds. Escaped enemies damage the fence. A full Sunburst damages and pushes the horde, slows it and heals plants. If the fence falls, Restore this wave returns to its starting checkpoint for free.

The seed rack records discoveries and highest plant levels. Choose two unlocked companions alongside Lime for your next garden. Changing this selection does not replace your current defense. Best score, collection, settings and the current run save locally when storage is available. Refresh opens the paused garden. Slow foes is an optional assistance setting.

## Controls and presentation

Drag a seed one cell, or tap two neighbors. Hint highlights a valid swap without performing it. Arrows move keyboard focus; Enter or Space selects a cell. P/Escape pauses, H requests a hint and B uses Sunburst when focus is outside a button.

Portrait and landscape layouts use real grid-cell hit targets; tested browser viewports include 320×568, 390×844, 568×320, 844×390 and 1280×720. Short landscape uses a compact playfield and side controls. Desktop keeps the full garden composition. This is browser viewport testing, not physical handset or measured mobile frame-rate certification.

Enemy atlases contain four real walking poses. Growth, recoil, shell fragments, frost, splashes, projectiles and death reactions use code-driven effects around the supplied artwork. No fully rigged attack-animation claim is made. Synthesized sound starts after interaction; Sound and Gentle motion are available in the pause menu. Pausing freezes combat, effects and button animation.

## Run, build and verify

Serve this directory with any static HTTP server and open index.html. Both index.html and standalone.html contain the same classic inline JavaScript/CSS bundle. Artwork is local; no CDN, API, module-loader or external-font dependency is needed at runtime. Keep the assets directory beside the HTML. This is not a single-file embedded-image export.

Run `python build.py` to regenerate the bundle, icon and reproducible game-only SEEDSTRIKE.zip in the parent directory. Run `node tests.mjs` for model verification. The final test report covers the complete campaign, alternate starting teams, post-boss continuation, all seven traits, legal/illegal matching, checkpoints and exact mid-combat save restoration. Automated model checks complement actual UI play; they do not establish a platform grade or subjective fun.

## Artwork and reference

The original code, UI logic, combat, matching and synthesized sound were written for this game. It is not a downloaded open-source full-game adaptation. Art is directly reused from the public Rezona reference **Crush Plant Battle Undead**, at the user's explicit request, retaining the same seed-to-plant-to-defense visual meaning. See ART-SOURCES.json and NOTICE.txt for exact source URLs, original files and hashes. Public availability is not asserted to be an open-media license. LICENSE-CODE.txt applies to our code and excludes third-party media.

The reference was actually entered and played: one seed swap produced LEMON KNIGHT, changed score from 0 to 24 and moves from 6 to 5, and live enemy/fence damage was observed. No full reference victory is claimed. Reference game scripts, logo, fonts and recorded audio are not included. The cover is an actual runtime screenshot; no image-generation service was used for this production.
