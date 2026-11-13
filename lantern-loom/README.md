# LANTERN LOOM

An original pocket greenhouse: draw glowing downhill bridges, ring flower bells, and guide at least three little lantern spirits into a botanical bowl. Physical paths determine the result. There is no timer, life counter, payment, prize or wagering.

## Play

Open index.html directly, or upload all files to any static HTML5 host. No build, account, remote runtime or CDN is required. All interface text is English.

- Drag on the dark pane to place a bridge. Up to five bridges share a visible thread budget. Each bridge is capped at 170 logical pixels; a very short stroke does not spend thread.
- LET IT FLOW releases four lights, one after another. Twin Lights gifts increase this to seven. A chamber clears after the release finishes with at least three delivered lights.
- Flower bells and fireflies award pollen. Bell sequences create a melody and clustered pixel blossoms; delivery lights the bowl and triggers a chime, small camera response and golden particles.
- GUIDE provides an optional, fully physical example route. UNDO removes the last bridge while planning. RESET restarts this chamber. Missed lights can be sent again; permanent pollen is retained.
- Starting at chamber three, tap a flower bell during flow to steer nearby spirits toward the bowl. A two-second cooldown prevents repeated pulses. Soft updrafts join at chamber five and a moving flower bell at chamber nine.
- A three-way gift draft follows each chamber. Six gift families affect thread, the pull into the bowl, extra spirits, flower rewards, nearby firefly collection and delivery income. Each has a finite cap; after all gifts are capped, Harvest awards pollen.
- Three permanent tools have four levels each: longer thread, wider bowl pull and longer firefly pickup range. Costs are 40, 160, 360 and 640 pollen. Twelve botanical discoveries fill the album and decorate the sill.
- Three garden color themes cycle every four chambers. Six mirrored route recipes repeat with wind and bell motion; later chambers are replayable variations, not unique authored maps without limit. The round counter is bounded to 999 on restoration.

## Saves and devices

Progress, tools, collected plants, gifts, thread paths and pending draft choices save locally. Reloading during a release returns that chamber to planning; the exact moving bodies are not restored. Pending rewards survive reload without another payout. Clearing browser storage clears the save. Restricted storage shows an explicit notice.

Portrait and landscape layouts support touch and mouse, including pointer cancellation. Controls have at least 44 CSS-pixel heights. The physical engine uses four substeps at a fixed 60 Hz, with a capped 30 FPS renderer and a 384 by 576 canvas. Hidden tabs suspend the simulation. Sound starts on a user gesture. Reduced-motion preference removes camera shake.

Keyboard: Space releases lights, Z undoes, H places the guide. This is a drawn-path game and needs pointing input for custom paths.

## Actual source reuse and licensing

The imported open-source-game-reference catalog identified [Descensus 2 by Tom W Hall](https://github.com/TomWHall/Descensus2), commit `750003f12815a756ebd18634e88620c1050a1ec5` (MIT). This package is not an unmodified port.

`bridge.js` adapts the midpoint / angle / capped-length construction from its Bar.ts, the publish/subscribe implementation from Bus.ts, and its p2 World / GSSolver / contact-material setup from p2/createWorld.ts. These are used by the running game, rather than included only as references. The original three TypeScript files and full MIT notice are bundled as upstream-*.ts and DESCENSUS-LICENSE.txt.

The original source used a Pixi scene graph, webpack 2, TypeScript 2 and p2 declarations. This adaptation uses a small Canvas renderer and a current standalone script entry, avoiding that old toolchain. Bundled p2.js 0.7.1 is also MIT; P2-LICENSE.txt is included.

No upstream image, audio, Constantia font, logo or other branded asset is used. ART-SOURCE.md describes the original generated greenhouse and runtime pixel sprites. All sound is synthesized locally. See LICENSE.txt for the new code. Test with `node test-engine.cjs`.
