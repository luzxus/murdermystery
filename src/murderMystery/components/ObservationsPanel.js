import React from 'react';
import { Eye, AlertTriangle } from 'lucide-react';

export function ObservationsPanel({ observations }) {
  if (!observations || observations.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Eye className="w-16 h-16 text-white/30" />
          <h3 className="text-2xl font-bold text-white">Inga Observationer Än</h3>
          <p className="text-slate-300 max-w-md">
            Observationer och anomalier kommer att dyka upp under spelets gång.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <Eye className="w-6 h-6 text-amber-400" />
        <h2 className="text-2xl font-bold text-white">Observationer</h2>
        <span className="ml-auto text-sm bg-amber-600/30 text-amber-200 px-3 py-1 rounded-full">
          {observations.length} upptäckt{observations.length !== 1 ? 'a' : ''}
        </span>
      </div>

      <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-200">
            <strong>Varning:</strong> Inte alla observationer är nödvändigtvis relevanta för utredningen.
            Vissa kan vara falsklarm eller vilseledande information.
          </p>
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {observations.slice().reverse().map((observation, index) => (
          <ObservationCard
            key={observation.id}
            observation={observation}
            isRecent={index < 2}
          />
        ))}
      </div>
    </div>
  );
}

function ObservationCard({ observation, isRecent }) {
  return (
    <div
      className={`bg-white/10 rounded-xl p-4 border transition-all ${
        isRecent
          ? 'border-amber-400/50 shadow-lg shadow-amber-500/10'
          : 'border-white/20'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
          isRecent ? 'bg-amber-400 animate-pulse' : 'bg-slate-400'
        }`} />
        <div className="flex-1">
          <p className="text-sm text-slate-200 leading-relaxed">
            {observation.text}
          </p>
          {isRecent && (
            <span className="inline-block mt-2 text-xs bg-amber-600 text-white px-2 py-0.5 rounded-full">
              NY
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
