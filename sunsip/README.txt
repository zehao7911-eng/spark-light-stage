SUNSIP - Little Soda Studio

Swipe the hanging strings. Drop the fruit into the glass.

PLAY
Cut any point along a rope by swiping across it, or tap the rope. SNIP cuts
the next intact string as an accessible alternative. Cut order changes a
swing. Later recipes introduce soft bumpers, a moving glass and a breeze.
The moving glass keeps moving while the fruit hangs safely. Waiting can
help. Catch the three glowing bonus bubbles on the way down.

One star: finish the recipe. Two: collect at least one bonus bubble.
Three: collect all three. Every recipe has a verified three-star route.
UNDO restores the last cut, including the cup phase and fruit velocity.
There are no lives, timer limit, purchases or resources to lose on retry.

Keyboard: Space cuts the next string, 1/2 select a rope, Z/Backspace undo,
R restarts the recipe, Escape pauses/resumes. The recipe book opens replay.

Twelve authored recipes unlock sequentially. Each group of three completes
a different soda for the collection: Citrus, Berry, Peach and Grape.
Completing all twelve unlocks AFTER HOURS: continuously remixed orders,
combo scoring and three spills per shift, with a saved personal best.
It reuses the twelve authored layouts with varying cup phases; it is not
an endless set of unique handcrafted puzzles.
Best stars and active physics state are stored locally. Replays do not
duplicate rewards. Mute/pause are available, and switching tabs pauses.
Storage restrictions may prevent persistence; gameplay still works.

RUN
Open index.html or standalone.html, or serve this folder:
python -m http.server 8080
Both HTML entries embed their styles and scripts. No runtime CDN, font,
network image, account or API is required. A WebGL browser is required.

ART AND REFERENCE
All game artwork is original procedural code: cream/coral soda cabinet,
enamel canopy, tiled backdrop, fruit faces/skin/seeds/leaves, glass shell,
rim highlights, straws, saucers, rope recoil and gold particles.
No AI image generation was used. Three.js r147 is bundled under MIT.
Original code and art: MIT (LICENSE); Three.js: LICENSE-THREE.txt.

Public tactile-feedback reference: Rezona Rip - tear the net
https://rezona.ai/game/pgcserver/pv/RTyBKdiV/v1/dist/index.html
An actual swipe severed 49 reference threads and deformed its silk grid.
This game independently adds fruit/cup puzzles and authored progression.
No reference assets or code are copied. This is not a replica of Rip.

PHYSICS SCOPE
Fruit uses a two-dimensional point-mass solver with rigid maximum-length
tethers, circular bumpers, side rails, wind and a moving catch window.
Three-dimensional meshes present that plane. Rope recoil is visual;
it is not a full woven-cloth or three-dimensional rigid-body simulation.

BUILD / CHECK
python build.py         - standalone entries, hashes, reproducible ZIP
node tests.cjs          - all recipes, saves, collisions, swipe and loss
solutions.json is authoring/test data with normal cut timing examples.

Responsive phone and landscape layouts are included. Browser viewport
checks do not guarantee every physical handset. No platform rating or
guaranteed commercial compensation is promised.
