# Tidy Tails

An original HTML5 organizing puzzle with illustrated household objects, a companion cat called Miso, material-inspired sound effects, and four related puzzle families.

## Play

- Books: drag along the shelf to arrange heights, ascending or descending. Neighbours slide out of the way.
- Jars: arrange numbered pantry labels in either direction.
- Drawers: turn and pack every rectangular object inside the wooden tray without overlap. No prescribed placement is required; any valid full arrangement works.
- Plates: match the colour and central motif, nesting larger plates under smaller ones. Only the top plate of a stack can be lifted. Move it back to the table if you need to make room.

Drag with a mouse or finger. Tap-to-select and tap-to-place also work. The turn button rotates a selected drawer object; R, Z, H and Escape turn, undo, hint and clear the selection. Touch controls execute on release with duplicate-click protection, so a suppressed compatibility click after a drag cannot block the next button.

Free hints reveal a suggestion, rather than solving the scene automatically. When an existing drawer arrangement cannot be extended, the hint suggests a different placement from a complete solution. You can move objects out and try again. No timer, life limit, purchase, or losing state is used. There are twelve curated ritual positions that introduce each family, then fresh permutations continue. Earn stars, keep twelve scene photographs, and exchange earned stars for Miso's ribbon colours. Tap Miso for a little reaction.

## Run

Upload these files together to a static host, such as GitHub Pages, or serve the folder with any local HTTP server. No build tools, external fonts, CDN, framework, model, or other network asset is required. index.html is at the ZIP root. Art is original Canvas vector artwork with cached object sprites and local paper grain. Sound is synthesized locally and starts after a user gesture.

## Mobile and saves

Responsive portrait and landscape scenes reposition the objects and trays rather than shrinking a portrait screen into landscape. Touch uses Pointer Events, capture and cancellation. Simulation uses fixed steps; narrow screens render at 30 FPS, DPR is capped at 2, and hidden tabs pause. Saves preserve actual arrangements, purchases and rewards. Interrupted drags leave the last committed arrangement intact. If local storage is unavailable the game still runs, with saving disabled. No telemetry or account is used.

## Reference

The main design reference is A Little to the Left by Max Inferno: https://store.steampowered.com/app/1629520/A_Little_to_the_Left/

The reference informs the single-screen organizing format, direct manipulation, alternative sorting solutions, hand-illustrated household subject matter, restrained interface, and tactile completion feedback. Tidy Tails has original code, illustrations, cat design, object layouts and puzzle configurations. It contains no assets from the reference game.
