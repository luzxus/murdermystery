import { useCallback, useEffect, useRef, useState } from 'react';
import { selectRedHerring, decrementCooldowns } from '../utils/redHerringEngine';

// suspicionMap: characterId -> score (external system can adjust)
export function useRedHerrings({ murdererId, getPhase, getLastClueTags, getSuspicionMap, maxRatio = 0.55 }) {
  const [observations, setObservations] = useState([]);
  const [counts, setCounts] = useState({ real: 0, herring: 0 });
  const usedCountsRef = useRef({});
  const cooldownsRef = useRef({});

  const registerRealClue = useCallback(() => {
    setCounts(c => ({ ...c, real: c.real + 1 }));
  }, []);

  const maybeInject = useCallback((reason) => {
    const ratio = counts.herring / Math.max(1, counts.real);
    if (ratio >= maxRatio) return;

    const res = selectRedHerring({
      phase: getPhase(),
      lastClueTags: getLastClueTags(),
      suspicionMap: getSuspicionMap(),
      murdererId,
      usedCounts: usedCountsRef.current,
      cooldowns: cooldownsRef.current
    });

    if (res.herring) {
      usedCountsRef.current = res.updatedUsedCounts;
      cooldownsRef.current = res.updatedCooldowns;
      setObservations(o => [...o, { id: res.herring.id, text: res.herring.text, reason }]);
      setCounts(c => ({ ...c, herring: c.herring + 1 }));
    }
  }, [counts.herring, counts.real, getPhase, getLastClueTags, getSuspicionMap, murdererId, maxRatio]);

  // cooldown ticker
  useEffect(() => {
    const t = setInterval(() => {
      cooldownsRef.current = decrementCooldowns(cooldownsRef.current);
    }, 15000);
    return () => clearInterval(t);
  }, []);

  return { observations, registerRealClue, maybeInject };
}
