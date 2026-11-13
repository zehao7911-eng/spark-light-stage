# Once Upon

An original, illustrated HTML5 story puzzle. Arrange six fairy-tale characters in four comic panels. Gifts and transformations carry forward, so changing an early frame changes the ending.

## Play

Open `index.html` in a modern browser, or serve this folder with any static web server. No build, CDN, account, external assets or network connection is required after download. GitHub Pages supports this folder directly.

Tap a cast member, then a role in a panel. Dragging also works. Repeat a character in later frames to continue their story. Press **Read** to perform the four scenes. The chapter title is your goal. **?** highlights one possible placement; the story guide explains each location. Undo and remove let you experiment without a failure timer.

Keyboard: Tab/Enter to activate roles and buttons; 1–6 selects a character; Z undoes; H shows a clue; Escape pauses or closes a dialog.

## Inside the book

- Twelve authored chapters, six characters and six detailed locations.
- Causal flowers, keys, cakes, love, frog curses, cures, ghost revival, crowns and performances.
- Up to three stars per chapter: reach the ending, use no clues, and make all four frames react.
- A reaction collection, chapter replay, three unlockable ink colors and PNG page export.
- Optional synthesized sound, pause, validated local saves and a session-only fallback if storage is unavailable.
- Responsive two-by-two portrait or four-across landscape panels, safe-area padding, bounded effects and device pixel ratio capped at 1.5.

## Technical

Dependency-free Canvas 2D, DOM controls and Web Audio. Simulation runs at a fixed 60 Hz with rendering capped at 40 FPS. Hidden/blurred tabs and dialogs stop the simulation. Sound requires a user gesture. Desktop viewport emulation does not certify every physical phone or third-party embedded webview.

## Credits

Design reference: Storyteller by Daniel Benmergui, published by Annapurna Interactive. Once Upon uses independently written code, original Canvas illustrations, characters and stories; it does not include the reference game's art, audio or other assets.
