# Brassroot Brigade

An original, English, portrait-first HTML5 merge-defense game. Drag two equal crops together, or tap a crop and then a twin. Cannons fire automatically down their own path. Move crops between paths, plant reinforcements, and earn a Sunburst from eight catches.

## Play

Serve this folder over HTTP/HTTPS. For a local preview: `python -m http.server 8080`, then open `http://localhost:8080/`. ES modules require a server; double-clicking index.html through file:// is not supported. The ZIP contains index.html at its root and can be uploaded to a static HTML5 host.

- Touch/mouse: drag twins, or select then tap a destination. Empty plots can be planted directly. The Plant button chooses the least defended path.
- Keyboard: 1–9 select the nine plots, Space plants, B triggers a charged Sunburst, Escape pauses/resumes.
- Pause, backgrounding and loss of window focus stop simulation and audio. Resume explicitly. A partial raid and best records save locally. Denied storage keeps the current session playable.
- Sound is original Web Audio synthesis and starts after a gesture. There is no recorded music, external library, CDN, analytics, account, purchase or advertising integration.

## Content and rewards

Eight authored wave schedules across orchard village, rainy glasshouses and moonlit terraces. Four pest silhouettes include mushrooms, armored snails, quick beetles and the final Picnic King. Five distinct cannon growth stages introduce slow and splash damage. This is a compact campaign, not an endless generator of new levels.

Each cleared raid unlocks the next. One star saves the harvest; a second keeps the five-part fence intact; a third also grows a level-three Frost Bloom or stronger. Best records never decrease or duplicate stars on replay. The almanac records all eight harvests and discovered plant stages. Five breaches end the raid with a free retry. No real-world prizes or paid chance systems.

## Reference research and original work

Gameplay reference: Rezona's public showcase lists **Mergin' Plant Gunner** at https://rezona.ai/game/pgcserver/play/xVctCcKGlC, redirecting to https://rezona.ai/game/pgcserver/pv/xVctCcKGlC/v11/dist/index.html (served title: Savehouse Merge Defense). Its public served script confirms buying a level-one shooter, dragging equal-level plants to merge, automatic firing and wave defense. The reference's browser stayed at “Loading assets…” during this session: a completed reference playthrough or source-game hit feedback is not claimed. Only the broad interaction was studied. No reference code, graphics, sprites, audio or other assets are distributed in this game.

Art direction: https://mygamesartstyle.jupiterthewarlock.com/styles/pixel-isometric/ . The 9 Kings forest-settlement screenshot was actually enlarged and viewed: coherent diagonal ground, controlled top/side values, detailed roofs and small units. All scenery, silhouettes, characters, interface, effects and SVG icon here are independently drawn with code. The cover is an actual runtime screenshot. No image generation was used. This is an original browser interpretation, not a pixel-identical reproduction of 9 Kings or Rezona's art.

## Implementation and checks

Canvas2D renders at a fixed 480-pixel logical width with nearest-neighbor scaling. Three cached scene backgrounds, 75-effect and 50-projectile bounds, 14 sound voices, 60 Hz simulation and a 40 Hz render schedule keep costs bounded. No WebGL is required. Responsive controls have at least 44-pixel targets and separate portrait/landscape layouts.

`node tools/test.mjs` checks legal completion routes for all eight raids at three input cadences, idle behavior, invalid actions, exact partial continuation, terminal freeze, malformed save rejection and best-record idempotence. Native browser checks and layout evidence are recorded separately with delivery metadata. No physical handset or measured handset frame-rate claim is made. Browser tests do not establish a platform quality grade.

Files in tools/ are optional previews and checks; they are not needed by the game. License.txt covers the original implementation and original code-authored artwork/audio.
