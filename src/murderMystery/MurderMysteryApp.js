import React, { useState, useEffect, useRef } from 'react';
import { personas } from './data/personas';
import { challenges } from './data/challenges';
import { clues } from './data/clues';
import { redHerrings } from './data/redHerrings';
import { videoChallenges as initialVideoChallenges } from './data/videoChallenges';
import { Screens } from './constants';
import { shuffle, pickRandom, isAcceptedAnswer } from './utils/gameUtils';

import { SetupScreen } from './components/SetupScreen';
import { CharacterCardsModal } from './components/CharacterCardsModal';
import { CharacterDistribution } from './components/CharacterDistribution';
import { MurderSequence } from './components/MurderSequence';
import { IntroScreen } from './components/IntroScreen';
import { GameScreen } from './components/GameScreen';
import { SecretsScreen } from './components/SecretsScreen';
import { RevealScreen } from './components/RevealScreen';
import { AmbientObservations } from './components/AmbientObservations';
import { ConversationPrompts } from './components/ConversationPrompts';
import { VideoUnlockModal } from './components/VideoUnlockModal';
import { useRedHerrings } from './hooks/useRedHerrings';
import { useConversationPrompts } from './hooks/useConversationPrompts';
import { personas as allPersonas } from './data/personas';

export function MurderMysteryApp() {
  const [screen, setScreen] = useState(Screens.SETUP);
  const [playerCount, setPlayerCount] = useState(5);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [murderer, setMurderer] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [unlockedClues, setUnlockedClues] = useState([]);
  const [deepAnalyses, setDeepAnalyses] = useState([]); // clue ids whose deepHint is revealed
  const [videoChallenges, setVideoChallenges] = useState(initialVideoChallenges);
  // Consequence / penalty system state
  const [silencedUntil, setSilencedUntil] = useState({}); // {characterId: timestamp}
  const [hintSuppressedUntil, setHintSuppressedUntil] = useState(0);
  const [submitDisabledUntil, setSubmitDisabledUntil] = useState(0);
  const [lockedDeepHints, setLockedDeepHints] = useState([]); // clue ids that can no longer be deep analyzed (if not already)
  const [consequenceMessages, setConsequenceMessages] = useState([]); // recent consequence descriptions
  const [penaltyTick, setPenaltyTick] = useState(0); // internal ticker for countdowns
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showCharacterCards, setShowCharacterCards] = useState(false);
  const [eliminatedPlayers, setEliminatedPlayers] = useState([]);
  const [showVotingPanel, setShowVotingPanel] = useState(false);
  const [votes, setVotes] = useState({});
  const [votingInProgress, setVotingInProgress] = useState(false);
  const [showSecretsRound, setShowSecretsRound] = useState(false);
  const [showVideoUnlockModal, setShowVideoUnlockModal] = useState(false);
  const [hasShownVideoUnlock, setHasShownVideoUnlock] = useState(false);
  // Suspicion tracking (placeholder simple heuristic)
  const suspicionMapRef = useRef({}); // characterId -> score
  const lastClueTagsRef = useRef([]);
  const forceRender = useState(0)[1]; // trigger rerender for suspicion updates

  // Force murderer to be Dr Arabella (id 6) for redesigned narrative
  // If she isn't in selected players (few players), fallback to random.

  // Timer effect
  useEffect(() => {
    if (screen === Screens.GAME && currentChallenge < challenges.length) {
      setTimeRemaining(challenges[currentChallenge].timeLimit * 60);
      setTimerActive(true);
    }
  }, [screen, currentChallenge]);

  useEffect(() => {
    let interval = null;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => setTimeRemaining(t => t - 1), 1000);
    } else if (timeRemaining === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  // Actions
  const distributeRoles = () => {
    const selected = shuffle(personas).slice(0, playerCount);
    setSelectedPlayers(selected);
    const arabella = selected.find(p => p.id === 6);
    setMurderer(arabella || pickRandom(selected));
    setScreen(Screens.CHARACTERS);
  };

  // Derive phase from challenge progression
  const getPhase = () => {
    const ratio = currentChallenge / (challenges.length - 1);
    if (ratio < 0.34) return 'early';
    if (ratio < 0.75) return 'mid';
    return 'late';
  };

  const getLastClueTags = () => lastClueTagsRef.current;
  const getSuspicionMap = () => suspicionMapRef.current;

  const { observations, registerRealClue, maybeInject } = useRedHerrings({
    murdererId: 6,
    getPhase,
    getLastClueTags,
    getSuspicionMap,
    maxRatio: 0.55
  });

  // track game time for conversation prompts
  const gameStartTime = useRef(null);
  const [gameTimeElapsed, setGameTimeElapsed] = useState(0);

  useEffect(() => {
    if (screen === Screens.GAME && !gameStartTime.current) {
      gameStartTime.current = Date.now();
    }
  }, [screen]);

  useEffect(() => {
    if (screen === Screens.GAME && gameStartTime.current) {
      const interval = setInterval(() => {
        setGameTimeElapsed(Math.floor((Date.now() - gameStartTime.current) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [screen]);

  const { currentPrompt, triggerPrompt, dismissPrompt } = useConversationPrompts({
    selectedPlayers,
    currentPhase: getPhase(),
    unlockedClues,
    completedChallenges: currentChallenge,
    gameTimeElapsed
  });

  const checkAnswer = () => {
    const challenge = challenges[currentChallenge];
    if (isAcceptedAnswer(userAnswer, challenge.acceptedAnswers)) {
      setTimerActive(false);
      setFeedback({ type: 'success', message: 'Rätt! Ledtråd upplåst!' });
      setUnlockedClues(prev => {
        const next = [...prev, challenge.id];
        // Register clue opened for red herring ratio
        registerRealClue();
        // trigger conversation prompt for challenge complete
        triggerPrompt('challenge_complete', currentChallenge + 1);
        // Apply suspicion scoring based on clue definition
        const clue = clues.find(c => c.id === challenge.id);
        if (clue && clue.suspicionWeight) {
          // Primary always Dr Arabella (id 6) per narrative
            suspicionMapRef.current[6] = (suspicionMapRef.current[6] || 0) + (clue.suspicionWeight.primary || 0);
          // Secondary heuristic mapping
          const sec = clue.suspicionWeight.secondary || 0;
          if (sec > 0) {
            let secondaryId = null;
            const tags = [...(clue.tags||[]), ...(clue.misdirectionTags||[])];
            if (tags.some(t => ['professor','akademiskt'].includes(t))) secondaryId = 4;
            else if (tags.some(t => ['industri','ekonomi'].includes(t))) secondaryId = 5;
            else if (tags.some(t => ['detektiv'].includes(t))) secondaryId = 1;
            else secondaryId = allPersonas.find(p => p.id !== 6)?.id;
            if (secondaryId) {
              suspicionMapRef.current[secondaryId] = (suspicionMapRef.current[secondaryId] || 0) + sec;
            }
          }
          forceRender(x => x + 1);
        }
        return next;
      });

      setTimeout(() => {
        setUserAnswer('');
        setShowHint(false);
        setFeedback(null);
        if (currentChallenge < challenges.length - 1) {
          setCurrentChallenge(currentChallenge + 1);
        } else {
          setShowSecretsRound(true);
          setScreen(Screens.SECRETS);
        }
      }, 2000);
    } else {
      setFeedback({ type: 'error', message: 'Fel svar!' });
      setTimeout(() => setFeedback(null), 3000);
      // trigger conversation prompt for challenge failed
      triggerPrompt('challenge_failed');
      // Failed answer → small chance injection
      if (Math.random() < 0.35) maybeInject('challengeFail');
    }
  };

  const startVoting = () => {
    setShowVotingPanel(true);
    setVotingInProgress(true);
    setVotes({});
    // trigger conversation prompts for voting
    triggerPrompt('voting_started');
  };

  const castVote = (voterId, suspectId) => setVotes(prev => ({ ...prev, [voterId]: suspectId }));

  const finishVoting = () => {
    if (!votes.group) {
      alert('Ni måste välja någon att anklaga först!');
      return;
    }
    const accusedPlayer = selectedPlayers.find(p => p.id === votes.group);
    if (accusedPlayer.id === murderer.id) {
      setShowVotingPanel(false);
      setScreen(Screens.REVEAL);
    } else {
      setEliminatedPlayers([...eliminatedPlayers, accusedPlayer.id]);
      setFeedback({
        type: 'error',
        message: `${accusedPlayer.name} var OSKYLDIG! Hen är nu eliminerad och kan inte längre delta. Mördaren går fri...`
      });
      setTimeout(() => {
        setShowVotingPanel(false);
        setVotingInProgress(false);
        setVotes({});
        setFeedback(null);
      }, 5000);
    }
  };

  const completeVideoChallenge = (challengeId) => {
    setVideoChallenges(prev => 
      prev.map(vc => vc.id === challengeId ? { ...vc, completed: true } : vc)
    );
  };

  const restart = () => {
    setScreen(Screens.SETUP);
    setPlayerCount(5);
    setSelectedPlayers([]);
    setMurderer(null);
    setCurrentChallenge(0);
    setUnlockedClues([]);
    setDeepAnalyses([]);
    setVideoChallenges(initialVideoChallenges);
    setSilencedUntil({});
    setHintSuppressedUntil(0);
    setSubmitDisabledUntil(0);
    setLockedDeepHints([]);
    setConsequenceMessages([]);
    setUserAnswer('');
    setShowHint(false);
    setShowSecretsRound(false);
    setShowCharacterCards(false);
    setEliminatedPlayers([]);
    setVotes({});
    setFeedback(null);
    setShowVideoUnlockModal(false);
    setHasShownVideoUnlock(false);
    suspicionMapRef.current = {};
  };

  const activePlayers = selectedPlayers.filter(p => !eliminatedPlayers.includes(p.id));

  // When a clue becomes available (unlocked), capture its tags for red herring context
  useEffect(() => {
    if (!unlockedClues.length) return;
    const lastId = unlockedClues[unlockedClues.length - 1];
    const clue = clues.find(c => c.id === lastId);
    if (clue) {
      lastClueTagsRef.current = clue.tags || [];
      // Attempt injection after real clue sometimes
      if (Math.random() < 0.4) maybeInject('afterClue');
    }
  }, [unlockedClues, maybeInject]);

  // Show video unlock modal when "Analysera säkerhetssystemet" (challenge id 2) is completed
  useEffect(() => {
    const isVideoUnlocked = unlockedClues.includes(2);
    if (isVideoUnlocked && !hasShownVideoUnlock && screen === Screens.GAME) {
      setShowVideoUnlockModal(true);
      setHasShownVideoUnlock(true);
    }
  }, [unlockedClues, hasShownVideoUnlock, screen]);

  // Whenever a new observation (possibly red herring) arrives, adjust suspicion for misleads
  useEffect(() => {
    if (!observations.length) return;
    const last = observations[observations.length - 1];
    const h = redHerrings.find(r => r.id === last.id);
    if (h && h.misleads) {
      h.misleads.forEach(id => {
        suspicionMapRef.current[id] = (suspicionMapRef.current[id] || 0) + 1; // small incremental bump
      });
      forceRender(x => x + 1);
    }
  }, [observations, forceRender]);

  // Deep analysis action (Feature 1): reveals deepHint at time cost
  const analyzeClue = (clueId) => {
    if (deepAnalyses.includes(clueId)) return;
    const clue = clues.find(c => c.id === clueId);
    if (!clue || !clue.deepHint) return;
    if (lockedDeepHints.includes(clueId)) return; // locked by previous consequence
    setDeepAnalyses(prev => [...prev, clueId]);
    // trigger conversation prompt for deep analysis
    triggerPrompt('deep_analysis');
    // Apply random hidden consequence
    applyRandomConsequence(clueId);
  };

  // Random consequence generator for deep analysis.
  const applyRandomConsequence = (sourceClueId) => {
    const activePlayersPool = selectedPlayers.filter(p => !eliminatedPlayers.includes(p.id));
    const now = Date.now();
    const consequencePool = [
      {
        type: 'silence_player',
        weight: 1,
        run: () => {
          if (!activePlayersPool.length) return null;
            const picked = pickRandom(activePlayersPool);
            const durationMs = 120000; // 2 min
            setSilencedUntil(prev => ({ ...prev, [picked.id]: now + durationMs }));
            return `Konsekvens: ${picked.name} drabbas av intensiv huvudvärk och måste vara tyst i 2 minuter.`;
        }
      },
      {
        type: 'disable_hint',
        weight: 0.9,
        run: () => {
          const durationMs = 90000; // 90s
          setHintSuppressedUntil(now + durationMs);
          return 'Konsekvens: Hint-systemet överbelastas och kan inte användas på ~90 sekunder.';
        }
      },
      {
        type: 'lock_submit',
        weight: 0.8,
        run: () => {
          const durationMs = 30000; // 30s
          setSubmitDisabledUntil(now + durationMs);
          return 'Konsekvens: Kognitiv paralysering – svarsknappen är låst i 30 sekunder.';
        }
      },
      {
        type: 'lock_future_deep',
        weight: 0.7,
        run: () => {
          const remaining = clues.filter(c => !deepAnalyses.includes(c.id) && c.id !== sourceClueId && c.deepHint && !lockedDeepHints.includes(c.id));
          if (!remaining.length) return 'Konsekvens: Överhettning – ingen framtida analys påverkas (inget att låsa).';
          const pickedClue = pickRandom(remaining);
          setLockedDeepHints(prev => [...prev, pickedClue.id]);
          return `Konsekvens: Analysutrustning skadad – fördjupad analys låses permanent för "${pickedClue.title}".`;
        }
      },
      {
        type: 'inject_red_herring',
        weight: 1,
        run: () => {
          maybeInject('analysisFallout');
          return 'Konsekvens: Sensorisk artefakt – en tvetydig observation dyker upp.';
        }
      }
    ];
    // Weighted pick (simple proportional)
    const totalW = consequencePool.reduce((a,c)=>a+c.weight,0);
    let r = Math.random() * totalW;
    let chosen = consequencePool[0];
    for (const c of consequencePool) { r -= c.weight; if (r <= 0) { chosen = c; break; } }
    const msg = chosen.run();
    if (msg) {
      setConsequenceMessages(m => [...m.slice(-3), { id: `${chosen.type}_${now}`, text: msg, ts: now }]);
    }
    setFeedback({ type: 'info', message: 'Fördjupad analys lyckades. En konsekvens utlöstes.' });
    setTimeout(() => {
      setFeedback(f => (f && f.type === 'info' ? null : f));
    }, 3500);
  };

  // Penalty ticker to update countdowns visually
  useEffect(() => {
    const int = setInterval(() => setPenaltyTick(t => t + 1), 1000);
    return () => clearInterval(int);
  }, []);

  // Render
  if (screen === Screens.SETUP) {
    return (
      <>
        <SetupScreen
          playerCount={playerCount}
            setPlayerCount={setPlayerCount}
            onDistribute={distributeRoles}
            showCharacterCards={showCharacterCards}
            setShowCharacterCards={setShowCharacterCards}
            challenges={challenges}
          />
        {showCharacterCards && (
          <CharacterCardsModal personas={personas} onClose={() => setShowCharacterCards(false)} />
        )}
      </>
    );
  }

  if (screen === Screens.CHARACTERS) {
    return (
      <CharacterDistribution
        selectedPlayers={selectedPlayers}
        murderer={murderer}
        onStartIntro={() => setScreen(Screens.MURDER_SEQUENCE)}
      />
    );
  }

  if (screen === Screens.MURDER_SEQUENCE) {
    return <MurderSequence onComplete={() => setScreen(Screens.INTRO)} />;
  }

  if (screen === Screens.INTRO) {
    return <IntroScreen onStartGame={() => setScreen(Screens.GAME)} />;
  }

  if (screen === Screens.SECRETS || showSecretsRound) {
    return (
      <SecretsScreen
        selectedPlayers={selectedPlayers}
        onReveal={() => setScreen(Screens.REVEAL)}
      />
    );
  }

  if (screen === Screens.GAME) {
    return (
      <>
        <GameScreen
          challenge={challenges[currentChallenge]}
          currentIndex={currentChallenge}
          totalChallenges={challenges.length}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          checkAnswer={checkAnswer}
          showHint={showHint}
          setShowHint={setShowHint}
          feedback={feedback}
          timeRemaining={timeRemaining}
          unlockedClues={unlockedClues}
          clues={clues}
          deepAnalyses={deepAnalyses}
          onAnalyzeClue={analyzeClue}
          startVoting={startVoting}
          showVotingPanel={showVotingPanel}
          onCancelVoting={() => { setShowVotingPanel(false); setVotingInProgress(false); setVotes({}); }}
          onFinishVoting={finishVoting}
          votes={votes}
          castVote={castVote}
          activePlayers={activePlayers}
          selectedPlayers={selectedPlayers}
          eliminatedPlayers={eliminatedPlayers}
          votingInProgress={votingInProgress}
          silencedUntil={silencedUntil}
          hintSuppressedUntil={hintSuppressedUntil}
          submitDisabledUntil={submitDisabledUntil}
          lockedDeepHints={lockedDeepHints}
          consequenceMessages={consequenceMessages}
          penaltyTick={penaltyTick}
          videoChallenges={videoChallenges}
          onCompleteVideoChallenge={completeVideoChallenge}
          observations={observations}
        />
        <div className="max-w-6xl mx-auto px-4 relative">
          {/* Conversation prompts layer */}
          {currentPrompt && (
            <ConversationPrompts
              prompts={[currentPrompt]}
              onDismiss={dismissPrompt}
            />
          )}
        </div>
        {/* Video unlock modal */}
        {showVideoUnlockModal && (
          <VideoUnlockModal onClose={() => setShowVideoUnlockModal(false)} />
        )}
      </>
    );
  }

  if (screen === Screens.REVEAL) {
    return <RevealScreen murderer={murderer} onRestart={restart} />;
  }

  return null;
}

export default MurderMysteryApp;
