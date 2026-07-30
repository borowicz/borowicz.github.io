const SETTINGS_KEY = "muutoo-settings";

function loadSettings() {
  try {
    return { dailyEnabled: true, tone: "balanced", audioEnabled: true, audioVolume: 0.55, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
  } catch {
    return { dailyEnabled: true, tone: "balanced", audioEnabled: true, audioVolume: 0.55 };
  }
}

function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent("muutoo-settings-changed", { detail: settings }));
}

function renderSettings() {
  const languageSelect = document.querySelector("#languageSelect");
  const language = languageSelect?.value === "pl" ? "pl" : "en";
  const settings = loadSettings();
  const copy = language === "pl" ? {
    title: "Ustawienia", subtitle: "Dopasuj pastwisko do własnego poziomu muu.", language: "Język",
    daily: "Codzienne Muu", dailyHint: "Pokazuj pytanie dnia i zapisuj serię.", tone: "Ton tekstów",
    calm: "Spokojny", balanced: "Zbalansowany", savage: "Bez litości", data: "Dane lokalne",
    audio: "Dźwięki", audioHint: "Krótkie efekty interfejsu i syntetyczne muu. Bez pobierania plików audio.", volume: "Głośność",
    testAudio: "Odtwórz muu", resetDaily: "Wyczyść Daily Moo", resetQuiz: "Wyczyść ostatni quiz", resetAll: "Wyczyść wszystko",
    origin: "Inspiracja", inspired: "Zainspirowane programem krowy.exe", published: "oficjalnie opublikowanym w CD-Action nr 27A w sierpniu 1998 roku; autor nieznany.",
    academy: "Akademia Rolnicza — Multimedialny kurs rozpoznawania szalonych KRÓW", watch: "Obejrzyj archiwalne nagranie na YouTube",
    inspirationAlt: "Zrzut ekranu z programu Krasula Mleczna 2.0",
    version: "MVP 1.0.0 · dane pozostają wyłącznie na tym urządzeniu.", disclaimer: "Humorystyczny test osobowości. Nie jest narzędziem diagnostycznym.", done: "Gotowe — dane zostały wyczyszczone."
  } : {
    title: "Settings", subtitle: "Tune the pasture to your preferred level of moo.", language: "Language",
    daily: "Daily Moo", dailyHint: "Show the daily question and keep your streak.", tone: "Writing tone",
    calm: "Calm", balanced: "Balanced", savage: "Savage", data: "Local data",
    audio: "Audio", audioHint: "Short interface sounds and a synthetic moo. No audio files are downloaded.", volume: "Volume",
    testAudio: "Play moo", resetDaily: "Reset Daily Moo", resetQuiz: "Reset last quiz", resetAll: "Reset everything",
    origin: "Inspiration", inspired: "Inspired by krowy.exe", published: "officially published with CD-Action issue 27A in August 1998; author unknown.",
    academy: "Agricultural Academy — Multimedia course in recognising mad COWS", watch: "Watch the archived video on YouTube",
    inspirationAlt: "Screenshot from the Krasula Mleczna 2.0 program",
    version: "MVP 1.0.0 · your data stays only on this device.", disclaimer: "A humorous personality test, not a diagnostic tool.", done: "Done — local data was cleared."
  };
  const app = document.querySelector("#app");
  if (!app) return;

  app.innerHTML = `<section class="settings-screen">
    <header class="settings-heading"><span class="result-label">⚙ ${copy.title}</span><h1>${copy.title}</h1><p>${copy.subtitle}</p></header>
    <div class="settings-grid">
      <article class="settings-card panel"><h2>${copy.language}</h2><div class="segmented-setting"><button data-language="en" class="${language === "en" ? "is-active" : ""}">English</button><button data-language="pl" class="${language === "pl" ? "is-active" : ""}">Polski</button></div></article>
      <article class="settings-card panel"><div class="setting-row"><div><h2>${copy.daily}</h2><p>${copy.dailyHint}</p></div><label class="switch"><input id="dailyEnabled" type="checkbox" ${settings.dailyEnabled ? "checked" : ""}><span></span></label></div></article>
      <article class="settings-card panel"><h2>${copy.tone}</h2><div class="segmented-setting tone-setting"><button data-tone="calm" class="${settings.tone === "calm" ? "is-active" : ""}">${copy.calm}</button><button data-tone="balanced" class="${settings.tone === "balanced" ? "is-active" : ""}">${copy.balanced}</button><button data-tone="savage" class="${settings.tone === "savage" ? "is-active" : ""}">${copy.savage}</button></div></article>
      <article class="settings-card panel"><div class="setting-row"><div><h2>${copy.audio}</h2><p>${copy.audioHint}</p></div><label class="switch"><input id="audioEnabled" type="checkbox" ${settings.audioEnabled ? "checked" : ""}><span></span></label></div><label for="audioVolume"><b>${copy.volume}</b></label><input id="audioVolume" type="range" min="0.1" max="1" step="0.05" value="${settings.audioVolume}"><button class="secondary-button" id="testAudioButton">🔊 ${copy.testAudio}</button></article>
      <article class="settings-card panel settings-danger"><h2>${copy.data}</h2><div class="settings-actions"><button data-reset="daily">${copy.resetDaily}</button><button data-reset="quiz">${copy.resetQuiz}</button><button data-reset="all" class="danger-button">${copy.resetAll}</button></div><p id="settingsStatus" class="selection-hint"></p></article>
      <article class="settings-card panel origin-card"><div class="origin-media"><img src="./assets/zrzut_ekranu-krasula-mleczna-2-0.jpg" alt="${copy.inspirationAlt}" loading="lazy" decoding="async"></div><div class="origin-copy"><h2>${copy.origin}</h2><p class="origin-title">${copy.inspired}</p><p class="origin-meta">${copy.published}</p><p><strong>${copy.academy}</strong></p><a href="https://www.youtube.com/watch?v=UAGoyjzSYZY" target="_blank" rel="noopener noreferrer">▶ ${copy.watch}</a></div></article>
    </div><p class="settings-version">${copy.version}</p><p class="release-note">${copy.disclaimer}</p>
  </section>`;

  document.querySelectorAll("[data-language]").forEach(button => button.addEventListener("click", () => {
    if (languageSelect) {
      languageSelect.value = button.dataset.language;
      languageSelect.dispatchEvent(new Event("change", { bubbles: true }));
      requestAnimationFrame(renderSettings);
    }
  }));
  document.querySelector("#dailyEnabled")?.addEventListener("change", event => saveSettings({ ...loadSettings(), dailyEnabled: event.target.checked }));
  document.querySelector("#audioEnabled")?.addEventListener("change", event => saveSettings({ ...loadSettings(), audioEnabled: event.target.checked }));
  document.querySelector("#audioVolume")?.addEventListener("input", event => saveSettings({ ...loadSettings(), audioVolume: Number(event.target.value) }));
  document.querySelector("#testAudioButton")?.addEventListener("click", () => window.MuuTooAudio?.playMoo());
  document.querySelectorAll("[data-tone]").forEach(button => button.addEventListener("click", () => {
    saveSettings({ ...loadSettings(), tone: button.dataset.tone });
    document.querySelectorAll("[data-tone]").forEach(item => item.classList.toggle("is-active", item === button));
  }));
  document.querySelectorAll("[data-reset]").forEach(button => button.addEventListener("click", () => {
    const type = button.dataset.reset;
    if (type === "daily" || type === "all") localStorage.removeItem("muutoo-daily");
    if (type === "quiz" || type === "all") { localStorage.removeItem("muutoo-last-result"); localStorage.removeItem("muutoo-quiz-progress"); }
    if (type === "all") {
      const currentLanguage = localStorage.getItem("muutoo-language");
      localStorage.clear();
      if (currentLanguage) localStorage.setItem("muutoo-language", currentLanguage);
    }
    document.querySelector("#settingsStatus").textContent = copy.done;
  }));
}

window.renderMuuTooSettings = renderSettings;

document.addEventListener("click", event => {
  const route = event.target.closest('[data-route="settings"]');
  if (!route) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("is-active", item.dataset.route === "settings"));
  renderSettings();
}, true);