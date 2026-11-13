# Ember Arcana

A complete English-language HTML5 deckbuilding journey for mouse and touch. Read a foe's next intent, spend Energy on cards, and assemble combinations over a three-act climb.

**Play:** https://zehao7911-eng.github.io/spark-light-stage/ember-arcana/

## Play

- Tap an Attack, then a living foe. Cards targeting yourself play immediately. A card marked ALL affects every foe.
- Spend 3 Energy per turn. End Turn resolves the visible enemy intents, discards your hand, draws 5, and refills Energy. Block resets at your next turn.
- Vulnerable increases incoming damage by 50%. Weak reduces attack damage by 25%. Strength adds damage to attacks for the rest of a fight.
- Choose a reward card after combat, or skip it to keep a lean deck. Rest or reforge at campfires; buy cards, relics and healing or remove cards at the market.
- Horizontal card rows scroll on small screens. The top-right menu contains help, resume and a new journey. Audio is optional and starts only after a user gesture.
- Progress saves locally after every choice. Browser storage must be available for persistence; private tabs may erase it on closing.

## Content

- 3 acts, 21 rooms in a completed journey, route choices and 3 bosses.
- 27 card definitions, each with an upgraded state; 12 relics with distinct triggers.
- 3 heroes: Warden, Oracle after 5 encounter victories, Stagkeeper after 14.
- 4 discovery event families, campfire upgrades, market stock and card removal.
- Discover more cards across encounter victories. Each complete journey increases the next ascent, capped at Ascent 5.
- Floating damage and block feedback, attack lunges, square-pixel bursts, hit flashes, optional synthesized sound, and reduced-motion support.

## Source and attribution

This is a substantial source adaptation of **Slay the Web** by Oskar Rough and contributors:

- Repository: https://github.com/oskarrough/slaytheweb
- Audited revision: `d65613ab5a59118949667847c900e49864b7e6e2`
- Source package: 0.25.0, AGPL-3.0-or-later. Full license: [LICENSE](LICENSE).
- Retained rule engine: immutable action transitions, drawing/shuffling/discard/exhaust, targeting, attack/block, powers, conditions, upgrades, monster intents, dungeon utilities and tests.
- New adaptation: touch-first presentation, original art, run orchestration, three-act content, route choices, relics, discoveries, progression, save envelope and six additional cards.
- Fixes: deep clone upgrade data; avoid mutation of frozen card-action parameters; respect explicit action targets; isolate vulnerability calculation per target; preserve Strength; handle exact-zero death and zero-block Body Slam; honor player maximum Energy.
- An upstream test expecting unupgraded Second Wind to heal 2 was corrected to 1. Its previous expectation relied on upgrade data leaking into the base card. The low-health condition draws cards; it does not increase healing.

Gameplay reference: [Slay the Spire](https://store.steampowered.com/app/646570/Slay_the_Spire/). This is an independent browser adaptation using the licensed Slay the Web engine, not the commercial game's source, art, complete content or branding. It uses its own finite three-act campaign and additional replay ascents.

**Corresponding source:** the `src/`, `tests/`, `build.mjs`, `package.json` and `pnpm-lock.yaml` shipped here, together with the losslessly encoded art and stylesheet, are the preferred files for modifying this version. Source is also accessible at https://github.com/zehao7911-eng/spark-light-stage/tree/main/ember-arcana . The downloadable `EMBER-ARCANA-GAME.zip` contains the same complete project, including these files. The adapted game code is distributed under AGPL-3.0-or-later; preserve its notices and source availability for modified public versions.

No upstream Ghibli scene images, commercial fonts, 32rogues assets or unverified card images are distributed. No remote run-posting backend, analytics, CDN or service worker is used.

Runtime dependency: Immer 10.1.3, MIT, Michel Weststrate; license in [IMMER-LICENSE.txt](IMMER-LICENSE.txt). Font: unmodified VT323 by The VT323 Project Authors / Peter Hull, SIL OFL 1.1, [FONT-OFL.txt](FONT-OFL.txt). Original project-generated artwork and code-native icons are documented in [ART-SOURCE.md](ART-SOURCE.md).

## Run and rebuild

Serve the folder with any static HTTP server, for example `python -m http.server 8080`, then open `http://localhost:8080/`. Do not open ES-module games through `file://`.

Node 22+ and pnpm 11+:

```sh
pnpm install --frozen-lockfile
pnpm run check
pnpm run test
pnpm run build
```

`build` bundles `src/app.js` and the engine into the shipped `game.js`. `check` formats source using Biome. The upstream instruction requests Bun check then test; pnpm runs the equivalent named scripts here because Bun is unavailable. No upstream dev server or upstream Git commit was run.

## Verification and limits

111 automated tests passed, with 2 pre-existing skipped tests and 3 upstream TODOs. Additional tests cover upgrade isolation, action targets, vulnerability, exact-zero death, rewards, saves, campfires, spending, unlocks, relic triggers, event costs and ascent scaling. Twenty-four generated campaign simulations reached the final victory without damage or health cheats. Room generation is seeded; the retained draw shuffler also uses runtime randomness, so runs are not guaranteed to replay identically from a seed.

Browser checks are recorded in [BROWSER-QA.md](BROWSER-QA.md). Viewport testing is not certification of every physical phone. This build requires modern ES modules, structuredClone, native dialog and WebP support; audio is optional. First-visit art is about 6.7 MB and loads independently of the playable rules; the game does not wait behind an indefinite art-loading screen.
