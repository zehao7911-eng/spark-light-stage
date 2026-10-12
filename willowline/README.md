# WILLOWLINE

A small, relaxed pixel fishing game made with Godot 4.7.2. English UI, touch and mouse controls, three original painted pixel waters, a dog companion and a personal fish sanctuary.

## Play
Serve this folder over HTTP/HTTPS and open index.html. Do not open the file directly. A modern WebGL 2 browser is required. The first visit downloads the Godot runtime; loading progress and a manual retry are provided. Single-thread export does not require cross-origin isolation. No CDN or account required.

Tap the water to aim. Cast, wait for a bite, and tap Hook. Hold the large button to reel during calm water. Release when the fish pulls to ease tension. Space also casts, hooks and reels. Sell catches for shells or keep them in your sanctuary. New discoveries and catch milestones reward shells. Open the tackle box to improve your rod/reel, or the waters menu to unlock two further locations. Bait is free and missed fish do not cost resources.

12 fish, including three legendary encounters. Each water has three normal species and one legend. Legends require rod levels 1/2/3 and appear on every fifth local catch once the requirement is met. Catch counts, records, collections, upgrades and an unresolved catch save locally. Clearing browser site data removes progress. An interrupted active fight restarts without a penalty.

## Art and sound
Original generated backgrounds and transparent sprite atlases, with exact generation prompts in godot-source/ART-DIRECTION.json. 12 angler animation frames across walking/casting/reeling; separately animated boat, companion, reeds, leaves, birds, ripples, water reflections, fish landing and swimming. Browser synthesized ambience and effects; optional mute and gentle-motion settings. Cast n Chill is a design/craft reference; this is an independent small game, not that commercial game or its assets.

## Rebuild
Open godot-source/project.godot in Godot 4.7.2 with Web export templates installed. Export preset Web to a fresh folder. Insert ui-fragment.html before the closing body tag in exported index.html; copy ui.css and ui.js alongside it. Replace __REGIONS__ in ui.js with the contents of regions.json. Copy assets/fish.png, lake.png, fen.png and coast.png alongside index.html. Keep the exported index.js, index.wasm, index.pck and audio worklets.

Native headless QA: godot --headless --path godot-source -- --qa
Extended progression QA: godot --headless --path godot-source --script res://Verify.gd
The web DOM supplies menus; the editable native project is the game/rendering source, not a separate complete desktop UI.

## Validation
Actual browser capture, sale, keep, sanctuary, rod purchase and save reload checks; responsive portrait and landscape checks. Headless tests cover funded progression through all waters, all 12 species, all three legends, upgrades, missed bites, pause and pending-catch settlement without duplicate payment. Browser viewport testing does not certify every physical handset. The runtime is about 40 MB uncompressed, so first-load speed depends on connection/device.
