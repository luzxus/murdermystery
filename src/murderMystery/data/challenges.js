// Challenge definitions
export const challenges = [
  {
    id: 1,
    title: "Det kryptiska meddelandet",
    description: "Lord Sebastian lämnade detta kodade meddelande vid sin dator: 'NJSUEBSFO FS JCMBOE FSS'. Dekoda meddelandet.",
    puzzle: "NJSUEBSFO FS JCMBOE FSS",
    hint: "Detta chiffer användes av hebreiska skriftlärda för att dölja texter i Bibeln. Det kallas för 'omkastnings-chiffer' och var populärt bland kabbalister. Namnet börjar på A och slutar på H...",
    answer: "MÖRDAREN ÄR IBLAND ERR",
    acceptedAnswers: ["MORDARENARIBLANDERR", "MÖRDAREN ÄR IBLAND ERR", "MORDAREN AR IBLAND ERR", "MORDARENARIBLAND", "MÖRDARENÄRIBLAND", "MORDARENARIBLANDEER"],
    instruction: "Skriv det dekodade meddelandet",
    type: "text",
    timeLimit: 8,
    difficulty: "Svår"
  },
  {
    id: 2,
    title: "Systemets hemlighet",
    description: "Lords dator med JavaScript-funktion. Vad returnerar mystery(5)?",
    puzzle: "function mystery(n) {\n  if (n <= 1) return 1;\n  return n * mystery(n - 1);\n}\n\nmystery(5) = ?",
    hint: "Fakultet: 5 × 4 × 3 × 2 × 1 = ?",
    answer: "120",
    acceptedAnswers: ["120"],
    instruction: "Skriv resultatet",
    type: "code",
    timeLimit: 5,
    difficulty: "Lätt"
  },
  {
    id: 3,
    title: "Det antika oraklet",
    description: "Lord lämnade ett meddelande skrivet i sin dagbok: 'I templet där den kransade guden härskar, mellan nektarens buteljer från Bourgogne och Toscana, vilar min sista bekännelse.' Sök och ni skall finna.",
    puzzle: "Följ ledtrådarna och hitta föremålet...",
    hint: "Den kransade guden = Bacchus/Dionysus (vinguden). Nektar = vin. Bourgogne och Toscana = vinregioner. Sök där man förvarar vin!",
    answer: "PIPA",
    acceptedAnswers: ["PIPA", "TRAPIPA", "TRÄPIPA", "EN PIPA", "PIPAN", "RÖKPIPA"],
    instruction: "Vad för typ av föremål hittade ni? (ett ord)",
    type: "physical",
    timeLimit: 10,
    difficulty: "Medel",
    prop: {
      item: "Träpipa (från Butterick's, ca 80-100kr)",
      location: "Bakom vinflaskor i köket/fikarummet",
      clue: "Kan ha en lapp: 'Min närmaste konfident visste för mycket. Jag betalade priset. - S.H.'"
    }
  },
  {
    id: 4,
    title: "Skuggorna talar",
    description: "En säkerhetskamera-bild återfanns. Lord skrev: 'Ser ni det som inte borde vara där?' Studera allt – även tidsstämpeln.",
    puzzle: "Lords anteckning: 'De lämnar alltid spår. Titta där ögat inte naturligt söker sig. Det omöjliga avslöjar sanningen.'",
    hint: "Lord pratade ofta i koder. 'Det omöjliga' - finns det något i bilden som är fysiskt omöjligt? Inte bara vad man ser, utan VAD MAN LÄSER. Även det mest vardagliga kan dölja ett budskap...",
    answer: "VÄN",
    acceptedAnswers: ["VÄN", "VAN", "VÄNNEN", "MINVÄN", "MIN VÄN", "MINVAN", "MIN VAN"],
    instruction: "Vad är det omöjliga som avslöjar sanningen?",
    type: "visual",
    timeLimit: 12,
    difficulty: "Mycket svår",
    solution: "I bildens säkerhetskamera-stämpel: 22/28/14. Månad 28 existerar inte = omöjligt! Kod: V(22) Ä(28) N(14) i alfabetet = VÄN",
    image: "/media/images/flaskv1.png"
  },
  {
    id: 5,
    title: "Identitetskondenseringen",
    description: "Ni måste nu korsa social information. Endast genom att jämföra hemligheter, roller och motiv kan ni destillera den 'skapande kraft' Lord syftade på i sin sista anteckning.",
    puzzle: "Ledtrådar att sammanfoga:\n1. En gäst vars karriär hänger på intellektuell prestige (plagiat-risk).\n2. En gäst vars skapelse förändrar något materiellt (mekanik + kemi).\n3. En gäst vars hemlighet är en moralisk katastrof från det förflutna.\n4. En gäst vars förlust är självförvållad genom last.\n5. En gäst som inte är den de säger sig vara.\n\nInstruktion: Identifiera vilka av dessa fem som direkt kräver aktivt skapande + teknisk förståelse i NUTID – inte dåtid, inte passiv förvaltning, inte destruktion. Kombinera därefter begreppet med vad Lord skrev om 'väcker stum materia' och destillera till EN roll / arketyp. Svara med rollens kärnbenämning – ej namn.\n\n(Hint kan begäras men kostar tid.)",
    hint: "Endast en av de misstänkta förenar både upprepad praktisk mekanisk manipulation och kemisk kompetens i nuet – inte teoretisk, inte rent ekonomisk, inte historiskt dold skuld.",
    answer: "UPPFINNAREN",
    acceptedAnswers: ["UPPFINNAREN", "UPPFINNARE", "UPPFINNARINNA", "DR ARABELLA", "ARABELLA", "UPPFINNARENARABELLA"],
    instruction: "Vad är den destillerade rollen? (ett ord eller fras)",
    type: "social",
    timeLimit: 9,
    difficulty: "Svår"
  }
];
