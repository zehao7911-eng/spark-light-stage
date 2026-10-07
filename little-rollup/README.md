# Little Rollup

An original compact HTML5 roll-and-collect game inspired by [Katamari Damacy REROLL](https://store.steampowered.com/app/848350/Katamari_Damacy_REROLL/): a tiny rolling character, miniature everyday objects, visible things sticking to the ball and size-gated collecting. All models, layouts, character designs, sounds and music here are original code-authored work. No commercial assets, recordings, generated images or copied maps are included. This is a smaller browser interpretation, not the commercial game or its complete open world.

## Play

Use the bottom-left stick to roll. Smaller things stick; oversized things genuinely block your ball until it grows. Follow the little arrow or map to the nearest available pickup. Collecting charges Dash, which costs half a charge and gives a 1.1-second speed increase. There is no timer, life counter or early failure. Hold the world to steer toward a point as an alternative to the stick.

Four themed outings: Sunny Study, Toybox Bay, Picnic Patch and Evening Parade. Each has 96 regular objects across six sizes and three optional lost-star figurines. Each outing starts at 10cm and finishes at about 39cm. Mass determines the cube-root radius, rather than a cosmetic size counter. Sixteen objects per size tier provide a gradual route to larger books, pots, teddy bears, baskets and toy houses. Collision uses simple radii, not a full rigid-body simulation. Objects at the perimeter are scenery outside the playable boundary.

The ball visibly carries the latest 42 collected objects and rotates them with its rolling motion. Its full collected mass remains even when older visual attachments are omitted for performance. Model types include paper clips, dice, erasers, books, mugs, plants, buttons, toy blocks, ducks, robots, bears, berries, cookies, cups, donuts, apples, baskets, stars, gifts, balloons, cones, cars and houses. Each outing changes object types, scenery and palette; they share the same concentric progression layout. Replays seed small placement variations in those same layouts, not unlimited unique worlds.

One star for finishing, another for all three lost stars, a third for an eight-pickup chain. Chains expire after 2.5 seconds without a pickup but never remove collected objects. First clear pays six stardust plus stars; better replays pay only their star improvement. Total capped payout is 36 stardust. Mint, Lilac and Honey ball colours cost 6, 9 and 12. Once owned, colours switch freely. Collected days store best stars and small JPEG snapshots; PNG postcards capture the actual scene.

Current positions, velocities, collected items, mass, chains, charge and profile save locally. Continue starts with held input released. Menus, tab hiding and blur pause gameplay and stop synthesized voices. Completed restored rolls never pay twice. Restarting an outing confirms before replacing current progress and keeps collection/cosmetics.

## Desktop and phone

Arrows/WASD rolls, Space/Shift dashes, P/Escape pauses. Mouse can drag the stick or hold the world. Touch supports the stick plus Dash with a second finger. Interface buttons are at least 44px; portrait, landscape and vertical safe areas are included. The WebGL camera follows smoothly and pulls back with growth. A simpler Canvas2D view uses the identical engine when WebGL is unavailable. An actual lost WebGL context pauses and changes to that view without an automatic reload loop.

Extract the ZIP and open root `index.html`, or upload its extracted root to HTML5 hosting or GitHub Pages. The root index inlines every script/style, including bundled Three.js (MIT, license included). Editable sources are included. No CDN, fonts, accounts, tracking, remote assets, service workers or build step. Audio starts after interaction.

Rendering targets 30FPS/DPR1.5; simulation uses a fixed 60Hz step. Source models and scenery use merged vertex-colour geometry; regular objects and contact shadows are instanced. Simple hemisphere/directional lighting and contact blobs avoid expensive shadow maps. Attachments are capped at 42 and spark instances at 32; voices and event history are bounded. At most 99 pickups per outing. Idle menus stop drawing after one settling frame. Real hardware capability still determines achievable frame rate.

## Validation

Engine tests cover twelve complete authored/seeded outings, every themed collection, all three relics, reward caps/replay, all colour purchases, dash costs, exact state continuation, genuine oversized collision and refusal to award an unfinished outing. Native emulated touch tests cover all four complete WebGL outings, three stars each, simultaneous stick/Dash, paused pixels/audio, exact reload, postcard download, all cosmetic purchases and four phone sizes. A full outing also runs with WebGL disabled. Mouse/keyboard tests cover movement, a full collection, dash, pause, reload, forced real context loss and continuation in Canvas, plus 35px top/34px bottom safe-area layouts. Cold offline files issue zero HTTP requests. A physical handset was unavailable; browser input/viewport emulation is not physical hardware testing.
