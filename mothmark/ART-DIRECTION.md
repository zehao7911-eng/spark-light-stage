# MOTHMARK / The Nocturne Archive

Original pixel-card art direction, edition 02. This package defines a visual family and a small interactive presentation study. It is not a complete game.

## World and visual promise

At a museum that opens after sunset, two archivists preserve luminous moths in a catalogue of living cards. Brass equipment, velvet drawers, glass vessels and botanical albums share a quiet plum-and-parchment palette. The moth wing silhouette is the recurring motif; it appears as an illustration, back emblem and small effect, not a borrowed logo.

## Shared construction rules

- Work at 1x. A source pixel is the indivisible drawing unit. Rectangles, stepped polygons and 1px lines only; no antialiasing, blur, gradients, arbitrary rotations or photographic textures.
- Cards are 72 x 104px; all categories use the same frame. The 62 x 10px title at (5,5), 62 x 55px illustration window at (5,17), divider at y=74 and values at y=92 never migrate between cards.
- Keep four pixels of outer breathing room. Card slots advance 80px on the table; panels and tools use 4px or 8px layout increments. A 1px optical correction is allowed inside illustrations and letterforms.
- Icons are 16 x 16px with stable atlas cells. Characters occupy 24 x 32px and remain readable as single-colour silhouettes. World illustrations and UI use the same source-pixel size; enlarge the whole scene by an integer factor.
- The font is an original 5-row bitmap alphabet, with a 6px advance including spacing. Reserve ten characters per card title, nine per category. Additional descriptive copy belongs in the inspection panel, not over the artwork.
- `palette.json` is the authority for all 24 colours. Each material normally uses 2-3 related shades; the full palette belongs to the world, not to every object. Transparency is binary.

## Palette and material roles

Night / Velvet / Plum separate background, table and illustration silhouettes. Parchment / Parchment shade / Ivory define the readable card surface. Brass shade / Brass / Gold identify frames, costs and focus. Pine ink / Patina / Mint / Pollen identify living light. Lilac is reserved for archivist clothing, rare wings and the Moon Seal. Coral belongs to vitality and alert cues.

Paper: broad flat fill, a broken short edge mark, no speckle. Velvet: sparse repeated stepped chevrons, low contrast. Wood: long horizontal grain clusters. Glass: dark interior, one narrow cool highlight and a readable rim. Brass: top-edge light and a dark lower edge. Ink: solid inset mark with a single lighter corner. See `materials.png` and the labelled close study.

## Cast, props and proportions

DUSKKEEP is a pointed-hat archivist with a broad coat and square lantern. The second archivist has a flatter brim and a sage coat. Hat profiles, coat width, separated boots and hand-held equipment carry recognition before facial pixels. Their 24 x 32px bodies sit inside a 62 x 55px card window without changing drawing scale.

MINTWING has four angled mint wing clusters and a brass body; VIOLETWING uses the same species anatomy with a different restrained ramp. Tools are 24-28px tall. The jar contains a deliberately smaller specimen rather than a scaled version of the full moth artwork. The lamp, jar, lens, album and sprig must retain distinct single-colour outlines.

## Composition, depth and close views

`scene-wide.png` is the 400 x 248px establishing composition. Cabinets use only dark plum steps and repeated drawer silhouettes. The pale cards and green specimen are the first read. The moon window is subdued and never competes with the titles. The tabletop is an ordered plane, not a perspective photo backdrop.

`scene-close.png` is an exact crop at (20,96)-(174,216), with no repainting, sharpening or detail added. This verifies that close and wide views are the same world. `scene-mobile.png` rearranges the same native-size cards into two columns; it does not squeeze a desktop interface into a phone.

## UI and feedback grammar

Default: brass edge, stable slot. Focus: gold outline and a 2px lift. Stack: two backs offset by (2,2) and (4,4), preserving the front card's number rail. Disabled: discrete five-shade plum remap plus a lock symbol; status does not rely on colour alone. Confirmation: a brief lift, three 5px cross-shaped pollen bursts outside the illustration, then a return to the slot. No particle crosses the title or lower numeric rail.

