const AXES = ["feminism", "fury", "chaos", "calm", "leadership"];
const A = (feminism, fury, chaos, calm, leadership) => ({ feminism, fury, chaos, calm, leadership });
const q = (text, reaction, answers) => ({ text, reaction, answers });

const copy = {
  en: {
    intro: "Find out whether you’re feminist, furious, or completely unhinged.", start: "Start Test",
    how: "How it works", howText: "The moos behind the madness.", daily: "Daily Moo", dailyText: "A fresh question. Every day.",
    possible: "Possible Results", possibleText: "There are many ways to be magnificently mad.", next: "Next", back: "Back",
    result: "Your result", again: "Moo again", select: "Choose an answer to continue.", meter: "Madness Meter",
    meterText: "You’re getting deliciously unhinged.", share: "Share result", copied: "Result copied!", questionOf: "of",
    dailyQuestion: "If someone says “not all men,” you respond:", dailyAnswers: ["With facts and patience.", "With sarcasm and statistics.", "With rage and a meme."],
    axis: ["Feminist energy", "Fury", "Cow chaos", "Calm", "Leadership"],
    nav: ["Home", "Start Test", "Daily Moo", "Results", "Settings"],
    resultsTitle: "Meet the herd", resultsIntro: "Six possible personalities. One scientifically questionable pasture.", takeTest: "Find my result", traits: "Signature traits"
  },
  pl: {
    intro: "Sprawdź, czy jesteś feministką, wściekłą czy kompletnie odklejoną.", start: "Rozpocznij test",
    how: "Jak to działa", howText: "Muu stojące za tym szaleństwem.", daily: "Codzienne Muu", dailyText: "Jedno świeże pytanie dziennie.",
    possible: "Możliwe wyniki", possibleText: "Jest wiele sposobów, by być zachwycająco odklejoną.", next: "Dalej", back: "Wstecz",
    result: "Twój wynik", again: "Muu jeszcze raz", select: "Wybierz odpowiedź, aby przejść dalej.", meter: "Miernik szaleństwa",
    meterText: "Robi się smakowicie odklejenie.", share: "Udostępnij wynik", copied: "Wynik skopiowany!", questionOf: "z",
    dailyQuestion: "Ktoś mówi „nie wszyscy mężczyźni”. Odpowiadasz:", dailyAnswers: ["Faktami i cierpliwością.", "Sarkazmem i statystykami.", "Wściekłością i memem."],
    axis: ["Energia feministyczna", "Furia", "Krowi chaos", "Spokój", "Przywództwo"],
    nav: ["Start", "Rozpocznij test", "Codzienne Muu", "Wyniki", "Ustawienia"],
    resultsTitle: "Poznaj stado", resultsIntro: "Sześć możliwych osobowości. Jedno naukowo podejrzane pastwisko.", takeTest: "Sprawdź mój wynik", traits: "Znaki szczególne"
  }
};

