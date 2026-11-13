# WHEELIE GOOD — Special Delivery

One wheel. Three parcels. Keep it together. An original small 3D HTML5 unicycle-balancing delivery game. Slide horizontally to counter the rider's lean; let go to release steering torque. Steady up at each mailbox and the carried parcel flies into it. First delivery takes about four seconds with steady input. Touch the street or use the thumb control; arrows / A D also work. Escape pauses.

## A complete small campaign

Six authored routes in three miniature settings: postcard town, harbor boardwalk, and night parade. Flat streets teach balance, then hills, stronger sea wind, raised board joints, moving seesaws and a combined final route change the physical challenge. Each route has three deliveries and three collectible postcards. Collect postcards while steady. Completing / collecting all postcards / avoiding bails earns three independent stars, up to 18 best stars. Six stars unlock a wide tyre that reduces wind force by 42% and a mint coat; twelve unlock a gyro fork with extra restoring torque and a honey coat. Easy Balance is free. Bails return to the latest delivery checkpoint with no lives or payment. Encore repeats the final route with bounded speed tiers; it is not an endlessly authored campaign.

The simulation is a constrained inverted-pendulum model with automatic forward motion, user steering torque, angular velocity, terrain slope and wind. It is not a full free-roaming bicycle or ragdoll simulation. Rider arms, head, pedals, legs and cargo follow that model. Each mailbox has its own opening flap, raised flag and completion light. Parcels visibly leave the rack. Recovery, postcard and delivery feedback have different cues and synthesized sounds. Scores, best results, settings and the exact active checkpoint save locally. Interrupted runs reload paused with released controls. Storage failures leave an in-memory playable session.

## Artwork and reference

Original code-modelled rounded postal rider, tailored clothing, fingers, face, blinking eyes, articulated legs, spokes, saddle, fork, parcels, mailboxes, street facades, awnings, planters, benches, lamps, boats, supported piers and moving deck. Procedural brick, paving and wood textures; warm matte palette, cached environment shadows and live contact blob. No image generation, extracted commercial art, commercial characters or remote fonts. Original SVG icon and actual runtime screenshot cover are included.

Reference: Unicycle Pizza Time!, https://store.steampowered.com/app/3138570/Unicycle_Pizza_Time/ . Its official store description and actual official screenshot were inspected on 2026-11-03. The visualized dusk-city unicycle delivery inspired the balance comedy. No purchase, installation, full native reference play, commercial source reuse, asset copying, visual parity or platform grade is claimed. The small warm browser adaptation and postal character are independent. Earlier vehicle, stepping and kite games are adjacent genres; this focuses on unstable body rotation and steady delivery stops.

## Mobile and graphics

Portrait and landscape controls, safe-area padding, 44px minimum action targets, resize input release, pause on blur/background, saved checkpoint and explicit WebGL error fallback. Default device-pixel ratio cap 1.5; Light graphics uses 1 and disables environment shadows. Gentle effects reduces decorative particles. Physics cues remain. Static scene meshes are merged; effects and sound voices are bounded. Browser viewport tests are not a physical handset FPS or memory guarantee.

## Optional GameWave host

Core boot and play do not await window.neonlib. The adapter feature-detects lifecycle, cloud, valid CSS viewport and supported social listeners. A genuine positive onLike callback unlocks a visible gold bell/rim; a successful direct onComment callback, including image-only empty content, unlocks party pennants and a lilac scarf. They are optional saved once-only cosmetic flags. Listener registration never grants rewards, unlike does not grant, counts are not identities, and no social actions are posted automatically. Standalone labels these as App extras without blocking play. Deferred unsubscribe and late/partial host handling are included. Unknown cloud load blocks writes, avoiding overwrite of unseen data; valid loaded progress merges monotonically while active local-run ownership stays local. Actual App events, cloud persistence and import remain unverified; mock tests are not host certification. See GAMEWAVE-IMPORT.txt.

## Run and modify

Serve this directory with a standard HTTP server, e.g. python -m http.server 8000, and open index.html. index.html and standalone.html are identical self-contained runtime HTML; source modules and local vendor source are included. Rebuild with python build.py. Run node tests.mjs for controller and adapter checks. Three.js r147 is vendored with its MIT license at vendor/THREE-LICENSE.txt. Original code/art use LICENSE.txt; no CDN is needed during play.
