# SPARK — The Light Stage

A self-contained HTML5 / Three.js dance stage featuring the supplied character, its skeletal and facial animations, reflective flooring, animated beams, particles, and three lighting palettes.

## Run

With Node.js installed, run `node serve.cjs` in this folder and open http://127.0.0.1:4173.

Select **Sound · Off** to enable the soundtrack extracted from your video. Browsers require a user gesture before playing sound. Play/pause, seeking, and playback speed also control the soundtrack. The supplied soundtrack lasts about 12.1 seconds; the animation lasts 12.3 seconds. While sound is enabled, the dance follows the soundtrack clock and loops with it.

Drag to orbit, scroll to zoom, select a lighting swatch, or enable the automatic orbit camera.

All runtime dependencies and assets are stored locally. The model is split into small binary files for hosting and reconstructed in the browser without changing the original asset. Serve the complete `dist` folder; do not open `index.html` directly through a file URL.
