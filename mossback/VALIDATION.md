# Living Lake refinement validation

Godot4.7.2 Compatibility Web export. Native QA:7742 checks,0 failures. Coverage includes bloom/wave expiry, save/malformed state, five UI layouts320x480/390x844/844x390/640x360/1280x720, minimum44px non-overlapping controls,short menus,pause/background lifecycle and Film.

The full78-second camera loop is sampled314 times across desktop and portrait. Checks cover finite transforms,minimum subject distance/height,forest corridor clearance,centered targets and loop continuity. In portrait,6123 projected hero-silhouette points are checked against screen margins, preventing the earlier right-side crop. Actual crown mesh AABBs plus wind clearance remain outside the roof/eave envelope. Duck-path samples avoid the shell and banks; live-detail instance counts are checked.

Local browser review includes portrait and landscape composition, ducks/lakefish/dragonflies/lotuses, soft directional shading, fine waterfall threads, Film and night. The local automation browser sampled45fps during local review, with about2ms script/process time and260–283k rendered primitives. This is not a physical-phone performance certification; device GPU/browser capability still matters. No captured warning/error logs at the reviewed stage. Final public evidence and export metadata are recorded in the local delivery log.

The archive is independently extracted/imported/tested/re-exported before publication. Content-hashed PCK avoids stale game assets; existing localStorage savekey retained. Single-threadWebGL2/WASM, no external art CDN or analytics. Film is a clean real-time viewer, not a video-file encoder.
