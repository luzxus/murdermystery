// Challenge definitions - Rewritten as narrative investigation actions
export const challenges = [
  {
    id: 1,
    title: "Undersök Lords dator",
    description: "Ett kodat meddelande har hittats på Lord Sebastians dator. Du måste dechiffrera det för att fortsätta utredningen.",
    puzzle: "NJSUEBSFO FS JCMBOE FSS\n\n(Lord var känd för att använda klassiska chiffer i sin korrespondens)",
    hint: "Detta chiffer användes av hebreiska skriftlärda för att dölja texter i Bibeln. Det kallas för 'omkastnings-chiffer' och var populärt bland kabbalister. Namnet börjar på A och slutar på H...",
    answer: "MÖRDAREN ÄR IBLAND ERR",
    acceptedAnswers: ["MORDARENARIBLANDERR", "MÖRDAREN ÄR IBLAND ERR", "MORDAREN AR IBLAND ERR", "MORDARENARIBLAND", "MÖRDARENÄRIBLAND", "MORDARENARIBLANDEER"],
    instruction: "Vad står det i det dekodade meddelandet?",
    type: "investigation",
    timeLimit: 8,
    difficulty: "Svår"
  },
  {
    id: 2,
    title: "Analysera säkerhetssystemet",
    description: "Lords säkerhetssystem har en kodad tidsstämpelfunktion. Du måste beräkna värdet för att låsa upp loggen.",
    puzzle: "function mystery(n) {\n  if (n <= 1) return 1;\n  return n * mystery(n - 1);\n}\n\nmystery(5) = ?\n\n(Detta är säkerhetssystemets access-kod för loggar kring 22:00)",
    hint: "Tänk rekursivt. Funktionen kallar sig själv med n-1 tills basfallet (n <= 1).",
    answer: "120",
    acceptedAnswers: ["120"],
    instruction: "Vad är access-koden?",
    type: "investigation",
    timeLimit: 5,
    difficulty: "Lätt"
  },
  {
    id: 3,
    title: "Genomsök biblioteket",
    description: "Lords dagbok innehåller en gåtfull ledtråd till ett gömt föremål: 'I templets svala salar, där den kransade guden vakar, vilar bekännelsen i skuggan av Bourgogne och Toscana.",
    puzzle: "Följ ledtrådarna och hitta föremålet...\n\n'Den kransade guden' - 'nektarens buteljer' - 'Bourgogne och Toscana'\n\nVar ska ni leta?",
    hint: "Fundera över symboliken.",
    answer: "PIPA",
    acceptedAnswers: ["PIPA", "TRAPIPA", "TRÄPIPA", "EN PIPA", "PIPAN", "RÖKPIPA"],
    instruction: "Vad för typ av föremål hittade ni?",
    type: "investigation",
    timeLimit: 10,
    difficulty: "Medel",
    prop: {
      item: "Träpipa (från Butterick's, ca 80-100kr)",
      location: "",
      clue: "Kan ha en lapp: 'Min närmaste konfident visste för mycket. Jag betalade priset. - S.H.'"
    }
  },
  {
    id: 4,
    title: "Granska säkerhetskameran",
    description: "En säkerhetskamera-bild från mordnatten har påträffats. Lord skrev i marginalen: 'Ser ni det som inte borde vara där?'",
    puzzle: "Lords anteckning: 'De lämnar alltid spår. Titta där ögat inte naturligt söker sig. Det omöjliga avslöjar sanningen.'\n\nStudera bilden noggrant – även metadata och detaljer.",
    hint: "Lord pratade ofta i koder. Allt är inte som det verkar. 'Det omöjliga' - Även det mest vardagliga kan dölja ett budskap...",
    answer: "VÄN",
    acceptedAnswers: ["VÄN", "VAN", "VÄNNEN", "MINVÄN", "MIN VÄN", "MINVAN", "MIN VAN"],
    instruction: "Vad avslöjar det omöjliga i bilden?",
    type: "investigation",
    timeLimit: 12,
    difficulty: "Mycket svår",
    solution: "I bildens säkerhetskamera-stämpel: 22/28/14. Månad 28 existerar inte = omöjligt! Kod: V(22) Ä(28) N(14) i alfabetet = VÄN",
    image: "/media/images/flaskv1.png"
  },
  {
    id: 5,
    title: "Analysera giftets ursprung",
    description: "Den toxikologiska rapporten innehåller avgörande information om var och hur giftet framställdes. Detta är den sista pusselbiten.",
    puzzle: "Toxikologisk rapport (slutgiltig):\n\n'Substansen identifieras som ett syntetiskt cyanid-derivat, variant HC-7. Detta är INTE kommersiellt tillgängligt.\n\nFramställning kräver:\n- Avancerad destillationsapparatur och vakuumkammare\n- Expertis inom organisk kemisyntes\n- Tillgång till kontrollerade prekursorkemikalier\n- Privat forskningsfacilitet (ej tillgängligt i offentliga laboratorier)\n\nBaserat på kristallstrukturen bedöms giftet ha framställts inom 24-48 timmar före mordtillfället.'\n\nButlerns anteckning:\n'Flera av gästerna har vetenskaplig bakgrund, men endast EN har egen privat forskningsfacilitet här på godset - inrättad i källarvalven för mekaniska och kemiska experiment.'",
    hint: "Tänk tillbaka på vem som beskrivits ha 'eget laboratorium i källaren' och arbetar med både mekanik OCH kemi. Vem har den typ av privat facility som krävs?",
    answer: "EGET LABORATORIUM",
    acceptedAnswers: ["EGET LABORATORIUM", "LABORATORIUM", "LAB", "PRIVAT LABORATORIUM", "LABORATORIET", "LABB", "EGET LAB", "PRIVAT LAB"],
    instruction: "Vilken typ av facilitet krävdes för att framställa giftet?",
    type: "investigation",
    timeLimit: 10,
    difficulty: "Svår"
  }
];
