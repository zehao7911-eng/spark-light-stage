# Lickety Cove

An original, all-English HTML5 ice-cream afternoon with Nori the otter. Tap the scoop to take a bite at that point, or use the large NOM button for an automatic top bite. Hold to lick; dragging on the scoop changes the licking location. Hold to catch falling sugar pearls. A missed pearl lands on the napkin and can be scooped back up by holding. Finish the dessert and find all three pearls to earn a recipe stamp. No timer, lives, purchase or forced restart.

Nine authored recipes have different physical silhouettes: cloud, twin scoops, stacked mountain, ring, heart, crescent, star, blossom and reef. Three storefront atmospheres, a nine-card flavour book, up to 27 best stars, and Apricot/Seafoam/Lilac scarf finishes at 0/6/15 stars. This is a compact tactile game, not an endless campaign. One continuous held lick is a valid relaxed route; short bites are faster but require catching or tidying the pearls. Stars reward completion, all three recovered pearls, and no spills. Replaying keeps the best stars and score rather than adding duplicate rewards.

## Run / host

Serve the extracted folder over HTTP, for example `python -m http.server 8000`, and open `index.html`. No build or network CDN is needed. The archive has `index.html` at its root and relative asset/module paths for GitHub Pages subfolders or other static HTML5 hosts. Opening ES modules through `file://` is not supported; use an HTTP host.

Touch/mouse: tap or hold the scoop or the NOM button. Keyboard: tap/hold Space; Escape pauses. Use the Flavour book to replay unlocked recipes and change scarves. Pause settings include Sound, Gentle motion and Simple view. Simple view is an original Canvas fallback for devices where WebGL is unavailable or unwanted. If a WebGL context is lost, the game switches to Simple view and pauses, retaining the current scoop; it does not repeatedly refresh the page.

## Physical and visual model

The scoop is a scalar-field surface made with original marching-tetrahedra code and interpolated gradient normals. Bites and licks subtract actual spheres from that surface; the food is not merely scaled down. A finite interior sample lattice tracks consumption and progression. Detached sample clusters are folded into the current bite as crumbs, and the surface keeps the main connected scoop so fragments do not hover above it. This is a discrete edible-volume approximation, not a fluid or digestion simulation. Touch locations are raycast onto the actual 3D scoop. A short anticipation precedes each bite; held licking makes smaller cuts. Tongue follow-through, cheeks, jaw, lifted container, paws and pearl/crumb effects supply the physical response.

All character, storefront, cone texture, objects, SVG icon and sound cues are original code-made assets. The cover is an actual runtime screenshot. No AI image generation, commercial character, reference image, recording or source-game assets are bundled. Three.js r147 is bundled under its MIT license in `vendor/THREE-LICENSE.txt`; the game and art code use the root MIT license.

## References and scope

Rezona: **Sweet Tooth Sammy**, public URL `https://rezona.ai/game/pgcserver/pv/trshuHxZ/v9/dist/index.html`. The title, first level, idle three-drip shirt failure and restart were observed; native centre click/Space input changed score from 0 to 6 to 10 and cleared the Drip/Hold cue. A complete reference level was not verified. Lickety Cove independently interprets the tap-bite / hold-lick / catch-drips loop with an original otter and direct scoop carving, recoverable spills and no idle fail state. It is not a one-to-one reproduction.

Art atlas: `https://mygamesartstyle.jupiterthewarlock.com/styles/rounded-3d/`. The enlarged Fall Guys scene-0 example was fully viewed for rounded continuous shapes, candy-colour grouping and soft contact shadows. No Fall Guys character, logo, level or artwork was copied. Earlier complexity/duplicate candidates were rejected rather than described as this game's source.

## Mobile and persistence

Fixed 60 Hz model with timestamped input flushing (verified at 60/10/1 Hz), capped 40 Hz 3D drawing (30 Hz Gentle), DPR at most 1.5, combined static environment geometry, bounded three pearls / 35 effects / ten audio voices. The scalar lattice is bounded and only the scoop surface is rebuilt when cuts change. All code and assets load from the same host. Touch targets are at least 44 CSS pixels; portrait/landscape and safe-area layouts are included. Physical-phone performance still depends on the device and browser.

Local saving includes cuts, eaten sample IDs, pending bite, falling/spilled/caught pearls, profile and preferences. Reload opens a paused continuation and clears held gestures. Pause, lost focus and backgrounding stop model work and silence voices; there is no offline progress. If storage is denied, the game remains playable in the current session. Native/desktop layout checks are not a claim of physical-handset testing.

## Tests

Run `node tools/test.mjs`. It exercises all nine normal held routes, nine tap-and-tidy routes, targeted carving, pearl/material conservation, exact released-gesture and pending-bite restore, idle safety, monotonic/idempotent rewards, malformed saves, finite smooth surfaces and deterministic reconstruction from a cut list. The archive is also extracted and retested. Native browser/publication evidence lives in the delivery records outside this game folder. The preview pages in `tools/` are ordinary responsive frames; they do not inject progress or wins.
