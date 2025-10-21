import React, { useState } from 'react';
import { AlertCircle, Search, AlertTriangle, Clock, Users } from 'lucide-react';
import { ChallengeModal } from './ChallengeModal';
import { VotingPanel } from './VotingPanel';
import { EvidenceTimeline } from './EvidenceTimeline';
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
  isFinalVote,
  silencedUntil,
  hintSuppressedUntil,
  submitDisabledUntil,
  consequenceMessages,
  penaltyTick,
  videoChallenges,
  onCompleteVideoChallenge,
  observations,
  onVideoStateChange,
  interrogationsRemaining,
  onOpenInterrogation,
  phoneCallAnswered
}) {
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const indexLabel = `${currentIndex + 1} / ${totalChallenges}`;
  const composedChallenge = { ...challenge, indexLabel };

  // Check if video tab should be unlocked (challenge id 2 completed)
  const isVideoTabUnlocked = unlockedClues.includes(2);

  const hasMoreChallenges = currentIndex < totalChallenges;

  // close modal when answer is correct
  React.useEffect(() => {
    if (feedback?.type === 'success' && showChallengeModal) {
      // delay closing slightly so user sees success message
      const timer = setTimeout(() => {
        setShowChallengeModal(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [feedback, showChallengeModal]);

  return (
    <div
      className="min-h-screen relative bg-gradient-to-br from-slate-900/85 via-purple-900/70 to-slate-900/85 p-4 md:p-8"
      style={{ backgroundImage: `url(${MANOR_STILL})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header - Investigation Status */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Utredningen</h1>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 bg-purple-900/50 px-4 py-2 rounded-lg">
              <Users className="w-5 h-5 text-purple-300" />
              <span className="text-white text-sm">
                {activePlayers.length}/{selectedPlayers.length} aktiva
              </span>
            </div>
            {eliminatedPlayers.length > 0 && (
              <div className="flex items-center gap-2 bg-red-900/50 px-4 py-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-300" />
                <span className="text-red-200 text-sm">
                  {eliminatedPlayers.length} eliminerad{eliminatedPlayers.length > 1 ? 'e' : ''}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Active Consequences Banner */}
        <ConsequenceBanner
          silencedUntil={silencedUntil}
          hintSuppressedUntil={hintSuppressedUntil}
          submitDisabledUntil={submitDisabledUntil}
          selectedPlayers={selectedPlayers}
          penaltyTick={penaltyTick}
        />

        {/* Primary Actions - Tools Layer */}
        <div className="mb-8 space-y-4">
          {/* Investigation Action */}
          {hasMoreChallenges && (
            <div className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-500/30 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono bg-purple-600/40 text-purple-200 px-2 py-0.5 rounded">
                      ÅTGÄRD #{indexLabel}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-1">{challenge.title}</h3>
                  <p className="text-purple-200 text-sm">{challenge.description}</p>
                </div>
                <button
                  onClick={() => setShowChallengeModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-bold transition-all hover:scale-105 shadow-lg flex items-center gap-2 whitespace-nowrap"
                >
                  <Search className="w-5 h-5" />
                  Utför åtgärd
                </button>
              </div>
            </div>
          )}

          {/* Accusation Button */}
          {!votingInProgress && (
            <div className="flex justify-center gap-4">
              <button
                onClick={onOpenInterrogation}
                disabled={interrogationsRemaining === 0}
                className={`${
                  interrogationsRemaining > 0
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-gray-600 cursor-not-allowed'
                } text-white px-6 py-3 rounded-xl font-bold flex items-center gap-3 transition-all hover:scale-105 shadow-2xl`}
              >
                <Users className="w-6 h-6" />
                FÖRHÖR ({interrogationsRemaining}/3)
              </button>
              <button
                onClick={startVoting}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all hover:scale-105 shadow-2xl"
              >
                <AlertCircle className="w-6 h-6" />
                ANKLAGA MÖRDAREN
              </button>
            </div>
          )}
        </div>

        {/* Voting Panel */}
        {showVotingPanel && (
          <div className="mb-8">
            <VotingPanel
              activePlayers={activePlayers}
              selectedPlayers={selectedPlayers}
              votes={votes}
              castVote={castVote}
              onCancel={onCancelVoting}
              onFinish={onFinishVoting}
              feedback={feedback}
              isFinalVote={isFinalVote}
            />
          </div>
        )}

        {/* Evidence Timeline - Information Layer */}
        <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-slate-700/30 shadow-2xl">
          <EvidenceTimeline
            clues={clues}
            unlockedClues={unlockedClues}
            selectedPlayers={selectedPlayers}
            observations={observations}
            videoChallenges={videoChallenges}
            onCompleteVideoChallenge={onCompleteVideoChallenge}
            isVideoUnlocked={isVideoTabUnlocked}
            onVideoStateChange={onVideoStateChange}
            phoneCallAnswered={phoneCallAnswered}
          />
        </div>
      </div>

      {/* Challenge Modal */}
      {showChallengeModal && (
        <ChallengeModal
          challenge={composedChallenge}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          onSubmit={checkAnswer}
          showHint={showHint}
          setShowHint={setShowHint}
          feedback={feedback}
          timeRemaining={timeRemaining}
          onClose={() => setShowChallengeModal(false)}
          hintSuppressedUntil={hintSuppressedUntil}
          submitDisabledUntil={submitDisabledUntil}
          penaltyTick={penaltyTick}
        />
      )}
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
