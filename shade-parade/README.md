# Shade Parade

An original miniature shadow journey for HTML5, inspired by SCHiM's outlined, limited-palette city and jumping between living shadows. Original code and procedural art only; no assets from SCHiM. This is six compact authored puzzle scenes, not a recreation of the full commercial game.

## Play

Open index.html. All dependencies are bundled, including Three.js r147 under its MIT license. No CDN, fonts, account or server required.

Tap a glowing shadow to hop. Dark shadows are too far away. A jump reaches a center within 3.65 world units. Each shadow's marker is a 46px touch target. Tapping sunlight or a distant shadow gently returns you to your current safe shade.

- **Umbrellas:** while nearby, drag the round handle to rotate the shade. While inside one, TURN rotates 90 degrees. Your little shadow rides its moving patch. Turning it opens and closes routes.
- **Dogs and bicycles:** board their shadow and ride as they move. Hop off when the next shadow glows. Landings follow moving targets so exact reflex timing is unnecessary.
- **Falling signs:** from the switch shadow, PUSH. Falling signs open safe patches one after another, with animation and clacking audio.
- **Memories:** each street has an optional lost object. Find it before returning home. Complete the street to keep its album stamp.
- **Stars:** one for arriving, one for a memory, one for a clean walk at or below the displayed level's internal hop par. Best records never decrease. Replaying improves the album; there is no currency farming or purchase system.
- **Undo:** Z / Backspace, or ↶. Restores the state before the previous hop, turn or push, including clock, memory and moving rides. Up to 20 recent actions are retained.
- **Hints:** ? / H explains the next kind of interaction. R activates TURN/PUSH. Keyboard users can Tab to named shadow targets and press Enter. Escape pauses.

Six streets: simple hops, rotating umbrella, dog ferry, falling signs, umbrella+bicycle, and a final combined route. Streets unlock sequentially; the album allows replays. Completing a street gradually colors its buildings and plants. A completed street starts colored on replay. Save stores active street, ride phase, rotations, pending jump, undo history, memories, records and sound. Backgrounding/pausing freezes the scene. Storage errors degrade gracefully.

Mobile portrait and landscape layouts; DPR capped at 1.5, 30fps rendering, bounded procedural scene, shared geometry and cached outlines, no postprocessing or network fetches. Mobile tests use native touch events in emulated viewports; physical phone performance is unverified.

Reference: https://store.steampowered.com/app/1519710/SCHiM/
