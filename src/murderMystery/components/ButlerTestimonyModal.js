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
            Butler Ashford avslöjar avgörande information om en iakttagelse han gjort om Lord Sebastian några dagar innan.
          </p>
          <p className="text-white/80 text-center">
            Ni har nu samlat alla ledtrådar. Tid för hemlighetens rond.
          </p>
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
