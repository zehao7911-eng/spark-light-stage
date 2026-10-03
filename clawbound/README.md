# Clawbound

A compact HTML5 physical claw machine dungeon crawler, inspired by Dungeon Clawler. Art is redrawn in SVG/canvas; this is not the original game or its complete content.

## Play

Drag the claw above a toy, then press GRAB. Caught toys fall into the chute and resolve in order. Weapons damage enemies, shields absorb attacks, and potions restore health. Enemies attack after your grabs run out. Tap an enemy to choose your target. SHAKE rearranges the pile twice per encounter.

Win a toy, visit a workshop or camp, and build combinations using 16 item types and eight relics. Three bosses guard floors 5, 10 and 15; clear the dungeon to continue in endless mode. Item upgrades have three levels. The deck is capped at 40 toys to keep the physical simulation bounded on mobile; full-deck rewards replace the oldest basic Coin, or oldest toy if there is none.

## Run

Open index.html directly: the packaged entry is self-contained, requires no CDN and works offline. Editable CSS/JS, the local Matter.js library and its MIT license are also included. All UI is English. Touch, mouse and keyboard are supported; arrows aim, Space grabs, Escape opens the menu.

The last completed turn/choice is saved locally. Reloading during a grab restores the previous stable state. New run replaces the saved expedition. Sound starts after a gesture and can be muted.

## Verification

Automated Edge browser touch simulation completed a 15-floor expedition with 107 grabs and all three bosses, then entered endless mode. Workshop purchases, upgrades, removal, poison victory, defeat/restart, saved rewards and coin bonuses were tested. Portrait 360×740 and 390×844, landscape 844×390, and desktop 1280×800 were checked. These are browser simulations, not physical-device tests.

## Reference and dependencies

Reference: https://store.steampowered.com/app/2356780/Dungeon_Clawler/
Matter.js 0.20.0: https://github.com/liabru/matter-js — MIT; see vendor/MATTER-LICENSE.txt.
