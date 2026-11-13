const delivery = (x, radius, wind = 0, drift = 0, cloud = null) => ({x, radius, wind, drift, cloud});

export const routes = [
  {name:'Orchard Post', sky:0, drops:[delivery(156,66,4), delivery(251,59,8), delivery(106,55,-8)]},
  {name:'Crosswind Cove', sky:1, drops:[delivery(249,56,47), delivery(99,52,-43), delivery(200,48,51)]},
  {name:'A Moving Address', sky:0, drops:[delivery(212,55,8,49), delivery(102,48,-11,39), delivery(262,46,13,55)]},
  {name:'Thunderhead Run', sky:2, drops:[delivery(220,56,18,0,[198,250]), delivery(104,53,-22,0,[155,275]), delivery(273,48,28,0,[240,278])]},
  {name:'Island Express', sky:1, drops:[delivery(233,47,-34,40), delivery(101,45,31,28,[167,245]), delivery(269,43,-32,33)]},
  {name:'Midnight Airmail', sky:2, drops:[delivery(107,46,-30,31,[132,262]), delivery(260,42,32,42,[220,237]), delivery(192,41,-30,58,[194,281])]},
];

export const world = {width:400, height:510, landing:424, startY:109};
const bound = (n,a,b) => Math.min(b,Math.max(a,n));
const validInt = (n,a,b) => Number.isInteger(n) && n >= a && n <= b;
const record = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};

export function profile(data) {
  data = record(data);
  return {
    stars:routes.map((_,i)=>validInt(data.stars?.[i],0,3) ? data.stars[i] : 0),
    best:routes.map((_,i)=>validInt(data.best?.[i],0,3) ? data.best[i] : 0),
    sound:data.sound !== false,
    skin:['sun','berry','mint'].includes(data.skin) ? data.skin : 'sun',
    rewards:{like:data.rewards?.like === true, comment:data.rewards?.comment === true},
  };
}

export function mergeProfile(local, cloud) {
  const a = profile(local), b = profile(cloud);
  for (let i = 0; i < routes.length; i++) {
    a.stars[i] = Math.max(a.stars[i], b.stars[i]);
    a.best[i] = Math.max(a.best[i], b.best[i]);
  }
  a.rewards.like ||= b.rewards.like;
  a.rewards.comment ||= b.rewards.comment;
  return a;
}

export function newRoute(index = 0) {
  return {index, drop:0, perfect:0, misses:0, phase:'ready', time:0, x:151,
    y:world.startY, vx:0, vy:0, canopy:0, outcome:null};
}

export function checkpoint(run) {
  return {index:run.index, drop:run.drop, perfect:run.perfect, misses:run.misses,
    outcome:run.phase === 'done' ? run.outcome : null};
}

export function restore(data, savedProfile) {
  data = record(data);
  if (!validInt(data.index,0,routes.length-1) || !validInt(data.drop,0,3) ||
      !validInt(data.perfect,0,data.drop) || !validInt(data.misses,0,99999) ||
      (data.index > 0 && !savedProfile.stars[data.index-1])) return newRoute();
  const run = Object.assign(newRoute(data.index), {drop:data.drop,perfect:data.perfect,misses:data.misses});
  if (data.drop === 3) {
    if (!savedProfile.stars[data.index]) return newRoute(data.index);
    run.phase = 'done';
    run.outcome = data.outcome === 'perfect' ? 'perfect' : 'landed';
    run.y = world.landing;
    run.x = routes[data.index].drops[2].x;
  }
  return run;
}

export function destination(run) {
  return routes[run.index].drops[Math.min(run.drop,2)];
}

export function platformAt(drop, time) {
  return drop.x + drop.drift * Math.sin(time * 1.22);
}

export function windAt(drop, time, y) {
  return drop.wind * (0.66 + 0.34 * Math.sin(time * 1.86 + y * 0.017));
}

export function takeOff(run, host) {
  if (run.phase !== 'ready' || run.drop >= 3) return false;
  run.phase = 'air';
  host?.start();
  return true;
}

export function nextDrop(run) {
  if (run.phase !== 'receipt' || run.drop >= 3) return false;
  Object.assign(run, {phase:'ready',time:0,x:151,y:world.startY,vx:0,vy:0,canopy:0,outcome:null});
  return true;
}

function settle(run, drop, host) {
  const error = Math.abs(run.x - platformAt(drop,run.time));
  run.outcome = error <= drop.radius * 0.32 && run.vy < 155 ? 'perfect'
    : error <= drop.radius ? 'landed' : 'miss';
  if (run.outcome === 'miss') run.misses = Math.min(99999,run.misses + 1);
  else run.drop++;
  if (run.outcome === 'perfect') run.perfect++;
  run.phase = run.drop === 3 ? 'done' : 'receipt';
  if (run.phase === 'done') host?.end();
  return run.outcome;
}

export function tick(run, dt, input, host) {
  if (run.phase !== 'air') return null;
  const drop = destination(run);
  run.time += dt;
  const open = input.open === true;
  run.canopy += ((open ? 1 : 0) - run.canopy) * Math.min(1, dt * (open ? 13 : 17));
  const cloud = drop.cloud;
  const inCloud = cloud && Math.hypot((run.x-cloud[0])/45,(run.y-cloud[1])/25)<1;
  const steering = bound(Number.isFinite(input.steer) ? input.steer : 0,-1,1);
  const wind = windAt(drop,run.time,run.y) * (0.22 + run.canopy * 0.95);
  const gust = inCloud ? Math.sign(run.x - cloud[0] || 1) * 62 : 0;
  const goalVx = steering * (38 + run.canopy * 112) + wind + gust;
  run.vx += (goalVx - run.vx) * Math.min(1,dt * 4.8);
  run.x = bound(run.x + run.vx * dt,17,383);
  const goalVy = 267 - run.canopy * 158 + (inCloud ? 22 : 0);
  run.vy += (goalVy-run.vy) * Math.min(1,dt * 5.5);
  run.y += run.vy * dt;
  if (run.y < world.landing) return null;
  run.y = world.landing;
  return settle(run,drop,host);
}

export function earn(run, savedProfile) {
  if (run.phase !== 'done') return 0;
  const stars = 1 + Number(run.misses === 0) + Number(run.perfect >= 2);
  savedProfile.stars[run.index] = Math.max(savedProfile.stars[run.index],stars);
  savedProfile.best[run.index] = Math.max(savedProfile.best[run.index],run.perfect);
  return stars;
}
