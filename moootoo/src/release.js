(() => {
  const ROUTES = new Set(["home", "quiz", "daily", "results", "settings"]);
  const SETTINGS_KEY = "muutoo-settings";
  let audioContext = null;
  let audioUnlocked = false;

  const loadSettings = () => {
    try {
      return {
        audioEnabled: true,
        audioVolume: 0.55,
        ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}")
      };
    } catch {
      return { audioEnabled: true, audioVolume: 0.55 };
    }
  };

  function unlockAudio() {
    audioUnlocked = true;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioContext) audioContext = new AudioCtx();
    if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
  }

  function getAudioContext() {
    if (!audioUnlocked) return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!audioContext) audioContext = new AudioCtx();
    if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
    return audioContext;
  }

  function playTone(frequency = 220, duration = 0.08, type = "sine", gainValue = 0.04) {
    const settings = loadSettings();
    if (!settings.audioEnabled) return;
    const context = getAudioContext();
    if (!context) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.005, gainValue * settings.audioVolume), now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  }

  function playMoo() {
    const settings = loadSettings();
    if (!settings.audioEnabled) return;
    const context = getAudioContext();
    if (!context) return;

    const now = context.currentTime;
    [118, 92].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = index ? "triangle" : "sawtooth";
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.72, now + 0.52);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime((index ? 0.025 : 0.04) * settings.audioVolume, now + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.58);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.6);
    });
  }

  function routeFromHash() {
    const route = location.hash.replace(/^#\/?/, "") || localStorage.getItem("muutoo-route") || "home";
    return ROUTES.has(route) ? route : "home";
  }

  function openRoute(route, updateHash = true) {
    if (!ROUTES.has(route)) route = "home";
    localStorage.setItem("muutoo-route", route);
    if (updateHash && location.hash !== `#${route}`) history.pushState(null, "", `#${route}`);
    document.querySelector(`[data-route="${route}"]`)?.click();
  }

  ["pointerdown", "touchstart", "keydown"].forEach(type => {
    window.addEventListener(type, unlockAudio, { once: true, passive: true, capture: true });
  });

  document.addEventListener("click", event => {
    const routeTarget = event.target.closest("[data-route]");
    if (routeTarget?.dataset.route) {
      const route = routeTarget.dataset.route;
      localStorage.setItem("muutoo-route", route);
      if (location.hash !== `#${route}`) history.pushState(null, "", `#${route}`);
      if (event.isTrusted) playTone(250, 0.07, "sine", 0.035);
      return;
    }

    const answer = event.target.closest(".answer-button,.daily-option");
    if (answer) {
      if (event.isTrusted) {
        playTone(answer.classList.contains("daily-option") ? 330 : 290, 0.1, "triangle", 0.05);
        if (answer.classList.contains("daily-option")) window.setTimeout(playMoo, 120);
      }
      return;
    }

    if (event.isTrusted && event.target.closest(".primary-button")) {
      playTone(420, 0.1, "sine", 0.045);
    }
  }, true);

  window.addEventListener("hashchange", () => openRoute(routeFromHash(), false));
  window.addEventListener("muutoo-play-moo", playMoo);
  window.MuuTooAudio = { playMoo, playTone, unlock: unlockAudio };

  document.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(() => openRoute(routeFromHash(), false));
  });
})();