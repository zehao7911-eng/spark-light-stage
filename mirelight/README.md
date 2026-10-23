# MIRELIGHT — Original Pixel Art Kit

This is an art-direction package and interactive three-bell scene study for an original game, **The Bellwright**. It is not a complete adventure campaign.

Open `index.html` to inspect the world, cast, material library, interface and visual production rules. All runtime assets are local, so the study can also run from a static server without a build step or external CDN.

## Try the study

Choose one of the three bell buttons. Iona walks over, prepares her hammer, strikes on the contact frame and recovers. Answer all three bells to finish the scene study. Click or drag the scene to walk; arrows/WASD also move, E operates a nearby bell, and Escape pauses. Sound is optional and requires the sound button. Near view, dusk and grid controls help inspect visual consistency. Reset replays the sample.

The study has no timers, monetisation, random loot or hidden download dependencies. Its purpose is to evaluate the original artwork and interaction readability before developing a larger game.

## Included

- Twenty-one original PNG files: runtime scene, dusk remap, character/prop/material/effect/companion/font atlases, wide and close compositions, and review boards.
- Two six-frame GIF previews using the actual character atlas poses.
- A fixed 32-colour palette with material ramps and named hex values.
- Machine-readable asset dimensions, frame cells, foot anchors and PNG checksums.
- `ART-DIRECTION.md`: shared visual rules, Steam-reference interpretation and extension recipes.
- `build_art.py`: reproducible native-grid original artwork source. Requires Python and Pillow only if rebuilding; not required to view the package.
- `qa_art.py`: production checks for palette, transparency, dimensions, exact crop relationships, integer enlargements and integrity.

## Check and rebuild

```
python build_art.py
python qa_art.py
python -m http.server 8000
```

The interactive scene snaps coordinates to whole authored pixels and uses integer zooms. Presentation thumbnails may fit the browser width; inspect native PNGs to judge the production grid. UI copy and production documents are English.

Reference study: Eastward and Sea of Stars on Steam. The imported open-source-game-reference catalog was searched and Shattered Pixel Dungeon inspected. No commercial or open-source project's code, art, logos, glyphs or characters are distributed in this original kit.

Phone portrait/landscape checks are browser viewport tests. Physical-device performance and background behaviour are not certified.
