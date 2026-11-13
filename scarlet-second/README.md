# SCARLET SECOND

A one-finger time-control return-shot game in an original ink-drawn theatre. HTML5 / Canvas 2D. All interface text is English. No install, external libraries, external fonts, network assets, accounts, payments, or image generation.

## Play

Open `index.html` or `standalone.html`. Both bundle the CSS, model, drawing code and controller. An optional adjacent SVG provides the browser icon. Serve the folder over ordinary HTTP/HTTPS for browser hosting.

1. Tap a red shot to turn it gold and return it to its sender.
2. Drag empty floor to move the masked courier and advance enemy time.
3. Lift your finger to freeze enemies and red shots. Gold returns keep flying.

Stone columns block movement and incoming shots. Armour requires two hits. Gold bells splash enemies within their radius. The King needs five hits. No countdown or consumable lives. Restart is free.

## Included content

- Twelve authored rooms in three theatre palettes. The last nine rooms have a second authored enemy entrance, for 21 encounter sets.
- Duelist, fan shooter, armoured guard, lancer, and final clockless king.
- After room 3: choose Silk Thread (larger catch target), Bell Echo (impact splash), or Twin Return (every second return adds a second target-seeking shot). Rechoose in the book.
- After room 7: a once-per-room Sweep that returns every currently visible red shot.
- Best-only stars. Copper costume at 6 stars; Dusk at 18. Twelve-room replay book.
- In-room save/resume, pause, sound toggle, gentle-effects mode, user-gesture synthesized audio. Local saves may be unavailable in restricted/private file browsers; play remains available.
- Portrait and landscape layouts, pointer capture, 46 CSS-pixel minimum ordinary controls, no required keyboard/mouse hover.

## Quality checks

`node qa-model.cjs` runs ordinary public model-controller routes for every room and gift, including freeze/return semantics, armour, bells, win locks, failure/retry, sweep and save continuation. Browser/native-input and responsive verification are recorded separately in the delivery artifacts. Emulated viewport checks are not a physical-phone hardware test.

`python build.py` rebuilds self-contained pages, the SHA-256 manifest and deterministic root-folder ZIP. The package contains readable model, renderer, controller, style, QA and art direction sources. No build server required to play.

## References and authorship

The public Rezona HOTFRAME page at `https://rezona.ai/game/pgcserver/pv/IPmpyNkr/v10/dist/index.html` describes “time moves only when you move.” Its public description informed the time-control direction. The page did not render reliably during research; no completed reference playthrough is claimed. This game uses a different original stage, characters, return-shot interaction, progression and UI. No HOTFRAME code, assets or audio are bundled.

Art direction: the user's atlas category `https://mygamesartstyle.jupiterthewarlock.com/styles/dark-ink/` and its enlarged Darkest Dungeon example, examined for solid black shaping, angular ink contours and limited warm accents. No reference image, character, logo or interface is copied or redistributed. All shipped art is drawn by original code.

Original code and art: MIT license. See LICENSE.txt.
