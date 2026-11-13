# Slipstream

A compact 3D wingsuit game inspired by Superflight's proximity-scoring, procedural landscapes and map seeds. The models, terrain generation, lighting, interface and audio are original code-created work. No commercial game artwork is included.

## Play

Drag anywhere to steer: left/right turns, up/down climbs/dives. Release to level the suit. WASD or arrows work on desktop. Hold the Brake button or Space to reduce speed. Fly close to cliffs to build a combo; stay clear for 1.15 seconds to bank it. Longer proximity streaks raise the multiplier up to x8. A collision ends the flight and banks half of the pending combo.

Pass through gold rings for 150 points times your current multiplier. The turquoise portal banks your combo and awards a world bonus before generating a new canyon with a different palette and terrain. Escaping beyond the map or into low clouds also leads to a new world, with a smaller bonus. There is no final world or time limit.

Three starting palettes are available: Amber, Verdant and Frost. Each seed gives reproducible cliffs and ring locations. Retry keeps that seed; New World chooses another. A four-medal record tracks proximity flight, a 500-point banked combo, three rings and reaching a new world.

Pause saves the current flight. The game also saves every five seconds and at portals. Continue resumes the last save, including rings already collected. Crashing clears the active-flight save, retaining personal best, medals and records. Hidden tabs pause automatically. Storage restrictions leave play available but may prevent saving.

## Run offline

Open index.html directly or serve the folder with any static server. The distribution index.html inlines the local Three.js library, game code, style and icon. The editable source and Three.js MIT license are included. No build step, CDN, remote fonts or external media are needed.

WebGL is required. Mobile has capped pixel ratio, instanced terrain, cached geometry, a fixed 90 Hz simulation and 30 fps rendering. Real-time shadow maps are avoided in favor of directional light, colored strata, fog and atmospheric depth. Wind and reward tones use Web Audio after a user gesture.

## Validation

Tested in Edge with mobile touch events and 390x844, 360x640, 844x390 and 1280x900 layouts. Tests fly through three portals, collect nine rings, verify proximity scoring, pause, save/resume, air braking, collision, retry and reproducible map seeds. Online and offline versions are tested separately. Physical Android/iOS handset performance has not been measured.
