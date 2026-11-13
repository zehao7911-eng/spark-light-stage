# NIGHT FREQUENCY

An original relaxing analog-radio game. Tune lost stations, align the live signal, record nine original musical tapes and restore a late-night workbench. English UI, touch/keyboard controls, original synthesized music, local progress saves, no external network dependencies.

## Play

- Drag TUNE upward/right, or slide its track. Direction hints appear under the dial.
- A clearer wave and fuller signal meter indicate better reception. The dotted wave is the reference.
- At 88% reception, hold the setting briefly, then press RECORD. A recording needs 4–6 seconds of clear reception. If reception slips below 80%, recording pauses safely; tune again and continue.
- Tape 03 introduces GAIN (wave height), Tape 05 introduces PHASE (wave alignment), Tape 07 introduces LOW/HIGH noise filters.
- Each first recording rewards parts and unlocks the next station. Spend parts on a wider antenna tolerance, faster capstan or richer synthesized playback. Upgrades have three levels.
- Select any collected cassette to listen. NEXT SIGNAL finds the next unrecorded station. After all nine, new takes are available; this is a finite nine-station collection, not an infinite campaign.
- SOUND is optional and starts only on a user gesture. Visual wave and direction feedback support silent play. FIND SIGNAL is an optional assist, with no reward penalty.
- Keyboard: Tab to sliders; arrow keys adjust. M toggles sound, Escape pauses. Leaving the page pauses audio/simulation; resume explicitly.

## Echo calibration

ECHO TEST is an optional bonus game. Watch four numbered lamps, then tap the same pattern. Each completed round adds a note and gives 3 parts. A wrong note ends the run; TRY AGAIN restarts. Sound is optional and separate from the radio. The pattern works visually when muted.

## Echo calibration

ECHO TEST is an optional bonus game. Watch four numbered lamps, then tap the same pattern. Each completed round adds a note and gives 3 parts. A wrong note ends the run; TRY AGAIN restarts. Sound is optional and separate from the radio. The pattern works visually when muted.

## Running / packaging

Public: https://zehao7911-eng.github.io/spark-light-stage/night-frequency.html

Archive: https://zehao7911-eng.github.io/spark-light-stage/NIGHT-FREQUENCY.zip

All files are bundled. Open index.html or serve this folder with a static HTTP server. Progress uses localStorage and falls back to session-only play if storage is blocked. Extract the ZIP before opening. standalone.html also contains the full game in a single HTML file for offline use. No login, payment, advertising or network analytics.

## Reference and provenance

The Steam reference The Signal State (https://store.steampowered.com/app/1577620/The_Signal_State/) informed the tactile instruments and visible signal feedback. This game has simpler, original radio-restoration rules; it does not copy that game's programming puzzles, interface, assets or music.

The imported open-source-game-reference skill located Follow Me! A Simon Clone by Nambiar / Game Dolphin: https://github.com/gamedolphin/follow_me_JavaScript_simon_clone revision a2a2c22c2b1354672c181dc2e03bc8f87da5079c (README states MIT). Its complete four-pad memory game loop was ported as the optional ECHO TEST in source-echo.js: computer sequence playback, player input matching, growing sequence, score, failure/reset, and speed increase down to the original floor. Phaser timers and sprites were replaced by a deterministic clock and original instrument-panel presentation. The unchanged original Game.js and README are in upstream/, with MIT terms. Original graphics/audio, old boot code and social-sharing behavior are excluded. The radio-tuning campaign is original code; only the optional calibration game is this source adaptation.

Workshop image generated using builtin imagegen. Prompt and visual rules are in ART-DIRECTION.md. Main screen waves, meters, controls, tape mechanism and UI respond to actual state. The workshop background is decorative and static; it is not a simulated city. The nine melody sequences and all synthesized sound are original.

New code MIT; VT323 font SIL OFL (FONT-OFL.txt). See QA.md for tested scope. Browser-responsive checks do not constitute physical handset certification.
