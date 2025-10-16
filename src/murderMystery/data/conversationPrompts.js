// general conversation prompts that appear during gameplay
// these are non-character-specific to avoid revealing private information
// focused on pacing, atmosphere, and group dynamics

export const conversationPrompts = [
  // early game - setting the scene
  {
    id: 'cp_001',
    phase: 'early',
    trigger: 'clue_unlock',
    triggerValue: 1,
    prompt: "🔍 Första ledtråden hittad! Diskutera vad de kemiska resterna kan betyda. Finns det någon med relevant expertis?",
    priority: 'high'
  },
  {
    id: 'cp_002',
    phase: 'early',
    trigger: 'challenge_complete',
    triggerValue: 1,
    prompt: "✅ Bra jobbat! Ta en stund att dela era första intryck. Vad tror ni hände i biblioteket?",
    priority: 'medium'
  },
  {
    id: 'cp_003',
    phase: 'early',
    trigger: 'timer',
    triggerValue: 5,
    prompt: "⏰ 5 minuter har gått. Har alla haft chans att dela sina karaktärers bakgrund och relation till Lord Sebastian?",
    priority: 'low'
  },

  // mid game - building tension
  {
    id: 'cp_004',
    phase: 'mid',
    trigger: 'clue_unlock',
    triggerValue: 3,
    prompt: "📜 Brevet nämner stulen egendom. Diskutera: Vilka av er hade något att förlora om sanningen kom fram?",
    priority: 'high'
  },
  {
    id: 'cp_005',
    phase: 'mid',
    trigger: 'challenge_complete',
    triggerValue: 3,
    prompt: "🚬 Pipan hittad! Detta är ett viktigt bevis. Vem använder pipa? Vad kan det avslöja?",
    priority: 'high'
  },
  {
    id: 'cp_006',
    phase: 'mid',
    trigger: 'deep_analysis',
    triggerValue: null,
    prompt: "🔬 Fördjupad analys genomförd. Detta kan ha konsekvenser... Fortsätt undersöka tillsammans.",
    priority: 'medium'
  },
  {
    id: 'cp_007',
    phase: 'mid',
    trigger: 'timer',
    triggerValue: 30,
    prompt: "⏳ Halvtid! Sammanfatta vad ni vet hittills. Börjar ett mönster framträda?",
    priority: 'medium'
  },

  // late game - final deductions
  {
    id: 'cp_008',
    phase: 'late',
    trigger: 'clue_unlock',
    triggerValue: 5,
    prompt: "🔑 Sista ledtråden upplåst! Den innehåller en dold kod. Studera noga tillsammans - detta kan vara avgörande.",
    priority: 'critical'
  },
  {
    id: 'cp_009',
    phase: 'late',
    trigger: 'challenge_complete',
    triggerValue: 5,
    prompt: "🎯 Alla utmaningar klarade! Ni har nu all information. Diskutera och börja sammanställa era teorier.",
    priority: 'critical'
  },
  {
    id: 'cp_010',
    phase: 'late',
    trigger: 'timer',
    triggerValue: 50,
    prompt: "⚠️ Tiden rinner ut! Inom kort måste ni göra er anklagelse. Överväg alla bevis noggrant.",
    priority: 'high'
  },

  // event-based prompts
  {
    id: 'cp_011',
    phase: 'any',
    trigger: 'voting_started',
    triggerValue: null,
    prompt: "⚖️ Röstning påbörjad. Diskutera era slutsatser innan ni gör er anklagelse. Detta är er enda chans!",
    priority: 'critical'
  },
  {
    id: 'cp_012',
    phase: 'any',
    trigger: 'challenge_failed',
    triggerValue: null,
    prompt: "❌ Försök igen! Kan någon med specifik expertis hjälpa till? Använd era karaktärers unika kunskaper.",
    priority: 'medium'
  },
  {
    id: 'cp_013',
    phase: 'any',
    trigger: 'red_herring',
    triggerValue: null,
    prompt: "👁️ Ny observation! Är detta relevant - eller en avledning? Diskutera kritiskt.",
    priority: 'low'
  },

  // pacing and atmosphere
  {
    id: 'cp_014',
    phase: 'early',
    trigger: 'timer',
    triggerValue: 10,
    prompt: "💡 Tips: Rollspela era karaktärer! Använd era egenheter, svagheter och mål från karaktärskorten.",
    priority: 'low'
  },
  {
    id: 'cp_015',
    phase: 'mid',
    trigger: 'timer',
    triggerValue: 25,
    prompt: "🎭 Påminnelse: Tänk på era karaktärers hemligheter. Ska ni avslöja dem - eller behålla dem för er själva?",
    priority: 'low'
  },
  {
    id: 'cp_016',
    phase: 'late',
    trigger: 'timer',
    triggerValue: 45,
    prompt: "🕵️ Börjar bitarna falla på plats? Se över alla ledtrådar tillsammans och leta efter kopplingar.",
    priority: 'medium'
  }
];

// helper function to get prompts for specific phase
export function getPromptsForPhase(phase = 'any') {
  return conversationPrompts.filter(
    p => p.phase === phase || p.phase === 'any'
  );
}

// helper function to get prompt by trigger
export function getPromptByTrigger(trigger, triggerValue = null, phase = 'any') {
  return conversationPrompts.find(
    p => p.trigger === trigger &&
         (triggerValue === null || p.triggerValue === triggerValue) &&
         (p.phase === phase || p.phase === 'any')
  );
}