const questions = {
  en: [
    q("Someone disagrees with you online. What do you do?", "WHAT FRESH NONSENSE IS THIS?!", [["Discuss calmly", "Facts, empathy, receipts.", "💬", A(2,0,0,3,1)], ["Ignore it", "Not my pasture.", "😎", A(0,0,0,4,0)], ["Check their posts from 2017", "Context is everything.", "🗂️", A(2,1,2,1,1)], ["Call it symbolic violence", "Name it. Frame it. Tweet it.", "📣", A(3,3,3,0,2)]]),
    q("The farmer says: ‘That is how it has always been.’ You…", "TRADITION IS NOT A RECEIPT!", [["Ask for the data", "Calm and precise.", "📊", A(3,0,0,3,1)], ["Organise the herd", "Collective mooing begins.", "🐄", A(3,2,1,1,4)], ["Build a presentation", "With footnotes.", "🖥️", A(3,1,1,2,2)], ["Eat his clipboard", "A strong closing argument.", "📋", A(1,4,4,0,1)]]),
    q("Equality is called ‘too political.’ Your reaction?", "OH, NOW IT IS POLITICAL?!", [["Deep breath", "Peace, temporarily.", "🧘", A(2,0,0,4,0)], ["Ask what they mean", "Let them explain it.", "❓", A(3,0,0,3,1)], ["Bring statistics", "Charts enter the pasture.", "📈", A(4,1,1,2,2)], ["Weaponised mooing", "No further questions.", "⚡", A(2,4,4,0,2)]]),
    q("The fence is clearly unfair. What now?", "WHO BUILT THIS THING?!", [["Negotiate a gate", "Reform with hinges.", "🚪", A(2,0,0,4,2)], ["Build a coalition", "Many hooves, one cause.", "🤝", A(4,1,1,2,4)], ["Write a furious thread", "Fourteen posts.", "🧵", A(3,3,2,0,2)], ["The fence no longer exists", "Direct action.", "💥", A(3,4,4,0,3)]]),
    q("A colleague says you should smile more.", "MY FACE IS NOT OFFICE DECOR!", [["Smile politely", "Choose the easy day.", "🙂", A(0,0,0,4,0)], ["Ask if he says it to men", "One clean question.", "🎯", A(4,1,0,3,2)], ["Send an HR memo", "Document the pasture.", "📝", A(3,1,1,2,3)], ["Start a workplace uprising", "Calendars are cleared.", "🔥", A(4,4,3,0,4)]]),
    q("A brand launches a pink ‘empowerment’ mug.", "CAPITALISM FOUND GLITTER!", [["Buy it", "It is cute though.", "☕", A(1,0,0,3,0)], ["Read the labour policy", "Receipts first.", "🔍", A(4,1,0,3,2)], ["Post a sarcastic review", "Five stars for irony.", "⭐", A(3,2,2,1,1)], ["Turn it into a protest prop", "Merch becomes message.", "📢", A(4,3,4,0,3)]]),
    q("Your group chat enters a political argument.", "THE HERD HAS SPLIT!", [["Mute notifications", "Peace wins.", "🔕", A(0,0,0,4,0)], ["Summarise both sides", "Cow mediator.", "⚖️", A(2,0,0,4,2)], ["Drop six sources", "Bibliography attack.", "📚", A(3,2,1,2,2)], ["Send the perfect meme", "Diplomacy has failed.", "🐸", A(2,3,4,0,1)]]),
    q("A panel about women has no women on it.", "THE EMPTY CHAIR SPEAKS VOLUMES!", [["Notice and move on", "Not today.", "👀", A(1,0,0,3,0)], ["Ask the organiser", "Simple accountability.", "✉️", A(4,1,0,3,2)], ["Publish the photo", "Let the image work.", "📸", A(4,2,2,1,3)], ["Host a rival panel", "Build a better stage.", "🎤", A(4,3,2,1,4)]]),
    q("Someone says feminism has gone too far.", "PAST WHICH FIELD, EXACTLY?!", [["Ask for an example", "Specifics, please.", "🧭", A(4,0,0,4,1)], ["Explain the history", "Lecture mode.", "📖", A(4,1,1,2,2)], ["Reply with sarcasm", "A tiny verbal hoof.", "🙃", A(3,3,2,1,1)], ["Declare the cow republic", "Borders are open.", "🏳️", A(4,4,4,0,4)]]),
    q("Your protest sign has room for four words.", "MAKE EVERY MOO COUNT!", [["Equal rights, please", "Polite and clear.", "🪧", A(3,0,0,4,1)], ["Facts over fragile egos", "Sharper edges.", "📌", A(4,2,1,2,2)], ["Moos not mansplain", "Brand consistency.", "📣", A(4,3,3,1,2)], ["THE BARN IS OURS", "Subtlety has left.", "🚩", A(4,4,4,0,4)]]),
    q("A friend makes a clumsy joke.", "COMEDY NEEDS A VET!", [["Let it pass", "One free moo.", "😶", A(0,0,0,4,0)], ["Explain why it lands badly", "Gentle correction.", "💡", A(3,0,0,4,1)], ["Roast them back", "Educational fire.", "🌶️", A(2,3,2,1,1)], ["Launch a tribunal", "The group chat convenes.", "⚖️", A(3,4,4,0,3)]]),
    q("You finally get the microphone. What now?", "THE PASTURE IS LISTENING!", [["Thank everyone", "Graceful exit.", "🙏", A(1,0,0,4,1)], ["Make one clear point", "Precision wins.", "🎙️", A(3,0,0,3,2)], ["Call for collective action", "Move the herd.", "✊", A(4,2,1,1,4)], ["Rewrite the entire rulebook", "New barn, new rules.", "👑", A(4,4,4,0,4)]])
  ],
  pl: [
    q("Ktoś nie zgadza się z tobą w internecie. Co robisz?", "CO TO ZNOWU ZA BZDURA?!", [["Dyskutuję spokojnie", "Fakty, empatia i dowody.", "💬", A(2,0,0,3,1)], ["Ignoruję", "Nie moje pastwisko.", "😎", A(0,0,0,4,0)], ["Sprawdzam posty z 2017 roku", "Kontekst jest wszystkim.", "🗂️", A(2,1,2,1,1)], ["Nazywam to przemocą symboliczną", "Nazwij. Opisz. Opublikuj.", "📣", A(3,3,3,0,2)]]),
    q("Farmer mówi: „Zawsze tak było”. Ty…", "TRADYCJA TO NIE DOWÓD!", [["Pytam o dane", "Spokojnie i precyzyjnie.", "📊", A(3,0,0,3,1)], ["Organizuję stado", "Zaczyna się zbiorowe muczenie.", "🐄", A(3,2,1,1,4)], ["Przygotowuję prezentację", "Oczywiście z przypisami.", "🖥️", A(3,1,1,2,2)], ["Zjadam mu notatnik", "Mocny argument końcowy.", "📋", A(1,4,4,0,1)]]),
    q("Ktoś nazywa równość „zbyt polityczną”. Jak reagujesz?", "A TERAZ TO POLITYCZNE?!", [["Biorę głęboki oddech", "Wybieram spokój. Na chwilę.", "🧘", A(2,0,0,4,0)], ["Pytam, co ma na myśli", "Niech sam rozwinie ten absurd.", "❓", A(3,0,0,3,1)], ["Wyciągam statystyki", "Wykresy wchodzą na pastwisko.", "📈", A(4,1,1,2,2)], ["Uruchamiam muczenie bojowe", "Brak dalszych pytań.", "⚡", A(2,4,4,0,2)]]),
    q("Płot jest ewidentnie niesprawiedliwy. Co robisz?", "KTO TO ZBUDOWAŁ?!", [["Negocjuję bramkę", "Reforma na zawiasach.", "🚪", A(2,0,0,4,2)], ["Buduję koalicję", "Wiele racic, jedna sprawa.", "🤝", A(4,1,1,2,4)], ["Piszę wściekły wątek", "Czternaście postów.", "🧵", A(3,3,2,0,2)], ["Płotu już nie ma", "Akcja bezpośrednia.", "💥", A(3,4,4,0,3)]]),
    q("Kolega mówi, że powinnaś częściej się uśmiechać.", "MOJA TWARZ TO NIE DEKORACJA BIURA!", [["Uśmiecham się grzecznie", "Dziś wybieram łatwiejszą drogę.", "🙂", A(0,0,0,4,0)], ["Pytam, czy mówi to mężczyznom", "Jedno krótkie pytanie.", "🎯", A(4,1,0,3,2)], ["Wysyłam notatkę do HR", "Dokumentuję sytuację na pastwisku.", "📝", A(3,1,1,2,3)], ["Rozpoczynam biurowe powstanie", "Kalendarze zostały wyczyszczone.", "🔥", A(4,4,3,0,4)]]),
    q("Marka wypuszcza różowy kubek z napisem „empowerment”.", "KAPITALIZM ODKRYŁ BROKAT!", [["Kupuję go", "Ale jest całkiem ładny.", "☕", A(1,0,0,3,0)], ["Czytam politykę zatrudnienia firmy", "Najpierw konkrety.", "🔍", A(4,1,0,3,2)], ["Publikuję sarkastyczną recenzję", "Pięć gwiazdek za ironię.", "⭐", A(3,2,2,1,1)], ["Robię z niego rekwizyt protestu", "Gadżet staje się przekazem.", "📢", A(4,3,4,0,3)]]),
    q("Czat grupowy wpada w polityczną awanturę.", "STADO SIĘ PODZIELIŁO!", [["Wyciszam powiadomienia", "Spokój zwycięża.", "🔕", A(0,0,0,4,0)], ["Podsumowuję obie strony", "Krowia mediatorka.", "⚖️", A(2,0,0,4,2)], ["Wrzucam sześć źródeł", "Atak bibliografią.", "📚", A(3,2,1,2,2)], ["Wysyłam idealnego mema", "Dyplomacja zawiodła.", "🐸", A(2,3,4,0,1)]]),
    q("Panel o kobietach nie ma ani jednej kobiety.", "PUSTE KRZESŁO MÓWI WSZYSTKO!", [["Zauważam i idę dalej", "Nie dzisiaj.", "👀", A(1,0,0,3,0)], ["Pytam organizatora", "Proste rozliczenie odpowiedzialności.", "✉️", A(4,1,0,3,2)], ["Publikuję zdjęcie panelu", "Niech obraz zrobi swoje.", "📸", A(4,2,2,1,3)], ["Organizuję konkurencyjny panel", "Buduję lepszą scenę.", "🎤", A(4,3,2,1,4)]]),
    q("Ktoś mówi, że feminizm zaszedł za daleko.", "ZA KTÓRE POLE DOKŁADNIE?!", [["Proszę o przykład", "Konkrety, proszę.", "🧭", A(4,0,0,4,1)], ["Wyjaśniam historię", "Tryb wykładu aktywowany.", "📖", A(4,1,1,2,2)], ["Odpowiadam sarkazmem", "Małe słowne kopnięcie racicą.", "🙃", A(3,3,2,1,1)], ["Ogłaszam krowią republikę", "Granice są otwarte.", "🏳️", A(4,4,4,0,4)]]),
    q("Na transparencie mieszczą się tylko cztery słowa.", "NIECH KAŻDE MUU MA SENS!", [["Równe prawa, bardzo proszę", "Grzecznie i jasno.", "🪧", A(3,0,0,4,1)], ["Fakty ponad kruche ego", "Trochę ostrzejsze krawędzie.", "📌", A(4,2,1,2,2)], ["Muu zamiast mansplainingu", "Spójność marki.", "📣", A(4,3,3,1,2)], ["STODOŁA JEST NASZA", "Subtelność opuściła pastwisko.", "🚩", A(4,4,4,0,4)]]),
    q("Znajomy rzuca niezręczny żart.", "TEN HUMOR POTRZEBUJE WETERYNARZA!", [["Puszczam go mimo uszu", "Jedno darmowe muu.", "😶", A(0,0,0,4,0)], ["Wyjaśniam, dlaczego żart nie działa", "Łagodna korekta.", "💡", A(3,0,0,4,1)], ["Odpowiadam jeszcze mocniejszym roastem", "Edukacyjny ogień.", "🌶️", A(2,3,2,1,1)], ["Powołuję trybunał", "Czat grupowy rozpoczyna obrady.", "⚖️", A(3,4,4,0,3)]]),
    q("Wreszcie dostajesz mikrofon. Co robisz?", "PASTWISKO SŁUCHA!", [["Dziękuję wszystkim", "Eleganckie zakończenie.", "🙏", A(1,0,0,4,1)], ["Przedstawiam jeden jasny argument", "Precyzja zwycięża.", "🎙️", A(3,0,0,3,2)], ["Wzywam do wspólnego działania", "Wprawiam stado w ruch.", "✊", A(4,2,1,1,4)], ["Przepisuję cały regulamin", "Nowa stodoła, nowe zasady.", "👑", A(4,4,4,0,4)]])
  ]
};

