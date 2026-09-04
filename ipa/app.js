const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const copy = {
  pl: {
    navAtlas: "Atlas", navMethod: "Metoda", navTest: "Test", eyebrow: "Psychologia sekcji komentarzy",
    heroTitle: "W internecie nie masz jednej osobowości.<br><em>Masz cały panel administracyjny.</em>",
    heroLead: "Poznaj role, które przyjmujemy online — od Weryfikatora po Trolla — i sprawdź, kto najczęściej przejmuje Twoją klawiaturę.",
    shortTest: "Szybki test", shortMeta: "10 pytań · ~2 min", longTest: "Pełny profil", longMeta: "30 pytań · ~6 min",
    notDiagnosis: "To narzędzie edukacyjne, nie diagnoza psychologiczna. Internet i tak już ma wystarczająco wielu samozwańczych terapeutów.",
    roles: "ról", catalogKicker: "Atlas zachowań", catalogTitle: "Obsada internetu",
    catalogLead: "Nie są to sztywne osobowości. To role, które zmieniają się wraz z tematem, emocją, grupą i liczbą lajków.",
    search: "Szukaj typu lub zachowania…", all: "Wszystkie", shown: "Wyświetlono {n} typów",
    methodKicker: "Co mierzymy", methodTitle: "Zachowanie, nie duszę",
    methodLead: "Jedna osoba może rano prostować fakty, po południu bronić swojej grupy, a wieczorem zostać kolekcjonerem ostatniego słowa. Kontekst robi połowę roboty, algorytm dorzuca resztę.",
    formulaA: "człowiek", formulaB: "emocja", formulaC: "grupa", formulaD: "platforma", formulaE: "rola online", methodPoint1:"Skala 1–5 zamiast odpowiedzi „tak/nie”", methodPoint2:"Każda odpowiedź waży kilka powiązanych ról", methodPoint3:"Top 5 jest normalizowane do czytelnych 100%",
    footer: "Stworzone dla ludzi, którzy kiedyś chcieli napisać „tylko jeden komentarz”.",
    testKicker:"Twój profil", testCtaTitle:"Kto dziś pisze z Twojej klawiatury?", testCtaLead:"Odpowiedz intuicyjnie. Wynik pokaże pięć dominujących ról i ich udział w Twoim aktualnym stylu zachowania online.",
    quickLabel:"Szybki skan", quickDesc:"Dobry, gdy kawa stygnie.", fullLabel:"Pełny profil", fullDesc:"Więcej pytań, mniej zgadywania.",
    researchKicker:"Podstawa badawcza", researchTitle:"Z nauką, bez białego fartucha", researchLead:"Atlas łączy badane role uczestników, motywacje komentowania, efekt rozhamowania online, moralne oburzenie i zachowania trollingowe. Sam test jest narzędziem edukacyjnym, a nie walidowaną skalą kliniczną.",
    answerHint:"Na ile to do Ciebie pasuje?", previous:"Wstecz", next:"Dalej", resultKicker:"Twój wynik", resultTitle:"Pięć ról przy konsoli", shareLabel:"udział profilu",
    howRead:"Jak czytać wynik?", howReadText:"Procenty pokazują udział w Twojej piątce, nie kliniczne prawdopodobieństwo. Role mogą zmieniać się zależnie od platformy, tematu i nastroju.",
    retake:"Powtórz test", retakeMeta:"Internet mógł Cię już zmienić", backAtlas:"Wróć do atlasu", backMeta:"Poznaj całą obsadę",
    modeShort:"Szybki test · 10 pytań", modeLong:"Pełny profil · 30 pytań", question:"Pytanie {n} z {total}", resultShort:"Szybki skan wskazuje, które role były najbardziej aktywne w Twoich odpowiedziach.", resultLong:"Pełny profil wykorzystuje więcej sygnałów, więc rozkład ról jest stabilniejszy.",
    stronglyNo:"Zdecydowanie nie", ratherNo:"Raczej nie", neutral:"To zależy", ratherYes:"Raczej tak", stronglyYes:"Zdecydowanie tak",
    install:"Zainstaluj", offline:"Tryb offline — atlas i test nadal działają.", online:"Połączenie wróciło.", dogLine:"Spokojnie. Tu nie ma złych odpowiedzi — są tylko bardzo internetowe.", dogAlt:"Spokojny pies-pomocnik przy laptopie"
  },
  en: {
    navAtlas: "Atlas", navMethod: "Method", navTest: "Test", eyebrow: "Psychology of the comment section",
    heroTitle: "You don't have one personality online.<br><em>You have an entire admin panel.</em>",
    heroLead: "Meet the roles we play online — from Fact-Checker to Troll — and find out who most often takes over your keyboard.",
    shortTest: "Quick test", shortMeta: "10 questions · ~2 min", longTest: "Full profile", longMeta: "30 questions · ~6 min",
    notDiagnosis: "An educational tool, not a psychological diagnosis. The internet already has enough self-appointed therapists.",
    roles: "roles", catalogKicker: "Behaviour atlas", catalogTitle: "The internet cast",
    catalogLead: "These are not fixed personalities. They are roles that change with topic, emotion, group identity and the number of likes.",
    search: "Search a role or behaviour…", all: "All", shown: "Showing {n} roles",
    methodKicker: "What we measure", methodTitle: "Behaviour, not your soul",
    methodLead: "One person can correct facts in the morning, defend their tribe in the afternoon, and collect the last word at night. Context does half the work; the algorithm adds the rest.",
    formulaA: "person", formulaB: "emotion", formulaC: "group", formulaD: "platform", formulaE: "online role", methodPoint1:"A 1–5 scale instead of yes/no", methodPoint2:"Each answer weighs several related roles", methodPoint3:"The Top 5 is normalised to a clear 100%",
    footer: "Made for people who once intended to write ‘just one comment’.",
    testKicker:"Your profile", testCtaTitle:"Who is typing from your keyboard today?", testCtaLead:"Answer intuitively. The result shows five dominant roles and their share in your current online behaviour.",
    quickLabel:"Quick scan", quickDesc:"Good while the coffee cools.", fullLabel:"Full profile", fullDesc:"More questions, less guessing.",
    researchKicker:"Research basis", researchTitle:"Science, minus the white coat", researchLead:"The atlas combines participant roles, commenting motives, online disinhibition, moral outrage and trolling research. The test itself is educational, not a validated clinical scale.",
    answerHint:"How well does this describe you?", previous:"Back", next:"Next", resultKicker:"Your result", resultTitle:"Five roles at the console", shareLabel:"profile share",
    howRead:"How to read it", howReadText:"Percentages show the share within your Top 5, not clinical probability. Roles may change with platform, subject and mood.",
    retake:"Retake test", retakeMeta:"The internet may have changed you", backAtlas:"Back to the atlas", backMeta:"Meet the whole cast",
    modeShort:"Quick test · 10 questions", modeLong:"Full profile · 30 questions", question:"Question {n} of {total}", resultShort:"The quick scan highlights which roles were most active in your answers.", resultLong:"The full profile uses more signals, making the role distribution more stable.",
    stronglyNo:"Definitely not", ratherNo:"Rather not", neutral:"It depends", ratherYes:"Rather yes", stronglyYes:"Definitely yes",
    install:"Install", offline:"Offline mode — the atlas and test still work.", online:"Connection restored.", dogLine:"Relax. There are no wrong answers here — only very online ones.", dogAlt:"Calm dog helper beside a laptop"
  },
  de: {
    navAtlas: "Atlas", navMethod: "Methode", navTest: "Test", eyebrow: "Psychologie der Kommentarspalte",
    heroTitle: "Online hast du nicht nur eine Persönlichkeit.<br><em>Du hast ein ganzes Admin-Panel.</em>",
    heroLead: "Entdecke die Rollen, die wir online spielen — vom Faktenprüfer bis zum Troll — und finde heraus, wer am häufigsten deine Tastatur übernimmt.",
    shortTest: "Schnelltest", shortMeta: "10 Fragen · ~2 Min.", longTest: "Vollständiges Profil", longMeta: "30 Fragen · ~6 Min.",
    notDiagnosis: "Ein Bildungswerkzeug, keine psychologische Diagnose. Das Internet hat bereits genug selbsternannte Therapeuten.",
    roles: "Rollen", catalogKicker: "Verhaltensatlas", catalogTitle: "Die Besetzung des Internets",
    catalogLead: "Das sind keine starren Persönlichkeiten. Die Rollen ändern sich mit Thema, Emotion, Gruppe und Anzahl der Likes.",
    search: "Rolle oder Verhalten suchen…", all: "Alle", shown: "{n} Rollen angezeigt",
    methodKicker: "Was wir messen", methodTitle: "Verhalten, nicht die Seele",
    methodLead: "Eine Person kann morgens Fakten korrigieren, nachmittags ihre Gruppe verteidigen und abends das letzte Wort sammeln. Der Kontext erledigt die Hälfte, der Algorithmus den Rest.",
    formulaA: "Mensch", formulaB: "Emotion", formulaC: "Gruppe", formulaD: "Plattform", formulaE: "Online-Rolle", methodPoint1:"Eine Skala von 1–5 statt Ja/Nein", methodPoint2:"Jede Antwort gewichtet mehrere verwandte Rollen", methodPoint3:"Die Top 5 werden auf klare 100 % normalisiert",
    footer: "Für Menschen, die einmal nur ‚einen einzigen Kommentar‘ schreiben wollten.",
    testKicker:"Dein Profil", testCtaTitle:"Wer tippt heute auf deiner Tastatur?", testCtaLead:"Antworte intuitiv. Das Ergebnis zeigt fünf dominante Rollen und ihren Anteil an deinem aktuellen Online-Verhalten.",
    quickLabel:"Schnellscan", quickDesc:"Gut, solange der Kaffee abkühlt.", fullLabel:"Vollständiges Profil", fullDesc:"Mehr Fragen, weniger Raten.",
    researchKicker:"Forschungsbasis", researchTitle:"Wissenschaft ohne weißen Kittel", researchLead:"Der Atlas verbindet Teilnehmerrollen, Kommentarmotive, Online-Enthemmung, moralische Empörung und Trolling-Forschung. Der Test ist ein Bildungswerkzeug, keine validierte klinische Skala.",
    answerHint:"Wie gut passt das zu dir?", previous:"Zurück", next:"Weiter", resultKicker:"Dein Ergebnis", resultTitle:"Fünf Rollen an der Konsole", shareLabel:"Profilanteil",
    howRead:"So liest du das", howReadText:"Die Prozente zeigen den Anteil innerhalb deiner Top 5, keine klinische Wahrscheinlichkeit. Rollen können sich je nach Plattform, Thema und Stimmung ändern.",
    retake:"Test wiederholen", retakeMeta:"Das Internet könnte dich verändert haben", backAtlas:"Zurück zum Atlas", backMeta:"Die ganze Besetzung kennenlernen",
    modeShort:"Schnelltest · 10 Fragen", modeLong:"Vollständiges Profil · 30 Fragen", question:"Frage {n} von {total}", resultShort:"Der Schnellscan zeigt, welche Rollen in deinen Antworten am aktivsten waren.", resultLong:"Das vollständige Profil nutzt mehr Signale, daher ist die Rollenverteilung stabiler.",
    stronglyNo:"Überhaupt nicht", ratherNo:"Eher nicht", neutral:"Kommt darauf an", ratherYes:"Eher ja", stronglyYes:"Auf jeden Fall",
    install:"Installieren", offline:"Offline-Modus — Atlas und Test funktionieren weiter.", online:"Verbindung wiederhergestellt.", dogLine:"Ganz ruhig. Hier gibt es keine falschen Antworten – nur sehr internetige.", dogAlt:"Ruhiger Hundehelfer neben einem Laptop"
  }
};

