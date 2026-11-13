# SHELLSONG

A little tide. A little treasure. An original solitaire pearl-sowing puzzle for mobile and desktop browsers.

## The first five seconds

The only occupied shell glows. Tap it: a pearl hops into the central glass jar, a glass note rings, the jar closes, and a Coral Star joins the Tidebook. No title gate, account, written tutorial, timer or advertising interrupts the opening.

## One rule, twelve tides

Tap a shell containing pearls. All its pearls are lifted and distributed, one per subsequent slot. The route is shell **1 → 2 → 3 → 4 → 5 → 6 → HOME → 1**. Pearls that land in HOME stay there. Empty all six shells to finish. The dotted arrows, live pearls and numerical counts show the same state.

There is no opponent, capture rule, random outcome, extra-turn rule, paid currency or failure penalty. An empty shell costs nothing. Hold to preview the distribution; release over a shell to commit, or slide off the shells to cancel. Input is locked during a pour to prevent accidental double moves.

Twelve fixed boards progress from one turn to fourteen optimal turns, across Pearlshore Pavilion, Coral Quay and Moonwater Grotto. These are finite hand-selected boards verified by a shortest-path solver, not an endless-level claim. All 12 distinct illustrated keepsakes can be inspected in the Tidebook. Best results unlock sea-glass and lavender jar ribbons at 9 and 24 stars. Replaying cannot farm stars or duplicate keepsakes.

Stars: one for finishing; another without Guide; a third without Guide and within par + 2 turns. Guide searches the **current** configuration in a worker. Undo is free; using Undo after Guide does not erase assisted scoring. Up to 100 prior turns are stored. Restart affects the selected tide only. Switching tides preserves each in-progress board.

## Controls and comfort

- Touch / mouse: tap shells; hold to preview, slide away to cancel.
- Keyboard: 1–6 selects a shell; arrows move focus and Enter activates it; U undoes; H guides; Escape pauses.
- Every shell has a live English accessible name. Dialogs contain focus. Controls remain at least 44 CSS pixels at the tested sizes.
- Sound and optional haptics begin after interaction. Gentle mode honors the system reduced-motion preference on first visit, removes sparkles, softens arcs, reduces pixel density and renders at 30 Hz.
- Each board, pending animation, undo history, assisted flag, best results and settings save locally. Refresh opens paused; tab hiding or focus loss pauses and silences sound. Saves stay on the current browser/device. Clearing browser data removes them. If storage is unavailable, play continues with a visible notice.

## Run / host

Serve this directory with any static HTTP server, for example `python -m http.server 8080`, and open `http://localhost:8080`. Upload its contents to a static host or a subdirectory on GitHub Pages. ZIP entry `index.html` is at the archive root. Paths are relative. There is no build-time dependency, CDN, font download, WebGL, service worker, backend or account requirement. Direct `file://` behavior varies by browser; HTTP(S) is the supported route. The worker has a local model fallback if worker construction is unavailable.

To validate the shipped source, run `node tests.cjs`. To reproduce the game-only ZIP, run `python build.py`; it writes `SHELLSONG.zip` next to this directory. The archive includes the source, generated delivery art, prompts, license and QA notes. It excludes browser test saves, oversized original PNGs and temporary tools.

## Visual and audio production

Seven original assets were made with the built-in image_gen tool: three actual play backgrounds, a four-object transparent prop atlas, a twelve-object keepsake atlas, cover and icon. Exact prompts are in `ART-PROMPTS.json`. `assets/art-manifest.json` records dimensions, crop bounds and byte sizes. Atlases use measured transparent gutters; the jellyfish's full tentacles and the bottle's full stopper have independent non-overlapping crops. WebP delivery uses high-quality encoding; background and icon resizing uses nearest-neighbor sampling. Unchanged source PNGs are retained separately in the author's workspace.

Every shell, pearl, route, airborne pearl, jar fill and ribbon is interactive runtime art over the illustrated setting. The cover is marketing art and is not passed off as a screenshot. Small environment glints, ripples, pitch-stepped sine plucks, jar harmonics and completion chords are generated in code. No third-party recording is used. Art load failure leaves functional fallback shapes and all rules available; there is no blocking loading screen.

The deterministic model advances at 60 Hz; normal rendering is capped at 40 Hz and 1.5× density, with 100 effects / 16 sound voices maximum. Hidden tabs stop simulation and rendering. The board keeps its aspect ratio in portrait and landscape.

## Reference and originality

The public [Hasbro Mancala instruction sheet](https://www.hasbro.com/common/instruct/BE3C134F-D56F-E112-4024DF451E0337E2.pdf) was consulted for the general sowing interaction. SHELLSONG is an original six-shell, one-store solitaire variation. It does not reproduce the two-player rules, branding, assets or proprietary code. Prior project catalog checks found no earlier Mancala/sowing game. This game does not claim to be a full adaptation of a commercial product or a current Rezona title.

See `QA.md` for tested scope and limitations. Code is MIT licensed; see `LICENSE.txt`.
