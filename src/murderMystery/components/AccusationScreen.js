import React, { useState } from 'react';
import { AlertCircle, Users, UserX } from 'lucide-react';
import { MANOR_STILL } from '../constants';

export function AccusationScreen({ selectedPlayers, murderer, onReveal }) {
  const [accusations, setAccusations] = useState({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentPlayer = selectedPlayers[currentPlayerIndex];
  const hasAccused = accusations[currentPlayer?.id] !== undefined;

  const makeAccusation = (suspectId) => {
    setAccusations(prev => ({
      ...prev,
      [currentPlayer.id]: suspectId
    }));

    // Move to next player or show results
    if (currentPlayerIndex < selectedPlayers.length - 1) {
      setTimeout(() => {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
      }, 800);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 800);
    }
  };

  const getAccusationSummary = () => {
    const counts = {};
    Object.values(accusations).forEach(suspectId => {
      counts[suspectId] = (counts[suspectId] || 0) + 1;
    });
    return counts;
  };

  if (showResults) {
    const accusationCounts = getAccusationSummary();
    const sortedAccusations = Object.entries(accusationCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([suspectId, count]) => ({
        suspect: selectedPlayers.find(p => p.id === parseInt(suspectId)),
        count
      }));

    return (
      <div
        className="min-h-screen relative bg-gradient-to-br from-slate-900/85 via-purple-900/70 to-slate-900/85 p-8"
        style={{ backgroundImage: `url(${MANOR_STILL})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-500/30 shadow-2xl">
            <h1 className="text-4xl font-bold text-white mb-6 text-center">📊 Anklagelser Sammanfattning</h1>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Alla har anklagat:</h2>
              <div className="space-y-3">
                {sortedAccusations.map(({ suspect, count }) => (
                  <div key={suspect.id} className="bg-black/40 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {suspect.profileImage && (
                        <img
                          src={suspect.profileImage}
                          alt={suspect.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-purple-400"
                        />
                      )}
                      <div>
                        <p className="text-white font-bold text-lg">{suspect.name}</p>
                        <p className="text-purple-300 text-sm">{suspect.role}</p>
                      </div>
                    </div>
                    <div className="bg-red-600 rounded-full px-6 py-2">
                      <p className="text-white font-bold text-xl">{count} röst{count > 1 ? 'er' : ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-900/30 border-2 border-yellow-500 rounded-xl p-6 mb-6">
              <p className="text-yellow-200 text-center text-lg">
                <strong>OBS:</strong> Detta är endast anklagelser. Ni har fortfarande en sista chans att diskutera och göra en officiell grupprösning.
              </p>
            </div>

            <button
              onClick={onReveal}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 rounded-xl font-bold text-xl hover:scale-105 transition-all shadow-xl"
            >
              Fortsätt till Final Omröstning
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative bg-gradient-to-br from-slate-900/85 via-purple-900/70 to-slate-900/85 p-8"
      style={{ backgroundImage: `url(${MANOR_STILL})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-500/30 shadow-2xl">
          <div className="text-center mb-8">
            <AlertCircle className="w-20 h-20 mx-auto mb-4 text-red-400" />
            <h1 className="text-4xl font-bold text-white mb-2">Slutgiltig Anklagelse</h1>
            <p className="text-purple-200 text-lg">
              Ni har samlat alla ledtrådar. Nu är det dags att anklaga!
            </p>
          </div>

          {/* Progress indicator */}
          <div className="bg-white/10 rounded-xl p-4 mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Framsteg:</span>
              <span className="text-purple-300">{Object.keys(accusations).length} / {selectedPlayers.length}</span>
            </div>
            <div className="w-full bg-black/40 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(Object.keys(accusations).length / selectedPlayers.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current player */}
          <div className="bg-purple-900/50 rounded-xl p-6 mb-8 border-2 border-purple-500/50">
            <div className="flex items-center gap-4 mb-4">
              <Users className="w-8 h-8 text-purple-300" />
              <div>
                <p className="text-purple-300 text-sm">Nu är det turen för:</p>
                <h2 className="text-2xl font-bold text-white">{currentPlayer?.name}</h2>
                <p className="text-purple-200 text-sm">{currentPlayer?.role}</p>
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <p className="text-white text-center font-semibold">
                Vem anklagar du för mordet på Lord Sebastian Harrington?
              </p>
              <p className="text-purple-300 text-center text-sm mt-2">
                ⚠️ Du har endast EN chans - välj klokt!
              </p>
            </div>
          </div>

          {/* Suspect selection */}
          <div className="space-y-3 mb-8">
            <h3 className="text-white font-bold text-lg mb-4">Välj misstänkt:</h3>
            {selectedPlayers.map(suspect => {
              const alreadyAccused = accusations[currentPlayer?.id] === suspect.id;
              return (
                <button
                  key={suspect.id}
                  onClick={() => makeAccusation(suspect.id)}
                  disabled={hasAccused}
                  className={`w-full rounded-xl p-4 transition-all ${
                    alreadyAccused
                      ? 'bg-red-600 border-2 border-red-400 scale-105'
                      : hasAccused
                      ? 'bg-gray-700 opacity-50 cursor-not-allowed'
                      : 'bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-purple-500'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {suspect.profileImage && (
                      <img
                        src={suspect.profileImage}
                        alt={suspect.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-purple-400"
                      />
                    )}
                    <div className="flex-1 text-left">
                      <p className="text-white font-bold text-lg">{suspect.name}</p>
                      <p className="text-purple-300 text-sm">{suspect.role}</p>
                    </div>
                    {alreadyAccused && (
                      <div className="bg-white/20 rounded-full px-4 py-2">
                        <p className="text-white font-bold text-sm">ANKLAGAD! ✓</p>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-4">
            <p className="text-yellow-200 text-sm text-center">
              💡 Tänk på alla ledtrådar ni samlat: vem hade motiv, möjlighet och medel?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
