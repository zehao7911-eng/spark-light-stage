# TIDEBYTE — Original clear-grain pixel art kit

An extensible original art direction for a small tidal-island delivery world. **This is an art kit and animated browser study, not a complete game.**

Open index.html to inspect the actual sprites in a native-grid scene. Toggle Close View, Late Tide, Tile Grid and Pause; Send Parcel demonstrates a four-pose action and brief pixel effects. All browser resources are local. No dependency installation or network/CDN is required to view it.

## Review

- art-direction-board.png: unified wide/close scene, 20-colour palette, cast, eight props, eight material tiles, dialogue/action interface and send poses.
- far-native.png / near-native.png: 320×180 world and exact 160×90 crop. far-view.png / near-view.png are 3× and 6× nearest-neighbour enlargements.
- silhouette-study.png: three characters in colour and as solid silhouettes.
- lighting-study.png: daylight and a palette-index dusk remap with unchanged drawing rules.
- characters.png: four columns, four 16×24 rows; Nori walk, Bex walk, Uma walk, Nori send. Foot anchor (8,22).
- props.png / tiles.png: eight 16×16 cells each. effects.png: four 32×24 cells.
- interface-native.png / interface-view.png: original dialogue and action UI using those same props and palette.
- nori-walk.gif: four-frame 150-ms sprite animation preview.
- palette.json / assets.json: named colours, atlas cells, character foot anchor and image dimensions/checksums.
- ART-DIRECTION.md: world, ratios, palette ramps, outline and cluster rules, materials, UI, animation timing and extension criteria.

## Build and verify

Requires Python and Pillow only for rebuilding:

```
python build_art.py
python qa_art.py
python -m http.server 8000
```

The artwork is drawn directly on an integer pixel grid using solid fills. No anti-aliasing, smooth 3D, random surface noise, lossy compression, borrowed game characters, logos or complete interfaces. Review thumbnails may fit their page containers; inspect the native files or integer-scaled live preview to assess actual pixel construction.

The browser study uses touch-friendly controls and respects reduced motion at startup. It is a visual sample, not evidence of a full game's mobile performance. All visible copy and production documents are English.
