# Spectrum Zero

A complete native Godot 4.7.2 incremental game for the browser, inspired by the concentric color cycles, layered resets and automation of **Revolution Idle**. This is an original compact interpretation, not the Steam game or its complete economy/content. The interface, icons, world graphics, buttons, dialogs, input, audio and simulation run inside Godot. HTML only supplies the loading screen, browser lifecycle notifications and a read-only test snapshot.

## Play

Each unlocked ring produces energy when it completes a lap. Buy its icon to improve speed and output; unlock the next color in order. Select ×1, ×10 or MAX purchase quantities; the double arrow buys affordable efficient upgrades. Each ring's lifetime laps within the run gently multiply overall production.

Tap the center for extra energy. Its amber cooling arc prevents unlimited rapid tapping. Completing laps charges **Resonance**; at 100%, tap the center for a 3× cycle-speed burst. The center icon changes when ready. Space also taps; M buys upgrades; Tab moves keyboard focus and Escape closes dialogs.

At 10K earned this run, **Refraction** restarts the cycles and awards prisms: `floor(sqrt(run_earned / 10,000))`. Each earned prism permanently adds 45% production power. Spend prisms on six lasting circuits: production, speed, burst duration, starting energy, autopilot and star power. Spent prisms retain their earned-power contribution.

At 10M earned, **Infinity** restarts cycles, consumes unspent prisms and awards cores: `floor((run_earned / 10,000,000)^0.35)`. Earned prism power and circuits remain, so the second layer improves the next beginning. Core power multiplies prism power. Four persistent generators use cores and feed a IV → III → II → I flux chain, amplifying production.

Stars grow from total revolutions across resets. Twelve once-only milestone claims grant energy. Three challenge chambers unlock after the first refraction: no tapping, slower laps, and no autopilot/burst. Entering or leaving a chamber restarts the current cycle run while keeping permanent growth. Each completed chamber grants a permanent ×1.25 production factor.

Ten rings each have 60 levels; resets allow further growth after a full board. The game includes pause, mute, calm motion, a statistics panel, JSON save export and a two-step fresh-game confirmation. Local saves preserve ring phases, active bursts, circuits, challenges and automation. Away production simulates up to two hours. No account, CDN or paid resources are needed.

## Controls and presentation

Desktop uses a spectrum column, central instrument dial and permanent-systems rail. Portrait uses a large dial, two rows of five icon cards and a bottom icon dock. Landscape has a separate split layout. This is not the Copper Meadow farm/tool-tray interface.

All game-facing text is English. Newly authored procedural icons, calibrated rings, arc trails, lap flashes, orbiting markers, spark particles, cooling/resonance indicators and reset waves share one navy/mint/rainbow palette. Seven short synthesized chimes are included. No commercial art, music, fonts or image-generation assets were copied into this game. Godot's engine/font licenses are covered by the included engine license information.

## Run / edit / rebuild

Open `godot-source/project.godot` in Godot 4.7.2 and run the project. The exact game and native UI also run in the editor; the browser is not required for the UI. `sim.gd` contains economy/save rules; `main.gd` composes the responsive native interface and dial; `card.gd` draws the reusable native icon controls. Audio WAV files and the SVG application icon are editable source assets.

For Web, install the matching official export templates and use the supplied **Web** preset (single threaded, Compatibility / WebGL 2). To re-export at the ZIP root:

```
godot --headless --path godot-source --editor --import --quit
godot --headless --path godot-source --export-release Web ../index.html
python godot-source/tools/finish_web.py index.html
```

The second command restores the custom loading/lifecycle shell from source; it does not implement game logic. Serve the ZIP root over HTTP/HTTPS. Double-clicking the HTML file cannot load Godot's WebAssembly export. WebGL 2 and browser storage permission are needed; first load includes approximately 39.5 MB of uncompressed engine runtime. Tested browser viewport sizes are not a physical-device compatibility guarantee.

## Verification and reference coverage

`godot --headless --path godot-source --script qa.gd --quit-after 1` exercises the actual GDScript economy. An automated purchase/reward strategy reaches its first three-prism refraction at 371.25 seconds and first infinity at 812 seconds. These are simulation results, not a full manual playthrough. It also checks both reset layers, exact JSON reload including an active burst, away-burst expiration, pause, malformed array saves, all challenge rules, the generator chain and one-time milestone claims.

This version follows the reference's visible concentric-cycle/upgrade/reset structure, with a redesigned icon-led mobile interface. It uses original formulas and shortened pacing. It does not reproduce Revolution Idle's full arbitrary-number model, 520+ achievements, all Infinity/Eternity/Unity content, macro language, daily rewards, leaderboard, cloud sync or in-app purchases.

`qa_ui.gd` separately tests the actual native command layer, chamber tapping/boost behavior, access to Infinity and autopilot from the phone menus, fresh-game feedback reset and narrow-screen paragraph wrapping. Local browser checks cover seven viewport sizes with no offscreen controls and minimum 44-pixel button dimensions. DPR 2/3 and notch insets were simulated locally; they are not physical-phone tests. A separate non-saving art fixture was used for advanced circuits and generators; it is excluded from the public build and ZIP. See `VALIDATION.md` for the browser checks.

Reference: https://store.steampowered.com/app/2763740/Revolution_Idle/
Popularity qualification: SteamDB records a historical concurrent peak of 20,515, not a claim of 10,000 currently online: https://steamdb.info/app/2763740/charts/
