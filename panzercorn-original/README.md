# Panzercorn

Original game by Chris Subagio, js13kGames 2026. The MIT notice is included.

This import uses the author's TypeScript game, 3D meshes, shaders, animations,
enemy waves, boss encounters, music and sound effects. The import adjusts the
camera framing for portrait screens, handles cancelled touches, and adds an
optional GameWave adapter with a high-score record and two cosmetic medals.
The standalone game works independently of the adapter.

Tap to wake the game and tap Start. Hold and drag to move and lock onto an
enemy. Release to fire. On desktop, use WASD to steer and hold the mouse to aim.

The ZIP starts at index.html. The standalone.html entry is identical.
A WebGL2-capable browser is required. Audio uses the browser's AudioWorklet.

The GameWave adapter calls gameStart when a run begins and gameOver when the
player is defeated. Waves inside a run do not restart it. It syncs the game's
best score, highest wave, and optional medal flags. A confirmed like unlocks
the Aurora medal and a confirmed direct comment unlocks the Prism medal. A
device/browser can keep its local scores even if cloud storage is unavailable.

Original code and license:
https://github.com/js13kGames/panzercorn/tree/b19c57c0bc8ff9f6ccace6e0355fc6b4006c21c8
