# BOLT & BOOGIE

Tap the screws. Drop the boards. Let the band play.

An original illustrated screw puzzle with nine authored acts, three theatrical locations and three animated performers. Each exposed screw can be tapped. Screws matching the current two-screw box go straight in; other colours wait on a four-slot rack. Completed boxes move on automatically, using matching spares already collected. The Change Box button rotates the remaining box order without throwing away partially filled boxes. Undo and restart are free. There is no countdown, consumable currency, advertising or purchase.

The first act needs only four taps. Later acts introduce mixed colours, crossed boards, hinge motion, and layered obstructions. Removing one screw lets a board swing around its remaining real physics constraint; removing both lets it fall. Lower screws become clickable only when the boards above them no longer cover their centres. Tapping a fully occupied spare rack does not remove or lose the screw: change the box or undo. A contextual prompt explains the next step if no matching colour is exposed.

An act clears only when every screw is collected, every box is filled and every loose board has fallen out of the stage. One star is awarded for a clear, one for avoiding rack jams, and one for retaining the original box order. The playbill stores the best stars and score per act. Replays keep the maximum result and cannot duplicate rewards. All nine acts are available in the playbill; Next Act follows their introduction order. This is a finite nine-act puzzle collection, not an infinite campaign or the full reference game.

## Art direction

The user requested art reference from https://mygamesartstyle.jupiterthewarlock.com/ while retaining Rezona gameplay research. Actually inspected the style gallery and enlarged the Cuphead example on https://mygamesartstyle.jupiterthewarlock.com/styles/rubber-hose/ . The selected visual grammar is vintage drawn animation: dark closed contours, elastic limbs, pie-cut eyes, oversized white gloves and shoes, graphic body masses, controlled coral/jade/gold foreground colours, a quieter painted-paper background and clear stage layering. The flat-vector page was also inspected, then not selected as the final direction.

All actual game art is independently drawn Canvas code: three original bell-faced, crescent-faced and concertina performers; expressive eyes, smiles, cuffed gloves, curved limbs, dancing feet and squash; velvet curtains, scalloped footlights, microphone/drum, wall diamonds, perspective floorboards, fairground wheel/tents/pennants, moonlit harbour window/waves/boat/ropes, and widescreen illustrated playbills and gramophones. Paper grain is generated locally in code. The icon is original SVG; cover.jpg is an actual runtime screenshot. No image generation, commercial screenshots, reference characters, logos, extracted textures or downloaded artwork are included.

## Reference observation and differences

Actually started **Screw Shiba** in the Rezona public catalog: https://rezona.ai/game/pgcserver/play/oENpcHewif . Clicked exposed green/red/blue screw heads; observed a removed screw, board movement/drop, the waiting rack changing to 1/4 then 2/4, and progress changing from 0% to 11%. No complete reference level or official platform grade is claimed. Its unscrew/layer/colour-box interaction inspired this independently authored puzzle. No reference source, pictures, character art or audio was copied.

Pigeon Panic was started for inspection then rejected because it had already been referenced in prior productions. Rumble, Pingui Push and Needlesta were excluded on the same history check. Capybara DJ Frenzy's preview remained blank and was not used. BOLT & BOOGIE changes the actors, setting, art, board arrangements, box size, free recovery, reward and presentation; it is not a one-to-one remake.

## Controls and persistence

Tap with a finger or click screw heads. All exposed screws have real labelled 44px DOM buttons. In overlap areas pointer input selects the nearest exposed screw centre; keyboard activation uses the labelled button itself. Tab/Enter or Space activates controls; left/right cycles exposed screw focus; Escape pauses/resumes. Header Playbill selects another act. Pause contains sound/music and Light Graphics settings with Resume at the top.

Leaving the tab pauses simulation and stops active sounds. Partial saves include board poses, velocities, removed constraints, colour boxes and partial fills, spare rack, score, active act and up to 24 undo snapshots. A reloaded unfinished act opens paused. Physics resumes from saved poses and velocities; internal solver warm-start caches and animation/audio phase are not serialized, so bit-identical future physics or the same musical beat after reload is not promised. Progress stays in this browser's localStorage; there is no account/cloud sync. Storage denial is caught and a fresh session can still play.

## Audio

Original Web Audio synthesis: ratchet/noise removal ticks, pitched bolt pops, falling-board thuds, box chord and showtime chord. A locally composed 16-step ragtime-like pentatonic phrase, bass, kick and snare gain layers for the final dancing scene. The background pattern varies its root by location. Audio is quiet before the reveal, starts only after interaction, can be muted and stops on pause. No recordings, copyrighted songs or external audio files.

## Technology and limits

Canvas2D at DPR <=1.5 (Light Graphics caps at 1). Drawing is capped near40Hz. Matter.js 0.20.0 supplies fixed60Hz planar rigid bodies and screw constraints. Boards on separate visual layers deliberately do not collide, preserving the layered puzzle. Collider rectangles approximate their drawn rounded silhouettes. This is a 2D game with theatrical depth and illustrated shading, not a 3D simulator or hand-painted bitmap asset pack. The original character animation is procedural rather than a supplied GIF/sprite sheet. Sparks/bolts/confetti are bounded, paper grain is cached, and pause stops the scene update. A browser viewport test is not a real-handset performance certification.

Serve this folder using any static HTTP/HTTPS server, for example `python -m http.server 8080`, then open localhost:8080. ES modules need HTTP rather than double-clicking index.html. All paths are relative, and all runtime dependencies are bundled; no CDN, remote fonts, API, account or build step. The ZIP puts index.html at its root.

## Verification

Run `node tests.mjs`. Ordinary tap/step/box-change controllers complete all nine acts from two selection orders. Checks exercise real hinge/drop/occlusion physics, no passive clears, box/rack conservation, four-slot capacity, recovery, invalid inputs/saves, partial restore, free undo and immutable results. Browser evidence, responsive checks and public-file/package verification are recorded separately in the delivery record. Automated completion alone is not claimed as proof of fun or an S grade.

## License

Original code, procedural illustrations, icon and audio are MIT (LICENSE.txt). Bundled Matter.js is MIT, copyright Liam Brummitt and contributors (MATTER-LICENSE.txt). No reference game's source or assets are redistributed.
