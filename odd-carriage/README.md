# Odd Carriage · Nothing to Declare?

An original, compact HTML5 observation game on a hand-inked midnight train. A suitcase grows legs, tea pours upward, a portrait reaches outside its frame. Tap what should not be there. Catch three oddities, watch their objects return to normal and add them to Quill’s casebook.

## Play

- Tap/click a carriage object to inspect it. Correct discoveries restore its ordinary appearance, release an illustrated ink creature toward your punch card, add a stamp and play a distinct catch chord. An ordinary inspection gives a short, gentle response.
- Find all three to finish. There is no timer, health, ticket fare, consumable hint, payment, account or ad system.
- A Little Hint marks one remaining object. The first introductory luggage cue is free. Optional hints affect only the third star.
- Stars: completion; at most one ordinary inspection; no requested hints. Scores reward correct finds and an uninterrupted catch streak. Replay records keep only your best stars. Discovered cases never disappear after a poorer replay.
- Keyboard: 1–9 inspect the nine objects in their accessible label order; H gives a hint; Escape closes a notebook or pauses/returns to the platform. All primary actions also have visible buttons.

Twelve authored stops contain 36 original oddities, four for each of nine object families. All stops are available from the timetable. Three different completed stops unlock Free Ride: seeded remixes draw three different object families and existing gags. It reuses the authored collection and three carriage surroundings; it does not generate unlimited new art, stories or anomaly types.

The three surroundings use passenger upholstery and wooden panels, parcel shelves/crates, and an arched observatory carriage with a curved desk. They share the same object families and one-tap observation loop. The 36-entry casebook has four pages; its illustrations are drawn from the actual runtime object renderer. Collected cards open an enlarged animated specimen; tap it or use the button to switch repeatedly between its ordinary and odd forms. This replay does not change scores or progression.

## Art and references

Original code-native Canvas illustration: selective dark planes, rough doubled contours, local crosshatching, deterministic paper speckle, upright flat props, a scarfed crow conductor, tilted frames, window scenery and scarred wood. Cover is an actual runtime title capture; dedicated SVG icon is original. No image generation, external image asset, commercial character, network font or third-party runtime library is used.

Art direction: the user’s gallery, https://mygamesartstyle.jupiterthewarlock.com/styles/sketch-cutout/ . Its enlarged Don’t Starve wooden-raft screenshot was inspected for irregular silhouettes, pen hatching and paper-like layering. This is an original illustrated train, not copied characters, game artwork, logos or a full interface.

Gameplay direction: Rezona’s public Exit 8 fan recreation, https://rezona.ai/game/pgcserver/pv/GnjolaLB/v1/dist/index.html . English selection, Play, Help and native forward movement from a long corridor to its end corner were observed; the reference remained EXIT 0. No discovered anomaly, correct turn, completed reference run or exact recreation is claimed. This adaptation replaces first-person navigation and route decisions with direct object inspection, whimsical animated tells, a finite collection and forgiving rewards. No reference source, image, model, music or other asset was copied.

The user’s Harbor Haul V2 feedback informed the readability/completeness target, not an independently awarded grade or commercial eligibility guarantee.

## Run

Extract the ZIP and serve its root over HTTP(S). Example: `python -m http.server 8000`, then open `http://localhost:8000`. `index.html` is at the archive root. ES modules require a web server; double-clicking a file URL is not supported. All runtime assets are local. GitHub Pages subdirectory hosting uses relative paths. No install or build step is needed.

Portrait-first touch layout has a separately arranged wide carriage for landscape. Controls and inspection hotspots are at least 44 CSS pixels. Pointer inspection also checks a tiny raster mask of the actual frontmost drawn prop, so extended wings and transparent gaps do not behave like overlapping invisible rectangles; a forgiving 44-pixel centre fallback and keyboard/accessible activation still select the labelled object. Backgrounds are cached, effects/voices are bounded, DPR is capped at 1.5 and render scheduling at 40 FPS. The optional Soft Motion setting reduces illustration movement. Browser-sized phone tests are distinct from a physical-handset performance certification.

Pause, hidden-tab suspension, mute and gesture-unlocked original WebAudio cues/music are included. LocalStorage saves current targets, discoveries, score, animation clock, hints, partial inspections, best records and settings. Transient particles, flying ink creatures and audio voice phases are session-only. If storage is unavailable, the current session still runs.

## Source

- `core.mjs`: deterministic state, inspection/catch rules, rewards, seeded remix generation and validated save restoration.
- `art.mjs`: original carriage/character/prop drawing, 36 gag variants, material marks, miniature casebook portraits and feedback effects.
- `app.mjs`: input, visible controls, layout, storage, audio and complete title/result/notebook/timetable flow.
- `tools/test.mjs`: all authored stops and all 36 gags through ordinary inspection actions, seeded remixes, save continuation, mid-capture restoration, terminal and duplicate guards. Run `node tools/test.mjs`.

Original source/art/audio: MIT. See LICENSE.txt.
