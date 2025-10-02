import React, { useState } from 'react';
import { AlertCircle, Scroll, Video, Eye, AlertTriangle, Clock } from 'lucide-react';
import { ChallengePanel, CluesList } from './ChallengePanel';
import { VotingPanel } from './VotingPanel';
import { VideoPanel } from './VideoPanel';
import { ObservationsPanel } from './ObservationsPanel';
import { MANOR_STILL } from '../constants';

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
  deepAnalyses,
  onAnalyzeClue,
  startVoting,
  showVotingPanel,
  onCancelVoting,
  onFinishVoting,
  votes,
  castVote,
  activePlayers,
  selectedPlayers,
  eliminatedPlayers,
  votingInProgress,
  silencedUntil,
  hintSuppressedUntil,
  submitDisabledUntil,
  lockedDeepHints,
  consequenceMessages,
  penaltyTick,
  videoChallenges,
  onCompleteVideoChallenge,
  observations
}) {
  const [activeTab, setActiveTab] = useState('clues'); // 'clues', 'videos', or 'observations'
  const indexLabel = `${currentIndex + 1} / ${totalChallenges}`;
  const composedChallenge = { ...challenge, indexLabel };

  // Check if video tab should be unlocked (2+ clues unlocked)
  const isVideoTabUnlocked = unlockedClues.length >= 2;

  return (
    <div
      className="min-h-screen relative bg-gradient-to-br from-slate-900/85 via-purple-900/70 to-slate-900/85 p-4 md:p-8"
      style={{ backgroundImage: `url(${MANOR_STILL})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Active Consequences Banner */}
        <ConsequenceBanner
          silencedUntil={silencedUntil}
          hintSuppressedUntil={hintSuppressedUntil}
          submitDisabledUntil={submitDisabledUntil}
          selectedPlayers={selectedPlayers}
          penaltyTick={penaltyTick}
        />

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
            hintSuppressedUntil={hintSuppressedUntil}
            submitDisabledUntil={submitDisabledUntil}
            penaltyTick={penaltyTick}
          />

          <div className="space-y-4">
            {/* Tab Navigation */}
            <div className="flex gap-2 bg-white/10 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('clues')}
                className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-sm ${
                  activeTab === 'clues'
                    ? 'bg-purple-600 text-white'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                <Scroll className="w-4 h-4" />
                Ledtrådar
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                disabled={!isVideoTabUnlocked}
                className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-sm ${
                  activeTab === 'videos'
                    ? 'bg-purple-600 text-white'
                    : !isVideoTabUnlocked
                    ? 'text-white/30 cursor-not-allowed'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                <Video className="w-4 h-4" />
                Videomaterial
                {!isVideoTabUnlocked && (
                  <span className="text-xs bg-red-600 px-2 py-0.5 rounded-full">
                    Låst
                  </span>
                )}
                {isVideoTabUnlocked && videoChallenges.filter(vc => vc.completed).length > 0 && (
                  <span className="text-xs bg-green-600 px-2 py-0.5 rounded-full">
                    {videoChallenges.filter(vc => vc.completed).length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('observations')}
                className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-sm ${
                  activeTab === 'observations'
                    ? 'bg-purple-600 text-white'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                <Eye className="w-4 h-4" />
                Händelser
                {observations && observations.length > 0 && (
                  <span className="text-xs bg-amber-600 px-2 py-0.5 rounded-full">
                    {observations.length}
                  </span>
                )}
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'clues' ? (
              <CluesList
                clues={clues}
                unlockedClues={unlockedClues}
                deepAnalyses={deepAnalyses}
                onAnalyzeClue={onAnalyzeClue}
                lockedDeepHints={lockedDeepHints}
              />
            ) : activeTab === 'videos' ? (
              <VideoPanel
                videoChallenges={videoChallenges}
                selectedPlayers={selectedPlayers}
                onCompleteChallenge={onCompleteVideoChallenge}
                isUnlocked={isVideoTabUnlocked}
              />
            ) : (
              <ObservationsPanel observations={observations} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsequenceBanner({ silencedUntil, hintSuppressedUntil, submitDisabledUntil, selectedPlayers, penaltyTick }) {
  const now = Date.now();
  const activeConsequences = [];

  Object.entries(silencedUntil || {}).forEach(([id, ts]) => {
    if (ts > now) {
      const player = selectedPlayers?.find(p => p.id === parseInt(id));
      const playerName = player ? player.name : `Spelare #${id}`;
      activeConsequences.push({
        id: `silenced_${id}`,
        text: `${playerName} är tystad`,
        countdown: Math.ceil((ts - now) / 1000),
        icon: '🔇',
        color: 'bg-red-600/90'
      });
    }
  });

  if (hintSuppressedUntil > now) {
    activeConsequences.push({
      id: 'hint_sup',
      text: 'Hints avstängda',
      countdown: Math.ceil((hintSuppressedUntil - now) / 1000),
      icon: '💡',
      color: 'bg-yellow-600/90'
    });
  }

  if (submitDisabledUntil > now) {
    activeConsequences.push({
      id: 'submit_sup',
      text: 'Svar låst',
      countdown: Math.ceil((submitDisabledUntil - now) / 1000),
      icon: '🔒',
      color: 'bg-orange-600/90'
    });
  }

  if (activeConsequences.length === 0) return null;

  return (
    <div className="mb-6 space-y-2">
      {activeConsequences.map(consequence => (
        <div
          key={consequence.id}
          className={`${consequence.color} border-2 border-white/30 rounded-xl p-4 shadow-lg animate-pulse`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-white" />
              <div>
                <p className="text-white font-bold text-lg">
                  {consequence.icon} {consequence.text}
                </p>
                <p className="text-white/80 text-sm">
                  Varje fördjupad analys har oförutsedda konsekvenser
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-white" />
              <span className="text-white font-mono text-xl font-bold">
                {consequence.countdown}s
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
