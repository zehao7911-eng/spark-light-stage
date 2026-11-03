# Pocket Giants — Small Things, Big Possibilities

An original little 3D resizing journey puzzle. Make a way to the house. Select a boulder, mushroom, cloud, balloon or sun, then choose SMALL, MEDIUM or LARGE. The world changes immediately; a tiny explorer automatically crosses the next safe section. Keyboard 1–5 selects objects, left/right arrows changes size, Escape pauses. There is no timer, combat, life limit, purchase or account.

## Six small worlds

1. A Small Favour: shrink a boulder, grow a mushroom over a real visible gap.
2. A Change of Tide: shrink a cloud to expose stepping stones; later regrow it to lift a raft.
3. Up, Up. Down.: enlarge a balloon to reach the upper landing, then shrink it to come back down.
4. Warm Hands, Cool Head: enlarge the sun to melt ice, then cool a garden so flowers open.
5. Just the Right Size: the medium mushroom spans a short gap without touching the arch posts; later the large size spans the wider gap.
6. The Bigger Picture: a six-step combination, with low water required under the mushroom crossing before high water floats the final raft.

These are six finite authored sequences using three environment kits, not an open-world simulation, procedural endless campaign or the commercial reference's hidden-object game. Some repeated props are magically linked to the same size control. Paths and blockers use explicit discrete three-size constraints. Character traversal follows authored waypoints; it is not a rigid-body or full buoyancy simulation. Mushroom crossing height follows the visible cap surface; balloon/raft traversal moves its platform with the explorer. Resizing locks briefly while crossing, preventing a bridge from being removed under the character.

Finish / stay within the change-count par / use no hints earns up to three independent best stars, 18 total. Six stars unlock a rose coat, twelve a honey coat. Replays keep only best achievements. Free hints select a useful object and name a useful size; exploring or changing the wrong object never loses progress. Completed worlds, stars, best move count, coat, sound, effects and exact active traversal save locally. Reloaded active play starts paused. Storage failure leaves a playable in-memory session.

## Art, reference and licenses

Original code-modelled miniature slabs, layered pathways, giant spotted mushrooms, rounded boulders, tidal bowls/stones/rafts, rope balloon lifts, frost blocks, articulated flowers, little lit home and a clothed human explorer with articulated walking legs, hat, pack and swinging lantern. Mushroom woodland, coral tide garden and snowy conifer/crystal atelier have distinct constructions. Soft matte lavender/rose/teal/amber materials, contact shadows, bounded sparkle effects, bespoke SVG icon and actual runtime screenshot cover. No image generation, remote fonts, commercial art, source or recordings are used.

Sizeable by Business Goose Studios, https://store.steampowered.com/app/1333910/Sizeable/ , was reviewed on 2026-11-03: official description and an actual fairground diorama screenshot (ss_1d7d54c7a5281c42839a68c8f6988d882d923e8c). Its direct shrink/grow environment causality inspired this independent waypoint journey. No full reference play, replicated commercial levels, asset reuse, visual parity, current popularity ranking or platform grade is claimed. Earlier Superliminal-inspired angular perspective scaling, Squeeze Please's constant-volume body fitting, and recent courier/balance games are different interactions; adjacent scaling and miniature genres are acknowledged.

Original game code/art uses LICENSE.txt (MIT). Shared original MIT primitive helpers and the guarded SDK pattern were adapted from previous workspace projects. Three.js r147 is local, with vendor/THREE-LICENSE.txt. No runtime CDN is required.

## Browser/mobile

Touch and keyboard; portrait/landscape and safe areas. Action targets are at least 44px. The object strip scrolls independently and keeps the selected control visible. Short landscape uses a right sidebar. Default rendering caps DPR at 1.5; Light graphics uses 1 and disables shadows, Gentle effects reduces particles. Static scenery and fixed model parts are merged, particle count <=65, audio voices <=18. Audio begins after a gesture and stops when paused/backgrounded. WebGL unavailable shows a visible fallback message. Layout emulation is not physical Android/iOS performance certification.

## Optional GameWave SDK

Core boot, input and rendering never await window.neonlib. Supported actual positive onLike events unlock a visible golden lantern; successful direct onComment events including image-only empty content unlock a visible three-pom party hat. These are once-only persisted optional cosmetics, not registration rewards or required gates. No like/comment posting is automated. App-only extras are honestly labelled in ordinary browsers. Registration codes, late injection, bounded probes and deferred unsubscribe are guarded. Unknown/failed cloud loads suppress saves to avoid overwriting unseen state; valid progress merges monotonically, while current active-run ownership remains local. The full profile and active run are saved together. Mock checks do not establish actual host, cloud or import success. See GAMEWAVE-IMPORT.txt. Official public Feishu SDK document was rechecked on 2026-11-03 and still showed October 30 modified.

## Run / modify

Serve this folder over HTTP (for example python -m http.server 8000) and open index.html. index.html and standalone.html are identical self-contained runtime pages; editable modules and the local vendor are included. Rebuild with python build.py. Test with node tests.mjs. A game-only root-index ZIP is the delivery format.
