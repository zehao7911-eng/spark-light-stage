# Lantern Unwind

A complete small, original HTML5 planar-string puzzle. Drag lantern knots until no strings cross. Any clear arrangement wins; you never need to copy a prescribed picture. The first corner takes one drag. Twelve authored bundles span Copper Alley, Apricot Hill and Moonwater Quay.

## Play

- Drag a lantern, then release. Or tap a lantern and tap an empty destination.
- Pink crosses mark tangled strings. Clear strings glow and carry travelling sparks. Overlapping knots and strings passing through unrelated knots also need separating.
- Every corner awards a souvenir, stars and a best move record. Undo is free. No timer, lives, purchases or idle loss.
- Guide shows a known safe layout, one move at a time. It may first park a lantern in a spare spot; a helpful intermediate move can temporarily add crossings. Guide-assisted clears earn two stars; other clears earn three. There is no move limit. Replays preserve your best stars and lowest move count independently.
- Street book contains twelve distinct souvenirs and replay selection. Six stars unlock a Jade frame; eighteen unlock Mulberry. Enjoy the street opens the full generated artwork after a clear.
- Keyboard: focus the board; Space cycles lanterns, Enter picks up/places, arrows move 8 source pixels, Shift+arrows move 1, Escape cancels.
- Sound and Gentle mode are saved locally. Gentle removes ambient motion, particles and flashes. Pause stops motion and sound; leaving the tab pauses the board.

## Run and host

Serve this folder with any static HTTP server, for example `python -m http.server 8080`, then open localhost:8080. Upload the whole folder with `index.html` at its root. No build, CDN, WebGL, external font, telemetry, account or network service is needed. ES modules require HTTP/HTTPS; opening index.html as a file URL is not supported. Save data belongs to the browser and origin, and private browsing/storage restrictions can prevent persistence.

The first street image and transparent lantern atlas load locally; later street images load when their district is entered. The board is playable immediately with code-drawn fallback art while images load, including if an image request fails. All four generated PNGs are included unchanged. Source raster assets are displayed with nearest-neighbour sampling on a 320-pixel-wide canvas. These are generated detailed pixel-style illustrations, not a claim of hand-authored pixel animation. Rain, steam, sparks, string motion, celebrations and all interactions are rendered live in code; the generated character artwork itself is static.

## Art and provenance

Four final raster assets were created using the built-in `image_gen` tool, authorized by the user's clarification. The first street established the style; the other two streets and transparent atlas used that image as a style/character reference. See `ART-PROMPTS.md` for the final prompts and original output identifiers. The project includes the actual generated PNGs in `assets/`. The icon is original SVG and the cover is an actual runtime screenshot. Code-authored souvenirs, board inlay and readable numeric badges use the same palette. No third-party game images, characters, sound, code or logos were copied. This is an established planar-graph untangling mechanic, not a claim of inventing a genre.

Original game rules/controller/art utilities are under the included MIT license, with notices retained for reused plotting, layout and audio helpers from our own prior projects.

## Verification

`node tests.mjs` runs 6,957 checks, including all twelve authored solutions, an independent line-intersection oracle, malformed save rejection, overlapping-knot/collinear guards, undo, sticky Guide usage, and recovery from 96 arbitrary layouts. Actual browser-pointer testing completed all twelve corners with 36/36 stars. Narrow 320x568 and 844x390 landscape courses were played, in addition to 390x844 portrait. Guide, tap-to-move, settings reload, mid-course reload, Undo, appearance unlocks and the full-art viewer were exercised. Physical iOS/Android handset performance has not been tested. Browser viewport checks are not physical phone certification.

No Steam/Rezona one-to-one artwork, gameplay-quality rating or platform score is claimed.