const categories = [
  ["knowledge", "Wiedza", "Knowledge", "Wissen"], ["morality", "Moralność", "Morality", "Moral"],
  ["tribe", "Tożsamość", "Identity", "Identität"], ["conflict", "Konflikt", "Conflict", "Konflikt"],
  ["emotion", "Emocje", "Emotion", "Emotion"], ["status", "Status", "Status", "Status"],
  ["audience", "Widownia", "Audience", "Publikum"], ["prosocial", "Pomoc", "Helpful", "Hilfreich"]
];

const roles = [
  ["factChecker","knowledge","a0","🔎","Weryfikator","Fact-Checker","Faktenprüfer","Sprawdza twierdzenie, źródło i kontekst — także wtedy, gdy wynik mu się nie podoba.","Checks claims, sources and context — even when the answer is inconvenient.","Prüft Behauptung, Quelle und Kontext – auch wenn das Ergebnis unbequem ist."],
  ["critic","knowledge","a1","✏️","Krytyk","Critic","Kritiker","Szuka wad, luk i miejsc, w których dobry pomysł spotkał przeciętne wykonanie.","Looks for flaws, gaps and the point where a good idea met average execution.","Sucht Schwächen, Lücken und den Punkt, an dem eine gute Idee mittelmäßig umgesetzt wurde."],
  ["frustrate","emotion","a2","🤬","Frustrat","Frustrated Commenter","Frustrierter Kommentator","Temat jest tylko zaworem bezpieczeństwa dla emocji z zupełnie innego miejsca.","The topic is merely a pressure valve for emotions imported from somewhere else.","Das Thema ist nur ein Ventil für Gefühle, die ganz woanders entstanden sind."],
  ["moralGuardian","morality","a3","⚖️","Obrońca moralności","Moral Guardian","Moralwächter","Sprawdza nie tylko, czy masz rację, ale czy w ogóle wolno Ci tak myśleć.","Checks not only whether you are right, but whether you are allowed to think that way.","Prüft nicht nur, ob du recht hast, sondern ob du so überhaupt denken darfst."],
  ["troll","conflict","a4","🧌","Troll","Troll","Troll","Nie sprzedaje poglądu. Jego produktem jest reakcja innych ludzi.","Doesn't sell an opinion. Other people's reaction is the product.","Verkauft keine Meinung. Die Reaktion anderer Menschen ist das Produkt."],
  ["mediator","conflict","a5","🕊️","Mediator","Mediator","Vermittler","Próbuje odkryć, że strony kłócą się o dwie różne rzeczy i obie mówią CAPS LOCKIEM.","Tries to reveal that both sides argue about different things in the same CAPS LOCK.","Versucht zu zeigen, dass beide Seiten über Verschiedenes streiten – im selben CAPS LOCK."],
  ["tribalDefender","tribe","a6","🛡️","Obrońca plemienia","Tribal Defender","Stammesverteidiger","Dla swoich zawsze znajduje dodatkowy kontekst, dla obcych — dodatkowy zarzut.","Always finds extra context for the in-group and an extra accusation for outsiders.","Findet für die eigene Gruppe immer mehr Kontext, für Fremde einen weiteren Vorwurf."],
  ["pseudoExpert","knowledge","a7","🎓","Pseudoekspert","Pseudo-Expert","Pseudoexperte","Pewność siebie ma odwrotnie proporcjonalną do liczby przeczytanych stron.","Confidence rises in inverse proportion to the number of pages read.","Sein Selbstvertrauen steigt umgekehrt proportional zu den gelesenen Seiten."],
  ["lurker","audience","a8","👀","Lurker","Lurker","Lurker","Czyta wszystko, pamięta więcej niż uczestnicy i prawie nigdy nie zostawia śladów.","Reads everything, remembers more than the participants and leaves almost no trace.","Liest alles, erinnert sich an mehr als die Beteiligten und hinterlässt fast keine Spur."],
  ["sealion","conflict","b0","❔","Sealion","Sealion","Sealion","Z nieskończoną uprzejmością prosi o jeszcze jeden dowód. I jeszcze jeden.","With endless politeness, asks for one more piece of evidence. And one more.","Bittet mit endloser Höflichkeit um noch einen Beleg. Und noch einen."],
  ["doomposter","emotion","b1","🌩️","Doomposter","Doomposter","Doomposter","Z pojedynczego zdarzenia potrafi przygotować kompletny harmonogram upadku cywilizacji.","Turns one event into a complete timeline for the collapse of civilisation.","Macht aus einem Ereignis einen vollständigen Zeitplan für den Untergang der Zivilisation."],
  ["whataboutist","conflict","b2","↔️","Whataboutysta","Whataboutist","Whataboutist","Nie odpowiada na zarzut. Otwiera drugi zarzut w nowej karcie.","Doesn't answer the accusation. Opens another accusation in a new tab.","Beantwortet den Vorwurf nicht. Öffnet einen anderen Vorwurf in einem neuen Tab."],
  ["memeMaker","audience","b3","✂️","Memiarz","Meme Maker","Meme-Macher","Redukuje wielowątkowy konflikt do obrazka, który i tak zapamiętają wszyscy.","Compresses a complex conflict into the one image everyone will remember.","Komprimiert einen komplexen Konflikt zu dem einen Bild, das alle behalten."],
  ["sourceSniper","knowledge","b4","🎯","Źródłowy snajper","Source Sniper","Quellen-Scharfschütze","Nie obala argumentu; strzela do logo strony, na której został opublikowany.","Doesn't refute the argument; shoots at the logo of the site that published it.","Widerlegt nicht das Argument, sondern schießt auf das Logo der veröffentlichenden Seite."],
  ["tonePolice","morality","b5","📣","Policjant tonu","Tone Police","Tonpolizei","Ignoruje treść, bo została wypowiedziana o trzy decybele za ostro.","Ignores the substance because it arrived three decibels too loudly.","Ignoriert den Inhalt, weil er drei Dezibel zu scharf formuliert wurde."],
  ["cloutChaser","audience","b6","⭐","Łowca zasięgów","Clout Chaser","Reichweitenjäger","Najlepsze opinie przypominają mu się zawsze pod cudzym dużym kontem.","His best opinions always occur beneath someone else's large account.","Seine besten Meinungen fallen ihm stets unter einem fremden großen Account ein."],
  ["archivist","knowledge","b7","🗂️","Archiwista win","Guilt Archivist","Schuldarchivar","Przechowuje stare wypowiedzi na dzień, w którym historia będzie potrzebowała prokuratora.","Stores old posts for the day history needs a prosecutor.","Bewahrt alte Beiträge für den Tag auf, an dem die Geschichte einen Staatsanwalt braucht."],
  ["lastWord","conflict","b8","🏆","Kolekcjoner ostatniego słowa","Last-Word Collector","Sammler des letzten Wortes","Dyskutuje tak długo, aż ciszę przeciwnika będzie można ogłosić zwycięstwem.","Keeps replying until the opponent's silence can be announced as victory.","Antwortet so lange, bis das Schweigen des Gegners als Sieg verkündet werden kann."]
].map(([id,cat,visual,emoji,pl,en,de,dpl,den,dde]) => ({id,cat,visual,emoji,name:{pl,en,de},desc:{pl:dpl,en:den,de:dde}}));

const R = (id, cat, emoji, pl, en, de, dpl, den, dde) => ({ id, cat, emoji, name:{pl,en,de}, desc:{pl:dpl,en:den,de:dde} });

