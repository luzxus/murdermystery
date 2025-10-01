import { redHerrings } from '../data/redHerrings';

function phaseMatch(h, phase) {
  return h.phase === 'any' || h.phase === phase;
}

function disqualifyExclusiveToMurderer(h, murdererId) {
  return h.misleads.length === 1 && h.misleads[0] === murdererId;
}

export function decrementCooldowns(cooldowns) {
  const next = {};
  Object.entries(cooldowns).forEach(([k, v]) => { next[k] = Math.max(0, v - 1); });
  return next;
}

export function selectRedHerring({ phase, lastClueTags, suspicionMap, murdererId, usedCounts, cooldowns }) {
  const candidates = redHerrings.filter(h =>
    phaseMatch(h, phase) &&
    (usedCounts[h.id] ?? 0) < h.maxUses &&
    (cooldowns[h.id] ?? 0) === 0 &&
    !disqualifyExclusiveToMurderer(h, murdererId)
  );
  if (!candidates.length) {
    return { herring: undefined, updatedCooldowns: cooldowns, updatedUsedCounts: usedCounts };
  }

  const scored = candidates.map(h => {
    const overlap = h.tags.filter(t => lastClueTags.includes(t)).length;
    let score = overlap; // base from shared tags
    const topSuspect = Object.entries(suspicionMap).sort((a,b)=>b[1]-a[1])[0]?.[0];
    if (topSuspect && h.misleads.includes(Number(topSuspect))) score += 1.5;
    if (h.misleads.includes(murdererId)) score -= 0.5; // avoid boosting real murderer
    score += h.weight;
    return { h, score: Math.max(0.05, score) };
  });

  const total = scored.reduce((s, x) => s + x.score, 0);
  let r = Math.random() * total;
  let chosen;
  for (const { h, score } of scored) {
    r -= score;
    if (r <= 0) { chosen = h; break; }
  }
  if (!chosen) chosen = scored[0].h;

  return {
    herring: chosen,
    updatedCooldowns: { ...cooldowns, [chosen.id]: chosen.cooldown },
    updatedUsedCounts: { ...usedCounts, [chosen.id]: (usedCounts[chosen.id] ?? 0) + 1 }
  };
}
