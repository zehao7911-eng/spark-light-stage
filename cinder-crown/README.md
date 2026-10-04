# Cinder Crown — Godot project

A compact chess-and-shotgun roguelite inspired by Shotgun King: The Final Checkmate. All pixel sprites and sounds are newly drawn/generated; this is a smaller reinterpretation, not the original game or its complete content.

## Open locally

Import project.godot in Godot 4.7.2 and press F6/F5. Main.tscn is the main scene and Game.gd implements the game. Art and audio remain editable, separate local files.

## Play

Tap an empty adjacent tile to move and reload one shell. Tap a white piece within range to fire a spread of pellets. Piece numbers count down until they act; ! indicates action after the next player action. Red tiles show attacks from currently ready enemies. Friendly pieces block sliding attacks. Pawns capture diagonally and promote at the back rank; knights jump. Defeat the white king to finish a floor.

Two safety seals block dangerous MOVES; firing is unprotected. A hit removes one heart, with at most one heart lost per enemy turn. Defeating a king restores one heart. Each floor grants a paired boon and enemy curse: 12 boon types and 5 burdens, with capped upgrades. Clear 10 floors to unlock endless continuation.

Crowns bank when the expedition ends or the ten-floor campaign is won. The title Forge spends crowns on up to three permanent starting pellets. Continuing into endless resets unbanked crowns so earlier earnings are not paid twice. Your turn, build, choices and progression save locally. Reloading a pending action resolves its enemy turn once. Sound begins after interaction.

## Web build

The web/ directory contains the real Godot Web export, using Compatibility rendering and single-threaded templates. No CDN or account is required. Serve this directory through HTTP/HTTPS; browsers cannot run the WASM export by double-clicking index.html. On GitHub Pages, open the game folder URL. Browser local storage must be allowed for persistent saves. WebGL 2 is required.

Godot export templates: official Godot 4.7.2 web_nothreads_release. The Web preset is supplied in the source project. Installing the matching templates permits re-exporting from Godot. The Godot engine license is included in the web build.

## Checks

A headless Godot test completed the ten-floor campaign in 109 normal-equipment actions and entered the endless reward flow. Separate checks exercised reload, line blockers, seals, defeat, one-time crown payout, king rewards, paired upgrades and saves. The real Web export was tested in Edge using touch simulation: 40 actions, three cleared floors and save/reload. Portrait 390×844 and 360×740, landscape 844×390, and desktop 1280×800 were inspected. These are browser simulations, not tests on physical phones.

Reference: https://store.steampowered.com/app/1972440/Shotgun_King_The_Final_Checkmate/
Godot: https://godotengine.org/
