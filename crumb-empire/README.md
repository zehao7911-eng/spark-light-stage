# Crumb Empire

A native Godot 4.7.2 browser incremental inspired by **Cookie Clicker**. The large textured cookie, blue wallpaper, timber dividers, milk, orbiting cursors, icon upgrades, building shop and visible production rows follow its visual hierarchy. All illustrations, pixel icons, cookie texture, sound effects and code here are newly authored. Bitter is an OFL-licensed Google Fonts typeface; its license is included. This is an independent compact interpretation, not the commercial game or an exact port of its assets and complete content.

## Play

Tap the cookie or press Space to bake. Buy production buildings; each purchase raises the next price by 15%, rounded up. Buy quantities are 1, 10, 100 and MAX (a maximum batch of 100). The bank icon switches Buy / Sell; selling refunds 25% of the corresponding building price without increasing cookies baked. The cursor and grandma can also be purchased from the portrait home screen.

Twelve buildings have distinct pixel icons and animated production vignettes. Three upgrade tiers per building unlock at 1 / 10 / 25 owned and double that building's output. Five handmade upgrades double tapping, and four butter upgrades improve all production by 25%. The 45 upgrades appear as small scrollable icons, with desktop tooltips. The bank and production remain visible when using the phone store.

Golden cookies first appear after 22 active seconds, then every 38–65 seconds. They remain for 13 seconds. Catch one for a lucky payout, 30 seconds of ×7 production/tapping, or 9 seconds of ×777 tapping. These shorter timings are deliberate original pacing, not the reference's timings. The current buff is visible and changes actual earnings.

A Farm opens a 3×3 garden from its Bakery row: plant for 10 cookies, grow for 30 seconds, then harvest a payout and 45 seconds of ×1.5 production. A Wizard opens the grimoire; 100 magic conjures a golden cookie. Magic refills at two per active second. Neither activity is a complete reproduction of Cookie Clicker's larger minigames.

At 1M cookies baked in the current run, Ascension awards `floor(sqrt(run / 1M))` heavenly chips and resets ordinary buildings/upgrades. Achievements remain. Each earned chip permanently adds 15% production, including spent chips. Three heavenly upgrades (up to five levels) add production, starting funds and tapping based on production. Thirty-two persistent achievements increase the milk production bonus by 2% each. Their effects and claims are automatic.

Pause, mute, calm motion, statistics, JSON export/import and confirmed fresh game are available from the desk icon. Saves are local to this browser; clearing site data loses them. Import explicitly replaces the current bakery. Offline production grants 50% of unbuffed production for at most four hours; buffs and crops advance with time. Paused saves earn no offline income. No accounts, payments or network-dependent gameplay.

## Godot source and Web build

The ZIP root is the playable Web export; `godot-source/` contains the editable native project. Open `project.godot` in Godot 4.7.2 to play/edit the same game and interface. `sim.gd` contains the economy; `art.gd` draws original cookie/building assets; `tile.gd` supplies native icon controls; `main.gd` composes the responsive UI, audio and browser saves. HTML only loads the engine and forwards lifecycle events. There is no JavaScript game simulation or DOM game UI.

Install the matching official Web export templates, then:

```
godot --headless --path godot-source --editor --import --quit
godot --headless --path godot-source --export-release Web ../index.html
python godot-source/tools/finish_web.py index.html
```

Serve the ZIP root over HTTP/HTTPS. Double-clicking HTML cannot load the WebAssembly export. This uses Compatibility / WebGL 2 and single threading, so GitHub Pages needs no special cross-origin isolation headers. First load includes about 39.5 MB of uncompressed Godot engine; ZIP compression reduces the package substantially. Browser size tests do not certify every physical phone.

## Scope and validation

The Steam reference has hundreds of upgrades/achievements, many more buildings, late-game systems, dragon, several extensive minigames, music, mod support and cloud saves. Those are not all implemented here. There are 12 building types, 45 ordinary upgrades, 32 achievements, two small minigames, one ascension layer and three heavenly upgrade tracks. The original feedback and art are closely inspired, not identical commercial assets.

`qa.gd` verifies real GDScript purchase prices and quantities, all three golden rewards, upgrades, garden, spell, persistent achievements through ascension, spent-chip power, sell accounting, JSON state, pause, bounded away production and a 30-minute progression strategy. `qa_ui.gd` exercises the native command path for the garden, wizard, ascension, pause and a narrow wrapped help modal. Browser interaction and viewport checks are recorded in VALIDATION.md. A separate non-saving late-game fixture is excluded from the public files and ZIP.

Reference: https://store.steampowered.com/app/1454400/Cookie_Clicker/
Font: https://github.com/google/fonts/tree/main/ofl/bitter
