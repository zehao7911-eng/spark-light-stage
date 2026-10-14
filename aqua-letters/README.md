# AQUA LETTERS

An original compact aquarium game, inspired by Chillquarium's buy / feed / grow / sell-or-keep loop. Made with Godot 4.7.2 Compatibility, single-thread HTML5 export. No commercial game art, music, code or branding is bundled. This is not a complete reproduction of Chillquarium.

## Play

Hold **Sprinkle food**, or press empty water, for free food. Fish swim toward it and grow faster when they eat. Tap a fish, or use **Meet your fish**, to inspect it. Grown fish earn viewing income automatically. **Rehome** sells a grown fish; pinning a favourite prevents accidental sales.

Fish mail contains three juveniles. Three packs each contain six species; 18 species and three colour forms make 54 collection entries. Each fish rolls 2.5% iridescent, 15% golden and 82.5% classic. Every fifth pack attempts to reveal a missing classic species from that pack. Species odds within each pack are 30 / 24 / 18 / 14 / 9 / 5 percent. The field guide shows each discovered species' colour forms, growth time, sale value and viewing income. No real money or purchases.

Expand twice to unlock three separate rooms and the next fish mail. Capacity is 12 / 16 / 20 fish per room. **Switch room** changes your view; **Move** transfers a selected fish to the next unlocked room if it has space. Hidden rooms still grow and earn income. Three automatic feeder upgrades feed the visible room every 9 / 4.5 / 3 seconds. Six one-time milestones award coins. Three scenery arrangements and day/evening lighting are available from the start. Empty aquariums with fewer than 25 coins can adopt one free rescue guppy.

Classic juvenile-to-adult time is 35–137 seconds without food, depending on species. Food adds 5.5% growth per pellet. Adult sale value is 16+7×species index, multiplied by 1 / 3 / 5 for classic / golden / iridescent. Adult viewing income is (0.12+0.025×species index) × (1+colour index) coins per second. There is no death, combat or failure timer.

## Save and performance

Browser localStorage saves progress every four active seconds and after purchases, sales, transfers and rewards. Returning to a saved aquarium applies up to eight hours of natural growth and viewing income, once, without automatic feeding. Menus and hidden tabs pause the live simulation; positions and targets are saved, transient food/effects are not. Clearing browser data removes progress. If storage is blocked, the current session remains playable. English UI, responsive portrait/landscape layout, nearest-filtered 480×300 landscape / 480×510 tall-portrait original code-authored pixel art. Portrait scenery expands vertically while fish retain their natural proportions. Fish are bounded at 60 total; food at 35 pellets and effects at 150 particles.

Requires a WebGL2-capable browser. First visit downloads the Godot WebAssembly runtime (approximately 40 MB before transfer compression). Serve over HTTP(S); opening the exported HTML directly as file:// is not supported. No third-party CDN, web fonts or network assets. PNG postcards contain only the aquarium, at its native resolution.

## Rebuild

Open `godot-source/project.godot` in Godot 4.7.2 with matching Web templates. Export the Web preset, then insert the contents of `ui.html` before the exported HTML's closing body tag and copy `ui.css` / `ui.js` beside it. A fresh export is required before insertion to avoid duplicate UI.

This package includes the playable web root and editable Godot source. Desktop and browser viewport checks do not constitute certification on every physical handset.
