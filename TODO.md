# TODO: Förbättringar för att göra spelet mer likt Hidden Reality

**Datum:** 3 oktober 2025  
**Nuvarande status:** React-baserat mord-mysterium med utmaningar, ledtrådar och röstning  
**Målsättning:** Transformera till Hidden Reality-liknande upplevelse med immersiv storytelling, fysiska rekvisita och seamless rollspel

---

## 🎯 Hidden Reality - Kärnegenskaper

### Vad som definierar Hidden Reality-spel:
1. **Fysisk immersion** - Rekvisita, fysiska dokument, brevkuvert som öppnas vid specifika tidpunkter
2. **Rollspelsdrivet** - Karaktärerna spelar aktivt sina roller, interagerar med varandra
3. **Storytelling i realtid** - Berättelsen utvecklas genom konversation och upptäckter
4. **Minimal skärmtid** - Appen är ett stödverktyg, inte huvudupplevelsen
5. **Dramaturgi och spänningskurva** - Planerade höjdpunkter och avslöjanden
6. **Frihet inom struktur** - Spelare kan röra sig fritt men guideas av appen
7. **Multipla lösningsvägar** - Inte en linjär "rätt svar"-kedja

---

## 📊 Nuvarande Analys - Vad fungerar / Vad behöver förbättras

### ✅ Styrkor i nuvarande implementation:
- Solid teknisk grund (React, komponentiserad arkitektur)
- Red herring-system för misdirection
- Consequence-system för djupare analys (riskbelöning)
- Timer-baserad press
- Dr. Arabella som fastställd mördare
- Svenska språket genomgående
- Tailwind för snabb styling

### ⚠️ Problem jämfört med Hidden Reality:
1. **För skärm-centrerat** - Allt händer i appen, ingen fysisk värld
2. **Linjär progression** - Challenge → Clue → Next Challenge (ingen frihet)
3. **Passiva roller** - Spelare läser bara, interagerar inte med varandra
4. **"Escape room"-logik** - Pussel istället för social deduktion
5. **Ingen dramaturgi** - Ingen akt-struktur eller spännande avslöjanden
6. **Brist på rollspel** - Karaktärerna används bara för röstning i slutet
7. **Saknar fysiska element** - Allt digitalt, ingen taktilitet

---

## 🚀 Prioriterad TODO-lista

---

## **🎭 1. ROLLSPEL & KARAKTÄRSENGAGEMANG (HÖG PRIORITET)**

### 1.1 Karaktärskort med djup ✅ KLART
- [x] **Utöka character cards** med:
  - [x] Personliga mål (vad vill karaktären uppnå ikväll?)
  - [x] Relationer till andra spelare (allierade, rivaler, hemligheter tillsammans)
  - [x] Frågeguide ("Vad skulle din karaktär fråga professorn?")
  - [x] Rollspelstips ("Spela nervös när någon nämner whisky")
- [x] Uppdaterad CharacterCardsModal med visuellt separerade sektioner
- [x] Färgkodade kort för olika kategorier (mål, relationer, frågor, tips)
  
### 1.2 Karaktärsspecifik information ⏸️ PAUSAD
- [ ] Vissa ledtrådar **endast synliga för specifika karaktärer**
  - Ex: Dr. Arabella ser kemisk notation andra inte ser
  - Ex: Detektiven får en privat observation om fingeravtryck
- [ ] Privat UI-sektion: "Din karaktärs hemlighet" + "Vad endast DU vet"
- ⚠️ **Kräver multi-device support - pausad tills vidare**

### 1.3 Social interaktion-mekanik ✅ KLART (Konversationsprompts)
- [x] **Konversationsprompts** som dyker upp:
  - [x] Skapat `conversationPrompts.js` med 16 generella prompts
  - [x] Triggers baserat på: clue unlock, challenge complete, timer, voting, deep analysis
  - [x] Prioritering: critical, high, medium, low
  - [x] Fase-baserade prompts: early, mid, late game
  - [x] ConversationPrompts komponent med färgkodning och auto-dismiss
  - [x] useConversationPrompts hook för intelligent prompt-hantering
  - [x] Integration i MurderMysteryApp med triggers
  - [x] **Omdesignat till generella prompts** - Inga karaktärsspecifika för att undvika avslöjanden i single-device setup
