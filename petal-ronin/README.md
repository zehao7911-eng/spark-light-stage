# Petal Ronin

An original, compact turn-based garden duel, inspired by the positioning and attack timing of Shogun Showdown (https://store.steampowered.com/app/2084000/Shogun_Showdown/). Original code, illustrated paper-theatre characters and scenery; no copied commercial art, code or generated images. This is a small original browser interpretation, not a reproduction of that game's deckbuilding campaign.

## Play

Open index.html directly or serve this folder on any static host. All assets are included; no build or network required.

- Left/right buttons or horizontal swipes step one tile. Masks get one turn after every valid action. Invalid actions do not advance the world.
- GOLD outlined tiles mean an enemy is winding up. RED tiles are its committed next strike. Move out before the next action, or interrupt the attacker.
- CUT hits one adjacent mask and cancels its current action. BOW hits the nearest mask within three tiles, then rests for three other actions. Ties prefer the direction of your last step or shot. The small aim arc marks Cut's target.
- WAIT lets enemies act while you remain still. Committed attacks hit their marked tiles rather than following you. Enemies can hit each other. At most one heart is lost per action.
- Undo (up to 40 steps) is free, including after falling. A finished chapter cannot be undone; replay from the journal instead.
- Eight authored chapters contain one to three waves, four mask types, two-range spears and a four-heart keeper. New waves avoid spawning on occupied tiles.
- Once all masks are cleared, finish with Done or walk to collect the remaining leaves. A clear earns one star, keeping all hearts adds one, and collecting all three leaves adds one. Best results per chapter cap at 24; Maple coat unlocks at six, Wisteria at fifteen.
- Keyboard: arrows/A D move; Space cuts; E shoots; W waits; Z undoes; Escape pauses. Actions are discrete; holding a key does not repeat turns.

There is no timer or payment. The garden waits for your next action. Undo allows experimentation without restarting. Each new chapter starts with full hearts.

## Technical notes

p5.js 1.11.11, LGPL-2.1 (P5-LICENSE.txt). Canvas 2D, original layered code-drawn art, 45fps render, capped DPR1.5, max three live opponents, 180 transient effects, bounded synthesized audio. Model changes only on valid actions; a short animation prevents duplicate accidental actions. Exact active chapter, enemy telegraphs, cooldown, leaves and undo history save locally. Reload opens paused and clears gestures. Animation interpolation, petals and temporary effects are not saved. Pausing/hidden/blur freezes the visual clock and silences audio. Sound starts after a user gesture; mute persists. Storage failures do not block play but disable persistence.

Portrait and landscape layouts, 44-pixel controls and safe-area insets. Browser phone/touch emulation is not physical handset testing.
