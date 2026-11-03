# Ripple Club — GameWave import requirements

Official reference: https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh (local contract verified October 30; the live document could not be retrieved during this build).

## Reusable prompt for future games

Build a complete, mobile-friendly HTML5 game with an English interface. The game must start and remain playable on ordinary browsers and GitHub Pages even when the GameWave SDK is unavailable. GameWave injects `window.neonlib` at runtime; do not make startup or gameplay conditional on it. Detect each SDK method before use and handle failed or rejected calls gracefully. Do not fabricate SDK events or reward claims.

When a round-based game actually starts, call `window.neonlib.gameStart()` if available; call `window.neonlib.gameOver()` when a round really ends, including a win or loss, if available. Avoid duplicate lifecycle calls. Some freeform experiences may not have a meaningful round lifecycle.

At initialization, independently and safely register `window.neonlib.onLike(callback)` and `window.neonlib.onComment(callback)` if available. These methods are available from SDK 0.8.0 only when the host app also supports them. Check the async registration result (`code === 0`); retain and invoke `data.unsubscribe()` when a listener is no longer needed, and avoid repeated anonymous registrations. If an asynchronous registration completes after leaving the scene, immediately unsubscribe. Register anew after page reload.

Use the event passed directly to each callback: onLike has `event.status` (true is liked, false is unliked); onComment signals a successful new direct comment and exposes `event.content` (possibly empty for an image-only comment). A reply to another comment is not a direct comment event. Treat `project_id` as a string. `count` is a snapshot, can be zero when unknown, and must not be used as an event identifier or proof of a new interaction.

Offer optional, clearly explained in-game rewards appropriate to the game (for example, a cosmetic or small bonus) after the matching confirmed callback: a positive like for the like reward, and a successful direct comment for the comment reward. Do not reward an unlike. Persist an explicit one-time reward-claimed flag and guard against duplicate callbacks/re-registration within the supported save scope. Explain that a local-only flag is device/browser scoped; do not promise cross-device or server-verified exactly-once behavior without an appropriate platform save/identity implementation. Do not require liking or commenting to play the core game. Do not assume an undocumented SDK API can open the host's like or comment UI.

These listeners only report qualifying operations made by the current player for the current game page while it is active. Registration does not return the current like state or trigger/replay old interactions. Events from a page that was exited or reloaded before completion can be lost. If unsupported or registration fails, hide or disable the optional platform reward prompt gracefully; normal play continues.

Test normal standalone play with no SDK, unsupported methods, successful and failed async registrations, positive like vs unlike, direct comment including empty content, repeat callbacks, already-claimed rewards, reload and cleanup. A mock proves integration logic only; verify real interaction and rewards inside a supported GameWave host before claiming platform validation.

## This game

Import the ZIP with index.html at its root. The English game is touch-first, with guarded optional neonlib methods and a buildless self-contained HTML runtime. Positive like unlocks a Sunset cap (jade flag); a successful new direct comment unlocks a Rose wristband (rose flag). These are optional cosmetics. Do not fabricate callbacks or grant rewards on registration. All six courses, free retries and earned kits remain playable without social interactions. Physical handset and real host callbacks have not been validated.
