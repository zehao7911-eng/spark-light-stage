# Pearlkeep art production

Mode: built-in image_gen (not CLI/API fallback). Three coordinated generations. The first atlas was inspected before it was supplied as the identity/material reference for the cover; both were inspected before the dedicated icon generation. Original output files remain in the Codex generated_images folder. Selected production assets are copied into this project; runtime has no dependency on that folder.

## 1. Runtime sprite atlas

Saved asset: assets/atlas-1026b.webp; crop metadata assets/frames-1026b.json.
Source output: exec-9bf09efa-ff11-41b6-97d7-f52af6619e3b.png.

Prompt:

> Use case: stylized-concept. Production game sprite atlas for original mobile puzzle PEARLKEEP. Transparent background, 4 by 4 equal square cells with generous empty padding; exactly 16 isolated complete objects, nothing crosses cell boundaries. Refined warm storybook toy-like three-dimensional painted illustration, continuous rounded forms, soft ambient occlusion, tactile matte cream porcelain, polished pearls, brushed brass; consistent overhead/three-quarter view, light upper left. Palette coral pink, sea-glass mint, lavender, pale honey, warm ivory, deep teal outlines. No text, letters, labels, watermark or shadows extending across cells. Row1: (1) single coral pink round pearl with small inset scallop-shell emblem, (2) single mint pearl with leaf emblem, (3) single lavender pearl with crescent emblem, (4) single honey pearl with star emblem. Row2: (5) ivory circular shallow scalloped ceramic dish seen directly overhead, entirely empty flat center, gold rim, (6) same dish with sea-glass green scalloped rim, (7) open small rounded brass-and-ivory jewel box seen three-quarter with velvet teal interior empty, (8) closed jewel box with shell clasp. Row3: same adorable original cinnamon brown sea otter jeweler wearing teal apron and round brass glasses: (9) smiling front waist-up paws together, (10) delighted arms raised waist-up, (11) curious leaning forward waist-up, (12) thoughtful holding one pink pearl waist-up. Row4: (13) tiny brass desk lamp, (14) pair of rounded coral and ivory seashells, (15) small green potted succulent in cream porcelain pot, (16) small brass magnifying glass. All assets fully visible, consistent scale per category and polished premium casual game material definition. Real alpha background.

## 2. Cover

Saved asset: assets/cover-1026b.webp. Responsive cover/title composition: index.html and style.css. Source output: exec-0d1ae5f7-4773-4131-9bfd-8fade55a1457.png. Reference: atlas above, character/material/color only.

Prompt:

> Create an original premium landscape 3:2 game cover illustration for PEARLKEEP using the attached atlas as strict CHARACTER / MATERIAL / COLOR reference. Same cinnamon sea otter with brass round glasses, cream shirt, teal apron with gold shell badge. Same coral shell / mint leaf / lavender crescent / honey star glossy emblem pearls, same ivory gold-rim scallop dishes and open teal velvet jewel box. Scene: magical intimate seaside jeweler workshop at golden hour, otter behind oak table in center-right, one paw joyfully guiding a pink pearl along a brass channel toward a circular dish holding three pink pearls. A satisfying small arc of sparkles guides toward the jewel box. Foreground rounded porcelain dishes on wood table, shells and tools; behind seaside window, soft sea-glass shelves, brass lamp, trailing greenery. Fine polished storybook 3D-painted illustration, rounded forms, tactile details, soft shadows, restrained luminous highlights. Strong attractive focal character silhouette at thumbnail size. Leave upper LEFT third fairly quiet dark teal for a live typeset title added in code, NO text or logos in image. Complete intended scene, not atlas or montage; no UI buttons. Match reference character exactly, avoid alternate outfit/eyes/artstyle.

## 3. Dedicated icon

Saved assets: assets/icon-192.png, assets/icon-512.png. Source output: exec-0b8b563f-e37b-4330-a4f1-12247d998740.png. References: atlas and cover, character identity/colors.

Prompt:

> Use case: stylized-concept. Create one square full-bleed mobile game app icon for PEARLKEEP. Both images are strict reference for same original sea otter jeweler character identity and colors. Close-up face of the same adorable cinnamon sea otter, same big dark eyes and small brass round glasses, cream muzzle, teal apron glimpse; two paws hug one large luminous coral pink pearl with ivory shell emblem. Deep sea-glass teal background with very subtle warm halo and tiny gold glints. Premium soft rounded 3D-painted storybook finish, fine tactile fur, controlled glossy pearl. Large simple silhouette readable at 48 pixels. Face and pearl fill 85% frame but every ear and paw fully within safe margin. No typography, no badge, no UI, no rounded outer frame (OS supplies shape), no extra objects, no alternate characters. Match atlas and cover exactly.

## Integration checks

Pearl colors and shell/leaf/moon/star emblems carry through cover, atlas and UI. The dedicated otter/pearl icon is used in the header, title page, favicon, Apple touch icon and manifest. The atlas's alpha is preserved, not chroma-keyed. Packing uses the largest connected alpha component in each cell only to determine a crop box; it does not paint or remove pixels. Generated source images are converted/resized for delivery. The pearl collection box displays actual collected colors rather than a decorative placeholder. All HTML and game text is English.
