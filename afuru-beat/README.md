# Afuru · Petal Pulse

Mobile HTML5 rhythm game using the supplied combined character, stage, and dance model, with the soundtrack extracted from the supplied video.

Choose Soft, Flow, or Spark. Tap one of the three pads when a petal reaches the line. Hold long trails until they finish. Strong timing builds Bloom Fever for a score multiplier and responsive stage lighting. Each performance awards a rank and stars, which unlock Moon and Aurora lighting. Next Mix changes the lane pattern for another round. Best scores and unlocked lighting are saved locally. Watch the Dance plays the original performance without the rhythm chart.

Desktop controls: D, F, J. Space pauses. On phones use the three large touch pads. Backgrounding the page pauses music and gameplay.

All runtime dependencies are included; no external CDN is used. Host this directory over HTTP(S). Character and scene remain in their original shared coordinate system. The mobile model excludes MMD physics helper meshes, keeps animated morph targets, reduces textures to 1024px, and corrects cutout material depth behavior. The supplied original GLB remains untouched.

Audio: bgm.m4a. Model: afuru-mobile.glb. Three.js and its GLTFLoader are MIT licensed.
