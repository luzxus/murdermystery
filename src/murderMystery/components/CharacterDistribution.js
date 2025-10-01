import React, { useState } from 'react';
import { X, Skull, Eye, EyeOff, CheckCircle } from 'lucide-react';

export function CharacterDistribution({ selectedPlayers, murderer, onStartIntro }) {
  const [selectedPlayerView, setSelectedPlayerView] = useState(null);
  const [showCharacterSecret, setShowCharacterSecret] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Rollfördelning</h1>
        <p className="text-gray-300 text-center mb-8">Varje spelare väljer nummer</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {selectedPlayers.map((player, i) => (
            <button
              key={player.id}
              onClick={() => { setSelectedPlayerView(player); setShowCharacterSecret(false); }}
              className="bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full ${player.color} flex items-center justify-center text-white font-bold text-2xl`}>
                {i + 1}
              </div>
              <p className="text-white font-bold">Spelare {i + 1}</p>
            </button>
          ))}
        </div>

        {selectedPlayerView && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl p-8 max-w-2xl w-full my-8">
              <div className="flex justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Din roll</h2>
                <button onClick={() => setSelectedPlayerView(null)} className="text-white">
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="bg-black/40 rounded-xl p-6 mb-4">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedPlayerView.name}</h3>
                <p className="text-purple-300 mb-2">{selectedPlayerView.role}</p>
                <p className="text-sm text-gray-400 mb-4">Accessoar: {selectedPlayerView.accessory}</p>
                <div className="bg-purple-900/50 p-4 rounded-lg mb-3">
                  <p className="text-white">{selectedPlayerView.personality}</p>
                </div>
                <p className="text-gray-300 text-sm">{selectedPlayerView.background}</p>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-xl p-4 mb-4">
                <p className="text-yellow-200 mb-2">Hemlighet:</p>
                <p className="text-white text-sm mb-3">{selectedPlayerView.secret}</p>
                <div className="bg-orange-900/50 p-3 rounded-lg">
                  <p className="text-xs text-orange-200 mb-1">Ledtråd (läs senare):</p>
                  <p className="text-white text-sm font-bold">{selectedPlayerView.secretClue}</p>
                </div>
              </div>

              <button
                onClick={() => setShowCharacterSecret(!showCharacterSecret)}
                className="w-full bg-red-900/50 border-2 border-red-500 text-white py-4 rounded-xl font-bold mb-4 flex items-center justify-center gap-3"
              >
                {showCharacterSecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                {showCharacterSecret ? 'Dölj' : 'Är du mördaren?'}
              </button>

              {showCharacterSecret && (
                <div className={`rounded-xl p-6 border-2 ${
                  selectedPlayerView.id === murderer.id ? 'bg-red-900/50 border-red-500' : 'bg-green-900/30 border-green-500'
                }`}>
                  {selectedPlayerView.id === murderer.id ? (
                    <>
                      <Skull className="w-16 h-16 mx-auto mb-4 text-red-400" />
                      <h3 className="text-2xl font-bold text-red-400 mb-4 text-center">MÖRDAREN</h3>
                      <p className="text-white text-sm">{selectedPlayerView.murdererMotive}</p>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
                      <h3 className="text-2xl font-bold text-green-400 mb-4 text-center">OSKYLDIG</h3>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <button
          onClick={onStartIntro}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform"
        >
          Starta mysteriet
        </button>
      </div>
    </div>
  );
}
