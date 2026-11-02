# Sprinkle Squad

A small 3D firefighting game for touch screens and desktop browsers.

## Play

Hold on a flame to spray it. Release to refill the water tank. Put out every fire before the timer ends. Each completed call unlocks the next, and the game keeps your best star rating on this device. There are six calls; progress within a call is not saved.

Sound starts after you interact with the game. Use the music button to mute it. The pause button lets you take a break or choose an unlocked call.

## Run locally

Serve this directory with any static web server and open `index.html`. For example: `python -m http.server 8000` and visit `http://localhost:8000/`. A modern browser with WebGL is required. All runtime files are included; no network connection is needed after loading.

## Artwork and credits

The 3D characters, props, scenes and interface are original code-built artwork. The rounded shapes and warm miniature look were informed by the visual reference at https://mygamesartstyle.jupiterthewarlock.com/styles/rounded-3d/. No images were generated or taken from the reference. Three.js is bundled in `vendor/` under its MIT license; see `vendor/three-LICENSE.txt`.
