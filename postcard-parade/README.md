# POSTCARD PARADE

An original compact pixel postcard puzzle, inspired by Wilmot Works It Out's picture-building and home-gallery loop. Built in Godot 4.7.2 Compatibility with a single-thread WebGL2 HTML5 export. No commercial art, music, code or branding is included. This is a twelve-picture interpretation, not the complete commercial game.

## Play

Tap two pieces to swap, or drag one onto another. A correctly positioned piece settles with a pale dot and stays put. Every starting arrangement is a valid permutation, with no pre-settled pieces; correct-piece locking cannot make it unsolvable.

Hold **Peek** for the whole picture. **A little nudge** places the first unsettled piece correctly. Both are free; there is no timer, life system or paid resource. Keyboard users can tab through the transparent labelled piece buttons and use Enter/Space. The Peek button supports holding Space/Enter.

Twelve distinct, original 240×240 code-authored pixel pictures: coffee shop, greenhouse, lighthouse, midnight bookstore, bakery, evening train, rooftop garden, honey cottage, moonlit pier, mushroom house, Provence afternoon and observatory. The first three use 3×3 pieces, the next five 4×4, the last four 5×5. Completing a picture unlocks the next one. Finished pictures can be replayed in a new shuffle.

Each run awards one star for finishing, one without nudges, one within that picture's piece count in swaps. Peeking never reduces the score. The best record is retained per picture; maximum 36 stars. Replaying does not accumulate duplicate stars. Stars unlock Sage / Rose / Sky room colours at 6 / 15 / 24, plus a plant at 6 and a cat at 15. Colours are unlocked, not purchased.

**My gallery** shows completed pictures in twelve fixed frames; tap a finished picture to inspect or download its native-resolution PNG. Change the wall colour or warm lighting. Picture positions are fixed; there is no free furniture-placement editor.

## Save and browser support

Current picture, exact tile permutation, swaps, nudges, best records, wall colour, lighting and mute save after puzzle edits and setting changes in localStorage, with a native Godot save fallback. Only the current unfinished picture is retained. Choosing another picture starts it in a fresh shuffle. Clearing browser data removes the save; blocked storage still permits session play. Menus and hidden tabs pause effects and cancel active drags.

HTML5 requires WebGL2 and HTTP(S), not file://. First load includes the Godot WebAssembly runtime (approximately 40 MB before transfer compression). No CDN, network fonts or remote image assets. All twelve illustrations render once on startup into cached 240×240 textures. Main rendering is capped at 40 FPS and effects at 140 particles. Layouts support narrow portrait, landscape with side controls, and desktop. Browser viewport checks are not certification on every physical handset.

## Rebuild

Open `godot-source/project.godot` in Godot 4.7.2 with matching Web export templates. Export the Web preset. Insert `ui.html` before the fresh exported HTML's closing body tag and copy `ui.css` / `ui.js` beside it. Always start from a fresh export to avoid duplicated UI. The ZIP includes the playable web root and editable Godot source; build caches are excluded.
