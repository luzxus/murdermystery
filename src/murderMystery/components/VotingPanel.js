import React from 'react';
// (No icon imports needed currently)

export function VotingPanel({ activePlayers, selectedPlayers, votes, castVote, onCancel, onFinish, feedback, isFinalVote }) {
  // Find the inspector (id: 1 = Inspektör Reginald Blackwood)
  const inspector = activePlayers.find(p => p.id === 1);
  const isInspectorSelected = votes.group === 1;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-red-900 to-purple-900 rounded-2xl p-8 max-w-3xl w-full border-2 border-red-500">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          {isFinalVote ? '🎯 SLUTGILTIG OMRÖSTNING' : '⚖️ OMRÖSTNING'}
        </h2>
        <p className="text-gray-300 text-center mb-6">
          {isFinalVote
            ? '⚠️ SISTA CHANSEN! Om ni väljer fel förlorar ni och mördaren går fri!'
            : 'Vem tror ni är mördaren? Var försiktig - om ni har fel elimineras den oskyldiga!'
          }
        </p>

        {feedback && (
          <div className={`p-4 rounded-lg mb-6 ${
            feedback.type === 'success' ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'
          }`}>
            <p className="font-bold text-center">{feedback.message}</p>
          </div>
        )}

        {/* Inspector warning */}
        {inspector && isInspectorSelected && (
          <div className="bg-blue-900/50 border-2 border-blue-400 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-blue-300 text-2xl">🔎</div>
              <div className="flex-1">
                <h3 className="text-blue-300 font-bold mb-2">⚠️ Observera: Inspektören</h3>
                <p className="text-white text-sm mb-2">
                  Ni har valt <strong>Inspektör Reginald Blackwood</strong> - spelledaren.
                </p>
                <p className="text-blue-200 text-sm mb-2">
                  <strong>Viktigt:</strong> Inspektören kan endast röstas ut om <strong>ALLA spelare är helt eniga</strong>.
                </p>
                <p className="text-blue-200 text-sm">
                  Om inspektören röstas ut måste gruppen <strong>omedelbart rösta fram en ny inspektör</strong> som ärver veto-rätten.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {activePlayers.map((player) => {
            const isInspector = player.id === 1;
            return (
              <button
                key={player.id}
                onClick={() => castVote('group', player.id)}
                className={`p-4 rounded-lg border transition-all ${
                  votes.group === player.id
                    ? 'border-red-500 bg-red-900/30'
                    : isInspector
                    ? 'bg-blue-900/20 border-blue-500/30 hover:border-blue-400/50'
                    : 'bg-black/40 border-white/20 hover:border-red-500/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  {player.profileImage ? (
                    <img
                      src={player.profileImage}
                      alt={player.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                    />
                  ) : (
                    <div className={`w-12 h-12 rounded-full ${player.color} flex items-center justify-center text-white font-bold`}>
                      {selectedPlayers.indexOf(player) + 1}
                    </div>
                  )}
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-bold">{player.name}</h3>
                      {isInspector && (
                        <span className="text-xs bg-blue-600/40 text-blue-200 px-2 py-0.5 rounded border border-blue-500/30">
                          INSPEKTÖR
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{player.role}</p>
                  </div>
                </div>
                {votes.group === player.id && (
                  <div className="bg-red-500/20 border border-red-500 rounded px-3 py-1 text-red-300 text-sm font-bold">
                    ✓ ANKLAGAD
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className={`border rounded-lg p-4 mb-6 ${
          isFinalVote ? 'bg-red-900/30 border-red-500' : 'bg-yellow-900/30 border-yellow-500'
        }`}>
          <p className={`text-sm mb-3 ${isFinalVote ? 'text-red-200' : 'text-yellow-200'}`}>
            📋 Klicka på den person ni gemensamt anklagar för mordet.
          </p>
          <p className="text-white text-sm font-bold">
            {isFinalVote
              ? '⚠️ VARNING: Detta är er sista chans! Om ni väljer fel person förlorar ni spelet!'
              : 'Om RÄTT: Ni vinner! Om FEL: Personen elimineras och ni fortsätter.'
            }
          </p>
        </div>

        <div className="flex gap-4">
          {!isFinalVote && (
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-bold hover:bg-gray-700"
            >
              Avbryt
            </button>
          )}
          <button
            onClick={onFinish}
            className={`bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 ${
              isFinalVote ? 'w-full' : 'flex-1'
            }`}
          >
            {isFinalVote ? '🎯 SLUTGILTIG ANKLAGELSE' : 'Räkna röster & Avslöja'}
          </button>
        </div>
      </div>
    </div>
  );
}
