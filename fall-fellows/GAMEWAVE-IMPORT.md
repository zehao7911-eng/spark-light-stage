# GameWave SDK integration and import

Upload FALL-FELLOWS.zip with index.html at its root, or use the identical self-contained standalone.html where a single HTML entry is accepted. No CDN/model/audio request or SDK injection is required for boot. Normal GitHub Pages play remains independent of the host.

The [official SDK document](https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh) was reread on November 4, 2026 and still displayed October 30 modification. The runtime supplies window.neonlib. This game does not invent an SDK script URL or postMessage protocol. Development-only simulator messaging is not shipped.

The actual first committed cut calls guarded gameStart. A full meet win or confirmed abandonment ends the active visit with gameOver. Pause/resume and repeated result settlement do not generate extra endings. Late injection can report an already active visit once. Startup probes are bounded; user input, focus, resize and foreground recovery can discover a very late or partial SDK without blocking play.

Independent onLike/onComment registration requires code===0, a supported method and host support (documented from SDK0.8.0). Direct callback fields are read; project_id stays a non-empty string. Only status true grants the brass axe. A direct comment, including image-only empty content, grants coloured landing chips. Count is a snapshot, never a reward increment or deduplication key. There is no historical/current-state inference, fake social submission, undocumented like-panel API or social gate. Earned status is visible in the optional field book and axe/next landing effects. Explicit saved flags deduplicate repeats; this does not establish server-authoritative cross-account exactly-once delivery.

Success unsubscribe functions are retained and invoked on stop, including late registration after timeout/exit. Unsupported listeners are cached per host. Timeouts retry within a bound. Host replacement uses generation guards so stale registrations, loads or writes cannot alter the current session.

Cloud uses a fall-fellows/v1 whole-state envelope and this game's own profile/state. Stars/scores merge by maximum and cosmetic flags by union. The local active cut remains locally owned, so a late cloud response does not replace an ongoing fall. A known empty stored object permits initial save; unknown, malformed, wrapped-error, rejected and timed-out loads suppress writes. Saves check code0. Updates received during a pending successful write flush as the newest complete snapshot. Failed writes stay dirty and retry on subsequent save/connect. Existing remote envelope fields are preserved. Other games' browser storage and nickname-derived identity are not used.

Valid getGameViewport width/height constrain the CSS box, with local viewport/ResizeObserver fallback and safe areas. Density is metadata, not a CSS dimension multiplier or replacement for bounded render DPR. Rotation and paused resize redraw the scene.

Automated failure/absence/late-injection/cleanup/cloud tests and a clearly labelled local simulator exercise integration. They do not certify real GameWave import, supported App version, real account/social operation or actual host cloud round trip. Those require a supported GameWave host. See QA.json and VALIDATION.md for the evidence scope.
