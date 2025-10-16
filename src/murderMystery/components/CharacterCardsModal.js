import React from 'react';
import { X } from 'lucide-react';
import { characterCardsMeta } from '../data/characterCards';

export function CharacterCardsModal({ personas, onClose }) {
  if (!personas) return null;
  
  // helper to get character names from IDs
  const getCharacterName = (id) => {
    const char = personas.find(p => p.id === id);
    return char ? char.name : 'Okänd';
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 md:p-8 shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{characterCardsMeta.title}</h2>
              <p className="text-gray-600">{characterCardsMeta.description}</p>
              <p className="text-sm text-blue-600 mt-2">💡 {characterCardsMeta.instruction}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {personas.map((persona, i) => (
              <div key={persona.id} className="border-2 border-dashed border-amber-300 p-5 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4 pb-3 border-b-2 border-amber-200">
                  {persona.profileImage && (
                    <div className="flex justify-center mb-3">
                      <img 
                        src={persona.profileImage} 
                        alt={persona.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-amber-400 shadow-md"
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900">{persona.name}</h3>
                  <p className="text-sm text-gray-600 font-semibold">{persona.role}</p>
                  <p className="text-xs text-gray-500 mt-1">Spelare {i + 1}</p>
                </div>

                {/* basic character info */}
                <div className="space-y-3 text-sm mb-4">
                  <div>
                    <strong className="text-amber-800">Egenheter:</strong>
                    <p className="text-gray-700">{persona.characterCard.quirks}</p>
                  </div>
                  <div>
                    <strong className="text-amber-800">Relation till Lord:</strong>
                    <p className="text-gray-700">{persona.characterCard.relationToVictim}</p>
                  </div>
                  <div>
                    <strong className="text-amber-800">Färdigheter:</strong>
                    <p className="text-gray-700">{persona.characterCard.skills}</p>
                  </div>
                  <div>
                    <strong className="text-amber-800">Svaghet:</strong>
                    <p className="text-gray-700">{persona.characterCard.weakness}</p>
                  </div>
                </div>

                {/* new roleplay depth section */}
                <div className="border-t-2 border-purple-200 pt-4 space-y-3 text-sm">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <strong className="text-purple-800 block mb-1">🎯 Ditt mål ikväll:</strong>
                    <p className="text-gray-700 italic">{persona.personalGoal}</p>
                  </div>

                  {persona.relationships && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <strong className="text-blue-800 block mb-1">🤝 Relationer:</strong>
                      <div className="space-y-1 text-xs">
                        {persona.relationships.allies?.length > 0 && (
                          <p className="text-green-700">
                            <span className="font-semibold">Allierade:</span> {persona.relationships.allies.map(getCharacterName).join(', ')}
                          </p>
                        )}
                        {persona.relationships.rivals?.length > 0 && (
                          <p className="text-red-700">
                            <span className="font-semibold">Rivaler:</span> {persona.relationships.rivals.map(getCharacterName).join(', ')}
                          </p>
                        )}
                        {persona.relationships.secrets?.length > 0 && (
                          <p className="text-orange-700">
                            <span className="font-semibold">Du vet hemligheter om:</span> {persona.relationships.secrets.map(getCharacterName).join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {persona.questionGuide && persona.questionGuide.length > 0 && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <strong className="text-green-800 block mb-1">💬 Förslag på frågor:</strong>
                      <ul className="text-gray-700 space-y-1 list-disc list-inside text-xs">
                        {persona.questionGuide.map((q, idx) => (
                          <li key={idx}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {persona.roleplayTips && persona.roleplayTips.length > 0 && (
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <strong className="text-amber-800 block mb-1">🎭 Rollspelstips:</strong>
                      <ul className="text-gray-700 space-y-1 list-disc list-inside text-xs">
                        {persona.roleplayTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
            <p className="text-sm text-yellow-900">
              <strong>📋 Tips för spelledaren:</strong> Skriv ut denna sida och klipp ut korten. Dela ut till spelarna EFTER att de sett sina roller. 
              Använd "Ditt mål", "Relationer", och "Rollspelstips" för att guida spelarna in i sina karaktärer. 
              Uppmuntra dem att använda "Förslag på frågor" när konversationen stannar av.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
