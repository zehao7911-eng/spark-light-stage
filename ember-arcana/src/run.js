import actions from "./game/actions.js";
import { createCard } from "./game/cards.js";
import { cards, cardUpgrades } from "./content/cards.js";
import { Monster } from "./game/monster.js";
import { canPlay } from "./game/conditions.js";

export const VERSION = 1;
export const TITLES = ["Verdant Ruins", "The Brass Archive", "Crown of Embers"];
export const HEROES = [
	{
		name: "Warden",
		art: 0,
		unlock: 0,
		desc: "Balanced steel & shelter",
		deck: [
			"Strike",
			"Strike",
			"Strike",
			"Defend",
			"Defend",
			"Defend",
			"Bash",
			"Iron Wave",
			"Pommel Strike",
			"Adrenaline",
		],
	},
	{
		name: "Oracle",
		art: 6,
		unlock: 5,
		desc: "Weaken, expose, outwit",
		deck: [
			"Strike",
			"Strike",
			"Defend",
			"Defend",
			"Defend",
			"Sucker Punch",
			"Thunderclap",
			"Terror",
			"Quickstep",
			"Recall",
		],
	},
	{
		name: "Stagkeeper",
		art: 8,
		unlock: 14,
		desc: "Turn protection into power",
		deck: [
			"Defend",
			"Defend",
			"Defend",
			"Defend",
			"Body Slam",
			"Body Slam",
			"Iron Wave",
			"Bash",
			"Kindling",
			"Bulwark",
		],
	},
];
const extra = [
	{
		name: "Kindling",
		energy: 0,
		type: "skill",
		target: "player",
		powers: { strength: 2 },
		exhaust: true,
		description: "Gain 2 Strength this fight. Exhaust.",
	},
	{
		name: "Starfall",
		energy: 2,
		type: "attack",
		target: "allEnemies",
		damage: 10,
		powers: { vulnerable: 1 },
		description: "10 damage and 1 Vulnerable to all foes.",
	},
	{
		name: "Bulwark",
		energy: 2,
		type: "skill",
		target: "player",
		block: 14,
		actions: [{ type: "drawCards", parameter: { amount: 1 } }],
		description: "Gain 14 Block. Draw 1.",
	},
	{
		name: "Quickstep",
		energy: 0,
		type: "skill",
		target: "player",
		block: 3,
		exhaust: true,
		actions: [{ type: "drawCards", parameter: { amount: 1 } }],
		description: "Gain 3 Block. Draw 1. Exhaust.",
	},
	{
		name: "Sunblade",
		energy: 1,
		type: "attack",
		target: "enemy",
		damage: 7,
		powers: { vulnerable: 1 },
		description: "7 damage. Apply 1 Vulnerable.",
	},
	{
		name: "Recall",
		energy: 1,
		type: "skill",
		target: "player",
		actions: [{ type: "drawCards", parameter: { amount: 3 } }],
		description: "Draw 3 cards.",
	},
];
for (const c of extra) {
	cards.push(c);
	cardUpgrades[c.name] = (v) => ({
		...v,
		energy: Math.max(0, v.energy - 1),
		block: v.energy === 0 ? (v.block || 0) + 3 : v.block,
		description:
			v.energy === 0
				? v.description + " Gain 3 extra Block."
				: v.description + " Costs 1 less.",
	});
}
export const NAMES = {
	"Summer of Sam": "Second Wind",
	Succube: "Soulfire",
	"Voodoo Gift": "Hex Harvest",
	"Mask of the Faceless": "Borrowed Spark",
	Flourish: "Wild Bloom",
	"Ritual Rain": "Clear Skies",
};
export const label = (c) =>
	(NAMES[c.name.replace("+", "")] || c.name.replace("+", "")) +
	(c.upgraded ? "+" : "");
