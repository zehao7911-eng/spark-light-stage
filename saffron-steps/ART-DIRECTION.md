# SAFFRON STEPS / production art bible

An original miniature spice quarter built from genuine 2D pixels. This delivery defines an extensible art direction and browser visual study, not a completed game.

## Reference study

- Unpacking: https://store.steampowered.com/app/1135690/Unpacking/ — inspected official screenshot ss_b32bfdd3f68e1f9e264bd37e10a464629ca034f8. Learn legible silhouettes, grouped material texture and small domestic stories.
- Fae Tactics: https://store.steampowered.com/app/995980/Fae_Tactics/ — inspected official screenshot ss_6452f287807710db2fbd639c0b6e60cf60c6140d. Learn elevated landforms and clear actor placement. Our grid is deliberately stricter and our effects smaller.
- Imported open-source catalog: Tanks of Freedom, https://github.com/w84death/Tanks-of-Freedom — reviewed official README describing an isometric pixel-art project. Discovery reference only; no code, music or sprites reused. Its old Godot runtime is not a dependency.

No game logos, characters, interfaces or downloaded reference screenshots are shipped as assets.

## Grid and proportions

Native wide view 480 × 320. Ground diamond 32 × 16. Projection: X = originX + 16(x-y), Y = originY + 8(x+y)-z. Heights are integer pixels; main terrace rises 8 pixels, stairs rise 2 pixels per tread. Vertical edges remain vertical; ground axes use a two-horizontal-to-one-vertical rhythm. No perspective scaling. Keep the projection unchanged for close-ups: crop then enlarge with nearest neighbor.

People use 24 × 32 cells and foot anchor (12,29). Main person reads about two ground-tile heights tall. Props use 32 × 32 cells and anchor (16,29). Cast atlas: each role occupies a 64 × 64 region; frame 0=(0,0), 1=(24,0), 2=(0,32), 3=(24,32), relative to that role's region. Empty padding is intentional.

Building footprint must be fixed before facade drawing. Render ground first, then objects sorted by their front ground depth, then small local effects. The supplied composition uses separate nonintersecting footprints; future long structures spanning another object's footprint must be split into rear/front strips rather than sorted by one center point. Never solve obstruction by moving a person upward on screen independently of their ground position.

## Palette and material rules

Use only the 24 entries in palette.json. Index 0 ink; 1–4 distant violet stone; 5–6 ivory; 7–9 ochre wood/stone; 10–13 terracotta/plum; 14–17 glazed teal; 18–20 foliage; 21–22 interaction brass; 23 cool accent. Main material ramps: stone 5/7/8, terracotta 11/10/12, glaze 16/15/14, foliage 20/19/18, wood 7/8/9 (top/front/right). Local trim may be brighter, but must not reverse the face-lighting rule.

Cluster marks into corners, handles, joins and working surfaces. No random noise, blur, antialiasing, bloom or per-pixel color interpolation. Walls have a few aligned masonry joints. Ground lanes remain quiet. Distant buildings use 1–3 with no windows or busy surface texture. Day/dusk change by palette-index remap, preserving silhouettes and pixel geometry.

## Cast, props and composition

Iri has a wide saffron hat and flared plum apron; Mallow has a blocky green hat and a planter held across the torso; Pin has a brass crest, small body and projecting tail. Test them in the supplied solid silhouette sheet before adding costume variants. Four subtle idle/step frames are supplied, not a full directional locomotion set.

The wide scene creates two house masses around an open stair and tea market. A foreground fence, rug and tea table frame the walkable area. The exact close crop is (168,115)–(328,235); do not redraw more finely for that crop. Future quarters: dye terrace, courtyard, night tea garden. Preserve two tiles of walking space, different tall/low silhouettes and a limited foreground detail budget.

## Interface and animation

UI samples reuse the same palette, square corners and original 5-pixel bitmap letterforms. UI mockup 320 × 120; six 44-pixel icon slots show how larger finger targets can surround small native icons. Web controls are at least 44 CSS pixels. Gold outline + different background identify selection, so hue is not the only state cue. Keep labels short and use English.

Serving sample: prepare 140 ms, lift 100 ms, contact 80 ms, settle 180 ms. Contact sparks are two-pixel clusters above the cup; never blanket the ground or cover the actor. Four-frame ambient GIF uses 220 ms per frame. Chimney puffs step upward without smooth translucent gradients. Honor reduced-motion preferences by showing the static wide image by default.

## Files and extension workflow

wide.png and wide-3x.png; exact close.png; dusk.png; living-quarter.gif; cast.png; silhouettes.png; props.png; materials.png; ui.png; serve-poses.png; art-board.png; palette.json; atlas.json; build_art.py; font.py; index.html.

Run `python build_art.py` with Pillow installed. All geometry is editable Python, no image generator required. Add assets to the native atlas first; verify palette, anchor and silhouette; place them in both wide and close views; only then add animation. Build gameplay separately after the visual direction is accepted. A complete game would additionally need collision maps, directional animations, UI interactions, audio, save state and progression.


## Revision 02 / craft and atmosphere

Replaced flat slabs with gabled terracotta/jade roofs. The ridge follows a ground axis; pitched faces have an additional fixed 13-pixel rise with four shingle courses. Added recessed windows, mullions, herb boxes, lintels, plank doors, handles, doorstep, sign brackets and cup marks. Plaster seams are concentrated in small repair clusters. Worn paving joints are drawn after the ground pass. Trees have deliberately clustered foliage, flowers, trunk forks and contact shadows; their placements keep the three cast silhouettes readable. Small tea props use 22-pixel scene variants, and the table cup uses 18 pixels; their 32-pixel source icons remain unchanged. Added a dye line between roofs, striped canopy valance, tassels, planter beds, rugs with border stitches and tiny drifting petals.

Cast has hat highlights, hair/face clusters, apron patch, cloth shadows and boot rims. UI uses brass corner trims, inset selected slots and small numeric shortcuts. craft-study.png compares architecture, costumes, props, UI and serving poses at integer zoom. All assets retain the original 24-color palette, projection and transparent alpha boundaries.
