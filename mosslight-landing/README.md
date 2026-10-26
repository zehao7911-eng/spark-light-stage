# Mosslight Landing

A little seedpod lander exploring twelve handcrafted sky routes across three gardens. Hold the sky to steer toward your finger, then release just above a gold dock. Each safe dock refuels the ship and becomes a checkpoint. Gather optional lightseeds, earn medals, buy three equipment tracks, and unlock Hover and Shield. All twelve routes form a finite campaign with an ending and replayable best records.

## Play

Serve this directory over HTTP and open index.html. All runtime assets and the font are local. Touch: hold a point in the sky, release to descend. Buttons offer manual left, lift and right. Keyboard: A/D or arrows, Space/Up lift, Shift hover and B shield. Pause before leaving a flight to visit the atlas or hangar. Progress saves locally in the browser; private browsing or clearing site data can remove it.

## Build and test

Node.js 22+, pnpm. Run `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm test`. The supplied game.js is the prebuilt browser bundle. src/ contains its complete editable source; tests/ contains rule and twelve-route simulation tests. The test pilot uses normal input commands in the model, rather than teleporting or assigning completed states. Other focused rule tests deliberately arrange isolated states.

## Accessibility and performance

No timer limit. Checkpoint recovery, visual guidance, sound toggle, native buttons, keyboard controls and reduced-motion support. Physics uses fixed 60 Hz steps; rendering is capped at 30 fps. Tested browser viewport sizes are listed in BROWSER-QA.md. Mobile browser emulation is not a claim of testing every physical phone.

## Credits and license

Selected propulsion and safe-base routines are translated and adapted from OSGG by Jimmy Christensen, Copyright (C) 2008, GPL version 3 or later. This is not the original native engine. All editable game source and upstream reference files are included under GPL-3.0-or-later; see NOTICE.md and LICENSE. VT323 font is under the separate SIL OFL in FONT-OFL.txt. Original generated visual assets and their prompts are documented in ART-SOURCE.md. Original synthesized feedback audio is created locally after enabling sound.
