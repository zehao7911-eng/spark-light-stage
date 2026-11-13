# Second Chance

An original compact HTML5 repair workshop inspired by [Assemble with Care](https://store.steampowered.com/app/1202900/assemble_with_care/): old-fashioned objects, a warm illustrated bench, visible internal parts and the pleasure of bringing things back to life. This is a smaller original browser interpretation, not its commercial assets, characters, story, models or complete campaign. No generated images are used.

## Play

Turn the four screws by tracing a circle around them, or tap each three times. Drag parts from the linen tray into matching faint outlines. Alternatively select a tray part and tap its socket. Tap a fitted part, or use Turn, to rotate its copper terminals. The battery lights up connected parts; connections must meet in both directions. Fit every part and connect every device, then Check power. Hold Seal to close the repair. The front panel comes back, and the object performs its own animation and synthesized sound. Keep it opens the result and the next repair.

Eight authored objects: radio, camera, lantern, robot, cassette player, projector, fan and stereo. Later objects introduce turns, vertical paths, branches and a four-way junction. These are simple matching/rotation circuit puzzles, not real-world electrical repairs or a full mechanical simulator. No timer, lives or early failure. The faint contact outlines intentionally help make the puzzles approachable. Lift, Undo and Hint support experimentation. Wrong parts stay selected; a failed power check does not erase work.

Finish earns one star. No hints earns a second; no failed power checks earns a third. First clears award five stamps plus stars; improved replays award only their star increase. Maximum 64 stamps across the eight objects. Rose, Sage and Honey benches cost 12, 18 and 24, with free switching once owned. The shelf keeps best stars and small JPEG previews; actual workbench PNG postcards can be downloaded. Replaying a repair preserves collection and stamps. There are eight authored repairs, not unlimited unique levels.

Current screws, parts, orientations, undo history, seal progress and profile save locally. Resume begins behind Continue and releases all held input. Completed repairs cannot pay twice after reload. Pause, opening a menu and hiding the tab stop animations and clear synthesized voices. All game UI is English.

Keyboard: Left/Right selects a part, Up/Down selects a socket, Space fits it or holds Seal, R rotates, Delete lifts, Enter checks power, P/Escape pauses. Mouse and touch support dragging, tapping, circular screw turns and press-and-hold sealing. Interface targets are at least 44px; portrait, landscape and vertical safe-area layout are included.

## Run and host

Extract the ZIP and open root `index.html`, or upload the extracted root to static HTML5 hosting or GitHub Pages. Packaged index inlines every script/style. Editable sources are included. No external libraries, CDN, fonts, WebGL, network services, telemetry, build steps or service workers. Original Canvas2D material illustrations and original Web Audio synthesis only. Audio requires user interaction.

Rendering is capped at 40FPS and DPR1.5. The studio background is cached, active effects and oscillator counts are bounded. There are at most six circuit parts and 24 undo snapshots. Inactive menus stop drawing after their initial frame.

## Validation

Pure-engine tests cover all eight circuits, reciprocal terminal rules, rotation, incorrect fitting, undo/lift, hints, complete repairs, first/replay reward caps, all bench purchases and exact saved-state continuation. Browser tests use native emulated touch for all eight repairs, actual circular screw gestures, dragging and rotating parts, hold/release behavior, three-star rewards, collection, bench purchases, PNG downloads, exact pause/reload/audio silence and four phone layouts. Native mouse/keyboard tests cover a full repair, wrong-power/hint grading, lifting/undo, sealing, completed reload without duplicate awards and 35px top/34px bottom safe areas. Cold offline files issue zero HTTP requests. A physical handset was unavailable; browser emulation does not replace hardware testing.
