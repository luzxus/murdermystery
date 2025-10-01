import React, { useState, useEffect } from 'react';
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
    setMurderer(pickRandom(selected));
    setScreen(Screens.CHARACTERS);
  };

  const checkAnswer = () => {
    const challenge = challenges[currentChallenge];
    if (isAcceptedAnswer(userAnswer, challenge.acceptedAnswers)) {
      setTimerActive(false);
      setFeedback({ type: 'success', message: 'Rätt! Ledtråd upplåst!' });
      setUnlockedClues([...unlockedClues, challenge.id]);

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
    );
  }

  if (screen === Screens.REVEAL) {
    return <RevealScreen murderer={murderer} onRestart={restart} />;
  }

  return null;
}

export default MurderMysteryApp;