const results = {
  en: [
    {id:"calm",name:"Calm Cow",desc:"Grounded, compassionate and almost impossible to bait.",asset:"./assets/webp/result-calm-cow.webp",traits:["calm", "empathy", "boundaries"],quote:"Peace is powerful. Snacks help.",test:s=>s.calm>=70&&s.fury<35},
    {id:"pragmatist",name:"Pasture Pragmatist",desc:"You prefer evidence, alliances and doors that actually open.",asset:"./assets/webp/result-calm-cow.webp",traits:["evidence", "strategy", "coalitions"],quote:"Reform, but make the hinges work.",test:s=>s.calm>=50&&s.feminism>=50},
    {id:"toxic",name:"FemiToxicy",desc:"Hot takes, sharp instincts and just enough chaos to trend.",asset:"./assets/webp/result-femitoxicy.webp",traits:["fire", "sarcasm", "chaos"],quote:"I brought receipts and a flamethrower.",test:s=>s.fury>=55&&s.chaos>=50},
    {id:"activist",name:"Mad Moo Activist",desc:"You turn irritation into action and bring the herd with you.",asset:"./assets/webp/result-femitoxicy.webp",traits:["action", "courage", "community"],quote:"One moo is noise. A herd is policy.",test:s=>s.feminism>=65&&s.leadership>=55},
    {id:"commander",name:"Supreme Cowmander",desc:"You lead the herd, rewrite the rules and own the microphone.",asset:"./assets/webp/result-cowmander.webp",traits:["leadership", "vision", "command"],quote:"The microphone was always mine.",test:s=>s.leadership>=70},
    {id:"unhinged",name:"Completely Unhinged Heifer",desc:"The barn meeting has been cancelled. You are now the meeting.",asset:"./assets/webp/result-unhinged.webp",traits:["chaos", "rage", "spectacle"],quote:"There was a fence. Past tense.",test:s=>s.chaos>=70||s.fury>=75}
  ],
  pl: [
    {id:"calm",name:"Spokojna Krowa",desc:"Stabilna, empatyczna i niemal niemożliwa do sprowokowania.",asset:"./assets/webp/result-calm-cow.webp",traits:["spokój", "empatia", "granice"],quote:"Spokój jest siłą. Przekąski pomagają.",test:s=>s.calm>=70&&s.fury<35},
    {id:"pragmatist",name:"Pragmatyczka Pastwiska",desc:"Wolisz dowody, sojusze i bramy, które naprawdę się otwierają.",asset:"./assets/webp/result-calm-cow.webp",traits:["dowody", "strategia", "sojusze"],quote:"Reforma, ale na działających zawiasach.",test:s=>s.calm>=50&&s.feminism>=50},
    {id:"toxic",name:"FemiToxicy",desc:"Gorące opinie, ostry instynkt i chaos wystarczający, by wejść w trendy.",asset:"./assets/webp/result-femitoxicy.webp",traits:["ogień", "sarkazm", "chaos"],quote:"Przyniosłam dowody i miotacz ognia.",test:s=>s.fury>=55&&s.chaos>=50},
    {id:"activist",name:"Aktywistka Mad Moo",desc:"Zamieniasz irytację w działanie i pociągasz za sobą stado.",asset:"./assets/webp/result-femitoxicy.webp",traits:["działanie", "odwaga", "wspólnota"],quote:"Jedno muu to hałas. Stado to polityka.",test:s=>s.feminism>=65&&s.leadership>=55},
    {id:"commander",name:"Najwyższa Krowodząca",desc:"Prowadzisz stado, przepisujesz zasady i przejmujesz mikrofon.",asset:"./assets/webp/result-cowmander.webp",traits:["przywództwo", "wizja", "dowodzenie"],quote:"Mikrofon od początku należał do mnie.",test:s=>s.leadership>=70},
    {id:"unhinged",name:"Kompletnie Odklejona Jałówka",desc:"Zebranie w stodole odwołano. Teraz ty jesteś zebraniem.",asset:"./assets/webp/result-unhinged.webp",traits:["chaos", "furia", "spektakl"],quote:"Był płot. Czas przeszły.",test:s=>s.chaos>=70||s.fury>=75}
  ]
};

