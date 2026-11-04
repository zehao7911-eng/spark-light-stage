# FIT FLIP

Swap the wardrobe. Steal the spotlight.

An original, buildless English HTML5 3D costume puzzle. Pick Hats, Jackets or Shoes, then tap two people; that part trades places. Dragging person to person also works. Match all three pieces to each target card. Green pieces are correct. There is no timer, life counter or purchase.

## The complete small game

- Eight authored calls, progressing from two actors and one swap to three actors and six minimum swaps.
- Five modeled looks: Chef, Magician, Sailor, Aviator and Detective. Three original adult faces, articulated hands/legs, grounded shoes, clothing-only flying exchanges, preparation/catch/recovery, blinking and celebration poses.
- Dressing room, rehearsal theatre and rooftop premiere sets; three environments across the calls.
- One star for finishing, two at par + 2 or better, three at par. 24 maximum best stars, with no duplicate award from replaying a receipt.
- Free Undo and Hint. The optional Swap hint button performs a normal legal swap; hints do not cost stars.
- Earned Lookbook: select costume, drag to turn, tap the person to switch faces, press Pose. The studio uses the dressing-room backdrop.
- Final Remix cycles five role assignments through the same eight authored layouts. This is a finite puzzle collection, not infinitely unique generated levels.
- Local save includes an in-flight exchange. Settings include Sound, Light graphics and Gentle effects. Optional host cosmetics are never required.

## Run and import

Serve this directory over HTTP(S), opening index.html. For example: `python -m http.server 8000`. There is no build or CDN dependency. Keep all modules, vendor/ and assets/ together. ES modules should be served with a JavaScript MIME type. A phone file manager may not execute a locally opened module page; use the hosted link or a static server.

The standalone ZIP has index.html at its root and includes only this game. See GAMEWAVE-IMPORT.txt for the optional host contract. WebGL is required. Audio unlocks on a gesture. No microphone, camera or motion permission is needed.

## Keyboard

H/J/S choose a part; 1/2/3 choose actors; Z undoes; ? gives a hint; Escape pauses or closes a panel. Modal buttons support Tab and Shift-Tab.

## Reference and provenance

Rezona Today's Fit / Nostalgic Fit:
https://rezona.ai/game/pgcserver/pv/dWzjLSNDyl/v5/dist/index.html

We inspected its Fullbody category, Fullbody 1 selection and visible layer count increasing from one to two. It is a 2D layered dress-up tool. This game independently adapts garment-snap feedback into a new 3D wardrobe-swapping puzzle. No reference models, images, source, audio, characters or interface are included. All faces, garments, sets, SVG icons and synthesized sounds are original code-built assets. The cover is an actual runtime screenshot, not an image generation. Original shared geometry and optional SDK helpers are reused under MIT. Three.js r147 is bundled with its own MIT notice.

## Verification and limits

`node tools/test.mjs`: 1,752 checks over 40 complete controller routes, save/undo/award and bounded SDK mock cases. `node tools/model-test.cjs`: 12,978 actual mesh/pose checks covering fixed limbs, contact, sole clearance, bounds and instancing. All eight calls were completed through ordinary browser controls (the free Hint action was used in later calls). Mobile browser layouts at 320x568, 390x844, 568x320 and 844x390 and a desktop viewport were reviewed; narrow landscape controls were corrected. Native drag, Undo, look switching, face switching, turning, Pose, in-flight pause/reload and settings persistence were checked.

These are browser and automated checks, not physical-phone thermal/GPU/battery measurements. Real GameWave import, native host interactions/cloud sync and host certification have not been tested. No platform grade or commercial-reference parity is promised.
