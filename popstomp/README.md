# POPSTOMP — A Soda Revue

An original English, touch-first HTML5 game about stomping fruit into small-batch soda. Twelve finite authored acts, a bottle cabinet, best-only stars and three real tool unlocks. No timer, payment, account, advertisement or network dependency during play.

## Play

Tap a bunch in the wooden barrel and release to drop a giant cartoon shoe. Every fruit touched by its footprint pops; nearby gold bubble fruit triggers delayed radial chain bursts. Ice needs two damage. Juice travels to the bottle. Clear every fruit before running out of stomps.

- Two bottles unlock a **big stomp**: hold for at least 0.36 seconds, then release. It costs two stomps, has a wider footprint and deals two damage.
- Five bottles unlock **sweep**: tap the green tool button to switch, then tap a row in the barrel. Two stomps clear a horizontal strip and crack through ice. Switch back for individual clusters.
- Eight bottles unlock **fizz return**: every twelve popped fruit returns one stomp in that act.
- Bonus stars reward clearing within the displayed result's par, and never making an empty stomp. A completion always earns one star. The result gives the exact criteria.
- If the budget runs out, **Encore +4** is a free continuation of the current batch. Encore clears award one completion star. Fresh retries are free and can earn three stars.
- Earned bottles can be viewed from the header cabinet, with act replay. Lemon and Velvet host costumes unlock at 8 and 20 stars. There are twelve individual labels and three theatre palettes, not infinitely distinct content.

Mouse or touch: press on the barrel, drag to adjust the footprint, release. Cancelled or interrupted input does not stomp. Keyboard: arrows move the footprint, Space presses/releases it, X changes an unlocked tool, P pauses. Pause, sound and the act cabinet are in the header. The curved transfer pipe, juice flights and bottle fill provide direct progress feedback. The footprint collisions and delayed chain propagation are deterministic 2D game rules, not a rigid-body or fluid simulator.

Progress, current fruit damage, remaining stomps and pending chain events save locally under `popstomp-v1`. Reload waits at Continue. Pausing, hiding or blurring freezes the simulation, rendering and sound; input is released. Transient shoes, splashes and flight particles do not resume after reload. Storage restrictions can prevent saving without preventing play. Costume changes are visual only.

## Run and package

Open `index.html` or `standalone.html` directly, or upload this folder to any static HTTPS host. Editable source is `index-source.html`, `style.css`, `model.js`, `art.js`, `game.js`. The two playable HTML files inline all CSS and JavaScript. The optional local SVG favicon is the only separate page asset; no external CDN, font, downloaded image, model, music, library, analytics or server API is required. Canvas 2D and Web Audio are standard browser features. `python build.py` rebuilds the playable files, SHA256 manifest and deterministic `POPSTOMP.zip`.

Portrait and short landscape layouts use the same full playfield and 44 px or larger main controls. DPR is capped at 1.7; Gentle Motion uses 1.0 and removes impact camera shake. Browser frame rendering is limited to about 45 fps, simulation uses 60 Hz fixed steps, feedback particles are capped at 240. The pause stops animation rather than drawing redundant paused frames. Responsive browser testing is not physical phone hardware certification.

## Art direction and provenance

The user's art atlas [Rubber-hose animation](https://mygamesartstyle.jupiterthewarlock.com/styles/rubber-hose/) was inspected, including the enlarged first Cuphead scene. Broad visual rules: black ink outlines, elastic curved limbs, expressive pie-cut eyes, warm paper, muted painted background layers and sharper red/cream foreground actors. The soda-siphon host, cap hat, costumes, fruit, theatre, wooden tub, pipes, bottles, graphics, interface, animation, paper texture and all audio synthesis were authored for this game. No reference characters, logos, complete interface, bitmap, model or audio are redistributed. No image-generation tool was used. `STYLE.md` and `artbook.html` document the reusable art system.

Gameplay reference actually inspected and operated: [Rezona Grape Gate: Six Feet of Vintage](https://rezona.ai/game/pgcserver/pv/CnPPzgcT/v3/dist/index.html). Native movement and interaction reached the cellar, acquired the cup, and entered the grape-stomping timing bar at 0/8. A held timing attempt showed a failed/insufficient stomp; no reference completion or successful timing score is claimed. Public script was inspected read-only to understand its movement/interaction and stomping controls, and is not included in this package. POPSTOMP changes that adventure and timing minigame into directly targeted area stomps, ice cracking, chain fruit, act budgets, tool unlocks and a bottle collection. It is an independently authored game, not a source adaptation or exact commercial reproduction. Blep Cat's pet and yarn mini-game, BoneFang's title and Trash Talk's title were also examined during selection, then rejected for this production. None of their assets or code were reused.

The imported open-source-reference catalog and game-development, web, mobile, art, design and audio skills guided implementation and QA. The catalog is a list of links; consulting it does not make this code an adaptation of a complete upstream game. All shipped code and original generated-by-code visuals are covered by `LICENSE.txt`.

## Verification

`node test-model.cjs` simulates three entire campaigns through actual stomp input and delayed damage updates: normal, serialized mid-act restores, and repeat. It checks 36 act completions, best-only rewards, tool locks, genuine wide/sweep damage and costs, ice, queue restoration, no idle progress, miss/loss/Encore, malformed saves, refill and terminal input guards. `qa-model-report.json` contains the tested normal-input routes. This is mechanical validation; it is not a claim that automated tests establish fun, final artistic quality or a platform rating. Native browser input, screen layout and public delivery are checked separately.
