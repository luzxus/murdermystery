import React, { useState } from 'react';
import { EyeOff, ChevronDown, ChevronUp } from 'lucide-react';

export const AmbientObservations = ({ items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!items?.length) return null;
  
  const displayItems = isExpanded ? items : items.slice(-3);

  return (
    <div className="mt-6">
      {/* header with badge */}
   

      {/* observation list */}
      <div className="space-y-2">
        {displayItems.map((i, idx) => (
          <div
            key={i.id + idx}
            className="text-xs italic text-slate-400 border-l-2 border-purple-500/40 pl-3 py-1 bg-purple-900/10 rounded-r animate-fade-in"
          >
            {i.text}
          </div>
        ))}
      </div>

      {!isExpanded && items.length > 3 && (
        <p className="text-[10px] text-slate-300 mt-2 ml-6">
          ... och {items.length - 3} till. Klicka för att visa alla.
        </p>
      )}
    </div>
  );
};
