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
  eliminatedCount,
  hintSuppressedUntil = 0,
  submitDisabledUntil = 0,
  penaltyTick
}) {
  const now = Date.now();
  const hintLocked = hintSuppressedUntil > now;
  const submitLocked = submitDisabledUntil > now;
  const hintCountdown = hintLocked ? Math.ceil((hintSuppressedUntil - now)/1000) : 0;
  const submitCountdown = submitLocked ? Math.ceil((submitDisabledUntil - now)/1000) : 0;
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

        {challenge.image && (
          <div className="mb-4">
            <img
              src={challenge.image}
              alt={challenge.title}
              className="rounded-lg border border-white/10 shadow shadow-black/40 mx-auto max-h-80 object-contain"
              loading="lazy"
            />
            <p className="text-xs text-center text-slate-400 mt-2">Analysera bilden noggrant – även detaljer i kanter / metadata.</p>
          </div>
        )}

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
            onClick={!submitLocked ? onSubmit : undefined}
            disabled={submitLocked}
            className={`w-full py-3 rounded-lg font-bold transition-transform ${submitLocked
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105'}`}
          >
            {submitLocked ? `Låst (${submitCountdown}s)` : 'Kontrollera svar'}
          </button>

          <button
            onClick={() => !hintLocked && setShowHint(!showHint)}
            disabled={hintLocked}
            className={`w-full py-2 rounded-lg text-sm ${hintLocked
              ? 'bg-yellow-900/20 text-yellow-700 cursor-not-allowed border border-yellow-700/30'
              : 'bg-yellow-900/50 text-yellow-200'}`}
          >
            {hintLocked ? `Hint avstängd (${hintCountdown}s)` : (showHint ? 'Dölj hint' : 'Visa hint')}
          </button>

          {showHint && !hintLocked && (
            <div className="bg-yellow-900/30 p-4 rounded-lg">
              <p className="text-yellow-200 text-sm">{challenge.hint}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CluesList({ clues, unlockedClues, deepAnalyses = [], onAnalyzeClue = () => {}, lockedDeepHints = [] }) {
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
              {unlockedClues.includes(clue.id) ? <Unlock className="w-5 h-5 text-green-400" /> : <Lock className="w-5 h-5 text-gray-400" />}
            </div>
            {unlockedClues.includes(clue.id) ? (
              <>
                <p className="text-gray-300 text-sm mb-3">{clue.description}</p>
                {clue.unlock && (
                  <div className="bg-black/40 p-3 rounded-lg mb-2">
                    <p className="text-green-300 text-sm">{clue.unlock}</p>
                  </div>
                )}
                {clue.deepHint && (
                  <div className="bg-purple-900/40 p-3 rounded-lg border border-purple-700/40 text-purple-200 text-xs">
                    {deepAnalyses.includes(clue.id) ? (
                      <p className="italic">{clue.deepHint}</p>
                    ) : lockedDeepHints.includes(clue.id) ? (
                      <p className="italic text-red-300">Analysen permanent blockerad av tidigare konsekvens.</p>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <p className="italic opacity-80">Fördjupad analys möjlig – utlöst konsekvens är oförutsägbar.</p>
                        <button
                          onClick={() => onAnalyzeClue(clue.id)}
                          className="self-start text-[11px] bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded font-semibold tracking-wide"
                        >Analysera</button>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-slate-600/30 rounded blur-[1px]" />
                <div className="h-3 w-2/3 bg-slate-600/20 rounded blur-[1px]" />
                <p className="mt-2 text-[10px] uppercase tracking-wide text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Lås upp genom att lösa nästa utmaning
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
