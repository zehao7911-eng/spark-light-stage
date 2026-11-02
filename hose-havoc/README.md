# Hose Havoc

An original one-finger 3D firefighting miniature. Spray water, suppress spreading heat, cool tanks for a cooling wave and get every resident safely out.

## Play

Drag on the scene to aim and hold water. Tap a circular fire marker for a 1.65-second burst. A short tap on the scene makes a shorter burst. Release a drag to stop spraying. Water is unlimited. Tap the nozzle buttons after unlocking them. Keyboard arrows choose a fire; hold Space to spray; Escape pauses.

The 90-second clock starts with the first water command. Wet furniture resists heat; dry furniture can reignite near hot neighbours. Cooling tanks send a one-time cooling wave to nearby objects, and power units increase heat spread while hot. Residents automatically evacuate along obstacle-avoiding routes when their surrounding hazards are cool. Finish requires every fire to be cool and every resident at the exit. A timeout has free retry.

Six short authored calls share three room sets. There are five or six hazards and two or three residents per call. Replaying after the sixth call reuses the layouts; it is not an endless supply of new rooms. Stars reward completion, finishing under45seconds and no reignitions. Best stars and scores persist; reloading or replaying does not duplicate rewards. Six total stars unlock a wider Fan nozzle; twelve unlock Foam, which wets surfaces for longer. These change the actual spray simulation, not only its colour.

## Art, references and license

Original procedural firefighter and residents, rigged limbs, props, three miniature rooms, water jet and moving beads, instanced flame volumes/steam, contact shadows, UI, SVG icon and Web Audio synthesis. The cover is a screenshot of the real title scene. Generic original mesh helpers were reused from our earlier Out of Office project. No image generation was used. Runtime assets are local; Three.js r147 is included with its MIT notice.

Actual public Rezona reference: Night Shift at the Haunted Animal Hospital, https://rezona.ai/game/pgcserver/pv/GMjoMZku/v8/dist/index.html . Start, native spray/charge100→88→70, lateral movement and the empty/recharge cue were observed; no slime was verified cleaned and no full reference shift was completed. Hose Havoc is independently authored and changes the hospital's multi-item first-person chores into a fixed-view fire-suppression/rescue loop. No reference assets, models, code, logos, fonts or recorded audio are included.

The adjacent earlier projects Rinse & Shine, Fossil & Fern and Sweepwick were checked for repetition. This project uses spreading/reigniting heat, persistent wetness, cooling-wave interactions and resident evacuation instead of cleaning dirt masks, specimen restoration or collecting litter. It is a compact arcade game, not a realistic fire-safety simulator or a claim of a new genre.

## Hosting and saves

Serve this folder using HTTP/HTTPS. No build or package installation is required. ES modules require a web server; direct file:// opening is unsupported. The downloadable ZIP has index.html at its root. No runtime CDN, account, tracking, ads or payments.

Profile and partial state save in localStorage. Held input/bursts are cleared on save/interrupt; explicit Continue restores the run. Pause/background freezes simulation and stops spray audio. Full/Light graphics and Full/Gentle motion are available. Graphics context loss shows a reload message. Invalid partial state falls back while keeping a valid profile. Browser storage denial allows session play, without reliable persistence.

Run node tools/test.mjs for deterministic gameplay checks. Touch/viewports are tested in a desktop browser; no physical handset/FPS certification, listening-quality audition or platform-grade guarantee is claimed.
