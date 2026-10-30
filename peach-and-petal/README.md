# PEACH & PETAL

An original source-pixel ribbon patisserie puzzle. Twelve authored treat boxes in Apricot Morning, Rainy Day Tearoom and The Lantern Market. No image generation, external fonts, commercial assets, remote game services or runtime dependencies.

## The whole rule

Connect each pair of matching treats with one continuous ribbon. Move horizontally or vertically. Ribbons may not share a square; wooden covers are blocked. You do **not** have to fill every square. A completed ribbon sends its treat to the real serving plate above the board. Completing all pairs finishes the box and reveals a new illustrated cake.

Drag from one treat to its twin. Drag backwards along the same ribbon to shorten it. Alternatively tap an endpoint, then tap adjacent empty squares to grow the ribbon. Tap one of a pair's endpoints again to redraw its ribbon. An incorrect step is ignored; there is no life penalty or timer. Undo restores the previous completed drawing transaction. Cancelling a pointer discards that in-progress drag.

Focus the picture for keyboard play: arrows move the cursor; Enter or Space begins a ribbon at an endpoint, arrows draw, Enter commits. Escape cancels the current drawing or pauses. Z undoes a committed transaction. Keyboard drawing and pointer drawing use the same model.

Two optional gold sprinkles lie on each board. A sprinkle counts when a **completed** ribbon covers its square. Stars: finish the box; cover both sprinkles; use no Guide. Edits and Undo are free. Guide shows a complete authored recipe as a five-second translucent overlay. It does not modify your board or promise that the plan is compatible with already drawn alternate ribbons; redraw freely to follow it. Guide use stays counted through Undo. Starting that box again in the recipe book starts a fresh attempt.

## Collection and progression

Twelve distinct cake illustrations form the recipe book. Later boxes add pairs, bends and wooden covers. They are twelve finite authored puzzles, not an unlimited procedural campaign. Best stars and best score are retained separately per box; replaying does not repeatedly award new stars. Nine total best stars unlock Sage serving linen; 24 unlock Lilac. Linen colours change appearance only.

Active committed ribbons, guide count, progress, records, linen and sound/Gentle settings save in local browser storage. Reopening an unfinished attempt pauses before continuing. The undo stack and cosmetic courier travel are session-only. Pause, hidden tab and focus loss cancel an uncommitted drag, stop animation/model time and silence synthesized voices. Storage failure is handled without blocking play. Audio requires a user gesture. Gentle uses a lower render cap and removes moving rain. No microphone, accounts, payments or recording.

## Hosting

Extract all ZIP files together with `index.html` at the root. Serve over HTTP, for example `python -m http.server 8080`, and visit `http://127.0.0.1:8080/`. ES modules need an HTTP server; double-clicking the HTML file is not a supported launch path. Works on a static host in a subdirectory, with no build step or CDN.

Optional rule checks: `node tests.mjs`, or `npm test`. No dependency installation. Tests cover every authored route in both orientations, per-cell tap continuation, exact committed-state restore, pointer cancellation, illegal steps/crossings, undo, guide persistence, terminal guards and rewards. Native browser verification is recorded separately in the delivered report, outside this source directory. Simulated phone layouts do not constitute testing a physical handset or a platform grade.

## Artwork and sound

Original integer pixel drawing at 320×430, cached scenery and nearest-neighbour scaling. Distinct strawberry tart, lemon roll, almond éclair, pistachio macaron and plum cupcake sprites; fluted pastry paper, seeds, crumb layers, cream swirls, plates, piped ribbons, oak joinery, woven linen, cabinet jars, café glazing, rain and lanterns. Calico pastry chef has blinking, kneading and raised-arm delivery reactions. Couriers trace the actual completed route before arcing to the platter; the plate then becomes a tiered celebration cake. Original synthesized piping notes, delivery chimes and finale. The icon is original pixel SVG; cover is an actual runtime screenshot, not concept art.

Classic noncrossing pair-path puzzle family with independently authored code and art. Earlier match-three proposal was rejected during deduplication; no swap/match-three mechanic is in this game. No copied reference source or images, and no claim of global mechanic novelty.

Code and artwork: MIT, see LICENSE.txt.
