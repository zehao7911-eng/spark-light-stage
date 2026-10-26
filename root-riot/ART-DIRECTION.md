# Root Riot art production

Mode: built-in image_gen tool, explicitly re-enabled by the user. No API/CLI fallback was used. The original source game's artwork was not reused. This is an original rabbit design, with premium sculpted cartoon appeal as the target; it is not an official Supercell game or a claim of studio-equivalent production.

## Unified art direction / production prompt briefs

The following records the asset briefs and constraints used across the generation set. The master character was supplied as a visual reference for subsequent assets. These are production briefs, not a promise of exact deterministic regeneration.

1. **hero-master.png** — Original mischievous white ninja rabbit; expressive glossy dark eyes, asymmetric long ears, tomato-red tied headband and small brass carrot badge, deep forest-green sash, enormous carrot and chunky pink paw pads. Premium polished sculpted 3D cartoon game character, warm key light, cool fill, readable rounded silhouette, transparent background. Upgrade the supplied rough rabbit blockout; avoid existing branded characters and logos.
2. **cover.png** — Portrait game key art, exact title ROOT RIOT in large cream/gold dimensional lettering in the upper area. Same white rabbit bounds toward the viewer hugging a giant carrot, tan rivals with teal headbands behind, sunny lush garden, loose dirt/leaves and wooden fence. Strong focal hierarchy, expressive face, polished materials and light; no fake buttons or other copy.
3. **icon-1024.png** — Square mobile game icon; close-up of the same white rabbit's face, red band and brass badge, carrot entering lower-right, rich dark-green backdrop. Face occupies about 70%; bold silhouette and readable eyes at small sizes. No text, no baked rounded corners.
4. **rabbit-walk.png** — Transparent 4×4 contact sheet, consistent scale and baseline, four distinct walk phases per row. Rows: front, back, left, right. Same rabbit, headband and sash; expressive but stable shape, all ears and feet within their cells; no labels, ground or scenery.
5. **rabbit-actions.png** — Transparent 4×2 animation sheet. First row: four carrot-pulling effort phases. Second row: idle, comic puff release, recoil, joyful victory holding carrot. Same sculpted character, light and proportions. Separate cells and no scenery.
6. **rival-walk.png** — Transparent 4×4 walking atlas, tan rabbit with teal headband, same proportions/materials/light, four directional rows and four phases. Actual generated left/right rows were inspected and mapped explicitly in the renderer.
7. **field.png** — Portrait near-top-down garden, lush green grass and warm soil patches with a decorative wooden fence, flowers and leaves around the border. Clear playable central area. No characters, carrots, large obstacles, labels or UI. Rounded sculpted materials matching the rabbit.
8. **props.png** — Transparent 4×2 isolated prop atlas: small rock, large rock, tree, wooden barrel; bush, burlap sack, leafy carrot plant, fork/carrot decoy. Consistent near-top-down camera and warm light, generous clear cell margins, no text or scene.

## Integration

All selected full-resolution PNGs are saved in assets/. The runtime uses compact WebP encodings embedded in assets/data.js. Alpha bounds are measured per atlas cell and aligned to a shared baseline. Runtime left/right direction mappings were visually checked. Small icons (16–512px), manifest icons and a social cover derive mechanically from the selected icon/cover; no second visual identity is introduced.

Only resizing, atlas crop measurement, encoding and layout composition use Pillow. Character/scene illustration was generated with the built-in image tool. The earlier Blender prototype is archived outside this package and is not the delivered art.