- [ ] **Hemligheter som måste delas/döljas**:
  - [ ] Timer innan hemlighet måste avslöjas för någon
  - [ ] Poäng för att dölja hemlighet längst / för att få någon att erkänna sin

### 1.4 Alliance & Betrayal-system
- [ ] Spelare kan bilda **hemliga allianser** via appen
- [ ] "Lita på"-mekanik där spelare delar ledtrådar privat
- [ ] Poäng för att identifiera mördaren vs. poäng för att skydda sig själv

---

## **📦 2. FYSISKA REKVISITA & VÄRLD (HÖG PRIORITET)**

### 2.1 Fysiska dokument
- [ ] **Generera utskrivningsbara PDF:er**:
  - [ ] Brev från Lord Sebastian (öppnas vid specifik tidpunkt)
  - [ ] Laboratorieanteckningar från Dr. Arabella
  - [ ] Spelinviter med karaktärsinformation
  - [ ] Toxikologirapport med stämplar
  - [ ] Tidningsurklipp om tidigare skandaler
  
### 2.2 Rekvisitalista
- [ ] Generera **shopping-lista** baserad på antal spelare:
  - Träpipa (Challenge 3 - redan implementerad!)
  - Whisky-glas med "gift" (läskflaska med etikett)
  - Anteckningsbok med kodade meddelanden
  - Förseglat kuvert märkt "Öppnas endast om ni fastnat"
  - Polaroid-foto av "brottsplatsen"
  
### 2.3 Rumsinställning guide
  - [ ] Instruktioner för värdspelare: "Hur förbereder man rummet"
  - [ ] Dimljus och musik-rekommendationer
  - [ ] Placering av rekvisita
  - [ ] Klädkod (Victorian-tema)

### 2.4 QR-kod integration
- [ ] Fysiska objekt har **QR-koder** som unlockerar digitalt innehåll
- [ ] Scanna pipa → unlock Challenge 3
- [ ] Scanna brev → hör ljudinspelning från Lord Sebastian

---

## **🎬 3. DRAMATURGISK STRUKTUR (HÖG PRIORITET)**

### 3.1 Akt-baserad struktur istället för challenges
**Akt 1: Introduktion & Misstankar (0-20 min)**
- [ ] Spelare anländer, får karaktärskort
- [ ] Intro-video eller ljudinspelning: "Lord Sebastian är död"
- [ ] Första fria interaktionen: Vem såg vad?
- [ ] Första ledtrådarna rullas ut **automatiskt efter 5 min**

**Akt 2: Undersökning & Konflikter (20-50 min)**
- [ ] Gruppdiskussion guidat av appen
- [ ] "Vem hade motiv?"-timers
- [ ] Red herrings dyker upp när spänningen behöver stiga
- [ ] Mitt-game twist: Ett brev från offret som ändrar allt

**Akt 3: Sammanstrålning & Ackusation (50-70 min)**
- [ ] Alla ledtrådar nu tillgängliga
- [ ] Final countdown: 10 minuter till anklagelse
- [ ] Dramatisk röstningssekvens
- [ ] Avslöjande med konsekvenser

### 3.2 Dynamisk pacing
- [ ] **Adaptive timer** - Om gruppen fastnar, släpp hints automatiskt
- [ ] **Momentum tracking** - Om för länge sedan senaste clue, injicera något nytt
- [ ] **Tension escalation** - Bakgrundsmusik ändras efter akt

---

## **🔓 4. FRIHET & ICKE-LINJÄRITET (MEDEL PRIORITET)**

