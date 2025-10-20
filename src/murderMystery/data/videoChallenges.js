// Video challenges that unlock intrigue videos
// Each challenge is tied to a character and unlocks specific video content

export const videoChallenges = [
  {
    id: 'reginald-whisky',
    characterId: 1, // Reginald Blackwood
    characterName: 'Inspektör Reginald Blackwood',
    videoPath: '/media/videos/intrigues/reginald-whisky.mp4',
    title: 'Whiskyflaske-mysteriet',
    description: 'En mystisk upptäckt som kan kopplas till Reginald. Vad döljer han?',
    challenge: {
      title: 'Blandaren',
      instructions: 'Reginald måste blanda en drink åt spelledaren eller en annan deltagare med minst 3 ingredienser.',
      alternativeInstructions: 'Alternativ: Reginald gissar vilken "whisky" som används i ett blindsmaktest (kan vara alkoholfritt).'
    },
    suspicionImpact: 'Väcker misstankar mot Reginald',
    unlocked: false,
    completed: false
  },
  {
    id: 'victor-sebastian-arguing',
    characterId: 2, // Victor von Sterling
    characterName: 'Victor von Sterling',
    videoPath: '/media/videos/intrigues/victor_sebastian_argument.mp4',
    title: 'Spelskuldens Konfrontation',
    description: 'Victor och Lord Sebastian ses argumentera hetsigt. Diskussionen verkar handla om pengar...',
    challenge: {
      title: 'Försäljningspitchen',
      instructions: 'Victor måste på 90 sekunder försöka "sälja" en värdelös sak (t.ex. en penna, ett gem) till gruppen som om den vore ovärderlig. Han måste övertyga minst 2 personer att "köpa" den.',
      alternativeInstructions: 'Alternativ: Victor spelar "Lögnen & Sanningen" - berättar 3 påståenden om sig själv (2 lögner, 1 sanning) och gruppen måste gissa vilken som är sann.'
    },
    suspicionImpact: 'Väcker misstankar om Victors ekonomiska desperation',
    unlocked: false,
    completed: false
  },
  {
    id: 'ladywhitmore-sebastian',
    characterId: 3, // Lady Margaret Whitmore
    characterName: 'Lady Margaret Whitmore',
    videoPath: '/media/videos/intrigues/sebastian_whitmore_corridor.mp4',
    title: 'Den Sista Vittningen',
    description: 'Ett avgörande ögonblick strax före mordet. Vad hände egentligen?',
    challenge: {
      title: 'Hovdamens Lektion',
      instructions: 'Lady Whitmore måste ge en 90-sekunders lektion i korrekt hållning och retorik. Hon väljer ut 2-3 deltagare och instruerar dem i: rak rygg, hur man står, handhållning och talteknik. Lektionen måste inkludera minst 3 korrigeringar.',
      alternativeInstructions: 'Alternativ: Lady Whitmore demonstrerar proper hållning medan hon reciterar ett kort tal eller poem på 45 sekunder - utan att sänka axlarna eller böja ryggen.'
    },
    suspicionImpact: 'Ökar mysteriet kring Lady Whitmore',
    unlocked: false,
    completed: false
  },
  {
    id: 'victor-arabella-whiskey',
    characterId: 2, // Victor von Sterling (can also be 6 for Arabella)
    characterName: 'Victor von Sterling & Dr. Arabella',
    videoPath: '/media/videos/intrigues/victor_arabella_whiskey.mp4',
    title: 'Den Hemliga Gåvan',
    description: 'Victor ger Arabella något diskret - en flaska. Vad innehåller den egentligen?',
    challenge: {
      title: 'Gåvans Hemlighet',
      instructions: 'Victor eller Arabella måste ge en annan spelare en "gåva" (vilket föremål som helst från bordet) och övertyga dem om att ta emot den genom att hitta på en historia om varför gåvan är viktig (60 sekunder).',
      alternativeInstructions: 'Alternativ: Victor och Arabella måste samarbeta för att lösa en enkel utmaning tillsammans (t.ex. bygga något, skapa en historia tillsammans) på 90 sekunder - testas deras samarbete.'
    },
    suspicionImpact: 'Visar koppling mellan Victor och Arabella - arbetade de tillsammans?',
    unlocked: false,
    completed: false
  },
  {
    id: 'arabella-blueprints',
    characterId: 6, // Dr. Arabella Cogsworth
    characterName: 'Dr. Arabella Cogsworth',
    videoPath: '/media/videos/intrigues/drarabella_showcase_blueprint.mp4',
    title: 'Uppfinningen',
    description: 'En interaktion mellan Dr Arabella och Sebastian. Något väcker hans intresse...',
    challenge: {
      title: 'Uppfinnaren',
      instructions: 'Dr Arabella ska rita/designa en påhittad uppfinning på 2 minuter och "pitcha" den för gruppen (30 sekunder).',
      alternativeInstructions: 'Alternativ: Bygg något kreativt av tillgängliga föremål på bordet.'
    },
    suspicionImpact: 'Antydan om konflikt men inte tydlig misstanke',
    unlocked: false,
    completed: false
  },
  {
    id: 'mysterious-stranger-searching',
    characterId: 7, // Den Mystiska Främlingen
    characterName: 'Den Mystiska Främlingen',
    videoPath: '/media/videos/intrigues/stranger_searching_office.mp4',
    title: 'Hemliga Efterforskningar',
    description: 'Den mystiska främlingen ses smyga runt i Lords kontor. Vad söker de efter?',
    challenge: {
      title: 'Spionage-Scenen',
      instructions: 'Den Mystiska Främlingen måste beskriva ett viktigt minne/ögonblick från sitt liv (påhittat backstory) i 60 sekunder.',
      alternativeInstructions: 'Alternativ: Håll pokerfejs i 30 sekunder medan andra försöker få honom att le/reagera.'
    },
    suspicionImpact: 'Väcker allvarliga misstankar om främlingens avsikter',
    unlocked: false,
    completed: false
  },
  {
    id: 'professor-mixing-chemicals',
    characterId: 4, // Professor Edmund Thornbury
    characterName: 'Professor Edmund Thornbury',
    videoPath: '/media/videos/intrigues/professor_mixing_chemicals.mp4',
    title: 'Kemiska Experiment',
    description: 'Professorn ses hantera kemikalier i ett avskilt rum. Vad blandar han egentligen?',
    challenge: {
      title: 'Vetenskaplig Demonstration',
      instructions: 'Professorn måste hålla en 90-sekunders föreläsning om ett vetenskapligt ämne (giftläran, kemi, forensik etc.) med minst 5 "fakta" (påhittade är ok). Han måste tala akademiskt och använda minst 3 latinska termer.',
      alternativeInstructions: 'Alternativ: Professorn ska glömma bort namnen på 3 personer i rummet och försöka beskriva dem istället utan att säga deras namn.'
    },
    suspicionImpact: 'Väcker allvarliga misstankar om Professorns kemiska kunskaper',
    unlocked: false,
    completed: false
  },
  {
    id: 'max-whiskey-stress',
    characterId: 5, // Maximilian 'Max' Goldstein
    characterName: 'Maximilian "Max" Goldstein',
    videoPath: '/media/videos/intrigues/maximilian_office_talk.mp4',
    title: 'Nervös Hantering',
    description: 'Max observeras ensam i studiet. Hans beteende verkar misstänkt nervöst...',
    challenge: {
      title: 'Pengasnacket',
      instructions: 'Max måste under 60 sekunder skryta om sina rikedomar och nämna minst 8 dyra saker han äger (bil, yacht, hus, klocka, etc.) - om han upprepar sig eller tystnar längre än 3 sekunder måste han börja om.',
      alternativeInstructions: 'Alternativ: Max måste svara på 5 snabba frågor från andra gäster utan att bli provocerad eller höja rösten. Om han blir arg måste han börja om från fråga 1.'
    },
    suspicionImpact: 'Väcker allvarliga misstankar mot Max',
    unlocked: false,
    completed: false
  }
];
