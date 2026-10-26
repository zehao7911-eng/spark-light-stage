# Verification

- Model tests: all six main rooms won with regular movement plus sneeze input. Room results (broken, bells, max chain, score): (26,2,26,5155), (19,1,19,3675), (25,3,25,4635), (25,3,25,4715), (22,2,21,4115), (22,2,21,4155).
- Deterministic mid-motion save/reload matched after 120 further steps; invalid save rejected; repeat awards do not accumulate; initial sneeze breaks at least three pots; cooldown prevents immediate repeat; movement stays bounded.
- Real browser play at 390 x 844: drag changed the dragon position, keyboard/Space produced 6-piece opening chain, then actual first-room win: 3280 points, 2/3 bells, 13-piece best chain, two stars. Next button opened Jade Courtyard with changed layout, colors and painting. Workshop selector showed the earned Sunbeam souvenir. Pause displayed resume/restart, reload preserved room and stars.
- Desktop rendering inspected at 1280 x 720. Browser viewport testing is not physical iOS/Android hardware testing.
- Cover, icon and mural artwork inspected. All runtime dependencies local. No service worker cache, no remote module CDN, no required account or analytics.
- Rezona reference visually played: Bull In a China Shop, https://rezona.ai/game/pgcserver/pv/yAvUQpTy/v21/dist/index.html . Observed damage $5125 and chain x8. Used only for public visual/interaction inspiration. New source, characters, pottery, rooms and no-timer progression are original.

Public native first-action smoke: 3 pottery, one bell and 310 points. Fixed gold-bell FX to retain its original small nonuniform scale while fading; ceramic fragment scale remains independent.
