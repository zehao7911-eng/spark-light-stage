# BLUE HOUR / Original art source

Mode: built-in image_gen, not the API/CLI fallback.

## Approved desk master

Workspace master: `desk.png` (1536 x 1024). Runtime copy: `desk.webp`.

The user's approved composition is preserved: blue perforated scratch ticket centered on a warm wooden table; receipts around it; red telephone at upper right; cyan workshop at right; navy merchandise shelf at left. The original PNG is bundled unchanged. Runtime code updates the six scratch areas, counters and upgrade fields without repainting or replacing the table master.

Final desk prompt specification: create one full-bleed original overhead indie-game screenshot in hard-edged pixel art, blue scratch ticket in the middle 45 percent, six white panels in a two-column by three-row grid, perforated edges, circular motifs, short dot-matrix English labels, paper receipts, red rotary phone above-right, cyan six-slot upgrade rail at right and navy six-item merchandise rail at left. Warm umber wood, cobalt, ivory, turquoise, coral red; clustered stepped pixels, restrained material ramps, local highlights and discrete shadows. Exact short labels: BLUE HOUR, SCRATCH & DISCOVER, REVEAL 3, COUNTER, WORKSHOP, BRUSH, LUCK, SPEED, 240. Original objects and symbols; no third-party logo, character, full interface, photorealism, antialiasing or smooth 3D.

## Matching collectible atlas

Workspace master: `items.png` (1448 x 1086, RGBA). Runtime copy: `items.webp`. Exactly four columns and three rows of 362px square cells, drawn using the approved desk as the style reference.

Final atlas prompt: Create a new transparent game-ready sprite atlas matching the BLUE HOUR screenshot's pixel clusters, material ramps and original merchandise family. Exactly twelve isolated centered items, strict four-column by three-row grid, equal square cells, generous transparent padding, no labels, background or crossing shadows. Row 1: orange with leaves, pale-blue orange-juice carton, tinned peach, pink wrapped candy. Row 2: floral stamp roll, teal thermos with tree emblem, blue-and-orange matchbox, red berry jam jar with checked cap. Row 3: iridescent pink seashell, golden five-point star, ivory crescent-moon charm, green four-leaf clover. Original unbranded designs; compact 3-5 tone shading, stepped contours, grouped visible pixels and tiny controlled highlights. No antialiasing, vector curves, gradients, 3D or baked checkerboard. Real alpha transparency.

## Runtime treatment

Both masters are encoded losslessly to WebP; decoded pixels were compared to the PNG masters. No AI artwork is fetched at runtime. The item atlas is sampled by fixed cell coordinates. Coating texture is sampled from an untouched white region in the approved desk, then cleared by a 44 x 24 binary mask per panel. Discrete camera framing keeps phone scratch surfaces large. New reward text and interface values use a shared bitmap glyph grid.