roles.push(
  R("commentator","knowledge","💬","Komentator","Commenter","Kommentator","Dodaje opinię, bo puste pole komentarza wyglądało jak zaproszenie.","Adds an opinion because the empty comment box looked like an invitation.","Fügt eine Meinung hinzu, weil das leere Kommentarfeld wie eine Einladung aussah."),
  R("realExpert","knowledge","🧠","Ekspert rzeczywisty","Actual Expert","Echter Experte","Zna temat, więc używa słów „to zależy” częściej niż wykrzykników.","Knows the subject, so uses ‘it depends’ more often than exclamation marks.","Kennt das Thema und sagt deshalb öfter „es kommt darauf an“ als Ausrufezeichen zu setzen."),
  R("sourcePerson","knowledge","📚","Źródłowiec","Source Hunter","Quellenjäger","Prosi o źródło, otwiera je i popełnia internetową ekstrawagancję: czyta.","Asks for a source, opens it and commits an online extravagance: reading it.","Fragt nach einer Quelle, öffnet sie und begeht eine Online-Extravaganz: Er liest sie."),
  R("headlineExpert","knowledge","📰","Nagłówkowy ekspert","Headline Expert","Schlagzeilenexperte","Kończy analizę tam, gdzie inni zaczynają artykuł.","Finishes the analysis exactly where other people start the article.","Beendet die Analyse genau dort, wo andere mit dem Artikel beginnen."),
  R("literalist","knowledge","🔤","Literalista","Literalist","Odnajduje jedno niedokładne słowo i bierze je jako zakładnika całej rozmowy.","Finds one imprecise word and takes the whole conversation hostage with it.","Findet ein ungenaues Wort und nimmt damit das ganze Gespräch als Geisel."),
  R("nuanceMaker","knowledge","🧩","Niuansator","Nuance Collector","Nuancensammler","Do prostego zdania dodaje siedem wyjątków, trzy przypisy i małe „ale”.","Adds seven exceptions, three footnotes and a modest ‘but’ to a simple sentence.","Ergänzt einen einfachen Satz um sieben Ausnahmen, drei Fußnoten und ein kleines „aber“."),
  R("pseudoSkeptic","knowledge","🧐","Pseudosceptyk","Pseudo-Sceptic","Żąda laboratoryjnych dowodów od obcych i intuicji od swoich.","Demands laboratory evidence from opponents and accepts intuition from allies.","Verlangt von Gegnern Laborbeweise und akzeptiert bei Verbündeten Intuition."),
  R("goalpostMover","knowledge","🥅","Przesuwacz bramki","Goalpost Mover","Torpfostenverschieber","Każdy dostarczony dowód odblokowuje nowy, droższy poziom dowodu.","Every supplied proof unlocks a new, more expensive level of proof.","Jeder gelieferte Beleg schaltet eine neue, teurere Belegstufe frei."),
  R("exceptionCollector","knowledge","🦄","Kolekcjoner wyjątków","Exception Collector","Ausnahmensammler","Jednym szwagrem próbuje pokonać statystykę całej populacji.","Attempts to defeat population statistics with one brother-in-law.","Versucht, die Statistik einer ganzen Bevölkerung mit einem Schwager zu besiegen."),
  R("anecdotalist","knowledge","🗣️","Anegdotysta","Anecdotalist","Badania badaniami, ale zna kogoś, komu wydarzyło się odwrotnie.","Research is research, but knows someone for whom the opposite happened.","Studien hin oder her – er kennt jemanden, bei dem das Gegenteil passiert ist."),
  R("conspiracyArchitect","knowledge","🕸️","Architekt spisku","Conspiracy Architect","Brak dowodów jest dla niego dowodem profesjonalizmu ludzi ukrywających dowody.","Absence of evidence proves how professional the evidence-hiders are.","Fehlende Beweise zeigen ihm, wie professionell die Beweisverstecker arbeiten."),
  R("confidenceGenerator","knowledge","📢","Generator pewności","Confidence Generator","Im mniej wie, tym mniej rzeczy może skomplikować jego stanowczość.","The less he knows, the fewer facts can complicate his certainty.","Je weniger er weiß, desto weniger Fakten können seine Gewissheit komplizieren."),
  R("contextCorrector","knowledge","🧭","Kontekściarz","Contextualizer","Przypomina, że prawdziwy fragment nadal może tworzyć fałszywy obraz.","Reminds everyone that a true fragment can still create a false picture.","Erinnert daran, dass ein wahrer Ausschnitt trotzdem ein falsches Bild erzeugen kann."),
  R("definitionGuardian","knowledge","📖","Strażnik definicji","Definition Guardian","Definitionswächter","Dyskusję o świecie zamienia w negocjacje dotyczące jednego słowa.","Turns a discussion about the world into negotiations over one word.","Verwandelt eine Debatte über die Welt in Verhandlungen über ein einziges Wort."),
  R("languageGuardian","knowledge","📝","Strażnik języka","Language Guardian","Sprachwächter","Poprawia przecinek z energią, której zabrakło mu na odpowiedź do argumentu.","Corrects a comma with the energy unavailable for answering the argument.","Korrigiert ein Komma mit der Energie, die für eine Antwort auf das Argument fehlte."),
  R("prosecutor","morality","🔨","Prokurator","Prosecutor","Staatsanwalt","Nie interpretuje błędu — rekonstruuje akt oskarżenia i prawdopodobny motyw.","Doesn't interpret a mistake; reconstructs the indictment and likely motive.","Deutet keinen Fehler, sondern rekonstruiert Anklage und wahrscheinliches Motiv."),
  R("judge","morality","👨‍⚖️","Sędzia","Judge","Richter","Wydaje ostateczny wyrok po zapoznaniu się z nagłówkiem i trzema komentarzami.","Issues a final verdict after reading the headline and three comments.","Fällt ein endgültiges Urteil nach Schlagzeile und drei Kommentaren."),
  R("moralGrandstander","morality","🏛️","Moralny grandstander","Moral Grandstander","Moralischer Selbstdarsteller","Używa słusznej sprawy jako podestu, na którym najlepiej widać jego słuszność.","Uses a worthy cause as a platform displaying his own virtue.","Nutzt eine gute Sache als Podest, auf dem die eigene Tugend am besten sichtbar ist."),
  R("virtueSignaler","morality","😇","Sygnalista cnoty","Virtue Signaler","Tugendsignalisierer","Najważniejszą informacją jest to, że on znajduje się po dobrej stronie.","The key information is that he is standing on the correct side.","Die wichtigste Information lautet, dass er auf der richtigen Seite steht."),
  R("purityTester","morality","🧪","Tester czystości","Purity Tester","Reinheitsprüfer","Sprawdza, czy sojusznicy są wystarczająco idealni, by nadal być sojusznikami.","Tests whether allies are perfect enough to remain allies.","Prüft, ob Verbündete perfekt genug sind, um Verbündete zu bleiben."),
  R("hereticHunter","morality","🔥","Łowca heretyków","Heretic Hunter","Ketzerjäger","Najostrzej ściga ludzi, którzy zgadzają się z nim tylko w dziewięćdziesięciu procentach.","Reserves the sharpest attacks for people who agree only ninety percent.","Verfolgt am schärfsten Menschen, die nur zu neunzig Prozent zustimmen."),
  R("grievanceAccountant","morality","🧾","Księgowy krzywd","Grievance Accountant","Kränkungsbuchhalter","Prowadzi społeczną księgowość, w której żadna krzywda nie ulega przedawnieniu.","Keeps social accounts in which no grievance ever expires.","Führt eine soziale Buchhaltung, in der kein Unrecht jemals verjährt."),
  R("concernedDefender","morality","🤔","Zaniepokojony obrońca","Concerned Defender","Besorgter Verteidiger","Zaczyna od „popieram was”, a potem szczegółowo wyjaśnia, dlaczego jednak nie teraz.","Starts with ‘I support you’ and then explains why not now.","Beginnt mit „Ich unterstütze euch“ und erklärt dann, warum gerade jetzt doch nicht."),
  R("apologyProducer","morality","🙏","Producent przeprosin","Apology Producer","Entschuldigungsproduzent","Nie chce zmiany zachowania, dopóki nie zobaczy odpowiednio ceremonialnego upokorzenia.","Behavioural change is insufficient without suitably ceremonial humiliation.","Verhaltensänderung reicht nicht ohne angemessen zeremonielle Demütigung."),
  R("proportionalityGuardian","morality","⚖️","Strażnik proporcji","Proportionality Guardian","Wächter der Verhältnismäßigkeit","Broni nie czynu, lecz prawa do kary mniejszej niż internetowa egzekucja.","Defends not the act, but the right to a penalty smaller than an online execution.","Verteidigt nicht die Tat, sondern das Recht auf weniger als eine Online-Hinrichtung."),
  R("advocate","tribe","🧑‍💼","Adwokat","Advocate","Anwalt","Dla ulubionego autora zawsze znajduje brakujący kontekst i łagodzącą okoliczność.","Always finds missing context and mitigating circumstances for a favourite author.","Findet für den Lieblingsautor immer Kontext und mildernde Umstände."),
  R("teamAdvocate","tribe","📣","Adwokat własnej drużyny","Team Advocate","Teamanwalt","Ten sam czyn ma inną nazwę zależnie od koloru koszulki.","The same act receives a different name depending on the jersey colour.","Dieselbe Handlung bekommt je nach Trikotfarbe einen anderen Namen."),
  R("politicalFan","tribe","🏟️","Kibic polityczny","Political Fan","Politischer Fan","Liczy wygrane swojej strony, choć wynik meczu płacą wszyscy.","Counts victories for his side although everyone pays the final score.","Zählt Siege der eigenen Seite, obwohl alle für das Ergebnis zahlen."),
  R("gatekeeper","tribe","🚧","Gatekeeper","Gatekeeper","Gatekeeper","Pilnuje wejścia do grupy, której nikt formalnie nie powierzył mu chronić.","Guards the entrance to a group that never formally hired him.","Bewacht den Eingang einer Gruppe, die ihn nie offiziell beauftragt hat."),
  R("convert","tribe","🔄","Konwertyta","Convert","Konvertit","Po zmianie strony nadrabia staż dodatkową gorliwością.","Compensates for short tenure on the new side with extra zeal.","Gleicht die kurze Zugehörigkeit zur neuen Seite mit zusätzlichem Eifer aus."),
  R("tribeTraitor","tribe","🚪","Zdrajca plemienia","Tribe Traitor","Stammesverräter","Krytyka byłego swojego boli grupę bardziej niż atak stałego przeciwnika.","Criticism from a former insider hurts more than an enemy's attack.","Kritik eines früheren Insiders schmerzt mehr als der Angriff eines Gegners."),
  R("automaticSymmetrist","tribe","🪞","Symetrysta automatyczny","Automatic Both-Sider","Automatischer Symmetrist","Musi odnaleźć identyczną winę obu stron, nawet gdy matematyka protestuje.","Must find equal blame on both sides, even when mathematics objects.","Muss auf beiden Seiten gleiche Schuld finden, selbst wenn die Mathematik widerspricht."),
  R("groupMindReader","tribe","🔮","Tłumacz intencji grupowych","Group Mind Reader","Gruppen-Gedankenleser","Wie, czego „oni wszyscy” naprawdę chcą, bez męczącego pytania kogokolwiek.","Knows what ‘all of them’ truly want without the tiresome business of asking.","Weiß, was „sie alle“ wirklich wollen, ohne mühsam jemanden zu fragen."),
  R("identitySoldier","tribe","🪖","Wojownik tożsamości","Identity Soldier","Identitätskämpfer","Argument ocenia po mundurze autora, zanim przyjrzy się jego treści.","Judges an argument by the author's uniform before inspecting its content.","Beurteilt ein Argument nach der Uniform des Autors, bevor er den Inhalt prüft."),
  R("personalOffended","tribe","😤","Osobiście dotknięty","Personally Offended","Persönlich Betroffener","Ogólną uwagę tłumaczy na osobisty atak z niezwykłą szybkością.","Translates a general observation into a personal attack with remarkable speed.","Übersetzt eine allgemeine Bemerkung erstaunlich schnell in einen persönlichen Angriff."),
  R("provocateur","conflict","🧨","Prowokator","Provocateur","Provokateur","Wrzuca iskrę i z bezpiecznej odległości ocenia jakość pożaru.","Throws a spark and evaluates the fire from a safe distance.","Wirft einen Funken und bewertet das Feuer aus sicherer Entfernung."),
  R("contrarian","conflict","↩️","Kontrarianin","Contrarian","Kontrarianer","Gdy większość skręca w prawo, on odkrywa głęboką potrzebę skrętu w lewo.","When the crowd turns right, discovers a profound need to turn left.","Wenn die Mehrheit rechts abbiegt, entdeckt er ein tiefes Bedürfnis nach links."),
  R("strawmanBuilder","conflict","🌾","Budowniczy chochołów","Strawman Builder","Strohmannbauer","Przerabia cudzy argument na tańszy model, który łatwiej przewrócić.","Rebuilds another argument as a cheaper model that is easier to knock down.","Baut ein fremdes Argument als billigere Version nach, die leichter umfällt."),
  R("gishGalloper","conflict","🐎","Gish galloper","Gish Galloper","Gish-Galoppierer","Wrzuca piętnaście argumentów w czasie potrzebnym na sprawdzenie jednego.","Launches fifteen claims in the time required to verify one.","Wirft fünfzehn Behauptungen in der Zeit ein, die man zur Prüfung einer braucht."),
  R("derailer","conflict","🛤️","Derailler","Derailer","Ablenker","Gdy temat staje się niewygodny, odkrywa temat znacznie pilniejszy.","Discovers a much more urgent subject whenever the current one becomes awkward.","Entdeckt ein viel dringenderes Thema, sobald das aktuelle unangenehm wird."),
  R("wordCatcher","conflict","🪤","Łapacz słówek","Word Catcher","Wortfänger","Zastępuje rozmowę o problemie procesem sądowym jednego sformułowania.","Replaces discussion of the problem with a trial over one phrase.","Ersetzt die Problemdiskussion durch einen Prozess über eine Formulierung."),
  R("baiter","conflict","🎣","Baiter","Baiter","Köderwerfer","Publikuje dokładnie to, co najbardziej zirytuje najwięcej osób.","Posts precisely what will irritate the largest number of people.","Postet genau das, was möglichst viele Menschen maximal reizt."),
  R("dogpiler","conflict","🐕","Dogpiler","Dogpiler","Mitläufer im Angriff","Dołącza do ataku, gdy społeczny dział jakości zatwierdził już cel.","Joins an attack once the social quality department has approved the target.","Schließt sich dem Angriff an, sobald die soziale Qualitätskontrolle das Ziel freigegeben hat."),
  R("brigadier","conflict","📯","Brygadzista","Brigadier","Brigadist","Sprowadza własną publiczność, by spontaniczna dyskusja stała się bardziej spontaniczna.","Brings an audience so the spontaneous discussion can become more spontaneous.","Bringt sein Publikum mit, damit die spontane Diskussion noch spontaner wird."),
  R("atmosphereDestroyer","conflict","☣️","Niszczyciel atmosfery","Atmosphere Wrecker","Stimmungskiller","Nie potrzebuje racji; wystarczy, że po jego wejściu nikt nie chce już rozmawiać.","Needs no argument if nobody wants to continue after his arrival.","Braucht kein Argument, wenn nach seinem Eintreffen niemand mehr reden will."),
  R("sportDebater","conflict","🥊","Debater sportowy","Competitive Debater","Debattensportler","Nie zmienia poglądów, bo celem meczu nie jest aktualizacja zawodnika.","Doesn't change views because updating the player isn't the goal of the match.","Ändert keine Meinung, denn die Aktualisierung des Spielers ist nicht Ziel des Spiels."),
  R("devilAdvocate","conflict","😈","Adwokat diabła","Devil's Advocate","Advokat des Teufels","Broni każdej tezy tylko dla dyskusji, zwykle cudzym kosztem.","Defends every claim merely for discussion, usually at someone else's expense.","Verteidigt jede These nur der Debatte wegen, meist auf Kosten anderer."),
  R("aggressor","conflict","👊","Agresor","Aggressor","Angreifer","Atakuje osobę, gdy argument okazuje się mniej dostępny.","Attacks the person when the argument proves less accessible.","Greift die Person an, wenn das Argument weniger zugänglich ist."),
  R("bullyAssistant","conflict","👏","Pomocnik agresora","Aggressor's Assistant","Helfer des Angreifers","Dostarcza agresorowi dodatkowe argumenty, publiczność i przekąski.","Supplies the aggressor with extra arguments, audience and snacks.","Versorgt den Angreifer mit weiteren Argumenten, Publikum und Snacks."),
  R("nostalgic","emotion","📻","Nostalgik","Nostalgic","Nostalgiker","Każdą teraźniejszość porównuje z przeszłością, którą pamięta po retuszu.","Compares every present with a past remembered after retouching.","Vergleicht jede Gegenwart mit einer retuschiert erinnerten Vergangenheit."),
  R("catastrophist","emotion","☄️","Katastrofista","Catastrophist","Katastrophist","Jeden błąd jest dla niego wersją demonstracyjną końca systemu.","Treats one mistake as the demo version of systemic collapse.","Sieht einen Fehler als Demoversion des Systemzusammenbruchs."),
  R("grievanceCollector","emotion","🧺","Kolekcjoner uraz","Grievance Collector","Kränkungssammler","Każdy nowy temat potrafi połączyć z krzywdą zapisaną trzy lata temu.","Links every new subject to a grievance saved three years ago.","Verknüpft jedes neue Thema mit einer vor drei Jahren gespeicherten Kränkung."),
  R("projector","emotion","📽️","Projektor","Projector","Projektor","Przypisuje autorowi emocje, które akurat sam wniósł do rozmowy.","Assigns the author the emotions he personally brought into the discussion.","Schreibt dem Autor die Gefühle zu, die er selbst in die Diskussion eingebracht hat."),
  R("rageTourist","emotion","🧳","Rage tourist","Rage Tourist","Wuttourist","Regularnie odwiedza miejsca, których nie cierpi, żeby upewnić się, że nadal ich nie cierpi.","Regularly visits places he hates to confirm that he still hates them.","Besucht regelmäßig Orte, die er hasst, um zu bestätigen, dass er sie weiter hasst."),
  R("preventiveCynic","emotion","🙄","Cynik prewencyjny","Preventive Cynic","Präventiver Zyniker","Wyśmiewa rzecz przed próbą, dzięki czemu nigdy formalnie się nie rozczarowuje.","Mocks things before trying them and therefore never formally gets disappointed.","Verspottet Dinge vor dem Versuch und wird deshalb offiziell nie enttäuscht."),
  R("schadenfreudist","emotion","🍿","Schadenfreudysta","Schadenfreude Spectator","Schadenfreudiger Zuschauer","Pojawia się punktualnie wtedy, gdy komuś właśnie przestało wychodzić.","Arrives punctually when something has just stopped working for someone.","Erscheint pünktlich, sobald bei jemandem etwas nicht mehr funktioniert."),
  R("forcedComforter","emotion","🌈","Optymista przymusowy","Compulsory Optimist","Zwangsoptimist","Realny problem przykrywa kocem z napisem „wszystko dzieje się po coś”.","Covers a real problem with a blanket reading ‘everything happens for a reason’.","Deckt ein echtes Problem mit der Decke „Alles geschieht aus einem Grund“ zu."),
  R("traumaNarrator","emotion","🩹","Narrator traumy","Trauma Narrator","Trauma-Erzähler","Każdy wątek ma ukryte drzwi prowadzące do jego własnego doświadczenia.","Every thread contains a hidden door leading to his own experience.","Jeder Thread besitzt eine verborgene Tür zu seiner eigenen Erfahrung."),
  R("dayVenter","emotion","🌋","Rozładowywacz dnia","Day Venter","Tagesfrust-Ablasser","Nie jest zły na autora. Autor po prostu pojawił się po niewłaściwym poniedziałku.","Isn't angry at the author; the author merely appeared after the wrong Monday.","Ist nicht auf den Autor wütend; der Autor erschien nur nach dem falschen Montag."),
  R("autobiographer","emotion","📔","Biograf własny","Autobiographer","Autobiograf","Na każde pytanie odpowiada rozdziałem z własnego życia.","Answers every question with a chapter from his own life.","Beantwortet jede Frage mit einem Kapitel aus dem eigenen Leben."),
  R("expertEverything","status","🎙️","Ekspert od wszystkiego","Expert on Everything","Experte für alles","Zmienia specjalizację wraz z listą aktualnych trendów.","Changes specialisation together with the trending list.","Wechselt sein Fachgebiet zusammen mit der Trendliste."),
  R("credentialsFlasher","status","🎖️","Flasher kompetencji","Credential Flasher","Kompetenz-Blender","Najpierw prezentuje CV, dopiero później argument — jeśli starczy miejsca.","Presents the résumé first and the argument later, if space remains.","Präsentiert zuerst den Lebenslauf und später das Argument, falls Platz bleibt."),
  R("insider","status","🕶️","Insider","Insider","Insider","Nie może zdradzić szczegółów, ale szczegóły zdecydowanie potwierdzają jego zdanie.","Cannot reveal details, but the details definitely confirm his position.","Kann keine Details nennen, doch diese bestätigen seine Position ganz eindeutig."),
  R("internetVeteran","status","🗿","Weteran internetu","Internet Veteran","Internetveteran","Wiek konta wykorzystuje jako dodatkowy stopień naukowy.","Uses account age as an additional academic degree.","Nutzt das Alter des Accounts als zusätzlichen akademischen Grad."),
  R("reachHunter","status","📈","Łowca zasięgów","Reach Hunter","Reichweitenjäger","Opinię publikuje tam, gdzie może zostać zauważona przez największą publiczność.","Places an opinion where the largest possible audience can notice it.","Platziert eine Meinung dort, wo das größtmögliche Publikum sie bemerkt."),
  R("replyGuy","status","↪️","Reply guy","Reply Guy","Reply Guy","Regularnie odpowiada tej samej osobie, aż znajomość stanie się faktem statystycznym.","Replies to the same person until acquaintance becomes a statistical fact.","Antwortet derselben Person, bis Bekanntschaft statistisch unvermeidlich wird."),
  R("popularityParasite","status","🪱","Pasożyt popularności","Popularity Parasite","Popularitätsparasit","Pod cudzą popularność podpina własny temat, profil albo promocję.","Attaches a personal topic, profile or promotion to someone else's popularity.","Hängt eigenes Thema, Profil oder Werbung an die Popularität anderer."),
  R("hindsightProphet","status","🔭","Prorok po fakcie","Hindsight Prophet","Prophet im Nachhinein","Po wydarzeniu przypomina, że od początku przewidywał oba możliwe wyniki.","After the event recalls having predicted both possible outcomes.","Erinnert nach dem Ereignis daran, beide möglichen Ergebnisse vorhergesagt zu haben."),
  R("armchairTherapist","status","🛋️","Terapeuta na odległość","Armchair Therapist","Ferntherapeut","Diagnozuje obcego człowieka na podstawie dwunastu sekund filmu.","Diagnoses a stranger from twelve seconds of video.","Diagnostiziert einen Fremden anhand von zwölf Sekunden Video."),
  R("preacher","status","⛪","Kaznodzieja","Preacher","Prediger","Pojedyncze zdarzenie zamienia w lekcję dla całej cywilizacji.","Turns one event into a lesson for the entire civilisation.","Verwandelt ein einzelnes Ereignis in eine Lektion für die ganze Zivilisation."),
  R("ironist","audience","🎭","Ironista","Ironist","Ironiker","Chowa opinię za żartem, pozostawiając sobie awaryjne „to tylko żart”.","Hides an opinion behind humour and retains an emergency ‘just joking’ exit.","Versteckt eine Meinung hinter Humor und behält den Notausgang „war nur Spaß“."),
  R("metaCommentator","audience","🪞","Meta-komentator","Meta-Commenter","Meta-Kommentator","Komentuje nie temat, lecz jakość ludzi komentujących temat.","Comments not on the subject, but on the quality of people commenting on it.","Kommentiert nicht das Thema, sondern die Qualität seiner Kommentatoren."),
  R("spectator","audience","🥤","Obserwator widowiska","Spectacle Observer","Spektakel-Beobachter","Nie ma stanowiska. Ma popcorn i bardzo elastyczny grafik.","Has no position, but does have popcorn and a flexible schedule.","Hat keine Position, aber Popcorn und einen sehr flexiblen Zeitplan."),
  R("disasterVoyeur","audience","🚧","Podglądacz katastrof","Disaster Voyeur","Katastrophenbeobachter","Wie, że dyskusja jest wypadkiem, lecz nadal zwalnia, żeby popatrzeć.","Knows the discussion is a crash and still slows down to look.","Weiß, dass die Diskussion ein Unfall ist, und wird trotzdem langsamer zum Schauen."),
  R("amplifier","audience","📡","Wzmacniacz","Amplifier","Verstärker","Sam mówi mało, ale lajkiem i udostępnieniem ustawia głośniki.","Says little, but sets up the speakers with likes and shares.","Sagt wenig, stellt aber mit Likes und Shares die Lautsprecher auf."),
  R("curator","audience","🗃️","Kurator","Curator","Kurator","Zbiera, opisuje i porządkuje cudze treści, zanim zrobi to algorytm gorzej.","Collects and organises content before the algorithm does it worse.","Sammelt und ordnet Inhalte, bevor der Algorithmus es schlechter macht."),
  R("screenshotter","audience","📸","Screenshotter","Screenshotter","Screenshotter","Dokumentuje internet, bo wie, że przycisk Usuń bywa początkiem historii.","Documents the internet because Delete is often the beginning of the story.","Dokumentiert das Internet, weil Löschen oft erst der Anfang der Geschichte ist."),
  R("driveBy","audience","🚗","Komentator przejazdowy","Drive-By Commenter","Vorbeifahrender Kommentator","Wpada, wydaje wyrok i znika przed pierwszą odpowiedzią.","Drops in, issues a verdict and disappears before the first reply.","Kommt vorbei, fällt ein Urteil und verschwindet vor der ersten Antwort."),
  R("memetizer","audience","🧬","Memetyzator","Memetizer","Memetisierer","Przerabia wydarzenie na narrację, którą da się powtarzać bez przypisów.","Converts an event into a story repeatable without footnotes.","Verwandelt ein Ereignis in eine Geschichte, die ohne Fußnoten wiederholbar ist."),
  R("silentCorrector","audience","🤐","Milczący korektor","Silent Corrector","Stiller Korrektor","Zauważa błąd, przewiduje trzy godziny rozmowy i wybiera życie.","Spots the error, predicts three hours of debate and chooses life.","Sieht den Fehler, erwartet drei Stunden Debatte und entscheidet sich fürs Leben."),
  R("sporadic","audience","🌗","Użytkownik sporadyczny","Sporadic User","Gelegenheitsnutzer","Pojawia się falami, dzięki czemu każda drama jest dla niego nowym sezonem.","Appears in waves, making every drama feel like a new season.","Taucht in Wellen auf, sodass jedes Drama wie eine neue Staffel wirkt."),
  R("socializer","audience","🤝","Towarzyski","Socializer","Kontaktfreudiger","Przychodzi dla ludzi; temat jest wygodnym meblem w pokoju rozmów.","Comes for the people; the subject is just furniture in the conversation room.","Kommt wegen der Menschen; das Thema ist nur Möbel im Gesprächsraum."),
  R("activeUser","audience","⚡","Użytkownik aktywny","Active User","Aktiver Nutzer","Tworzy, komentuje, udostępnia i wie, co wydarzyło się pięć minut temu.","Creates, comments, shares and knows what happened five minutes ago.","Erstellt, kommentiert, teilt und weiß, was vor fünf Minuten passiert ist."),
  R("debater","audience","🗯️","Dyskutant","Debater","Diskutant","Naprawdę chce wymiany argumentów, choć czasem wymiana zamienia się w abonament.","Genuinely wants an exchange of arguments, although it may become a subscription.","Will wirklich Argumente austauschen, auch wenn daraus manchmal ein Abo wird."),
  R("collector","audience","🔖","Kolekcjoner treści","Content Collector","Inhaltssammler","Zapisuje więcej materiałów, niż jeden człowiek może przeczytać w obecnym życiu.","Saves more material than one person can read in the current lifetime.","Speichert mehr Material, als ein Mensch in diesem Leben lesen kann."),
  R("joiner","audience","🔗","Dołączający","Joiner","Mitmacher","Ma konto wszędzie i aktywność dokładnie tam, gdzie aktualnie są znajomi.","Has an account everywhere and activity wherever the friends currently are.","Hat überall ein Konto und ist dort aktiv, wo die Freunde gerade sind."),
  R("creator","audience","🎨","Twórca","Creator","Creator","Produkuje oryginalne treści, dostarczając pozostałym typom miejsca pracy.","Produces original content and thereby supplies employment to every other type.","Erstellt Originalinhalte und schafft damit Arbeitsplätze für alle anderen Typen."),
  R("informer","prosocial","💡","Informator","Informer","Informierender","Dodaje dane i wyjaśnienia, nie wymagając w zamian publicznej koronacji.","Adds data and explanations without demanding a public coronation.","Ergänzt Daten und Erklärungen, ohne eine öffentliche Krönung zu verlangen."),
  R("peacemaker","prosocial","☮️","Rozjemca","Peacemaker","Friedensstifter","Obniża temperaturę rozmowy, zanim trzeba będzie wezwać straż pożarną.","Lowers the temperature before the fire brigade becomes necessary.","Senkt die Temperatur, bevor die Feuerwehr nötig wird."),
  R("victimSupporter","prosocial","🫶","Wspierający ofiarę","Victim Supporter","Unterstützer des Opfers","Daje wsparcie osobie atakowanej, nawet jeśli nie ma ochoty zostać bohaterem wątku.","Supports the attacked person without needing to become the thread's hero.","Unterstützt die angegriffene Person, ohne Held des Threads werden zu müssen."),
  R("victimDefender","prosocial","🛡️","Obrońca ofiary","Victim Defender","Verteidiger des Opfers","Aktywnie zatrzymuje atak zamiast ograniczać się do prywatnego niesmaku.","Actively interrupts an attack instead of privately disapproving.","Unterbricht einen Angriff aktiv, statt ihn nur privat abzulehnen."),
  R("outsider","prosocial","🚶","Bierny obserwator","Outsider","Außenstehender","Nie dołącza do ataku, ale też nie podejmuje ryzyka jego zatrzymania.","Doesn't join the attack, but doesn't risk stopping it either.","Macht beim Angriff nicht mit, riskiert aber auch nicht, ihn zu stoppen."),
  R("moderator","prosocial","🚦","Moderator","Moderator","Moderator","Przypomina zasady, sprząta bałagan i otrzymuje pretensje od obu stron.","Recites rules, cleans the mess and receives complaints from both sides.","Erinnert an Regeln, räumt auf und bekommt Beschwerden von beiden Seiten."),
  R("explainer","prosocial","🧑‍🏫","Tłumacz","Explainer","Erklärer","Rozkłada trudny temat na części bez traktowania pytającego jak awarii systemu.","Breaks down complexity without treating the questioner as a system failure.","Zerlegt Komplexität, ohne den Fragenden wie einen Systemfehler zu behandeln."),
  R("communityBuilder","prosocial","🏡","Budowniczy społeczności","Community Builder","Community-Aufbauer","Pilnuje, żeby rozmowa po konflikcie nadal była miejscem, do którego warto wracać.","Keeps the conversation worth returning to after conflict.","Sorgt dafür, dass das Gespräch auch nach Konflikten einen Besuch wert bleibt.")
);

