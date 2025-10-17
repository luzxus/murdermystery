// Red herring data objects (subtle misdirection)
export const redHerrings = [
  {
    id: 'rh_powder_prof',
    text: 'Ett ljusvitt pulver på Professorns manschett (kalk? krita?).',
    tags: ['kemi','akademiskt'],
    misleads: [4], // Professor id
    phase: 'early',
    strength: 1,
    weight: 1,
    cooldown: 1,
    maxUses: 1
  },
  {
    id: 'rh_card_victor',
    text: 'Ett ensamt spelkort (ruter knekt) under sidobordet.',
    tags: ['spel','ekonomi'],
    misleads: [2],
    phase: 'any',
    strength: 1,
    weight: 0.8,
    cooldown: 1,
    maxUses: 1
  },
  {
    id: 'rh_metal_fragment',
    text: 'Ett minimalt metallspån nära Max stol (manschett? verktyg?).',
    tags: ['mekanik','industri'],
    misleads: [5],
    phase: 'mid',
    strength: 2,
    weight: 1.2,
    cooldown: 2,
    maxUses: 1
  },
  {
    id: 'rh_glass_reflection',
    text: 'Svag oljig hinna i ett tomt glas (polermedel?).',
    tags: ['kemi','ytfilm'],
    misleads: [4,5],
    phase: 'mid',
    strength: 1,
    weight: 1,
    cooldown: 1,
    maxUses: 1
  },
  {
    id: 'rh_scorch',
    text: 'Litet sotspår på en bokrygg i toxikologihyllan.',
    tags: ['gift','värme'],
    misleads: [4,3],
    phase: 'late',
    strength: 2,
    weight: 1,
    cooldown: 2,
    maxUses: 1
  },
  {
    id: 'rh_tremble_detective',
    text: 'Detektivens hand darrar svagt när han håller sitt anteckningsblock.',
    tags: ['stress','beteende'],
    misleads: [1],
    phase: 'any',
    strength: 1,
    weight: 0.7,
    cooldown: 1,
    maxUses: 1
  }
];
