# ROOFTOP RIVALS — Court notes

Original art direction: sun-warmed city football, inspired by the supplied atlas's hard-edge cel-shading category. The common vocabulary is clear 3D volume, a four-step lighting ramp, graphic shadows and readable action silhouettes. This is not pixel art and does not use painted bitmap characters.

## Palette

Paper #F5E4C7, ink #2E4350, Sunside teal #347C80, clay #BD7059, warm gold #E8B95D. Rooftop masonry is terracotta, metal is muted blue-grey, distant buildings lose contrast into warm haze. Canal Court shifts to blue/stone and adds bridge trusses and a wave mural. Market Court uses plum shadows, bunting and a geometric stall mural. All retain the same character, field, line and material scale.

## Proportions and materials

Approximately two-metre toy-athletes with oversized readable heads, articulated jerseys, socks, boots, headbands and individual facial parts. The ball has its own visible panel pattern and contact shadow. Heads use spherical colliders aligned with the visible face centre; pitch limits keep bodies inside the goalposts. Four kit palettes change the jersey, sleeve and sock stripes together. Opponents have separate shirts, skin tones, hair shapes and numbers.

Concrete is a broad colour plane, masonry uses grouped horizontal joints, metal uses repeated ribs, and fabric is indicated by hard folds/stripes rather than noise. Background windows follow floors and columns. The foreground murals fill the roof facade without covering play. Wire fencing is batched into one line mesh; repeated boxes are material-batched. Banners, roof fans and spectators move gently while the ball, striker poses and impact effects carry the action.

## Camera, UI and effects

The fixed side-facing orthographic view shows both goals in portrait and landscape. The ball and character live in a 2D physics plane inside the 3D scene; there is no depth steering. Foreground parapets remain below the playable plane. Mild goal zoom is bounded so it cannot hide either goal. Light mode removes this motion.

The UI is a printed sports ticket: cream panels, dark key lines, chamfered scoreboard, strong score numerals, teal home and clay away. Goal headings use an offset ink shadow. Hop and movement controls remain separated from the playable picture. The cup repeats fixture slots and best-star positions. Menus scroll internally on short screens and keep Resume near the top.

Contact produces a brief ring, shards and a synthetic kick or metallic crossbar tone. A physical goal adds a net ripple, animated arms, a small camera push, confetti, scoreboard changes and a short original fanfare. Effects do not determine scoring. Particles, audio voices, trails and rendering resolution are bounded. Paused scenes stop drawing once stable.
