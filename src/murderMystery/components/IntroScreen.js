import React from 'react';
import { Skull, AlertCircle } from 'lucide-react';
import { MANOR_STILL } from '../constants';

export function IntroScreen({ onStartGame }) {
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
              ⚠️ VIKTIGT: Omröstningsregler
            </h3>
            <div className="space-y-2 text-gray-200 text-sm">
              <p><strong className="text-red-400">• När som helst</strong> kan ni rösta på vem ni tror är mördaren</p>
              <p><strong className="text-red-400">• Om ni har RÄTT:</strong> Spelet är över - ni vinner!</p>
              <p><strong className="text-red-400">• Om ni har FEL:</strong> Den oskyldiga elimineras och kan INTE delta mer</p>
              <p><strong className="text-yellow-400">• Mördarens fördel:</strong> Kan påverka diskussionen och leda er fel!</p>
              <p className="text-xs text-gray-400 mt-2">💡 Våga ni riskera att förlora en oskyldig spelare?</p>
            </div>
          </div>

          <button
            onClick={onStartGame}
            className="w-full bg-gradient-to-r from-red-600 to-purple-600 text-white py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform"
          >
            Vi har lärt känna varandra → Starta utredningen
          </button>
        </div>
      </div>
    </div>
  );
}
