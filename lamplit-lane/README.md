# Lamplit Lane · A little brighter

An English-language HTML5 pixel rooftop puzzle. Tap a neighbouring roof to move the lampkeeper. Entering that roof flips its lantern on/off. Light all lanterns to finish. No timer or lives. A short, gentle first puzzle leads to 3×3 and 4×4 roofs, gaps and revisit routes across 36 distinct layouts and six named districts.

Undo is free. Trail marks the next roof on a known solution; if you wandered away, it explicitly rewinds the divergent steps first. Par is the length of that guaranteed route, not a claimed optimal solution. Unlimited extra moves are allowed. Up to three medals reward finishing near par. First clears earn coins; replays only earn the difference for improved medals, so there is no first-clear reward duplication. Coins buy six visible scene keepsakes, gated by district progress. This is a finite 36-roof campaign, not an infinite-content game. Completed roofs remain replayable.

## Run / rebuild

Serve this folder with any static HTTP server, such as `python -m http.server 8000`, then open index.html. All runtime assets are local; no CDN, accounts, telemetry, server or WebGL required. Browser file-URL policies differ; use HTTP or GitHub Pages.

Node build dependency: esbuild 0.25.12. Run `npm install --ignore-scripts` (platform binary is an optional registry package), then `node build.mjs` to rebuild game.js. For tests: `node build.mjs --test`, then `node --test .test-bundle.cjs`. pnpm-lock.yaml and package scripts are also provided; package-manager versions may request approval of esbuild's optional install script. The prebuilt game needs no package installation.

Touch: tap outlined neighbouring roofs. Desktop/landscape also offers four direction buttons. Arrow keys/WASD move; U undoes, H shows Trail. UI targets are 44px minimum. Portrait layout stacks controls; landscape puts undo/trail/retry beside the scene. Sound defaults off and is enabled by a user click. Hidden tabs stop decorative animation/audio. Reduced-motion disables particle bursts and shake. Progress and active path save locally; clearing browser data removes progress. Storage failures do not block play.

## Provenance / QA

Actual MIT Hexahedral rules source drives movement, board state and win checks; see NOTICE.md, upstream/ and LICENSE. All world/character/UI art is original; see ART-SOURCE.md. Test and browser limits are recorded in test-report.txt and BROWSER-QA.md. Viewport testing is not physical-phone certification.
