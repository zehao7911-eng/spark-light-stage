# Sprocket Hop

A complete small original HTML5 robot-rescue puzzle in the established peg-solitaire family. Hop one robot over a neighbouring robot into an empty bay, horizontally or vertically. The jumped friend boards the rocket. Leave one robot on deck; that last friend then boards automatically.

## Play

- Drag a bot into a highlighted empty landing bay, or tap a bot and then tap its destination. A hop spans exactly two bays, with one robot between them. Diagonal moves, stepping into a neighbour and jumping over empty bays are invalid.
- Twelve fixed missions introduce different footprints and two to twelve robots. The first mission needs one gesture. Later levels require a useful order of hops. Any final bay wins; no specific final-bay restriction is hidden.
- No timer, lives, purchases or idle penalty. Undo is free. Bad routes can reach a dead end; use Undo or Guide instead of restarting the whole campaign.
- Guide searches the actual current layout. If it cannot find a route, it rewinds to the nearest saved solvable position and highlights a next hop. It never removes a robot for you. A guided clear earns two stars; an unguided clear earns three. Undo does not erase Guide usage. Best stars only improve.
- Every mission awards a named crew patch in the Crew log. Six stars unlock a Coral deck finish; eighteen unlock Lilac. These change platform framing, tile colours and a little robot badge, not the entire generated character skin. Open missions are replayable. Enjoy the spaceport opens its full-resolution artwork after a clear.
- Keyboard: focus the deck; arrows move the bay cursor, Enter/Space selects a bot or hops into an empty bay, Escape cancels.
- Sound and Gentle mode are stored locally. Gentle removes ambient motion, flight/landing animation and particles but keeps instant clear feedback. Pause stops movement and audio. Leaving the tab pauses an unfinished board. The browser may prevent storage in private or restricted contexts; play still works for the session.

## Art and animation

Five final assets were produced using the built-in image_gen tool: three coherent spaceport backgrounds, one transparent four-pose robot atlas and a promotional cover. The world establishes a cream/teal/copper palette; later images reference that world and character. The first robot atlas was replaced after narrow-screen review because its microdetail became noisy. Only the final atlas is bundled. Exact prompts and output identifiers are in ART-PROMPTS.md.

The generated PNGs are included unchanged. At runtime, transparent bounds in each atlas quadrant are measured at alpha >24 to preserve antennas and boots. Robots use standing, crouching, airborne and waving poses, with code-driven trajectories, squash/scale, jet trails, shadows and boarding particles. These are four generated pose frames, not a claim of a hand-authored full walk cycle. Robot downsampling uses filtering into the 320-pixel-wide logical canvas to reduce aliasing; the finished game is displayed with nearest-neighbour CSS pixel scaling. Backgrounds use the same logical canvas. Source illustrations are detailed pixel-style generated art, not a claim that the generator produced exact native 32x40 sprites.

The live bay platforms, outlines, goal highlights, numeric displays, patch-rank motifs and effects are original code-native pixel art. The SVG icon is original code artwork. The cover is a generated promotional illustration, not a gameplay screenshot. No commercial game characters, images, logos, sounds or code are bundled.

## Hosting and download package

Serve this folder with any static HTTP/HTTPS server, for example `python -m http.server 8080`, and open localhost:8080. Keep index.html at the root and preserve assets/. No build, external libraries, fonts, CDN, account, WebGL or game backend are needed. ES modules require HTTP/HTTPS; opening index.html as a file URL is not supported. The whole folder can be uploaded to a static HTML5 game platform or GitHub Pages.

The first background and robot atlas load from this package; later backgrounds load when entering those districts. Original code-drawn fallback art keeps the board playable while PNGs load, or if image loading fails. There is no loading gate waiting on an external service.

Save data records each legal mask transition and validates it against the actual level geometry. Logical hops settle immediately, independently of animation rate; a reload restores the settled board. Interrupted cosmetic flights do not remove extra crew, create rewards or leave an input lock.

## Verification

Run `node tests.mjs`: 4,312 assertions cover all twelve authored and searched solutions, 840 independently calculated grid-move cases, strict save validation, Undo, assistance persistence and 384 random playthroughs. Of those random playthroughs, 274 hit dead ends and recovered through Guide rewinds. Levels are finite and authored; there is no claim of endless unique content or a newly invented game genre.

Real browser-pointer input completed all twelve missions and 36/36 stars. Tests included partial mission-six save/reload, Undo, an actual mission-four dead end and Guide rewind, assisted best-score preservation, deck unlocks and 320x568, 390x844 and 844x390 layouts. Visible controls are at least 44 pixels and the narrow active platform has approximately 44.7-pixel bay spacing. Physical Android/iOS handset performance is not tested; viewport emulation is not phone certification. No external platform rating or Steam-equivalent quality is claimed.

Original source and retained own-project utility notices: see LICENSE.txt.
