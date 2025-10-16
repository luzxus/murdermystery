import React, { useState } from 'react';

/**
 * Interactive cipher wheel component for Challenge 5
 * Players rotate three concentric wheels to align symbols and reveal the culprit
 */
export function CipherWheel({ onSolve }) {
  // Three wheels with different rotation states (0-23 positions for 24 segments)
  const [outerRotation, setOuterRotation] = useState(0);
  const [middleRotation, setMiddleRotation] = useState(0);
  const [innerRotation, setInnerRotation] = useState(0);

  // Solution: Outer=10, Middle=17, Inner=6 (spells "ARABELLA" in the aligned position)
  const SOLUTION = { outer: 10, middle: 17, inner: 6 };

  const checkSolution = () => {
    if (
      outerRotation === SOLUTION.outer &&
      middleRotation === SOLUTION.middle &&
      innerRotation === SOLUTION.inner
    ) {
      onSolve('DR ARABELLA');
    }
  };

  // Symbols on each wheel (24 positions each) - clean unicode symbols
  const outerSymbols = [
    '⚗', '§', '⌘', '¤', '‡', '†', '∞', '⌀', '∑', '✻',
    '⌚', '⚄', '◆', '⚖', '◊', '⚿', '≈', '∂', '≠', '±',
    '∫', '√', '∆', '◊'
  ];
  const middleSymbols = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X'];
  const innerSymbols = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];

  const rotateWheel = (wheel, direction) => {
    const newValue = (current) => {
      const next = current + direction;
      if (next < 0) return 23;
      if (next > 23) return 0;
      return next;
    };

    if (wheel === 'outer') setOuterRotation(newValue);
    if (wheel === 'middle') setMiddleRotation(newValue);
    if (wheel === 'inner') setInnerRotation(newValue);
  };

  // Calculate what's currently aligned at the top position (index 0)
  const getAlignedSymbol = (symbols, rotation) => {
    return symbols[rotation];
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border-2 border-purple-500/30">
      {/* Instructions */}
      <div className="text-center">
        <h3 className="text-white font-bold text-lg mb-2">Lords Chifferhjul</h3>
        <p className="text-purple-300 text-sm">
          Rotera hjulen tills symbolerna avslöjar mördarens identitet vid markören
        </p>
      </div>

      {/* Cipher Wheel Visual */}
      <div className="relative">
        {/* Top alignment marker */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl z-20">
          ▼
        </div>

        {/* Concentric circles representing wheels */}
        <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-2xl">
          {/* Outer wheel */}
          <g transform={`rotate(${outerRotation * 15} 200 200)`}>
            <circle cx="200" cy="200" r="180" fill="#4c1d95" stroke="#a855f7" strokeWidth="3" />
            {outerSymbols.map((symbol, i) => {
              const angle = (i * 15) - 90;
              const x = 200 + 150 * Math.cos(angle * Math.PI / 180);
              const y = 200 + 150 * Math.sin(angle * Math.PI / 180);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="20"
                  fill="white"
                  transform={`rotate(${-outerRotation * 15} ${x} ${y})`}
                >
                  {symbol}
                </text>
              );
            })}
          </g>

          {/* Middle wheel */}
          <g transform={`rotate(${middleRotation * 15} 200 200)`}>
            <circle cx="200" cy="200" r="130" fill="#5b21b6" stroke="#c084fc" strokeWidth="3" />
            {middleSymbols.map((symbol, i) => {
              const angle = (i * 15) - 90;
              const x = 200 + 105 * Math.cos(angle * Math.PI / 180);
              const y = 200 + 105 * Math.sin(angle * Math.PI / 180);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="18"
                  fontWeight="bold"
                  fill="white"
                  transform={`rotate(${-middleRotation * 15} ${x} ${y})`}
                >
                  {symbol}
                </text>
              );
            })}
          </g>

          {/* Inner wheel */}
          <g transform={`rotate(${innerRotation * 15} 200 200)`}>
            <circle cx="200" cy="200" r="80" fill="#7c3aed" stroke="#e9d5ff" strokeWidth="3" />
            {innerSymbols.map((symbol, i) => {
              const angle = (i * 15) - 90;
              const x = 200 + 60 * Math.cos(angle * Math.PI / 180);
              const y = 200 + 60 * Math.sin(angle * Math.PI / 180);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="14"
                  fill="white"
                  transform={`rotate(${-innerRotation * 15} ${x} ${y})`}
                >
                  {symbol}
                </text>
              );
            })}
          </g>

          {/* Center dot */}
          <circle cx="200" cy="200" r="15" fill="#1f2937" stroke="#a855f7" strokeWidth="2" />
        </svg>

        {/* Currently aligned values display */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 px-6 py-2 rounded-lg border border-purple-500/50">
          <div className="flex gap-4 text-white font-mono text-sm">
            <span>{getAlignedSymbol(outerSymbols, outerRotation)}</span>
            <span className="text-purple-400">•</span>
            <span>{getAlignedSymbol(middleSymbols, middleRotation)}</span>
            <span className="text-purple-400">•</span>
            <span>{getAlignedSymbol(innerSymbols, innerRotation)}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-8 mt-8">
        {/* Outer wheel controls */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-purple-300 text-xs font-semibold">YTTRE</span>
          <div className="flex gap-2">
            <button
              onClick={() => rotateWheel('outer', -1)}
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-bold transition"
            >
              ←
            </button>
            <button
              onClick={() => rotateWheel('outer', 1)}
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-bold transition"
            >
              →
            </button>
          </div>
        </div>

        {/* Middle wheel controls */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-purple-300 text-xs font-semibold">MITTEN</span>
          <div className="flex gap-2">
            <button
              onClick={() => rotateWheel('middle', -1)}
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-bold transition"
            >
              ←
            </button>
            <button
              onClick={() => rotateWheel('middle', 1)}
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-bold transition"
            >
              →
            </button>
          </div>
        </div>

        {/* Inner wheel controls */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-purple-300 text-xs font-semibold">INRE</span>
          <div className="flex gap-2">
            <button
              onClick={() => rotateWheel('inner', -1)}
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-bold transition"
            >
              ←
            </button>
            <button
              onClick={() => rotateWheel('inner', 1)}
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-bold transition"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <button
        onClick={checkSolution}
        className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-bold transition-all hover:scale-105 shadow-lg"
      >
        Lås upp lösningen
      </button>
    </div>
  );
}
