# Dustwood — A Little Frontier

An interactive HTML5 miniature built around the Western Town model supplied by the project owner, credited to Remme.

## Play
- Drag to orbit. Pinch or use + / - to zoom.
- Tap a season to change the town, foliage, weather, and delivery story.
- Find three glowing supplies, then deliver them to the named building for 30 town tokens.
- Use Journal > Find the next bundle if a supply is hard to see.
- Meet three residents for a friendship reward.
- Spend tokens on a lantern garland, porch garden, and campfire.
- Change day/dusk/night and weather; save seasonal postcard PNGs.
- Progress is saved in this browser. Sound starts only after you tap the sound button.

## Run / host
Upload the CONTENTS of this folder to a static HTTPS host. Keep index.html at the package root and preserve vendor/.
Open through HTTP(S), not file://. For a local preview with Node.js installed: node serve.cjs, then http://127.0.0.1:4190/.
No build step, external CDN, account, or network API is required. All JavaScript and the model are bundled.

## Compatibility and performance
Requires WebGL 2 and a modern Safari/Chrome-class browser. Portrait and landscape layouts, touch controls, capped pixel density, batched geometry, and adaptive graphics are included. Approximately 50,401 model triangles and a 2.77 MB model. Desktop browser testing covered 390x844, 844x390, and 1440x900 viewports. Real iOS/Android hardware and the Appai wrapper have not been tested; viewport testing does not guarantee device performance.

## Credits
Western Town model: Remme, provided by the project owner. The original model's licensing and ownership remain with its author; no new license is granted for that asset here.
Three.js: MIT; see vendor/LICENSE.txt.
The town layout is supplied model content; game logic, residents, seasonal presentation and UI were created for this project. Ambient tones are synthesized locally.
