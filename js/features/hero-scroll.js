export function initHeroScroll() {
  const root = document.documentElement;
  const heroSection = document.querySelector(".hero-scroll");

  if (!window.gsap || !window.ScrollTrigger || !heroSection) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const clamp01 = (value) => Math.max(0, Math.min(1, value));
  const applyHeroProgress = (rawProgress) => {
    // Reach final state at 90% scroll, then hold for the last 10%.
    const progress = clamp01(rawProgress / 0.9);
    root.style.setProperty("--hero-progress", progress.toFixed(4));
  };

  const heroTrigger = ScrollTrigger.create({
    trigger: heroSection,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate(self) {
      applyHeroProgress(self.progress);
    },
    onRefresh(self) {
      applyHeroProgress(self.progress);
    },
  });

  // Sync state on reload when page opens at a non-zero scroll position.
  const syncHeroFromScrollPosition = () => {
    ScrollTrigger.refresh();
    applyHeroProgress(heroTrigger.progress);
  };

  syncHeroFromScrollPosition();
  window.addEventListener("load", () => requestAnimationFrame(syncHeroFromScrollPosition));
  window.addEventListener("pageshow", () => requestAnimationFrame(syncHeroFromScrollPosition));
}
