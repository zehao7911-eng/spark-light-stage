# Plunge Party

An original compact 3D pool-party grab/carry/throw game. English throughout, portrait-first HTML5 with landscape controls. No external runtime CDN, account, payment or mandatory social action.

## Play

Drag on the arena to move the lifeguard. Get close to a guest to grab automatically. Keep dragging toward an edge, then lift your finger to toss. A yellow button and landing ring indicate a predicted water landing. A short throw lands back on the float; pick the guest up again. Heavy guests need a closer throw. Rival charges have a wind-up. Walking brakes at the edge; collision momentum can still knock you into the water. Three floatie rescues bring you back. After the third fall, retry freely.

Tap alternative: tap a guest's hand marker, tap an edge arrow, then TOSS. These issue real movement and throw commands; they do not teleport guests or award automatic points. The marker follows the guest; collisions and charges can interrupt an approach. Keyboard arrows/WASD move; release movement to toss, or press Space while the canvas is focused.

Six authored bouts introduce normal, quick and heavy guests, floatie obstacles and three pool looks. The first is a single-guest introduction; the other five have two waves, with 29 guests across the full campaign. This is a short-session arcade campaign, not six large open worlds. After Party repeats the same pools with capped faster charge tiers. Best-only 18 stars reward completion, keeping all floaties and at most two extra throws. Six stars unlock larger hands and extra reach; twelve add faster feet, reduced knockback and shoe detail. Two earned uniforms are available. A loss does not bank stars.

## Run / package

Serve this folder over HTTP(S), e.g. `python -m http.server 8000`, then open localhost:8000. No build is required. Keep index.html at the ZIP root and preserve all relative folders. ES modules require HTTP(S); file:// is unsupported. Local Three.js r147 is bundled. The versioned plunge-party-v1 save contains the active bout, guests, lives, exact physics state, best results and settings. Reload releases movement input without throwing a held guest. Blur/hidden pages pause and save. Full/Light graphics, sound and Gentle motion settings are included.

## Model and simulation scope

Original human faces, clothes, hair, goggles, shoes, articulated shoulder/elbow/wrist and hip/knee/ankle joints. Held guests are face up, follow the real palm midpoint and keep attached limbs through turns. Guest struggle, toss, fall and walking are authored joint animations. Planar circle contacts and ballistic flight form a small custom simulation. This is not a full 3D ragdoll or fluid solver. Water is a lightweight original shader with bounded splash particles. No AI-generated bitmap art. Cover is an actual game screenshot; icon is original SVG.

## Reference / rights

Rezona Rooftop Rumble: https://rezona.ai/game/pgcserver/play/EURijNQE . Its four-car/no-rail ring-out premise and clear feedback were inspected by entering Solo; an autonomous round ended with CPU 2 winning. No manually controlled reference victory is claimed. Plunge Party changes the action to human grabbing, carrying, throwing and pool rescues. No reference assets, source, characters, audio or branding were copied. It is not a bumper-car port or a full replica. The previous Flipper Flick game used turn-based pull/release puck collisions; this game uses continuous movement and attached human carrying. Shared original MIT geometry/SDK/rig utility lineage is attributed in LICENSE.txt; Three.js keeps its own notice.

## GameWave

See GAMEWAVE-IMPORT.txt. Core startup never awaits window.neonlib. Feature-detected lifecycle, optional cloud progress and independent like/comment listeners are guarded with timeouts and cleanup. A real positive like unlocks a gold whistle; a real direct comment, including an empty-content image comment, unlocks party confetti. Grants are idempotent cosmetics. Unknown or failed cloud loads suppress writes; progress and flags merge monotonically while the local active run stays authoritative. No likes/comments are posted automatically. SDK tests use mocks; real GameWave import, social events and cloud integration remain unverified.

## Checks

`node tools/test.mjs` — 54 complete controller campaigns across six bouts, three kits and three After Party tiers; grab/carry/throw, waves, short throw, cancellation, failure, exact restore, corruption, terminal rewards and mocked SDK contracts.

`node tools/model-test.cjs` — connected segment lengths, level shoes, pupil scale, bounded poses, face-up carry orientation and palm attachment across character/pose/yaw/blink samples.

Browser QA completed all six bouts with ordinary tap controls for 16/18 stars, a deliberate short throw/three-floatie loss/free retry, final defeat at 7/8 and successful retry, fifth-bout checkpoint reload, settings persistence and 320×568 / 390×844 / 568×320 / 844×390 layouts. Native browser drag was not available in the testing surface, so these results do not claim a native drag run. Physical handset FPS and real GameWave App import remain unmeasured.