const app = document.querySelector("#app");
const languageSelect = document.querySelector("#languageSelect");
const installButton = document.querySelector("#installButton");
let language = localStorage.getItem("muutoo-language") || (navigator.language.startsWith("pl") ? "pl" : "en");
let currentQuestion = 0;
let answers = [];
let selected = null;
let deferredInstallPrompt;
languageSelect.value = language;

const blank = () => Object.fromEntries(AXES.map(axis => [axis, 0]));
function scores() {
  const total = blank();
  answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex == null) return;
    const points = questions[language][questionIndex].answers[answerIndex][3];
    AXES.forEach(axis => { total[axis] += points[axis]; });
  });
  const max = questions[language].length * 4;
  return Object.fromEntries(AXES.map(axis => [axis, Math.round((total[axis] / max) * 100)]));
}
function pickResult(score) { return [...results[language]].reverse().find(result => result.test(score)) || results[language][1]; }
function resultCards(limit = true) {
  const herd = limit ? results[language].filter((_, index) => [0,2,4].includes(index)) : results[language];
  return herd.map(result => `<article class="result-preview"><img src="${result.asset}" alt="${result.name}"><h3>${result.name}</h3><p>${result.desc}</p></article>`).join("");
}
function updateStaticCopy() {
  document.documentElement.lang = language;
  document.querySelectorAll(".nav-item span").forEach((node, index) => { node.textContent = copy[language].nav[index]; });
  document.querySelector(".sidebar-tip p").innerHTML = language === "pl" ? "<strong>Masz bojowy nastrój?</strong><br>Rozwiąż test i uwolnij swoją wewnętrzną feministyczną krowę." : "<strong>Feeling feisty?</strong><br>Take the test and unleash your inner feminist cow.";
}
function setRoute(route) {
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("is-active", item.dataset.route === route));
  if (route === "quiz") startQuiz();
  else if (route === "home") renderHome();
  else if (route === "results") renderResults();
  else renderPlaceholder(route);
}
function renderHome() {
  const t = copy[language];
  app.innerHTML = `<section class="home-screen"><div class="hero-panel"><div class="hero-cow"><span class="speech">MOOS<br>NOT<br>MANSPLAIN!</span><img src="./assets/webp/cow-home.webp" alt="MuuToo cow"></div><div class="hero-copy"><img class="logo-image" src="./assets/logo.svg" alt="MuuToo"><p class="subtitle">— The Mad Feminist Cow Test —</p><p class="hero-lead">${t.intro}</p><button class="primary-button" id="startButton">${t.start}<span>›</span></button></div></div><div class="home-grid"><article class="daily-card panel"><header><span class="round-icon">▣</span><div><h2>${t.daily}</h2><p>${t.dailyText}</p></div></header><div class="daily-question"><strong>${t.dailyQuestion}</strong>${t.dailyAnswers.map((answer,index)=>`<button>${String.fromCharCode(65+index)} <span>${answer}</span></button>`).join("")}</div></article><article class="results-panel panel"><header><span class="star">★</span><div><h2>${t.possible}</h2><p>${t.possibleText}</p></div></header><div class="result-grid">${resultCards()}</div></article></div><div class="mobile-links"><button><span class="round-icon">▰</span><b>${t.how}</b><small>${t.howText}</small><i>›</i></button><button><span class="round-icon">▣</span><b>${t.daily}</b><small>${t.dailyText}</small><i>›</i></button></div><section class="mobile-results panel"><h2>★ ${t.possible}</h2><div class="result-grid">${resultCards()}</div></section></section>`;
  document.querySelector("#startButton").addEventListener("click", startQuiz);
}
function renderResults() {
  const t = copy[language];
  app.innerHTML = `<section class="results-gallery"><header class="gallery-heading"><span class="result-label">${t.possible}</span><h1>${t.resultsTitle}</h1><p>${t.resultsIntro}</p></header><div class="herd-grid">${results[language].map(result => `<article class="herd-card panel"><img src="${result.asset}" alt="${result.name}"><div class="herd-card-copy"><h2>${result.name}</h2><p>${result.desc}</p><blockquote>“${result.quote}”</blockquote><small>${t.traits}</small><div class="trait-list">${result.traits.map(trait => `<span>${trait}</span>`).join("")}</div></div></article>`).join("")}</div><button class="primary-button gallery-cta" id="galleryStartButton">${t.takeTest}<span>›</span></button></section>`;
  document.querySelector("#galleryStartButton").addEventListener("click", startQuiz);
}
function startQuiz() { currentQuestion = 0; answers = []; selected = null; document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("is-active", item.dataset.route === "quiz")); renderQuestion(); }
function renderQuestion() {
  const t = copy[language], list = questions[language], item = list[currentQuestion], progress = ((currentQuestion + 1) / list.length) * 100, currentScores = scores(), madness = Math.round((currentScores.fury + currentScores.chaos) / 2);
  selected = answers[currentQuestion] ?? null;
  app.innerHTML = `<section class="quiz-screen"><div class="quiz-heading"><img src="./assets/logo.svg" alt="MuuToo"><b>${currentQuestion + 1} <small>${t.questionOf} ${list.length}</small></b><span class="pill">◷ ~2 min</span></div><div class="progress-track"><i style="width:${progress}%"></i></div><div class="quiz-illustration"><div class="reaction">${item.reaction}</div><img src="./assets/webp/cow-question.webp" alt=""><span class="punctuation">!?</span></div><div class="question-panel panel"><h2>${item.text}</h2><div class="answers">${item.answers.map(([label,hint,icon],index)=>`<button class="answer-button ${selected===index?"is-selected":""}" data-index="${index}"><span class="answer-icon">${icon}</span><span><strong>${label}</strong><small>${hint}</small></span><i>›</i></button>`).join("")}</div><div class="madness-card"><span class="brain">🧠</span><div><strong>${t.meter}</strong><small>${t.meterText}</small><div class="mini-track"><i style="width:${Math.max(8,madness)}%"></i></div></div><b>${madness}%</b></div><div class="quiz-actions"><button class="secondary-button" id="backButton" ${currentQuestion===0?"disabled":""}>${t.back}</button><button class="primary-button" id="nextButton" ${selected==null?"disabled":""}>${t.next}<span>›</span></button></div><p id="selectionHint" class="selection-hint">${selected==null?t.select:""}</p></div></section>`;
  document.querySelectorAll(".answer-button").forEach(button => button.addEventListener("click", () => { selected = Number(button.dataset.index); answers[currentQuestion] = selected; document.querySelectorAll(".answer-button").forEach(item => item.classList.toggle("is-selected", item === button)); document.querySelector("#nextButton").disabled = false; document.querySelector("#selectionHint").textContent = ""; }));
  document.querySelector("#nextButton").addEventListener("click", () => { if (answers[currentQuestion] == null) return; currentQuestion += 1; currentQuestion < list.length ? renderQuestion() : renderResult(); });
  document.querySelector("#backButton").addEventListener("click", () => { if (currentQuestion > 0) { currentQuestion -= 1; renderQuestion(); } });
}
function renderResult() {
  const t = copy[language], score = scores(), result = pickResult(score), shareText = `MuuToo! — ${result.name}: ${result.desc}`;
  app.innerHTML = `<section class="result-screen panel"><div class="result-art large"><img src="${result.asset}" alt="${result.name}"></div><span class="result-label">${t.result}</span><h1>${result.name}</h1><p>${result.desc}</p><blockquote>“${result.quote}”</blockquote><div class="score-grid">${AXES.map((axis,index)=>`<div class="axis-score"><span>${t.axis[index]}</span><b>${score[axis]}%</b><div class="mini-track"><i style="width:${score[axis]}%"></i></div></div>`).join("")}</div><div class="result-actions"><button class="primary-button" id="shareButton">${t.share}<span>↗</span></button><button class="secondary-button" id="againButton">${t.again}</button></div><p id="shareStatus" class="selection-hint"></p></section>`;
  document.querySelector("#againButton").addEventListener("click", startQuiz);
  document.querySelector("#shareButton").addEventListener("click", async () => { try { if (navigator.share) await navigator.share({ title: "MuuToo!", text: shareText }); else { await navigator.clipboard.writeText(shareText); document.querySelector("#shareStatus").textContent = t.copied; } } catch (error) { if (error.name !== "AbortError") document.querySelector("#shareStatus").textContent = shareText; } });
}
function renderPlaceholder(route) { const labels = language === "pl" ? {daily:"Codzienne Muu",settings:"Ustawienia"} : {daily:"Daily Moo",settings:"Settings"}; app.innerHTML = `<section class="placeholder panel"><img src="./assets/webp/cow-question.webp" alt=""><h1>${labels[route]}</h1><p>${language === "pl" ? "Ta część pojawi się w następnym etapie." : "This section is coming in the next stage."}</p></section>`; }

document.querySelectorAll("[data-route]").forEach(element => element.addEventListener("click", event => { event.preventDefault(); setRoute(element.dataset.route); }));
languageSelect.addEventListener("change", event => { language = event.target.value; localStorage.setItem("muutoo-language", language); installButton.textContent = language === "pl" ? "Zainstaluj" : "Install"; updateStaticCopy(); renderHome(); });
window.addEventListener("beforeinstallprompt", event => { event.preventDefault(); deferredInstallPrompt = event; installButton.hidden = false; });
installButton.addEventListener("click", async () => { if (!deferredInstallPrompt) return; deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice; deferredInstallPrompt = undefined; installButton.hidden = true; });
window.addEventListener("appinstalled", () => { installButton.hidden = true; });
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
installButton.textContent = language === "pl" ? "Zainstaluj" : "Install";
updateStaticCopy();
renderHome();