let lang = localStorage.getItem("ipa-lang") || (navigator.language.startsWith("de") ? "de" : navigator.language.startsWith("en") ? "en" : "pl");
let activeCategory = "all";

const testProfileIds = [
  "factChecker","critic","frustrate","moralGuardian","troll","mediator","tribalDefender","pseudoExpert","lurker","sealion","doomposter","whataboutist","memeMaker","sourceSniper","tonePolice","cloutChaser","archivist","lastWord",
  "contextCorrector","contrarian","personalOffended","anecdotalist","groupMindReader","credentialsFlasher","dogpiler","languageGuardian","automaticSymmetrist","preventiveCynic","victimDefender","driveBy"
];

const Q = (id, short, pl, en, de, weights) => ({ id, short, prompt:{pl,en,de}, weights });
const questions = [
  Q(1,true,"Zanim udostępnię informację, sprawdzam źródło i szukam brakującego kontekstu.","Before sharing information, I check the source and look for missing context.","Bevor ich Informationen teile, prüfe ich die Quelle und suche fehlenden Kontext.",{factChecker:1.2,contextCorrector:.5,anecdotalist:-.2}),
  Q(2,false,"Nawet przy dobrym pomyśle szybko zauważam jego słabe punkty.","Even in a good idea, I quickly notice its weak points.","Auch bei einer guten Idee bemerke ich schnell ihre Schwächen.",{critic:1.2,languageGuardian:.2}),
  Q(3,true,"Gdy jestem już zirytowany czymś innym, moje komentarze stają się ostrzejsze.","When I am already irritated by something else, my comments become sharper.","Wenn mich bereits etwas anderes ärgert, werden meine Kommentare schärfer.",{frustrate:1.2,doomposter:.3}),
  Q(4,true,"Kiedy widzę coś niewłaściwego, czuję potrzebę publicznie to potępić.","When I see something wrong, I feel a need to condemn it publicly.","Wenn ich etwas Falsches sehe, möchte ich es öffentlich verurteilen.",{moralGuardian:1.2,tonePolice:.45,dogpiler:.15}),
  Q(5,true,"Czasami piszę prowokacyjnie przede wszystkim po to, żeby zobaczyć reakcje.","Sometimes I write provocatively mainly to watch the reactions.","Manchmal schreibe ich vor allem provokativ, um die Reaktionen zu sehen.",{troll:1.2,lastWord:.35}),
  Q(6,true,"W konflikcie próbuję najpierw znaleźć punkt, w którym obie strony mogą się zgodzić.","In conflict, I first try to find a point both sides can agree on.","Im Konflikt suche ich zuerst einen Punkt, dem beide Seiten zustimmen können.",{mediator:1.2,victimDefender:.3,automaticSymmetrist:-.2}),
  Q(7,true,"Łatwiej znajduję usprawiedliwienie dla ludzi z mojej grupy niż dla przeciwników.","I find excuses more easily for my group than for opponents.","Für Menschen aus meiner Gruppe finde ich leichter Entschuldigungen als für Gegner.",{tribalDefender:1.2,whataboutist:.35,contrarian:-.15}),
  Q(8,true,"Potrafię wypowiadać się bardzo pewnie także o tematach, które znam powierzchownie.","I can sound very confident even about subjects I know only superficially.","Ich kann auch bei oberflächlich bekannten Themen sehr sicher auftreten.",{pseudoExpert:1.2,cloutChaser:.25,credentialsFlasher:.2}),
  Q(9,true,"Częściej czytam całą dyskusję, niż sam się w niej ujawniam.","I more often read the whole discussion than reveal myself in it.","Ich lese häufiger die ganze Diskussion, als mich selbst daran zu beteiligen.",{lurker:1.2,archivist:.3}),
  Q(10,true,"Po otrzymaniu sensownego dowodu nadal proszę o kolejne wyjaśnienia.","After receiving reasonable evidence, I still ask for further explanations.","Nach einem plausiblen Beleg verlange ich weiterhin zusätzliche Erklärungen.",{sealion:1.2,critic:.25}),
  Q(11,false,"Pojedyncze złe wydarzenie często wydaje mi się zapowiedzią znacznie większego upadku.","One bad event often feels like a warning of a much larger collapse.","Ein einzelnes schlechtes Ereignis wirkt auf mich oft wie der Beginn eines größeren Zusammenbruchs.",{doomposter:1.2,frustrate:.25,preventiveCynic:.25}),
  Q(12,false,"Na krytykę mojej strony odpowiadam, wskazując podobne przewinienia drugiej strony.","I answer criticism of my side by pointing out similar faults on the other side.","Auf Kritik an meiner Seite antworte ich mit ähnlichen Fehlern der anderen Seite.",{whataboutist:1.2,tribalDefender:.35,automaticSymmetrist:.35}),
  Q(13,true,"Napiętą albo skomplikowaną dyskusję chętnie zamieniam w żart lub mem.","I like turning a tense or complex discussion into a joke or meme.","Eine angespannte oder komplexe Diskussion verwandle ich gern in einen Witz oder ein Meme.",{memeMaker:1.2,troll:.2,cloutChaser:.15}),
  Q(14,false,"Odrzucam argument szybciej, jeśli pochodzi z medium, któremu nie ufam.","I reject an argument faster when it comes from a source I distrust.","Ich lehne ein Argument schneller ab, wenn es aus einem Medium stammt, dem ich misstraue.",{sourceSniper:1.2,critic:.25,factChecker:.15}),
  Q(15,false,"Sposób wypowiedzi potrafi być dla mnie ważniejszy niż sam argument.","The manner of expression can matter to me more than the argument itself.","Die Ausdrucksweise kann mir wichtiger sein als das Argument selbst.",{tonePolice:1.2,moralGuardian:.3,languageGuardian:.25}),
  Q(16,false,"Chętniej komentuję pod dużymi kontami, gdzie więcej osób może mnie zauważyć.","I am more willing to comment under large accounts where more people may notice me.","Unter großen Accounts kommentiere ich lieber, weil mich dort mehr Menschen sehen.",{cloutChaser:1.2,memeMaker:.2,driveBy:.1}),
  Q(17,false,"Zapisuję screeny lub stare wpisy, bo mogą się kiedyś przydać.","I save screenshots or old posts because they may be useful one day.","Ich speichere Screenshots oder alte Beiträge, weil sie später nützlich sein könnten.",{archivist:1.2,factChecker:.2,groupMindReader:.15}),
  Q(18,false,"Odpowiadam tak długo, aż druga osoba przestanie reagować.","I keep replying until the other person stops responding.","Ich antworte so lange, bis die andere Person nicht mehr reagiert.",{lastWord:1.2,troll:.3,driveBy:-.3}),
  Q(19,false,"Dobry dowód potrafi skłonić mnie do zmiany zdania, nawet jeśli osłabia moją stronę.","Good evidence can change my mind even when it weakens my side.","Ein guter Beleg kann meine Meinung ändern, selbst wenn er meine Seite schwächt.",{factChecker:1,contextCorrector:.8,mediator:.4,tribalDefender:-.6,lastWord:-.4}),
  Q(20,false,"Gdy większość jest czegoś pewna, automatycznie zaczynam szukać argumentów przeciwnych.","When the majority is certain, I automatically start looking for the opposite case.","Wenn die Mehrheit sicher ist, suche ich automatisch nach Gegenargumenten.",{contrarian:1.2,troll:.25,critic:.2}),
  Q(21,false,"Ogólną krytykę grupy, z którą się utożsamiam, łatwo odbieram osobiście.","I easily take general criticism of a group I identify with personally.","Allgemeine Kritik an einer Gruppe, mit der ich mich identifiziere, nehme ich leicht persönlich.",{personalOffended:1.2,tribalDefender:.5,frustrate:.2}),
  Q(22,false,"Własne doświadczenie lub historia znajomego przekonuje mnie bardziej niż statystyka.","My own experience or a friend's story convinces me more than statistics.","Eigene Erfahrungen oder die Geschichte eines Bekannten überzeugen mich stärker als Statistik.",{anecdotalist:1.2,pseudoExpert:.25,sourceSniper:.15}),
  Q(23,false,"Często jestem przekonany, że wiem, co autor albo cała grupa naprawdę miała na myśli.","I am often convinced that I know what an author or whole group truly meant.","Oft bin ich überzeugt zu wissen, was ein Autor oder eine ganze Gruppe wirklich meinte.",{groupMindReader:1.2,personalOffended:.3,moralGuardian:.2}),
  Q(24,false,"Przed argumentem chętnie podkreślam własne doświadczenie, stanowisko lub kwalifikacje.","Before making an argument, I like to emphasise my experience, position or credentials.","Vor einem Argument betone ich gern Erfahrung, Position oder Qualifikationen.",{credentialsFlasher:1.2,pseudoExpert:.3,cloutChaser:.2}),
  Q(25,false,"Łatwiej dołączam do ostrej krytyki, kiedy wiele osób już atakuje ten sam cel.","I join harsh criticism more easily when many people already attack the same target.","Ich schließe mich harter Kritik leichter an, wenn viele bereits dasselbe Ziel angreifen.",{dogpiler:1.2,troll:.3,victimDefender:-.5}),
  Q(26,false,"Błąd językowy autora przeszkadza mi nawet wtedy, gdy jego główny argument jest sensowny.","A language error bothers me even when the author's main argument is sound.","Ein Sprachfehler stört mich selbst dann, wenn das Hauptargument sinnvoll ist.",{languageGuardian:1.2,critic:.25,factChecker:-.15}),
  Q(27,false,"W niemal każdym konflikcie czuję potrzebę znalezienia podobnej winy po obu stronach.","In almost every conflict, I feel a need to find similar blame on both sides.","In fast jedem Konflikt möchte ich auf beiden Seiten eine ähnliche Schuld finden.",{automaticSymmetrist:1.2,whataboutist:.35,contrarian:.15}),
  Q(28,false,"Wolę wyśmiać pomysł z góry, niż później przyznać, że miałem wobec niego nadzieję.","I prefer mocking an idea in advance to admitting later that I had hopes for it.","Ich verspotte eine Idee lieber vorher, als später zuzugeben, dass ich Hoffnung hatte.",{preventiveCynic:1.2,doomposter:.35,lurker:.15}),
  Q(29,false,"Gdy ktoś jest niesprawiedliwie atakowany, potrafię publicznie stanąć w jego obronie.","When someone is attacked unfairly, I can defend them publicly.","Wenn jemand unfair angegriffen wird, kann ich ihn öffentlich verteidigen.",{victimDefender:1.2,mediator:.45,tonePolice:-.2,lurker:-.15}),
  Q(30,false,"Czasem zostawiam jeden mocny komentarz i nie wracam już sprawdzić odpowiedzi.","Sometimes I leave one strong comment and never return to check the replies.","Manchmal hinterlasse ich einen starken Kommentar und kehre nie zu den Antworten zurück.",{driveBy:1.2,cloutChaser:.2,lastWord:-.5})
];

