import React from 'react';
import { X, Lightbulb, ArrowRight } from 'lucide-react';

/**
 * ChallengeModal - Investigation action presented as narrative choice
 * Opens as modal when player decides to perform an investigation action
 */
export function ChallengeModal({
  challenge,
  userAnswer,
  setUserAnswer,
  onSubmit,
  showHint,
  setShowHint,
  feedback,
  timeRemaining,
  onClose,
  hintSuppressedUntil = 0,
  submitDisabledUntil = 0,
  penaltyTick
}) {
  const now = Date.now();
  const hintLocked = hintSuppressedUntil > now;
  const submitLocked = submitDisabledUntil > now;
  const hintCountdown = hintLocked ? Math.ceil((hintSuppressedUntil - now) / 1000) : 0;
  const submitCountdown = submitLocked ? Math.ceil((submitDisabledUntil - now) / 1000) : 0;

  const handleSubmit = () => {
    if (!submitLocked) {
      onSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-2xl shadow-2xl border-2 border-purple-500/30 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 sticky top-0 z-10 border-b-2 border-purple-500/30">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-purple-300 text-sm">
                  Utredningsaktion #{challenge.indexLabel}
                </span>
              </div>
              <h2 className="text-2xl font-bold">{challenge.title}</h2>
              <p className="text-purple-200 text-sm mt-1">{challenge.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition ml-4"
              title="Stäng (du kan återkomma senare)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Puzzle/Investigation Area */}
          <div className="bg-slate-950/50 border-2 border-purple-500/20 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-purple-400" />
              {challenge.instruction || 'Din uppgift:'}
            </h3>

            <div className="bg-black/60 p-4 rounded-lg mb-4 font-mono text-green-400 text-sm overflow-x-auto border border-green-900/30">
              <pre className="whitespace-pre-wrap">{challenge.puzzle}</pre>
            </div>

            {challenge.image && (
              <div className="mb-4">
                <img
                  src={challenge.image}
                  alt={challenge.title}
                  className="rounded-lg border-2 border-purple-500/30 shadow-xl mx-auto max-h-80 object-contain"
                  loading="lazy"
                />
                <p className="text-xs text-center text-slate-400 mt-3 italic">
                  Analysera bilden noggrant – även detaljer i metadata och omöjligheter
                </p>
              </div>
            )}

            {/* Physical prop hint */}
            {challenge.prop && challenge.prop.location && (
              <div className="bg-amber-900/20 border-2 border-amber-600/30 rounded-lg p-4 mt-4">
                <p className="text-amber-200 text-sm">
                  <strong className="text-amber-400">Fysisk ledtråd:</strong> {challenge.prop.location}
                </p>
              </div>
            )}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`p-4 rounded-xl border-2 font-semibold ${
              feedback.type === 'success'
                ? 'bg-green-900/30 border-green-500/50 text-green-200'
                : feedback.type === 'info'
                ? 'bg-blue-900/30 border-blue-500/50 text-blue-200'
                : 'bg-red-900/30 border-red-500/50 text-red-200'
            }`}>
              {feedback.message}
            </div>
          )}

          {/* Answer Input */}
          <div className="space-y-3">
            <label className="text-white text-sm font-semibold block">
              Ditt svar:
            </label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Skriv ditt svar här..."
              className="w-full bg-slate-950 text-white border-2 border-purple-500/50 focus:border-purple-400 rounded-lg px-4 py-3 placeholder-slate-500 focus:outline-none transition"
              autoFocus
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              disabled={submitLocked}
              className={`flex-1 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                submitLocked
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 shadow-lg hover:shadow-purple-500/50'
              }`}
            >
              {submitLocked ? (
                <>
                  Låst ({submitCountdown}s)
                </>
              ) : (
                <>
                  <ArrowRight className="w-5 h-5" />
                  Bekräfta svar
                </>
              )}
            </button>
          </div>

          {/* Hint Section */}
          <div className="pt-4 border-t border-slate-700">
              <button
                onClick={() => !hintLocked && setShowHint(!showHint)}
                disabled={hintLocked}
                className={`w-full py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  hintLocked
                    ? 'bg-yellow-900/20 text-yellow-700 cursor-not-allowed border-2 border-yellow-700/30'
                    : 'bg-yellow-900/50 text-yellow-200 hover:bg-yellow-900/70 border-2 border-yellow-600/30'
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                {hintLocked ? `Hint avstängd (${hintCountdown}s)` : (showHint ? 'Dölj ledtråd' : 'Visa ledtråd')}
              </button>

            {showHint && !hintLocked && (
              <div className="bg-yellow-900/30 border-2 border-yellow-600/30 p-4 rounded-lg mt-3">
                <p className="text-yellow-100 text-sm leading-relaxed">{challenge.hint}</p>
              </div>
            )}
          </div>

          {/* Bottom info */}
          <div className="text-center pt-4">
            <p className="text-slate-500 text-xs">
              Du kan stänga denna dialog och återkomma när du är redo att svara
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
