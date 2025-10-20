import React, { useState } from 'react';
import { X, Users } from 'lucide-react';

export function InterrogationModal({ 
  selectedPlayers, 
  interrogationsRemaining, 
  onClose, 
  onInterrogate 
}) {
  const [selectedPersonId, setSelectedPersonId] = useState(null);

  const handleInterrogate = () => {
    if (!selectedPersonId) {
      alert('Välj person att förhöra först!');
      return;
    }
    onInterrogate(selectedPersonId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl border border-amber-500/30 p-8">
        
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* header */}
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-8 h-8 text-amber-500" />
          <div>
            <h2 className="text-2xl font-bold text-amber-500">Kalla till Förhör</h2>
            <p className="text-sm text-gray-400">
              Förhör kvar: <span className="text-amber-500 font-bold">{interrogationsRemaining}/3</span>
            </p>
          </div>
        </div>

        {/* description */}
        <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-amber-500/20">
          <p className="text-gray-300 leading-relaxed mb-3">
            Ni kan rösta för att kalla en person till förhör. Den valda personen måste svara på frågor från gruppen.
          </p>
          <div className="p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
            <p className="text-amber-300 text-sm font-semibold mb-2">🎭 Förhöret sker live:</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Den förhörda väljer VEM de vill svara på frågor från</li>
              <li>• Gruppen kan ställa frågor om relation till Lord, färdigheter, eller alibi</li>
              <li>• Den förhörda måste svara ärligt (enligt sitt character card)</li>
            </ul>
          </div>
          <p className="mt-3 text-amber-400 text-sm italic">
            Välj klokt - ni har bara {interrogationsRemaining} förhör kvar!
          </p>
        </div>

        {/* select person */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-200 mb-3">Rösta fram vem som ska förhöras:</h3>
          <div className="grid grid-cols-2 gap-3">
            {selectedPlayers.map(player => (
              <button
                key={player.id}
                onClick={() => setSelectedPersonId(player.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPersonId === player.id
                    ? 'border-amber-500 bg-amber-500/20 shadow-lg'
                    : 'border-gray-700 bg-gray-800/50 hover:border-amber-500/50'
                }`}
              >
                <div className="text-left">
                  <p className="font-bold text-white">{player.name}</p>
                  <p className="text-sm text-gray-400">{player.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleInterrogate}
            disabled={!selectedPersonId}
            className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${
              selectedPersonId
                ? 'bg-amber-500 text-gray-900 hover:bg-amber-400 shadow-lg'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            Kalla till Förhör
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg border-2 border-gray-700 text-gray-300 hover:border-gray-500 transition-all"
          >
            Avbryt
          </button>
        </div>
      </div>
    </div>
  );
}
