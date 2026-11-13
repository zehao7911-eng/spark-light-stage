# Glanne Valley Railway

A portrait-first HTML5 port of Glanne Valley, the open-source Roblox railway by dreamer2664. The shipped map and rolling stock are exported from the repaired Studio project. The three original passenger stops are Grand Central, Glanne Viaduct Halt and Harbour Terminus.

Hold **Power**, release to coast and tap **Brake** to stop. After an overshoot, stop completely and use **Reverse** to line up with the platform marker. **Brake assist** is available in the pause menu. After a service, choose the return trip or replay. On desktop, use W or Up to apply power, Space or Down to brake, C to switch cameras and H for the horn.

The HTML5 implementation uses the original rail alignment, source part geometry and traction/braking formulas, with browser-specific materials, cameras, synthesized audio, touch controls, scoring and checkpoints. Both HTML entries contain all their own runtime dependencies and assets.

The editable Studio project is distributed separately with the original Luau source, models and their licenses. The web build takes the same place file as input. Use Lune to run export-map.luau with the place path and an output JSON path. Then run build.py with that JSON path to regenerate the two HTML entries and matching ZIP.

The GameWave import instructions are in GAMEWAVE-IMPORT.md.
