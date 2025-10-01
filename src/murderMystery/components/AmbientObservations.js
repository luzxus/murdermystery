import React from 'react';

export const AmbientObservations = ({ items }) => {
  if (!items?.length) return null;
  const recent = items.slice(-4);
  return (
    <div className="space-y-2 mt-6">
      {recent.map(i => (
        <div
          key={i.id + Math.random()}
          className="text-xs italic text-slate-400 border-l border-slate-600/60 pl-2 animate-pulse"
        >
          {i.text}
        </div>
      ))}
    </div>
  );
};