const customJokes = {
  factChecker:{pl:"Masz otwarte trzy źródła. Dwa z nich właśnie obalają Twój własny komentarz.",en:"You have three sources open. Two are currently disproving your own comment.",de:"Du hast drei Quellen offen. Zwei widerlegen gerade deinen eigenen Kommentar."},
  critic:{pl:"Potrafisz znaleźć martwy piksel w zachodzie słońca.",en:"You can find a dead pixel in a sunset.",de:"Du findest sogar im Sonnenuntergang einen toten Pixel."},
  frustrate:{pl:"Komentarz dostał emocje przeznaczone pierwotnie dla poniedziałku.",en:"The comment received emotions originally addressed to Monday.",de:"Der Kommentar bekam Gefühle, die ursprünglich dem Montag galten."},
  moralGuardian:{pl:"Młotek sędziowski naładowany. Kontekst nadal w trybie oszczędzania baterii.",en:"Gavel fully charged. Context remains in battery-saver mode.",de:"Richterhammer voll geladen. Kontext weiter im Energiesparmodus."},
  troll:{pl:"Nie karmisz trolla. Ty sprawdzasz, czy kuchnia nadal działa.",en:"You don't feed the troll. You merely test whether the kitchen still works.",de:"Du fütterst den Troll nicht. Du prüfst nur, ob die Küche funktioniert."},
  mediator:{pl:"Próbujesz pogodzić ludzi, którzy przyszli tu specjalnie się pokłócić.",en:"You try reconciling people who came here specifically to fight.",de:"Du versöhnst Menschen, die eigens zum Streiten gekommen sind."},
  tribalDefender:{pl:"Twoi mają kontekst. Tamci mają historię wcześniejszych przewinień.",en:"Your side has context. Their side has a documented history.",de:"Deine Seite hat Kontext. Die andere eine dokumentierte Vorgeschichte."},
  pseudoExpert:{pl:"Twoje „oczywiście” weszło do pokoju trzy strony przed wiedzą.",en:"Your ‘obviously’ entered the room three pages before the knowledge.",de:"Dein „offensichtlich“ betrat den Raum drei Seiten vor dem Wissen."},
  lurker:{pl:"Widziałeś wszystko. Zeznawać nie zamierzasz.",en:"You saw everything. You have no intention of testifying.",de:"Du hast alles gesehen. Aussagen wirst du nicht."},
  sealion:{pl:"To ostatnie pytanie. Po nim zostało tylko siedem ostatnich pytań.",en:"This is the final question. Only seven final questions remain.",de:"Das ist die letzte Frage. Danach bleiben nur sieben letzte Fragen."},
  doomposter:{pl:"Masz gotowy harmonogram końca świata i wygląda na opóźniony.",en:"Your end-of-world timeline is ready and appears to be delayed.",de:"Dein Weltuntergangsplan ist fertig und offenbar verspätet."},
  whataboutist:{pl:"Otworzyłeś drugi proces, zanim pierwszy zdążył odczytać zarzuty.",en:"You opened a second trial before the first could read the charges.",de:"Du hast den zweiten Prozess eröffnet, bevor der erste die Anklage las."},
  memeMaker:{pl:"Debata straciła niuanse, ale zyskała bardzo dobry format PNG.",en:"The debate lost nuance but gained an excellent PNG format.",de:"Die Debatte verlor Nuancen, gewann aber ein hervorragendes PNG-Format."},
  sourceSniper:{pl:"Argument przeżył. Logo źródła niestety nie.",en:"The argument survived. The source logo did not.",de:"Das Argument überlebte. Das Quellenlogo leider nicht."},
  tonePolice:{pl:"Treść zatrzymana do kontroli. Powód: nadmierna liczba decybeli.",en:"Substance detained for inspection. Reason: excessive decibels.",de:"Inhalt zur Kontrolle angehalten. Grund: zu viele Dezibel."},
  cloutChaser:{pl:"Opinia dobra. Szkoda publikować ją tam, gdzie widzi ją tylko rodzina.",en:"A fine opinion. Too good to waste where only family can see it.",de:"Gute Meinung. Zu schade für einen Ort, an dem nur die Familie sie sieht."},
  archivist:{pl:"Internet zapomniał. Twój folder „receipts” absolutnie nie.",en:"The internet forgot. Your receipts folder absolutely did not.",de:"Das Internet vergaß. Dein Belegordner ganz sicher nicht."},
  lastWord:{pl:"Wygrałeś. Druga osoba tylko poszła spać, ale szczegóły są dla przegranych.",en:"You won. The other person merely went to sleep, but details are for losers.",de:"Du hast gewonnen. Die andere Person schlief nur ein, doch Details sind für Verlierer."}
};

