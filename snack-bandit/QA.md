SNACK BANDIT — QA, 2026-10-26

- 1,831 rule assertions: all nine maps independently grid-reachable; full nine objective/win sequences with guards disabled for path isolation; steal events, cooldown, cover/LOS, damage invulnerability, distraction, terminal immutability, invalid-save rejection, deterministic restoration.
- Separate patrol simulation: every guard completes every segment in all nine nights over two simulated minutes. Fixed the eighth map's patrol crossing a stall.
- Actual browser keyboard-controlled first and ninth nights completed with full snacks, cookie and no damage. Controller reads state for route planning but supplies real keyboard events; it does not inject positions, inventory or wins. Later-night entry was selected through local QA to isolate that map.
- Actual native touch drag stole a snack; release, dash and cooldown checked. Pause freezes simulation and, after CSS transition settles, screenshots. Reload retains the stolen snack, player position and cooldown. Fixed a title-screen save that initially erased active-run data.
- First clear unlocks next night and flower outfit; next-night, map, retry and wardrobe flows checked. Replays use best stars, not an accumulating currency.
- Four representative nights at 320x568, 390x844 and 844x390. Visible button dimensions/in-bounds assertions pass; corrected narrow landscape header buttons to 44px. DPR3 emulation caps drawing at 1.5.
- Cold file:// loading with denied localStorage remains playable, with zero HTTP dependencies. Asset load failure has Retry. Page errors empty in browser runs.
- Completion feedback now plays briefly on stage before the result card. Rewards are saved at the terminal win event, before that presentation delay. Cover cones are clipped by the same rectangular stalls used by sight logic.

Limitations: no physical-device performance or audio-speaker quality certification. Artwork is handcrafted vector illustration, not a claim of identical fidelity to the supplied commercial-quality video examples. Campaign contains nine authored nights, not infinite unique stages.
