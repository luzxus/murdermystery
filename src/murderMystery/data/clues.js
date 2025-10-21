// Reworked clue definitions with layered structure aimed at subtle deduction.
// PLOT TWIST: Victor is the real murderer. Arabella is his accomplice who actively helps him.
// Victor bought "sleep medicine" from Professor (who didn't know it was actually poison).
// Victor asked Arabella to give the poisoned bottle to Sebastian - she knew and agreed.
// Both Victor and Arabella protect each other throughout the game.
// Sebastian was secretly in love with Arabella and trying to steal her blueprints.
// Butler testimony: Sebastian said "I must have it, even if it means betraying someone I love"
// GAME RULE: Players must vote out Victor (id:2) to win. Voting out Arabella (id:6) = loss.
// IMPORTANT: Clues should be SUBTLE and AMBIGUOUS - players must deduce, not be told.

export const clues = [
  {
    id: 1,
    phase: 'early',
    title: 'Whiskyglaset',
    description: 'Svag bittermandeldoft. Tunn blågrön kristallhinna kvar på insidan av glaset.',
    unlock: '🧪 Under UV-ljus framträder oregelbundna kantmönster – rekristallisation avbruten snabbt. Detta kräver både praktisk OCH teoretisk kunskap inom kemi. Kristallresterna tyder på en experimentell blandning.',
    tags: ['gift', 'kemi', 'kristaller', 'källarvalv', 'professor'],
    misdirectionTags: ['akademiskt', 'uppfinnare'],
    suspicionWeight: { primary: 8, secondary: 4 },
    unlockCondition: 'solve_challenge_1'
  },
  {
    id: 2,
    phase: 'early',
    title: 'Manschettknappen',
    description: 'En silvermanschettknapp hittas i Lord Sebastians högra ficka.',
    unlock: '🔍 Manschettknappen är av sterling silver med ett ingraverat monogram. Den tillhör inte Sebastian.',
    tags: ['silver', 'manschettknapp', 'monogram', 'ficka'],
    misdirectionTags: [],
    suspicionWeight: { primary: 5, secondary: 5 },
    unlockCondition: 'challenge_progress_>=2'
  },
  {
    id: 3,
    phase: 'mid',
    title: 'Professorns laboratoriejournal',
    description: 'En brännmärkt laboratoriejournal hittas bland Professorns papper. Texten är delvis brännskadat men avgörande information går att läsa.',
    unlock: '💊 Journalen avslöjar: "Experiment T-47: Sömnmedel ordinerat. Dos: 5 droppar för normal sömn. OBS: mer än 17 droppar (3ml) + DÖDLIGT vid alkohol." Professorn har blandat ett experimentellt sömnmedel som blir dödligt om man blandar med alkohol',
    tags: ['sömnmedel', 'dödlig dos', 'professor', 'alkohol'],
    misdirectionTags: ['akademiskt', 'medicin'],
    suspicionWeight: { primary: 7, secondary: 6 },
    unlockCondition: 'solve_challenge_3'
  },
  {
    id: 4,
    phase: 'mid',
    title: 'Röstinspelningen',
    description: 'En telefon (ligger kvar på ett sidobord) börjar plötsligt ringa. Skärmen visar ingen kontakt – bara en anonym ikon.',
    unlock: '☎️ Spelarna kan välja att "svara" eller ignorera. Om de svarar spelas ett förinspelat röstmeddelande upp: en dämpad viskning följt av ett kort hårt andetag. Rösten säger: "Du letar på fel hylla... doser avslöjas inte öppet. Fem är sömn. Sjutton är slutet. Och det var aldrig tänkt att nå tjugotre." Svag rasp av tyg mot trä i bakgrunden. Om de INTE svarar: de får ett kort med texten: "Ni missade ett anonymt samtal. Möjligen relevant för dos och tider."',
    tags: ['telefon', 'röstinspelning', 'doser', 'anonym', 'ljud'],
    misdirectionTags: ['professor', 'mystik', 'teknik'],
    suspicionWeight: { primary: 7, secondary: 4 },
    unlockCondition: 'challenge_progress_>=4',
    media: {
      video: '/media/videos/ringing_phone.mp4',
      audio: '/media/voice/voice_threatening2.mp3'
    },
    interaction: {
      type: 'call',
      onAnswerTranscript: 'Han fick vad han förtjänade. Jag förlorade allt jag hade. och nu ville han förstöra fler liv. Sluta snoka runt annars ska ni få se...',
      onDeclineText: 'Ni valde att inte svara. Möjligen förlorad pusselbit om dos och tid.'
    }
  },
  {
    id: 5,
    phase: 'late',
    title: 'Sebastians kalender',
    description: 'På skrivbordet ligger en öppen kalender. Dagens datum visar: "19:00 - Middag. 22:00 - Avslöjande. 23:00 - M.G. kontrakt"',
    unlock: '📅 Den sista raden (23:00 - M.G. kontrakt) är skriven med något mörkare bläck än de andra. Vad hade Sebastian planerat 23:00?',
    deepHint: 'Om Sebastian skulle avslöja något kl 22:00 och sedan träffa M.G. kl 23:00 för ett "kontrakt" - vad skulle kontraktet handla om? Kanske bevis eller vittnesmål?',
    tags: ['kalender', 'hemligt möte', 'M.G.', 'kontrakt', 'motiv'],
    misdirectionTags: ['lady margaret', 'max goldstein'],
    suspicionWeight: { primary: 7, secondary: 6 },
    unlockCondition: 'solve_challenge_5'
  },
/*   {
    id: 6,
    phase: 'late',
    title: 'Butlerns vittnesberättelse',
    description: 'Butler Ashford vittnar om vad han hörde Victor säga strax före middagen.',
    unlock: '🎩 Butlern hörde Victor prata med sig själv: "Jag har så svårt att sova... det enda som hjälpt är att dricka mig berusad. Skulden har varit svår att hantera."',
    tags: ['victor', 'skuld', 'sömnproblem', 'samvete', 'alkohol', 'koppling', 'sömnmedel T-47'],
    misdirectionTags: ['spelskulder', 'desperation'],
    suspicionWeight: { primary: 10, secondary: 3 },
    unlockCondition: 'solve_challenge_6'
  } */
];

