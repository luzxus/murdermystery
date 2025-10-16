import { useState, useEffect, useRef } from 'react';
import { conversationPrompts } from '../data/conversationPrompts';

export function useConversationPrompts({ 
  selectedPlayers, 
  currentPhase, 
  unlockedClues,
  completedChallenges,
  gameTimeElapsed 
}) {
  const [activePrompts, setActivePrompts] = useState([]);
  const [dismissedPrompts, setDismissedPrompts] = useState(new Set());
  const lastClueCount = useRef(0);
  const lastChallengeCount = useRef(0);
  const lastTimeCheck = useRef(0);

  // get current game phase based on clues or challenges
  const getPhase = () => {
    const clueCount = unlockedClues?.length || 0;
    if (clueCount <= 1) return 'early';
    if (clueCount <= 3) return 'mid';
    return 'late';
  };

  const phase = currentPhase || getPhase();

  // check if a prompt should be triggered
  const checkPromptTrigger = (prompt) => {
    // already dismissed
    if (dismissedPrompts.has(prompt.id)) return false;

    // check phase match
    if (prompt.phase !== 'any' && prompt.phase !== phase) return false;

    // check specific triggers
    switch (prompt.trigger) {
      case 'clue_unlock':
        return unlockedClues?.includes(prompt.triggerValue) && 
               lastClueCount.current < (unlockedClues?.length || 0);
      
      case 'challenge_complete':
        return completedChallenges >= prompt.triggerValue &&
               lastChallengeCount.current < completedChallenges;
      
      case 'timer':
        return gameTimeElapsed >= prompt.triggerValue * 60 &&
               lastTimeCheck.current < gameTimeElapsed;
      
      case 'silence':
        // would need to track user activity
        return false; // implement when activity tracking is added
      
      case 'voting_started':
      case 'challenge_failed':
      case 'deep_analysis':
      case 'red_herring':
        // these are triggered manually via triggerPrompt function
        return false;
      
      default:
        return false;
    }
  };

  // check for new prompts on state changes
  useEffect(() => {
    const checkAndAddPrompts = () => {
      const newPrompts = conversationPrompts.filter(checkPromptTrigger);
      
      if (newPrompts.length > 0) {
        // sort by priority
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        newPrompts.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        
        setActivePrompts(prev => [...prev, ...newPrompts]);
      }

      // update counters
      lastClueCount.current = unlockedClues?.length || 0;
      lastChallengeCount.current = completedChallenges || 0;
      lastTimeCheck.current = gameTimeElapsed || 0;
    };

    checkAndAddPrompts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlockedClues, completedChallenges, gameTimeElapsed, phase, selectedPlayers, dismissedPrompts]);

  // manually trigger a prompt (for events like voting, red herrings, etc)
  const triggerPrompt = (trigger, triggerValue = null) => {
    const matchingPrompts = conversationPrompts.filter(p => {
      if (dismissedPrompts.has(p.id)) return false;

      const phaseMatch = p.phase === 'any' || p.phase === phase;
      const triggerMatch = p.trigger === trigger;
      const valueMatch = triggerValue === null || p.triggerValue === triggerValue;

      return phaseMatch && triggerMatch && valueMatch;
    });

    if (matchingPrompts.length > 0) {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      matchingPrompts.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      
      setActivePrompts(prev => [...prev, ...matchingPrompts]);
    }
  };

  // dismiss a prompt
  const dismissPrompt = (promptId) => {
    setDismissedPrompts(prev => new Set([...prev, promptId]));
    setActivePrompts(prev => prev.filter(p => p.id !== promptId));
  };

  // get the next prompt to show (highest priority)
  const currentPrompt = activePrompts.length > 0 ? activePrompts[0] : null;

  return {
    currentPrompt,
    activePrompts,
    triggerPrompt,
    dismissPrompt
  };
}
