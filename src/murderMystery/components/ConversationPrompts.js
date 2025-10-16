import React, { useState, useEffect } from 'react';
import { MessageCircle, X, AlertCircle } from 'lucide-react';

export function ConversationPrompts({ prompts, onDismiss }) {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // auto-dismiss after 20 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(prompts[currentIndex].id), 300);
    }, 20000);

    return () => clearTimeout(timer);
  }, [currentIndex, prompts, onDismiss]);

  if (!prompts || prompts.length === 0) return null;

  const currentPrompt = prompts[currentIndex];
  
  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      if (currentIndex < prompts.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setVisible(true);
      } else {
        onDismiss(currentPrompt.id);
      }
    }, 300);
  };

  const priorityColors = {
    critical: 'from-red-500 to-red-600 border-red-400',
    high: 'from-purple-500 to-purple-600 border-purple-400',
    medium: 'from-blue-500 to-blue-600 border-blue-400',
    low: 'from-gray-500 to-gray-600 border-gray-400'
  };

  const priorityIcons = {
    critical: '‼️',
    high: '❗',
    medium: '💬',
    low: '💭'
  };

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-md z-40 transition-all duration-300 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div
        className={`bg-gradient-to-br ${priorityColors[currentPrompt.priority]} text-white rounded-lg shadow-2xl border-2 overflow-hidden`}
      >
        {/* header */}
        <div className="flex items-center justify-between p-3 bg-black/20">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold text-sm">
              {priorityIcons[currentPrompt.priority]} Rollspelsuppdrag
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* content */}
        <div className="p-4">
          <p className="text-sm leading-relaxed">{currentPrompt.prompt}</p>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between p-3 bg-black/20 text-xs">
          <div className="flex items-center gap-1 text-white/70">
            <AlertCircle className="w-3 h-3" />
            <span>Försvinner automatiskt om 20 sek</span>
          </div>
          {prompts.length > 1 && (
            <span className="text-white/90 font-semibold">
              {currentIndex + 1} / {prompts.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
