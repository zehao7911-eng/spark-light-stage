# BRASS & BANNERS

A compact original Godot kingdom-building roguelite with permanent growth. Inspired by the placement, adjacency and automatic armies of 9 Kings (Steam app2784470). This is not the commercial game, an official port, or a reproduction of all its content. No extracted commercial art, code, branding, voices or music.

## Play
Select a building card, then tap an isometric plot; dragging a card onto a plot also works. Each year has two placements. A matching card upgrades its building up to level5. A different card REPLACES the existing building; the central keep cannot be replaced. Place strategically, then DEFEND. Space also advances the phase. Menus pause all combat.

Soldiers move, target enemies and fight automatically. Archers and the keep fire real homing bolts. Tap the battlefield to rally nearby soldiers: heal and shield them with a5.5second cooldown. A permanent Skyward Volley legacy upgrade adds area damage. Fields earn gold at the end of a victorious year. Forges strengthen adjacent troops, chapels increase adjacent troop health, mills improve adjacent field income. Orthogonal adjacency only. Windmills enter the deck in year3 and cavalry in year5. Every fifth year adds a giant. Enemy attack direction rotates.

Victories earn crowns and unlock the next year. Buy permanent treasury, veteran and volley improvements in Royal Legacy. A new dynasty retains crowns, upgrades, best year and lifetime victory count, while resetting the board, gold, health and current year. Every year fully replenishes the army; victories restore one keep health. Trade an unwanted selected card for2gold or reroll the three offers for2gold. DEFEND can start before using both placements.

There are eight building cards plus the keep, three5level permanent upgrades, four environmental palettes and continuing years with capped enemy count / stats. This is a smaller original interpretation of the core loop; it does not include the reference's nine monarch decks, full diplomacy, quests or multiplayer. It is active turn-based progression, not an offline idle economy.

## Saves and settings
Browser localStorage saves the exact board, hand, units, projectiles, RNG and active phase every4seconds and after actions. Refresh resumes interrupted combat without granting duplicate rewards. Hidden tabs and menus freeze combat. Manual pause persists. No offline battles or income. Sound and reduced effects can be toggled. Export provides a JSON backup; importing JSON is not provided in this version. Clearing browser/site data removes its save. No accounts, ads, purchases or network game services.

## Web hosting and source
Serve all exported files together over HTTP(S); file:// is unsupported. Single-thread Godot Web requires WebGL2 and WebAssembly. GitHub Pages needs no cross-origin-isolation headers. Initial engine download is about38MB uncompressed; connection speed affects first load.

Open godot-source/project.godot in Godot4.7.2 with official matching Web templates. Export Web to an empty output directory, then restore the portable loading/safe-area/lifecycle shell:

    python godot-source/tools/finish_web.py path/to/export/index.html

Tests:

    godot --headless --path godot-source --script qa.gd --quit-after 180
    godot --headless --path godot-source --script qa_ui.gd --quit-after 180

All gameplay, UI and isometric drawing use native GDScript. Original code-drawn pixel buildings, army sprites, terrain and synthesized WAVs. VT323 font distributed under SIL OFL (fonts/OFL.txt); Godot license notices accompany the Web export.
