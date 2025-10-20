import React, { useState } from 'react';
import { Skull, AlertCircle } from 'lucide-react';
import { MANOR_STILL } from '../constants';

const INSPECTOR_MONOLOGUE_VIDEO = '/media/videos/Inspector_reginald_monologue.mp4';

export function IntroScreen({ onStartGame }) {
  const [showVideo, setShowVideo] = useState(false);

  const handleStartInvestigation = () => {
    setShowVideo(true);
  };

  const handleVideoEnd = () => {
    onStartGame();
  };

  if (showVideo) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="max-w-5xl w-full p-4">
          <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 border-b-2 border-blue-500">
              <h2 className="text-2xl font-bold text-white text-center">
                🔎 Inspektör Reginald Blackwood
              </h2>
              <p className="text-blue-200 text-center text-sm mt-1">
                Välkommen till utredningen
              </p>
            </div>
            <video
              src={INSPECTOR_MONOLOGUE_VIDEO}
              controls
              autoPlay
              className="w-full"
              onEnded={handleVideoEnd}
            />
            <div className="p-4 bg-slate-800 flex justify-between items-center">
              <p className="text-gray-300 text-sm">
                Inspektören förbereder er för utredningen...
              </p>
              <button
                onClick={handleVideoEnd}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Hoppa över →
              </button>
            </div>
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
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
          <Skull className="w-20 h-20 mx-auto mb-6 text-red-500" />
          <h1 className="text-4xl font-bold text-white mb-6 text-center">Mordet på Hartwell Manor</h1>

          <div className="bg-black/40 p-6 rounded-xl mb-6">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Offret</h2>
            <h3 className="text-xl text-white mb-2">Lord Sebastian Hartwell</h3>
            <p className="text-gray-300 mb-4">Rik samlare känd för fester och kontroversiella affärer.</p>
            <p className="text-red-300 font-bold">Funnen död kl 22:15</p>
            <p className="text-gray-400 text-sm mt-2">Dödsorsaken är ännu okänd - ni måste utreda...</p>
          </div>

          <div className="bg-purple-900/50 p-6 rounded-xl mb-6">
            <p className="text-gray-300">
              Efter middagen skulle Lord avslöja något revolutionerande. 
              Men han kom aldrig. Funnen livlös i biblioteket. 
              Dörrarna låsta inifrån.
              <br /><br />
              <strong className="text-red-400">En av er är mördaren...</strong>
            </p>
          </div>

          <div className="bg-blue-900/30 border-2 border-blue-500/50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              VIKTIGT: Innan ni börjar utmaningarna!
            </h3>
            <div className="space-y-3 text-gray-200 text-sm">
              {[
                'Presentera er karaktär - Varje person berättar kort vem de är, sin roll och personlighet (INTE hemligheten än!)',
                'Använd karaktärskorten - Om ni skrivit ut dem, läs igenom ditt kort och använd informationen för att svara på frågor',
                'Ställ frågor till varandra - "Varför är du här ikväll?" "Hur kände du Lord?" "Vad gör du till vardags?"',
                'Var i karaktär - Agera som er person. Högljudd miljardär? Visa det! Tyst främling? Var mystisk!',
                'Ta 10-15 minuter för detta innan ni börjar lösa utmaningarna. Det gör mysteriet MYCKET roligare!'
              ].map((t, idx) => (
                <p key={idx} className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">{idx + 1}.</span>
                  <span><strong>{t.split(' - ')[0]}</strong>{t.includes(' - ') && ' - ' + t.split(' - ')[1]}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="bg-red-900/30 border-2 border-red-500/50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-red-300 mb-3 flex items-center gap-2">
              <Skull className="w-5 h-5" />
              ⚠️ VIKTIGT: Spelregler
            </h3>
            <div className="space-y-3 text-gray-200 text-sm">
              <div>
                <p className="font-bold text-red-400 mb-1">Omröstning - Anklaga mördaren:</p>
                <ul className="ml-4 space-y-1">
                  <li>• <strong>När som helst</strong> kan ni rösta på vem ni tror är mördaren</li>
                  <li>• <strong>Om ni har RÄTT:</strong> Spelet är över - ni vinner!</li>
                  <li>• <strong>Om ni har FEL:</strong> Den oskyldiga elimineras och kan INTE delta mer</li>
                  <li className="text-yellow-400">• <strong>Mördarens fördel:</strong> Kan påverka diskussionen och leda er fel!</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-amber-500/30">
                <p className="font-bold text-amber-400 mb-1">Förhör (Max 3 gånger):</p>
                <ul className="ml-4 space-y-1">
                  <li>• Ni kan rösta fram någon att <strong>kalla till förhör</strong></li>
                  <li>• <strong>Inspektören</strong> leder alltid förhöret och ställer frågorna</li>
                  <li>• Den förhörda måste avslöja ENDAST:
                    <ul className="ml-4 mt-1">
                      <li className="text-amber-300">→ <strong>Relation till Lord Sebastian</strong> (från Character Card)</li>
                      <li className="text-amber-300">→ <strong>Färdigheter och expertis</strong> (från Character Card)</li>
                    </ul>
                  </li>
                  <li className="text-xs text-gray-400 italic">⚠️ Dessa uppgifter kan ENDAST avslöjas genom förhör!</li>
                </ul>
              </div>
              <p className="text-xs text-gray-400 mt-2">💡 Våga ni riskera att förlora en oskyldig spelare?</p>
            </div>
          </div>

          <button
            onClick={handleStartInvestigation}
            className="w-full bg-gradient-to-r from-red-600 to-purple-600 text-white py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform"
          >
            Vi har lärt känna varandra → Starta utredningen
          </button>
        </div>
      </div>
    </div>
  );
}
