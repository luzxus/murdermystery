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
    title: "Undersök kemikalieflaskan",
    description: "En mystisk glasflaska har hittats nära biblioteket. Den innehåller rester av en okänd kemikalie och har ett partiellt etikett.",
    puzzle: "På flaskan finns en delvis bortsliten etikett:\n\n'HC-__ VARNING: CY__ID\nFörvaring: -2_°C\nTillverkad: [datum suddigt]\nURSPRUNG: ______valv'\n\nButlerns vittnesberättelse:\n'Strax efter midnatt, när jag gick min vanliga runda runt herrgården, såg jag något gnistra i buskagen utanför biblioteksfönstret. När jag undersökte hittade jag denna flaska, gömd under löv. Den var fortfarande kall i handen. Någon måste ha gömt den där under kvällen.'\n\nVilken typ av plats slutar på '-valv' och kan ha varit ursprunget?",
    hint: "Tänk på platser i en herrgård där man skulle förvara kemikalier. Vilken typ av rum finns under markplan och har rätt temperatur för känsliga ämnen?",
    answer: "KÄLLARVALV",
    acceptedAnswers: ["KÄLLARVALV", "KALLARVALV", "KÄLLAREN", "KÄLLARVALVET", "KALLARVALVET", "LABORATORIEVALV", "LABORATORIET"],
    instruction: "Varifrån kom kemikalieflaskan ursprungligen?",
    type: "investigation",
    timeLimit: 10,
    difficulty: "Medel"
  }
];
