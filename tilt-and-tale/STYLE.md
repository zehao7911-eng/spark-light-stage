# A small illustrated tournament

Art reference: https://mygamesartstyle.jupiterthewarlock.com/styles/graphic-cartoon/

The invariant is a clearly drawn two-dimensional world with bold ink contours and grouped colors. It is neither pixel art nor smoothly shaded 3D. No image generation is used.

## Shared palette

Ink `#242b36`; parchment `#f6e8c8`; brass `#ecbd66`; peacock `#418d89`; coral `#c96e6b`; sight blue `#95c8d4`. Environment colors shift together across Marigold Court, Moonstone Lists and Stormglass Hall, while interactive gold and player sight blue retain their meanings. The dark slate interface frames the warm field. All palettes are deliberately limited, with pale secondary outlines separating neighboring dark shapes.

## Shape and scale rules

Runtime art uses an 800-unit stage width. Important silhouettes use 3–5 unit ink contours, minor engravings use 1.5–2. Main shapes have rounded joins and clear angular changes. Heads are roughly 90 units across; armored torsos and heraldic shields use the same facets. Each animal is identified by anatomy: badger stripes, tall hare ears, tortoise muzzle, raven beak, bear ears, moth antennae/wings, boar tusks, hound ears and owl eye discs. Enamel armor and horse blankets repeat their owner's two colors.

Characters are articulated path groups: horse legs, cloak, boot, helmet, crest and lance. Idle motion stays small; galloping uses a readable alternating hoof cycle. Impact has a brief graphic burst, fragments, recoil and a stylized tumble. It is an illustration animation, not realistic ragdoll physics. Reduced motion removes the camera shake.

## Scene, material and interface rules

Near objects have strong outlines and small seams; distant city silhouettes reduce contrast and detail. Stone uses repeated masonry courses; cloth uses large striped panels and scalloped edges; steel uses pale facets; wood uses ocher shafts with dark caps and sparse bands. Hatching is grouped along structure rather than scattered as random noise. Marigold uses clouds, tents and a heraldic scroll; Moonstone uses a crescent and stars; Stormglass uses tall diamond-pane windows. The fixed jousting lane keeps the action easy to read between scenes.

The shield, book cards, buttons and particles all repeat the same dark contours, parchment/brass pairing and compact heraldic symbols. The background remains quieter than the animal faces, seal and lance. Gold is the rival's aim target; blue is the player's sight; hearts mean armor, diamonds mean rival balance. Aim zones are redundant in shape and position, not color alone. Result cards retain the same outline and spacing, and the book portraits are drawn using the game's actual head functions.

`artbook.html` contains the three compositions, nine face samples and the palette using these runtime functions. It is a visual test fixture, not an unlocked save or simulated player victory.
