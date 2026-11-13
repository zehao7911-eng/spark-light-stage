# Validation

Godot4.7.2 native QA:629 checks,0 failures. Full two-lap simulation of all3circuits,boost and energy decisions,medals/best times,one-time reward,gate history,course frame continuity,locked selection,collision cooldown,purchase costs,free re-equipping of owned liveries,JSON deterministic continuation,malformed save rejection and pause freeze. GUI layouts320x568/390x844/844x390/1280x720 cover44px buttons,nonoverlap and short-screen card bounds. Deferred native button signal emission verifies purchase and UI rebuild without freeing the signal emitter.

Actual browser play completed ATOLL35.1889s,JADE38.3778s andVIOLET40.3000s,with1/2/1medals respectively. Actual pointer swipe changed lane; Boost changed speed,energy and trail/FOV. Route unlocks,credits,engine upgrades and paint purchase/save were observed through ordinary controls. These runs are not the perfect simulated autopilot runs.

A GUI event deletion bug was found during actual clicking: synchronous button signals freed their source while rebuilding the UI and caused WebAssembly failure. All rebuilding button actions now use CONNECT_DEFERRED; a fresh-tab replay and purchase checks cover the repaired build. Other fixes: numeric gate IDs after JSON restore,narrow labels,vector icons in place of missing glyphs,precise slim HUD bars,paused initial scene rendering and compact landscape result cards.

A paused live race at2.87777777777777s and41.5679012345678distance reloaded with the same time/distance,engine2,coins4 and owned paint preserved. Browser sampled45fps with roughly45–50draw calls,83kprimitives and2–7ms process time in desktop viewport emulation; no physical-handset frame-rate guarantee. Final public/export/archive evidence is in the local delivery log.
