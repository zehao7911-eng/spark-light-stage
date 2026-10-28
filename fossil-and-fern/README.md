# Fossil & Fern
An original English mobile HTML5 excavation toy with polished generated runtime artwork. Brush away sand, tap each stone crust twice, then rinse the fossil. Tools change automatically. Four original illustrated stone specimens: ammonite, trilobite, fern and pterosaur. Completed specimens fill a natural-history cabinet; best active restoration times and exact partial layer grids save on this device. No timer pressure, purchases, damage or failure. Choose any specimen from the cabinet.

## Play
Serve this folder over HTTP(S), e.g. `python -m http.server 8000`, then open index.html. Touch or mouse: hold/sweep for brush and rinse, tap twice per crust for chisel. Desktop: arrows position the tool, hold Space to brush/rinse, separate Space presses chip a crust. Pause, sound toggle and instructions are available. No build, account, external CDN, library or WebGL required. Canvas2D, pointer capture, original WebAudio. DPR capped1.7, masks48x48, dustbuffer512x512, particles160. Background tab pauses.

## Art and reference
Actual generated artwork appears in gameplay, not only a promotional cover. Built-in image_gen generated original 2x2 fossil atlas and museum workbench, then performed transparent-background editing of atlas. Runtime uses WebP exports for transfer size, retaining PNG source artifacts. ART-PROMPTS.json and ALPHA-PROMPT.json contain exact prompts. Individual cells crop9px in memory to prevent generated cell-border bleed. Original icon is SVG.

Reference: Rezona Fossil Wash https://rezona.ai/game/pgcserver/pv/oECcCuBQ/v12/dist/index.html . Initially black while loading, later actual public title and3Dmuseum/Trex wash loaded; nativeStart/Wwalk/Space spray attempted and spray particles seen. Restoration HUD remained0%0/12bones0/5, no reference completion claimed. This independently authored version uses a tabletop brush/chisel/rinse loop and original stone illustrations, not the reference's first-person dinosaur museum. No reference code, models or artwork copied. No claim of pixel-identical replication.

## Verify
`node tests.mjs`: allfour normal three-stage digs, partial mask/save restoration, invalid stage/input rejection, bounded work, no duplicate completion. Extracted ZIP tested the same. Native real local gestures completed first specimen and selected next; portrait swipe revealed second to44%, pause/reload retained44%.320568/390844/844390 browser layouts checked; physical phone not tested.

## License
Original code MIT, see LICENSE.txt. Original generated raster assets included for use with the project. Source prompts/provenance included. No external commercial game assets.
