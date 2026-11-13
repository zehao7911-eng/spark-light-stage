# FIZZ FIX — Good Things on Tap

An original, English, one-button 3D soda-fountain game. Hold the scene or POUR button to reach the green line; release to slide the drink to your guest. Space also pours, Escape pauses. No countdown, purchases or limited lives. A missed pour gets a fresh glass, free.

Six authored shifts contain 43 orders across a daytime diner, after-hours record bar and orbital lounge. Three cup/flow profiles, animated sipping guests, foam spills and three-perfect-pour Fizz Parties give a clear rhythm. Earn up to 18 best-only stars; six unlock a wider-perfect brass tap and twelve unlock slower soft flow. Replay any opened shift. These are six finite replayable shifts, not unlimited unique levels.

## Run and rebuild

Open index.html through a static HTTP server or GitHub Pages. It and standalone.html each include all gameplay, styles and Three.js locally: no CDN, build tool, account or SDK needed to play. icon.svg is optional metadata. `python build.py` rebuilds both bundles and ../FIZZ-FIX.zip from the editable source. `node tests.mjs` and `node model-tests.mjs` run the controller/SDK and generated-mesh checks. These tools are needed only for development.

## Art and sound

Original code-built rounded models, thick glasses, foam, diner fixtures, vinyl deck, neon framing, porthole, planets and tiny floating garnish details share a cream/navy/strawberry/teal palette. Hand animation appears while pulling the lever; guests hold their delivered glass. Particles retain their authored small sizes. Synthesized taps, pour bubbles and reward chords need a user gesture to start. There are no recorded tracks, generated bitmap assets or copied reference media. cover.png is an actual game screenshot; icon.svg is original vector art.

The liquids, spills and hands are stylized animations, not general fluid simulation or physically exact full-body IK. Sound has not been independently audited on a physical handset.

## Mobile, saves and optional hosting

Responsive portrait and landscape controls, pointer capture and cancellation, 44+ CSS-pixel primary actions, safe-area padding, scrollable dialogs, Easy Pour, Gentle Effects and Light Graphics are included. Light caps pixel ratio at one and disables real-time shadows. Full graphics caps pixel ratio at 1.5. Current browser WebGL is required. A physical handset performance or thermal benchmark has not been performed.

Local save key: fizz-fix-v1. Best progress, settings, current cup, score and order survive reload. An active restored shift opens paused; interrupted holds stop without auto-serving. Availability of browser storage determines persistence.

The guarded, optional GameWave bridge never blocks startup. Genuine supported positive-like and direct-comment callbacks unlock one-time cosmetic gold rim and party coaster; neither is required. Unsupported prompts stay hidden. No App interaction or cloud round-trip has been certified. See GAMEWAVE-IMPORT.md.

## Provenance

Original gameplay and art. Service-order/reaction readability was referenced from Rezona Sinferno Pizzeria (aCIjanHX/v4); its actual title, opening shop and first customer/order were observed, not a complete reference playthrough. No reference code, assets, audio or visual-parity claim. Primitive/SDK scaffolding is reused from this project's original MIT games and adapted here. Three.js r147 is bundled under its MIT license in vendor/THREE-LICENSE.txt. Our game code is MIT; see LICENSE.
