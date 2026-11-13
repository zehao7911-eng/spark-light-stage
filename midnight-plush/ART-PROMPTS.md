# Coordinated art production

Mode: built-in image_gen, three original generations. No CLI/API fallback. Runtime plush toys are code-authored 3D meshes; their actual screenshots supplied the character reference for the generated cover and icon. Collection thumbnails are rendered from those exact runtime geometries.

Production files:
- assets/arcade-1027a.webp — generated backdrop, source exec-e6bae675-0873-4709-8ccc-a83549c88589.png.
- assets/cover-1027a.webp — generated cover, source exec-0e67db06-f260-4fd7-be39-5422ec9fabcd.png.
- assets/icon-192.png and assets/icon-512.png — dedicated matching icon, source exec-fdb5e578-2b68-4f9b-87d8-a02a35f8c6d7.png.

Generated originals remain under the Codex generated_images folder. Final project files are included locally and never depend on that folder. Compression/resizing does not repaint the generated artwork.

## Backdrop prompt

> Use case: stylized-concept. Asset type: original landscape 3:2 premium 3D casual game arcade environment backdrop, no UI. A refined cozy midnight miniature amusement arcade, magenta and cyan neon cabinet lights, soft lavender shadows, warm tiny golden bulbs, glossy speckled terrazzo floor reflecting the colored lights. Left and right edges show tasteful distant retro arcade cabinets and plush prize shop shelves. CENTER HALF is an EMPTY dim dark indigo alcove and quiet floor with no foreground machine or objects, because a real interactive pink glass claw machine will be rendered there by the game. Camera eye-level aimed slightly down, moderate lens, no fisheye. Rounded beautifully modeled game objects, soft physically plausible light, restrained bloom so edges remain clear, high-end toy diorama art direction. Small adorable plush bear/bunny/frog silhouettes on far shelves only. Palette hot coral-pink enamel, cyan light tubes, midnight plum and warm cream. No readable lettering, logos, watermarks, people, claw machine in center, buttons or HUD. Wide illustration, polished materials, depth but never photoreal humans.

## Cover prompt

References: actual game scene screenshot, actual Cocoa Bear prize/thumbnail screenshot, generated arcade backdrop. References are identity/material/composition guidance, not source assets from another game.

> Use case: stylized-concept. Create original landscape 3:2 polished game cover artwork for MIDNIGHT PLUSH. Images 1 and 2 are the actual game: STRICT preserve its rounded simple 3D plush bear identity, cream oval tummy and muzzle, tiny black bead eyes with small highlights, round ears, blush cheeks and tiny pink bowtie, plus similar pastel bunny, mint frog and lavender cat designs. Do not replace these with realistic furry animals. Image 3 is the exact arcade environment/material/color reference. Hero composition: pink enamel glass claw cabinet center-right, chrome three-finger claw gently carrying the SAME cinnamon Cocoa Bear with cream belly and pink bowtie; a pile of same rounded plush toys inside below, warm prize hatch glow. Cozy midnight arcade, magenta/cyan tubes, brass trim, dim indigo-purple recess, subtle floor reflection, restrained soft bloom with readable shapes. Reproduce the actual game's broad toy forms, cloth finish and pink cabinet proportions closely, slightly improved lighting and composition only. Leave LEFT quarter quiet dark plum for a live title added later. No text, watermarks, fake HUD, extra limbs, humans, branded characters or logos. Premium toy-diorama 3D art, approachable and tactile, clear silhouettes at phone size. Cover must honestly represent the pictured game, not promise a different realistic art style.

## Icon prompt

References: actual Cocoa Bear result screenshot and actual game scene.

> Use case: stylized-concept. One square full-bleed premium mobile game icon. Reference images are actual game identity, not edit targets. Close-up of the SAME simple rounded cinnamon-brown Cocoa Bear plush with cream round muzzle and oval tummy, tiny glossy black bead eyes, blush cheeks, round ears with cream interiors, and small PINK BOWTIE. A tiny elegant chrome three-finger claw supports the bear around its shoulders from above. Friendly happy expression. Match the actual game's rounded sphere-based 3D toy proportions and matte soft cloth; do not add realistic fur or change the bear to a different character. Background deep plum, subtle cyan/magenta arcade rim light, restrained tiny warm sparkles. Bear fills 80 percent with complete ears and face inside safe margin. Strong legible silhouette at 48px. No text, logo, badges, frame, UI, human hands or detailed background objects. Consistent with actual pink neon claw-machine game.

## Runtime assets and checks

scene.js builds twelve original toy geometries, face/bead eyes, blush, embroidery, paws, bows and species-specific ears/wings/gills. One vertex-color/fabric material is shared; each plush is one merged mesh. The cabinet has beveled enamel blocks, metal rails, hinged three-finger claw, glass highlights, prize hatch, joystick and twelve-slot shelf. Phone camera framing and title width are adjusted rather than stretching or cropping the character geometry. The cover and icon share actual bear identity and palette; generated illustration lighting is richer than the lightweight real-time scene and is not a screenshot claim.
