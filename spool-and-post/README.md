# Spool & Post

An original small pixel-art kite delivery game. Drag anywhere in the scene to guide the kite towards the floating letters. The courier follows below and the kite responds with damped spring motion, wind drift and a trailing ribbon. Catch the rare stamp for an extra star. Give the white birds space: three bumps end the flight, and you can retry freely. Arrow keys also steer.

Six finite routes revisit three different scenes: Linden rooftops, the harbour, and a lantern evening. Best stars, unlocked rounds, selected kite colour, sound setting and an active delivery are saved on this browser. Backgrounding pauses the game. The postcard book includes replay selection and kite colours. Sunset unlocks at six stars; optional Jade and Rose use successful GameWave like and direct-comment callbacks. Core play needs no SDK, account or network after loading. Real host interactions need separate in-app validation.

The direct visible-feedback approach follows our earlier Corner Crew. The loose reference is Relaxing Kite (Steam app 1475080): keep a kite aloft, avoid obstacles and unlock maps. This game has an independent fixed-scene letter objective, spring controller, scenes, art and sound. It does not copy reference code or assets, or simulate real aerodynamic kite forces. All art is original code-drawn pixel art, without image generation. No third-party runtime libraries.

Serve this directory with any static HTTP server. `index.html` is at the ZIP root. `node test.cjs` validates all six controller routes and relevant interaction limits. Browser dimensions are tested separately from physical phone performance.
