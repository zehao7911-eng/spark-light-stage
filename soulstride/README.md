# SOULSTRIDE

An original native Godot pixel runner incremental, inspired by Idle Slayer's jump / collect / grow loop. This compact browser game is not the commercial game and does not contain its art, characters, sounds or complete content catalogue.

## Play
Tap the road or hold JUMP (Space) to jump higher. Your sword automatically attacks nearby enemies. RUSH (B) briefly accelerates the road and strengthens the blade. Coins buy six equipment upgrades. Souls unlock double jumping, an automatically aimed bow, improved soul rewards and longer rushes. Four milestones grant one-time rewards. Cross portals through six visual realms, then ascend for permanent crystal multipliers while retaining soul skills. There is no game-over penalty for enemy contact.

Menus freeze the road. Sound and calm effects can be toggled in Travel kit. Local progress saves every four seconds and after purchases / lifecycle events. Away income is capped at four hours and earns gold only. Pausing disables away rewards. Export saves a JSON backup; import UI is not included in this version. Browser/site data deletion removes the local save.

## Hosting
Serve this directory over HTTP(S), including index.html, index.js, index.wasm, index.pck and export support files. Opening index.html directly with file:// is unsupported. GitHub Pages works without cross-origin isolation: Web threads are disabled. WebGL2 and WebAssembly are required. The initial Godot engine payload is about 38 MB uncompressed; slow connections can take time.

## Editable project
Open godot-source/project.godot using Godot 4.7.2. Install matching official Web export templates. Run the project normally, or export the Web preset to an empty output directory and run:

    python godot-source/tools/finish_web.py path/to/export/index.html

The wrapper adds loading progress, retry, safe area handling and visibility saves. All gameplay, UI and simulation run in GDScript. Tests:

    godot --headless --path godot-source --script qa.gd
    godot --headless --path godot-source --script qa_ui.gd --quit-after 180

Original pixel graphics are drawn in GDScript at low resolution and upscaled with nearest filtering. Audio is synthesized locally. VT323 font: SIL Open Font License (fonts/OFL.txt). Engine license notices accompany the Web build. Steam reference: https://store.steampowered.com/app/1353300/Idle_Slayer/