let testState = { mode:"short", list:[], index:0, answers:{}, results:null };

function t(key) { return copy[lang][key] || copy.en[key] || key; }
function applyLanguage() {
  document.documentElement.lang = lang;
  $$('[data-t]').forEach(el => el.textContent = t(el.dataset.t));
  $$('[data-t-html]').forEach(el => el.innerHTML = t(el.dataset.tHtml));
  $$('[data-t-placeholder]').forEach(el => el.placeholder = t(el.dataset.tPlaceholder));
  $$('[data-t-alt]').forEach(el => el.alt = t(el.dataset.tAlt));
  $$('[data-lang]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.lang === lang)));
  renderFilters(); renderRoles();
}

function categoryName(id) {
  const c = categories.find(item => item[0] === id);
  return c ? c[{pl:1,en:2,de:3}[lang]] : id;
}
function renderFilters() {
  $('#categoryFilters').innerHTML = [["all",t("all"),t("all"),t("all")], ...categories].map(c =>
    `<button class="filter-chip ${activeCategory === c[0] ? 'active' : ''}" type="button" data-category="${c[0]}">${c[0] === 'all' ? t('all') : categoryName(c[0])}</button>`
  ).join('');
}
function renderRoles() {
  const q = $('#roleSearch').value.trim().toLocaleLowerCase(lang);
  const filtered = roles.filter(role => (activeCategory === 'all' || role.cat === activeCategory) && `${role.name[lang]} ${role.desc[lang]}`.toLocaleLowerCase(lang).includes(q));
  $('#roleGrid').innerHTML = filtered.map(role => {
    let visual;
    if (role.visual) {
      const sheet = role.visual[0] === 'a' ? 'archetypes-a.png' : 'archetypes-b.png';
      const i = Number(role.visual[1]); const x = (i % 3) * 50; const y = Math.floor(i / 3) * 50;
      visual = `<div class="role-visual" style="background-image:url(assets/${sheet});background-position:${x}% ${y}%" role="img" aria-label="${role.name[lang]}"></div>`;
    } else visual = `<div class="role-visual role-emoji" role="img" aria-label="${role.name[lang]}">${role.emoji}</div>`;
    return `<article class="role-card"><div class="role-card-top">${visual}<span class="role-category">${categoryName(role.cat)}</span></div><h3>${role.name[lang]}</h3><p>${role.desc[lang]}</p></article>`;
  }).join('');
  $('#roleCount').textContent = t('shown').replace('{n}', filtered.length);
}

const answerLabels = () => [t("stronglyNo"),t("ratherNo"),t("neutral"),t("ratherYes"),t("stronglyYes")];
function openTest(mode) {
  testState = { mode, list: mode === "short" ? questions.filter(q => q.short) : questions, index:0, answers:{}, results:null };
  $('#questionView').hidden = false; $('#resultsView').hidden = true;
  $('#testModeLabel').textContent = t(mode === "short" ? "modeShort" : "modeLong");
  if (!$('#testDialog').open) $('#testDialog').showModal();
  renderQuestion();
}
function renderQuestion() {
  const q = testState.list[testState.index]; if (!q) return;
  const total = testState.list.length; const answer = testState.answers[q.id];
  $('#questionIndex').textContent = t('question').replace('{n}',testState.index+1).replace('{total}',total);
  $('#testTitle').textContent = q.prompt[lang];
  $('#testProgress span').style.width = `${((testState.index + (answer ? 1 : 0)) / total) * 100}%`;
  $('#likert').innerHTML = answerLabels().map((label,i) => `<button type="button" role="radio" aria-checked="${answer === i+1}" class="${answer === i+1 ? 'selected' : ''}" data-answer="${i+1}"><b>${i+1}</b><small>${label}</small></button>`).join('');
  $('#prevQuestion').disabled = testState.index === 0;
  $('#nextQuestion').disabled = !answer;
  $('#nextQuestion span').textContent = testState.index === total-1 ? (lang === 'pl' ? 'Pokaż wynik' : lang === 'de' ? 'Ergebnis zeigen' : 'Show result') : t('next');
}
function calculateResults() {
  const scores = Object.fromEntries(testProfileIds.map(id => [id,{earned:0,possible:0}]));
  testState.list.forEach(q => {
    const normalized = ((testState.answers[q.id] || 3) - 1) / 4;
    Object.entries(q.weights).forEach(([id,weight]) => {
      if (!scores[id]) return;
      scores[id].possible += Math.abs(weight);
      scores[id].earned += weight >= 0 ? normalized * weight : (1-normalized) * Math.abs(weight);
    });
  });
  const ranked = Object.entries(scores).filter(([,s]) => s.possible > 0).map(([id,s]) => ({id,score:(s.earned+.5)/(s.possible+1)})).sort((a,b)=>b.score-a.score).slice(0,5);
  const total = ranked.reduce((sum,r)=>sum+r.score,0) || 1;
  ranked.forEach(r => r.share = Math.floor(r.score/total*100));
  let remainder = 100 - ranked.reduce((sum,r)=>sum+r.share,0);
  for (let i=0; i<remainder; i++) ranked[i % ranked.length].share++;
  testState.results = ranked;
  renderResults();
}
function jokeFor(role, index) {
  const custom = customJokes[role.id]?.[lang];
  const generic = {
    pl:[`Twój ${role.name.pl} nie śpi. On tylko odświeża wątek.`,`Spokojnie — ${role.name.pl} przejmuje stery tylko wtedy, gdy ktoś w internecie się myli. Czyli często.`],
    en:[`Your ${role.name.en} never sleeps. It merely refreshes the thread.`,`Relax — your ${role.name.en} takes over only when someone online is wrong. So, often.`],
    de:[`Dein ${role.name.de} schläft nie. Er aktualisiert nur den Thread.`,`Keine Sorge – dein ${role.name.de} übernimmt nur, wenn online jemand falschliegt. Also oft.`]
  }[lang];
  const pool = custom ? [custom,...generic] : generic;
  return pool[(Date.now()+index*7) % pool.length];
}
function renderResults() {
  if (!testState.results) return;
  $('#questionView').hidden = true; $('#resultsView').hidden = false; $('#testProgress span').style.width = '100%';
  $('#resultSummary').textContent = t(testState.mode === 'short' ? 'resultShort' : 'resultLong');
  const colors = ['var(--violet)','var(--coral)','var(--lime)','var(--cyan)','var(--yellow)'];
  let cursor = 0; const stops = testState.results.map((r,i) => { const start=cursor; cursor+=r.share; return `${colors[i]} ${start}% ${cursor}%`; });
  $('#resultDonut').style.background = `conic-gradient(${stops.join(',')})`;
  $('#donutLegend').innerHTML = testState.results.map((r,i) => { const role=roles.find(x=>x.id===r.id); return `<span><i style="background:${colors[i]}"></i>${role.name[lang]} · ${r.share}%</span>`; }).join('');
  $('#resultList').innerHTML = testState.results.map((r,i) => { const role=roles.find(x=>x.id===r.id); return `<article class="result-card" style="--role-color:${colors[i]};--share:${r.share}%"><div class="result-rank">#${i+1}</div><div><h3>${role.emoji || ['🔎','✏️','🤬','⚖️','🧌'][i]} ${role.name[lang]}</h3><p>${role.desc[lang]}</p><blockquote>“${jokeFor(role,i)}”</blockquote></div><div class="result-percent">${r.share}%</div><div class="result-bar"><span></span></div></article>`; }).join('');
  $('#resultsView').scrollIntoView({block:'start'});
}

$$('[data-lang]').forEach(btn => btn.addEventListener('click', () => { lang = btn.dataset.lang; localStorage.setItem('ipa-lang',lang); applyLanguage(); }));
$('#categoryFilters').addEventListener('click', e => { const btn = e.target.closest('[data-category]'); if (!btn) return; activeCategory = btn.dataset.category; renderFilters(); renderRoles(); });
$('#roleSearch').addEventListener('input', renderRoles);
$('#themeToggle').addEventListener('click', () => { const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = next; localStorage.setItem('ipa-theme', next); });
document.documentElement.dataset.theme = localStorage.getItem('ipa-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
$$('[data-start-test]').forEach(btn => btn.addEventListener('click', () => openTest(btn.dataset.startTest)));
$('#likert').addEventListener('click', e => { const btn=e.target.closest('[data-answer]'); if(!btn) return; testState.answers[testState.list[testState.index].id]=Number(btn.dataset.answer); renderQuestion(); });
$('#nextQuestion').addEventListener('click', () => { if(!testState.answers[testState.list[testState.index].id]) return; if(testState.index === testState.list.length-1) calculateResults(); else { testState.index++; renderQuestion(); } });
$('#prevQuestion').addEventListener('click', () => { if(testState.index>0){ testState.index--; renderQuestion(); } });
$('#closeTest').addEventListener('click', () => $('#testDialog').close());
$('#closeResults').addEventListener('click', () => { $('#testDialog').close(); $('#atlas').scrollIntoView({behavior:'smooth'}); });
$('#retakeTest').addEventListener('click', () => openTest(testState.mode));

let installPrompt;
const installButton = $('#installApp');
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault(); installPrompt = event; installButton.hidden = false;
});
installButton.addEventListener('click', async () => {
  if (!installPrompt) return;
  installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null; installButton.hidden = true;
});
window.addEventListener('appinstalled', () => { installPrompt = null; installButton.hidden = true; });

function updateNetworkStatus() {
  const status = $('#networkStatus');
  status.textContent = t(navigator.onLine ? 'online' : 'offline');
  status.hidden = navigator.onLine;
  if (navigator.onLine) { status.hidden = false; setTimeout(() => { status.hidden = true; }, 1800); }
}
window.addEventListener('offline', updateNetworkStatus);
window.addEventListener('online', updateNetworkStatus);
if (!navigator.onLine) updateNetworkStatus();

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
applyLanguage();
