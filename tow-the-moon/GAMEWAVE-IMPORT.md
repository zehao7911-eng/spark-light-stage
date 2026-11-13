# TOW THE MOON import contract

Import TOW-THE-MOON.zip with index.html at the archive root. Do not import the entire GitHub repository or place the entry in another enclosing directory. index.html is the complete offline bundle; standalone.html is identical. Editable modules, actual screenshot cover, SVG icon, licenses, tests and notes are included. No external CDN, media, SDK or authentication is required to start and finish all six missions.

The official SDK document was rechecked in the browser on November4,2026; its displayed modification date remains October30. Boot independence, async registration, direct callbacks and empty image-only comment semantics were read. Document reading is not actual App-host validation. The supported GameWave runtime injects neonlib. Methods are capability-checked, startup is independent, async registration requires code===0 and valid unsubscribe functions are cleaned up including late completion. Count snapshots, historical interactions and registration do not grant rewards. Genuine positive like grants gold wing trim; genuine new direct comment, including empty image-only content, grants a rose rescue signal. Core progression never requires social interaction.

Local claimed flags guard repeat callbacks; cloud max/union merging validates this game's versioned envelope and suppresses unknown/failed/timed-out cloud writes. This is not a server-verified cross-device exactly-once guarantee. Round lifecycle starts on the first navigation and ends on a real mission result or abandoned begun flight, with duplicate guards. Settings and resume do not create new rounds. Local active-flight ownership is preserved when progress merges.

The app uses actual CSS/parent window dimensions and capped WebGL DPR. The guarded host viewport query exists in the bridge but is not consumed by this app. The host should provide a usable CSS viewport. Real App import, like/comment callbacks and cloud round-trip remain to be tested in a supported host; mocks only validate the adapter logic.

# GameWave SDK integration requirements

Official reference: https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh (document updated October 30; verify again before implementation).

## Reusable prompt for future games

Build a complete, mobile-friendly HTML5 game with an English interface. The game must start and remain playable on ordinary browsers and GitHub Pages even when the GameWave SDK is unavailable. GameWave injects `window.neonlib` at runtime; do not make startup or gameplay conditional on it. Detect each SDK method before use and handle failed or rejected calls gracefully. Do not fabricate SDK events or reward claims.

When a round-based game actually starts, call `window.neonlib.gameStart()` if available; call `window.neonlib.gameOver()` when a round really ends, including a win or loss, if available. Avoid duplicate lifecycle calls. Some freeform experiences may not have a meaningful round lifecycle.

At initialization, independently and safely register `window.neonlib.onLike(callback)` and `window.neonlib.onComment(callback)` if available. These methods are available from SDK 0.8.0 only when the host app also supports them. Check the async registration result (`code === 0`); retain and invoke `data.unsubscribe()` when a listener is no longer needed, and avoid repeated anonymous registrations. If an asynchronous registration completes after leaving the scene, immediately unsubscribe. Register anew after page reload.

Use the event passed directly to each callback: onLike has `event.status` (true is liked, false is unliked); onComment signals a successful new direct comment and exposes `event.content` (possibly empty for an image-only comment). A reply to another comment is not a direct comment event. Treat `project_id` as a string. `count` is a snapshot, can be zero when unknown, and must not be used as an event identifier or proof of a new interaction.

Offer optional, clearly explained in-game rewards appropriate to the game (for example, a cosmetic or small bonus) after the matching confirmed callback: a positive like for the like reward, and a successful direct comment for the comment reward. Do not reward an unlike. Persist an explicit one-time reward-claimed flag and guard against duplicate callbacks/re-registration within the supported save scope. Explain that a local-only flag is device/browser scoped; do not promise cross-device or server-verified exactly-once behavior without an appropriate platform save/identity implementation. Do not require liking or commenting to play the core game. Do not assume an undocumented SDK API can open the host's like or comment UI.

These listeners only report qualifying operations made by the current player for the current game page while it is active. Registration does not return the current like state or trigger/replay old interactions. Events from a page that was exited or reloaded before completion can be lost. If unsupported or registration fails, hide or disable the optional platform reward prompt gracefully; normal play continues.

Test normal standalone play with no SDK, unsupported methods, successful and failed async registrations, positive like vs unlike, direct comment including empty content, repeat callbacks, already-claimed rewards, reload and cleanup. A mock proves integration logic only; verify real interaction and rewards inside a supported GameWave host before claiming platform validation.
