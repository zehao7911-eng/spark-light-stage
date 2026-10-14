# Validation — Copper Meadow

Build date: October 14, 2026.

## GDScript checks

The actual Godot simulation completed ten minutes with 112 harvested crops, 12 sold biofuel batches and 654 coins, starting from 180 coins. A second instance loaded the JSON snapshot and produced the same subsequent coins, harvest count and fuel count. Checks also exercised pause, hire, motor upgrade, both expansions, greenhouse / hive placement, all twelve crops, one-time harvest rewards and reservation cleanup after plot removal. Separate late-content checks use explicitly supplied test currency; they are not presented as a complete ordinary playthrough.

## Browser interaction

The local Godot Web export loaded and ran in the Codex in-app Chromium browser. At 390 × 844, actual UI interactions placed a new bed, selected tomato for it, purchased a motor upgrade, hired a harvest specialist, opened harvest rewards, claimed a reward and paused the farm. Refresh retained the existing farm. A layout issue where Godot used the whole browser dimensions instead of the farm panel was fixed with a ResizeObserver and manual canvas sizing.

The final layout was checked at 320×667, 360×740, 390×844, 844×390, 1024×768 and 1280×720. A 320-pixel header overflow was found and fixed; the recheck showed no offscreen header controls and a document width of exactly 320 pixels. A button replacement issue during pointer interaction was fixed by deferring tray/modal rerenders until pointer release. Both available harvest rewards were then verified in state and disabled after claiming. A land expansion bought using ordinary accumulated income changed the farm from area 0 to area 1, and the paused save retained the crew, upgrade, extra bed and claims after refresh.

Public deployment checks are reported with the delivered links. This file records local validation. Browser viewport simulations are not physical Android or iPhone tests.
