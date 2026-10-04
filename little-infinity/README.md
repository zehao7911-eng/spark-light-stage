# LITTLE INFINITY

A compact HTML5 recursive-box puzzle inspired by Patrick's Parabox. Twelve original authored puzzles, four room colors, nested world previews and camera transitions, transferable boxes and worlds, unlimited undo, hints, local progress and a mirrored Echo journey after the final puzzle.

## How to play

Move with arrow keys / WASD, the on-screen pad, directional taps or swipes. Push gold boxes and room boxes onto plain square outlines. Put the magenta character on the outline with two eyes. All marked squares, including ones inside rooms, must be filled together.

A room box normally moves when pushed. If it cannot move, the character or another box can enter its interior through an open edge. Crossing an interior edge exits beside its containing box. Boxes and nested room boxes can cross room boundaries. A room cannot be placed inside itself or a descendant.

The square overview button zooms out to the outer world; moving again follows the character. Z undoes, R restarts, Space toggles overview. The question mark computes one suggested direction in a background worker. Unsalvageable arrangements may require Undo or Restart. No timer or loss penalty.

## Progress and replay

Completed worlds unlock the next one and store best moves and earned stars locally, when storage is permitted. The menu reopens unlocked worlds. Complete world twelve to unlock Echo, which mirrors every room in each puzzle. Echo has its own records; it is a mirrored replay mode, not twelve additional original layouts.

## Hosting and offline use

The packaged index.html embeds style.css, model.js and game.js. Open it directly to play offline, or upload it to a static HTML5 host such as GitHub Pages. Separate files are editable source copies. There are no external images, fonts, audio files, runtimes or CDN requests. Mobile supports portrait and landscape, touch controls and a maximum pixel ratio of 2. Sound is synthesized after interaction. Hint search runs in a Blob worker to keep the interface responsive; a restrictive host CSP must permit blob: workers for hints.

## Art and scope

Official Patrick's Parabox imagery informed the saturated blue/emerald/violet/amber chambers, dark recessed floors, bevel highlights, gold boxes, magenta two-eyed character and miniature nested rooms. This is a small independent browser interpretation with newly authored maps and code; it does not contain the commercial game's assets, soundtrack, 350-level campaign, self-containing infinity systems or every advanced absorption mechanic. Nesting in this edition is finite, up to three inner rooms. Artwork is drawn with Canvas 2D and feedback audio uses Web Audio.
