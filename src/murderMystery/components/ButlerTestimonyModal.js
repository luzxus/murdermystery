import React from 'react';
import { X } from 'lucide-react';

/**
 * modal shown when all challenges are completed
 * shows butler_testimony.mp4 and leads into secrets round
 */
export function ButlerTestimonyModal({ onClose, onVideoStateChange }) {
  const handlePlay = () => {
    if (onVideoStateChange) onVideoStateChange(true);
  };

  const handlePause = () => {
    if (onVideoStateChange) onVideoStateChange(false);
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-2xl shadow-2xl border-2 border-purple-500/30 max-w-4xl w-full overflow-hidden">
        {/* header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 flex items-center justify-between border-b-2 border-purple-500/30">
          <h2 className="text-2xl font-bold">🎭 Butler Ashfords Vittnesmål</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition"
            title="Stäng"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* video */}
        <div className="bg-black">
          <video
            src="/media/videos/intrigues/butler_testimony.mp4"
            controls
            autoPlay
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handlePause}
            className="w-full"
          />
        </div>

        {/* message */}
        <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900">
          <p className="text-white text-lg text-center mb-2">
            Butler Ashford berättar om något han såg några dagar innan mordet.
          </p>
                <div className="space-y-4 mb-6">
        <p className="text-gray-300 leading-relaxed">
          Butler Ashford vittnar om att han hörde Lord Sebastian gå omkring i sitt rum sent på kvällen och mumla till sig själv:
        </p>
        <blockquote className="border-l-4 border-amber-500 pl-4 italic text-amber-200">
          "Jag måste ha den oavsett vad, även om det innebär att bedra någon jag älskar."
        </blockquote>
        <p className="text-gray-300 leading-relaxed">
          Vad menade Sebastian? Vem var det han älskade?
        </p>
      </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-bold transition-all hover:scale-105"
            >
              Fortsätt till hemligheternas rond
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
