import React, { useState } from 'react';
import { X, Phone, PhoneOff } from 'lucide-react';

/**
 * Modal for clue 4 phone call interaction
 * Shows ringing phone video and lets players answer or decline
 */
export function PhoneCallModal({ clue, onAnswer, onDecline }) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [userChoice, setUserChoice] = useState(null);

  const handleAnswer = () => {
    setHasInteracted(true);
    setUserChoice('answered');
  };

  const handleDecline = () => {
    setHasInteracted(true);
    setUserChoice('declined');
  };

  const handleClose = () => {
    if (userChoice === 'answered') {
      onAnswer();
    } else if (userChoice === 'declined') {
      onDecline();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-2xl shadow-2xl border-2 border-purple-500/30 max-w-4xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 flex items-center justify-between border-b-2 border-purple-500/30">
          <h2 className="text-2xl font-bold">📞 {clue.title}</h2>
          {hasInteracted && (
            <button
              onClick={handleClose}
              className="text-white/60 hover:text-white transition"
              title="Stäng"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Content */}
        {!hasInteracted ? (
          <>
            {/* Video */}
            <div className="bg-black">
              <video
                src={clue.media?.video}
                autoPlay
                loop
                className="w-full"
              />
            </div>

            {/* Description */}
            <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900">
              <p className="text-white text-lg text-center mb-6">
                {clue.description}
              </p>
              
              {/* Choice buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleAnswer}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-bold transition-all hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Svara
                </button>
                <button
                  onClick={handleDecline}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8 py-4 rounded-lg font-bold transition-all hover:scale-105"
                >
                  <PhoneOff className="w-5 h-5" />
                  Ignorera
                </button>
              </div>
            </div>
          </>
        ) : userChoice === 'answered' ? (
          <>
            {/* Audio playback */}
            <div className="bg-black p-8">
              <audio
                src={clue.media?.audio}
                controls
                autoPlay
                className="w-full"
              />
            </div>

            {/* Transcript */}
            <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="bg-black/40 p-4 rounded-lg mb-4">
                <p className="text-green-300 text-sm italic">
                  "{clue.interaction?.onAnswerTranscript}"
                </p>
              </div>
              <p className="text-white text-center mb-4">
                Röstinspelningen har spelats upp. Information har lagts till i ledtrådslistan.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleClose}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-bold transition-all hover:scale-105"
                >
                  Fortsätt utredningen
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Declined message */}
            <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="bg-red-900/30 p-6 rounded-lg mb-6 border border-red-500/50">
                <p className="text-red-200 text-lg text-center">
                  {clue.interaction?.onDeclineText}
                </p>
              </div>
              <p className="text-gray-300 text-center mb-4">
                Ni valde att inte svara på samtalet. Möjlig information har gått förlorad.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleClose}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-bold transition-all hover:scale-105"
                >
                  Fortsätt utredningen
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
