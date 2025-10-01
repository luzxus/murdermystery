import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ChallengePanel, CluesList } from './ChallengePanel';
import { VotingPanel } from './VotingPanel';

export function GameScreen({
  challenge,
  currentIndex,
  totalChallenges,
  userAnswer,
  setUserAnswer,
  checkAnswer,
  showHint,
  setShowHint,
  feedback,
  timeRemaining,
  unlockedClues,
  clues,
  startVoting,
  showVotingPanel,
  onCancelVoting,
  onFinishVoting,
  votes,
  castVote,
  activePlayers,
  selectedPlayers,
  eliminatedPlayers,
  votingInProgress
}) {
  const indexLabel = `${currentIndex + 1} / ${totalChallenges}`;
  const composedChallenge = { ...challenge, indexLabel };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {!votingInProgress && (
          <div className="mb-6 flex justify-center">
            <button
              onClick={startVoting}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
            >
              <AlertCircle className="w-5 h-5" />
              Starta omröstning - Anklaga någon!
            </button>
          </div>
        )}

        {showVotingPanel && (
          <VotingPanel
            activePlayers={activePlayers}
            selectedPlayers={selectedPlayers}
            votes={votes}
            castVote={castVote}
            onCancel={onCancelVoting}
            onFinish={onFinishVoting}
            feedback={feedback}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChallengePanel
            challenge={composedChallenge}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            onSubmit={checkAnswer}
            showHint={showHint}
            setShowHint={setShowHint}
            feedback={feedback}
            timeRemaining={timeRemaining}
            activePlayersCount={activePlayers.length}
            totalPlayers={selectedPlayers.length}
            eliminatedCount={eliminatedPlayers.length}
          />

          <CluesList clues={clues} unlockedClues={unlockedClues} />
        </div>
      </div>
    </div>
  );
}