### 4.1 Avskaffa challenge-kedjan
- [ ] **Alla ledtrådar tillgängliga från start** (men blurrade/låsta)
- [ ] Olika vägar att unlocka:
  - [ ] Svara på en fråga korrekt
  - [ ] Hitta fysiskt objekt
  - [ ] Någon annan spelare ger dig access
  - [ ] Timer löper ut (emergency unlock)

### 4.2 Multipel-lösningsvägar
- [ ] **3 olika deduktionskedjor** som leder till Dr. Arabella:
  - [ ] Kemisk beviskedja (gift → lab → uppfinnare)
  - [ ] Motiv-kedja (brev → patent → ägarskap)
  - [ ] Timeline-kedja (tidsfönster → möjlighet → alibier)
  
### 4.3 Branching narrative
- [ ] Val som påverkar vilka ledtrådar som blir tillgängliga
- [ ] "Vill ni konfrontera professorn nu eller vänta?" → olika outcomes

---

## **📱 5. APP SOM HJÄLPVERKTYG (MEDEL PRIORITET)**

### 5.1 Minimera skärmtid
- [ ] **Notifikationer istället för konstant koll**:
  - [ ] Push-notis: "En ny ledtråd har hittats"
  - [ ] Ljudsignal när något händer
- [ ] Designa UI för **snabba glances** snarare än läsning

### 5.2 Game Master-mode
- [ ] Värd kan **styra flödet** manuellt:
  - [ ] Force unlock en ledtråd om gruppen kör fast
  - [ ] Trigger en red herring för att öka spänning
  - [ ] Pausa/återuppta timer
  - [ ] Se alla spelares status

### 5.3 Voice & Audio
- [ ] **Ljudinspelningar** istället för text:
  - [ ] Lords sista ord (skådespelare läser)
  - [ ] Vittnesförhör från betjänten
  - [ ] Ambient manor-sounds (klocka slår, åska)

---

## **🧩 6. FÖRBÄTTRA CLUE & PUZZLE DESIGN (MEDEL PRIORITET)**

### 6.1 Mindre "Escape room", mer "Detective work"
- [ ] Ta bort Atbash-chiffret (för gamey)
- [ ] Ta bort JavaScript-faktultet (bryter immersion)
- [ ] Ersätt med:
  - [ ] Vittnesförhör som inte stämmer överens
  - [ ] Motstridiga alibier som måste analyseras
  - [ ] Handstil-jämförelse (fysiskt dokument)

### 6.2 Clue combinations
- [ ] Ledtrådar gör **mer sense tillsammans**:
  - [ ] "Whisky + Tidslinje" → Visar vem som hade möjlighet
  - [ ] "Brev + Hyllsektion" → Visar motiv
- [ ] UI för att **dra ihop ledtrådar**: "Koppla dessa två"

### 6.3 Gradvis reveal
- [ ] Ledtrådar har **3 nivåer**:
  - [ ] **Nivå 1** (gratis): Vad du ser (whisky-glas)
  - [ ] **Nivå 2** (krävs dedukion): Vad det betyder (cyanid)
  - [ ] **Nivå 3** (krävs risk): Djupare analys (kräver labkunskap)

---

## **🎨 7. IMMERSION & ATMOSFÄR (MEDEL PRIORITET)**

### 7.1 Visual design upgrade
- [ ] **Sepia-filter** på bilder för period-känsla
- [ ] Handskriven font för brev och anteckningar
- [ ] Parchment-texturer på bakgrunder
- [ ] Vintage UI-komponenter (vax-sigill, stämplar)

### 7.2 Soundscape
- [ ] **Bakgrundsljud** (inte bara musik):
  - [ ] Kamineld som sprakar
  - [ ] Regn mot fönster
  - [ ] Klocka som tickar (synkar med timer)
  - [ ] Avlägsna röster från betjänter
- [ ] **Dramatiska stings** vid viktiga moments

### 7.3 Period-accurate language
- [ ] Översätt moderna termer:
  - [ ] "Challenge" → "Mysterium" eller "Gåta"
  - [ ] "Unlock" → "Avslöja" eller "Uppenbara"
  - [ ] "Hint" → "Vink" eller "Ledtråd"
  
