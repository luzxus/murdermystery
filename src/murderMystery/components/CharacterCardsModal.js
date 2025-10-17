import React from 'react';
import { X, Printer } from 'lucide-react';
import { characterCardsMeta } from '../data/characterCards';

export function CharacterCardsModal({ personas, onClose }) {
  if (!personas) return null;
  
  // helper to get character names from IDs
  const getCharacterName = (id) => {
    const char = personas.find(p => p.id === id);
    return char ? char.name : 'Okänd';
  };

  // print individual character card
  const printCard = (persona) => {
    // create a new window with just the card content
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const cardHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Karaktärskort - ${persona.name}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 20px;
            background: white;
          }
          .card {
            border: 3px dashed #fcd34d;
            padding: 30px;
            border-radius: 12px;
            background: white;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #fcd34d;
          }
          .profile-img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #fbbf24;
            margin-bottom: 15px;
          }
          h1 { font-size: 28px; color: #111827; margin-bottom: 5px; }
          .role { font-size: 14px; color: #6b7280; font-weight: 600; }
          .player-num { font-size: 12px; color: #9ca3af; margin-top: 5px; }
          .section { margin: 15px 0; }
          .section-title { 
            font-weight: bold; 
            color: #92400e; 
            margin-bottom: 5px;
            font-size: 14px;
          }
          .section-content { 
            color: #374151; 
            font-size: 13px;
            line-height: 1.5;
          }
          .goal-box {
            background: #faf5ff;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
          }
          .goal-box .section-title { color: #6b21a8; }
          .relationships-box {
            background: #eff6ff;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
          }
          .relationships-box .section-title { color: #1e40af; }
          .rel-item { 
            font-size: 12px; 
            margin: 5px 0;
            line-height: 1.4;
          }
          .rel-label { font-weight: 600; }
          .allies { color: #15803d; }
          .rivals { color: #dc2626; }
          .secrets { color: #ea580c; }
          .questions-box {
            background: #f0fdf4;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
          }
          .questions-box .section-title { color: #15803d; }
          .tips-box {
            background: #fffbeb;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
          }
          .tips-box .section-title { color: #92400e; }
          ul { 
            list-style: disc;
            padding-left: 20px;
            margin-top: 5px;
          }
          li { 
            font-size: 12px;
            color: #374151;
            margin: 3px 0;
            line-height: 1.4;
          }
          @media print {
            body { padding: 10px; }
            .card { border: 2px solid #fcd34d; }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            ${persona.profileImage ? `<img src="${persona.profileImage}" alt="${persona.name}" class="profile-img" />` : ''}
            <h1>${persona.name}</h1>
            <div class="role">${persona.role}</div>
            <div class="player-num">Spelare ${personas.indexOf(persona) + 1}</div>
          </div>

          <div class="section">
            <div class="section-title">Personlighet:</div>
            <div class="section-content">${persona.personality}</div>
          </div>

          <div class="section">
            <div class="section-title">Bakgrund:</div>
            <div class="section-content">${persona.background}</div>
          </div>

          <div class="section">
            <div class="section-title">Accessoar:</div>
            <div class="section-content">${persona.accessory}</div>
          </div>

          <div class="section">
            <div class="section-title">Hemlighet:</div>
            <div class="section-content">${persona.secret}</div>
          </div>

          <div class="section">
            <div class="section-title">Ledtråd (om dig):</div>
            <div class="section-content">${persona.secretClue}</div>
          </div>

          ${persona.murdererMotive ? `
          <div class="section">
            <div class="section-title" style="color: #dc2626;">⚠️ Motiv:</div>
            <div class="section-content" style="font-weight: 600;">${persona.murdererMotive}</div>
          </div>
          ` : ''}

          <div class="section">
            <div class="section-title">Egenheter:</div>
            <div class="section-content">${persona.characterCard.quirks}</div>
          </div>

          <div class="section">
            <div class="section-title">Relation till Lord:</div>
            <div class="section-content">${persona.characterCard.relationToVictim}</div>
          </div>

          <div class="section">
            <div class="section-title">Färdigheter:</div>
            <div class="section-content">${persona.characterCard.skills}</div>
          </div>

          <div class="section">
            <div class="section-title">Svaghet:</div>
            <div class="section-content">${persona.characterCard.weakness}</div>
          </div>

          <div class="goal-box">
            <div class="section-title">🎯 Ditt mål ikväll:</div>
            <div class="section-content"><em>${persona.personalGoal}</em></div>
          </div>

          ${persona.relationships ? `
            <div class="relationships-box">
              <div class="section-title">🤝 Relationer:</div>
              ${persona.relationships.allies?.length > 0 ? `
                <div class="rel-item allies">
                  <span class="rel-label">Allierade:</span> ${persona.relationships.allies.map(id => getCharacterName(id)).join(', ')}
                </div>
              ` : ''}
              ${persona.relationships.rivals?.length > 0 ? `
                <div class="rel-item rivals">
                  <span class="rel-label">Rivaler:</span> ${persona.relationships.rivals.map(id => getCharacterName(id)).join(', ')}
                </div>
              ` : ''}
              ${persona.relationships.secrets?.length > 0 ? `
                <div class="rel-item secrets">
                  <span class="rel-label">Du vet hemligheter om:</span> ${persona.relationships.secrets.map(id => getCharacterName(id)).join(', ')}
                </div>
              ` : ''}
            </div>
          ` : ''}

          ${persona.questionGuide?.length > 0 ? `
            <div class="questions-box">
              <div class="section-title">💬 Förslag på frågor:</div>
              <ul>
                ${persona.questionGuide.map(q => `<li>${q}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${persona.roleplayTips?.length > 0 ? `
            <div class="tips-box">
              <div class="section-title">🎭 Rollspelstips:</div>
              <ul>
                ${persona.roleplayTips.map(tip => `<li>${tip}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
      </html>
    `;
    
    printWindow.document.write(cardHTML);
    printWindow.document.close();
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
              <div 
                key={persona.id} 
                id={`card-${persona.id}`}
                className="border-2 border-dashed border-amber-300 p-5 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow relative group"
              >
                {/* print button on hover */}
                <button
                  onClick={() => printCard(persona)}
                  className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-sm z-10"
                  title="Skriv ut detta kort"
                >
                  <Printer className="w-4 h-4" />
                  Skriv ut
                </button>
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
                    <strong className="text-amber-800">Personlighet:</strong>
                    <p className="text-gray-700">{persona.personality}</p>
                  </div>
                  <div>
                    <strong className="text-amber-800">Bakgrund:</strong>
                    <p className="text-gray-700">{persona.background}</p>
                  </div>
                  <div>
                    <strong className="text-amber-800">Accessoar:</strong>
                    <p className="text-gray-700">{persona.accessory}</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg border-2 border-yellow-300">
                    <strong className="text-yellow-900">🔒 Hemlighet:</strong>
                    <p className="text-gray-700 mt-1">{persona.secret}</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg border-2 border-orange-300">
                    <strong className="text-orange-900">🔍 Ledtråd (om dig):</strong>
                    <p className="text-gray-700 mt-1">{persona.secretClue}</p>
                  </div>
                  {persona.murdererMotive && (
                    <div className="bg-red-50 p-3 rounded-lg border-2 border-red-400">
                      <strong className="text-red-900">⚠️ Motiv:</strong>
                      <p className="text-gray-900 mt-1 font-semibold">{persona.murdererMotive}</p>
                    </div>
                  )}
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
