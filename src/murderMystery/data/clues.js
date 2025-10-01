// Reworked clue definitions with layered structure aimed at subtle deduction.
// Each clue has optional deepHint (unlocked by performance or GM), tags for thematic linking,
// phase for pacing, and misdirection tags to blend with red herrings.
export const clues = [
  {
    id: 1,
    phase: 'early',
    title: 'Whiskyglaset',
    description: 'Svag bittermandeldoft. Tunn blågrön kristallhinna kvar på insidan av glaset.',
    unlock: '🧪 Kristallresterna tyder på ett snabbverkande cyanid-derivat som (troligen) framställts experimentellt snarare än köpts färdigt.',
    deepHint: 'Under UV-ljus framträder oregelbundna kantmönster – rekristallisation avbruten snabbt. Kräver praktisk labbrutin (uppfinning / toxikologi).',
    tags: ['gift', 'kemi', 'kristaller'],
    misdirectionTags: ['akademiskt', 'uppfinnare'],
    suspicionWeight: { primary: 6, secondary: 4 }, // Arabella primärt, Professor sekundärt
    unlockCondition: 'solve_challenge_1' // symbolic key (can be auto when challenge 1 solved)
  },
  {
    id: 2,
    phase: 'early',
    title: 'Tidsfönstret',
    description: '22:00 servering. 22:07 ett kort metalliskt kling från biblioteket. 22:15 kroppen hittas.',
    unlock: '⏰ Ljudet kan vara ett litet metallföremål som tappats – för litet för möbelbeslag. Någon var där inne kort utan att dra uppmärksamhet.',
    deepHint: 'Ett knappt synligt metallspån vid mattkanten – kan komma från precisionsverktyg, anteckningsklämma eller manschettdetalj.',
    tags: ['tid', 'mekanik', 'metall'],
    misdirectionTags: ['detektiv', 'professor', 'industri'],
    suspicionWeight: { primary: 5, secondary: 3 },
    unlockCondition: 'challenge_progress_>=2'
  },
  {
    id: 3,
    phase: 'mid',
    title: 'Brevet',
    description: 'Brev i fickan: “Du stal något som definierar MIG. Återlämna det – annars slutar dina intriger.”',
    unlock: '💰 Formuleringen tyder på identitet knuten till skapande / intellektuellt ägarskap (ritningar, forskning eller ekonomisk konstruktion).',
    deepHint: 'Baksidan visar fem svaga parallella intryck – som från ritbrädans linjering eller mekanisk skissplatta.',
    tags: ['ägarskap', 'ritning', 'patent'],
    misdirectionTags: ['professor', 'ekonomi'],
    suspicionWeight: { primary: 7, secondary: 4 },
    unlockCondition: 'solve_challenge_2_fast'
  },
  {
    id: 4,
    phase: 'mid',
    title: 'Hyllsektionen',
    description: 'Endast en sektion oordnad: “Toxikologins Fundament”, “Patenträtt 1900–1930”, “Kinetiska Mekanismer”, “Ekonomiska Oegentligheter i Industrin”.',
    unlock: '📚 Kombinationen av toxikologi + mekanik + patent antyder överlapp av kemisk och uppfinningsrelaterad agenda.',
    deepHint: 'Ett cirkulärt blekt avtryck (som från varm liten metallcylinder) på hyllkant – kan vara spetsigt verktyg / lödkolvsliknande.',
    tags: ['kemi', 'patent', 'mekanik', 'toxikologi'],
    misdirectionTags: ['professor', 'industri', 'juridik'],
    suspicionWeight: { primary: 6, secondary: 5 },
    unlockCondition: 'challenge_progress_>=4'
  },
  {
    id: 5,
    phase: 'late',
    title: 'Sista anteckningen',
    description: 'Anteckningsbok: “De tror jag bara samlar. Men jag vet: den sanna faran är den som väcker stum materia … Ikväll kräver jag gnistan tillbaka.” Delar är utsmetade.',
    unlock: '✍️ Formulering antyder skaparkraft – någon som bygger/konstruerar. Kan feltolkas som teoretiker eller uppfinnare.',
    deepHint: 'Första bokstaven i fem rader (om man re-konstruerar layout) bildar A R A B E – sista bokstaven brännmärkt/förstörd.',
    tags: ['kod', 'akrostik', 'skapande'],
    misdirectionTags: ['professor', 'mystik'],
    suspicionWeight: { primary: 9, secondary: 2 },
    unlockCondition: 'all_previous_unlocked'
  }
];
