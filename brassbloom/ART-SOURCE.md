# Original pixel artwork and visual rules

Generated with the built-in image generation tool, not the API/CLI fallback. Two image generations were used. The previous BLUE HOUR desk was a style reference only. No Steam artwork was downloaded or traced.

## Shared rules

Hard-edged clustered pixels, visible small square steps, restrained shade ramps, warm walnut and cream against petrol green, mint and engraved brass. Strong silhouettes precede tiny surface texture. Interaction highlights use ivory and mint; gaps use coral. The mechanism, effects and dot-matrix lettering use rectangular pixel strokes. Original object sprites and the workbench share brass engraving, navy enamel and warm highlights.

The static workbench has an empty central felt mat. The game draws real track pieces, illuminated trails, passing marbles, per-bell notes, particle pings and repair states on top. Artwork is not a screenshot used in place of gameplay. No smooth three-dimensional renderer is involved.

## Source files

- `desk.webp`: full-resolution 1536 by 1024 lossless copy of the generated workbench.
- `toys.webp`: full-resolution 1536 by 1024 RGBA atlas, three columns by two rows. Each 512 by 512 cell is sampled directly at runtime. Transparent padding is preserved, not chroma-keyed.
- `font.json`: original shared bitmap glyph toolkit, reused from the author's previous game.

PNG masters are preserved in the workspace beside the game under `brassbloom-art-sources/`. Both public WebP files were checked to decode to exactly the same pixels as the masters. No repainting, sharpening or AI upscaling was applied during integration.

## Final prompt set

### Workbench — style-reference generation

Use case: stylized-concept. Create a production game background for an original pixel-art clockwork repair game BRASSBLOOM. Reference image is STYLE ONLY: match its exceptionally polished crisp clustered pixel artwork, fine material texture, visible 3px pixel granules, limited ramps, inviting tiny props. Entirely NEW composition and subject, no scratch cards, no phone, no blue ticket. Fixed overhead view of a cozy walnut music-box artisan workbench, landscape 1536x1024. CENTER from x430 to1110 and y200 to880 is a large EMPTY flat dark petrol-green rectangular felt repair mat, unobstructed, perfectly rectangular and axis aligned, with a thin ornate brass frame and corner screws. This empty rectangular area is vital: game draws a square mechanism there. Nothing on the mat. Around the mat: left open pigeonhole shelves with delightful repaired mechanical bird, tiny carousel and lighthouse; bottom left an open cream repair notebook with subtle diagrams and no legible words; top left small trailing plant and jars; upper right gorgeous brass desk lamp and round wooden wind-up clock; bottom right red-handled screwdriver, tweezers, gold winding key, tiny screws in ceramic dish. Brass hinges, engraved frames, warm wood rings, ceramic highlights, carefully clustered shadows. Top center small cream engraved plaque with only exact text BRASSBLOOM. Keep object silhouettes readable and central mat strong and clear. No UI overlays, no modern vector art, no smooth painted gradients, no blur, no watermark, no existing game characters. High quality actual pixel artwork like reference, not low resolution compression.

### Collectible atlas — workbench as style reference

Use case: stylized-concept. Production sprite atlas for original BRASSBLOOM music box repair game. Match reference artwork's intricate hard edged pixel clusters, 3px visible pixel grid, fine brass engravings, warm walnut, navy enamel, mint green and warm cream, polished tiny objects with readable silhouettes. TRUE transparent background. STRICT uniform grid THREE columns by TWO rows, SIX separate centered objects in equal square cells, plentiful empty transparent padding between each, all same approximate size and entirely within own cell, no labels, no UI, no text, no cast shadow outside object. Row1: 1 adorable blue and cream mechanical wren with golden wing joints perched on ornate round walnut and teal enamel music box base; 2 miniature red cream and gold three horse carousel on matching brass music box base; 3 cream seaside lighthouse with red roof tiny waves and rocky islet on matching music box base. Row2: 4 an open gold moonflower with ivory petals and a crescent moon suspended on curved stem on matching base; 5 curled sleeping rust orange fox under tiny tree on matching base; 6 miniature celestial observatory navy dome with brass telescope stars and cloud motif on matching base. Each is a charming detailed original antique toy, overhead-ish isometric 3/4 showcase view consistently, crisp pixel steps, no smooth vector or painterly gradients. Atlas will be sliced into 3 columns and 2 rows mechanically, ensure each object fits cleanly in its cell.
