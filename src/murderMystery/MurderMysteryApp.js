import React, { useState, useEffect, useRef } from 'react';
import { personas } from './data/personas';
import { challenges } from './data/challenges';
import { clues } from './data/clues';
import { Screens } from './constants';
import { shuffle, pickRandom, isAcceptedAnswer } from './utils/gameUtils';

import { SetupScreen } from './components/SetupScreen';
import { CharacterCardsModal } from './components/CharacterCardsModal';
import { CharacterDistribution } from './components/CharacterDistribution';
import { IntroScreen } from './components/IntroScreen';
import { GameScreen } from './components/GameScreen';
import { SecretsScreen } from './components/SecretsScreen';
import { RevealScreen } from './components/RevealScreen';
import { AmbientObservations } from './components/AmbientObservations';
import { useRedHerrings } from './hooks/useRedHerrings';

export function MurderMysteryApp() {
  const [screen, setScreen] = useState(Screens.SETUP);
  const [playerCount, setPlayerCount] = useState(5);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [murderer, setMurderer] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [unlockedClues, setUnlockedClues] = useState([]);
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
  // Suspicion tracking (placeholder simple heuristic)
  const suspicionMapRef = useRef({}); // characterId -> score
  const lastClueTagsRef = useRef([]);

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

  const checkAnswer = () => {
    const challenge = challenges[currentChallenge];
    if (isAcceptedAnswer(userAnswer, challenge.acceptedAnswers)) {
      setTimerActive(false);
      setFeedback({ type: 'success', message: 'Rätt! Ledtråd upplåst!' });
      setUnlockedClues(prev => {
        const next = [...prev, challenge.id];
        // Register clue opened for red herring ratio
        registerRealClue();
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
      // Failed answer → small chance injection
      if (Math.random() < 0.35) maybeInject('challengeFail');
    }
  };

  const startVoting = () => {
    setShowVotingPanel(true);
    setVotingInProgress(true);
    setVotes({});
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

  const restart = () => {
    setScreen(Screens.SETUP);
    setPlayerCount(5);
    setSelectedPlayers([]);
    setMurderer(null);
    setCurrentChallenge(0);
    setUnlockedClues([]);
    setUserAnswer('');
    setShowHint(false);
    setShowSecretsRound(false);
    setShowCharacterCards(false);
    setEliminatedPlayers([]);
    setVotes({});
    setFeedback(null);
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
        onStartIntro={() => setScreen(Screens.INTRO)}
      />
    );
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
        />
        <div className="max-w-6xl mx-auto px-4">
          <AmbientObservations items={observations} />
        </div>
      </>
    );
  }

  if (screen === Screens.REVEAL) {
    return <RevealScreen murderer={murderer} onRestart={restart} />;
  }

  return null;
}

export default MurderMysteryApp;
