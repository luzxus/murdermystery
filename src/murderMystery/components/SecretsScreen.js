import React from 'react';
import { MANOR_STILL } from '../constants';

export function SecretsScreen({ selectedPlayers, onReveal }) {
  return (
    <div
      className="min-h-screen relative bg-gradient-to-br from-slate-900/85 via-purple-900/70 to-slate-900/85 p-8"
      style={{ backgroundImage: `url(${MANOR_STILL})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">Hemligheternas Avslöjande</h1>

          <div className="bg-purple-900/50 p-6 rounded-xl mb-8">
            <p className="text-gray-300 mb-4">
              Ni har låst upp alla ledtrådar. Nu är det dags för det sista steget...
            </p>
            <p className="text-white text-lg font-bold mb-4">
              Varje person läser nu HÖGT sin "Hemliga ledtråd" från sin roll.
            </p>
            <p className="text-gray-400 text-sm">
              Detta kommer avslöja viktiga detaljer om vem som kan vara skyldig!
            </p>
          </div>

          <div className="bg-yellow-900/30 border border-yellow-500 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-yellow-300 mb-4">Era hemliga ledtrådar:</h3>
            <div className="space-y-3">
              {selectedPlayers.map((player, i) => (
                <div key={player.id} className="bg-black/40 p-4 rounded-lg">
                  <p className="text-white font-bold mb-2">Spelare {i + 1}: {player.name}</p>
                  <p className="text-gray-300 text-sm">{player.secretClue}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-white mb-6">
            Diskutera nu: Vem är mördaren baserat på alla ledtrådar? Rösta!
          </p>

          <button
            onClick={onReveal}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform"
          >
            Avslöja mördaren
          </button>
        </div>
      </div>
    </div>
  );
}
