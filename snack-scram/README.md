# Snack & Scram

An original Unity 6 WebGL opening-courtyard prototype inspired by the readable food-and-escape loop of Pizza Possum. No commercial game assets are included.

## Play
Drag anywhere with one finger, or use WASD / arrow keys. Tap the food callout to walk to it and eat automatically. Once full, tap the flower callout or walk into the flowers to escape the guard. Three food variations repeat; three successful getaways unlock a tiny chef hat. Records and sound preference save locally on this browser. Pause, retry, reset records and save a rendered PNG postcard from the menu.

This is a polished short opening loop, not a full campaign. All 3D art, animation, shaders and synthesized sound are original procedural assets. English UI. No CDN dependencies or account required.

## Hosting and source
Serve this folder over HTTP(S); opening index.html through file:// is unsupported. Upload the web files with index.html at the hosting root. Unity gzip fallback supports GitHub Pages without custom response headers.

Unity-source contains the editable Unity 6000.6.5f1 project (Assets, Packages, ProjectSettings). Install the official WebGL Build Support module, then run SnackBuild.Build in batch mode or configure the Harbour scene and Snack WebGL template. Library and other generated caches are excluded.

## Validation and limits
Native core checks cover six meals, duplicate feeding guards, hiding victory, pause and first-chase grace. Browser UI checks cover the three food rounds, save/reload, hat unlock, touch-style pointer dragging, pause, mute and native PNG preview. Portrait 390x844 and 320x667, landscape 844x390 and desktop layouts are checked in a desktop browser. Physical phone performance is not certified. The 0.55-second first bite measurement starts after the first movement input; network download and engine startup are separate.
