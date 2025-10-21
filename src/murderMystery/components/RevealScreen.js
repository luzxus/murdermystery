import React, { useState } from 'react';
import { Skull } from 'lucide-react';
import { MANOR_STILL } from '../constants';

const MURDER_VIDEO_PATH = '/media/videos/intrigues/ending_1.mp4';

export function RevealScreen({ murderer, onRestart, didWin = true }) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);

  return (
    <div
      className="min-h-screen relative bg-gradient-to-br from-slate-900/85 via-red-900/60 to-slate-900/85 p-8"
      style={{ backgroundImage: `url(${MANOR_STILL})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/10 rounded-2xl p-8 border border-red-500/50 text-center">
          <Skull className="w-24 h-24 mx-auto mb-6 text-red-500 animate-pulse" />
          <h1 className="text-5xl font-bold text-white mb-6">Mördaren var...</h1>

          <div className="bg-red-900/50 border-4 border-red-500 rounded-2xl p-8 mb-8">
            {murderer.profileImage && (
              <div className="flex justify-center mb-6">
                <img 
                  src={murderer.profileImage} 
                  alt={murderer.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-red-500 shadow-2xl"
                />
              </div>
            )}
            <h2 className="text-4xl font-bold text-red-300 mb-4">{murderer.name}</h2>
            <p className="text-xl text-gray-300 mb-4">{murderer.role}</p>
            <p className="text-gray-400">{murderer.murdererMotive}</p>
          </div>

          <div className="bg-black/40 p-6 rounded-lg mb-8 text-left">
            <h3 className="text-xl font-bold text-white mb-3">Hela sanningen:</h3>
            <p className="text-gray-300">
              Victor von Sterling led av sömnsvårigheter på grund av sina enorma spelskulder till Lord Sebastian. 
              Han sökte hjälp hos Professor Thornbury, som ordinerade ett experimentellt sömnmedel (T-47). 
              Professorn varnade att mer än 17 droppar blandat med alkohol var dödligt.
              <br /><br />
              Victor, som i grunden är en psykopat, fick en makaber idé. Han hällde den dödliga dosen i en whiskey-flaska 
              och manipulerade Dr. Arabella Cogsworth att överlämna den till Lord Sebastian. Victor visste att Sebastian 
              litade på och gillade Arabella, och att han aldrig skulle misstänka något.
              <br /><br />
              Vid 22:15 drack Lord Sebastian sin sista drink. Det dödliga sömnmedlet blandat med whiskey verkade på sekunder.
              <br /><br />
              <strong className="text-red-400">
                Ledtråden som kunde avslöja: {murderer.secretClue}
              </strong>
            </p>
          </div>

          {/* Video reveal section */}
          <div className="bg-gradient-to-br from-purple-900/40 to-red-900/40 border-2 border-purple-500/50 rounded-xl p-6 mb-8">
            <h3 className="text-2xl font-bold text-white mb-3 text-center">🎬 Vad hände egentligen?</h3>
            <p className="text-gray-300 text-center mb-4">
              Se den avgörande scenen strax innan mordet - när Arabella överlämnar den giftiga whiskeyflaskan till Lord Sebastian.
            </p>
            {!showVideo ? (
              <button
                onClick={() => setShowVideo(true)}
                className="w-full bg-gradient-to-r from-red-600 to-purple-600 text-white py-4 px-6 rounded-lg font-bold hover:scale-105 transition-transform"
              >
                📽️ Visa mordscenen
              </button>
            ) : (
              <div className="bg-black rounded-lg overflow-hidden">
                <video
                  src={MURDER_VIDEO_PATH}
                  controls
                  autoPlay
                  className="w-full"
                  onEnded={() => setVideoWatched(true)}
                />
              </div>
            )}
          </div>

          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-8 rounded-xl font-bold hover:scale-105 transition-transform"
          >
            Spela igen
          </button>
        </div>
      </div>
    </div>
  );
}
