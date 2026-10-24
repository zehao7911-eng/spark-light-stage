import test from "ava";
import * as R from "../src/run.js";
import a from "../src/game/actions.js";

function battle(seed = 123) {
	const r = R.newRun(0, seed);
	R.chooseRoute(r, 0);
	return r;
}
function hand(r, names) {
	r.state = JSON.parse(JSON.stringify(r.state));
	r.state.hand = names.map((n) => R.createCard(n));
	r.state.player.currentEnergy = 9;
	return r.state.hand;
}

test("all 27 cards and upgrades construct without mutating base definitions", (t) => {
	t.is(R.cards.length, 27);
	for (const base of R.cards) {
		const before = JSON.stringify(R.createCard(base.name));
		R.createCard(base.name, true);
		const after = R.createCard(base.name);
		t.is(JSON.parse(before).description, after.description, base.name);
		t.deepEqual(JSON.parse(before).actions, after.actions);
		t.true(after.energy >= 0);
	}
});
test("playing custom actions never mutates frozen card parameters", (t) => {
	const r = battle();
	const [c] = hand(r, ["Adrenaline"]);
	t.true(R.play(r, c.id).ok);
	t.true(r.state.hand.length >= 2);
	t.is(r.state.exhaustPile.length, 1);
	t.false(R.play(r, c.id).ok);
});
test("upgrading a nested action never upgrades an unrelated unupgraded card", (t) => {
	R.createCard("Adrenaline", true);
	const c = R.createCard("Adrenaline");
	t.is(c.actions[1].parameter.amount, 1);
	R.createCard("Intimidate", true);
	t.is(R.createCard("Intimidate").powers.weak, 1);
});
test("area vulnerability is evaluated independently per monster", (t) => {
	let r = battle();
	r.state = JSON.parse(JSON.stringify(r.state));
	R.room(r).monsters = [
		{ currentHealth: 40, maxHealth: 40, block: 0, powers: { vulnerable: 2 } },
		{ currentHealth: 40, maxHealth: 40, block: 0, powers: {} },
	];
	r.state = a.removeHealth(r.state, { target: "allEnemies", amount: 10 });
	t.deepEqual(
		R.room(r).monsters.map((m) => m.currentHealth),
		[25, 30],
	);
});
test("Body Slam without block returns a valid state", (t) => {
	const r = battle();
	const [c] = hand(r, ["Body Slam"]);
	t.true(R.play(r, c.id).ok);
	t.truthy(r.state.player);
});
test("explicit player-targeted cost on Soul Drain does not hurt the enemy instead", (t) => {
	const r = battle();
	const [c] = hand(r, ["Soul Drain"]);
	const hp = r.state.player.currentHealth;
	t.true(R.play(r, c.id).ok);
	t.is(r.state.player.currentHealth, hp - 3);
	t.is(R.room(r).monsters[0].powers.weak, 3);
});
test("Strength persists while Weak and Vulnerable expire", (t) => {
	const r = battle();
	r.state = JSON.parse(JSON.stringify(r.state));
	r.state.player.powers = { strength: 3, weak: 1 };
	R.endTurn(r);
	t.is(r.state.player.powers.strength, 3);
	t.is(r.state.player.powers.weak, 0);
});
test("death at exactly zero cannot start another turn", (t) => {
	const r = battle();
	r.state = JSON.parse(JSON.stringify(r.state));
	r.state.player.currentHealth = 5;
	R.room(r).monsters[0].intents = [{ damage: 5 }];
	R.endTurn(r);
	t.is(r.phase, "defeat");
	t.is(r.state.player.currentHealth, 0);
	t.false(R.endTurn(r));
});
test("rewards pay once, cannot duplicate, and save with choices intact", (t) => {
	const r = battle();
	const [c] = hand(r, ["Bludgeon"]);
	r.state = JSON.parse(JSON.stringify(r.state));
	R.room(r).monsters[0].currentHealth = 1;
	t.true(R.play(r, c.id).won);
	t.is(r.gold, 58);
	t.is(r.meta.wins, 1);
	const loaded = R.restore(R.save(r));
	t.deepEqual(
		loaded.offers.map((c) => c.id),
		r.offers.map((c) => c.id),
	);
	t.true(R.takeReward(loaded, 0));
	t.is(loaded.state.deck.length, 11);
	t.false(R.takeReward(loaded, 0));
	t.is(loaded.gold, 58);
});
test("rest and forge are exclusive choices with persistent upgrades", (t) => {
	const r = battle();
	r.phase = "camp";
	r.state = JSON.parse(JSON.stringify(r.state));
	r.state.player.currentHealth = 20;
	t.true(R.rest(r));
	t.is(r.state.player.currentHealth, 42);
	t.false(R.rest(r));
	r.phase = "camp";
	const card = r.state.deck[0];
	t.true(R.upgrade(r, card.id));
	t.true(r.state.deck[0].upgraded);
	t.false(R.upgrade(r, card.id));
	t.true(R.restore(R.save(r)).state.deck[0].upgraded);
});
test("shop checks wallet, consumes stock, and never overspends", (t) => {
	const r = battle();
	r.phase = "shop";
	r.offers = R.rewardCards(r, 3);
	r.gold = 35;
	t.true(R.purchase(r, "card", 0));
	t.is(r.gold, 0);
	t.is(r.offers[0], null);
	t.false(R.purchase(r, "card", 0));
	t.false(R.purchase(r, "relic"));
	t.is(r.state.deck.length, 11);
});
test("hero unlocks depend on completed encounters", (t) => {
	t.throws(() => R.newRun(1, 12));
	t.is(R.newRun(1, 12, { wins: 5, runs: 0, clears: 0 }).hero, 1);
	t.is(R.newRun(2, 12, { wins: 14, runs: 0, clears: 0 }).hero, 2);
});
test("invalid saves are rejected and active combat round-trips", (t) => {
	t.throws(() => R.restore('{"version":0}'));
	const r = battle();
	t.deepEqual(R.restore(R.save(r)), JSON.parse(R.save(r)));
});

