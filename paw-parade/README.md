# PAW PARADE — transparent cat animation edition

This revision replaces the previous reconstructed 3D cat with the actual green-screen dance frames supplied by the user in `Desktop 2026.10.25 - 14.16.06.01.mp4`.

## Cat animation

A clean one-second section starting at 5 seconds was cropped away from the recording's browser controls, logos and on-screen toast. Green-screen keying and green-edge despill produce 24 transparent 256×384 frames. The supplied movement is retained; no limbs, face or body motion are reconstructed.

- `assets/cat-dance.gif`: actual transparent animated GIF, 24 frames, 1000ms loop.
- `assets/cat-dance-atlas.webp`: the identical RGBA frames in an 8×3 sheet.
- `assets/animation.json`: frame timing and source provenance.
- `assets/textures.js`: embedded atlas for reliable offline opening.
- `cat-animation.js`: camera-facing animated planes; no 3D cat mesh or skeleton.

The game plays the GIF's frames from a shared atlas so many cats can stay synchronized, have independent phase offsets, change speed, and pause exactly. Camera-facing planes keep the original appearance when the 3D stage rotates. The stage, floor, rings, beams and mirror ball remain 3D. Color labels belong to the numbered ground rings; the cat itself is not recolored.

## Play

Tap two cats, or their large numbered buttons, to swap positions. Match the top color/shape order. Twelve finite lineups contain 4–12 cats. One completion star, one for optimal swaps + 2 or fewer, one for using no hint; only the best result per lineup counts. Undo counts as an action. Hints highlight a suggested pair. Keyboard 1–9 selects the first nine seats; H hints, Z undoes, Escape pauses.

FREE RAVE supports 1–24 cats. Stage Mix changes Arc / Grid / Heart / Circle / Wave formations, synchronized / wave / shuffled playback phases, palette, brightness, tempo, moving beams and disco floor. Drag to orbit; mouse wheel zooms; RESET VIEW restores the camera. The music button plays audio extracted from the user's latest recording (1.5–15.5 seconds, 14 seconds total). It loops with short edge fades; pause/mute stop it, resume continues, and the tempo control changes playback speed while preserving pitch. Synthesized background music has been removed; small interface confirmation sounds remain. The embedded MP3 also works offline.

## Offline, mobile and save

Open index.html or upload the whole folder to static HTML5 hosting. All dependencies and image data are included; no CDN or runtime download is needed. Touch buttons are at least 44px, including the 12-seat lineup at 320px width. DPR is capped at 1.5 and rendering is capped near 40 FPS. Actual physical-handset FPS is not certified.

Lineup state, best stars, music and stage settings, free-rave count/mode persist in browser storage. Reload resumes unfinished play paused with transient selection cleared. Blocked storage leaves the session playable. Pause / hidden tab / blur stop image-frame time and audio. Asset failure and graphics-context loss show Retry.

The game code and stage are locally authored. Cat imagery originates from the user's supplied recording; rights remain with the respective owners. Three.js r147 is MIT licensed, see THREE-LICENSE.txt. This revision does not claim an original cat model or original dance animation.

