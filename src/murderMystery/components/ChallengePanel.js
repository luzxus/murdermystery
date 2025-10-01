import React from 'react';
import { Clock, Unlock, Lock } from 'lucide-react';
import { formatTime } from '../utils/gameUtils';

export function ChallengePanel({
  challenge,
  userAnswer,
  setUserAnswer,
  onSubmit,
  showHint,
  setShowHint,
  feedback,
  timeRemaining,
  activePlayersCount,
  totalPlayers,
  eliminatedCount
}) {
  return (
    <div className="min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Utredningen</h1>
        <div className="flex items-center justify-center gap-4">
          <p className="text-gray-300">Utmaning {challenge.indexLabel}</p>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            timeRemaining < 60 ? 'bg-red-900/50 animate-pulse' : 'bg-purple-900/50'
          }`}>
            <Clock className="w-5 h-5 text-white" />
            <span className="text-white font-bold">{formatTime(timeRemaining)}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <p className="text-gray-400 text-sm">Aktiva spelare: {activePlayersCount}/{totalPlayers}</p>
          {eliminatedCount > 0 && (
            <p className="text-red-400 text-sm">Eliminerade: {eliminatedCount}</p>
          )}
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 border border-white/20 mb-6">
        <h3 className="text-xl font-bold text-white mb-4">{challenge.title}</h3>
        <p className="text-gray-300 mb-4">{challenge.description}</p>

        <div className="bg-black/40 p-4 rounded-lg mb-4 font-mono text-green-400 text-sm overflow-x-auto">
          <pre className="whitespace-pre-wrap">{challenge.puzzle}</pre>
        </div>

        {feedback && (
          <div className={`p-4 rounded-lg mb-4 ${
            feedback.type === 'success' ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'
          }`}>
            {feedback.message}
          </div>
        )}

        <div className="space-y-3">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
            placeholder="Ditt svar..."
            className="w-full bg-black/40 text-white border border-purple-500/50 rounded-lg px-4 py-3"
          />

            <button
              onClick={onSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:scale-105 transition-transform"
            >
              Kontrollera svar
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              className="w-full bg-yellow-900/50 text-yellow-200 py-2 rounded-lg text-sm"
            >
              {showHint ? 'Dölj hint' : 'Visa hint'}
            </button>

            {showHint && (
              <div className="bg-yellow-900/30 p-4 rounded-lg">
                <p className="text-yellow-200 text-sm">{challenge.hint}</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export function CluesList({ clues, unlockedClues }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Ledtrådar</h2>
      <div className="space-y-4">
        {clues.map(clue => (
          <div
            key={clue.id}
            className={`rounded-xl p-6 border ${
              unlockedClues.includes(clue.id) ? 'bg-green-900/30 border-green-500/50' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="flex justify-between mb-3">
              <h3 className="font-bold text-white">{clue.title}</h3>
              {unlockedClues.includes(clue.id) ? <Unlock className="w-5 h-5 text-green-400" /> : <Lock className="w-5 h-5 text-gray-500" />}
            </div>
            <p className="text-gray-300 text-sm mb-3">{clue.description}</p>
            {unlockedClues.includes(clue.id) && (
              <div className="bg-black/40 p-3 rounded-lg">
                <p className="text-green-300 text-sm">{clue.unlock}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
