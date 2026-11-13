# Junk Jack

Hold to vacuum scrap. Release to fire the compacted ball. Bigger loads hit harder; destroy every junk robot before three bumps end the shift. The cannon automatically chooses a threatening robot, and a robot's overhead button or body can be tapped to select it. Short taps are a complete alternative: tap once to load, then tap again to blast. Space supports the same held or two-tap action; 1/2/3 select a lane and Escape pauses.

Six finite authored shifts feature 28 robots across a salvage yard, rooftop depot and night crew set. Tin robots, heavier workers, armoured explosive tanks and the compactor boss have different health and body pieces. Damage removes shields before body health; destroying an explosive target damages nearby active robots. Broken original model parts detach, bounce and shrink away. This is constrained arcade simulation, not general rigidbody destruction or a fluid simulation.

Stars reward finishing, avoiding bumps and meeting the displayed result's shot goal. Stars are best-only; retries never remove earned progress. Six stars unlock faster intake and a visible coil nozzle; twelve unlock eight-scrap shots and a visibly expanded chamber. Three worker paint schemes unlock with progression. After the finale, Overtime repeats the six authored jobs with speed scaling capped at three tiers; this does not generate unlimited unique maps.

The replenishing scrap chute feeds the ground supply. Pickups follow curved suction paths into the same tool that launches the charged ball. The human engineer has two-link shoulder/elbow/wrist and hip/knee/ankle chains, actual gun-grip contacts, levelled boots, helmet, goggles, facial features, pockets, straps and a backpack unit. Robots have connected limbs and detachable body groups. Static architecture is batched; shared geometry/materials, bounded effect pools, Full DPR≤1.5 at 40 presentation FPS and Light DPR1 at 30 presentation FPS limit workload. Those are configuration limits, not measured physical-device FPS or thermal guarantees.

## Run and import

Serve this folder over HTTP, e.g. `python -m http.server 8000`. Opening ES modules directly with file:// is not supported. The game-only ZIP has index.html at the root, every runtime file locally bundled, and no CDN or account requirement. There is no service worker, pointer lock, cross-origin isolation or external image service. A WebGL loss/reload message preserves the local save.

Local storage namespace: `junk-jack-v1`. Profiles validate best stars, scores, settings and optional cosmetic unlocks. Active jobs retain target, robot positions/health/armour, incoming queue, charged scrap, projectiles and clock. Interruption stops input without firing; resuming offers retained ammunition for a deliberate shot. Visual debris/suction trails restart after reload; gameplay state is retained, not every transient particle or audio sample.

Blur/visibility/pointer cancellation stop input. Pausing immediately silences the continuous vacuum oscillator. Audio starts only from a gesture. Music, pickup ticks, compression motor, impact, armour and celebration layers are synthesized in Web Audio, with no recorded reference music.

## Reference and provenance

Reference: **Trash Talk** by the publicly displayed @DangerousDinosaur, https://rezona.ai/game/pgcserver/play/uSEsgBfC. Its public title, vacuum/fire/Trash Ball instructions, Chill Shift selection, Wave1 intro and first-person street scene were entered and inspected. CITY CLEANLINESS, an 8/30 ammunition display, timer and cockroach-wave warning were observed. E and two canvas click attempts did not visibly change the ammunition display; successful vacuuming, firing, killing or a complete reference run were not verified. This game adapts the broad trash-as-ammunition loop into an original fixed-courtyard one-button game, rather than reproducing the reference's first-person city campaign. No reference executable source, models, images, fonts or audio were extracted or copied.

All game/model/icon/UI code and synthesized sounds are original. Shared original MIT geometry helpers derive from previous workspace games. Three.js r147 is bundled under its MIT license. The cover is an actual local game render; the icon and job badges are original SVG. No image generation or external commercial assets are included.

Design distinguishes this loop from the photo-gaze game Freeze Frame, suppression/evacuation in Hose Havoc, collect/unload cleanup in Sweepwick, and drive/stop combat in Rivet Road. It shares broad collection and projectile-action elements with prior games and does not claim to invent a genre.

## Optional GameWave SDK

Core startup never waits for window.neonlib. The official Feishu contract was rechecked November4; its visible modification label remained October30. Feature-detected genuine onLike status:true unlocks a gold grip/nozzle rim; a genuine successful direct/image-only onComment unlocks party-colour scrap and shot components. Both are optional, persisted and idempotent cosmetics. No historical social state is inferred and no button fabricates a callback. Unsupported reward copy stays hidden. Owned listener cleanup, bounded registration retries, lifecycle de-duplication and conservative cloud save merging are retained. An unknown cloud read suppresses writes; best progress merges monotonically. The browser's actual embedded viewport drives layout; a valid optional host viewport query is recorded independently of render density.

SDK tests use mocks. Real GameWave import, callbacks, viewport units and cloud roundtrips require testing in the actual host and are not claimed here. See GAMEWAVE-IMPORT.txt for the reusable import contract.

## Validation

`node tools/test.mjs` exercises 72 complete campaign/upgrade/pace/Overtime cases, first pickup timing, consumption, armour and actual collateral damage, loss/terminal behaviour, exact in-flight restore, corruption guards, reward idempotence and SDK absence/offline/listener/lifecycle cases. `node tools/model-test.cjs` uses the actual bundled Three.js geometry to check connected limb lengths, pupils, tool contacts and bounded silhouettes across paints, gear tiers, scales, headings and acting poses. Tests are also run from the extracted delivery ZIP. Native browser gameplay and responsive checks are recorded outside the package. Phone-size browser testing is distinct from a physical handset or actual GameWave host.
