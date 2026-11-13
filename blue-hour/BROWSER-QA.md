# Native browser QA

- PASS: at 390 x 844, the original ticket fills the portrait camera; each scratch panel measured about 141 x 77 CSS pixels.
- PASS: two real horizontal pointer drags removed only the upper half of the first coating. A reload and Continue restored exactly that visible half-scratched state.
- PASS: two further real drags peeled the remaining coating, revealed ORANGE and awarded 3 gold. The progress bar changed from 0/6 to 1/6.
- PASS: keyboard Enter on the remaining panels completed a ticket and enabled NEXT TICKET; three matching oranges and the first collection badge paid their bonuses.
- PASS: the phone's orange order reached 3/3, paid 40 gold, and replaced itself with an incomplete new order.
- PASS: Brush level 1 cost 24 gold (134 -> 110); Speed level 1 cost 38 (110 -> 72), enabling Sweep on the next ticket.
- PASS: Sweep revealed one panel and disabled itself until the next ticket.
- PASS: three completed tickets unlocked POSTCARD PICNIC. Its selection persisted through reload.
- PASS: the collection showed the twelve slots, find counts, gold frame and gated future packs.
- PASS: 844 x 390 landscape framed all six panels with a separate control rail. Its canvas measured about 309 x 265 and the navigation stayed visible.
- PASS: 1200 x 900 desktop retained the full approved desk, red phone, merchandise sidebar and upgraded cyan workshop.

Rules tests simulated 2,800 completed tickets across 70 seeds, plus partial masks, one-time settlement, save validation, upgrade effects, phone claim gates and pack gates. Asset QA checks exact PNG-to-WebP pixels, true atlas alpha, local resources, English copy and runtime wiring.

These are native browser viewport checks, not physical phone hardware benchmarks.