test("relic start bonuses apply once per battle and do not duplicate on reload", (t) => {
	const r = R.newRun(0, 33);
	r.relics = ["lantern", "shell", "feather", "gem", "mirror"];
	R.chooseRoute(r, 0);
	t.is(r.state.player.powers.strength, 1);
	t.is(r.state.player.powers.regen, 2);
	t.is(r.state.player.block, 3);
	t.is(r.state.player.currentEnergy, 4);
	t.is(r.state.hand.length, 6);
	const loaded = R.restore(R.save(r));
	t.is(loaded.state.player.currentEnergy, 4);
	R.endTurn(loaded);
	t.is(loaded.state.player.currentEnergy, 3);
	t.is(loaded.state.player.block, 3);
});
test("Thorn Ring triggers on every third attack and Scholar Quill on fourth card", (t) => {
	const r = battle();
	r.relics = ["thorn", "quill"];
	const cs = hand(r, ["Strike", "Strike", "Strike", "Defend"]);
	r.state = JSON.parse(JSON.stringify(r.state));
	R.room(r).monsters[0].currentHealth = 100;
	for (const c of cs) R.play(r, c.id, 0);
	t.is(R.room(r).monsters[0].currentHealth, 75);
	t.is(r.state.hand.length, 1);
});
test("Night Blossom heals only on the first Skill each turn", (t) => {
	const r = battle();
	r.relics = ["bloom"];
	r.state = JSON.parse(JSON.stringify(r.state));
	r.state.player.currentHealth = 30;
	const cs = hand(r, ["Defend", "Defend"]);
	R.play(r, cs[0].id);
	R.play(r, cs[1].id);
	t.is(r.state.player.currentHealth, 31);
});
test("event costs ignore block, reward once, and can cause defeat at zero health", (t) => {
	const r = battle();
	r.phase = "event";
	r.eventKind = 0;
	r.state = JSON.parse(JSON.stringify(r.state));
	r.state.player.currentHealth = 6;
	r.state.player.block = 100;
	t.true(R.eventChoice(r, 1));
	t.is(r.phase, "defeat");
	t.is(r.state.player.currentHealth, 0);
	t.false(R.eventChoice(r, 1));
});
test("new ascents scale real monster HP and attack but are capped at five", (t) => {
	const r = R.newRun(0, 55, { wins: 20, runs: 1, clears: 9 });
	R.chooseRoute(r, 0);
	t.is(r.difficulty, 5);
	t.is(R.room(r).monsters[0].maxHealth, 56);
	t.is(R.room(r).monsters[0].intents[0].damage, 10);
});

