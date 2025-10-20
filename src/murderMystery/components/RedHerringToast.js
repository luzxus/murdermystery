import React, { useEffect, useState } from 'react';
import { EyeOff } from 'lucide-react';

export const RedHerringToast = ({ item, onDone, duration = 6000 }) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!item) return;
    const hideTimer = setTimeout(() => setLeaving(true), duration - 500);
    const doneTimer = setTimeout(() => onDone?.(item.id), duration);
    return () => { clearTimeout(hideTimer); clearTimeout(doneTimer); };
  }, [item, duration, onDone]);

  if (!item) return null;

  return (
    <div className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border border-purple-500/40 bg-slate-800/95 backdrop-blur-md shadow-lg shadow-purple-900/30 ring-1 ring-purple-400/20 mx-auto ${leaving ? 'animate-toast-out' : 'animate-toast-in'}`}>      
      <div className="p-4 flex gap-3">
        <div className="mt-0.5 text-purple-300"><EyeOff className="w-5 h-5" /></div>
        <div className="flex-1">
          <p className="text-xs tracking-wide uppercase text-purple-400 font-semibold">Ny observation</p>
          <p className="text-sm leading-snug text-slate-100 mt-1">{item.text}</p>
          <p className="mt-2 text-[10px] text-slate-300 italic">Kan vara irrelevant – eller inte.</p>
        </div>
      </div>
      <div className="h-1 w-full bg-slate-700 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 animate-[shrink_var(--t)_linear_forwards]" style={{
          '--t': `${duration}ms`,
          animation: `shrink ${duration}ms linear forwards`
        }} />
      </div>
    </div>
  );
};

// Keyframe for progress bar (injected dynamically if not in global CSS)
const styleId = 'rh-toast-progress-style';
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const el = document.createElement('style');
  el.id = styleId;
  el.innerHTML = `@keyframes shrink { from { width: 100%; } to { width: 0%; } }`;
  document.head.appendChild(el);
}
