# Thorn & Flock
A compact Godot 4.7.2 action-and-camp game inspired by Cult of the Lamb's illustrated characters, dark woodland and rescue/build/return loop. Original newly drawn assets and a smaller scope; not the full commercial game.

## Play
English UI. Move with the left touch pad or WASD/arrows. Hold SLASH/Space to combo, ROLL/Shift to evade, CURSE/E to cast. Enemy circles mark impending attacks. Rolling grants a short invulnerability window.
Camp: tap the building to chop wood, harvest berries, cook, build tents, strengthen the crown or temper the blade. ACT/E interacts with a nearby building. GO starts a crusade.
Each crusade has three rescue rooms and a warden. Choose one of three blessings after each rescue. Nine blessing types, three enemy types and three visually distinct warden variants. Further crusades continue with increasing enemy health and difficulty.

## Progression
Followers stay when a crusade ends. A defeat saves half the run's wood and coins; victory saves all. Rescued friends join the camp and generate devotion. Tents increase devotion capacity. Berries grow while in camp; cooking grants +1 damage for the next crusade. Coins buy permanent blade upgrades; devotion upgrades the crown. Camps have up to four tents, crown level eight and blade level five.
Building taps act directly. Interaction via ACT requires approaching. Resources save on camp actions, every ten seconds and on application focus loss. Title Resume restarts the most recently entered room using its checkpoint. Temporary in-room damage and pending blessing choices are not checkpointed.

## Local Godot
Open godot/project.godot with Godot 4.7.2 and press F6/F5. Main.tscn contains editable Sprite2D scenery in EditorPreview; the preview is replaced by the live scene when running. Game.gd handles scene, camp and progression; Actor.gd is a CharacterBody2D combat actor. Separate PNG illustrations, fonts and generated audio are included.
Web export uses Compatibility, single thread, local files. Matching official Godot Web export templates are required.

## Web
Serve web/ through HTTP/HTTPS. Example: python -m http.server 8000 --directory web
WebGL2 and WebAssembly required. Initial download contains approximately 40 MB of uncompressed Godot WASM. Native saves use user://; web additionally uses synchronous localStorage backup. Browser storage must be allowed. All assets load locally without CDN dependencies.

## Validation
Normal-stat scripted combat agent completed three crusades, rescued nine friends and defeated all three wardens in 719 simulation steps. Fixtures checked farming, cooking, tent building, devotion, armory, roll invulnerability, one-time loot banking, curse cost and room checkpoints. Browser tests used real pointer/touch simulation for camp cooking, immediate reload persistence, crusade entry, simultaneous movement/held slash and roll. Layouts inspected at 390x844, 360x740, 844x390 and 1280x800. Physical phone performance has not been certified.

## Credits
All character and scenery assets are newly drawn for this project. Ambient music and effects are generated locally. Cinzel by Natanael Gama and VT323 by Peter Hull are included under their bundled SIL OFL licenses. Godot license included in web/.
Reference: https://store.steampowered.com/app/1313140/Cult_of_the_Lamb/
