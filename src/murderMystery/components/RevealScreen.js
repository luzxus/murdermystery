import React from 'react';
import { Skull } from 'lucide-react';
import { MANOR_STILL } from '../constants';

export function RevealScreen({ murderer, onRestart }) {
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
            <h2 className="text-4xl font-bold text-red-300 mb-4">{murderer.name}</h2>
            <p className="text-xl text-gray-300 mb-4">{murderer.role}</p>
            <p className="text-gray-400">{murderer.murdererMotive}</p>
          </div>

          <div className="bg-black/40 p-6 rounded-lg mb-8 text-left">
            <h3 className="text-xl font-bold text-white mb-3">Hela sanningen:</h3>
            <p className="text-gray-300">
              Under cocktailtimmen smög {murderer.name} in i biblioteket medan alla andra var sysselsatta. 
              Med kunskap om cyanid och tillgång till kemikalier hällde mördaren giftet i Lords whisky. 
              <br /><br />
              Vid 22:15 drack Lord Sebastian sin sista drink. Cyaniden verkade på sekunder.
              <br /><br />
              <strong className="text-red-400">
                Ledtråden som kunde avslöja: {murderer.secretClue}
              </strong>
            </p>
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
