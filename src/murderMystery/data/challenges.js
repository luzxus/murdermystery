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
    title: "Undersök Professorns laboratorium",
    description: "En brännmärkt laboratoriejournal har hittats bland Professorns papper. Texten är delvis förstörd men några avgörande rader går att läsa.",
    puzzle: "Journalen är svårt skadad av vätska och värme, men följande text kan urskiljas:\n\n'...Experiment T-47: Sömnmedel\nDos: 5 droppar för normal sömn\nOBS: 15 droppar+ DÖDLIGT vid alkohol\nLeveransdatum: [suddigt]\nBeställare: [bränt bort]'\n\nNär ni försöker läsa mer faller journalen isär i händerna på er.\n",
    hint: "Fundera på doseringen och kopplingen till romerska siffror. Vad är den dödliga dosen och hur skrivs den med romerska siffror?",
    answer: "XVII",
    acceptedAnswers: ["XVII", "xvii", "17 med romerska siffror"],
    instruction: "Hur skriver man 17 med romerska siffror?",
    type: "investigation",
    timeLimit: 10,
    difficulty: "Lätt",
    prop: {
      item: "Brännmärkt laboratoriejournal (skriv ut från dator)",
      location: "Gömd bland Professorns papper i studiet",
      clue: "Visar att Professorn blandade ett experiment sömnmedel (T-47) som blir dödligt vid alkohol. Beställarens namn är bränt bort - men någon beställde detta."
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
    title: "Gåtan på skrivbordet",
    description: "På Sebastians skrivbord ligger en lapp med en gåta skriven.",
    puzzle: "Jag har händer men kan inte greppa. Jag visar tiden men kan inte tala. Vad är jag?",
    hint: "Tänk på något som finns på de flesta skrivbord och som har både stora och små visare.",
    answer: "klockur",
    acceptedAnswers: ["klockur", "klocka", "ur"],
    instruction: "Vad är svaret på gåtan?",
    type: "riddle",
    timeLimit: 10,
    difficulty: "Lätt",
    prop: {
      item: "Lapp med gåta",
      location: "På Sebastians skrivbord",
      clue: "En gåta som leder till ett klockur, vilket kan ha betydelse för tidslinjen i berättelsen."
    }
  },
 /*  {
    id: 6,
    title: "Förhör Butlern",
    description: "Butler Ashford har viktig information om vad han hörde natten till mordet. Han verkar tveksam att dela med sig...",
    puzzle: "Butlern berättar:\n\n'Jag hörde Victor von Sterling prata med sig själv i korridoren strax före middagen. Han verkade stressad och sa något i stil med:\n\n\"Jag har så svårt att sova... det enda som hjälpt är att dricka mig berusad. Skulden har varit svår att hantera.\"\n\nVad tror ni Victor menade med 'skulden'?'\n\nButlern ger tre alternativ:\nA) Ekonomisk skuld (pengar)\nB) Moralisk skuld (samvete)\nC) Båda två\n\nVad tror ni är rätt?",
    hint: "Victor har spelat poker med Sebastian och förlorat stora summor. Men han sa också 'skulden har varit svår att hantera' - är det bara pengar han pratar om?",
    answer: "C",
    acceptedAnswers: ["C", "BÅDA", "BÅDA TVÅ", "BÅDATVÅ", "BÅDE OCH", "EKONOMISK OCH MORALISK"],
    instruction: "Vilket alternativ väljer ni? (A, B eller C)",
    type: "investigation",
    timeLimit: 8,
    difficulty: "Lätt",
    prop: {
      item: "Butlerns vittnesberättelse (ingen fysisk prop)",
      location: "Förhör med Butler Ashford",
      clue: "Visar att Victor hade både ekonomiska problem OCH något på sitt samvete. Varför sa han att han 'dricker sig berusad' för att hantera 'skulden'?"
    }
  } */
];
