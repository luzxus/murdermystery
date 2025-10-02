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
    id: 'professor-victor-arguing',
    characterId: [4, 5], // Professor Edmund Thornbury & Max Goldstein (Victor = id 2, men i videon är det Max)
    characterName: 'Professor Edmund Thornbury & Max Goldstein',
    videoPath: '/media/videos/intrigues/professor-and-victor-arguing.mp4',
    title: 'Det Heta Argumentet',
    description: 'Ett ögonblick av spänning mellan två gäster. Vad ligger bakom konflikten?',
    challenge: {
      title: 'Debatten',
      instructions: 'Professorn och Max håller en 60-sekunders debatt om ett påhittat ämne (t.ex. "Vad är viktigast - vetenskap eller pengar?").',
      alternativeInstructions: 'Alternativ: De spelar "Ja, men..." där de argumenterar mot varandra i 1 minut.'
    },
    suspicionImpact: 'Väcker misstankar mot både Professorn och Max',
    unlocked: false,
    completed: false
  },
  {
    id: 'ladywhitmore-sebastian',
    characterId: 3, // Lady Margaret Whitmore
    characterName: 'Lady Margaret Whitmore',
    videoPath: '/media/videos/intrigues/ladywhitmore-sebastian.mp4',
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
    id: 'arabella-blueprints',
    characterId: 6, // Dr. Arabella Cogsworth
    characterName: 'Dr. Arabella Cogsworth',
    videoPath: '/media/videos/intrigues/arabella-showing-sebastian-blueprints.mp4',
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
    id: 'mysterious-stranger-entering',
    characterId: 7, // Den Mystiska Främlingen
    characterName: 'Den Mystiska Främlingen',
    videoPath: '/media/videos/intrigues/mysterious-stranger-entering.mp4',
    title: 'Fotografiet',
    description: 'Den mystiska främlingen observeras bära något vid sitt bröst. Vad kan det betyda?',
    challenge: {
      title: 'Fotografiet',
      instructions: 'Den Mystiska Främlingen måste beskriva ett viktigt minne/ögonblick från sitt liv (påhittat backstory) i 60 sekunder.',
      alternativeInstructions: 'Alternativ: Håll pokerfejs i 30 sekunder medan andra försöker få honom att le/reagera.'
    },
    suspicionImpact: 'Deltagarna börjar undra om hans alibi',
    unlocked: false,
    completed: false
  },
  {
    id: 'max-whiskey-stress',
    characterId: 5, // Maximilian 'Max' Goldstein
    characterName: 'Maximilian "Max" Goldstein',
    videoPath: '/media/videos/intrigues/maximilan-office-whiskey-stressed.mp4',
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
