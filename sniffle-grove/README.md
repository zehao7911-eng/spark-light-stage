# Sniffle Grove

A tiny pig, a very good nose, and twelve pockets of woodland treasure.

**Drag to follow the drifting scent. Release when it turns gold to dig.**
There is no timer, no combat and no life counter. A close dig earns a perfect
bonus. Find another truffle within eight seconds to build a trail bonus; every
find briefly reveals the remaining scents. Scout reveals the nearest golden paw
for six seconds, in exchange for the optional no-Scout star.

## Included

- Twelve authored clearings with reachable treasure, tree-stump obstacles and
  slowing rain puddles across dappled woodland, rainy hollow and moonlit woods.
- Original integer-grid pixel scenery, walking / sniffing / digging / cheering
  character poses, drifting scent, flying earth, truffles, fireflies and rain.
- Thirty-six best-record stars, three coats, a trail journal, saved progress,
  automatic background pause, sound toggle and gentle effects.
- Local synthesized audio; no CDN, remote font, analytics, generated images,
  image-generation service or external runtime dependency.
- HTML5 touch play, keyboard controls and compact landscape layout.

## Run

Unzip with `index.html` at the root. Serve this folder with any static HTTP server,
for example `python -m http.server 8080`, then open the displayed address. Upload
the contents directly to a static HTML5 host or GitHub Pages.

Touch / mouse: hold and drag to walk, release to dig. DIG HERE digs in place.
Keyboard: hold arrow keys to walk; release the last arrow to dig. Enter digs,
H scouts, Escape pauses. Buttons support Tab and Enter. Sound begins after a
gesture; a device that blocks vibration simply plays the visual and audio effects.

Progress is stored on this browser and origin under `sniffle-grove-v2`. Changing
browser, clearing website storage or opening a different host starts a separate
save. The ZIP works without external content when served locally.

## Build and checks

`node tests.cjs` checks all target routes, explicit harvest, score/stars, safe
restore, pause-independent model freezing, bounded movement and no duplicate
rewards. `python build.py <node-executable>` runs these checks, versions the local
resources, and produces a reproducible `SNIFFLE-GROVE.zip` beside this directory.

## Visual references and provenance

Pixel grouping and environment-material guidance were studied from the Detailed
Pixel gallery at https://mygamesartstyle.jupiterthewarlock.com/styles/detailed-pixel/,
including its Graveyard Keeper village description and visible thumbnail. No
gallery asset, game sprite, logo or source image is included. The enlarged source
image did not render during reference inspection.

An earlier inspected Rezona woodland puzzle informed the small-character scale.
Current Rezona pages could not be loaded during this iteration. The continuous
hot/cold scent tracking here is an original mechanic; it is not that reference's
numbered puzzle. It was selected after a duplicate-mechanic check against other
games in production.

All code, pixel artwork and synthesized sounds in this package are original and
are supplied under LICENSE.txt. The cover is captured from the actual renderer.
Mobile browser viewports are tested; physical handset testing is not available in
this workspace. There is no claim of a platform rating or identical commercial art.
