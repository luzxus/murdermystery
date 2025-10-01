// Domain data: character personas
// Single Responsibility: exports immutable personas array
export const personas = [
  {
    id: 1,
    name: "Inspektör Reginald Blackwood",
    accessory: "Detective Mustasch",
    role: "Privatdetektiv",
    color: "bg-gray-700",
    personality: "Metodisk, observant, och något cynisk.",
    background: "Har löst över 50 fall i London. Känd för sin okonventionella metodik.",
    secret: "Utreder ett försvunnet arvstvistdokument som Lord påstås ha stulit.",
    secretClue: "Har ett brunt läderetui i innerfickan med konfidentiella dokument.",
    murdererMotive: "Lord Sebastian stal bevis från ditt fall och hotade förstöra din karriär.",
    characterCard: {
      quirks: "Röker pipa, citerar Sherlock Holmes, har fobi för hundar",
      relationToVictim: "Lord anlitade dig för 3 år sedan för att hitta en stulen tavla",
      skills: "Expert på fingeravtryck och spåranalys",
      weakness: "Alkoholproblem som du döljer väl"
    }
  },
  {
    id: 2,
    name: "Victor von Sterling",
    accessory: "Silver Fluga",
    role: "Aristokrat & Spelare",
    color: "bg-slate-500",
    personality: "Charmig och optimistisk.",
    background: "Förlorade familjeförmögenheten men håller skenet uppe.",
    secret: "Har förlorat familjeförmögenheten i poker till Lord Sebastian.",
    secretClue: "Bär alltid spelkort i fickan - blandar dem nervöst.",
    murdererMotive: "Lord vann din familjs artefakt i poker och vägrade sälja tillbaka.",
    characterCard: {
      quirks: "Berättar alltid historier från 'glansdagarna', fåfäng om sin klädsel",
      relationToVictim: "Spelade regelbundet poker med Lord - förlorade ofta",
      skills: "Läser kroppsspråk perfekt, mästare på att ljuga övertygande",
      weakness: "Spelberoende - kan inte motstå en satsning"
    }
  },
  {
    id: 3,
    name: "Lady Margaret Whitmore",
    accessory: "Vita Handskar",
    role: "Tidigare Hovdam",
    color: "bg-slate-300",
    personality: "Korrekt och stel.",
    background: "Tjänade kungafamiljen i 20 år innan 'pensionen'.",
    secret: "Bär ALLTID handskar för att dölja brännmärke på högra handen.",
    secretClue: "Vägrar ta av sig handskarna - blir aggressiv om någon frågar.",
    murdererMotive: "Lord visste om branden där din make dog - DU startade den.",
    characterCard: {
      quirks: "Rättar andras grammatik, dricker alltid te kl 16:00, hatar opunktlighet",
      relationToVictim: "Lord upptäckte din hemlighet för 6 månader sedan",
      skills: "Känner alla kungliga protokoll, expert på gift i historien",
      weakness: "Panikångest när någon tar i hennes händer"
    }
  },
  {
    id: 4,
    name: "Professor Edmund Thornbury",
    accessory: "Hög Hatt Brun",
    role: "Professor i Kriminologi",
    color: "bg-amber-800",
    personality: "Akademisk och disträ.",
    background: "Undervisar vid Cambridge. Skriv banbrytande bok om mord.",
    secret: "Plagierat all forskning - Lords anteckningar finns i din väska.",
    secretClue: "Har en tjock anteckningsbok som skyddas nervöst.",
    murdererMotive: "Lord visste om plagiatet och hotade avslöja dig.",
    characterCard: {
      quirks: "Glömmer namn, pratar om brottsfall vid middagen, bär alltid anteckningsbok",
      relationToVictim: "Lord hittade dina opublicerade teorier i sin fars gamla papper",
      skills: "Vet allt om mordmetoder, toxikologi och kriminalistik",
      weakness: "Klumpig socialt, säger ofta för mycket"
    }
  },
  {
    id: 5,
    name: "Maximillian Max Goldstein",
    accessory: "Guldhalsband Dollar",
    role: "Oljemiljardär",
    color: "bg-yellow-500",
    personality: "Högljudd och självgod.",
    background: "Self-made miljardär från Texas. Kontroversiell affärsman.",
    secret: "Driver illegala oljebolag - Lord hade bevis.",
    secretClue: "Fick tre nervösa telefonsamtal under middagen.",
    murdererMotive: "Lord hotade avslöja dina illegala oljebolag.",
    characterCard: {
      quirks: "Pratar ständigt om pengar, ringer affärspartners mitt under middagen",
      relationToVictim: "Lord ville köpa in sig i dina företag - du vägrade",
      skills: "Bestickning, hotelser, har kontakter överallt",
      weakness: "Impulsiv, blir lätt provocerad av de som 'ser ner' på honom"
    }
  },
  {
    id: 6,
    name: "Dr. Arabella Cogsworth",
    accessory: "Steampunk Glasögon",
    role: "Uppfinnarinna",
    color: "bg-orange-600",
    personality: "Excentrisk och snabbpratande.",
    background: "Briljant uppfinnarinna med eget laboratorium i källaren.",
    secret: "Lord stal ritningarna till din uppfinning.",
    secretClue: "Har mekaniska verktyg och kemiska flaskor i väskan - vägrade visa innehållet när någon frågade.",
    murdererMotive: "Lord stal ritningar och planerade patentera dem själv.",
    characterCard: {
      quirks: "Reparerar saker mitt i samtal, ser mönster i allt, älskar klockor",
      relationToVictim: "Visade Lord din uppfinning för 2 månader sedan - han blev väldigt intresserad",
      skills: "Expert på kemi, mekanik och explosive ämnen",
      weakness: "Naiv när det gäller människor - litar för lätt"
    }
  },
  {
    id: 7,
    name: "Den Mystiska Främlingen",
    accessory: "Svart Ögonmask",
    role: "Okänd Identitet",
    color: "bg-black",
    personality: "Tystlåten och gåtfull.",
    background: "Ingen vet varifrån du kom eller ditt riktiga namn.",
    secret: "Är barn till person Lord förstörde - här under falskt namn.",
    secretClue: "Har gammalt fotografi i fickan med Lord och din förälder.",
    murdererMotive: "Lord upptäckte din identitet - du är här för hämnd.",
    characterCard: {
      quirks: "Undviker direkta frågor, studerar alla intensivt, rör sig ljudlöst",
      relationToVictim: "Lord förstörde din familj för 20 år sedan - du har väntat länge",
      skills: "Infiltration, förfalskning av dokument, spionage",
      weakness: "Hämndlystnaden gör dig reckless"
    }
  }
];