`card-motion.gif` has eight frames with durations 160/160/100/80/100/120/180/400ms: hold, prepare, lift, stamp, contact, settle, rest. `action-strip.png` extracts the four key poses. Browser motion respects the operating system's reduced-motion preference. The static action strip remains available.

Menus, dialogue, badges and counters use the same 1px borders, inset rectangles, limited accents and bitmap letters. Dialogue lives in a dedicated panel. The selected icon receives a gold border; locked states add a glyph. In an implemented game, touch hit regions should be at least 44 CSS px; they need not be the size of a decorative icon.

## Extension recipe

1. Pick a category: SPECIMEN, ARCHIVIST, TOOL, VESSEL, ARCHIVE or EVENT. Keep the card template and number rail.
2. Draw a new 1x silhouette first. Limit the illustration to the same source grid and up to three shades per material. Use the existing alcove as a scale reference.
3. Test the silhouette at table distance, then inspect the unchanged crop. Add clustered structural detail only where it improves recognition.
4. Assign a 16px icon, a short English name and a category. Keep focus / stack / disabled grammar unchanged.
5. Add metadata to `assets.json`, append an atlas cell, and update palette and bounds checks. Never add smooth illustrations to this family.

Possible later game loop: combine a specimen, a vessel and a tool to archive a discovery; discoveries open new drawer pages. This is a direction for expansion, not a claim of implemented gameplay.

## Files

- `art-direction-board.png`: 3x overview, character silhouettes, palette, states and UI.
- `collection-study.png`: eight original front cards at 3x.
- `close-material-study.png`: exact crop, labelled materials and action key poses.
- `cards-atlas.png`: eight fronts and one back in 72px cells.
- `characters.png`, `props.png`, `icons-atlas.png`, `materials.png`: native-size reusable samples.
- `card_00.png` through `card_07.png`: individual front cards.
- `card_disabled_00.png` through `card_disabled_07.png`: discrete disabled variants.
- `palette.json`, `assets.json`: palette and atlas coordinates.
- `build_art.py`: original Pillow source; rebuild with Python 3 and Pillow.
- `index.html`, `study.css`, `study.js`: dependency-free presentation sample.
- `qa_art.py`: asset validation. `manifest.json`: file sizes and SHA-256 hashes.

## Reference and originality

This is an original direction created from the user's pixel-card brief and game-art / 2d-games skill guidance. No third-party card illustration, character, logo or complete interface is included. The source glyphs are reused from our own earlier original bitmap toolkit; all MOTHMARK cards, characters, world, palette and layouts are newly drawn for this package.


## Edition 02 / refined craft pass

All eight illustrations have been rebuilt inside the original 72 x 104px template. The new stepped arch recess separates the low-contrast botanical engraving from the main silhouette. The moths have outlined wing lobes, grouped vein clusters, eye marks and segmented brass bodies. Wing colours use a compact five-step family with the lightest tone restricted to veins and eye marks.

Lanterns have a machined cap and small live flame. Vessels have rim facets, edge reflections and an actual smaller specimen. The nightglass has concentric stepped rim shapes and a handle bevel. The herbarium is an open folded page with a pressed plant; the moon event is a raised wax impression with hanging ribbons. Character hats, collars, hair, coat folds, buttons and lantern rims retain the same 24 x 32px proportions.

The card frame now uses a warm upper edge, a dark right/lower bevel and four engraved corner brackets. These accents stay outside the title, illustration silhouette and numeric rail. The back has a repeated low-contrast lattice and a nested specimen crest. Background cabinets receive grouped book-spine marks, while table corners use the same engraving language as card corners.

`idle-atlas.png` is a 4-column x 8-row sheet of full native cards. Each cell is 72 x 104px. Rows follow the eight card IDs; columns are idle phases. Only the focused front card plays the restrained 240ms phase cadence in the browser. Wing movement is a discrete pixel redraw; lamp flame changes use one pixel of height. Reduced-motion mode uses phase zero.

`hero-study.png` is a 320 x 180px composition exported at exact 4x. It compares three finished front cards against their new backs. `wordmark.png` is a transparent bitmap wordmark; no external font dependency is required. Phone presentation controls preserve exact 2x bitmap label scaling and a minimum 48px control height.
