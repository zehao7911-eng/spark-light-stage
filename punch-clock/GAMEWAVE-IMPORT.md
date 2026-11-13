# HTML5 host integration

Upload this ZIP with `index.html` at its root. The playable file has inline CSS, logic and artwork and starts independently of host SDK availability. It does not await authentication, cloud state or social subscription before accepting input. No automatic reload loop, service worker, cross-origin asset fetch, SharedArrayBuffer, WebGL or COOP/COEP requirement.

The optional `sdk.mjs` bridge detects a host-provided `globalThis.neonlib`. It never supplies or downloads an SDK itself. Hosts should inject their current official SDK before or shortly after loading the game. The bridge probes for a bounded period, bounds subscription/load waits and handles absent, rejected, delayed and replaced host objects. Cloud states are namespaced `{game:'punch-clock',v:1,profile:...}`. Unknown host state is not overwritten. Best scores/medals and affordable upgrades merge with local progress; active run timing is local only.

Supported optional calls: `gameStart`, `gameOver`, `loadUserGameState`, `saveUserGameState`, `onLike`, `onComment`, and `getGameViewport` where available. `gameStart` is sent on the first genuine input of a new bout; completed or abandoned bouts end once. A restored active session sends start before its paused continuation. Host errors do not stop play.

Genuine validated like events unlock a gold wrist seal. Genuine comment events unlock a multicolour impact-spark palette. Rewards are cosmetic, one-time and saved; they never gate bouts or upgrades. In unsupported hosts there is no fake like/comment button, synthetic event, forced social action or promised reward prompt. No external message or comment is sent by the game.

This is optional integration tested with bounded SDK mocks, not a claim of certification inside a specific AppAI/Gamewave production container. Confirm the host's current injection contract when uploading; avoid replacing the self-contained runtime with a generic SDK-dependent loader.
