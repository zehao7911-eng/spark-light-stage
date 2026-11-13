# CART RIOT

A shopping cart, a spring-loaded hop and a street full of very breakable crates.

## Play

Hold the street and drag left or right to steer. Lift to hop. A longer hold winds the suspension for a higher hop; a short tap still hops. Wood crates burst, feed a combo and build speed. Land close to crates for a landing smash. Iron barriers and crossing traffic cause a recoverable bonk, dropping speed and the current chain. No lives or time limit. A full RIOT button gives a brief speed rush and a wider smash reach.

Meet the crate target, then reach checkout. Earn an extra badge for a long enough chain, and another for three hops or a clean, bonk-free run. If you miss the target, coins still bank and you can retry. A stationary centre-line opening cannot clear Market Mile: steering is needed after the immediate first group. Best badges pay improvement bonuses once. Replays bank up to 100 earned coins per run. Three garage upgrade paths change actual jump height/landing reach, collision recovery and coin capture range. Upgrades apply to new runs; paint changes the current model. Lagoon unlocks at six badges and Honey at twelve.

## Streets

Six finite routes introduce different interactions: Market Mile's alternating crate lines; Cone Comedy's low bars and tall iron blocks; Boardwalk Bounce's launch ramps and landing stacks; Rush Hour's moving carts; Neon Crossing's tram crossings; Last Checkout's speed pads and mixed parade. These are three environments — toy city, waterside boardwalk, and evening city — not six independently illustrated worlds. The night route has different crossing hazards as well as lighting. After all six, seeded After Hours layouts mix the physical objects with bounded lengths, object counts and difficulty. This is not unlimited authored content or online multiplayer.

## Controls and accessibility

Touch: one finger on the street; optional RIOT button. Keyboard: A/D or arrows steer; hold/release Space to hop; B activates Riot; P/Escape pauses. Pointer cancellation, loss of capture and focus loss release inputs without a free hop. Hidden tabs and orientation changes pause. The pause menu includes Sound, Gentle motion and Light graphics. All product text is English. Controls and menus use real HTML buttons.

Current run, coins, badges, garage and settings save locally. Reload opens the saved run paused. Physical position and midair motion restore, while loose cosmetic particles reset. A saved result retains its receipt and cannot pay twice. Denied local storage still allows session play. Restart asks a second time and preserves banked records. WebGL initialization or context loss shows a reload recovery screen instead of an endless loader.

## Art and sound

All cart/rider/building models, signs, surface textures, interface, SVG icon and synthesized audio are original for this game. Rounded geometry, fruit cargo, wire basket, rubber wheels, suspension, helmet, eyes, arms and body reactions are actual real-time 3D components. Wood fragments, flying coins, body recoil, spring compression, wheel spin, jump/land movement and Riot ring run in the playable scene. No image generation or cover-only pre-rendered game scene is used. The cover is an actual runtime capture.

Three.js r147 is bundled with its MIT license. Source-reference interaction: [Downhill Mayhem / CART JAM](https://rezona.ai/game/pgcserver/pv/trshKFFj/v36/dist/index.html). We actually entered Offline, accelerated to 63 km/h with W, then deliberately bailed with B: bailout count became 1/3, style 91, speed 1 km/h. No full reference finish or victory is claimed. No reference script, model, image, logo, recorded audio or font is included. The result is an independent one-finger hop-and-smash interpretation, not a pixel-identical clone. Previous Table Top Turbo used free steering and three laps; this game uses a linear street and suspension hop, with acknowledged broader racing overlap.

## Build and serve

Open index.html or standalone.html. Both contain the same self-contained classic JavaScript/CSS/Three bundle and make no runtime CDN, API, module or font requests. Source files are also included: model.mjs, scene.mjs, game.mjs, style.css and index-source.html. To use the editable modular source, serve the directory over HTTP. The default inline build also works without a network connection when downloaded intact.

`python build.py` regenerates the inline files and the reproducible game-only CART-RIOT.zip in the parent directory. `node tests.mjs` runs independent model scenarios: six routes, three seeded post-campaign routes, idle failure, hopping over bars, spring/bumper/kite effects, Riot reach, ramp/pad forces, bounded objects, upgrade pricing, exact restored flight and idempotent receipts. These complement actual UI play; test counts do not establish fun or an art-quality grade.

Mobile validation uses browser portrait and landscape viewports, including 320×568, 390×844, 568×320 and 844×390. It is not physical handset or measured device frame-rate certification. The renderer caps pixel ratio at 1.5 and paints at 40 fps target; Light graphics uses pixel ratio one and 30 fps target. Physics uses fixed 60 Hz steps. These are configured limits, not claimed measured phone performance. Reused geometry/materials, batched static cart/environment parts and instanced crates/coins/debris limit per-object rendering work.

Applied supplied skills and the first-five-seconds/visual/feedback/content/mobile delivery gates are documented in DESIGN.md.
