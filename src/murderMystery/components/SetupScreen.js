import React, { useState } from 'react';
import { Skull, Users, Play, Shield, FileText, AlertCircle } from 'lucide-react';
import { GM_PASSWORDS } from '../constants';

const PlayerCountSelector = ({ playerCount, setPlayerCount }) => (
  <div className="grid grid-cols-7 gap-2 mb-8">
    {[1, 2, 3, 4, 5, 6, 7].map(num => (
      <button
        key={num}
        onClick={() => setPlayerCount(num)}
        className={`p-4 rounded-lg font-bold text-lg transition-all ${
          playerCount === num ? 'bg-purple-600 text-white scale-110' : 'bg-white/10 text-gray-300'
        }`}
      >
        {num}
      </button>
    ))}
  </div>
);

export function SetupScreen({ playerCount, setPlayerCount, onDistribute, showCharacterCards, setShowCharacterCards, challenges }) {
  const [gmPassword, setGmPassword] = useState('');
  const [showGMPanel, setShowGMPanel] = useState(false);

  const checkGMPassword = (e) => {
    e.preventDefault();
    const cleaned = gmPassword.toLowerCase().replace(/\s+/g, '');
    if (GM_PASSWORDS.includes(cleaned)) {
      setShowGMPanel(true);
      setGmPassword('');
    } else {
      alert('Fel lösenord!');
      setGmPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Skull className="w-24 h-24 mx-auto mb-6 text-red-500" />
            <h1 className="text-5xl font-bold text-white mb-4">Murder Mystery</h1>
            <p className="text-xl text-gray-300">Hartwell Manor</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Users className="w-8 h-8" />
            Antal deltagare
          </h2>

          <PlayerCountSelector playerCount={playerCount} setPlayerCount={setPlayerCount} />

          <button
            onClick={onDistribute}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 mb-4"
          >
            <Play className="w-6 h-6" />
            Dela ut roller
          </button>

          <button
            onClick={() => setShowCharacterCards(true)}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-3"
          >
            <FileText className="w-5 h-5" />
            Visa karaktärskort (för utskrift)
          </button>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Spelledare? Lås upp svarslista
            </p>
            <form onSubmit={checkGMPassword} className="flex gap-2">
              <input
                type="password"
                value={gmPassword}
                onChange={(e) => setGmPassword(e.target.value)}
                placeholder="jagaroskyldig"
                className="flex-1 bg-black/40 text-white border border-purple-500/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
              />
              <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700">
                Lås upp
              </button>
            </form>
          </div>
        </div>

        {showGMPanel && (
          <div className="bg-red-900/30 border-2 border-red-500 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              SPELLEDARE - Svar
            </h3>
            {challenges.map((ch, i) => (
              <div key={ch.id} className="mb-4 bg-black/40 p-4 rounded-lg">
                <p className="text-white font-bold mb-1">{i + 1}. {ch.title}</p>
                <p className="text-green-400 font-mono">Svar: {ch.answer}</p>
                <p className="text-gray-400 text-sm">Tid: {ch.timeLimit} min</p>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-red-500/50">
              <p className="text-red-300 font-bold">Mördare väljs slumpmässigt vid start</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