export const RELICS = [
	{
		id: "lantern",
		name: "Amber Lantern",
		icon: "sun",
		text: "Start each fight with 1 Strength.",
	},
	{
		id: "shell",
		name: "Jade Shell",
		icon: "shield",
		text: "Start every turn with 3 Block.",
	},
	{
		id: "thorn",
		name: "Thorn Ring",
		icon: "burst",
		text: "Every third Attack deals 4 extra damage.",
	},
	{
		id: "feather",
		name: "Swift Feather",
		icon: "feather",
		text: "Draw an extra card at combat start.",
	},
	{
		id: "vial",
		name: "Dew Vial",
		icon: "drop",
		text: "Heal 3 after each victory.",
	},
	{
		id: "coin",
		name: "Old Sovereign",
		icon: "coin",
		text: "Earn 8 extra gold per victory.",
	},
	{
		id: "gem",
		name: "Sun Crystal",
		icon: "gem",
		text: "One extra Energy on your first turn.",
	},
	{
		id: "bloom",
		name: "Night Blossom",
		icon: "flower",
		text: "The first Skill each turn heals 1.",
	},
	{
		id: "mirror",
		name: "Brass Mirror",
		icon: "eye",
		text: "Start each fight with 2 Regen.",
	},
	{
		id: "crown",
		name: "Ashen Crown",
		icon: "crown",
		text: "Gain 1 Strength after each victory.",
	},
	{
		id: "heart",
		name: "Warm Heart",
		icon: "heart",
		text: "Increase maximum Health by 10.",
	},
	{
		id: "quill",
		name: "Scholar Quill",
		icon: "quill",
		text: "Every fourth card draws 1.",
	},
];
export function rng(r) {
	let a = r.seed | 0;
	a ^= a << 13;
	a ^= a >>> 17;
	a ^= a << 5;
	r.seed = a >>> 0;
	return r.seed / 4294967296;
}
function pick(r, list) {
	return list[Math.floor(rng(r) * list.length)];
}
export const room = (r) => r.state.dungeon.graph[r.state.dungeon.y][0].room;
export const alive = (r) =>
	room(r).monsters?.filter((m) => m.currentHealth > 0) || [];
export const has = (r, id) => r.relics.includes(id);
export const EVENTS = [
	{
		title: "The wishing well",
		copy: "The water remembers every traveller.",
		options: [
			{
				name: "Take a gift",
				text: "+25 gold",
				icon: "coin",
				kind: "gold",
				amount: 25,
			},
			{
				name: "Make a wish",
				text: "New card · lose 6 Health",
				icon: "eye",
				kind: "card",
				cost: 6,
			},
			{
				name: "Rest awhile",
				text: "Heal 10 Health",
				icon: "flower",
				kind: "heal",
				amount: 10,
			},
		],
	},
	{
		title: "The sleeping smith",
		copy: "A forgotten forge is still warm.",
		options: [
			{
				name: "Stoke the coals",
				text: "Upgrade a card · lose 8 Health",
				icon: "sun",
				kind: "upgrade",
				cost: 8,
			},
			{
				name: "Find spare brass",
				text: "+20 gold",
				icon: "coin",
				kind: "gold",
				amount: 20,
			},
			{
				name: "Warm your hands",
				text: "Heal 8 Health",
				icon: "heart",
				kind: "heal",
				amount: 8,
			},
		],
	},
	{
		title: "A star in a bottle",
		copy: "A tiny constellation flickers in the glass.",
		options: [
			{
				name: "Catch a spark",
				text: "New card · lose 4 Health",
				icon: "gem",
				kind: "card",
				cost: 4,
			},
			{
				name: "Follow its light",
				text: "+18 gold",
				icon: "coin",
				kind: "gold",
				amount: 18,
			},
			{
				name: "Let it shine",
				text: "Heal 12 Health",
				icon: "flower",
				kind: "heal",
				amount: 12,
			},
		],
	},
	{
		title: "The unmarked altar",
		copy: "Something ancient waits for an offering.",
		options: [
			{
				name: "Offer an ember",
				text: "New relic · lose 10 Health",
				icon: "crown",
				kind: "relic",
				cost: 10,
			},
			{
				name: "Leave in peace",
				text: "Heal 6 Health",
				icon: "drop",
				kind: "heal",
				amount: 6,
			},
			{
				name: "Gather old coins",
				text: "+15 gold",
				icon: "coin",
				kind: "gold",
				amount: 15,
			},
		],
	},
];
export const currentEvent = (r) => EVENTS[r.eventKind || 0];
export const chapter = (r) =>
	Math.min(2, Math.floor((Math.max(1, r.floor) - 1) / 7));