---

## **🏆 8. WIN CONDITIONS & REPLAYABILITY (LÅG PRIORITET)**

### 8.1 Multipla seger-typer
- [ ] **Team Win** - Gruppen identifierar mördaren tillsammans
- [ ] **Solo Win** - En spelare anar först och får bonuspoäng
- [ ] **Murderer Win** - Dr. Arabella övertygar andra att hon är oskyldig
- [ ] **Roleplay Win** - Bästa rollspel (omröstning)

### 8.2 Scoring system
- [ ] Poäng för:
  - [ ] Först att unlocka en ledtråd
  - [ ] Bäst rollspel (player-voted)
  - [ ] Dölja sin hemlighet längst
  - [ ] Identifiera röd sill

### 8.3 Alternative endings
- [ ] Om gruppen anklagar fel person: **Alternative reveal**
  - Dr. Arabella "flyr" och game master avslöjar
  - Eller: Dr. Arabella får en monolog-scen

### 8.4 Replay value
- [ ] **Randomized elements** (men Dr. Arabella alltid mördare):
  - [ ] Olika hemligheter för andra karaktärer
  - [ ] Olika red herrings per spelomgång
  - [ ] Olika ledtrådorder
- [ ] **Multiple cases** - Skapa 2-3 olika mysterier med samma system

---

## **🛠️ 9. TEKNISKA FÖRBÄTTRINGAR (LÅG PRIORITET)**

### 9.1 Multi-device support
- [ ] **QR-kod login** - Varje spelare scannar in sig
- [ ] Synkroniserad state mellan enheter
- [ ] Game Master har en device, spelare har sina egna

### 9.2 Offline-first
- [ ] PWA med service worker
- [ ] Kan spelas utan internet efter initial load

### 9.3 Accessibility
- [ ] Text-to-speech för ledtrådar
- [ ] High contrast mode
- [ ] Font size controls

---

## **📋 10. BUGFIXES & POLISH (LÅG PRIORITET)**

### 10.1 Fixa kända buggar
- [x] Hint suppression inte enforced (från tidigare TODO)
- [x] Submit button disabling inkomplett
- [ ] Pipe red herring phase-gating

### 10.2 UX improvements
- [ ] Loading states för timer
- [ ] Smooth transitions mellan screens
- [ ] Bättre error messages
- [ ] Confirm dialogs för viktiga actions

---

## 📅 Implementationsplan - Rekommenderad ordning

### **Fas 1: Foundation (Vecka 1-2)**
1. Dramaturgisk struktur (Akt 1, 2, 3)
2. Karaktärsutökning (goals, relationships, secrets)
3. Fysiska dokument-generering (PDF:er)

### **Fas 2: Mechanics (Vecka 3-4)**
4. Social interaktion (conversation prompts, alliances)
5. Frihet & icke-linjäritet (unlock-mekaniker)
6. Game Master-mode

### **Fas 3: Polish (Vecka 5-6)**
7. Immersion (sound, visuals, period language)
8. Clue redesign (bort från escape room-logik)
9. Replayability & scoring

### **Fas 4: Testing (Vecka 7)**
10. Playtesting med riktiga spelare
11. Bugfixes
12. Balansering av timing och svårighetsgrad

---

## 🎯 Snabbaste vägen till Hidden Reality-känsla

Om du endast kan göra **3 saker** för maximal impact:

1. **Fysiska rekvisita + PDF-generering** - Ger omedelbar taktilitet
2. **Akt-struktur med dynamisk pacing** - Skapar dramaturgi
3. **Karaktärsmål + social interaktion** - Aktiverar rollspel

---

## 📚 Referensmaterial

- **Hunt a Killer** - Brev-baserad struktur, fysiska bevis
- **Deadbolt Mystery Society** - Akt-struktur, character-driven
- **Detective Society** - QR-integration, object-scanning
- **Foul Play** - Dinner party-stil, roleplaying focus

---

**Nästa steg:** Välj en prioritering (Fas 1-4) och börja implementera!
