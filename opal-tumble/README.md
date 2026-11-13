# Opal Tumble
Original one-finger 3D opal-pusher toy. Tap or drag a lane and release to drop, or use the DROP button. Opals bounce through a peg field, land behind the shelf and physically compress the tray; pieces crossing the front edge count toward the goal. Three collected colors charge one stronger next push. Six pavilions combine3/4peg rows and0/1/2tray bumpers with increasing goals. Unlimited opals; no purchases, cash, slots, timer pressure or failure. Best stars/fewest drops and exact active simulation save on your device.

## Run
Serve this directory over HTTP(S), e.g. `python -m http.server 8000`; open index.html. No build, account, CDN or backend. Mouse/touch lane tap or drag/release; keyboard left/right adjusts lane, Space drops, Escape pauses. Audio starts with input, mute/pause controls provided. WebGL required. HTML5 ZIP entry point index.html is at root.

## Art
All original procedural Three.js models, geometry, materials, lighting and animation. No image generation or downloaded game art. Cream/jade/coral cabinet, brass-rim pastel opals, engraved-style rims, pendant cat mascot, flower/star/moon badges, soft rug, potted plants and lamps. SVG icon original; cover.jpg is an actual game capture. Bounded particle140/audio12, DPR1.5,1024shadow. Fixed120Hz simulation, bounded frame catchup, hidden-page pause, touch capture/cancel handling. Portrait320568/390844 and landscape844390 browser layouts checked; physical handset not tested.

## Reference provenance
Actually browsed Rezona showcase. Cat's Shield(vXGRadIL/v1) exposed fox-knight platformer instructions and Space Rescue Service(EqRiokfD/v26) exposed an FPS title, so these were not used as the new mechanic. Actual selected reference Coin Cascade: https://rezona.ai/game/pgcserver/pv/TSyAalcp/v6/dist/index.html . Native INSERT COIN and lane click observed7drops,1/200progress and coin movement/push. No full reference round claimed. Original code and assets independently authored. This version adapts the drop/peg/push/cascade loop into a simple opal arcade; no source extraction, reference slots/shops/relic systems or art copied.

## Physics and verification
Incoming disks use a2D peg-plane circle/gravity/bounce simulation, blended into a horizontal tray presentation; tray uses an iterative circle-separation solver and kinematic pusher. This is a deliberately light arcade approximation, not general rigidbody3D stacking. Pieces stay on a single tray layer. Tests `node tests.mjs`: all6normal-controller routes, conservation, finite motion, charged pushes, cooldown, exact mid-flight save/reload, nofreeidlewin, corruption and terminal checks. Extracted ZIP runs same tests. Native initial first pavilion23/18,2drops,3stars observed before final peg solver refinement; final solver routes all6 complete. Native final second pavilion pause/reload17/22same. Online QA recorded separately.

## License
Original code/models/icon MIT, see LICENSE.txt. Three.js r147 MIT in THREE-LICENSE.txt. No other runtime dependency.