export function newRun(
	hero = 0,
	seed = Date.now(),
	meta = { wins: 0, runs: 0, clears: 0 },
) {
	if (!HEROES[hero] || meta.wins < HEROES[hero].unlock)
		throw new Error("Hero locked");
	let s = actions.createNewState();
	s = actions.setDeck(s, { cardNames: HEROES[hero].deck });
	s = JSON.parse(JSON.stringify(s));
	s.dungeon = {
		x: 0,
		y: 0,
		graph: [[{ room: { type: "start" }, edges: [] }]],
		paths: [],
		pathTaken: [[0, 0]],
	};
	s = JSON.parse(JSON.stringify(s));
	const r = {
		version: VERSION,
		difficulty: Math.min(5, meta.clears || 0),
		seed: seed >>> 0 || 12345,
		state: s,
		hero,
		floor: 0,
		phase: "route",
		gold: 40,
		relics: ["lantern"],
		meta: { ...meta, runs: meta.runs + 1 },
		unlocked: Math.min(27, 15 + Math.floor(meta.wins / 2)),
		attackCount: 0,
		cardCount: 0,
		skillUsed: false,
		choices: [],
		offers: [],
		log: "Choose your first path.",
		rewardGold: 0,
		crownStrength: 0,
	};
	r.choices = routes(r);
	return r;
}
export function routes(r) {
	const f = r.floor + 1;
	const local = ((f - 1) % 7) + 1;
	if (local === 7)
		return [
			{ type: "boss", name: "The Gatekeeper", detail: "Boss · relic reward" },
		];
	if (local === 4)
		return [
			{ type: "camp", name: "A Quiet Flame", detail: "Heal or upgrade a card" },
		];
	if (local === 6)
		return [
			{
				type: "shop",
				name: "The Wandering Market",
				detail: "Spend gold on your build",
			},
			{ type: "battle", name: "The Long Way", detail: "Battle · card reward" },
		];
	if (local === 3)
		return [
			{
				type: "elite",
				name: "A Greater Shadow",
				detail: "Elite · relic & gold",
			},
			{ type: "event", name: "The Wishing Well", detail: "A quiet discovery" },
		];
	return [
		{
			type: "battle",
			name: pick(r, [
				"Lantern Crossing",
				"The Overgrown Stair",
				"Broken Constellations",
			]),
			detail: "Battle · choose a card",
		},
		{
			type: local === 1 ? "battle" : "event",
			name: local === 1 ? "The Mossy Passage" : "The Sealed Shrine",
			detail: local === 1 ? "Battle · choose a card" : "A choice awaits",
		},
	];
}
const species = [
	["Lantern Slime", 1],
	["Hollow Sprout", 2],
	["Moon Moth", 3],
	["Moss Golem", 4],
	["Brass Watcher", 5],
	["Orbit Wraith", 6],
	["Spore Witch", 7],
	["Ashen Stag", 8],
];
function monsters(r, type) {
	const a = chapter(r),
		local = ((r.floor - 1) % 7) + 1;
	const count = type === "boss" ? 1 : local >= 3 && type !== "elite" ? 2 : 1;
	return Array.from({ length: count }, (_, i) => {
		const [name, art] =
			type === "boss"
				? [
						["Cathedral Sentinel", 9],
						["Eclipse Engine", 10],
						["Crowned Serpent", 11],
					][a]
				: pick(r, species.slice(a * 2, Math.min(8, 4 + a * 2)));
		const hp =
			type === "boss"
				? 78 + a * 32
				: type === "elite"
					? 44 + a * 15
					: count === 2
						? 23 + a * 12
						: 26 + a * 15;
		const d =
			type === "boss" ? 11 + a * 3 : 5 + a * 3 + (type === "elite" ? 3 : 0);
		const m = Monster({
			name,
			hp: hp + (r.difficulty || 0) * 6,
			intents: [
				{ damage: d + (r.difficulty || 0) },
				{ block: 5 + a * 2, damage: Math.max(3, d - 2) + (r.difficulty || 0) },
				{ weak: 1 },
				{ damage: d + 5 + (r.difficulty || 0) },
			],
		});
		m.art = art;
		return m;
	});
}
export function chooseRoute(r, index) {
	if (r.phase !== "route") return false;
	const choice = r.choices[index];
	if (!choice) return false;
	r.floor++;
	const type = choice.type;
	r.state = JSON.parse(JSON.stringify(r.state));
	const rm =
		type === "battle" || type === "elite" || type === "boss"
			? { type: "monster", kind: type, monsters: monsters(r, type) }
			: { type: "campfire", kind: type };
	r.state.dungeon.graph.push([{ room: rm, edges: [] }]);
	r.state = actions.move(r.state, { move: { x: 0, y: r.floor } });
	r.state = JSON.parse(JSON.stringify(r.state));
	r.state.turn = 1;
	r.attackCount = 0;
	r.cardCount = 0;
	r.skillUsed = false;
	r.phase =
		type === "battle" || type === "elite" || type === "boss" ? "battle" : type;
	if (r.phase === "event") {
		const choices = [0, 1, 2, 3].filter((i) => i !== r.lastEvent);
		r.eventKind = pick(r, choices);
		r.lastEvent = r.eventKind;
	}
	r.log = choice.name;
	if (r.phase === "battle") {
		r.state.player.powers.strength =
			(has(r, "lantern") ? 1 : 0) + r.crownStrength;
		if (has(r, "mirror")) r.state.player.powers.regen = 2;
		if (has(r, "shell")) r.state.player.block = 3;
		if (has(r, "gem")) r.state.player.currentEnergy++;
		if (has(r, "feather")) r.state = actions.drawCards(r.state, { amount: 1 });
	} else if (r.phase === "shop") r.offers = rewardCards(r, 3);
	return true;
}
export function rewardCards(r, n) {
	let pool = cards
		.slice(0, r.unlocked)
		.filter((c) => !["Defend", "Strike"].includes(c.name));
	const out = [];
	while (out.length < n && pool.length) {
		let i = Math.floor(rng(r) * pool.length);
		out.push(createCard(pool.splice(i, 1)[0].name));
	}
	return out;
}
function finishFight(r) {
	if (alive(r).length) return false;
	r.rewardGold =
		18 +
		chapter(r) * 8 +
		(room(r).kind === "elite" ? 18 : 0) +
		(room(r).kind === "boss" ? 30 : 0) +
		(has(r, "coin") ? 8 : 0);
	r.gold += r.rewardGold;
	r.meta.wins++;
	r.unlocked = Math.min(cards.length, 15 + Math.floor(r.meta.wins / 2));
	if (has(r, "vial"))
		r.state = actions.addHealth(r.state, { target: "player", amount: 3 });
	if (has(r, "crown")) r.crownStrength++;
	r.offers = rewardCards(r, 3);
	r.phase = "reward";
	r.log = "Encounter cleared";
	if (room(r).kind !== "battle") {
		const relic = pick(
			r,
			RELICS.filter((x) => !has(r, x.id)),
		);
		if (relic) {
			r.relics.push(relic.id);
			r.rewardRelic = relic.id;
			if (relic.id === "heart") {
				r.state = JSON.parse(JSON.stringify(r.state));
				r.state.player.maxHealth += 10;
				r.state.player.currentHealth += 10;
			}
		}
	}
	return true;
}
export function play(r, id, target = 0) {
	if (r.phase !== "battle") return { ok: false };
	const c = r.state.hand.find((x) => x.id === id);
	if (!c || !canPlay(r.state, c))
		return { ok: false, reason: "Not enough Energy or card condition unmet" };
	if (c.target !== "player" && !room(r).monsters[target]?.currentHealth)
		return { ok: false };
	if (c.target !== "player" && room(r).monsters[target].currentHealth <= 0)
		return { ok: false };
	const before = JSON.parse(JSON.stringify(r.state));
	r.state = actions.playCard(r.state, {
		card: c,
		target: c.target === "player" ? "player" : `enemy${target}`,
	});
	r.cardCount++;
	if (c.type === "attack") r.attackCount++;
	if (
		has(r, "thorn") &&
		c.type === "attack" &&
		r.attackCount % 3 === 0 &&
		alive(r).length
	) {
		const i = room(r).monsters.findIndex((m) => m.currentHealth > 0);
		r.state = actions.removeHealth(r.state, { target: `enemy${i}`, amount: 4 });
	}
	if (has(r, "quill") && r.cardCount % 4 === 0)
		r.state = actions.drawCards(r.state, { amount: 1 });
	if (has(r, "bloom") && c.type === "skill" && !r.skillUsed) {
		r.state = actions.addHealth(r.state, { target: "player", amount: 1 });
		r.skillUsed = true;
	}
	r.log = label(c);
	const won = finishFight(r);
	return { ok: true, before, card: c, won };
}
export function endTurn(r) {
	if (r.phase !== "battle") return false;
	r.state = actions.endTurn(r.state);
	r.skillUsed = false;
	if (r.state.player.currentHealth <= 0) {
		r.phase = "defeat";
		r.log = "Your embers endure.";
		return true;
	}
	if (has(r, "shell")) {
		r.state = JSON.parse(JSON.stringify(r.state));
		r.state.player.block += 3;
	}
	r.log = "Your turn";
	return true;
}
export function takeReward(r, index) {
	if (r.phase !== "reward") return false;
	if (index >= 0) {
		const c = r.offers[index];
		if (!c) return false;
		r.state = actions.addCardToDeck(r.state, { card: c });
	}
	r.offers = [];
	r.rewardRelic = null;
	if (r.floor === 21) {
		r.phase = "victory";
		r.meta.clears++;
		r.log = "The sun rises again.";
		return true;
	}
	r.phase = "route";
	r.choices = routes(r);
	return true;
}
function leave(r) {
	r.phase = "route";
	r.choices = routes(r);
	return true;
}
export function rest(r) {
	if (r.phase !== "camp") return false;
	r.state = actions.addHealth(r.state, {
		target: "player",
		amount: Math.ceil(r.state.player.maxHealth * 0.3),
	});
	return leave(r);
}
export function upgrade(r, id) {
	if (r.phase !== "camp") return false;
	const c = r.state.deck.find((c) => c.id === id && !c.upgraded);
	if (!c) return false;
	r.state = actions.upgradeCard(r.state, { card: c });
	return leave(r);
}
export function purchase(r, type, index) {
	if (r.phase !== "shop") return false;
	if (type === "leave") return leave(r);
	if (
		type === "heal" &&
		r.gold >= 20 &&
		r.state.player.currentHealth < r.state.player.maxHealth
	) {
		r.gold -= 20;
		r.state = actions.addHealth(r.state, { target: "player", amount: 20 });
		return true;
	}
	if (type === "card" && r.gold >= 35 && r.offers[index]) {
		r.gold -= 35;
		r.state = actions.addCardToDeck(r.state, { card: r.offers[index] });
		r.offers[index] = null;
		return true;
	}
	if (type === "relic" && r.gold >= 65) {
		const rel = pick(
			r,
			RELICS.filter((x) => !has(r, x.id)),
		);
		if (!rel) return false;
		r.gold -= 65;
		r.relics.push(rel.id);
		if (rel.id === "heart") {
			r.state = JSON.parse(JSON.stringify(r.state));
			r.state.player.maxHealth += 10;
			r.state.player.currentHealth += 10;
		}
		return true;
	}
	if (type === "remove" && r.gold >= 25 && r.state.deck.length > 5) {
		const c = r.state.deck[index];
		if (!c) return false;
		r.gold -= 25;
		r.state = actions.removeCard(r.state, { card: c });
		return true;
	}
	return false;
}
export function eventChoice(r, index) {
	if (r.phase !== "event") return false;
	const option = currentEvent(r).options[index];
	if (!option) return false;
	if (option.kind === "gold") r.gold += option.amount;
	if (option.kind === "heal")
		r.state = actions.addHealth(r.state, {
			target: "player",
			amount: option.amount,
		});
	if (option.kind === "card")
		r.state = actions.addCardToDeck(r.state, { card: rewardCards(r, 1)[0] });
	if (option.kind === "upgrade") {
		const pool = r.state.deck.filter((c) => !c.upgraded);
		if (pool.length)
			r.state = actions.upgradeCard(r.state, { card: pick(r, pool) });
		else r.gold += 20;
	}
	if (option.kind === "relic") {
		const relic = pick(
			r,
			RELICS.filter((x) => !has(r, x.id)),
		);
		if (relic) {
			r.relics.push(relic.id);
			if (relic.id === "heart") {
				r.state = JSON.parse(JSON.stringify(r.state));
				r.state.player.maxHealth += 10;
				r.state.player.currentHealth += 10;
			}
		} else r.gold += 35;
	}
	if (option.cost) {
		r.state = JSON.parse(JSON.stringify(r.state));
		r.state.player.currentHealth = Math.max(
			0,
			r.state.player.currentHealth - option.cost,
		);
		if (r.state.player.currentHealth <= 0) {
			r.phase = "defeat";
			return true;
		}
	}
	r.log = option.name;
	return leave(r);
}
export function save(r) {
	return JSON.stringify(r);
}
export function restore(text) {
	const r = JSON.parse(text);
	if (
		r.version !== VERSION ||
		!r.state?.player ||
		!Array.isArray(r.state.deck) ||
		![
			"route",
			"battle",
			"reward",
			"camp",
			"shop",
			"event",
			"defeat",
			"victory",
		].includes(r.phase)
	)
		throw new Error("Invalid save");
	return r;
}
export { cards, createCard, canPlay };
