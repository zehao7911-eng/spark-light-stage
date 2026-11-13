(function (root) {
  'use strict';
  const FAMILIES = [
    { name: 'Cinder', mark: 'flame', color: '#e68b50', dark: '#9a4b43' },
    { name: 'Morel', mark: 'cap', color: '#cb6972', dark: '#854757' },
    { name: 'Puddle', mark: 'drop', color: '#72bfb0', dark: '#388b89' },
    { name: 'Luna', mark: 'moon', color: '#b3a3d2', dark: '#706b9f' },
    { name: 'Bramble', mark: 'leaf', color: '#b5bd72', dark: '#6d895d' }
  ];
  const REQUESTS = [
    { name: 'Cinder Fox', parts: [0, 0, 0], note: 'Three little flames.', room: 0 },
    { name: 'The Mushroom Waltz', parts: [1, 1, 1], note: 'A cap, a coat, tiny roots.', room: 0 },
    { name: 'Puddle Poppet', parts: [2, 2, 2], note: 'A wonderfully wobbly guest.', room: 0 },
    { name: 'Luna Takes a Bow', parts: [3, 3, 3], note: 'A new moon in the troupe.', room: 1 },
    { name: 'Fox on the Wing', parts: [0, 3, 0], note: 'A fox with a moth coat.', room: 1 },
    { name: 'Raincoat Weather', parts: [2, 1, 2], note: 'A puddle in a mushroom coat.', room: 1 },
    { name: 'Bramble Ballet', parts: [4, 4, 4], note: 'A little wild thing.', room: 2 },
    { name: 'A Very Odd Gardener', parts: [1, 4, 3], note: 'A cap, leaves, moon boots.', room: 2 },
    { name: 'Moonwater', parts: [3, 2, 1], note: 'A moon with a squishy middle.', room: 2 },
    { name: 'The Dapper Shrub', parts: [4, 0, 2], note: 'A leafy face, a velvet coat.', room: 3 },
    { name: 'A Splash of Wings', parts: [2, 3, 4], note: 'A puddle with grand ideas.', room: 3 },
    { name: 'The Midnight Guest', parts: [4, 3, 0], note: 'The final guest. Make an entrance.', room: 3 }
  ];
  const mod = (n, m) => (n % m + m) % m;
  function nameOf(parts) {
    const heads = ['Cinder', 'Buttoncap', 'Puddle', 'Moonbeam', 'Bramble'];
    const bodies = ['coat', 'ruffle', 'wobble', 'wing', 'bloom'];
    const feet = ['Fox', 'Sprout', 'Poppet', 'Dancer', 'Wanderer'];
    return heads[parts[0]] + bodies[parts[1]] + ' ' + feet[parts[2]];
  }
  function profile() { return { stars: Array(12).fill(0), scores: Array(12).fill(0), last: Array(12).fill(null), unlocked: 0, specimens: {}, muted: false, motion: true }; }
  function cleanProfile(p) {
    const out = profile();
    if (!p || typeof p !== 'object') return out;
    for (let i = 0; i < 12; i++) {
      out.stars[i] = Math.max(0, Math.min(3, p.stars?.[i] | 0));
      out.scores[i] = Math.max(0, Math.min(9999, p.scores?.[i] | 0));
      if (validParts(p.last?.[i])) out.last[i] = p.last[i].slice();
    }
    out.unlocked = Math.max(0, Math.min(12, p.unlocked | 0));
    for (const k of Object.keys(p.specimens || {}).slice(0, 125)) {
      if (/^[0-4]{3}$/.test(k)) out.specimens[k] = Math.max(1, Math.min(9999, p.specimens[k] | 0));
    }
    out.muted = !!p.muted; out.motion = p.motion !== false;
    return out;
  }
  const validParts = a => Array.isArray(a) && a.length === 3 && a.every(n => Number.isInteger(n) && n >= 0 && n < 5);
  class Game {
    constructor(job = 0) { this.events = []; this.time = 0; this.turn = 0; this.load(job); }
    load(job) {
      this.job = Math.max(0, Math.min(12, job | 0));
      this.available = this.job < 3 ? 3 : this.job < 6 ? 4 : 5;
      this.target = REQUESTS[this.job]?.parts.slice() || null;
      this.active = 0; this.phase = 'play'; this.chosen = []; this.quality = [];
      this.started = this.job !== 0; this.slow = false; this.dragging = false; this.clock = 0; this.age = 0;
      // Every band has a fixed readable order; different requests shift its opening.
      this.offsets = (this.job === 0 ? [0, 0, 0] : [this.job % this.available + .18, (this.job + 1) % this.available + .36, (this.job + 2) % this.available - .22]).map(n => mod(n, this.available));
      this.speeds = [1, -1, 1].map((s, i) => s * (.235 + Math.min(this.job, 9) * .007 + i * .019));
      this.result = null; this.turn++; this.events.push({ type: 'request' });
    }
    nearest(row = this.active) {
      const phase = this.offsets[row];
      const k = Math.round(phase);
      return { family: mod(k, this.available), error: Math.abs(phase - k) };
    }
    nudge(cells) {
      if(this.phase!=='play'||!Number.isFinite(cells))return false;
      this.started=true;
      this.offsets[this.active]=mod(this.offsets[this.active]-Math.max(-8,Math.min(8,cells)),this.available);
      return true;
    }
    pin() {
      if (this.phase !== 'play') return false;
      const n = this.nearest();
      this.started = true; this.chosen.push(n.family); this.quality.push(n.error);
      this.events.push({ type: 'pin', row: this.active, family: n.family, perfect: n.error < .17, match: !this.target || n.family === this.target[this.active] });
      this.active++;
      if (this.active === 3) { this.phase = 'sew'; this.age = 0; this.slow = false; this.events.push({ type: 'sew' }); }
      return true;
    }
    undo() {
      if (this.phase !== 'play' || !this.active) return false;
      this.active--; this.chosen.pop(); this.quality.pop();
      this.events.push({ type: 'undo' }); return true;
    }
    step(dt) {
      if (!Number.isFinite(dt) || dt <= 0) return;
      dt = Math.min(dt, .1);
      if (this.phase === 'result') return;
      this.time += dt;
      if (this.phase === 'play' && this.started) {
        this.clock += dt;
        for (let i = this.active; i < 3; i++) if(!(this.dragging&&i===this.active)) this.offsets[i] = mod(this.offsets[i] + this.speeds[i] * dt * (this.slow ? .22 : 1), this.available);
      }
      if (this.phase === 'sew') {
        this.age += dt;
        if (this.age >= 1.35) {
          const matches = this.target ? this.chosen.filter((n, i) => n === this.target[i]).length : 3;
          const perfects = this.quality.filter(n => n < .17).length;
          const allSame = new Set(this.chosen).size === 1;
          const allDifferent = new Set(this.chosen).size === 3;
          this.result = { parts: this.chosen.slice(), matches, perfects, stars: this.target ? Math.max(1, matches) : 0,
            score: 300 + matches * 150 + perfects * 60 + (allSame ? 120 : allDifferent ? 90 : 45),
            badge: this.target && matches === 3 ? 'A PERFECT GUEST!' : allSame ? 'KINDRED SPIRIT' : allDifferent ? 'WILDLY WONDERFUL' : 'A HAPPY ACCIDENT',
            name: nameOf(this.chosen) };
          this.phase = 'result'; this.events.push({ type: 'hatch', result: this.result });
        }
      }
      if (this.events.length > 30) this.events.splice(0, this.events.length - 30);
    }
    snapshot() {
      return { v: 1, job: this.job, time: this.time, turn: this.turn, active: this.active, phase: this.phase, chosen: this.chosen.slice(), quality: this.quality.slice(), offsets: this.offsets.slice(), started: this.started, clock: this.clock, age: this.age };
    }
    static restore(s) {
      if (!s || s.v !== 1 || !Number.isInteger(s.job) || s.job < 0 || s.job > 12 || !['play', 'sew', 'result'].includes(s.phase)) return null;
      const g = new Game(s.job);
      if (!Array.isArray(s.chosen) || s.chosen.length > 3 || !s.chosen.every(n => Number.isInteger(n) && n >= 0 && n < g.available)) return null;
      if (!Array.isArray(s.quality) || s.quality.length !== s.chosen.length || !s.quality.every(n => Number.isFinite(n) && n >= 0 && n <= .500001)) return null;
      if (!Array.isArray(s.offsets) || s.offsets.length !== 3 || !s.offsets.every(n => Number.isFinite(n) && n >= 0 && n < g.available)) return null;
      if (!Number.isInteger(s.active) || s.active !== s.chosen.length || (s.phase === 'play' ? s.active > 2 : s.active !== 3)) return null;
      if (![s.time, s.clock, s.age].every(n => Number.isFinite(n) && n >= 0 && n < 1e8)) return null;
      g.chosen = s.chosen.slice(); g.quality = s.quality.slice(); g.active = s.active;
      g.offsets = s.offsets.slice(); g.time = s.time; g.clock = s.clock; g.age = Math.min(1.35, s.age);
      g.started = !!s.started || g.active > 0 || g.job > 0; g.turn = Math.max(1, s.turn | 0); g.events = [];
      if (s.phase === 'result') { const time=g.time; g.phase = 'sew'; g.age = 1.35; g.step(1 / 60); g.time=time; g.age=s.age; g.events = []; }
      else g.phase = s.phase;
      return g;
    }
  }
  function award(p, g) {
    if (g.phase !== 'result' || !g.result) return null;
    const k = g.result.parts.join(''), fresh = !p.specimens[k];
    p.specimens[k] = Math.max(p.specimens[k] || 0, g.result.score);
    if (g.job < 12) {
      p.stars[g.job] = Math.max(p.stars[g.job], g.result.stars);
      p.scores[g.job] = Math.max(p.scores[g.job], g.result.score);
      p.last[g.job] = g.result.parts.slice(); p.unlocked = Math.max(p.unlocked, g.job + 1);
    }
    return { fresh, count: Object.keys(p.specimens).length, key: k };
  }
  const api = { Game, FAMILIES, REQUESTS, profile, cleanProfile, award, nameOf, validParts, mod };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.OddCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
