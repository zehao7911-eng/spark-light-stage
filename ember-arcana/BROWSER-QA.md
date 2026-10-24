# Browser verification

Tested with the ChatGPT in-app Chromium browser using actual page controls, not debug game-state calls.

## Local gameplay

- Started the Warden, selected a route, entered a Lantern Slime encounter at 26 HP.
- Pommel Strike plus the Lantern's Strength dealt 10, reducing it to 16. Defend gained 5 Block. Strike dealt 7, leaving 9. Energy reduced correctly.
- End Turn absorbed the announced 5 damage: Health remained 72, Block reset, hand refreshed and Energy returned to 3. The next intent displayed attack 3 plus block 5.
- Bash dealt 9, won the encounter, and awarded 18 gold, wallet 40 to 58.
- Reloaded before claiming the reward. The same three reward options remained and no duplicate gold was awarded.
- Selected Cleave. The deck increased to 11. A discovery added 25 gold. Another discovery traded 4 Health for Body Slam, taking Health to 68 and deck to 12.
- At the campfire chose Reforge and upgraded one Strike. Opening the deck later showed Strike+ at 9 damage while the other Strikes remained at 6.
- Continued to a two-foe fight and verified separate target buttons and visible intents.
- Horizontal hand scrolling works. A partially offscreen native AX click could not resolve a target; horizontal scrolling and the visible card control worked, with no gameplay error.

## Responsive checks

- 390 × 844: portrait stage, English interface, horizontal cards, Energy and End Turn visible.
- 320 × 740: no horizontal document overflow; card rows scroll within the playmat. Header controls 44 × 44, deck button at least 44 high, enemy targets around 95 × 195. Very narrow screens can scroll vertically.
- 844 × 390: no horizontal document overflow; vertically scrollable content.
- Desktop 1280 × 720: compact-height layout reviewed.

No physical iOS or Android hardware certification is implied. Asset bytes and hosted gameplay are checked separately during delivery. Two upstream tests remain skipped and three remain TODO; all 111 executable automated tests passed.
