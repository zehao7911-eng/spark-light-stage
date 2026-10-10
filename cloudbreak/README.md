# Cloudbreak

An original compact wingsuit adventure inspired by Superflight's proximity flying. Original fox, environments, code and synthesized audio; no commercial assets or generated imagery.

Open index.html directly or serve this folder on any static host. Drag anywhere to steer relative to your touch-down point: right/left moves horizontally; up/down changes altitude. Release keeps your chosen target. Pass through floating arches; their centres award extra points and increase the chain. Three crystal arches award collectible crystals; green arches provide a short tailwind. Flying close to stone cliffs awards a once-per-cliff graze bonus.

Eight named routes have distinct palettes and slalom/altitude patterns. Checkpoints after arches four and eight restore the exact banked score, crystals and gates when a bump or Checkpoint action returns you. Bumps are retained, preventing a perfect-flight award after repeated resets. No lives or failure timer. Missing an arch breaks the chain but does not stop the flight.

Stars: finish; collect all three crystals; pass at least ten of twelve arches with at most two bumps. Six stars unlock Heather wings, fifteen unlock Honey wings. Journal records best stars and scores; replay routes freely. After eight routes, New horizons varies the seed and reuses eight landscape palettes and course structures, rather than claiming a full infinite handcrafted campaign. There are no purchases, advertisements or accounts.

Keyboard: arrows/WASD steer, R returns to checkpoint, Escape pauses. UI buttons support standard tab navigation. Sound begins on a user gesture. Pause, blur and hidden tabs suspend sound and freeze simulation/rendering. Touch cancellation ends steering safely. Saves restore active flight while releasing input; denied storage still allows session play. Photo downloads a PNG.

Bundled Three.js r147 is MIT licensed (THREE-LICENSE.txt). No runtime network dependencies. Mobile canvas DPR capped at 1.5, batched terrain/trees/clouds, bounded trail/effects and audio voices, no real-time shadows. Both portrait and landscape respect safe areas with 44px UI controls. If WebGL is unavailable or lost, the same game continues using a simpler Canvas 2D projection; this is a compatibility view, not identical visual quality. Physical handset performance requires testing on the actual device.
