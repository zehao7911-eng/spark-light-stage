# Tidelight Salvage — implementation target

## Intended experience

An active incremental salvage game. Start with a weak cutting tool, develop area coverage, unlock a beam and explosive chains, recruit autonomous drones, then clear entire wrecks in satisfying bursts. Salvage exposes a detailed wreck underneath the debris. Finds go to a visible harbor collection and generate idle income. Original art and fiction; no copied Steam assets.

## Content and loop

- Six authored biomes: Sunlit Shoals, Copper Canyon, Moonlit Archive, Frozen Signal, Ember Vault, Sunken Beacon.
- Two distinct salvage fields per biome; twelve illustrated relics.
- Each field contains normal silt, tougher metal, explosive pressure canisters, valuable crystals, and a relic chest.
- Hold/drag to cut. Coins accrue immediately; their attraction animation is feedback, not a condition for credit.
- Purchase upgrades during exploration. Power, rate and reach improve the tool; beam, chain reactions, drones and sonar introduce new behaviors.
- Unlock the next field by recovering the relic and clearing 92% of the field. At 92%, remaining debris is collected automatically so there is no tedious final-pixel search.
- Harbor displays found relics, working equipment, walking visitors and restoration of the lighthouse.
- Finish the twelve-field expedition to relight the beacon. A new deepwater expedition preserves the collection and offers a permanent recovery bonus, scaled rewards and new field layouts.
- Previously discovered fields can be replayed for resources without losing forward progress.

## Interface and feedback

One-finger hold/drag. No timed failure or health management. Progress strip and two resources. Four quick controls: sonar, workshop, harbor, charts. Large upgrade cards with current/next effect, cost and dependency; locked upgrades still explain what to obtain. Distinct cut, crystal, chain, unlock and treasure audio. Dust, fractures, particles, gold attraction, depth fog, light shafts, swimming wildlife and robot animation. Reduced effects/audio settings. UI in English only.

## Validation

Use the same model for gameplay and deterministic progression testing. Run a full simulated expedition with real cut/upgrade/clear rules, record milestones and economy, then interact with the browser using touch input. Check save/resume, replay/return, offline-income cap, purchasing without enough resources, dependency gating, pulse cooldown, drone automation, final expedition completion, portraits/landscape and artifact archive integrity. Inspect screenshots before publishing.
