(() => {
  const SETTINGS_KEY = "muutoo-settings";
  const variants = [
    { max: 39, src: "./assets/audio/audio1.mp3", rate: 0.86 },
    { max: 59, src: "./assets/audio/audio1.mp3", rate: 1.08 },
    { max: 79, src: "./assets/audio/audio2.mp3", rate: 0.88 },
    { max: 100, src: "./assets/audio/audio2.mp3", rate: 1.06 }
  ];

  let activeAudio = null;
  let previewIndex = 0;

  function settings() {
    try {
      return { audioEnabled: true, audioVolume: 0.55, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
    } catch {
      return { audioEnabled: true, audioVolume: 0.55 };
    }
  }

  function variantForScore(score) {
    const value = Math.max(0, Math.min(100, Number(score) || 0));
    return variants.find(item => value <= item.max) || variants[variants.length - 1];
  }

  function stopActiveAudio() {
    if (!activeAudio) return;
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }

  async function playVariant(variant) {
    const current = settings();
    if (!current.audioEnabled) return false;

    stopActiveAudio();
    const audio = new Audio(variant.src);
    activeAudio = audio;
    audio.preload = "auto";
    audio.volume = Math.max(0, Math.min(1, Number(current.audioVolume) || 0.55));
    audio.playbackRate = variant.rate;
    audio.preservesPitch = false;
    audio.addEventListener("ended", () => {
      if (activeAudio === audio) activeAudio = null;
    }, { once: true });

    try {
      await audio.play();
      return true;
    } catch (error) {
      if (activeAudio === audio) activeAudio = null;
      console.warn("MuuToo audio could not start:", error);
      return false;
    }
  }

  function resultScore() {
    const screen = document.querySelector(".result-screen");
    if (!screen) return null;
    const values = [...screen.querySelectorAll(".axis-score b")]
      .map(node => Number.parseInt(node.textContent, 10) || 0);
    if (values.length < 3) return null;
    return Math.round((values[1] + values[2]) / 2);
  }

  function playMoo(score = null) {
    const variant = score == null
      ? variants[previewIndex++ % variants.length]
      : variantForScore(score);
    return playVariant(variant);
  }

  document.addEventListener("click", event => {
    if (event.target.closest("#testAudioButton")) {
      event.preventDefault();
      playMoo();
      return;
    }

    if (event.target.closest("#nextButton")) {
      queueMicrotask(() => {
        const score = resultScore();
        if (score != null) playMoo(score);
      });
    }
  });

  window.addEventListener("muutoo-play-moo", event => playMoo(event.detail?.score ?? null));
  window.MuuTooAudio = { playMoo, variantForScore, stop: stopActiveAudio };
})();
