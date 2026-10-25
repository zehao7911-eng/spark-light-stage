# Validation

- 14,939 assertions passed. Actual source directional scanners agree with independent eight-ray oracle on 4,200 random board/player cases across 4x4, 6x6 and 8x8. Includes horizontal/vertical/all diagonals and eight-ray simultaneous flip.
- 60 complete campaign duels simulated with a separate test player, including wins on every real duel stage, 62 forced passes, 13 losses and one draw. All 18 best stars attainable. Invalid moves, ended-state guard, undo, no-farming rewards and deterministic board/RNG continuation tested.
- Actual local browser, phone viewport390x844: First Friends won3stars, Meadow Picnic completed9-7 for3stars, flower crown unlocked/equipped, Waterlily Club completed35-1 for3stars with multi-ray flip4. Actual fourth garden Hint then placement/opponent/Undo returned to3-3 opening. Reload restored exact visible board, nine earned stars and selected flower crown, paused pending explicit Continue.
- Actual320x568: initial cell43.34px due scrollbar corrected; final cell45.59px and main bottom558.89 within568. All regular button targets >=44px. Actual844x390: all measured controls >=44px, no page overflow. Portrait390x844 and landscape844x390 inspected. No physical handset certification.
- Actual sound toggle, Help, map/outfit controls, next-stage navigation, pause and explicit Continue used. Blur/hidden handlers freeze turns and silence audio. A return-to-play delta based on wall time prevents lengthy artificial slow motion in a throttled browser frame host.
- Rendering: Canvas2D, local modules only, capped DPR1.5 and nominal40FPS, bounded160motes/16audio voices. No third-party runtime network assets. Transient animation settles on reload; saved logical board/turn/moves/assists/seed/history persist.
- Opening UI highlights a single +2 target. Original source code and full MIT license retained. Source license/commit/hashes in source-manifest.json. New artwork/audio are original procedural assets.

See outputs/puff-parade-test-results.json and public verification record outside the game folder for publication proof.
