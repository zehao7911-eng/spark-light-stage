# BRICKLIGHT

**Fill a row. Light a little street.**

A calm, original pixel block puzzle for touch and desktop. Drag a hanging window
block sideways and release it onto the golden outline. TURN rotates it. Filling
all eight windows in a row lights it up and makes room for the next piece.

There is no automatic falling countdown, combat, life counter, account or payment.
The opening piece is aligned to give the first row reward from one press of DROP.

## A small city to wake up

Nine finite, authored starting streets introduce different gaps and taller
rooftops. Each has a row goal and two golden windows. The source supplies a
deterministic continuing piece sequence if you need extra moves; this is not an
infinitely authored campaign. Three districts have sunset masonry and balconies,
rainy stepped roofs beside the canal, and a moonlit clock/observatory skyline.

The original 288 x 320 pixel renderer includes brick joints, shutters, window
frames, balcony ironwork, shop awnings, planter boxes, street lamps, a timber
hoist, walkers, a cat, passing traffic, rain, water reflections and stars. Real
placed cells and real landing positions drive every window and falling animation.
Line completions send lights to street lanterns and make residents celebrate.

Multi-row completions score 100 times the square of the row count. Consecutive
row-clearing placements earn a chain bonus. Each golden window is worth 50.
Three best-record stars per street reward completion, both golden windows, and
no Guide / roof clearing. Undo is free. Nine / eighteen stars unlock Sea Glass
and Rose Quartz window palettes. The Street Book holds all nine little buildings.

## Controls and accessibility

- Touch or mouse: drag horizontally on the scene and release to drop.
- TURN rotates, DROP drops in place, UNDO restores the previous placement,
  score, queue and collected windows.
- GUIDE suggests a landing but never makes the drop for you. The Pause menu's
  CLEAR THE ROOF removes the top four occupied rows without granting progress.
  Guide/roof use remains recorded even after undo, for an honest optional star.
- Keyboard: left/right move, up turns, Space/Enter/down drop, Z undo, H guide,
  Escape pauses. Tab/Enter also operate the buttons.
- Sound and gentle effects are optional. Audio starts after a gesture. Any
  unsupported vibration request is optional; there is no microphone access.

Progress, active board/queue, pending row clears, undo history, records and
settings save on this browser and origin under `bricklight-v1`. Reload starts
paused. Background tabs and focus loss release input, freeze play and hush audio.
Cancelling a touch never drops a block. Portrait and landscape layouts include
44 px or larger controls. Tests use browser viewport sizes, not physical phones.

## Run / package

Unzip with `index.html` at the root. Serve the folder from any static HTTP server,
for example `python -m http.server 8080`, or upload directly to GitHub Pages or an
HTML5 host. Runtime files are local; no CDN, remote fonts or libraries are needed.

`node tests.cjs` verifies all nine normal-action solutions, occupied-cell and gold
conservation, mid-clear restore, undo, no duplicate rewards, blocked-roof recovery,
no passive falling, optional assistance and terminal guards. `python build.py
<node-executable>` runs these checks, versions resources, and writes a reproducible
`BRICKLIGHT.zip` next to this folder.

## References / original work

The public Rezona Tetris Versus reference was actually started with IGNIS, followed
by a move, rotation and hard drop; the observed score was 20 and line count 0.
Reference: https://rezona.ai/game/pgcserver/pv/aCIjaRDp/v21/dist/index.html . No
reference win, asset license, source adaptation or identical recreation is claimed.
This independently written game removes its battle, automatic fall and character
skills. It uses the established polyomino row-clear rule with a different setting.

Visual study: the Detailed Pixel art gallery and its With My Past sunset city
scene, viewed at https://mygamesartstyle.jupiterthewarlock.com/media/2524360/scene-0.jpg .
The study informed grouped cloud pixels, recessed skylines and warm windows. No
source screenshot, character, logo or texture is included. The actual scene,
interface, pixel icon, collection thumbnails and synthesized sounds are original
code; no image-generation service was used. The cover is an actual game capture.

All included original work is under LICENSE.txt. No platform grade, commercial
art parity or physical-handset certification is claimed.
