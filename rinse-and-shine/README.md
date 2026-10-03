# Rinse & Shine

A small 3D HTML5 cleaning game inspired by the direct surface-cleaning feedback of PowerWash Simulator. The models, courtyard, interface, textures and sound effects are created in the included source. No generated images or remote assets are required.

## Play
Drag across the object to spray water. Hold the turn button (or Shift on desktop) while dragging the scene to orbit. The + button changes the viewing distance. Switch between the 0°, 15° and 40° nozzles for different spray widths and pressure. Foam gives an eight-second cleaning boost and recharges automatically. The eye button highlights unfinished parts.

Clean each part until its last small dirt fragments snap away, with a sound, sparkle and vibration where supported. Finish the whole object to earn coins, then buy pressure, reach or foam upgrades and take the next order. Snack truck, tram and rocket jobs recur in six colour variations. Local progress and upgrade records survive reloads. There is no failure timer.

## Technical notes
True 3D raycast and UV-based dirt masks on independently washable faces; occluded surfaces are excluded from the cleaning target. Part and order progress are weighted by surface area. Dirt masks save locally. Per-part completion tolerance avoids hunting tiny remaining pixels. Water use affects the completion stars. Three local source files, bundled Three.js and its license, no CDNs. The distribution index.html embeds the engine and code for offline use.

Portrait and landscape touch controls, WebGL, pixel ratio capped at 1.5, cached static shadows, approximately 30 render frames per second and capped screen effects. Sound starts after a user gesture. Actual device support requires working WebGL; mobile verification uses emulated viewports and touch events.

## Validation
All three model types were washed to 100% via actual emulated touch events, including two-finger orbit, both sides and roof surfaces, foam, part snap completion, rewards, purchases, next orders and clean showroom views. Progress reload, pause, nozzle changes, zoom, hint and 360x640 / 390x844 / 844x390 / 1280x800 layouts were checked. The offline HTML completed the same three-order run without external dependencies.
