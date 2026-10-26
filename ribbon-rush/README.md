# RIBBON RUSH

A one-tap ribbon cutting game adapted from the complete COLOR ROLL game by ABA Games (MIT, 2021). Tap to launch a vertical cutting line. It takes the color of the first ribbon hit, continues through matching colors, and stops on a new color. Longer chains clear more rows and raise the sound/score sequence.

## Play and rewards

Eight seeded orders contain 4 through 11 completed ribbon batches. The moving color lanes, wrapping bars, exponential chain score, escalating row counts, pressure penalty and loss condition are actual adapted source systems. One star for finishing, one for a chain of at least three, one for two or fewer color breaks. Only best stars per order count, max24. Best scores persist. Mint/Berry/Gold cutter paint unlocks at3/9/15 total stars.

Endless Shift unlocks after the first earned star and retains the source's continuing lane/difficulty progression. There are no infinitely unique backgrounds; endless reuses the workshop with bounded active rows. Endless best score is saved during play, even if the player leaves the shift.

Tap the scene or SNIP button. Desktop Space/Up cuts; Escape pauses. Only one cut is active at a time; tapping during it does not spend a shot or queue an unexpected action. All UI is English with short labels. There is no account, purchase, network dependency, recorded soundtrack or third-party commercial art.

## Art and feel

Seven original SVG illustrations cover four work-goggle hamster poses and three detailed pastel craft workshops. Runtime drawing adds stitched/printed glossy ribbons, brass rollers, a real color beam, spring-cutter recoil, multi-color whole ribbon chunks, curls, chained notes, fragments, completed bows and clear win/loss/retry flow. Glyphs distinguish the four colors. Motion reduction disables shaking. New art is not claimed to reproduce the reference videos exactly.

## Running

Open index.html directly or host the entire directory together. All assets are embedded locally; no CDN, fonts or install is needed. Sound is optional and muted by default. Pause/blur/backgrounding clear pending input and stop model, audio and continuous redraw. 60Hz model,40FPS drawing cap,DPR1.5 cap,160-ish transient effects plus bounded chunks and36 decorative curls. Emulated phone/landscape layouts have44px controls. Physical-device performance is not certified.

State saves complete seeded lane/bar geometry, in-flight cut/color, pressure, score, current order, unlocks and paint. Cosmetic fragments restart on reload. If storage is denied the current session still works. Normal URLs expose no QA controls; ?qa=1 is for local verification.

## Sources

The complete original game's declarations, update() and nested addLane()/addBars() are adapted in source-game.js. The unmodified original is in upstream/colorroll.js with a hash manifest. See SOURCE.md and LICENSE-ABA.txt. The crisp-game-lib engine is not bundled or claimed as a wholesale port; local API compatibility handles source RNG, rectangles/collision and scoring while a new canvas/UI renders it.

Run `node tests.cjs`. Tools use standard Python to reproducibly rebuild the art and source adaptation. No source videos, private assets or credentials are included.
