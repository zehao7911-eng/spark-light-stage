# PAW PARADE

A portrait-first HTML5 cat dance club and 12-level lineup puzzle. All libraries and textures are bundled. Open `index.html` or upload this folder to static hosting. No server, account, CDN, payment or analytics is required.

## The cats

The silver cat's facial appearance and front coat texture are derived from the single-cat view at 0.5 seconds in the user-provided reference video `ca2e7a87b2822fa944a64f6869ce79c2.mp4`. `cat-reference.png` is the authoring crop; `cat-albedo.webp` is the cleaned projection texture. The back/side fur texture is locally authored. These are not represented as a wholly original cat photograph or as an extracted original 3D model.

The actual 3D geometry is locally authored: pear-shaped lathed torso, volumetric head, separate triangular ears, upper arms and wrist/paw pivots, two stepping feet, curved tail, collar and bell. Front-facing regions use the supplied cat appearance; sides and back use the shared fur. The body has real thickness and can be viewed from other angles, although the single photographic front reference limits side and rear fidelity. There is no simulated strand fur, imported commercial model, Tripo generation or motion-capture file.

Dance animation is newly authored, with alternating forward paw swings, wrist motion, hip roll, head counter-motion, body bounce/compression, toe lifts and delayed tail sway. Sync, Wave and Shuffle change phase and movement. This aims to match the reference's recognizable silhouette and dance feeling; it is not a claim of identical source topology or frame-perfect choreography.

## Play

The top row shows the required color/shape at each numbered seat. Tap two cats, or their large numbered buttons, to swap them. Cats move to their new positions. Circle, triangle and diamond icons accompany the three colors. Complete all matches for a celebration and the next lineup. There are 12 finite lineups of 4–12 cats, not an endless campaign.

One star is awarded for completion, another for at most optimal swaps + 2, and another for using no hint. Only the best result counts per lineup. Undo counts as an action. Hints highlight a legal next pair without making the move. Keyboard 1–9 selects the first nine seats; H hints, Z undoes, Escape pauses. Seats 10–12 use the touch/mouse buttons.

FREE RAVE provides 1–24 cats. Open Stage Mix to change Arc / Grid / Heart / Circle / Wave formations, dance, palette, brightness, tempo, light beams and disco tiles. Drag the stage to orbit; mouse wheel zooms; RESET VIEW restores the camera. Enable music with the top music button. The original synthesized disco loop is not audio copied from the reference videos.

## Mobile and save

Both portrait and landscape are supported; numbered selection buttons remain at least 44 pixels, including the final 12-cat lineup at 320px width. Cat meshes share geometry and are rendered with instancing. The renderer caps DPR at 1.5 and targets 40 FPS; it does not guarantee that rate on every phone. Physical-handset testing has not been performed.

The browser stores the lineup, logical arrangement, swap count, hints, best stars, music setting, free-rave mode/count and stage settings. Reloading an unfinished lineup resumes paused and clears the transient selection; cosmetic swap motion settles to the saved logical positions. Blocked storage leaves the current session usable. Pause, blur and hidden-tab events stop dancing and audio. A graphics-context loss displays Retry. Texture failure has a visible error/retry panel rather than an endless loading screen.

Texture data is embedded in `assets/textures.js` so local-file WebGL does not depend on permissive file-access flags. Separate WebP files and the crop are included as source assets. Model and scene source are in `model.js` / `scene.js`.

Three.js r147 is MIT licensed; see THREE-LICENSE.txt. Rights to the supplied reference imagery remain with their respective owners; the code/library license does not grant additional rights to that imagery.
