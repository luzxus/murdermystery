import React, { useState } from 'react';
import { Dices, Package, CheckCircle } from 'lucide-react';
import { MANOR_STILL } from '../constants';

export function DiceRollScreen({ selectedPlayers, onContinue }) {
  const [checkedPlayers, setCheckedPlayers] = useState(new Set());

  const togglePlayer = (index) => {
    setCheckedPlayers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const allChecked = checkedPlayers.size === selectedPlayers.length;

  return (
    <div
      className="min-h-screen relative bg-gradient-to-br from-slate-900/85 via-purple-900/70 to-slate-900/85 p-8"
      style={{ backgroundImage: `url(${MANOR_STILL})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-purple-500/30">
          <div className="text-center mb-8">
            <Dices className="w-20 h-20 mx-auto mb-4 text-purple-300" />
            <h1 className="text-4xl font-bold text-white mb-4">Rollfördelning</h1>
            <p className="text-purple-200 text-lg">
              Det är dags att tilldela roller till alla spelare
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Package className="w-6 h-6" />
              Instruktioner
            </h2>

            <div className="space-y-4 text-white">
              <div className="flex gap-4">
                <div className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold mb-1">Förbered kuvert</p>
                  <p className="text-purple-200 text-sm">
                    Numrera {selectedPlayers.length} kuvert (1-{selectedPlayers.length}). I varje kuvert: accessoar/rekvisita och karaktärskort.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold mb-1">Kasta tärning</p>
                  <p className="text-purple-200 text-sm">
                    Varje spelare kastar en tärning (1-6) och tar kuvertet med motsvarande nummer.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold mb-1">Sista spelaren</p>
                  <p className="text-purple-200 text-sm">
                    Om ni är 7 spelare: den som kastar sist tar det kvarvarande kuvertet automatiskt.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-semibold mb-1">Öppna och läs</p>
                  <p className="text-purple-200 text-sm">
                    Öppna ditt kuvert privat och läs igenom din karaktärsinformation noga.
                    Ta på dig din accessoar/rekvisita.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Checklist för rollfördelning */}
          <div className="bg-green-900/30 backdrop-blur-sm rounded-xl p-6 mb-6 border border-green-500/30">
            <h3 className="text-xl font-bold text-white mb-4">Checklista - Markera när klar</h3>
            <div className="space-y-2">
              {selectedPlayers.map((player, i) => (
                <button
                  key={player.id}
                  onClick={() => togglePlayer(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    checkedPlayers.has(i)
                      ? 'bg-green-600/50 border-2 border-green-400'
                      : 'bg-white/10 border-2 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    checkedPlayers.has(i) ? 'bg-green-500 border-green-300' : 'border-white'
                  }`}>
                    {checkedPlayers.has(i) && <CheckCircle className="w-5 h-5 text-white" />}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-semibold">Spelare {i + 1}</p>
                    <p className="text-purple-200 text-sm">{player.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onContinue}
            disabled={!allChecked}
            className={`w-full py-4 rounded-xl font-bold text-xl transition-all ${
              allChecked
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-105'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {allChecked ? 'Alla har sina roller - Fortsätt' : 'Väntar på att alla får sina roller...'}
          </button>
        </div>
      </div>
    </div>
  );
}
