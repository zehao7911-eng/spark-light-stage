# Moss & Marbles

A compact pixel-art roguelike pachinko adventure inspired by Peglin's combat structure. All sprites, scenery, UI, audio and game code in this package are original procedural work. No commercial game assets or external services are included.

## Play

Open index.html directly, or serve this folder with any static web server. The packaged index.html contains its CSS, artwork code and game code and requires no network connection.

Drag on the peg board to aim and release to cast. Tap an enemy to choose the target. Select an unused orb in the bottom tray; discard once per battle. Critical pegs increase the entire shot's damage, refresh pegs rebuild the board, and bombs damage every enemy. The aim preview ends at the first collision.

Win battles to pick an orb, upgrade, relic or healing. Choose battles, campfires or treasure rooms between encounters. Each five-room act ends with a boss. Three different environments repeat with increasing enemy health for endless acts. The seven-orb deck cycles automatically. At seven orbs, a new orb replaces the selected one while retaining its level.

Stone deals steady damage. Dagger excels at critical hits. Ember hits every enemy. Frost delays enemies for two turns. Bloom heals from peg hits. Spark chains nearby pegs after every four hits.

Tap pause for relic information, resume or restart. Sound and shot speed can be toggled. Progress saves after a resolved turn, reward or route selection; an interrupted cast resumes from the last saved turn. Best progress and sound settings are stored locally. Browser privacy modes or clearing site data can remove saves.

## Compatibility

Canvas 2D and Web Audio, no libraries, external fonts, downloads or CDN. Portrait and landscape layouts, Pointer Events touch input, capped device pixel ratio, cached pixel sprites, 120 Hz fixed physics and 30 fps rendering. Audio starts only after user interaction. Optional vibration depends on browser support.

Validated in headless Edge with mobile viewport emulation and actual touch events at 390x844, 360x640 and 844x390, plus desktop 1280x900. Full battle-route-reward runs cleared all three bosses. Offline and published versions are checked separately. Physical iOS/Android hardware has not been tested.

## Source

index.html is the self-contained distribution. style.css, art.js and game.js are editable source files; to use them separately, replace the inlined CSS/scripts in index.html with relative links. Artwork is rasterized at startup by art.js and cached. Sound is synthesized with Web Audio. No build step is required.
