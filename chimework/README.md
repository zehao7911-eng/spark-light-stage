# Chimework

A small mobile HTML5 music-machine puzzle, built with actual open-source game mechanics. Serve this directory via HTTP and open index.html. No build process, backend, account, CDN or external assets. Requires WebGL and JavaScript. Run `node tests.mjs` for rules tests.

## Source and rights

Beatrix by Cong (2014), MIT: https://github.com/cxong/Beatrix at commit 059b74a3e9d9ec2bffee0a72ba8a53be107fe8b3. source-beat.js adapts Beat.updateBeat cardinal movement and the grid collision/bounce-direction assignment in GameState.moveBeatAndHitDrums. Fixed the original duplicated y-bound check to test x's upper bound too. Original beat.js, drum.js, main.js and graphics.js are included in upstream/ for comparison; LICENSE-BEATRIX.txt retained. This is a new puzzle campaign using those source routines, not a whole-engine port of Beatrix. Its Phaser build, samples, images, level data and branding are not used.

Bundled Three.js r147 is MIT; see vendor/THREE-LICENSE.txt. All new music-box models, ceramics, text textures, interface, particles and synthesized sounds are authored in code. No generated images, commercial game artwork, remote fonts, or sampled audio.

## Play

Tap a brass arrow to turn clockwise. PLAY sends one spark. Ring the numbered bells in order and reach the star. A wrong route allows unlimited retries. STOP cancels a rehearsal. Undo reverses a turn. The hint sets one wrong arrow correctly; an assisted finish gets one star. Unassisted finishes get two, or three within the minimum clockwise turns plus two. Rehearsals never cost stars. Twelve authored tunes across three material/color rooms, sequential unlocks, 36 best stars (repeat play never farms stars), and a replay/remix after the final tune. Remix changes initial arrows, not the authored topology.

Keyboard: arrows select a dial, Enter turns it, Space starts/stops, Escape opens/closes the pause menu. Sound starts muted; enable it with the music button. Bell order is also visible for silent play. All controls English, minimum44px targets, portrait/landscape layouts.

Save key chimework-v1. Directions, move count, hints, best stars and unlocks are saved after actions. Reload restarts the current rehearsal from its beginning with your arrangement intact; it does not resume midway through a note. Undo history is session-only. Storage denial leaves the current session playable. Blur/hidden/pause freeze animation and stop audio. Rendering capped40FPS, DPR1.5, bounded180particles/20audio voices, cached geometry/materials. Touch-size browser checks are not physical-handset performance certification.
