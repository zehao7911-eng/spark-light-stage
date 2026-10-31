# SKYRIBBON — Draw a Little Wonder

An original English HTML5 seaside-coaster toy. Draw hills in the small panel, or just tap RIDE. Your line becomes a smooth, connected railway. Ride it, tap BOOST, collect glints and open the next island. No crashes, lives, forced retries, ammunition or navigation puzzle. A missed glint never prevents the next island from opening.

## Play

Draw left to right in the lower panel; height becomes the track's hill profile. Releasing commits the line. Cancelled or extra touches do not commit. Reversed or short gestures are safely normalised; a very short gesture uses the park's default ribbon. The wand creates another safe profile. You can skip drawing entirely and ride the displayed default. The moving scene labelled LIVE PREVIEW is an attract preview, not a scored ride.

Tap RIDE to board. During the ride, tap BOOST, tap the 3D scene, or press Space. Boost starts fully charged, lasts 2.7 seconds, and recharges; collecting glints helps recharge it. The train stays on the rails and cannot stall. Rails are extended beyond both stations so the first and last cars actually fit, rather than stacking at a clipped endpoint. The camera frames all car corners and adapts to the hills and train length. It never needs manual steering.

Glints grant fictional tickets; every finished ride also grants ten tickets, enough for the first magnet upgrade even if you miss every glint. MAGNET increases collection reach. MORE CARS adds a real car, to a maximum of five, and increases ticket earnings. Three car liveries unlock at 0 / 6 / 12 best stars. Stars reward finishing, collecting eight glints, and using at least one boost. Only completion gates the next park. Best stars/scores retain maxima; replaying intentionally earns more tickets.

Six finite island fairs share a coherent park kit, with distinct daylight, dusk, lagoon, moonlit, sunset and starlight palettes. Free drawing and replay continue after the campaign; this is not an unlimited library of authored parks. There are no ads, purchases, accounts, telemetry or backend.

## Phone, keyboard and saves

Touch / mouse draw the panel. Space starts a ride or boosts; Escape pauses. The large Ride / Boost action and all other controls have 44-pixel minimum touch areas. Both portrait and landscape layouts respect safe areas. The stage gains space during a ride, while the drawing panel is hidden. Reduced-motion settings disable extra bead rotation; camera following remains necessary to present the moving train.

Save key `skyribbon.v1` retains tickets, upgrades, liveries, island records, the current ribbon and an active ride's precise distance, velocity, boost charge and collected glints. Reload resumes behind Continue. Only the current ribbon is saved, not a per-island gallery of every drawing. Storage denial leaves the current in-memory session playable. Pause, blur and backgrounding freeze the ride, scenery and effects, cancel an unfinished stroke and suspend sound. Paused WebGL is not continuously redrawn. A graphics-loss screen offers reload from the saved state. Physical handset performance has not been certified by desktop viewport tests.

## Run and package

Open `index.html` or `SKYRIBBON-OFFLINE.html` directly, or host the folder on any static HTTP(S) server. Both built HTML files inline all game code, Three.js and CSS. No CDN, remote art, web font or audio file is needed. The ZIP has `index.html` at its root for HTML5 import, alongside readable sources, tests and licence notices. `python build.py` rebuilds the two HTML files, hash manifest and ZIP. `node test-model.cjs` checks arbitrary-stroke safety, default rides, non-blocking progression, exact save continuation, upgrades and station clearance for five cars.

## Art, engine and reference

Original procedural Three.js scenery: two open-canopy stations, tapered coastal islands, layered water shimmer, foam rims, palms, a working Ferris wheel with counter-rotating cabins, lighthouse, windmill silhouette, distant islands, bobbing sailing boats and night lanterns. Train chassis, wheels, seated riders, lap bars and small facial details use one consistent toy-scale palette. Rails, sleepers and supports are actual geometry; the track has a bounded grade and flat station approaches. Static decoration and track structures use instancing. DPR is capped at 1.5, rendering near 40 fps maximum, and short star effects at 90. There are no real-time shadow maps. Audio is original synthesis activated after a gesture.

Rezona **Draw Coaster Ride / Roller Coaster** was actually inspected and used as the interaction reference: https://rezona.ai/game/pgcserver/pv/yAUFsiJZ/v1/dist/index.html . Build Another was clicked, a line was dragged from the drawing field, and the resulting red rails and moving ride view were observed. No complete upstream source port or full reference campaign is claimed. This game's editable height profile, safe stations, 3D park, train, rewards, upgrades, camera, interface and audio are independently implemented. No reference scripts, images, models, music or branding are included.

Applied skills: game-art, game-design, 3d-games, mobile-games and web-games, with game-audio principles. They inform consistent materials, silhouette clarity, early rewards, forgiving controls, camera clearance, bounded effects and gesture audio. Skills and tests do not guarantee a platform grade or subjective appeal. Original code/art: root MIT notice. Bundled Three.js r147: retain `vendor/THREE-LICENSE.txt`.
