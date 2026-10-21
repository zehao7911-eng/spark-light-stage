# MOSSBACK — The Living Wetland update

An original Godot 4.7.2 interactive miniature: a gentle tortoise carries a tiled-roof cottage, layered trees, flower beds and a koi pond through a shallow water garden. All geometry, shading, animation and chime audio are original code-generated work. No commercial/reference-video assets.

## Expanded environment / placement repair
The garden trees now have independently built crown envelopes, including their wind margin, separated from the cottage roof and chimney. A contour-following stone foundation joins the flat cottage floor to the curved shell. Native checks inspect the generated crown meshes, not only their planned positions.

The surrounding world is a continuous wetland rather than a single pond on an empty backdrop: foreground islands and reeds, lily water, middle-distance shores and bushes, an arched bridge with connected banks, a windmill, two complete cascades, two gently drifting sailboats, birds, 48 instanced forest trees, two continuous mountain ridges and 16 drifting clouds. Haze and night/season palettes tie the layers together. Tall forests remain outside the entire film-camera corridor. The final wide shot reveals more of the landscape.

Far scenery uses shared lower-detail meshes and a vertex-lit material. Water detail is distance-limited. Geometry is procedural; the scene does not require downloading large terrain/model assets. Desktop/phone-size browser checks are performed; physical-device frame rates depend on the device and are not certified.

## Watch and interact
- The default scene slowly travels along a continuous 78-second six-part camera loop: whole creature, face, water/flowers, cottage, side garden and a broad wetland return. Perspective and parallax reveal the garden's depth. Portrait uses a separately fitted field of view and camera distance: the hero silhouette remains inside the screen throughout the loop.
- Touch a flower to unfold it and briefly gather drifting petals. Touch elsewhere to greet the tortoise, now with a visible smile. Drag to take control of the camera.
- Bloom unfolds all six large flowers in a staggered wave. Rain adds falling drops and faster pond ripples. Season cycles through four smoothly blended foliage palettes. Night fades into blue hour, warm windows and flickering fireflies with additive halos.
- **Film** enters a clean continuous tour and starts a flower wave. The return arrow fades out after 2.5 idle seconds. Touch or move the pointer to reveal it again; use the corner arrow or Escape to return. Film is a viewing mode, not a video-file encoder: use your phone/computer screen recorder for video.
- Photo downloads a clean PNG up to 1600px on its long edge; it includes the visual treatment and excludes controls.
- The menu includes Night, Sound, Calm, Pause and Cinema. Space blooms; V cycles fixed overview/garden/face compositions. Calm suppresses the default automatic camera tour and reduces secondary motion. Entering Film explicitly enables its tour.

An interactive art toy: no combat, timer pressure, economy or missions. The tortoise's gait is an in-place wading animation, not an open-world travel system.

## Art and animation
Rounded three-layer flowers; a gabled roof with individual shingles and an attic window; flower boxes, steps, a bench and mushrooms; organic layered crowns and wind-driven foliage; separated meadow beds and trailing ivy; butterflies with marked wings, koi, expanding ripples, drifting petals, translucent chimney steam and fireflies. An original soft directional material model, restrained outlines, warm/cool shading, shallow lagoon glints, soft contact shadow and a lightweight screen finish keep the style coherent. No external CDN assets or image-generation dependency.

## Browser / phone
Serve index.html over HTTP(S); file:// is unsupported. WebGL2 and WASM required. Single-thread Godot Compatibility export, no cross-origin-isolation requirement. Around 38 MiB first engine/game download before HTTP compression. Safe-area insets and 44px minimum controls; separate portrait camera framing. The 3D long edge is capped at 900px in portrait and 1280px in landscape, 2x MSAA. Phone viewport testing does not certify physical-phone frame rates.

The game pack uses a content-hashed filename so returning visitors receive the updated art. index.pck is also retained for compatibility with previously cached loading wrappers. Godot engine JS/WASM are unchanged. No analytics.

## Save / lifecycle
The existing localStorage key mossback-garden.v1 remains compatible. It stores bloom/weather/season/clock/settings/counters. Autosave on actions, every four seconds and pagehide. Menus, background tabs and Pause freeze simulation; no offline progress. Brief settings redraws permit the color transition while the menu remains open. Camera angle and Film selection are not saved; a fresh visit starts a new tour from the overview.

## Editable Godot source
ZIP root: runnable Web export. godot-source/: editable project, shaders, font/audio, native QA and Web finalizer. Import project.godot in Godot 4.7.2 with matching Web export templates, export the Web preset, then:

    python tools/finish_web.py /absolute/path/to/export/index.html

The finalizer restores the loader/lifecycle wrapper and generates the hashed pack filename. Native validation:

    godot --headless --path . --script res://qa.gd

## Credits
Original code, procedural geometry, shaders and synthesized chime. Bitter font under OFL: fonts/OFL.txt / FONT-OFL.txt. Godot: GODOT-LICENSE.txt and GODOT-COPYRIGHT.txt. No commercial game affiliation or promise of social-media performance.

## Living Lake refinement
A mother duck and four ducklings swim in a sheltered crescent, bob, dip their heads and leave fading surface rings. Twelve softly colored lake fish, four hovering dragonflies and eight floating lotus flowers add quiet movement around the hero. Tip-bending reeds, articulated flock wings, fluttering two-piece sails and fine vertical cascade threads replace static silhouettes and hard water stripes. The cottage has recessed door panels, brass hinges, a porch mat, fine gable trim and four gently swinging wind chimes. Shared meshes and instanced water/flower/animal details keep additions bounded. The soft material has stronger warm-light/cool-shadow separation while keeping the original palette.

For a phone recording, choose portrait orientation, tap **Film**, then leave the controls idle: the return arrow fades away. The seamless tour is78 seconds. Use the device screen recorder; Film itself does not encode a video. Escape or the upper-left corner returns to the normal controls.

## Waterlight refinement
The lake now combines shallow turquoise gradients, view-dependent sky sheen, softened moving caustic lines, restrained sunlight glints, foot wakes and gently distorted reflection silhouettes of the tortoise, cottage and garden trees. Reflections use five analytic proxy volumes in the lake material: they are stylized approximations, not a second scene render or full geometry reflections. Detail is limited to the near lake, then fades into the distant haze.

Soft canopy shade, subtle watery light on the lower body and softened silhouette shading complement the warm/cool material. The garden pond now follows the night palette. Screen finishing retains delicate highlight bloom with a modest contrast adjustment.

Tap open water in front of the tortoise to send out rings and briefly attract the little fish. Four recent taps share a fixed instanced ring buffer; no unbounded particle creation. Eighteen petals drift on the lake. Butterflies occasionally linger above open flowers. Camera motion gently eases through each passage while retaining the seamless 78-second loop and portrait-safe framing. Existing saves remain compatible.
