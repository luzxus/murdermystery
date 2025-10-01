import React from 'react';
import { X } from 'lucide-react';
import { characterCardsMeta } from '../data/characterCards';

export function CharacterCardsModal({ personas, onClose }) {
  if (!personas) return null;
  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{characterCardsMeta.title}</h2>
              <p className="text-gray-600">{characterCardsMeta.description}</p>
              <p className="text-sm text-blue-600 mt-2">💡 {characterCardsMeta.instruction}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personas.map((persona, i) => (
              <div key={persona.id} className="border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50">
                <div className="mb-3 pb-3 border-b border-gray-300">
                  <h3 className="text-xl font-bold text-gray-900">{persona.name}</h3>
                  <p className="text-sm text-gray-600">{persona.role}</p>
                  <p className="text-xs text-gray-500 mt-1">Spelare {i + 1}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong className="text-gray-700">Egenheter:</strong>
                    <p className="text-gray-600">{persona.characterCard.quirks}</p>
                  </div>
                  <div>
                    <strong className="text-gray-700">Relation till Lord:</strong>
                    <p className="text-gray-600">{persona.characterCard.relationToVictim}</p>
                  </div>
                  <div>
                    <strong className="text-gray-700">Färdigheter:</strong>
                    <p className="text-gray-600">{persona.characterCard.skills}</p>
                  </div>
                  <div>
                    <strong className="text-gray-700">Svaghet:</strong>
                    <p className="text-gray-600">{persona.characterCard.weakness}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Tips:</strong> Skriv ut denna sida och klipp ut korten. Dela ut till spelarna EFTER att de sett sina roller. 
              Använd informationen för att improvisera och svara på frågor från andra spelare!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