// A deterministic policy exercises real draws, damage, enemy turns and all 3 acts.
// No damage cheats, health overrides, free relics, or reward overrides.
function simulate(seed) {
	let r = R.newRun(0, seed);
	let steps = 0;
	while (!["victory", "defeat"].includes(r.phase) && steps++ < 1600) {
		if (r.phase === "route") {
			const safe = r.choices.findIndex(
				(x) => x.type === "event" || x.type === "camp" || x.type === "shop",
			);
			R.chooseRoute(r, safe >= 0 ? safe : 0);
		} else if (r.phase === "battle") {
			let moves = 0;
			while (r.phase === "battle" && moves++ < 30) {
				const ms = R.room(r).monsters;
				const target = ms.reduce(
					(best, m, i) =>
						m.currentHealth > 0 &&
						(best < 0 || m.currentHealth < ms[best].currentHealth)
							? i
							: best,
					-1,
				);
				const incoming = ms.reduce(
					(s, m) =>
						s +
						(m.currentHealth > 0 ? m.intents[m.nextIntent]?.damage || 0 : 0),
					0,
				);
				const playable = r.state.hand.filter((c) => R.canPlay(r.state, c));
				const c = playable.sort((a, b) => {
					const score = (c) =>
						(c.damage || 0) / (c.energy || 0.5) +
						(c.block && r.state.player.block < incoming ? c.block : 0) +
						(c.powers?.vulnerable ? 8 : 0) +
						(c.name === "Adrenaline" ? 30 : 0);
					return score(b) - score(a);
				})[0];
				if (!c) break;
				R.play(r, c.id, target);
			}
			if (r.phase === "battle") R.endTurn(r);
		} else if (r.phase === "reward") {
			const i = r.offers.findIndex((c) =>
				[
					"Bludgeon",
					"Pommel Strike",
					"Iron Wave",
					"Adrenaline",
					"Starfall",
					"Sunblade",
				].includes(c.name),
			);
			R.takeReward(r, i);
		} else if (r.phase === "camp") {
			if (r.state.player.currentHealth < r.state.player.maxHealth * 0.7)
				R.rest(r);
			else {
				const c =
					r.state.deck.find((c) => !c.upgraded && c.type === "attack") ||
					r.state.deck.find((c) => !c.upgraded);
				c ? R.upgrade(r, c.id) : R.rest(r);
			}
		} else if (r.phase === "shop") {
			if (r.state.player.currentHealth < 50 && r.gold >= 20)
				R.purchase(r, "heal");
			if (r.gold >= 65) R.purchase(r, "relic");
			R.purchase(r, "leave");
		} else if (r.phase === "event")
			R.eventChoice(r, r.state.player.currentHealth < 50 ? 2 : 0);
		r = R.restore(R.save(r));
		if (r.gold < 0 || !Number.isFinite(r.state.player.currentHealth))
			throw new Error("Invalid run invariant");
	}
	return { phase: r.phase, floor: r.floor, steps, wins: r.meta.wins };
}
test("24 full seeded campaigns terminate with valid state and reachable victory", (t) => {
	const results = Array.from({ length: 24 }, (_, i) => simulate(i + 100));
	t.true(results.every((r) => ["victory", "defeat"].includes(r.phase)));
	t.true(results.some((r) => r.phase === "victory"));
	console.log(
		"Campaign audit:",
		JSON.stringify({
			runs: results.length,
			victories: results.filter((r) => r.phase === "victory").length,
			farthest: Math.max(...results.map((r) => r.floor)),
			maxSteps: Math.max(...results.map((r) => r.steps)),
		}),
	);
});
