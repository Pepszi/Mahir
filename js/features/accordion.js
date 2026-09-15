export function initAccordion() {
  const accordions = document.querySelectorAll("[data-accordion]");

  accordions.forEach((accordion) => {
    if (accordion.dataset.accordionInitialized === "true") {
      return;
    }

    accordion.dataset.accordionInitialized = "true";
    const triggers = accordion.querySelectorAll(".accordion__trigger");

    triggers.forEach((trigger) => {
      const panelId = trigger.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;

      if (!panel) {
        return;
      }

      const isExpanded = trigger.getAttribute("aria-expanded") === "true";
      panel.hidden = !isExpanded;

      trigger.addEventListener("click", () => {
        const expanded = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!expanded));
        panel.hidden = expanded;
      });

      trigger.addEventListener("keydown", (event) => {
        const triggerList = Array.from(triggers);
        const index = triggerList.indexOf(trigger);

        if (event.key === "ArrowDown") {
          event.preventDefault();
          triggerList[index + 1]?.focus();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          triggerList[index - 1]?.focus();
        } else if (event.key === "Home") {
          event.preventDefault();
          triggerList[0]?.focus();
        } else if (event.key === "End") {
          event.preventDefault();
          triggerList[triggerList.length - 1]?.focus();
        }
      });
    });
  });
}
