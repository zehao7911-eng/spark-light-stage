# ROOFTOP REVERB

An original detailed-pixel four-lane rhythm game. Tap a pad to start; play a falling note when it meets the bright line. A tiny quartet, three city settings and six original short records. English UI, phone portrait/landscape and desktop keyboard support. No generated images.

## The loop

1. Tap one of the four pads to wake the band. This first gesture is a preview, not free score.
2. Follow the falling notes. Use the four pads, D/F/J/K or 1/2/3/4. Holding does not automatically play notes; each note needs a new press. Chords are not required.
3. A real hit plays that instrument, changes its musician's pose and sends a pixel burst from the rail. More hits light nearby windows and attract up to six listeners. Every eight uninterrupted hits trigger a chorus, cheering arms and 200 bonus points. A missed note or an off-beat strum breaks the chain; it never ends the show.
4. Finish a record to put it on the shelf and open the next one. Replay for a cleaner take. Records retain maximum stars and maximum score rather than accumulating repeated awards.

The six authored charts contain 122 notes in total. Their tempo, spacing, sequences and melodies differ. This is a finite collection of compact performances, not an endless song generator or a commercial-scale music library. The three settings are Apricot Roof (air conditioner, vending machine, brickwork and sunset skyline), Raincheck Station (canopy, signage, train, rain and puddles) and Glasshouse Dawn (glass ribs, planters, light shaft and fireflies). All share the quartet and visual grammar.

Stars: finish for one; at least 60% feel for another; at least 86% feel and no more than two misses for the third. Feel weights Perfect/Nice/Late as 1/0.8/0.5. Standard timing allows +/-0.32 seconds; Gentle allows +/-0.46. The two inner timing tiers remain +/-0.13 and +/-0.24 seconds. Gentle applies to a newly started record, and the result labels it. Early, late and empty presses do not silently count as perfect notes.

## Controls, audio and saves

Tap pads or press D/F/J/K (or 1/2/3/4). Escape pauses/resumes; the pause button and record shelf work on touch. The record shelf and pause card scroll on short screens, with a sticky return button. Sound, Low Power and Gentle settings persist. Low Power reduces the rendering cap and rain count. No camera/microphone permissions, purchases, ads or network accounts are needed.

Audio starts after a gesture. Original synthesized instrument voices accompany successful hits; a locally synthesized bass/percussion backing follows the song clock. No recorded songs or downloaded sound samples are included. Pausing or hiding the page cancels active/scheduled voices. The short result chime plays after the final record stops. Actual audio quality and latency still depend on the device/browser.

The active chart clock, hit/miss grades, combo, score, per-lane debounce and settings are saved in this browser. Reopening an active record pauses it; resume reanchors its clock, without jumping over notes. Audio oscillators, decorative frame age and particles are not restored. Browser storage clearing removes the collection. Saves are local, not cross-device/cloud accounts.

## Art and references

All runtime art is original source-pixel Canvas drawing, with three cached 640x260 environments and four characters each having eight idle and eight playing frames. Shapes, brick joins, pipes, grille dots, window mullions, clothing, instruments and particle rectangles use the same source-pixel grid and restrained colour groups. CSS nearest-neighbour display preserves the grain. Fine detail is concentrated in the scenery; the note-reading surface is intentionally quiet. The wide-screen composition places the scenery beside the lanes. The SVG icon is original; cover.jpg is an actual native runtime screenshot, not separate promotional art.

The [detailed-pixel gallery](https://mygamesartstyle.jupiterthewarlock.com/styles/detailed-pixel/) and its enlarged S4U rooftop scene were visually inspected for warm window light, grouped pixel texture, background building layers, cables and railings. No reference screenshots, characters, UI, source code or textures are shipped.

Gameplay reference: [The Root Cellar Cabaret on Rezona](https://rezona.ai/game/pgcserver/pv/ceuaiXjQ/v3/dist/index.html). Its title/instructions and public performance were actually started with native controls. D/F/J/K inputs produced an observed FINE marker and score 0 to 105. No completed reference round is claimed. This implementation independently adapts four-lane note timing into an original mobile pixel quartet, finite charts, forgiving completion and saved record collection. Earlier continuous-pitch and single-button music games overlap the broad genre; this is not claimed to be a never-before-seen rhythm mechanic.

## Run and host

Serve this directory over HTTP, e.g. `python -m http.server 8000`, then open `http://localhost:8000/`. ES modules require HTTP; double-clicking index.html is not a supported launch method. Deploy this folder unchanged on a static host. The ZIP places index.html at its root. No build process, external runtime, package installation, remote fonts, CDN or API dependency is required. Use a current Safari, Chrome or Edge browser.

## Verification

`node tests.mjs`: 903 assertions, including all six charts at three ordinary input offsets, honest timing tiers, first-gesture preview, repeated-event debounce, chain/chorus logic, missed performances, completed-state immutability, partial restore/continuation and malformed saves. These are model controllers, not human play or a human difficulty study.

Separately, native browser pointer routes using the visible progress bar completed all six records and earned the actual 6/6 shelf, 17/18 stars. Record 1 was Gentle, 12/12, 100% feel, 1760 points; records 2-6 were Standard: 16/18 and 2100; 19/20 and 2820; 24/24 and 4080; 20/20 and 3140; 28/28 and 4760. Record 2's 960-point partial run reopened paused and continued to its valid result. This is automated ordinary UI input, not a claimed human perfect performance.

Phone viewport checks covered 320x568, 390x844 and 844x390, no horizontal overflow, observed main buttons at least 44px and accessible sticky return controls. Sound/Low Power setting reload and a byte-identical paused screenshot pair were checked. Final local console warnings/errors were empty. Physical handset hardware and subjective sound/art quality have not been tested or independently graded. Passing checks does not establish platform A/S quality.

## License

Original source, drawn assets and synthesis: MIT, see LICENSE.txt.
