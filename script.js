const root = document.documentElement;
const heroSection = document.querySelector(".hero-scroll");

if (window.gsap && window.ScrollTrigger && heroSection) {
  gsap.registerPlugin(ScrollTrigger);

  const clamp01 = (value) => Math.max(0, Math.min(1, value));

  ScrollTrigger.create({
    trigger: heroSection,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate(self) {
      // Reach final state at 90% scroll, then hold for the last 10%.
      const progress = clamp01(self.progress / 0.9);
      root.style.setProperty("--hero-progress", progress.toFixed(4));
    },
  });
}
