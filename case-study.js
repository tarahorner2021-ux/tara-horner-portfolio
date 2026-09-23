(() => {
  "use strict";

  /* ===========================================================
     Product vision — Discover / Explore / Act tab switcher
     =========================================================== */
  // Each case study page has its own independent tablist, so scope every
  // lookup to the .layer-tabs container rather than querying the whole
  // document — this keeps multiple tab groups on one page from colliding.
  const tabGroups = Array.from(document.querySelectorAll(".layer-tabs"));
  if (!tabGroups.length) return;

  tabGroups.forEach((tabGroup) => {
    const tabs = Array.from(tabGroup.querySelectorAll(".layer-tab"));
    if (!tabs.length) return;

    const panels = Array.from(
      document.querySelectorAll(
        tabs.map((tab) => `[data-layer-panel="${tab.dataset.layer}"]`).join(",")
      )
    );

    const activate = (name, { focus = false } = {}) => {
      tabs.forEach((tab) => {
        const isMatch = tab.dataset.layer === name;
        tab.classList.toggle("is-active", isMatch);
        tab.setAttribute("aria-selected", String(isMatch));
        tab.tabIndex = isMatch ? 0 : -1;
        if (isMatch && focus) tab.focus();
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.layerPanel !== name;
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab.dataset.layer));

      // Standard ARIA tabs keyboard pattern: Left/Right (and Up/Down) move
      // focus between tabs and activate as you go, Home/End jump to the
      // ends — so the tablist is fully operable without a mouse.
      tab.addEventListener("keydown", (event) => {
        let targetIndex = null;
        switch (event.key) {
          case "ArrowRight":
          case "ArrowDown":
            targetIndex = (index + 1) % tabs.length;
            break;
          case "ArrowLeft":
          case "ArrowUp":
            targetIndex = (index - 1 + tabs.length) % tabs.length;
            break;
          case "Home":
            targetIndex = 0;
            break;
          case "End":
            targetIndex = tabs.length - 1;
            break;
          default:
            return;
        }
        event.preventDefault();
        activate(tabs[targetIndex].dataset.layer, { focus: true });
      });
    });
  });
})();
