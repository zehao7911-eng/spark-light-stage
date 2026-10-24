# BRASSBLOOM

A small original HTML5 music-box repair game. A walnut workbench, brass tracks and six forgotten mechanical toys. No account, purchase, timer or lost lives.

## Play

1. Tap a track to rotate it clockwise. Start at the ivory arrow on the left.
2. Connect a route through every bell and out through the right-hand flag.
3. Wind & Play sends a glowing marble along the route. Bells sound as it passes. A gap is highlighted when the marble stops.
4. Earn brass, improve your tools, and restore a new collectible every six repairs.

Tracks with screws are fixed. Numbered bells, introduced at repair 12, must ring in order. Bridges, introduced at repair 18, let two straight grooves cross without joining.

Tune One Track is always free. It corrects a piece of the intended route. Undo restores the previous orientation state, but does not erase hint use or test history. A hint-assisted repair earns one star. A repair completed within two tests without hints earns three; later completion earns two. Stars do not gate progress. There is no move limit.

The first repair is one clockwise turn away from completion. It teaches the loop without a long tutorial. The grid grows from 4 by 4 to 5 by 5 at repair 6. Repair 19 adds a fourth bell. Six named series, 36 initial commissions and deterministic endless commissions follow. New commissions use new routes; artwork themes cycle after the six-object collection.

## Permanent tools

- Tracing Lens: preview the connected trail; level 2 marks intended-route bends, level 3 marks all intended-route pieces.
- Tip Jar: eight extra brass per level on first-time repairs.
- Tuning Fork: each use of free tuning corrects one extra piece per level, up to four pieces.

Six collectible objects have separate original pixel illustrations. After six repairs, an enlarged reveal and replayable synthesized tune celebrate the object. The cabinet preserves all six. Progress, partial orientations, coins, tools and sound settings save locally under `brassbloom-save-v1`.

## Run

Serve this folder with any static HTTP server, for example `python -m http.server 8080`, or upload it directly to GitHub Pages. All dependencies and artwork are local. The game needs no build step or CDN. Browsers may restrict local storage when opening `index.html` as a file; use HTTP for reliable saves. Web Audio begins after a gesture and can be muted.

The portrait camera focuses on the mechanism and its plaque, with large touch controls below. Desktop retains the full workbench composition. Landscape phone layout uses a side control column. The page may scroll on short phones. Animation is capped near 30 FPS, pauses in background tabs, and respects reduced motion. Device performance depends on the browser; viewport QA is not a physical-device benchmark.

## Validation

Run `node test-rules.cjs`. The engine suite verifies 1,200 deterministic solvable boards, all path adjacencies, ordered bell traversal, bridge traversal, persistent rotation state, hints, progression, upgrades and one-time rewards.

## Reference and originality

[Assemble with Care](https://store.steampowered.com/app/1202900/Assemble_with_Care/) inspired the broad pleasure of repairing cherished little objects. This is an original track-routing music-box game, with different rules, world, characters, objects, artwork and interface. It contains no Steam game assets, names, logos, dialogue or copied layouts. See `ART-SOURCE.md` for the visual pipeline.
