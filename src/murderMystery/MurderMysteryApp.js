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
import { DiceRollScreen } from './components/DiceRollScreen';
import { MurderSequence } from './components/MurderSequence';
import { IntroScreen } from './components/IntroScreen';
import { GameScreen } from './components/GameScreen';
import { AccusationScreen } from './components/AccusationScreen';
import { RevealScreen } from './components/RevealScreen';
import { ConversationPrompts } from './components/ConversationPrompts';
import { VideoUnlockModal } from './components/VideoUnlockModal';
import { ButlerTestimonyModal } from './components/ButlerTestimonyModal';
import { InterrogationModal } from './components/InterrogationModal';
import { InterrogationResultModal } from './components/InterrogationResultModal';
import { PhoneCallModal } from './components/PhoneCallModal';
import { useRedHerrings } from './hooks/useRedHerrings';
import { useConversationPrompts } from './hooks/useConversationPrompts';
import { MusicPlayer } from './components/MusicPlayer';
import { personas as allPersonas } from './data/personas';

export function MurderMysteryApp() {
  const [screen, setScreen] = useState(Screens.SETUP);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [playerCount, setPlayerCount] = useState(5);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [murderer, setMurderer] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [unlockedClues, setUnlockedClues] = useState([]);
  const [videoChallenges, setVideoChallenges] = useState(initialVideoChallenges);
  // Consequence / penalty system state
  const [silencedUntil, setSilencedUntil] = useState({}); // {characterId: timestamp}
  const [hintSuppressedUntil, setHintSuppressedUntil] = useState(0);
  const [submitDisabledUntil, setSubmitDisabledUntil] = useState(0);
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
  const [showButlerTestimony, setShowButlerTestimony] = useState(false);
  const [isFinalVote, setIsFinalVote] = useState(false);
  // Phone call modal (clue 4)
  const [showPhoneCallModal, setShowPhoneCallModal] = useState(false);
  const [hasShownPhoneCall, setHasShownPhoneCall] = useState(false);
  const [phoneCallAnswered, setPhoneCallAnswered] = useState(false);
  // Interrogation system
  const [showInterrogationModal, setShowInterrogationModal] = useState(false);
  const [interrogationsUsed, setInterrogationsUsed] = useState(0);
  const [interrogationResult, setInterrogationResult] = useState(null);
  const MAX_INTERROGATIONS = 3;
  // Suspicion tracking (placeholder simple heuristic)
  const suspicionMapRef = useRef({}); // characterId -> score
  const lastClueTagsRef = useRef([]);
  const forceRender = useState(0)[1]; // trigger rerender for suspicion updates

  // Force murderer to be Victor von Sterling (id 2) for plot twist narrative
  // Arabella (id 6) looks guilty early but is actually innocent.
  // If Victor isn't in selected players (few players), fallback to random.

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
    // Always include these 5 core characters
    const coreCharacters = [
      personas.find(p => p.id === 1), // Inspektör Reginald Blackwood
      personas.find(p => p.id === 2), // Victor von Sterling
      personas.find(p => p.id === 4), // Professor Edmund Thornbury
      personas.find(p => p.id === 5), // Maximillian Max Goldstein
      personas.find(p => p.id === 6), // Dr. Arabella Cogsworth
    ].filter(Boolean);

    // If more than 5 players, add random additional characters
    let selected = [...coreCharacters];
    if (playerCount > 5) {
      const remaining = personas.filter(p => ![1, 2, 4, 5, 6].includes(p.id));
      const additional = shuffle(remaining).slice(0, playerCount - 5);
      selected = shuffle([...selected, ...additional]);
    } else {
      selected = shuffle(selected);
    }

    setSelectedPlayers(selected);
    const victor = selected.find(p => p.id === 2);
    setMurderer(victor || pickRandom(selected));
    setScreen(Screens.DICE_ROLL);
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
    murdererId: 2, // Victor von Sterling
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
          // suspicion tracking uses clue's primary/secondary weights
          // early clues point at Arabella (id 6), later clues point at Victor (id 2)
          const primaryId = clue.tags.includes('källarvalv') ? 6 : (clue.tags.includes('skuld') || clue.tags.includes('beställning')) ? 2 : 6;
          suspicionMapRef.current[primaryId] = (suspicionMapRef.current[primaryId] || 0) + (clue.suspicionWeight.primary || 0);
          // Secondary heuristic mapping
          const sec = clue.suspicionWeight.secondary || 0;
          if (sec > 0) {
            let secondaryId = null;
            const tags = [...(clue.tags||[]), ...(clue.misdirectionTags||[])];
            if (tags.some(t => ['professor','akademiskt','sömnmedel'].includes(t))) secondaryId = 4;
            else if (tags.some(t => ['industri','ekonomi'].includes(t))) secondaryId = 5;
            else if (tags.some(t => ['detektiv'].includes(t))) secondaryId = 1;
            else if (tags.some(t => ['nervositet','skuld'].includes(t))) secondaryId = 2;
            else secondaryId = allPersonas.find(p => p.id !== primaryId)?.id;
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
          // show butler testimony after final challenge
          setShowButlerTestimony(true);
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

    // Check if they accused Victor (the murderer) or Arabella (accomplice)
    if (accusedPlayer.id === 2) {
      // Victor is the murderer - they win!
      setShowVotingPanel(false);
      setIsFinalVote(false);
      setScreen(Screens.REVEAL);
    } else if (accusedPlayer.id === 6) {
      // Arabella is accomplice - they lose but get special message
      setShowVotingPanel(false);
      setFeedback({
        type: 'error',
        message: `${accusedPlayer.name} var medhjälpare, men Victor von Sterling - den verkliga mördaren - går fri! NI FÖRLORADE!`
      });
      setTimeout(() => {
        setScreen(Screens.REVEAL);
        setIsFinalVote(false);
      }, 5000);
    } else if (isFinalVote) {
      // FINAL VOTE: If wrong, they lose - game over
      setShowVotingPanel(false);
      setFeedback({
        type: 'error',
        message: `${accusedPlayer.name} var OSKYLDIG! NI FÖRLORADE! Victor von Sterling och Dr. Arabella går fria från mordet...`
      });
      setTimeout(() => {
        setScreen(Screens.REVEAL);
        setIsFinalVote(false);
      }, 5000);
    } else {
      // Regular vote: eliminate and continue
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

  const handleInterrogate = (personId) => {
    const person = selectedPlayers.find(p => p.id === personId);
    if (person) {
      setInterrogationResult({ person });
      setInterrogationsUsed(prev => prev + 1);
      setShowInterrogationModal(false);
    }
  };  const restart = () => {
    setScreen(Screens.SETUP);
    setPlayerCount(5);
    setSelectedPlayers([]);
    setMurderer(null);
    setCurrentChallenge(0);
    setUnlockedClues([]);
    setVideoChallenges(initialVideoChallenges);
    setSilencedUntil({});
    setHintSuppressedUntil(0);
    setSubmitDisabledUntil(0);
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
    setShowButlerTestimony(false);
    setInterrogationsUsed(0);
    setInterrogationResult(null);
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

  // Show phone call modal when clue 4 is unlocked
  useEffect(() => {
    const isPhoneCallUnlocked = unlockedClues.includes(4);
    if (isPhoneCallUnlocked && !hasShownPhoneCall && screen === Screens.GAME) {
      setShowPhoneCallModal(true);
      setHasShownPhoneCall(true);
    }
  }, [unlockedClues, hasShownPhoneCall, screen]);

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

  // Penalty ticker to update countdowns visually
  useEffect(() => {
    const int = setInterval(() => setPenaltyTick(t => t + 1), 1000);
    return () => clearInterval(int);
  }, []);

  // Render
  let screenContent;

  if (screen === Screens.SETUP) {
    screenContent = (
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
  } else if (screen === Screens.DICE_ROLL) {
    screenContent = (
      <>
        <DiceRollScreen
          selectedPlayers={selectedPlayers}
          onContinue={() => setScreen(Screens.MURDER_SEQUENCE)}
        />
      </>
    );
  } else if (screen === Screens.MURDER_SEQUENCE) {
    screenContent = (
      <>
        <MurderSequence
          onComplete={() => setScreen(Screens.INTRO)}
          onVideoStateChange={setIsVideoPlaying}
        />
      </>
    );
  } else if (screen === Screens.INTRO) {
    screenContent = (
      <>
        <IntroScreen onStartGame={() => setScreen(Screens.GAME)} />
      </>
    );
  } else if (screen === Screens.SECRETS || showSecretsRound) {
    screenContent = (
      <>
        <AccusationScreen
          selectedPlayers={selectedPlayers}
          murderer={murderer}
          onReveal={() => {
            setShowSecretsRound(false);
            setScreen(Screens.GAME);
            setIsFinalVote(true); // Mark this as the final vote
            startVoting();
          }}
        />
      </>
    );
  } else if (screen === Screens.GAME) {
    screenContent = (
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
          startVoting={startVoting}
          showVotingPanel={showVotingPanel}
          onCancelVoting={() => { setShowVotingPanel(false); setVotingInProgress(false); setVotes({}); setIsFinalVote(false); }}
          onFinishVoting={finishVoting}
          votes={votes}
          castVote={castVote}
          activePlayers={activePlayers}
          selectedPlayers={selectedPlayers}
          eliminatedPlayers={eliminatedPlayers}
          votingInProgress={votingInProgress}
          isFinalVote={isFinalVote}
          silencedUntil={silencedUntil}
          hintSuppressedUntil={hintSuppressedUntil}
          submitDisabledUntil={submitDisabledUntil}
          consequenceMessages={consequenceMessages}
          penaltyTick={penaltyTick}
          videoChallenges={videoChallenges}
          onCompleteVideoChallenge={completeVideoChallenge}
          observations={observations}
          onVideoStateChange={setIsVideoPlaying}
          interrogationsRemaining={MAX_INTERROGATIONS - interrogationsUsed}
          onOpenInterrogation={() => setShowInterrogationModal(true)}
          phoneCallAnswered={phoneCallAnswered}
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
        {/* Phone call modal (clue 4) */}
        {showPhoneCallModal && (
          <PhoneCallModal
            clue={clues.find(c => c.id === 4)}
            onAnswer={() => {
              setPhoneCallAnswered(true);
              setShowPhoneCallModal(false);
            }}
            onDecline={() => {
              setPhoneCallAnswered(false);
              setShowPhoneCallModal(false);
            }}
          />
        )}
        {/* Butler testimony modal after final challenge */}
        {showButlerTestimony && (
          <ButlerTestimonyModal
            onClose={() => {
              setShowButlerTestimony(false);
              setShowSecretsRound(true);
              setScreen(Screens.SECRETS);
            }}
            onVideoStateChange={setIsVideoPlaying}
          />
        )}
        {/* Interrogation modals */}
        {showInterrogationModal && (
          <InterrogationModal
            selectedPlayers={selectedPlayers}
            interrogationsRemaining={MAX_INTERROGATIONS - interrogationsUsed}
            onClose={() => setShowInterrogationModal(false)}
            onInterrogate={handleInterrogate}
          />
        )}
        {interrogationResult && (
          <InterrogationResultModal
            person={interrogationResult.person}
            onClose={() => setInterrogationResult(null)}
          />
        )}
      </>
    );
  } else if (screen === Screens.REVEAL) {
    screenContent = (
      <>
        <RevealScreen murderer={murderer} onRestart={restart} />
      </>
    );
  } else {
    screenContent = null;
  }


  return (
    <>
      {screenContent}
      <MusicPlayer isVideoPlaying={isVideoPlaying} />
    </>
  );
}

export default MurderMysteryApp;
