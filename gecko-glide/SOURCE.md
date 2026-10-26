# Source provenance and adaptation

Original complete game: PIN CLIMB, by ABA Games (2021).

- Official repository: https://github.com/abagames/crisp-game-lib-games
- Pinned commit: cfb39d2f988feb5918eb83697145b5a35adabf58
- Original file: docs/pinclimb/main.js
- Original bytes are preserved in upstream/pinclimb.js, with SHA256 in upstream/manifest.json.
- License: full MIT text in LICENSE-ABA.txt. The same MIT terms apply to the new code and original illustrations contributed for this adaptation.
- Discovery: the installed open-source-game-reference catalog's 111 one-button games entry, then the official source repository. This game is intentionally small; it is not a claim of adapting all 111 projects or the entire crisp-game-lib engine.

## Complete game loop used

The **entire original** title/description/character/options declarations, cord/pin state and update() function are adapted, not isolated physics formulas. Actual runtime calls update() each 60Hz model step. All original gameplay blocks remain: initialization, camera scrolling, press detection, hold-growth/release-easing, cord rotation, collision-line construction, anchor-height failure, pin movement and line-contact choice, distance score/grip reset, old-pin cleanup and seeded pin spawning.

The compatibility runtime supplies V/vec, rnd, line/box collision, remove, play, addScore, end and color. Presentation uses the resulting real cord/pin geometry. Old library BGM/replay flags are left as provenance declarations and are replaced by the new UI/audio/save facilities; original library replay/BGM are not features of this release.

## Explicit changes

- Original square 100-unit camera becomes a portrait 100x150 model view; anchor scroll target80→124, loss98→146, cleanup102→152.
- Original lone initial pin is replaced with six reachable starting branches.
- Hold growth multiplier .65; extension capped at44; angular increment .036 rather than .05. Release's original .1 easing toward length7 remains.
- Contact only switches to a pin at least4 units higher, preventing backward grab loops.
- Full original pin-spawning loop remains; seeded rnd selects new authored lane patterns and spacing. Additional red thorns do not replace required safe pins.
- Optional thorn collisions cost a heart, retract the vine, interrupt the chain and briefly protect it. Three thorn hits lose. Original rising-anchor failure remains.
- Original distance score is multiplied by the capped current chain; complete stage heights and three-star/cosmetic progression are new.
- New deterministic snapshots, validation, mobile touch/keyboard controls, pause, offline embedded illustrations and feedback replace the original engine-facing presentation.

Source videos are quality references only; none are redistributed. No unrelated scripts, private recordings or credentials are packaged.
