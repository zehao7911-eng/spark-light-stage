# Shadow Movers

An original six-chapter HTML5 shadow-road puzzle. Drag the lamp to reshape real projected shadows. The courier automatically follows a connected shaded route; felt mats are safe places to rest. Turn the pinwheel and open the pop-up book when their controls appear. No combat, lives or timer.

## Play and controls

Serve this folder over HTTP, for example `python -m http.server 8000`, then open localhost:8000. No installation, account, CDN, game engine runtime, or backend is required. The source is plain Canvas 2D and JavaScript. A mobile browser with WebP and Canvas support is required. Audio starts after a gesture.

- Touch/drag the lamp along the bottom brass rail. Keyboard: focus the lamp and use arrow keys.
- Tap marked props to turn or open them. Recall returns the current parcel to the start mat.
- Hint shows a working lamp position; a marked prop may also need changing.
- One star for delivery, another for no recalls, another for staying within the chapter's move allowance. Hints cap the award at one star. Only the best result is saved.
- Pause suspends play. Progress is stored locally in this browser. Clearing site storage removes it.

## Source and art

This game is original implementation, not an adaptation of a third-party full game. `core.js` contains deterministic projection and routing, `art.js` renders the same geometry, `app.js` connects native HTML controls and local saves. Run `node tests.cjs` for six-chapter route and save checks. `build.py` adds deterministic cache versions and packs a game-only ZIP.

Artwork was generated with the built-in OpenAI image generation tool for this original project, then encoded as WebP and packed into measured alpha-bounded atlases. Twelve character frames, eight props, three desk environments and one cover are used. Prompts/provenance are in `ART-PROMPTS.json` (earlier missing exact prompts are clearly marked). Cover art also supplies the square icon. No commercial game characters, logos or extracted game assets are included.

Kalam font: Copyright 2014 Indian Type Foundry, SIL Open Font License 1.1; see `FONT-LICENSE.txt`. Synthesized sound effects are original.

Phone-sized browser checks do not substitute for testing every physical device. Rendering caps pixel density at 1.5 and freezes on page hide. The loader offers retry after a network timeout. All assets are bundled locally.
