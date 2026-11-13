# BONK! STUDIO

Little movies. Big noises. An original English, mobile-friendly HTML5 Foley comedy game.

## Play

Open `index.html` or `standalone.html`, or serve the folder with any static web server. Both shipped HTML entries embed all runtime code, drawing, icons and sound synthesis. No account, build tool, WebGL, CDN, fonts, external assets or platform SDK is required to play.

Tap **Roll Camera**, watch the action, then tap the lit sound prop. Coconut shells make a Bonk, the bowl makes a Splash, the bell makes a Ding, and the wind machine makes a Whoosh. Keys 1–4 play the props; Escape pauses. A wrong prop gives a blooper and can be corrected during the same cue. The very first cue waits indefinitely. Normal cues offer 2–2.5 seconds; the library's optional **Relaxed mode** waits indefinitely on every cue and offers the same stars. The phone screen needs no dragging, tiny targets, simultaneous inputs or sound permission.

Nine finite authored films contain 80 sound moments across a kitchen, rainy avenue and lunar post office. New films unlock sequentially after matching at least 55% of their moments. Film 3 introduces the desk bell; Film 5 adds the wind machine. Three stars per film: premiere the film, miss no more than one moment, and make no misses or wrong-prop attempts. Best stars and scores replace lower records rather than accumulating on repeated result viewing. Later films combine the four sound props in longer sequences. The finite collection can be replayed; this is not an infinite procedural film generator.

Perfect timing earns 160 applause, a normal match earns 100, and a consecutive combo adds 20 per extra hit up to 100. This first version contains authored micro-scenes using four shared Foley action types, not nine full-length cinematics. The focus is approachable sound matching, visual payoff and a compact complete collection.

## Artwork and sound

All character paths, costumes, scenery, desk icons, curtains, props, particles, animations and synthesized sounds are original code. No image generation or extracted third-party game artwork is used. The shared palette uses ink teal, warm paper, vermilion, brass and sage, with consistent ink contours and material highlights. Kitchen shelves, tiled floor, growing dish stacks, passing street traffic, rain, moon parcels, drifting ship, actor anticipation, moving tail, pan impact, puddle reaction, ringing bell and flying hat are rendered live. Props are partly theatrical abstractions rather than physical simulation. Native controls stay outside the action and share the illustration palette.

Gameplay research: [The Root Cellar Cabaret on Rezona](https://rezona.ai/game/pgcserver/pv/ceuaiXjQ/v3/dist/index.html). Its introduction and four-lane stage presentation were inspected and the show was started; it was not completed. The useful reference is direct input producing a staged performance. BONK! STUDIO changes the theme, artwork, input scheme, sounds, cast and progression to movie Foley. Other catalog candidates were excluded after checking the local game inventory for repetition. No reference source code or assets are redistributed.

## Saves and GameWave

The only localStorage key used is **bonk-studio-v1**. It contains this game's profile, durable cosmetic reward flags and exact active film state. Reload opens a progressed film paused. The committed Resume action starts its resumed host session once; pause/result viewing do not start extra sessions. A film starts through Roll Camera and ends on a real completion or explicit abandonment for a new take. Existing profile data is never cleared. No enumeration or upload of other games' localStorage occurs.

The optional injected `window.neonlib` is discovered independently from boot. Start/end methods are guarded. Like/comment registration is independent, checks code 0, handles async errors, bounded registration retry/timeout, late injection and unsubscribe/cleanup races. Only a confirmed positive like grants gold-edged desk props; a confirmed direct comment (including an empty string for an image-only comment) grants premiere confetti. Unlike and registration itself grant nothing. Durable one-time flags guard duplicates within this game's save scope. There is no promise of server-verified exactly-once rewards across devices or storage resets, and no undocumented action to open the host's social UI. Optional social details appear in the film library only when registration succeeds.

Cloud loading accepts only a direct BONK! STUDIO v1 payload or an empty object. Profile records and cosmetic flags merge monotonically. Local settings and any active local film stay authoritative; an asynchronous cloud reply never replaces an in-progress local take. Game-specific full snapshots are saved after actions and transitions. A foreign game's nonempty cloud object is not overwritten. A failed/hanging cloud request cannot block standalone gameplay. The bridge uses CSS layout, safe-area insets and the browser viewport; device density is not treated as viewport width.

The official [GameWave SDK document](https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh) was rechecked on November 5, 2026; it still displayed October 30. The lifecycle, direct-state save and direct callback semantics were reviewed.

## Build and evidence

Run `node build.cjs` to regenerate both self-contained entries. Run `node tests.mjs` for fast deterministic checks: all nine wins/losses, progression, replay deduplication, first-cue onboarding, relaxed mode, progressed reload, cloud merge, actual one-time reward function, absent/partial/late SDK, genuine positive-like vs unlike, image-only comments, async failures, stale registration cleanup, direct save shape and lifecycle deduplication.

Evidence is separated:

- Static/source and gameplay model checks: passed; 65 automated assertions.
- GameWave mock integration checks: passed as part of that suite. These are not real platform events.
- Local browser: actual input completed Film 1 with 6/6 matches, a six-hit combo, 1140 applause and three stars; result/next-film unlock was observed. A mid-film reload retained matches/score and opened paused. Native touch-sized controls and 390×844 portrait layout were checked; a discovered minimum-width overflow was fixed.
- Published browser and pinned ZIP: verify at release, then record in the release evidence outside the runtime package.
- Physical iOS/Android and supported GameWave App import/callback tests: not performed here. Real host validation remains required before claiming platform certification.

Rendering density is capped at 1.5 and canvas drawing at approximately 40 fps. The simulation uses its own bounded clock so an embedded compositor's RAF throttling does not stall the game clock. Hidden pages and pause menus stop simulation and new audio. Storage/audio unavailability is nonfatal. The main package is approximately 53 KB of self-contained HTML before ZIP compression.
