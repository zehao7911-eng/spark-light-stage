# AFTERHOURS — visual study 01

A playable art/interaction study for the selected film-road-movie direction: fine pixel city, rain, headlights, storefronts and wet-road reflections. This is an art prototype, not a finished game. It has no campaign, failure system, unlock economy, missions or traffic collision rules.

## Preview

Public preview: https://zehao7911-eng.github.io/spark-light-stage/afterhours/

Download: https://zehao7911-eng.github.io/spark-light-stage/AFTERHOURS.zip

For local use, serve this directory over HTTP and open index.html. Browser viewport layouts were checked at phone sizes. The published build is the visual study; full gameplay remains future work.

## Interaction

- Hold DRIVE or Right/D to accelerate. Release to coast.
- Hold BRAKE or Space/Down to stop and show the brake lights.
- Hold the left control or Left/A to reverse slowly; the station wagon continues to face forward while backing up.
- AUTO enables a slow automatic drive for watching the scene.
- LIGHTS toggles the program-drawn headlight beam. SOUND enables original rain/engine synthesis after a user gesture.
- FRAME or C toggles cinema framing and hides the interface. EXIT CINEMA restores it.
- Escape pauses; leaving the tab also pauses and releases held inputs. Resume returns without a catch-up jump.

## Scope and source selection

The rendering and simple presentation controller in this study are original code. No third-party racing engine is included, and this is not claimed to be a complete open-source game conversion.

The imported open-source reference catalog was used to inspect candidates for a later complete game. Previously used Javascript Racer and HexGL were excluded. Release Cycles was inspected but not reused because a clear code license was not found in the inspected repository. Trigger Rally's GPLv3 source option and restrictions on redistributing its original content were inspected: https://github.com/CodeArtemis/TriggerRally/blob/gh-pages/LICENSE.md . Any later integration must use licensed code with newly created or appropriately licensed assets. Engine integration and full gameplay remain future work.

## Art and runtime

Original scene and sprite atlas generated with builtin imagegen; exact prompts, palette and extraction notes are in ART-DIRECTION.md. Runtime assets are in assets/. The generated original PNGs are retained separately in the workspace. Sprite atlas alpha is preserved. No commercial game characters or extracted artwork are used.

Rendering is capped at30fps with presentation updates on requestAnimationFrame; device pixel ratio is capped at1.5. Rain, spray and props have bounded counts. All runtime assets are local; there are no CDN dependencies. A local HTTP server is needed because frame metadata is loaded with fetch. This has not been benchmarked on physical iOS/Android hardware.

VT323 font is supplied under SIL OFL, see FONT-OFL.txt. New study code is MIT, see LICENSE.
