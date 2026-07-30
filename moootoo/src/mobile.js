(() => {
  const routeLabels = {
    en: { home: "Home", quiz: "Test", daily: "Daily", results: "Results", settings: "Settings", seeAll: "See all six results" },
    pl: { home: "Start", quiz: "Test", daily: "Muu", results: "Wyniki", settings: "Ustawienia", seeAll: "Zobacz wszystkie 6 wyników" }
  };

  function language() {
    return document.documentElement.lang === "pl" ? "pl" : "en";
  }

  function updateMobileNav() {
    const labels = routeLabels[language()];
    document.querySelectorAll(".mobile-nav [data-route]").forEach(button => {
      const label = button.querySelector("span");
      const nextLabel = labels[button.dataset.route] || button.dataset.route;
      if (label && label.textContent !== nextLabel) label.textContent = nextLabel;
    });
  }

  function enhanceHome(root = document) {
    const mobileLinks = root.querySelector?.(".mobile-links") || (root.matches?.(".mobile-links") ? root : null);
    if (mobileLinks && !mobileLinks.dataset.routesReady) {
      mobileLinks.dataset.routesReady = "true";
      const buttons = mobileLinks.querySelectorAll("button");
      if (buttons[0]) {
        buttons[0].dataset.route = "results";
        buttons[0].setAttribute("aria-label", routeLabels[language()].seeAll);
      }
      if (buttons[1]) {
        buttons[1].dataset.route = "daily";
        buttons[1].setAttribute("aria-label", routeLabels[language()].daily);
      }
    }

    const mobileResults = root.querySelector?.(".mobile-results") || (root.matches?.(".mobile-results") ? root : null);
    if (mobileResults && !mobileResults.dataset.routeReady) {
      mobileResults.dataset.routeReady = "true";
      mobileResults.tabIndex = 0;
      mobileResults.setAttribute("role", "link");
      mobileResults.setAttribute("aria-label", routeLabels[language()].seeAll);
      mobileResults.addEventListener("click", event => {
        if (event.target.closest("button,a")) return;
        location.hash = "#results";
      });
      mobileResults.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          location.hash = "#results";
        }
      });
    }
  }

  document.addEventListener("click", event => {
    const route = event.target.closest(".mobile-nav [data-route], .mobile-links [data-route]");
    if (!route) return;
    event.preventDefault();
    location.hash = `#${route.dataset.route}`;
  });

  let refreshQueued = false;
  const queueRefresh = root => {
    enhanceHome(root);
    if (refreshQueued) return;
    refreshQueued = true;
    requestAnimationFrame(() => {
      refreshQueued = false;
      updateMobileNav();
      enhanceHome(document);
    });
  };

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) queueRefresh(node);
      }
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    updateMobileNav();
    enhanceHome();
    observer.observe(document.querySelector("#app") || document.body, { childList: true, subtree: true });
  });
})();