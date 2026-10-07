# Quiet Kiln

An original, offline-capable p5.js pottery studio. Drag sideways at any height to sculpt a spinning clay vessel. Compare its silhouette with the small commission card, move to glazing, brush different colours into bands, and fire the result. Every piece is saved to a collection with its shape-harmony score and one to three stars. There is no timer, failure penalty, or purchase.

Twelve distinct vessel profiles cycle in order. Six glazes are available immediately. Completing two pieces unlocks Stardust decoration; four unlock Petal glaze. The collection retains the latest 36 pieces. Orders cycle after twelve; this is not an unlimited unique level generator. Art uses original Canvas2D software-rendered surfaces rather than 3D meshes or downloaded game assets.

Touch or mouse: drag on the clay. Undo restores the previous stroke in the current phase. Start over requires a second tap. Brush on unpainted clay or over existing colour; any unpainted areas receive the selected base glaze when fired. Switch sound with the musical note. Collection pauses the wheel. Tab hiding pauses animation and silences sound. Browser storage saves the active object and collection; restoring a firing session returns to glazing without duplicating the reward. Undo history is session-only.

Open index.html directly or serve this folder through any static host. All assets are local; no network, build step, account or WebGL required. p5.js 1.11.11 is distributed under the bundled LGPL license. English interface. Responsive portrait and landscape, bounded effects, 45 FPS and capped 1.5 device pixel ratio. Desktop Chromium native-touch emulation is used for verification; physical phone performance is not claimed.
