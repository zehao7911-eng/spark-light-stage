# Freeze Frame

An original single-finger 3D camera game. Museum statues creep when you look away. Keep one in the beam to freeze its exact pose; hold the gaze briefly and your camera automatically takes a portrait.

## Play

- Drag the beam across the gallery, tap a statue marker, or use the three large direction buttons. Keep the beam still until the focus ring fills.
- Tap BLINK before eye strain fills. A short voluntary blink rests your eyes. Ignoring strain causes a longer forced blink, giving unseen statues time to approach.
- Three bumps end a visit. Retries are free and do not remove earned stars.
- Left / right arrows or A / D look sideways; Up or W looks centre. Space blinks. Escape pauses.
- Easy pace is on by default. It slows statues without reducing rewards; changes apply to the next visit.

Six authored galleries contain 1, 3, 4, 8, 10 and 12 sculptures: 38 captures in a full tour. The three coordinated locations are the Still Gallery, Jade Collection and After Hours. Each gallery gives one star for finishing, one for no bumps and one for no forced blinks. Best-only rewards cannot be farmed repeatedly. Six stars unlock a wider real aim tolerance and Jade film; twelve unlock quicker exposure, slower eye strain and Plum film. Another Night repeats the authored galleries at a capped speed increase; it is not unlimited unique content.

## A real little photo album

Every capture renders the same original sculpture kind and its actual frozen gait pose in a small 96×128 model studio, using the game's own WebGL renderer. This is not an external image, AI generation or a screenshot of the entire gallery. A Polaroid appears during play and in the result. One collected portrait per completed gallery is saved with the profile and displayed in the album. The JPEG is generated only at capture, not every frame. Film choices change the visible photo mount; optional celebration film changes capture particles.

## Models and scene

Four independent procedural sculpture variants share connected shoulder/elbow/wrist and hip/knee/ankle rigs, with waistcoats, lapels, buttons, bow tie, glasses, bun, moustache, top hat, monocle, watch chain and detailed shoes. Movement advances a gait distance only while unseen. A watched actor's limb matrices remain frozen. Feet follow two-link leg targets with level soles, with the lowest sole calibrated to the measured bevelled tile surface. This is a stylized constrained animation, not full rigidbody or general crowd physics.

The gallery has a patterned floor, columns and cornices, framed sculptural reliefs, an arched window, sconces, labelled plinths, velvet ropes, benches, plants and a modelled camera/tripod. Static geometry is batched. Portrait mode emphasizes the approaching figures; landscape uses a shallower camera and smaller presentation scale to keep people separate from controls. Landscape focus progress is also shown on the direction buttons. Title framing is independent of gameplay framing.

## Packaging / local server

Serve this folder over HTTP, for example `python -m http.server 8000`. Open the server URL. ES modules need HTTP rather than opening index.html via file://. The game-only ZIP has index.html at its root. Three.js r147 and every runtime asset are bundled. No CDN, image server, account, pointer lock or platform SDK is needed to start. There is no service worker or cross-origin isolation requirement.

Local progress uses `freeze-frame-v1`. Actor positions, focus, frozen gait distance, queue, strain, blink, camera aim and visit timing are validated and retained across reloads. Resuming starts from the title deliberately. A ready selected gallery continues through NEXT GALLERY; it is not reset to the first. Settings and up to six tiny portraits persist locally. External portrait URLs are rejected.

Full mode caps DPR at 1.5 and presentation at 40 FPS; fixed logic runs at 60 Hz. Light mode uses DPR 1, 30 presentation FPS and no realtime shadows. New coarse-pointer devices default to Light mode. Gentle effects reduce flashes and particles. Blur/visibility changes pause the visit. Pointer cancellation stops dragging without inventing a camera input.

## Reference / provenance

Reference: Rezona Don't Blink, https://rezona.ai/game/pgcserver/play/uyEsQsKh. Its public instructions described freezing a pursuer with sight, blinking, powering three terminals and escaping a containment building. OPEN YOUR EYES was entered; the hall, terminal distance16m, 0/3 power and IT'S AWAKE message after native Space/W attempts were observed. No terminal completion or reference win was verified. This game independently adapts only the gaze-freezes-motion idea to a fixed-view comic photo gallery. It does not reuse reference source, characters, textures, audio, architecture or screenshots, and does not claim exact parity.

Source, sculpture models, gallery, icon, poses and synthesized shutter/chimes are original. Geometry helpers derive from the author's earlier MIT prototypes; Three.js is bundled with its MIT license. No image generation or commercial assets are included.

## Optional GameWave

`window.neonlib` methods are independently feature-detected; core boot and rendering never wait for them. A genuine successful like callback with status true unlocks gold sculptural details; a genuine direct/image-only comment callback unlocks celebration film particles. Both are idempotent cosmetics, and unsupported rows stay hidden. Functional upgrades are earned in-game. Listener timeout/cleanup, lifecycle de-duplication and conservative cloud writes are guarded. Profiles merge best stars by max and cosmetic flags by union; an unknown or timed-out cloud read suppresses cloud writes. See GAMEWAVE-IMPORT.txt. Tests use SDK mocks; actual App import, social events and platform cloud roundtrips remain untested.

## Validation

Run `node tools/test.mjs` and `node tools/model-test.cjs`. Tests cover 72 complete controller visits across six galleries, three kits, two Encore tiers and both pace settings, as well as real freeze/unfreeze, partial exposure, blink/strain, genuine loss, corrupt saves, exact continuation, idempotent rewards and optional SDK guards. Mesh checks cover joint lengths, eye scale, level soles, actual floor contact and frozen pose stability across four kinds, four scales, three headings and seven gait samples. Native browser QA uses ordinary visible controls separately from these pure tests. Browser phone viewport testing does not certify physical-phone FPS, heat or memory, nor a real GameWave host.
