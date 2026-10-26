# Aqua Panic! — reference study remake

Feed little guppies until they grow, tap their falling coins, protect the tank from aliens, and buy fish, upgrades and helper pets. Purchase three egg pieces to advance. Fish, money and upgrades carry into the next aquarium; egg costs and invader pressure rise with the aquarium number.

Touch: tap the water to feed, tap coins to collect, tap an alien to fire. Holding repeats the action and moving the held pointer moves the drop point. The three bottom tabs open shops. Tap the level bar to pause. Keyboard F/U/P open the three shops; Escape pauses. Sound is optional and starts only after interaction.

Open index.html directly or serve this directory with any static server. There is no build framework, account, CDN, analytics or runtime API requirement. Initial loading has a reload fallback. Progress saves locally when browser storage is available. Hidden tabs and focus loss pause the world. No service worker is installed; the downloaded package is the offline delivery.

## Art and reference

The selected reference is **Aqua Panic! on Rezona**, project JLrmuPsw, v3:
https://rezona.ai/game/pgcserver/pv/JLrmuPsw/v3/dist/index.html

This is an independently written HTML5 implementation based on visible play and shop inspection. Art was regenerated using the observed screen as a composition/style reference. The reference site's proprietary source and original asset files are not included. The public reference script was also inspected for gameplay constants and pricing; REFERENCE-FACTS.json and SOURCE.md record the alignment and remaining rendering/adaptation differences.

The actual game uses the same illustrated artwork as its title page and icon. Separate portrait and landscape backdrops retain both coral gardens. Fish swimming, growth stages, alien reactions and helper pets use a transparent atlas; food/weapon icons share the illustration style.

## Editable source

- model.js: deterministic fixed-step economy, fish, feeding, hunger, aliens, pets, progression and validated snapshots; also exports CommonJS for independent tests.
- game.js: touch/keyboard input, sprite rendering, UI, optional sound and local save.
- app.js: combined classic script; tools/pack.py rebuilds it and compresses the included full-resolution PNG artwork (requires Pillow).
- assets/data.js: compact embedded sprite/icon data. Backdrops, font and logo are local files.

Logical world width is 1000 units; world height adapts to the viewport without stretching fish. Canvas DPR is capped at 1.5, rendering at 40 fps and simulation at 60 Hz. Limits: 24 fish, 5 airborne pellets (40 total including brief floor remnants), 40 coins, 3 aliens, 160 transient effects, 16 audio voices.
