# TIDEBYTE — The Little Post

A complete original English delivery-and-exploration game for desktop and mobile browsers. Keep a little island post going: walk exposed sand, sail the tide, carry parcels and bring eighteen neighbours closer together. The original Tidebyte20 pixel artwork is retained and extended into a 768×480 traversable archipelago.

## Play

Open index.html or serve this folder with `python -m http.server 8000`. No installation, account, build or external CDN is needed. All runtime assets are local. Audio is optional and starts after a tap.

- **Pick Up:** walk to the nearest open post office and load the next parcel. You can also tap a post office in the world.
- **Deliver:** follow the selected parcel to its recipient. Tap a path to choose your own route; tapping a person or the parcel card also follows that address. Arrow keys / WASD move; E follows the next parcel.
- **Stamp It:** tap when the white pointer enters gold for a perfect postmark, extra coins and a combo. Any timing delivers safely; there is no failed delivery or lost parcel.
- **Tide clock:** wait for the next wet/dry crossing state. The cycle is low 20 seconds, rising 8, high 20, falling 8. Sandbars flood halfway through the rise and emerge halfway through the fall. Waiting advances the tide, not the active delivery bonus timer.
- **Shore / Sail:** after the boat opens, change route preference. Shore favours land and exposed sand; Sail favours water. Water travel is faster at high tide. These choices change actual pathfinding, not only visuals.
- **Dash:** after eight deliveries, burst forward for 2.4 seconds with an eight-second cooldown. Space also dashes while keyboard focus is in the world.
- The map shows islands, post offices and parcel destinations. Its travel buttons navigate real paths; they do not teleport.

Normal letters have a friendly care tip. Fragile parcels give a tip for staying dry; express parcels for arriving within 75 active seconds; flower parcels for collecting a postmark or tide treasure on the way. Missing a care tip never takes away a parcel or its base pay. Menus and pause freeze active time.

## Progression

- 3 deliveries: pocket boat and sailing preference.
- 4: Reed Reach.
- 8: Lantern Point and Dash.
- 13: Cloud Orchard and two-parcel routes. Choose which parcel to deliver first using the two cards or Album → Parcels.
- 18: story ending and repeatable postal rounds. Each round creates three distinct addresses with changing parcel conditions.

Twelve hidden postmarks unlock three coat colours at 3 / 6 / 9 finds. Exposed sand hides tide shells; high water carries bottle post. These caches replenish after 38 active seconds. Three resident requests reward collections, reliable service and a three-perfect combo.

Upgrade Swift Boots, Pocket Sail, Finder Bell and Brass Seal through three levels each. They change walking speed, sailing speed, collection radius, timing tolerance and delivery tips. Coins are earned only in this game; no real-money features are present.

## Saves and controls

The game saves locally every four active seconds, at key rewards and changes, and when backgrounded. Parcels, postmark state, upgrades, coats, round tasks and rewards survive reload. Reload pauses the game and cancels only the current walking route: resume, then tap Deliver to continue. Coins already credited on a receipt are not credited again. New Post Route requires confirmation. Saves are browser/origin-specific, not cloud-synced; clearing site data clears them. Restricted storage produces an on-screen warning.

The browser study and original art board remain in art-book.html. ART-DIRECTION.md is the original art specification. The game continues its 20-colour palette, 16×16 tiles/props and 16×24 character cells; sprites and world coordinates use integer native pixels. The HUD is English and touch-friendly.

## Source and checks

```
python build_art.py
python build_game_art.py
python qa_art.py
node qa_game.cjs
```

Rebuilding requires Python and Pillow. Playing needs only a modern browser with Canvas2D; WebGL is not required. engine.js owns pathfinding, tide states, delivery conditions, progression and save validation. game.js owns rendering, native pointer/keyboard input, menus, storage and original synthesized feedback. world-data.js provides the same map as world.json without a fetch requirement under file://.

The original and added art manifests include image dimensions and hashes. VALIDATION.md records the actual art, model and browser checks. Mobile tests are browser viewport tests, not a physical-device FPS or battery certification.
