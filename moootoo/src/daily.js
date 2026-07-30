const DAILY_MOO_QUESTIONS = {
  en: [
    { question: "Someone says ‘not all men’. You respond:", answers: ["With facts and patience.", "With sarcasm and statistics.", "With rage and a meme."], reactions: ["CALM MOO.", "SHARP MOO.", "VOLCANIC MOO."] },
    { question: "A meeting repeats your idea after a man says it. You:", answers: ["Politely reclaim it.", "Name the pattern.", "Bring a megaphone next time."], reactions: ["RECLAIMED.", "RECEIPTS READY.", "AMPLIFIED."] },
    { question: "A brand discovers feminism during a sale. You:", answers: ["Ignore the campaign.", "Check its policies.", "Turn the ad into a meme."], reactions: ["UNBOTHERED.", "AUDIT MOO.", "MEME ACTIVATED."] },
    { question: "The group chat is politically on fire. You:", answers: ["Mute it.", "Post sources.", "Send one devastating GIF."], reactions: ["PEACEFUL PASTURE.", "BIBLIOGRAPHY MOO.", "GIF DIPLOMACY."] },
    { question: "Someone says feminism has gone too far. You:", answers: ["Ask: ‘Where exactly?’", "Explain the history.", "Declare the Cow Republic."], reactions: ["SPECIFICS, PLEASE.", "LECTURE MODE.", "NEW BORDERS."] }
  ],
  pl: [
    { question: "Ktoś mówi „nie wszyscy mężczyźni”. Odpowiadasz:", answers: ["Faktami i cierpliwością.", "Sarkazmem i statystykami.", "Wściekłością i memem."], reactions: ["SPOKOJNE MUU.", "OSTRE MUU.", "WULKANICZNE MUU."] },
    { question: "Na spotkaniu mężczyzna powtarza twój pomysł. Ty:", answers: ["Spokojnie go odzyskuję.", "Nazywam ten mechanizm.", "Następnym razem przynoszę megafon."], reactions: ["ODZYSKANE.", "DOWODY GOTOWE.", "WZMOCNIONE."] },
    { question: "Marka odkrywa feminizm podczas wyprzedaży. Ty:", answers: ["Ignoruję kampanię.", "Sprawdzam politykę firmy.", "Zmieniam reklamę w mem."], reactions: ["NIEWZRUSZONE.", "AUDYT MUU.", "MEM AKTYWOWANY."] },
    { question: "Czat grupowy politycznie płonie. Ty:", answers: ["Wyciszam go.", "Wrzucam źródła.", "Wysyłam jeden niszczący GIF."], reactions: ["SPOKOJNE PASTWISKO.", "BIBLIOGRAFICZNE MUU.", "DYPLOMACJA GIFEM."] },
    { question: "Ktoś mówi, że feminizm zaszedł za daleko. Ty:", answers: ["Pytam: „Dokąd dokładnie?”", "Wyjaśniam historię.", "Ogłaszam Krowią Republikę."], reactions: ["KONKRETY, PROSZĘ.", "TRYB WYKŁADU.", "NOWE GRANICE."] }
  ]
};

const DAILY_STORAGE_KEY = "muutoo-daily";
const dateKey = (date = new Date()) => date.toISOString().slice(0, 10);
const dayNumber = () => Math.floor(Date.now() / 86400000);
const getLanguage = () => document.querySelector("#languageSelect")?.value === "pl" ? "pl" : "en";

function loadDailyState() {
  try { return JSON.parse(localStorage.getItem(DAILY_STORAGE_KEY)) || { answers: {}, streak: 0, lastDate: null }; }
  catch { return { answers: {}, streak: 0, lastDate: null }; }
}

function saveDailyAnswer(answerIndex) {
  const today = dateKey();
  const state = loadDailyState();
  if (!state.answers[today]) {
    const yesterday = dateKey(new Date(Date.now() - 86400000));
    state.streak = state.lastDate === yesterday ? (state.streak || 0) + 1 : 1;
    state.lastDate = today;
  }
  state.answers[today] = answerIndex;
  localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(state));
  return state;
}

function renderDailyMoo() {
  const language = getLanguage();
  const labels = language === "pl"
    ? { title: "Codzienne Muu", subtitle: "Jedno pytanie dziennie. Zero farmerów do przekonania.", streak: "Seria", days: "dni", answered: "Dzisiejsze muu zapisane", tomorrow: "Wróć jutro po następne pytanie.", history: "Ostatnie odpowiedzi" }
    : { title: "Daily Moo", subtitle: "One question a day. Zero farmers to convince.", streak: "Streak", days: "days", answered: "Today’s moo is saved", tomorrow: "Come back tomorrow for another question.", history: "Recent answers" };
  const list = DAILY_MOO_QUESTIONS[language];
  const item = list[dayNumber() % list.length];
  const state = loadDailyState();
  const today = dateKey();
  const selected = state.answers[today];
  const history = Object.entries(state.answers).sort(([a],[b]) => b.localeCompare(a)).slice(0, 5);
  const app = document.querySelector("#app");
  if (!app) return;

  app.innerHTML = `<section class="daily-screen">
    <header class="daily-hero panel">
      <div><span class="daily-kicker">🐮 ${labels.title}</span><h1>${item.question}</h1><p>${labels.subtitle}</p></div>
      <div class="daily-streak"><strong>${state.streak || 0}</strong><span>${labels.streak}<br>${labels.days}</span></div>
    </header>
    <div class="daily-layout">
      <article class="daily-main panel">
        <img src="./assets/webp/cow-question.webp" alt="" />
        <div class="daily-options">${item.answers.map((answer,index)=>`<button class="daily-option ${selected===index?"is-selected":""}" data-index="${index}" ${selected!==undefined?"disabled":""}><b>${String.fromCharCode(65+index)}</b><span>${answer}</span></button>`).join("")}</div>
        <div id="dailyReaction" class="daily-reaction ${selected!==undefined?"is-visible":""}">${selected!==undefined?item.reactions[selected]:""}</div>
        <p id="dailyStatus" class="daily-status">${selected!==undefined?`${labels.answered}. ${labels.tomorrow}`:""}</p>
      </article>
      <aside class="daily-history panel"><h2>${labels.history}</h2>${history.length?history.map(([date,index])=>`<div><time>${date}</time><span>${String.fromCharCode(65+Number(index))}</span></div>`).join(""):`<p>—</p>`}</aside>
    </div>
  </section>`;

  document.querySelectorAll(".daily-option").forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.index);
    const nextState = saveDailyAnswer(index);
    document.querySelectorAll(".daily-option").forEach(option => { option.disabled = true; option.classList.toggle("is-selected", option === button); });
    const reaction = document.querySelector("#dailyReaction");
    reaction.textContent = item.reactions[index];
    reaction.classList.add("is-visible");
    document.querySelector("#dailyStatus").textContent = `${labels.answered}. ${labels.tomorrow}`;
    document.querySelector(".daily-streak strong").textContent = nextState.streak;
  }));
}

window.renderDailyMoo = renderDailyMoo;

document.addEventListener("click", event => {
  const route = event.target.closest('[data-route="daily"]');
  if (!route) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("is-active", item.dataset.route === "daily"));
  renderDailyMoo();
}, true);
