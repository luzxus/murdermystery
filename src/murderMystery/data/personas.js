// Domain data: character personas
// Single Responsibility: exports immutable personas array
export const personas = [
  {
    id: 1,
    name: "Inspektör Reginald Blackwood",
    accessory: "Detective Mustasch",
    role: "Privatdetektiv & Spelledare",
    color: "bg-gray-700",
    profileImage: "/media/images/profiles/inspector.png",
    personality: "Metodisk, observant, och något cynisk.",
    background: "Har löst över 50 fall i London. Känd för sin okonventionella metodik. Anlitad för att utreda Lord Sebastians mord.",
    secret: "DU ÄR OSKYLDIG och anlitad som utredare. Du är spelledare och har veto-rätt.",
    secretClue: "Har ett brunt läderetui i innerfickan med konfidentiella dokument. Du anlitades för att utreda mordet.",
    murdererMotive: "Du är OSKYLDIG - men kan bli anklagad. Spelarna kan rösta ut dig om ALLA är helt eniga. Om du röstas ut måste spelarna rösta fram en ny inspektör som ärver veto-rätten.",
    characterCard: {
      quirks: "Röker pipa, citerar Sherlock Holmes, har fobi för hundar",
      relationToVictim: "Anlitad för att utreda mordet på Lord Sebastian",
      skills: "Expert på fingeravtryck och spåranalys. VETO-RÄTT: Kan stoppa EN omröstning per spel.",
      weakness: "Kan bli utröstad om ALLA spelare är helt eniga - då måste en ny inspektör röstas fram"
    },
    // new roleplay depth fields
    personalGoal: "Lösa mordet och identifiera den verkliga mördaren (Victor von Sterling) och hans medhjälpare (Dr. Arabella). Ledtrådarna kommer peka åt olika håll - var metodisk. Använd din veto-rätt strategiskt för att skydda oskyldiga eller avslöja sanningen.",
    specialPower: "VETO-RÄTT: Du kan stoppa EN omröstning per spel. Använd den klokt. OBS: Du kan bara röstas ut om ALLA spelare är helt eniga. Om du röstas ut ärver nästa valda inspektör din veto-rätt.",
    relationships: {
      allies: [4], // professor thornbury - delar intresse för brottsanalys
      rivals: [7], // den mystiska främlingen - misstror deras hemlighetsmakeriet
      secrets: [3] // vet att lady margaret döljer något med handskarna
    },
    questionGuide: [
      "Fråga Professor Thornbury om toxikologiska detaljer i glaset",
      "Ifrågasätt Lady Margarets alibi - när tog hon av sig handskarna senast?",
      "Undersök Dr. Arabellas väska - vad har hon för kemikalier?"
    ],
    roleplayTips: [
      "Leds diskussionerna och håll ordning",
      "Ta upp din pipa och studera den när du tänker",
      "Citera Sherlock Holmes i viktiga stunder: 'När man eliminerat det omöjliga...'",
      "Använd din veto-rätt strategiskt - spara den till rätt tillfälle"
    ]
  },
  {
    id: 2,
    name: "Victor von Sterling",
    accessory: "Silver Fluga",
    role: "Aristokrat & Spelare",
    color: "bg-slate-500",
    profileImage: "/media/images/profiles/victor-von-sterling.png",
    personality: "Charmig och optimistisk.",
    background: "Förlorade familjeförmögenheten men håller skenet uppe.",
    secret: "DU ÄR MÖRDAREN. Du är skyldig för mordet men Dr.Arabella är din medhjälpare! Ni älskar varandra och båda visste att Sebastian hotade hennes blueprints. Dr. Arabella gav medvetet den förgiftade flaskan till Sebastian efter att du förgiftat den tillsammans. Ni skyddar varandra.",
    secretClue: "Bär alltid spelkort i fickan - blandar dem nervöst. Sågs argumentera hetsigt med Lord Sebastian tidigare under kvällen. Verkar ovanligt beskyddande av Dr. Arabella - de är hemliga älskare och medkonspiratörer.",
    murdererMotive: "Lord Sebastian skulle stjäla Arabellas blueprints (din älskares livsverk) OCH du var skyldig han massa pengar du inte har. Du köpte giftet från Professor Thornbury och du förgiftade whiskyflaskan. Arabella gav sedan flaskan till Sebastian. Ni är partners i brott.",
    characterCard: {
      quirks: "Berättar alltid historier från 'glansdagarna', fåfäng om sin klädsel, bär dyra silverманчетtknappar med familjemonogram trots ekonomiska problem",
      relationToVictim: "Spelade regelbundet poker med Lord - förlorade enorma summor. Är skyldig Sebastian en enorm spelskuld som han inte kan betala.",
      skills: "Läser kroppsspråk perfekt, mästare på att ljuga övertygande, expert på att vilseleda",
      weakness: "Spelberoende - kan inte motstå en satsning. Desperat pga sin ekonomiska situation. Måste skydda Dr. Arabella till varje pris - är djupt förälskad i henne."
    },
    personalGoal: "Skydda Dr. Arabella från anklagelser och se till att ni båda går fria. Peka misstankar mot andra. Endast om spelarna röstar ut DIG förlorar ni - om de röstar ut Arabella händer inget.",
    relationships: {
      allies: [6], // dr arabella - din hemliga älskare och partner i brott
      rivals: [3], // lady margaret - hon ser igenom dina lögner
      secrets: [1] // du såg inspektören dricka i hemlighet
    },
    questionGuide: [
      "Skydda Dr. Arabella genom att avleda misstankar från henne",
      "Peka subtilt mot Professor Thornburys toxikologiska kunskap",
      "Vilseleda genom att peka på andra karaktärers motiv"
    ],
    roleplayTips: [
      "Blanda spelkort nervöst när du är stressad",
      "Berätta överdrivna historier om din 'rika' barndom",
      "Kom ALLTID till Dr. Arabellas försvar - du älskar henne",
      "Samordna diskret med Arabella - ni är partners"
    ]
  },
  {
    id: 3,
    name: "Lady Margaret Whitmore",
    accessory: "Vita Handskar",
    role: "Tidigare Hovdam",
    color: "bg-slate-300",
    profileImage: "/media/images/profiles/Ladywhitmore.png",
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
    },
    personalGoal: "Skydda din hemlighet till vilket pris som helst och bevara din värdighet och rykte i societeten.",
    relationships: {
      allies: [4], // professor thornbury - respekterar hans akademiska sätt
      rivals: [2], // victor von sterling - förakt för hans oseriösa attityd
      secrets: [6] // du såg dr arabella gå in i biblioteket strax före mordet
    },
    questionGuide: [
      "Fråga Professor Thornbury om historiska giftmord i kungahuset",
      "Konfrontera Victor om hans 'ärorika' familjehistoria som du vet är lögn",
      "Observera Dr. Arabellas händer - har hon också något att dölja?"
    ],
    roleplayTips: [
      "Rätta grammatiska fel när någon pratar",
      "Bli väldigt spänd om någon försöker ta i dina händer",
      "Titta på klockan ofta och kommentera om någon är sen",
      "Referera till 'mina dagar vid hovet' för att öka din auktoritet"
    ]
  },
  {
    id: 4,
    name: "Professor Edmund Thornbury",
    accessory: "Hög Hatt Brun",
    role: "Professor i Kriminologi",
    color: "bg-amber-800",
    profileImage: "/media/images/profiles/Professor.png",
    personality: "Akademisk och disträ.",
    background: "Undervisar vid Cambridge. Skriv banbrytande bok om mord.",
    secret: "Lord Sebastian lurade dig på bokförlags-kontraktet. Du sålde det cyanid-derivat som användes i mordet till Victor von Sterling för 3 veckor sedan - du visste inte vad han skulle använda det till.",
    secretClue: "Har en tjock anteckningsbok som skyddas nervöst. Har omfattande kunskap om gifter och toxikologi. Verkar nervös när man diskuterar cyanid-derivat.",
    murdererMotive: "Lord Sebastian bedrog dig på bokförlags-kontraktet. Du sålde experimentella toxiner till Victor (som du trodde skulle användas för 'research'), men du anar nu att det kan ha använts i mordet.",
    characterCard: {
      quirks: "Glömmer namn, pratar om brottsfall vid middagen, bär alltid anteckningsbok",
      relationToVictim: "Lord Sebastian lurade dig på bokförlags-kontraktet och tog rättigheterna till din forskning",
      skills: "Vet allt om mordmetoder, toxikologi och keminaliexperts - särskilt cyanid-derivat. Har tillgång till experimentella gifter.",
      weakness: "Klumpig socialt, säger ofta för mycket. Bitter över det stulna kontraktet. Rädd att hans giftförsäljning ska avslöjas."
    },
    personalGoal: "Bevisa din expertis genom att lösa mordet - men samtidigt dölja att du sålde det gift som användes. Du visste INTE att det skulle användas för mord.",
    relationships: {
      allies: [1], // inspektör blackwood - båda analytiska
      rivals: [6], // dr arabella - avundas hennes genuina genialitet
      secrets: [5] // du vet att max har illegala affärer (från din forskning om ekonomisk brottslighet)
    },
    questionGuide: [
      "Fråga Inspektören om spårbevis - jämför metoder",
      "Analysera Dr. Arabellas kemiska kunskap men verka nervös",
      "Undvik att diskutera var Victor kan ha fått tag på giftet"
    ],
    roleplayTips: [
      "Glöm bort folks namn mitt i samtal - 'Förlåt, vad var ditt namn igen?'",
      "Fördjupa dig i brottsdetaljerna på ett opassande sätt",
      "Bli nervös när någon frågar om experimentella gifter",
      "Skydda din anteckningsbok - den innehåller transaktioner"
    ]
  },
  {
    id: 5,
    name: "Maximillian Max Goldstein",
    accessory: "Guldhalsband Dollar",
    role: "Oljemiljardär",
    color: "bg-yellow-500",
    profileImage: "/media/images/profiles/Maximillian.png",
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
    },
    personalGoal: "Se till att dina illegala affärer förblir hemliga och eventuellt köpa upp Lords egendom billigt efter hans död.",
    relationships: {
      allies: [2], // victor von sterling - båda förstår affärsvärlden
      rivals: [3], // lady margaret - hon ser ner på dig som 'nyrik'
      secrets: [7] // du vet att den mystiska främlingen inte är vem de säger sig vara (bakgrundskoll via dina kontakter)
    },
    questionGuide: [
      "Erbjud Victor pengar i utbyte mot hans lojalitet",
      "Provocera Lady Margaret om hennes 'gamla pengar' vs dina 'riktiga pengar'",
      "Försök få Dr. Arabellas uppfinning - den kan vara värd miljoner"
    ],
    roleplayTips: [
      "Svara i telefon mitt i samtal och prata högt om affärer",
      "Nämn alltid priset på saker du äger",
      "Bli aggressiv om någon antyder att du är 'mindre värd' pga din bakgrund",
      "Försök muta dig ur problematiska situationer"
    ]
  },
  {
    id: 6,
    name: "Dr. Arabella Cogsworth",
    accessory: "Steampunk Glasögon",
    role: "Uppfinnarinna",
    color: "bg-orange-600",
    profileImage: "/media/images/profiles/drarabella.png",
    personality: "Excentrisk och snabbpratande.",
    background: "Briljant uppfinnarinna med eget laboratorium i källaren.",
    secret: "DU ÄR MEDHJÄLPARE TILL MÖRDAREN. Du och Victor planerade mordet tillsammans. Victor köpte giftet från Professor Thornbury, ni förgiftade whiskyflaskan tillsammans, och du gav den medvetet till Sebastian. Ni älskar varandra och skyddar nu varandra. Om spelarna röstar ut dig händer inget - de måste rösta ut Victor för att vinna.",
    secretClue: "Har mekaniska verktyg och kemiska flaskor i väskan. Victor verkar ovanligt beskyddande av dig - ni är hemliga älskare och medkonspiratörer. Du gav whiskyflaskan till Sebastian medvetet efter att ni förgiftat den tillsammans.",
    murdererMotive: "Lord stal ritningar och planerade patentera dem själv. Du och Victor planerade mordet tillsammans - ni förgiftade whiskyflaskan och du gav den till Sebastian. Din kärlek till Victor och rädslan för att förlora ditt livsverk drev dig att hjälpa till med mordet.",
    characterCard: {
      quirks: "Reparerar saker mitt i samtal, ser mönster i allt, älskar klockor",
      relationToVictim: "Visade Lord din uppfinning för 2 månader sedan - han stal dina ritningar och hotade patentera dem",
      skills: "Expert på kemi, mekanik och explosive ämnen. Har eget labb i källarvalvet.",
      weakness: "Naiv när det gäller människor - litar för lätt på Victor. Blir nervös när anklagad. Djupt kär i Victor och skulle göra vad som helst för honom."
    },
    personalGoal: "Skydda Victor från anklagelser och se till att ni båda går fria. Peka misstankar mot andra - särskilt Professor Thornbury som sålde giftet. Spelarna måste rösta ut Victor för att vinna - om de röstar ut dig händer inget.",
    relationships: {
      allies: [2], // victor von sterling - din hemliga älskare och partner i brott
      rivals: [4], // professor thornbury - hans teoretiska kunskap vs din praktiska
      secrets: [7] // du vet att den mystiska främlingen har falskt namn
    },
    questionGuide: [
      "Försvara Victor aktivt när han anklagas - ni är partners",
      "Peka subtilt mot Professor Thornbury som källa till giftet",
      "Avleda misstankar från er båda genom att fokusera på andras motiv"
    ],
    roleplayTips: [
      "Plocka med små mekaniska delar när du pratar",
      "Bli plötsligt distraherad av klockor eller maskiner",
      "Samordna diskret med Victor - ni är partners i brott",
      "Var beredd att ta skulden om nödvändigt - du vet att om de röstar ut dig så förlorar de inte"
    ]
  },
  {
    id: 7,
    name: "Den Mystiska Främlingen",
    accessory: "Svart Ögonmask",
    role: "Okänd Identitet",
    color: "bg-black",
    profileImage: "/media/images/profiles/stranger.png",
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
    },
    personalGoal: "Avslöja sanningen om vad som hände din familj och se till att rättvisa skipas - även om det innebär att offra din egen frihet.",
    relationships: {
      allies: [6], // dr arabella - hon är naiv och kan manipuleras till att lita på dig
      rivals: [1], // inspektör blackwood - hans detektivarbete hotar avslöja din identitet
      secrets: [4] // du har sett professorn snoka i lords papper tidigare - vad sökte han?
    },
    questionGuide: [
      "Ifrågasätt Inspektörens teorier - vilseleda från din egen närvaro",
      "Bygg förtroende med Dr. Arabella - hon kan vara din alibi",
      "Observera alla tyst - du vet mer än du låtsas"
    ],
    roleplayTips: [
      "Svara vagt på personliga frågor - 'Det är komplicerat'",
      "Studera alla intensivt - anteckna mentalt deras beteenden",
      "Rör dig tyst och dyk upp oväntat",
      "Låt dina känslor för hämnd glimta till då och då"
    ]
  }
];
