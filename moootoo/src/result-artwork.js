(() => {
  const replacements = new Map([
    ["Pasture Pragmatist", "./assets/webp/result-pragmatist.webp"],
    ["Pragmatyczka Pastwiska", "./assets/webp/result-pragmatist.webp"],
    ["Mad Moo Activist", "./assets/webp/result-activist.webp"],
    ["Aktywistka Mad Moo", "./assets/webp/result-activist.webp"]
  ]);

  const themes = new Map([
    ["FemiToxicy", "result-theme-toxic"],
    ["Supreme Cowmander", "result-theme-commander"],
    ["Najwyższa Krowodząca", "result-theme-commander"]
  ]);

  function applyUniqueResultArtwork(root = document) {
    const images = [];
    if (root.matches?.("img[alt]")) images.push(root);
    root.querySelectorAll?.("img[alt]").forEach(image => images.push(image));

    images.forEach((image) => {
      const name = image.alt.trim();
      const replacement = replacements.get(name);
      if (replacement && image.getAttribute("src") !== replacement) {
        image.src = replacement;
        image.decoding = "async";
      }

      const theme = themes.get(name);
      if (theme) {
        image.closest(".herd-card, .result-preview, .result-screen")?.classList.add(theme);
      }
    });
  }

  applyUniqueResultArtwork();
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) applyUniqueResultArtwork(node);
    }));
  }).observe(document.body, { childList: true, subtree: true });
})();