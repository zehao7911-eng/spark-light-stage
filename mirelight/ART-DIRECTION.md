# MIRELIGHT — The Bellwright

Original pixel-world art direction, revision 01. 2026-10-23.

## The original world and playable premise

Iona repairs the little bells that let a rain-flooded harbour communicate. Orren keeps its ferries moving; Tamsin collects discarded metal. A brass-bodied cloth moth follows the sound of repaired mechanisms. The intended game loop is observation, short journeys, tactile repair and visible changes to the district. This delivery establishes the visual language and a three-bell interaction study. It is not a finished campaign or a promise of a commercial game's complete production scope.

## References and what was studied

- **Eastward**: [Steam](https://store.steampowered.com/app/977880/Eastward/), [official media](https://eastwardgame.com/media/). Studied as an art-direction reference for inhabitable street layers, grouped everyday objects and readable characters amid a detailed environment. The official media image was visually inspected. This is our interpretation, not a claim to reproduce its render pipeline or asset quality exactly.
- **Sea of Stars**: [Steam](https://store.steampowered.com/app/1244090/Sea_of_Stars/). Reference for separating action, characters and the environment through colour/light hierarchy. Its game, lore, UI and characters are not reused.
- The installed `open-source-game-reference` catalog was searched for pixel projects. [Shattered Pixel Dungeon](https://github.com/00-Evan/shattered-pixel-dungeon) was inspected as a small-sprite implementation reference. Its GPL code and art are not included. The catalog is a discovery aid; it does not grant commercial-asset rights.

Every distributed sprite, tile, building, glyph and scene is original. The art is rendered from the included `build_art.py`, not extracted from screenshots. There are no third-party game logos, characters, fonts or complete interface layouts.

## Deliverables and common source

| Asset | Purpose | Native specification |
|---|---|---|
| `quay-base.png`, `quay-dusk.png` | Runtime environment | 640 × 360, 32-colour master palette |
| `far-native.png` | Wide composition check | 640 × 360 |
| `near-native.png` | Exact close-view crop | 320 × 180 crop of the same composited wide image |
| `far-view.png`, `near-view.png` | Review exports | Exact 2× and 4× nearest-neighbour enlargement respectively |
| `characters.png` | Cast and animation atlas | 6 columns × 4 rows; 32 × 48 cells |
| `props.png` | Bell, tools, lantern, gear, plant, crate, bag, book | Eight 32 × 32 cells |
| `materials.png` | Brick, oak, water, brass, glass, cloth, fern, stone | Eight 32 × 32 swatches |
| `moth.png` | Original companion | Four 32 × 32 cells |
| `effects.png` | Strike accents | Six 32 × 48 cells |
| `font.png`, `font.json` | Original grid lettering | 6 × 8 cells, 5 × 7 maximum glyph body |
| `palette.json` | Names, indices and material ramps | 32 exact RGB colours |
| `assets.json` | Frame dimensions, anchors, placements, PNG hashes | Machine-readable expansion manifest |

`art-direction-board.png`, `character-study.png`, `action-study.png`, `material-study.png`, `palette-study.png`, `interface-study.png` and `dusk-study.png` are review sheets. The GIFs show the actual atlas animation, not separate concept art. Review-page thumbnails may fit their containers; native exports and the interactive scene are the production grid reference.

## Grid and proportions

One authored pixel is the unit. Terrain structure starts on a 16 × 16 module; larger material swatches use 32 × 32. Iona occupies a 32 × 48 animation cell with foot anchor (16,44). Props occupy 32 × 32; a small bell's visible silhouette is about 19 × 22, not a full character-height object. Doorways are approximately 33 × 46 so the character and architecture share a convincing unit.

Only integer nearest-neighbour zooms are used for production review exports and the scene. The runtime rounds sprite positions and camera offsets. It does not rotate sprites by arbitrary angles, blur the view, use a low-resolution filter over smooth 3D, or add subpixel particle trails. Camera framing changes the crop; it does not redraw assets at a new density.

## Palette and material grammar

The 32 colours are fixed in `palette.json`. A material normally uses three or four values, drawn as connected groups:

- Brick: indices 17–19, staggered blocks with a short upper edge. Cracks follow a joint or a large plaster boundary.
- Oak: 13–16, long grain groups that follow the board. The bright strip belongs to the lit edge, not every scratch.
- Brass: 20–23, broad bronze body and a narrow warm highlight. Colour 31 is a contact glint, never background decoration.
- Cloth: 24–26, large folds and an intact outer silhouette. Iona's ivory cape uses 6–7 to separate her from the quay.
- Plants: 8–12, connected leaf fans and shaded masses. Do not scatter unrelated one-pixel dots as leaves.
- Water: 1–4 with long stepped reflection bands. Gold reflection groups sit under warm architecture; no smooth gradient overlay.

## Distance and density

The skyline uses two close values, broad roof shapes and a few window groups. The playable street adds material joints, pipes, signs and object groups. Foreground vegetation and retaining walls have the densest marks. The intended relative density is background 1 : midground 2 : foreground 4; this is an art-production heuristic, not a measured image statistic.

Leave breathing room around the character's face, cape and feet. A sign, shelf or plant cluster should be legible as one object before any of its small marks are noticed. More detail is not permission to fill every empty surface.

## Cast silhouettes and motion

Iona: short ivory cape, asymmetrical indigo coat, dark hair, leather bag and small brass hammer. Orren: low broad hat and wider oak-brown silhouette. Tamsin: twin hair tufts and moss-green coat. The solid silhouette study must remain readable without interior texture.

Walk: six frames at approximately 8.3 fps. Strike: preparation, wind-up, contact, follow-through, recovery and settle. Each frame lasts 120 ms; contact is the third frame, at 240 ms. The bright strike accent stays beside the hammer. It must not cover the face, the target bell or the feet. Runtime effect positions and short arcs are made from integer pixel rectangles, with a bounded 64-particle pool.

## Interface grammar and interaction states

Two-pixel stepped dark corners, one-pixel brass or slate inner edges and deep-blue fills echo architecture and tools. Inventory uses the exact world prop atlas. The original bitmap lettering shares the scene's grid. A focused slot rises four display pixels and gains a light edge; a repaired bell gets a raised state as well as a gold border. Native browser controls retain at least 44 × 44 CSS-pixel hit areas on phones.

Dialogue reserves a quiet lower-left panel; inventory sits in a separate lower-right region. The little quest strip does not obscure the character's movement lane. Effects occur around the targeted bell. The scene preview is an asset/interaction check, not the final game's complete UI layout.

## Light and alternate scene colour

Upper-left light is the shared rule for masonry, tools, faces and panels. Dusk remaps existing palette indices into darker values while retaining brass/lamplight colours. It does not add an orange wash, blur layer or a second palette. The core shapes, pixel pitch and texture marks remain unchanged.

## Extension recipes

1. **Repair-shop interior:** reuse the oak/brass/glass ramps, doorway unit and 32 px props. Add one new silhouette, a tall tuning rack, before adding surface marks.
2. **Ferry landing:** keep the quay stone and water bands; introduce longer rope/board clusters and a larger boat silhouette. Match the existing foot anchor.
3. **Flooded bell garden:** use the same fern fans and tarnished-brass ramp; fewer high-contrast masonry edges, more broad moss masses. New wildlife must still fit the 32 px family.
4. Before adding an asset, compare it at 1× beside Iona and an existing lantern. Then inspect it in both far and near crops, in rain and dusk, with and without its interior detail.

## Rebuild and review

Use Python with Pillow and run `python build_art.py`. Run `python qa_art.py` to check exact palette membership, transparency, file hashes, integer review enlargement and scene-crop identity. Open `index.html` in a browser, or use any static HTTP server. No external CDN or engine installation is needed to view the delivered study.
