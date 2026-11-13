import * as R from "./run.js";
const $ = (s) => document.querySelector(s);
const KEY = "ember-arcana-run-v1",
	META = "ember-arcana-meta-v1";
let run = null,
	selected = null,
	chosenHero = 0,
	busy = false,
	audio = null,
	sound = false,
	storageOK = true;
let meta = { wins: 0, runs: 0, clears: 0 };
try {
	meta = { ...meta, ...JSON.parse(localStorage.getItem(META) || "{}") };
	const s = localStorage.getItem(KEY);
	if (s) run = R.restore(s);
} catch {
	storageOK = false;
}
const dialog = $("#dialog");
const escape = (s) =>
	String(s).replace(
		/[&<>"']/g,
		(c) =>
			({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
				c
			],
	);
const patterns = {
	sword: [
		"0000000000011000",
		"0000000000111100",
		"0000000001111100",
		"0000000011111000",
		"0000000111110000",
		"0000001111100000",
		"0000011111000000",
		"0000111110000000",
		"0011111100000000",
		"0001111000000000",
		"0001111100000000",
		"0011000110000000",
		"0110000000000000",
	],
	shield: [
		"00111111111100",
		"01111111111110",
		"01111001111110",
		"01111001111110",
		"01100000011110",
		"01111001111110",
		"01111001111110",
		"00111001111100",
		"00111111111100",
		"00011111111000",
		"00001111110000",
		"00000111100000",
		"00000011000000",
	],
	sun: [
		"00000011000000",
		"00100011000100",
		"00010011001000",
		"00001111110000",
		"00111111111100",
		"11111100111111",
		"00111000011100",
		"00111000011100",
		"11111100111111",
		"00111111111100",
		"00001111110000",
		"00010011001000",
		"00100011000100",
		"00000011000000",
	],
	heart: [
		"001110011100",
		"011111111110",
		"111111111111",
		"111111111111",
		"011111111110",
		"001111111100",
		"000111111000",
		"000011110000",
		"000001100000",
	],
	coin: [
		"000111111000",
		"001111111100",
		"011110011110",
		"111100001111",
		"111001100111",
		"111001100111",
		"111100001111",
		"011110011110",
		"001111111100",
		"000111111000",
	],
	gem: [
		"000011110000",
		"001111111100",
		"011111111110",
		"111111111111",
		"011110011110",
		"001110011100",
		"000110011000",
		"000011110000",
		"000001100000",
	],
	eye: [
		"00001111110000",
		"00111111111100",
		"01111000011110",
		"11110011001111",
		"01110011001110",
		"00111111111100",
		"00001111110000",
	],
	drop: [
		"000001100000",
		"000011110000",
		"000011110000",
		"000111111000",
		"001111111100",
		"011111111110",
		"111111111111",
		"111110011111",
		"011110011110",
		"001111111100",
		"000111111000",
	],
	flower: [
		"000011110000",
		"001111111100",
		"001100001100",
		"111101101111",
		"111001100111",
		"001100001100",
		"001111111100",
		"000011110000",
		"000001100000",
		"001101101100",
		"000111111000",
		"000001100000",
	],
	crown: [
		"110001100011",
		"110011110011",
		"111111111111",
		"011111111110",
		"011111111110",
		"001111111100",
		"001111111100",
	],
	burst: [
		"10000001000001",
		"01000011100010",
		"00100111100100",
		"00011111111000",
		"01111100111110",
		"11111000011111",
		"01111100111110",
		"00011111111000",
		"00100111100100",
		"01000011100010",
		"10000001000001",
	],
	feather: [
		"000000111100",
		"000011111100",
		"000111111100",
		"001111111000",
		"011111110000",
		"011111100000",
		"001111000000",
		"000110000000",
		"001100000000",
		"011000000000",
	],
	quill: [
		"000000111100",
		"000011111100",
		"000111111000",
		"001111110000",
		"001111100000",
		"000111000000",
		"001110000000",
		"011000000000",
	],
};
const iconCache = {};
function iconURL(name, color = "#e4bc72") {
	const key = name + color;
	if (iconCache[key]) return iconCache[key];
	const c = document.createElement("canvas");
	c.width = c.height = 20;
	const x = c.getContext("2d");
	const p = patterns[name] || patterns.sun;
	const ox = Math.floor((20 - p[0].length) / 2),
		oy = Math.floor((20 - p.length) / 2);
	p.forEach((row, y) =>
		[...row].forEach((v, i) => {
			if (v === "1") {
				x.fillStyle = "#172e35";
				x.fillRect(ox + i + 1, oy + y + 1, 1, 1);
				x.fillStyle = color;
				x.fillRect(ox + i, oy + y, 1, 1);
			}
		}),
	);
	return (iconCache[key] = c.toDataURL());
}
function icon(n, size = 24, color) {
	return `<img alt="" width="${size}" height="${size}" style="image-rendering:pixelated;vertical-align:middle" src="${iconURL(n, color)}">`;
}
function sprite(art, cls = "") {
	return `<div class="sprite ${cls}" style="background-position:${((art % 4) * 100) / 3}% ${Math.floor(art / 4) * 50}%" aria-hidden="true"></div>`;
}
function cardArt(c) {
	const cv = document.createElement("canvas");
	cv.width = 96;
	cv.height = 56;
	const x = cv.getContext("2d");
	if (cardIllustrations.complete && cardIllustrations.naturalWidth) {
		const base = c.name.replace("+", "");
		const order = R.cards.findIndex((v) => v.name === base);
		const map = [
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 19, 16, 17, 18, 19,
			20, 21, 22, 23, 24, 25,
		];
		const index = map[Math.max(0, order)];
		const w = cardIllustrations.naturalWidth / 6,
			h = cardIllustrations.naturalHeight / 5;
		x.imageSmoothingEnabled = false;
		x.drawImage(
			cardIllustrations,
			(index % 6) * w + 2,
			Math.floor(index / 6) * h + 2,
			w - 4,
			h - 4,
			0,
			0,
			96,
			56,
		);
		return cv.toDataURL();
	}
	const atk = c.type === "attack",
		main = atk ? "#eabf7a" : "#b3d8bd",
		base = atk ? "#614746" : "#254c51";
	x.fillStyle = base;
	x.fillRect(0, 0, 96, 56);
	x.fillStyle = atk ? "#80634d" : "#336260";
	for (let y = 0; y < 56; y += 8)
		for (let i = 0; i < 96; i += 8) {
			if ((i + y) % 24 === 0) x.fillRect(i, y, 6, 2);
		}
	const k = c.name.split("").reduce((v, a) => v + a.charCodeAt(0), 0);
	x.fillStyle = atk ? "#9a7c58" : "#58887b";
	for (let i = 0; i < 6; i++) {
		const t = (i * 19 + k) % 88;
		x.fillRect(t, 5 + i * 8, 2, 2);
	}
	const p =
		patterns[
			c.block
				? "shield"
				: c.damage
					? "sword"
					: c.powers?.regen
						? "flower"
						: c.powers?.vulnerable
							? "eye"
							: "sun"
		];
	const scale = 2,
		ox = 48 - p[0].length,
		oy = 28 - p.length;
	x.fillStyle = "#142f35";
	x.fillRect(ox - 6, oy - 4, p[0].length * 2 + 12, p.length * 2 + 8);
	p.forEach((row, y) =>
		[...row].forEach((v, i) => {
			if (v === "1") {
				x.fillStyle = main;
				x.fillRect(ox + i * scale, oy + y * scale, scale, scale);
			}
		}),
	);
	x.fillStyle = "#d1b87a";
	x.fillRect(3, 3, 8, 1);
	x.fillRect(3, 3, 1, 8);
	x.fillRect(85, 52, 8, 1);
	x.fillRect(92, 45, 1, 8);
	return cv.toDataURL();
}
const artCache = new Map();
const cardIllustrations = new Image();
cardIllustrations.onload = () => {
	artCache.clear();
	document.querySelectorAll("img.cardpic[data-card]").forEach((img) => {
		const c = R.cards.find((c) => c.name === img.dataset.card);
		if (c) img.src = cardArt(c);
	});
};
cardIllustrations.src = "cards.webp";
function cardHTML(c, action = "select", index = "") {
	let art = artCache.get(c.name);
	if (!art) {
		art = cardArt(c);
		artCache.set(c.name, art);
	}
	const playable = !run || R.canPlay(run.state, c),
		sel = selected === c.id;
	return `<button class="card ${c.type} ${c.upgraded ? "upgraded" : ""} ${action === "select" && !playable ? "unplayable" : ""} ${sel ? "selected" : ""}" data-action="${action}" data-id="${c.id}" data-index="${index}" aria-label="${escape(`${R.label(c)}. Cost ${c.energy}. ${c.description}`)}" aria-pressed="${sel}"><span class="cost">${c.energy}</span><span class="cardname">${escape(R.label(c))}</span><img class="cardpic" data-card="${escape(c.name.replace("+", ""))}" src="${art}" alt=""><span class="type">${c.type.toUpperCase()}${c.target === "allEnemies" ? " · ALL" : ""}</span><span class="description">${escape(c.description)}</span></button>`;
}
function toast(text) {
	$("#toast").textContent = text;
	$("#toast").classList.add("show");
	clearTimeout(toast.timer);
	toast.timer = setTimeout(() => $("#toast").classList.remove("show"), 2700);
}
function persist() {
	if (!run) return;
	meta = run.meta;
	try {
		localStorage.setItem(KEY, R.save(run));
		localStorage.setItem(META, JSON.stringify(meta));
	} catch {
		if (storageOK)
			toast("Storage unavailable. Keep this tab open to retain your journey.");
		storageOK = false;
	}
}
function tone(type) {
	if (!sound) return;
	try {
		audio ??= new (window.AudioContext || window.webkitAudioContext)();
		audio.resume();
		const now = audio.currentTime;
		const notes =
			type === "win"
				? [392, 494, 587, 784]
				: type === "shield"
					? [196, 294]
					: type === "hit"
						? [130, 65]
						: type === "card"
							? [523, 659]
							: [392];
		notes.forEach((f, i) => {
			const o = audio.createOscillator(),
				g = audio.createGain();
			o.type = type === "hit" ? "triangle" : "sine";
			o.frequency.setValueAtTime(f, now + i * 0.055);
			g.gain.setValueAtTime(0.0001, now + i * 0.055);
			g.gain.exponentialRampToValueAtTime(0.07, now + i * 0.055 + 0.008);
			g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.055 + 0.28);
			o.connect(g);
			g.connect(audio.destination);
			o.start(now + i * 0.055);
			o.stop(now + i * 0.055 + 0.3);
		});
	} catch {
		sound = false;
	}
}
function powers(p) {
	return Object.entries(p || {})
		.filter(([, v]) => v > 0)
		.map(
			([k, v]) =>
				`<span title="${k === "vulnerable" ? "Vulnerable: take 50% more damage" : k === "weak" ? "Weak: deal 25% less damage" : k === "strength" ? "Strength: extra attack damage" : "Regen: heal at end of turn"}">${icon(k === "weak" ? "feather" : k === "vulnerable" ? "eye" : k === "strength" ? "sword" : "flower", 16)}${v}</span>`,
		)
		.join("");
}
function render(open = true) {
	$("#arena").dataset.act = String(run ? R.chapter(run) : 0);
	const p = run?.state.player || { currentHealth: 72, maxHealth: 72, block: 0 };
	$("#stats").innerHTML =
		`<div class="stat heart">${icon("heart", 26, "#e18e7e")}<span>${Math.max(0, p.currentHealth)}<small> / ${p.maxHealth}</small></span></div><div class="stat gold">${icon("coin", 25)}<span>${run?.gold ?? 40}</span></div><button class="deck-button" data-action="deck" aria-label="View your deck">▤ ${run?.state.deck.length || 10}</button>`;
	$("#relics").innerHTML = (run?.relics || ["lantern"])
		.map((id) => {
			const a = R.RELICS.find((x) => x.id === id);
			return `<button data-action="relic" data-id="${id}" aria-label="${a.name}: ${a.text}" title="${a.text}">${icon(a.icon, 28)}</button>`;
		})
		.join("");
	$("#progress").textContent = run
		? `ACT ${R.chapter(run) + 1} / 3 · ${Math.max(0, ((run.floor - 1) % 7) + 1)} / 7`
		: "THE FIRST SPARK";
	$("#chapter-name").textContent =
		R.TITLES[run ? R.chapter(run) : 0].toUpperCase();
	$("#floor-label").textContent =
		run?.phase === "battle"
			? `${R.room(run).kind.toUpperCase()} · TURN ${run.state.turn}`
			: "A FORGOTTEN SUN AWAITS";
	$("#arena").style.backgroundPosition =
		run && R.chapter(run) === 1 ? "62% 50%" : "50% 57%";
	const monsters = run ? R.room(run).monsters : [];
	const hero = R.HEROES[run?.hero || 0];
	$("#combatants").innerHTML =
		`<div class="hero"><div class="statusline">${p.block ? `<span>${icon("shield", 17)}${p.block}</span>` : ""}${powers(p.powers)}</div>${sprite(hero.art)}<span class="hero-name">${hero.name}</span></div><div class="enemies">${(
			monsters || []
		)
			.map((m, i) => {
				const intent = m.intents[m.nextIntent || 0],
					dmg = m.powers.weak
						? Math.floor((intent.damage || 0) * 0.75)
						: intent.damage;
				return `<button class="enemy ${m.currentHealth <= 0 ? "dead" : ""} ${selected ? "targetable" : ""} ${run && R.room(run).kind === "boss" ? "boss" : ""}" data-action="enemy" data-index="${i}" aria-label="${escape(m.name)}. ${Math.max(0, m.currentHealth)} health. Next: ${dmg ? `attack ${dmg}` : ""}${intent.block ? ` block ${intent.block}` : ""}${intent.weak ? " apply Weak" : ""}${intent.vulnerable ? " apply Vulnerable" : ""}"><span class="intent ${intent.damage ? "attack" : ""}">${dmg ? `${icon("sword", 20, "#f0ac81")} ${dmg}` : ""}${intent.block ? `${icon("shield", 20, "#9bcfbd")} ${intent.block}` : ""}${intent.weak ? `${icon("feather", 20)} ${intent.weak}` : ""}${intent.vulnerable ? `${icon("eye", 20)} ${intent.vulnerable}` : ""}${Object.keys(intent).length ? "" : "…"}</span>${sprite(m.art ?? 1)}<span class="enemy-name">${escape(m.name)}</span><span class="hpbar"><i style="width:${Math.max(0, (m.currentHealth / m.maxHealth) * 100)}%"></i></span><span class="hptext">${Math.max(0, m.currentHealth)} / ${m.maxHealth}${m.block ? ` · ◇ ${m.block}` : ""}</span><span class="statusline">${powers(m.powers)}</span></button>`;
			})
			.join("")}</div>`;
	$("#caption").textContent =
		run?.log || "A little ember. An impossible climb.";
	const battle = run?.phase === "battle";
	$("#hand").innerHTML = battle
		? run.state.hand.map((c) => cardHTML(c)).join("")
		: `<div class="battle-empty"><span class="sigil">✦</span><span>${run?.phase === "reward" ? "A new possibility, in every card." : "Every journey begins with a single spark."}</span><button data-action="continue" class="primary">${run ? "CONTINUE" : "BEGIN JOURNEY"} →</button></div>`;
	const energy = run?.state.player.currentEnergy || 0;
	$("#energy").innerHTML =
		[0, 1, 2]
			.map((i) => `<i class="energy-orb ${energy > i ? "" : "empty"}"></i>`)
			.join("") + `<span class="energy-count">${energy} / 3</span>`;
	$("#end-turn").disabled = !battle || busy;
	$("#hint").textContent = battle
		? selected
			? "Tap an enemy to play this card."
			: "Tap a card. Read the enemy intent."
		: run?.phase === "reward"
			? "Choose one card for your deck."
			: "A small choice. A new possibility.";
	$("#pile-count").textContent = battle
		? `▤ ${run.state.drawPile.length}   ↺ ${run.state.discardPile.length}`
		: "";
	if (open && run && run.phase !== "battle") phaseModal();
}
function modal(kicker, title, copy, body, closable = false) {
	$("#dialog-content").innerHTML =
		`<div class="modal-head"><div><span class="modal-kicker">${kicker}</span><h2 class="modal-title">${title}</h2></div>${closable ? '<button data-action="close" aria-label="Close">×</button>' : ""}</div>${copy ? `<p class="modal-copy">${copy}</p>` : ""}${body}`;
	if (!dialog.open) dialog.showModal();
}
function hide() {
	if (dialog.open) dialog.close();
}
const pathDots = () =>
	`<div class="journey-path">${Array.from({ length: 7 }, (_, i) => `<span class="path-dot ${i < (run.floor % 7) ? "passed" : ""} ${i === run.floor % 7 ? "now" : ""}"></span>`).join("")}</div>`;
function phaseModal() {
	selected = null;
	if (!run) return welcome();
	const phase = run.phase;
	if (phase === "route")
		modal(
			`ACT ${Math.floor(run.floor / 7) + 1} · ${R.TITLES[Math.min(2, Math.floor(run.floor / 7))].toUpperCase()}`,
			"Choose your path",
			"Gold, cards, and curious things await.",
			pathDots() +
				`<div class="choices">${run.choices.map((c, i) => `<button class="choice" data-action="route" data-index="${i}"><span class="large-icon">${icon(c.type === "battle" ? "sword" : c.type === "boss" ? "crown" : c.type === "elite" ? "burst" : c.type === "camp" ? "sun" : c.type === "shop" ? "coin" : "eye", 45)}</span><h3>${c.name}</h3><small>${c.detail}</small></button>`).join("")}</div>`,
		);
	else if (phase === "reward") {
		const rel = R.RELICS.find((x) => x.id === run.rewardRelic);
		modal(
			"VICTORY",
			`+${run.rewardGold} GOLD`,
			"Take one card. Shape your next encounter.",
			`${rel ? `<div class="notice">${icon(rel.icon, 26)} ${rel.name} acquired · ${rel.text}</div>` : ""}<div class="choices">${run.offers.map((c, i) => cardHTML(c, "reward", i)).join("")}</div><div class="modal-actions"><button data-action="reward" data-index="-1">Skip card →</button><button data-action="codex">▤ Codex ${run.unlocked} / ${R.cards.length}</button></div>`,
		);
		tone("win");
	} else if (phase === "camp")
		modal(
			"SANCTUARY",
			"A quiet flame",
			"Rest, or make one card stronger.",
			`<div class="choices"><button class="choice" data-action="rest"><span class="large-icon">${icon("heart", 44)}</span><h3>Rest</h3><small>Heal ${Math.ceil(run.state.player.maxHealth * 0.3)} Health</small></button><button class="choice" data-action="forge"><span class="large-icon">${icon("sun", 44)}</span><h3>Reforge</h3><small>Upgrade one card</small></button></div>`,
		);
	else if (phase === "event") {
		const ev = R.currentEvent(run);
		modal(
			"A DISCOVERY",
			ev.title,
			ev.copy,
			`<div class="choices">${ev.options.map((o, i) => `<button class="choice" data-action="event" data-index="${i}">${icon(o.icon, 44)}<h3>${o.name}</h3><small>${o.text}</small></button>`).join("")}</div>`,
		);
	} else if (phase === "shop") shop();
	else if (phase === "defeat" || phase === "victory")
		modal(
			phase === "victory" ? "JOURNEY COMPLETE" : "THE EMBERS REMAIN",
			phase === "victory" ? "A sun reborn" : "Until the next dawn",
			`Reached room ${run.floor} · ${meta.wins} total encounters cleared`,
			`<div class="notice">New heroes: Oracle at 5 victories · Stagkeeper at 14.</div><div class="modal-actions" style="margin-top:22px"><button class="primary" data-action="new">NEW JOURNEY →</button><button data-action="codex">VIEW CODEX</button></div>`,
		);
}
function welcome() {
	modal(
		"EMBER ARCANA",
		"Carry the last light",
		"A card. A choice. A different journey every time.",
		`<div class="choices">${R.HEROES.map((h, i) => `<button class="choice hero-choice ${chosenHero === i ? "active" : ""} ${meta.wins < h.unlock ? "locked" : ""}" data-action="hero" data-index="${i}" aria-label="${h.name}. ${meta.wins < h.unlock ? `Unlocks at ${h.unlock} victories` : h.desc}">${sprite(h.art)}<h3>${h.name}</h3><small>${meta.wins < h.unlock ? `♧ ${meta.wins} / ${h.unlock} victories` : h.desc}</small></button>`).join("")}</div><div class="modal-actions"><button class="primary" data-action="start">BEGIN JOURNEY →</button>${run ? '<button data-action="resume">RESUME</button>' : ""}</div><p class="notice">Tap a card, then its target. Block the announced attack.<br>Auto-saved · ${meta.wins} victories · Ascent ${Math.min(5, meta.clears)}<br>${run && !["defeat", "victory"].includes(run.phase) ? "A new journey replaces your current run." : "Each completed journey unlocks a stronger ascent."}</p>`,
	);
}
function shop() {
	modal(
		"THE WANDERING MARKET",
		`${run.gold} GOLD`,
		"A little preparation goes a long way.",
		`<div class="choices">${run.offers.map((c, i) => (c ? cardHTML(c, "buycard", i) : '<div class="choice"><h3>Sold</h3></div>')).join("")}</div><div class="notice">Cards: 35 gold each</div><div class="modal-actions" style="margin-top:16px"><button data-action="buyheal" ${run.gold < 20 || run.state.player.currentHealth >= run.state.player.maxHealth ? "disabled" : ""}>${icon("heart", 24)} +20 · 20 gold</button><button data-action="buyrelic" ${run.gold < 65 || run.relics.length === 12 ? "disabled" : ""}>${icon("gem", 24)} Relic · 65</button><button data-action="purge" ${run.gold < 25 || run.state.deck.length <= 5 ? "disabled" : ""}>Remove card · 25</button><button class="primary" data-action="leave">LEAVE →</button></div>`,
	);
}
function collection(kind = "deck") {
	const list =
		kind === "codex"
			? R.cards.slice(0, run?.unlocked || 15).map((c) => R.createCard(c.name))
			: kind === "forge"
				? run.state.deck.filter((c) => !c.upgraded)
				: run.state.deck;
	modal(
		kind === "codex"
			? "UNLOCKED CARDS"
			: kind === "forge"
				? "UPGRADE ONE CARD"
				: kind === "purge"
					? "REMOVE ONE CARD"
					: "YOUR DECK",
		kind === "codex"
			? `${run?.unlocked || 15} / ${R.cards.length} discovered`
			: kind === "forge"
				? "A sharper edge"
				: kind === "purge"
					? "Travel light"
					: `${list.length} cards`,
		kind === "codex"
			? "Clear encounters to discover new cards."
			: kind === "forge"
				? "Tap a card to permanently upgrade it this journey."
				: "",
		`<div class="collection">${list.map((c, i) => cardHTML(c, kind === "forge" ? "upgrade" : kind === "purge" ? "remove" : "inspect", i)).join("")}</div><div class="modal-actions" style="margin-top:15px"><button data-action="back">← BACK</button></div>`,
		false,
	);
}
function help() {
	modal(
		"HOW TO PLAY",
		"One turn. Many possibilities.",
		"",
		`<div class="legend"><p>${icon("sword", 26)} <b>Read the intent.</b> The symbol above a foe shows what it will do next.</p><p>${icon("gem", 26)} <b>Spend 3 Energy.</b> Tap an Attack, then a foe. Skills play immediately when they target you.</p><p>${icon("shield", 26)} <b>Block the next attack.</b> Block resets on your next turn. End your turn to draw 5 new cards.</p><p>${icon("eye", 26)} <b>Build combinations.</b> Vulnerable means +50% damage taken. Weak means −25% attack damage. Strength adds damage to every attack.</p><p>${icon("crown", 26)} <b>Grow your deck.</b> Take rewards, find relics and upgrade at campfires. Beat 3 acts; unlock 2 more heroes.</p></div><div class="modal-actions"><button class="primary" data-action="back">GOT IT →</button></div>`,
	);
}
function effect(el, value, type = "hit") {
	if (!el) return;
	const rect = el.getBoundingClientRect(),
		base = $("#arena").getBoundingClientRect(),
		x = rect.left + rect.width / 2 - base.left,
		y = rect.top + rect.height * 0.5 - base.top;
	const layer = $("#effects");
	const n = document.createElement("span");
	n.className = "float " + (type === "shield" ? "block" : "");
	n.style.left = `${x - 14}px`;
	n.style.top = `${y}px`;
	n.textContent = value;
	layer.append(n);
	setTimeout(() => n.remove(), 900);
	el.classList.add("hit");
	setTimeout(() => el.classList.remove("hit"), 300);
	for (let i = 0; i < 12; i++) {
		const p = document.createElement("i");
		p.className = "spark";
		p.style.cssText = `left:${x}px;top:${y + 12}px;background:${type === "shield" ? "#a3e2d1" : "#f0bf74"};--dx:${Math.cos(i) * 50}px;--dy:${Math.sin(i) * 40 - 15}px`;
		layer.append(p);
		setTimeout(() => p.remove(), 700);
	}
	if (type === "hit") {
		const s = document.createElement("i");
		s.className = "slash";
		s.style.left = `${x - 55}px`;
		s.style.top = `${y + 15}px`;
		layer.append(s);
		setTimeout(() => s.remove(), 300);
		$("#arena").classList.add("shake");
		setTimeout(() => $("#arena").classList.remove("shake"), 280);
	}
	tone(type);
}
function executeCard(index) {
	if (busy || !selected || !run) return;
	const result = R.play(run, selected, index);
	if (!result.ok) {
		toast(result.reason || "Choose a living target.");
		return;
	}
	selected = null;
	busy = true;
	persist();
	render(false);
	if (result.card.type === "attack") $(".hero")?.classList.add("lunge");
	const before =
		result.before.dungeon.graph[result.before.dungeon.y][0].room.monsters;
	R.room(run).monsters.forEach((m, i) => {
		const loss = before[i].currentHealth - m.currentHealth;
		if (loss > 0) effect($(`.enemy[data-index="${i}"]`), "-" + loss);
		else if (before[i].block > m.block)
			effect($(`.enemy[data-index="${i}"]`), "BLOCK", "shield");
	});
	const b = run.state.player.block - result.before.player.block;
	if (b > 0) effect($(".hero"), "+" + b, "shield");
	tone("card");
	setTimeout(() => {
		busy = false;
		$("#end-turn").disabled = run.phase !== "battle";
		if (result.won) phaseModal();
	}, 450);
}
document.addEventListener("click", (e) => {
	const b = e.target.closest("button[data-action]");
	if (!b || b.disabled || busy) return;
	const a = b.dataset.action,
		i = Number(b.dataset.index),
		id = b.dataset.id;
	if (a === "hero") {
		if (meta.wins < R.HEROES[i].unlock)
			return toast(`Unlock at ${R.HEROES[i].unlock} encounter victories.`);
		chosenHero = i;
		return welcome();
	}
	if (a === "start") {
		run = R.newRun(chosenHero, Date.now(), meta);
		selected = null;
		persist();
		hide();
		return render();
	}
	if (a === "new") return welcome();
	if (a === "help") return help();
	if (a === "resume" || a === "back") {
		hide();
		if (run?.phase !== "battle") phaseModal();
		else if (!run) welcome();
		return;
	}
	if (a === "close") {
		hide();
		return;
	}
	if (a === "route") {
		R.chooseRoute(run, i);
		hide();
		persist();
		render();
		return;
	}
	if (a === "select") {
		const c = run.state.hand.find((c) => c.id === id);
		if (!R.canPlay(run.state, c))
			return toast(
				run.state.player.currentEnergy < c.energy
					? "Not enough Energy. End your turn to refill."
					: "Card condition not met.",
			);
		selected = selected === id ? null : id;
		if (selected && c.target === "player") executeCard(0);
		else render(false);
		return;
	}
	if (a === "enemy") {
		if (selected) executeCard(i);
		else {
			const m = R.room(run).monsters[i];
			toast(`${m.name}: tap an Attack card, then this foe.`);
		}
		return;
	}
	if (a === "continue") {
		if (run) phaseModal();
		else welcome();
		return;
	}
	if (a === "reward") {
		R.takeReward(run, i);
		hide();
		persist();
		render();
		return;
	}
	if (a === "rest") {
		R.rest(run);
		toast("Restored at the quiet flame.");
		hide();
		persist();
		render();
		return;
	}
	if (a === "forge") return collection("forge");
	if (a === "upgrade") {
		const c = run.state.deck.find((c) => c.id === id);
		if (R.upgrade(run, id)) {
			toast(`${R.label(c)} upgraded!`);
			tone("win");
			persist();
			hide();
			render();
		}
		return;
	}
	if (a === "deck") return run ? collection() : welcome();
	if (a === "codex") return collection("codex");
	if (a === "event") {
		R.eventChoice(run, i);
		persist();
		hide();
		render();
		tone("win");
		return;
	}
	if (["buycard", "buyheal", "buyrelic", "leave"].includes(a)) {
		const success = R.purchase(
			run,
			{ buycard: "card", buyheal: "heal", buyrelic: "relic", leave: "leave" }[
				a
			],
			i,
		);
		if (success) {
			persist();
			render(false);
			if (a === "leave") {
				hide();
				phaseModal();
			} else {
				toast(
					a === "buycard"
						? "Added to your deck."
						: a === "buyrelic"
							? "A new relic joins your journey."
							: "Health restored.",
				);
				shop();
				tone("card");
			}
		} else toast("Not enough gold.");
		return;
	}
	if (a === "purge") return collection("purge");
	if (a === "remove") {
		if (
			R.purchase(
				run,
				"remove",
				run.state.deck.findIndex((c) => c.id === id),
			)
		) {
			persist();
			render(false);
			shop();
			toast("Card removed.");
		}
		return;
	}
	if (a === "relic") {
		const rel = R.RELICS.find((x) => x.id === id);
		return toast(`${rel.name}: ${rel.text}`);
	}
	if (a === "inspect") {
		const c = (run?.state.deck || []).find((c) => c.id === id);
		if (c) toast(`${R.label(c)}: ${c.description}`);
	}
});
$("#end-turn").addEventListener("click", () => {
	if (busy || run?.phase !== "battle") return;
	const before = run.state.player.currentHealth,
		block = run.state.player.block;
	const attackers = R.room(run)
		.monsters.map((m, i) =>
			m.currentHealth > 0 && m.intents[m.nextIntent || 0]?.damage ? i : -1,
		)
		.filter((i) => i >= 0);
	selected = null;
	busy = true;
	R.endTurn(run);
	persist();
	render(false);
	$("#hand").scrollLeft = 0;
	attackers.forEach((i, n) => {
		const el = $(`.enemy[data-index="${i}"]`);
		if (el) {
			el.classList.add("lunge");
			el.style.animationDelay = `${n * 0.08}s`;
		}
	});
	const damage = before - run.state.player.currentHealth;
	effect(
		$(".hero"),
		damage > 0 ? "-" + damage : block ? "BLOCKED" : "YOUR TURN",
		damage > 0 ? "hit" : "shield",
	);
	setTimeout(() => {
		busy = false;
		render();
	}, 550);
});
$("#sound").onclick = () => {
	sound = !sound;
	$("#sound").textContent = sound ? "♫" : "♪";
	$("#sound").setAttribute("aria-label", sound ? "Mute sound" : "Enable sound");
	toast(sound ? "Sound on" : "Sound off");
	if (sound) tone("card");
};
$("#help").onclick = help;
$("#menu").onclick = () =>
	modal(
		"JOURNEY",
		"By the quiet flame",
		"Your progress is saved after every choice.",
		`<div class="modal-actions"><button data-action="resume" class="primary">RESUME</button><button data-action="deck">DECK</button><button data-action="new">NEW JOURNEY</button><button data-action="help">HOW TO PLAY</button></div><p class="notice"><a href="credits.html" target="_blank" rel="noopener">Credits, AGPL source & build instructions</a></p>`,
	);
dialog.addEventListener("cancel", (e) => {
	e.preventDefault();
	hide();
	if (run?.phase !== "battle") phaseModal();
	else if (!run) welcome();
});
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && !dialog.open) {
		selected = null;
		render(false);
	}
	if (e.code === "Space" && !dialog.open && e.target === document.body) {
		e.preventDefault();
		$("#end-turn").click();
	}
});
for (let i = 0; i < 18; i++) {
	const m = document.createElement("i");
	m.className = "mote";
	m.style.cssText = `left:${(i * 37) % 100}%;top:${20 + ((i * 17) % 65)}%;--duration:${4 + (i % 5)}s;--delay:-${i * 0.9}s`;
	$("#motes").append(m);
}
render();
if (!run) welcome();
