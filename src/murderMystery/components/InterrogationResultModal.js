import React from 'react';
import { X, Users } from 'lucide-react';

export function InterrogationResultModal({ person, onClose }) {
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
            <h2 className="text-2xl font-bold text-amber-500">Förhör Påbörjat</h2>
            <p className="text-sm text-gray-400">
              {person.name} har kallats till förhör
            </p>
          </div>
        </div>

        {/* person info */}
        <div className="mb-6 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-amber-500/30">
          <div className="flex items-start gap-4">
            <div className={`${person.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl`}>
              👤
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{person.name}</h3>
              <p className="text-amber-400 font-medium mb-2">{person.role}</p>
              <p className="text-gray-400 text-sm italic">{person.personality}</p>
            </div>
          </div>
        </div>

        {/* instructions */}
        <div className="mb-6 p-6 bg-amber-900/20 border border-amber-500/30 rounded-lg">
          <h3 className="text-lg font-bold text-amber-400 mb-4">🎭 Så fungerar förhöret:</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-white font-semibold mb-2">1. Inspektören leder förhöret</p>
              <p className="text-gray-300 text-sm">
                <strong className="text-amber-400">Inspektör Blackwood</strong> är alltid förhörsledare och ställer frågorna.
              </p>
            </div>

            <div>
              <p className="text-white font-semibold mb-2">2. Vad kan avslöjas</p>
              <p className="text-gray-300 text-sm">
                <strong className="text-amber-400">{person.name}</strong> måste besvara frågor och kan avslöja ENDAST:
              </p>
              <ul className="mt-2 ml-4 text-gray-300 text-sm space-y-1">
                <li>• <strong className="text-amber-400">Relation till Lord Sebastian</strong> (från Character Card)</li>
                <li>• <strong className="text-amber-400">Färdigheter och expertis</strong> (från Character Card)</li>
              </ul>
              <p className="text-gray-400 text-xs mt-2 italic">
                ⚠️ Dessa uppgifter kan ENDAST avslöjas genom förhör - inte på annat sätt!
              </p>
            </div>

            <div>
              <p className="text-white font-semibold mb-2">3. Sanningsskyldighet</p>
              <p className="text-gray-300 text-sm">
                <strong className="text-amber-400">{person.name}</strong> måste svara sanningsenligt från sitt <strong>Character Card</strong>.
                <br/>
                <span className="text-amber-400 italic">Secret och andra detaljer behöver INTE avslöjas.</span>
              </p>
            </div>
          </div>
        </div>


        {/* close button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-6 bg-amber-500 text-gray-900 font-bold rounded-lg hover:bg-amber-400 transition-all shadow-lg"
        >
          Starta Förhöret
        </button>
      </div>
    </div>
  );
}
