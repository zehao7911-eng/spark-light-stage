# MUCH ALOFT · Such Sky. Very Bounce.

An original, small HTML5 low-gravity climbing game. An aviator Shiba hops through floating miniature workshops to restore three anchor machines. Tap a highlighted platform or press JUMP. Tap again in the air for a flip. The camera follows automatically. No timer, lives, combat, paid items, account or external runtime service.

## Progression and replay

Six finite airways, each with 12 steps, three sky rings and three anchor milestones. The shared floating-workshop kit has six coordinated lighting/palette variants, teacup and drum decks, windmills, cloud houses and a final airship. Moving decks begin in the fourth airway. These are six routes made from one expandable visual kit, not six separately modeled open worlds.

Two completed airways unlock Air Hop: a second airborne tap adds loft and retargets the next step. It can skip rings, so choose your route deliberately if collecting all three. Four completed airways unlock a glider: a longer flight, visible wings and two bonus tokens per deployment. Both abilities are optional. Spring Boots increase actual arc height; Ring Magnet increases ring reach. Three capped upgrade ranks and three earned outfit colours are available in the Hangar. First-clear progression never requires purchases or stars.

One star for completion, another for all three rings, another for three flips/Air Hops or two glides. Replays improve best records and earn a new completion payout; reopening the same completed result cannot repay. Six clears open continuing Sky Tours that repeat the six route kits with carried abilities and upgrades; the stage counter caps at 999. They are not infinitely unique levels. Space activates jump/flip/Air Hop; G glides; Escape pauses. Normal keyboard button activation also works.

Saved key `much-aloft.v1` includes exact in-flight progress, current step and position, rings, coins, abilities, upgrades, records and settings. Backgrounding pauses simulation and sound. Resume is explicit. Fresh Flight restarts only the current attempt; a separate two-tap reset in Help starts a fresh passport. Storage denial leaves a playable in-memory session.

## Art, technology and scope

All meshes, glyphs, texture canvases, geometric effects, interface and synthesized sound are independently authored code artwork: Shiba ears, cream muzzle/bib, glossy eyes and brass-rimmed goggles, tongue/nose/cheeks, jointed sleeves/boots/paws, curled tail, scarf, backpack rotor and folding two-colour wings; wooden decks/plank seams/rivets, ceramic-like cups/drums, lamp beacons, windmill blades, tiny houses/windows/flower boxes, cloud groups and an airship. Warm paper, teal/copper and lilac/night colours share the same material and UI language. Doge-inspired phrases and a generic illustrated Shiba are an affectionate meme reference, not a supplied photograph, official endorsement or licensed commercial character asset. No reference pictures, models, fonts, recordings or image-generation assets are bundled.

Three.js r147 is bundled under MIT; see vendor/THREE-LICENSE.txt. The rest of the original code is MIT. This is an arcade guided-arc game: the selected landing is continuously tracked, including moving platforms. It is not a free-movement rigid-body platformer, and misses/falls are deliberately eliminated. Flip animation rotates about the body centre; wing/deck framing and a soft contact decal support readable posing. Static repeated meshes and effect particles are instanced, DPR caps at 1.5 (1 in Gentle), paint targets 40/30 Hz and effects cap at 100. No physical-handset frame-rate or platform-grade guarantee is claimed.

## References actually inspected

Rezona **Falling Constant** was found in the current homepage's featured strip, https://rezona.ai/game/pgcserver/play/WUMdrhEt . Its seven-anchor low-gravity premise, intro, first forest/floating-furniture course and native Space attempt were observed (initial height about 0.6m). No checkpoint, reference course clear or full playthrough is claimed. This version changes controls, character, world kit, assisted landing, progression and UI; no reference source/assets/audio are copied. Shadow of the Sands' many-button controls and Oil Baron Billiards' rules were auditioned and excluded for complexity/repetition.

The user's art atlas's cached `miniature-world` style descriptions informed small coherent props, clear bounded platforms and soft contact grounding. The live style page was attempted on 2026-11-02 but its connection closed, so no fresh screenshot inspection of that gallery is claimed: https://mygamesartstyle.jupiterthewarlock.com/styles/miniature-world/ . This is an original miniature toy direction, not a visual reproduction of any atlas game.

## Run / modify

Open `index.html` or `MUCH-ALOFT-OFFLINE.html` directly, or serve the extracted folder over HTTP(S). Both HTML files inline Three.js and all code/CSS. Only the optional favicon is separate. No CDN, modules, WASM, API, installation or cross-origin headers. WebGL is required and a visible fallback message appears if unavailable. English, portrait-first and short-landscape layouts; mouse/touch Pointer Events with capture/cancel. Browser viewport emulation is not a physical phone test.

Editable sources: index-source.html, style.css, model.js, view.js, game.js. Run `node test-model.cjs`, then Python `build.py`. ZIP root contains index.html, the editable code, license, QA reports and SHA-256 manifest.
