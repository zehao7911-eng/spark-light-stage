# TIDEBYTE — Clear-grain retro pixel art

Original art direction, revision 01. This package establishes a reusable visual system, not a finished game campaign. All graphics, cast and setting are original. No existing game's characters, logos or interface have been copied.

## World and visual promise

Nori carries parcels between tiny islands in an amphibious post boat. Bex is a crab porter; Uma, a heron, keeps the post station. Wide steps, coral roofs, lagoon water and sturdy cream buildings make a small world legible at a glance. An eventual game could turn changing tides into short delivery routes; this delivery validates artwork and interaction states before a game is built.

## One grid, throughout

| Element | Native size / rule |
|---|---|
| Wide composition | 320×180 authored pixels |
| Close composition | Exact crop (112,64)-(272,154), 160×90 |
| Ground / material tile | 16×16 |
| Character cell | 16×24; foot anchor (8,22) |
| Pocket prop / interface icon | 16×16 |
| Building | 48–64 wide, 40–52 high; roughly two character heights |
| Effect cell | 32×24; bright fragments in 2–3 pixel blocks |
| Lettering in image samples | Original five-pixel-high bitmap glyphs, six-pixel advance |

World images are built at 1×. Display at integer nearest-neighbour multiples, with image smoothing disabled. The close view magnifies the SAME source geometry; no extra tiny texture is drawn for close-ups. The review board places a 1× wide view beside a 2× exact close crop and enlarges the whole board 2×. Actual source PNGs are included for inspection.

## Tidebyte20 palette

palette.json provides all 20 named colours and hex values. Ink #172e42 separates critical forms. Sea uses Lagoon shade #397d86, Lagoon #54a5a4 and Shallow mint #8cc8bc. Leaves use #42664e, #708f56, #a5b86a. Sand and parcels use #db8b49, #e9db9a, #fff0c2. Coral #e57b65 with Peach #f4aa89 identifies Nori and postal objects. Signal yellow #f9c56b marks a diamond interaction cue and the active SEND control. Paper #f7e9d8 is reserved for letters and clear highlights.

Use two or three shades per material. Ink is structural, not an outline around every grass patch. Distant structures use mist and cloud tones with no texture. Foreground roads use darker, larger connected blocks. Shape and lightness carry meaning alongside colour: a diamond is an action; a rectangular parcel is an object; the mailbox has a raised flag. Do not depend on red versus green alone.

## Shape language

- Keep contours stepped and deliberate. Roof steps are 4–8 pixels, doors are broad rectangles, trees have a few connected leaf masses.
- Ground detail consists of sparse 4×2 or larger clusters, not a field of isolated dots. Do not add noise, grain overlays or random speckling.
- Faces may use one or two single pixels. They are exceptions for identification; the body still reads as a few larger masses.
- Nori reads by a broad coral hood, teal coat, pale face and side parcel. Bex reads as a wide crab with four feet and eye stalks. Uma reads through a tall cream neck, cap and orange beak. silhouette-study.png checks those distinctions without their internal colours.
- The palette-swap dusk sample changes lightness groups only. Tile sizes, contours, camera scale and texture stay fixed.

## Materials and tile extension

tiles.png contains water, sand, grass, stone, wood, clay, glass and signal-border cells in that order. Place full 16-pixel cells to establish walkable space before adding architecture. Roads and dock boards repeat with clear regular joints; water uses broad short horizontal strokes. Grass uses one connected bright edge and a sparse dark clump. Glass uses two straight highlights, not gradients or reflections from another style.

For a new biome, author a new eight-cell row using these same geometry limits. Replace at most one material ramp at a time. Check a 20×11-tile room, the existing Nori sprite and the SEND panel together before accepting the biome. Do not replace native terrain with a downsampled painting or simplified 3D render.

## Atlas and animation

characters.png has four 16×24 columns and four rows: Nori walk, Bex walk, Uma walk, Nori send. Walk uses four frames at 150 ms each with a one-pixel body bob and alternating feet. Never rotate the sprites smoothly or stretch them fractionally.

Send has four poses: prepare with parcel, release with extended arm, hold/contact, settle. Suggested durations: 120 / 80 / 100 / 160 ms. The key contact is frame 2 (200 ms). effects.png has four 32×24 parcel/spark cells. Bright fragments appear after release and expand away from the action. Keep the effect smaller than two character widths, brief, and off the character's face. The interactive study layers these actual cells; it is not a combat or delivery campaign.

## Interface and feedback

interface-native.png is a 320×104 sample: parcel progress, a heart, tide state, Uma's dialogue and a SEND action. Icons are the same 16×16 prop sprites used in the world. Borders use a one-pixel outer line with dark fill; highlighted controls gain the yellow border and a simple arrow. Numbers sit on a six-pixel glyph rhythm. Dialogue has reserved portrait and text areas rather than overlapping scenery.

In a full game, native icons should remain integer-scaled while touch targets become at least 44 CSS pixels. Full sentences may use an accessible readable font in a DOM layer; that does not replace the pixel art. Preparation should be visible before input resolves, contact should use one clear flash or position change, and recovery should return to the same foot anchor. Sound and vibration are optional feedback channels, never the only confirmation.

## Deliverables and acceptance

art-direction-board.png unifies the palette, wide/close compositions, cast, props, material samples, interface and send poses. Additional PNGs, a walk GIF, JSON metadata, the browser study and build_art.py allow extension. qa_art.py checks palette membership, binary transparency, atlas dimensions, exact crop and integer enlargements, manifest checksums and pose differences.

Accept new assets only if silhouette, pixel scale, material ramp and action priority still work beside this sheet. Avoid gradients, anti-aliased curves, dense surface noise, smooth high-detail assets, borrowed branded art, and completely different UI line weights.
