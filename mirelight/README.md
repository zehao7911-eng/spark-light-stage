# MIRELIGHT — The Bellwright

A complete original repair-and-exploration game for desktop and mobile browsers. Wake four rain-soaked streets by tuning bells, cleaning glass and fitting clockwork. All English, dependency-free, with optional original synthesized audio.

## Play

Open index.html, or serve this folder with `python -m http.server 8000`. No account, build, CDN or WebGL is required.

- Tap a gold marker to approach a mechanism, or use Next Repair. Tap/drag the street to walk. Arrow keys / WASD move; E selects the next commission.
- Bells: strike as the white needle enters gold. Misses cost no parts and never reset successful notes.
- Glass: swipe the cloudy panes clear. Sweep is an accessible alternative.
- Clockwork: drag horizontally or hold Turn to align the bright spoke with the gold top notch, then Fit.
- Spend parts in Tools. Hammer improves timing, Brush widens cleaning, Wrench improves fitting and Boots increase speed. Master upgrades change the mechanics; upgraded moths collect nearby curios.
- Four repairs open the next district. Find three curios per street, deliver resident requests, and unlock three alternative capes.
- Finish 16 story restorations for the ending and Night Watch: three rotating commissions per round, indefinitely. Timing becomes slightly quicker.
- Pause, sound and a district map are available. New Journey requires confirmation.

The game saves locally every four active seconds and at rewards, collections, purchases, travel and backgrounding. Mid-repair progress and reward screens survive reloads. Saves belong to this browser/origin, not a cloud account. Blocked storage produces a visible warning. Deleting browser data removes saves.

## Art and source

Four distinct 640×360 authored streets and four restored variants use the approved 32-colour palette. Characters retain 32×48 cells, foot anchors and six-frame animation. Three cape atlases and an eight-frame machinery atlas extend the same world. Coordinates and world zooms snap to integer pixels. No smooth 3D or photographic textures.

art-lab.html preserves the original art book and three-bell scene study. ART-DIRECTION.md explains the shared visual rules. All characters, world, code, synthesized audio and artwork are original; no commercial game's assets or complete interface are included.

engine.js owns progression, economy, repairs, rewards and versioned saves. game.js handles Canvas2D rendering, pointer/keyboard input, audio, menus and storage. game.css provides responsive controls. All runtime assets are local.

## Rebuild and check

```
python build_art.py
python build_game_art.py
python qa_art.py
node qa_game.cjs
```

Rebuilding requires Python and Pillow; playing does not. assets.json describes the original art kit checksums; build_game_art.py generates additions. VALIDATION.md records actual checks and mobile test limitations.
