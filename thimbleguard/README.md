# Thimbleguard · The Clockwork Garden

A complete compact HTML5 turn-based garden adventure. A little mouse knight explores a moonlit clockwork courtyard, outwits directional sentries and wakes a series of golden gates.

## Play

Open index.html directly or serve this folder over HTTP(S). No account, installation, WebGL, CDN or remote runtime requests are needed. Images, pixel font, source and licenses are local. There is no blocking loading screen; placeholder shapes remain interactive if art is still arriving.

Tap a neighbouring stone to step. Tap an adjacent sentry to strike with the needle; an attack consumes one turn and leaves the knight in place. Swipe in a cardinal direction, or use the four arrow buttons. Enemies act only after your valid action. Blocked wall/out-of-bounds actions do not advance turns. Tap the knight or press Guard to wait and block the next incoming hit that turn. At most one heart can be lost in one turn.

Rose-bordered stones show directional immediate threats from the current enemy facing. A beetle may rotate on its next turn, so these are not a prediction of every future path. Beetles turn before they step in a new direction. Moths move horizontally. Stone owls stay in place and strike adjacent stones. Seed pods stay in place; striking one triggers a cross-shaped explosion and neighboring seeds can chain. Stone walls block destruction. The returning blast can scratch the knight; Undo is free.

Defeat every non-pod sentry to wake the gate, then step onto it. The three crystals are optional. Winning earns one star, gathering all crystals earns another, and taking no damage earns a third. Retry is unlimited. Falling offers Undo or Retry rather than consuming lives.

Keyboard: arrows/WASD move, Space guards, X toggles Dash, L pulses, Z undoes, H hints, Escape opens/closes the journal. The interface is all English. Keyboard users can also Tab through labelled stones and buttons.

## Growth

- Twelve original authored6×6 gardens with three terrain palettes. They share one illustrated clockwork-garden backdrop; these are not twelve unique illustrated background paintings. Beyond twelve, the same layouts and names repeat as another tour while the collection grows. There is no claim of limitless unique maps.
- Garden4 unlocks **Dash**: spend one charge to travel two stones in a straight line in one turn. An occupied enemy stops the dash with an attack. Long Needle extends it to three. Two starting charges, up to five with Swift Ribbon.
- Garden7 unlocks **Pulse**: spend a lantern charge to strike adjacent stones in a cross before enemies act. One starting charge, up to three with Moth Lantern.
- Eight curiosities: Acorn Heart (up to3 extra hearts), Silver Shell (up to3 shields per garden), Swift Ribbon (up to3 extra dashes), Moth Lantern (up to2 extra pulses), Crystal Charm (up to+6 coins per crystal), Copper Clover (up to+6 coins per sentry), Long Needle and Dew Pendant (first crystal heals one heart). The three offered gifts are deterministic and exclude mastered tiers.
- Choose a free curiosity at every clear. Coins from this garden are unbanked until that choice. Kills award3 base coins; crystals5; clearing banks an additional15+garden index. Undo restores unbanked earnings and prevents kill-farming. Claiming the reward advances the garden once, including across reloads.
- Spend banked coins at **Little Forge** in the journal to strengthen Heart/Shield/Dash for the next garden. Costs60,120,180, capped at3 levels. Claimed forge purchases persist outside turn undo. Retry starts a fresh copy of the current garden with the upgraded starting stats and resets its unbanked rewards.

Hints run a bounded route search in an inline Blob Worker; the worker source is bundled locally. They return the next step of a surviving path, not necessarily a three-star optimum. Timeout/failure leaves Undo and Retry available. All twelve rooms have been solved in tests with base equipment.

## Saving and devices

Active map, facing, player, hearts, wards, charges, crystals, pending rewards, up to40 undo steps, claimed gifts, stars, coins and sound preference save under `thimbleguard-v1`. Storage can be denied without blocking play. No real-money purchases, ads or analytics. Sound starts off and only resumes after user interaction. Menus make the game underneath inert and stop rendering/audio; hidden tabs stop the animation loop and clear held input. The simulation is turn-based and does not advance during inactivity.

The board renders at384×384 with nearest-neighbour pixel scaling and a30fps idle rendering cap. Reduced motion disables bobbing and action particles. Six columns retain at least44CSS-pixel touch cells in tested320px portrait and844px compact landscape. Portrait has scrollable field notes below the controls; short landscape puts the board beside the controls. Browser viewport tests are not physical Android/iPhone certification.

## Source, license and rebuild

This game is GPL-2.0-only. It includes a selected port of Ending's real rule engine by Aaron Steed; full attribution, exact revision, scope, modifications and original source files are distributed. See `NOTICE.md` and `LICENSE`. All runtime source, original assets and build scripts needed to recreate this derivative are included. No Flash installation or original AS3 build is necessary.

With Node22+ and pnpm: `pnpm install --ignore-scripts`, `pnpm test`, `pnpm run build`. esbuild0.25.12 is the only build dependency. `game.js` is the playable bundle; `hint-worker.js` is also supplied, while its source is embedded into the main bundle for direct-file compatibility.

See `ART-SOURCE.md` for generated asset prompts and visual rules, `test-report.txt` for model tests, and `BROWSER-QA.md` for actual browser checks.
