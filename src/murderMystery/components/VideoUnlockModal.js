import React from 'react';
import { X } from 'lucide-react';

/**
 * Modal shown when video material is unlocked
 * Shows unlock_security_room.mp4 and notification message
 */
export function VideoUnlockModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-2xl shadow-2xl border-2 border-purple-500/30 max-w-4xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 flex items-center justify-between border-b-2 border-purple-500/30">
          <h2 className="text-2xl font-bold">🔓 Säkerhetsrum upplåst</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition"
            title="Stäng"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video */}
        <div className="bg-black">
          <video
            src="/media/videos/unlock_security_room.mp4"
            controls
            autoPlay
            className="w-full"
          />
        </div>

        {/* Message */}
        <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900">
          <p className="text-white text-lg text-center">
            Videomaterial från säkerhetsrummet finns nu tillgängligt i utredningsloggen.
          </p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-bold transition-all hover:scale-105"
            >
              Fortsätt utredningen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
