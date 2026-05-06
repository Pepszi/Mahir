export function initFooterYear() {
  const yearElement = document.querySelector("[data-current-year]");

  if (!yearElement) {
    return;
  }

  yearElement.textContent = String(new Date().getFullYear());
}
