# PRISM RIOT

An original HTML5 neon rhythm concert. Three large shape-coded pads; six short original songs; three light-stage architectures; long notes, two-thumb chords, stars, four light rigs and a seeded Remix Lab. No installs, accounts, currency, ads or network dependencies. All visible game text is English.

## Play

Tap the matching shape when it reaches the bright judgement line. Hold long notes until the tail arrives. A / S / D or arrow left / down / right also work. Missing never ends the song early. Accuracy of 35 / 67 / 90 percent earns 1 / 2 / 3 stars; the first star opens the next song. Extra taps reduce accuracy. The collection stores best records, not farmable reward currency. Clear three distinct songs to open Remix Lab. Light rigs unlock at 4 / 9 / 14 total stars. Remix recombines six existing songs; it is not an unlimited library of authored music.

Relaxed timing is the default (235ms outer window, perfect within 105ms). Precise timing narrows the outer window to 160ms. Input offset is adjustable by ±150ms. There is no competitive leaderboard. Long notes already started before pausing get a protected tail on resume, avoiding punishment for interrupted touch. Pause, losing focus and hidden tabs silence and freeze the show. Reload restores the current take paused. Saves use browser-local storage; storage can be unavailable in private or embedded browsing. Nothing is uploaded.

The phone layout has three 44px+ touch targets and supports simultaneous touches. Portrait, landscape, keyboard and pointer inputs are supported. Audio starts after a user gesture; the Web Audio clock drives scoring and music scheduling, with a monotonic fallback when audio is unavailable. Bluetooth audio can add latency: use the offset setting or wired audio. Physical phone performance is not guaranteed by desktop viewport testing.

## References and original work

Gameplay observation: [Rezona Capybara DJ Frenzy](https://rezona.ai/game/pgcserver/pv/jwXPPPNU/v1/dist/index.html). Its level selection, four named instrument lanes, tap/hold/double-tap instructions and crowd-hype failure were observed. Native taps were attempted, with a zero-score run; no full reference clear or successful reference scoring is claimed. This project has an independently written three-lane chart engine, different original geometry, character, six compositions, UI, progression and artwork. No reference source, recordings, characters, textures or other assets were extracted.

Art reference: the supplied [Neon Vector atlas](https://mygamesartstyle.jupiterthewarlock.com/styles/neon-vector/), including the enlarged Geometry Arena representative screenshot. The shared visual rules are crisp geometric silhouettes, narrow emissive edges, dark low-contrast architecture, distinct signal colours and directional trails. This is not a pixel-art game or a replica of that screenshot. The open-source reference skill/catalog was consulted for rhythm implementation references; no catalog game code or media is bundled. See STYLE.md and artbook.html for the expandable visual system.

## Offline, source and checks

Open index.html or standalone.html in a modern browser, or serve this folder with any static server. These two files inline the engine, rendering, input, CSS and audio synthesis; there are no CDN scripts or fonts. icon.svg is optional. Artbook uses the local source files. Save storage may differ between file URLs and a hosted origin.

Build: `python build.py` writes both inline entries, SHA256.json and ../PRISM-RIOT.zip. Tests: `node qa-model.cjs` validates all six songs, seeded remix playability, holds, misses, spam resistance, progression, pause/restore and terminal guards. Source files are original and MIT licensed. No image generation or external runtime libraries are used.
