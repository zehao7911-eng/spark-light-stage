# Solstice Vale

An original, compact pixel JRPG for browsers. The visual and combat reference is **Sea of Stars** by Sabotage Studio: layered pixel environments, warm/cool lighting, visible encounters, typed enemy locks, timed hits and party synergy. This is a new short adventure with original generated artwork and code, not the commercial game or its assets. It does not claim a current monthly Steam chart position. Official reference: https://store.steampowered.com/app/1244090/Sea_of_Stars/

## Play

Tap the ground to walk, or use WASD / arrow keys. Tap a chest, plant, shrine, creature or exit marker: the travelers walk to it and interact. Gather berries, herbs and gold before moving on. There are twelve waypoints across three regions; each fourth waypoint contains a guardian. Clear the encounter to open the next path.

In battle, tap a creature to target it. Blade restores one light; Sun and Moon cost two. Match an attack to the symbols above a creature to remove its locks. Removing all locks interrupts its charged attack and adds damage. The number beside its locks counts down to its next strike. The guardian gains a new lock pattern below half health.

Choose an attack, then tap **Strike** when the moving light enters the gold zone. The button turns gold during the generous perfect window. A mistimed attack still works. Enemy attacks use the same timing for **Guard**. Perfect moments fill three links; Eclipse spends them to hit every creature and remove all remaining locks. Soup restores party health. Space also activates the timing button. Settings includes optional timing assist, which lands perfect hits/guards automatically; it does not choose your attacks.

Camp fully restores party health. Spend gold on the blade, staff or coat, each with four upgrades. Cook soup from two berries and one herb. Each region's guardian rewards a choice of persistent charm. Gold, XP, levels, ingredients, waypoint mastery stars and a discovery journal reward progress. Defeat returns to camp without deleting your treasures or upgrades. Complete the observatory to see the ending; New Moon keeps gear and charms while increasing encounter strength for another journey.

## Artwork and delivery

Four separately generated, mutually referenced atlases: main environments (four coherent rooms), additional paths (four companion scenes), cast (two travelers and two creature species, four poses each), and objects (guardian, treasure, harvest, shrine, rewards and equipment). Same palette, lighting and camera specification across all batches. Assets use lossless WebP encoding, verified to preserve every original RGBA pixel, resolution and alpha; source rectangles are selected during rendering. No commercial game assets are bundled. The complete built-in image generation prompt set is in ART-DIRECTION.json.

All UI and documentation are English. No external runtime, CDN, font or API dependency. Serve this folder on any static host; index.html is at the ZIP root. The initial three artwork sheets total approximately 5.4 MB; the additional 3.0 MB scenery atlas preloads after startup. Local browser storage saves the journey; no account is required. Optional gentle procedural chime music and action sounds start after interaction. Artwork has a 20-second load timeout and visible retry. Menus and hidden pages pause gameplay. Responsive portrait / landscape controls, keyboard support, reduced-motion effects, bounded particles, and capped rendering resolution are included.

## Scope

A focused single-player adventure: three environment regions with seven distinct adventure scenes plus camp, twelve encounters, three guardian battles, two party members, two normal enemy species, one guardian species, five combat actions, six charm types and New Moon replay. It is not an open-world RPG. Responsive browser viewport checks are not a physical handset performance certification.
