# Pocket Oddities

Six original tactile toy worlds, inspired by the playful monster-head machinery, saturated toy colours and reactive interactions of [GNOG](https://store.steampowered.com/app/290510/GNOG/). This is a smaller original Canvas interpretation, not the commercial game or its artwork, music or levels.

## Play

Release both side clasps. Then tinker with the little world:

- **Sprout:** tap or drag the three dials to match the seed plaques; pull the rain handle three times.
- **Crumb:** drag ingredients into the bowl in the strip's order, then turn the oven crank three times. Tapping an ingredient then the bowl also works.
- **Bubbles:** rotate four pipe elbows to carry water from the left inlet to the right spout; pump three times.
- **Stella:** slide three star handles onto their outlined positions; tap the telescope.
- **Bloop:** follow two symbol phrases on four musical pads. The play button lets you hear each phrase again; symbols stay visible.
- **Milo:** each switch toggles its window and adjacent windows. Light all four, then ring the station bell.

No timer, lives, ads or accounts. The clue button highlights one useful next interaction without doing it for you. First awakenings grant a collectible toy and five little gears, plus one to three skill stars. Better replay grades grant only the difference: repeat completions cannot farm rewards. Buy two workshop colour schemes for 16 and 24 gears. Completing all six at three stars yields 48 gears. After all six toys, Remix Day varies seed plaques, recipe order, star placements, melodies and window states in the same six authored toys; pipe topology stays fixed. It does not add infinitely many unique worlds.

The collection, current toy mechanisms, elapsed animation time, rewards and mute preference save locally. Reload opens a Continue screen. Pause and background tabs freeze the world and silence audio. Play with it keeps an awakened toy on screen. A confirmed replay resets only that toy, preserving collections and upgrades.

## Controls

Touch / mouse: tap clasps, knobs, pads, switches and handles; drag food or sliders. Dial drags also rotate the mechanism. Keyboard: Enter to start; arrow keys select a mechanism; Enter / Space operate it (a selected slider cycles notches, ingredient keys place food); H shows a clue, Escape pauses. Audio starts only after interaction. Phone portrait and landscape layouts, 44 px minimum button targets, expanded world hit areas and display safe insets are supported. Physical phone testing was not available during production.

## Hosting and offline use

Open the root `index.html`. The packaged index is self-contained, including original code, Canvas artwork and synthesized audio. No WebGL, dependencies, CDN, external fonts or generated images are required. The additional source files are included for editing. Upload the extracted root to HTML5 hosting, or use GitHub Pages. Gameplay needs no network once the page is loaded. No service worker is installed.

Canvas DPR capped at 1.5, draw cadence 30 FPS, bounded visual particles, audio nodes disposed after sound completion, no rendering during stable pause screens. Original vector-like shaded plastic casts, screws, hinges, etched patterns, rooms, articulated eyes, creatures and theme-specific completion animations are drawn in code. Official reference screenshots were viewed only and are not included.
