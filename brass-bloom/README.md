# Brass & Bloom

An original small 3D dial puzzle. Drag left or right to line up the glowing notch with the arrow. Release to lock the ring. Open eight vaults and collect eight flower variations. No timer, purchases or external runtime downloads. Left/right buttons and arrow keys offer an alternative to dragging. Completed keepsakes and your current vault selection are saved on this device; partial ring alignment is not saved.

Serve this directory using a static HTTP server (for example `python -m http.server 8000`). Open `http://localhost:8000`. Requires WebGL and a modern browser. `index.html` is at the ZIP root. Three.js r147 is bundled under the MIT license in `vendor/three-LICENSE.txt`.

All meshes, interface, icon and synthesized sounds are original code-built artwork. Rounded continuous forms and separated materials were studied at https://mygamesartstyle.jupiterthewarlock.com/styles/rounded-3d/. No reference images, game source, generated images or game characters are included.

GameWave support is optional: gameStart/gameOver are feature-detected; onLike and onComment are registered independently with failure handling. Successful positive like unlocks Jade enamel; successful direct comment unlocks Rose enamel. Rewards are optional and guarded once per device profile. The platform prompt is hidden outside a supported host. No current-state/history query or undocumented social UI method is assumed. Actual GameWave interaction still requires testing in the host app; local mocks do not establish platform compatibility.

Run `node test.cjs` for model and SDK adapter checks.
